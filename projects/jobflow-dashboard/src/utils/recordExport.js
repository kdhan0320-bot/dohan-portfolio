const PAGE_SIZE = 500;
const EXPORT_FIELDS = {
  applications: 'id,company_name,position,status,job_url,deadline,applied_date,location,company_size,priority,resume_submitted,portfolio_submitted,memo,created_at,updated_at',
  portfolio_checklists: 'id,application_id,title,category,is_done,sort_order,created_at,updated_at',
  interview_notes: 'id,application_id,question,answer,related_project,importance,is_reviewed,created_at,updated_at',
};

export function createRecordExport({ applications, checklist, interviews, profile = null, sample = false }, exportedAt = new Date().toISOString()) {
  return {
    service: '갈피록',
    format_version: 1,
    exported_at: exportedAt,
    data_type: sample ? 'sample' : 'personal',
    profile,
    applications,
    checklist,
    interviews,
  };
}

async function readAll(client, table, userId) {
  const rows = [];
  for (let start = 0; ; start += PAGE_SIZE) {
    const { data, error } = await client.from(table).select(EXPORT_FIELDS[table]).eq('user_id', userId).order('id').range(start, start + PAGE_SIZE - 1);
    if (error) throw error;
    if (!Array.isArray(data)) throw new Error('기록을 모두 불러오지 못했어요. 다시 시도해주세요.');
    rows.push(...data);
    if (data.length < PAGE_SIZE) return rows;
  }
}

export async function loadRecordExport(client, userId) {
  if (!userId) throw new Error('로그인 후 기록을 내려받을 수 있어요.');
  const assertUser = async () => {
    const { data, error } = await client.auth.getUser();
    if (error) throw error;
    if (data.user?.id !== userId) throw new Error('로그인 상태가 바뀌었어요. 다시 로그인한 후 내려받아주세요.');
  };
  await assertUser();
  const [applications, checklist, interviews, profile] = await Promise.all([
    readAll(client, 'applications', userId),
    readAll(client, 'portfolio_checklists', userId),
    readAll(client, 'interview_notes', userId),
    client.from('jobflow_profiles').select('display_name,target_role').eq('id', userId).maybeSingle(),
  ]);
  if (profile.error) throw profile.error;
  await assertUser();
  return createRecordExport({ applications, checklist, interviews, profile: profile.data });
}

export function downloadRecordExport(records) {
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `galpirok-${records.data_type}-${records.exported_at.slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
