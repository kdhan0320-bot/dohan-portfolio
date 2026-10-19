import { inspections } from './data.js';
import { setResponsiveImage } from './images.js';
import { openDialog, setupDialogs } from './common.js';

// Only the selected inspection goes into the URL. Contact values stay in this page.
const queryType = new URLSearchParams(window.location.search).get('type');
let selectedType = Object.hasOwn(inspections, queryType) ? queryType : 'scratch';
const form = document.querySelector('#consult-form');
const inspectionSelect = document.querySelector('#consult-inspection-select');
const inspectionDialog = document.querySelector('#consult-inspection-dialog');
const changeButton = document.querySelector('#consult-change');
const privacyButton = document.querySelector('#consult-privacy-open');
const completeDialog = document.querySelector('#consult-complete-dialog');
const preparationDialog = document.querySelector('#preparation-dialog');
const errorSummary = document.querySelector('#consult-error-summary');
const errorList = document.querySelector('#consult-error-list');
const fieldIds = ['consult-company', 'consult-name', 'consult-email', 'consult-consent'];
const validatedFields = new Set();
let hasSubmitted = false;
let pointerIsDown = false;
let pendingBlurField = null;
const product = document.querySelector('.consult-product');
const markerWrapper = document.querySelector('.consult-product-marker');
// These are the original Figma coordinates. Scale the wrapper, leaving SVG dimensions intact.
const markerGeometry = {
  scratch: { width: 352, left: 210.2, top: 106.8 },
  missing: { width: 410.667, left: 328.04, top: 53.41 },
  print: { width: 410.667, left: 178.88, top: 136.37 },
};

function sizeMarker() {
  markerWrapper.style.setProperty('--consult-marker-scale', product.clientWidth / markerGeometry[selectedType].width);
}

function renderSelection(announce = false) {
  const inspection = inspections[selectedType];
  document.querySelector('#consult-selection-title').textContent = inspection.name;
  document.querySelector('#consult-selection-card').style.backgroundColor = inspection.tint;
  const productImage = document.querySelector('#consult-product-image');
  const productMark = document.querySelector('#consult-product-mark');
  setResponsiveImage(productImage, inspection.image, '(max-width: 600px) 34vw, (max-width: 820px) 40vw, 352px');
  productImage.alt = `${inspection.name} 검사 대상 제품`;
  const geometry = markerGeometry[selectedType];
  productMark.src = selectedType === 'scratch' ? 'assets/figma/451-2246-img6.svg' : inspection.cardMark;
  productMark.style.left = `${geometry.left}px`;
  productMark.style.top = `${geometry.top}px`;
  markerWrapper.style.width = `${geometry.width}px`;
  markerWrapper.style.height = `${geometry.width * .75}px`;
  sizeMarker();
  inspectionSelect.value = selectedType;
  if (announce) {
    document.querySelector('#consult-selection-status').textContent = `${inspection.name} 검사를 선택했습니다.`;
  }
}

function fieldError(field) {
  if (field.type === 'checkbox') return field.checked ? '' : '개인정보 안내 확인란을 선택해 주세요.';
  if (!field.value.trim()) {
    return {
      'consult-company': '회사명을 입력해 주세요.',
      'consult-name': '담당자명을 입력해 주세요.',
      'consult-email': '업무 이메일을 입력해 주세요.',
    }[field.id];
  }
  if (field.type === 'email' && field.validity.typeMismatch) return '이메일 주소를 name@company.com 형식으로 입력해 주세요.';
  return '';
}

function showFieldError(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  error.textContent = message;
  error.hidden = !message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function finishBlurValidation() {
  if (!pendingBlurField) return;
  showFieldError(pendingBlurField, fieldError(pendingBlurField));
  pendingBlurField = null;
}

// 최초 오류도 클릭 도중 입력칸 아래 요소를 밀지 않도록 클릭이 끝난 뒤 표시합니다.
document.addEventListener('pointerdown', () => { pointerIsDown = true; });
function finishPointerValidation() {
  pointerIsDown = false;
  finishBlurValidation();
}
// 터치는 pointerup 뒤에 합성 click이 발생하므로 click까지 기다립니다.
['click', 'auxclick', 'pointercancel', 'contextmenu', 'keydown'].forEach(type => {
  document.addEventListener(type, finishPointerValidation);
});
window.addEventListener('blur', finishPointerValidation);

function validateForm() {
  errorList.replaceChildren();
  let errorCount = 0;
  fieldIds.forEach((id) => {
    const field = document.getElementById(id);
    const message = fieldError(field);
    showFieldError(field, message);
    if (!message) return;
    errorCount += 1;
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = message;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      field.focus();
    });
    listItem.append(link);
    errorList.append(listItem);
  });
  errorSummary.hidden = errorCount === 0;
  return errorCount === 0;
}

