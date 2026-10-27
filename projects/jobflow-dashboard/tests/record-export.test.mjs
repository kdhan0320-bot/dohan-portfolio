import test from 'node:test';
import assert from 'node:assert/strict';
import { createRecordExport, loadRecordExport, getRecordExportFilename } from '../src/utils/recordExport.js';

function makeClient({ failTable, changedUser = false } = {}) {
  const calls = [];
  let authCalls = 0;
  return {
    calls,
    auth: { async getUser() { authCalls += 1; return { data: { user: { id: changedUser && authCalls > 1 ? 'other-user' : 'current-user' } } }; } },
    from(table) {
      const query = {
        select(fields) { calls.push({ table, fields }); return query; },
        eq(field, value) { calls.push({ table, field, value }); return query; },
        order() { return query; },
        async range(start, end) {
          calls.push({ table, start, end });
          if (table === failTable) return { data: null, error: new Error('denied') };
          const count = table === 'applications' ? 501 : 1;
          return { data: Array.from({ length: Math.max(0, Math.min(end + 1, count) - start) }, (_, index) => ({ id: `${table}-${start + index}` })) };
        },
        async maybeSingle() { return { data: { display_name: '검토용', target_role: '디자이너' }, error: table === failTable ? new Error('denied') : null }; },
      };
      return query;
    },
  };
}

test('sample backups are explicitly labelled and preserve question-only notes', () => {
  const result = createRecordExport({ applications: [], checklist: [], interviews: [{ question: '질문', answer: '' }], sample: true }, '2026-10-16T00:00:00Z');
  assert.equal(result.data_type, 'sample');
  assert.equal(result.interviews[0].answer, '');
  assert.equal(result.exported_at, '2026-10-16T00:00:00Z');
});

for (const [instant, koreanDate] of [
  ['2026-10-27T14:59:59.999Z', '2026-10-27'],
  ['2026-10-27T15:00:00.000Z', '2026-10-28'],
  ['2026-10-31T15:00:00.000Z', '2026-11-01'],
  ['2026-12-31T15:00:00.000Z', '2027-01-01'],
  ['2028-02-28T15:00:00.000Z', '2028-02-29'],
  ['2026-10-27T08:00:00-07:00', '2026-10-28'],
]) {
  test(`export filenames use Korea's date at ${instant}`, () => {
    for (const sample of [true, false]) {
      const records = createRecordExport({ applications: [], checklist: [], interviews: [], sample }, instant);
      assert.equal(getRecordExportFilename(records), `galpirok-${sample ? 'sample' : 'personal'}-${koreanDate}.json`);
      assert.equal(records.exported_at, instant, 'the machine-readable export timestamp must stay unchanged');
    }
  });
}

test('exports every page and filters every table to the signed-in owner', async () => {
  const client = makeClient();
  const result = await loadRecordExport(client, 'current-user');
  assert.equal(result.applications.length, 501);
  assert.equal(result.data_type, 'personal');
  assert.equal(client.calls.filter(call => call.table === 'applications' && 'start' in call).length, 2);
  const scopes = client.calls.filter(call => 'field' in call);
  assert.ok(scopes.length >= 4);
  assert.ok(scopes.every(call => call.value === 'current-user'));
  assert.ok(client.calls.find(call => call.table === 'interview_notes' && call.fields)?.fields.includes('related_project'));
});

test('fails the whole export when any record table fails', async () => {
  await assert.rejects(loadRecordExport(makeClient({ failTable: 'interview_notes' }), 'current-user'), /denied/);
});

test('fails the whole export when profile fetch fails', async () => {
  await assert.rejects(loadRecordExport(makeClient({ failTable: 'jobflow_profiles' }), 'current-user'), /denied/);
});

test('rejects stale or absent sessions instead of exporting mixed account data', async () => {
  await assert.rejects(loadRecordExport(makeClient(), null), /로그인/);
  await assert.rejects(loadRecordExport(makeClient(), 'another-user'), /로그인 상태/);
  await assert.rejects(loadRecordExport(makeClient({ changedUser: true }), 'current-user'), /로그인 상태/);
});
