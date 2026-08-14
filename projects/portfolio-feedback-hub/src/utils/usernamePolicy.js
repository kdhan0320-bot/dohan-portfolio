const USERNAME_PATTERN = /^[a-z0-9_]{4,20}$/;

export const normalizeUsername = (value) => String(value ?? '').trim().toLowerCase();

export const isUsernameFormatValid = (value) => USERNAME_PATTERN.test(String(value ?? ''));
