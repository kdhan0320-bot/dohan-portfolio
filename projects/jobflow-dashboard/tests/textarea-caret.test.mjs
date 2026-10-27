import test from 'node:test';
import assert from 'node:assert/strict';
import { caretScrollDelta, revealTextareaCaret } from '../src/utils/textareaCaret.js';

test('shrinking the visible fields reveals the caret with space below its line', () => {
  assert.equal(caretScrollDelta(67, 370, 495, 28), 165);
  assert.equal(caretScrollDelta(67, 678, 575, 28), 0);
});
test('a caret in the middle or above the visible area is handled without jumping to the end', () => {
  assert.equal(caretScrollDelta(100, 400, 210, 24), 0);
  assert.equal(caretScrollDelta(100, 400, 50, 24), -62);
});
test('resize never moves fields when the user focuses a save button or another control', () => {
  const container = { scrollTop: 120 };
  revealTextareaCaret({ ownerDocument: { activeElement: {} } }, container);
  assert.equal(container.scrollTop, 120);
});
