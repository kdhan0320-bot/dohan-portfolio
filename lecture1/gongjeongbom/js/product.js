import "./common.js?v=20261108a";
import {
  familyDiagramMarkup,
  getProduct,
  modelDiagramMarkup,
  products,
  PRODUCT_TYPES,
  productHref,
} from "./data.js?v=20261108a";
import { setInquiryProducts, showToast, toggleCompare, updateCompareUi } from "./common.js?v=20261108a";

const detailRoot = document.querySelector("#product-detail");
const detailParams = new URLSearchParams(location.search);
const productId = detailParams.get("id");
const returnFilters = new URLSearchParams(detailParams.get("filters") || "").toString();
const listHref = "products.html" + (returnFilters ? "?" + returnFilters : "");

function alternativeMarkup(text) {
  return products.reduce((value, candidate) => value.replaceAll(candidate.model,
    `<a href="${productHref(candidate)}">${candidate.model}</a>`), text);
}
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
    <div class="card-actions"><a class="button button--primary" href="${productHref(candidate)}" aria-label="${candidate.model} 상세 보기">상세 보기</a><button class="button button--secondary" type="button" data-compare-id="${candidate.id}">비교 추가</button></div>
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
    <nav class="breadcrumb" aria-label="현재 위치"><div class="container"><a href="${listHref}">제품 목록</a><span aria-hidden="true">›</span><a href="products.html?type=${item.type}">${PRODUCT_TYPES[item.type]}</a><span aria-hidden="true">›</span><span aria-current="page" class="font-tech">${item.model}</span></div></nav>
    <section class="product-hero section" id="overview"><div class="container product-hero__grid">

      <div class="product-summary"><p class="product-type-pill">${PRODUCT_TYPES[item.type]}</p><h1 class="font-tech">${item.model}</h1><h2>${detail.title}</h2><p>${detail.summary}</p>
        <div class="chip-row">${item.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
        <div class="button-row"><button class="button button--secondary" type="button" data-compare-id="${item.id}">비교 추가</button><a class="button button--primary product-inquiry" href="inquiry.html?products=${item.id}">기술 문의</a></div>
        <p class="demo-note">가상 제품 사양이며 실제 장비 선정에 사용할 수 없습니다.</p>
      </div>
      <div class="product-visual">${productVisualMarkup(item)}<small>가상 제품 그래픽 · 실제 장비 외형 아님</small></div>
    </div></section>
    <nav class="anchor-nav" aria-label="제품 상세 목차"><div class="container"><a href="#fit">적합한 공정</a><a href="#specs">구성·사양</a><a href="#conditions">설치 조건</a><a href="#compare">다른 후보</a></div></nav>
    <section class="section section--muted product-fit" id="fit"><div class="container"><p class="eyebrow">제품 선택 도움</p><h2>이 공정에 맞을까요?</h2>
      <p class="section-intro">검사할 위치와 작업 범위가 맞는지 먼저 살펴보세요.</p>
      <div class="fit-grid"><article><h3>이 제품이 잘 맞는 경우</h3>${detail.fitConditions.map((condition) => `<p>• ${condition}</p>`).join("")}</article><article><h3>다른 제품이 나은 경우</h3>${detail.alternatives.map((alternative) => `<p>• ${alternativeMarkup(alternative)}</p>`).join("")}</article></div>
    </div></section>

    <section class="section section--muted product-specs" id="specs"><div class="container"><p class="eyebrow">주요 사양</p><h2>구성과 사양</h2><p class="section-intro">검사 위치, 결과 출력, 확장 가능 범위를 확인하세요.</p>
      <div class="spec-table" role="table" aria-label="${item.model} 주요 사양">
        <div role="row"><strong role="rowheader">제품 역할</strong><span role="cell">${detail.title}</span></div>
        <div role="row"><strong role="rowheader">카메라 구성</strong><span role="cell" class="font-tech">${item.camera}</span></div>
        <div role="row"><strong role="rowheader">검사 흐름</strong><span role="cell">${item.flow}</span></div>
        <div role="row"><strong role="rowheader">검사 데이터</strong><span role="cell">${item.resultData || "판정 결과 출력"}</span></div>
        <div role="row"><strong role="rowheader">설치 부담</strong><span role="cell">${item.complexity}</span></div>
        <div role="row"><strong role="rowheader">추가 가능 범위</strong><span role="cell">${item.expandability}</span></div>
      </div><div class="info-note"><strong>숫자와 조건은 실제 장비값이 아닙니다.</strong><p>실제 장비 선정 전에는 제조사 사양서와 기술 검토가 필요합니다.</p></div>
    </div></section>
    <section class="section product-conditions" id="conditions"><div class="container"><p class="eyebrow">설치 조건</p><h2>문의 전에 확인할 공정 조건</h2><p class="section-intro">정확히 모르는 항목은 비워 두고 현재 확인 가능한 범위만 정리하세요.</p><div class="support-grid"><div><strong>검사 대상</strong><span>크기·재질·변동 범위</span></div><div><strong>설치 조건</strong><span>거리·공간·조명</span></div><div><strong>공정 조건</strong><span>라인 속도·정지 여부</span></div><div><strong>연결 조건</strong><span>PLC · 이더넷 · 결과 데이터</span></div></div></div></section>
    <section class="section related-products" id="compare"><div class="container"><p class="eyebrow">관련 제품</p><h2>함께 비교할 다른 후보</h2><p class="section-intro">${detail.relatedDescription}</p><div class="related-grid related-grid--${siblings.length === 1 ? "one" : "two"}">${siblings.map(siblingCard).join("")}</div></div></section>
    <section class="cta-band" id="inquiry"><div class="container"><div><h2>${item.model}이 현재 공정에 맞는지 확인하세요.</h2><p>관심 제품을 담아 문의 내용을 정리합니다. 실제 업체에 전송되지 않습니다.</p></div><a class="button button--primary product-inquiry" href="inquiry.html?products=${item.id}">기술 문의하기</a></div></section>`;
}

if (product) renderProduct(product);
else renderNotFound();

document.addEventListener("click", (event) => {
  const compareButton = event.target.closest("[data-compare-id]");
  if (!compareButton) return;
  const candidate = getProduct(compareButton.dataset.compareId);
  if (!candidate) return;
  const result = toggleCompare(candidate);
  if (!result.ok) showToast(result.message);
  updateCompareUi();
});

document.querySelectorAll(".product-inquiry").forEach((link) => {
  link.addEventListener("click", () => setInquiryProducts([product.id]));
});

updateCompareUi();
