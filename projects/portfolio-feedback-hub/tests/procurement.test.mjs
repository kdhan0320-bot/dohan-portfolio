import test from 'node:test';
import assert from 'node:assert/strict';
import { createSamples, transition, validate, makeDemoDraft, SAMPLE_SOURCE, amount, similarRequests, orderMessage, eventRevisionLabel, approvalSteps, rejectionStep, ensureRevisionSample, REVISION_SAMPLE_ID } from '../src/procurement/model.js';
import { revisionChanges } from '../src/procurement/revisions.js';

const draft = () => createSamples(new Date('2026-10-30T12:00:00+09:00')).find(r => r.status === 'draft');
test('request → manager → director → order enforces roles and sequence', () => {
  let r = draft();
  assert.throws(() => transition(r, 'submit', 'manager'));
  r = transition(r, 'submit', 'staff');
  assert.throws(() => transition(r, 'approve', 'director'));
  assert.throws(() => transition(r, 'order', 'staff', { reference: 'test' }));
  r = transition(r, 'approve', 'manager');
  assert.equal(r.status, 'director');
  assert.throws(() => transition(r, 'approve', 'manager'));
  r = transition(r, 'approve', 'director');
  assert.equal(r.approvedSnapshot.revision, 1);
  assert.throws(() => transition(r, 'order', 'manager', { reference: 'test' }));
  assert.throws(() => transition(r, 'order', 'staff', { reference: ' ' }));
  r = transition(r, 'order', 'staff', { reference: '시연 검증' });
  assert.equal(r.status, 'ordered');
  assert.equal(r.order.simulated, true);
  assert.throws(() => transition(r, 'order', 'staff', { reference: 'duplicate' }));
});
test('revision requires reason, creates new submission and preserves prior data', () => {
  let r = transition(draft(), 'submit', 'staff');
  assert.throws(() => transition(r, 'revise', 'manager', { reason: ' ' }));
  r = transition(r, 'revise', 'manager', { reason: '규격 확인' });
  assert.equal(r.revision, 2);
  assert.equal(r.events.at(-1).revision, 1);
  assert.equal(r.events.at(-1).nextRevision, 2);
  assert.equal(eventRevisionLabel(r.events.at(-1)), '1차 검토 → 2차 작성');
  const previous = structuredClone(r.submissions[0]);
  r.items[0].spec = '새 규격';
  r = transition(r, 'submit', 'staff');
  assert.deepEqual(r.submissions[0], previous);
  assert.equal(r.submissions[1].items[0].spec, '새 규격');
  assert.equal(r.status, 'team');
  assert.equal(eventRevisionLabel(r.events.at(-1)), '2차');
});
test('approved content changes require reapproval and order uses new approval snapshot', () => {
  let r = createSamples().find(r => r.status === 'approved');
  const oldAmount = amount(r.approvedSnapshot);
  r = transition(r, 'amend', 'staff');
  assert.equal(eventRevisionLabel(r.events.at(-1)), '1차 검토 → 2차 작성');
  r.items[0].price = 1000;
  assert.equal(amount(r.approvedSnapshot), oldAmount);
  assert.throws(() => transition(r, 'order', 'staff', { reference: 'bypass' }));
  r = transition(r, 'submit', 'staff');
  r = transition(r, 'approve', 'manager');
  r = transition(r, 'approve', 'director');
  assert.equal(amount(r.approvedSnapshot), 3000);
  assert.match(orderMessage(r), /3,000원/);
  assert.match(orderMessage(r), /실제 발주 아님/);
});
test('rejection is final, requires a reason, and cannot be ordered', () => {
  let r = transition(draft(), 'submit', 'staff');
  assert.throws(() => transition(r, 'reject', 'manager'));
  r = transition(r, 'reject', 'manager', { reason: '기존 물품 사용' });
  assert.equal(r.status, 'rejected');
  assert.throws(() => transition(r, 'submit', 'staff'));
  assert.throws(() => transition(r, 'order', 'staff', { reference: 'bad' }));
});
test('validation rejects missing fields, impossible dates and invalid amounts', () => {
  const r = draft();
  assert.deepEqual(validate(r), {});
  r.needBy = '2026-02-31';
  r.items[0].quantity = -2;
  r.items[0].price = 0;
  assert.ok(validate(r).needBy);
  assert.ok(validate(r)['item-0-quantity']);
  assert.ok(validate(r)['item-0-price']);
  r.items = [];
  assert.ok(validate(r).items);
});
test('draft extraction does not invent supplier, dates or unit price', () => {
  const parsed = makeDemoDraft(SAMPLE_SOURCE);
  assert.equal(parsed.items[0].name, '모니터');
  assert.equal(parsed.items[0].price, '280000');
  assert.equal(parsed.items[0].quantity, '2');
  assert.equal(parsed.needBy, '');
  assert.equal(parsed.department, '');
  const unknown = makeDemoDraft('예산 300,000원으로 구매할 물건을 찾아주세요.');
  assert.equal(unknown.items[0].price, '');
  assert.equal(unknown.supplier, '');
  assert.equal(unknown.items[0].name, '');
});
test('duplicate suggestion excludes self and closed requests without changing state', () => {
  const requests = createSamples();
  const candidate = { ...draft(), items: [{ name: ' 모니터 ', spec: 'different', quantity: 1, price: 1 }] };
  const matches = similarRequests(candidate, requests);
  assert.deepEqual(matches.map(r => r.id), ['PR-0108']);
  assert.equal(requests.find(r => r.id === 'PR-0108').status, 'team');
});

