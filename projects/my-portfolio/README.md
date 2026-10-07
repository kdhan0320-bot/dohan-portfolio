# 김도한 | UX/UI · 웹퍼블리싱 포트폴리오

사용자 흐름과 정보 구조를 정리하고, Figma 설계와 React/MUI 구현으로 연결하는 신입 UX/UI 웹디자이너·웹퍼블리셔 포트폴리오입니다.

배포 주소: https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/

---

## 목표 직무

- 신입 UX/UI 웹디자이너
- 웹퍼블리셔 (HTML·CSS 기반 화면 구현)
- 서비스기획형 프론트엔드 주니어
- AI 활용 UX/UI 포트폴리오
- B2B/업무툴 UI 구현형 주니어

---

## 판단 기준

포트폴리오 관련 판단은 아래 순서를 우선한다.

1. 채용자가 빠르게 이해하는가
2. 가독성/정렬이 명확한가
3. 사실에 기반하는가(과장·미구현 기능 없음)
4. 기능/반응형/접근성이 실제로 동작하는가
5. 개인성과 UI/UX 흐름을 반영하는가
6. 장식/모션이 위 기준을 해치지 않는가

---

## 주요 기술

| 분류 | 기술 |
|------|------|
| Frontend | HTML, CSS, JavaScript |
| Framework | React 18, MUI (Material UI v9) |
| Design | Figma |
| Routing | React Router v7 |
| Tool | GitHub, GitHub Pages, GitHub Actions |
| Workflow | 생성형 AI 도구를 문장 정리·코드 점검·개선안 비교에 보조적으로 활용 |

---

## 페이지 구조

- `/` — Header(고정) → Hero → About(소개·기술 스택) → Featured Projects(공정봄·갈피록·설비잇 3개 카드 + 전용 상세 페이지) → Selected Works(울산 버스 도착정보·Streaming UI Concept) → Contact
- `/about` — 별도 페이지가 아니라 Home의 About 섹션으로 리다이렉트됩니다(`App.jsx`의 `<Navigate>` + `HomePage.jsx`의 `location.state.scrollTo` 재사용).
- `/projects` — Hero(작업 소개 + 실제 공개 수치를 보여주는 dark View Guide 패널) →
  Featured(공정봄·갈피록·설비잇 3개를 동일 구조 카드로 비교, 상세 라우트로 이동) → More Works(공개
  플래그가 있는 Portfolio Feedback Hub·울산 버스 도착정보·Streaming UI Concept·BREWSTEP 4개) → Footer(홈/메일 이동) 순서로 구성됩니다.
  View Guide의 FEATURED/MORE WORKS 숫자는 고정 문구가 아니라 실제 데이터에서 계산합니다.
  별도 Archive 모달은 없습니다 — 공개 판단이 끝난 프로젝트만 데이터의
  `moreWorksPublished` 플래그로 표시하고, 판단 전인 내부 초안은 공개 화면 어디에도
  노출되지 않습니다. CSS viewport 2480px 이상에서는 Featured/More Works/Footer
  여백에 QHD 01–03 section index 워터마크가 추가로 표시됩니다(`aria-hidden`,
  클릭 불가 — 2480 미만은 장식이 부분적으로 잘리는 대신 아예 숨깁니다). Featured
  카드는 900px 미만 세로 1열, 900~1199px 가로형 row 1열, 1200px 이상 3열로
  배치되고, More Works는 900px 이상에서 media/content 가로형 카드로 렌더됩니다.
- `/projects/:slug` — 공개 상세 프로젝트(공정봄·갈피록·설비잇·Portfolio Feedback Hub·울산 버스 도착정보·Streaming UI Concept·BREWSTEP) 전용 상세 페이지. `ProjectDetailPage.jsx` 템플릿 하나를 재사용하고 `PROJECT_DETAIL_READY` 데이터로 내용을 구성합니다. 설비잇은 Figma 기반 STATIC / DEMO 운영 UI이며 실제 서비스 코드·API·센서 연동 프로젝트가 아닙니다.

