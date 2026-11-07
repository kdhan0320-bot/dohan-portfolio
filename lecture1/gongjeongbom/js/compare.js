import { updateContextLinks } from "./navigation.js?v=20261108b";
import "./common.js?v=20261108b";
import { getProducts, PRODUCT_TYPES } from "./data.js?v=20261108b";
import { clearCompare, getCompareIds, setInquiryProducts, toggleCompare } from "./common.js?v=20261108b";

const page = document.querySelector("#compare-page");
let selected = getProducts(getCompareIds());
let differencesOnly = false;
const problemLabels = { assembly: "누락·오조립", surface: "외관 결함", dimension: "치수·위치", code: "코드·문자" };
const rows = [
  ["잘 맞는 공정", (product) => product.fit],
  ["해결하는 문제", (product) => product.problems.map((value) => problemLabels[value]).join(" · ")],
  ["카메라 구성", (product) => product.camera],
  ["검사 위치", (product) => product.flow],
  ["결과 데이터", (product) => product.resultData || "판정 결과 출력"],
  ["설치 부담", (product) => product.complexity],
  ["확장 범위", (product) => product.expandability],
];
const isDifferent = (value) => new Set(selected.map(value)).size > 1;
const visibleRows = () => differencesOnly ? rows.filter(([, value]) => isDifferent(value)) : rows;

function tableMarkup() {
  return `<table class="compare-table"><caption class="sr-only">선택 제품의 구성과 적용 조건 비교</caption>
    <thead><tr><th scope="col">비교 항목</th>${selected.map((product) => `<th scope="col" class="font-tech">${product.model}</th>`).join("")}</tr></thead>
    <tbody>${visibleRows().map(([label, value]) => `<tr class="${isDifferent(value) ? "is-different" : ""}"><th scope="row">${label}</th>${selected.map((product) => `<td>${value(product)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table>`;
}
function mobileMarkup() {
  return `<div class="compare-mobile-list">${visibleRows().map(([label, value]) => `<section class="compare-mobile-card ${selected.length === 3 ? "compare-mobile-card--three" : ""} ${isDifferent(value) ? "is-different" : ""}"><h3>${label}</h3><div>${selected.map((product) => `<p><strong class="font-tech">${product.model}</strong>${value(product)}</p>`).join("")}</div></section>`).join("")}</div>`;
}
function render() {
  const enough = selected.length >= 2;
  const type = selected[0]?.type;
  const addHref = type ? `products.html?type=${type}` : "products.html";
  const selection = selected.length ? `<div class="compare-selection ${selected.length === 3 ? "compare-selection--three" : ""}">${selected.map((product) => `<article><a href="product.html?id=${product.id}"><strong>${product.model}</strong><small>${PRODUCT_TYPES[product.type]} · 상세 보기 ↗</small></a><button class="text-button" type="button" data-remove-compare="${product.id}" aria-label="${product.model} 비교에서 제거">제거 ×</button></article>`).join("")}</div>` : "";
  page.innerHTML = `
    <section class="page-hero compare-hero"><div class="container"><a class="text-link context-return" href="products.html">← 검색 결과로 돌아가기</a>
      <p class="eyebrow">제품 비교 / COMPARE</p><h1>${enough ? "차이를 보고, 선택을 좁히세요." : "함께 볼 제품을 골라주세요."}</h1>
      <p class="lead">${enough ? "연한 초록색 행은 선택한 제품의 값이 다른 항목입니다." : "같은 종류의 제품 2~3개를 나란히 비교할 수 있습니다."}</p>
      ${selected.length ? `<div class="compare-toolbar"><span class="product-type-pill">${PRODUCT_TYPES[type]} · ${selected.length}개 선택</span><div class="button-row">${enough ? `<button class="button button--secondary difference-toggle" type="button" aria-pressed="${differencesOnly}">차이만 보기</button>` : ""}<button class="text-button clear-compare" type="button">전체 비우기</button></div></div>` : ""}
    </div></section>
    <section class="compare-content"><div class="container">
      ${selection}
      ${enough ? `
        <p class="compare-key">${differencesOnly ? `서로 다른 항목 ${visibleRows().length}개를 보고 있습니다.` : "값이 다른 항목 · 제품의 우열을 뜻하지 않습니다."}</p>
        ${tableMarkup()}${mobileMarkup()}
        <div class="compare-next"><div><h2>이 후보들로 공정 조건을 정리해볼까요?</h2><p>선택한 제품이 문의 양식에 자동으로 연결됩니다.</p></div><a class="button button--primary compare-inquiry" href="inquiry.html?products=${selected.map(({ id }) => id).join(",")}">선택 제품 문의 ↗</a></div>
        <div class="button-row compare-back"><a class="text-link" href="${addHref}">← 같은 종류 제품 더 보기</a></div>
      ` : `<div class="empty-state"><h2>${selected.length ? "비교할 제품을 하나 더 선택하세요." : "아직 담은 제품이 없습니다."}</h2><p>${selected.length ? "선택한 제품과 같은 종류의 모델을 추가하면 비교표가 나타납니다." : "제품 목록에서 ‘비교 추가’를 눌러 후보를 담아보세요."}</p><a class="button button--primary" href="${addHref}">${type ? PRODUCT_TYPES[type] + " 더 보기" : "제품 찾기"} ↗</a></div>`}
    </div></section>
    <section class="disclosure"><div class="container"><strong>가상 제품 비교</strong><span>구성 차이를 살펴보는 데모입니다. 실제 장비 선정에는 제조사 사양과 현장 조건 검토가 필요합니다.</span></div></section>`;
  updateContextLinks();
}
document.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove-compare]");
  if (remove) {
    const index = selected.findIndex(({ id }) => id === remove.dataset.removeCompare);
    const result = toggleCompare(selected[index]);
    if (!result.ok) return;
    selected = getProducts(getCompareIds());
    render();
    const controls = [...page.querySelectorAll("[data-remove-compare]")];
    (controls[Math.min(index, controls.length - 1)] || page.querySelector(".empty-state .button"))?.focus({preventScroll:true});
  } else if (event.target.closest(".difference-toggle")) {
    differencesOnly = !differencesOnly;
    render();
    page.querySelector(".difference-toggle").focus({preventScroll:true});
  } else if (event.target.closest(".clear-compare")) {
    if (!clearCompare()) return;
    selected = [];
    differencesOnly = false;
    render();
    page.querySelector(".empty-state .button").focus({preventScroll:true});
  } else if (event.target.closest(".compare-inquiry")) {
    setInquiryProducts(selected.map(({id}) => id));
  }
});
render();
