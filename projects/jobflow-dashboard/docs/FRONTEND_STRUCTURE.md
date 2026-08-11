# JobFlow React / Vite 구조 설명

이 문서는 현재 JobFlow의 React 18 + Vite 5 frontend 구조와 파일별 역할을 설명합니다.

## 1. 화면 구조와 HTML 역할

```text
index.html          SPA의 단일 HTML entry와 React mount root
src/App.jsx         HashRouter route·보호 route·document title
src/pages/          route별 대표 화면을 JSX로 구성
src/components/     layout과 재사용 UI를 JSX로 구성
```

- `index.html`의 `#root`에 `src/main.jsx`가 React 앱을 mount합니다.
- React Router가 hash URL에 맞는 page component를 렌더링합니다.
- 실제 landmark, heading, form, card, navigation markup은 `pages/`와 `components/`의 JSX가 담당합니다.
- `App.jsx`는 로그인하지 않았고 guest flag도 없는 사용자를 `/login`으로 보냅니다.

## 2. 스타일 역할

```text
src/theme.js                 MUI palette·typography·component 기본값
src/styles/global.css        box sizing·body/root·skip link·focus-visible
src/styles/responsive.css    공통 터치 영역·reduced motion 규칙
src/components/**/*.jsx      MUI sx 기반 layout·component별 반응형 geometry
src/pages/**/*.jsx           MUI sx 기반 page별 layout
```

현재 화면 layout의 핵심 Source of Truth는 `Layout.jsx`, `Header.jsx`, `Sidebar.jsx`, 각 page의 MUI `sx`, 그리고 `theme.js`입니다.

`src/index.css`는 `global.css` 다음에 `responsive.css`를 import해 전역 규칙 위에 반응형 규칙을 적용합니다.

## 3. JavaScript·데이터 역할

```text
src/context/AuthContext.jsx          Supabase session·현재 탭 guest flag
src/hooks/useApplications.js         applications 조회·mutation
src/hooks/useChecklist.js            portfolio_checklists 조회·mutation
src/hooks/useInterviewNotes.js       interview_notes 조회·mutation
src/lib/supabase.js                  Supabase client 설정
src/constants/index.js               navigation·status·고정 guest sample
src/utils/authErrors.js              Auth 오류를 안전한 사용자 문구로 변환
src/utils/dataErrors.js              data 오류를 안전한 사용자 문구로 변환
src/utils/applicationPayload.js      applications mutable field allowlist·URL 검사
src/utils/statusHelpers.js           상태 표시·체크리스트 진행률 계산
src/utils/documentTemplateHelpers.js 문서 작성용 로컬 템플릿 생성
```

- 로그인 사용자의 data hook은 현재 사용자 ID와 RLS 경계 안에서 실제 Supabase row를 다룹니다.
- 게스트는 `constants/index.js`의 고정된 가상 sample을 읽기 전용으로 사용합니다. 실제 row와 merge하지 않습니다.
- `sessionStorage`에는 sample row가 아니라 현재 탭의 `jobflow-guest-mode` flag만 저장됩니다.
- data 작업 오류는 raw Supabase/PostgREST message 대신 `dataErrors.js`가 만든 안전한 사용자 문구로 표시합니다.
- applications insert/update 값은 `applicationPayload.js`의 mutable field allowlist를 통과합니다.

## 4. 현재 폴더 구조

```text
jobflow-dashboard/
├── .env.example
├── .gitignore
├── NOTICE.md
├── README.md
├── docs/
│   └── FRONTEND_STRUCTURE.md
├── public/
│   └── favicon.svg
├── index.html
├── eslint.config.js
├── package.json
├── package-lock.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── theme.js
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx
    │   │   ├── Layout.jsx
    │   │   └── Sidebar.jsx
    │   └── ui/
    │       ├── ActionFeedback.jsx
    │       ├── EmptyState.jsx
    │       ├── GuestReadOnlyNotice.jsx
    │       └── StatusChip.jsx
    ├── constants/
    │   └── index.js
    ├── context/
    │   └── AuthContext.jsx
    ├── hooks/
    │   ├── useApplications.js
    │   ├── useChecklist.js
    │   └── useInterviewNotes.js
    ├── lib/
    │   └── supabase.js
    ├── pages/
    │   ├── ApplicationDetailPage.jsx
    │   ├── ApplicationFormPage.jsx
    │   ├── ApplicationsPage.jsx
    │   ├── ChecklistPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── DocumentHelperPage.jsx
    │   ├── InterviewPage.jsx
    │   ├── KanbanPage.jsx
    │   ├── LoginPage.jsx
    │   ├── NotFoundPage.jsx
    │   └── SettingsPage.jsx
    ├── styles/
    │   ├── global.css
    │   └── responsive.css
    └── utils/
        ├── applicationPayload.js
        ├── authErrors.js
        ├── dataErrors.js
        ├── documentTemplateHelpers.js
        └── statusHelpers.js
```

## 5. Route·상태 계약

- `App.jsx`는 HashRouter route와 route별 document title을 관리합니다.
- `Layout.jsx`는 skip link, `main#main-content`, route 이동 뒤 focus, temporary Drawer 상태를 관리합니다.
- `Sidebar.jsx`는 `constants/NAV_ITEMS`를 기준으로 Router link와 `aria-current`를 렌더링합니다.
- `AuthContext.jsx`는 Supabase 사용자 session을 우선하고, 비인증 guest flag는 `sessionStorage`의 `jobflow-guest-mode`에 현재 탭 동안만 유지합니다.
- `/applications`, `/applications/new`, `/applications/:id`, `/applications/:id/edit`는 하나의 `지원 현황` navigation family입니다.
- `/kanban`은 상태별 column을 보여주지만 drag-and-drop 기능은 제공하지 않습니다.
- 일정 날짜를 관리하는 calendar route는 없습니다. 면접 영역은 면접 준비 메모를 관리합니다.

## 6. 문서 작성 도우미의 이름과 runtime 경계

canonical route는 `/document-helper`이며 `src/pages/DocumentHelperPage.jsx`가 화면을, `src/utils/documentTemplateHelpers.js`가 로컬 템플릿 생성을 담당합니다. 기존 `/ai-prompt`는 canonical route로 이동하는 `replace` redirect alias입니다.

사용자에게 보이는 제품명은 **문서 작성 도우미**입니다. 동작은 입력 내용을 브라우저 안에서 **local template** 문자열로 조합하고 복사하는 것입니다. 제품 runtime의 외부 LLM/API 호출은 **0건**이며, 앱이 AI 답변을 직접 생성하거나 저장하지 않습니다.

## 7. 전통적인 분류와의 대응

| 역할 | 전통적인 구성 | 현재 React/Vite 구성 |
| --- | --- | --- |
| HTML | page별 `.html` | `index.html` 1개 + JSX page/component |
| CSS | 독립 CSS 파일 중심 | MUI `sx` + `theme.js` + 최소 전역 CSS |
| JavaScript | 하나의 script 또는 파일 유형별 폴더 | route·component·hook·context·utility 역할별 module |
| 상태·data | DOM 직접 갱신 | React state/context + Supabase hook |
