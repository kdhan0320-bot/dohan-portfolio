import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import { createRecordDraftStore, recordDraftValues } from '../src/utils/recordDraftStore.js';

// Render the actual page and run its effects against an SDK double. This checks
// failed reads, recovery and account changes without making an account or DB request.
const source = await readFile(new URL('../src/pages/SettingsPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });

function pageWith(readResults, { draftStore = createRecordDraftStore(), initialAccount } = {}) {
  const state = [];
  const effects = new Map();
  const pendingEffects = [];
  const reads = [];
  const writes = [];
  let cursor = 0;
  let account = initialAccount || { id: 'account-a', email: 'a@example.com', user_metadata: { display_name: '가입 이름' } };
  let saveResult = { data: { id: account.id }, error: null };
  const noOp = () => {};
  const react = {
    useSyncExternalStore(_subscribe, snapshot) { return snapshot(); },
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
    useEffect(callback, dependencies) {
      const index = cursor++;
      const previous = effects.get(index);
      if (!previous || dependencies.some((dependency, i) => !Object.is(dependency, previous.dependencies[i]))) {
        pendingEffects.push(() => {
          previous?.cleanup?.();
          effects.set(index, { dependencies, cleanup: callback() });
        });
      }
    },
  };
  const supabase = {
    from(table) {
      assert.equal(table, 'jobflow_profiles');
      return {
        select(columns) {
          assert.equal(columns, 'display_name, target_role');
          return { eq(key, id) {
            assert.equal(key, 'id');
            reads.push(id);
            return { async maybeSingle() {
              assert.ok(readResults.length, 'Unexpected profile read');
              const result = readResults.shift();
              if (result instanceof Error) throw result;
              return typeof result === 'function' ? result() : result;
            } };
          } };
        },
        upsert(payload) {
          writes.push(payload);
          return { select(columns) {
            assert.equal(columns, 'id');
            return { maybeSingle: async () => {
              if (saveResult instanceof Error) throw saveResult;
              return typeof saveResult === 'function' ? saveResult() : saveResult;
            } };
          } };
        },
      };
    },
  };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx },
    '@mui/material': Object.fromEntries(['Box', 'Card', 'CardContent', 'Typography', 'Button', 'Alert', 'Avatar', 'Stack', 'Skeleton'].map(name => [name, name])),
    '@mui/icons-material/Logout': 'LogoutIcon',
    '@mui/icons-material/DownloadOutlined': 'DownloadOutlined',
    'react-router-dom': { useNavigate: () => noOp },
    '../components/ui/Field': 'Field',
    '../components/ui/PageUI': { PageHeading: 'PageHeading' },
    '../components/ui/PaperGraphic': 'PaperGraphic',
    '../lib/supabase': { supabase },
    '../context/AuthContext': { useAuth: () => ({ user: account, isGuest: false, signOut: noOp }) },
    '../utils/authErrors': { getAuthErrorMessage: noOp },
    '../utils/recordExport': { createRecordExport: noOp, loadRecordExport: noOp, downloadRecordExport: noOp },
    '../utils/dataErrors': { getSafeDataErrorMessage: noOp },
    '../utils/applicationDraftStore': { applicationDraftStore: { clearSample: noOp } },
    '../utils/recordDraftStore': { recordDraftStore: draftStore, recordDraftValues },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, setTimeout: noOp,
    require(name) {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  function render() { cursor = 0; return module.exports.default(); }
  async function flush() {
    for (const run of pendingEffects.splice(0)) run();
    await new Promise(resolve => setImmediate(resolve));
  }
  return {
    render, flush, reads, writes, draftStore,
    unmount: () => { for (const effect of effects.values()) effect.cleanup?.(); effects.clear(); },
    setAccount: user => { account = user; }, setSaveResult: result => { saveResult = result; },
  };
}

function find(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => find(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [predicate(tree) ? tree : null, ...find(tree.props?.children, predicate), ...find(tree.props?.action, predicate)].filter(Boolean);
}
const button = (tree, label) => find(tree, node => node.type === 'Button' && node.props.children === label)[0];
const field = (tree, label) => find(tree, node => node.type === 'Field' && node.props.label === label)[0];
const profile = (name = '저장된 이름') => ({ data: { display_name: name, target_role: '웹 퍼블리셔' }, error: null });

for (const [failure, result] of [['SDK error', { data: null, error: { message: 'Read denied' } }], ['network rejection', new Error('Offline')]]) {
  test(`${failure} disables edits and prevents a blank profile overwrite`, async () => {
    const page = pageWith([result]);
    page.render();
    await page.flush();
    const tree = page.render();
    assert.equal(field(tree, '이름').props.disabled, true);
    assert.equal(field(tree, '목표 직무').props.disabled, true);
    assert.equal(button(tree, '프로필 저장').props.disabled, true);
    assert.ok(button(tree, '다시 불러오기'));
    await button(tree, '프로필 저장').props.onClick();
    assert.equal(page.writes.length, 0);
  });
}

test('retry loads existing values before permitting a profile save', async () => {
  const page = pageWith([{ data: null, error: { message: 'Offline' } }, profile()]);
  page.render(); await page.flush();
  button(page.render(), '다시 불러오기').props.onClick();
  page.render(); await page.flush();
  let tree = page.render();
  assert.deepEqual(page.reads, ['account-a', 'account-a']);
  assert.equal(field(tree, '이름').props.value, '저장된 이름');
  assert.equal(field(tree, '목표 직무').props.value, '웹 퍼블리셔');
  assert.equal(button(tree, '프로필 저장').props.disabled, false);
  field(tree, '이름').props.onChange({ target: { value: '수정한 이름' } });
  tree = page.render();
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(page.writes.length, 1);
  assert.equal(page.writes[0].display_name, '수정한 이름');
  assert.equal(page.writes[0].target_role, '웹 퍼블리셔');
  assert.ok(find(page.render(), node => node.type === 'Alert' && node.props.children === '프로필을 저장했어요.').length);
});

test('an account change immediately blocks saving the previous account values', async () => {
  const page = pageWith([profile(), profile('새 계정 이름')]);
  page.render(); await page.flush(); page.render();
  page.setAccount({ id: 'account-b', email: 'b@example.com' });
  let tree = page.render();
  assert.equal(field(tree, '이름').props.disabled, true);
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(page.writes.length, 0);
  await page.flush();
  tree = page.render();
  assert.equal(field(tree, '이름').props.value, '새 계정 이름');
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(page.writes[0].id, 'account-b');
  assert.equal(page.writes[0].display_name, '새 계정 이름');
});

test('same-account session and metadata updates preserve unsaved profile edits without reloading', async () => {
  const page = pageWith([profile()]);
  page.render(); await page.flush();
  field(page.render(), '이름').props.onChange({ target: { value: '저장 전 수정 이름' } });
  field(page.render(), '목표 직무').props.onChange({ target: { value: '수정한 목표 직무' } });

  for (const account of [
    { id: 'account-a', email: 'a@example.com', user_metadata: { display_name: '가입 이름' } },
    { id: 'account-a', email: 'changed@example.com', user_metadata: { display_name: '다른 표시 이름' } },
  ]) {
    page.setAccount(account);
    page.render(); await page.flush();
    const tree = page.render();
    assert.equal(field(tree, '이름').props.value, '저장 전 수정 이름');
    assert.equal(field(tree, '목표 직무').props.value, '수정한 목표 직무');
    assert.equal(button(tree, '프로필 저장').props.disabled, false);
    assert.deepEqual(page.reads, ['account-a']);
  }

  await button(page.render(), '프로필 저장').props.onClick();
  assert.equal(page.writes[0].id, 'account-a');
  assert.equal(page.writes[0].email, 'changed@example.com');
  assert.equal(page.writes[0].display_name, '저장 전 수정 이름');
  assert.equal(page.writes[0].target_role, '수정한 목표 직무');
});

test('a successful empty profile lookup allows first-time profile setup', async () => {
  const page = pageWith([{ data: null, error: null }]);
  page.render(); await page.flush();
  const tree = page.render();
  assert.equal(field(tree, '이름').props.value, '가입 이름');
  assert.equal(button(tree, '프로필 저장').props.disabled, false);
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(page.writes.length, 1);
});

test('a late response for the previous account cannot replace the current profile', async () => {
  let finishPreviousRead;
  const previousRead = new Promise(resolve => { finishPreviousRead = resolve; });
  const page = pageWith([() => previousRead, profile('현재 계정 이름')]);
  page.render(); await page.flush();
  page.setAccount({ id: 'account-b', email: 'b@example.com' });
  page.render(); await page.flush();
  finishPreviousRead(profile('이전 계정 이름'));
  await page.flush();
  const tree = page.render();
  assert.equal(field(tree, '이름').props.value, '현재 계정 이름');
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(page.writes[0].id, 'account-b');
  assert.equal(page.writes[0].display_name, '현재 계정 이름');
});

test('a failed save retains loaded values and allows retry', async () => {
  const page = pageWith([profile()]);
  page.render(); await page.flush();
  page.setSaveResult({ data: null, error: { message: 'Save denied' } });
  await button(page.render(), '프로필 저장').props.onClick();
  const tree = page.render();
  assert.equal(field(tree, '이름').props.value, '저장된 이름');
  assert.equal(button(tree, '프로필 저장').props.disabled, false);
  assert.ok(find(tree, node => node.type === 'Alert' && node.props.severity === 'error').length);
});

test('unsaved profile fields, including an intentional blank, survive leaving and reopening settings', async () => {
  const first = pageWith([profile()]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '' } });
  field(first.render(), '목표 직무').props.onChange({ target: { value: '작성 중 직무' } });
  first.unmount();
  const reopened = pageWith([profile()], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  const tree = reopened.render();
  assert.equal(field(tree, '이름').props.value, '');
  assert.equal(field(tree, '목표 직무').props.value, '작성 중 직무');
  assert.ok(button(tree, '저장된 값으로 되돌리기'));
  assert.equal(reopened.writes.length, 0);
});

test('profile save failure preserves the draft across re-entry and successful retry clears it', async () => {
  const first = pageWith([profile()]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '저장할 이름' } });
  first.setSaveResult(new Error('Offline'));
  await button(first.render(), '프로필 저장').props.onClick();
  first.unmount();
  const reopened = pageWith([profile()], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  assert.equal(field(reopened.render(), '이름').props.value, '저장할 이름');
  await button(reopened.render(), '프로필 저장').props.onClick();
  assert.equal(reopened.draftStore.read('user:account-a', 'profile', 'profile'), null);
  assert.equal(reopened.writes[0].display_name, '저장할 이름');
  assert.equal(button(reopened.render(), '저장된 값으로 되돌리기'), undefined);
});

test('a failed profile read keeps an existing draft protected until a successful retry', async () => {
  const first = pageWith([profile()]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '보호할 이름' } });
  first.unmount();
  const reopened = pageWith([{ data: null, error: { message: 'Read denied' } }, profile()], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  let tree = reopened.render();
  assert.equal(field(tree, '이름').props.disabled, true);
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(reopened.writes.length, 0);
  assert.equal(reopened.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '보호할 이름');
  button(tree, '다시 불러오기').props.onClick();
  reopened.render(); await reopened.flush();
  tree = reopened.render();
  assert.equal(field(tree, '이름').props.value, '보호할 이름');
  assert.equal(field(tree, '이름').props.disabled, false);
});

