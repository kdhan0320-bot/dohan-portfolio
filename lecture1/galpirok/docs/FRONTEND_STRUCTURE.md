# 갈피록 프론트엔드 구조

2026-09-27, 공개 배포 및 마감 점검 기준. 실제 라우트는 `src/App.jsx`가 기준입니다.

## 화면과 흐름

- 비로그인: `/welcome` → 샘플 체험 또는 `/login` → `/overview`.
- 주 메뉴: 오늘의 지원 / 지원 현황 / 마감 일정 / 준비 체크 / 면접 연습.
- 지원 현황 `/`에서 `company` 또는 `new=1` 검색 매개변수로 오른쪽 회사 패널을 엽니다. `q`, `lane`, `view`는 검색·모바일 전형·보류함입니다.
- 마감 일정 `/calendar`는 `month=YYYY-MM`, `date=YYYY-MM-DD`로 선택을 보존합니다. 회사 링크는 현황판의 해당 회사 패널을 엽니다.
- 기존 `/applications`, 상세·수정·추가, `/kanban` URL은 현황판/회사 패널로 이동합니다. `/ai-prompt`는 `/document-helper`로 이동합니다.

## 역할별 파일

| 파일 | 역할 |
| --- | --- |
| `pages/WelcomePage.jsx`, `components/ui/ProductPreview.jsx` | 서비스 소개·샘플 진입·전환 가능한 제품 예시 |
| `pages/DashboardPage.jsx` | 실제 기록으로 가까운 마감·지원 중 회사·남은 할 일 표시 |
| `pages/ApplicationsPage.jsx`, `components/applications/ApplicationPanel.jsx` | 회사 카드·검색·상태 변경·추가·삭제·미저장 이탈 확인 |
| `pages/CalendarPage.jsx`, `utils/calendar.js` | 마감 달력·날짜 검증·월 이동·미지원 회사 선택 |
| `pages/ChecklistPage.jsx`, `pages/InterviewPage.jsx` | 할 일·면접 질문 추가·편집·삭제·완료 관리 |
| `context/AuthContext.jsx` | 실제 인증 상태와 샘플 데이터 3개 집합 관리 |
| `hooks/useApplications.js`, `useChecklist.js`, `useInterviewNotes.js` | 사용자별 DB 요청 또는 샘플 메모리 변경 |
| `components/ui/Field.jsx` | 외부 고정 라벨·입력·설명·오류 연결 |
| `components/layout/` | 주 메뉴·모바일 Drawer·본문 포커스 |
| `components/ui/PaperGraphic.jsx`, `assets/galpi-paper-field.svg` | 원본 기능별 벡터와 장식용 종이 배경 |
| `utils/recordPayload.js` | 기록 수정 필드 제한과 빈 값·분류 검증 |
| `components/ui/CompletionRing.jsx` | 실제 완료 건수/전체 건수의 접근 가능한 SVG 진행도 |
| `styles/workspace.css` | 파일 분류함·준비 진행판·면접 연습 카드와 해당 반응형 규칙 |
| `styles/visual.css` | 소개·로그인·내부 화면의 배경 및 그래픽 배치 |
| `styles/global.css`, `responsive.css`, `website.css` | 공통 컴포넌트·반응형·소개/오늘/달력 스타일 |

## 데이터 경계

- 실제 인증은 Supabase Auth, 실제 데이터는 사용자별 DB 요청입니다. 이번 회차에 실제 인증 서버·DB 저장을 검증하지 않았습니다.
- 연결 정보가 없는 미리보기는 계정 요청을 막고 샘플만 제공합니다. 게스트 데이터는 메모리 전용이며 새로고침 시 초기화됩니다. 샘플 진입 상태만 sessionStorage에 보관합니다.
- 달력은 `관심`·`지원 예정` 회사의 유효한 `deadline`만 사용합니다. 면접 예약·알림은 제공하지 않습니다.
- `documentTemplateHelpers.js`는 사용자가 입력한 내용을 로컬 템플릿으로 조합합니다. 외부 LLM/API 호출은 하지 않습니다.
- `hooks/useToday.js`는 샘플 기준일과 실제 사용자의 로컬 날짜를 구분합니다.

## 시각 자산과 보존 파일

- 제품 예시와 날짜 티켓은 원본 JSX/CSS 구성입니다. 회사 마크는 가상 회사명 첫 글자입니다.
- `Brand.jsx`의 로고 SVG, `public/fonts`의 Pretendard Variable과 OFL 전문을 사용합니다.
- 생성 WebP 정물은 `JournalArt`를 통해 설정 화면에서 사용합니다. 외부 사진·상표 이미지를 추가하지 않았습니다.
- 이전 `ApplicationDetailPage`, `ApplicationFormPage`, `StageJourney`, `applicationStages` 파일은 보존했지만 현재 라우트에서 사용하지 않습니다.
- 공개 Chrome 1363×936에서 주요 샘플 기능, 폰트 로드, 입력란, 로그인 버튼 호버와 입력란 키보드 포커스를 확인했습니다. 모바일·태블릿 및 실제 인증/DB 검증은 남아 있습니다. 상세 범위는 README의 검사 기록을 참조합니다.
