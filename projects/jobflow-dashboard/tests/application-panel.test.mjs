import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import { APPLICATION_STATUSES, COMPANY_SIZE_OPTIONS, PRIORITY_OPTIONS } from '../src/constants/index.js';
import { applicationDraft, BOARD_COLUMNS, boardColumn } from '../src/utils/applicationBoard.js';
import { isValidApplicationUrl } from '../src/utils/applicationPayload.js';
import { applicationDateErrors } from '../src/utils/dateInput.js';

// Run the actual panel's validation, input and disclosure handlers. Native
// details focus/geometry are checked separately in the browser.
const source = await readFile(new URL('../src/components/applications/ApplicationPanel.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });

function panelWith(application = null, options = {}) {
  const state = [];
  let cursor = 0;
  let values = { ...applicationDraft(application), ...options.draft };
  const saves = [];
  const statusSaves = [];
  const focused = [];
  let closes = 0;
  const noOp = () => {};
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = { current: initial };
      return state[index];
    },
  };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    'react-router-dom': { useNavigate: () => noOp },
    '@mui/material': {
      ...Object.fromEntries(['Alert', 'Button', 'Checkbox', 'Dialog', 'DialogActions', 'DialogContent', 'DialogTitle', 'FormControlLabel', 'IconButton', 'MenuItem'].map(name => [name, name])),
      useMediaQuery: () => false,
    },
    '../../hooks/useChecklist': 'unused-checklist-hook',
    '../../hooks/useInterviewNotes': 'unused-interview-hook',
    '../../hooks/useApplicationDraft': { __esModule: true, default: () => ({
      form: values,
      change: (key, value) => { values = { ...values, [key]: value }; },
      clear: noOp,
      reset: () => { values = applicationDraft(application); },
      acceptSavedFields: fields => { values = { ...values, ...fields }; },
      dirty: JSON.stringify(values) !== JSON.stringify(applicationDraft(application)),
      restored: false,
    }) },
    '../ui/Field': 'Field',
    '../ui/DateField': 'Field',
    './CompanySummary': 'CompanySummary',
    '../ui/PageUI': { CompanyMark: 'CompanyMark', ConfirmDelete: 'ConfirmDelete' },
    '../../constants': { APPLICATION_STATUSES, COMPANY_SIZE_OPTIONS, PRIORITY_OPTIONS },
    '../../utils/applicationBoard': { applicationDraft, BOARD_COLUMNS, boardColumn },
    '../../utils/applicationPayload': { isValidApplicationUrl },
    '../../utils/dateInput': { applicationDateErrors },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    window: { requestAnimationFrame: callback => callback() },
    document: { getElementById: id => ({ focus: () => focused.push(id) }) },
    require(name) {
      if (name.startsWith('@mui/icons-material/')) return name;
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  function render() {
    cursor = 0;
    return module.exports.default({ application, creating: !application, draftScope: 'sample', onClose: () => closes++, onSave: async value => saves.push(value), onDelete: noOp, onStatusChange: application ? async status => {
      statusSaves.push(status);
      await options.statusSave?.(status);
      application = { ...application, status };
    } : undefined });
  }
  function find(predicate, node) {
    if (arguments.length < 2) node = render();
    if (!node || typeof node !== 'object') return null;
    if (Array.isArray(node)) return node.map(child => find(predicate, child)).find(Boolean) || null;
    if (predicate(node)) return node;
    return find(predicate, node.props?.children ?? null) || find(predicate, node.props?.statusControl ?? null);
  }
  return {
    saves,
    statusSaves,
    focused,
    feedback: () => find(node => node.type === 'p' && node.props.className?.includes('status-save-feedback'))?.props,
    closes: () => closes,
    close: () => find(node => node.type === 'IconButton' && node.props['aria-label'] === '회사 정보 닫기').props.onClick(),
    escape: () => find(node => node.type === 'Dialog' && node.props['aria-labelledby'] === 'company-panel-title').props.onClose(),
    click: label => find(node => node.type === 'Button' && node.props.children === label).props.onClick(),
    edit: () => find(node => node.type === 'Button' && node.props.children === '회사 정보 수정').props.onClick(),
    hasSummary: () => Boolean(find(node => node.type === 'CompanySummary')),
    hasForm: () => Boolean(find(node => node.type === 'form')),
    details: () => find(node => node.type === 'details'),
    field: label => find(node => node.type === 'Field' && node.props.label === label),
    change: (label, value) => find(node => node.type === 'Field' && node.props.label === label).props.onChange({ target: { value } }),
    submit: () => find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }),
    toggle: open => find(node => node.type === 'details').props.onToggle({ currentTarget: { open } }),
  };
}

