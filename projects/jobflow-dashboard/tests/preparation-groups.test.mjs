import test from 'node:test';
import assert from 'node:assert/strict';
import { attentionCompanies, preparationGroups, todayCompanyGroups } from '../src/utils/preparationGroups.js';
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
test('completing preparation keeps pre-application and interview companies visible and preparation groups stable', () => {
  const completed = tasks.map(item => ({ ...item, is_done: true }));
  assert.deepEqual(attentionCompanies(companies, tasks), attentionCompanies(companies, completed));
  assert.deepEqual(preparationGroups(tasks, companies).map(item => item.id), preparationGroups(completed, companies).map(item => item.id));
});
test('a newly registered company remains visible before a deadline or task has been entered', () => {
  const first = { id: 'new', company_name: '새 회사', status: '관심', deadline: null };
  assert.deepEqual(attentionCompanies([first], []), [first]);
});

test('expired unsubmitted applications require review; today deadlines remain actionable', () => {
  const expired = { id: 'expired', company_name: '지난 마감', status: '지원 예정', deadline: '2026-09-26' };
  const dueToday = { id: 'today', company_name: '오늘 마감', status: '관심', deadline: '2026-09-27' };
  const input = [...companies, expired, dueToday];
  const before = structuredClone(input);
  const groups = todayCompanyGroups(input, tasks, '2026-09-27');
  assert.deepEqual(groups.needsReview.map(item => item.id), ['expired']);
  assert.deepEqual(groups.current.map(item => item.id), ['today', 'first', 'later', 'interview']);
  assert.deepEqual(input, before, 'grouping never changes status or stored dates');
});

test('reference-date rollover moves a company to review without duplicating or losing it', () => {
  const company = { id: 'day', company_name: '샘플 회사', status: '관심', deadline: '2026-09-27' };
  assert.equal(todayCompanyGroups([company], [], '2026-09-27').current.length, 1);
  const after = todayCompanyGroups([company], [], '2026-09-28');
  assert.deepEqual(after.current, []);
  assert.deepEqual(after.needsReview, [company]);
  assert.deepEqual(todayCompanyGroups([{ ...company, status: '지원 완료' }], [], '2026-09-28'), { current: [], needsReview: [] });
});

test('submitted companies need unfinished tasks, but completion never removes pre-application or interview records', () => {
  const submitted = { id: 'submitted', company_name: '서류 심사 중', status: '서류 진행' };
  const submittedTask = { id: 'task', application_id: 'submitted', is_done: false };
  assert.deepEqual(attentionCompanies([submitted], [submittedTask]), [submitted]);
  assert.deepEqual(attentionCompanies([submitted], [{ ...submittedTask, is_done: true }]), []);
  assert.deepEqual(attentionCompanies(companies, tasks.map(item => ({ ...item, is_done: true }))).map(item => item.id), ['first', 'later', 'interview']);
});

test('missing or invalid dates do not imply an expired deadline', () => {
  const input = ['', null, '2026-02-31'].map((deadline, index) => ({ id: String(index), company_name: String(index), status: '관심', deadline }));
  const groups = todayCompanyGroups(input, [], '2026-09-27');
  assert.equal(groups.needsReview.length, 0);
  assert.equal(groups.current.length, input.length);
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
  assert.equal(workspaceReturn('/welcome'), '/welcome');
  for (const value of [null, 'https://example.com', '//example.com', '/\\example.com', '/login', '/reset-password', '/unknown']) {
    assert.equal(workspaceReturn(value), '/overview');
    assert.equal(workspaceReturn(value, '/welcome'), '/welcome');
  }
  assert.equal(workspaceReturn(null, 'https://example.com'), '/overview');
});
