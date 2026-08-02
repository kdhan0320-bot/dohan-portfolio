# Portfolio Feedback Hub

취업 준비생과 UX/UI 학습자가 포트폴리오와 피드백 요청을 공유하는 취업용 커뮤니티 데모입니다.

- 배포 주소: https://kdhan0320-bot.github.io/dohan-portfolio/portfolio-feedback-hub/

---

## 제작 목적

포트폴리오를 만들었지만 객관적인 피드백을 받기 어려운 문제를 해결하기 위해, 게시글 탐색과 댓글 중심의 공개 피드백 흐름을 구현했습니다.

단순히 기능이 많은 게시판이 아니라, 포트폴리오 피드백이라는 목적에 맞춘 정보 위계, 탐색용 분류, 계산형 상태 표시, 피드백 요청 템플릿을 중심으로 설계했습니다.

---

## 주요 기능

- 공개 목록 / 상세 읽기 전용 데모
- 비공개 기능 검증 계정 로그인
- 게시글 목록 카드형 그리드
- 카테고리별 기본 썸네일
- 히어로 미니 프리뷰
- Project Info 섹션
- demo taxonomy 기반 카테고리 / 계산형 상태 배지
- 카테고리 필터
- 최신순 / 인기순 / 댓글 많은 순 정렬
- 게시글 검색
- 게시글 작성 / 수정 / 삭제
- 본문에 문자열로 포함되는 피드백 요청 템플릿
- 선택적 작업 이미지 URL (본인이 제작했거나 사용 권한이 있는 HTTPS 주소)
- 실제 파일 업로드는 지원하지 않음
- 해시태그
- 댓글 / 대댓글
- 게시글 좋아요 / 댓글 좋아요
- 샘플 데이터 기반 데모 화면

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
- 조회에 실패하면 오류와 재시도를 먼저 제공하며, 사용자가 선택한 경우에만 sample 데이터로 둘러볼 수 있습니다.
- 카테고리는 sample post의 `category`와 실제 글의 hashtag를 활용하는 demo taxonomy이며 전용 DB column이 아닙니다.
- 상태 배지는 category와 댓글 수를 바탕으로 만든 계산형 demo label이며, 저장된 workflow 상태가 아닙니다.
- 작성 화면의 피드백 요청 선택값은 별도 field가 아니라 게시글 본문 앞에 문자열로 합쳐 저장됩니다.
- source에는 Supabase query와 mutation 흐름이 구현되어 있지만, 실제 운영 insert/update/delete와 RLS 허용·차단 전체는 별도 검증이 필요합니다.
- 공개 UI에는 회원가입 route와 로그인·작성·mutation CTA를 노출하지 않습니다. `/signup`은 `/login`으로 이동하며, `/login` 직접 접근은 비공개 A/B 기능 검증 계정에 한해 사용합니다.

---

## 공개 프로필과 회원가입 보안

