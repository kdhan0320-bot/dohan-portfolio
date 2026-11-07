import { updateContextLinks } from "./navigation.js?v=20261108b";
import "./common.js?v=20261108b";
import { getProducts } from "./data.js?v=20261108b";
import {
  getInquiryProducts,
  getCompareIds,
  hasInquiryProducts,
  setInquiryProducts,
} from "./common.js?v=20261108b";

const form = document.querySelector("#inquiry-form");
const steps = [...document.querySelectorAll(".form-step")];
const indicators = [...document.querySelectorAll("[data-step-indicator]")];
const summary = document.querySelector(".inquiry-summary dl");
const errorSummary = document.querySelector(".error-summary");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentStep = 1;
let completed = false;
let reviewText = "";

const params = new URLSearchParams(location.search);
const queryProducts = params.get("products")?.split(",").filter(Boolean) || [];
const initialIds = params.has("products")
  ? queryProducts
  : hasInquiryProducts()
    ? getInquiryProducts()
    : getCompareIds();
let selectedProducts = getProducts(initialIds);
setInquiryProducts(selectedProducts.map(({ id }) => id));

function renderSelectedProducts() {
  document.querySelector(".selected-products").innerHTML = selectedProducts.length
  ? selectedProducts.map((product) => `<label class="selected-product" for="selected-product-${product.id}"><input id="selected-product-${product.id}" type="checkbox" name="products" value="${product.id}" checked>${product.model}</label>`).join("")
  : '<p>선택한 제품이 없습니다. 제품 없이도 문의할 수 있습니다.</p>';
}
renderSelectedProducts();

if (selectedProducts.length) {
  form.elements.purpose.value = "제품 선택·적용 가능성";
  currentStep = 2;
}

function selectedProductIds() {
  return [...form.querySelectorAll('input[name="products"]:checked')]
    .map((input) => input.value);
}

function selectedProductModels() {
  return selectedProductIds()
    .map((id) => selectedProducts.find((product) => product.id === id)?.model)
    .filter(Boolean);
}

function updateSummary() {
  const data = new FormData(form);
  const values = {
    "문의 유형": data.get("purpose") || "선택 전",
    문제: data.get("problem") || "입력 전",
    "검사 대상": data.get("target") || "입력 전",
    "검토 이유": data.get("reason") || "아직 정리하지 않음",
    "선택 제품": selectedProductModels().join(" · ") || "선택 없음",
    "현재 단계": `${currentStep}단계 / 3단계`,
  };
  const fragment = document.createDocumentFragment();
  Object.entries(values).forEach(([key, value]) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = key;
    description.textContent = value;
    row.append(term, description);
    fragment.append(row);
  });
  summary.replaceChildren(fragment);
}

function showStep(step, { moveFocus = true } = {}) {
  currentStep = step;
  steps.forEach((section) => {
    section.hidden = Number(section.dataset.step) !== step;
  });
  indicators.forEach((indicator) => {
    const active = Number(indicator.dataset.stepIndicator) === step;
    indicator.classList.toggle("is-active", active);
    indicator.classList.toggle("is-complete", Number(indicator.dataset.stepIndicator) < step);
    if (active) indicator.setAttribute("aria-current", "step");
    else indicator.removeAttribute("aria-current");
  });
  updateSummary();
  if (!moveFocus) return;
  const heading = document.querySelector(`[data-step="${step}"] h2`);
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "auto" : "smooth" });
}

function fieldsForStep(step) {
  return [...document.querySelector(`[data-step="${step}"]`).querySelectorAll("input, select, textarea")];
}

function validationItems(step) {
  const fields = fieldsForStep(step);
  const radioGroups = new Set();
  const items = [];

  fields.forEach((field) => {
    if (field.type === "radio") {
      if (radioGroups.has(field.name)) return;
      radioGroups.add(field.name);
      const controls = fields.filter((candidate) => candidate.type === "radio" && candidate.name === field.name);
      if (controls.some((control) => control.required) && !controls.some((control) => control.checked)) {
        items.push({ controls, target: field.closest("fieldset"), linkTarget: controls[0], field });
      }
      return;
    }
    if (!field.checkValidity() || (field.required && typeof field.value === "string" && !field.value.trim())) items.push({ controls: [field], target: field, linkTarget: field, field });
  });

  return items;
}

