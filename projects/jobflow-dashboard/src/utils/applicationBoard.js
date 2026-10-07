// Display groups only: keep the existing database enum unchanged.
export const BOARD_COLUMNS = [
  { id: 'before', label: '지원 전', statuses: ['관심', '지원 예정'], color: '#42627D', tint: '#E5EFF7' },
  { id: 'documents', label: '서류 전형', statuses: ['지원 완료', '서류 진행'], color: '#8E4758', tint: '#F4E5E7' },
  { id: 'interview', label: '면접', statuses: ['면접 예정'], color: '#88652D', tint: '#F5EEDD' },
  { id: 'result', label: '결과', statuses: ['합격', '불합격'], color: '#386553', tint: '#E4EFE9' },
];
export function boardColumn(status) {
  return status === '보류' ? 'paused' : BOARD_COLUMNS.find(column => column.statuses.includes(status))?.id;
}
export function boardRows(applications, query = '') {
  const search = query.trim().toLocaleLowerCase('ko');
  return applications.filter(row => [row.company_name, row.position].filter(Boolean).join(' ').toLocaleLowerCase('ko').includes(search))
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
}
export function applicationDraft(row) {
  return {
    company_name: '', position: '', status: '관심', deadline: '', applied_date: '',
    job_url: '', memo: '', location: '', company_size: '', priority: '보통',
    resume_submitted: false, portfolio_submitted: false,
    ...row,
  };
}

export function legacyBoardDestination({ id, creating = false, search = '' }) {
  const params = new URLSearchParams(search);
  params.delete('stage'); params.delete('status'); params.delete('sort');
  if (creating) { params.set('new', '1'); params.delete('company'); }
  else if (id) params.set('company', id);
  return `/${params.size ? `?${params}` : ''}`;
}