test('partial and impossible deadlines cannot silently save as an empty date', async () => {
  const panel = panelWith();
  panel.change('회사 이름', '날짜 검사');
  for (const date of ['2026', '2026-09', '2026-02-29', '2026-13-01']) {
    panel.change('공고 마감일 (선택)', date);
    await panel.submit();
    assert.equal(panel.saves.length, 0);
    assert.equal(panel.field('공고 마감일 (선택)').props.value, date);
    assert.equal(panel.field('공고 마감일 (선택)').props.error, true);
    assert.equal(panel.focused.at(-1), 'company-deadline');
  }
  panel.change('공고 마감일 (선택)', '2028-02-29');
  await panel.submit();
  assert.equal(panel.saves[0].deadline, '2028-02-29');
});

test('an incomplete applied date reveals the collapsed field and preserves the saved record', async () => {
  const record = { id: 'dates', company_name: '날짜 검사', deadline: '2026-10-31', applied_date: '2026-09-27' };
  const panel = panelWith(record);
  panel.edit();
  panel.change('지원한 날짜', '2026-10');
  panel.toggle(false);
  await panel.submit();
  assert.equal(panel.saves.length, 0);
  assert.equal(record.applied_date, '2026-09-27');
  assert.equal(panel.field('지원한 날짜').props.value, '2026-10');
  assert.equal(panel.details().props.open, true);
  assert.equal(panel.focused.at(-1), 'company-applied_date');
  panel.change('지원한 날짜', '');
  panel.change('공고 마감일 (선택)', '');
  await panel.submit();
  assert.equal(panel.saves.length, 1, 'optional dates can still be deliberately cleared');
  assert.equal(panel.saves[0].applied_date, '');
  assert.equal(panel.saves[0].deadline, '');
});

test('correcting an invalid posting address keeps the extra fields open through successful saving', async () => {
  const panel = panelWith();
  panel.change('회사 이름', '검증용 회사');
  panel.change('채용 공고 주소', 'abc');
  await panel.submit();
  assert.equal(panel.details().props.open, true);
  assert.equal(panel.field('채용 공고 주소').props.error, true);
  assert.equal(panel.saves.length, 0);

  panel.change('채용 공고 주소', 'a');
  assert.equal(panel.field('채용 공고 주소').props.error, false);
  assert.equal(panel.details().props.open, true, 'editing must not hide the focused address field');
  panel.change('채용 공고 주소', 'https://example.com/jobs');
  assert.equal(panel.details().props.open, true);
  await panel.submit();
  assert.equal(panel.saves.length, 1);
  assert.equal(panel.saves[0].job_url, 'https://example.com/jobs');
});

test('quick status saves from the summary without closing or saving an unfinished memo', async () => {
  const panel = panelWith({ id: 'company-a', company_name: '검증 회사', status: '관심', memo: '저장된 메모' }, { draft: { memo: '미완성 메모' } });
  await panel.field('현재 상태').props.onChange({ target: { value: '면접 예정' } });
  assert.deepEqual(panel.statusSaves, ['면접 예정']);
  assert.equal(panel.hasSummary(), true);
  assert.equal(panel.closes(), 0);
  assert.equal(panel.saves.length, 0);
  assert.match(panel.feedback().children, /저장했어요/);
  panel.edit();
  assert.equal(panel.field('현재 상태').props.value, '면접 예정');
  assert.equal(panel.field('준비 메모').props.value, '미완성 메모');
});

test('quick status keeps the saved value on failure and permits a retry', async () => {
  let fail = true;
  const panel = panelWith({ id: 'company-a', company_name: '검증 회사', status: '관심' }, { statusSave: async () => { if (fail) throw new Error('저장 실패'); } });
  await panel.field('현재 상태').props.onChange({ target: { value: '서류 진행' } });
  assert.equal(panel.field('현재 상태').props.value, '관심');
  assert.equal(panel.field('현재 상태').props.disabled, false);
  assert.equal(panel.feedback().role, 'alert');
  assert.equal(panel.closes(), 0);
  fail = false;
  await panel.field('현재 상태').props.onChange({ target: { value: '서류 진행' } });
  assert.equal(panel.field('현재 상태').props.value, '서류 진행');
});

