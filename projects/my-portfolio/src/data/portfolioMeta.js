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
    imageFirst: true,
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
    media('detail/current/galpirok-welcome-20261028.jpg', '갈피록 시작 화면 — 개인 입사지원 관리 소개와 회사 기록 미리보기', '1348 / 926', { mobile: { src: 'detail/current/galpirok-welcome-mobile-20261028.jpg', aspectRatio: '390 / 844', label: '현재 모바일 홈 · 가상 샘플' } }),
    [
      { title: '기록을 가리지 않는 갈피.', layout: 'wide',
        summary: '김도한은 설명·장식보다 회사 기록과 조작을 먼저 보여 달라고 요청하고, 큰 폴더 대신 그라데이션을 선택했습니다. 갈피의 인상은 로고·단계 탭·기록의 작은 표시에 남겼습니다.',
        media: media('detail/current/galpirok-overview-20261028.jpg', '갈피록 오늘의 지원 — 가까운 마감, 다음 준비와 지원 상태', '1363 / 936'),
        mediaLabel: '오늘의 지원 · 2026.09.27 기준 가상 샘플'
      },
      { title: '질문과 답변을 한곳에서 읽고 다듬기.', layout: 'wide',
        summary: '면접 질문 목록 옆에서 답변을 읽고 수정합니다. 최근 버전은 질문·회사 편집과 답변 편집의 진입을 구분하고, 긴 답변을 편집할 때의 영역과 저장·취소 위치를 정리했습니다.',
        media: media('detail/current/galpirok-interview-20261028.jpg', '갈피록 면접 연습 — 회사별 질문, 나의 답변과 수정 버튼', '1363 / 936', { mobile: { src: 'detail/current/galpirok-interview-mobile-20261028.jpg', aspectRatio: '390 / 844', label: '현재 모바일 면접 연습 · 가상 샘플' } }),
        mediaLabel: '면접 연습 · 질문과 답변 읽기'
      },
      evidence('작은 화면에서는 기록에 자리를 내주기.', '모바일 메뉴는 필요한 높이만 펼쳐지고, 긴 내용은 메뉴 안에서 스크롤하도록 구성했습니다.', '화면 전체를 메뉴로 덮기보다 현재 작업의 맥락을 남기기 위한 구성입니다.'),
    ],
    { actual: ['지원 기록·마감·준비 체크·면접 답변', '반응형 웹 화면과 편집 흐름', '계정 인증·저장 코드 — 이번 소개 갱신에서 실제 계정 미검증'], demoStatic: ['2026.09.27 기준 가상 회사 샘플', '샘플 편집은 현재 탭의 메모리 · 새로고침 시 초기화'], notIncluded: ['외부 채용 API·실시간 알림', '제품 내 AI 답변 생성', '사용자 조사·채용 성과 검증'] },
    { imageFirst: true, presentation: 'focused-decisions', decisionsTitle: '기록을 먼저 읽게 만든 선택.',
      context: { summary: '김도한의 기록·조작 우선 요청과 배치 피드백을 AI와 함께 구체적인 화면으로 옮겼습니다.' },
      aiCollaboration: [
        { label: '김도한', value: '서비스 목적·우선순위 설정, 기록·조작 우선 요청, 배치 피드백, 갈피·그라데이션 방향 선택' },
        { label: 'AI 협업', value: '구체적인 화면 제안·편집, 코드 작성·수정, 동작 검사와 캡처' }
      ],
      scopeSummary: [
        { title: '제작과 데이터', text: '개인 입사지원 관리 웹앱입니다. 공개 체험은 가상 데이터이며 샘플 편집 내용은 새로고침하면 초기화됩니다. 작성 요청문은 로컬 템플릿으로, AI 모델을 호출하지 않습니다.' },
        { title: '확인 범위', text: '소개 이미지는 2026.10.28에 확인한 공개 웹 화면입니다. 실제 계정 인증·DB 저장 유지, 모바일 실기기와 학습·채용 효과를 검증한 자료는 아닙니다.' }
      ], resultLimit: {}
    },
  ),
  seolbiit: detail(
    'seolbiit',
    media('detail/current/seolbigyeol-20261028.png', '설비결 작업 현황 — 배정 대기, 검토 대기와 진행 중 정비', '1440 / 1080'),
    [
      evidence('상태 요약에서 필요한 작업으로.', '배정 대기·정비 중·검토 대기·당일 확인 완료를 가로로 묶고, 아래에서 처리할 요청을 보여줍니다.', '전체 상태를 먼저 훑은 뒤 개별 요청으로 시선을 옮기도록 구성했습니다.'),
      evidence('요청의 내용과 다음 행동을 가까이.', '설비 사진과 증상, 요청자·담당자·완료 기한을 함께 묶고 담당자 배정을 바로 아래에 배치했습니다.', '요청을 이해한 뒤 필요한 행동을 같은 영역에서 찾도록 했습니다.', media('detail/current/seolbigyeol-20261028.png', '설비결의 배정 대기 요청과 담당자 배정 확대', '1440 / 1080', { crop: { x: 64, y: 388, width: 784, height: 520 } })),
      evidence('검토와 진행 중인 작업을 구분.', '검토 대기 보고는 조치 내용·재확인 결과와 검토 버튼을 함께 두고, 진행 중인 정비는 별도 영역에 배치했습니다.', '보고를 확인해야 하는 작업과 아직 정비 중인 작업을 구분하려는 설계입니다.'),
    ],
    { actual: ['작업 현황과 정비 운영 UI', 'Figma 화면 디자인'], demoStatic: ['가상 설비·작업·담당자', '화면 구성용 상태와 수치'], notIncluded: ['실제 서비스 코드·서버', '센서 연동·현장 사용자 조사'] },
    { imageFirst: true, decisionsTitle: '현장의 상태를 화면의 순서로.' },
  ),
  'ott-service': detail(
    'ott-service',
    media('detail/current/jansang-v37-home.jpg', '잔상관 현재 홈 — 대표 장면과 제목을 포함한 영화 포스터', '1425 / 950'),
    [
      {
        title: '제목도 작품의 분위기에 맞게.',
        layout: 'wide',
        summary: '김도한은 참고 사례를 고르고 포스터 안의 글씨가 자연스럽게 어울리도록 요청했습니다. AI가 12편의 제목·구도를 작품별로 편집했고, 웹 글자 크기·굵기는 유지했습니다. 목록에서는 포스터 전체를, 상세에서는 원래 장면을 보여줍니다.',
        media: media('detail/current/jansang-v37-browse.jpg', '잔상관 영화 찾기 — 제목과 분위기·시간 조건을 함께 비교하는 작품 격자', '1425 / 950', { mobile: { src: 'detail/current/jansang-v37-browse-mobile.jpg', original: 'detail/current/jansang-v37-browse-mobile-full.jpg', aspectRatio: '375 / 812', label: '영화 찾기 · 조건과 첫 작품 행' } }),
        mediaLabel: '영화 찾기 · 조건과 작품을 함께 비교',
        check: { result: '동작 확인 · 분위기·시간 조건 전달과 작품 상세 진입.' },
      },
      {
        title: '작품은 짧게 훑고, 메모는 따로 읽기.',
        layout: 'wide',
        summary: '검색 옆 아이콘으로 ‘메모 읽기 / 작품 훑기’를 바꾸고 선택을 유지합니다. 저장한 메모는 먼저 읽고, ‘메모 수정’에서 펼쳐 편집합니다. 짧게 훑을 때는 원문을 한 번 더 열어야 합니다.',
        mediaChoices: [
          { label: '작품 훑기', caption: '보관함 · 조작부와 세 작품(시연)', media: media('detail/current/jansang-v37-saved-full.jpg', '잔상관 보관함의 작품 훑기 — 저장한 세 작품과 메모 보기 진입', '1425 / 1042', { original: 'detail/current/jansang-v37-saved-full.jpg', relatedOriginal: { src: 'detail/current/jansang-v37-reading-full.jpg', label: '메모 읽기 목록 보기' }, mobile: { src: 'detail/current/jansang-v37-saved-mobile.jpg', original: 'detail/current/jansang-v37-saved-mobile-full.jpg', aspectRatio: '375 / 812', label: '보관함 · 작품 훑기 일부(시연)', breakpoint: 1100 } }) },
          { label: '메모 보기', caption: '같은 작품의 메모 보기 · 팝업 영역', media: media('detail/current/jansang-v37-note-full.jpg', '숲의 호흡 관심 메모 — 저장 원문을 먼저 읽고 메모 수정으로 진입하는 팝업', '1440 / 960', { original: 'detail/current/jansang-v37-note-full.jpg', mobile: { src: 'detail/current/jansang-v37-note-mobile.jpg', aspectRatio: '390 / 844', label: '같은 메모의 읽기 화면 · 수정은 별도 진입', breakpoint: 1100 } }) },
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
        media: [media('detail/current/jansang-v37-home.jpg', '잔상관 현재 홈 — 대표 장면과 제목을 포함한 영화 포스터', '1425 / 950', { original: 'detail/current/jansang-v37-home-full.jpg', mobile: { src: 'detail/current/jansang-v37-home-mobile.jpg', original: 'detail/current/jansang-v37-home-mobile-full.jpg', aspectRatio: '375 / 812', label: '홈 · 실제 모바일 첫 화면' } })],
        mediaLabel: '홈 · 대표 장면과 가로 영화 목록 — 원본에서 기획전까지 확인',
      },
      context: {
        summary: '작품명을 정하지 않은 사람이 분위기와 남는 시간으로 영화를 고르는 상황을 가정했습니다.',
      },
      decisionsNote: {
        title: '기획전에서 함께 볼 영화를 발견하기.',
        text: '김도한은 홈의 큐레이션 구간을 테마 기획전 배너로 바꾸고 상단 큐레이션 메뉴는 유지하기로 선택했습니다. 배너와 갤러리는 짧은 소개·추천작 팝업으로 연결됩니다. ‘다정한 반전’은 편지·연주·계주를 관계의 계기로 묶었습니다.',
        media: media('detail/current/jansang-v37-curation-full.jpg', '다정한 반전 — 관계의 계기로 묶은 선정작과 작품별 이유', '1440 / 960', { original: 'detail/current/jansang-v37-curation-full.jpg', mobile: { src: 'detail/current/jansang-v37-curation-mobile.jpg', aspectRatio: '390 / 844', label: '큐레이션 팝업 · 첫 두 작품과 선정 이유', breakpoint: 1100 } }),
        mediaLabel: '다정한 반전 · 팝업의 설명과 추천작',
      },
      verification: {
        method: 'Chromium에서 예시 데이터로 탐색·저장·반응형 배치를 검사했습니다.',
        limit: '사용자 조사, 실제 iOS/Safari·스크린리더, 제3자 사용성·채용 효과는 검증하지 않았습니다.',
      },
      aiCollaboration: [
        { label: '김도한', value: '참고 사례 선택, 포스터 제목·테마 기획전·홈 정렬 방향 제시, 가독성 유지와 화면 피드백, 수정·공개 판단' },
        { label: 'AI 협업', value: '디자인·큐레이션 제안·편집, OpenAI 도구로 가상 영화 이미지 생성, HTML·CSS·JavaScript 작성·브라우저 검사' },
      ],
    },
  ),
  gongjeongbom: detail(
    'gongjeongbom',
    media('detail/current/gijunseon-20261028.png', '기준선 — 비전 검사 소개, 결함 사례와 도입 과정', '1440 / 2621'),
    [
      evidence('무엇을 검사하는지 이미지로 설명합니다.', '산업 이미지 다음에 흠집·부품 누락·바코드 등 검사 사례를 배치했습니다.', '기술 용어만 읽기 전에 서비스가 다루는 문제를 볼 수 있도록 구성했습니다.'),
      evidence('사례에서 도입 과정으로 이어집니다.', '산업 이미지 다음에 제품·공정에 맞춘 솔루션 설명을 두고, 결함 사례·도입 검토·문의 순서로 구성했습니다.', '서비스의 용도를 이해한 뒤 진행 방법과 다음 행동을 찾도록 했습니다.'),
    ],
    {
      actual: ['검사 사례와 도입 과정의 정보 구조', 'Figma 웹사이트 디자인'],
      demoStatic: ['가상 서비스 소개와 검사 사례', '현재 Figma 화면'],
      notIncluded: ['최신 디자인의 웹 구현', '실제 검사·납품 실적', '사용자 조사·성과 측정'],
    },
  ),
  'feedback-hub': detail(
    'feedback-hub',
    media('detail/current/goreunsiseon-20261028.jpg', '고른시선 — 같은 A/B 화면과 목적별 비교 목표', '1348 / 926', { mobile: { src: 'detail/current/goreunsiseon-mobile-20261028.jpg', aspectRatio: '390 / 844', label: '현재 모바일 화면 · A/B 보기 전환' } }),
    [
      evidence('목표가 바뀌면 같은 화면도 다르게.', '전시 예제에서 A/B 이미지는 유지하고 전시 이름 찾기와 작품 감상하기의 목표를 바꿉니다.', '화면 자체의 우열보다 주어진 목적에 적합한 선택을 생각하도록 했습니다.'),
      evidence('화면 보기와 답 선택을 구분.', '모바일에서는 A/B 화면 전환과 답 선택을 다른 조작으로 나누고, 그림 속 버튼이 비교용임을 안내합니다.', '다른 화면을 살펴보는 행동이 곧 답을 확정하는 행동으로 이어지지 않도록 했습니다.'),
      evidence('선택 다음에는 이유와 한계.', '해설에서 유지한 요소와 바뀐 요소, 추천 이유와 다른 선택이 맞을 수 있는 상황을 설명합니다.', '정답을 외우기보다 비교 기준과 적용할 상황을 이해하도록 구성했습니다.'),
    ],
    { actual: ['고정 A/B 예제 6종과 목표별 선택', '선택 뒤 해설·핵심 원칙 정리', '모바일 비교 화면 전환'], demoStatic: ['가상 UI 예제와 미리 작성한 해설', '선택 메모는 현재 페이지 메모리'], notIncluded: ['사용자 파일 업로드·자동 평가', '학습 점수·서버 저장', '실제 학습 효과 검증'] },
    { imageFirst: true, decisionsTitle: '더 예쁜 화면에서, 목적에 맞는 화면으로.' },
  ),
  'bus-arrival': detail(
    'bus-arrival-app',
    media('detail/current/onjeongryu-20261028.png', '온정류 — 즐겨찾는 노선의 방향과 도착 시간', '390 / 844', { frameWidth: 390 }),
    [
      evidence('자주 찾는 버스를 먼저 배치합니다.', '즐겨찾는 노선의 번호·방향·도착 시간을 첫 화면의 큰 정보로 묶었습니다.', '반복 조회하는 내용을 여러 화면을 거치지 않고 살펴보도록 구성했습니다.'),
      evidence('도착 상태를 글자와 크기로 구분합니다.', '남은 분과 ‘곧 도착’ 상태를 노선 정보와 함께 표시했습니다.', '색만 보고 판단하지 않고 현재 도착 상태를 읽을 수 있도록 했습니다.', media('detail/current/onjeongryu-20261028.png', '온정류 홈의 노선 번호와 도착 시간 확대', '390 / 844', { frameWidth: 390, crop: { x: 20, y: 224, width: 350, height: 305 } })),
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
    media('detail/current/soyobit-20261028.png', '소요빛 — 카페 대표 음료와 추천 메뉴', '390 / 1114', { frameWidth: 390 }),
    [
      evidence('음료 사진과 메뉴 정보를 함께 보여줍니다.', '추천 메뉴를 먼저 보여주고, 브랜드 이미지와 페어링 제안을 뒤에 배치했습니다. 메뉴명·가격은 사진 가까이에 두었습니다.', '브랜드 분위기를 느끼면서 실제로 살펴볼 메뉴도 읽을 수 있도록 구성했습니다.'),
      evidence('주요 화면의 위치를 일정하게 둡니다.', '추천 메뉴에는 사진·맛의 표현·가격을 함께 두고, 주요 탐색 메뉴는 하단에 배치했습니다.', '프로모션을 읽은 뒤에도 메뉴 탐색으로 이동할 위치를 쉽게 찾도록 했습니다.', media('detail/current/soyobit-20261028.png', '소요빛 홈의 추천 메뉴 — 음료 사진, 맛의 표현과 가격', '390 / 1114', { frameWidth: 390, crop: { x: 24, y: 90, width: 342, height: 350 } })),
    ],
    {
      actual: ['카페의 모바일 시각 체계', '홈·메뉴 탐색 화면 디자인'],
      demoStatic: ['음료·가격·프로모션 예시', '현재 Figma 화면 시안'],
      notIncluded: ['실제 주문·결제·재고', '최신 버전의 완성된 결제 흐름', '앱 코드·사용자 조사'],
    },
    { responsiveNotApplicable: true },
  ),
};
