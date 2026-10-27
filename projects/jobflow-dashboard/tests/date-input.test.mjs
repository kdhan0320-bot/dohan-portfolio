import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDateInput } from '../src/utils/dateInput.js';
import { buildApplicationPayload } from '../src/utils/applicationPayload.js';

test('date input supports complete numeric typing and normalizes valid calendar dates', () => {
  for (const [input, expected] of [
    ['20260929', '2026-09-29'], ['2026-9-2', '2026-09-02'],
    ['2026/09/29', '2026-09-29'], [' 2026.09.29 ', '2026-09-29'],
    ['2000-02-29', '2000-02-29'], ['2028-02-29', '2028-02-29'],
  ]) assert.deepEqual(parseDateInput(input), { value: expected, error: '' });
});

test('partial, impossible and trailing input is rejected instead of being discarded', () => {
  for (const input of ['2026', '2026-', '2026-9', '202609', '2026-09-', '2026-02-29', '1900-02-29', '2026-04-31', '2026-00-01', '2026-13-01', '2026-01-00', '0000-01-01', '2026-09-29()', '202609290']) {
    assert.equal(parseDateInput(input).value, null, input);
    assert.ok(parseDateInput(input).error, input);
  }
});

test('saving validates both dates at the payload boundary while retaining optional empty dates', () => {
  for (const field of ['deadline', 'applied_date']) {
    assert.throws(() => buildApplicationPayload({ [field]: '2026-10' }), /연·월·일/);
    assert.throws(() => buildApplicationPayload({ [field]: '2026-02-29' }), /실제 달력/);
    assert.deepEqual(buildApplicationPayload({ [field]: '20260929' }), { [field]: '2026-09-29' });
    for (const value of ['', ' ', null, undefined]) assert.deepEqual(buildApplicationPayload({ [field]: value }), { [field]: null });
  }
  assert.deepEqual(buildApplicationPayload({ memo: '날짜와 무관한 수정' }), { memo: '날짜와 무관한 수정' });
});
