import './common.js';

// 솔루션 소개·도입 과정과 이동 링크는 HTML로 제공해 JavaScript 없이도 읽을 수 있습니다.
// 카드가 줄어들어도 검사 표시가 사진의 동일 위치·비율을 유지합니다.
const observer = new ResizeObserver(entries => {
  entries.forEach(({ target, contentRect }) => {
    target.querySelector('.card-mark').style.transform = `scale(${contentRect.width / 410.667})`;
  });
});

document.querySelectorAll('.card-photo').forEach(photo => observer.observe(photo));
