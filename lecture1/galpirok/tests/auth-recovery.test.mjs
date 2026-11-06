import test from 'node:test';
import assert from 'node:assert/strict';
import { authRedirectUrl, cleanAuthCallbackUrl, emailCooldownSeconds, forgetRecovery, inspectAuthCallback, passwordValidation, readRecovery, rememberRecovery, sendAccountEmail, updateRecoveryPassword } from '../src/utils/authRecovery.js';
import { getAuthErrorMessage } from '../src/utils/authErrors.js';

const memoryStorage = () => {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
};

test('implicit recovery metadata never retains credentials and redirect does not occupy the hash', () => {
  const callback = inspectAuthCallback('https://example.com/app/#access_token=private&refresh_token=private&type=recovery');
  assert.deepEqual(callback, { isCallback: true, isRecovery: true, hasError: false });
  assert.equal(authRedirectUrl('/app/#/reset-password', 'https://example.com'), 'https://example.com/app/');
  assert.equal(inspectAuthCallback('https://example.com/app/#/checklist?type=recovery').isCallback, false);
});

test('failed callbacks are recognized and credentials are removed from a cleaned URL', () => {
  assert.equal(inspectAuthCallback('https://example.com/app/#error=access_denied&error_code=otp_expired').hasError, true);
  assert.equal(inspectAuthCallback('https://example.com/app/?code=private').isCallback, true);
  assert.equal(cleanAuthCallbackUrl('https://example.com/app/?code=private&error_description=private&keep=1#access_token=private'), '/app/?keep=1');
});

test('reload recovery marker is scoped to the same user, expires, and clears without a token', () => {
  const storage = memoryStorage();
  rememberRecovery(storage, 'user-a', 1000);
  assert.equal(readRecovery(storage, 'user-a', 2000), true);
  assert.equal(readRecovery(storage, 'user-b', 2000), false);
  assert.equal(readRecovery(storage, 'user-a', 3_601_001), false);
  forgetRecovery(storage);
  assert.equal(readRecovery(storage, 'user-a', 2000), false);
  assert.equal(readRecovery({ getItem: () => '{invalid' }, 'user-a'), false);
  assert.doesNotThrow(() => rememberRecovery({ setItem: () => { throw new Error('blocked'); } }, 'user-a'));
});

test('password inputs require a minimum length and matching confirmation', () => {
  assert.deepEqual(Object.keys(passwordValidation('', '')), ['password', 'confirmation']);
  assert.ok(passwordValidation('short', 'short').password);
  assert.ok(passwordValidation('long-enough-example', 'different').confirmation);
  assert.deepEqual(passwordValidation('long-enough-example', 'long-enough-example'), {});
});

test('email cooldown is bounded and survives a stored timestamp', () => {
  assert.equal(emailCooldownSeconds('61000', 1000), 60);
  assert.equal(emailCooldownSeconds(61000, 60500), 1);
  assert.equal(emailCooldownSeconds(61000, 62000), 0);
  assert.equal(emailCooldownSeconds('bad', 0), 0);
  assert.equal(emailCooldownSeconds(9999999, 0), 60);
});

test('recovery and resend requests use the SDK contract and conceal account existence', async () => {
  const calls = [];
  const auth = {
    resetPasswordForEmail: async (...args) => { calls.push(['reset', ...args]); return { error: null }; },
    resend: async (...args) => { calls.push(['resend', ...args]); return { error: { code: 'user_not_found' } }; },
  };
  await sendAccountEmail(auth, 'recovery', ' example@example.com ', 'https://example.com/app/');
  await sendAccountEmail(auth, 'signup', 'example@example.com', 'https://example.com/app/');
  assert.deepEqual(calls[0], ['reset', 'example@example.com', { redirectTo: 'https://example.com/app/' }]);
  assert.deepEqual(calls[1], ['resend', { type: 'signup', email: 'example@example.com', options: { emailRedirectTo: 'https://example.com/app/' } }]);
  const networkError = new Error('Failed to fetch');
  await assert.rejects(sendAccountEmail({ resend: async () => ({ error: networkError }) }, 'signup', 'example@example.com', ''), networkError);
});

test('password update revalidates the recovery user and never writes for a different session', async () => {
  let updates = 0;
  const auth = {
    getUser: async () => ({ data: { user: { id: 'user-a' } }, error: null }),
    updateUser: async attributes => { updates += 1; assert.equal(attributes.password, 'test-password-value'); return { data: { user: { id: 'user-a' } }, error: null }; },
  };
  await assert.rejects(updateRecoveryPassword(auth, 'user-b', 'test-password-value'), /recovery_session_missing/);
  assert.equal(updates, 0);
  assert.deepEqual(await updateRecoveryPassword(auth, 'user-a', 'test-password-value'), { id: 'user-a' });
  assert.equal(updates, 1);
});

test('password update failures remain failures and user messages do not echo raw server detail', async () => {
  const error = { code: 'same_password', message: 'private server detail' };
  const auth = { getUser: async () => ({ data: { user: { id: 'user-a' } } }), updateUser: async () => ({ error }) };
  await assert.rejects(updateRecoveryPassword(auth, 'user-a', 'test-password-value'), value => value === error);
  assert.match(getAuthErrorMessage(error), /다른 비밀번호/);
  assert.equal(getAuthErrorMessage({ message: 'private server detail' }).includes('private'), false);
});