test('legacy revision history is readable without rewriting saved records', () => {
  const old = { revision: 3, message: '보완 요청 · 규격 확인', actor: '팀장' };
  const original = structuredClone(old);
  assert.equal(eventRevisionLabel(old), '2차 검토 → 3차 작성');
  assert.deepEqual(old, original);
  assert.equal(eventRevisionLabel({ revision: 2, message: '반려 · 기존 물품 사용' }), '2차');
});

test('resubmission compares changed fields against the earlier revision and preserves records', () => {
  let r = transition(transition(draft(), 'submit', 'staff'), 'revise', 'manager', { reason: '납기와 수량 확인' });
  r.needBy = '2026-12-01';
  r.supplier = '새 가상 업체';
  r.purpose = '공용 공간 확장';
  r.items[0].quantity = '5';
  r.items[0].price = '40000';
  r = transition(r, 'submit', 'staff');
  const original = structuredClone(r);
  const result = revisionChanges(r);
  assert.equal(result.previous.revision, 1);
  assert.deepEqual(result.changes.map(row => row.label), ['희망 납기일', '거래처', '구매 사유', '키보드 · 수량', '키보드 · 단가', '품의 합계']);
  assert.deepEqual(result.changes.at(-1), { label: '품의 합계', before: '126,000원', after: '200,000원' });
  assert.deepEqual(r, original);
  r = transition(r, 'revise', 'manager', { reason: '규격 재확인' });
  r.items[0].spec = '무선';
  assert.equal(revisionChanges(r).previous.revision, 2);
  assert.deepEqual(revisionChanges(r).changes, [{ label: '키보드 · 규격', before: '유선 · 한글 배열', after: '무선' }]);
});

test('item reordering and numeric input strings are not shown as changes', () => {
  let r = draft();
  r.items.push({ name: '마우스', spec: '무선', quantity: 2, price: 30000 });
  r = transition(transition(r, 'submit', 'staff'), 'revise', 'manager', { reason: '확인' });
  r.items.reverse();
  r.items = r.items.map(item => ({ ...item, quantity: String(item.quantity), price: String(item.price) }));
  assert.deepEqual(revisionChanges(r).changes, []);
  r.items = r.items.filter(item => item.name !== '키보드');
  assert.deepEqual(revisionChanges(r).changes.map(row => row.label), ['품목 제외', '품의 합계']);
  r.items.push({ name: '모니터', spec: '27인치', quantity: 1, price: 280000 });
  assert.deepEqual(revisionChanges(r).changes.map(row => row.label), ['품목 추가', '품목 제외', '품의 합계']);
});

