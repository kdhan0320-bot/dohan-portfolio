import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import * as calendar from '../src/utils/calendar.js';

const source = await readFile(new URL('../src/components/ui/DatePickerDialog.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });
const element = (type, props, key) => ({ type, props, key });
function picker(value = '', inline = false) {
  let cursor = 0, effects = [], tree, closed = 0;
  const hooks = [], chosen = [], buttons = new Map();
  const props = { open: true, value, referenceDate: '2026-09-27', label: '마감일 선택', onSelect: date => chosen.push(date), onClose: () => closed++ };
  const react = {
    useId: () => 'date-title',
    useState(initial) { const i = cursor++; if (!(i in hooks)) hooks[i] = initial; return [hooks[i], value => { hooks[i] = value; }]; },
    useRef(initial) { const i = cursor++; return hooks[i] ||= { current: initial }; },
    useEffect(effect, deps) { const i = cursor++; if (!hooks[i] || deps.some((v, n) => v !== hooks[i][n])) effects.push(effect); hooks[i] = deps; },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, requestAnimationFrame: fn => { fn(); return 1; }, cancelAnimationFrame() {}, require(name) {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx: element, jsxs: element };
    if (name === '@mui/material') return { ...Object.fromEntries(['Button', 'Popover', 'IconButton'].map(k => [k, k])), useMediaQuery: () => inline };
    if (name.startsWith('@mui/icons-material/')) return { default: 'icon' };
    if (name === '../../utils/calendar') return calendar;
    throw new Error(name);
  } });
  function visit(node, cb) { if (Array.isArray(node)) return node.forEach(n => visit(n, cb)); if (!node || typeof node !== 'object') return; cb(node); visit(node.props?.children, cb); }
  function render() {
    cursor = 0; effects = []; tree = module.exports.default(props);
    visit(tree, node => { if (node.props?.ref) { const key = node.props['aria-label']; if (!buttons.has(key)) buttons.set(key, { focus() {}, closest() { return null; } }); node.props.ref(buttons.get(key)); } });
    effects.forEach(fn => fn());
  }
  function find(fn) { let result; visit(tree, n => { if (fn(n)) result = n; }); assert.ok(result); return result; }
  render(); render();
  return { chosen, closed: () => closed, find,
    click(label) { find(n => n.props?.['aria-label'] === label || n.props?.children === label).props.onClick(); render(); },
    change(label, value) { find(n => n.props?.['aria-label'] === label).props.onChange({ target: { value } }); render(); },
    move(label, key) { find(n => n.props?.['aria-label'] === label).props.onKeyDown({ key, preventDefault() {} }); render(); },
    reopen(value) { props.open = false; render(); props.value = value; props.open = true; render(); render(); },
  };
}
test('month/year exploration and cancellation leave the stored date unchanged', () => {
  const p = picker('2026-09-30'); p.click('다음 달'); p.change('연도', '2028'); p.change('월', '2');
  p.find(n => n.props?.['aria-label'] === '2028년 2월 29일');
  p.click('취소'); assert.deepEqual(p.chosen, []); assert.equal(p.closed(), 1);
  p.reopen('2026-09-30'); assert.equal(p.find(n => n.props?.['aria-label'] === '월').props.value, 9);
});
test('choosing and clearing dates each report exactly one value and close', () => {
  const p = picker(); p.click('2026년 9월 29일'); assert.deepEqual(p.chosen, ['2026-09-29']);
  p.click('날짜 비우기'); assert.deepEqual(p.chosen, ['2026-09-29', '']); assert.equal(p.closed(), 2);
});
test('keyboard movement crosses month boundaries without silently selecting a date', () => {
  const p = picker('2026-09-30'); p.move('2026년 9월 30일', 'ArrowRight');
  assert.equal(p.find(n => n.props?.['aria-label'] === '2026년 10월 1일').props.tabIndex, 0);
  assert.deepEqual(p.chosen, []);
  p.move('2026년 10월 1일', 'PageDown'); assert.equal(p.find(n => n.props?.['aria-label'] === '월').props.value, 11);
});
test('supported year limits do not render invalid date controls', () => {
  const p = picker('9999-12-31'); assert.equal(p.find(n => n.props?.['aria-label'] === '다음 달').props.disabled, true);
  p.click('9999년 12월 31일'); assert.deepEqual(p.chosen, ['9999-12-31']);
  p.reopen('0001-01-01'); assert.equal(p.find(n => n.props?.['aria-label'] === '이전 달').props.disabled, true);
  p.move('1년 1월 1일', 'ArrowLeft'); assert.equal(p.find(n => n.props?.['aria-label'] === '1년 1월 1일').props.tabIndex, 0);
});

for (const inline of [false, true]) test(`Escape cancels only the ${inline ? 'inline mobile' : 'anchored PC'} calendar`, () => {
  const p = picker('2026-09-30', inline);
  let prevented = 0, stopped = 0;
  p.find(n => n.props?.role === 'dialog').props.onKeyDown({ key: 'Escape', preventDefault() { prevented++; }, stopPropagation() { stopped++; } });
  assert.equal(p.closed(), 1);
  assert.deepEqual(p.chosen, []);
  assert.equal(prevented, 1);
  assert.equal(stopped, 1, 'Escape must not bubble to the company editor');
});
