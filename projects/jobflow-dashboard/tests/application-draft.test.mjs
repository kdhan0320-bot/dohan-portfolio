import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import { createApplicationDraftStore, applicationFormValues, sameApplicationValues } from '../src/utils/applicationDraftStore.js';

const hookSource = await readFile(new URL('../src/hooks/useApplicationDraft.js', import.meta.url), 'utf8');
const { code: hookCode } = await transform(hookSource, { loader: 'js', format: 'cjs' });
function mountedDraft(store, initial) {
  const state = [];
  let cursor = 0;
  const module = { exports: {} };
  vm.runInNewContext(hookCode, { module, exports: module.exports, require: name => name === 'react' ? {
    useEffect() {},
    useRef(value) { const key = cursor++; return state[key] ??= { current: value }; },
    useState(value) { const key = cursor++; if (!(key in state)) state[key] = typeof value === 'function' ? value() : value; return [state[key], next => { state[key] = typeof next === 'function' ? next(state[key]) : next; }]; },
  } : { applicationDraftStore: store, applicationFormValues, sameApplicationValues } });
  return () => { cursor = 0; return module.exports.default({ scope: 'sample', recordId: 'company-a', initial }); };
}

test('a saved status rebases the real editor draft and cancelling keeps the new saved status', () => {
  const store = createApplicationDraftStore();
  const initial = { company_name: '검증 회사', status: '관심', memo: '저장 메모' };
  const render = mountedDraft(store, initial);
  render().change('memo', '미완성 메모');
  render().acceptSavedFields({ status: '면접 예정' });
  assert.equal(render().form.memo, '미완성 메모');
  assert.equal(render().form.status, '면접 예정');
  assert.equal(store.read('sample', 'company-a').status, '면접 예정');
  assert.equal(render().dirty, true);
  render().reset();
  assert.equal(render().form.memo, '저장 메모');
  assert.equal(render().form.status, '면접 예정');
  assert.equal(render().dirty, false);
  assert.equal(store.read('sample', 'company-a'), null);
});

test('a late status response preserves newer input after reopening and never resurrects discarded input', () => {
  const store = createApplicationDraftStore();
  const initial = { company_name: '검증 회사', status: '관심', memo: '저장 메모' };
  const old = mountedDraft(store, initial);
  old().change('memo', '이전 초안');
  const reopened = mountedDraft(store, initial);
  reopened().change('memo', '새로운 초안');
  reopened().change('status', '불합격');
  old().acceptSavedFields({ status: '면접 예정' });
  assert.equal(store.read('sample', 'company-a').memo, '새로운 초안');
  assert.equal(store.read('sample', 'company-a').status, '불합격');
  store.clear('sample', 'company-a');
  old().acceptSavedFields({ status: '합격' });
  assert.equal(store.read('sample', 'company-a'), null);
});

function storageDouble() {
  const records = new Map();
  return {
    records,
    getItem: key => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value),
    removeItem: key => records.delete(key),
  };
}

test('restores a draft by record and owner without mixing creation, companies, sample, or accounts', () => {
  const store = createApplicationDraftStore();
  store.write('user:one', 'new', { company_name: 'new company' });
  store.write('user:one', 'company-a', { company_name: 'company A' });
  store.write('user:one', 'company-b', { company_name: 'company B' });
  store.write('user:two', 'company-a', { company_name: 'other account' });
  store.write('sample', 'company-a', { company_name: 'sample' });
  assert.equal(store.read('user:one', 'new').company_name, 'new company');
  assert.equal(store.read('user:one', 'company-a').company_name, 'company A');
  assert.equal(store.read('user:one', 'company-b').company_name, 'company B');
  assert.equal(store.read('user:two', 'company-a').company_name, 'other account');
  assert.equal(store.read('sample', 'company-a').company_name, 'sample');
  assert.equal(store.read(null, 'company-a'), null);
});

test('account drafts survive a new store instance; sample drafts reset on page reload', () => {
  const storage = storageDouble();
  const first = createApplicationDraftStore(() => storage);
  first.write('user:one', 'new', { company_name: 'pending account entry', deadline: '2026-11-20' });
  first.write('sample', 'new', { company_name: 'pending sample entry' });
  assert.equal(storage.records.size, 1);
  const afterReload = createApplicationDraftStore(() => storage);
  assert.equal(afterReload.read('user:one', 'new').deadline, '2026-11-20');
  assert.equal(afterReload.read('sample', 'new'), null);
  assert.equal(afterReload.read('user:two', 'new'), null);
});

