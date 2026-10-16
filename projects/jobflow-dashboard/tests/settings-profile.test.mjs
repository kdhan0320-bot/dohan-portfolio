import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

// Render the actual page and run its effects against an SDK double. This checks
// failed reads, recovery and account changes without making an account or DB request.
const source = await readFile(new URL('../src/pages/SettingsPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });

function pageWith(readResults) {
  const state = [];
  const effects = new Map();
  const pendingEffects = [];
  const reads = [];
  const writes = [];
  let cursor = 0;
  let account = { id: 'account-a', email: 'a@example.com', user_metadata: { display_name: '가입 이름' } };
  let saveResult = { data: { id: account.id }, error: null };
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
            return { maybeSingle: async () => saveResult };
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
  return { render, flush, reads, writes, setAccount: user => { account = user; }, setSaveResult: result => { saveResult = result; } };
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
