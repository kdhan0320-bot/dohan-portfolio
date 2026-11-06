/* 메인과 프로젝트 상세의 공개 문구. 경로는 public 기준이며 Node에서도 읽을 수 있다. */
import { fallbackProjects } from './projectsFallbackData.js';

export const NAME = '김도한';
export const HERO_BADGE = `${NAME} | 웹·UI 디자인`;
export const HERO_EYEBROW = 'DOHAN KIM · SELECTED WORK';
export const HERO_HEADLINE_LINES = ['김도한.'];
export const HERO_DESCRIPTION_LINES = [
  '구매·문서·현장 업무를 경험했습니다.',
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
  evidence: [{ label: '구성', text: choice }, { label: '이유', text: reason }],
  ...(detailMedia ? { media: detailMedia } : {}),
  ...(comparison ? { comparison } : {}),
});
function detail(id, image, decisions, scope, { contribution, ...extra } = {}) {
  const project = fallbackProjects.find((item) => item.id === id);
  return {
    openingFacts: true,
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

const cinemaHome = media('detail/current/jansang-bluehour-cover-1440.webp', '바다가 내려다보이는 길에서 자전거를 탄 두 친구가 마주 보는 ‘파란 오후’ 표지', '2850 / 952', {
  mobile: { src: 'detail/current/jansang-bluehour-cover-390.webp', aspectRatio: '780 / 630', label: '모바일 홈 표지 · 파란 오후' },
});
const cinemaExhibition = media('detail/current/jansang-v63-exhibit-1440.webp', '마지막 연주와 바통을 건네는 순간을 나란히 보여주는 기획전', '1918 / 1172', {
  mobile: { src: 'detail/current/jansang-v63-exhibit-390.webp', aspectRatio: '688 / 622', label: '모바일 기획전 발췌 · 마지막 두 작품' },
});

export const PROJECT_DETAIL_READY = {
  jobflow: detail(
    'jobflow',
    media('detail/current/galpirok-home-20261105.jpg', '갈피록 현재 홈 — 회사별 기록과 지원 단계, 마감 날짜와 남은 준비', '1348 / 926', { mobile: { src: 'detail/current/galpirok-mobile-20261105.jpg', aspectRatio: '375 / 780', label: '갈피록 현재 모바일 첫 화면 · 390px iframe' } }),
    [
      evidence('갈피를 장식에서 정보의 위치로.', '회사 이니셜은 기록의 색인으로, 단계 탭은 지원 상태의 위치로, 잘린 모서리의 날짜 표식은 마감으로 사용했습니다.', '회사 이름과 직무, 날짜와 준비를 한 기록 안에서 찾을 수 있도록 구성했습니다.', media('detail/current/galpirok-home-20261105.jpg', '갈피록의 회사 기록과 단계 탭 확대', '1348 / 926', { crop: { x: 235, y: 279, width: 1048, height: 382 } })),
      { title: '질문과 답변을 하나의 기록으로.', layout: 'wide', summary: '면접 질문 목록에서 연습할 질문을 고르면 회사·주제·답변을 함께 읽습니다. 현재 버전의 ‘기록 수정’은 질문과 회사, 주제와 답변을 함께 다듬는 진입점입니다.', media: media('detail/current/galpirok-interview-20261105.jpg', '갈피록 면접 — 질문 목록과 선택한 질문·답변, 기록 수정', '1348 / 926'), mediaLabel: '현재 공개 체험 · 가상 면접 기록' },
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
        { title: '확인 범위', text: '2026.11.05 공개 웹의 홈·면접 화면을 확인해 소개를 갱신했습니다. 실제 계정 인증·DB 저장 유지, 모바일 실기기와 채용 효과는 이번 개편에서 검증하지 않았습니다.' },
      ], resultLimit: {},
    },
  ),
  seolbiit: detail(
    'seolbiit',
    media('detail/current/seolbigyeol-overview-2x.webp', '설비결 작업 현황에 표시된 정비 요청과 담당자 배정', '2880 / 2160', {
      label: '설비결 Figma 시안 · 정비 작업 현황',
    }),
    [
      evidence('상태 요약에서 필요한 작업으로.', '배정 대기·정비 중·검토 대기·당일 확인 완료를 가로로 묶고, 아래에서 처리할 요청을 보여줍니다.', '전체 상태를 먼저 훑은 뒤 개별 요청으로 시선을 옮기도록 구성했습니다.'),
      evidence('요청의 내용과 다음 행동을 가까이.', '설비 사진과 증상, 요청자·담당자·완료 기한을 함께 묶고 ‘요청 확인·배정’을 바로 아래에 배치했습니다.', '요청을 이해한 뒤 필요한 행동을 같은 영역에서 찾도록 했습니다.', media('detail/current/seolbigyeol-assignment-2x.webp', '설비결 작업 현황의 배정 대기 영역과 요청 확인 버튼', '1568 / 1040', {
        original: 'detail/current/seolbigyeol-overview-2x.webp',
        mobile: { src: 'detail/current/seolbigyeol-overview-2x.webp', aspectRatio: '2880 / 2160', label: '배정 대기 요청이 놓인 작업 현황 전체 화면' },
      })),
      evidence('검토와 진행 중인 작업을 구분.', '검토 대기 보고는 조치 내용·재확인 결과와 검토 버튼을 함께 두고, 진행 중인 정비는 별도 영역에 배치했습니다.', '보고를 확인해야 하는 작업과 아직 정비 중인 작업을 구분하려는 설계입니다.'),
    ],
    { actual: ['작업 현황과 정비 운영 UI', 'Figma 화면 디자인'], demoStatic: ['가상 설비·작업·담당자', '화면 구성용 상태와 수치'], notIncluded: ['실제 서비스 코드·서버', '센서 연동·현장 사용자 조사'] },
    {
      imageFirst: true,
      creditsOnCover: true,
      decisionsTitle: '정비 요청에서 담당자 배정까지',
      aiCollaboration: [
        { label: '김도한', value: '설비 점검 요구사항 제시, 작업 상태의 우선순위 검토' },
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
          { label: '김도한의 판단', text: '두 영화를 나란히 놓으니 오른쪽 장면이 별도 배너처럼 보였습니다. 처음 들어온 사람이 한 편에 집중할 수 있도록 ‘파란 오후’를 단독 표지로 골랐습니다.' },
          { label: '기획전에 남긴 이유', text: '기획전에서는 두 작품을 왜 함께 골랐는지 설명할 자리가 있습니다. 영화 잡지처럼 두 장면을 나란히 싣고 짧은 글로 연결하는 방식은 이곳에 남겼습니다.' },
        ],
      },
      { title: '연주와 바통을 함께 보는 이유', layout: 'wide', summary: '‘마음을 건네는 방식’의 마지막 두 편을 묶은 말은 ‘마지막에 건네는 마음’입니다. ‘옥상의 작은 밴드’에서는 연주로, ‘마지막 바통’에서는 동료에게 내미는 손으로 마음을 전합니다.', media: cinemaExhibition, mediaLabel: '기획전 · 마음을 건네는 방식' },
      {
        title: '한 편을 고른 뒤, 내 메모까지',
        summary: '‘별을 접는 아이’를 찜하면 상세에서 그 작품의 보관함 카드로 바로 갈 수 있습니다. 카드에서는 포스터와 내가 남긴 메모를 함께 읽습니다.',
        sequence: [
          media('detail/current/jansang-atlas-saved-1440.webp', '‘별을 접는 아이’를 찜한 뒤 표시되는 ‘보관함에서 보기’ 링크', '1922 / 1008', {
            label: '작품 상세 · 찜한 뒤',
            mobile: { src: 'detail/current/jansang-atlas-saved-390.webp', aspectRatio: '728 / 772', label: '모바일 작품 상세 발췌 · 찜한 뒤' },
          }),
          media('detail/current/jansang-v63-library-390.webp', '같은 영화 카드 아래에 표시된 저장 메모', '780 / 842', {
            label: '모바일 보관함 · 같은 영화에 남긴 예시 메모', frameWidth: 390,
          }),
        ],
      },
    ],
    { actual: ['HTML·CSS·JavaScript 반응형 웹', '분위기·러닝타임·검색·정렬·작품 상세', '기획전 3개·찜·관심 메모·보관함'], demoStatic: ['가상 단편영화 12편과 AI 생성 이미지', '찜·메모는 해당 브라우저 localStorage 저장'], notIncluded: ['실제 영상 재생·예매·결제', '계정·외부 API·서버 저장'] },
    { imageFirst: true, creditsOnCover: true, presentation: 'focused-decisions', decisionsTitle: '표지에서 기획전, 보관함까지',
      context: { summary: '잠깐 볼 영화를 찾을 때 제목보다 원하는 분위기와 남은 시간을 먼저 떠올리는 상황에서 출발했습니다.', goal: '모바일에서도 영화 장면이 먼저 보이고, 바로 아래에서 분위기와 시간을 골라 다른 작품을 찾을 수 있게 했습니다.' },
      hero: { summary: '분위기와 러닝타임으로 가상 단편영화 12편을 찾고, 마음에 남은 작품과 메모를 모으는 반응형 웹입니다.', media: [cinemaHome], mediaLabel: 'PC 홈 표지 · 파란 오후' },
      aiCollaboration: [
        { label: '김도한', value: '편집 방향 선택·단독 표지 결정·모바일 검토' },
        { label: 'AI 협업', value: '장면 선정·글·이미지 제작, UI 설계·구현·검사' },
      ],
      scopeSummary: [
        { title: '콘텐츠와 저장 방식', text: '가상 작품과 AI 생성 이미지로 영화 발견부터 보관까지 구현했습니다. 찜·메모·보기 설정은 사용 중인 브라우저에 저장됩니다. 영상 재생·예매는 시연 범위에서 제외했습니다.' },
        { title: '검증 범위', text: 'PC와 모바일 크기의 브라우저에서 작품 탐색, 상세 열기와 복귀, 메모 저장 후 다시 읽기를 확인했습니다. 실기기와 실제 이용자를 대상으로 한 사용성 조사는 진행하지 않았습니다.' },
      ], resultLimit: {},
    },
  ),
  gongjeongbom: detail(
    'gongjeongbom',
    media('detail/current/gijunseon-samples-1440.webp', '산업용 비전 검사 예시 이미지에 결함 위치를 표시한 화면', '2560 / 614', {
      label: '기준선 검사 예시 · 표면 흠집, 부품 누락, 인쇄 상태',
      mobile: { src: 'detail/current/gijunseon-samples-390.webp', aspectRatio: '700 / 528', label: '기준선 검사 예시 · 금속 표면의 선형 흠집' },
    }),
    [
      evidence('무엇을 검사하는지 이미지로 설명합니다.', '산업 이미지 다음에 흠집·부품 누락·바코드 등 검사 사례를 배치했습니다.', '기술 용어만 읽기 전에 서비스가 다루는 문제를 볼 수 있도록 구성했습니다.'),
      evidence('사례에서 도입 과정으로 이어집니다.', '산업 이미지 다음에 제품·공정에 맞춘 솔루션 설명을 두고, 결함 사례·도입 검토·문의 순서로 구성했습니다.', '서비스의 용도를 이해한 뒤 진행 방법과 다음 행동을 찾도록 했습니다.'),
    ],
    {
      actual: ['Figma 디자인과 HTML·CSS·JavaScript 웹 구현', '검사 예시·적용 공정·도입 절차·상담 화면', '반응형 구성과 브라우저 내 입력 검증'],
      demoStatic: ['가상 기업 소개와 검사 예시 · AI 이미지 포함', '상담 입력·검사 선택 시연'],
      notIncluded: ['실제 검사·납품 실적', '상담 전송·메일·DB 저장', '사용자 조사·성과 측정'],
    },
    { imageFirst: true, aiCollaboration: [
      { label: '김도한', value: '원본 Figma 작품·요구 범위 제시, 디자인 방향 선택, 수정 결과 확인' },
      { label: 'AI 협업', value: 'HTML·CSS·JavaScript 작성, 반응형·접근성 보완, 도식 정리와 검수' },
    ] },
  ),
  'feedback-hub': {
    role: '현장에서 쓰던 발주·입고·지급 순서를 웹앱의 요구사항으로 정리했습니다.',
    aiCollaboration: [
      { label: '업무 경험', value: '엑셀과 메일로 구매 요청을 정리하고 종이 결재서를 올렸습니다.' },
      { label: 'AI 협업', value: '시연 구조와 화면을 제안하고 코드를 작성·검사했습니다.' },
    ],
    history: [
      { date: '2026-11-02', type: '입고', amount: '+3개', party: '한결센서', record: 'RC-0001' },
      { date: '2026-11-04', type: '지급', amount: '−2개', party: '설비보전팀', record: 'IS-0001' },
    ],
    historyPath: '#/materials/MT-0001#movement-history',
  },
  'bus-arrival': detail(
    'bus-arrival-app',
    media('detail/current/onjeongryu-20261105.png', '온정류 — 즐겨찾는 노선의 방향과 도착 시간', '390 / 844', { frameWidth: 390 }),
    [
      evidence('자주 찾는 버스를 먼저 배치합니다.', '즐겨찾는 노선의 번호·방향·도착 시간을 첫 화면의 큰 정보로 묶었습니다.', '반복 조회하는 내용을 여러 화면을 거치지 않고 살펴보도록 구성했습니다.'),
      evidence('도착 상태를 글자와 크기로 구분합니다.', '남은 분과 ‘곧 도착’ 상태를 노선 정보와 함께 표시했습니다.', '색만 보고 판단하지 않고 현재 도착 상태를 읽을 수 있도록 했습니다.', media('detail/current/onjeongryu-20261105.png', '온정류 홈의 노선 번호와 도착 시간 확대', '390 / 844', { frameWidth: 390, crop: { x: 20, y: 224, width: 350, height: 305 } })),
    ],
    {
      actual: ['모바일 정보 위계', '도착 정보와 탐색 화면 디자인'],
      demoStatic: ['정적 노선·방향·도착 예시', 'Figma 화면 시안'],
      notIncluded: ['실시간 버스 API·차량 위치', 'Push·계정·앱 코드', '실제 운행 안내·사용성 검증'],
    },
    { responsiveNotApplicable: true, contribution: '버스 도착 정보의 요구사항을 제시했습니다.' },
  ),
  brewstep: detail(
    'brewstep',
    media('detail/current/soyobit-20261105.png', '소요빛 — 카페 대표 음료와 추천 메뉴', '370 / 1024', { frameWidth: 390 }),
    [
      evidence('음료 사진과 메뉴 정보를 함께 보여줍니다.', '대표 음료와 브랜드 이미지를 먼저 보여주고, 메뉴와 페어링 제안을 뒤에 배치했습니다. 메뉴명·가격은 사진 가까이에 두었습니다.', '브랜드 분위기를 느끼면서 실제로 살펴볼 메뉴도 읽을 수 있도록 구성했습니다.'),
      evidence('주요 화면의 위치를 일정하게 둡니다.', '추천 메뉴에는 사진·맛의 표현·가격을 함께 두고, 주요 탐색 메뉴는 하단에 배치했습니다.', '프로모션을 읽은 뒤에도 메뉴 탐색으로 이동할 위치를 쉽게 찾도록 했습니다.', media('detail/current/soyobit-20261105.png', '소요빛 홈의 추천 메뉴 — 음료 사진, 맛의 표현과 가격', '370 / 1024', { frameWidth: 390, crop: { x: 22, y: 379, width: 325, height: 330 } })),
    ],
    {
      actual: ['카페의 모바일 시각 체계', '홈·메뉴 탐색 화면 디자인'],
      demoStatic: ['음료·가격·프로모션 예시', '현재 Figma 화면 시안'],
      notIncluded: ['실제 주문·결제·재고', '최신 버전의 완성된 결제 흐름', '앱 코드·사용자 조사'],
    },
    { responsiveNotApplicable: true, contribution: '카페 모바일 시안의 방향을 선택했습니다.' },
  ),
};
