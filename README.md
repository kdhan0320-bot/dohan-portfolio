# my_ai_web

AI 활용 UX/UI·웹퍼블리싱 작업을 장기간 관리하는 개인 작업실 저장소입니다.

## 목적

이 저장소는 취업용 포트폴리오만을 위한 폴더가 아니라, 다음 작업을 함께
관리하는 장기 AI/UX/UI 작업실입니다.

- AI 활용 UX/UI 프로젝트
- 웹디자인·웹퍼블리싱 작업
- 서비스기획형 프론트엔드 프로젝트
- Figma 디자인과 프로토타입
- 개인 웹 작품과 실험작
- 광고·랜딩페이지·홈페이지 시안
- 취업용 웹 포트폴리오
- 프로젝트 기획·디자인·회고 문서
- 사이트 검사·접근성·반응형 QA 도구

취업용 웹 포트폴리오(`projects/my-portfolio`)는 이 작업실에서 관리하는
여러 프로젝트 중 하나이며, 저장소 전체를 대표하지 않습니다.

## 배포 프로젝트

배포 주소의 존재와 취업용 포트폴리오 공개 작품 포함 여부는 구분합니다.
현재 `projects/my-portfolio`의 공개 데이터와 렌더링 기준에 따른 분류는 다음과
같습니다.

| 프로젝트 | 현재 분류 | 배포 주소 |
|---|---|---|
| my-portfolio | 취업용 웹 포트폴리오 | https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/ |
| jobflow-dashboard | 취업 포트폴리오 Featured | https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/ |
| portfolio-feedback-hub | 취업 포트폴리오 More Works | https://kdhan0320-bot.github.io/dohan-portfolio/portfolio-feedback-hub/ |
| mini_sns | Learning Archive · 현재 취업 포트폴리오 비노출 | https://kdhan0320-bot.github.io/dohan-portfolio/mini-sns/ |
| Streaming UI Concept | 취업 포트폴리오 More Works | https://kdhan0320-bot.github.io/dohan-portfolio/ott-service/ |

## 프로젝트별 데이터·연동 방식

**my-portfolio** — 취업용 웹 포트폴리오. 정적 프로젝트 데이터를 사용하며,
실제 API 연동은 없습니다.

**jobflow-dashboard** — Supabase Auth + PostgreSQL 실제 연동. 게스트
모드에서는 샘플 데이터로 주요 화면을 체험할 수 있습니다.

**Portfolio Feedback Hub** (`projects/portfolio-feedback-hub`) — 공개 목록·상세는 읽기 전용이며,
운영 게시글이 0건이면 sample fallback을 표시합니다. Auth·CRUD·댓글·답글·좋아요와 소유권 RLS는
비공개 QA 계정으로 검증한 범위이고, 공개 자유 가입·작성 기능과 runtime AI·LLM API는 제공하지 않습니다.

**mini_sns** — 교육 과정 결과물을 React/MUI 모바일 화면 흐름 학습 기록으로
재정리한 Learning Archive입니다. 현재 취업용 포트폴리오 공개 작품에는 포함하지
않으며, 배포 주소는 학습 기록 확인용으로 유지합니다. mock 데이터와 브라우저
메모리 상태로 동작하고 실제 백엔드는 없으며, 새로고침하면 초기 데이터로
복원됩니다.

**Streaming UI Concept** — 정적 HTML/CSS/JavaScript로 만든 UI 데모입니다. 실제
API·로그인·결제·스트리밍 기능은 없습니다.

## 폴더 구조

- `.github/` — GitHub Actions와 GitHub Pages 배포 workflow
- `projects/` — 공개 배포하거나 공개 프로젝트로 관리하는 작업
  (`.github/workflows/deploy.yml`을 통해 GitHub Pages로 배포)
- `supabase/` — 실제 Supabase 연동 프로젝트의 로컬 설정과 migration
  (`.temp/`, `.branches/` 같은 CLI 내부 상태는 Git 추적 제외)
- `tools/` — 검사 자동화 스크립트 (`tools/site-audit-kit` 등)

## 로컬 실행 방법

각 Node.js 프로젝트에는 lockfile이 있으므로 프로젝트 폴더에서 다음을 실행합니다.

```bash
npm ci
npm run dev
npm run build
```

Streaming UI Concept은 `projects/OTT Service`에 있는 별도 빌드 없는 정적
페이지입니다. 로컬 HTTP 서버에서 `index.html`을 열어 확인합니다.

## GitHub Actions 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 각 프로젝트를
빌드해 GitHub Pages(`_site/`)로 배포합니다. Supabase를 사용하는
프로젝트(portfolio-feedback-hub, jobflow-dashboard)는 빌드 시 저장소 Secrets 값을
환경변수로 주입받습니다.

## AI 협업 방식

이 저장소는 ChatGPT + Codex, Figma를 함께 사용해 관리합니다.
공통 운영 규칙은 저장소 루트 `AGENTS.md`, 프로젝트별 목적·구조·명령·세부
기준은 각 프로젝트의 `README.md`를 기준으로 합니다.

## 비공개 파일과 환경변수 관리

`.env`, `.env.local`, `_private/`는 Git 추적에서 제외됩니다. Supabase
연동 프로젝트는 `.env.example`을 참고해 로컬 `.env`를 구성하고, 실제 키
값은 저장소에 커밋하지 않습니다.
