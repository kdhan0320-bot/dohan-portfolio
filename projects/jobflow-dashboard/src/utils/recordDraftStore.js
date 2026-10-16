const FIELDS = {
  interview: { application_id: null, question: '', answer: '', related_project: '', importance: '보통', is_reviewed: false },
  checklist: { application_id: null, title: '', category: '서류' },
  documentHelper: { type: '', role: '', company: '', project: '', experience: '', result: '' },
};

export function recordDraftValues(kind, input = {}) {
  const fields = FIELDS[kind];
  if (!fields) return null;
  return Object.fromEntries(Object.entries(fields).map(([field, fallback]) => [field,
    typeof fallback === 'boolean' ? input[field] === true :
      typeof input[field] === 'string' ? input[field] : fallback,
  ]));
}

const sameValues = (left, right) => Object.keys(left).every(field => left[field] === right[field]);

// Answers can contain personal information. Keep drafts only in this tab's memory,
// never localStorage/sessionStorage, and clear them when the account changes.
export function createRecordDraftStore() {
  const drafts = new Map();
  const listeners = new Set();
  let revision = 0;
  const keyFor = (scope, kind, recordId) => scope && FIELDS[kind] && recordId
    ? JSON.stringify([scope, kind, recordId]) : null;
  const notify = () => { revision += 1; listeners.forEach(listener => listener()); };
  const copy = draft => draft ? { ...draft, values: { ...draft.values }, baseline: { ...draft.baseline } } : null;

  function read(scope, kind, recordId) {
    return copy(drafts.get(keyFor(scope, kind, recordId)));
  }
  function latest(scope, kind) {
    let result = null;
    for (const draft of drafts.values()) {
      if (draft.scope === scope && draft.kind === kind && (!result || draft.revision > result.revision)) result = draft;
    }
    return copy(result);
  }
  function clear(scope, kind, recordId, expectedValues) {
    const key = keyFor(scope, kind, recordId);
    const current = drafts.get(key);
    // An older save completing must not erase input made after reopening the editor.
    if (current && expectedValues && !sameValues(current.values, recordDraftValues(kind, expectedValues))) return false;
    if (drafts.delete(key)) notify();
    return true;
  }
  function write(scope, kind, recordId, values, baseline) {
    const key = keyFor(scope, kind, recordId);
    if (!key) return;
    const cleanValues = recordDraftValues(kind, values);
    const cleanBaseline = recordDraftValues(kind, baseline);
    if (sameValues(cleanValues, cleanBaseline)) { clear(scope, kind, recordId); return; }
    drafts.set(key, { scope, kind, recordId, values: cleanValues, baseline: cleanBaseline, revision: revision + 1 });
    notify();
  }
  function clearScope(scope) {
    let changed = false;
    for (const [key, draft] of drafts) {
      if (draft.scope === scope) { drafts.delete(key); changed = true; }
    }
    if (changed) notify();
  }
  async function save(scope, kind, recordId, values, saveRecord) {
    const result = await saveRecord();
    clear(scope, kind, recordId, values);
    return result;
  }
  return {
    read, latest, write, clear, clearScope, save,
    clearSample: () => clearScope('sample'),
    hasDrafts: () => drafts.size > 0,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
    getRevision: () => revision,
  };
}

export const recordDraftStore = createRecordDraftStore();
