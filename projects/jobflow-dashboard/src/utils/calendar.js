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
export function calendarFocusDate(month, selected, focused, today) {
  return [focused, selected, today].find(day => validDate(day) && day.startsWith(month)) || `${month}-01`;
}
export function keyboardDate(day, key) {
  if (!validDate(day)) return null;
  const next = new Date(`${day}T12:00:00Z`);
  const weekday = (next.getUTCDay() + 6) % 7;
  const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -weekday, End: 6 - weekday };
  if (Object.hasOwn(offsets, key)) {
    next.setUTCDate(next.getUTCDate() + offsets[key]);
  } else if (key === 'PageUp' || key === 'PageDown') {
    const originalDay = next.getUTCDate();
    next.setUTCDate(1);
    next.setUTCMonth(next.getUTCMonth() + (key === 'PageUp' ? -1 : 1));
    const end = new Date(next);
    end.setUTCMonth(end.getUTCMonth() + 1);
    end.setUTCDate(0);
    next.setUTCDate(Math.min(originalDay, end.getUTCDate()));
  } else {
    return null;
  }
  const value = next.toISOString().slice(0, 10);
  return validDate(value) ? value : null;
}
export function pendingDeadlines(applications) {
  return applications.filter(a => ['관심', '지원 예정'].includes(a.status) && validDate(a.deadline))
    .sort((a, b) => a.deadline.localeCompare(b.deadline) || a.company_name.localeCompare(b.company_name, 'ko'));
}
export function calendarState(params, today) {
  const explicitMonth = validMonth(params.get('month'));
  const month = explicitMonth ? params.get('month') : today.slice(0, 7);
  const candidate = params.get('date');
  const date = validDate(candidate) && candidate.startsWith(month) ? candidate : null;
  return { month, date, scope: date ? 'date' : explicitMonth ? 'month' : 'upcoming' };
}
export function agendaDeadlines(deadlines, { month, date, scope }, today) {
  if (scope === 'date') return deadlines.filter(application => application.deadline === date);
  if (scope === 'month') return deadlines.filter(application => application.deadline.startsWith(month));
  return deadlines.filter(application => application.deadline >= today);
}
export function monthLabel(month) { return `${Number(month.slice(0, 4))}년 ${Number(month.slice(5, 7))}월`; }
export function companyDestination(id) { return `/?company=${encodeURIComponent(id)}`; }
