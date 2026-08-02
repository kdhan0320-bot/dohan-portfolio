/* my-portfolio 공용 정체성/포지셔닝 메타데이터
 * 브라우저(Vite/React, Hero/About 섹션)와 Node(tools/site-audit-kit의 검사용
 * 리뷰 페이지 생성 스크립트) 양쪽에서 동일하게 import해서 쓴다.
 * import.meta.env 등 Vite 전용 API는 쓰지 않는다 (Node에서도 그대로 실행 가능해야 함).
 * 문구를 바꿀 때는 Hero/About 화면과 검사용 리뷰 페이지에 함께 반영되므로
 * 이 파일만 수정하면 된다.
 */

export const NAME = '김도한';

export const HERO_BADGE = `${NAME} | UX/UI · Web Publishing Portfolio`;

/* Phase 4A: 최신 Figma Hero(254:3의 Hero / Eyebrow, 257:4)는 Header에 이미
 * 있는 D2+DOHAN KIM+역할 카피를 Hero 안에서 다시 반복하지 않고, 작은 eyebrow
 * 한 줄만 둔다. Header의 "UX/UI · WEB PUBLISHING" 역할 표기는 Navbar.jsx에
 * 직접 문자열로 있어(이 파일의 상수를 참조하지 않음), 예전에 이 자리에 있던
 * HERO_LABEL/HERO_ROLE_LINE는 실제로는 Hero에서도 Header에서도 참조되지
 * 않는 미사용 export였다 — Phase 4B 정리에서 삭제했다(rg 참조 0건 확인). */
export const HERO_EYEBROW = 'DOHAN KIM / HUMAN SIGNAL';

/* Hero 헤드라인 — Figma Human Signal Hero(254:3, 257:5) 원문 2줄. 최신 Figma는
 * 두 줄 모두 Soft White 단색이라(강조 색 분리 없음) HeroSection.jsx에서도
 * 동일하게 렌더링한다. */
/* 줄 끝 공백은 시각적으로 보이지 않지만(block 줄바꿈 뒤 trailing space),
 * 보조기술이 읽는 DOM textContent에서 "복잡한 일을,이해되는 화면으로."처럼
 * 단어가 붙지 않게 한다(Phase 4B 접근성 재검사에서 발견). */
export const HERO_HEADLINE_LINES = ['복잡한 일을, ', '이해되는 화면으로.'];

/* Hero 설명 문구 — Figma Human Signal Hero(254:3, 257:6) 원문 그대로다.
 * SUB_DESCRIPTION과 별개로 관리한다. SUB_DESCRIPTION은 tools/site-audit-kit의
 * AI 활용 고지 문구로도 재사용되므로 Hero 시각 카피 교체와 분리해서 유지한다. */
export const HERO_DESCRIPTION_LINES = [
  '생산 현장과 구매관리에서 익힌 기준 확인과 누락 방지 습관을 바탕으로,',
  '복잡한 정보를 이해되는 화면으로 바꿉니다.',
];

/* 공개 Hero 승인 문구(HERO_HEADLINE_LINES)와 같은 정체성을 쓰도록 맞췄다.
 * review:build가 생성하는 검토용 HTML/PDF가 이 값을 그대로 노출하므로,
 * 공개 화면과 검토 자료가 서로 다른 포지셔닝을 말하지 않게 한다. */
export const POSITIONING_PREFIX = '복잡한 일을,';
export const POSITIONING_EMPHASIS = '이해되는';
export const POSITIONING_SUFFIX = '화면으로.';
export const POSITIONING_LINE = `${POSITIONING_PREFIX} ${POSITIONING_EMPHASIS} ${POSITIONING_SUFFIX}`;

/* tools/site-audit-kit의 AI 활용 고지 문구로 쓰인다(검사용 리뷰 페이지 전용).
 * Hero 시각 카피는 HERO_DESCRIPTION을 사용한다. */
export const SUB_DESCRIPTION =
  'Figma로 화면 흐름과 정보 구조를 정리하고, React/MUI로 반응형 웹 화면을 구현합니다. AI 도구는 문장 정리, 코드 점검, 개선안 비교에 보조적으로 활용했습니다.';

/* About 섹션 "지원 방향" 배지. 검사용 리뷰 페이지의 "지원 직무" 항목도 동일 데이터를 사용한다. */
export const APPLICATION_FOCUS = ['UX/UI', 'Web Publishing', 'React/MUI', 'Responsive QA'];

/* About 섹션 "사용 도구" 한 줄 */
export const TOOL_LINE = 'Figma · React/MUI · HTML/CSS/JavaScript · GitHub · Supabase · AI Tools';

/* 라이브 사이트 / 저장소 링크 — projectsFallbackData.js의 다른 프로젝트 github_url과
 * 동일한 규칙(레포 하위 경로)으로 구성했다. */
export const LIVE_SITE_URL = 'https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/';
export const PROJECT_GITHUB_URL = 'https://github.com/kdhan0320-bot/dohan-portfolio/tree/main/projects/my-portfolio';

