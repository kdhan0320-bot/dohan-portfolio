import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { STORAGE_KEY, ROLES, STATUS, canEdit, transition } from './model';
import { createERP, migrateWorkspace, validateCatalogRequest, placeOrder, receiveOrder, issueMaterial, saveMaterial, saveVendor } from './inventory';

const Context = createContext(null);
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { data: createERP(), role: 'staff', storage: true };
    const value = JSON.parse(raw);
    if (![1, 2].includes(value.version) || !Array.isArray(value.requests) || !value.requests.every(r =>
      r && typeof r.id === 'string' && STATUS[r.status] && ['title', 'department', 'purpose', 'needBy', 'supplier', 'source', 'createdAt', 'updatedAt'].every(k => typeof r[k] === 'string') &&
      Number.isInteger(r.revision) && Array.isArray(r.events) && Array.isArray(r.submissions) && Array.isArray(r.items) && r.items.every(i => typeof i.name === 'string' && typeof i.spec === 'string'))) {
      return { data: createERP(), role: 'staff', storage: false, notice: '이전 자료를 읽을 수 없어 임시 샘플을 열었습니다. 저장된 원본은 덮어쓰지 않습니다.' };
    }
    return { data: migrateWorkspace(value), role: ROLES[value.role] ? value.role : 'staff', storage: true, notice: value.version === 1 ? '부품 구매·입출고 샘플을 추가했습니다. 이전 요청·결재 기록은 그대로 유지됩니다.' : '' };
  } catch { return { data: createERP(), role: 'staff', storage: false, notice: '브라우저 저장을 사용할 수 없습니다. 새로고침하면 변경 내용이 사라집니다.' }; }
}

export function WorkspaceProvider({ children }) {
  const [initial] = useState(load);
  const [data, setData] = useState(initial.data);
  const [role, setRole] = useState(initial.role);
  const [storage, setStorage] = useState(initial.storage);
  const [notice, setNotice] = useState(initial.notice || '');
  const live = useRef({ data, role });
  live.current = { data, role };
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 8000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!storage) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, version: 2, role })); }
    catch { setStorage(false); setNotice('저장 공간을 사용할 수 없어 현재 화면에서만 유지됩니다. 새로고침 전 내용을 확인해 주세요.'); }
  }, [data, role, storage]);
  const update = next => { live.current.data = next; setData(next); };
  const save = (form, id) => {
    const { data: currentData, role: currentRole } = live.current;
    const current = currentData.requests;
    const old = id ? current.find(r => r.id === id) : null;
    if (currentRole !== 'staff' || (id && (!old || !canEdit(old, currentRole)))) throw new Error('구매 담당자만 작성 중이거나 보완할 요청을 수정할 수 있습니다.');
    const now = new Date().toISOString();
    const fields = Object.fromEntries(['title', 'department', 'purpose', 'needBy', 'supplier', 'supplierId', 'source', 'items'].map(k => [k, structuredClone(form[k])]));
    const record = old ? { ...old, ...fields, updatedAt: now } : {
      ...fields, id: `PR-${String(Math.max(108, ...current.map(r => Number(r.id.split('-')[1]) || 0)) + 1).padStart(4, '0')}`,
      status: 'draft', revision: 1, createdAt: now, updatedAt: now, events: [{ at: now, actor: '구매 담당자', message: '요청서 작성', revision: 1 }], submissions: [],
    };
    update({ ...currentData, requests: old ? current.map(r => r.id === id ? record : r) : [record, ...current] });
    return record;
  };
  const act = (id, action, payload) => {
    const { data: currentData, role: currentRole } = live.current;
    const current = currentData.requests;
    const old = current.find(r => r.id === id);
    if (!old) throw new Error('요청을 찾을 수 없습니다.');
    if (action === 'order') {
      const next = placeOrder(currentData, id, currentRole, payload);
      update(next); return next.requests.find(r => r.id === id);
    }
    if (action === 'submit' && Object.keys(validateCatalogRequest(currentData, old)).length) throw new Error('등록 자재·업체와 필수 정보를 확인해 주세요.');
    const next = transition(old, action, currentRole, payload);
    update({ ...currentData, requests: current.map(r => r.id === id ? next : r) });
    return next;
  };
  const changeRole = value => { live.current.role = value; setRole(value); };
  const receive = (id, payload) => update(receiveOrder(live.current.data, id, live.current.role, payload));
  const issue = payload => update(issueMaterial(live.current.data, live.current.role, payload));
  const putMaterial = (form, id) => { const next = saveMaterial(live.current.data, live.current.role, form, id); update(next); return id ? next.materials.find(m => m.id === id) : next.materials.at(-1); };
  const putVendor = (form, id) => { const next = saveVendor(live.current.data, live.current.role, form, id); update(next); return id ? next.vendors.find(v => v.id === id) : next.vendors.at(-1); };
  const reset = () => { update(createERP()); changeRole('staff'); setStorage(true); setNotice('부품 구매·입출고 샘플로 초기화했습니다.'); };
  return <Context.Provider value={{ ...data, data, role, setRole: changeRole, storage, notice, setNotice, save, act, receive, issue, putMaterial, putVendor, reset }}>{children}</Context.Provider>;
}
// Shared state is local to this browser; the role switch is a demo, not authentication.
// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspace() { return useContext(Context); }
