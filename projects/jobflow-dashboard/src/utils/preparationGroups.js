const beforeApplication = company => ['관심', '지원 예정'].includes(company?.status);

// Sort by the company's schedule, never by a changing checkbox state.
export function comparePreparationCompanies(a, b) {
  const rank = company => beforeApplication(company) && company.deadline ? 0 : company?.status === '면접 예정' ? 1 : company ? 2 : 3;
  return rank(a) - rank(b) ||
    (beforeApplication(a) && beforeApplication(b) ? (a.deadline || '9999').localeCompare(b.deadline || '9999') : 0) ||
    (a?.company_name || '').localeCompare(b?.company_name || '', 'ko');
}

export function preparationGroups(items, companies) {
  const byId = new Map(companies.map(company => [company.id, company]));
  const groups = new Map();
  for (const item of items) {
    const id = item.application_id || 'common';
    if (!groups.has(id)) groups.set(id, { id, company: byId.get(id), title: id === 'common' ? '공통 준비' : byId.get(id)?.company_name || '연결한 회사 없음', items: [] });
    groups.get(id).items.push(item);
  }
  return [...groups.values()].sort((a, b) => comparePreparationCompanies(a.company, b.company) || a.id.localeCompare(b.id));
}

export function attentionCompanies(companies, tasks) {
  const companyIds = new Set(tasks.map(item => item.application_id));
  return companies.filter(company => !['합격', '불합격', '보류'].includes(company.status) &&
    (beforeApplication(company) || company.status === '면접 예정' || companyIds.has(company.id)))
    .sort(comparePreparationCompanies);
}

export { beforeApplication };