test('quick status rejects repeated or invalid changes and blocks dismissal while saving', async () => {
  let release;
  const panel = panelWith({ id: 'company-a', company_name: '검증 회사', status: '관심' }, { statusSave: () => new Promise(resolve => { release = resolve; }) });
  const handler = panel.field('현재 상태').props.onChange;
  await handler({ target: { value: '관심' } });
  await handler({ target: { value: 'unknown' } });
  assert.equal(panel.statusSaves.length, 0);
  const request = handler({ target: { value: '합격' } });
  await handler({ target: { value: '불합격' } });
  assert.equal(panel.field('현재 상태').props.disabled, true);
  panel.close();
  assert.equal(panel.closes(), 0);
  assert.deepEqual(panel.statusSaves, ['합격']);
  release();
  await request;
  assert.equal(panel.field('현재 상태').props.value, '합격');
});

test('manual disclosure choices persist across other edits, while a fresh company starts collapsed', async () => {
  const panel = panelWith({ id: 'company-a', company_name: '첫 회사' });
  panel.edit();
  assert.equal(panel.details().props.open, false);
  panel.toggle(true);
  panel.change('지원 직무', '웹 퍼블리셔');
  assert.equal(panel.details().props.open, true);
  panel.change('채용 공고 주소', 'invalid');
  await panel.submit();
  panel.toggle(false);
  panel.change('준비 메모', '다음에 수정할 메모');
  assert.equal(panel.details().props.open, false, 'unrelated edits must respect a manual collapse');
  await panel.submit();
  assert.equal(panel.details().props.open, true, 'validation must reveal the invalid field again');

  // ApplicationsPage keys each panel by scope and record ID, so switching
  // companies mounts a new panel rather than carrying its disclosure state.
  const next = panelWith({ id: 'company-b', company_name: '두 번째 회사' });
  assert.equal(next.hasSummary(), true);
  next.edit();
  assert.equal(next.details().props.open, false);
});

test('a missing edited company name is revealed and remains visible while it is corrected', async () => {
  const panel = panelWith({ id: 'company-a', company_name: '검증용 회사' });
  assert.equal(panel.hasSummary(), true);
  assert.equal(panel.hasForm(), false);
  panel.edit();
  panel.change('회사 이름', '');
  await panel.submit();
  assert.equal(panel.details().props.open, true);
  assert.equal(panel.field('회사 이름').props.error, true);
  panel.change('회사 이름', '수');
  assert.equal(panel.field('회사 이름').props.error, false);
  assert.equal(panel.details().props.open, true);
  assert.equal(panel.saves.length, 0);
});


test('cancelling a company edit returns to its summary and discards only the cancelled draft', () => {
  const panel = panelWith({ id: 'company-a', company_name: '검증용 회사', memo: '원래 메모' });
  panel.edit(); panel.click('기록으로 돌아가기');
  assert.equal(panel.hasSummary(), true);
  assert.equal(panel.closes(), 0);
  panel.edit(); panel.change('준비 메모', '취소할 수정'); panel.click('기록으로 돌아가기');
  panel.click('저장하지 않고 돌아가기');
  assert.equal(panel.hasSummary(), true);
  assert.equal(panel.closes(), 0);
  panel.edit();
  assert.equal(panel.field('준비 메모').props.value, '원래 메모');
});

test('X and Escape close an unchanged edit directly, while dirty X confirms the actual close', () => {
  const clean = panelWith({ id: 'company-a', company_name: '검증 회사' });
  clean.edit(); clean.close();
  assert.equal(clean.closes(), 1);
  const escape = panelWith({ id: 'company-a', company_name: '검증 회사' });
  escape.edit(); escape.escape();
  assert.equal(escape.closes(), 1);
  const dirty = panelWith({ id: 'company-a', company_name: '검증 회사', memo: '원래 메모' });
  dirty.edit(); dirty.change('준비 메모', '작성 중'); dirty.close();
  assert.equal(dirty.closes(), 0);
  dirty.click('계속 작성');
  assert.equal(dirty.field('준비 메모').props.value, '작성 중');
  dirty.close(); dirty.click('저장하지 않고 닫기');
  assert.equal(dirty.closes(), 1);
});