Projects의 More Works 섹션은 데이터에 공개 플래그(`moreWorksPublished: true`)가 있는 프로젝트만 렌더링하며, 공개 항목이 없으면 섹션 자체가 나타나지 않습니다. 현재 순서는 Portfolio Feedback Hub → 울산 버스 도착정보 → Streaming UI Concept → BREWSTEP이며, Home의 Selected Works는 승인 구성에 따라 울산 버스 도착정보·Streaming UI Concept만 표시합니다.

Portfolio Feedback Hub의 공개 목록·상세는 읽기 전용으로 운영합니다. Supabase posts 읽기 결과는 live/sample/error 상태로 분리하고 운영 글이 0건이면 `SAMPLE_POSTS`를 표시합니다. 비공개 A/B 계정으로 Auth와 게시글·댓글·대댓글·좋아요 CRUD, 소유권 RLS와 profile 컬럼 보안을 검증했습니다. 공개 무료 가입·작성·댓글·좋아요, 실제 운영 사용자 콘텐츠·활성 지표, 파일 업로드·Storage, 관리자·신고·알림은 공개 범위에 포함하지 않습니다.

프로젝트 목록과 상세 정보는 `src/data/projectsFallbackData.js`를 기본 소스로 사용하고, `src/data/projectsData.js`에서 정렬·썸네일·상세 표시 구조를 조합합니다. 포트폴리오는 정적 프로젝트 데이터를 사용하며 실제 API 연동은 없습니다.

갈피록은 기존 `jobflow` 상세 slug와 `jobflow-dashboard` 배포 경로를 유지합니다. 공개 이름·소개·대표 이미지는 현재 갈피록 웹앱과 맞춥니다. 지원 마감일 달력은 제공하지만 면접 일정 등록은 제공하지 않습니다. 샘플은 브라우저 메모리에서 편집 가능하며 새로고침·샘플 초기화 시 복원됩니다. 작성 요청문 만들기는 로컬 템플릿이고 제품 내 AI 호출은 없습니다. AI의 디자인 제안·검토, 그래픽 제작, 코드 작성·검사 참여를 공개하며 사용자의 요구사항·피드백·방향 선택·공개 승인과 구분합니다.

갈피록의 현재 웹 구성은 개인 입사 지원 관리에 맞춰 상단 주 메뉴를 지원 현황·마감 일정·준비 체크·면접 연습·이용 안내로 나눕니다. 체험 진입 후 로고는 오늘의 지원(`/overview`)으로 이동하며, 첫 방문에는 서비스 소개를 엽니다. 소개 상단의 제품 미리보기와 간결한 입사 지원 설명, 지원 전(블루)·서류(로즈)·면접(앰버)·결과(세이지)의 전형별 색상을 적용합니다. 장식 화살표는 줄이고 달력·면접의 실제 이전/다음 조작은 유지합니다.

이번 갱신에서 소개 문구와 PC 캡처를 위 구현에 맞췄습니다. `97cd7f5` 공개 앱에서 메뉴·회사 기록·마감·할 일·면접의 샘플 UI를 검수했습니다. 상세 실행 범위는 앱 README에 기록하며 실제 인증·모바일 검수 완료를 뜻하지 않습니다.

갈피록 소개에는 `public/detail/galpirok-{welcome,overview,board,checklist}-pc.jpg` PC 실행 캡처를 사용합니다. 이전 JobFlow 390/1440px 캡처와 과거 검증 기록을 현재 디자인의 검증 증거로 재사용하지 않습니다. 현행 인증·DB 저장과 모바일 실기기 검증은 별도 과제로 표시합니다. 기존 이미지 파일은 이 갱신에서 삭제하지 않습니다.

갈피록의 사례 설명은 김도한의 실제 개선 요청과 화면 검토를 연결합니다. 목적의 모호함을 Context에 명시하고, 마감·준비의 우선순위 / 메뉴와 전형 분류 / 글자와 빈 상태를 ‘문제·수정·확인’ 세 행으로 정리했습니다. 라벨 13px·본문 15px의 정렬된 열을 사용하고, 같은 세 화면을 다시 나열하던 Main Screens 구간은 갈피록에서만 생략합니다. 섹션 번호도 01~04로 연결하며 다른 프로젝트의 구성·데이터는 유지합니다. 확인은 PC 구현과 샘플 조작의 범위이며 사용자 조사나 사용성 성과를 뜻하지 않습니다.


