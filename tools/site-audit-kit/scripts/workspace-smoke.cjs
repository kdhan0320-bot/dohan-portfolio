const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

// Serve the same public paths as Pages, independent of local folder names.
const root = path.resolve(__dirname, '../../..');
const remote = process.env.AUDIT_SITE_URL;
const output = path.join(__dirname, '../audit-output/workspace-reorganization', remote ? 'public' : 'local');
const mounts = {
  'my-portfolio': 'lecture1/portfolio/dist',
  'pumuiseon': 'lecture1/pumuiseon/dist',
  'portfolio-feedback-hub': 'lecture1/pumuiseon/dist',
  'galpirok': 'lecture1/galpirok/dist',
  'mini-sns': 'lecture1/mini-sns/dist',
  'jansang-cinema': 'lecture1/jansang-cinema',
  'gijunseon': 'lecture1/gijunseon',
};
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.woff2':'font/woff2', '.woff':'font/woff', '.ico':'image/x-icon' };
const cases = [
  ['home','my-portfolio/'], ['about','my-portfolio/#/about'], ['works','my-portfolio/#/projects'],
  ...['feedback-hub','seolbiit','gongjeongbom','jansang-cinema','jobflow','bus-arrival','brewstep'].map(slug => [slug,`my-portfolio/#/projects/${slug}`]),
  ['pumuiseon','pumuiseon/'], ['requests','pumuiseon/#/requests'], ['new-request','pumuiseon/#/requests/new'],
  ['materials','pumuiseon/#/materials'], ['orders','pumuiseon/#/orders'],
  ['galpirok','galpirok/'], ['mini-sns','mini-sns/'], ['jansang','jansang-cinema/'],
  ...['index','inspection','process','adoption','consultation','implementation'].map(name=>[`gijunseon-${name}`,`gijunseon/${name}.html`]),
];
const report = { target: remote || 'local production builds', checks: [], interactions: [], errors: [] };
let server, browser;
function requireTrue(condition, message) { if (!condition) throw new Error(message); }
async function settle(page, scroll = true) {
  await page.evaluate(() => document.fonts.ready);
  if (scroll) await page.evaluate(async () => {
    for(let y=0;y<document.body.scrollHeight;y+=750){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,65)); }
    window.scrollTo(0,0);
  });
  await page.waitForTimeout(250);
  await page.waitForFunction(() => [...document.images].every(i => i.complete || i.loading === 'lazy'), {timeout:8000}).catch(()=>{});
}
async function inspect(page, label, width) {
  const state = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 2,
    brokenImages: [...document.images].filter(i=>i.complete && !i.naturalWidth && i.currentSrc).map(i=>i.currentSrc),
    title: document.title, bodyLength: document.body.innerText.trim().length,
    missing: /페이지를 찾을 수 없습니다/.test(document.querySelector('main')?.innerText || ''),
  }));
  const item={label,width,...state}; report.checks.push(item);
  requireTrue(!state.overflow && !state.brokenImages.length && state.bodyLength>30 && !state.missing, JSON.stringify(item));
}
(async () => {
  fs.mkdirSync(output,{recursive:true});
  let base=remote;
  if(!base){
    server=http.createServer((req,res)=>{
      try {
        const parts=decodeURIComponent(new URL(req.url,'http://localhost').pathname).split('/').filter(Boolean);
        if(parts.shift()!=='dohan-portfolio' || parts.some(s=>s.startsWith('.') || s.includes('\\'))) {res.writeHead(404).end();return;}
        if(parts[0]==='jobflow-dashboard'){
          res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
          fs.createReadStream(path.join(root,'lecture1/galpirok/legacy-jobflow-redirect.html')).pipe(res);
          return;
        }
        const mount=mounts[parts.shift()];
        if(!mount){res.writeHead(404).end();return;}
        const folder=path.resolve(root,mount); let file=path.resolve(folder,...parts);
        if(!file.startsWith(folder+path.sep) && file!==folder){res.writeHead(403).end();return;}
        if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
        if(!types[path.extname(file)] || !fs.existsSync(file)){res.writeHead(404).end();return;}
        res.writeHead(200,{'Content-Type':types[path.extname(file)]});fs.createReadStream(file).pipe(res);
      } catch {res.writeHead(500).end();}
    });
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    base=`http://127.0.0.1:${server.address().port}/dohan-portfolio/`;
  }
  if(!base.endsWith('/'))base+='/';
  browser=await chromium.launch({headless:true,channel:process.env.AUDIT_BROWSER_CHANNEL || 'msedge'});
  for(const width of [1440,390]){
    const context=await browser.newContext({viewport:{width,height:width===390?844:960},reducedMotion:'reduce'});
    const page=await context.newPage();let active='';
    page.on('pageerror',e=>report.errors.push({active,width,type:'pageerror',message:e.message}));
    page.on('response',res=>{if(res.status()>=400)report.errors.push({active,width,type:'http',url:res.url(),status:res.status()});});
    for(const [label,url] of cases){
      active=label;
      const response=await page.goto(base+url,{waitUntil:'networkidle',timeout:45000});
      requireTrue(!response || response.ok(),`HTTP failed: ${label}`);
      await settle(page);await inspect(page,label,width);
      if(['home','about','feedback-hub','seolbiit','jansang','gijunseon-index'].includes(label))await page.screenshot({path:path.join(output,`${label}-${width}.png`),fullPage:label==='seolbiit'});
      console.log(`PASS ${width} ${label}`);
    }
    // Real controls: reduced motion fallback, local demo dialog, and navigation.
    active='interactions';
    await page.goto(base+'my-portfolio/',{waitUntil:'networkidle'});
    await page.getByRole('button',{name:'표지 펼치기 · 품의선 전표 보기'}).click();
    await page.waitForFunction(()=>{const r=document.getElementById('receipt-feature').getBoundingClientRect();return r.top<innerHeight && r.bottom>0;});
    report.interactions.push({width,action:'cover opens receipt (reduced motion)',ok:true});
    await page.goto(base+'jobflow-dashboard/',{waitUntil:'networkidle'});
    await page.getByRole('button',{name:'샘플 기록 체험하기'}).click();
    await page.getByRole('dialog').waitFor();
    requireTrue((await page.getByRole('dialog').innerText()).includes('샘플'), 'Sample dialog missing');
    await page.getByRole('button',{name:'회사 기록 닫기'}).click();
    report.interactions.push({width,action:'galpirok sample opens and closes',ok:true});
    await page.goto(base+'mini-sns/',{waitUntil:'networkidle'});
    const guest=page.getByRole('button',{name:'게스트 데모 시작하기'});
    if(await guest.count()){await guest.click();await page.waitForTimeout(350);}
    requireTrue((await page.locator('body').innerText()).includes('게스트'),'Guest entry failed');
    report.interactions.push({width,action:'mini-sns guest entry',ok:true});
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
  const page=await context.newPage();await page.goto(base+'my-portfolio/',{waitUntil:'networkidle'});
  for(const width of [2560,2480,2304,2133,2048,1920,1707,1440,1366,1024,820,768,430,390]){
    await page.setViewportSize({width,height:960});await settle(page,false);await inspect(page,'home-width-sweep',width);
  }
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(base+'my-portfolio/',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'표지 펼치기 · 품의선 전표 보기'}).click();
  await page.waitForFunction(()=>{const r=document.getElementById('receipt-feature').getBoundingClientRect();return r.top<innerHeight && r.bottom>0;},undefined,{timeout:12000});
  report.interactions.push({width:390,action:'animated cover reaches receipt',ok:true});
  await context.close();
  requireTrue(report.errors.length===0,JSON.stringify(report.errors));
  console.log(JSON.stringify({checks:report.checks.length,interactions:report.interactions.length,errors:report.errors.length}));
})().catch(error=>{report.failure=error.stack;console.error(error.message);process.exitCode=1;}).finally(async()=>{
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(report,null,2));
  if(browser)await browser.close();if(server)await new Promise(resolve=>server.close(resolve));
});
