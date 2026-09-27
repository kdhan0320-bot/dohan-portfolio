// UI groups only. Keep the persisted status values and existing database contract.
export const APPLICATION_STAGES = [
  { id: 'saved', number: '01', label: '회사 담기', hint: '관심 있는 회사를 모아요', statuses: ['관심'], tone: 'sage' },
  { id: 'preparing', number: '02', label: '지원 준비', hint: '지원부터 면접까지 이어가요', statuses: ['지원 예정', '지원 완료', '서류 진행', '면접 예정'], tone: 'mauve' },
  { id: 'recorded', number: '03', label: '결과 기록', hint: '결과와 보류한 이유를 남겨요', statuses: ['합격', '불합격', '보류'], tone: 'sand' },
];

export function getApplicationStage(status) {
  return APPLICATION_STAGES.find(stage => stage.statuses.includes(status));
}

export function filterApplications(applications, { stage = 'all', status = '전체', search = '', sort = 'newest' } = {}) {
  const group = APPLICATION_STAGES.find(item => item.id === stage);
  const query = search.trim().toLocaleLowerCase('ko');
  return applications.filter(a => (!group || group.statuses.includes(a.status)) &&
    (status === '전체' || a.status === status) &&
    [a.company_name, a.position, a.memo].filter(Boolean).join(' ').toLocaleLowerCase('ko').includes(query))
    .sort((a, b) => sort === 'company' ? a.company_name.localeCompare(b.company_name, 'ko') :
      sort === 'deadline' ? (a.deadline || '9999').localeCompare(b.deadline || '9999') :
        (b.created_at || '').localeCompare(a.created_at || ''));
}
