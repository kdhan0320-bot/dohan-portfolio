import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { createRecordDraftStore } from '../src/utils/recordDraftStore.js';
import { preparationGroups } from '../src/utils/preparationGroups.js';
import { shortDate } from '../src/utils/dates.js';
import { revealTextareaCaret } from '../src/utils/textareaCaret.js';
import * as constants from '../src/constants/index.js';
import { BOARD_COLUMNS, boardColumn } from '../src/utils/applicationBoard.js';

const jsx = (type, props, key) => ({ type, props, key });
const text = node => Array.isArray(node) ? node.map(text).join('') : node && typeof node === 'object' ? text(node.props?.children) : node == null ? '' : String(node);
const names = ['Button', 'MenuItem', 'Dialog', 'DialogTitle', 'DialogContent', 'DialogActions', 'IconButton', 'Alert', 'Checkbox', 'FormControlLabel', 'Menu', 'Tabs', 'Tab'];

async function mount(page, dependencies, props, documentOverrides = {}, windowOverrides = {}) {
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
  react.useLayoutEffect = react.useEffect;
  const modules = {
    react, 'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    '@mui/material': Object.fromEntries(names.map(name => [name, name])),
    'react-router-dom': { Link: 'Link', useSearchParams: () => [params, value => { params = new URLSearchParams(typeof value === 'function' ? value(params) : value); }] },
    '../components/ui/Field': 'Field',
    '../components/ui/PageUI': Object.fromEntries(['PageHeading', 'LoadState', 'Empty', 'ConfirmDelete', 'CompanyMark'].map(name => [name, name])),
    '../components/ui/ActionFeedback': 'Feedback',
    '../components/ui/PreparationItem': 'PreparationItem',
    '../components/ui/StatusChip': 'StatusChip',
    '../components/ui/RecordStage': 'RecordStage',
    '../utils/applicationBoard': { BOARD_COLUMNS, boardColumn },
    '../utils/preparationGroups': { preparationGroups },
    '../utils/dates': { shortDate },
    '../utils/textareaCaret': { revealTextareaCaret },
    '../constants': constants,
    ...dependencies,
  };
  const fieldNode = { focus() {}, closest: selector => selector === 'details' ? { setAttribute() {} } : null };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, URLSearchParams,
    document: { body: fieldNode, activeElement: fieldNode, getElementById: () => fieldNode, ...documentOverrides },
    window: { requestAnimationFrame: fn => { fn(); return 1; }, cancelAnimationFrame() {}, addEventListener() {}, removeEventListener() {}, ...windowOverrides },
    require(name) {
      if (name.startsWith('@mui/icons-material/') || name.endsWith('.css')) return 'Icon';
      if (!(name in modules)) throw new Error(`Unexpected dependency: ${name}`);
      return modules[name];
    },
  });
  function render() {
    cursor = 0; effects = []; tree = module.exports.default(props); effects.forEach(effect => effect());
  }
  function find(predicate, node = tree) {
    if (!node || typeof node !== 'object') return null;
    if (Array.isArray(node)) return node.map(child => find(predicate, child ?? null)).find(Boolean) || null;
    if (predicate(node)) return node;
    return find(predicate, node.props?.children ?? null) || find(predicate, node.props?.action ?? null) || find(predicate, node.props?.preparationEditor ?? null);
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

test('company preparation keeps its company and draft across closing, failures and retry', async () => {
  const store = createRecordDraftStore();
  const calls = [];
  let fail = true;
  const dependencies = {
    '../../hooks/useChecklist': { __esModule: true, default: () => ({ items: [], loading: false, add: async (...args) => { calls.push(args); if (fail) throw new Error('저장 실패'); return { id: 'added' }; } }) },
    '../../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes: [], loading: false }) },
    '../../hooks/useRecordDraft': draftHook(store, 'company-preparation'),
    '../../hooks/useToday': { useToday: () => '2026-09-27' },
    '../../constants': constants,
    '../ui/Field': 'Field', '../ui/PreparationItem': 'PreparationItem', '../ui/StatusChip': 'StatusChip',
    '../ui/PageUI': { CompanyMark: 'CompanyMark', LoadState: 'LoadState' },
    '../../utils/dates': { shortDate }, '../../utils/applicationPayload': { isValidApplicationUrl: () => false },
    '../../utils/applicationBoard': { BOARD_COLUMNS, boardColumn },
  };
  const props = { application: { id: 'sky', company_name: '스카이뷰', status: '관심' } };
  const page = await mount('../components/applications/CompanySummary', dependencies, props);
  await page.click('할 일 추가');
  const submit = async view => { await view.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); view.render(); };
  await submit(page);
  assert.equal(calls.length, 0, 'empty input must not write a record');
  page.find(node => node.type === 'Field' && node.props.id === 'company-task-title').props.onChange({ target: { value: '포트폴리오 확인' } }); page.render();
  const reopened = await mount('../components/applications/CompanySummary', dependencies, props);
  assert.equal(reopened.find(node => node.type === 'Field' && node.props.id === 'company-task-title').props.value, '포트폴리오 확인');
  await submit(reopened);
  assert.deepEqual(calls[0], ['포트폴리오 확인', '서류', 'sky']);
  assert.equal(reopened.find(node => node.type === 'Field' && node.props.id === 'company-task-title').props.value, '포트폴리오 확인');
  assert.ok(store.read('sample', 'company-preparation', 'sky'), 'failed save retains draft');
  fail = false; await submit(reopened);
  assert.equal(store.read('sample', 'company-preparation', 'sky'), null);
  assert.equal(reopened.find(node => node.type === 'form'), null);
  const another = await mount('../components/applications/CompanySummary', dependencies, { application: { id: 'other', status: '면접 예정' } });
  assert.equal(another.find(node => node.type === 'form'), null, 'another company does not inherit the draft');
});