- 공개 작성자 정보와 아이디 중복 확인에 사용하는 profile field는 `id`, `username`뿐입니다. 클라이언트도 두 field만 명시적으로 조회합니다.
- username은 client와 DB 모두 `trim + lowercase`로 정규화하며 `^[a-z0-9_]{4,20}$` 형식만 허용합니다. 기존 profile 4개는 이 계약 및 Auth email local-part와의 일치 여부를 사전에 확인했습니다.
- 회원가입 클라이언트는 `app_id: portfolio-feedback-hub`와 정규화한 `username`을 Supabase Auth metadata로 전달하며 `profiles`에 직접 INSERT하지 않습니다. Migration A 적용 후에는 Feedback Hub 전용 `AFTER INSERT` trigger가 이 `app_id`에만 반응해 같은 transaction에서 `profiles(id, username)`을 생성합니다.
- Migration A `20260801141625_secure_profiles_and_atomic_signup.sql`은 trigger/function과 username CHECK constraint만 추가합니다. `app_id`가 없는 기존 배포 source는 trigger가 profile 생성 전에 반환하므로 기존 client INSERT 경로와 권한을 그대로 사용합니다.
- 공개 가입은 재개하지 않습니다. 읽기 전용 source 배포 완료를 먼저 확인한 뒤 Migration A/B/C를 순서대로 적용합니다. Migration B `20260801141626_lock_down_feedback_hub_profiles.sql`은 기존 client INSERT/UPDATE 권한과 policy를 회수하고 `anon`, `authenticated`에 `SELECT(id, username)`만 허용합니다.
- Migration C `20260802030120_grant_feedback_hub_data_api.sql`은 community table과 sequence의 Data API 권한을 최소 범위로 명시합니다. `anon`은 게시글·댓글·좋아요를 읽기만 할 수 있고, `authenticated`와 `service_role`은 게시글·댓글 CRUD, 좋아요 SELECT·INSERT·DELETE, 자동 ID 생성을 위한 sequence `USAGE`만 가집니다.
- Auth 가입/trigger 실패와 로그인 session 이후의 profile 조회 실패는 별도 단계입니다. 후속 profile 조회 실패는 이미 생성된 사용자를 다시 가입시키는 이유로 취급하지 않습니다.
- 운영 전환 순서는 `공개 가입 중단 상태 유지 → 읽기 전용 source 배포 완료 확인 → Migration A 적용 → Migration B 적용 → Migration C 적용 → 비실명 A/B Auth·CRUD·RLS 검사 → 테스트 데이터와 고아 Auth 사용자 여부 확인·정리 → 공개 읽기 전용 운영 유지 여부 재확인`입니다. Migration A와 최종 검증 사이에는 공개 가입을 재개하지 않으며, 실제 최종 권한 상태인 Migration B와 C 적용 후 `/login` 직접 접근으로 A/B 검증을 수행합니다.
- 적용된 migration은 삭제하거나 수정해 되돌리지 않고 별도 forward-fix migration으로 복구합니다. 복구 중에도 `phone`은 비공개로 유지하고 `SELECT(id, username)`보다 넓은 조회 권한이나 `GRANT ALL`을 부여하지 않습니다. client profile INSERT를 임시 복구해야 하는 경우에도 `INSERT(id, username)`과 본인 행만 허용하는 RLS보다 넓은 권한은 부여하지 않습니다.
- 공개 전에는 비실명 전용 계정으로 실제 회원가입, 중복 아이디, 게시글·댓글·좋아요 CRUD, 타 사용자 차단 RLS를 A/B 검증해야 합니다.

### 현재 검증 및 운영 상태

- 구현됨: 공개 테스트 계정과 가입 route·CTA 제거, 공개 목록·상세 read-only UI, 실제 사용자 전용 private route, username 공통 정책, Auth metadata 기반 profile 생성용 Migration A, profile 최소 권한용 Migration B, community Data API 최소 권한용 Migration C.
- 완료됨: 로컬 정적 검사와 브라우저 검사를 수행했으며, 최종 source는 lint·build·diff check로 다시 확인합니다.
- 운영 DB 적용 전: Migration A/B/C는 아직 적용하지 않았습니다. 현재 운영 DB에는 Feedback Hub 전용 trigger/function과 username 형식 constraint가 없고, `anon`의 `profiles` table SELECT 및 `phone` 조회가 허용된 상태로 확인되었습니다.
- 미검증: 운영 환경의 실제 Auth 가입·로그인, 게시글·댓글·좋아요 CRUD, RLS 허용·차단 A/B는 실행하지 않았습니다.
- 공개 운영 정책: 공개 가입은 기본적으로 비활성 상태를 유지하고 목록·상세만 read-only로 제공합니다. Migration A/B/C 적용 후 최종 A/B 검증이 끝나더라도 가입 재개는 별도 제품 결정 없이는 수행하지 않습니다.

---

## UX/UI 개선 포인트

- 헤더와 본문 컨테이너 가로 정렬 통일
- 카테고리별 기본 썸네일 적용
- 상태 배지와 카테고리 배지로 정보 위계 강화
- 히어로 미니 프리뷰로 서비스 목적 시각화
- 하단 Project Info 섹션으로 GitHub/포트폴리오 링크 정리
- 모바일 CTA 문구 축약
- 게스트 상태에서 글쓰기 / 좋아요 / 댓글 시도 시 로그인 안내 제공

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
- 실제 파일 업로드와 Supabase Storage 연동
- 공유 `auth.users` 전체에 적용되는 기존 `auto_confirm_email_trigger`의 앱별 분리 또는 제거 검토
- category / status / feedback focus의 구조화된 DB field와 제품 workflow
- 실제 운영 CRUD와 RLS 정책 전체 검증
- 마이페이지
- 알림 기능
- 신고 / 관리 기능
- 접근성 고도화
- 실제 사용자 피드백 기반 기능 개선

---

## 참고 사항

이 프로젝트는 취업용 포트폴리오에 포함하기 위한 데모 프로젝트입니다.

실제 운영 서비스가 아니므로 샘플 데이터와 게스트 모드는 시연 목적에 맞게 구성되어 있습니다.

README에는 실제 구현된 기능과 향후 개선 예정 기능을 구분해 작성했습니다.
