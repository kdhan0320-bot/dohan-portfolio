import "./common.js";
import {
  products,
  PRODUCT_TYPES,
  PROBLEM_LABELS,
  modelDiagramMarkup,
  productHref,
  typeCounts,
} from "./data.js";
import {
  announce,
  clearCompare,
  getCompareIds,
  toggleCompare,
  updateCompareUi,
} from "./common.js";

const state = {
  query: "",
  type: "",
  problems: new Set(),
  level: "",
  connections: new Set(),
};

const params = new URLSearchParams(location.search);
if (PRODUCT_TYPES[params.get("type")]) state.type = params.get("type");
if (PROBLEM_LABELS[params.get("problem")]) state.problems.add(params.get("problem"));
if (["basic", "multiple", "precision"].includes(params.get("level"))) state.level = params.get("level");

const searchForm = document.querySelector(".product-search");
const searchInput = document.querySelector("#product-search");
const tabs = document.querySelector(".type-tabs");
const filterPanel = document.querySelector(".filter-panel");
const mobileFilterBody = document.querySelector(".mobile-filter-body");
const productGrid = document.querySelector(".product-grid");
const heading = document.querySelector(".result-heading h2");
const activeFilters = document.querySelector(".active-filters");
const compareBar = document.querySelector(".compare-bar");
const filterDialog = document.querySelector("#filter-dialog");
const filterTrigger = document.querySelector(".filter-trigger");

function filterMarkup(prefix = "") {
  const problemChoices = Object.entries(PROBLEM_LABELS)
    .map(([value, label]) => `<label><input type="checkbox" name="${prefix}problem" value="${value}">${label}</label>`)
    .join("");
  return `
    <h2>필터</h2>
    <fieldset><legend>해결 문제</legend>${problemChoices}</fieldset>
    <fieldset><legend>필요한 검사 수준</legend>
      <label><input type="radio" name="${prefix}level" value="">전체</label>
      <label><input type="radio" name="${prefix}level" value="basic">기본</label>
      <label><input type="radio" name="${prefix}level" value="multiple">복수 검사</label>
      <label><input type="radio" name="${prefix}level" value="precision">정밀·복합</label>
    </fieldset>
    <fieldset><legend>설치와 설비 연결</legend>
      <label><input type="checkbox" name="${prefix}connection" value="built-in">내장 구성</label>
      <label><input type="checkbox" name="${prefix}connection" value="external-light">외부 조명</label>
      <label><input type="checkbox" name="${prefix}connection" value="ethernet">이더넷</label>
      <label><input type="checkbox" name="${prefix}connection" value="data">데이터 출력</label>
    </fieldset>
    <button class="text-button reset-filter" type="button">필터 초기화</button>`;
}

function tabsMarkup() {
  return [
    `<button type="button" data-type="" class="${state.type ? "" : "is-active"}">전체 ${products.length}</button>`,
    ...Object.entries(PRODUCT_TYPES).map(
      ([value, label]) =>
        `<button type="button" data-type="${value}" class="${state.type === value ? "is-active" : ""}">${label} ${typeCounts[value]}</button>`,
    ),
  ].join("");
}

function syncControls() {
  document.querySelectorAll('input[type="checkbox"][name$="problem"]').forEach((input) => {
    input.checked = state.problems.has(input.value);
  });
  document.querySelectorAll('input[type="radio"][name$="level"]').forEach((input) => {
    input.checked = input.value === state.level;
  });
  document.querySelectorAll('input[type="checkbox"][name$="connection"]').forEach((input) => {
    input.checked = state.connections.has(input.value);
  });
}

function filteredProducts() {
  const normalized = state.query.trim().toLocaleLowerCase("ko");
  return products.filter((product) => {
    const searchText = [
      product.model,
      product.name,
      product.summary,
      product.fit,
      PRODUCT_TYPES[product.type],
      ...product.problems.map((problem) => PROBLEM_LABELS[problem]),
    ].join(" ").toLocaleLowerCase("ko");
    return (
      (!normalized || searchText.includes(normalized)) &&
      (!state.type || product.type === state.type) &&
      (!state.problems.size || [...state.problems].every((problem) => product.problems.includes(problem))) &&
      (!state.level || product.level === state.level || (state.level === "multiple" && product.level === "precision")) &&
      (!state.connections.size || [...state.connections].every((connection) => product.connections.includes(connection)))
    );
  });
}

function cardMarkup(product) {
  const selected = getCompareIds().includes(product.id);
  return `
    <article class="product-card">
      ${selected ? '<span class="badge">비교에 추가됨</span>' : ""}
      <div class="product-card__top"><span class="eyebrow">${PRODUCT_TYPES[product.type]}</span>${modelDiagramMarkup(product.model)}</div>
      <h3>${product.model}</h3>
      <p class="product-card__summary">${product.name}</p>
      <p>잘 맞는 경우: ${product.fit}</p>
      <div class="chip-row">${product.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
      <div class="card-actions">
        <a class="button button--primary" href="${productHref(product)}">상세 보기</a>
        <button class="button button--secondary" type="button" data-compare-id="${product.id}" aria-pressed="${selected}">${selected ? "비교 제거" : "비교 추가"}</button>
      </div>
    </article>`;
}

