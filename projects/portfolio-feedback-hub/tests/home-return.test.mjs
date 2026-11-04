import test from 'node:test';
import assert from 'node:assert/strict';
import { homeReturn, listOrigin, savedListPosition } from '../src/procurement/listNavigation.js';

const source = {
  path: '/', key: 'home-entry', target: '/requests/PR-2004/edit',
  focusId: 'home-task-PR-2004', y: 317,
};

test('returning from a direct edit restores its home entry even after a reload', () => {
  const calls = [];
  const location = { pathname: source.target, search: '', state: { listOrigin: source } };
  const back = homeReturn(location, (...args) => calls.push(args));
  assert.equal(back.direct, true);
  back.go();
  assert.deepEqual(calls, [[-1]]);
  assert.deepEqual(savedListPosition(source.key), { path: '/', y: 317, focusId: source.focusId });
});

test('a detail opened after editing returns to home without reopening the editor', () => {
  const calls = [];
  const origin = listOrigin(source, '/');
  const location = { pathname: '/requests/PR-2004', search: '', state: { listOrigin: origin } };
  const back = homeReturn(location, (...args) => calls.push(args));
  assert.equal(back.direct, false);
  back.go();
  assert.deepEqual(calls, [['/', { replace: true, state: { restoreList: origin } }]]);
});

test('direct URLs and filtered lists keep their own return destinations', () => {
  for (const state of [null, { listOrigin: { path: '/requests?q=sensor' } }]) {
    assert.equal(homeReturn({ pathname: source.target, search: '', state }, () => {}), null);
  }
});
