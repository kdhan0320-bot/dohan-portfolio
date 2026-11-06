export function daysUntil(date, today) {
  return date ? Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000) : null;
}
export function deadlineLabel(date, today) {
  const d = daysUntil(date, today);
  return d === null ? '마감일 미정' : d < 0 ? `마감 ${-d}일 지남` : d === 0 ? '오늘 마감' : `D−${d}`;
}
export function shortDate(date) {
  return date ? `${Number(date.slice(5, 7))}.${Number(date.slice(8, 10))}` : '—';
}

export function interviewDayLabel(date, today) {
  const days = daysUntil(date, today);
  if (days === null) return '';
  if (days === 0) return '오늘 면접';
  return days < 0 ? `${-days}일 전` : `D−${days}`;
}
