import "./common.js";
import { getProduct, products, PRODUCT_TYPES, productHref } from "./data.js";
import { setInquiryProducts, toggleCompare, updateCompareUi } from "./common.js";

const product = getProduct(new URLSearchParams(location.search).get("id"));
const detail = document.querySelector("#product-detail");
const siblings = products.filter((candidate) => candidate.type === product.type);
document.title = `${product.model} 제품 상세 — 공정봄`;

const detailCopy = {
  "mv-x300": {
    title: "한 곳을 정밀하게 검사하는 기본 확장형 비전 시스템",
    summary: "한 검사 위치에서 정밀한 외관·위치 검사를 구성할 때 적합합니다.",
  },
  "mv-x500": {
    title: "여러 검사 위치를 연결하는 중급 비전 시스템",
    summary: "두 검사 위치를 함께 확인하거나 한 공정에서 여러 검사 항목을 처리해야 할 때 적합합니다. 먼저 검사 위치와 공정 흐름을 확인하세요.",
  },
  "mv-x700": {
    title: "여러 위치와 복잡한 검사 흐름을 처리하는 상위 비전 시스템",
    summary: "여러 면과 여러 공정의 검사 흐름을 연결하고 이후 확장까지 고려할 때 적합합니다.",
  },
}[product.id] || { title: product.name, summary: product.summary };

const heroChips = product.id === "mv-x500"
  ? ["카메라 최대 2대", "복수 검사", "검사 데이터 출력"]
  : product.chips;

function siblingCard(candidate) {
  const titles = {
    "mv-x300": "한 곳을 정밀하게 검사하는 기본 확장형 시스템",
    "mv-x500": "두 검사 위치를 연결하는 중급 시스템",
    "mv-x700": "여러 위치와 복잡한 검사 흐름을 처리하는 상위 시스템",
  };
  return `<article class="related-product-card">
    <span class="product-type-pill">${PRODUCT_TYPES[candidate.type]}</span>
    <h3 class="font-tech">${candidate.model}</h3>
    <p class="related-product-card__title">${titles[candidate.id] || candidate.name}</p>
    <p>잘 맞는 경우: ${candidate.fit}</p>
    <div class="chip-row">${candidate.chips.slice(0, 2).map((chip) => `<span>${chip}</span>`).join("")}</div>
    <div class="card-actions"><a class="button button--primary" href="${productHref(candidate)}">상세 보기</a><button class="button button--secondary" type="button" data-compare-id="${candidate.id}">비교 추가</button></div>
  </article>`;
}