function itemLabel({ target, field }) {
  return target.dataset.errorLabel
    || field.dataset.errorLabel
    || field.labels?.[0]?.textContent?.trim()
    || "필수 항목";
}

function clearValidationState() {
  form.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute("aria-invalid"));
  errorSummary.hidden = true;
  errorSummary.querySelector("ul").innerHTML = "";
}

function clearResolvedItem(control) {
  const target = control.type === "radio" ? control.closest("fieldset") : control;
  if (!target) return;
  const resolved = control.type === "radio"
    ? [...target.querySelectorAll('input[type="radio"]')].some((radio) => radio.checked)
    : control.checkValidity() && (!control.required || typeof control.value !== "string" || Boolean(control.value.trim()));
  if (!resolved) return;
  target.removeAttribute("aria-invalid");
  const linkId = control.type === "radio"
    ? target.querySelector('input[type="radio"]').id
    : target.id;
  const link = [...errorSummary.querySelectorAll('a[href^="#"]')]
    .find((candidate) => candidate.getAttribute("href") === `#${linkId}`);
  link?.closest("li")?.remove();
  if (!errorSummary.querySelector("li")) errorSummary.hidden = true;
}

function validateStep(step) {
  clearValidationState();
  const invalid = validationItems(step);
  if (!invalid.length) return true;

  errorSummary.querySelector("ul").innerHTML = invalid.map((item) => {
    const message = item.field.validity.typeMismatch ? "올바른 이메일 형식으로 입력해 주세요." : "필수 항목을 입력하거나 선택해 주세요.";
    return `<li><a href="#${item.linkTarget.id}">${itemLabel(item)}: ${message}</a></li>`;
  }).join("");
  invalid.forEach(({ target }) => target.setAttribute("aria-invalid", "true"));
  errorSummary.hidden = false;
  errorSummary.focus({ preventScroll: true });
  errorSummary.scrollIntoView({ block: "center" });
  return false;
}

form.addEventListener("input", (event) => {
  clearResolvedItem(event.target);
  updateSummary();
});
form.addEventListener("change", (event) => {
  clearResolvedItem(event.target);
  if (event.target.matches('input[name="products"]')) {
    setInquiryProducts(selectedProductIds());
  }
  updateSummary();
});

form.addEventListener("click", (event) => {
  if (event.target.closest(".next-step")) {
    if (validateStep(currentStep)) {
      showStep(Math.min(3, currentStep + 1));
    }
  }
  if (event.target.closest(".prev-step")) {
    clearValidationState();
    showStep(Math.max(1, currentStep - 1));
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentStep < 3) {
    if (validateStep(currentStep)) showStep(currentStep + 1);
    return;
  }
  for (let step = 1; step <= 3; step += 1) {
    if (validationItems(step).length) { showStep(step); validateStep(step); return; }
  }
  completed = true;
  const completion = document.querySelector(".completion-state");
  steps.forEach((step) => { step.hidden = true; });
  clearValidationState();
  document.querySelector(".inquiry-summary").hidden = true;
  const completionSummary = completion.querySelector(".completion-summary");
  completionSummary.replaceChildren();
  const finalData = new FormData(form);
  const reviewRows = [["문의 목적", finalData.get("purpose")], ["검사 유형", finalData.get("problem")], ["검사 대상", finalData.get("target") || "미정"], ["관심 제품", selectedProductModels().join(" · ") || "제품 미선정"], ["검토 이유", finalData.get("reason") || "추가 검토 필요"], ["확인할 상황", finalData.get("details")], ...(finalData.get("industry") ? [["적용 산업", finalData.get("industry")]] : []), ...(finalData.get("schedule") ? [["설치 일정", finalData.get("schedule")]] : []), ["추가 확인", finalData.getAll("conditions").join(" · ") || "선택 없음"]];
  reviewText = "공정봄 · 공정 검토 요약 (가상 제품 데모)\n\n" + reviewRows.map(([label, value]) => `${label}: ${value}`).join("\n") + "\n\n실제 문의 전송 및 장비 선정 결과가 아닙니다.";
  reviewRows.forEach(([label, value]) => {
    const row = document.createElement("p");
    const key = document.createElement("strong");
    const content = document.createElement("span");
    key.textContent = label;
    content.textContent = value;
    row.append(key, content);
    completionSummary.append(row);
  });
  const removed = removeStoredDraft();
  document.querySelector(".completion-storage").textContent = removed
    ? "이 탭에 보관했던 초안은 삭제했습니다. 필요한 내용은 요약으로 복사해 두세요."
    : "브라우저 저장 공간에 접근할 수 없어 초안 삭제를 확인하지 못했습니다. 탭을 닫으면 임시 초안이 사라집니다.";
  document.querySelector(".draft-panel").hidden = true;
  form.reset();
  completion.hidden = false;
  indicators.forEach((indicator) => {
    indicator.classList.remove("is-active");
    indicator.removeAttribute("aria-current");
    indicator.classList.add("is-complete");
  });
  completion.focus({ preventScroll: true });
  completion.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "auto" : "smooth" });
});

