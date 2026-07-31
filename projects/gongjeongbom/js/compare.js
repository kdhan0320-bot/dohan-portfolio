import "./common.js";
import { getProducts, modelDiagramMarkup, PRODUCT_TYPES } from "./data.js";
import { clearCompare, getCompareIds, setInquiryProducts, toggleCompare } from "./common.js";

const page = document.querySelector("#compare-page");
let selected = getProducts(getCompareIds());
let differencesOnly = false;

if (selected.length < 2) selected = getProducts(["mv-x300", "mv-x500", "mv-x700"]);

const problemLabels = { assembly: "누락·오조립", surface: "외관 결함", dimension: "치수·위치", code: "코드·문자" };
const rows = [
  ["적합한 문제", (product) => product.problems.map((value) => problemLabels[value]).join(" · ")],
  ["카메라 구성", (product) => product.camera],
  ["검사 흐름", (product) => product.flow],
  ["결과 데이터", (product) => product.resultData || "판정 결과"],
  ["설치 부담", (product) => product.complexity],
  ["나중에 추가할 수 있는 범위", (product) => product.expandability],
  ["더 적합한 경우", (product) => ({ "mv-x300": "구성이 단순할 때", "mv-x500": "균형이 필요할 때", "mv-x700": "복잡한 확장이 필요할 때" })[product.id] || product.fit],
];

const selectedTitles = {
  "mv-x300": ["한 곳을 정밀하게 검사하는 기본 확장형 시스템", "단순한 구성"],
  "mv-x500": ["두 검사 위치를 연결하는 중급 시스템", "균형이 필요한 공정"],
  "mv-x700": ["여러 위치와 복잡한 검사 흐름을 처리하는 상위 시스템", "확장이 필요한 공정"],
};

function visibleRows() {
  return differencesOnly
    ? rows.filter(([, value]) => new Set(selected.map(value)).size > 1)
    : rows;
}

function renderDesktopTable() {
  return `<div class="compare-table" role="table" aria-label="제품 세부 비교">
    <div class="compare-table__row compare-table__head" role="row"><strong role="columnheader">비교 항목</strong>${selected.map(({ model }) => `<strong role="columnheader" class="font-tech">${model}</strong>`).join("")}</div>
    ${visibleRows().map(([label, value]) => `<div class="compare-table__row" role="row"><strong role="rowheader">${label}</strong>${selected.map((product) => `<span role="cell">${value(product)}</span>`).join("")}</div>`).join("")}
  </div>`;
}

function renderMobileCards() {
  return visibleRows().map(([label, value]) => `<section class="compare-mobile-card"><h3>${label}</h3>${selected.map((product) => `<p><strong class="font-tech">${product.model}</strong> ${value(product)}</p>`).join("")}</section>`).join("");
}

function render() {
  const type = selected[0]?.type;
  const enough = selected.length >= 2;
  page.innerHTML = `
    <section class="page-hero compare-hero"><div class="container"><p class="eyebrow">제품 비교</p><h1><span class="desktop-only">${enough ? "같은 종류의 제품 차이를 한눈에 확인하세요." : "비교할 제품을 선택해 주세요."}</span><span class="mobile-only">${type ? PRODUCT_TYPES[type] : "제품"} 비교</span></h1><p class="lead">${enough ? "카메라 수보다 어떤 공정에 맞는지, 설치 부담과 추가 가능한 범위를 먼저 확인합니다." : "같은 종류의 제품을 2~3개 선택하면 비교할 수 있습니다."}</p>
      <div class="button-row"><span class="product-type-pill">${type ? PRODUCT_TYPES[type] : "제품"}</span><button class="button button--secondary difference-toggle" type="button" aria-pressed="${differencesOnly}">차이만 보기</button><button class="button button--secondary clear-compare" type="button">모두 지우기</button></div>
    </div></section>
    ${enough ? `
      <section class="section section--muted selected-products-section"><div class="container"><h2>선택한 제품 ${selected.length}개</h2><div class="selected-card-row">${selected.map((product) => {
        const [title, summary] = selectedTitles[product.id] || [product.name, product.fit];
        return `<article><div class="selected-card__top"><strong class="font-tech">${product.model}</strong>${modelDiagramMarkup(product.model)}</div><span>${title}</span><small>${summary}</small><button class="text-button remove-compare" data-remove-compare="${product.id}" type="button">비교에서 제거</button></article>`;
      }).join("")}</div></div></section>
      <section class="section compare-differences"><div class="container"><h2>먼저 읽는 핵심 차이</h2><p class="section-intro">높은 숫자보다 공정에 더 맞는 구성을 먼저 확인합니다.</p><div class="difference-grid">
        <article><span>단순 설치</span><strong>가장 단순한 구성</strong><small>MV-X300 · 한 위치 중심 · 기본 확장</small></article>
        <article><span>균형형</span><strong>두 검사 위치 연결</strong><small>MV-X500 · 두 위치 연계 · 추가 가능</small></article>
        <article><span>복합 검사</span><strong>여러 면과 여러 공정</strong><small>MV-X700 · 최대 4대 · 넓은 추가 범위</small></article>
        <article><span>선택 기준</span><strong>먼저 확인할 기준</strong><small>카메라 수보다 검사 위치·데이터 사용·향후 추가 요구를 먼저 확인</small></article>
      </div></div></section>
      <section class="section section--muted compare-details"><div class="container"><h2>세부 비교</h2><p class="section-intro">같은 종류의 제품별 직접 비교입니다.</p>${renderDesktopTable()}<div class="compare-mobile-list">${renderMobileCards()}</div><div class="info-note"><strong>숫자가 높다고 항상 더 적합하지 않습니다.</strong><p>검사 위치와 공정 흐름, 설치 복잡도를 먼저 확인하세요.</p></div></div></section>
      <section class="section compare-help"><div class="container"><div><h2>비전 센서와 코드 판독기는 직접 사양 비교하지 않습니다.</h2><p>구성 방식과 사용 목적이 다르므로 제품 종류 선택 도움말에서 먼저 확인합니다.</p></div><a class="button button--secondary" href="products.html">제품 선택 도움말</a></div></section>
      <section class="cta-band"><div class="container"><div><h2>선택한 세 모델과 공정 조건을 함께 문의하세요.</h2><p>비교 목록을 기술 문의로 전달합니다.</p></div><a class="button button--primary compare-inquiry" href="inquiry.html?products=${selected.map(({ id }) => id).join(",")}">기술 문의하기</a></div></section>
      <section class="disclosure"><div class="container"><strong>가상 제품과 사양</strong><span>제품명과 사양은 화면 설계를 위한 가상 정보이며 실제 장비 선정에 사용할 수 없습니다.</span></div></section>`
      : '<section class="section"><div class="container empty-state"><h2>선택된 제품이 부족합니다.</h2><p>같은 종류의 제품을 최소 2개 선택해 주세요.</p><a class="button button--primary" href="products.html">제품 찾기</a></div></section>'}`;
}

document.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove-compare]");
  if (remove) {
    toggleCompare(selected.find(({ id }) => id === remove.dataset.removeCompare));
    selected = selected.filter(({ id }) => id !== remove.dataset.removeCompare);
    render();
    return;
  }
  if (event.target.closest(".difference-toggle")) {
    differencesOnly = !differencesOnly;
    render();
    return;
  }
  if (event.target.closest(".clear-compare")) {
    clearCompare();
    selected = [];
    render();
    return;
  }
  if (event.target.closest(".compare-inquiry")) setInquiryProducts(selected.map(({ id }) => id));
});

render();
