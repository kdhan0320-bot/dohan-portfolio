# Portfolio Feedback Hub

취업 준비생과 UX/UI 학습자가 포트폴리오와 피드백 요청을 공유하는 취업용 커뮤니티 데모입니다.

- 배포 주소: https://kdhan0320-bot.github.io/dohan-portfolio/portfolio-feedback-hub/

---

## 제작 목적

포트폴리오를 만들었지만 객관적인 피드백을 받기 어려운 문제를 해결하기 위해, 게시글 탐색과 댓글 중심의 공개 피드백 흐름을 구현했습니다.

단순히 기능이 많은 게시판이 아니라, 포트폴리오 피드백이라는 목적에 맞춘 정보 위계, 탐색용 분류, 계산형 상태 표시, 피드백 요청 템플릿을 중심으로 설계했습니다.

---

## 주요 기능

- 공개 목록·상세 읽기 전용 탐색
- live / sample-empty / error / sample-error 상태 구분
- 게시글 카드형 그리드, 카테고리 필터, 검색, 최신순·인기순·댓글 많은 순 정렬
- 카테고리별 기본 썸네일과 히어로 미니 프리뷰
- sample 상세의 지속적인 샘플 안내
- sample property 또는 hashtag 기반 demo taxonomy 카테고리
- 댓글 수 기반 계산형 상태 배지
- 본문 앞 문자열로 저장되는 피드백 요청 항목
- 권리 보유자가 제공하는 선택적 HTTPS 작업 이미지 URL
- 비공개 QA 계정용 Auth·게시글 CRUD·댓글·답글·좋아요·소유권 RLS 흐름
- 공개 자유 가입·작성·댓글·좋아요, 실제 파일 upload·Storage, runtime AI·LLM API는 미제공

---

## 사용 기술

| 분류 | 기술 |
|---|---|
| Frontend | React 18, Vite |
| UI | Material-UI |
| Routing | React Router HashRouter |
| Backend / DB | Supabase Auth, PostgreSQL |
| 배포 | GitHub Pages, GitHub Actions |

---

## 자산 및 라이선스

- Pretendard `v1.3.9`를 공식 저장소의 jsDelivr CDN 경로로 불러오며, 공식 라이선스는 SIL Open Font License 1.1입니다.
- `@mui/material`과 `@mui/icons-material` `9.0.1`을 사용합니다. 설치된 각 package의 `package.json`과 `LICENSE`에서 MIT 라이선스를 확인했습니다.
- 카테고리 썸네일은 작은 MUI icon과 CSS 기본 도형으로 구성한 미니 리뷰 보드이며, 외부 이미지나 별도 브랜드 logo를 사용하지 않습니다.
- 대표 샘플 3종(`bus-arrival-ui.svg`, `jobflow-application-ui.svg`, `signup-flow-ui.svg`)은 이번 작업에서 기본 SVG geometry로 직접 제작했습니다. 외부 stock·AI 생성 image·타사 logo·실제 브랜드 UI를 사용하거나 복제하지 않았습니다.
- 대표 샘플 asset은 `sampleAssetPath`가 지정된 sample data에서만 사용합니다. live 게시글 이미지는 기존의 허용된 HTTPS `image_url` 정책을 따르며, 이미지가 없거나 load에 실패하면 코드 기반 카테고리 썸네일로 복구합니다.
- 포트폴리오 대표 썸네일 `projects/my-portfolio/public/thumbnails/community-feedback-hub.svg`의 제작 경위는 기존 `asset-license-register.md`에 기록되어 있습니다.
- `public/favicon.svg`와 Header mark는 이번 7.1단계에서 feedback bubble과 comment line을 뜻하는 기본 SVG geometry로 재제작했습니다. 외부 image·logo asset을 사용하지 않았고, Material icon path를 favicon에 복제하지 않았습니다.

---

## 데이터와 표시 정책

- Supabase 조회에 성공해 게시글이 있으면 live 데이터를 표시합니다.
- 정상 조회 결과가 0건이면 포트폴리오 체험용 sample 데이터를 자동 표시합니다.
- 조회에 실패하면 `error` 상태와 재시도를 먼저 제공하며, 사용자가 선택한 경우에만 `sample-error` 상태로 sample 데이터를 둘러볼 수 있습니다.
- 카테고리는 sample post의 `category`와 실제 글의 hashtag를 활용하는 demo taxonomy이며 전용 DB column이 아닙니다.
- 상태 배지는 댓글 수가 0인지에 따라 `피드백 대기` 또는 `댓글 있음`으로 계산한 demo label이며, 저장된 workflow 상태가 아닙니다.
- 작성 화면의 피드백 요청 선택값은 별도 field가 아니라 게시글 본문 앞에 문자열로 합쳐 저장됩니다.
- 공개 standalone은 목록·상세만 읽기 전용으로 제공하며 회원가입·작성·mutation CTA를 노출하지 않습니다. `/signup`은 `/login`으로 이동하고 `/login` 직접 접근은 비공개 QA 계정에 한해 사용합니다.
- runtime AI·LLM API와 Supabase Storage upload는 없습니다. `AI Coding`은 taxonomy와 sample category 이름입니다.

---

## 공개 프로필과 회원가입 보안

