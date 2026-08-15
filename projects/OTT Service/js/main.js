/* 포트폴리오용 반응형 스트리밍 UI 콘셉트 */

'use strict';

// ──────────────────────────────────────────────
// 1. 헤더 스크롤 시 배경 변경
// ──────────────────────────────────────────────
const header = document.getElementById('header');

function handleScroll() {
  header.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();


// ──────────────────────────────────────────────
// 2. 모바일 메뉴
// ──────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const headerLogo = document.querySelector('.header__logo');
const desktopViewport = window.matchMedia('(min-width: 768px)');

function openMobileMenu() {
  mobileMenu.hidden = false;
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', '메뉴 닫기');
  mobileMenu.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => mobileMenu.querySelector('.mobile-nav__link')?.focus());
}

function closeMobileMenu({ restoreFocus = true, focusTarget = null } = {}) {
  const wasOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', '메뉴 열기');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.hidden = true;
  if (!wasOpen) return;
  if (focusTarget?.isConnected && focusTarget.getClientRects().length) {
    focusTarget.focus();
  } else if (restoreFocus && !desktopViewport.matches) {
    hamburger.focus();
  }
}

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) closeMobileMenu();
  else openMobileMenu();
});

document.querySelectorAll('.mobile-nav__link').forEach((link) => {
  link.addEventListener('click', () => closeMobileMenu());
});

document.addEventListener('pointerdown', (event) => {
  if (!mobileMenu.classList.contains('open')) return;
  if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) closeMobileMenu();
});

function handleDesktopViewport(event) {
  if (!event.matches) return;
  const activeElement = document.activeElement;
  const focusWasInMobileMenu = mobileMenu.contains(activeElement);
  const focusWasOnHamburger = activeElement === hamburger;
  let desktopFocusTarget = null;

  if (focusWasInMobileMenu && activeElement.matches('a[href]')) {
    const href = activeElement.getAttribute('href');
    desktopFocusTarget = document.querySelector(`.header__nav a[href="${href}"]`);
  }
  if ((focusWasInMobileMenu || focusWasOnHamburger) && !desktopFocusTarget) {
    desktopFocusTarget = headerLogo;
  }

  closeMobileMenu({ restoreFocus: false, focusTarget: desktopFocusTarget });
}

desktopViewport.addEventListener('change', handleDesktopViewport);
handleDesktopViewport(desktopViewport);

const skipLink = document.querySelector('.skip-link');
const mainContent = document.getElementById('main-content');

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.scrollIntoView({ block: 'start' });
  mainContent.focus({ preventScroll: true });
});

// ──────────────────────────────────────────────
// 3. 장르 필터 버튼 → 카드 필터링
// ──────────────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const contentCards = document.querySelectorAll('#contentsGrid .card');
const filterStatus = document.getElementById('filterStatus');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selected = btn.dataset.filter;

    filterBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    let visibleCardCount = 0;
    contentCards.forEach((card) => {
      const match = selected === 'all' || card.dataset.genre === selected;
      card.classList.toggle('hidden', !match);
      if (match) visibleCardCount += 1;
    });

    filterStatus.textContent = `${btn.textContent.trim()} 필터 적용: 콘텐츠 ${visibleCardCount}개가 표시됩니다.`;
  });
});


