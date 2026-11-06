import test from 'node:test';
import assert from 'node:assert/strict';
import { originReturn, listOrigin, savedListPosition } from '../src/procurement/listNavigation.js';

const source = {
  path: '/', key: 'home-entry', target: '/requests/PR-2004/edit',
  focusId: 'home-task-PR-2004', y: 317,
};

test('returning from a direct edit restores its home entry even after a reload', () => {
  const calls = [];
  const location = { pathname: source.target, search: '', state: { listOrigin: source } };
  const back = originReturn(location, (...args) => calls.push(args), '/');
  assert.equal(back.direct, true);
  back.go();
  assert.deepEqual(calls, [[-1]]);
  assert.deepEqual(savedListPosition(source.key), { path: '/', y: 317, focusId: source.focusId });
});

test('a detail opened after editing returns to home without reopening the editor', () => {
  const calls = [];
  const origin = listOrigin(source, '/');
  const location = { pathname: '/requests/PR-2004', search: '', state: { listOrigin: origin } };
  const back = originReturn(location, (...args) => calls.push(args), '/');
  assert.equal(back.direct, false);
  back.go();
  assert.deepEqual(calls, [['/', { replace: true, state: { restoreList: origin } }]]);
});

test('direct URLs and filtered lists keep their own return destinations', () => {
  for (const state of [null, { listOrigin: { path: '/requests?q=sensor' } }]) {
    assert.equal(originReturn({ pathname: source.target, search: '', state }, () => {}, '/'), null);
  }
});

test('a source request returns to the same order entry and restores its source link', () => {
  const path = '/orders/PR-2001';
  const target = '/requests/PR-2001';
  const origin = { path, target, key: 'order-entry', focusId: 'order-source-PR-2001', y: 142 };
  const location = { pathname: target, search: '', state: { listOrigin: origin } };
  const calls = [];
  originReturn(location, (...args) => calls.push(args), path).go();
  assert.deepEqual(calls, [[-1]]);
  assert.deepEqual(savedListPosition(origin.key), listOrigin(origin, path));
  assert.equal(originReturn(location, () => {}, '/orders/PR-2002'), null);
});

test('a link to material history, including its fragment, returns directly to the home slip', () => {
  const pathname = '/materials/MT-0001';
  const hash = '#movement-history';
  const origin = { ...source, target: pathname + hash, focusId: 'home-sensor-history' };
  const location = { pathname, search: '', hash, state: { listOrigin: origin } };
  assert.equal(originReturn(location, () => {}, '/').direct, true);
});