changeButton.addEventListener('click', () => {
  inspectionSelect.value = selectedType;
  openDialog(inspectionDialog, changeButton);
});

document.querySelector('#consult-inspection-apply').addEventListener('click', () => {
  selectedType = inspectionSelect.value;
  renderSelection(true);
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set('type', selectedType);
  window.history.replaceState(null, '', nextUrl);
  inspectionDialog.close();
});

privacyButton.addEventListener('click', () => {
  openDialog(document.querySelector('#consult-privacy-dialog'), privacyButton);
});

// 준비 안내를 읽고 계속 입력할 때는 페이지를 다시 열지 않습니다.
// 마지막 폼 위치만 메모리에 기억하며, 입력값이나 선택 검사를 저장하지 않습니다.
let lastFormFocus = document.querySelector('#consult-company');
let returnToForm = false;
form.addEventListener('focusin', (event) => {
  if (event.target instanceof HTMLElement) lastFormFocus = event.target;
});
document.querySelector('[data-return-to-consultation]').addEventListener('click', () => {
  returnToForm = true;
});
preparationDialog.addEventListener('close', () => {
  if (!returnToForm) return;
  returnToForm = false;
  const target = lastFormFocus?.isConnected && lastFormFocus.getClientRects().length
    ? lastFormFocus
    : document.querySelector('#consult-company');
  target.focus();
});

fieldIds.forEach((id) => {
  const field = document.getElementById(id);
  field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', () => {
    if (hasSubmitted) validateForm();
    else if (validatedFields.has(id)) showFieldError(field, fieldError(field));
  });
  field.addEventListener('blur', () => {
    if (field.type === 'checkbox' && !hasSubmitted) return;
    // 한 번 확인한 항목은 입력 중에도 갱신해, 다음 클릭 때 오류 영역이 사라지며 밀리지 않게 합니다.
    if (field.value.trim() || hasSubmitted || validatedFields.has(id)) {
      validatedFields.add(id);
      if (pointerIsDown) pendingBlurField = field;
      else showFieldError(field, fieldError(field));
    }
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  hasSubmitted = true;
  if (!validateForm()) {
    errorSummary.focus();
    return;
  }
  document.querySelector('#consult-complete-inspection').textContent = inspections[selectedType].name;
  document.querySelector('#consult-complete-email').textContent = document.querySelector('#consult-email').value.trim();
  openDialog(completeDialog, document.querySelector('#consult-submit'));
});

// 완료 안내를 닫으면 새 시연을 시작합니다. 준비·개인정보 안내에서는 입력을 유지합니다.
// form.reset()만으로는 별도로 관리하는 오류 상태가 지워지지 않아 함께 정리합니다.
completeDialog.addEventListener('close', () => {
  hasSubmitted = false;
  validatedFields.clear();
  pendingBlurField = null;
  pointerIsDown = false;
  form.reset();
  fieldIds.forEach(id => showFieldError(document.getElementById(id), ''));
  errorList.replaceChildren();
  errorSummary.hidden = true;
  document.querySelector('#consult-complete-email').textContent = '';
  lastFormFocus = document.querySelector('#consult-company');
  lastFormFocus.focus();
});

renderSelection();
new ResizeObserver(sizeMarker).observe(product);
setupDialogs();
// JavaScript 없이 보이는 버튼은 비활성 상태로 두고, 시연 준비가 끝나면 활성화합니다.
[changeButton, privacyButton, document.querySelector('#consult-submit')].forEach(button => {
  button.disabled = false;
});
