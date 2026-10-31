export const STORAGE_KEY = 'purchase-workspace-demo-v1';
export const ROLES = { staff: '구매 담당자', manager: '팀장', director: '사장님' };
export const REVISION_SAMPLE_ID = 'DEMO-02';
export const STATUS = {
  draft: { label: '작성 중', tone: 'gray' },
  revision: { label: '보완 필요', tone: 'rose' },
  team: { label: '팀장 결재', tone: 'blue' },
  director: { label: '사장님 결재', tone: 'blue' },
  approved: { label: '발주 대기', tone: 'green' },
  ordered: { label: '발주 기록 완료', tone: 'gray' },
  rejected: { label: '반려', tone: 'rose' },
};
export const money = value => `${Number(value || 0).toLocaleString('ko-KR')}원`;
export const amount = request => Math.round(request.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0));
export const day = value => new Date(value).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
export const timestamp = value => new Date(value).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
export function dateInput(value = new Date()) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function owner(request) {
  return request.status === 'team' ? '팀장' : request.status === 'director' ? '사장님' : ['draft', 'revision', 'approved'].includes(request.status) ? '구매 담당자' : '처리 완료';
}
export const canReview = (request, role) => (request.status === 'team' && role === 'manager') || (request.status === 'director' && role === 'director');
export const canEdit = (request, role) => role === 'staff' && ['draft', 'revision'].includes(request.status);
// Older saved records have the actor but no structured rejection stage.
export function rejectionStep(request) {
  const event = [...(request.events || [])].reverse().find(e =>
    e.revision === request.revision && (e.action === 'reject' || (!e.action && e.message?.startsWith('반려 ·'))));
  if (!event) return null;
  if (event.stage === 'director') return 2;
  if (event.stage === 'team') return 1;
  return event.actor === ROLES.director ? 2 : event.actor === ROLES.manager ? 1 : null;
}
export function approvalSteps(request) {
  const labels = ['요청 정리', '팀장 결재', '사장님 결재', '발주 기록'];
  if (!request) return labels.map(label => ({ label, state: '', detail: '' }));
  const rejected = request.status === 'rejected';
  const current = rejected ? rejectionStep(request) : ['draft', 'revision'].includes(request.status) ? 0 : request.status === 'team' ? 1 : request.status === 'director' ? 2 : 3;
  return labels.map((label, index) => {
    if (request.status === 'ordered' || (current !== null && index < current)) return { label, state: 'complete', detail: '완료' };
    if (rejected) return { label, state: index === current ? 'rejected' : 'stopped', detail: index === current ? '반려' : current === null ? '진행 종료' : '진행하지 않음' };
    return { label, state: index === current ? 'current' : 'waiting', detail: index !== current ? '대기' : request.status === 'approved' ? '처리 대기' : ['team', 'director'].includes(request.status) ? '확인 대기' : STATUS[request.status].label };
  });
}
export function nextAction(request, role) {
  if (canReview(request, role)) return '결재 검토';
  if (role === 'staff' && request.status === 'approved') return '발주 준비';
  if (canEdit(request, role)) return request.status === 'revision' ? '내용 보완' : '이어서 작성';
  return '내용 확인';
}
export function emptyRequest() {
  return { title: '', department: '운영지원팀', purpose: '', needBy: '', supplier: '', source: '', items: [{ name: '', spec: '', quantity: '', price: '' }] };
}
export function validate(request) {
  const errors = {};
  if (!request.title.trim()) errors.title = '요청 제목을 입력해 주세요.';
  if (!request.department.trim()) errors.department = '요청 부서를 입력해 주세요.';
  if (!request.purpose.trim()) errors.purpose = '구매가 필요한 이유를 입력해 주세요.';
  const parsedDate = new Date(`${request.needBy}T12:00:00`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(request.needBy) || Number.isNaN(parsedDate.getTime()) || dateInput(parsedDate) !== request.needBy) errors.needBy = '필요한 날짜를 선택해 주세요.';
  if (!request.supplier.trim()) errors.supplier = '검토할 거래처를 입력해 주세요.';
  if (!request.items.length) errors.items = '품목을 한 개 이상 입력해 주세요.';
  request.items.forEach((item, i) => {
    if (!item.name.trim()) errors[`item-${i}-name`] = '품목명을 입력해 주세요.';
    if (!item.spec.trim()) errors[`item-${i}-spec`] = '규격을 입력해 주세요.';
    const quantity = Number(item.quantity), price = Number(item.price);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10000) errors[`item-${i}-quantity`] = '수량은 1~10,000의 정수여야 합니다.';
    if (!Number.isInteger(price) || price < 1 || price > 100000000) errors[`item-${i}-price`] = '부가세 포함 단가를 1~100,000,000원으로 입력해 주세요.';
  });
  return errors;
}
const normalize = value => value.toLowerCase().replace(/\s/g, '');
export function similarRequests(request, requests) {
  return requests.filter(other => other.id !== request.id && ['team', 'director', 'approved'].includes(other.status) &&
    request.items.some(item => item.name.trim() && other.items.some(candidate => normalize(item.name) === normalize(candidate.name))));
}
// This demo extracts only explicit sample text. It is not a language-model call.
export function makeDemoDraft(source) {
  const result = emptyRequest();
  const text = source.trim();
  result.source = text;
  const named = text.match(/(?:품목|물품)\s*[:：]\s*([^\n,]+)/);
  const name = named?.[1]?.trim() || ['모니터', '사무용 의자', '키보드', '케이블', '서류 보관함'].find(word => text.includes(word)) || '';
  const quantity = text.match(/(?:수량\s*[:：]?\s*)?(\d+)\s*(?:대|개|세트|박스)/)?.[1] || '';
  const spec = text.match(/(?:규격)\s*[:：]\s*([^\n,]+)/)?.[1]?.trim() || text.match(/\d+\s*인치/)?.[0] || '';
  const price = text.match(/(?:단가|개당|대당)\s*[:：]?\s*([\d,]+)\s*원/)?.[1]?.replace(/,/g, '') || '';
  const needBy = text.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '';
  const purpose = text.match(/(?:사유|용도)\s*[:：]\s*([^\n]+)/)?.[1]?.trim() || '';
  const supplier = text.match(/(?:거래처|업체)\s*[:：]\s*([^\n,]+)/)?.[1]?.trim() || '';
  return { ...result, title: name ? `${name} 구매 요청` : '', department: '', purpose, needBy, supplier, items: [{ name, spec, quantity, price }] };
}
export const SAMPLE_SOURCE = '안녕하세요. 신규 입사자용 모니터 2대 구매를 요청드립니다.\n규격: 27인치 QHD\n개당 280,000원으로 안내받았습니다.\n거래처: 가람오피스 (가상 업체)\n사유: 신규 입사자 2명의 업무 환경 구성\n납기일은 확인 후 전달하겠습니다.';

