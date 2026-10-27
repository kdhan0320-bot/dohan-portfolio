import test from 'node:test';
import assert from 'node:assert/strict';
import { observeVisibleViewport } from '../src/utils/visibleViewport.js';

function environment() {
  const viewport = Object.assign(new EventTarget(), { height: 844, offsetTop: 0, scale: 1 });
  const win = Object.assign(new EventTarget(), { innerWidth: 390, innerHeight: 844, visualViewport: viewport });
  const doc = Object.assign(new EventTarget(), { activeElement: null });
  const attributes = new Map();
  const styles = new Map();
  const root = { ownerDocument: doc, style: { setProperty: (k, v) => styles.set(k, v), removeProperty: k => styles.delete(k) },
    toggleAttribute: (k, v) => v ? attributes.set(k, '') : attributes.delete(k), removeAttribute: k => attributes.delete(k) };
  const stop = observeVisibleViewport(win, root);
  return { win, viewport, doc, styles, stop, keyboard: () => attributes.has('data-keyboard-open'),
    focus(editable) { doc.activeElement = { matches: () => editable }; doc.dispatchEvent(new Event('focusin')); },
    resize(height, layout = false) { viewport.height = height; if (layout) win.innerHeight = height; viewport.dispatchEvent(new Event('resize')); } };
}

test('visual-only keyboard shrink preserves the focused editor and remaining viewport', () => {
  const e = environment(); e.focus(true); e.resize(440);
  assert.equal(e.keyboard(), true); assert.equal(e.styles.get('--visible-height'), '440px');
  e.viewport.offsetTop = 75; e.viewport.dispatchEvent(new Event('scroll'));
  assert.equal(e.styles.get('--visible-top'), '75px');
  e.focus(false); assert.equal(e.keyboard(), true, 'save-button focus must not move the button before its click');
  e.resize(844); assert.equal(e.keyboard(), false);
});
test('resizes-content keyboards and repeated openings retain the original height', () => {
  const e = environment(); e.focus(true); e.resize(420, true); assert.equal(e.keyboard(), true);
  e.resize(844, true); assert.equal(e.keyboard(), false);
  e.resize(400, true); assert.equal(e.keyboard(), true);
});
test('address bar changes and pinch zoom do not trigger keyboard layout', () => {
  const e = environment(); e.focus(true); e.resize(760); assert.equal(e.keyboard(), false);
  e.viewport.scale = 2; e.resize(420); assert.equal(e.keyboard(), false);
  assert.equal(e.styles.get('--visible-height'), '844px');
});
test('desktop, rotation, and cleanup discard obsolete viewport state', () => {
  const e = environment(); e.focus(true); e.resize(400); e.win.innerWidth = 1280; e.win.innerHeight = 640;
  e.win.dispatchEvent(new Event('resize')); assert.equal(e.keyboard(), false);
  assert.equal(e.styles.get('--visible-height'), '640px');
  e.win.innerWidth = 844; e.win.innerHeight = 390; e.viewport.height = 390;
  e.win.dispatchEvent(new Event('resize')); assert.equal(e.keyboard(), false);
  e.stop(); assert.equal(e.styles.size, 0); e.resize(200); assert.equal(e.styles.size, 0);
});
test('unsupported visual viewport is a safe no-op', () => {
  assert.doesNotThrow(() => observeVisibleViewport({}, {})());
});
