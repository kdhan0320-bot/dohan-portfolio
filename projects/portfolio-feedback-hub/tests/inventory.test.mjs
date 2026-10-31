import test from 'node:test';
import assert from 'node:assert/strict';
import { createERP, stock, incoming, orderProgress, placeOrder, receiveOrder, issueMaterial, saveMaterial, saveVendor, migrateWorkspace, duplicateRequests, validateCatalogRequest } from '../src/procurement/inventory.js';
import { createSamples, dateInput } from '../src/procurement/model.js';
import { revisionChanges } from '../src/procurement/revisions.js';

const today = dateInput();
const receipt = (quantity, extra = {}) => ({ date: today, lines: [{ index: 0, quantity }], ...extra });
const issue = (quantity, extra = {}) => ({ materialId: 'MT-0001', date: today, quantity, department: '검증 부서', recipient: '가상 담당자', ...extra });
test('sample balances distinguish received stock from outstanding purchase orders', () => {
  const s = createERP();
  assert.equal(stock(s, 'MT-0001'), 1); assert.equal(incoming(s, 'MT-0001'), 2);
  assert.equal(stock(s, 'MT-0002'), 7); assert.equal(incoming(s, 'MT-0002'), 0);
  assert.equal(orderProgress(s, s.requests[0]).key, 'partial');
  assert.equal(orderProgress(s, s.requests[1]).key, 'done');
  assert.ok(revisionChanges(s.requests.at(-1)).changes.some(c => c.before === '2 EA' && c.after === '3 EA'));
});
test('only approved orders can be placed and placement never increases stock', () => {
  const s = createERP(), payload = { date: today, expectedDate: today };
  assert.throws(() => placeOrder(s, 'PR-2005', 'staff', payload));
  assert.throws(() => placeOrder(s, 'PR-2003', 'manager', payload));
  assert.throws(() => placeOrder(s, 'PR-2003', 'staff', { ...payload, date: '2000-01-01' }));
  assert.throws(() => placeOrder(s, 'PR-2003', 'staff', { ...payload, expectedDate: '2026-02-30' }));
  const next = placeOrder(s, 'PR-2003', 'staff', payload);
  assert.equal(next.requests.find(r => r.id === 'PR-2003').status, 'ordered');
  assert.equal(stock(next, 'MT-0003'), 0); assert.equal(incoming(next, 'MT-0003'), 6);
  assert.equal(s.requests.find(r => r.id === 'PR-2003').status, 'approved');
  assert.throws(() => placeOrder(next, 'PR-2003', 'staff', payload));
});
test('partial and final receipts update remaining quantity and inventory exactly once', () => {
  let s = createERP();
  s = receiveOrder(s, 'PR-2001', 'staff', receipt(1, { token: 'receipt-test' }));
  assert.equal(stock(s, 'MT-0001'), 2); assert.equal(incoming(s, 'MT-0001'), 1);
  assert.throws(() => receiveOrder(s, 'PR-2001', 'staff', receipt(1, { token: 'receipt-test' })));
  s = receiveOrder(s, 'PR-2001', 'staff', receipt(1));
  assert.equal(stock(s, 'MT-0001'), 3); assert.equal(incoming(s, 'MT-0001'), 0);
  assert.equal(orderProgress(s, s.requests[0]).key, 'done');
  assert.throws(() => receiveOrder(s, 'PR-2001', 'staff', receipt(1)));
});
test('invalid receipt quantities, dates, roles and duplicate rows leave original state unchanged', () => {
  const s = createERP(), before = structuredClone(s);
  for (const value of [-1, 0, 1.5, 3, 'NaN']) assert.throws(() => receiveOrder(s, 'PR-2001', 'staff', receipt(value)));
  for (const date of ['2099-01-01', '2000-01-01', '2026-02-30']) assert.throws(() => receiveOrder(s, 'PR-2001', 'staff', receipt(1, { date })));
  assert.throws(() => receiveOrder(s, 'PR-2001', 'director', receipt(1)));
  assert.throws(() => receiveOrder(s, 'PR-2003', 'staff', receipt(1)));
  assert.throws(() => receiveOrder(s, 'PR-2001', 'staff', receipt(1, { lines: [{ index: 0, quantity: 1 }, { index: 0, quantity: 1 }] })));
  assert.deepEqual(s, before);
});
test('issues require a recipient, available quantity and stock at the historical date', () => {
  const s = createERP();
  for (const value of [-1, 0, 1.5, 2]) assert.throws(() => issueMaterial(s, 'staff', issue(value)));
  assert.throws(() => issueMaterial(s, 'staff', issue(1, { recipient: ' ' })));
  assert.throws(() => issueMaterial(s, 'staff', issue(1, { date: '2000-01-01' })));
  assert.throws(() => issueMaterial(s, 'staff', issue(1, { date: '2099-01-01' })));
  assert.throws(() => issueMaterial(s, 'manager', issue(1)));
  const next = issueMaterial(s, 'staff', issue(1, { token: 'issue-test' }));
  assert.equal(stock(next, 'MT-0001'), 0);
  assert.throws(() => issueMaterial(next, 'staff', issue(1, { token: 'issue-test' })));
  assert.equal(stock(s, 'MT-0001'), 1);
});
test('catalog records validate identity and edits preserve historic approvals', () => {
  const s = createERP(), snapshot = structuredClone(s.requests[0].approvedSnapshot);
  assert.throws(() => saveVendor(s, 'staff', { name: s.vendors[0].name }));
  assert.throws(() => saveVendor(s, 'staff', { name: '가상 신규', email: 'invalid' }));
  let next = saveVendor(s, 'staff', { name: '가상 신규', email: 'new@example.com' });
  const vendor = next.vendors.at(-1);
  const form = { code: 'SEN-TEST', name: '검증 센서', spec: '시연 규격', vendorId: vendor.id, price: 1000 };
  next = saveMaterial(next, 'staff', form);
  const material = next.materials.at(-1);
  assert.equal(stock(next, material.id), 0);
  assert.throws(() => saveMaterial(next, 'staff', form));
  assert.throws(() => saveMaterial(next, 'director', { ...form, code: 'NEW-2' }));
  next = saveMaterial(next, 'staff', { ...s.materials[0], code: 'CHANGED', name: '수정 이름' }, s.materials[0].id);
  assert.equal(next.materials[0].code, s.materials[0].code);
  assert.deepEqual(next.requests[0].approvedSnapshot, snapshot);
});
test('duplicate check uses material IDs, current submitted items and outstanding orders', () => {
  const s = createERP(), candidate = { id: 'NEW', items: [{ materialId: 'MT-0001' }] };
  assert.deepEqual(duplicateRequests(s, candidate).map(r => r.id), ['PR-2001', 'PR-2007']);
  assert.ok(!duplicateRequests(s, { ...candidate, items: [{ materialId: 'MT-0002' }] }).some(r => r.id === 'PR-2002'));
  s.requests.at(-1).items[0].materialId = 'MT-0004';
  assert.deepEqual(duplicateRequests(s, candidate).map(r => r.id), ['PR-2001']);
  const r = structuredClone(s.requests[2]); r.items.push({ ...r.items[0] });
  assert.ok(validateCatalogRequest(s, r)['item-1-material']);
});
test('migration keeps prior requests and histories without attaching unrelated sample receipts', () => {
  const old = createSamples(), history = structuredClone(old[0].events);
  const migrated = migrateWorkspace({ version: 1, requests: old });
  assert.deepEqual(migrated.requests.find(r => r.id === old[0].id).events, history);
  assert.ok(migrated.requests.find(r => r.id === old[0].id).items[0].materialId);
  assert.equal(migrateWorkspace(migrated), migrated);
  old[0].id = 'PR-2001';
  const collision = migrateWorkspace({ version: 1, requests: old });
  assert.equal(collision.requests.length, old.length);
  assert.equal(collision.receipts.length, 0); assert.equal(collision.issues.length, 0);
  assert.throws(() => migrateWorkspace({ ...migrated, receipts: [{ id: 'BAD', date: today, lines: [{ quantity: -1 }] }] }));
  assert.throws(() => migrateWorkspace({ ...migrated, materials: undefined }));
});
