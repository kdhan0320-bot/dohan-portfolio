const { chromium, expect } = require('../../../tools/site-audit-kit/node_modules/@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const base = (process.env.GONGJEONGBOM_URL || 'http://127.0.0.1:4180/').replace(/\/?$/, '/');
const out = path.resolve(__dirname, '../../../tools/site-audit-kit/audit-output');
const report = { base, screens: [], flows: [], errors: [], requests: [] };
const key = 'gongjeongbom-process-draft-v1';
const ids = ['mv-x300', 'mv-x500', 'mv-x700'];
function assert(value, label) { if (!value) throw Error(label); }
async function inspect(page, name, width) {
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => ({
    width: innerWidth, scroll: document.documentElement.scrollWidth,
    h1: document.querySelectorAll('h1').length,
    broken: [...document.images].filter(i=>i.complete && !i.naturalWidth).map(i=>i.src),
    font: document.fonts.check('500 16px "Noto Sans KR"'),
    tiny: [...document.querySelectorAll('main *,header *,footer *,dialog[open] *')].filter(el=>el.getClientRects().length && !el.closest('svg,.sr-only') && [...el.childNodes].some(n=>n.nodeType===3 && n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize)<12).map(el=>el.textContent.slice(0,50)),
  }));
  assert(result.scroll<=width, `${name} overflow at ${width}: ${result.scroll}`);
  assert(result.h1===1 && result.font && !result.broken.length, `${name} content/assets at ${width}`);
  assert(!result.tiny.length, `${name} text below 12px at ${width}: ${result.tiny}`);
  if (await page.locator('body[data-page="products"],body[data-page="product"],body[data-page="compare"],body[data-page="inquiry"]').count()) await expect(page.locator('.review-route a')).toHaveCount(3);
  report.screens.push({name,width,pass:true});
}
async function capture(page,name,width) {
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(out,`gongjeongbom-refined-${name}-${width}.png`),fullPage:false});
}
function monitor(page) {
  page.on('pageerror',e=>report.errors.push({url:page.url(),message:e.message}));
  page.on('console',m=>{if(m.type()==='error') report.errors.push({url:page.url(),message:m.text()});});
  page.on('request',r=>{if(r.method()!=='GET') report.requests.push({url:r.url(),method:r.method()});});
  page.on('dialog',d=>d.accept()); // Browser reload/back confirmation is explicitly accepted in these checks.
}
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const width of [320,390,760,761,1024,1440]) {
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage(); monitor(page);
    for(const route of ['index.html','products.html','product.html?id=mv-x500','compare.html','inquiry.html','notice.html']) {
      await page.goto(base+route); await inspect(page,route,width);
      if([320,390,1440].includes(width)) await capture(page,route.split('.')[0],width);
    }
    for(const count of [2,3]) {
      await page.evaluate(({ids,count})=>sessionStorage.setItem('gongjeongbom-compare',JSON.stringify(ids.slice(0,count))),{ids,count});
      await page.goto(base+'compare.html'); await inspect(page,'comparison-'+count,width);
      if([320,390,1440].includes(width)) await capture(page,'comparison-'+count,width);
    }
    await ctx.close();
  }
  for(const width of [1440,390,320]) {
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage(); monitor(page);
    await page.goto(base+'index.html');
    await page.getByRole('button',{name:'정상 샘플',exact:true}).click();
    await expect(page.locator('.sample-result__count')).toHaveText('4 / 4');
    await page.getByRole('button',{name:'누락 샘플',exact:true}).click();
    await expect(page.locator('.sample-result__count')).toHaveText('3 / 4');
    if(width<761) {
      await page.locator('.menu-trigger').click(); await page.keyboard.press('Escape');
      await expect(page.locator('#menu-dialog')).not.toBeVisible(); await expect(page.locator('.menu-trigger')).toBeFocused();
    }
    await page.goto(base+'products.html');
    await page.getByRole('button',{name:'비전 시스템 3',exact:true}).click();
    await page.locator('#product-search').fill('MV-'); await page.getByRole('button',{name:'검색',exact:true}).click();
    await expect(page.locator('.product-card')).toHaveCount(3);
    const searchUrl=page.url(), filters=new URL(searchUrl).search.slice(1);
    await page.goBack(); await expect(page.locator('#product-search')).toHaveValue('');
    await expect(page.locator('.product-card')).toHaveCount(3);
    await page.goForward(); await expect(page.locator('#product-search')).toHaveValue('MV-');
    await page.reload(); await expect(page.locator('.product-card')).toHaveCount(3);
    if(width<761) {
      await page.locator('.filter-trigger').click();
      await page.locator('#filter-dialog').getByRole('checkbox',{name:'코드·문자',exact:true}).check();
      await page.keyboard.press('Escape'); await expect(page.locator('.product-card')).toHaveCount(3);
      await page.locator('.filter-trigger').click();
      await expect(page.locator('#filter-dialog').getByRole('checkbox',{name:'코드·문자',exact:true})).not.toBeChecked();
      await page.keyboard.press('Escape');
    }
    await page.getByRole('link',{name:'MV-X300 상세 보기',exact:true}).click();
    await page.getByRole('link',{name:'MV-X500 상세 보기',exact:true}).click();
    await page.reload(); assert(new URL(page.url()).searchParams.get('filters')===filters,'related detail retains filters');
    await page.getByRole('link',{name:'← 검색 결과로 돌아가기',exact:true}).click();
    assert(page.url()===searchUrl,'related detail returns to exact search');
    await page.locator('[data-compare-id="mv-x300"]').click();
    await page.locator('[data-compare-id="mv-x500"]').click();
    await page.locator('.compare-results-link').click();
    assert(new URL(page.url()).searchParams.get('filters')===filters,'comparison context');
    await page.getByRole('button',{name:'차이만 보기',exact:true}).click();
    await expect(page.locator('.compare-table tbody tr')).toHaveCount(6);
    await page.locator('.compare-selection a').first().click();
    await page.reload(); await page.getByRole('link',{name:'← 비교로 돌아가기',exact:true}).click();
    await expect(page.locator('.compare-selection article')).toHaveCount(2);
    await page.locator('.compare-inquiry').click();
    const inquiryUrl=page.url();
    assert(new URL(inquiryUrl).searchParams.get('filters')===filters,'inquiry context');
    await expect(page.locator('[data-step="2"]')).toBeVisible();
    await page.getByRole('button',{name:'다음: 담당자 정보',exact:true}).click();
    await expect(page.locator('.error-summary li')).toHaveCount(2);
    await page.locator('#field-problem').fill('커넥터 누락 검사');
    await page.locator('#field-details').fill('커넥터 네 개의 유무를 확인합니다.\n조명 반사도 확인하고 싶습니다.');
    await page.locator('#field-target').fill('커넥터 조립 라인');
    await page.locator('#field-reason').fill('두 위치를 함께 검사하고 기존 설비에 결과를 전달하려고 합니다.');
    await page.locator('input[name="conditions"][value="라인 속도"]').check();
    await expect(page.locator('.error-summary')).not.toBeVisible();
    await page.getByRole('button',{name:'다음: 담당자 정보',exact:true}).click();
    const stepTop=await page.locator('#step3-title').evaluate(el=>el.getBoundingClientRect().top);
    assert(stepTop>=76 && stepTop<=300,'next step stays visible below header');
    await page.locator('#field-name').fill('비공개이름');
    await page.locator('#field-company').fill('비공개회사');
    await page.locator('#field-email').fill('private-contact@example.com');
    await page.locator('#field-phone').fill('010-1234-5678');
    await page.locator('.save-draft').click();
    const stored=await page.evaluate(key=>sessionStorage.getItem(key),key);
    assert(stored.includes('커넥터')&&stored.includes('두 위치'),'process and reason saved');
    for(const personal of ['비공개이름','비공개회사','private-contact@example.com','010-1234-5678']) assert(!stored.includes(personal),'contact excluded from draft: '+personal);
    if(width<761){await page.locator('.menu-trigger').click();await page.locator('#menu-dialog').getByRole('link',{name:'제품 찾기 ↗',exact:true}).click();await expect(page.locator('.keep-and-leave')).toBeFocused();await page.keyboard.press('Escape');await expect(page.locator('.menu-trigger')).toBeFocused();}
    await page.locator('.review-route a').first().click();
    await expect(page.locator('#leave-dialog')).toBeVisible(); await expect(page.locator('.keep-and-leave')).toBeFocused();
    await inspect(page,'leave-dialog',width); await capture(page,'leave-dialog',width);
    await page.keyboard.press('Escape'); await expect(page.locator('#leave-dialog')).not.toBeVisible();
    await expect(page.locator('.review-route a').first()).toBeFocused();
    await page.locator('.review-route a').first().click(); await page.locator('.keep-and-leave').click();
    await expect(page.locator('#product-search')).toHaveValue('MV-');
    await page.locator('.review-route a').nth(2).click();
    await expect(page.locator('.restore-draft')).toBeVisible();
    await page.locator('.restore-draft').click();
    await expect(page.locator('#field-reason')).toHaveValue('두 위치를 함께 검사하고 기존 설비에 결과를 전달하려고 합니다.');
    await expect(page.locator('#field-details')).toHaveValue('커넥터 네 개의 유무를 확인합니다.\n조명 반사도 확인하고 싶습니다.');
    await expect(page.locator('input[name="products"]:checked')).toHaveCount(2);
    await page.reload(); await page.locator('.restore-draft').click();
    await expect(page.locator('#field-target')).toHaveValue('커넥터 조립 라인');
    for(const field of ['name','company','email','phone']) await expect(page.locator('#field-'+field)).toHaveValue('');
    await page.getByRole('button',{name:'다음: 담당자 정보',exact:true}).click();
    await page.locator('#field-name').fill('비공개이름'); await page.locator('#field-email').fill('invalid');
    await page.locator('#field-demo-confirm').check(); await page.getByRole('button',{name:'데모 문의 완료',exact:true}).click();
    await expect(page.locator('.error-summary li')).toHaveCount(1);
    await page.locator('#field-email').fill('private-contact@example.com'); await page.getByRole('button',{name:'데모 문의 완료',exact:true}).click();
    await expect(page.locator('.completion-state')).toBeVisible();
    await expect(page.locator('.completion-summary')).toContainText('두 위치를 함께 검사');
    assert(await page.evaluate(key=>sessionStorage.getItem(key),key)===null,'completed draft cleared');
    await ctx.grantPermissions(['clipboard-read','clipboard-write']);
    await page.locator('.copy-review').click(); await expect(page.locator('.copy-status')).toContainText('복사했습니다');
    const copy=await page.evaluate(()=>navigator.clipboard.readText());
    assert(copy.includes('커넥터')&&copy.includes('MV-X500')&&!copy.includes('비공개')&&!copy.includes('private-contact'),'copy includes process without contact');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));
    await page.locator('.copy-review').click(); await expect(page.locator('.copy-fallback textarea')).toBeFocused();
    await inspect(page,'completed',width); await page.locator('.completion-state').scrollIntoViewIfNeeded(); await capture(page,'completed',width);
    await page.locator('.completion-state').getByRole('link',{name:'검색 결과로 돌아가기',exact:true}).click();
    assert(page.url()===searchUrl,'completion returns to search');
    await page.locator('#product-search').fill('없는제품'); await page.getByRole('button',{name:'검색',exact:true}).click();
    await expect(page.locator('.empty-state')).toBeVisible(); await page.locator('.clear-search').click();
    await expect(page.locator('.product-card')).toHaveCount(3); await expect(page.locator('#product-search')).toBeFocused();
    assert(new URL(page.url()).searchParams.get('type')==='vision-system','clear query preserves filters');
    await page.goto(base+'inquiry.html?products=');
    await page.getByRole('button',{name:'다음: 공정·제품',exact:true}).click(); await expect(page.locator('.error-summary li')).toHaveCount(1);
    await page.locator('#purpose-integration').check(); await page.getByRole('button',{name:'다음: 공정·제품',exact:true}).click();
    await page.locator('#field-problem').fill('버릴 초안'); await page.locator('.save-draft').click();
    await page.locator('#field-target').fill('미보관 변경'); await page.locator('.review-route a').first().click();
    await page.locator('.discard-and-leave').click();
    assert(await page.evaluate(key=>sessionStorage.getItem(key),key)===null,'explicit discard removes saved draft');
    if(width===390) {
      await page.goto(base+'inquiry.html?products='); await page.locator('#purpose-selection').check();
      await page.evaluate(()=>{window.originalSet=Storage.prototype.setItem;window.originalRemove=Storage.prototype.removeItem;Storage.prototype.setItem=function(k,v){if(k==='gongjeongbom-process-draft-v1')throw Error('blocked');return window.originalSet.call(this,k,v)};Storage.prototype.removeItem=function(k){if(k==='gongjeongbom-process-draft-v1')throw Error('blocked');return window.originalRemove.call(this,k)}});
      await page.locator('.review-route a').first().click(); await page.locator('.keep-and-leave').click();
      await expect(page.locator('#leave-dialog')).toBeVisible(); await expect(page.locator('.leave-error')).toContainText('보관하지 못해');
      await page.locator('.discard-and-leave').click(); await expect(page.locator('.leave-error')).toContainText('삭제하지 못해');
      await page.evaluate(()=>{Storage.prototype.setItem=window.originalSet;Storage.prototype.removeItem=window.originalRemove});
      await page.locator('.keep-and-leave').click(); await expect(page.locator('#product-search')).toBeVisible();
    }
    report.flows.push({width,pass:true}); console.log('PASS continuity/draft/review '+width);
    await ctx.close();
  }
  const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage(); monitor(page);
  await page.goto(base+'products.html?q=MV&type=vision-system&problem=assembly&connection=data');
  await expect(page.locator('.product-card')).toHaveCount(3);
  await page.locator('.filter-panel .reset-filter').click();
  assert(new URL(page.url()).search==='?q=MV','filter reset keeps search');
  await page.locator('#product-search').fill('존재하지 않는 제품'); await page.getByRole('button',{name:'검색',exact:true}).click();
  await page.locator('.reset-all').click(); await expect(page.locator('.product-card')).toHaveCount(7);
  await page.locator('[data-compare-id="vs-c100"]').click();
  await page.locator('[data-compare-id="mv-x500"]').click();
  await expect(page.locator('[data-compare-id="mv-x500"]')).toHaveAttribute('aria-pressed','false');
  await expect(page.locator('.toast')).toContainText('같은 종류');
  await page.locator('[data-compare-id="vs-c100"]').click();
  for(const id of ids) await page.locator(`[data-compare-id="${id}"]`).click();
  await page.locator('.compare-results-link').click();
  await page.locator('[data-remove-compare="mv-x700"]').click();
  await expect(page.locator('.compare-selection article')).toHaveCount(2);
  await page.locator('.clear-compare').click(); await expect(page.locator('.empty-state')).toBeVisible();
  await page.setViewportSize({width:390,height:900});
  await page.goto(base+'products.html'); await page.locator('.filter-trigger').click();
  await page.locator('#filter-dialog').getByRole('checkbox',{name:'누락·오조립',exact:true}).check();
  await page.locator('#filter-dialog').getByRole('checkbox',{name:'데이터 출력',exact:true}).check();
  await page.locator('.apply-filter').click(); await expect(page.locator('.product-card')).toHaveCount(3);
  await page.reload(); await expect(page.locator('.product-card')).toHaveCount(3);
  const normalize=await page.evaluate(async()=>{const {normalizeFilters}=await import('./js/navigation.js?v=20261108b');return normalizeFilters('type=__proto__&problem=bad&problem=assembly&problem=assembly&connection=data&connection=bad&q='+encodeURIComponent('<img onerror=alert(1)>')+'&next=https://example.com')});
  const normalized=new URLSearchParams(normalize);
  assert(!normalized.has('type') && !normalized.has('next') && normalized.getAll('problem').length===1 && normalized.get('q')==='<img onerror=alert(1)>','filter validation');
  const links=new Set();
  report.contrast=[];
  for(const route of ['index.html','products.html','product.html?id=mv-x500','compare.html','inquiry.html','notice.html']) {
    await page.goto(base+route);
    for(const href of await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.href))) {const url=new URL(href);if(url.origin===new URL(base).origin){url.hash='';links.add(url.href);}}
    const samples=await page.evaluate(()=>{
      const rgb=s=>s.match(/[\d.]+/g).map(Number);
      const lum=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
      return ['.lead','.demo-note','.filter-hint','.product-card__fit','.chip-row span','.draft-status','.field-grid small','.review-route a[aria-current]','.disclosure','.sample-result__description','.hero__path','.form-step>p'].flatMap(selector=>{
        const e=document.querySelector(selector);if(!e||!e.getClientRects().length)return [];
        const style=getComputedStyle(e);let p=e,bg;
        while(p){bg=getComputedStyle(p).backgroundColor;if(rgb(bg)[3]!==0)break;p=p.parentElement;}
        bg=p?bg:'rgb(255,255,255)';const values=[lum(rgb(style.color)),lum(rgb(bg))].sort((a,b)=>b-a);
        return [{selector,size:style.fontSize,ratio:(values[0]+.05)/(values[1]+.05)}];
      });
    });
    report.contrast.push(...samples.map(sample=>({route,...sample})));
  }
  for(const href of links) {const response=await page.request.get(href);assert(response.ok(),'broken internal link '+href);}
  for(const id of ['vs-c100','vs-c300',...ids,'cr-l100','cr-l300']) {
    await page.goto(base+'product.html?id='+id);await expect(page.locator('h1')).toHaveText(id.toUpperCase());
  }
  await page.goto(base+'product.html?id=missing');await expect(page.locator('h1')).toHaveText('제품을 찾을 수 없습니다.');
  assert(report.contrast.every(sample=>sample.ratio>=4.5),'contrast sample below 4.5: '+JSON.stringify(report.contrast.filter(sample=>sample.ratio<4.5)));
  report.links=links.size;report.extraChecks='filter-only reset, full reset, cross-type guard, comparison removal, mobile compound filters, query validation, seven product details, missing product';
  await ctx.close();
  assert(!report.errors.length,JSON.stringify(report.errors)); assert(!report.requests.length,'unexpected non-GET request');
  report.passed=true;
 } finally {fs.writeFileSync(path.join(out,'gongjeongbom-refined-checks.json'),JSON.stringify(report,null,2));await browser.close();}
 console.log(JSON.stringify({passed:report.passed,screens:report.screens.length,flows:report.flows,widths:[320,390,760,761,1024,1440],errors:report.errors.length,submissions:report.requests.length}));
})().catch(e=>{console.error(e);process.exitCode=1});
