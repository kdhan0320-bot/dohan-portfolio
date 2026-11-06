import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { authRedirectUrl, inspectAuthCallback } from '../src/utils/authRecovery.js';

const html = readFileSync(new URL('../legacy-jobflow-redirect.html', import.meta.url), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];
function follow(href) {
  const original = new URL(href);
  const link = { href: '' };
  let redirected;
  runInNewContext(script, { URL, document: { getElementById: () => link }, window: { location: {
    origin: original.origin, search: original.search, hash: original.hash,
    replace: value => { redirected = new URL(value); },
  } } });
  assert.equal(link.href, redirected.href);
  return redirected;
}

test('legacy links keep the selected page, company and search at the branded address', () => {
  for (const origin of ['https://kdhan0320-bot.github.io', 'http://127.0.0.1:4174']) {
    for (const hash of ['', '#/welcome', '#/overview', '#/?company=demo-3', '#/?lane=interview&q=블루', '#/checklist?company=demo-3', '#/interview', '#/calendar', '#/settings']) {
      const old = new URL(origin + '/dohan-portfolio/jobflow-dashboard/?from=portfolio' + hash);
      const next = follow(old.href);
      assert.equal(next.origin, old.origin);
      assert.equal(next.pathname, '/dohan-portfolio/galpirok/');
      assert.equal(next.search, old.search);
      assert.equal(next.hash, old.hash);
    }
  }
});

test('legacy redirect retains auth callback data and cannot redirect to another origin', () => {
  for (const suffix of ['?code=test-code', '#access_token=test-only&refresh_token=test-only&type=recovery', '#error=access_denied&error_code=otp_expired', '?redirect=https://example.net/#/welcome']) {
    const old = new URL('https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/' + suffix);
    const next = follow(old.href);
    assert.equal(next.origin, old.origin);
    assert.equal(next.search, old.search);
    assert.equal(next.hash, old.hash);
    assert.deepEqual(inspectAuthCallback(next.href), inspectAuthCallback(old.href));
  }
});

test('production email callbacks keep the existing callback entry and reach the new app', () => {
  const origin = 'https://kdhan0320-bot.github.io';
  const callback = authRedirectUrl('/dohan-portfolio/galpirok/', origin);
  assert.equal(callback, origin + '/dohan-portfolio/jobflow-dashboard/');
  assert.equal(follow(callback + '#type=recovery&access_token=test-only').pathname, '/dohan-portfolio/galpirok/');
  assert.equal(authRedirectUrl('/dohan-portfolio/galpirok/', 'http://127.0.0.1:4174'), 'http://127.0.0.1:4174/dohan-portfolio/galpirok/');
});