- 운영 Supabase에는 관련 migration 7개(`create_community_tables`, `secure_shared_portfolio_database`, `remove_insecure_view_count_function`, `secure_profiles_and_atomic_signup`, `lock_down_feedback_hub_profiles`, `grant_feedback_hub_data_api`, `block_feedback_hub_public_signup`)가 적용되어 있습니다.
- `profiles`의 공개 조회 column은 `id`, `username`뿐입니다. `phone`, `created_at`, `expires_at`은 anon·authenticated에 공개하지 않습니다.
- anon은 `posts`, `comments`, `post_likes`, `comment_likes`를 SELECT만 할 수 있고 mutation table privilege가 없습니다.
- authenticated는 게시글·댓글을 소유권 조건으로 CRUD하고 좋아요를 SELECT·INSERT·DELETE할 수 있습니다. 5개 community table 모두 RLS가 활성화되어 있습니다.
- 전역 email signup은 JobFlow를 위해 유지하고 Confirm Email을 사용하며, anonymous signup은 비활성화합니다. `app_id: portfolio-feedback-hub`를 보낸 self-signup은 Before User Created Auth Hook에서 사용자 생성 전에 403으로 차단합니다.
- Feedback Hub 참여용 Auth 사용자와 `profiles` 행은 관리자가 함께 준비합니다. 공개 사용자는 `profiles`를 직접 INSERT할 수 없고 공개 화면은 목록·상세만 읽기 전용입니다.
- 적용된 migration은 수정·재실행하지 않으며 변경이 필요하면 별도 forward-fix migration으로 관리합니다.

### 현재 검증 및 운영 상태

- 운영 row는 `profiles` 4행이며 `posts`, `comments`, `post_likes`, `comment_likes`는 각 0행입니다. 따라서 공개 목록은 현재 `sample-empty` fallback을 표시합니다.
- 2026-08-03 관리자 방식으로 준비한 비공개 QA A/B 계정에서 게시글·댓글·좋아요 본인 CRUD, 교차 수정·삭제 0행, `user_id` 위조 차단, cascade와 공개 anon 읽기 전용 경계를 운영 DB에서 검증했습니다. 당시 테스트 Auth·profile·콘텐츠는 모두 정리했습니다.
- 운영 `Allow new users to sign up`과 email provider는 JobFlow를 위해 활성 상태이며, Feedback Hub의 공개 가입은 앱별 Auth Hook으로만 차단합니다.
- 2026-08-11 JobFlow frontend 배포 후 공유 Hosted Auth의 최소 비밀번호 길이를 8자로 동기화했습니다.
- `20260811054550_remove_global_auto_confirm_email.sql` forward migration으로 공유 `auth.users`의 전역 auto-confirm trigger/function을 제거했습니다. Feedback Hub 가입 차단 함수와 JobFlow·Community RLS·policy·grant는 적용 전후 fingerprint가 동일합니다.
- 2026-08-11 trigger 제거 회차에는 QA 사용자를 만들지 않았고, 실제 email delivery·confirmation link·A/B CRUD를 다시 실행하지 않았습니다.
- 과거 `my-community` 주소는 기존 링크가 끊기지 않도록 query/hash를 보존해 canonical `portfolio-feedback-hub`로 보내는 redirect만 유지합니다.

---

## UX/UI 개선 포인트

- 헤더와 본문 컨테이너 가로 정렬 통일
- 카테고리별 기본 썸네일 적용
- 상태 배지와 카테고리 배지로 정보 위계 강화
- 히어로 미니 프리뷰로 서비스 목적 시각화
- 하단 Project Info 섹션으로 GitHub/포트폴리오 링크 정리
- 모바일 CTA 문구 축약
- sample 상세의 지속 안내, skip link, main landmark, route별 title 적용

---

## 반응형 기준

- 데스크톱: 카드 3열 중심의 그리드
- 태블릿: 카드 2열 또는 자연스러운 줄바꿈
- 모바일: 카드 1열, CTA 버튼 축약, 가로 스크롤 방지

---

## 실행 방법

```bash
npm install
npm run dev
npm run build
```

---

## 환경 변수

Supabase 연동을 위해 아래 환경 변수가 필요합니다.

`.env.example`을 참고해 로컬에 `.env`를 만들어 사용하세요.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

GitHub Actions 배포에서는 저장소 Secrets의 `SUPABASE_URL`, `SUPABASE_ANON_KEY` 값을 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 빌드 환경변수로 주입합니다(`.github/workflows/deploy.yml` 참고).

---

## 한계 및 개선 예정

- 현재는 사용 권한이 있는 선택적 HTTPS 이미지 URL만 지원하며, Picsum과 허용되지 않은 URL은 차단
- 실제 파일 업로드와 Supabase Storage 연동은 미포함
- Auth 또는 migration 변경 후 비공개 Admin QA 계정으로 confirmation·CRUD·RLS 회귀 검증
- category / status / feedback focus의 구조화된 DB field와 제품 workflow
- 마이페이지
- 알림 기능
- 신고 / 관리 기능
- 접근성 고도화
- 실제 사용자 피드백 기반 기능 개선

---

## 참고 사항

이 프로젝트는 취업용 포트폴리오에 포함하기 위한 데모 프로젝트입니다.

공개 화면은 read-only 포트폴리오 데모이며, 운영 글이 없을 때 표시하는 sample은 실제 등록 콘텐츠가 아닙니다.

README에는 실제 구현된 기능과 향후 개선 예정 기능을 구분해 작성했습니다.
