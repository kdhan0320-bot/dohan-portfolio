# 갈피록 — 개인 취업 준비 기록장 (구 JobFlow)

지원 상태와 다음 행동을 한 화면에서 정리하는 개인 구직 관리 대시보드입니다. 여러 지원 건의 전형 상태, 체크리스트, 면접 메모를 한 흐름에 묶어 사용자가 지금 할 일을 빠르게 판단하도록 만들었습니다.

## 현재 리디자인 상태 (2026-09-27, 공개 배포 및 마감 점검)

갈피록은 **관심 회사·지원 현황·지원 마감·준비할 일을 관리하는 개인 취업 준비 서비스**입니다. 소개 화면과 실제 작업 공간의 역할을 나눴습니다.

| 화면 | 하는 일 |
| --- | --- |
| `/welcome` 서비스 소개 | 원본 종이 조형 이미지와 한 문장 소개, 지원 현황·달력·준비 체크 미리보기 탭, 샘플 체험 |
| `/overview` 오늘의 지원 | 가장 가까운 미지원 회사 마감, 지원 중 회사 3곳, 남은 할 일 3개와 완료 처리 |
| `/` 지원 현황 | 지원 전·서류 전형·면접·결과 네 칸, 검색, 별도 보류함, 회사 추가·수정 패널 |
| `/calendar` 마감 일정 | 미지원 회사의 마감일 달력, 월 이동, 날짜 선택, 해당 회사 정보로 연결 |
| `/checklist` 준비 체크 | 전체 할 일 추가·수정·완료·분류·삭제 |
| `/interview` 면접 연습 | 질문·답변 기록·수정과 복습 관리 |
| `/document-helper`, `/settings` | 로컬 문장 템플릿, 계정·샘플 설정 |

- 주 메뉴는 오늘의 지원 / 지원 현황 / 마감 일정 / 준비 체크 / 면접 연습입니다. 보조 메뉴는 문장 도우미·서비스 소개·설정입니다.
- 비로그인 방문은 서비스 소개에서 시작합니다. 로그인·가입·샘플 체험 성공 시 오늘의 지원으로 이동합니다. 체험 중 소개로 돌아왔다가 이어보기를 누르면 기존 샘플 편집을 보존합니다.
- 마감 일정에는 `관심`·`지원 예정` 상태이면서 유효한 마감일이 있는 회사만 표시합니다. 제출한 회사, 면접·결과·보류 상태는 제외합니다. 면접 일정·자동 알림을 구현한 것은 아닙니다.
- 회사명만으로 추가할 수 있고, 카드에서 상태·제출 자료·메모를 수정합니다. 추가 정보는 펼쳐서 입력합니다. 미저장 이탈과 삭제를 각각 확인합니다.
- 모바일에서는 한 전형씩 탭으로 확인하고, 달력은 점으로 마감을 표시하며 상세를 아래에 배치하도록 작성했습니다. 실제 브라우저 반응형 검증을 완료했다는 뜻은 아닙니다.
- 이전 `/applications`, `/kanban`, 회사 상세·추가·수정 URL은 현황판과 회사 패널로 연결합니다. 기존 DB 상태 8개·DB 계약·Auth metadata ID·배포 URL은 유지합니다.
- 사용자 승인으로 공개 사이트에 반영했습니다. 최초 리디자인 배포 커밋은 `f947d51`이며 GitHub Actions build·deploy 성공과 공개 페이지를 확인했습니다. 이번 구현 회차에서 Figma는 수정하지 않았습니다.

## 배경·기록 편집 보강 (2026-09-27)

### 시각 중심 구성으로 마감

