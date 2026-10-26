import test from 'node:test';
import assert from 'node:assert/strict';
import { attentionCompanies, preparationGroups } from '../src/utils/preparationGroups.js';
import { workspaceReturn } from '../src/utils/workspaceReturn.js';

const companies = [
  { id: 'interview', company_name: '면접 회사', status: '면접 예정', deadline: '2026-09-01' },
  { id: 'later', company_name: '다음 회사', status: '관심', deadline: '2026-10-02' },
  { id: 'first', company_name: '먼저 지원할 회사', status: '지원 예정', deadline: '2026-09-29' },
  { id: 'closed', company_name: '종료한 회사', status: '불합격', deadline: '2026-09-28' },
];
const tasks = [
  { id: 'a', application_id: 'interview', is_done: false },
  { id: 'b', application_id: 'first', is_done: false },
  { id: 'c', application_id: null, is_done: false },
  { id: 'd', application_id: 'closed', is_done: false },
];

test('company priority uses unsubmitted deadlines and leaves completed/rejected applications out of urgent deadlines', () => {
  assert.deepEqual(attentionCompanies(companies, tasks).map(item => item.id), ['first', 'later', 'interview']);
});
test('completing preparation neither removes nor reorders the company under the pointer', () => {
  const completed = tasks.map(item => ({ ...item, is_done: true }));
  assert.deepEqual(attentionCompanies(companies, tasks), attentionCompanies(companies, completed));
  assert.deepEqual(preparationGroups(tasks, companies).map(item => item.id), preparationGroups(completed, companies).map(item => item.id));
});
test('a newly registered company remains visible before a deadline or task has been entered', () => {
  const first = { id: 'new', company_name: '새 회사', status: '관심', deadline: null };
  assert.deepEqual(attentionCompanies([first], []), [first]);
});
test('all tasks appear once, with common and missing-company tasks kept distinguishable', () => {
  const items = [...tasks, { id: 'orphan', application_id: 'missing', is_done: false }];
  const groups = preparationGroups(items, companies);
  assert.equal(groups.flatMap(group => group.items).length, items.length);
  assert.equal(groups.find(group => group.id === 'common').title, '공통 준비');
  assert.equal(groups.find(group => group.id === 'missing').title, '연결한 회사 없음');
  assert.equal(items[0].id, 'a');
});
test('sample return preserves local company filters and rejects external or auth destinations', () => {
  assert.equal(workspaceReturn('/checklist?company=demo-1'), '/checklist?company=demo-1');
  assert.equal(workspaceReturn('/settings'), '/settings');
  for (const value of [null, 'https://example.com', '//example.com', '/\\example.com', '/login', '/welcome', '/reset-password', '/unknown']) assert.equal(workspaceReturn(value), '/overview');
});
