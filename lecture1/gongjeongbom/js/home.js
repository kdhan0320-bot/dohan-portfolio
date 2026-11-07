import "./common.js?v=20261108b";

const field = document.querySelector(".inspection-field");
const result = document.querySelector(".sample-result");
document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => {
    const missing = button.dataset.sample === "missing";
    document.querySelectorAll("[data-sample]").forEach((control) =>
      control.setAttribute("aria-pressed", String(control === button)));
    field.classList.toggle("is-missing", missing);
    field.setAttribute("aria-label", missing
      ? "4개 위치 중 오른쪽 끝 커넥터 1개가 누락된 가상 검사 도식"
      : "4개 위치에 커넥터가 모두 있는 정상 가상 검사 도식");
    result.classList.toggle("is-normal", !missing);
    result.querySelector(".sample-result__status").textContent = missing ? "누락 발견" : "정상 확인";
    result.querySelector(".sample-result__count").textContent = missing ? "3 / 4" : "4 / 4";
    result.querySelector(".sample-result__description").textContent = missing
      ? "오른쪽 끝 부품을 확인하세요." : "네 위치의 부품이 모두 있습니다.";
  });
});