function selectedFilterCount() {
  return state.problems.size + state.connections.size + Number(Boolean(state.level));
}

function render() {
  const results = filteredProducts();
  const label = state.type ? PRODUCT_TYPES[state.type] : "전체 제품";
  heading.textContent = `${label} · ${results.length}개`;
  document.querySelector(".mobile-result-count").textContent = `결과 ${results.length}개`;
  document.querySelector(".filter-count").textContent = `\u00a0${selectedFilterCount()}`;
  tabs.innerHTML = tabsMarkup();

  const active = [
    ...[...state.problems].map((value) => PROBLEM_LABELS[value]),
    state.level && ({ basic: "기본", multiple: "복수 검사", precision: "정밀·복합" })[state.level],
    ...[...state.connections].map((value) => ({ "built-in": "내장 구성", "external-light": "외부 조명", ethernet: "이더넷", data: "데이터 출력" })[value]),
  ].filter(Boolean);
  activeFilters.innerHTML = active.length
    ? active.map((item) => `<span>${item}</span>`).join("") + '<button class="text-button reset-filter" type="button">전체 초기화</button>'
    : "";
  const compactFilters = [
    state.type && PRODUCT_TYPES[state.type],
    ...active,
  ].filter(Boolean);
  document.querySelector(".active-filter-summary").innerHTML = compactFilters.map((item) => `<span>${item}</span>`).join("")
    + (active.length ? '<button class="text-button reset-filter" type="button">필터 초기화</button>' : "");

  productGrid.innerHTML = results.length
    ? results.map(cardMarkup).join("") + `
      <article class="decision-guide" id="decision-guide">
        <h3>어떤 제품이 맞을지 모르겠나요?</h3>
        <p>카메라 수보다 검사 위치, 공정 흐름, 앞으로 추가할 기능을 먼저 확인하세요.</p>
        <ul><li>한 곳인가요, 여러 곳인가요?</li><li>결과를 저장하거나 전송해야 하나요?</li><li>나중에 구성을 바꿀 가능성이 있나요?</li></ul>
        <a class="button button--secondary" href="inquiry.html">제품 선택 문의</a>
      </article>`
    : '<div class="empty-state"><h3>조건에 맞는 제품이 없습니다.</h3><p>검색어나 필터를 줄여 다시 확인해 주세요.</p><button class="button button--secondary reset-filter" type="button">필터 초기화</button></div>';
  renderCompareBar();
  syncControls();
  updateCompareUi();
}

function renderCompareBar() {
  const selected = products.filter((product) => getCompareIds().includes(product.id));
  compareBar.hidden = selected.length === 0;
  if (!selected.length) return;
  compareBar.querySelector(".compare-bar__title").textContent = `${PRODUCT_TYPES[selected[0].type]} 비교 · ${selected.length}개 선택됨`;
  compareBar.querySelector(".compare-bar__models").textContent = selected.map(({ model }) => model).join(" · ");
}

function updateStateFromControl(input) {
  const baseName = input.name.replace(/^mobile-/, "");
  if (baseName === "problem") {
    input.checked ? state.problems.add(input.value) : state.problems.delete(input.value);
  } else if (baseName === "level") {
    state.level = input.value;
  } else if (baseName === "connection") {
    input.checked ? state.connections.add(input.value) : state.connections.delete(input.value);
  }
}

function resetFilters() {
  state.query = "";
  state.type = "";
  state.problems.clear();
  state.level = "";
  state.connections.clear();
  searchInput.value = "";
  render();
}

filterPanel.innerHTML = filterMarkup();
mobileFilterBody.innerHTML = filterMarkup("mobile-");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value;
  render();
  heading.focus();
});

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-type]");
  if (!button) return;
  state.type = button.dataset.type;
  render();
});

document.addEventListener("change", (event) => {
  if (!event.target.matches('input[name$="problem"], input[name$="level"], input[name$="connection"]')) return;
  updateStateFromControl(event.target);
  if (!event.target.name.startsWith("mobile-")) render();
  else syncControls();
});

document.addEventListener("click", (event) => {
  const compareButton = event.target.closest("[data-compare-id]");
  if (compareButton) {
    const product = products.find(({ id }) => id === compareButton.dataset.compareId);
    const result = toggleCompare(product);
    if (!result.ok) alert(result.message);
    render();
    return;
  }
  if (event.target.closest(".reset-filter")) resetFilters();
  if (event.target.closest(".clear-compare")) {
    clearCompare();
    render();
  }
});

let filterOpener = filterTrigger;
filterTrigger.addEventListener("click", () => {
  filterOpener = document.activeElement;
  syncControls();
  filterDialog.showModal();
  filterDialog.querySelector(".dialog-close").focus();
});
filterDialog.querySelector(".dialog-close").addEventListener("click", () => filterDialog.close());
filterDialog.querySelector(".apply-filter").addEventListener("click", () => {
  filterDialog.close();
  render();
  heading.focus();
});
filterDialog.addEventListener("close", () => filterOpener?.focus());
filterDialog.addEventListener("click", (event) => {
  if (event.target === filterDialog) filterDialog.close();
});

document.addEventListener("comparechange", renderCompareBar);
render();
announce("제품 목록을 불러왔습니다.");
