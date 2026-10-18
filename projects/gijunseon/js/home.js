import './common.js';
// 원본 Figma의 개별 SVG를 그대로 조합합니다. 제목과 단계명은 HTML입니다.
const parts = {
  sample: [['img01',26,42],['img3',26,86],['img4',103,78],['img5',23.6,40.9],['img6',46,84],['img6',133,54],['img6',187,77],['img6',97,109],['img7',107.5,79.6],['img8',93,60]],
  camera: [['img02',42,68],['img9',90,10],['img10',90,0],['img11',107,54],['img12',121,71],['img13',58.7,108.2],['img14',26,147],['img15',98,17],['img16',139,17]],
  installation: [['img03',12,132],['img17',29,136],['img18',118,11.5],['img19',95,21],['img20',105,55],['img21',65,71],['img22',59,87],['img23',59,106],['img24',98,105],['img25',77,92],['img16',127,29]],
};
document.querySelectorAll('[data-step-art]').forEach(el => { el.innerHTML = parts[el.dataset.stepArt].map(([file,x,y]) => `<img src="assets/figma/home-${file}.svg" alt="" style="left:${x}px;top:${y}px">`).join(''); });
// 카드가 줄어들어도 검사 표시가 사진의 동일 위치·비율을 유지합니다.
const observer = new ResizeObserver(entries => entries.forEach(({target,contentRect}) => {target.querySelector('.card-mark').style.transform=`scale(${contentRect.width/410.667})`;}));
document.querySelectorAll('.card-photo').forEach(el=>observer.observe(el));
