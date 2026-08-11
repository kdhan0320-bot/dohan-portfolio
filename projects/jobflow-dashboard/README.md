# JobFlow 구직 관리 대시보드

지원 상태와 다음 행동을 한 화면에서 정리하는 개인 구직 관리 대시보드입니다. 여러 지원 건의 전형 상태, 체크리스트, 면접 메모를 한 흐름에 묶어 사용자가 지금 할 일을 빠르게 판단하도록 만들었습니다.

## 제작 목적

여러 회사에 지원할 때 흩어지기 쉬운 지원 현황과 준비 작업을 한곳에서 관리하는 것이 목적입니다. SNS나 커뮤니티가 아니라 개인의 지원 데이터 정리와 상태 관리에 집중하며, 로그인 사용자의 실제 데이터와 방문자가 둘러보는 고정 샘플을 분리합니다.

## 주요 기능

- 로그인 / 이메일 확인 회원가입(Supabase Auth)
- 로그인 사용자별 지원 회사 CRUD(Supabase PostgreSQL + RLS)
- 지원 회사 검색 / 상태 필터 / 회사명·최신순·오래된순 정렬
- 전형 상태별 칸반형 보드
- 포트폴리오 체크리스트와 진행률
- 면접 준비 메모와 중요도 / 복습 완료 관리
- 문서 작성 도우미(브라우저 내 로컬 템플릿 생성·복사)
- 모바일 / 태블릿 / 데스크톱 반응형 UI
- 고정된 가상 샘플을 읽기 전용으로 확인하는 게스트 모드

## 사용 기술

| 분류 | 기술 |
| --- | --- |
| 프레임워크 | React 18, Vite 5 |
| UI 라이브러리 | Material UI(MUI) 9 |
| 라우팅 | React Router 7 |
| 백엔드 / DB | Supabase(Auth + PostgreSQL + RLS) |
| 배포 | GitHub Pages, GitHub Actions |

## UX/UI 포인트

- 상태 Chip으로 지원 흐름을 빠르게 파악
- 지원 현황·체크리스트·면접 메모를 연결해 다음 행동 판단 지원
- 검색·필터·정렬로 지원 회사 탐색
- 모바일에서는 지원 목록을 카드형 레이아웃으로 전환
- 샘플 대시보드로 회원가입 전 제품 범위 확인
- 문서 작성 도우미로 자기소개서·면접 답변용 텍스트 구조화

## 게스트 모드 안내

로그인 화면의 **샘플 대시보드 둘러보기** 버튼을 누르면 회원가입 없이 고정된 가상 샘플 데이터를 읽기 전용으로 확인할 수 있습니다.

- 지원 현황, 체크리스트, 면접 메모, 전형 보드의 샘플은 실제 사용자 데이터가 아닙니다.
- 조회, 검색, 상태 필터, 회사명·최신순·오래된순 정렬, 문서 작성용 로컬 템플릿 생성은 게스트 모드에서도 동작합니다.
- 8개 지원 샘플에는 서로 다른 `created_at`이 있어 최신순과 오래된순의 실제 표시 순서가 바뀝니다.
- 저장·수정·삭제는 로그인 후 사용할 수 있으며, 게스트에서는 관련 동작이 제한됩니다.
- `sessionStorage`에는 현재 탭의 `jobflow-guest-mode` flag만 저장됩니다. 샘플 row 자체가 브라우저 저장소에 저장되는 것은 아닙니다.
- 게스트 샘플과 로그인 사용자의 실제 데이터는 병합하지 않습니다.

로그인 사용자의 지원 현황·체크리스트·면접 메모는 Supabase Auth session과 사용자별 RLS 정책을 기준으로 실제 DB에 저장됩니다.

## 폴더 구조

```text
jobflow-dashboard/
├── .env.example                      환경변수 이름 예시(값 없음)
├── .gitignore
├── NOTICE.md                         자산·direct runtime dependency 안내
├── README.md
├── docs/
│   └── FRONTEND_STRUCTURE.md         현재 React/Vite 구조 문서
├── public/
│   └── favicon.svg
├── index.html                        SPA 진입 HTML과 기본 meta
├── eslint.config.js
├── package.json
├── package-lock.json
├── vite.config.js
└── src/
    ├── App.jsx                       route·document title
    ├── index.css                     전역 style entry
    ├── main.jsx                      React mount
    ├── theme.js                      MUI theme
    ├── components/                   layout·공통 UI
    ├── constants/                    navigation·고정 guest sample
    ├── context/                      AuthContext·게스트 flag
    ├── hooks/                        Supabase data hooks
    ├── lib/                          Supabase client
    ├── pages/                        route page JSX
    │   └── DocumentHelperPage.jsx    문서 작성 도우미
    ├── styles/
    │   ├── global.css                전역·접근성 기본 규칙
    │   └── responsive.css            터치 영역·reduced motion 규칙
    └── utils/
        ├── applicationPayload.js     applications mutable field allowlist
        ├── authErrors.js             인증 오류의 안전한 사용자 문구
        ├── dataErrors.js             data 작업 오류의 안전한 사용자 문구
        ├── documentTemplateHelpers.js 문서 작성용 로컬 템플릿
        └── statusHelpers.js           상태·진행률 계산
```

전체 파일별 역할과 route 구조는 [docs/FRONTEND_STRUCTURE.md](docs/FRONTEND_STRUCTURE.md)를 확인하세요.

## 데이터 경계

