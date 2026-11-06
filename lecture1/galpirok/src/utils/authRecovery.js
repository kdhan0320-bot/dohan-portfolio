export const RECOVERY_KEY = 'galpirok-password-recovery';
export const EMAIL_COOLDOWN_KEY = 'galpirok-auth-email-next-at';
export const EMAIL_COOLDOWN_MS = 60_000;
const RECOVERY_WINDOW_MS = 60 * 60 * 1000;

// Keep only routing metadata; access/refresh tokens remain inside the Supabase SDK.
export function inspectAuthCallback(href) {
  const url = new URL(href);
  const fragment = url.hash.slice(1);
  const params = fragment.startsWith('/') ? new URLSearchParams() : new URLSearchParams(fragment);
  const hasError = ['error', 'error_description', 'error_code'].some(key => params.has(key) || url.searchParams.has(key));
  return {
    isCallback: hasError || params.has('access_token') || params.has('refresh_token') || url.searchParams.has('code'),
    isRecovery: params.get('type') === 'recovery',
    hasError,
  };
}

export function authRedirectUrl(baseUrl, origin) {
  // Implicit auth uses the fragment for tokens, so a HashRouter route must not be appended.
  const url = new URL(baseUrl, origin);
  url.hash = '';
  url.search = '';
  return url.toString();
}

export function cleanAuthCallbackUrl(href) {
  const url = new URL(href);
  ['code', 'error', 'error_code', 'error_description', 'access_token', 'refresh_token', 'token_type', 'expires_in', 'expires_at', 'type'].forEach(key => url.searchParams.delete(key));
  url.hash = '';
  return `${url.pathname}${url.search}`;
}

export function rememberRecovery(storage, userId, now = Date.now()) {
  try {
    storage?.setItem(RECOVERY_KEY, JSON.stringify({ userId, expiresAt: now + RECOVERY_WINDOW_MS }));
  } catch { /* The active in-memory recovery flow still works when storage is unavailable. */ }
}

export function readRecovery(storage, userId, now = Date.now()) {
  try {
    const marker = JSON.parse(storage?.getItem(RECOVERY_KEY) || 'null');
    return Boolean(userId && marker?.userId === userId && Number.isFinite(marker.expiresAt) && marker.expiresAt > now && marker.expiresAt <= now + RECOVERY_WINDOW_MS);
  } catch {
    return false;
  }
}

export function forgetRecovery(storage) {
  try { storage?.removeItem(RECOVERY_KEY); } catch { /* No stored marker to clear. */ }
}

export function emailCooldownSeconds(nextAt, now = Date.now()) {
  const remaining = Number(nextAt) - now;
  return Number.isFinite(remaining) && remaining > 0 ? Math.min(60, Math.ceil(remaining / 1000)) : 0;
}

export function passwordValidation(password, confirmation) {
  const fields = {};
  if (!password) fields.password = '새 비밀번호를 입력해주세요.';
  else if (password.length < 8) fields.password = '비밀번호는 8자 이상 입력해주세요.';
  if (!confirmation) fields.confirmation = '새 비밀번호를 한 번 더 입력해주세요.';
  else if (password !== confirmation) fields.confirmation = '두 비밀번호가 일치하지 않습니다.';
  return fields;
}

export function isPrivateAccountStatus(error) {
  const code = error?.code?.toLowerCase();
  const message = error?.message?.toLowerCase() || '';
  return ['user_not_found', 'email_not_found', 'email_exists', 'email_already_confirmed'].includes(code)
    || ['user not found', 'email not found', 'already confirmed', 'already registered'].some(value => message.includes(value));
}

export async function sendAccountEmail(auth, kind, email, redirectTo) {
  const result = kind === 'recovery'
    ? await auth.resetPasswordForEmail(email.trim(), { redirectTo })
    : await auth.resend({ type: 'signup', email: email.trim(), options: { emailRedirectTo: redirectTo } });
  if (result.error && !isPrivateAccountStatus(result.error)) throw result.error;
}

export async function updateRecoveryPassword(auth, expectedUserId, password) {
  if (!expectedUserId) throw new Error('recovery_session_missing');
  const { data, error } = await auth.getUser();
  if (error) throw error;
  if (!data.user || data.user.id !== expectedUserId) throw new Error('recovery_session_missing');
  const result = await auth.updateUser({ password });
  if (result.error) throw result.error;
  return result.data.user;
}
