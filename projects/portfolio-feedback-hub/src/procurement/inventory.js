import { dateInput, emptyRequest, transition, validate, STATUS, ROLES, owner, approvalSteps } from './model.js';

export const ERP_SAMPLE_ID = 'PR-2007';
export const qty = n => `${Number(n || 0).toLocaleString('ko-KR')} EA`;
export const orderId = r => r.order?.id || `PO-${r.id.replace(/^PR-/, '')}`;
export const orderItems = r => r.approvedSnapshot?.items || r.items;
export const receivedQuantity = (state, requestId, index) => state.receipts.filter(r => r.requestId === requestId).reduce((n, r) => n + r.lines.filter(l => l.index === index).reduce((sum, l) => sum + l.quantity, 0), 0);
export function orderProgress(state, request) {
  if (request.status === 'approved') return { key: 'ready', label: '발주 대기', tone: 'blue', ordered: 0, received: 0, remaining: 0 };
  const ordered = orderItems(request).reduce((n, i) => n + Number(i.quantity), 0);
  const received = orderItems(request).reduce((n, _, i) => n + receivedQuantity(state, request.id, i), 0);
  return { key: received >= ordered ? 'done' : received ? 'partial' : 'waiting', label: received >= ordered ? '입고 완료' : received ? '부분 입고' : '입고 대기', tone: received >= ordered ? 'green' : received ? 'amber' : 'blue', ordered, received, remaining: Math.max(0, ordered - received) };
}
// Receipt completion is request-specific. Issues belong to material stock, not a PO.
export function purchaseSteps(state, request) {
  const approval = approvalSteps(request).map((step, index) => ({ ...step, label: index === 0 ? '품의 작성' : step.label }));
  const receipt = request.status === 'rejected'
    ? { label: '입고 확인', state: 'stopped', detail: '진행하지 않음' }
    : request.status !== 'ordered'
      ? { label: '입고 확인', state: 'waiting', detail: '대기' }
      : orderProgress(state, request).remaining > 0
        ? { label: '입고 확인', state: 'current', detail: '수량 확인' }
        : { label: '입고 확인', state: 'complete', detail: '완료' };
  return [...approval, receipt];
}
// Keep receipt progress and lateness separate: an overdue order can be partly received.
export function workflowStatus(state, request, today = dateInput()) {
  if (request.status !== 'ordered') return { ...STATUS[request.status], owner: owner(request), detail: '', late: false };
  const progress = orderProgress(state, request);
  const expected = request.order?.expectedDate || request.needBy;
  return { label: progress.label, tone: progress.tone, owner: progress.remaining ? ROLES.staff : '입고 확인 완료',
    detail: progress.remaining ? `미입고 ${qty(progress.remaining)}` : `입고 ${qty(progress.received)}`,
    late: Boolean(progress.remaining && expected && expected < today) };
}
export function comparisonLines(state, request, materialIds) {
  const ordered = request.status === 'ordered';
  return (ordered ? orderItems(request) : request.items).flatMap((item, index) => {
    if (materialIds && !materialIds.includes(item.materialId)) return [];
    const received = ordered ? receivedQuantity(state, request.id, index) : null;
    return [{ ...item, index, received, remaining: ordered ? Math.max(0, Number(item.quantity) - received) : null }];
  });
}
export function materialTotals(state, materialId) {
  const received = state.receipts.reduce((sum, r) => sum + r.lines.filter(l => l.materialId === materialId).reduce((n, l) => n + l.quantity, 0), 0);
  const issued = state.issues.filter(i => i.materialId === materialId).reduce((sum, i) => sum + i.quantity, 0);
  return { received, issued, balance: received - issued };
}
export function stock(state, materialId, through = '9999-12-31') {
  const incoming = state.receipts.filter(r => r.date <= through).reduce((n, r) => n + r.lines.filter(l => l.materialId === materialId).reduce((sum, l) => sum + l.quantity, 0), 0);
  return incoming - state.issues.filter(i => i.materialId === materialId && i.date <= through).reduce((n, i) => n + i.quantity, 0);
}
export function incoming(state, materialId) {
  return state.requests.filter(r => r.status === 'ordered').reduce((n, r) => n + orderItems(r).reduce((sum, item, i) => sum + (item.materialId === materialId ? Math.max(0, Number(item.quantity) - receivedQuantity(state, r.id, i)) : 0), 0), 0);
}
export function materialHistory(state, materialId) {
  return [
    ...state.receipts.flatMap(r => r.lines.filter(l => l.materialId === materialId).map(l => ({ id: r.id, date: r.date, at: r.at, type: '입고', quantity: l.quantity, party: r.vendorName, requestId: r.requestId, note: r.note }))),
    ...state.issues.filter(i => i.materialId === materialId).map(i => ({ ...i, type: '지급', party: `${i.department} · ${i.recipient}`, quantity: -i.quantity })),
  ].sort((a, b) => b.date.localeCompare(a.date) || (b.at || '').localeCompare(a.at || '') || b.id.localeCompare(a.id));
}
const clean = value => String(value ?? '').trim();
const normal = value => clean(value).toLowerCase().replace(/\s+/g, '');
const positive = value => Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) <= 10000;
export function validDay(value) {
  const date = new Date(`${value}T12:00:00`);
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(date.getTime()) && dateInput(date) === value;
}
function actualDate(value) {
  if (!validDay(value) || value > dateInput()) throw new Error('실제 처리일을 오늘 이전의 올바른 날짜로 입력해 주세요.');
}
function staffOnly(role) { if (role !== 'staff') throw new Error('구매·자재 담당자 역할에서 처리해 주세요.'); }
function nextId(prefix, rows) { return `${prefix}-${String(Math.max(0, ...rows.map(r => Number(r.id.split('-').at(-1)) || 0)) + 1).padStart(4, '0')}`; }

