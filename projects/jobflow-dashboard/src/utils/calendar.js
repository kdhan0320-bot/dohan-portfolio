const DAY = 86400000;
export const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const time = Date.parse(`${value}T12:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}
export function validMonth(value) { return validDate(`${value}-01`); }
export function shiftMonth(month, offset) {
  const date = new Date(`${month}-01T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + offset);
  return date.toISOString().slice(0, 7);
}
export function monthCells(month) {
  const first = new Date(`${month}-01T12:00:00Z`);
  const start = first.getTime() - ((first.getUTCDay() + 6) % 7) * DAY;
  return Array.from({ length: 42 }, (_, index) => new Date(start + index * DAY).toISOString().slice(0, 10));
}
export function pendingDeadlines(applications) {
  return applications.filter(a => ['관심', '지원 예정'].includes(a.status) && validDate(a.deadline))
    .sort((a, b) => a.deadline.localeCompare(b.deadline) || a.company_name.localeCompare(b.company_name, 'ko'));
}
export function calendarState(params, today) {
  const month = validMonth(params.get('month')) ? params.get('month') : today.slice(0, 7);
  const candidate = params.get('date');
  return { month, date: validDate(candidate) && candidate.startsWith(month) ? candidate : null };
}
export function monthLabel(month) { return `${Number(month.slice(0, 4))}년 ${Number(month.slice(5, 7))}월`; }
export function companyDestination(id) { return `/?company=${encodeURIComponent(id)}`; }
