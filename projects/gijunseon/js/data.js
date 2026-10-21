// 검사 선택은 URL로만 전달합니다. 개인정보나 선택값을 저장하지 않습니다.
const asset = (name) => `assets/figma/${name}`;
export const inspections = {
  scratch: {
    name: '표면 흠집', title: '표면 흠집 검사', feature: '선형 흠집',
    image: asset('451-1002-img6.png'), mark: asset('451-1002-img7.svg'), cardMark: asset('home-img29.svg'), banner: asset('451-1002-img8.png'), accent: '#b94f35', tint: '#f4e7e0',
    details: {
      target: '가공 후 금속 부품 표면의 선형 흠집을 살펴보는 예시입니다.',
      point: '표시 영역에서 가늘게 이어진 흠집의 위치와 형태를 확인해 보세요.',
      preparation: '제품 전체·흠집 부위 사진과 정상·불량으로 구분한 샘플을 준비해 주세요.',
    },
  },
  missing: {
    name: '부품 누락', title: '부품 누락 검사', feature: '부품 누락',
    image: asset('451-1181-img6.png'), mark: asset('451-1181-img7.svg'), cardMark: asset('home-img31.svg'), banner: asset('451-1181-img8.png'), accent: '#39756b', tint: '#e7f0ed',
    details: {
      target: '조립 후 나사 등 체결 부품이 빠진 위치를 살펴보는 예시입니다.',
      point: '오른쪽 위의 빈 체결 위치를 다른 나사가 장착된 위치와 비교해 보세요.',
      preparation: '조립 완료 상태의 사진과 필요한 부품의 종류·개수·위치를 정리해 주세요.',
      preparationMobile: '조립 완료 사진과 필요한 부품의 종류·개수·위치를 정리해 주세요.',
    },
  },
  print: {
    name: '인쇄 상태', title: '인쇄 상태 검사', feature: '인쇄 끊김',
    image: asset('451-1360-img6.png'), mark: asset('451-1360-img7.svg'), cardMark: asset('home-img33.svg'), banner: asset('451-1360-img8.png'), accent: '#946515', tint: '#f6eeda',
    details: {
      target: '출하 전 포장 라벨에 나타난 인쇄선 끊김을 살펴보는 예시입니다.',
      point: '확대 영역의 끊긴 선을 주변 인쇄선과 비교해 보세요. 이 예시는 바코드 판독 결과를 보여주지 않습니다.',
      preparation: '정상 인쇄 예시와 문제가 있는 라벨 사진, 확인할 문자·코드 영역을 준비해 주세요.',
    },
  },
};
