import './common.js';
// 도입 과정 도식은 HTML의 SVG 이미지로 표시하므로 JavaScript 없이도 보입니다.
// 카드가 줄어들어도 검사 표시가 사진의 동일 위치·비율을 유지합니다.
const observer = new ResizeObserver(entries => entries.forEach(({target,contentRect}) => {target.querySelector('.card-mark').style.transform=`scale(${contentRect.width/410.667})`;}));
document.querySelectorAll('.card-photo').forEach(el=>observer.observe(el));
