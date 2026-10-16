import { APPLICATION_MUTABLE_FIELDS } from './applicationPayload.js';

const PREFIX = 'galpirok-application-draft-v1:';
const BOOLEAN_FIELDS = new Set(['resume_submitted', 'portfolio_submitted']);

// Only editable fields belong in a draft; record IDs and ownership never do.
export function applicationFormValues(input = {}) {
  return Object.fromEntries(APPLICATION_MUTABLE_FIELDS.map(field => [
    field,
    BOOLEAN_FIELDS.has(field) ? input[field] === true : typeof input[field] === 'string' ? input[field] : '',
  ]));
}

export function sameApplicationValues(left, right) {
  return APPLICATION_MUTABLE_FIELDS.every(field => left[field] === right[field]);
}

export function createApplicationDraftStore(getStorage = () => null) {
  const memory = new Map();
  const keyFor = (scope, recordId) => scope && recordId ? `${PREFIX}${encodeURIComponent(scope)}:${encodeURIComponent(recordId)}` : null;
  function storageFor(scope) {
    // Sample records reset on refresh, so their drafts must reset with them.
    if (!scope?.startsWith('user:')) return null;
    try { return getStorage(); } catch { return null; }
  }
  function read(scope, recordId) {
    const key = keyFor(scope, recordId);
    if (!key) return null;
    let saved = memory.get(key);
    if (!memory.has(key)) {
      try { saved = JSON.parse(storageFor(scope)?.getItem(key) || 'null'); } catch { return null; }
    }
    if (saved?.version !== 1 || saved.scope !== scope || saved.recordId !== recordId || !saved.values || typeof saved.values !== 'object' || Array.isArray(saved.values)) return null;
    const values = applicationFormValues(saved.values);
    if (saved.baseline && sameApplicationValues(values, applicationFormValues(saved.baseline))) return null;
    memory.set(key, { ...saved, values });
    return values;
  }
  function write(scope, recordId, values, baseline) {
    const key = keyFor(scope, recordId);
    if (!key) return;
    const draft = { version: 1, scope, recordId, values: applicationFormValues(values), ...(baseline ? { baseline: applicationFormValues(baseline) } : {}) };
    memory.set(key, draft);
    try { storageFor(scope)?.setItem(key, JSON.stringify(draft)); } catch { /* Keep the in-memory fallback. */ }
  }
  function clear(scope, recordId, expectedValues) {
    const key = keyFor(scope, recordId);
    if (!key) return false;
    const current = expectedValues ? read(scope, recordId) : null;
    // A completed request must not clear newer input from a reopened panel.
    if (current && !sameApplicationValues(current, applicationFormValues(expectedValues))) return false;
    // Retain a tombstone if storage removal fails, so discarded input stays gone in this tab.
    memory.set(key, null);
    try { storageFor(scope)?.removeItem(key); } catch { /* Storage may be unavailable. */ }
    return true;
  }
  function clearSample() {
    for (const key of memory.keys()) {
      if (key.startsWith(`${PREFIX}sample:`)) memory.delete(key);
    }
  }
  return { read, write, clear, clearSample };
}

export const applicationDraftStore = createApplicationDraftStore(() => window.sessionStorage);