export function validateCatalogRequest(state, request) {
  const errors = validate(request);
  if (!state.vendors.some(v => v.id === request.supplierId)) errors.supplier = '등록된 업체를 선택해 주세요.';
  const ids = new Set();
  request.items.forEach((item, i) => {
    if (!state.materials.some(m => m.id === item.materialId)) errors[`item-${i}-material`] = '등록된 자재를 선택해 주세요.';
    else if (ids.has(item.materialId)) errors[`item-${i}-material`] = '같은 자재는 한 줄에 수량을 합쳐 주세요.';
    ids.add(item.materialId);
  });
  return errors;
}
export function duplicateRequests(state, request) {
  return state.requests.filter(r => r.id !== request.id && ['team', 'director', 'approved', 'ordered'].includes(r.status) && request.items.some(item => item.materialId && (r.status === 'ordered' ? orderItems(r) : r.items).some((other, i) => other.materialId === item.materialId && (r.status !== 'ordered' || Number(other.quantity) > receivedQuantity(state, r.id, i)))));
}
export function placeOrder(state, requestId, role, payload) {
  staffOnly(role);
  const request = state.requests.find(r => r.id === requestId);
  if (!request || request.status !== 'approved') throw new Error('최종 승인된 요청만 발주할 수 있습니다.');
  if (Object.keys(validateCatalogRequest(state, request)).length) throw new Error('자재와 업체 정보가 필요합니다. 요청 내용을 변경하고 재결재해 주세요.');
  actualDate(payload.date);
  if (payload.date < dateInput(request.approvedSnapshot.at)) throw new Error('발주일은 최종 승인일보다 빠를 수 없습니다.');
  if (!validDay(payload.expectedDate) || payload.expectedDate < payload.date) throw new Error('입고 예정일은 발주일 이후로 선택해 주세요.');
  const next = transition(request, 'order', role, { reference: payload.note?.trim() || '승인본으로 발주 등록' });
  next.order = { ...next.order, id: orderId(request), date: payload.date, expectedDate: payload.expectedDate };
  return { ...state, requests: state.requests.map(r => r.id === requestId ? next : r) };
}
export function receiveOrder(state, requestId, role, payload) {
  staffOnly(role);
  if (payload.token && state.receipts.some(r => r.token === payload.token)) throw new Error('이미 기록한 입고입니다.');
  const request = state.requests.find(r => r.id === requestId);
  if (!request || request.status !== 'ordered') throw new Error('발주가 등록된 요청만 입고할 수 있습니다.');
  actualDate(payload.date);
  if (payload.date < (request.order.date || dateInput(request.order.at))) throw new Error('입고일은 발주일보다 빠를 수 없습니다.');
  const items = orderItems(request), used = new Set();
  const lines = (payload.lines || []).filter(l => Number(l.quantity) !== 0).map(l => {
    const item = items[l.index];
    if (!Number.isInteger(l.index) || !item || used.has(l.index) || !state.materials.some(m => m.id === item.materialId)) throw new Error('입고할 자재를 확인해 주세요.');
    used.add(l.index);
    if (!positive(l.quantity)) throw new Error('입고 수량은 1 이상의 정수로 입력해 주세요.');
    if (Number(l.quantity) > Number(item.quantity) - receivedQuantity(state, requestId, l.index)) throw new Error(`${item.name}: 미입고 수량을 넘을 수 없습니다.`);
    return { index: l.index, materialId: item.materialId, quantity: Number(l.quantity) };
  });
  if (!lines.length) throw new Error('이번에 받은 수량을 한 품목 이상 입력해 주세요.');
  const receipt = { id: nextId('RC', state.receipts), requestId, date: payload.date, lines, vendorName: request.approvedSnapshot?.supplier || request.supplier, note: clean(payload.note), token: payload.token, at: new Date().toISOString() };
  return { ...state, receipts: [...state.receipts, receipt] };
}
export function issueMaterial(state, role, payload) {
  staffOnly(role);
  if (payload.token && state.issues.some(i => i.token === payload.token)) throw new Error('이미 기록한 지급입니다.');
  if (!state.materials.some(m => m.id === payload.materialId)) throw new Error('등록된 자재를 선택해 주세요.');
  actualDate(payload.date);
  if (!clean(payload.recipient) || !clean(payload.department)) throw new Error('받는 사람과 부서·사용처를 입력해 주세요.');
  if (!positive(payload.quantity)) throw new Error('지급 수량은 1 이상의 정수로 입력해 주세요.');
  if (Number(payload.quantity) > stock(state, payload.materialId)) throw new Error('보유 수량보다 많이 지급할 수 없습니다.');
  const issue = { id: nextId('IS', state.issues), materialId: payload.materialId, date: payload.date, quantity: Number(payload.quantity), recipient: clean(payload.recipient), department: clean(payload.department), note: clean(payload.note), token: payload.token, at: new Date().toISOString() };
  const next = { ...state, issues: [...state.issues, issue] };
  const days = new Set([payload.date, ...materialHistory(next, payload.materialId).map(m => m.date)]);
  if ([...days].some(d => stock(next, payload.materialId, d) < 0)) throw new Error('선택한 날짜의 보유 수량이 부족합니다. 입고일과 지급일을 확인해 주세요.');
  return next;
}
export function saveVendor(state, role, form, id) {
  staffOnly(role);
  if (id && !state.vendors.some(v => v.id === id)) throw new Error('업체를 찾을 수 없습니다.');
  if (!clean(form.name)) throw new Error('업체명을 입력해 주세요.');
  if (state.vendors.some(v => v.id !== id && normal(v.name) === normal(form.name))) throw new Error('같은 이름의 업체가 등록되어 있습니다.');
  if (clean(form.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(form.email))) throw new Error('이메일 형식을 확인해 주세요.');
  const record = { id: id || nextId('VN', state.vendors), ...Object.fromEntries(['name', 'contact', 'phone', 'email', 'note'].map(k => [k, clean(form[k])])) };
  return { ...state, vendors: id ? state.vendors.map(v => v.id === id ? record : v) : [...state.vendors, record] };
}
export function saveMaterial(state, role, form, id) {
  staffOnly(role);
  const previous = state.materials.find(m => m.id === id);
  if (id && !previous) throw new Error('자재를 찾을 수 없습니다.');
  const code = previous?.code || clean(form.code).toUpperCase();
  if (!/^[A-Z0-9-]{2,24}$/.test(code)) throw new Error('자재코드는 영문·숫자·하이픈 2~24자로 입력해 주세요.');
  if (state.materials.some(m => m.id !== id && m.code === code)) throw new Error('이미 등록된 자재코드입니다.');
  if (!clean(form.name) || !clean(form.spec)) throw new Error('자재명과 규격을 입력해 주세요.');
  if (!state.vendors.some(v => v.id === form.vendorId)) throw new Error('기본 구매 업체를 선택해 주세요.');
  if (!Number.isInteger(Number(form.price)) || Number(form.price) < 1 || Number(form.price) > 100000000) throw new Error('기준 단가를 1~100,000,000원의 정수로 입력해 주세요.');
  const record = { id: id || nextId('MT', state.materials), code, name: clean(form.name), spec: clean(form.spec), unit: 'EA', vendorId: form.vendorId, price: Number(form.price) };
  return { ...state, materials: id ? state.materials.map(m => m.id === id ? record : m) : [...state.materials, record] };
}
export function createERP(now = new Date()) {
  const at = offset => new Date(new Date(now).getTime() + offset * 86400000).toISOString();
  const on = offset => dateInput(at(offset));
  let state = { version: 2, requests: [], receipts: [], issues: [], vendors: [
    { id: 'VN-0001', name: '한결센서 (가상)', contact: '영업 담당', phone: '', email: 'sales@example.com', note: '포토센서·근접센서' },
    { id: 'VN-0002', name: '온유제어 (가상)', contact: '부품 담당', phone: '', email: 'parts@example.com', note: '릴레이·스위치' },
  ], materials: [
    { id: 'MT-0001', code: 'SEN-PH-01', name: '포토센서', spec: '확산 반사형 · NPN · DC 24V', unit: 'EA', vendorId: 'VN-0001', price: 48000 },
    { id: 'MT-0002', code: 'SEN-PR-01', name: '근접센서', spec: 'M18 · 검출 거리 8mm · NPN', unit: 'EA', vendorId: 'VN-0001', price: 32000 },
    { id: 'MT-0003', code: 'REL-24-01', name: '제어 릴레이', spec: 'DC 24V · 2접점', unit: 'EA', vendorId: 'VN-0002', price: 12000 },
    { id: 'MT-0004', code: 'SW-LM-01', name: '리미트 스위치', spec: '롤러 레버형 · IP67', unit: 'EA', vendorId: 'VN-0002', price: 18000 },
  ] };
  const rows = [
    ['PR-2001', 0, 5, 'ordered', '포장 라인 포토센서 교체', -8],
    ['PR-2002', 1, 8, 'ordered', '조립 라인 근접센서 확보', -7],
    ['PR-2003', 2, 6, 'approved', '제어반 릴레이 교체', -4],
    ['PR-2004', 3, 2, 'revision', '검사 장비 스위치 교체', -3],
    ['PR-2005', 1, 2, 'director', '예비 근접센서 추가', -3],
    ['PR-2006', 2, 3, 'draft', '정기 정비용 릴레이', -1],
    [ERP_SAMPLE_ID, 0, 2, 'team', '추가 설비 포토센서 구매', -6],
  ];
  state.requests = rows.map(([id, index, quantity, status, title, offset]) => {
    const m = state.materials[index], vendor = state.vendors.find(v => v.id === m.vendorId);
    let r = { ...emptyRequest(), id, title, department: '생산지원팀', purpose: title, supplier: vendor.name, supplierId: vendor.id, needBy: on(3), source: '', items: [{ materialId: m.id, name: m.name, spec: m.spec, unit: 'EA', quantity, price: m.price }], status: 'draft', revision: 1, createdAt: at(offset), updatedAt: at(offset), events: [{ at: at(offset), actor: '구매 담당자', message: '샘플 요청서 작성', revision: 1 }], submissions: [] };
    if (status !== 'draft') r = transition(r, 'submit', 'staff', { at: at(offset) });
    if (status === 'revision') r = transition(r, 'revise', 'manager', { reason: '설치 위치와 필요한 수량을 사유에 추가해 주세요.', at: at(offset + 1) });
    if (['director', 'approved', 'ordered'].includes(status) || id === ERP_SAMPLE_ID) r = transition(r, 'approve', 'manager', { at: at(offset + 1) });
    if (['approved', 'ordered'].includes(status) || id === ERP_SAMPLE_ID) r = transition(r, 'approve', 'director', { at: at(offset + 2) });
    if (id === ERP_SAMPLE_ID) { r = transition(r, 'amend', 'staff', { at: at(-2) }); r.items[0].quantity = 3; r.purpose = '설비 1대 추가로 포토센서 3EA 필요'; r = transition(r, 'submit', 'staff', { at: at(-1) }); }
    if (status === 'ordered') { r = transition(r, 'order', 'staff', { reference: '샘플 발주', at: at(offset + 3) }); r.order = { ...r.order, id: orderId(r), date: on(offset + 3), expectedDate: on(id === 'PR-2001' ? -1 : 2) }; }
    return r;
  });
  state = receiveOrder(state, 'PR-2001', 'staff', { date: on(-3), lines: [{ index: 0, quantity: 3 }], note: '5EA 중 3EA 도착', token: 'seed-receipt-1' });
  state = receiveOrder(state, 'PR-2002', 'staff', { date: on(-2), lines: [{ index: 0, quantity: 8 }], note: '전량 확인', token: 'seed-receipt-2' });
  state = issueMaterial(state, 'staff', { materialId: 'MT-0001', quantity: 2, date: on(-1), department: '설비보전팀', recipient: '담당자 A (가상)', note: '포장 라인 교체', token: 'seed-issue-1' });
  state = issueMaterial(state, 'staff', { materialId: 'MT-0002', quantity: 1, date: on(-1), department: '생산1팀', recipient: '담당자 B (가상)', note: '조립 설비 지급', token: 'seed-issue-2' });
  return state;
}
// Preserve all old request fields and histories; only add catalog links and ERP data.
export function migrateWorkspace(saved, now = new Date()) {
  if (saved?.version === 2) {
    const arrays = ['requests', 'materials', 'vendors', 'receipts', 'issues'];
    if (!arrays.every(k => Array.isArray(saved[k]) && saved[k].every(r => r && typeof r.id === 'string') && new Set(saved[k].map(r => r.id)).size === saved[k].length)
      || !saved.materials.every(m => ['code', 'name', 'spec', 'vendorId'].every(k => typeof m[k] === 'string'))
      || !saved.vendors.every(v => typeof v.name === 'string')
      || !saved.receipts.every(r => validDay(r.date) && Array.isArray(r.lines) && r.lines.every(l => Number.isInteger(l.index) && positive(l.quantity) && saved.materials.some(m => m.id === l.materialId)) && saved.requests.some(q => q.id === r.requestId))
      || !saved.issues.every(i => validDay(i.date) && positive(i.quantity) && saved.materials.some(m => m.id === i.materialId))) throw new Error('저장된 자재·입출고 자료의 형식을 확인할 수 없습니다.');
    return saved;
  }
  const state = createERP(now);
  if (saved?.version !== 1 || !Array.isArray(saved.requests)) return state;
  // Old user records always win; do not attach sample receipts to a colliding ID.
  if (saved.requests.some(r => state.requests.some(sample => sample.id === r.id))) {
    state.requests = []; state.receipts = []; state.issues = [];
  }
  const materialLink = item => {
    let material = state.materials.find(m => normal(m.name) === normal(item.name) && normal(m.spec) === normal(item.spec));
    if (!material) { material = { id: nextId('MT', state.materials), code: `OLD-${state.materials.length + 1}`, name: item.name || '이전 미입력 자재', spec: item.spec || '이전 미입력 규격', unit: 'EA', vendorId: '', price: Number(item.price) || 1 }; state.materials.push(material); }
    return { ...item, materialId: material.id, unit: 'EA' };
  };
  const link = r => {
    let vendor = state.vendors.find(v => normal(v.name) === normal(r.supplier));
    if (!vendor && r.supplier) { vendor = { id: nextId('VN', state.vendors), name: r.supplier, contact: '', phone: '', email: '', note: '이전 시연 자료' }; state.vendors.push(vendor); }
    return { ...r, supplierId: vendor?.id || '', items: r.items.map(materialLink) };
  };
  const old = saved.requests.map(r => ({ ...link(r), submissions: (r.submissions || []).map(link), ...(r.approvedSnapshot ? { approvedSnapshot: link(r.approvedSnapshot) } : {}) }));
  return { ...state, requests: [...state.requests.filter(r => !old.some(o => o.id === r.id)), ...old] };
}
