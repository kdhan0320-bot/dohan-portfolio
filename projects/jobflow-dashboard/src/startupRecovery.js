// Inlined into HTML: this must run even when the hashed application entry is gone.
(() => {
  const retryParameter = '__galpirok_reload';
  let ready = false;
  let reloading = false;
  let failed = false;

  const showFailure = () => {
    failed = true;
    const title = document.getElementById('startup-title');
    const message = document.getElementById('startup-message');
    const retry = document.getElementById('startup-retry');
    if (title) title.textContent = '화면을 불러오지 못했어요';
    if (message) message.textContent = '인터넷 연결을 확인한 뒤 다시 불러와주세요.';
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

  const startupFailed = () => {
    if (ready || reloading) return;
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
})();
