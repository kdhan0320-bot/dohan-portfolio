export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 20;
export const USERNAME_PATTERN_SOURCE = '[a-z0-9_]{4,20}';

const USERNAME_PATTERN = new RegExp(`^${USERNAME_PATTERN_SOURCE}$`);

export const normalizeUsername = (value) => String(value ?? '').trim().toLowerCase();

export const isUsernameFormatValid = (value) => USERNAME_PATTERN.test(String(value ?? ''));

export const validateUsername = (value) => {
  const input = String(value ?? '');
  const normalizedUsername = normalizeUsername(input);

  if (!input.trim()) {
    return { isValid: false, normalizedUsername, message: '아이디를 입력해주세요.' };
  }
  if (/\s/.test(input)) {
    return { isValid: false, normalizedUsername, message: '아이디에는 공백을 사용할 수 없습니다.' };
  }
  if (/[A-Z]/.test(input)) {
    return { isValid: false, normalizedUsername, message: '영문 대문자는 사용할 수 없습니다. 소문자를 입력해주세요.' };
  }
  if (normalizedUsername.length < USERNAME_MIN_LENGTH) {
    return { isValid: false, normalizedUsername, message: '아이디는 4자 이상이어야 합니다.' };
  }
  if (normalizedUsername.length > USERNAME_MAX_LENGTH) {
    return { isValid: false, normalizedUsername, message: '아이디는 20자 이하여야 합니다.' };
  }
  if (!isUsernameFormatValid(normalizedUsername)) {
    return { isValid: false, normalizedUsername, message: '영문 소문자, 숫자, 밑줄(_)만 사용할 수 있습니다.' };
  }

  return { isValid: true, normalizedUsername, message: '' };
};
