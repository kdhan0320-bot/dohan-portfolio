import test from 'node:test';
import assert from 'node:assert/strict';
import { caretScrollDelta, revealTextareaCaret, observeTextareaLayout } from '../src/utils/textareaCaret.js';

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

function editorFixture() {
  const frames = new Map();
  let nextFrame = 0;
  let observerCallback;
  let disconnected = false;
  const win = new EventTarget();
  win.visualViewport = new EventTarget();
  win.requestAnimationFrame = callback => { frames.set(++nextFrame, callback); return nextFrame; };
  win.cancelAnimationFrame = id => frames.delete(id);
  win.ResizeObserver = class {
    constructor(callback) { observerCallback = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  const input = Object.assign(new EventTarget(), {
    clientWidth: 330, value: '긴 답변', selectionStart: 4, selectionEnd: 4,
    scrollHeight: 700, style: {}, ownerDocument: { defaultView: win, activeElement: null },
  });
  const container = { scrollTop: 120, clientHeight: 320 };
  return {
    win, input, container,
    flush() { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()); },
    resize() { observerCallback(); },
    get pending() { return frames.size; },
    get disconnected() { return disconnected; },
  };
}

test('width-only reflow fits the answer before both caret passes, even in a fixed-height editor', () => {
  const f = editorFixture();
  const measured = [];
  const observer = observeTextareaLayout(f.input, f.container, () => measured.push(f.input.style.height));
  f.flush(); f.flush(); measured.length = 0;
  f.input.clientWidth = 270;
  f.input.scrollHeight = 1500;
  f.resize(); f.flush(); f.flush();
  assert.deepEqual(measured, ['1500px', '1500px']);
  assert.equal(f.container.scrollTop, 120);
  observer.disconnect();
});

test('caret navigation without text input schedules a settled pass and preserves selection', () => {
  const f = editorFixture();
  let calls = 0;
  const observer = observeTextareaLayout(f.input, f.container, () => calls++);
  f.flush(); f.flush(); calls = 0;
  f.input.selectionStart = 2; f.input.selectionEnd = 2;
  f.input.dispatchEvent(new Event('select'));
  f.input.dispatchEvent(new Event('keyup'));
  assert.equal(f.pending, 1);
  f.flush(); f.flush();
  assert.equal(calls, 2);
  assert.equal(f.input.selectionEnd, 2);
  observer.disconnect();
});

test('typing and viewport changes are coalesced; closing removes queued work and listeners', () => {
  const f = editorFixture();
  const observer = observeTextareaLayout(f.input, f.container);
  f.input.dispatchEvent(new Event('input'));
  f.win.visualViewport.dispatchEvent(new Event('resize'));
  f.win.dispatchEvent(new Event('resize'));
  assert.equal(f.pending, 1);
  f.flush();
  assert.equal(f.pending, 1);
  observer.disconnect();
  f.input.dispatchEvent(new Event('select'));
  f.win.visualViewport.dispatchEvent(new Event('resize'));
  assert.equal(f.pending, 0);
  assert.equal(f.disconnected, true);
});
