import { normalizeFilters, updateContextLinks } from "./navigation.js?v=20261108c";
import "./common.js?v=20261108c";
import {
  products,
  PRODUCT_TYPES,
  PROBLEM_LABELS,
  modelDiagramMarkup,
  familyDiagramMarkup,
  productHref,
  typeCounts,
} from "./data.js?v=20261108c";
import {
  announce,
  clearCompare,
  getCompareIds,
  showToast,
  toggleCompare,
  updateCompareUi,
} from "./common.js?v=20261108c";

const state = {
  query: "",
  type: "",
  problems: new Set(),
  level: "",
  connections: new Set(),
};

function readUrlState() {
  const params = new URLSearchParams(normalizeFilters(location.search));
  state.query = params.get("q") || "";
  state.type = PRODUCT_TYPES[params.get("type")] ? params.get("type") : "";
  state.problems = new Set(params.getAll("problem").filter((value) => PROBLEM_LABELS[value]));
  state.level = ["basic", "multiple", "precision"].includes(params.get("level")) ? params.get("level") : "";
  state.connections = new Set(params.getAll("connection").filter((value) => ["built-in", "external-light", "ethernet", "data"].includes(value)));
}
function syncUrlState(mode = "replace") {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set("q", state.query.trim());
  if (state.type) params.set("type", state.type);
  state.problems.forEach((value) => params.append("problem", value));
  if (state.level) params.set("level", state.level);
  state.connections.forEach((value) => params.append("connection", value));
  const query = params.toString();
  const url = location.pathname + (query ? "?" + query : "") + location.hash;
  if (url !== location.pathname + location.search + location.hash) history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
}
readUrlState();

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
let filterDraft = null;

function filterMarkup(prefix = "") {
  const problemChoices = Object.entries(PROBLEM_LABELS)
    .map(([value, label]) => `<label><input type="checkbox" name="${prefix}problem" value="${value}">${label}</label>`)
    .join("");
  const typeChoices = prefix
    ? `<fieldset class="product-type-filter"><legend>제품 종류</legend>
      <label><input type="radio" name="${prefix}type" value="">전체 ${products.length}</label>
      ${Object.entries(PRODUCT_TYPES).map(([value, label]) => `<label><input type="radio" name="${prefix}type" value="${value}">${label} ${typeCounts[value]}</label>`).join("")}
    </fieldset>`
    : "";
  return `
    <h2>조건 좁히기</h2>
    ${typeChoices}
    <fieldset><legend>해결 문제</legend><p class="filter-hint">여러 개를 고르면 모두 충족하는 제품</p>${problemChoices}</fieldset>
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
    `<button type="button" data-type="" class="${state.type ? "" : "is-active"}" aria-pressed="${!state.type}">전체 ${products.length}</button>`,
    ...Object.entries(PRODUCT_TYPES).map(
      ([value, label]) =>
        `<button type="button" data-type="${value}" class="${state.type === value ? "is-active" : ""}" aria-pressed="${state.type === value}">${label} ${typeCounts[value]}</button>`,
    ),
  ].join("");
}

function copyFilterState(source) {
  return {
    type: source.type,
    problems: new Set(source.problems),
    level: source.level,
    connections: new Set(source.connections),
  };
}

function replaceFilterState(target, source) {
  target.type = source.type;
  target.problems = new Set(source.problems);
  target.level = source.level;
  target.connections = new Set(source.connections);
}

function stateForControl(input) {
  return input.name.startsWith("mobile-") && filterDraft ? filterDraft : state;
}

function syncControls() {
  document.querySelectorAll('input[type="radio"][name$="type"]').forEach((input) => {
    input.checked = input.value === stateForControl(input).type;
  });
  document.querySelectorAll('input[type="checkbox"][name$="problem"]').forEach((input) => {
    input.checked = stateForControl(input).problems.has(input.value);
  });
  document.querySelectorAll('input[type="radio"][name$="level"]').forEach((input) => {
    input.checked = input.value === stateForControl(input).level;
  });
  document.querySelectorAll('input[type="checkbox"][name$="connection"]').forEach((input) => {
    input.checked = stateForControl(input).connections.has(input.value);
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
      <div class="product-card__top"><span class="eyebrow">${PRODUCT_TYPES[product.type]}</span>${modelDiagramMarkup(product.model) || familyDiagramMarkup(product.type)}</div>
      <h3><a href="${productHref(product)}&filters=${encodeURIComponent(location.search.slice(1))}">${product.model}</a></h3>
      <p class="product-card__summary">${product.name}</p>
      <p class="product-card__fit"><strong>검토 기준</strong>${product.fit}</p>
      <div class="chip-row">${product.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
      <div class="card-actions">
        <a class="button button--primary" href="${productHref(product)}&filters=${encodeURIComponent(location.search.slice(1))}" aria-label="${product.model} 상세 보기">상세 보기</a>
        <button class="button button--secondary" type="button" data-compare-id="${product.id}" aria-pressed="${selected}">${selected ? "비교 제거" : "비교 추가"}</button>
      </div>
    </article>`;
}

