import test from 'node:test';
import assert from 'node:assert/strict';
import { createRecordDraftStore, recordDraftValues } from '../src/utils/recordDraftStore.js';

const blank = recordDraftValues('interview');
const answer = { ...blank, question: '지원한 이유는?', answer: '작성 중인 긴 답변' };

test('route unmount and re-entry can recover the same question and answer synchronously', () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'new', answer, blank);
  assert.deepEqual(store.read('sample', 'interview', 'new').values, answer);
  assert.equal(store.latest('sample', 'interview').recordId, 'new');
});

test('interview, checklist, records and account scopes never share drafts', () => {
  const store = createRecordDraftStore();
  store.write('user:a', 'interview', 'record-1', answer, blank);
  store.write('user:a', 'checklist', 'record-1', { title: '준비 중' }, {});
  store.write('user:a', 'interview', 'record-2', { ...answer, answer: '다른 답변' }, blank);
  assert.equal(store.read('user:b', 'interview', 'record-1'), null);
  assert.equal(store.read('sample', 'interview', 'record-1'), null);
  assert.equal(store.read('user:a', 'checklist', 'record-1').values.title, '준비 중');
  assert.equal(store.read('user:a', 'interview', 'record-1').values.answer, answer.answer);
  assert.equal(store.latest('user:a', 'interview').recordId, 'record-2');
});

test('drafts contain editable fields only and cannot be changed through returned objects', () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'new', { ...answer, id: 'unexpected', user_id: 'other-user' }, blank);
  const recovered = store.read('sample', 'interview', 'new');
  assert.equal('user_id' in recovered.values, false);
  assert.equal('id' in recovered.values, false);
  recovered.values.answer = 'mutated outside the store';
  assert.equal(store.read('sample', 'interview', 'new').values.answer, answer.answer);
});

test('returning all values to their original state removes the unsaved draft', () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'note-1', answer, blank);
  store.write('sample', 'interview', 'note-1', blank, blank);
  assert.equal(store.hasDrafts(), false);
});

test('successful save clears its draft only after the record save completes', async () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'new', answer, blank);
  let finish;
  const save = store.save('sample', 'interview', 'new', answer, () => new Promise(resolve => { finish = resolve; }));
  assert.equal(store.hasDrafts(), true);
  finish({ id: 'saved-note' });
  assert.deepEqual(await save, { id: 'saved-note' });
  assert.equal(store.hasDrafts(), false);
});

test('failed save keeps every draft field available for retry', async () => {
  const store = createRecordDraftStore();
  store.write('user:a', 'interview', 'note-1', answer, blank);
  await assert.rejects(store.save('user:a', 'interview', 'note-1', answer, async () => { throw new Error('network unavailable'); }), /network unavailable/);
  assert.deepEqual(store.read('user:a', 'interview', 'note-1').values, answer);
});

test('a slow save does not clear newer input entered after reopening the editor', async () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'new', answer, blank);
  let finish;
  const save = store.save('sample', 'interview', 'new', answer, () => new Promise(resolve => { finish = resolve; }));
  store.write('sample', 'interview', 'new', { ...answer, answer: '더 작성한 답변' }, blank);
  finish();
  await save;
  assert.equal(store.read('sample', 'interview', 'new').values.answer, '더 작성한 답변');
});

test('explicit discard clears only the selected record', () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'new', answer, blank);
  store.write('sample', 'interview', 'existing', answer, blank);
  store.clear('sample', 'interview', 'new');
  assert.equal(store.read('sample', 'interview', 'new'), null);
  assert.equal(store.latest('sample', 'interview').recordId, 'existing');
});

test('sample reset removes sample interview and checklist drafts without touching account drafts', () => {
  const store = createRecordDraftStore();
  store.write('sample', 'interview', 'new', answer, blank);
  store.write('sample', 'checklist', 'new', { title: '샘플 준비' }, {});
  store.write('user:a', 'interview', 'new', answer, blank);
  store.clearSample();
  assert.equal(store.latest('sample', 'interview'), null);
  assert.equal(store.latest('sample', 'checklist'), null);
  assert.ok(store.latest('user:a', 'interview'));
});

test('account transition or logout clears only that account and a fresh tab has no personal drafts', () => {
  const store = createRecordDraftStore();
  store.write('user:a', 'interview', 'new', answer, blank);
  store.write('user:a', 'checklist', 'new', { title: '개인 준비' }, {});
  store.clearScope('user:a');
  assert.equal(store.hasDrafts(), false);
  assert.equal(createRecordDraftStore().read('user:a', 'interview', 'new'), null);
});

test('draft subscription updates recovery notices and unload protection on write, discard and reset', () => {
  const store = createRecordDraftStore();
  const states = [];
  const unsubscribe = store.subscribe(() => states.push(store.hasDrafts()));
  store.write('sample', 'interview', 'new', answer, blank);
  store.clear('sample', 'interview', 'new');
  store.write('sample', 'checklist', 'new', { title: '준비' }, {});
  store.clearSample();
  unsubscribe();
  store.write('sample', 'interview', 'new', answer, blank);
  assert.deepEqual(states, [true, false, true, false]);
});

test('anonymous or unsupported forms cannot create a draft', () => {
  const store = createRecordDraftStore();
  store.write(null, 'interview', 'new', answer, blank);
  store.write('sample', 'password', 'new', { password: 'never store this' }, {});
  assert.equal(store.hasDrafts(), false);
});
