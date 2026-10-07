/* 메인과 프로젝트 상세의 공개 문구. 경로는 public 기준이며 Node에서도 읽을 수 있다. */
import { fallbackProjects } from './projectsFallbackData.js';

export const NAME = '김도한';
export const HERO_BADGE = `${NAME} | UX/UI · 웹퍼블리싱`;
export const HERO_EYEBROW = 'DOHAN KIM · SELECTED WORK';
export const HERO_HEADLINE_LINES = ['일의 맥락을 알고, ', '화면을 설계합니다.'];
export const HERO_DESCRIPTION_LINES = [
  '구매·회계·총무와 생산 현장을 경험했습니다.',
  '이제 그 경험을 바탕으로, 필요한 정보와 다음 행동이 분명한 화면을 고민합니다.',
];
export const POSITIONING_PREFIX = '일의 맥락을 알고,';
export const POSITIONING_EMPHASIS = '화면을';
export const POSITIONING_SUFFIX = '설계합니다.';
export const POSITIONING_LINE = `${POSITIONING_PREFIX} ${POSITIONING_EMPHASIS} ${POSITIONING_SUFFIX}`;
export const SUB_DESCRIPTION = '김도한은 주제와 요구사항, 개선 피드백과 방향 선택을 맡고 AI와 디자인·구현을 협업했습니다. 프로젝트별 작업 범위와 실제 결과물을 구분해 소개합니다.';
export const APPLICATION_FOCUS = ['UX/UI 디자인', '웹퍼블리싱'];
export const TOOL_LINE = 'Figma · HTML/CSS/JavaScript · React/MUI · GitHub · AI 협업';
export const LIVE_SITE_URL = 'https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/';
export const PROJECT_GITHUB_URL = 'https://github.com/kdhan0320-bot/dohan-portfolio/tree/main/projects/my-portfolio';

const media = (src, alt, aspectRatio, extra = {}) => ({
  src, alt, aspectRatio, objectFit: 'contain', objectPosition: 'top', ...extra,
});
const evidence = (title, choice, reason, detailMedia) => ({
  title,
  evidence: [{ label: '구성', text: choice }, { label: '이유', text: reason }],
  ...(detailMedia ? { media: detailMedia } : {}),
});
function detail(id, image, decisions, scope, extra = {}) {
  const project = fallbackProjects.find((item) => item.id === id);
  return {
    meta: {
      type: project.is_figma_project ? 'Figma 디자인' : '웹 구현',
      role: project.role,
      tools: project.tools.join(' · '),
      data: project.cardScope,
    },
    hero: {
      summary: project.overview,
      media: [image],
      mediaLabel: project.is_figma_project ? '현재 Figma 디자인 · 정적 예시' : '실제 웹 화면 · 포트폴리오용 예시',
    },
    context: { problem: project.problem, goal: project.goal },
    decisions,
    mainScreens: [],
    responsiveCards: [],
    scopeLabels: { actual: '제작 범위', demoStatic: '예시와 데이터', notIncluded: '포함하지 않은 범위' },
    scope,
    aiCollaboration: [
      { label: '김도한', value: '주제·요구사항 · 개선 피드백 · 방향 선택 · 공개 판단' },
      { label: 'AI 협업', value: project.is_figma_project ? '디자인 제안 · 화면 편집 · 검토' : '디자인 제안 · 그래픽 제작 · 코드 작성·검사' },
    ],
    resultLimit: { done: project.result, limit: project.limitation },
    ...extra,
  };
}

