import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { createRecordDraftStore } from '../src/utils/recordDraftStore.js';
import { preparationGroups, todayCompanyGroups, beforeApplication } from '../src/utils/preparationGroups.js';
import { shortDate, deadlineLabel } from '../src/utils/dates.js';
import { revealTextareaCaret, observeTextareaLayout } from '../src/utils/textareaCaret.js';
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
    '../components/ui/DiaryBookmark': 'DiaryBookmark',
    '../utils/applicationBoard': { BOARD_COLUMNS, boardColumn },
    '../utils/preparationGroups': { preparationGroups },
    '../utils/dates': { shortDate },
    '../utils/textareaCaret': { revealTextareaCaret, observeTextareaLayout },
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
    cursor = 0; effects = []; tree = module.exports.default(props);
    // Attach explicitly supplied field nodes before layout effects, as React does.
    if (documentOverrides.getElementById) {
      const attach = node => {
        if (Array.isArray(node)) { node.forEach(attach); return; }
        if (!node || typeof node !== 'object') return;
        if (node.props?.inputRef) node.props.inputRef.current = documentOverrides.getElementById(node.props.id);
        attach(node.props?.children);
      };
      attach(tree);
    }
    effects.forEach(effect => effect());
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

test('home starts at the top once and preview opens without navigation or a guest session', async () => {
  const destinations = [];
  const scrolls = [];
  let guestStarts = 0;
  const page = await mount('WelcomePage', {
    'react-router-dom': { useNavigate: () => to => destinations.push(to) },
    '../context/AuthContext': { useAuth: () => ({ enterGuestMode: async () => guestStarts++ }) },
    '../components/layout/SiteHeader': 'Header',
    '../components/layout/SiteFooter': 'Footer',
    '../components/ui/ProductPreview': 'Preview',
    '../components/applications/CompanySummary': { CompanySummary: 'CompanySummary' },
    '../utils/authErrors': { getAuthErrorMessage: error => error.message },
  }, undefined, {}, { scrollTo: (...position) => scrolls.push(position) });
  assert.deepEqual(scrolls, [[0, 0]], 'a fresh home visit does not retain a workspace scroll position');
  page.find(node => node.type === 'Preview').props.onOpen('demo-3'); page.render();
  assert.equal(page.find(node => node.type === 'Dialog').props.open, true);
  assert.equal(page.find(node => node.type === 'CompanySummary').props.application.id, 'demo-3');
  assert.deepEqual(destinations, []);
  assert.equal(guestStarts, 0);
  await page.click('닫기');
  assert.equal(page.find(node => node.type === 'Dialog').props.open, false);
  assert.equal(scrolls.length, 1, 'opening or closing the preview must not reset home scroll');
  await page.click('샘플 체험하기');
  assert.equal(guestStarts, 1);
  assert.deepEqual(destinations, ['/overview']);
});

