import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import { createRecordDraftStore } from '../src/utils/recordDraftStore.js';
import { PROMPT_TYPES } from '../src/constants/index.js';
import { generatePrompt } from '../src/utils/documentTemplateHelpers.js';

// Run the page's real input/submit handlers with the real memory store. DOM
// layout, the hook subscription and browser navigation are checked separately.
const source = await readFile(new URL('../src/pages/DocumentHelperPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });
const element = (type, props) => ({ type, props });

function helperPage(store, scope = 'sample') {
  const dependencies = {
    react: { useState: initial => [initial, () => {}] },
    'react/jsx-runtime': { jsx: element, jsxs: element, Fragment: 'fragment' },
    '@mui/material': { Button: 'button', MenuItem: 'option' },
    '@mui/icons-material/ContentCopy': { default: 'copy-icon' },
    '../components/ui/Field': { default: 'field' },
    '../components/ui/PageUI': { PageHeading: 'heading', Empty: 'empty' },
    '../components/ui/ActionFeedback': { default: 'feedback' },
    '../constants': { PROMPT_TYPES },
    '../utils/documentTemplateHelpers': { generatePrompt },
    '../hooks/useRecordDraft': { __esModule: true, default: kind => ({
      read: id => store.read(scope, kind, id),
      write: (id, values, baseline) => store.write(scope, kind, id, values, baseline),
    }) },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: name => {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  const render = () => module.exports.default();
  function find(predicate, node = render()) {
    if (!node || typeof node !== 'object') return null;
    if (Array.isArray(node)) return node.map(child => find(predicate, child)).find(Boolean) || null;
    if (predicate(node)) return node;
    return find(predicate, node.props?.children ?? null);
  }
  return {
    field: label => find(node => node.props?.label === label),
    change: (label, value) => find(node => node.props?.label === label).props.onChange({ target: { value } }),
    generate: () => find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }),
    result: () => find(node => node.props?.id === 'prompt-result'),
    scope: next => { scope = next; },
  };
}

test('leaving and reopening the helper keeps every input and the manually edited generated result', () => {
  const store = createRecordDraftStore();
  const page = helperPage(store);
  const inputs = {
    '준비할 글': '포트폴리오 설명',
    '지원 직무': '웹 퍼블리셔',
    '지원 회사': '검증용 회사',
    '프로젝트 또는 주제': '지원 기록',
    '실제로 한 일과 결과': '입력 흐름을 점검하고 배치를 수정했습니다.',
  };
  for (const [label, value] of Object.entries(inputs)) page.change(label, value);
  page.generate();
  assert.match(page.result().props.value, /입력 흐름을 점검하고 배치를 수정했습니다/);
  const edited = `${page.result().props.value}\n추가한 사실만 포함합니다.`;
  page.result().props.onChange({ target: { value: edited } });

  // A new page instance has none of the previous component's local state.
  const reopened = helperPage(store);
  for (const [label, value] of Object.entries(inputs)) assert.equal(reopened.field(label).props.value, value);
  assert.equal(reopened.result().props.value, edited);
});

test('unfinished input survives re-entry without requiring prompt generation', () => {
  const store = createRecordDraftStore();
  helperPage(store).change('실제로 한 일과 결과', '아직 작성 중인 경험');
  const reopened = helperPage(store);
  assert.equal(reopened.field('실제로 한 일과 결과').props.value, '아직 작성 중인 경험');
  assert.equal(reopened.result(), null);
  assert.equal(store.hasDrafts(), true);
});

test('sample reset clears an open helper while leaving account drafts separate', () => {
  const store = createRecordDraftStore();
  const sample = helperPage(store);
  const account = helperPage(store, 'user:a');
  sample.change('지원 회사', '가상 회사');
  sample.generate();
  account.change('지원 회사', '계정 회사');
  store.clearSample();
  assert.equal(sample.field('지원 회사').props.value, '');
  assert.equal(sample.result(), null);
  assert.equal(account.field('지원 회사').props.value, '계정 회사');
});

test('account changes cannot render the previous account or sample text', () => {
  const store = createRecordDraftStore();
  const page = helperPage(store);
  page.change('실제로 한 일과 결과', '샘플 경험');
  page.scope('user:a');
  assert.equal(page.field('실제로 한 일과 결과').props.value, '');
  page.change('실제로 한 일과 결과', '개인 경험');
  page.scope('user:b');
  assert.equal(page.field('실제로 한 일과 결과').props.value, '');
  store.clearScope('user:a');
  page.scope('user:a');
  assert.equal(page.field('실제로 한 일과 결과').props.value, '');
});

test('fresh tab or reload starts empty and returning input to blank removes unload protection', () => {
  const store = createRecordDraftStore();
  const page = helperPage(store);
  page.change('지원 직무', '개인 직무');
  assert.equal(helperPage(createRecordDraftStore()).field('지원 직무').props.value, '');
  page.change('지원 직무', '');
  assert.equal(store.hasDrafts(), false);
});
