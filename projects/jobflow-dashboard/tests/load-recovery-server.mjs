// Manual browser regression fixture; serves only the local dist directory.
// Run after build: node tests/load-recovery-server.mjs (http://127.0.0.1:4174)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const dist = resolve(import.meta.dirname, '../dist');
const base = '/dohan-portfolio/jobflow-dashboard/';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json' };
createServer(async (request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1:4174');
  response.setHeader('Cache-Control', 'no-store');
  if (url.pathname === '/') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end('<html lang="ko"><meta charset="utf-8"><title>갈피록 로딩 검증</title><h1>갈피록 로딩 검증</h1>' +
      [['normal', '정상 접속'], ['stale', '이전 실행 파일 누락'], ['unavailable', '재시도 후에도 파일 누락'], ['legacy', '복구 코드가 없는 이전 HTML'], ['lazy', '이동할 화면 파일 누락']]
        .map(([fault, label]) => `<p><a href="${base}?fault=${fault}#/welcome">${label}</a></p>`).join('') + '</html>');
    return;
  }
  if (!url.pathname.startsWith(base)) { response.writeHead(404).end(); return; }
  const relative = decodeURIComponent(url.pathname.slice(base.length)) || 'index.html';
  const file = resolve(dist, relative);
  if (!file.startsWith(dist + sep)) { response.writeHead(403).end(); return; }
  const referrer = new URL(request.headers.referer || 'http://127.0.0.1:4174');
  if (referrer.searchParams.get('fault') === 'lazy' && /SettingsPage-.*\.js$/.test(relative)) {
    response.writeHead(404).end('Missing route fixture'); return;
  }
  try {
    let body = await readFile(file);
    if (relative === 'index.html') {
      let html = body.toString();
      const fault = url.searchParams.get('fault');
      const recovering = url.searchParams.has('__galpirok_reload');
      console.log(`HTML ${fault || 'normal'} ${recovering ? 'retry' : 'initial'}`);
      if (fault === 'unavailable' || (fault === 'stale' && !recovering)) {
        html = html.replace(/(<script type="module"[^>]*src=")[^"]+("[^>]*>)/, `$1${base}assets/removed-entry.js$2`);
      }
      if (fault === 'legacy' && !recovering) {
        html = `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>갈피록 이전 HTML 재현</title><div id="root"></div><script type="module" src="${base}assets/index-B1ncJhLB.js"></script></html>`;
      }
      body = html;
    }
    response.setHeader('Content-Type', `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8`);
    response.end(body);
  } catch { response.writeHead(404).end('Missing asset fixture'); }
}).listen(4174, '127.0.0.1', () => console.log('Recovery fixtures: http://127.0.0.1:4174/'));