- 첫 화면은 종이 아치·파일 포켓·책갈피 리본의 큰 조형 이미지로 브랜드를 보여줍니다. 반복된 사용 방법 카드 3개를 제거하고 기능 설명을 하나의 탭 미리보기로 통합했습니다. 로그인 화면의 예시 회사 목록도 원본 조형 이미지로 교체했습니다.
- 오늘의 지원과 작업 공간에도 같은 이미지를 배경으로 연결했습니다. 사용자 데이터·입력·작업 버튼은 불투명한 표면에 유지하고 이미지 위에 작은 안내 글을 얹지 않습니다.
- `galpi-sculpture.webp`는 이 대화의 내장 ImageGen으로 만든 AI 보조 제작 자산입니다. 1536×1024, 약 100KB. 외부 참고 이미지·실존 로고 입력 없음. 제작 경로와 실제 프롬프트는 NOTICE에 기록했습니다.
- 코드/SSR/대역 서비스 검사 90개 통과, lint 오류 0(기존 경고 1), build 성공. 새 고정 텍스트·배경 10쌍의 최소 대비 5.12:1. 배포 화면·실계정·모바일 검사와 별개입니다.
- 사용자는 테스트 계정 생성·삭제를 승인했지만 제공 브라우저의 인증 수단이 자동 신규 계정 생성을 지원하지 않습니다. 이번 회차에서 실제 계정·비밀번호·DB 테스트 기록은 생성하지 않았고, 가입·이메일 인증·로그인·로그인 계정 CRUD의 실검증을 완료했다고 주장하지 않습니다.

- 소개·로그인·작업 화면을 겹친 종이와 책갈피 배경으로 연결하고 기능별 원본 벡터 6종을 추가했습니다. 입력과 기록 카드는 밝은 불투명 표면을 유지합니다. 시각 효과가 기능 조작을 가리지 않도록 장식 레이어의 pointer-events를 막았습니다.
- 준비 체크는 제목·분류, 면접 연습은 질문·답변·주제·중요도를 저장 후 수정할 수 있습니다. 완료·복습 상태를 보존하고 변경 가능한 필드만 전송합니다. 저장할 때 기록 ID와 로그인 사용자 ID를 함께 제한합니다.
- 코드/SSR/대역 서비스 검사 총 90개 통과. 새 편집 경로의 소유자 필터·실패 처리·완료 상태 보존 검사 13개를 포함합니다. 새 배경의 텍스트 색상 12쌍은 최소 5.27:1입니다. 실제 브라우저·인증 성공을 뜻하지 않습니다.
- 공개 시각 점검에서 미리보기 설명이 장식 면 위에 놓이는 부분을 발견해 불투명한 밝은 설명 영역으로 분리했습니다. 주 메뉴 주변의 부가 장식은 줄였습니다.
- 실제 DB 메타데이터에서 네 테이블의 RLS 활성화, 익명 조회 차단, 사용자 소유권 조건과 편집 대상 컬럼을 읽기 전용으로 확인했습니다. DB 스키마·정책·실제 사용자 데이터는 수정하지 않았습니다.
- 보강분을 공개 배포한 뒤 Chrome 1363×936에서 소개·오늘·회사·마감·할 일·면접 화면을 직접 확인했습니다. 회사의 추가/메모/상태 변경/검색/삭제, 할 일의 빈 값 오류/수정/취소/완료 상태 보존/추가/분류 변경/삭제, 면접의 빈 답변 오류/수정/추가/복습 후 수정/삭제, 달력 월·날짜 선택을 샘플로 실제 조작했습니다. 요청문 생성·실제 클립보드 복사, 샘플 초기화와 로그인 화면 전환도 확인했습니다. 새 배경의 로그인·가입 화면에서 빈 입력 검증과 비밀번호 표시 전환을 확인했으며, 실제 계정 인증은 별도 검증이 필요합니다.

## 이번 검사와 남은 확인