test('home record preview opens without navigating or starting a guest session', async () => {
  const destinations = [];
  let guestStarts = 0;
  const page = await mount('WelcomePage', {
    'react-router-dom': { useNavigate: () => to => destinations.push(to) },
    '../context/AuthContext': { useAuth: () => ({ enterGuestMode: async () => guestStarts++ }) },
    '../components/layout/SiteHeader': 'Header',
    '../components/layout/SiteFooter': 'Footer',
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
  const checkbox = () => page.find(node => node.type === 'PreparationItem');
  await checkbox().props.onToggle(checkbox().props.item, true); page.render();
  assert.equal(checkbox().props.item.is_done, true);
  assert.equal(checkbox().props.item.title, '이력서 확인');
  await checkbox().props.onToggle(checkbox().props.item, false); page.render();
  assert.equal(checkbox().props.item.is_done, false);
  await checkbox().props.onToggle(checkbox().props.item, true); page.render();
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
  await page.click('답변 수정');
  assert.equal(page.find(node => node.type === 'Feedback').props.feedback, null, 'an old saved toast must not cover newly opened editor actions');
  page.find(node => node.type === 'Field' && node.props.id === 'note-question').props.onChange({ target: { value: '' } }); page.render();
  await page.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); page.render();
  assert.match(page.text(), /질문을 입력해주세요/);
  assert.equal(notes[0].question, '지원한 이유는?', 'invalid editing must leave the saved question unchanged');
  await page.click('취소');
  await page.click('계속 작성');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-answer').props.value, '아직 저장하지 않은 답변');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-question').props.value, '');
});

test('repeating an invalid interview save reopens and reveals the question every time', async () => {
  let revealed = 0;
  let focused = 0;
  let detailsOpen = false;
  let saves = 0;
  const fields = { scrollTop: 0, clientHeight: 150, getBoundingClientRect: () => ({ top: 300 }), scrollTo() { revealed++; } };
  const field = {
    offsetHeight: 50,
    focus() { focused++; },
    getBoundingClientRect: () => ({ top: 600 }),
    closest: selector => selector === 'details' ? { setAttribute() { detailsOpen = true; } }
      : selector === '.inline-answer-editor' ? { querySelector: () => fields } : null,
  };
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [] }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({
      notes: [{ id: 'q1', question: '지원한 이유는?', answer: '기존 답변', application_id: null }],
      update: async () => { saves++; },
    }) },
  }, undefined, { getElementById: id => id === 'note-question' ? field : null });
  await page.click('답변 수정');
  page.find(node => node.type === 'Field' && node.props.id === 'note-question').props.onChange({ target: { value: '' } });
  page.render();
  for (let attempt = 1; attempt <= 3; attempt++) {
    detailsOpen = false;
    await page.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} });
    page.render();
    assert.equal(detailsOpen, true, 'a collapsed field must reopen');
    assert.equal(focused, attempt, 'focus must run on every invalid save');
    assert.equal(revealed, attempt, 'the same error must still reveal its input');
  }
  assert.equal(saves, 0, 'invalid attempts must never save a record');
});

