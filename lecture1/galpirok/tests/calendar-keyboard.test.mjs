import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarFocusDate, keyboardDate, monthCells } from '../src/utils/calendar.js';

test('arrow keys move by a day or week across month and year boundaries', () => {
  assert.equal(keyboardDate('2026-09-30', 'ArrowRight'), '2026-10-01');
  assert.equal(keyboardDate('2026-01-01', 'ArrowLeft'), '2025-12-31');
  assert.equal(keyboardDate('2026-12-28', 'ArrowDown'), '2027-01-04');
  assert.equal(keyboardDate('2026-03-02', 'ArrowUp'), '2026-02-23');
});

test('Home and End use the Monday-to-Sunday calendar week', () => {
  assert.equal(keyboardDate('2026-10-01', 'Home'), '2026-09-28');
  assert.equal(keyboardDate('2026-10-01', 'End'), '2026-10-04');
  assert.equal(keyboardDate('2026-09-28', 'Home'), '2026-09-28');
  assert.equal(keyboardDate('2026-10-04', 'End'), '2026-10-04');
});

test('Page keys clamp end-of-month dates and preserve valid day numbers', () => {
  assert.equal(keyboardDate('2026-01-31', 'PageDown'), '2026-02-28');
  assert.equal(keyboardDate('2024-01-31', 'PageDown'), '2024-02-29');
  assert.equal(keyboardDate('2024-03-31', 'PageUp'), '2024-02-29');
  assert.equal(keyboardDate('2026-01-15', 'PageUp'), '2025-12-15');
  assert.equal(keyboardDate('2026-12-15', 'PageDown'), '2027-01-15');
});

test('leap-day and DST-season navigation remain calendar-day based', () => {
  assert.equal(keyboardDate('2024-02-28', 'ArrowRight'), '2024-02-29');
  assert.equal(keyboardDate('2024-02-29', 'ArrowRight'), '2024-03-01');
  assert.equal(keyboardDate('2026-03-08', 'ArrowRight'), '2026-03-09');
  assert.equal(keyboardDate('2026-11-01', 'ArrowLeft'), '2026-10-31');
});

test('selection keys and invalid dates are left to normal button behavior', () => {
  for (const key of ['Enter', ' ', 'Tab', 'Escape']) assert.equal(keyboardDate('2026-09-27', key), null);
  assert.equal(keyboardDate('2026-02-29', 'ArrowRight'), null);
  assert.equal(keyboardDate(undefined, 'PageDown'), null);
  assert.equal(keyboardDate('9999-12-31', 'ArrowRight'), null);
});

test('the displayed month has exactly one Tab entry, with useful focus fallbacks', () => {
  const scenarios = [
    ['2026-09', null, null, '2026-09-27', '2026-09-27'],
    ['2026-09', '2026-09-14', null, '2026-09-27', '2026-09-14'],
    ['2026-09', '2026-09-14', '2026-09-18', '2026-09-27', '2026-09-18'],
    ['2026-10', null, '2026-09-18', '2026-09-27', '2026-10-01'],
  ];
  for (const [month, selected, focused, today, expected] of scenarios) {
    const entry = calendarFocusDate(month, selected, focused, today);
    assert.equal(entry, expected);
    assert.equal(monthCells(month).filter(day => day === entry).length, 1);
  }
});