// ──────────────────────────────────────────────
// 4. 정적 콘텐츠 데이터와 native dialog
// ──────────────────────────────────────────────
const contents = {
  'catalog-01': {
    title: 'SIGNAL / 01',
    genre: '미스터리 스릴러',
    description: '도시 전력망이 멈춘 밤, 분석가는 정전 직전 반복된 좌표 신호를 추적한다.',
    year: '2026',
    episodes: '12화',
    rating: '4.8 · 데모 평점'
  },
  'catalog-02': {
    title: 'BLUE / 02',
    genre: '로맨스 드라마',
    description: '해가 지기 전 짧은 푸른 시간, 두 사람은 사라진 약속의 기록을 다시 마주한다.',
    year: '2025',
    episodes: '8화',
    rating: '4.6 · 데모 평점'
  },
  'catalog-03': {
    title: 'CITY / 03',
    genre: 'SF',
    description: '지도에서 삭제된 구역에 진입한 조사팀이 반복되는 하루의 원인을 찾는다.',
    year: '2026',
    episodes: '10화',
    rating: '4.9 · 데모 평점'
  },
  'catalog-04': {
    title: 'ROOM / 04',
    genre: '심리',
    description: '소리가 사라진 실험실에서 한 연구원이 벽 너머의 규칙적인 진동을 기록한다.',
    year: '2025',
    episodes: '6화',
    rating: '4.7 · 데모 평점'
  },
  'catalog-05': {
    title: 'ARCHIVE / 05',
    genre: '다큐멘터리',
    description: '폐쇄 직전의 기록 보관소에서 마지막 관리자가 누락된 문서의 순서를 복원한다.',
    year: '2026',
    episodes: '5화',
    rating: '4.5 · 데모 평점'
  },
  'catalog-06': {
    title: 'RUNWAY / 06',
    genre: '테크 스릴러',
    description: '운항 기록에 없는 활주로 신호가 매일 같은 시각 관제 화면에 나타난다.',
    year: '2026',
    episodes: '9화',
    rating: '4.8 · 데모 평점'
  },
  'catalog-07': {
    title: 'FOCUS / 07',
    genre: '드라마',
    description: '사진가는 현상되지 않은 필름 속에서 반복되는 인물의 흔적을 발견한다.',
    year: '2026',
    episodes: '10화',
    rating: '4.6 · 데모 평점'
  },
  'catalog-08': {
    title: 'MIDNIGHT / 08',
    genre: '스릴러',
    description: '자정 이후에만 연결되는 호출이 한 도시의 오래된 사건을 다시 연다.',
    year: '2026',
    episodes: '8화',
    rating: '4.7 · 데모 평점'
  },
  'catalog-09': {
    title: 'FREQUENCY / 09',
    genre: '미스터리',
    description: '서로 다른 지역의 라디오에서 같은 음성이 동시에 송출되기 시작한다.',
    year: '2026',
    episodes: '7화',
    rating: '4.8 · 데모 평점'
  },
  'catalog-10': {
    title: 'OCEAN / 10',
    genre: 'SF',
    description: '해저 관측망의 오류를 추적하던 팀이 지도에 없는 구조물을 감지한다.',
    year: '2026',
    episodes: '11화',
    rating: '4.5 · 데모 평점'
  }
};

const projectGuideDialog = document.getElementById('projectGuideDialog');
const contentInfoDialog = document.getElementById('contentInfoDialog');
const trailerModal = document.getElementById('trailerModal');
const dialogs = [projectGuideDialog, contentInfoDialog, trailerModal];
const dialogTriggers = new WeakMap();
const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
let currentContentId = 'catalog-01';

function syncPageScroll() {
  document.body.style.overflow = dialogs.some((dialog) => dialog.open) ? 'hidden' : '';
}

