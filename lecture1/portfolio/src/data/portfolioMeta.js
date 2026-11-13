/* 메인과 프로젝트 상세의 공개 문구. 경로는 public 기준이며 Node에서도 읽을 수 있다. */
import { fallbackProjects } from './projectsFallbackData.js';

export const NAME = '김도한';
export const HERO_BADGE = `${NAME} | 웹·UI 디자인`;
export const HERO_EYEBROW = 'DOHAN KIM · SELECTED WORK';
export const HERO_HEADLINE_LINES = ['김도한.'];
export const HERO_DESCRIPTION_LINES = [
  '자동화설비회사에서 구매관리·총무를 담당했습니다.',
  '업무 UI 디자인과 반응형 웹 작업을 소개합니다.',
];
export const POSITIONING_PREFIX = '복잡한 정보를,';
export const POSITIONING_EMPHASIS = '명확한';
export const POSITIONING_SUFFIX = '화면으로.';
export const POSITIONING_LINE = `${POSITIONING_PREFIX} ${POSITIONING_EMPHASIS} ${POSITIONING_SUFFIX}`;
export const SUB_DESCRIPTION = '김도한은 주제와 요구사항, 개선 피드백과 방향 선택을 맡고 AI와 디자인·구현을 협업했습니다. 프로젝트별 작업 범위와 실제 결과물을 구분해 소개합니다.';
export const APPLICATION_FOCUS = ['웹·UI 디자인', '웹퍼블리싱 학습'];
export const TOOL_LINE = 'Figma · AI 협업 웹 제작';
export const LIVE_SITE_URL = 'https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/';
export const PROJECT_GITHUB_URL = 'https://github.com/kdhan0320-bot/dohan-portfolio/tree/main/lecture1/portfolio';

const media = (src, alt, aspectRatio, extra = {}) => ({
  src, alt, aspectRatio, objectFit: 'contain', objectPosition: 'top', ...extra,
});
const evidence = (title, choice, reason, detailMedia, comparison) => ({
  title,
  summary: [choice, reason].filter(Boolean).join(' '),
  ...(detailMedia ? { media: detailMedia } : {}),
  ...(comparison ? { comparison } : {}),
});
function detail(id, image, decisions, scope, { contribution, ...extra } = {}) {
  const project = fallbackProjects.find((item) => item.id === id);
  return {
    openingFacts: true,
    imageFirst: true,
    meta: {
      type: project.productionLabel || (project.is_figma_project ? 'Figma 디자인' : '웹 구현'),
      role: project.role,
      tools: project.tools.join(' · '),
      data: project.cardScope,
    },
    hero: {
      summary: project.overview,
      media: [image],
      mediaLabel: image.label || (project.is_figma_project && !project.liveUrl ? '현재 Figma 디자인 · 정적 예시' : '실제 웹 화면 · 포트폴리오용 예시'),
    },
    context: { problem: project.problem, goal: project.goal },
    decisions,
    mainScreens: [],
    responsiveCards: [],
    scopeLabels: { actual: '제작 범위', demoStatic: '예시와 데이터', notIncluded: '포함하지 않은 범위' },
    scope,
    aiCollaboration: [
      { label: '김도한', value: contribution || '주제·요구사항 · 개선 피드백 · 방향 선택 · 공개 판단' },
      { label: 'AI 협업', value: project.is_figma_project ? '디자인 제안 · 화면 편집 · 검토' : '디자인 제안 · 그래픽 제작 · 코드 작성·검사' },
    ],
    resultLimit: { done: project.result, limit: project.limitation },
    ...extra,
  };
}

const cinemaHome = media('detail/current/jansang-hero-1440-20261112.png', '바다가 내려다보이는 길에서 자전거를 탄 두 친구가 마주 보는 ‘파란 오후’ 표지', '1425 / 476', {
  mobile: { src: 'detail/current/jansang-hero-390-20261112.png', aspectRatio: '375 / 337', label: '모바일 홈 표지 · 파란 오후' },
});
const cinemaExhibition = media('detail/current/jansang-v63-exhibit-1440.webp', '두 개의 주제로 네 작품을 묶은 마음을 건네는 방식 기획전', '1918 / 1172', {
  mobile: { src: 'detail/current/jansang-v63-exhibit-390.webp', aspectRatio: '688 / 622', label: '모바일 기획전 발췌 · 마지막 두 작품' },
});

