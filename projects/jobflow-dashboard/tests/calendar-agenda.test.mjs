import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_APPLICATIONS, DEMO_TODAY } from '../src/constants/index.js';
import { agendaDeadlines, calendarState, pendingDeadlines } from '../src/utils/calendar.js';

const today = '2026-09-27';
const applications = [
  { id: 'next-month', company_name: '다음 회사', status: '지원 예정', deadline: '2026-10-02' },
  { id: 'submitted', company_name: '지원한 회사', status: '서류 제출', deadline: '2026-10-01' },
  { id: 'this-month', company_name: '이번 회사', status: '관심', deadline: '2026-09-29' },
  { id: 'overdue', company_name: '지난 회사', status: '지원 예정', deadline: '2026-09-25' },
  { id: 'today', company_name: '오늘 회사', status: '관심', deadline: today },
  { id: 'undated', company_name: '미등록 회사', status: '관심', deadline: '' },
];
const pending = pendingDeadlines(applications);
const select = (query, reference = today, records = pending) => {
  const state = calendarState(new URLSearchParams(query), reference);
  return { ...state, ids: agendaDeadlines(records, state, reference).map(application => application.id) };
};

test('the default agenda includes today and next-month deadlines in date order', () => {
  assert.deepEqual(select(''), {
    month: '2026-09', date: null, scope: 'upcoming',
    ids: ['today', 'this-month', 'next-month'],
  });
});

test('the sample opens both September 29 and October 2 without changing the month', () => {
  const records = pendingDeadlines(DEMO_APPLICATIONS);
  const state = calendarState(new URLSearchParams(), DEMO_TODAY);
  assert.equal(state.month, '2026-09');
  assert.deepEqual(agendaDeadlines(records, state, DEMO_TODAY).map(application => application.deadline), [
    '2026-09-29', '2026-10-02',
  ]);
});

test('explicit month navigation includes that entire month, including past dates', () => {
  assert.deepEqual(select('month=2026-09').ids, ['overdue', 'today', 'this-month']);
  assert.equal(select('month=2026-09').scope, 'month');
  assert.deepEqual(select('month=2026-10').ids, ['next-month']);
  assert.deepEqual(select('month=2026-11').ids, []);
});

test('a selected day has a stable URL state and clears when a different month is chosen', () => {
  const selection = select('month=2026-10&date=2026-10-02');
  assert.equal(selection.date, '2026-10-02');
  assert.equal(selection.scope, 'date');
  assert.deepEqual(selection.ids, ['next-month']);
  assert.deepEqual(select('month=2026-10&date=2026-10-03').ids, []);
  assert.equal(select('month=2026-09&date=2026-10-02').date, null);
  assert.deepEqual(select('month=2026-09&date=2026-10-02').ids, ['overdue', 'today', 'this-month']);
});

test('clearing selection returns to upcoming deadlines, while malformed parameters have safe fallbacks', () => {
  assert.equal(select('month=invalid&date=2026-02-30').scope, 'upcoming');
  assert.deepEqual(select('month=2026-99').ids, select('').ids);
  assert.deepEqual(select('').ids, ['today', 'this-month', 'next-month']);
  assert.equal(select('month=2026-09&date=2026-09-31').scope, 'month');
});

test('upcoming deadlines cross year boundaries and respect the supplied reference date', () => {
  const records = pendingDeadlines([
    { id: 'future', company_name: '새해 회사', status: '관심', deadline: '2027-01-03' },
    { id: 'past', company_name: '지난 회사', status: '관심', deadline: '2026-12-29' },
    { id: 'year-end', company_name: '연말 회사', status: '지원 예정', deadline: '2026-12-31' },
  ]);
  assert.deepEqual(select('', '2026-12-30', records).ids, ['year-end', 'future']);
  assert.deepEqual(select('', '2027-01-04', records).ids, []);
});

test('filtering does not reorder or mutate source applications', () => {
  const snapshot = structuredClone(applications);
  select('month=2026-09');
  select('');
  assert.deepEqual(applications, snapshot);
});