| 테이블 | 현재 프런트엔드 사용 범위 |
| --- | --- |
| `jobflow_profiles` | 로그인 사용자의 선택적 이름·목표 직무 설정 |
| `applications` | 지원 회사, 상태, 제출물, 메모 |
| `portfolio_checklists` | 포트폴리오 체크리스트 |
| `interview_notes` | 면접 준비 메모 |
| `application_notes` | DB에는 있으나 현재 프런트엔드에서는 사용하지 않음 |
| `prompt_templates` | DB에는 있으나 현재 프런트엔드에서는 사용하지 않음 |

`jobflow_profiles`는 JobFlow 전용 테이블이며 Community의 `profiles`와 공유하지 않습니다. profile row가 없어도 지원 회사·체크리스트·면접 메모 CRUD는 동작합니다. 해당 테이블의 `user_id`는 `jobflow_profiles`가 아니라 Supabase `auth.users(id)`를 기준으로 하며, RLS가 로그인 사용자별 행 접근을 제한합니다.

문서 작성 도우미는 별도 테이블에 저장하지 않고 브라우저에서 로컬 템플릿 텍스트를 만듭니다. 제품 runtime에서 LLM 또는 AI API를 호출하지 않으며, 생성된 텍스트는 사용자가 원하는 작성 도구에 직접 붙여넣습니다. 제작 과정에서 사용한 생성형 AI 코딩 보조 도구와 제품 runtime 기능은 별개입니다.

문서 작성 도우미의 canonical route는 `/document-helper`입니다. 기존 `/ai-prompt` 링크는 호환을 위해 canonical route로 이동하는 `replace` redirect alias로 유지합니다.

## 이메일 확인과 회원가입

- 운영 Supabase Auth는 Confirm Email을 사용하고 Anonymous Sign-ins는 비활성화합니다. 운영 Site URL은 `https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/`이며, 기존 redirect allowlist 4개는 유지합니다.
- `20260811054550_remove_global_auto_confirm_email.sql` forward migration으로 공유 `auth.users`의 `auto_confirm_email_trigger`와 `public.auto_confirm_email()`을 제거했습니다. 과거 migration은 수정하지 않았습니다.
- 회원가입 요청은 현재 앱의 정확한 base URL을 `emailRedirectTo`로 보내고, user metadata에 `app_id: jobflow-dashboard`와 정규화한 `display_name`을 보존합니다.
- 회원가입 시 profile row를 선행 생성하지 않습니다. 설정 화면은 `jobflow_profiles` row가 없을 때 user metadata의 `display_name`을 사용하며, 사용자가 저장하면 DB row가 기준이 됩니다.
- UI validation·오류 문구·local Supabase config의 최소 비밀번호 길이는 8자입니다. Hosted 최소 길이는 현재 6자로 유지하며, frontend 배포 회차에서 8자로 동기화할 예정입니다.
- 이번 2026-08-11 회차에는 실제 이메일 전달, confirmation link 실행, QA 사용자 생성, A/B RLS CRUD를 수행하지 않았습니다.

## 운영 Data API·RLS 검증 기록

아래 내용은 **2026-08-03에 수행한 역사적 검증 기록**입니다. 2026-08-11 DB/Auth trigger 제거 회차에서 A/B QA 계정, 실제 DB write 또는 Auth/RLS CRUD를 다시 실행했다는 뜻이 아닙니다.

- `anon`은 JobFlow 6개 테이블에 대한 권한이 없음을 확인했습니다.
- `authenticated`는 현재 사용하는 `applications`, `portfolio_checklists`, `interview_notes`, `jobflow_profiles`에 필요한 CRUD 권한만 보유하고, 미사용 `application_notes`와 `prompt_templates`에는 Data API 권한이 없음을 확인했습니다.
- 모든 JobFlow 테이블의 RLS 사용과 로그인 사용자 자신의 행 접근을 확인했습니다.
- 당시 비실명 QA A/B 계정으로 본인 CRUD와 타 사용자 접근·`user_id` 위조 차단을 확인한 뒤 테스트 row·profile·Auth 사용자를 정리했습니다.

## 환경변수 설정

```bash
# .env 파일 생성 후 아래 값을 채워주세요.
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- `.env`는 커밋하지 않습니다(`.gitignore` 포함).
- GitHub Pages 배포 시 GitHub Actions Secrets에 환경변수를 등록합니다.

## 실행 방법

```bash
npm install
cp .env.example .env
npm run dev
npm run build
```

## 배포 링크

[JobFlow 구직 관리 대시보드](https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/)

로그인 없이 **샘플 대시보드 둘러보기**로 현재 제품 범위를 확인할 수 있습니다.

## 자산·dependency 안내

프로젝트 자산 provenance와 direct runtime dependency의 잠긴 버전·선언 라이선스는 [NOTICE.md](NOTICE.md)를 확인하세요. 포트폴리오에 사용되는 screenshot·normalized thumbnail의 중앙 기록은 [중앙 자산 등록부](../my-portfolio/docs/asset-license-register.md)에 있습니다.

## 현재 한계

이 프로젝트는 취업 포트폴리오용 구현입니다. 로그인 사용자의 지원 현황·체크리스트·면접 메모는 Supabase에 실제로 저장되지만 다음 기능은 제공하지 않습니다.

- 실시간 알림
- 드래그앤드롭(DnD) 칸반 보드
- 캘린더 일정 관리
- 통계 차트
- CSV export
- 외부 채용 플랫폼 API 연동
- runtime AI·LLM 문서 생성
