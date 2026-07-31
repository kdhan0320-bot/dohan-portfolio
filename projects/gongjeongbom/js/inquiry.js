import "./common.js";
import { getProducts } from "./data.js";
import {
  getInquiryProducts,
  getCompareIds,
  setInquiryProducts,
} from "./common.js";

const form = document.querySelector("#inquiry-form");
const steps = [...document.querySelectorAll(".form-step")];
const indicators = [...document.querySelectorAll("[data-step-indicator]")];
const summary = document.querySelector(".inquiry-summary dl");
const errorSummary = document.querySelector(".error-summary");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentStep = 1;

const queryProducts = new URLSearchParams(location.search).get("products")?.split(",").filter(Boolean) || [];
const initialIds = queryProducts.length ? queryProducts : getInquiryProducts().length ? getInquiryProducts() : getCompareIds();
const selectedProducts = getProducts(initialIds);
setInquiryProducts(selectedProducts.map(({ id }) => id));

document.querySelector(".selected-products").innerHTML = selectedProducts.length
  ? selectedProducts.map((product) => `<label class="selected-product"><input type="checkbox" name="products" value="${product.id}" checked>${product.model} ×</label>`).join("")
  : '<p>선택한 제품이 없습니다. 제품 없이도 문의할 수 있습니다.</p>';

if (selectedProducts.length) {
  form.elements.problem.value = "누락·오조립 검사";
  form.elements.industry.value = "자동차 부품";
  form.elements.target.value = "커넥터 조립 상태";
  form.elements.schedule.value = "검토 중";
  form.elements.details.value = "커넥터 누락과 방향 오류를 한 공정에서 확인하려고 합니다. 두 검사 위치를 연결할 수 있는지 검토가 필요합니다.";
  form.elements.purpose.value = "제품 선택·적용 가능성";
  currentStep = 2;
}

function selectedProductModels() {
  return [...form.querySelectorAll('input[name="products"]:checked')]
    .map((input) => selectedProducts.find(({ id }) => id === input.value)?.model)
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
  summary.innerHTML = Object.entries(values).map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("");
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

function fieldLabel(field) {
  return field.closest("label")?.childNodes[0]?.textContent?.trim()
    || field.closest("fieldset")?.querySelector("legend")?.textContent?.trim()
    || field.name;
}

function validateStep(step) {
  const invalid = fieldsForStep(step).filter((field) => !field.checkValidity());
  errorSummary.hidden = invalid.length === 0;
  if (!invalid.length) return true;

  errorSummary.querySelector("ul").innerHTML = invalid.map((field) => {
    const message = field.validity.typeMismatch ? "올바른 이메일 형식으로 입력해 주세요." : "필수 항목을 입력하거나 선택해 주세요.";
    return `<li><a href="#${field.id || field.name}">${fieldLabel(field)}: ${message}</a></li>`;
  }).join("");
  invalid.forEach((field) => {
    field.setAttribute("aria-invalid", "true");
    if (!field.id) field.id = `field-${field.name}`;
  });
  errorSummary.focus();
  invalid[0].focus();
  return false;
}

form.addEventListener("input", (event) => {
  event.target.removeAttribute("aria-invalid");
  updateSummary();
});
form.addEventListener("change", updateSummary);

form.addEventListener("click", (event) => {
  if (event.target.closest(".next-step")) {
    if (validateStep(currentStep)) {
      errorSummary.hidden = true;
      showStep(Math.min(3, currentStep + 1));
    }
  }
  if (event.target.closest(".prev-step")) {
    errorSummary.hidden = true;
    showStep(Math.max(1, currentStep - 1));
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateStep(3)) return;
  const completion = document.querySelector(".completion-state");
  steps.forEach((step) => { step.hidden = true; });
  errorSummary.hidden = true;
  document.querySelector(".inquiry-summary").hidden = true;
  completion.hidden = false;
  indicators.forEach((indicator) => indicator.classList.remove("is-active"));
  completion.focus();
});

showStep(currentStep);