- **코드·서버 렌더링 검사 75개 통과**: 기존 인증/입력/회사 패널 관련 46개, 새 소개·일정·오늘 화면의 날짜/렌더링/대비 17개, 새 화면의 상태·이벤트 12개입니다. 서비스와 React 상태를 대역으로 사용한 검사를 포함하며, 실제 브라우저 클릭·실제 DB 검사가 아닙니다.
- 검사한 고정 텍스트·배경 26쌍 중 최소 대비는 **4.51:1**입니다. 모든 상태나 화면의 접근성 인증을 의미하지 않습니다.
- `npm run lint`: 오류 0, 기존 AuthContext Fast Refresh 경고 1. `npm run build`: 성공. JS 단일 번들 크기 경고가 남아 있습니다.
- **공개 사이트 실제 브라우저 검사:** Chrome CSS viewport 1363×936에서 Pretendard 로드, 주요 화면 가로 넘침, 회사 패널과 로그인 입력란의 잘림을 확인했습니다. 샘플 진입·소개 탭·회사 추가/검색/메모/제출물/상태 변경/삭제·달력 월 이동/날짜 선택·할 일 추가/완료·면접 질문 저장/답변 펼치기/복습 완료·요청문 생성/클립보드 복사·샘플 초기화를 실제 조작했습니다.
- 로그인·가입 탭의 빈 입력 검증, 비밀번호 표시 전환, Tab 키 포커스 테두리, 로그인 버튼 호버 색상 변화를 확인했습니다. 이메일·비밀번호 입력 글꼴 16px, 줄 높이 24px, 입력 요소 높이 50px입니다. 자격 증명을 입력한 실제 인증 검사가 아닙니다.
- 회사 추가에서 빈 회사명 오류가 관계없는 추가 정보 영역까지 펼치는 동작을 수정했습니다. 기존 회사 수정에서 이름 오류와 공고 URL 오류가 필요한 입력란을 펼치는 동작은 유지하며 관련 코드 검사 25개(기존 23개+회귀 2개)를 통과했습니다.
- **남은 확인:** 모바일·태블릿의 실제 배치·잘림, 실제 계정 로그인·가입·인증 메일·DB 저장은 검증하지 못했습니다. 제공된 브라우저는 1363×936 고정 화면이며 코드의 반응형 규칙과 실제 기기 검증은 구분합니다.
- 단일 HTML 미리보기는 폰트·라이선스를 포함한 **샘플 체험 전용**입니다. 계정 서버 연결을 비워 만들었습니다. 새로고침하면 샘플 데이터가 초기화됩니다.
- 공개 앱 배포는 완료했습니다. 실제 계정과 모바일 검증까지 포함한 최종 제출 승인 상태는 아닙니다. 포트폴리오 본문의 JobFlow 소개·썸네일은 이전 디자인이므로 별도 갱신이 남아 있습니다.

## 참고와 시각 자산

