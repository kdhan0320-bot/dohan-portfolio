import './common.js';
import { inspections } from './data.js?v=20261021-figma';
import { setResponsiveImage } from './images.js';

// Measured from the Figma photo viewport (628 × 471). The photograph remains
// one source image; only its scale and crop change in the enlarged view.
const layouts = {
  scratch: {
    zoom: [-553.43, -223.73],
    roi: [376.8, 192.33, 113.825, 74.575],
    mark: [200.17, 160.93, 227.65, 149.15],
    feature: '선형 흠집',
    wholeAlt: '표면에 선형 흠집이 있는 금속 제품. 사각형으로 검사 위치를 표시했습니다.',
    detailAlt: '금속 제품의 선형 흠집을 2배 확대한 사진.',
    bannerTop: '-25.62%', bannerHeight: '151.25%',
  },
  missing: {
    zoom: [-628, 0],
    roi: [503.18, 83.21, 59.66, 59.66],
    mark: [378.37, 166.42, 119.32, 119.32],
    feature: '부품 누락',
    wholeAlt: '체결 부품이 일부 누락된 조립 제품. 사각형으로 검사 위치를 표시했습니다.',
    detailAlt: '부품이 없어 비어 있는 체결 위치를 2배 확대한 사진.',
    bannerTop: '-25%', bannerHeight: '150%',
  },
  print: {
    zoom: [-311.49, -207.24],
    roi: [275.06, 210.07, 75.36, 22.608],
    mark: [238.64, 212.89, 150.72, 45.216],
    feature: '인쇄 끊김',
    wholeAlt: '인쇄선이 일부 끊긴 포장 제품. 사각형으로 검사 위치를 표시했습니다.',
    detailAlt: '끊긴 인쇄선을 2배 확대한 사진.',
    bannerTop: '-27%', bannerHeight: '150%',
  },
};

const tabs = [...document.querySelectorAll('[role="tab"][data-type]')];
const content = document.querySelector('.inspection-content');
const panel = document.querySelector('#inspection-panel');
const title = document.querySelector('#inspection-title');
const banner = document.querySelector('#inspection-banner');
const whole = document.querySelector('#inspection-whole');
const detail = document.querySelector('#inspection-detail');
const mark = document.querySelector('#inspection-mark');
const descriptionFields = {
  target: document.querySelector('#inspection-target'),
  point: document.querySelector('#inspection-point'),
  preparation: document.querySelector('#inspection-preparation'),
};
const ctaTitle = document.querySelector('#inspection-cta-title');
const ctaLink = document.querySelector('#inspection-consultation-link');
const status = document.querySelector('#inspection-status');
let selectedType;

function readType() {
  const type = new URL(window.location.href).searchParams.get('type');
  return Object.hasOwn(layouts, type) ? type : 'scratch';
}

function setGeometry(prefix, values) {
  const names = ['x', 'y', 'width', 'height'];
  values.forEach((value, index) => {
    const dimension = index % 2 === 0 ? 628 : 471;
    content.style.setProperty(`--${prefix}-${names[index]}`, `${value / dimension * 100}%`);
  });
}

function selectInspection(type, { updateHistory = false, announce = false } = {}) {
  if (!Object.hasOwn(layouts, type)) return;
  const inspection = inspections[type];
  const layout = layouts[type];
  const changed = type !== selectedType;
  selectedType = type;

  tabs.forEach((tab) => {
    const selected = tab.dataset.type === type;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', `tab-${type}`);
  title.textContent = inspection.title;
  document.title = `${inspection.title} · 기준선`;
  // 배너는 세로로 1.5배 크롭하므로 태블릿에서도 약 728px 이상의 원본 폭이 필요합니다.
  setResponsiveImage(banner, inspection.banner, '(max-width: 600px) 564px, (max-width: 700px) 800px, (max-width: 1440px) 728px, 50vw');
  banner.style.top = layout.bannerTop;
  banner.style.height = layout.bannerHeight;
  // 2배 확대에 필요한 해상도를 두 사진이 공유해 중복 파일 요청을 줄입니다.
  const photoSizes = '(max-width: 600px) calc(200vw - 80px), (max-width: 700px) 178vw, (max-width: 1440px) 88vw, 1256px';
  setResponsiveImage(whole, inspection.image, photoSizes);
  whole.alt = layout.wholeAlt;
  setResponsiveImage(detail, inspection.image, photoSizes);
  detail.alt = layout.detailAlt;
  mark.src = inspection.mark;
  document.querySelector('#inspection-feature').textContent = `표시 영역 확대 · ${layout.feature}`;
  Object.entries(descriptionFields).forEach(([key, element]) => {
    element.textContent = inspection.details[key];
    const mobileText = inspection.details[`${key}Mobile`];
    if (mobileText) {
      // Figma 모바일의 짧은 문구를 사용하되, 숨긴 문구는 읽기 순서에서 제외합니다.
      const desktopCopy = document.createElement('span');
      desktopCopy.className = 'inspection-copy-desktop';
      desktopCopy.textContent = inspection.details[key];
      const mobileCopy = document.createElement('span');
      mobileCopy.className = 'inspection-copy-mobile';
      mobileCopy.textContent = mobileText;
      element.replaceChildren(desktopCopy, mobileCopy);
    }
  });
  ctaTitle.textContent = `${inspection.title} 도입`;
  ctaLink.href = `./consultation.html?type=${type}`;
  content.style.setProperty('--inspection-tint', inspection.tint);
  setGeometry('zoom', layout.zoom);
  setGeometry('roi', layout.roi);
  setGeometry('mark', layout.mark);

  if (updateHistory && changed) {
    const url = new URL(window.location.href);
    url.searchParams.set('type', type);
    window.history.pushState({ inspection: type }, '', url);
  }
  if (announce && changed) status.textContent = `${inspection.title} 예시를 표시했습니다.`;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectInspection(tab.dataset.type, { updateHistory: true, announce: true }));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    selectInspection(nextTab.dataset.type, { updateHistory: true, announce: true });
    nextTab.focus();
  });
});

window.addEventListener('popstate', () => selectInspection(readType(), { announce: true }));
const detailViewport = document.querySelector('.inspection-photo-detail');
new ResizeObserver(([entry]) => {
  content.style.setProperty('--photo-scale', entry.contentRect.width / 628);
}).observe(detailViewport);
selectInspection(readType());