test('today review opens the same company and requires an explicit status change', async () => {
  let applications = [{ id: 'past', company_name: '지난 마감 회사', status: '지원 예정', deadline: '2026-09-20' }];
  const writes = [];
  const page = await mount('DashboardPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications, update: async (id, patch) => { writes.push({ id, patch }); applications = applications.map(company => company.id === id ? { ...company, ...patch } : company); } }) },
    '../hooks/useChecklist': { __esModule: true, default: () => ({ items: [], refresh() {} }) },
    '../context/AuthContext': { useAuth: () => ({ isGuest: true }) },
    '../hooks/useToday': { useToday: () => '2026-09-27' },
    '../utils/calendar': { WEEKDAYS: ['월', '화', '수', '목', '금', '토', '일'] },
    '../utils/preparationGroups': { todayCompanyGroups, beforeApplication },
    '../utils/dates': { deadlineLabel },
    '../components/applications/ApplicationPanel': 'ApplicationPanel',
  });
  assert.match(page.text(), /지원 여부 확인/);
  assert.equal(writes.length, 0);
  page.find(node => node.type === 'Button' && node.props['aria-label'] === '지난 마감 회사 회사 기록 보기').props.onClick(); page.render();
  const dialog = () => page.find(node => node.type === 'ApplicationPanel');
  assert.equal(dialog().props.application.id, 'past');
  await dialog().props.onStatusChange('지원 완료'); page.render();
  assert.equal(writes.length, 1);
  assert.equal(writes[0].id, 'past');
  assert.deepEqual({ ...writes[0].patch }, { status: '지원 완료' });
  assert.equal(page.find(node => node.props?.id === 'review-title'), null);
  assert.equal(dialog().props.application.status, '지원 완료', 'the open record stays available after leaving the review list');
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
  await page.click('기록 수정');
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
  await page.click('기록 수정');
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
  await page.click('기록 수정');
  page.find(node => node.type === 'Field' && node.props.id === 'note-question').props.onChange({ target: { value: '' } });
  page.render();
  for (let attempt = 1; attempt <= 3; attempt++) {
    detailsOpen = false;
    await page.find(node => node.type === 'form').props.onSubmit({ preventDefault() {} });
    page.render();
    assert.equal(detailsOpen, true, 'a collapsed field must reopen');
    assert.equal(focused, attempt, 'every invalid save must focus the question');
    assert.equal(revealed, attempt, 'the same error must still reveal its input');
  }
  assert.equal(saves, 0, 'invalid attempts must never save a record');
});

test('interview validation clears only when its field is corrected, and keeps save failures visible', async () => {
  let saves = 0;
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [{ id: 'company', company_name: '회사' }] }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({
      notes: [{ id: 'q1', question: '기존 질문', answer: '기존 답변', application_id: null }],
      update: async () => { saves++; throw new Error('저장 연결을 확인해주세요.'); },
    }) },
  });
  const change = (id, value) => { page.find(n => n.type === 'Field' && n.props.id === id).props.onChange({ target: { value } }); page.render(); };
  const submit = async () => { await page.find(n => n.type === 'form').props.onSubmit({ preventDefault() {} }); page.render(); };
  await page.click('기록 수정');
  change('note-question', '');
  await submit();
  change('note-answer', '답변만 바꿈');
  assert.match(page.text(), /질문을 입력해주세요/);
  change('note-question', '   ');
  assert.match(page.text(), /질문을 입력해주세요/);
  change('note-question', '수정한 질문');
  assert.doesNotMatch(page.text(), /질문을 입력해주세요/);
  change('note-company', 'missing');
  await submit();
  change('note-question', '질문을 다시 수정');
  assert.match(page.text(), /지원 회사를 다시 선택해주세요/);
  change('note-company', 'company');
  assert.doesNotMatch(page.text(), /지원 회사를 다시 선택해주세요/);
  assert.equal(saves, 0);
  await submit();
  change('note-question', '저장 재시도용 질문');
  assert.match(page.text(), /저장 연결을 확인해주세요/, 'editing must not hide an unresolved save failure');
  assert.equal(saves, 1);
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
  await page.click('기록 수정');
  assert.equal(page.find(node => node.type === 'form').props['aria-label'], '면접 기록 수정');
  const summary = () => text(page.find(node => node.props?.className === 'inline-editor-summary'));
  assert.equal(summary(), '첫 회사·지원한 이유는?');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-answer').props.value, '그대로 보존할 긴 답변');
  page.find(node => node.type === 'Field' && node.props.id === 'note-question').props.onChange({ target: { value: '새 질문' } }); page.render();
  page.find(node => node.type === 'Field' && node.props.id === 'note-company').props.onChange({ target: { value: 'a2' } }); page.render();
  assert.equal(summary(), '둘째 회사·새 질문', 'the compact context follows unsaved edits, not the old record');
  page = await mount('InterviewPage', dependencies);
  await page.click('이어서 작성');
  assert.equal(page.find(node => node.type === 'form').props['aria-label'], '면접 기록 수정');
  assert.equal(page.find(node => node.type === 'Field' && node.props.id === 'note-company').props.value, 'a2');
  assert.equal(summary(), '둘째 회사·새 질문', 'resuming a draft restores its current question and company');
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
  const fields = { clientHeight: 12, scrollTop: 41, getBoundingClientRect: () => ({ top: 100 }) };
  const editor = { querySelector: selector => selector === '.field-stack' ? fields : { offsetHeight: 22, getBoundingClientRect: () => ({ top: 300 }) } };
  const answer = { focus() {}, setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; }, closest: () => editor, selectionStart: 0, selectionEnd: 0 };
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); };
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [] }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes: [{ id: 'q1', question: '자기소개', answer: '기존 답변', application_id: null }] }) },
    '../utils/textareaCaret': { observeTextareaLayout: (_input, _container, afterFit) => {
      const schedule = () => {
        frames.clear();
        frames.set(++nextFrame, () => { if (afterFit() !== false) caretScrollPositions.push(fields.scrollTop); });
      };
      resized = schedule;
      schedule();
      return { schedule, disconnect() {} };
    } },
  }, undefined, { activeElement: answer, getElementById: id => id === 'note-answer' ? answer : null }, {
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
    getComputedStyle: () => ({ lineHeight: '27.2px' }),
  });
  await page.click('기록 수정');
  flush();
  assert.deepEqual(caretScrollPositions, [], 'a padding-only transitional layout must not move the caret');
  fields.clientHeight = 217;
  resized(); flush();
  assert.deepEqual(caretScrollPositions, [237], 'the first usable layout must show the answer label and first line below the context fields');
  fields.scrollTop = 120;
  answer.selectionStart = answer.selectionEnd = 80;
  fields.clientHeight = 160;
  resized(); flush();
  assert.deepEqual(caretScrollPositions, [237, 120], 'later resizing must not reset the reading or editing position');
  assert.equal(answer.selectionStart, 80);
});