test('a late profile save cannot erase newer input made after reopening settings', async () => {
  let finishSave;
  const response = new Promise(resolve => { finishSave = resolve; });
  const first = pageWith([profile()]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '먼저 저장한 이름' } });
  first.setSaveResult(() => response);
  const pendingSave = button(first.render(), '프로필 저장').props.onClick();
  first.unmount();
  const reopened = pageWith([profile()], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  field(reopened.render(), '이름').props.onChange({ target: { value: '나중에 작성한 이름' } });
  finishSave({ data: { id: 'account-a' }, error: null });
  await pendingSave;
  assert.equal(reopened.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '나중에 작성한 이름');
  assert.equal(field(reopened.render(), '이름').props.value, '나중에 작성한 이름');
  await button(reopened.render(), '프로필 저장').props.onClick();
  assert.equal(reopened.writes[0].display_name, '나중에 작성한 이름');
  assert.equal(reopened.draftStore.hasDrafts(), false);
});

test('discard restores fresh server values while explicit input stays protected until confirmed', async () => {
  const first = pageWith([profile()]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '작성 중 이름' } });
  first.unmount();
  const reopened = pageWith([profile('다른 화면에서 저장된 이름'), profile('가장 최근 저장된 이름'), profile('가장 최근 저장된 이름')], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  await button(reopened.render(), '저장된 값으로 되돌리기').props.onClick();
  assert.equal(field(reopened.render(), '이름').props.value, '가장 최근 저장된 이름');
  assert.equal(reopened.draftStore.hasDrafts(), false);
  field(reopened.render(), '목표 직무').props.onChange({ target: { value: '변경 중' } });
  assert.equal(reopened.draftStore.hasDrafts(), true);
  field(reopened.render(), '목표 직무').props.onChange({ target: { value: '웹 퍼블리셔' } });
  assert.equal(reopened.draftStore.hasDrafts(), true);
  await button(reopened.render(), '저장된 값으로 되돌리기').props.onClick();
  assert.equal(reopened.draftStore.hasDrafts(), false);
  assert.equal(reopened.writes.length, 0);
});

