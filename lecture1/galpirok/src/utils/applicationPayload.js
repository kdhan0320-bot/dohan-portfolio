import { parseDateInput } from './dateInput.js';

export const APPLICATION_MUTABLE_FIELDS = Object.freeze([
  'company_name',
  'position',
  'location',
  'company_size',
  'status',
  'applied_date',
  'interview_date',
  'deadline',
  'priority',
  'job_url',
  'memo',
  'portfolio_submitted',
  'resume_submitted',
]);

const DATE_LABELS = new Map([['applied_date', '지원한 날짜'], ['deadline', '공고 마감일'], ['interview_date', '면접일']]);
const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

export const isValidApplicationUrl = (value) => {
  if (value == null || value === '') return true;
  if (typeof value !== 'string') return false;

  const trimmed = value.trim();
  if (!trimmed) return true;
  if (!/^https?:\/\//i.test(trimmed)) return false;

  try {
    const url = new URL(trimmed);
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    return false;
  }
};

const normalizeApplicationUrl = (value) => {
  if (value == null || (typeof value === 'string' && !value.trim())) return null;
  if (!isValidApplicationUrl(value)) {
    throw new TypeError('공고 링크는 http:// 또는 https:// URL을 입력해 주세요.');
  }
  return value.trim();
};

export const buildApplicationPayload = (input = {}) => (
  APPLICATION_MUTABLE_FIELDS.reduce((payload, field) => {
    if (!hasOwn(input, field)) return payload;

    const value = input[field];
    if (field === 'job_url') {
      payload[field] = normalizeApplicationUrl(value);
    } else if (DATE_LABELS.has(field)) {
      const parsed = parseDateInput(value);
      if (parsed.error) throw new TypeError(`${DATE_LABELS.get(field)}: ${parsed.error}`);
      payload[field] = parsed.value || null;
    } else {
      payload[field] = typeof value === 'string' ? value.trim() : value;
    }

    return payload;
  }, {})
);