// Explicit, tab-scoped drafts. Personal contact fields never enter storage or the shared summary.
const DRAFT_KEY = "gongjeongbom-process-draft-v1";
const draftFields = ["purpose", "problem", "industry", "target", "schedule", "details", "reason"];
const draftStatus = document.querySelector(".draft-status");
const restoreButton = document.querySelector(".restore-draft");
const removeButton = document.querySelector(".remove-draft");
let savedDraft = null;
let savedSnapshot = "";
const initialSnapshot = JSON.stringify(draftSnapshot());
let pendingHref = "";
let leaveOpener = null;
const leaveDialog = document.querySelector("#leave-dialog");
const leaveError = document.querySelector(".leave-error");

function draftSnapshot() {
  const data = new FormData(form);
  return { values: Object.fromEntries(draftFields.map((name) => [name, String(data.get(name) || "")])), products: selectedProductIds(), conditions: data.getAll("conditions") };
}
function hasContact() {
  return ["name", "company", "email", "phone"].some((name) => form.elements[name].value.trim());
}
function hasProcess() {
  const value = draftSnapshot();
  return Object.values(value.values).some(Boolean) || value.conditions.length > 0;
}
function needsExitPrompt() {
  return !completed && (hasContact() || (hasProcess() && JSON.stringify(draftSnapshot()) !== savedSnapshot && JSON.stringify(draftSnapshot()) !== initialSnapshot));
}
function showDraftState(message) {
  draftStatus.textContent = message;
  restoreButton.hidden = !savedDraft;
  removeButton.hidden = !savedDraft;
}
function loadStoredDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null");
    if (!draft || draft.version !== 1 || !draft.values || typeof draft.values !== "object") return;
    const values = Object.fromEntries(draftFields.map((name) => [name, typeof draft.values[name] === "string" ? draft.values[name].slice(0, name === "details" ? 3000 : name === "reason" ? 1200 : 200) : ""]));
    savedDraft = { values, products: Array.isArray(draft.products) ? getProducts(draft.products).map(({id})=>id).slice(0,3) : [], conditions: Array.isArray(draft.conditions) ? draft.conditions.filter(value=>[...form.querySelectorAll('[name="conditions"]')].some(field=>field.value===value)) : [], step: draft.step === 2 ? 2 : 1 };
    showDraftState("보관한 공정 초안이 있습니다. 불러오면 현재 공정 조건과 선택 제품을 초안 내용으로 바꿉니다.");
  } catch { showDraftState("이 브라우저에서는 초안을 읽을 수 없습니다. 입력 내용은 현재 화면에서만 유지됩니다."); }
}
function saveDraft() {
  if (!hasProcess()) { showDraftState("문의 목적이나 공정 조건을 먼저 입력해 주세요."); return false; }
  const snapshot = draftSnapshot();
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ version: 1, ...snapshot, step: Math.min(currentStep, 2) }));
    savedDraft = { ...snapshot, step: Math.min(currentStep, 2) };
    savedSnapshot = JSON.stringify(snapshot);
    showDraftState("공정 초안을 이 탭에 보관했습니다. 담당자 정보는 포함되지 않습니다.");
    return true;
  } catch {
    showDraftState("초안을 보관하지 못했습니다. 입력 내용은 그대로 있습니다. 브라우저의 저장 설정을 확인해 주세요.");
    return false;
  }
}
function removeStoredDraft() {
  try { sessionStorage.removeItem(DRAFT_KEY); savedDraft = null; savedSnapshot = ""; return true; }
  catch { return false; }
}
document.querySelector(".save-draft").addEventListener("click", saveDraft);
restoreButton.addEventListener("click", () => {
  if (!savedDraft) return;
  draftFields.forEach((name) => { form.elements[name].value = savedDraft.values[name]; });
  form.querySelectorAll('[name="conditions"]').forEach((input) => { input.checked = savedDraft.conditions.includes(input.value); });
  selectedProducts = getProducts(savedDraft.products);
  renderSelectedProducts();
  setInquiryProducts(savedDraft.products);
  savedSnapshot = JSON.stringify(draftSnapshot());
  clearValidationState();
  showStep(savedDraft.step);
  showDraftState("보관한 공정 초안을 불러왔습니다. 담당자 정보는 별도로 확인해 주세요.");
});
removeButton.addEventListener("click", () => {
  showDraftState(removeStoredDraft() ? "보관한 초안을 삭제했습니다. 화면에 작성 중인 내용은 그대로입니다." : "초안을 삭제하지 못했습니다. 브라우저의 저장 설정을 확인해 주세요.");
  document.querySelector(".save-draft").focus();
});
form.addEventListener("input", () => {
  if (savedSnapshot && JSON.stringify(draftSnapshot()) !== savedSnapshot) showDraftState("보관한 초안 이후에 내용이 바뀌었습니다. 변경 사항을 보관하려면 다시 눌러주세요.");
});
window.addEventListener("beforeunload", (event) => {
  if (!needsExitPrompt()) return;
  event.preventDefault();
  event.returnValue = "";
});
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank" || link.hasAttribute("download") || !needsExitPrompt()) return;
  const target = new URL(link.href);
  if (target.origin === location.origin && target.pathname === location.pathname && target.search === location.search && target.hash) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
  pendingHref = link.href;
  leaveOpener = link.closest("#menu-dialog") ? document.querySelector(".menu-trigger") : link;
  leaveError.hidden = true;
  leaveDialog.showModal();
  leaveDialog.querySelector(".keep-and-leave").focus();
}, true);
function leavePage() { completed = true; location.href = pendingHref; }
document.querySelector(".keep-and-leave").addEventListener("click", () => {
  if (saveDraft()) leavePage();
  else { leaveError.textContent = "초안을 보관하지 못해 이동하지 않았습니다. 계속 작성하거나, 초안을 버리고 나가기를 선택하세요."; leaveError.hidden = false; }
});
document.querySelector(".discard-and-leave").addEventListener("click", () => {
  if (removeStoredDraft()) leavePage();
  else { leaveError.textContent = "보관한 초안을 삭제하지 못해 이동하지 않았습니다. 계속 작성해 주세요."; leaveError.hidden = false; }
});
document.querySelector(".continue-writing").addEventListener("click", () => leaveDialog.close());
leaveDialog.addEventListener("close", () => leaveOpener?.focus());
document.querySelector(".copy-review").addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");
  try { await navigator.clipboard.writeText(reviewText); status.textContent = "담당자 정보를 제외한 요약을 복사했습니다."; }
  catch {
    const fallback = document.querySelector(".copy-fallback");
    fallback.hidden = false;
    const textarea = fallback.querySelector("textarea");
    textarea.value = reviewText;
    textarea.focus(); textarea.select();
    status.textContent = "자동 복사를 사용할 수 없습니다. 아래 요약을 직접 복사해 주세요.";
  }
});
loadStoredDraft();
showStep(currentStep, { moveFocus: false });
updateContextLinks();