test('unchanged duplicate-name items are paired before edited rows', () => {
  let r = draft();
  r.items.push({ ...r.items[0], quantity: 1 });
  r = transition(transition(r, 'submit', 'staff'), 'revise', 'manager', { reason: '수량 확인' });
  r.items.reverse();
  r.items[1].quantity = 4;
  assert.deepEqual(revisionChanges(r).changes[0], { label: '키보드 (2번) · 수량', before: '3개', after: '4개' });
  assert.equal(revisionChanges(r).changes.length, 2);
});

test('first revisions and missing historical snapshots never invent a baseline', () => {
  assert.deepEqual(revisionChanges(draft()), { previous: null, changes: [] });
  assert.deepEqual(revisionChanges({ ...draft(), revision: 3 }), { previous: null, changes: [] });
});

test('rejection stops at the actual manager or director, never at request drafting', () => {
  const submitted = transition(draft(), 'submit', 'staff');
  const managerRejected = transition(submitted, 'reject', 'manager', { reason: '기존 물품 사용' });
  assert.equal(rejectionStep(managerRejected), 1);
  assert.deepEqual(approvalSteps(managerRejected).map(s => s.detail), ['완료', '반려', '진행하지 않음', '진행하지 않음']);
  const directorRejected = transition(transition(submitted, 'approve', 'manager'), 'reject', 'director', { reason: '구매 보류' });
  assert.equal(rejectionStep(directorRejected), 2);
  assert.deepEqual(approvalSteps(directorRejected).map(s => s.state), ['complete', 'complete', 'rejected', 'stopped']);
  assert.equal(approvalSteps(directorRejected).some(s => s.state === 'current'), false);
});

test('legacy rejection actors are respected and missing history is not guessed', () => {
  const r = { ...draft(), status: 'rejected', events: [{ revision: 1, actor: '사장님', message: '반려 · 예산 재검토' }] };
  const original = structuredClone(r);
  assert.equal(rejectionStep(r), 2);
  assert.deepEqual(r, original);
  assert.equal(rejectionStep({ ...r, events: [] }), null);
  assert.equal(rejectionStep({ ...r, revision: 2 }), null);
  assert.ok(approvalSteps({ ...r, events: [] }).every(s => s.detail === '진행 종료'));
});

test('new approval rounds restart while ordered requests have no pending steps', () => {
  const samples = createSamples();
  assert.ok(approvalSteps(samples.find(r => r.status === 'ordered')).every(s => s.detail === '완료'));
  const changed = transition(samples.find(r => r.status === 'approved'), 'amend', 'staff');
  assert.deepEqual(approvalSteps(changed).map(s => s.detail), ['작성 중', '대기', '대기', '대기']);
});

test('revision demo exposes real differences and cannot bypass reapproval', () => {
  const sample = createSamples().find(r => r.id === REVISION_SAMPLE_ID);
  assert.deepEqual(validate(sample), {});
  assert.equal(sample.revision, 2);
  assert.equal(sample.status, 'team');
  assert.equal(amount(sample.approvedSnapshot), 192000);
  assert.equal(amount(sample), 288000);
  assert.equal(sample.submissions.length, 2);
  assert.deepEqual(revisionChanges(sample).changes.map(c => c.label), ['구매 사유', '토너 · 수량', '품의 합계']);
  assert.throws(() => transition(sample, 'order', 'staff', { reference: 'skip' }));
});

test('adding the example preserves saved requests and never resets a used example', () => {
  const saved = [draft()];
  const original = structuredClone(saved);
  const upgraded = ensureRevisionSample(saved);
  assert.deepEqual(saved, original);
  assert.equal(upgraded[1], saved[0]);
  upgraded[0] = transition(upgraded[0], 'approve', 'manager');
  assert.equal(ensureRevisionSample(upgraded), upgraded);
  assert.equal(upgraded[0].status, 'director');
  assert.equal(upgraded.filter(r => r.id === REVISION_SAMPLE_ID).length, 1);
});