/* Human Signal Phase 5D: Detail READY 프로젝트별 presentation mapping.
 * Figma Detail READY(file 53Ppn2hIgrvs9Jra3eejFs, node 201:2/196:5/377:254/202:2)
 * 구조(Hero → Context → Key Decisions → Main Screens → Responsive & Scope →
 * 조건부 AI → Result & Limit)를 ProjectDetailPage.jsx가 이 데이터로 채운다.
 * media 경로는 public 루트 기준 상대 경로만 저장한다(이 파일은 import.meta.env를
 * 쓰지 않는 Node-safe 파일이라 BASE_URL 접두는 호출부인 projectsData.js/
 * ProjectDetailPage.jsx에서만 붙인다). 각 프로젝트의 실제 공개 증거 이미지와
 * 프로젝트별 thumbnail composite만 사용한다. */
export const PROJECT_DETAIL_READY = {
  gongjeongbom: {
    meta: {
      type: 'RESPONSIVE WEB',
      role: 'B2B UX/UI · WEB PUBLISHING',
      tools: 'SEMANTIC HTML · CSS · VANILLA JAVASCRIPT',
      data: 'STATIC / DEMO',
    },
    hero: {
      summary: '제조 현장에서 접한 기술 정보와 의사결정 조건을 바탕으로, 제품명을 모르는 사용자도 공정 문제에서 시작해 검사 시스템을 찾고 비교하도록 설계했습니다.',
      media: [
        {
          src: 'detail/gongjeongbom/home-1440.png',
          alt: '실제 브라우저 실행 화면 · 공정봄 홈 1440px · 가상 제품과 정적 데모 데이터',
          aspectRatio: '16 / 10',
          objectFit: 'contain',
          objectPosition: 'top',
          plainEvidence: true,
        },
        {
          src: 'detail/gongjeongbom/home-390.png',
          alt: '실제 브라우저 실행 화면 · 공정봄 홈 390px · 가상 제품과 정적 데모 데이터',
          aspectRatio: '390 / 844',
          objectFit: 'contain',
          objectPosition: 'top',
          frameWidth: 180,
          plainEvidence: true,
        },
      ],
      mediaLabel: '실제 브라우저 실행 화면 · 390 / 1440 · STATIC / DEMO',
    },
    context: {
      problem: '제품명을 모르는 구매·생산기술 담당자는 검사 문제, 설치 조건과 제품 사양을 연결하기 어렵습니다.',
      goal: '공정 문제 → 제품 종류 → 모델 비교 → 기술 문의로 이어지는 판단 흐름을 만듭니다.',
    },
    decisions: [
      {
        title: '제품명이 아니라 공정 문제에서 탐색을 시작했습니다.',
        choice: '검사 문제·제품 종류·필요 검사 수준·설치 조건을 검색과 필터로 연결',
        reason: '모델명을 모르는 사용자도 현재 공정의 문제에서 후보를 좁힐 수 있게 하기 위해',
        verification: '실제 Products 화면에서 검색·제품 종류·검사 문제 필터와 결과 갱신 확인',
        media: {
          src: 'detail/gongjeongbom/products-1440.png',
          alt: '실제 브라우저 실행 화면 · 공정봄 제품 찾기 · 가상 제품 데이터',
          aspectRatio: '16 / 10',
          objectFit: 'cover',
          objectPosition: 'top',
        },
      },
      {
        title: '같은 종류의 제품만 최대 3개 비교하도록 제한했습니다.',
        choice: '제품 종류 일치 조건·3개 상한·sessionStorage 비교 목록',
        reason: '서로 다른 역할의 제품을 직접 비교해 잘못된 결론을 내리지 않도록 하기 위해',
        verification: 'MV-X300·MV-X500·MV-X700 선택과 비교 화면, 다른 종류 차단 상태 확인',
        media: {
          src: 'detail/gongjeongbom/compare-1440.png',
          alt: '실제 브라우저 실행 화면 · 공정봄 비전 시스템 모델 3개 비교',
          aspectRatio: '16 / 10',
          objectFit: 'cover',
          objectPosition: 'top',
        },
      },
      {
        title: '사양 숫자보다 공정 적합성을 먼저 설명했습니다.',
        choice: '잘 맞는 경우·해결 문제·구성 특징 다음에 상세 사양 배치',
        reason: '숫자를 비교하기 전에 해당 모델이 어떤 검사 흐름에 맞는지 판단하게 하기 위해',
        verification: 'MV-X500 상세 화면의 적용 조건·구성·사양 정보 위계 확인',
        media: {
          src: 'detail/gongjeongbom/product-1440.png',
          alt: '실제 브라우저 실행 화면 · 공정봄 MV-X500 제품 상세 · 가상 제품 사양',
          aspectRatio: '16 / 10',
          objectFit: 'cover',
          objectPosition: 'top',
        },
      },
      {
        title: '실제 전송이 없는 문의를 명확한 데모 상태로 구분했습니다.',
        choice: '필수 항목·이메일 오류 요약·관심 제품 전달·데모 완료 고지',
        reason: '입력 흐름은 검증하되 실제 이메일·CRM·DB 전송으로 오해하지 않게 하기 위해',
        verification: '기술 문의 화면의 저장·전송 없음 고지와 오류·완료 데모 상태 확인',
        media: {
          src: 'detail/gongjeongbom/inquiry-1440.png',
          alt: '실제 브라우저 실행 화면 · 공정봄 기술 문의 · 실제 저장과 전송이 없는 데모',
          aspectRatio: '16 / 10',
          objectFit: 'cover',
          objectPosition: 'top',
        },
      },
    ],
    mainScreens: [
      { label: 'Home', media: { src: 'detail/gongjeongbom/home-1440.png', alt: '공정봄 Home 실제 브라우저 화면', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' } },
      { label: 'Products', media: { src: 'detail/gongjeongbom/products-1440.png', alt: '공정봄 Products 실제 브라우저 화면', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' } },
      { label: 'Product Detail', media: { src: 'detail/gongjeongbom/product-1440.png', alt: '공정봄 Product Detail 실제 브라우저 화면', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' } },
      { label: 'Compare', media: { src: 'detail/gongjeongbom/compare-1440.png', alt: '공정봄 Compare 실제 브라우저 화면', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' } },
      { label: 'Inquiry', media: { src: 'detail/gongjeongbom/inquiry-1440.png', alt: '공정봄 Inquiry 실제 브라우저 화면', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' } },
    ],
    responsiveCards: [
      { width: '390px', rule: '텍스트 → 미디어 순서와 모바일 메뉴·필터 패널' },
      { width: '1024px', rule: '중간 폭에서 제품 카드·비교 표·문의 폼 재배치' },
      { width: '1440px', rule: '제품 탐색과 판단 정보를 넓은 화면에 병렬 배치' },
    ],
    scope: {
      actual: [
        'Figma UI·정보 구조·반응형·Prototype 설계',
        'Semantic HTML·직접 작성 CSS·Vanilla JavaScript',
        '검색·필터·같은 종류 최대 3개 비교와 sessionStorage 비교 목록',
        '문의 폼 오류·데모 완료, 키보드·초점·reduced-motion',
        '직접 제작 검사 신호·제품 도식',
      ],
      demoStatic: [
        '가상 기업·제품·모델·사양과 로컬 JavaScript 데이터',
        '문의 성공·오류 데모 상태',
        '적용 예시와 제품 선정 정보',
      ],
      notIncluded: [
        '실제 제품 또는 제조사',
        '실제 견적·이메일·CRM·DB',
        '실제 사용자 조사·테스트',
        '실제 고객사·인증·납품 실적',
        'AI 추천·챗봇·예지보전',
      ],
    },
    resultLimit: {
      done: '공정 문제에서 제품 탐색·상세·같은 종류 비교·기술 문의로 이어지는 반응형 웹 흐름을 390px·1024px·1440px에서 구현하고 검토했습니다.',
      limit: '가상 기업·제품·사양과 정적 데모 데이터 기반이며 실제 제품 선정·견적·이메일·CRM·DB·사용자 조사·성과는 포함하지 않았습니다.',
    },
  },
  jobflow: {
    meta: {
      type: 'WEB APPLICATION',
      role: 'DASHBOARD UX · FRONTEND',
      tools: 'REACT · MUI · SUPABASE',
      data: 'ACTUAL / DEMO',
    },
    hero: {
      summary: '지원 현황·면접 일정·체크리스트를 실제 저장 구조로 연결한 개인 구직 관리 대시보드입니다.',
      media: [
        { src: 'detail/jobflow-dashboard-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Dashboard · 게스트 sample data', aspectRatio: '1440 / 1077' },
        { src: 'detail/jobflow-dashboard-390.png', alt: '실제 브라우저 실행 화면 · JobFlow Dashboard 390px 1열 reflow · 게스트 sample data', aspectRatio: '390 / 844', objectFit: 'cover', objectPosition: 'top', frameWidth: 200 },
      ],
      mediaLabel: '실제 브라우저 실행 화면 · 게스트 sample data',
    },
    context: {
      problem: '지원 현황·전형 단계·체크리스트가 분산돼 다음 행동의 우선순위를 빠르게 파악하기 어렵습니다.',
      goal: '요약 → 상태 이동 → 준비 항목 확인이 한 흐름으로 이어지도록 화면을 구성합니다.',
    },
    decisions: [
      {
        title: '먼저 판단할 정보를 대시보드에 모았습니다.',
        choice: '지원 요약·상태 현황·체크리스트·할 일을 첫 화면에 배치',
        reason: '현재 상태와 다음 행동을 이동 없이 확인하기 위해',
        verification: '게스트 sample data가 표시된 실제 Dashboard와 390px 1열 reflow 확인',
        media: { src: 'detail/jobflow-dashboard-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Dashboard · 게스트 sample data' },
      },
      {
        title: '전형 상태를 보드 흐름으로 분리했습니다.',
        choice: '지원 단계를 column 단위 Kanban으로 구분',
        reason: '지원 건별 현재 위치를 빠르게 비교하기 위해',
        verification: '실제 Kanban 실행 화면 확인. 내부 가로 스크롤 구조이며 전체 column이 한 화면에 모두 보인다고 표현하지 않음',
        media: { src: 'detail/jobflow-kanban-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Kanban · 게스트 sample data' },
      },
      {
        title: '준비 항목을 진행률과 함께 보여줬습니다.',
        choice: '체크리스트 항목과 완료 상태를 한 화면에서 관리',
        reason: '누락을 줄이고 다음 준비 작업을 명확히 하기 위해',
        verification: '실제 Checklist 실행 화면 확인',
        media: { src: 'detail/jobflow-checklist-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Checklist · 게스트 sample data' },
      },
    ],
    mainScreens: [
      { label: 'Dashboard', media: { src: 'detail/jobflow-dashboard-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Dashboard · 게스트 sample data' } },
      { label: 'Kanban', media: { src: 'detail/jobflow-kanban-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Kanban · 게스트 sample data' } },
      { label: 'Checklist', media: { src: 'detail/jobflow-checklist-1440.png', alt: '실제 브라우저 실행 화면 · JobFlow Checklist · 게스트 sample data' } },
    ],
    scope: {
      actual: ['실제 브라우저 실행 Dashboard·Kanban·Checklist'],
      demoStatic: ['게스트 sample data', '게스트 저장·수정 제한'],
      notIncluded: ['고급 통계 리포트', '실시간 알림', '외부 채용 플랫폼 API 연동'],
    },
    resultLimit: {
      done: '지원 현황·상태 흐름·체크리스트를 실제 반응형 화면으로 연결하고 390px과 1440px에서 확인했습니다.',
      limit: '게스트 화면은 sample data이며 실제 사용자 성과나 운영 데이터가 아닙니다. Kanban은 내부 가로 스크롤을 사용합니다.',
    },
  },
  'feedback-hub': {
    meta: {
      type: 'WEB APPLICATION',
      role: 'COMMUNITY UX · FRONTEND',
      tools: 'REACT · MUI · SUPABASE',
      data: 'PUBLIC READ-ONLY / SAMPLE FALLBACK',
    },
    hero: {
      summary: '공개 탐색은 읽기 전용으로 운영하고, 비공개 계정으로 Auth·CRUD·RLS 경계를 검증한 React/MUI 커뮤니티 웹앱입니다.',
      media: [
        { src: 'detail/feedback-list-1440.png', alt: '실제 브라우저 실행 화면 · Post List · static sample fallback', aspectRatio: '1440 / 900', objectFit: 'cover', objectPosition: 'top' },
        { src: 'detail/feedback-detail-1440.png', alt: '실제 브라우저 실행 화면 · Post Detail · static sample fallback', aspectRatio: '1440 / 900' },
      ],
      mediaLabel: '실제 브라우저 실행 화면 · static sample fallback',
    },
    context: {
      problem: '작업 탐색과 의견 확인이 분리되면 관심 주제와 대화 맥락을 이어서 보기 어렵습니다.',
      goal: '검색·카테고리·카드 탐색에서 상세 내용과 참여 안내까지 자연스럽게 연결합니다.',
    },
    decisions: [
      {
        title: '탐색 조건과 콘텐츠 카드를 같은 화면에 배치했습니다.',
        choice: '검색·카테고리 필터·카드 그리드',
        reason: '관심 주제를 빠르게 좁히고 목록을 비교하기 위해',
        verification: '실제 공개 목록 route에서 Supabase 200 빈 배열 후 SAMPLE_POSTS fallback 표시 확인',
        media: { src: 'detail/feedback-list-1440.png', alt: '실제 브라우저 실행 화면 · Post List · static sample fallback', aspectRatio: '1440 / 900', objectFit: 'cover', objectPosition: 'top' },
      },
      {
        title: '상세 내용과 참여 조건을 한 화면에서 구분했습니다.',
        choice: '본문·좋아요·댓글 영역과 로그인 안내',
        reason: '읽기는 공개하고 작성·반응은 인증 경계를 명확히 하기 위해',
        verification: '목록의 실제 카드에서 #/posts/sample-7 상세 route로 이동하고, 공개 읽기 전용 경계와 비공개 A/B 계정의 CRUD·RLS 허용·차단을 확인',
        media: { src: 'detail/feedback-detail-1440.png', alt: '실제 브라우저 실행 화면 · Post Detail · static sample fallback' },
      },
    ],
    // JobFlow/Bus는 첫 화면(Dashboard/Home)이 primary, 나머지가 secondary인
    // 위계 레이아웃을 쓰지만 Feedback Hub는 List/Detail 둘 다 같은 무게로 커야
    // 한다(지시서 6 "Main Screens" 기준) — 이 신호가 없으면 기본값(primary)이
    // 적용돼 1440에서 오른쪽에 큰 빈 공간이 남는다.
    mainScreensLayout: 'equal',
    mainScreens: [
      { label: 'Post List', media: { src: 'detail/feedback-list-1440.png', alt: '실제 브라우저 실행 화면 · Post List · static sample fallback', aspectRatio: '1440 / 900', objectFit: 'cover', objectPosition: 'top' } },
      { label: 'Post Detail', media: { src: 'detail/feedback-detail-1440.png', alt: '실제 브라우저 실행 화면 · Post Detail · static sample fallback' } },
    ],
    // 390×9453 full-page 검증 캡처. 원본을 세로로 늘여 넣지 않고 controlled
    // viewport(top alignment)로 1열 card stack 증거만 보여준다.
    responsiveEvidence: {
      src: 'detail/feedback-list-390.png', alt: '실제 브라우저 실행 화면 · Post List 390px 1열 카드 stack · static sample fallback',
      aspectRatio: '390 / 700', objectFit: 'cover', objectPosition: 'top', frameWidth: 200,
      caption: '390px full-page source의 상단 viewport',
    },
    scope: {
      actual: [
        '공개 목록·상세 route와 검색·카테고리·정렬',
        'Supabase posts 읽기와 live/sample/error 상태 분리',
        '비공개 계정 Auth와 게시글·댓글·대댓글·좋아요 CRUD',
        '소유권 RLS와 profile 컬럼 보안 검증',
      ],
      demoStatic: [
        '운영 게시글이 0건일 때 SAMPLE_POSTS fallback',
        '화면의 게시글·댓글·좋아요 수는 표시용 sample 값',
        '공개 읽기 전용 탐색 데모',
      ],
      notIncluded: [
        '공개 무료 가입·작성·댓글·좋아요',
        '실제 운영 사용자 콘텐츠·활성 지표',
        '파일 업로드·Supabase Storage',
        '관리자·신고·알림',
      ],
    },
    resultLimit: {
      done: '공개 읽기 전용 목록·상세 탐색과 390px 1열 카드 stack을 확인하고, 비공개 A/B 계정으로 Auth·CRUD·RLS 경계를 검증했습니다.',
      limit: '현재 공개 화면 콘텐츠와 수치는 sample fallback이며 실제 운영 사용자 콘텐츠나 활성 지표가 아닙니다.',
    },
  },
  brewstep: {
    meta: {
      type: 'MOBILE APP',
      role: 'MOBILE UX/UI',
      tools: 'FIGMA · AUTO LAYOUT',
      data: 'STATIC / PROTOTYPE',
    },
    hero: {
      summary: '옵션이 많은 카페 주문을 7단계 흐름으로 정리하고, 모바일·반응형·Prototype·자산 권리까지 연결한 포트폴리오용 가상 주문 서비스입니다.',
      mediaLayout: 'approved-pair',
      media: [
        {
          src: 'detail/brewstep/detail-hero-desktop-1440.png',
          sources: {
            mobile: 'detail/brewstep/detail-hero-desktop-390.png',
            compact: 'detail/brewstep/detail-hero-desktop-1024.png',
          },
          alt: 'BREWSTEP 상품 상세의 데스크톱 승인 화면',
          aspectRatio: { xs: '504 / 487', md: '623 / 644', lg: '899 / 868' },
        },
        {
          src: 'detail/brewstep/detail-hero-mobile-1440.png',
          sources: {
            mobile: 'detail/brewstep/detail-hero-mobile-390.png',
            compact: 'detail/brewstep/detail-hero-mobile-1024.png',
          },
          alt: 'BREWSTEP 상품 상세의 모바일 승인 화면',
          aspectRatio: { xs: '154 / 571', md: '191 / 755', lg: '275 / 1017' },
        },
      ],
      mediaLabel: 'PRODUCT DETAIL · 1440 + 390 · 승인된 Figma 화면 비교',
    },
    context: {
      problem: '교육 과정 과제 원본에는 화면·상태·참고 자산이 혼재해, 상품 선택부터 픽업까지의 주문 조건과 다음 행동을 하나의 흐름으로 설명하기 어려웠습니다.',
      goal: '7단계 주문 흐름과 데이터 계약을 기준으로 화면·상태·반응형·Prototype·권리 문서를 하나의 시스템으로 정리했습니다.',
    },
    decisions: [
      {
        title: '주문 조건을 흐름과 데이터 계약으로 연결',
        choice: 'Home → Menu → Product → Cart → Pickup → Review → Order Status',
        reason: '상품·가격·매장·시간·결제 값을 화면마다 다시 결정하지 않기 위해',
        verification: 'Content·Checkout Contract와 7개 모바일 화면의 값 대조',
        media: {
          layout: 'portrait-pair',
          aspectRatio: '257 / 377',
          items: [
            {
              src: 'detail/brewstep/decision-01-1440-a.png',
              sources: {
                mobile: 'detail/brewstep/decision-01-390-a.png',
                compact: 'detail/brewstep/decision-01-1024-a.png',
              },
              alt: 'BREWSTEP 주문 흐름과 화면별 데이터 계약',
            },
            {
              src: 'detail/brewstep/decision-01-1440-b.png',
              sources: {
                mobile: 'detail/brewstep/decision-01-390-b.png',
                compact: 'detail/brewstep/decision-01-1024-b.png',
              },
              alt: 'BREWSTEP 주문 단계의 콘텐츠 값 대조',
            },
          ],
        },
      },
      {
        title: '선택·변경·진행 상태를 다른 문법으로 분리',
        choice: 'Radio · Action Text · Progress',
        reason: '모든 상태가 같은 Check 표시로 보이는 혼동 방지',
        verification: '색상·Border·Indicator·Text, 44px Target, 14px 이상',
        media: {
          layout: 'portrait-pair',
          aspectRatio: '257 / 377',
          items: [
            {
              src: 'detail/brewstep/decision-02-1440-a.png',
              sources: {
                mobile: 'detail/brewstep/decision-02-390-a.png',
                compact: 'detail/brewstep/decision-02-1024-a.png',
              },
              alt: 'BREWSTEP 픽업 선택 전후 상태 비교',
            },
            {
              src: 'detail/brewstep/decision-02-1440-b.png',
              sources: {
                mobile: 'detail/brewstep/decision-02-390-b.png',
                compact: 'detail/brewstep/decision-02-1024-b.png',
              },
              alt: 'BREWSTEP 주문 준비 진행 상태',
            },
          ],
        },
      },
      {
        title: '화면 폭에 따라 행동 구조를 변환',
        choice: '390 Fixed CTA → 1024 Compact Footer → 1440 Summary Rail',
        reason: '넓은 화면에서 Card만 늘이지 않고 행동 흐름을 재배치하기 위해',
        verification: '360·390·1024·1440 Overflow와 Focus 가림 검사',
        media: {
          layout: 'wide-stack',
          aspectRatio: '257 / 377',
          items: [
            {
              src: 'detail/brewstep/decision-03-1440-a.png',
              sources: {
                mobile: 'detail/brewstep/decision-03-mobile-wide-a.png',
                compact: 'detail/brewstep/decision-03-1024-a.png',
              },
              alt: 'BREWSTEP 390·1024·1440 주문 행동 구조 비교',
            },
            {
              src: 'detail/brewstep/decision-03-1440-b.png',
              sources: {
                mobile: 'detail/brewstep/decision-03-mobile-wide-b.png',
                compact: 'detail/brewstep/decision-03-1024-b.png',
              },
              alt: 'BREWSTEP 반응형 주문 요약과 CTA 구조',
            },
          ],
        },
      },
    ],
    mainScreensLayout: 'approved-brewstep',
    mainScreens: [
      {
        label: 'Product Detail · 1440',
        media: {
          src: 'detail/brewstep/main-1440-primary.png',
          sources: {
            mobile: 'detail/brewstep/main-390-primary.png',
            compact: 'detail/brewstep/main-1024-primary.png',
          },
          alt: 'BREWSTEP 상품 상세의 Primary 데스크톱 화면',
          aspectRatio: '1551 / 992',
        },
      },
      {
        label: 'Product Detail · 390',
        media: {
          src: 'detail/brewstep/main-1440-mobile.png',
          sources: {
            mobile: 'detail/brewstep/main-390-mobile.png',
            compact: 'detail/brewstep/main-1024-mobile.png',
          },
          alt: 'BREWSTEP 상품 상세의 모바일 화면',
          aspectRatio: '403 / 764',
        },
      },
      {
        label: 'Review & Pay · 1440',
        media: {
          src: 'detail/brewstep/main-1440-detail.png',
          sources: {
            mobile: 'detail/brewstep/main-390-detail.png',
            compact: 'detail/brewstep/main-1024-detail.png',
          },
          alt: 'BREWSTEP Review and Pay의 Detail 화면',
          aspectRatio: '634 / 458',
        },
      },
    ],
    responsiveCards: [
      { width: '360', rule: 'ADJACENT MOBILE QA' },
      { width: '390', rule: 'MOBILE SOURCE' },
      { width: '1024', rule: 'COMPACT' },
      { width: '1440', rule: 'DESKTOP' },
    ],
    scopeLabels: {
      actual: 'DESIGN DELIVERABLES',
      demoStatic: 'DEMO / STATIC',
      notIncluded: 'NOT INCLUDED',
    },
    scope: {
      actual: ['완료한 설계 산출물', '모바일 7화면', '반응형 4화면', 'Prototype Flow 2개', 'Reaction 22개', 'Component·Contract·Asset Rights'],
      demoStatic: ['샘플·mock·정적 데이터', '상품·매장·픽업·결제·주문 상태 예시', 'Figma Concept Prototype', 'Pexels 제품 사진'],
      notIncluded: ['미구현 기능과 한계', '웹·앱 코드 구현', '실제 API·DB·결제·재고·위치', '실제 사용자 조사·사용성 테스트', '성과 수치', '상표 Clearance'],
    },
    aiCollaboration: [
      { label: 'USER LED', value: '목적 · 범위 · 정보 구조 · 최종 디자인 판단' },
      { label: 'AI ASSISTED', value: '화면 감사 · 카피 초안 · Figma 편집 보조 · QA 후보' },
      { label: 'USER VERIFIED', value: 'Figma node metadata · Screenshot · Reaction Graph · Source·License' },
    ],
    resultLimit: {
      done: '모바일·반응형·Prototype·접근성·자산 권리를 하나의 파일 구조로 정리했습니다.',
      limit: '실제 서비스 연동·코드 구현·사용성 조사·상표 검토는 포함하지 않았습니다.',
    },
  },
  seolbiit: {
    meta: {
      type: 'RESPONSIVE OPERATIONS UI',
      role: 'INDUSTRIAL UX/UI',
      tools: 'FIGMA · AUTO LAYOUT',
      data: 'STATIC / DEMO',
    },
    sectionHeadings: {
      context: ['점검 이후의 기록이 끊기지 않도록'],
      decisions: ['현장 실행과 관리자 판단을', '세 가지 기준으로 연결했습니다.'],
      screens: ['모바일 실행과 관리자 배정을', '같은 사례 안에서 보여줍니다.'],
      scope: ['검증 폭과 제작 범위를', '같은 화면에서 구분합니다.'],
      result: ['현장 경험을 화면 구조로 바꾸되,', '구현하지 않은 범위는 분리했습니다.'],
    },
    hero: {
      summary: '현장 기술자의 점검 기록이 정비 요청·배정·완료·재점검까지 이어지도록 모바일·태블릿·데스크톱 운영 흐름을 설계했습니다.',
      media: [
        {
          src: 'detail/seolbiit-cover.png',
          alt: '설비잇 현장 점검과 정비 관리 운영 UI Cover · Figma STATIC / DEMO',
          aspectRatio: '16 / 10',
          objectFit: 'contain',
        },
      ],
      mediaLabel: 'Figma operations UI · responsive workflow · static demo data',
    },
    context: {
      problem: '설비·점검 결과·사진·담당자·기한이 흩어지면 정비 요청과 재점검이 누락될 수 있습니다.',
      goal: '현장 기술자와 관리자가 같은 기록을 이어 보도록 점검 → 이상 → 정비 요청 → 배정 → 완료 → 재점검을 연결합니다.',
    },
    decisions: [
      {
        title: '점검 결과를 정비 요청으로 자동 인계했습니다.',
        choice: '같은 기록을 다음 작업으로 전달',
        reason: '중복 입력과 누락 감소',
        verification: '연결된 점검 정보가 정비 요청 화면에 표시됨',
        media: {
          src: 'detail/seolbiit-mobile-flow.png',
          alt: '설비잇 모바일 오늘의 작업·점검 실행 흐름 · Figma STATIC / DEMO',
          aspectRatio: '1000 / 1048',
          objectFit: 'contain',
        },
      },
      {
        title: '상태·담당자·기한을 한 화면에 배치했습니다.',
        choice: '요청·배정·작업·완료 상태 구분',
        reason: '책임과 처리 시점을 명확히 확인',
        verification: '데스크톱 작업 표와 상세 패널 확인',
        media: {
          src: 'detail/seolbiit-desktop-management.png',
          alt: '설비잇 데스크톱 정비 작업 관리 화면 · Figma STATIC / DEMO',
          aspectRatio: '16 / 10',
          objectFit: 'contain',
        },
      },
      {
        title: '모바일 실행과 데스크톱 배정을 분리했습니다.',
        choice: '390 실행 / 1024 확인 / 1440 관리·배정',
        reason: '기기별 핵심 행동과 정보 밀도 분리',
        verification: '모바일·태블릿·데스크톱 렌더 비교',
        media: {
          src: 'detail/seolbiit-completion-flow.png',
          alt: '설비잇 모바일 이상 기록부터 완료·재점검까지의 흐름 · Figma STATIC / DEMO',
          aspectRatio: '77 / 45',
          objectFit: 'contain',
        },
      },
    ],
    mainScreensLayout: 'equal',
    mainScreens: [
      {
        label: '현장 모바일 흐름',
        media: { src: 'detail/seolbiit-mobile-flow.png', alt: '설비잇 현장 모바일 점검 실행 흐름 · Figma STATIC / DEMO', aspectRatio: '1000 / 1048', objectFit: 'contain' },
      },
      {
        label: '관리자 작업 배정',
        media: { src: 'detail/seolbiit-desktop-management.png', alt: '설비잇 관리자 정비 작업 배정 화면 · Figma STATIC / DEMO', aspectRatio: '16 / 10', objectFit: 'contain' },
      },
      {
        label: '완료·재점검',
        media: { src: 'detail/seolbiit-completion-flow.png', alt: '설비잇 완료와 재점검 흐름 · Figma STATIC / DEMO', aspectRatio: '77 / 45', objectFit: 'contain' },
      },
      {
        label: '오류·빈 상태',
        media: { src: 'detail/seolbiit-error-states.png', alt: '설비잇 오류와 빈 상태 화면 · Figma STATIC / DEMO', aspectRatio: '713 / 540', objectFit: 'contain' },
      },
    ],
    responsiveCards: [
      { width: '390px', rule: '현장 점검·작업 실행' },
      { width: '1024px', rule: '점검 기록·상태 확인' },
      { width: '1440px', rule: '작업 관리·담당자 배정' },
    ],
    scope: {
      actual: [
        'Figma 정보 구조와 모바일 9개 화면',
        '태블릿 점검과 데스크톱 작업 관리',
        '반응형·상태·접근성 기준',
      ],
      demoStatic: [
        '가상 설비·사용자·작업 기록',
        '요청·배정·완료·재점검 상태 시뮬레이션',
        '실제 코드/API가 없는 Figma 운영 UI',
      ],
      notIncluded: [
        '실제 API·서버',
        '센서 연동·예지보전',
        '법정 안전 기준 적용',
        '실제 현장 사용자 조사',
      ],
    },
    aiCollaboration: [
      { label: 'USER LED', value: '목적 · 범위 · 현장 흐름 · 최종 판단' },
      { label: 'AI ASSISTED', value: '화면 감사 · 카피 초안 · Figma 편집 보조' },
      { label: 'USER VERIFIED', value: 'node metadata · Screenshot · 권리·범위 확인' },
    ],
    resultLimit: {
      done: '현장과 관리자 역할을 분리하고 점검 기록을 다음 정비·재점검으로 연결한 반응형 운영 UI를 설계했습니다.',
      limit: '실제 서비스 코드·API·센서 연동과 현장 사용자 테스트는 수행하지 않았습니다.',
    },
  },
  'bus-arrival': {
    responsiveNotApplicable: true,
    hero: {
      summary: '교육 과정 제한 시간 과제로 시작한 화면을 바탕으로, 이동 중 도착 정보를 빠르게 확인하도록 정보 구조·상태·컴포넌트와 Prototype을 다시 정리한 모바일 UI입니다.',
      media: [
        { src: 'thumbnails/bus-arrival-ui-thumbnail.png', alt: '울산 버스 도착정보 Figma Prototype · final screen composite · static sample', objectFit: 'contain' },
      ],
      mediaLabel: 'Figma final screens · 360px mobile prototype · static sample',
    },
    context: {
      problem: '이동 중에는 정류장·노선·도착 정보를 짧은 시간 안에 구분해야 하지만, 정보가 같은 무게로 반복되면 다음 버스를 빠르게 판단하기 어렵습니다.',
      goal: '즐겨찾기 정류장의 다음 버스를 Home에 우선 배치하고, Search → Station Detail → Route Detail과 예외 상태를 하나의 흐름으로 연결합니다.',
    },
    // Phase 5D-F3(지시서 3-E): 원본 세로 mobile screenshot 비율(275/500~555,
    // 약 0.5)을 Decision/Main Screens 카드 폭 그대로 쓰면 1024에서 페이지가
    // 8000px대로 늘어난다(전체 section 제거 없이 media stage 비율만 원인).
    // 원본 PNG는 그대로 두고 카드의 controlled stage 비율만 `3 / 2`로 고정한다
    // (objectFit 기본값 contain이라 전체 화면이 letterbox로 잘리지 않고 보인다).
    decisions: [
      {
        title: '반복 조회 정보를 Home에 우선 배치했습니다.',
        choice: '즐겨찾기 정류장·다음 버스·도착 임박 정보를 첫 화면에 배치',
        reason: '이동 중 가장 먼저 필요한 판단을 화면 이동 없이 확인하기 위해',
        verification: '최종 Figma Home에서 시청앞·곧 도착·전체 도착정보 진입 확인',
        media: { src: 'detail/bus-arrival-01-home.png', alt: '울산 버스 도착정보 Figma Prototype · Home · static sample', aspectRatio: '3 / 2' },
      },
      {
        title: '검색의 기본·결과·결과 없음 상태를 분리했습니다.',
        choice: 'Recent Empty · Search Result · No Result를 독립 상태로 구성',
        reason: '입력 전 상태와 검색 실패를 같은 빈 화면으로 오해하지 않게 하기 위해',
        verification: '최종 Figma Search와 상태 Prototype 연결 확인',
        media: { src: 'detail/bus-arrival-02-search.png', alt: '울산 버스 도착정보 Figma Prototype · Search · static sample', aspectRatio: '3 / 2' },
      },
      {
        title: '방향별 주요 정류장을 Timeline으로 정리했습니다.',
        choice: '동일 노선의 방향 탭과 한 방향 세로 Timeline',
        reason: '양방향 정보를 한 화면에 압축해 생기는 판독 문제를 줄이기 위해',
        verification: '215번 농소·덕하 방향 CHANGE_TO와 세로 스크롤 확인',
        media: { src: 'detail/bus-arrival-04-route-detail.png', alt: '울산 버스 도착정보 Figma Prototype · Route Detail · static sample', aspectRatio: '3 / 2' },
      },
      {
        title: '빈 상태와 데이터 오류의 복구 흐름을 구분했습니다.',
        choice: 'Recent Empty · No Result · Loading · Error 상태와 복구 행동',
        reason: '검색 결과 없음과 데이터 로딩 실패를 서로 다른 문제로 안내하기 위해',
        verification: 'Error → Loading → Station Detail과 Search 상태 연결 확인',
        media: { src: 'detail/bus-arrival-05-states.png', alt: '울산 버스 도착정보 Figma Prototype · Empty, Loading, Error states · static sample', aspectRatio: '1000 / 563' },
      },
    ],
    // Search는 Decision 02 증거로만 쓰고 Main Screens에는 다시 넣지 않는다.
    mainScreens: [
      { label: 'Home', media: { src: 'detail/bus-arrival-01-home.png', alt: '울산 버스 도착정보 Figma Prototype · Home · static sample', aspectRatio: '3 / 2' } },
      { label: 'Route Detail', media: { src: 'detail/bus-arrival-04-route-detail.png', alt: '울산 버스 도착정보 Figma Prototype · Route Detail · static sample', aspectRatio: '3 / 2' } },
      { label: 'Station Detail', media: { src: 'detail/bus-arrival-03-station-detail.png', alt: '울산 버스 도착정보 Figma Prototype · Station Detail · static sample', aspectRatio: '3 / 2' } },
    ],
    scope: {
      actual: [
        'Figma 정보 구조·모바일 UI·컴포넌트·Prototype 설계',
        '최종 화면 10개와 상태·접근성 QA',
        '울산 BIS 공개정보 재검토 · 2026.07.28',
      ],
      demoStatic: [
        '정적 예시 정류장·노선·도착 정보',
        '도착 분·남은 정류장 수·저상 여부는 시연값',
        'AI는 화면 감사·카피·접근성 QA·Figma 편집 보조에 활용',
      ],
      notIncluded: [
        '실시간 버스 API·차량 위치·운행 변경',
        '실제 Push·OS 알림 권한·데이터 저장',
        '웹·네이티브 앱 코드 구현·계정·로그인·사용성 테스트',
      ],
    },
    resultLimit: {
      done: '교육 과정 과제에서 출발한 화면을 최종 화면 10개, 의미 기반 컴포넌트와 상태, 방향별 노선 타임라인, 접근성 QA와 프로토타입 흐름으로 리파인했습니다.',
      limit: '실행 앱이 아닌 360px Figma Prototype입니다. 실제 API·실시간 위치·Push·계정·코드 구현과 사용자 조사·사용성 검증은 포함하지 않았습니다.',
    },
  },
};