test('question management edits company details directly, preserves the answer, and resumes its draft', async () => {
  const store = createRecordDraftStore();
  let notes = [{ id: 'q1', question: '지원한 이유는?', answer: '그대로 보존할 긴 답변', application_id: 'a1', related_project: '포트폴리오', importance: '보통', is_reviewed: false }];
  const dependencies = {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [{ id: 'a1', company_name: '첫 회사' }, { id: 'a2', company_name: '둘째 회사' }] }) },
    '../hooks/useRecordDraft': draftHook(store, 'interview'),
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes, update: async (id, payload) => { notes = [{ ...notes[0], ...payload }]; } }) },
  };
  let page = await mount('InterviewPage', dependencies);
  page.find(node => node.type === 'MenuItem' && text(node) === '질문·회사 수정').props.onClick(); page.render();
  page.find(node => node.type === 'Menu').props.slotProps.transition.onExited(); page.render();
  assert.equal(page.find(node => node.type === 'form').props['aria-label'], '질문·회사 정보 수정');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-answer'), null);
  page.find(node => node.type === 'Field' && node.props.id === 'note-question').props.onChange({ target: { value: '새 질문' } }); page.render();
  page.find(node => node.type === 'Field' && node.props.id === 'note-company').props.onChange({ target: { value: 'a2' } }); page.render();
  page = await mount('InterviewPage', dependencies);
  await page.click('이어서 작성');
  assert.equal(page.find(node => node.type === 'form').props['aria-label'], '질문·회사 정보 수정');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-company').props.value, 'a2');
  await page.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); page.render();
  assert.equal(notes[0].question, '새 질문');
  assert.equal(notes[0].application_id, 'a2');
  assert.equal(notes[0].answer, '그대로 보존할 긴 답변');
  assert.equal(store.read('sample', 'interview', 'q1'), null);
});

test('answer entry waits for usable layout, reveals its label once, then preserves the editing position', async () => {
  const frames = new Map();
  let nextFrame = 0;
  let resized;
  const caretScrollPositions = [];
  const fields = { clientHeight: 12, scrollTop: 41 };
  const editor = { querySelector: selector => selector === '.field-stack' ? fields : { offsetHeight: 22 } };
  const answer = { focus() {}, closest: () => editor, selectionStart: 0, selectionEnd: 0 };
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); };
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [] }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes: [{ id: 'q1', question: '자기소개', answer: '기존 답변', application_id: null }] }) },
    '../utils/textareaCaret': { revealTextareaCaret: () => caretScrollPositions.push(fields.scrollTop) },
  }, undefined, { getElementById: id => id === 'note-answer' ? answer : null }, {
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
    getComputedStyle: () => ({ lineHeight: '27.2px' }),
    ResizeObserver: class { constructor(callback) { resized = callback; } observe() {} disconnect() {} },
  });
  await page.click('답변 수정');
  flush();
  assert.deepEqual(caretScrollPositions, [], 'a padding-only transitional layout must not move the caret');
  fields.clientHeight = 217;
  resized(); flush();
  assert.deepEqual(caretScrollPositions, [0], 'the first usable layout must show the label and first line');
  fields.scrollTop = 120;
  answer.selectionStart = answer.selectionEnd = 80;
  fields.clientHeight = 160;
  resized(); flush();
  assert.deepEqual(caretScrollPositions, [0, 120], 'later resizing must not reset the reading or editing position');
  assert.equal(answer.selectionStart, 80);
});
