import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { STORAGE_KEY, ROLES, STATUS, canEdit, createSamples, ensureRevisionSample, transition } from './model';

const Context = createContext(null);
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { requests: createSamples(), role: 'staff', storage: true };
    const value = JSON.parse(raw);
    if (value.version !== 1 || !Array.isArray(value.requests) || !value.requests.every(r =>
      r && typeof r.id === 'string' && STATUS[r.status] && ['title', 'department', 'purpose', 'needBy', 'supplier', 'source', 'createdAt', 'updatedAt'].every(k => typeof r[k] === 'string') &&
      Number.isInteger(r.revision) && Array.isArray(r.events) && Array.isArray(r.submissions) && Array.isArray(r.items) && r.items.every(i => typeof i.name === 'string' && typeof i.spec === 'string'))) {
      return { requests: createSamples(), role: 'staff', storage: true, notice: '저장된 시연 자료를 읽을 수 없어 기본 샘플을 불러왔습니다.' };
    }
    return { requests: ensureRevisionSample(value.requests), role: ROLES[value.role] ? value.role : 'staff', storage: true };
  } catch { return { requests: createSamples(), role: 'staff', storage: false, notice: '브라우저 저장을 사용할 수 없습니다. 새로고침하면 변경 내용이 사라집니다.' }; }
}

export function WorkspaceProvider({ children }) {
  const [initial] = useState(load);
  const [requests, setRequests] = useState(initial.requests);
  const [role, setRole] = useState(initial.role);
  const [storage, setStorage] = useState(initial.storage);
  const [notice, setNotice] = useState(initial.notice || '');
  const live = useRef({ requests, role });
  live.current = { requests, role };
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 8000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!storage) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, requests, role })); }
    catch { setStorage(false); setNotice('저장 공간을 사용할 수 없어 현재 화면에서만 유지됩니다. 새로고침 전 내용을 확인해 주세요.'); }
  }, [requests, role, storage]);
  const update = next => { live.current.requests = next; setRequests(next); };
  const save = (form, id) => {
    const { requests: current, role: currentRole } = live.current;
    const old = id ? current.find(r => r.id === id) : null;
    if (currentRole !== 'staff' || (id && (!old || !canEdit(old, currentRole)))) throw new Error('구매 담당자만 작성 중이거나 보완할 요청을 수정할 수 있습니다.');
    const now = new Date().toISOString();
    const fields = Object.fromEntries(['title', 'department', 'purpose', 'needBy', 'supplier', 'source', 'items'].map(k => [k, structuredClone(form[k])]));
    const record = old ? { ...old, ...fields, updatedAt: now } : {
      ...fields, id: `PR-${String(Math.max(108, ...current.map(r => Number(r.id.split('-')[1]) || 0)) + 1).padStart(4, '0')}`,
      status: 'draft', revision: 1, createdAt: now, updatedAt: now, events: [{ at: now, actor: '구매 담당자', message: '요청서 작성', revision: 1 }], submissions: [],
    };
    update(old ? current.map(r => r.id === id ? record : r) : [record, ...current]);
    return record;
  };
  const act = (id, action, payload) => {
    const { requests: current, role: currentRole } = live.current;
    const old = current.find(r => r.id === id);
    if (!old) throw new Error('요청을 찾을 수 없습니다.');
    const next = transition(old, action, currentRole, payload);
    update(current.map(r => r.id === id ? next : r));
    return next;
  };
  const changeRole = value => { live.current.role = value; setRole(value); };
  const reset = () => { update(createSamples()); changeRole('staff'); setNotice('기본 샘플로 초기화했습니다.'); };
  return <Context.Provider value={{ requests, role, setRole: changeRole, storage, notice, setNotice, save, act, reset }}>{children}</Context.Provider>;
}
// Shared state is local to this browser; the role switch is a demo, not authentication.
// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspace() { return useContext(Context); }
