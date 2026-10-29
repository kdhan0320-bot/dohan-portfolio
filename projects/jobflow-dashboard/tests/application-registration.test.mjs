import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { boardColumn, BOARD_COLUMNS, boardRows } from '../src/utils/applicationBoard.js';

const source = await readFile(new URL('../src/pages/ApplicationsPage.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' });
function registration(add, auth = { isGuest: true }) {
  let params = new URLSearchParams('new=1&q=previous');
  const destinations = [];
  const element = (type, props) => ({ type, props });
  const dependencies = {
    react: { useState: value => [value, () => {}] },
    '@mui/material': { Button: 'Button', InputAdornment: 'InputAdornment', Tabs: 'Tabs', Tab: 'Tab', useMediaQuery: () => false },
    'react/jsx-runtime': { jsx: element, jsxs: element, Fragment: 'Fragment' },
    'react-router-dom': { useSearchParams: () => [params, (next, options) => { params = next(params); destinations.push([params, options]); }] },
    '../components/applications/ApplicationsNav': 'nav',
    '../components/applications/ApplicationPanel': 'panel',
    '../components/ui/PageUI': { PageHeading: 'heading', LoadState: 'load', Empty: 'empty', CompanyMark: 'mark' },
    '../components/ui/Field': 'field',
    '../components/ui/StatusChip': 'status',
    '../components/ui/ActionFeedback': 'feedback',
    '../context/AuthContext': { useAuth: () => auth },
    '../hooks/useApplications': { __esModule: true, default: () => ({ applications: [], add }) },
    '../hooks/useChecklist': { __esModule: true, default: () => ({ items: [], refresh() {} }) },
    '../hooks/useToday': { useToday: () => '2026-09-27' },
    '../utils/dates': { shortDate() {}, deadlineLabel() {} },
    '../utils/applicationBoard': { boardColumn, BOARD_COLUMNS, boardRows },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, URLSearchParams,
    window: { requestAnimationFrame: fn => fn() }, document: { getElementById: () => ({ focus() {} }) },
    require: name => {
      if (name.startsWith('@mui/icons-material/')) return 'Icon';
      assert.ok(name in dependencies, name); return dependencies[name];
    }
  });
  function find(node) {
    if (Array.isArray(node)) return node.map(find).find(Boolean);
    if (!node || typeof node !== 'object') return null;
    return node.type === 'panel' ? node.props : find(node.props?.children);
  }
  return { panel: find(module.exports.default()), destinations };
}

test('new company opens in a dialog and saving reveals its matching stage', async () => {
  for (const status of ['관심', '서류 진행', '면접 예정', '합격', '보류']) {
    let received;
    const page = registration(async form => { received = form; return { id: 'new-company', status }; });
    assert.notEqual(page.panel.standalone, true);
    assert.equal(page.panel.creating, true);
    assert.equal(page.panel.draftScope, 'sample');
    assert.equal(page.destinations.length, 0);
    const payload = { company_name: '샘플 등록', status, deadline: '2026-10-31' };
    await page.panel.onSave(payload);
    assert.equal(received, payload);
    const params = page.destinations[0][0];
    assert.equal(params.get('new'), null);
    assert.equal(params.get('q'), null);
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
  assert.equal(page.destinations[0][0].get('new'), null);
  assert.equal(page.destinations[0][0].get('q'), 'previous');
});