function selectedFilterCount() {
  return state.problems.size
    + state.connections.size
    + Number(Boolean(state.type))
    + Number(Boolean(state.level));
}

function isVisible(node) {
  return Boolean(node && (node.offsetWidth || node.offsetHeight || node.getClientRects().length));
}

function focusResultStatus() {
  const compactStatus = document.querySelector(".mobile-result-count");
  const target = isVisible(heading) ? heading : isVisible(compactStatus) ? compactStatus : searchInput;
  target?.focus({ preventScroll: true });
}

function focusTypeControl(type) {
  const control = [...tabs.querySelectorAll("[data-type]")]
    .find((button) => button.dataset.type === type && isVisible(button));
  if (control) control.focus({ preventScroll: true });
  else focusResultStatus();
}

function focusCompareControl(productId) {
  const control = [...document.querySelectorAll("[data-compare-id]")]
    .find((button) => button.dataset.compareId === productId && isVisible(button));
  if (control) control.focus({ preventScroll: true });
  else focusResultStatus();
}

function render(mode = "replace") {
  syncUrlState(mode);
  const results = filteredProducts();
  const searchStatus = document.querySelector(".search-status");
  searchStatus.hidden = !state.query.trim();
  searchStatus.querySelector("span").textContent = `‘${state.query.trim()}’ 검색 중 · ${results.length}개`;
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
    ? active.map((item) => `<span>${item}</span>`).join("") + '<button class="text-button reset-filter" type="button">필터 초기화</button>'
    : "";
  const compactFilters = [
    state.type && PRODUCT_TYPES[state.type],
    ...active,
  ].filter(Boolean);
  document.querySelector(".active-filter-summary").innerHTML = compactFilters.map((item) => `<span>${item}</span>`).join("")
    + (compactFilters.length ? '<button class="text-button reset-filter" type="button">필터 초기화</button>' : "");

  productGrid.innerHTML = results.length
    ? results.map(cardMarkup).join("") + `
      <article class="decision-guide" id="decision-guide">
        <h3>어떤 제품이 맞을지 모르겠나요?</h3>
        <p>카메라 수보다 검사 위치, 공정 흐름, 앞으로 추가할 기능을 먼저 확인하세요.</p>
        <ul><li>한 곳인가요, 여러 곳인가요?</li><li>결과를 저장하거나 전송해야 하나요?</li><li>나중에 구성을 바꿀 가능성이 있나요?</li></ul>
        <a class="text-link" href="index.html#guide">제품 종류 선택 가이드</a>
      </article>`
    : '<div class="empty-state"><h3>조건에 맞는 제품이 없습니다.</h3><p>검색어나 필터를 줄여 다시 확인해 주세요.</p><button class="button button--secondary reset-filter reset-all" type="button">검색·필터 모두 초기화</button></div>';
  renderCompareBar();
  syncControls();
  updateCompareUi();
  updateContextLinks();
  announce(`조건에 맞는 제품 ${results.length}개입니다.`);
}

function renderCompareBar() {
  const selected = products.filter((product) => getCompareIds().includes(product.id));
  compareBar.hidden = selected.length === 0;
  const compareLink = compareBar.querySelector('.compare-results-link');
  compareLink.textContent = selected.length >= 2 ? `비교하기 (${selected.length})` : "1개 더 선택하세요";
  compareLink.setAttribute("aria-disabled", String(selected.length < 2));
  if (!selected.length) return;
  compareBar.querySelector(".compare-bar__title").textContent = `${PRODUCT_TYPES[selected[0].type]} 비교 · ${selected.length}개 선택됨`;
  compareBar.querySelector(".compare-bar__models").textContent = selected.map(({ model }) => model).join(" · ");
}

