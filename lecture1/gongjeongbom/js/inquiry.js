import "./common.js";
import { getProducts } from "./data.js";
import {
  getInquiryProducts,
  getCompareIds,
  hasInquiryProducts,
  setInquiryProducts,
} from "./common.js";

const form = document.querySelector("#inquiry-form");
const steps = [...document.querySelectorAll(".form-step")];
const indicators = [...document.querySelectorAll("[data-step-indicator]")];
const summary = document.querySelector(".inquiry-summary dl");
const errorSummary = document.querySelector(".error-summary");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentStep = 1;

const params = new URLSearchParams(location.search);
const queryProducts = params.get("products")?.split(",").filter(Boolean) || [];
const initialIds = params.has("products")
  ? queryProducts
  : hasInquiryProducts()
    ? getInquiryProducts()
    : getCompareIds();
const selectedProducts = getProducts(initialIds);
setInquiryProducts(selectedProducts.map(({ id }) => id));

document.querySelector(".selected-products").innerHTML = selectedProducts.length
  ? selectedProducts.map((product) => `<label class="selected-product" for="selected-product-${product.id}"><input id="selected-product-${product.id}" type="checkbox" name="products" value="${product.id}" checked>${product.model} ×</label>`).join("")
  : '<p>선택한 제품이 없습니다. 제품 없이도 문의할 수 있습니다.</p>';

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
    산업: data.get("industry") || "선택 전",
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

function showStep(step) {
  currentStep = step;
  steps.forEach((section) => {
    section.hidden = Number(section.dataset.step) !== step;
  });
  indicators.forEach((indicator) => {
    const active = Number(indicator.dataset.stepIndicator) === step;
    indicator.classList.toggle("is-active", active);
    if (active) indicator.setAttribute("aria-current", "step");
    else indicator.removeAttribute("aria-current");
  });
  updateSummary();
  document.querySelector(`[data-step="${step}"] h2`)?.focus({ preventScroll: true });
  window.scrollTo({
    top: document.querySelector(".inquiry-section").offsetTop - 70,
    behavior: reducedMotion.matches ? "auto" : "smooth",
  });
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
    if (!field.checkValidity()) items.push({ controls: [field], target: field, linkTarget: field, field });
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
    : control.checkValidity();
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
  if (!validateStep(3)) return;
  const completion = document.querySelector(".completion-state");
  steps.forEach((step) => { step.hidden = true; });
  clearValidationState();
  document.querySelector(".inquiry-summary").hidden = true;
  completion.hidden = false;
  indicators.forEach((indicator) => {
    indicator.classList.remove("is-active");
    indicator.removeAttribute("aria-current");
  });
  completion.focus();
});

showStep(currentStep);
