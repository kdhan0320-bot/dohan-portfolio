# 갈피록 — 개인 취업 준비 기록장 (구 JobFlow)

지원 상태와 다음 행동을 한 화면에서 정리하는 개인 구직 관리 대시보드입니다. 여러 지원 건의 전형 상태, 체크리스트, 면접 메모를 한 흐름에 묶어 사용자가 지금 할 일을 빠르게 판단하도록 만들었습니다.

## 현재 리디자인 상태 (2026-09-27, 5차 수정)

갈피록은 **관심 회사·지원 현황·지원 마감·준비할 일을 관리하는 개인 취업 준비 서비스**입니다. 소개 화면과 실제 작업 공간의 역할을 나눴습니다.

| 화면 | 하는 일 |
| --- | --- |
| `/welcome` 서비스 소개 | 짧은 목적 설명, 지원 현황·달력·준비 체크 미리보기 탭, 샘플 체험, 3단계 사용 방법 |
| `/overview` 오늘의 지원 | 가장 가까운 미지원 회사 마감, 지원 중 회사 3곳, 남은 할 일 3개와 완료 처리 |
| `/` 지원 현황 | 지원 전·서류 전형·면접·결과 네 칸, 검색, 별도 보류함, 회사 추가·수정 패널 |
| `/calendar` 마감 일정 | 미지원 회사의 마감일 달력, 월 이동, 날짜 선택, 해당 회사 정보로 연결 |
| `/checklist` 준비 체크 | 전체 할 일 추가·완료·분류·삭제 |
| `/interview` 면접 연습 | 질문·답변 기록과 복습 관리 |
| `/document-helper`, `/settings` | 로컬 문장 템플릿, 계정·샘플 설정 |

- 주 메뉴는 오늘의 지원 / 지원 현황 / 마감 일정 / 준비 체크 / 면접 연습입니다. 보조 메뉴는 문장 도우미·서비스 소개·설정입니다.
- 비로그인 방문은 서비스 소개에서 시작합니다. 로그인·가입·샘플 체험 성공 시 오늘의 지원으로 이동합니다. 체험 중 소개로 돌아왔다가 이어보기를 누르면 기존 샘플 편집을 보존합니다.
- 마감 일정에는 `관심`·`지원 예정` 상태이면서 유효한 마감일이 있는 회사만 표시합니다. 제출한 회사, 면접·결과·보류 상태는 제외합니다. 면접 일정·자동 알림을 구현한 것은 아닙니다.
- 회사명만으로 추가할 수 있고, 카드에서 상태·제출 자료·메모를 수정합니다. 추가 정보는 펼쳐서 입력합니다. 미저장 이탈과 삭제를 각각 확인합니다.
- 모바일에서는 한 전형씩 탭으로 확인하고, 달력은 점으로 마감을 표시하며 상세를 아래에 배치하도록 작성했습니다. 실제 브라우저 반응형 검증을 완료했다는 뜻은 아닙니다.
- 이전 `/applications`, `/kanban`, 회사 상세·추가·수정 URL은 현황판과 회사 패널로 연결합니다. 기존 DB 상태 8개·DB 계약·Auth metadata ID·배포 URL은 유지합니다.
- 공개 사이트·Figma에는 아직 반영하지 않았습니다.

## 이번 검사와 남은 확인

- **코드·서버 렌더링 검사 75개 통과**: 기존 인증/입력/회사 패널 관련 46개, 새 소개·일정·오늘 화면의 날짜/렌더링/대비 17개, 새 화면의 상태·이벤트 12개입니다. 서비스와 React 상태를 대역으로 사용한 검사를 포함하며, 실제 브라우저 클릭·실제 DB 검사가 아닙니다.
- 검사한 고정 텍스트·배경 26쌍 중 최소 대비는 **4.51:1**입니다. 모든 상태나 화면의 접근성 인증을 의미하지 않습니다.
- `npm run lint`: 오류 0, 기존 AuthContext Fast Refresh 경고 1. `npm run build`: 성공. JS 단일 번들 크기 경고가 남아 있습니다.
- **마감 확인 미완료:** 실제 브라우저의 글꼴 로드, 390/820/1440px 배치·잘림·호버·키보드·클릭, 실제 로그인·가입·인증 메일·DB 저장을 확인하지 못했습니다. 원격 브라우저가 로컬 파일/HTTP 접근을 차단한 이후 이를 우회하거나 같은 요청을 반복하지 않았습니다.
- 단일 HTML 미리보기는 폰트·라이선스를 포함한 **샘플 체험 전용**입니다. 계정 서버 연결을 비워 만들었습니다. 새로고침하면 샘플 데이터가 초기화됩니다.
- 배포·최종 제출 완료 상태가 아닙니다. 기존 포트폴리오 썸네일은 이전 디자인입니다.

## 참고와 시각 자산

- [Linear, 2026-03-12](https://linear.app/now/behind-the-latest-design-refresh): 주 작업에 시각적 우선순위를 주고 탐색 영역·경계를 절제하는 원칙을 참고했습니다.
- [Teal, 2026-07-27](https://help.tealhq.com/en/articles/14435727-how-to-track-your-job-applications): 관심 회사 저장, 전형 상태 관리, 다음 행동 확인이라는 작업 순서를 검토했습니다.
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
- 조회, 검색, 상태 필터, 회사명·등록 최신순·마감 빠른순 정렬, 문서 작성용 로컬 템플릿 생성은 게스트 모드에서도 동작합니다.
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

[JobFlow 구직 관리 대시보드](https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/)

로그인 없이 **샘플로 시작하기**로 현재 제품 범위를 확인할 수 있습니다.

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