export const PROJECT_DETAIL_READY = {
  jobflow: detail(
    'jobflow',
    media('detail/galpirok-welcome-pc.jpg', '갈피록 서비스 소개와 지원 현황 미리보기', '1348 / 926'),
    [
      evidence(
        '마감과 준비를 먼저 보여줍니다.',
        '날짜 배너와 목록 간격을 줄이고 가까운 마감·지원 중인 회사·남은 준비를 배치했습니다.',
        '서비스 설명보다 오늘 확인할 기록이 먼저 읽히도록 조정했습니다.',
        media('detail/galpirok-overview-pc.jpg', '갈피록 오늘의 지원 — 가까운 마감과 남은 준비', '1348 / 926'),
      ),
      evidence(
        '이동은 메뉴로, 상태는 분류로.',
        '상단 5개 메뉴와 지원 전·서류·면접·결과의 네 단계로 역할을 나눴습니다.',
        '어디로 이동할지와 각 회사가 어떤 단계인지를 구분하기 위해서입니다.',
        media('detail/galpirok-board-pc.jpg', '갈피록 지원 현황 — 네 단계와 회사 카드', '1348 / 926'),
      ),
      evidence(
        '작은 글자와 빈 상태도 분명하게.',
        '선택 칸과 보조 글자를 키우고, 할 일이 없는 분류는 ‘등록 없음’으로 표시했습니다.',
        '긴 분류명과 의미가 모호했던 0 / 0 표시를 쉽게 읽도록 바꿨습니다.',
        media('detail/galpirok-checklist-pc.jpg', '갈피록 준비 체크 — 분류별 할 일과 진행 상태', '1348 / 926'),
      ),
    ],
    {
      actual: ['지원 현황·마감 달력', '준비 체크·면접 질문과 답변', '로그인 사용자별 저장 구조'],
      demoStatic: ['가입 없이 편집 가능한 가상 샘플', '샘플은 브라우저 메모리에서 유지', '요청문 만들기는 로컬 템플릿'],
      notIncluded: ['실시간 알림·외부 채용 API', '면접 일정 등록·통계·드래그 이동', '제품 내 AI 문장 생성'],
    },
    {
      resultLimit: {
        done: '목적·메뉴·정보 밀도·글자와 빈 상태를 개선했습니다. 공개 PC 화면과 편집 가능한 샘플에서 작업 결과를 확인할 수 있습니다.',
        limit: '현재 실제 계정·DB 저장과 모바일 실기기 검증은 별도 과제입니다. 사용자 조사와 성과 측정은 수행하지 않았습니다.',
      },
    },
  ),
  seolbiit: detail(
    'seolbiit',
    media('detail/current/seolbigyeol-home.png', '설비결 작업 현황 — 상태 요약과 우선 작업 카드', '1440 / 1200'),
    [
      evidence('요청을 고르고 담당자를 배정합니다.', '요청 목록과 선택한 설비의 상세, 담당자 배정 영역을 한 화면에 나눴습니다.', '요청의 내용과 완료 기한을 확인한 뒤 배정으로 이어가도록 구성했습니다.', media('detail/current/seolbigyeol-requests.png', '설비결 정비 요청 — 요청 목록과 선택 상세, 담당자 배정', '1440 / 1200')),
      evidence('조치 결과를 확인한 뒤 완료합니다.', '보고 검토 창에서 조치 내용과 재확인 결과를 함께 보여주고 보완 요청과 완료를 구분했습니다.', '작업이 끝났다는 표시만으로 넘기지 않고 확인할 근거를 가까이 두었습니다.', media('detail/current/seolbigyeol-review.png', '설비결 정비 보고 검토 — 조치 내용과 재확인 결과', '1440 / 1200')),
    ],
    {
      actual: ['작업 현황의 정보 구조', '점검·정비 운영 화면 디자인', 'Figma 화면 구성'],
      demoStatic: ['가상 설비·작업·담당자', '화면 구성용 상태와 수치'],
      notIncluded: ['실제 서비스 코드·서버', '센서 연동·예지보전', '현장 사용자 조사'],
    },
  ),
  'ott-service': detail(
    'ott-service',
    media('detail/current/jansang-home.jpg', '잔상관 — 파란 오후 대표 장면과 영화 탐색 화면', '1348 / 926'),
    [
      evidence('작품의 색은 살리고 탐색은 일정하게.', '짙은 청색 UI 안에서 작품별 포스터의 색과 제목을 구분하고, 영화·기획전·매거진·차트·보관함으로 탐색을 나눴습니다.', '이미지의 인상을 유지하면서 원하는 콘텐츠로 이동할 위치를 일정하게 만들었습니다.'),
      evidence('찜과 노트를 보관함으로 연결합니다.', '작품 상세에서 찜과 노트를 남기고 내 보관함에서 다시 찾도록 구현했습니다.', '처음 발견한 작품을 기록과 재탐색으로 이어가기 위해서입니다.'),
      evidence('저장 상태를 사실대로 안내합니다.', '저장한 찜·노트는 localStorage에, 미저장 초안은 현재 탭 메모리에 구분해 둡니다.', '브라우저 저장 실패와 초안 상태를 실제 저장 완료로 오해하지 않도록 했습니다.'),
    ],
    {
      actual: ['HTML·CSS·JavaScript 반응형 웹', '검색·분류·정렬·작품 상세', '찜·개인 노트·내 보관함'],
      demoStatic: ['가상 영화 12편과 가상 차트', 'AI로 제작한 포스터·대표 장면', '기기 간 동기화 없는 브라우저 저장'],
      notIncluded: ['실제 영상·예매·결제', '로그인·API·서버 저장', '사용자 조사·성과 측정'],
    },
    {
      aiCollaboration: [
        { label: '김도한', value: '정보 구조·시각 방향 피드백 · 이미지 선택 · 수정·공개 판단' },
        { label: 'AI 협업', value: '디자인 제안 · OpenAI 도구로 가상 포스터 제작 · 코드 작성·검사' },
        { label: '이미지 범위', value: '실제 개봉작이나 영화 스틸이 아닌 가상 작품 이미지입니다. 제품 내 AI 호출은 없습니다.' },
      ],
    },
  ),
  gongjeongbom: detail(
    'gongjeongbom',
    media('detail/current/gijunseon-home.png', '기준선 — 비전 검사 소개, 결함 사례와 도입 과정', '1440 / 1824'),
    [
      evidence('무엇을 검사하는지 이미지로 설명합니다.', '산업 이미지 다음에 흠집·부품 누락·바코드 등 검사 사례를 배치했습니다.', '기술 용어만 읽기 전에 서비스가 다루는 문제를 볼 수 있도록 구성했습니다.'),
      evidence('사례에서 도입 과정으로 이어집니다.', '검사 사례와 도입 단계, 문의 행동을 순서대로 나눴습니다.', '서비스의 용도를 이해한 뒤 진행 방법과 다음 행동을 찾도록 했습니다.'),
    ],
    {
      actual: ['검사 사례와 도입 과정의 정보 구조', 'Figma 웹사이트 디자인'],
      demoStatic: ['가상 서비스 소개와 검사 사례', '현재 Figma 화면'],
      notIncluded: ['최신 디자인의 웹 구현', '실제 검사·납품 실적', '사용자 조사·성과 측정'],
    },
  ),
  'feedback-hub': detail(
    'feedback-hub',
    media('detail/current/goreunsiseon-home.jpg', '고른시선 — 화면 위치별 의견과 수정 전후 미리보기', '1348 / 926'),
    [
      evidence('의견과 화면의 위치를 연결합니다.', '화면의 번호 핀을 의견 목록과 연결하고, 선택한 위치에 체험 의견을 작성하도록 구성했습니다.', '의견이 어떤 요소를 가리키는지 다시 설명해야 하는 상황을 줄이려는 설계입니다.'),
      evidence('수정 전후를 같은 맥락에서 봅니다.', '6종 예제의 수정 전 화면과 수정안을 전환하거나 나란히 비교할 수 있게 했습니다.', '결과만 보는 대신 무엇이 달라졌는지 연결해서 확인하도록 했습니다.'),
      evidence('체험과 실제 저장의 범위를 구분합니다.', '예제 의견은 화면 내 메모리에만 유지하고, 공개 작업 데이터는 읽기 전용으로 제공합니다.', '포트폴리오 체험이 실제 협업·서버 저장으로 오해되지 않게 했습니다.'),
    ],
    {
      actual: ['작업 검색·분류와 예제 탐색', '위치별 의견·수정 전후 비교', 'React/MUI 화면 구현'],
      demoStatic: ['가상 예제 6종과 고정 수정안', '체험 의견은 화면 내 메모리', '공개 작업 데이터는 읽기 전용'],
      notIncluded: ['공개 회원가입·파일 업로드', '리뷰 좌표·버전의 서버 저장', '실시간 공동 작업·제품 내 AI'],
    },
  ),
  'bus-arrival': detail(
    'bus-arrival-app',
    media('detail/current/onjeongryu-home.png', '온정류 — 즐겨찾는 노선의 방향과 도착 시간', '390 / 1084', { frameWidth: 390 }),
    [
      evidence('자주 찾는 버스를 먼저 배치합니다.', '즐겨찾는 노선의 번호·방향·도착 시간을 첫 화면의 큰 정보로 묶었습니다.', '반복 조회하는 내용을 여러 화면을 거치지 않고 살펴보도록 구성했습니다.'),
      evidence('도착 상태를 글자와 크기로 구분합니다.', '남은 분과 ‘곧 도착’ 상태를 노선 정보와 함께 표시했습니다.', '색만 보고 판단하지 않고 현재 도착 상태를 읽을 수 있도록 했습니다.', media('detail/current/onjeongryu-station.png', '온정류 정류장 상세 — 노선별 방향과 도착 예정', '390 / 900', { frameWidth: 390 })),
    ],
    {
      actual: ['모바일 정보 위계', '도착 정보와 탐색 화면 디자인'],
      demoStatic: ['정적 노선·방향·도착 예시', 'Figma 화면 시안'],
      notIncluded: ['실시간 버스 API·차량 위치', 'Push·계정·앱 코드', '실제 운행 안내·사용성 검증'],
    },
    { responsiveNotApplicable: true },
  ),
  brewstep: detail(
    'brewstep',
    media('detail/current/soyobit-home.png', '소요빛 — 카페 대표 음료와 추천 메뉴', '390 / 1038', { frameWidth: 390 }),
    [
      evidence('음료 사진과 메뉴 정보를 함께 보여줍니다.', '대표 음료 사진과 추천 메뉴를 나누고 메뉴명·가격을 사진 가까이에 배치했습니다.', '브랜드 분위기를 느끼면서 실제로 살펴볼 메뉴도 읽을 수 있도록 구성했습니다.'),
      evidence('주요 화면의 위치를 일정하게 둡니다.', '홈·메뉴·관심 메뉴 등 주요 화면을 하단 탐색에 배치했습니다.', '프로모션을 읽은 뒤에도 메뉴 탐색으로 이동할 위치를 쉽게 찾도록 했습니다.', media('detail/current/soyobit-menu.png', '소요빛 메뉴 — 종류별 분류와 음료·가격·즐겨찾기', '390 / 980', { frameWidth: 390 })),
    ],
    {
      actual: ['카페의 모바일 시각 체계', '홈·메뉴 탐색 화면 디자인'],
      demoStatic: ['음료·가격·프로모션 예시', '현재 Figma 화면 시안'],
      notIncluded: ['실제 주문·결제·재고', '최신 버전의 완성된 결제 흐름', '앱 코드·사용자 조사'],
    },
    { responsiveNotApplicable: true },
  ),
};
