import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/startupRecovery.js', import.meta.url), 'utf8');
function boot({ href = 'https://example.com/app/?source=portfolio#/interview?company=sample', online = true, parsing = false, build = null, fetchImpl } = {}) {
  const listeners = new Map();
  const elements = Object.fromEntries(['startup-title', 'startup-message', 'startup-retry'].map(id => [id, {
    textContent: '', hidden: true, addEventListener(type, callback) { this[type] = callback; },
  }]));
  const navigations = [];
  const history = [];
  const timers = new Map();
  let timerId = 0;
  const window = {
    location: { href, replace(value) { navigations.push(value); } },
    history: { state: { keep: true }, replaceState(state, unused, url) { history.push({ state, url }); } },
    addEventListener(name, callback) { listeners.set(name, callback); },
    setTimeout(callback, delay) { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    fetch: fetchImpl,
  };
  const document = {
    readyState: parsing ? 'loading' : 'complete',
    getElementById: id => parsing ? null : elements[id],
    querySelector: () => build ? { content: build } : null,
    addEventListener(name, callback) { listeners.set(name, callback); },
  };
  vm.runInNewContext(source, { window, document, navigator: { onLine: online }, URL, Date, AbortController });
  return { elements, navigations, history, startup: window.__galpirokStartup, fire: (name, event = {}) => listeners.get(name)?.(event),
    expire: (delay = 12000) => [...timers.values()].filter(timer => timer.delay === delay).forEach(timer => timer.callback()),
    finishParsing() { parsing = false; listeners.get('DOMContentLoaded')?.(); },
  };
}
const missingEntry = { target: { tagName: 'SCRIPT', type: 'module' } };

test('missing entry reloads fresh HTML once and preserves the route and other query parameters', () => {
  const page = boot();
  page.fire('error', missingEntry);
  page.fire('vite:preloadError');
  page.fire('error', missingEntry);
  assert.equal(page.navigations.length, 1);
  const destination = new URL(page.navigations[0]);
  assert.equal(destination.pathname, '/app/');
  assert.equal(destination.searchParams.get('source'), 'portfolio');
  assert.equal(destination.hash, '#/interview?company=sample');
  assert.ok(destination.searchParams.get('__galpirok_reload'));
});

test('a second load failure shows a usable retry instead of a reload loop', () => {
  const page = boot({ href: 'https://example.com/app/?__galpirok_reload=1#/welcome' });
  page.fire('error', missingEntry);
  page.fire('vite:preloadError');
  assert.equal(page.navigations.length, 0);
  assert.equal(page.elements['startup-title'].textContent, '화면을 불러오지 못했어요');
  assert.equal(page.elements['startup-retry'].hidden, false);
  page.elements['startup-retry'].click();
  assert.equal(page.navigations.length, 1);
  assert.notEqual(new URL(page.navigations[0]).searchParams.get('__galpirok_reload'), '1');
});

test('offline startup offers retry without automatic navigation', () => {
  const page = boot({ online: false });
  page.fire('error', missingEntry);
  assert.equal(page.navigations.length, 0);
  assert.equal(page.elements['startup-retry'].hidden, false);
});

test('a slow connection offers retry without interrupting a pending load', () => {
  const page = boot();
  page.expire();
  assert.equal(page.navigations.length, 0);
  assert.equal(page.elements['startup-retry'].hidden, false);
});

test('ready app removes only the retry parameter and never refreshes active edits automatically', () => {
  const page = boot({ href: 'https://example.com/app/?source=portfolio&__galpirok_reload=1#/interview?company=sample' });
  page.fire('galpirok:ready');
  page.fire('vite:preloadError');
  page.fire('error', missingEntry);
  page.expire();
  assert.equal(page.navigations.length, 0);
  assert.equal(page.history[0].url, 'https://example.com/app/?source=portfolio#/interview?company=sample');
  assert.deepEqual(page.history[0].state, { keep: true });
  assert.equal(page.elements['startup-retry'].hidden, true);
  page.fire('galpirok:reload');
  assert.equal(page.navigations.length, 1, 'only an explicit retry should navigate after startup');
});

test('ordinary image and runtime errors do not trigger automatic refresh', () => {
  const page = boot();
  page.fire('error', { target: { tagName: 'IMG' } });
  page.fire('error', { message: 'unrelated runtime error' });
  assert.equal(page.navigations.length, 0);
});

test('legacy entry bridge uses the same bounded recovery', () => {
  const page = boot();
  page.fire('galpirok:startup-failed');
  assert.equal(page.navigations.length, 1);
  const retry = boot({ href: page.navigations[0] });
  retry.fire('galpirok:startup-failed');
  assert.equal(retry.navigations.length, 0);
  assert.equal(retry.elements['startup-retry'].hidden, false);
});

test('an early cached-script failure still binds the retry UI once HTML has parsed', () => {
  const page = boot({ href: 'https://example.com/app/?__galpirok_reload=1#/welcome', parsing: true });
  page.fire('error', missingEntry);
  page.finishParsing();
  assert.equal(page.elements['startup-retry'].hidden, false);
  page.elements['startup-retry'].click();
  assert.equal(page.navigations.length, 1);
});

const currentBuild = '0123456789abcdef';
const newerBuild = 'fedcba9876543210';
const flush = () => new Promise(resolve => setImmediate(resolve));
const releaseResponse = version => ({ ok: true, json: async () => ({ version }) });

test('matching release permits mounting and checks the app base without sending credentials', async () => {
  const requests = [];
  const page = boot({ build: currentBuild, fetchImpl: async (...args) => { requests.push(args); return releaseResponse(currentBuild); } });
  await page.startup;
  assert.equal(requests.length, 1);
  const [href, options] = requests[0];
  const url = new URL(href);
  assert.equal(url.pathname, '/app/release.json');
  assert.ok(url.searchParams.get('check'));
  assert.equal(url.hash, '');
  assert.equal(options.cache, 'no-store');
  assert.equal(options.credentials, 'omit');
  assert.equal(page.navigations.length, 0);
});

test('an old but loadable entry is replaced before mounting, retaining the requested route', async () => {
  const page = boot({ build: currentBuild, fetchImpl: async () => releaseResponse(newerBuild) });
  let mounted = false;
  page.startup.then(() => { mounted = true; });
  await flush();
  assert.equal(mounted, false);
  assert.equal(page.navigations.length, 1);
  const target = new URL(page.navigations[0]);
  assert.equal(target.hash, '#/interview?company=sample');
  assert.equal(target.searchParams.get('source'), 'portfolio');
  assert.ok(target.searchParams.has('__galpirok_reload'));
});

test('an uneven deployment shows retry instead of repeatedly loading known old content', async () => {
  const page = boot({ href: 'https://example.com/app/?__galpirok_reload=1#/welcome', build: currentBuild, fetchImpl: async () => releaseResponse(newerBuild) });
  await flush();
  assert.equal(page.navigations.length, 0);
  assert.equal(page.elements['startup-title'].textContent, '화면이 업데이트됐어요');
  assert.equal(page.elements['startup-retry'].hidden, false);
  page.elements['startup-retry'].click();
  assert.equal(page.navigations.length, 1);
});

for (const [name, fetchImpl] of [
  ['404', async () => ({ ok: false })],
  ['network failure', async () => { throw new Error('offline'); }],
  ['invalid JSON', async () => ({ ok: true, json: async () => { throw new Error('invalid'); } })],
  ['invalid version', async () => releaseResponse('invalid')],
  ['synchronous fetch failure', () => { throw new Error('blocked'); }],
]) test(`an unavailable release check (${name}) does not block a usable app`, async () => {
  const page = boot({ build: currentBuild, fetchImpl });
  await page.startup;
  assert.equal(page.navigations.length, 0);
});

test('a late version response cannot refresh an editor after the bounded check expires', async () => {
  let respond, signal;
  const page = boot({ build: currentBuild, fetchImpl: (_href, options) => {
    signal = options.signal;
    return new Promise(resolve => { respond = resolve; });
  } });
  await flush();
  page.expire(2000);
  await page.startup;
  assert.equal(signal.aborted, true);
  page.fire('galpirok:ready');
  respond(releaseResponse(newerBuild));
  await flush();
  assert.equal(page.navigations.length, 0);
});

test('offline and development pages mount without asking for a release', async () => {
  let requests = 0;
  const fetchImpl = async () => { requests++; return releaseResponse(newerBuild); };
  await boot({ online: false, build: currentBuild, fetchImpl }).startup;
  await boot({ fetchImpl }).startup;
  assert.equal(requests, 0);
});
