/* 메인과 프로젝트 상세의 공개 문구. 경로는 public 기준이며 Node에서도 읽을 수 있다. */
import { fallbackProjects } from './projectsFallbackData.js';

export const NAME = '김도한';
export const HERO_BADGE = `${NAME} | UX/UI · 웹퍼블리싱`;
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
export const APPLICATION_FOCUS = ['UX/UI 디자인', '웹퍼블리싱'];
export const TOOL_LINE = 'Figma · HTML/CSS/JavaScript · React/MUI · GitHub · AI 협업';
export const LIVE_SITE_URL = 'https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/';
export const PROJECT_GITHUB_URL = 'https://github.com/kdhan0320-bot/dohan-portfolio/tree/main/projects/my-portfolio';

const media = (src, alt, aspectRatio, extra = {}) => ({
  src, alt, aspectRatio, objectFit: 'contain', objectPosition: 'top', ...extra,
});
const evidence = (title, choice, reason, detailMedia, comparison) => ({
  title,
  evidence: [{ label: '구성', text: choice }, { label: '이유', text: reason }],
  ...(detailMedia ? { media: detailMedia } : {}),
  ...(comparison ? { comparison } : {}),
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
      media('detail/current/galpirok-welcome.jpg', '갈피록 홈 — 개인 입사지원 관리 목적과 시작 행동, 지원 기록 미리보기', '1440 / 900', { mobile: { src: 'detail/current/galpirok-welcome-mobile.jpg', aspectRatio: '375 / 812', label: '모바일 홈 · 실제 첫 화면' } }),
    [
      {
        title: '필터를 바꿔도 같은 자리에서.',
        summary: '김도한은 큰 PC 화면의 상단 쏠림과 여백을 지적했습니다. AI가 작업 폭을 정리하고 검토 중 발견한 필터 이동을 수정해, 목록 길이가 달라도 조작부 위치를 유지했습니다.',
        media: media('detail/current/galpirok-checklist-filter-empty-v2.png', '현재 준비 체크의 기타 분류 — 진행 중 0개로 바뀌어도 같은 위치에 남는 상태 탭', '2560 / 1440', { crop: { x: 630, y: 270, width: 1265, height: 610 }, mobileCrop: { x: 918, y: 383, width: 360, height: 315, label: 'PC 부분 보기 · 상태 탭과 빈 결과' }, original: 'detail/current/galpirok-checklist-filter-empty-v2.png' }),
        comparison: {
          before: media('detail/current/galpirok-checklist-filter-all-v2.png', '현재 준비 체크의 전체 분류 — 진행 중 5개와 첫 준비 항목이 있는 상태', '2560 / 1440', { crop: { x: 630, y: 270, width: 1265, height: 610 }, mobileCrop: { x: 918, y: 383, width: 360, height: 315, label: 'PC 부분 보기 · 상태 탭과 첫 준비 항목' }, original: 'detail/current/galpirok-checklist-filter-all-v2.png' }),
          beforeHeading: '전체 분류 · 5개',
          afterHeading: '기타 분류 · 0개',
          beforeLabel: '현재 · 준비 항목이 있는 작업 영역',
          afterLabel: '현재 · 준비 항목이 없는 작업 영역',
          beforeSummary: '진행 중인 준비 항목 5개를 표시합니다.',
          afterSummary: '준비 항목이 없어도 상태 탭과 목록 시작 위치를 유지합니다.',
          note: '현재 버전의 두 필터 상태입니다. 같은 2560×1440 원본의 일부를 표시하며, 개선 전후 비교는 아닙니다.',
          layout: 'workspace',
        },
      },
      {
        title: '기록을 가리지 않는 갈피.',
        summary: '김도한은 설명·장식보다 회사 기록과 조작을 먼저 보여 달라고 요청하고, 큰 폴더 대신 그라데이션을 선택했습니다. AI가 배경을 구현하고 갈피는 로고·단계 탭·선택 표시에 남겼습니다.',
      },
      {
        title: '가까운 마감부터 확인하기.',
        summary: 'AI 검토에서 날짜 조작부에 밀린 회사 기록과 다음 달 마감 누락을 확인했습니다. 목록을 먼저 보여주고, 날짜 탐색은 필요할 때 펼치도록 정리했습니다.',
        media: media('detail/current/galpirok-calendar-mobile.jpg', '개선한 모바일 마감 일정 — 다가오는 마감 목록을 먼저 확인하고 날짜 탐색을 펼치는 화면', '390 / 844', { frameWidth: 390, crop: { x: 15, y: 125, width: 345, height: 505 }, original: 'detail/current/galpirok-calendar-mobile.jpg' }),
        comparison: {
          before: media('detail/galpirok-calendar-before-mobile.jpg', '개선 전 모바일 마감 일정 — 9월의 마감만 보이는 기본 목록', '390 / 844', { frameWidth: 390, crop: { x: 15, y: 125, width: 345, height: 505 }, original: 'detail/galpirok-calendar-before-mobile.jpg' }),
          beforeLabel: '모바일 마감 · 개선 전',
          afterLabel: '모바일 마감 · 개선 후',
          beforeSummary: '9월 목록에서 10월 2일 마감을 보려면 다음 달로 이동해야 했습니다.',
          afterSummary: '9월 29일과 10월 2일 마감을 한 목록에서 확인합니다.',
          note: '2026.09.27 기준 가상 데이터 · 390×844 화면의 동일 영역을 부분 표시합니다. 전체 원본도 제공합니다.',
          layout: 'mobile',
        },
      },
    ],
    {
      actual: ['지원 현황·마감 목록과 달력', '준비 체크·면접 질문과 답변', '인증·사용자별 저장 코드 — 실제 계정 미검증'],
      demoStatic: ['가입 없이 편집 가능한 가상 샘플', '2026.09.27 기준 · 새로고침하면 초기화', '요청문 만들기는 로컬 템플릿'],
      notIncluded: ['실시간 알림·외부 채용 API', '면접 일정 등록·통계·드래그 이동', '제품 내 AI 문장 생성'],
    },
    {
      imageFirst: true,
      openingFacts: true,
      presentation: 'focused-decisions',
      decisionsTitle: '기록을 먼저 읽게 만든 선택.',
      context: { summary: '기록·조작 우선과 큰 화면 배치에 대한 김도한의 요구, AI가 발견한 동작 문제를 반영한 세 사례입니다. 방향 선택과 구현·검사 역할을 구분했습니다.' },
      heroNote: {
        title: '한 회사의 기록에서 다음 준비까지.',
        text: '지원할 회사를 직접 등록하고 상태·마감·준비할 일을 연결합니다. 같은 회사의 기록을 다시 만들지 않고 준비부터 지원 완료까지 관리합니다.',
      },
      aiCollaboration: [
        { label: '김도한', value: '개인 입사지원 관리 목적 설정, 기록·조작 우선 요청, 큰 화면 배치 피드백, 갈피 유지·그라데이션 선택과 공개 판단.' },
        { label: 'AI 협업', value: '구체적인 화면·스타일 제안, 코드 작성·수정, 샘플·코드 검사와 캡처.' },
      ],
      serviceFlow: {
        title: '한 회사의 지원 과정.',
        summary: '모션브릿지 · 웹 퍼블리셔 · 9월 29일 마감',
        note: '2026.09.27 기준 가상 회사의 실제 캡처입니다. 단계 선택은 이미지 보기만 바꿉니다.',
        steps: [
          {
            label: '기록', screen: '01 / 지원 현황', title: '지원할 회사의 기록을 확인합니다.',
            action: '모션브릿지의 직무·지원 예정 상태·9월 29일 마감을 한 기록에 모았습니다.',
            result: '이 회사 기록을 기준으로 마감과 준비 항목이 연결됩니다.',
            media: media('detail/current/galpirok-flow-record.jpg', '모션브릿지의 회사 기록 — 웹 퍼블리셔, 지원 예정, 9월 29일 마감', '1440 / 900', { frameWidth: 540, crop: { x: 885, y: 0, width: 540, height: 900 }, original: 'detail/current/galpirok-flow-record.jpg', mobile: { src: 'detail/current/galpirok-flow-record-mobile.jpg', aspectRatio: '390 / 844', label: '모션브릿지 · 지원 예정 기록' } }),
            caption: '모션브릿지 · 회사 상세 부분 보기',
          },
          {
            label: '마감', screen: '02 / 마감 일정', title: '지원 전에 남은 날짜를 봅니다.',
            action: '9월 29일 마감과 다음 달의 가까운 마감을 함께 확인합니다.',
            result: '마감 목록은 관심·지원 예정 상태의 회사만 보여줍니다.',
            media: media('detail/current/galpirok-flow-deadline.jpg', '마감 일정의 모션브릿지 — 9월 29일 마감과 다음 달의 가까운 마감', '1425 / 990', { crop: { x: 32, y: 167, width: 1347, height: 772 }, original: 'detail/current/galpirok-flow-deadline.jpg', mobile: { src: 'detail/current/galpirok-flow-deadline-mobile.jpg', aspectRatio: '390 / 844', label: '모션브릿지 · 9월 29일 마감' } }),
            caption: '모션브릿지 · 마감 일정 작업 영역 부분 보기',
          },
          {
            label: '준비', screen: '03 / 준비 체크', title: '이 회사에 필요한 준비를 마칩니다.',
            action: '모션브릿지에 연결된 준비 항목을 완료로 표시합니다. 공통 준비도 따로 관리합니다.',
            result: '항목 완료는 지원 상태를 자동으로 바꾸지 않습니다.',
            media: media('detail/current/galpirok-flow-ready.jpg', '모션브릿지를 선택한 준비 체크 — 연결된 준비 항목의 완료 상태', '1440 / 900', { crop: { x: 53, y: 169, width: 1320, height: 650 }, original: 'detail/current/galpirok-flow-ready.jpg', mobile: { src: 'detail/current/galpirok-flow-ready-mobile.jpg', aspectRatio: '390 / 844', label: '모션브릿지 · 준비 항목 완료' } }),
            caption: '모션브릿지 · 준비 체크 작업 영역 부분 보기',
          },
          {
            label: '지원 완료', screen: '04 / 지원 현황', title: '제출 후 같은 기록의 상태를 바꿉니다.',
            action: '같은 회사 기록의 상태를 지원 완료로 저장합니다.',
            result: '지원 완료로 바꾸면 지원 전 회사의 마감 목록에서 제외됩니다.',
            media: media('detail/current/galpirok-flow-applied.jpg', '모션브릿지의 회사 기록 — 지원 완료로 저장한 상태', '1440 / 900', { frameWidth: 540, crop: { x: 885, y: 0, width: 540, height: 900 }, original: 'detail/current/galpirok-flow-applied.jpg', mobile: { src: 'detail/current/galpirok-flow-applied-mobile.jpg', aspectRatio: '390 / 844', label: '모션브릿지 · 지원 완료로 변경' } }),
            caption: '모션브릿지 · 지원 완료 상세 부분 보기',
          },
        ],
      },
      scopeTitle: '구현 범위와 확인하지 않은 것.',
      scopeSummary: [
        { title: '구현과 샘플', text: '지원 현황·마감·준비 체크·면접 답변을 관리합니다. 샘플은 2026.09.27 기준 가상 데이터이며 편집 내용은 현재 탭의 메모리에만 남습니다. 새로고침하면 초기화됩니다.' },
        { title: '검증의 경계', text: '샘플·코드·PC와 모바일 브라우저 화면을 확인했습니다. 실제 계정 인증·DB 저장 유지, 모바일 실기기, 사용자 조사·채용 성과는 검증하지 않았습니다.' },
      ],
      verification: {
        method: '실시간 알림·외부 채용 API·면접 일정 등록·통계·드래그 이동은 제공하지 않습니다. 작성 요청문 만들기는 로컬 템플릿이며 AI 모델을 호출하지 않습니다.',
      },
      resultLimit: {},
    },
  ),
  seolbiit: detail(
    'seolbiit',
    media('detail/current/seolbigyeol-home.png', '설비결 작업 현황 — 상태 요약과 우선 작업 카드', '1440 / 1200'),
    [
      evidence(
        '요청 확인과 배정 영역을 구분했습니다.',
        '접수 목록과 선택 요청 상세 옆에 담당자·완료 기한·배정 버튼을 별도 영역으로 묶었습니다.',
        '요청의 내용을 읽는 영역과 배정에 필요한 정보를 확인하는 영역을 구분하려는 설계입니다.',
        media('detail/current/seolbigyeol-requests.png', '설비결 정비 요청 — 요청 목록과 선택 상세, 담당자 배정', '1440 / 1200'),
        {
          before: media('detail/seolbiit-desktop-management.png', '이전 설비잇 정비 작업 관리 — 작업표와 진행 단계·최근 기록이 모인 상세 패널', '1440 / 900'),
          beforeLabel: '이전 · 설비잇 정비 작업 관리',
          afterLabel: '현재 · 설비결 정비 요청',
          beforeSummary: '작업 표 옆의 상세 패널에 요청 정보, 진행 단계, 최근 기록과 배정 버튼이 함께 놓여 있었습니다.',
          afterSummary: '요청을 확인하는 영역과 담당자·기한을 확인하고 배정하는 영역을 분리했습니다.',
          note: '동일 프로젝트의 이전·현재 Figma 시안입니다. 화면 구성의 변화이며, 현장 사용자 검증은 진행하지 않았습니다.',
        },
      ),
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
    media('detail/current/jansang-v36-home.jpg', '잔상관 현재 홈 — 영화 포스터와 하단 위치 표시', '1440 / 960'),
    [
      {
        title: '홈에서는 발견하고, 영화 찾기에서는 비교하기.',
        layout: 'wide',
        summary: '김도한은 글씨를 더 줄이지 않고 영화가 먼저 보이도록 요청했습니다. 홈의 포스터와 영화 찾기의 장면·제목을 구분하고, 겹친 선과 조작부를 줄였습니다.',
        media: media('detail/current/jansang-v36-browse.jpg', '잔상관 영화 찾기 — 제목과 분위기·시간 조건을 함께 비교하는 작품 격자', '1440 / 960', { mobile: { src: 'detail/current/jansang-v36-browse-mobile.jpg', original: 'detail/current/jansang-v36-browse-mobile-full.jpg', aspectRatio: '390 / 844', label: '영화 찾기 · 조건과 첫 작품 행' } }),
        mediaLabel: '영화 찾기 · 조건과 작품을 함께 비교',
        check: { result: '동작 확인 · 분위기·시간 조건 전달과 작품 상세 진입.' },
      },
      {
        title: '작품은 짧게 훑고, 메모는 따로 읽기.',
        layout: 'wide',
        summary: '검색 옆 아이콘으로 ‘메모 읽기 / 작품 훑기’를 바꾸고 선택을 유지합니다. 저장한 메모는 먼저 읽고, ‘메모 수정’에서 펼쳐 편집합니다. 짧게 훑을 때는 원문을 한 번 더 열어야 합니다.',
        mediaChoices: [
          { label: '작품 훑기', caption: '보관함 · 조작부와 세 작품(시연)', media: media('detail/current/jansang-v36-saved.jpg', '잔상관 보관함의 작품 훑기 — 저장한 세 작품과 메모 보기 진입', '1440 / 468', { original: 'detail/current/jansang-v36-saved-full.jpg', relatedOriginal: { src: 'detail/current/jansang-v36-reading-full.jpg', label: '메모 읽기 목록 보기' }, mobile: { src: 'detail/current/jansang-v36-saved-mobile.jpg', original: 'detail/current/jansang-v36-saved-mobile-full.jpg', aspectRatio: '390 / 844', label: '보관함 · 작품 훑기 일부(시연)', breakpoint: 1100 } }) },
          { label: '메모 보기', caption: '같은 작품의 메모 보기 · 팝업 영역', media: media('detail/current/jansang-v36-note.jpg', '숲의 호흡 관심 메모 — 저장 원문을 먼저 읽고 메모 수정으로 진입하는 팝업', '1440 / 599', { original: 'detail/current/jansang-v36-note-full.jpg', mobile: { src: 'detail/current/jansang-v36-note-mobile.jpg', aspectRatio: '390 / 844', label: '같은 메모의 읽기 화면 · 수정은 별도 진입', breakpoint: 1100 } }) },
        ],
        check: { result: '동작 확인 · 메모 검색·읽기·수정·삭제 복원과 보기 선택 유지.' },
      },
    ],
    {
      actual: ['HTML·CSS·JavaScript 반응형 웹', '분위기·러닝타임·검색·정렬·작품 상세', '큐레이션 3개·찜·관심 메모·내 보관함'],
      demoStatic: ['가상 단편영화 12편과 AI 생성 이미지', '메모 화면은 검사 브라우저의 시연 예시', '해당 브라우저의 localStorage 저장'],
      notIncluded: ['실제 영상 재생·예매·결제', '회원가입·외부 API·서버 저장'],
    },
    {
      imageFirst: true,
      presentation: 'focused-decisions',
      decisionsTitle: '영화를 먼저 보고, 고른 이유를 남기기.',
      scopeTitle: '제작 범위와 한계',
      scopeSummary: [
        { title: '구현과 데이터', text: '가상 영화 12편과 AI 생성 이미지로 구성하며, 소개의 메모는 시연입니다. 찜·메모·보기 설정은 해당 브라우저의 localStorage에 저장됩니다.' },
        { title: '제공하지 않는 기능', text: '영상 재생·예매·결제·회원가입·외부 API·서버 저장은 제공하지 않습니다.' },
      ],
      resultLimit: {},
      hero: {
        summary: '분위기와 시간으로 단편영화를 찾고, 관심 작품과 메모를 모으는 반응형 웹입니다.',
        media: [media('detail/current/jansang-v36-home.jpg', '잔상관 현재 홈 — 영화 포스터와 하단 위치 표시', '1440 / 960', { mobile: { src: 'detail/current/jansang-v36-home-mobile.jpg', aspectRatio: '390 / 844', label: '홈 · 실제 모바일 첫 화면' } })],
        mediaLabel: '홈 · 실제 가로 목록 화면',
      },
      context: {
        summary: '작품명을 정하지 않은 사람이 분위기와 남는 시간으로 영화를 고르는 상황을 가정했습니다.',
      },
      decisionsNote: {
        title: '큐레이션 · 함께 보는 이유',
        text: '김도한이 전달한 갤러리·짧은 팝업 피드백을 반영했습니다. ‘다정한 반전’은 편지·엘리베이터·연주·계주를 관계의 계기로 묶고, 이미지 옆에 고른 이유를 남깁니다.',
        media: media('detail/current/jansang-v36-curation.jpg', '다정한 반전 — 관계의 계기로 묶은 선정작과 작품별 이유', '1440 / 499', { original: 'detail/current/jansang-v36-curation-full.jpg', mobile: { src: 'detail/current/jansang-v36-curation-mobile.jpg', aspectRatio: '390 / 844', label: '큐레이션 팝업 · 첫 두 작품과 선정 이유', breakpoint: 1100 } }),
        mediaLabel: '다정한 반전 · 팝업의 설명과 추천작',
      },
      verification: {
        method: 'Chromium에서 예시 데이터로 탐색·저장·반응형 배치를 검사했습니다.',
        limit: '사용자 조사, 실제 iOS/Safari·스크린리더, 제3자 사용성·채용 효과는 검증하지 않았습니다.',
      },
      aiCollaboration: [
        { label: '김도한', value: '이미지 우선·가독성 유지 방향 제시, 화면 피드백, 개선 우선순위 선택, 수정·공개 판단' },
        { label: 'AI 협업', value: '디자인·큐레이션 제안·편집, OpenAI 도구로 가상 영화 이미지 생성, HTML·CSS·JavaScript 작성·브라우저 검사' },
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