고정된 내부 경로 이동(홈으로 돌아가기, 대표 프로젝트 상세 보기, 다음 프로젝트, 404의 홈/전체 프로젝트)은 모두 React Router `Link`로 구현해 실제 `<a href>`를 렌더합니다(새 탭 열기·주소 복사·기본 브라우저 동작 지원). 조건에 따라 다른 곳으로 이동하는 Detail의 "스마트 뒤로가기"만 버튼으로 유지합니다.
일반 PUSH·REPLACE route는 새 본문의 `main#main-content`로 focus와 scroll을 함께 옮기고, browser Back·Forward POP은 pathname별 scroll memory를 복원합니다. Home의 section 이동은 `location.state.scrollTo` 계약을 유지합니다.

---

## 프로젝트 구조

```
src/
├── components/
│   ├── brand/          DMark
│   ├── layout/         Navbar, RouteEffects
│   ├── projects/       EvidenceBadges
│   ├── sections/       HeroSection, AboutSection, ProjectsSection, MoreWorksSection, ContactSection
│   └── ui/              ActionIcon, RevealOnScroll, QhdAmbientSignal(1920px+ 전용 QHD 외곽 원/선/점 장식),
│                        QhdSectionIndex(1920px+ 전용 QHD "01~04" 대형 섹션 인덱스·라벨)
├── constants/           site.js
├── data/                 projectsFallbackData.js, projectsData.js, portfolioMeta.js
├── hooks/                useInViewOnce, useScrollNav
├── pages/                HomePage, ProjectsPage, ProjectDetailPage, NotFoundPage
└── theme.js              Human Signal 디자인 토큰(HUMAN_SIGNAL) + MUI light 기반 테마(getDesignTokens) —
                         mode:'light', background/text/divider 전부 HUMAN_SIGNAL 토큰. Hero·Contact identity
                         plane·모바일 Drawer 같은 dark section은 각 컴포넌트가 명시적으로 deepHarbor/inkNavy를
                         지정해 전역 테마와 무관하게 어두운 배경을 유지한다.
```

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build
```

배포는 저장소 루트의 GitHub Actions 워크플로(`.github/workflows/deploy.yml`)가 `main` 브랜치 push 시 자동으로 빌드해 GitHub Pages에 반영합니다.

---

## 접근성 / 반응형

- heading 계층(h1 → h2 → h3) 유지
- 터치 영역 44px 이상, 모바일 본문 14px 이상, line-height 1.6 이상
- 장식용 요소는 `aria-hidden`/`pointer-events:none` 처리, `prefers-reduced-motion` 대응
- routine UI 변경은 목표 viewport와 인접 폭을 확인하고, 페이지 마일스톤은 작업
  위험에 맞는 모바일·태블릿·데스크톱 대표 폭만 확인한다.
- `tools/site-audit-kit`의 `npm run audit:detailed` 전체 검사는 배포 전 또는
  반응형 회귀 조사에만 실행한다.

이전 갱신의 갈피록 캡처 출처(2026-10-07): 직접 운영하는 공개 GitHub Pages의 가상 샘플 화면입니다. overview는 `b3b4e91` 배포에서 1363×936px, board/checklist는 `ab744ab` 배포에서 각각 1348×926px JPEG 원본을 저장했습니다. 확대·재생성하지 않았고 실제 저장된 픽셀 비율로 표시합니다. 다른 제작자의 화면이나 이미지를 옮겨 쓰지 않았습니다.

현행 캡처(2026-10-07): 글자 크기·면접 단계 대비·배너 높이·미등록 상태를 다듬은 `17420d1`의 welcome/overview/board/checklist를 직접 브라우저 캡처했습니다. 모두 실제 JPEG 1348×926px이며 확대·이미지 생성·텍스트 교체 없이 저장했습니다. CSS viewport 1363×936과 저장된 픽셀 크기는 구분합니다.