test('explicit clearing affects only the matching owner and record', () => {
  const storage = storageDouble();
  const store = createApplicationDraftStore(() => storage);
  store.write('user:one', 'company-a', { memo: 'to discard' });
  store.write('user:one', 'company-b', { memo: 'keep company B' });
  store.write('user:two', 'company-a', { memo: 'keep account two' });
  store.clear('user:one', 'company-a');
  assert.equal(store.read('user:one', 'company-a'), null);
  assert.equal(createApplicationDraftStore(() => storage).read('user:one', 'company-a'), null);
  assert.equal(store.read('user:one', 'company-b').memo, 'keep company B');
  assert.equal(store.read('user:two', 'company-a').memo, 'keep account two');
});

test('storage restrictions preserve the in-memory draft and allow explicit discard', () => {
  const storage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); }, removeItem() { throw new Error('blocked'); } };
  const store = createApplicationDraftStore(() => storage);
  assert.equal(store.read('user:one', 'new'), null);
  store.write('user:one', 'new', { company_name: 'still recoverable' });
  assert.equal(store.read('user:one', 'new').company_name, 'still recoverable');
  store.clear('user:one', 'new');
  assert.equal(store.read('user:one', 'new'), null);
});

test('draft values cannot replace record ownership and reject unexpected field types', () => {
  const values = applicationFormValues({ id: 'other', user_id: 'other user', company_name: 'kept', deadline: null, memo: { unsafe: true }, resume_submitted: 'true', portfolio_submitted: true });
  assert.equal(values.id, undefined);
  assert.equal(values.user_id, undefined);
  assert.equal(values.company_name, 'kept');
  assert.equal(values.deadline, '');
  assert.equal(values.memo, '');
  assert.equal(values.resume_submitted, false);
  assert.equal(values.portfolio_submitted, true);
});

test('corrupt or mismatched storage is ignored instead of restoring another record', () => {
  const storage = storageDouble();
  const store = createApplicationDraftStore(() => storage);
  store.write('user:one', 'company-a', { company_name: 'company A' });
  const [key] = storage.records.keys();
  const draft = JSON.parse(storage.records.get(key));
  storage.records.set(key, JSON.stringify({ ...draft, scope: 'user:two' }));
  assert.equal(createApplicationDraftStore(() => storage).read('user:one', 'company-a'), null);
  storage.records.set(key, JSON.stringify({ ...draft, recordId: 'company-b' }));
  assert.equal(createApplicationDraftStore(() => storage).read('user:one', 'company-a'), null);
  storage.records.set(key, 'not JSON');
  assert.equal(createApplicationDraftStore(() => storage).read('user:one', 'company-a'), null);
});

test('manually reverted fields are not later restored as stale edits', () => {
  const initial = applicationFormValues({ company_name: 'original', status: '관심' });
  const store = createApplicationDraftStore();
  store.write('sample', 'company-a', { ...initial, company_name: 'edited' }, initial);
  assert.equal(store.read('sample', 'company-a').company_name, 'edited');
  store.write('sample', 'company-a', initial, initial);
  assert.equal(store.read('sample', 'company-a'), null);
  assert.ok(sameApplicationValues(initial, applicationFormValues({ ...initial, id: 'metadata ignored' })));
});

test('an older completed save cannot clear newer input from a reopened panel', () => {
  const store = createApplicationDraftStore();
  const submitted = { company_name: 'submitted name' };
  store.write('sample', 'new', submitted);
  store.write('sample', 'new', { company_name: 'newer name' });
  assert.equal(store.clear('sample', 'new', submitted), false);
  assert.equal(store.read('sample', 'new').company_name, 'newer name');
  assert.equal(store.clear('sample', 'new', { company_name: 'newer name' }), true);
  assert.equal(store.read('sample', 'new'), null);
});

test('discarded input stays gone in the current tab when only storage removal fails', () => {
  const storage = storageDouble();
  storage.removeItem = () => { throw new Error('removal blocked'); };
  const store = createApplicationDraftStore(() => storage);
  store.write('user:one', 'new', { company_name: 'discarded' });
  store.clear('user:one', 'new');
  assert.equal(store.read('user:one', 'new'), null);
  store.write('user:one', 'new', { company_name: 'fresh input' });
  assert.equal(store.read('user:one', 'new').company_name, 'fresh input');
});

test('resetting sample drafts keeps account drafts intact', () => {
  const store = createApplicationDraftStore();
  store.write('sample', 'new', { company_name: 'sample new' });
  store.write('sample', 'company-a', { company_name: 'sample edit' });
  store.write('user:one', 'new', { company_name: 'account draft' });
  store.clearSample();
  assert.equal(store.read('sample', 'new'), null);
  assert.equal(store.read('sample', 'company-a'), null);
  assert.equal(store.read('user:one', 'new').company_name, 'account draft');
});
