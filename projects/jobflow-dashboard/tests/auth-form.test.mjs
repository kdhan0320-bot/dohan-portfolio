import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import { EMAIL_COOLDOWN_KEY, EMAIL_COOLDOWN_MS, emailCooldownSeconds } from '../src/utils/authRecovery.js';

const source = await readFile(new URL('../src/pages/LoginPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });

function find(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => find(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [predicate(tree) ? tree : null, ...find(tree.props?.children, predicate)].filter(Boolean);
}

// Router search updates can commit after local state and an animation frame.
// Attach new input refs before effects, as React does, without account requests.
function loginPage() {
  const state = [];
  const effects = new Map();
  const pendingEffects = [];
  const frames = [];
  let cursor = 0;
  let search = new URLSearchParams();
  let pendingSearch;
  let tree;
  let active = null;
  let formKey;
  let mountedFields = new Map();
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
      if (!previous || dependencies.some((value, i) => !Object.is(value, previous.dependencies[i]))) {
        pendingEffects.push(() => {
          previous?.cleanup?.();
          effects.set(index, { dependencies, cleanup: callback() });
        });
      }
    },
  };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
    '@mui/material': Object.fromEntries(['Button', 'Alert', 'Tabs', 'Tab', 'IconButton', 'InputAdornment'].map(name => [name, name])),
    'react-router-dom': { Link: 'Link', useNavigate: () => noOp, useSearchParams: () => [search, value => { pendingSearch = value; }] },
    '../components/ui/Field': 'Field',
    '../components/ui/Brand': { Brand: 'Brand' },
    '../context/AuthContext': { useAuth: () => ({ isGuest: true }) },
    '../lib/supabase': { isAuthConfigured: false },
    '../utils/authErrors': { getAuthErrorMessage: noOp },
    '../utils/authRecovery': { EMAIL_COOLDOWN_KEY, EMAIL_COOLDOWN_MS, emailCooldownSeconds },
    '../styles/auth.css': {},
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, URLSearchParams,
    window: { sessionStorage: { getItem: () => null }, requestAnimationFrame: callback => frames.push(callback) },
    require(name) {
      if (name.startsWith('@mui/icons-material/')) return name;
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  function commit() {
    cursor = 0;
    tree = module.exports.default();
    const nextKey = search.get('mode') || find(tree, node => node.type === 'Tabs')[0].props.value;
    if (nextKey !== formKey) {
      active = null;
      mountedFields = new Map();
      formKey = nextKey;
    }
    for (const field of find(tree, node => node.type === 'Field' && node.props.inputRef)) {
      const id = field.props.id;
      if (!mountedFields.has(id)) mountedFields.set(id, { focus: () => { active = id; } });
      field.props.inputRef.current = mountedFields.get(id);
    }
    for (const effect of pendingEffects.splice(0)) effect();
  }
  commit();
  return {
    commit,
    tree: () => tree,
    active: () => active,
    selectTab(value) { find(tree, node => node.type === 'Tabs')[0].props.onChange(null, value); commit(); },
    click(label) { find(tree, node => node.type === 'Button' && node.props.children === label)[0].props.onClick(); },
    finishRoute() { search = pendingSearch; pendingSearch = undefined; commit(); },
    flushFrame() { for (const callback of frames.splice(0)) callback(); },
  };
}

test('help navigation focuses the new email field after a delayed route commit', () => {
  const page = loginPage();
  page.selectTab(1);
  page.click('비밀번호를 잊었나요?');
  page.commit();
  page.flushFrame();
  page.finishRoute();
  assert.equal(page.active(), 'auth-email');
  assert.equal(find(page.tree(), node => node.props?.role === 'tabpanel').length, 0);
  assert.equal(find(page.tree(), node => node.type === 'form').length, 1);

  page.click('로그인으로 돌아가기');
  page.commit();
  page.flushFrame();
  page.finishRoute();
  assert.equal(page.active(), 'auth-email');
});

test('login and signup each expose one associated panel without duplicate inputs', () => {
  const page = loginPage();
  for (const selected of [0, 1, 0]) {
    page.selectTab(selected);
    const tree = page.tree();
    const tabs = find(tree, node => node.type === 'Tab');
    const panels = find(tree, node => node.props?.role === 'tabpanel');
    assert.equal(panels.filter(node => !node.props.hidden).length, 1);
    for (const tab of tabs) {
      const panel = panels.find(node => node.props.id === tab.props['aria-controls']);
      assert.ok(panel);
      assert.equal(panel.props['aria-labelledby'], tab.props.id);
    }
    assert.equal(find(tree, node => node.type === 'Field' && node.props.id === 'auth-email').length, 1);
    assert.equal(find(tree, node => node.type === 'form').length, 1);
  }
  assert.equal(page.active(), null, 'switching a tab does not steal focus from its tab button');
});