function updateStateFromControl(input, target = state) {
  const baseName = input.name.replace(/^mobile-/, "");
  if (baseName === "problem") {
    input.checked ? target.problems.add(input.value) : target.problems.delete(input.value);
  } else if (baseName === "type") {
    target.type = input.value;
  } else if (baseName === "level") {
    target.level = input.value;
  } else if (baseName === "connection") {
    input.checked ? target.connections.add(input.value) : target.connections.delete(input.value);
  }
}

function clearFilterState(target) {
  target.type = "";
  target.problems.clear();
  target.level = "";
  target.connections.clear();
}

function resetFilters(clearQuery = false) {
  if (clearQuery) { state.query = ""; searchInput.value = ""; }
  clearFilterState(state);
  render("push");
}

filterPanel.innerHTML = filterMarkup();
mobileFilterBody.innerHTML = filterMarkup("mobile-");

searchInput.value = state.query;
window.addEventListener("popstate", () => { readUrlState(); searchInput.value = state.query; render(); });
searchInput.addEventListener("search", () => { state.query = searchInput.value.trim().slice(0, 120); render("push"); });
compareBar.querySelector('.compare-results-link').addEventListener("click", (event) => { if (getCompareIds().length < 2) event.preventDefault(); });

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value.trim().slice(0, 120);
  render("push");
});

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-type]");
  if (!button) return;
  state.type = button.dataset.type;
  render("push");
  focusTypeControl(state.type);
});

document.addEventListener("change", (event) => {
  if (!event.target.matches('input[name$="type"], input[name$="problem"], input[name$="level"], input[name$="connection"]')) return;
  if (event.target.name.startsWith("mobile-")) {
    filterDraft ??= copyFilterState(state);
    updateStateFromControl(event.target, filterDraft);
    syncControls();
  } else {
    updateStateFromControl(event.target);
    render("push");
  }
});

document.addEventListener("click", (event) => {
  const compareButton = event.target.closest("[data-compare-id]");
  if (compareButton) {
    const product = products.find(({ id }) => id === compareButton.dataset.compareId);
    const result = toggleCompare(product);
    if (!result.ok) showToast(result.message);
    render();
    focusCompareControl(product.id);
    return;
  }
  if (event.target.closest(".clear-search")) {
    state.query = "";
    searchInput.value = "";
    render("push");
    searchInput.focus();
    return;
  }
  const reset = event.target.closest(".reset-filter");
  if (reset) {
    if (filterDialog.open && filterDialog.contains(reset)) {
      filterDraft ??= copyFilterState(state);
      clearFilterState(filterDraft);
      syncControls();
      return;
    }
    resetFilters(reset.classList.contains("reset-all"));
    if (!reset.isConnected || !isVisible(reset)) focusResultStatus();
    return;
  }
  if (event.target.closest(".clear-compare")) {
    clearCompare();
    render();
    focusResultStatus();
  }
});

let filterOpener = filterTrigger;
filterTrigger.addEventListener("click", () => {
  filterOpener = document.activeElement;
  filterDraft = copyFilterState(state);
  syncControls();
  filterDialog.showModal();
  filterDialog.querySelector(".dialog-close").focus();
});
filterDialog.querySelector(".dialog-close").addEventListener("click", () => filterDialog.close());
filterDialog.querySelector(".apply-filter").addEventListener("click", () => {
  if (filterDraft) replaceFilterState(state, filterDraft);
  filterDraft = null;
  filterDialog.close();
  render("push");
});
filterDialog.addEventListener("close", () => {
  filterDraft = null;
  syncControls();
  filterOpener?.focus();
});
filterDialog.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  filterDialog.close();
});
filterDialog.addEventListener("click", (event) => {
  if (event.target === filterDialog) filterDialog.close();
});

document.addEventListener("comparechange", renderCompareBar);
render();
announce("제품 목록을 불러왔습니다.");
