// Keep unfinished text in the draft; only complete calendar dates become ISO values.
export function parseDateInput(value) {
  const text = String(value ?? '').trim();
  if (!text) return { value: '', error: '' };
  const parts = /^(\d{4})[-./](\d{1,2})[-./](\d{1,2})$/.exec(text)
    || /^(\d{4})(\d{2})(\d{2})$/.exec(text);
  if (!parts) return { value: null, error: '연·월·일을 모두 입력해주세요. 예: 2026-09-29' };
  const [, yearText, monthText, dayText] = parts;
  const year = Number(yearText), month = Number(monthText), day = Number(dayText);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > days[month - 1]) {
    return { value: null, error: '실제 달력에 있는 날짜를 입력해주세요.' };
  }
  return { value: `${yearText}-${monthText.padStart(2, '0')}-${dayText.padStart(2, '0')}`, error: '' };
}

export function applicationDateErrors(form) {
  return Object.fromEntries(['deadline', 'applied_date']
    .map(key => [key, parseDateInput(form[key]).error]).filter(([, error]) => error));
}
