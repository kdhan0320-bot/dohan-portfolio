import { familyDiagramMarkup, getProducts, PRODUCT_TYPES } from "./data.js";

const COMPARE_KEY = "gongjeongbom-compare";
const INQUIRY_KEY = "gongjeongbom-inquiry-products";

function pageName() {
  return document.body.dataset.page || "";
}

function navLink(href, label, active = false) {
  return `<a href="${href}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
}

function headerTemplate() {
  const page = pageName();
  const productsActive = ["products", "product", "compare", "inquiry"].includes(page);
  return `
    <div class="site-header__inner">
      <a class="brand" href="index.html" aria-label="공정봄 홈">공정봄</a>
      <nav class="primary-nav" aria-label="주 메뉴">
        ${navLink("index.html#solutions", "솔루션")}
        ${navLink("products.html", "제품", productsActive)}
        ${navLink("index.html#cases", "적용 예시")}
        ${navLink("inquiry.html", "기술지원")}
        ${navLink("index.html#about", "기업 소개")}
      </nav>
      <div class="header-actions">
        <a class="button button--secondary compare-link" href="compare.html">비교 목록 <span class="compare-count" aria-label="선택 제품 수">0</span></a>
        <a class="button button--primary header-inquiry" href="inquiry.html">기술 문의</a>
        <button class="button button--primary menu-trigger" type="button" aria-haspopup="dialog" aria-controls="menu-dialog">메뉴</button>
      </div>
    </div>`;
}

function footerTemplate() {
  return `
    <div class="site-footer__inner">
      <div>
        <strong class="footer-brand">공정봄</strong>
        <p>제조 검사 시스템 선택을 돕는 가상의 B2B 포트폴리오 프로젝트입니다.</p>
      </div>
      <div class="footer-links">
        <div><strong>탐색</strong><a href="index.html#solutions">솔루션</a><a href="products.html">제품</a><a href="index.html#cases">적용 예시</a></div>
        <div><strong>지원</strong><a href="products.html">제품 선택 도움말</a><a href="inquiry.html">기술 문의</a></div>
        <div><strong>프로젝트</strong><a href="README.md">가상 기업</a><a href="README.md">데모 안내</a><a href="README.md#자산과-라이선스">자산 출처와 사용 조건</a></div>
      </div>
      <p class="footer-meta">가상 기업 · 데모 고지 · 자산 라이선스</p>
    </div>`;
}

function menuTemplate() {
  return `
    <dialog class="sheet-dialog menu-dialog" id="menu-dialog" aria-labelledby="menu-title">
      <div class="sheet-dialog__header">
        <a class="brand" href="index.html">공정봄</a>
        <button class="button button--secondary dialog-close" type="button">닫기</button>
      </div>
      <div class="sheet-dialog__body">
        <h2 id="menu-title">전체 메뉴</h2>
        <p>키보드 이동 순서가 화면의 정보 순서와 일치하도록 구성했습니다.</p>
        <nav class="mobile-nav" aria-label="전체 메뉴">
          <span>탐색</span>
          ${navLink("index.html#solutions", "솔루션 →")}
          ${navLink("products.html", "제품 →")}
          ${navLink("index.html#cases", "적용 예시 →")}
          <span>지원</span>
          ${navLink("inquiry.html", "기술지원 →")}
          ${navLink("products.html", "제품 선택 도움말 →")}
          <span>기업</span>
          ${navLink("index.html#about", "기업 소개 →")}
          ${navLink("README.md", "프로젝트 고지 →")}
        </nav>
        <div class="sheet-actions">
          <a class="button button--secondary" href="compare.html">비교 목록 보기</a>
          <a class="button button--primary" href="inquiry.html">기술 문의</a>
        </div>
        <p class="dialog-hint">Esc 키로 닫으면 키보드 초점이 메뉴 버튼으로 돌아갑니다.</p>
      </div>
      <div class="dialog-footer"><strong>공정봄</strong><p>가상 기업 · 데모 고지 · 자산 라이선스</p></div>
    </dialog>`;
}

export function getCompareIds() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(COMPARE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function saveCompareIds(ids) {
  sessionStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  document.dispatchEvent(new CustomEvent("comparechange", { detail: ids }));
}

export function toggleCompare(product) {
  const current = getProducts(getCompareIds());
  const exists = current.some((candidate) => candidate.id === product.id);

  if (exists) {
    saveCompareIds(current.filter((candidate) => candidate.id !== product.id).map(({ id }) => id));
    announce(`${product.model}을 비교 목록에서 제거했습니다.`);
    return { ok: true, selected: false };
  }

  if (current.length && current[0].type !== product.type) {
    const message = `같은 종류의 제품만 비교할 수 있습니다. 현재 ${PRODUCT_TYPES[current[0].type]} 제품이 선택되어 있습니다.`;
    announce(message);
    return { ok: false, message };
  }

  if (current.length >= 3) {
    const message = "비교 제품은 최대 3개까지 선택할 수 있습니다.";
    announce(message);
    return { ok: false, message };
  }

  saveCompareIds([...current.map(({ id }) => id), product.id]);
  announce(`${product.model}을 비교 목록에 추가했습니다.`);
  return { ok: true, selected: true };
}

export function clearCompare() {
  saveCompareIds([]);
  announce("비교 목록을 모두 비웠습니다.");
}

export function setInquiryProducts(ids) {
  sessionStorage.setItem(INQUIRY_KEY, JSON.stringify(ids));
}

export function getInquiryProducts() {
  try {
    const value = JSON.parse(sessionStorage.getItem(INQUIRY_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function announce(message) {
  const region = document.querySelector("#live-region");
  if (!region) return;
  region.textContent = "";
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

export function updateCompareUi() {
  const selected = getProducts(getCompareIds());
  document.querySelectorAll(".compare-count").forEach((node) => {
    node.textContent = String(selected.length);
  });
  document.querySelectorAll("[data-compare-id]").forEach((button) => {
    const active = selected.some((product) => product.id === button.dataset.compareId);
    button.textContent = active ? "비교 제거" : "비교 추가";
    button.setAttribute("aria-pressed", String(active));
  });
}

function setupDialog(trigger, dialog) {
  if (!trigger || !dialog) return;
  const close = dialog.querySelector(".dialog-close");
  let opener = trigger;

  trigger.addEventListener("click", () => {
    opener = document.activeElement;
    dialog.showModal();
    close?.focus();
  });
  close?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => opener?.focus());
}

function initCommon() {
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");
  if (header) header.innerHTML = headerTemplate();
  if (footer) footer.innerHTML = footerTemplate();
  document.body.insertAdjacentHTML("beforeend", menuTemplate());
  document.body.insertAdjacentHTML(
    "beforeend",
    '<p class="sr-only" id="live-region" aria-live="polite" aria-atomic="true"></p>',
  );
  setupDialog(document.querySelector(".menu-trigger"), document.querySelector("#menu-dialog"));
  document.querySelectorAll("[data-family-diagram]").forEach((diagram) => {
    diagram.innerHTML = familyDiagramMarkup(diagram.dataset.familyDiagram);
  });
  updateCompareUi();
  document.addEventListener("comparechange", updateCompareUi);
}

initCommon();
