import { updateContextLinks } from "./navigation.js?v=20261108b";
import { familyDiagramMarkup, getProducts, PRODUCT_TYPES } from "./data.js?v=20261108b";

const COMPARE_KEY = "gongjeongbom-compare";
const INQUIRY_KEY = "gongjeongbom-inquiry-products";

function pageName() { return document.body.dataset.page || ""; }
function navLink(href, label, active = false) {
  return `<a href="${href}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
}
const brandMarkup = '<span class="brand-mark" aria-hidden="true"></span>공정봄';

function headerTemplate() {
  const page = pageName();
  return `<div class="site-header__inner">
    <a class="brand" href="index.html" aria-label="공정봄 홈">${brandMarkup}</a>
    <nav class="primary-nav" aria-label="주 메뉴">
      ${navLink("index.html#solutions", "문제로 찾기")}
      ${navLink("products.html", "제품 찾기", ["products", "product"].includes(page))}
      ${navLink("index.html#guide", "선택 가이드")}
    </nav>
    <div class="header-actions">
      <a class="button button--secondary compare-link" href="compare.html"${page === "compare" ? ' aria-current="page"' : ""}>비교 목록 <span class="compare-count" aria-label="선택 제품 수">0</span></a>
      <a class="button button--primary header-inquiry" href="inquiry.html"${page === "inquiry" ? ' aria-current="page"' : ""}>기술 문의 ↗</a>
      <button class="button button--secondary menu-trigger" type="button" aria-haspopup="dialog" aria-controls="menu-dialog">메뉴</button>
    </div>
  </div>`;
}
function footerTemplate() {
  return `<div class="site-footer__inner">
    <div class="footer-top"><div><a class="footer-brand" href="index.html">공정봄</a><p>공정의 작은 이상에서, 알맞은 검사 선택으로.</p></div>
      <nav class="footer-links" aria-label="하단 메뉴"><a href="products.html">제품 찾기</a><a href="index.html#guide">선택 가이드</a><a href="inquiry.html">기술 문의</a><a href="notice.html">작품 안내·출처</a></nav>
    </div>
    <div class="footer-meta"><span>가상 제품으로 만든 인터랙션 실험작 · 실제 장비 선정 및 문의 접수 서비스가 아닙니다.</span><span class="font-tech">GONGJEONGBOM / INSPECTION FINDER</span></div>
  </div>`;
}
function menuTemplate() {
  const page = pageName();
  return `<dialog class="sheet-dialog menu-dialog" id="menu-dialog" aria-labelledby="menu-title">
    <div class="sheet-dialog__header"><a class="brand" href="index.html">${brandMarkup}</a><button class="button button--secondary dialog-close" type="button">닫기</button></div>
    <div class="sheet-dialog__body"><h2 id="menu-title">어디서 시작할까요?</h2><p>문제를 찾고, 제품을 비교하고, 문의를 정리하세요.</p>
      <nav class="mobile-nav" aria-label="전체 메뉴">
        ${navLink("index.html#solutions", "문제로 찾기 ↗")}
        ${navLink("products.html", "제품 찾기 ↗", ["products", "product"].includes(page))}
        ${navLink("index.html#guide", "선택 가이드 ↗")}
        ${navLink("compare.html", "비교 목록 ↗", page === "compare")}
        ${navLink("inquiry.html", "기술 문의 ↗", page === "inquiry")}
        ${navLink("notice.html", "작품 안내·출처 ↗", page === "notice")}
      </nav>
    </div><div class="dialog-footer">가상 제품을 사용하는 데모입니다.<br>입력한 문의는 실제 업체에 전송되지 않습니다.</div>
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
  try { sessionStorage.setItem(COMPARE_KEY, JSON.stringify(ids)); }
  catch { showToast("비교 목록을 보관할 수 없습니다. 브라우저의 저장 설정을 확인해 주세요."); return false; }
  document.dispatchEvent(new CustomEvent("comparechange", { detail: ids }));
  return true;
}

export function toggleCompare(product) {
  if (!product) {
    const message = "제품 정보를 찾을 수 없습니다.";
    announce(message);
    return { ok: false, message };
  }
  const current = getProducts(getCompareIds());
  const exists = current.some((candidate) => candidate.id === product.id);

  if (exists) {
    if (!saveCompareIds(current.filter((candidate) => candidate.id !== product.id).map(({ id }) => id))) return { ok: false, message: "비교 목록을 변경하지 못했습니다." };
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

  if (!saveCompareIds([...current.map(({ id }) => id), product.id])) return { ok: false, message: "비교 목록을 변경하지 못했습니다." };
  announce(`${product.model}을 비교 목록에 추가했습니다.`);
  return { ok: true, selected: true };
}

export function clearCompare() {
  if (!saveCompareIds([])) return false;
  announce("비교 목록을 모두 비웠습니다.");
  return true;
}

export function setInquiryProducts(ids) {
  try { sessionStorage.setItem(INQUIRY_KEY, JSON.stringify(ids)); } catch { /* Explicit product URLs still work without storage. */ }
}

export function hasInquiryProducts() {
  try { return sessionStorage.getItem(INQUIRY_KEY) !== null; } catch { return false; }
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

let toastTimer = null;

export function showToast(message, variant = "warning") {
  const root = document.querySelector("#toast-root");
  if (!root) return;
  root.innerHTML = `<p class="toast toast--${variant}">${message}</p>`;
  root.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    root.classList.remove("is-visible");
  }, 4000);
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
    if (event.target === dialog || event.target.closest("a")) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    dialog.close();
  });
  dialog.addEventListener("close", () => opener?.focus());
}

function setupSkipLink() {
  const main = document.querySelector("main");
  if (!main) return;
  if (!main.id) main.id = "main-content";
  main.classList.add("main-content-target");
  main.setAttribute("tabindex", "-1");
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<a class="skip-link" href="#${main.id}">본문으로 바로가기</a>`,
  );
}

function initCommon() {
  setupSkipLink();
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");
  if (header) header.innerHTML = headerTemplate();
  if (footer) footer.innerHTML = footerTemplate();
  document.body.insertAdjacentHTML("beforeend", menuTemplate());
  document.body.insertAdjacentHTML(
    "beforeend",
    '<p class="sr-only" id="live-region" aria-live="polite" aria-atomic="true"></p>',
  );
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div class="toast-root" id="toast-root" role="status" aria-live="polite"></div>',
  );
  setupDialog(document.querySelector(".menu-trigger"), document.querySelector("#menu-dialog"));
  document.querySelectorAll("[data-family-diagram]").forEach((diagram) => {
    diagram.innerHTML = familyDiagramMarkup(diagram.dataset.familyDiagram);
  });
  const stage = { products: 1, product: 1, compare: 2, inquiry: 3 }[pageName()];
  if (stage) {
    const labels = [["products.html", "문제·제품 찾기"], ["compare.html", "후보 비교"], ["inquiry.html", "공정 정리"]];
    header?.insertAdjacentHTML("afterend", `<nav class="review-route" aria-label="제품 검토 순서"><div class="container"><span class="review-route__label">나의 검토 순서</span><ol>${labels.map(([href, label], index) => `<li><a href="${href}"${stage === index + 1 ? ' aria-current="step"' : ""}><span class="font-tech">0${index + 1}</span>${label}</a></li>`).join("")}</ol></div></nav>`);
  }
  updateContextLinks();
  updateCompareUi();
  document.addEventListener("comparechange", updateCompareUi);
}

initCommon();