function openDialog(dialog, trigger, initialFocus) {
  dialogTriggers.set(dialog, trigger || document.activeElement);
  if (!dialog.open) dialog.showModal();
  syncPageScroll();
  requestAnimationFrame(() => initialFocus.focus());
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

dialogs.forEach((dialog) => {
  dialog.querySelectorAll('.js-dialog-close').forEach((button) => {
    button.addEventListener('click', () => closeDialog(dialog));
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });

  dialog.addEventListener('keydown', (event) => {
    const topmostDialog = dialogs.filter((item) => item.open).at(-1);
    if (event.key === 'Escape') {
      if (dialog === topmostDialog) {
        event.preventDefault();
        closeDialog(dialog);
      }
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(dialog.querySelectorAll(focusableSelector))
      .filter((element) => !element.hidden && element.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!focusable.includes(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  dialog.addEventListener('close', () => {
    syncPageScroll();
    const trigger = dialogTriggers.get(dialog);
    if (trigger?.isConnected && trigger.getClientRects().length) trigger.focus();
    dialogTriggers.delete(dialog);
  });
});

document.querySelectorAll('.js-project-guide').forEach((button) => {
  button.addEventListener('click', () => {
    const fromMobileMenu = Boolean(button.closest('#mobileMenu'));
    if (fromMobileMenu) closeMobileMenu({ restoreFocus: false });
    openDialog(
      projectGuideDialog,
      fromMobileMenu ? hamburger : button,
      document.getElementById('projectGuideTitle')
    );
  });
});

function openTrailer(trigger, title) {
  document.getElementById('modalTitle').textContent = `${title} — 미리보기 UI`;
  document.getElementById('modalVideoTitle').textContent = title;
  openDialog(trailerModal, trigger, document.getElementById('modalTitle'));
}

document.querySelectorAll('.js-trailer-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const content = contents[button.dataset.contentId];
    openTrailer(button, content?.title || 'SIGNAL / 01');
  });
});

function openContentInfo(trigger, contentId) {
  const content = contents[contentId];
  if (!content) return;
  currentContentId = contentId;
  document.getElementById('contentInfoTitle').textContent = content.title;
  document.getElementById('contentInfoGenre').textContent = content.genre;
  document.getElementById('contentInfoDescription').textContent = content.description;
  document.getElementById('contentInfoYear').textContent = content.year;
  document.getElementById('contentInfoEpisodes').textContent = content.episodes;
  const contentInfoRating = document.getElementById('contentInfoRating');
  contentInfoRating.querySelector('.rating-value').textContent = content.rating.split(' ')[0];
  contentInfoRating.setAttribute('aria-label', `데모 평점 ${content.rating.split(' ')[0]}점`);
  document.getElementById('contentInfoLike').dataset.likeId = contentId;
  syncLikeButtons(contentId);
  openDialog(contentInfoDialog, trigger, document.getElementById('contentInfoTitle'));
}

document.querySelectorAll('.js-info-btn').forEach((button) => {
  button.addEventListener('click', () => openContentInfo(button, button.dataset.contentId));
});

document.querySelector('.js-info-trailer').addEventListener('click', (event) => {
  openTrailer(event.currentTarget, contents[currentContentId].title);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !dialogs.some((dialog) => dialog.open) && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});


// ──────────────────────────────────────────────
// 5. 찜하기 상태 (현재 페이지 메모리에서만 유지)
// ──────────────────────────────────────────────
const likedContentIds = new Set();

function syncLikeButtons(contentId) {
  const isLiked = likedContentIds.has(contentId);
  const contentTitle = contents[contentId]?.title;
  document.querySelectorAll('.js-like-btn').forEach((button) => {
    if (button.dataset.likeId !== contentId) return;
    button.classList.toggle('liked', isLiked);
    button.setAttribute('aria-pressed', String(isLiked));
    const actionLabel = isLiked ? '찜 해제' : '찜하기';
    button.setAttribute('aria-label', contentTitle ? `${contentTitle} ${actionLabel}` : actionLabel);
    const label = button.querySelector('.js-like-label');
    if (label) label.textContent = actionLabel;
  });
}

document.querySelectorAll('.js-like-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const contentId = button.dataset.likeId;
    if (!contentId) return;
    if (likedContentIds.has(contentId)) likedContentIds.delete(contentId);
    else likedContentIds.add(contentId);
    syncLikeButtons(contentId);
  });
});

// ──────────────────────────────────────────────
// 6. 스크롤 감지 → 네비 링크 active 전환
// ──────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link, .mobile-nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${id}`;
        if (link.classList.contains('nav__link')) link.classList.toggle('active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
);

sections.forEach((sec) => sectionObserver.observe(sec));