// Older demo records used the next revision on a revision-request event.
// Interpret that label for display without replacing the user's saved records.
export function eventRevisionLabel(event) {
  const advances = event.action === 'revise' || event.action === 'amend';
  const legacyAdvance = !event.action && /^(보완 요청 ·|승인 내용 변경 시작)/.test(event.message);
  if (advances || legacyAdvance) {
    const reviewed = legacyAdvance ? Math.max(1, event.revision - 1) : event.revision;
    return `${reviewed}차 검토 → ${event.nextRevision || event.revision}차 작성`;
  }
  return `${event.revision}차`;
}
export function transition(request, action, role, payload = {}) {
  const now = payload.at || new Date().toISOString();
  const result = { ...request, updatedAt: now, events: [...request.events] };
  let message;
  if (action === 'submit') {
    if (!canEdit(request, role)) throw new Error('작성 중이거나 보완 중인 요청만 제출할 수 있습니다.');
    if (Object.keys(validate(request)).length) throw new Error('요청 정보의 필수 항목을 확인해 주세요.');
    result.status = 'team';
    result.submittedAt = now;
    result.submissions = [...(request.submissions || []), { revision: request.revision, at: now, title: request.title, department: request.department, purpose: request.purpose, needBy: request.needBy, supplier: request.supplier, items: structuredClone(request.items) }];
    message = `${request.revision}차 요청서 제출 · 팀장 결재 요청`;
  } else if (['approve', 'revise', 'reject'].includes(action)) {
    if (!canReview(request, role)) throw new Error('현재 결재 차례의 담당자만 처리할 수 있습니다.');
    if (action !== 'approve' && !payload.reason?.trim()) throw new Error('요청자가 확인할 사유를 입력해 주세요.');
    if (action === 'approve') {
      result.status = role === 'manager' ? 'director' : 'approved';
      if (role === 'director') result.approvedSnapshot = { revision: request.revision, at: now, title: request.title, department: request.department, purpose: request.purpose, needBy: request.needBy, supplier: request.supplier, items: structuredClone(request.items) };
      message = role === 'manager' ? '팀장 승인 · 사장님 결재로 전달' : '최종 승인 · 발주 준비 가능';
    } else {
      result.status = action === 'revise' ? 'revision' : 'rejected';
      result.reason = payload.reason.trim();
      if (action === 'revise') result.revision = request.revision + 1;
      message = `${action === 'revise' ? '보완 요청' : '반려'} · ${payload.reason.trim()}`;
    }
  } else if (action === 'amend') {
    if (role !== 'staff' || request.status !== 'approved') throw new Error('발주 전 승인된 요청만 변경할 수 있습니다.');
    result.status = 'draft';
    result.revision = request.revision + 1;
    message = '승인 내용 변경 시작 · 기존 승인은 보관하고 재결재 필요';
  } else if (action === 'order') {
    if (role !== 'staff' || request.status !== 'approved') throw new Error('최종 승인된 요청만 발주 기록을 남길 수 있습니다.');
    if (!payload.reference?.trim()) throw new Error('발주 기록 메모를 입력해 주세요.');
    result.status = 'ordered';
    result.order = { at: now, reference: payload.reference.trim(), simulated: true };
    message = `발주 기록 시연 · ${payload.reference.trim()} (실제 전송 없음)`;
  } else throw new Error('지원하지 않는 처리입니다.');
  result.events.push({ at: now, actor: ROLES[role], message, action, revision: request.revision,
    ...(action === 'reject' ? { stage: request.status } : {}),
    ...(result.revision !== request.revision ? { nextRevision: result.revision } : {}) });
  return result;
}
export function createSamples(now = new Date()) {
  const ago = days => new Date(new Date(now).getTime() - days * 86400000).toISOString();
  const future = days => dateInput(new Date(new Date(now).getTime() + days * 86400000));
  const samples = [
    ['PR-0108', '신규 입사자 모니터 구매', 'team', '모니터', '27인치 QHD', 2, 280000, '신규 입사자 2명의 업무 환경 구성', 1, 6, '가람오피스'],
    ['PR-0107', '회의실 연결 케이블 교체', 'revision', '케이블', 'USB-C / HDMI', 4, 35000, '회의실 영상 연결 불량으로 케이블 교체', 2, 3, '바른테크'],
    ['PR-0106', '보관 공간 서류함 구매', 'approved', '서류 보관함', 'A4 · 5단', 3, 62000, '계약 서류의 부서별 보관 공간 마련', 3, 4, '가람오피스'],
    ['PR-0105', '업무용 의자 교체', 'director', '사무용 의자', '높이 조절형 · 회색', 4, 180000, '노후 의자 4개 교체', 4, 8, '나무오피스'],
    ['PR-0104', '공용 키보드 추가 구매', 'draft', '키보드', '유선 · 한글 배열', 3, 42000, '공용 업무 공간의 입력 장치 마련', 1, 10, '바른테크'],
    ['PR-0103', '소모품 보관함 추가', 'ordered', '서류 보관함', 'A4 · 3단', 2, 48000, '공용 소모품 정리', 6, 2, '나무오피스'],
    ['PR-0102', '예비 모니터 구매', 'rejected', '모니터', '24인치 FHD', 1, 180000, '공용 예비 장비 확보', 7, 7, '가람오피스'],
  ];
  const requests = samples.map(([id, title, status, name, spec, quantity, price, purpose, days, need, supplier]) => {
    let req = { id, title, status: 'draft', department: '운영지원팀', purpose, needBy: future(need), supplier: `${supplier} (가상 업체)`, source: `품목: ${name}\n규격: ${spec}\n수량: ${quantity}개\n사유: ${purpose}`, items: [{ name, spec, quantity, price }], revision: 1, createdAt: ago(days + 2), updatedAt: ago(days), events: [{ at: ago(days + 2), actor: '구매 담당자', message: '샘플 요청서 작성', revision: 1 }], submissions: [] };
    if (status !== 'draft') req = transition(req, 'submit', 'staff', { at: ago(days + 1) });
    if (status === 'revision') req = transition(req, 'revise', 'manager', { at: ago(days), reason: '회의실 장비에 맞는 케이블 길이를 규격에 추가해 주세요.' });
    if (status === 'rejected') req = transition(req, 'reject', 'manager', { at: ago(days), reason: '사용 가능한 예비 장비가 있어 이번 구매는 진행하지 않습니다.' });
    if (['director', 'approved', 'ordered'].includes(status)) req = transition(req, 'approve', 'manager', { at: ago(days + 0.5) });
    if (['approved', 'ordered'].includes(status)) req = transition(req, 'approve', 'director', { at: ago(days) });
    if (status === 'ordered') req = transition(req, 'order', 'staff', { at: ago(days - 0.5), reference: '샘플 발주 기록' });
    return req;
  });
  return ensureRevisionSample(requests, now);
}
// Add one identifiable demo without resetting or replacing any saved request.
export function ensureRevisionSample(requests, now = new Date()) {
  if (requests.some(r => r.id === REVISION_SAMPLE_ID)) return requests;
  const at = days => new Date(new Date(now).getTime() - days * 86400000).toISOString();
  const purpose = '공용 프린터 4대의 토너 교체';
  let request = { ...emptyRequest(), id: REVISION_SAMPLE_ID, title: '공용 프린터 토너 추가 구매', status: 'draft', revision: 1,
    supplier: '한결사무 (가상 업체)', purpose, needBy: dateInput(new Date(new Date(now).getTime() + 7 * 86400000)),
    source: `품목: 토너\n규격: 흑백 · 표준 용량\n수량: 4개\n단가: 48,000원\n거래처: 한결사무 (가상 업체)\n사유: ${purpose}`,
    items: [{ name: '토너', spec: '흑백 · 표준 용량', quantity: 4, price: 48000 }],
    createdAt: at(6), updatedAt: at(6), submissions: [], events: [{ at: at(6), actor: ROLES.staff, message: '재결재 비교용 샘플 작성', revision: 1 }] };
  request = transition(request, 'submit', 'staff', { at: at(5) });
  request = transition(request, 'approve', 'manager', { at: at(4.5) });
  request = transition(request, 'approve', 'director', { at: at(4) });
  request = transition(request, 'amend', 'staff', { at: at(2) });
  request.items = [{ ...request.items[0], quantity: 6 }];
  request.purpose = '프린터 2대 추가 설치에 따라 총 6대의 토너 교체';
  request = transition(request, 'submit', 'staff', { at: at(1) });
  return [request, ...requests];
}
export function orderMessage(request) {
  const approved = request.approvedSnapshot || request;
  return `제목: [발주 요청] ${approved.title}\n\n${approved.supplier} 담당자님, 안녕하세요.\n아래 품목의 발주 내용을 확인 부탁드립니다.\n\n${approved.items.map(item => `• ${item.name} / ${item.spec} / ${item.quantity}개 / 단가 ${money(item.price)}`).join('\n')}\n총 금액: ${money(amount(approved))} (부가세 포함)\n희망 납기일: ${approved.needBy}\n\n납기 가능 여부를 회신 부탁드립니다.\n\n[포트폴리오 시연용 문안 · 실제 발주 아님]`;
}