- [Linear, 2026-03-12](https://linear.app/now/behind-the-latest-design-refresh): 주 작업에 시각적 우선순위를 주고 탐색 영역·경계를 절제하는 원칙을 참고했습니다.
- [Teal, 2026-07-27](https://help.tealhq.com/en/articles/14435727-how-to-track-your-job-applications): 관심 회사 저장, 전형 상태 관리, 다음 행동 확인이라는 작업 순서를 검토했습니다.
- [InsightFlow, 2026-03-10](https://www.behance.net/gallery/245498657/InsightFlow-SaaS-Dashboard-Website-UI-Design): 서비스 가치 소개와 작업용 대시보드를 구분하는 구성을 검토했습니다. 갈피록의 조사·성과로 해당 사례의 수치를 사용하지 않았습니다.
- [Diego Cerezo의 HireFlow 사례](https://diegocerezo.framer.media/work/hire-flow-case-study): 소개·지원 관리·일정 화면을 나눠 보여주는 방식을 참고했습니다. 제작일이 확인되지 않아 2026년 제작 사례라고 주장하지 않습니다. 해당 사례의 조사·성과 수치를 갈피록의 성과로 사용하지 않았습니다.

서비스 소개의 제품 그림과 날짜 티켓은 외부 이미지를 복사하지 않고 JSX/CSS로 제작했습니다. 가상 회사 이니셜을 사용하며 기존 생성 정물 이미지는 설정 화면에만 사용합니다. Pretendard Variable의 OFL 전문과 자산 제작 기록은 [NOTICE.md](NOTICE.md)에 유지합니다. 상표·저작권 문제의 완전한 부재를 보증하는 검토는 아닙니다.

## 제작 목적

여러 회사에 지원할 때 흩어지기 쉬운 지원 현황과 준비 작업을 한곳에서 관리하는 것이 목적입니다. SNS나 커뮤니티가 아니라 개인의 지원 데이터 정리와 상태 관리에 집중하며, 로그인 사용자의 실제 데이터와 방문자가 둘러보는 고정 샘플을 분리합니다.

## 주요 기능

- 로그인 / 이메일 확인 회원가입(Supabase Auth)
- 로그인 사용자별 지원 회사 CRUD(Supabase PostgreSQL + RLS)
- 회사·직무 검색 / 전형별 분류 / 별도 보류함 / 등록 최신순 표시
- 네 전형 칸과 별도 보류함
- 할 일 분류와 완료 체크
- 면접 준비 메모와 중요도 / 복습 완료 관리
- 문서 작성 도우미(브라우저 내 로컬 템플릿 생성·복사)
- 모바일 / 태블릿 / 데스크톱 반응형 UI
- 가상 샘플을 브라우저 메모리에서 편집·체험하는 게스트 모드

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
- 회사·직무 검색과 전형별 분류로 지원 회사 탐색
- 모바일에서는 전형 탭, 달력 아래 상세 목록 사용
- 샘플 대시보드로 회원가입 전 제품 범위 확인
- 문서 작성 도우미로 자기소개서·면접 답변용 텍스트 구조화

## 게스트 모드 안내

소개 화면의 **샘플로 시작하기** 또는 로그인 화면의 **가입 없이 둘러보기** 버튼을 누르면 회원가입 없이 가상 샘플 데이터로 지원 기록·준비할 일·면접 노트의 추가·수정·삭제를 체험할 수 있습니다.

- 지원 현황, 체크리스트, 면접 메모, 전형 보드의 샘플은 실제 사용자 데이터가 아닙니다.
- 조회, 검색, 전형별 분류, 등록 최신순 표시, 문서 작성용 로컬 템플릿 생성은 게스트 모드에서도 동작합니다.
- 8개 지원 샘플에는 서로 다른 `created_at`이 있어 등록 최신순의 실제 표시 순서를 확인할 수 있습니다.
- 샘플의 변경은 React 메모리에서만 유지되고 새로고침 또는 설정의 샘플 초기화 시 사라집니다. 샘플 변경으로 Supabase 요청을 보내지 않습니다.
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
- 회원가입 UI의 최소 비밀번호 길이는 8자입니다. 로그인은 기존 비밀번호 입력을 허용하며 서버 인증 결과로 판단합니다. Hosted Auth의 설정은 이번 UI 변경에서 수정하지 않았습니다.
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

[갈피록 취업 준비 서비스](https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/)

로그인 없이 **샘플로 시작하기**로 현재 제품 범위를 확인할 수 있습니다.

## 자산·dependency 안내

프로젝트 자산 provenance와 direct runtime dependency의 잠긴 버전·선언 라이선스는 [NOTICE.md](NOTICE.md)를 확인하세요. 포트폴리오에 사용되는 screenshot·normalized thumbnail의 중앙 기록은 [중앙 자산 등록부](../my-portfolio/docs/asset-license-register.md)에 있습니다.

## 현재 한계

이 프로젝트는 취업 포트폴리오용 구현입니다. 로그인 사용자의 지원 현황·체크리스트·면접 메모는 Supabase에 실제로 저장되지만 다음 기능은 제공하지 않습니다.

- 실시간 알림
- 드래그앤드롭(DnD) 칸반 보드
- 면접 일정 등록·예약(지원 마감일 달력은 제공)
- 통계 차트
- CSV export
- 외부 채용 플랫폼 API 연동
- runtime AI·LLM 문서 생성
