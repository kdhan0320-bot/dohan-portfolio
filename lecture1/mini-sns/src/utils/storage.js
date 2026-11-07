export const STORAGE_PREFIX = "mini-sns-v2:";
export const readStored = (key, fallback, valid = () => true) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_PREFIX + key));
    return parsed !== null && valid(parsed)
      ? parsed
      : typeof fallback === "function"
        ? fallback()
        : fallback;
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
};
export const writeStored = (key, value) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};
export const makeId = (prefix) => `${prefix}-${crypto.randomUUID()}`;
