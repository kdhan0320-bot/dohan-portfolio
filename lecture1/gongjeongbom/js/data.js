export const PRODUCT_TYPES = {
  "vision-sensor": "비전 센서",
  "vision-system": "비전 시스템",
  "code-reader": "코드 판독기",
};

export const PROBLEM_LABELS = {
  assembly: "누락·오조립",
  surface: "외관 결함",
  dimension: "치수·위치",
  code: "코드·문자",
};

export const products = [
  {
    id: "vs-c100",
    model: "VS-C100",
    type: "vision-sensor",
    name: "내장 조명형 비전 센서",
    summary: "한 위치의 유무와 방향을 빠르게 확인하는 일체형 센서",
    fit: "단일 위치 누락 검사 · 간단한 설비 연동",
    problems: ["assembly", "surface"],
    level: "basic",
    connections: ["built-in", "ethernet"],
    camera: "내장 1대",
    flow: "한 위치 중심",
    complexity: "낮음",
    expandability: "제한적",
    chips: ["내장 카메라", "간편 설정", "이더넷"],
    detail: {
      title: "한 위치의 유무와 방향을 확인하는 일체형 비전 센서",
      summary: "내장 카메라와 조명으로 한 위치의 단순 누락·방향·유무를 확인하고 기본 판정 결과를 설비에 연결할 때 적합합니다.",
      fitConditions: [
        "한 위치에서 부품의 누락·방향·유무를 확인해야 함",
        "카메라와 조명이 내장된 단순한 구성이 필요함",
        "기본 판정 결과를 설비에 연결해야 함",
      ],
      alternatives: [
        "소형 외관이나 위치를 더 정밀하게 확인 → VS-C300",
        "외부 카메라와 기존 설비 통합이 필요 → MV-X300",
        "코드 판독이 중심 → CR-L100 또는 CR-L300",
      ],
      roles: [
        { title: "대상 감지", description: "내장 카메라로 한 위치의 유무와 방향을 확인합니다." },
        { title: "기본 판정", description: "단순 누락·방향 조건에 따라 판정 결과를 정리합니다." },
        { title: "설비 연결", description: "기본 판정 결과를 이더넷으로 설비에 전달합니다." },
      ],
      visual: { kind: "family", description: "VS-C100 내장 카메라형 비전 센서 구성 도식" },
      relatedDescription: "검사 정밀도와 적용 범위가 다른 비전 센서를 함께 확인하세요.",
    },
  },
  {
    id: "vs-c300",
    model: "VS-C300",
    type: "vision-sensor",
    name: "고해상도 비전 센서",
    summary: "소형 부품의 외관과 위치를 정밀하게 확인하는 비전 센서",
    fit: "소형 외관 결함 · 정밀 위치 확인",
    problems: ["surface", "dimension"],
    level: "precision",
    connections: ["built-in", "data"],
    camera: "내장 1대",
    flow: "한 위치 정밀",
    complexity: "중간",
    expandability: "제한적",
    chips: ["고해상도", "정밀 위치", "결과 출력"],
    detail: {
      title: "한 위치의 소형 외관과 위치를 정밀하게 확인하는 비전 센서",
      summary: "내장 카메라로 소형 부품의 외관과 위치를 한 곳에서 정밀하게 확인하고 결과를 출력할 때 적합합니다.",
      fitConditions: [
        "한 위치의 소형 외관 결함을 확인해야 함",
        "부품의 위치를 더 정밀하게 확인해야 함",
        "일체형 구성에서 검사 결과를 출력해야 함",
      ],
      alternatives: [
        "단순 누락·방향 확인과 낮은 설치 부담이 우선 → VS-C100",
        "두 검사 위치를 연결해야 함 → MV-X500",
        "여러 위치와 다중 흐름이 필요 → MV-X700",
      ],
      roles: [
        { title: "정밀 촬영", description: "내장 카메라로 한 위치의 소형 부품을 확인합니다." },
        { title: "외관·위치 판정", description: "외관 상태와 위치 조건을 기준으로 판정을 정리합니다." },
        { title: "결과 출력", description: "검사 결과를 설비나 다음 공정에서 사용할 수 있게 전달합니다." },
      ],
      visual: { kind: "family", description: "VS-C300 고해상도 비전 센서 구성 도식" },
      relatedDescription: "설치 부담과 정밀도 범위가 다른 비전 센서를 함께 확인하세요.",
    },
  },
  {
    id: "mv-x300",
    model: "MV-X300",
    type: "vision-system",
    name: "단일 카메라 기반 확장형 비전 시스템",
    summary: "한 공정의 정밀 검사를 유연하게 구성하는 기본 확장형 시스템",
    fit: "단일 정밀 검사 · 기존 설비 통합",
    problems: ["assembly", "surface", "dimension"],
    level: "multiple",
    connections: ["external-light", "ethernet", "data"],
    camera: "최대 1대",
    flow: "한 위치 중심",
    complexity: "중간",
    expandability: "기본",
    resultData: "기본 판정",
    chips: ["외부 카메라 최대 1대", "정밀 검사", "기본 확장"],
    detail: {
      title: "한 위치의 정밀 검사를 구성하는 기본 확장형 비전 시스템",
      summary: "외부 카메라 최대 1대로 한 위치의 정밀 검사를 구성하고 기존 설비와 연결할 때 적합합니다.",
      fitConditions: [
        "외부 카메라로 한 위치를 정밀하게 검사해야 함",
        "기존 설비와 검사 결과를 연결해야 함",
        "한 공정에서 기본 확장 가능성을 남겨야 함",
      ],
      alternatives: [
        "내장형으로 단순 누락·방향만 확인 → VS-C100",
        "두 검사 위치를 연결 → MV-X500",
        "여러 위치와 높은 확장이 필요 → MV-X700",
      ],
      roles: [
        { title: "검사 입력", description: "외부 카메라 최대 1대의 이미지를 받아 한 위치를 확인합니다." },
        { title: "정밀 판정", description: "외관·위치 등 필요한 검사 항목을 한 흐름으로 처리합니다." },
        { title: "설비 통합", description: "기본 판정 결과를 기존 설비와 연결합니다." },
      ],
      visual: { kind: "model", description: "MV-X300 외부 카메라 1대 연결 구성 도식" },
      relatedDescription: "검사 위치 수와 확장 범위가 다른 비전 시스템을 함께 확인하세요.",
    },
  },
  {
    id: "mv-x500",
    model: "MV-X500",
    type: "vision-system",
    name: "최대 2대 카메라와 복합 검사를 지원하는 중급 비전 시스템",
    summary: "여러 검사 위치를 연결하는 중급 비전 시스템",
    fit: "두 검사 위치 연계 · 복합 검사",
    problems: ["assembly", "surface", "dimension"],
    level: "multiple",
    connections: ["external-light", "ethernet", "data"],
    camera: "최대 2대",
    flow: "두 위치 연계",
    complexity: "중간~높음",
    expandability: "중간",
    resultData: "판정과 검사 데이터",
    chips: ["카메라 최대 2대", "데이터 출력", "추가 가능"],
    detail: {
      title: "두 검사 위치를 연결하는 중급 비전 시스템",
      summary: "최대 2대 카메라로 두 검사 위치를 연결하고 복합 검사와 데이터 출력을 구성할 때 적합합니다.",
      fitConditions: [
        "두 검사 위치를 함께 확인해야 함",
        "한 공정에서 여러 검사 항목을 처리해야 함",
        "판정과 검사 데이터를 설비나 시스템으로 보내야 함",
      ],
      alternatives: [
        "한 위치의 기본 확장형 검사가 필요 → MV-X300",
        "세 곳 이상 또는 다면 검사와 높은 확장이 필요 → MV-X700",
        "코드·문자 판독이 중심 → CR-L100 또는 CR-L300",
      ],
      roles: [
        { title: "검사 입력", description: "최대 2대 카메라의 이미지를 받아 두 위치를 연결합니다." },
        { title: "복합 판정", description: "여러 검사 항목을 순서에 맞춰 처리하고 결과를 정리합니다." },
        { title: "결과 연결", description: "판정 결과와 검사 데이터를 설비나 상위 시스템으로 전달합니다." },
      ],
      visual: { kind: "model", description: "MV-X500 카메라 최대 2대 연결 구성 도식" },
      relatedDescription: "검사 위치와 확장 범위가 다른 비전 시스템을 함께 확인하세요.",
    },
  },
  {
    id: "mv-x700",
    model: "MV-X700",
    type: "vision-system",
    name: "여러 위치와 복합한 검사 흐름을 처리하는 상위 시스템",
    summary: "최대 4대 카메라와 복잡한 검사 흐름 지원",
    fit: "다면·다공정 검사 · 높은 확장",
    problems: ["assembly", "surface", "dimension", "code"],
    level: "precision",
    connections: ["external-light", "ethernet", "data"],
    camera: "최대 4대",
    flow: "다중 위치·다중 흐름",
    complexity: "높음",
    expandability: "높음",
    resultData: "확장 데이터와 외부 연동",
    chips: ["카메라 최대 4대", "다중 흐름", "높은 확장"],
    detail: {
      title: "여러 위치와 다중 검사 흐름을 처리하는 상위 비전 시스템",
      summary: "최대 4대 카메라로 여러 위치와 다중 검사 흐름을 구성하고 이후 확장까지 고려할 때 적합합니다.",
      fitConditions: [
        "여러 위치나 여러 면을 함께 검사해야 함",
        "다중 검사 흐름과 외부 연동을 구성해야 함",
        "이후 검사 범위를 넓힐 가능성이 큼",
      ],
      alternatives: [
        "한 위치의 기본 확장형 검사가 필요 → MV-X300",
        "두 검사 위치와 중간 확장 범위가 적합 → MV-X500",
        "내장 카메라 한 대의 일체형 구성이 우선 → VS-C100 또는 VS-C300",
      ],
      roles: [
        { title: "다중 입력", description: "최대 4대 카메라의 이미지를 받아 여러 위치를 확인합니다." },
        { title: "흐름 처리", description: "여러 검사 항목과 공정 흐름을 연결해 판정합니다." },
        { title: "확장 연결", description: "확장 데이터와 외부 시스템 연동 범위를 구성합니다." },
      ],
      visual: { kind: "model", description: "MV-X700 카메라 최대 4대 연결 구성 도식" },
      relatedDescription: "검사 위치 수와 설치 부담이 다른 비전 시스템을 함께 확인하세요.",
    },
  },
  {
    id: "cr-l100",
    model: "CR-L100",
    type: "code-reader",
    name: "소형 라벨용 코드 판독기",
    summary: "1D·2D 코드를 빠르게 판독하는 내장 조명형 리더",
    fit: "포장 라벨 확인 · 단일 코드 판독",
    problems: ["code"],
    level: "basic",
    connections: ["built-in", "ethernet"],
    camera: "내장 리더",
    flow: "단일 코드",
    complexity: "낮음",
    expandability: "기본",
    chips: ["1D·2D", "내장 조명", "빠른 판독"],
    detail: {
      title: "포장 라벨의 단일 코드를 확인하는 내장 조명형 판독기",
      summary: "한 위치의 포장 라벨에서 1D·2D 코드를 단순하게 판독하고 결과를 연결할 때 적합합니다.",
      fitConditions: [
        "한 위치에서 포장 라벨의 코드를 확인해야 함",
        "1D·2D 단일 코드 판독이 중심임",
        "내장 조명형의 단순한 구성이 필요함",
      ],
      alternatives: [
        "고속 이송 중 코드·문자를 연속 확인 → CR-L300",
        "부품 외관이나 위치 확인이 중심 → VS-C100 또는 VS-C300",
        "여러 검사 위치를 연결해야 함 → MV-X500 또는 MV-X700",
      ],
      roles: [
        { title: "라벨 입력", description: "내장 리더로 한 위치의 포장 라벨을 확인합니다." },
        { title: "코드 판독", description: "1D·2D 단일 코드를 읽고 판독 결과를 정리합니다." },
        { title: "결과 연결", description: "판독 결과를 이더넷으로 설비에 전달합니다." },
      ],
      visual: { kind: "asset", src: "assets/graphics/code-reading.svg", description: "CR-L100 포장 라벨 1D·2D 코드 판독 도식" },
      relatedDescription: "판독 흐름과 데이터 출력 범위가 다른 코드 판독기를 함께 확인하세요.",
    },
  },
  {
    id: "cr-l300",
    model: "CR-L300",
    type: "code-reader",
    name: "고속 공정용 코드 판독기",
    summary: "이동 중인 부품의 코드와 문자를 안정적으로 확인하는 리더",
    fit: "고속 이송 · 코드와 문자 확인",
    problems: ["code", "surface"],
    level: "multiple",
    connections: ["external-light", "ethernet", "data"],
    camera: "고속 리더",
    flow: "연속 판독",
    complexity: "중간",
    expandability: "중간",
    chips: ["고속 이송", "문자 판독", "데이터 출력"],
    detail: {
      title: "고속 이송 중 코드와 문자를 연속 확인하는 판독기",
      summary: "이동 중인 부품의 코드와 문자를 연속 판독하고 결과 데이터를 출력할 때 적합합니다.",
      fitConditions: [
        "고속 이송 중 코드를 연속으로 확인해야 함",
        "코드와 문자를 함께 판독해야 함",
        "판독 결과 데이터를 외부로 보내야 함",
      ],
      alternatives: [
        "한 위치의 포장 라벨 단일 코드만 확인 → CR-L100",
        "부품 외관이나 위치 확인이 중심 → VS-C300",
        "여러 위치의 복합 검사가 필요 → MV-X500 또는 MV-X700",
      ],
      roles: [
        { title: "연속 입력", description: "이송 중인 부품의 코드와 문자를 연속으로 확인합니다." },
        { title: "코드·문자 판독", description: "코드와 문자 조건에 따라 판독 결과를 정리합니다." },
        { title: "데이터 출력", description: "판독 결과와 필요한 데이터를 외부 시스템으로 전달합니다." },
      ],
      visual: { kind: "asset", src: "assets/graphics/code-reading.svg", description: "CR-L300 고속 이송 코드·문자 연속 판독 도식" },
      relatedDescription: "판독 대상과 공정 흐름이 다른 코드 판독기를 함께 확인하세요.",
    },
  },
];

