import "./common.js";
import {
  familyDiagramMarkup,
  getProduct,
  modelDiagramMarkup,
  products,
  PRODUCT_TYPES,
  productHref,
} from "./data.js";
import { setInquiryProducts, toggleCompare, updateCompareUi } from "./common.js";

const detailRoot = document.querySelector("#product-detail");
const productId = new URLSearchParams(location.search).get("id");
const product = getProduct(productId);

function productVisualMarkup(item) {
  const { visual } = item.detail;
  if (visual.kind === "asset") {
    return `<img src="${visual.src}" alt="${visual.description}">`;
  }

  const diagram = visual.kind === "model"
    ? modelDiagramMarkup(item.model)
    : familyDiagramMarkup(item.type);
  return `<div class="product-visual__diagram" role="img" aria-label="${visual.description}">${diagram}</div>`;
}

function siblingCard(candidate) {
  return `<article class="related-product-card">
    <span class="product-type-pill">${PRODUCT_TYPES[candidate.type]}</span>
    <h3 class="font-tech">${candidate.model}</h3>
    <p class="related-product-card__title">${candidate.detail.title}</p>
    <p>잘 맞는 경우: ${candidate.fit}</p>
    <div class="chip-row">${candidate.chips.slice(0, 2).map((chip) => `<span>${chip}</span>`).join("")}</div>
    <div class="card-actions"><a class="button button--primary" href="${productHref(candidate)}">상세 보기</a><button class="button button--secondary" type="button" data-compare-id="${candidate.id}">비교 추가</button></div>
  </article>`;
}

function renderNotFound() {
  document.title = "제품을 찾을 수 없음 — 공정봄";
  detailRoot.innerHTML = `<section class="section"><div class="container empty-state">
    <p class="eyebrow">제품 상세</p>
    <h1>제품을 찾을 수 없습니다.</h1>
    <p>주소의 제품 ID를 확인하거나 제품 목록에서 다시 선택해 주세요.</p>
    <a class="button button--primary" href="products.html">제품 목록으로</a>
  </div></section>`;
}

