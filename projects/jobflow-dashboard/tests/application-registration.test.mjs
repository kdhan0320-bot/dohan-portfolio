import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { boardColumn } from '../src/utils/applicationBoard.js';

const source = await readFile(new URL('../src/pages/ApplicationFormPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });
function registration(add, auth = { isGuest: true }) {
  const destinations = [];
  const element = (type, props) => ({ type, props });
  const dependencies = {
    'react/jsx-runtime': { jsx: element, jsxs: element },
    'react-router-dom': { useNavigate: () => (...args) => destinations.push(args) },
    '../components/applications/ApplicationPanel': 'panel',
    '../components/ui/PageUI': { PageHeading: 'heading' },
    '../context/AuthContext': { useAuth: () => auth },
    '../hooks/useApplications': { __esModule: true, default: () => ({ add }) },
    '../utils/applicationBoard': { boardColumn },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, URLSearchParams, require: name => {
    assert.ok(name in dependencies, name);
    return dependencies[name];
  } });
  return { panel: module.exports.default().props.children.find(child => child.type === 'panel').props, destinations };
}

test('new company uses the validated standalone form and opens the saved record in its stage', async () => {
  for (const status of ['관심', '서류 진행', '면접 예정', '합격', '보류']) {
    let received;
    const page = registration(async form => { received = form; return { id: 'new-company', status }; });
    assert.equal(page.panel.standalone, true);
    assert.equal(page.panel.creating, true);
    assert.equal(page.panel.draftScope, 'sample');
    assert.equal(page.destinations.length, 0);
    const payload = { company_name: '샘플 등록', status, deadline: '2026-10-31' };
    await page.panel.onSave(payload);
    assert.equal(received, payload);
    const params = new URLSearchParams(page.destinations[0][0].split('?')[1]);
    assert.equal(params.get('company'), 'new-company');
    assert.equal(params.get(status === '보류' ? 'view' : 'lane'), boardColumn(status));
    assert.equal(page.destinations[0][1].replace, true);
  }
});

test('failed company creation stays on the form, and account drafts have their own scope', async () => {
  const page = registration(async () => { throw new Error('저장 실패'); }, { user: { id: 'account-a' } });
  assert.equal(page.panel.draftScope, 'user:account-a');
  await assert.rejects(page.panel.onSave({ company_name: '검증' }), /저장 실패/);
  assert.equal(page.destinations.length, 0);
  page.panel.onClose();
  assert.equal(page.destinations[0][0], '/');
});