test('interview scope and topic filters combine without changing stored records', async () => {
  const notes = [
    { id: 'a', question: '공통 자기소개', related_project: '자기소개', application_id: null },
    { id: 'b', question: '회사 A 경험', related_project: '프로젝트', application_id: 'a' },
    { id: 'c', question: '회사 B 소개', related_project: '자기소개', application_id: 'b' },
  ];
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [{ id: 'a', company_name: 'A' }, { id: 'b', company_name: 'B' }] }) },
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
  });
  const selectScope = value => { page.find(n => n.type === 'Field' && n.props.id === 'interview-company-scope').props.onChange({ target: { value } }); page.render(); };
  assert.equal(page.find(n => n.type === 'Field' && n.props.id === 'interview-company-scope').props.value, 'all');
  selectScope('companies');
  assert.doesNotMatch(page.text(), /공통 자기소개/);
  page.find(n => n.type === 'Field' && n.props.id === 'interview-topic').props.onChange({ target: { value: '프로젝트' } }); page.render();
  assert.match(page.text(), /회사 A 경험/); assert.doesNotMatch(page.text(), /회사 B 소개/);
  page.find(n => n.type === 'Field' && n.props.id === 'interview-company-scope').props.onChange({ target: { value: 'b' } }); page.render();
  assert.match(page.text(), /회사 B 소개/); assert.doesNotMatch(page.text(), /회사 A 경험/);
  selectScope('common');
  assert.match(page.text(), /공통 자기소개/); assert.doesNotMatch(page.text(), /회사 B 소개/);
  assert.equal(page.find(n => n.type === 'Field' && n.props.id === 'interview-topic').props.value, 'all');
  selectScope('companies');
  assert.match(page.text(), /회사 A 경험/); assert.match(page.text(), /회사 B 소개/);
  selectScope('all');
  assert.match(page.text(), /공통 자기소개/); assert.match(page.text(), /회사 A 경험/); assert.match(page.text(), /회사 B 소개/);
  assert.equal(notes.length, 3);
});