function renderProduct(item) {
  const { detail } = item;
  const siblings = products.filter(
    (candidate) => candidate.type === item.type && candidate.id !== item.id,
  );
  document.title = `${item.model} 제품 상세 — 공정봄`;
  detailRoot.innerHTML = `
    <nav class="breadcrumb" aria-label="현재 위치"><div class="container"><a href="products.html">제품</a><span aria-hidden="true">›</span><a href="products.html?type=${item.type}">${PRODUCT_TYPES[item.type]}</a><span aria-hidden="true">›</span><span aria-current="page" class="font-tech">${item.model}</span></div></nav>
    <section class="product-hero section" id="overview"><div class="container product-hero__grid">
      <div class="product-visual">${productVisualMarkup(item)}<small>가상 제품 그래픽 · 실제 장비 외형 아님</small></div>
      <div class="product-summary"><p class="product-type-pill">${PRODUCT_TYPES[item.type]}</p><h1 class="font-tech">${item.model}</h1><h2>${detail.title}</h2><p>${detail.summary}</p>
        <div class="chip-row">${item.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
        <div class="button-row"><button class="button button--secondary" type="button" data-compare-id="${item.id}">비교 추가</button><a class="button button--primary product-inquiry" href="inquiry.html?products=${item.id}">기술 문의</a></div>
        <p class="demo-note">가상 제품 사양이며 실제 장비 선정에 사용할 수 없습니다.</p>
      </div>
    </div></section>
    <section class="section section--muted product-fit"><div class="container"><p class="eyebrow">제품 선택 도움</p><h2>이 제품이 잘 맞는 경우와 다른 선택이 더 적합한 경우</h2>
      <p class="section-intro">카메라 수만 비교하지 않고 검사 위치와 공정 흐름을 함께 확인합니다.</p>
      <div class="fit-grid"><article><h3>이 제품이 잘 맞는 경우</h3>${detail.fitConditions.map((condition) => `<p>• ${condition}</p>`).join("")}</article><article><h3>다른 제품이 나은 경우</h3>${detail.alternatives.map((alternative) => `<p>• ${alternative}</p>`).join("")}</article></div>
    </div></section>
    <nav class="anchor-nav" aria-label="제품 상세 목차"><div class="container"><a href="#overview">개요</a><a href="#role">적용 작업</a><a href="#specs">주요 사양</a><a href="#conditions">설치 조건</a><a href="#compare">관련 제품</a><a href="#inquiry">문의</a></div></nav>
    <section class="section product-role" id="role"><div class="container"><p class="eyebrow">적용 작업</p><h2>이 제품이 맡는 역할</h2><p class="section-intro">검사 입력부터 판정 처리, 결과 연결까지 제품 범위에 맞춰 구성합니다.</p>
      <div class="type-grid">${detail.roles.map((role) => `<div class="info-card"><strong>${role.title}</strong><small>${role.description}</small></div>`).join("")}</div>
    </div></section>
    <section class="section section--muted product-specs" id="specs"><div class="container"><p class="eyebrow">주요 사양</p><h2>제품을 고를 때 먼저 볼 사양</h2><p class="section-intro">실제 수치보다 구성 범위와 설치 부담을 먼저 비교합니다.</p>
      <div class="spec-table" role="table" aria-label="${item.model} 주요 사양">
        <div role="row"><strong role="rowheader">제품 역할</strong><span role="cell">${detail.title}</span></div>
        <div role="row"><strong role="rowheader">카메라 구성</strong><span role="cell" class="font-tech">${item.camera}</span></div>
        <div role="row"><strong role="rowheader">검사 흐름</strong><span role="cell">${item.flow}</span></div>
        <div role="row"><strong role="rowheader">검사 데이터</strong><span role="cell">${item.resultData || "판정 결과 출력"}</span></div>
        <div role="row"><strong role="rowheader">설치 부담</strong><span role="cell">${item.complexity}</span></div>
        <div role="row"><strong role="rowheader">추가 가능 범위</strong><span role="cell">${item.expandability}</span></div>
      </div><div class="info-note"><strong>숫자와 조건은 실제 장비값이 아닙니다.</strong><p>실제 장비 선정 전에는 제조사 사양서와 기술 검토가 필요합니다.</p></div>
    </div></section>
    <section class="section product-conditions" id="conditions"><div class="container"><p class="eyebrow">설치 조건</p><h2>문의 전에 확인할 공정 조건</h2><p class="section-intro">정확히 모르는 항목은 비워 두고 현재 확인 가능한 범위만 정리하세요.</p><div class="support-grid"><div><strong>검사 대상</strong><span>크기·재질·변동 범위</span></div><div><strong>설치 조건</strong><span>거리·공간·조명</span></div><div><strong>공정 조건</strong><span>라인 속도·정지 여부</span></div><div><strong>연결 조건</strong><span class="font-tech">PLC · Ethernet · 데이터</span></div></div></div></section>
    <section class="section related-products" id="compare"><div class="container"><p class="eyebrow">관련 제품</p><h2>같은 종류의 제품끼리만 사양을 비교합니다.</h2><p class="section-intro">${detail.relatedDescription}</p><div class="related-grid related-grid--${siblings.length === 1 ? "one" : "two"}">${siblings.map(siblingCard).join("")}</div></div></section>
    <section class="cta-band" id="inquiry"><div class="container"><div><h2>${item.model}이 현재 공정에 맞는지 확인하세요.</h2><p>관심 제품과 공정 조건을 기술 문의로 전달합니다.</p></div><a class="button button--primary product-inquiry" href="inquiry.html?products=${item.id}">기술 문의하기</a></div></section>`;
}

if (product) renderProduct(product);
else renderNotFound();

document.addEventListener("click", (event) => {
  const compareButton = event.target.closest("[data-compare-id]");
  if (!compareButton) return;
  const candidate = getProduct(compareButton.dataset.compareId);
  if (!candidate) return;
  const result = toggleCompare(candidate);
  if (!result.ok) alert(result.message);
  updateCompareUi();
});

document.querySelectorAll(".product-inquiry").forEach((link) => {
  link.addEventListener("click", () => setInquiryProducts([product.id]));
});

updateCompareUi();
