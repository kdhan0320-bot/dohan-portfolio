import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import * as authErrors from '../src/utils/authErrors.js';
import * as authRecovery from '../src/utils/authRecovery.js';

// Exercise the real provider's handlers against an SDK double. Effects and real
// authentication are intentionally outside this unit test; browser checks cover routing.
const source = await readFile(new URL('../src/context/AuthContext.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, {
  loader: 'jsx', format: 'cjs', jsx: 'automatic',
  define: { 'import.meta.env.BASE_URL': '"/jobflow-dashboard/"' },
});

function providerWith(auth) {
  const state = [];
  let cursor = 0;
  const storage = new Map();
  const noOp = () => {};
  const react = {
    createContext: () => ({ Provider: 'provider' }),
    useContext: noOp,
    useState: initial => {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value; }];
    },
    useRef: value => ({ current: value }),
    useEffect: noOp,
  };
  const dependencies = {
    react,
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }) },
    'react-router-dom': { useNavigate: () => noOp },
    '../lib/supabase': { supabase: { auth }, isAuthConfigured: true, initialAuthCallback: { isCallback: false } },
    '../utils/authErrors': authErrors,
    '../utils/authRecovery': authRecovery,
    '../utils/recordDraftStore': { recordDraftStore: {} },
    '../constants': { DEMO_APPLICATIONS: [{ id: 'sample-company' }], DEMO_CHECKLISTS: [], DEMO_INTERVIEW_NOTES: [] },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, structuredClone,
    require: name => {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    window: {
      location: { origin: 'https://example.com' },
      sessionStorage: {
        getItem: key => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
        removeItem: key => storage.delete(key),
      },
    },
  });
  const render = () => {
    cursor = 0;
    return module.exports.AuthProvider({ children: null }).props.value;
  };
  return { render, storage };
}

test('confirmation-pending signup keeps the current sample workspace', async () => {
  const provider = providerWith({ signUp: async () => ({ data: { user: { id: 'pending' }, session: null }, error: null }) });
  await provider.render().enterGuestMode();
  const result = await provider.render().signUp('sample@example.com', 'example-password', 'Sample');
  assert.equal(result.requiresEmailConfirmation, true);
  assert.equal(provider.render().isGuest, true);
  assert.equal(provider.storage.get('jobflow-guest-mode'), 'true');
});

test('signup with an authenticated session leaves the sample workspace', async () => {
  const account = { id: 'account' };
  const provider = providerWith({ signUp: async () => ({ data: { user: account, session: { user: account } }, error: null }) });
  await provider.render().enterGuestMode();
  const result = await provider.render().signUp('sample@example.com', 'example-password', 'Sample');
  assert.equal(result.requiresEmailConfirmation, false);
  assert.equal(provider.render().isGuest, false);
  assert.equal(provider.storage.has('jobflow-guest-mode'), false);
});

test('failed account requests do not leave the sample workspace', async () => {
  const failed = async () => ({ data: {}, error: { code: 'invalid_credentials', message: 'Invalid credentials' } });
  const provider = providerWith({ signUp: failed, signInWithPassword: failed });
  await provider.render().enterGuestMode();
  await assert.rejects(provider.render().signUp('sample@example.com', 'example-password', 'Sample'));
  await assert.rejects(provider.render().signIn('sample@example.com', 'example-password'));
  assert.equal(provider.render().isGuest, true);
  assert.equal(provider.storage.get('jobflow-guest-mode'), 'true');
});

test('returning to the sample keeps its edited records instead of reinitializing them', async () => {
  const provider = providerWith({ signOut: async () => { throw new Error('A sample visitor must not sign out an account'); } });
  await provider.render().enterGuestMode();
  provider.render().setDemoNotes([{ id: 'local-question', answer: 'Recorded sample answer' }]);
  await provider.render().enterGuestMode();
  assert.equal(provider.render().isGuest, true);
  assert.equal(provider.render().demoNotes[0].answer, 'Recorded sample answer');
});