test('editing preserves matching company and topic filters, but follows a record moved outside them', async () => {
  const notes = [{ id: 'q1', question: '회사 질문', answer: '기존 답변', related_project: '협업', application_id: 'a' }];
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [{ id: 'a', company_name: 'A' }] }) },
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes, update: async (id, values) => Object.assign(notes.find(n => n.id === id), values) }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
  });
  const scope = () => page.find(n => n.type === 'Field' && n.props.id === 'interview-company-scope');
  const topic = () => page.find(n => n.type === 'Field' && n.props.id === 'interview-topic');
  scope().props.onChange({ target: { value: 'companies' } }); page.render();
  topic().props.onChange({ target: { value: '협업' } }); page.render();
  await page.click('기록 수정');
  assert.equal(scope().props.value, 'companies', 'opening an existing company record must not narrow the filter');
  await page.find(n => n.type === 'form' && n.props['aria-label'] === '면접 기록 수정').props.onSubmit({ preventDefault() {} }); page.render();
  assert.equal(scope().props.value, 'companies', 'saving within the selected scope must keep that scope');
  assert.equal(topic().props.value, '협업', 'saving an answer must keep the matching topic filter');
  await page.click('기록 수정');
  page.find(n => n.type === 'Field' && n.props.label === '관련 프로젝트 또는 주제 (선택)').props.onChange({ target: { value: '자기소개' } }); page.render();
  await page.find(n => n.type === 'form' && n.props['aria-label'] === '면접 기록 수정').props.onSubmit({ preventDefault() {} }); page.render();
  assert.equal(topic().props.value, 'all', 'a changed topic must not hide the saved record');
  await page.click('기록 수정');
  page.find(n => n.type === 'Field' && n.props.id === 'note-company').props.onChange({ target: { value: '' } }); page.render();
  await page.find(n => n.type === 'form' && n.props['aria-label'] === '면접 기록 수정').props.onSubmit({ preventDefault() {} }); page.render();
  assert.equal(scope().props.value, 'common', 'a record moved outside the filter stays visible after saving');
  assert.equal(notes[0].application_id, null);
});

test('one interview filter disclosure keeps selections when closed and clears both conditions together', async () => {
  const notes = [
    { id: 'a', question: '회사 질문', answer: '답변', related_project: '협업', application_id: 'a' },
    { id: 'b', question: '공통 질문', related_project: '자기소개', application_id: null },
  ];
  const page = await mount('InterviewPage', {
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [{ id: 'a', company_name: '회사 A' }] }) },
    '../hooks/useInterviewNotes': { __esModule: true, default: () => ({ notes }) },
    '../hooks/useRecordDraft': draftHook(createRecordDraftStore(), 'interview'),
  });
  const panel = () => page.find(n => n.props?.id === 'interview-filters');
  const toggle = () => page.find(n => n.props?.['aria-controls'] === 'interview-filters');
  const field = id => page.find(n => n.type === 'Field' && n.props.id === id);
  const toggleFilters = () => { toggle().props.onClick(); page.render(); };
  assert.equal(panel().props.hidden, true);
  assert.equal(toggle().props['aria-expanded'], false);
  toggleFilters();
  assert.equal(panel().props.hidden, false);
  field('interview-company-scope').props.onChange({ target: { value: 'a' } }); page.render();
  field('interview-topic').props.onChange({ target: { value: '협업' } }); page.render();
  toggleFilters();
  assert.equal(panel().props.hidden, true);
  assert.equal(field('interview-topic').props.value, '협업');
  assert.match(page.text(), /회사 A · 협업/);
  toggleFilters();
  await page.click('기록 수정');
  assert.equal(panel().props.hidden, true, 'editing closes the filters without losing the selection');
  assert.equal(toggle().props.disabled, true);
  await page.click('취소');
  await page.click('필터 해제');
  assert.equal(field('interview-company-scope').props.value, 'all');
  assert.equal(field('interview-topic').props.value, 'all');
  assert.equal(page.find(n => n.props?.className === 'interview-filter-summary'), null);
  assert.equal(notes.length, 2);
});
