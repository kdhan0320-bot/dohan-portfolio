// 원본은 assets/figma에 보존하고, 화면에 사용할 이미지 후보만 바꿉니다.
// 같은 제품의 전체·확대 사진은 같은 후보를 요청해 브라우저 캐시를 공유합니다.
const optimized = 'assets/optimized/';
const webp = (name, widths) => ({
  src: `${optimized}${name}-${widths.at(-1)}.webp`,
  srcset: widths.map(width => `${optimized}${name}-${width}.webp ${width}w`).join(', '),
});
const sources = {
  '451-1002-img6.png': { src: `${optimized}scratch-original.jpg` },
  '451-1181-img6.png': { src: `${optimized}missing-original.jpg` },
  '451-1360-img6.png': webp('print', [480, 800, 1280, 1448]),
  '451-1002-img8.png': webp('inspection-scratch-banner', [480, 800, 1280, 1920]),
  '451-1181-img8.png': webp('inspection-missing-banner', [480, 800, 1280, 1920]),
  '451-1360-img8.png': webp('inspection-print-banner', [480, 800, 1280, 1920]),
};

export function setResponsiveImage(image, source, sizes) {
  const candidate = sources[source.split('/').at(-1)] || { src: source };
  if (sizes) image.sizes = sizes;
  if (candidate.srcset) image.srcset = candidate.srcset;
  else image.removeAttribute('srcset');
  image.src = candidate.src;
  image.decoding = 'async';
}
