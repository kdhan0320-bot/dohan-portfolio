import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { createRecordDraftStore } from '../src/utils/recordDraftStore.js';
import * as constants from '../src/constants/index.js';

const jsx = (type, props, key) => ({ type, props, key });
const text = node => Array.isArray(node) ? node.map(text).join('') : node && typeof node === 'object' ? text(node.props?.children) : node == null ? '' : String(node);
const names = ['Button', 'MenuItem', 'Dialog', 'DialogTitle', 'DialogContent', 'DialogActions', 'IconButton', 'Alert', 'Checkbox', 'FormControlLabel', 'Menu', 'Tabs', 'Tab'];

async function mount(page, dependencies) {
  const source = await readFile(new URL(`../src/pages/${page}.jsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });
  const states = [];
  let cursor = 0;
  let effects = [];
  let tree;
  let params = new URLSearchParams();
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial;
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = { current: initial };
      return states[index];
    },
    useEffect(effect, deps) {
      const index = cursor++;
      if (!states[index] || deps.some((value, i) => !Object.is(value, states[index][i]))) effects.push(effect);
      states[index] = deps;
    },
  };
  const modules = {
    react, 'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    '@mui/material': Object.fromEntries(names.map(name => [name, name])),
    'react-router-dom': { Link: 'Link', useSearchParams: () => [params, value => { params = new URLSearchParams(typeof value === 'function' ? value(params) : value); }] },
    '../components/ui/Field': 'Field',
    '../components/ui/PageUI': Object.fromEntries(['PageHeading', 'LoadState', 'Empty', 'ConfirmDelete', 'CompanyMark'].map(name => [name, name])),
    '../components/ui/ActionFeedback': 'Feedback',
    '../constants': constants,
    ...dependencies,
  };
  const fieldNode = { focus() {}, closest: () => ({ setAttribute() {} }) };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, URLSearchParams,
    document: { body: fieldNode, activeElement: fieldNode, getElementById: () => fieldNode },
    window: { requestAnimationFrame: fn => { fn(); return 1; }, cancelAnimationFrame() {} },
    require(name) {
      if (name.startsWith('@mui/icons-material/') || name.endsWith('.css')) return 'Icon';
      if (!(name in modules)) throw new Error(`Unexpected dependency: ${name}`);
      return modules[name];
    },
  });
  function render() {
    cursor = 0; effects = []; tree = module.exports.default(); effects.forEach(effect => effect());
  }
  function find(predicate, node = tree) {
    if (!node || typeof node !== 'object') return null;
    if (Array.isArray(node)) return node.map(child => find(predicate, child ?? null)).find(Boolean) || null;
    if (predicate(node)) return node;
    return find(predicate, node.props?.children ?? null) || find(predicate, node.props?.action ?? null);
  }
  render();
  return { render, find, text: () => text(tree), async click(label) { const node = find(item => item.type === 'Button' && text(item) === label); assert.ok(node, label); await node.props.onClick(); render(); } };
}

function draftHook(store, type) {
  return { __esModule: true, default: () => ({
    read: id => store.read('sample', type, id),
    write: (id, values, baseline) => store.write('sample', type, id, values, baseline),
    clear: id => store.clear('sample', type, id),
    pending: store.latest('sample', type),
    save: async (id, values, action) => { const row = await action(); store.clear('sample', type, id, values); return row; },
  }) };
}

test('home record preview opens without navigating or starting a guest session', async () => {
  const destinations = [];
  let guestStarts = 0;
  const page = await mount('WelcomePage', {
    'react-router-dom': { useNavigate: () => to => destinations.push(to) },
    '../context/AuthContext': { useAuth: () => ({ enterGuestMode: async () => guestStarts++ }) },
    '../components/layout/SiteHeader': 'Header',
    '../components/ui/ProductPreview': 'Preview',
    '../components/applications/CompanySummary': { CompanySummary: 'CompanySummary' },
    '../utils/authErrors': { getAuthErrorMessage: error => error.message },
  });
  page.find(node => node.type === 'Preview').props.onOpen('demo-3'); page.render();
  assert.equal(page.find(node => node.type === 'Dialog').props.open, true);
  assert.equal(page.find(node => node.type === 'CompanySummary').props.application.id, 'demo-3');
  assert.deepEqual(destinations, []);
  assert.equal(guestStarts, 0);
  await page.click('닫기');
  assert.equal(page.find(node => node.type === 'Dialog').props.open, false);
  await page.click('샘플 체험하기');
  assert.equal(guestStarts, 1);
  assert.deepEqual(destinations, ['/overview']);
});

test('completing a task keeps its checked row visible until the status filter changes', async () => {
  let items = [{ id: 'task-1', title: '이력서 확인', category: '서류', is_done: false, application_id: null }];
  const page = await mount('ChecklistPage', {
    '../hooks/useChecklist': { __esModule: true, default: () => ({ items, toggle: async (id, checked) => { items = items.map(item => ({ ...item, is_done: checked })); } }) },
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [] }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'checklist'),
  });
  const checkbox = () => page.find(node => node.type === 'Checkbox');
  await checkbox().props.onChange({ target: { checked: true } }); page.render();
  assert.equal(checkbox().props.checked, true);
  assert.match(page.text(), /이력서 확인/);
  await checkbox().props.onChange({ target: { checked: false } }); page.render();
  assert.equal(checkbox().props.checked, false);
  await checkbox().props.onChange({ target: { checked: true } }); page.render();
  page.find(node => node.type === 'Tabs').props.onChange(null, 'done'); page.render();
  page.find(node => node.type === 'Tabs').props.onChange(null, 'todo'); page.render();
  assert.equal(checkbox(), null);
});

test('inline interview editing restores an unfinished answer after leaving and saves without an editor dialog', async () => {
  const store = createRecordDraftStore();
  let notes = [{ id: 'question-1', question: '지원한 이유는?', answer: '저장된 답변', application_id: null, related_project: '', importance: '보통', is_reviewed: false }];
  let fail = false;
  const dependencies = {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [] }) },
    '../hooks/useRecordDraft': draftHook(store, 'interview'),
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes, update: async (id, payload) => { if (fail) throw new Error('저장 실패'); notes = notes.map(note => ({ ...note, ...payload })); return notes[0]; } }) },
  };
  let page = await mount('InterviewPage', dependencies);
  assert.match(page.text(), /저장된 답변/);
  await page.click('답변 수정');
  assert.equal(page.find(node => node.type === 'Dialog' && node.props.open), null);
  const answer = page.find(node => node.type === 'Field' && node.props.id === 'note-answer');
  answer.props.onChange({ target: { value: '아직 저장하지 않은 답변' } }); page.render();
  page = await mount('InterviewPage', dependencies);
  await page.click('이어서 작성');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-answer').props.value, '아직 저장하지 않은 답변');
  fail = true;
  await page.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); page.render();
  assert.equal(store.read('sample', 'interview', 'question-1').values.answer, '아직 저장하지 않은 답변');
  fail = false;
  await page.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); page.render();
  assert.equal(notes[0].answer, '아직 저장하지 않은 답변');
  assert.equal(store.read('sample', 'interview', 'question-1'), null);
  assert.match(page.text(), /아직 저장하지 않은 답변/);
});
