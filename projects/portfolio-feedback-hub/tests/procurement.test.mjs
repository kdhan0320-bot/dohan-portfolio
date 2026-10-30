import test from 'node:test';
import assert from 'node:assert/strict';
import { createSamples, transition, validate, makeDemoDraft, SAMPLE_SOURCE, amount, similarRequests, orderMessage } from '../src/procurement/model.js';

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
  const previous = structuredClone(r.submissions[0]);
  r.items[0].spec = '새 규격';
  r = transition(r, 'submit', 'staff');
  assert.deepEqual(r.submissions[0], previous);
  assert.equal(r.submissions[1].items[0].spec, '새 규격');
  assert.equal(r.status, 'team');
});
test('approved content changes require reapproval and order uses new approval snapshot', () => {
  let r = createSamples().find(r => r.status === 'approved');
  const oldAmount = amount(r.approvedSnapshot);
  r = transition(r, 'amend', 'staff');
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