test('discard re-reads the profile after a save from the previous visit finishes', async () => {
  let finishSave;
  const response = new Promise(resolve => { finishSave = resolve; });
  const first = pageWith([profile('이전 이름 A')]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '저장한 이름 B' } });
  first.setSaveResult(() => response);
  const pendingSave = button(first.render(), '프로필 저장').props.onClick();
  first.unmount();
  const reopened = pageWith([profile('이전 이름 A'), profile('저장한 이름 B')], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  finishSave({ data: { id: 'account-a' }, error: null });
  await pendingSave;
  assert.equal(reopened.draftStore.hasDrafts(), false);
  field(reopened.render(), '목표 직무').props.onChange({ target: { value: '버릴 직무 수정' } });
  await button(reopened.render(), '저장된 값으로 되돌리기').props.onClick();
  const tree = reopened.render();
  assert.equal(field(tree, '이름').props.value, '저장한 이름 B');
  assert.equal(field(tree, '목표 직무').props.value, '웹 퍼블리셔');
  await button(tree, '프로필 저장').props.onClick();
  assert.equal(reopened.writes[0].display_name, '저장한 이름 B');
});

test('typing an old baseline after a late save remains recoverable on the next visit', async () => {
  let finishSave;
  const response = new Promise(resolve => { finishSave = resolve; });
  const first = pageWith([profile('이전 이름 A')]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '저장한 이름 B' } });
  first.setSaveResult(() => response);
  const pendingSave = button(first.render(), '프로필 저장').props.onClick();
  first.unmount();
  const reopened = pageWith([profile('이전 이름 A')], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  finishSave({ data: { id: 'account-a' }, error: null });
  await pendingSave;
  field(reopened.render(), '이름').props.onChange({ target: { value: '이전 이름 A' } });
  assert.equal(first.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '이전 이름 A');
  reopened.unmount();
  const nextVisit = pageWith([profile('저장한 이름 B')], { draftStore: first.draftStore });
  nextVisit.render(); await nextVisit.flush();
  assert.equal(field(nextVisit.render(), '이름').props.value, '이전 이름 A');
  await button(nextVisit.render(), '프로필 저장').props.onClick();
  assert.equal(nextVisit.writes[0].display_name, '이전 이름 A');
  assert.equal(first.draftStore.hasDrafts(), false);
});

