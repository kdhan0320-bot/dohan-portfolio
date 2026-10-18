// 기존 공정봄의 공통 shell·dialog 초점 복귀 패턴을 기준선 구성으로 단순화했습니다.
const A = 'assets/figma/';
const page = document.body.dataset.page;
// 기본 탐색은 HTML에 두고, 같은 링크를 모바일 대화상자에 재사용합니다.
function navLinks() {
  return [...document.querySelectorAll('.desktop-nav a')].map(link => {
    const copy = link.cloneNode(true);
    copy.removeAttribute('class');
    return copy.outerHTML;
  }).join('');
}
const preparationAction = page === 'consultation'
  ? `<button class="btn btn-primary" type="button" data-dialog-close data-return-to-consultation>상담 입력 계속하기<img class="arrow" src="${A}home-img36.svg" alt=""></button>`
  : `<a class="btn btn-primary" href="consultation.html">도입 상담하기<img class="arrow" src="${A}home-img36.svg" alt=""></a>`;
document.body.insertAdjacentHTML('beforeend', `<dialog id="mobile-menu" class="mobile-menu" aria-labelledby="menu-title"><h2 id="menu-title">전체 메뉴</h2><button class="dialog-close" data-dialog-close aria-label="메뉴 닫기"><img src="${A}741-2-img.svg" alt=""></button><nav aria-label="모바일 주 메뉴">${navLinks(true)}</nav></dialog><dialog id="preparation-dialog" class="preparation-dialog" aria-labelledby="preparation-title"><h2 id="preparation-title">상담 전 준비 안내</h2><button type="button" class="dialog-close" data-dialog-close aria-label="준비 안내 닫기"><img src="${A}741-2-img.svg" alt=""></button><ul class="preparation-list"><li><span class="prep-icon" aria-hidden="true"><img src="${A}741-2-img2.svg" alt=""></span><div><h3>제품 사진</h3><p>제품 전체와 검사 부위 사진</p></div></li><li><span class="prep-icon" aria-hidden="true"><img src="${A}741-2-img3.svg" alt=""><img src="${A}741-2-img4.svg" alt=""></span><div><h3>검사할 항목</h3><p>흠집·누락·인쇄 중 필요한 검사</p></div></li><li><span class="prep-icon" aria-hidden="true"><img src="${A}741-2-img5.svg" alt=""></span><div><h3>설치 환경</h3><p>촬영 위치와 주변 설비 사진</p></div></li></ul>${preparationAction}</dialog>`);
const openers = new WeakMap();
export function openDialog(dialog, opener = document.activeElement) {
  if (!dialog || dialog.open) return;
  openers.set(dialog, opener);
  dialog.showModal();
  opener?.setAttribute('aria-expanded', 'true');
  (dialog.querySelector('[autofocus]') || dialog.querySelector('[data-dialog-close]') || dialog).focus();
}
export function setupDialogs() {
  document.querySelectorAll('dialog:not([data-dialog-ready])').forEach(dialog => {
    dialog.dataset.dialogReady = 'true';
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el => el.getClientRects().length && !el.closest('[hidden]'));
      const first = focusable[0], last = focusable.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !focusable.includes(document.activeElement))) { event.preventDefault(); first.focus(); }
    });
    dialog.addEventListener('click', event => {
      if (event.target.closest('[data-dialog-close]')) dialog.close();
      if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); }
    });
    dialog.addEventListener('close', () => { const opener = openers.get(dialog); opener?.setAttribute('aria-expanded','false'); if(opener?.isConnected) opener.focus({preventScroll:true}); });
  });
}
setupDialogs();
document.querySelector('.menu-trigger').addEventListener('click', event => openDialog(document.querySelector('#mobile-menu'), event.currentTarget));
document.querySelectorAll('[data-open-preparation]').forEach(button => {
  button.addEventListener('click', event => openDialog(document.querySelector('#preparation-dialog'), event.currentTarget));
  button.disabled = false;
});
document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', () => document.querySelector('#mobile-menu').close()));
matchMedia('(min-width:901px)').addEventListener('change', event => { if(event.matches) document.querySelector('#mobile-menu').close(); });

// 상호작용이 준비된 경우에만 모바일 메뉴를 접습니다.
document.documentElement.classList.add("js-enabled");
