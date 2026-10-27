// Inlined into HTML: this must run even when the hashed application entry is gone.
(() => {
  const retryParameter = '__galpirok_reload';
  let ready = false;
  let reloading = false;
  let failed = false;
  let failureKind = 'load';

  const showFailure = () => {
    failed = true;
    const title = document.getElementById('startup-title');
    const message = document.getElementById('startup-message');
    const retry = document.getElementById('startup-retry');
    if (title) title.textContent = failureKind === 'update' ? '화면이 업데이트됐어요' : '화면을 불러오지 못했어요';
    if (message) message.textContent = failureKind === 'update'
      ? '새 화면을 가져오지 못했어요. 잠시 후 다시 불러와주세요.'
      : '인터넷 연결을 확인한 뒤 다시 불러와주세요.';
    if (retry) retry.hidden = false;
  };

  const reload = () => {
    if (reloading) return;
    reloading = true;
    const next = new URL(window.location.href);
    // A fresh HTML URL avoids reusing the cached document that named a deleted asset.
    next.searchParams.set(retryParameter, String(Date.now()));
    window.location.replace(next.href);
  };

  const startupFailed = reason => {
    if (ready || reloading) return;
    if (reason === 'update') failureKind = 'update';
    window.clearTimeout(timeout);
    // The URL marker also prevents loops when browser storage is unavailable.
    if (navigator.onLine !== false && !new URL(window.location.href).searchParams.has(retryParameter)) {
      reload();
    } else {
      showFailure();
    }
  };

  const timeout = window.setTimeout(showFailure, 12000);
  const bindRetry = () => {
    document.getElementById('startup-retry')?.addEventListener('click', reload);
    if (failed) showFailure();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindRetry, { once: true });
  else bindRetry();
  window.addEventListener('galpirok:reload', reload);
  window.addEventListener('galpirok:startup-failed', startupFailed);
  window.addEventListener('error', event => {
    if (event.target?.tagName === 'SCRIPT' && event.target.type === 'module') startupFailed();
  }, true);
  window.addEventListener('vite:preloadError', startupFailed);
  window.addEventListener('galpirok:ready', () => {
    ready = true;
    window.clearTimeout(timeout);
    const current = new URL(window.location.href);
    if (current.searchParams.has(retryParameter)) {
      current.searchParams.delete(retryParameter);
      window.history.replaceState(window.history.state, '', current.href);
    }
  }, { once: true });

  // Check only before React mounts. A cached entry can load successfully and
  // still be old, which cannot be detected by a script error listener.
  // Fail open on an unavailable/slow check so a usable page is not blocked;
  // ignore any later response once editing could have started.
  const build = document.querySelector('meta[name="galpirok-build"]')?.content;
  window.__galpirokStartup = new Promise(resolve => {
    if (!build || navigator.onLine === false || typeof window.fetch !== 'function') {
      resolve();
      return;
    }
    let settled = false;
    const controller = new AbortController();
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(checkTimeout);
      resolve();
    };
    const checkTimeout = window.setTimeout(() => { finish(); controller.abort(); }, 2000);
    const release = new URL('release.json', window.location.href);
    release.searchParams.set('check', String(Date.now()));
    Promise.resolve().then(() => window.fetch(release.href, { cache: 'no-store', credentials: 'omit', signal: controller.signal }))
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (settled) return;
        if (!data || !/^[a-f0-9]{16}$/.test(data.version) || data.version === build) {
          finish();
          return;
        }
        settled = true;
        window.clearTimeout(checkTimeout);
        // The existing URL marker bounds retries, including during an uneven
        // deployment. Keep the startup shell instead of mounting a known old UI.
        startupFailed('update');
      })
      .catch(finish);
  });
})();