test('reopening against an unchanged server value keeps intentional input while an older save is pending', async () => {
  let finishSave;
  const response = new Promise(resolve => { finishSave = resolve; });
  const first = pageWith([profile('이전 이름 A')]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '저장할 이름 B' } });
  first.setSaveResult(() => response);
  const pendingSave = button(first.render(), '프로필 저장').props.onClick();
  first.unmount();
  const second = pageWith([profile('이전 이름 A')], { draftStore: first.draftStore });
  second.render(); await second.flush();
  field(second.render(), '이름').props.onChange({ target: { value: '이전 이름 A' } });
  second.unmount();
  const third = pageWith([profile('이전 이름 A')], { draftStore: first.draftStore });
  third.render(); await third.flush();
  assert.equal(first.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '이전 이름 A');
  finishSave({ data: { id: 'account-a' }, error: null });
  await pendingSave;
  third.unmount();
  const fourth = pageWith([profile('저장할 이름 B')], { draftStore: first.draftStore });
  fourth.render(); await fourth.flush();
  assert.equal(field(fourth.render(), '이름').props.value, '이전 이름 A');
  assert.equal(first.draftStore.hasDrafts(), true);
});

for (const failure of [{ data: null, error: { message: 'Read denied' } }, new Error('Offline')]) {
  test(`discard read failure preserves current input and draft (${failure instanceof Error ? 'network' : 'SDK'})`, async () => {
    const page = pageWith([profile(), failure]);
    page.render(); await page.flush();
    field(page.render(), '이름').props.onChange({ target: { value: '유지할 입력' } });
    await button(page.render(), '저장된 값으로 되돌리기').props.onClick();
    const tree = page.render();
    assert.equal(field(tree, '이름').props.value, '유지할 입력');
    assert.equal(field(tree, '이름').props.disabled, false);
    assert.equal(page.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '유지할 입력');
    assert.ok(find(tree, node => node.type === 'Alert' && node.props.children === '저장된 프로필을 불러오지 못했어요. 작성 중인 입력은 유지했어요.').length);
    assert.equal(page.writes.length, 0);
  });
}

