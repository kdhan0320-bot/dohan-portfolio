import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import * as calendar from '../src/utils/calendar.js';
import { deadlineLabel } from '../src/utils/dates.js';
import { DEMO_APPLICATIONS, DEMO_TODAY } from '../src/constants/index.js';

// Exercise the page's actual handlers and effects. Browser layout, sticky
// navigation and native button keyboard activation are checked separately.
const source = await readFile(new URL('../src/pages/CalendarPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });
const element = (type, props, key) => ({ type, props, key });
const text = node => Array.isArray(node) ? node.map(text).join('')
  : typeof node === 'object' && node ? text(node.props?.children) : node == null ? '' : String(node);

function calendarPage({ compact = true, query = '' } = {}) {
  const hooks = [];
  let cursor = 0;
  let effects = [];
  let params = new URLSearchParams(query);
  let tree;
  const document = { body: {}, activeElement: null };
  const agenda = {
    focusCalls: [], scrollCalls: [],
    focus(options) { this.focusCalls.push(options); document.activeElement = this; },
    scrollIntoView(options) { this.scrollCalls.push(options); },
  };
  const days = new Map();
  const dependencies = {
    react: {
      useState(initial) {
        const index = cursor++;
        if (!(index in hooks)) hooks[index] = initial;
        return [hooks[index], value => { hooks[index] = typeof value === 'function' ? value(hooks[index]) : value; }];
      },
      useRef(initial) {
        const index = cursor++;
        if (!(index in hooks)) hooks[index] = { current: initial };
        return hooks[index];
      },
      useEffect(effect, deps) {
        const index = cursor++;
        const previous = hooks[index];
        if (!previous || deps.some((value, i) => !Object.is(value, previous[i]))) effects.push(effect);
        hooks[index] = deps;
      },
    },
    'react/jsx-runtime': { jsx: element, jsxs: element, Fragment: 'fragment' },
    'react-router-dom': {
      Link: 'link',
      useSearchParams: () => [params, value => { params = new URLSearchParams(typeof value === 'function' ? value(params) : value); }],
    },
    '@mui/material': { Button: 'button', IconButton: 'button', useMediaQuery: () => compact },
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: DEMO_APPLICATIONS, loading: false, error: null }) },
    '../hooks/useChecklist': { __esModule: true, default: () => ({ items: [], loading: false, error: null, refresh: () => {} }) },
    '../components/applications/ApplicationPanel': 'company-panel',
    '../hooks/useToday': { useToday: () => DEMO_TODAY },
    '../context/AuthContext': { useAuth: () => ({ isGuest: true }) },
    '../utils/calendar': calendar,
    '../utils/dates': { deadlineLabel },
    '../components/ui/PageUI': { CompanyMark: 'company-mark', Empty: 'empty', LoadState: 'load-state', PageHeading: 'page-heading' },
    '../styles/calendar-refinement.css': {},
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, document, URLSearchParams,
    require: name => {
      if (name.startsWith('@mui/icons-material/')) return { default: 'icon' };
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  function visit(node, callback) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach(child => visit(child, callback));
    callback(node);
    visit(node.props?.children, callback);
  }
  function render() {
    cursor = 0;
    effects = [];
    tree = module.exports.default();
    visit(tree, node => {
      if (node.props?.id === 'agenda-title') node.props.ref.current = agenda;
      if (typeof node.props?.ref === 'function') {
        if (!days.has(node.key)) days.set(node.key, { focus() { document.activeElement = this; } });
        node.props.ref(days.get(node.key));
      }
    });
    effects.forEach(effect => effect());
  }
  function find(predicate) {
    let found;
    visit(tree, node => { if (!found && predicate(node)) found = node; });
    assert.ok(found, 'expected calendar control to exist');
    return found;
  }
  const button = label => find(node => node.type === 'button' && (node.props['aria-label'] === label || text(node) === label));
  const day = value => find(node => node.type === 'button' && node.key === value);
  render();
  return {
    agenda, document,
    openCompany: id => { find(node => node.props?.className === 'agenda-company' && node.key === id).props.onClick(); render(); },
    closeCompany: () => { find(node => node.type === 'company-panel').props.onClose(); render(); },
    company: () => find(node => node.type === 'company-panel').props.application,
    query: () => params,
    pickerHidden: () => find(node => node.props?.id === 'calendar-date-picker').props.hidden,
    title: () => text(find(node => node.props?.id === 'agenda-title')),
    click(label) { button(label).props.onClick(); render(); },
    select(value) { day(value).props.onClick(); render(); },
    move(value, key) {
      const currentTarget = days.get(value);
      document.activeElement = currentTarget;
      let prevented = false;
      day(value).props.onKeyDown({ key, currentTarget, preventDefault() { prevented = true; } });
      render();
      return { prevented, focused: [...days].find(([, node]) => node === document.activeElement)?.[0] };
    },
  };
}