detail.innerHTML = `
  <nav class="breadcrumb" aria-label="현재 위치"><div class="container"><a href="products.html">제품</a><span aria-hidden="true">›</span><a href="products.html?type=${product.type}">${PRODUCT_TYPES[product.type]}</a><span aria-hidden="true">›</span><span aria-current="page" class="font-tech">${product.model}</span></div></nav>
  <section class="product-hero section"><div class="container product-hero__grid">
    <div class="product-visual"><img src="assets/graphics/vision-system.svg" alt="${product.model} 가상 비전 시스템 도식"><small>가상 제품 그래픽 · 실제 장비 외형 아님</small></div>
    <div class="product-summary"><p class="product-type-pill">${PRODUCT_TYPES[product.type]}</p><h1 class="font-tech">${product.model}</h1><h2>${detailCopy.title}</h2><p>${detailCopy.summary}</p>
      <div class="chip-row">${heroChips.map((chip) => `<span>${chip}</span>`).join("")}</div>
      <div class="button-row"><button class="button button--secondary" type="button" data-compare-id="${product.id}">비교 추가</button><a class="button button--primary product-inquiry" href="inquiry.html?products=${product.id}">기술 문의</a></div>
      <p class="demo-note">가상 제품 사양이며 실제 장비 선정에 사용할 수 없습니다.</p>
    </div>
  </div></section>
  <section class="section section--muted product-fit"><div class="container"><p class="eyebrow">제품 선택 도움</p><h2>이 제품이 잘 맞는 경우와 다른 선택이 더 적합한 경우</h2>
    <p class="section-intro">카메라 수만 비교하지 않고 검사 위치와 공정 흐름을 함께 확인합니다.</p>
    <div class="fit-grid"><article><h3>이 제품이 잘 맞는 경우</h3><p>• 두 검사 위치를 함께 확인해야 함</p><p>• 단일 센서보다 정밀한 외관·위치 검사가 필요함</p><p>• 검사 결과를 설비나 시스템으로 보내야 함</p></article><article><h3>다른 제품이 나은 경우</h3><p>• 한 곳에서 단순 누락만 확인 → MV-S 계열</p><p>• 3대 이상 카메라 또는 다면 검사 → MV-X700</p><p>• 코드 판독이 중심 → MR-C 계열</p></article></div>
  </div></section>
  <nav class="anchor-nav" aria-label="제품 상세 목차"><div class="container"><a href="#overview">개요</a><a href="#role">적용 작업</a><a href="#specs">주요 사양</a><a href="#conditions">설치 조건</a><a href="#compare">관련 제품</a><a href="#inquiry">문의</a></div></nav>
  <section class="section product-role" id="role"><div class="container"><p class="eyebrow">적용 작업</p><h2>이 제품이 맡는 역할</h2><p class="section-intro">검사 입력부터 판정 처리, 결과 연결까지 한 흐름으로 구성합니다.</p>
    <div class="type-grid"><div class="info-card"><strong>검사 입력</strong><small>최대 2대 카메라의 이미지를 받아 검사 흐름을 구성합니다.</small></div><div class="info-card"><strong>판정 처리</strong><small>여러 검사 항목을 순서에 맞춰 처리하고 결과를 정리합니다.</small></div><div class="info-card"><strong>결과 연결</strong><small>판정 결과와 검사 데이터를 설비나 상위 시스템으로 전달합니다.</small></div></div>
  </div></section>
  <section class="section section--muted product-specs" id="specs"><div class="container"><p class="eyebrow">주요 사양</p><h2>제품을 고를 때 먼저 볼 사양</h2><p class="section-intro">실제 수치보다 구성 범위와 설치 부담을 먼저 비교합니다.</p>
    <div class="spec-table" role="table" aria-label="${product.model} 주요 사양">
      <div role="row"><strong role="rowheader">제품 역할</strong><span role="cell">${detailCopy.title}</span></div>
      <div role="row"><strong role="rowheader">카메라 구성</strong><span role="cell" class="font-tech">${product.camera}</span></div>
      <div role="row"><strong role="rowheader">검사 흐름</strong><span role="cell">${product.flow}</span></div>
      <div role="row"><strong role="rowheader">검사 데이터</strong><span role="cell">${product.resultData || "판정 결과 출력"}</span></div>
      <div role="row"><strong role="rowheader">설치 부담</strong><span role="cell">${product.complexity}</span></div>
      <div role="row"><strong role="rowheader">추가 가능 범위</strong><span role="cell">${product.expandability}</span></div>
    </div><div class="info-note"><strong>숫자와 조건은 실제 장비값이 아닙니다.</strong><p>실제 장비 선정 전에는 제조사 사양서와 기술 검토가 필요합니다.</p></div>
  </div></section>
  <section class="section product-conditions" id="conditions"><div class="container"><p class="eyebrow">설치 조건</p><h2>문의 전에 확인할 공정 조건</h2><p class="section-intro">정확히 모르는 항목은 비워 두고 현재 확인 가능한 범위만 정리하세요.</p><div class="support-grid"><div><strong>검사 대상</strong><span>크기·재질·변동 범위</span></div><div><strong>설치 조건</strong><span>거리·공간·조명</span></div><div><strong>공정 조건</strong><span>라인 속도·정지 여부</span></div><div><strong>연결 조건</strong><span class="font-tech">PLC · Ethernet · 데이터</span></div></div></div></section>
  <section class="section related-products" id="compare"><div class="container"><p class="eyebrow">관련 제품</p><h2>같은 종류의 제품끼리만 사양을 비교합니다.</h2><p class="section-intro">검사 위치와 확장 범위가 다른 비전 시스템을 함께 확인하세요.</p><div class="related-grid">${siblings.map(siblingCard).join("")}</div></div></section>
  <section class="cta-band" id="inquiry"><div class="container"><div><h2>${product.model}이 현재 공정에 맞는지 확인하세요.</h2><p>관심 제품과 공정 조건을 기술 문의로 전달합니다.</p></div><a class="button button--primary product-inquiry" href="inquiry.html?products=${product.id}">기술 문의하기</a></div></section>`;

document.addEventListener("click", (event) => {
  const compareButton = event.target.closest("[data-compare-id]");
  if (!compareButton) return;
  const candidate = getProduct(compareButton.dataset.compareId);
  const result = toggleCompare(candidate);
  if (!result.ok) alert(result.message);
  updateCompareUi();
});

document.querySelectorAll(".product-inquiry").forEach((link) => {
  link.addEventListener("click", () => setInquiryProducts([product.id]));
});

updateCompareUi();