export const PROJECT_DETAIL_READY = {
  jobflow: detail(
    'jobflow',
    media('detail/current/galpirok-home-1440-20261112.jpg', '갈피록 서비스 소개 — 입사지원 현황과 샘플 기록 미리보기', '1440 / 1000', { mobile: { src: 'detail/current/galpirok-home-390-20261112.jpg', aspectRatio: '390 / 844', label: '갈피록 현재 모바일 첫 화면 · 390px 브라우저' } }),
    [
      evidence('회사·상태·마감을 하나의 기록으로.', '회사 이니셜은 색인, 단계 탭은 지원 상태, 날짜 표식은 마감을 나타냅니다.', '회사별로 다음에 준비할 일을 함께 읽도록 묶었습니다.', media('detail/current/galpirok-records-1440-20261112.jpg', '갈피록의 지원 관리 — 회사 기록과 단계 탭', '1440 / 1000')),
      { title: '질문과 답변을 하나의 기록으로.', layout: 'wide', summary: '면접 질문 목록에서 연습할 질문을 고르면 회사·주제·답변을 함께 읽습니다. 현재 버전의 ‘기록 수정’은 질문과 회사, 주제와 답변을 함께 다듬는 진입점입니다.', media: media('detail/current/galpirok-interview-1440-20261112.jpg', '갈피록 면접 — 질문 목록과 선택한 질문·답변, 기록 수정', '1440 / 1000'), mediaLabel: '현재 공개 체험 · 가상 면접 기록' },
    ],
    { actual: ['회사별 지원 기록·단계·날짜·준비 항목', '면접 질문·답변과 통합 기록 편집', '반응형 웹과 샘플 체험'], demoStatic: ['2026.09.27 기준 가상 회사 샘플', '체험 편집은 탭 메모리 · 새로고침하면 초기화'], notIncluded: ['외부 채용 API·실시간 알림·제품 내 AI 생성', '실제 계정 인증·DB 저장 유지의 이번 개편 검증', '사용자 조사·채용 성과 측정'] },
    { presentation: 'focused-decisions', decisionsTitle: '기록의 모양과 읽는 순서를 함께.',
      context: { summary: '여러 회사의 지원 상태와 날짜, 준비할 일이 흩어지는 상황을 가정했습니다. 김도한의 기록·조작 우선 요청을 AI와 구체적인 화면으로 옮겼습니다.' },
      aiCollaboration: [
        { label: '김도한', value: '서비스 목적·우선순위, 기록·조작 우선 요청, 가독성·배치 피드백과 방향 선택' },
        { label: 'AI 협업', value: '구체적인 시각 체계·화면 제안, 코드 작성·수정, 검사와 화면 캡처' },
      ],
      scopeSummary: [
        { title: '제작과 데이터', text: '공개 체험은 가상 회사 데이터이며 편집 내용은 새로고침하면 초기화됩니다. 작성 요청문 도구는 로컬 템플릿으로, AI 모델을 호출하지 않습니다.' },
        { title: '확인 범위', text: '실제 계정 인증·DB 저장 유지와 채용 효과는 이 사례에서 검증하지 않았습니다.' },
      ], resultLimit: {},
    },
  ),
  seolbiit: detail(
    'seolbiit',
    media('detail/current/seolbigyeol-home-20261112.png', '설비결 작업 현황에 표시된 정비 요청과 담당자 배정', '1440 / 1080', {
      label: '설비결 Figma 시안 · 정비 작업 현황',
    }),
    [],
    { actual: ['작업 현황과 정비 운영 UI', 'Figma 화면 디자인'], demoStatic: ['가상 설비·작업·담당자', '화면 구성용 상태와 수치'], notIncluded: ['실제 서비스 코드·서버', '센서 연동·현장 사용자 조사'] },
    {
      imageFirst: true,
      creditsOnCover: true,
      hero: { summary: '가상 정비 요청으로 담당자 선택·저장·재시도·목록 복귀를 보여주는 Figma 시안입니다.' },
      scopeSummary: [
        { title: '작품 범위', text: '작업 현황·담당자 배정 흐름의 Figma 시안입니다. 390px·320px 화면과 저장·오류·목록 복귀 상태를 담았습니다.' },
        { title: '시연 범위', text: '설비·담당자·직무는 가상 예시이며, 증상에 따른 담당자 적합성을 검증하지 않았습니다. 실제 배정 저장·센서·서버 연동·현장 사용자 조사는 포함하지 않습니다.' },
      ],
      aiCollaboration: [
        { label: '김도한', value: '설비 점검 요구사항 제시, 담당자·기한·배정 상태를 먼저 확인하도록 요청' },
        { label: 'AI 협업', value: 'Figma 화면 구성 제안·편집과 검토' },
      ],
    },
  ),
  'ott-service': detail(
    'ott-service',
    cinemaHome,
    [
      {
        title: '‘파란 오후’ 한 편으로 여는 홈',
        evidence: [
          { label: '김도한의 판단', text: '두 영화가 별도 배너처럼 보여, 홈은 ‘파란 오후’ 한 편에 집중하도록 선택했습니다.' },
          { label: '기획전과의 차이', text: '두 장면을 나란히 싣는 구성은 함께 고른 이유를 설명할 수 있는 기획전에 남겼습니다.' },
        ],
      },
      { title: '두 편씩 묶어 읽는 기획전', layout: 'wide', summary: 'PC에서는 네 작품을 두 쌍으로 묶어 보여줍니다. 그중 연주와 바통을 건네는 두 장면은 ‘마지막에 건네는 마음’으로 연결했습니다.', media: cinemaExhibition, mediaLabel: '기획전 · 마음을 건네는 방식' },
      {
        title: '메모는 읽기부터, 수정은 선택해서',
        evidence: [
          { label: '김도한의 요청', text: '저장한 메모를 먼저 읽고 수정은 따로 선택하도록 요청했습니다.' },
          { label: 'AI와 구체화한 배치', text: 'PC에서 메모가 있는 작품은 한 줄, 없는 이웃 작품은 두 편씩 배치해 목록 순서를 유지했습니다.' },
        ],
        sequence: [
          media('detail/current/jansang-note-read-v73-1440.webp', '저장된 메모를 읽고 메모 수정 버튼을 눌러 편집하는 작품 상세', '961 / 720', {
            label: '작품 상세 · 저장한 메모 읽기',
            mobile: { src: 'detail/current/jansang-note-read-v73-390.webp', aspectRatio: '320 / 254', label: '모바일 상세 발췌 · 저장본과 메모 수정 버튼' },
          }),
          media('detail/current/jansang-library-v73-1440.webp', '메모 없는 두 작품과 메모를 남긴 작품이 함께 있는 보관함', '1080 / 611', {
            label: 'PC 보관함 · 메모 유무에 따른 카드 배치',
            mobile: { src: 'detail/current/jansang-library-v73-390.webp', aspectRatio: '350 / 904', label: '모바일 보관함 · 예시 메모를 함께 읽는 목록' },
          }),
        ],
      },
    ],
    { actual: ['HTML·CSS·JavaScript 반응형 웹', '분위기·러닝타임·검색·정렬·작품 상세', '기획전 3개·찜·관심 메모·보관함'], demoStatic: ['가상 단편영화 12편과 AI 생성 이미지', '찜·메모는 해당 브라우저 localStorage 저장'], notIncluded: ['실제 영상 재생·예매·결제', '계정·외부 API·서버 저장'] },
    { imageFirst: true, creditsOnCover: true, presentation: 'focused-decisions', decisionsTitle: '표지에서 기획전, 보관함까지',
      context: { summary: '제목을 정하지 않고 분위기와 남은 시간으로 영화를 고르는 상황을 가정했습니다. 김도한은 홈의 두 조건을 한 버튼 안에서 함께 선택하도록 요청했습니다.', goal: '모바일에서 이미지가 먼저 보이게 하고, 상단 영화 찾기는 홈의 선택 조건을 이어받지 않고 전체 작품에서 새로 검색하도록 정했습니다.' },
      hero: { summary: '분위기와 러닝타임으로 가상 단편영화 12편을 찾고, 마음에 남은 작품과 메모를 모으는 반응형 웹입니다.', media: [cinemaHome], mediaLabel: 'PC 홈 표지 · 파란 오후' },
      aiCollaboration: [
        { label: '김도한', value: '편집 방향·단독 표지·필터 통합·메모 읽기 흐름 결정' },
        { label: 'AI 협업', value: '장면 선정·글·이미지 제작, UI 설계·구현·검사' },
      ],
      scopeSummary: [
        { title: '콘텐츠와 저장', text: '가상 단편영화 12편과 AI 생성 이미지입니다. 찜·메모·보기 설정은 브라우저에 저장하며, 영상 재생·예매·서버 저장은 포함하지 않습니다.' },
        { title: '확인과 한계', text: '실제 이용자 사용성 조사와 모바일 실기기 검증은 진행하지 않았습니다.' },
      ], resultLimit: {},
    },
  ),
  gijunseon: detail(
    'gijunseon',
    media('detail/current/gijunseon-hero-1440-20261112.png', '기준선 첫 화면 — 산업용 카메라와 비전 검사 소개', '1440 / 560', {
      label: '기준선 공개 웹 · 첫 화면',
      mobile: { src: 'detail/current/gijunseon-hero-390-20261112.png', aspectRatio: '390 / 567', label: '기준선 공개 웹 · 모바일 첫 화면' },
    }),
    [
      evidence('검사 사례를 먼저, 도입 절차를 다음에.', '흠집·부품 누락·바코드 사례로 검사 대상을 보여준 뒤 적용 공정·도입 절차·상담으로 이어집니다.', '아래 공개 화면에서 검사 대상을 본 뒤 도입 검토로 이어지는 순서를 확인할 수 있습니다.', media('detail/current/gijunseon-sequence-1440-20261113.png', '기준선 공개 웹의 결함 예시 세 가지와 그 아래 도입 검토 세 단계', '1440 / 1100', { mobile: { src: 'detail/current/gijunseon-intro-390.webp', aspectRatio: '780 / 522', label: '모바일 도입 검토 과정 · 공개 웹 발췌' } })),
    ],
    {
      actual: ['Figma 디자인과 HTML·CSS·JavaScript 웹 구현', '검사 예시·적용 공정·도입 절차·상담 화면', '반응형 구성과 브라우저 내 입력 검증'],
      demoStatic: ['가상 기업 소개와 검사 예시 · AI 이미지 포함', '상담 입력·검사 선택 시연'],
      notIncluded: ['실제 검사·납품 실적', '상담 전송·메일·DB 저장', '사용자 조사·성과 측정'],
    },
    { imageFirst: true, scopeSummary: [
      { title: '제작', text: 'Figma 디자인과 반응형 웹. 검사 예시·적용 공정·도입 절차·상담 입력 시연을 포함합니다.' },
      { title: '예시와 한계', text: 'AI 이미지를 포함한 가상 기업입니다. 실제 검사 실적·상담 전송·DB 저장·사용자 조사 결과는 없습니다.' },
    ], aiCollaboration: [
      { label: '김도한', value: '원본 Figma 작품·요구 범위 제시, 디자인 방향 선택, 수정 결과 확인' },
      { label: 'AI 협업', value: 'HTML·CSS·JavaScript 작성, 반응형·접근성 보완, 도식 정리와 검수' },
    ] },
  ),
  'feedback-hub': {
    role: '구매관리·총무 경험에서 주제를 선택하고, 웹앱의 요구사항 제시와 제안 검토·방향 선택을 맡았습니다.',
    aiCollaboration: [
      { label: '김도한', value: '주제·요구사항 제시, 제안 검토·방향 선택' },
      { label: 'AI 협업', value: '시연 구조·화면 제안, 코드 작성·검사' },
    ],
    // 날짜는 싣지 않는다 — 품의선 샘플은 방문 시점 기준 상대 날짜(ago())로 매번
    // 다시 계산되므로, 여기 고정 날짜를 적으면 실제 공개 앱과 반드시 어긋난다.
    history: [
      { type: '입고', amount: '+3개', party: '한결센서', record: 'RC-0001' },
      { type: '지급', amount: '−2개', party: '설비보전팀', record: 'IS-0001' },
    ],
    historyPath: '#/materials/MT-0001#movement-history',
  },
  'bus-arrival': detail(
    'bus-arrival-app',
    media('detail/current/onjeongryu-home-20261112.png', '온정류 — 즐겨찾는 노선의 방향과 도착 시간', '390 / 844', { frameWidth: 390 }),
    [
      evidence('노선·방향·시간을 한눈에.', '자주 타는 버스를 먼저 두고 남은 분과 ‘곧 도착’을 글자로 구분했습니다.', '도착 상태를 색에만 의존하지 않도록 했습니다.', media('detail/current/onjeongryu-home-20261112.png', '온정류 홈의 노선 번호와 도착 시간 확대', '390 / 844', { frameWidth: 390, crop: { x: 20, y: 280, width: 350, height: 76 } })),
      evidence('숫자 다음에는 버스의 위치.', '현재 위치·다음 정류장·탑승할 정류장을 단계로 연결해 어디까지 왔는지 보여줍니다.', '', media('detail/current/onjeongryu-busdetail-20261107.png', '온정류 버스 상세 — 공업탑에서 시청앞까지 정류장 진행 표시', '390 / 844', { frameWidth: 390 })),
      evidence('정보를 못 받으면 다시 시도.', '도착 정보 오류에 원인 안내와 재시도 버튼을 함께 두었습니다.', '검색 결과·저장 항목이 없는 상태도 별도 시안에 포함합니다.', media('detail/current/onjeongryu-emptystate-20261107.png', '온정류 홈 — 도착 정보를 불러오지 못했을 때의 안내와 다시 시도 버튼', '390 / 844', { frameWidth: 390 })),
    ],
    {
      actual: ['모바일 정보 위계', '도착 정보와 탐색 화면 디자인', '빈 상태·오류 상태 화면'],
      demoStatic: ['정적 노선·방향·도착 예시', 'Figma 화면 시안'],
      notIncluded: ['실시간 버스 API·차량 위치', 'Push·계정·앱 코드', '실제 운행 안내·사용성 검증'],
    },
    { responsiveNotApplicable: true, contribution: '버스 도착 정보 요구사항 제시', scopeSummary: [
      { title: '제작', text: 'Figma 모바일 디자인. 도착·탐색·빈 상태·오류 화면을 포함합니다.' },
      { title: '예시와 한계', text: '정적 노선·도착 예시입니다. 실시간 API·위치·알림·앱 코드와 사용성 검증은 포함하지 않습니다.' },
    ] },
  ),
  brewstep: detail(
    'brewstep',
    media('detail/current/soyobit-home-20261112.png', '소요빛 — 카페 대표 음료와 추천 메뉴', '390 / 844', { frameWidth: 390 }),
    [
      evidence('사진에서 메뉴와 가격으로.', '음료 사진 가까이에 맛·이름·가격을 묶고, 하단 메뉴의 위치를 유지했습니다.', '브랜드 분위기를 본 뒤 메뉴 탐색으로 이어지는 구성입니다.', media('detail/current/soyobit-menu-20261112.png', '소요빛 메뉴 — 음료 목록과 카테고리, 하단 탐색', '390 / 844', { frameWidth: 390 })),
    ],
    {
      actual: ['카페의 모바일 시각 체계', '홈·메뉴·즐겨찾기·소식·마이 전체 화면 디자인', '리워드 스탬프·쿠폰·매장 정보 구성'],
      demoStatic: ['음료·가격·프로모션 예시', '현재 Figma 화면 시안'],
      notIncluded: ['실제 주문·결제·재고 연동', '앱 코드 구현', '사용자 조사'],
    },
    { responsiveNotApplicable: true, contribution: '카페 모바일 시안 방향 선택', scopeSummary: [
      { title: '제작', text: 'Figma 모바일 디자인. 홈·메뉴·즐겨찾기·소식·마이와 리워드·매장 정보를 구성했습니다.' },
      { title: '예시와 한계', text: '음료·가격은 예시입니다. 실제 주문·결제·재고 연동, 앱 코드와 사용자 조사는 포함하지 않습니다.' },
    ] },
  ),
};