test('pending discard blocks edits and cannot clear newer input after another page visit', async () => {
  let finishRead;
  const response = new Promise(resolve => { finishRead = resolve; });
  const first = pageWith([profile(), () => response]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '먼저 입력' } });
  const pendingDiscard = button(first.render(), '저장된 값으로 되돌리기').props.onClick();
  assert.equal(field(first.render(), '이름').props.disabled, true);
  assert.equal(button(first.render(), '프로필 저장').props.disabled, true);
  first.unmount();
  const reopened = pageWith([profile()], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  field(reopened.render(), '이름').props.onChange({ target: { value: '재진입 후 최신 입력' } });
  finishRead(profile());
  await pendingDiscard;
  assert.equal(reopened.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '재진입 후 최신 입력');
  assert.equal(field(reopened.render(), '이름').props.value, '재진입 후 최신 입력');
});

test('discard finishing after departure cannot clear the same draft restored on a new visit', async () => {
  let finishRead;
  const response = new Promise(resolve => { finishRead = resolve; });
  const first = pageWith([profile('서버 이름 A'), () => response]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: '초안 이름 B' } });
  const pendingDiscard = button(first.render(), '저장된 값으로 되돌리기').props.onClick();
  first.unmount();
  const reopened = pageWith([profile('서버 이름 A')], { draftStore: first.draftStore });
  reopened.render(); await reopened.flush();
  finishRead(profile('서버 이름 A'));
  await pendingDiscard;
  assert.equal(field(reopened.render(), '이름').props.value, '초안 이름 B');
  assert.equal(first.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, '초안 이름 B');
  reopened.unmount();
  const nextVisit = pageWith([profile('서버 이름 A')], { draftStore: first.draftStore });
  nextVisit.render(); await nextVisit.flush();
  assert.equal(field(nextVisit.render(), '이름').props.value, '초안 이름 B');
});

test('a late discard response cannot replace the next account profile or clear its draft', async () => {
  let finishRead;
  const response = new Promise(resolve => { finishRead = resolve; });
  const page = pageWith([profile('A 계정'), () => response, profile('B 계정')]);
  page.render(); await page.flush();
  field(page.render(), '이름').props.onChange({ target: { value: 'A 초안' } });
  const pendingDiscard = button(page.render(), '저장된 값으로 되돌리기').props.onClick();
  page.setAccount({ id: 'account-b', email: 'b@example.com' });
  page.render(); await page.flush();
  finishRead(profile('A 계정 최신값'));
  await pendingDiscard;
  assert.equal(field(page.render(), '이름').props.value, 'B 계정');
  assert.equal(page.draftStore.read('user:account-a', 'profile', 'profile').values.display_name, 'A 초안');
  assert.equal(page.writes.length, 0);
});

test('another account never restores the previous account profile draft and scope clearing removes it', async () => {
  const first = pageWith([profile()]);
  first.render(); await first.flush();
  field(first.render(), '이름').props.onChange({ target: { value: 'A 계정 초안' } });
  first.unmount();
  const other = pageWith([profile('B 계정 이름')], {
    draftStore: first.draftStore, initialAccount: { id: 'account-b', email: 'b@example.com' },
  });
  other.render(); await other.flush();
  assert.equal(field(other.render(), '이름').props.value, 'B 계정 이름');
  assert.equal(button(other.render(), '저장된 값으로 되돌리기'), undefined);
  first.draftStore.clearScope('user:account-a');
  const afterLogout = pageWith([profile()], { draftStore: first.draftStore });
  afterLogout.render(); await afterLogout.flush();
  assert.equal(field(afterLogout.render(), '이름').props.value, '저장된 이름');
  assert.equal(first.draftStore.hasDrafts(), false);
});