export const typeCounts = Object.fromEntries(
  Object.keys(PRODUCT_TYPES).map((type) => [
    type,
    products.filter((product) => product.type === type).length,
  ]),
);

export function getProduct(id) {
  return products.find((product) => product.id === id) || null;
}

export function getProducts(ids) {
  if (!Array.isArray(ids)) return [];
  return ids.map(getProduct).filter(Boolean).filter(
    (product, index, list) =>
      list.findIndex((candidate) => candidate.id === product.id) === index,
  );
}

export function productHref(product) {
  return `product.html?id=${encodeURIComponent(product.id)}`;
}

export function familyDiagramMarkup(type) {
  if (type === "vision-sensor") {
    return `<svg class="family-diagram" viewBox="0 0 72 52" aria-hidden="true" focusable="false">
      <rect width="72" height="52" rx="10" fill="#f3f7ff"/>
      <rect x="10" y="13" width="28" height="26" rx="7" fill="#17212b"/>
      <circle cx="24" cy="26" r="5" fill="#1647c5"/>
      <path d="M38 26H58" stroke="#20b8ac" stroke-width="2" stroke-linecap="round"/>
      <rect x="58" y="18" width="6" height="16" rx="3" fill="#d8e5ff"/>
    </svg>`;
  }
  if (type === "vision-system") {
    return `<svg class="family-diagram" viewBox="0 0 72 52" aria-hidden="true" focusable="false">
      <rect width="72" height="52" rx="10" fill="#f3f7ff"/>
      <rect x="24" y="8" width="26" height="18" rx="5" fill="#17212b"/>
      <rect x="29" y="12" width="16" height="8" rx="3" fill="#d8e5ff"/>
      <path d="M38 26V34M17 34H59" stroke="#20b8ac" stroke-width="2" stroke-linecap="round"/>
      <rect x="8" y="31" width="18" height="15" rx="4" fill="#fff" stroke="#bfcbda"/>
      <rect x="47" y="31" width="18" height="15" rx="4" fill="#fff" stroke="#bfcbda"/>
      <circle cx="17" cy="38.5" r="3" fill="#1647c5"/><circle cx="56" cy="38.5" r="3" fill="#1647c5"/>
    </svg>`;
  }
  return `<svg class="family-diagram" viewBox="0 0 72 52" aria-hidden="true" focusable="false">
    <rect width="72" height="52" rx="10" fill="#f3f7ff"/>
    <rect x="10" y="11" width="52" height="30" rx="6" fill="#fff" stroke="#bfcbda"/>
    <path d="M15 17V34M19 17V34M24 17V34M29 17V34M34 17V34M39 17V34M44 17V34M49 17V34M54 17V34" stroke="#17212b" stroke-width="1.2"/>
    <path d="M12 34H60" stroke="#20b8ac" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

export function modelDiagramMarkup(model) {
  const count = ({ "MV-X300": 1, "MV-X500": 2, "MV-X700": 4 })[model];
  if (!count) return "";
  const nodeWidth = count === 4 ? 16 : 26;
  const positions = count === 1 ? [43] : count === 2 ? [18, 70] : [6, 34, 62, 90];
  const centers = positions.map((position) => position + nodeWidth / 2);
  const busStart = centers[0];
  const busEnd = centers[centers.length - 1];
  return `<svg class="model-diagram" viewBox="0 0 112 64" data-camera-count="${count}" aria-hidden="true" focusable="false">
    <rect width="112" height="64" rx="10" fill="#f3f7ff"/>
    <rect x="39" y="7" width="34" height="22" rx="6" fill="#17212b"/>
    <rect x="45" y="12" width="22" height="10" rx="3" fill="#d8e5ff"/>
    <path d="M56 29V36M${busStart} 36H${busEnd}" stroke="#20b8ac" stroke-width="2" stroke-linecap="round"/>
    ${centers.map((center) => `<path d="M${center} 36V40" stroke="#20b8ac" stroke-width="2" stroke-linecap="round"/>`).join("")}
    ${positions.map((position) => `<g transform="translate(${position} 39)"><rect width="${nodeWidth}" height="18" rx="5" fill="#fff" stroke="#bfcbda"/><circle cx="${nodeWidth / 2}" cy="9" r="${count === 4 ? 3 : 3.5}" fill="#1647c5"/></g>`).join("")}
  </svg>`;
}