test('mobile date confirmation closes the picker and reveals the matching agenda, including reselecting the same date', () => {
  const page = calendarPage();
  assert.equal(page.pickerHidden(), true);
  page.click('날짜 선택');
  page.select('2026-10-02');
  assert.equal(page.pickerHidden(), true);
  assert.equal(page.query().get('month'), '2026-10');
  assert.equal(page.query().get('date'), '2026-10-02');
  assert.equal(page.title(), '10월 2일1곳');
  assert.equal(page.document.activeElement, page.agenda);
  assert.equal(page.agenda.focusCalls[0].preventScroll, true);
  assert.equal(page.agenda.scrollCalls[0].block, 'nearest');

  page.click('날짜 선택');
  page.select('2026-10-02');
  assert.equal(page.pickerHidden(), true);
  assert.equal(page.agenda.focusCalls.length, 2);
  assert.equal(page.agenda.scrollCalls.length, 2);
});

test('mobile month navigation and directional keyboard exploration keep the picker open without selecting a date', () => {
  const page = calendarPage();
  page.click('날짜 선택');
  page.click('다음 달');
  assert.equal(page.pickerHidden(), false);
  assert.equal(page.query().get('month'), '2026-10');
  assert.equal(page.query().get('date'), null);
  assert.equal(page.agenda.focusCalls.length, 0);

  const moved = page.move('2026-10-31', 'ArrowRight');
  assert.equal(moved.prevented, true);
  assert.equal(moved.focused, '2026-11-01');
  assert.equal(page.query().get('month'), '2026-11');
  assert.equal(page.query().get('date'), null);
  assert.equal(page.pickerHidden(), false);
  assert.equal(page.agenda.scrollCalls.length, 0);
  assert.equal(page.move('2026-11-01', 'Enter').prevented, false, 'native button activation remains responsible for confirming a date');
});

test('mobile reference date and agenda scope controls finish date exploration and expose the chosen results', () => {
  const page = calendarPage();
  page.click('날짜 선택');
  page.click('샘플 기준일 보기');
  assert.equal(page.query().get('date'), DEMO_TODAY);
  assert.equal(page.pickerHidden(), true);

  page.click('날짜 선택');
  page.click('9월 전체 보기');
  assert.equal(page.query().get('date'), null);
  assert.equal(page.title(), '9월의 마감1곳');
  assert.equal(page.pickerHidden(), true);
  page.click('날짜 선택');
  page.click('다가오는 마감');
  assert.equal(page.query().toString(), '');
  assert.equal(page.title(), '다가오는 마감2곳');
  assert.equal(page.pickerHidden(), true);
  assert.equal(page.agenda.focusCalls.length, 3);
  assert.equal(page.agenda.scrollCalls.length, 3);
});

test('desktop date selection keeps the calendar visible and never forces an agenda scroll', () => {
  const page = calendarPage({ compact: false });
  page.select('2026-10-02');
  assert.equal(page.pickerHidden(), false);
  assert.equal(page.title(), '10월 2일1곳');
  assert.equal(page.agenda.focusCalls.length, 0);
  assert.equal(page.agenda.scrollCalls.length, 0);
  page.click('다가오는 마감');
  assert.equal(page.pickerHidden(), false);
  assert.equal(page.agenda.focusCalls[0].preventScroll, true, 'a removed scope button hands focus to the result without moving the page');
  assert.equal(page.agenda.scrollCalls.length, 0);
});


test('opening a company keeps the calendar selection and closes back to the same agenda', () => {
  const page = calendarPage({ compact: false, query: 'month=2026-09&date=2026-09-29' });
  const before = page.query().toString();
  page.openCompany('demo-3');
  assert.equal(page.company().id, 'demo-3');
  assert.equal(page.query().toString(), before);
  page.closeCompany();
  assert.equal(page.query().toString(), before);
});
