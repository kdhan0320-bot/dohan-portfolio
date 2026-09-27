# 고른시선 · Portfolio Feedback Hub

홈에서 용도를 이해하고, 작업을 선택해 디자인의 위치와 의견을 연결해 보는 포트폴리오용 피드백 데모입니다.

2026-09-28 마감 개편: 사용자 승인에 따라 배포 및 실제 화면 검수를 진행합니다. 결과는 아래 검증 기록에 구분합니다.

- 배포 주소: https://kdhan0320-bot.github.io/dohan-portfolio/portfolio-feedback-hub/

---

## 제작 목적

포트폴리오를 만들었지만 객관적인 피드백을 받기 어려운 문제를 해결하기 위해, 게시글 탐색과 댓글 중심의 공개 피드백 흐름을 구현했습니다.

포트폴리오 피드백이라는 목적에 맞춰 소개·작업 탐색·화면 위치별 의견 체험의 역할을 나누고, 짧은 설명과 실제 디자인 예시로 사용 방법을 전달합니다.

---

## 주요 기능

- 홈·작업 갤러리·리뷰 방법을 별도 화면으로 제공하고 공통 메뉴에서 이동
- 홈은 짧은 소개·금속/유리 배경과 리뷰 미리보기·샘플 카드 3개, 작업 목록은 6종 샘플 또는 실제 공개 작업의 검색·분류·정렬 제공
- 이용 방법은 그림 3장과 접이식 질문 3개로 구성. 리뷰 체험은 상세 화면에서 제공
- 목록 복귀 상태 복원과 기존 검색 링크의 `/works` 이동 유지
- live / sample-empty / error / sample-error 상태 구분
- 직접 제작한 가상 작업 6종과 화면 위치별 리뷰 예시
- 수정 전/수정안을 같은 위치에서 전환. 모든 예시 의견을 펼쳐 표시하고 번호 핀과 연결
- 선택한 위치에 체험 의견 추가·삭제, 위치별 초안 유지, 공백·280자 입력 제한. 화면을 벗어나면 사라지는 브라우저 메모리 동작이며 서버 저장은 하지 않음
- 실제 글은 기존 상세·댓글·이미지 표시를 유지하며, 새 비교 화면은 sample 전용
- 비공개 QA 계정용 Auth·게시글 CRUD·댓글·답글·좋아요·소유권 RLS 흐름 유지
- 공개 회원가입, 실제 파일 업로드, 리뷰 좌표/버전 저장, runtime AI API는 미제공

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

- Pretendard `v1.3.9`를 공식 jsDelivr 고정 버전 webfont로 불러옵니다. [공식 upstream](https://github.com/orioncactus/pretendard)과 [공식 라이선스](https://github.com/orioncactus/pretendard/blob/main/LICENSE)에서 SIL Open Font License 1.1을 확인할 수 있습니다.
- `@mui/material`과 `@mui/icons-material` `9.0.1`을 사용합니다. 설치된 각 package의 `package.json`과 `LICENSE`에서 MIT 라이선스를 확인했습니다.
- `BrandMark`, favicon, SVG 예시 화면은 코드로 제작했습니다. 전시 조형물과 꽃 이미지는 2026-09-27 내장 이미지 생성 도구로 새로 생성했으며 외부 사진·stock image·타사 로고·서비스 화면을 가져오지 않았습니다. `src/assets/perspective-sculpture.webp`(70,960 bytes), `src/assets/season-iris.webp`(125,324 bytes)를 사용합니다. 원본 PNG를 WebP로 형식 변환·압축했으며 자르기나 시각적 합성은 하지 않았습니다. AI 보조 작업이며 사용자 최종 검토·승인은 남아 있습니다.
- 기존 `public/sample-work/`의 SVG 3종은 이력 보존을 위해 남겨 두었고 새 샘플 갤러리에서는 사용하지 않습니다. live 이미지는 기존 HTTPS 이미지 정책과 실패 시 기본 썸네일 복구를 유지합니다.
- `고른시선`은 개편 제안명입니다. 웹 검색은 법적 상표·권리 조사나 독점 사용 가능성의 보증이 아닙니다.
- 포트폴리오 대표 썸네일 `projects/my-portfolio/public/thumbnails/community-feedback-hub.svg`의 제작 경위는 기존 `asset-license-register.md`에 기록되어 있습니다.

---

## 데이터와 표시 정책

- Supabase 조회에 성공해 게시글이 있으면 live 데이터를 표시합니다.
- 정상 조회 결과가 0건이면 포트폴리오 체험용 sample 데이터를 자동 표시합니다.
- 조회에 실패하면 `error` 상태와 재시도를 먼저 제공하며, 사용자가 선택한 경우에만 `sample-error` 상태로 sample 데이터를 둘러볼 수 있습니다.
- 카테고리는 sample post의 `category`와 실제 글의 hashtag를 활용하는 demo taxonomy이며 전용 DB column이 아닙니다.
- 상태 배지는 댓글 수가 0인지에 따라 `의견 기다리는 중` 또는 `의견 있음`으로 계산한 demo label이며, 저장된 workflow 상태가 아닙니다.
- 작성 화면의 피드백 요청 선택값은 별도 field가 아니라 게시글 본문 앞에 문자열로 합쳐 저장됩니다.
- `SAMPLE_POSTS`는 가상 작업 6개, `SAMPLE_COMMENTS`는 리뷰 예시 7개로 구성합니다. 실제 사용자·활동·성과가 아닙니다. 댓글 수는 각 작업의 리뷰 배열에서 계산하며 가상의 좋아요·상대 시간·사용자 이름을 인기 지표로 내세우지 않습니다.
- sample의 수정 전후 그림은 코드에 정의된 고정 예시이며 업로드, 협업 저장, 실제 사용성 개선 수치가 아닙니다.
- 실제 공개 데이터는 읽기 전용이며 공개 회원가입·게시글 작성은 제공하지 않습니다. 샘플의 `의견 추가`는 화면 내 메모리 체험으로 API 요청·서버 저장·타인 전송이 없습니다. 화면을 벗어나거나 새로고침하면 사라집니다. `/signup`은 `/login`으로 이동하고 `/login` 직접 접근은 비공개 QA 계정에 한해 사용합니다.
- runtime AI·LLM API와 Supabase Storage upload는 없습니다. 기존 live 해시태그 분류는 동적으로 탐색할 수 있습니다.

---

## 공개 프로필과 회원가입 보안

- 2026-08-12 Hosted preflight에서 관련 migration 8개가 Hosted history에 모두 존재하고, `profiles`, `posts`, `comments`, `post_likes`, `comment_likes`의 RLS가 모두 활성 상태임을 확인했습니다.
- Hosted grant 기준으로 `profiles`의 anon·authenticated 공개 조회는 `id`, `username` column에만 허용됩니다.
- Hosted Before User Created Hook은 `public.hook_block_feedback_hub_public_signup`을 가리키며 `Enabled` 상태임을 확인했습니다. 이번 preflight에서는 signup이나 403 동작을 재실행하지 않았습니다.
- Feedback Hub 참여용 Auth 사용자와 `profiles` 행은 관리자가 함께 준비하는 구조입니다. 공개 사용자의 `profiles` INSERT 차단은 저장소 SQL 기준이고, 공개 화면의 목록·상세 read-only는 2026-08-12 runtime에서 확인했습니다.
- `20260812134107_harden_feedback_hub_counts_and_integrity.sql`은 like count table·동기화 trigger, reply same-post 무결성, 최소 server-side CHECK, column grant·RLS·FK index 보강을 위한 additive migration이며, 2026-08-13 연결된 Hosted Supabase 프로젝트에 적용했습니다. 적용 후 migration history local/remote 18/18, 신규 object 계약 33/33, grant·RLS 계약 106/106, backfill 누락·불일치·음수 count 0, linked DB lint 오류·경고 0, Before User Created Hook `Enabled` 유지를 확인했습니다.
- `20260813051904_restrict_feedback_hub_base_like_visibility.sql`은 2026-08-13 연결된 Hosted Supabase 프로젝트에 적용했습니다. anon과 PUBLIC의 `post_likes`·`comment_likes` SELECT를 제거하고, authenticated에는 `user_id`와 대상 ID column만 허용하며 RLS로 자신의 좋아요 row만 조회하도록 제한했습니다. 공개 좋아요 수는 `post_like_counts`와 `comment_like_counts`에서 계속 제공합니다.
- 기존 migration source는 수정·재실행하지 않으며 변경이 필요하면 별도 forward-fix migration으로 관리합니다.

### 검증 기록과 2026-08-12 확인 범위

- 2026-08-12 Hosted preflight의 정확한 row count는 `profiles` 4건, `posts`·`comments`·`post_likes`·`comment_likes` 각 0건입니다. 같은 검사에서 reply same-post 제약과 posts/comments 업무 CHECK가 없음을 확인했습니다.
- 2026-08-03 비공개 QA 기록에서는 관리자 방식으로 준비한 A/B 계정으로 게시글·댓글·답글의 본인 CRUD, 좋아요 등록·취소, 다른 사용자 콘텐츠의 수정·삭제 차단, `user_id` 위조 차단, cascade와 공개 anon 읽기 전용 경계를 운영 DB에서 검증했습니다. 당시 테스트 Auth·profile·콘텐츠는 모두 정리했습니다. 이 비공개 CRUD·RLS 검사는 2026-08-12에 재실행하지 않았습니다.
- RLS 검증의 `다른 사용자 삭제 차단`은 직접 UPDATE·DELETE 요청을 뜻합니다. 본인 게시글 또는 부모 댓글 삭제 시 FK `ON DELETE CASCADE`로 연결된 하위 데이터가 함께 정리되는 동작은 별도입니다.
- 2026-08-11 기록에서는 JobFlow를 위해 공유 Hosted Auth의 email signup과 email provider를 유지하고 최소 비밀번호 길이를 8자로 동기화했습니다. 2026-08-12에는 이 hosted Auth 설정을 재조회하지 않았습니다.
- 저장소의 `20260811054550_remove_global_auto_confirm_email.sql`은 공유 `auth.users`의 전역 auto-confirm trigger/function 제거만 정의하며, 2026-08-12 Hosted history에서도 해당 migration을 확인했습니다.
- 2026-08-11 trigger 제거 회차에는 QA 사용자를 만들지 않았고, 실제 email delivery·confirmation link·A/B CRUD를 다시 실행하지 않았습니다.
- 과거 `my-community` 주소는 기존 링크가 끊기지 않도록 query/hash를 보존해 canonical `portfolio-feedback-hub`로 보내는 redirect만 유지합니다.

### Like count 보안 release order

1. Additive migration 적용 → 완료
2. Count-table frontend 배포 → 완료
3. 운영 count query 검증 → 완료
4. Restrictive migration 적용 → 완료
5. Anon base-like REST 차단 확인 → 완료

- Authenticated own-like HTTP는 안전하게 재사용할 기존 로그인 session이 없어 이번 회차에 재검증하지 않았으며, 격리 PostgreSQL 45/45 runtime 검증 근거를 유지합니다.

---

## 2026-09-27 UI 개편과 확인 범위

- 7차 개편은 온정류와 겹치던 6차 청록/셀라돈 테마를 교체한 작업입니다. 고른시선 파일만 수정했으며 다른 프로젝트·Figma 파일은 변경하지 않았습니다.
- 실제 Figma 표지 비교: 온정류 `658:2`는 민트/청록, 소요빛 `1069:317`은 연한 파랑/네이비, 기준선 `490:2`는 파랑/회청색, 설비결 `283:882`는 보라 계열이었습니다. 갈피록 소스는 로즈 `#94394B`·아이보리 `#F7F5F1`입니다. 확인한 화면과 현재 소스를 기준으로 한 비교이며 보지 않은 모든 화면의 색상까지 겹치지 않는다고 보장하지 않습니다.
- 고른시선의 주색은 흑연 `#252525`, 기본 배경 `#F6F6F2`, 한정 강조색 `#F0DC80`입니다. 로고·favicon·메뉴·MUI theme·입력/리뷰 상태에 함께 적용했습니다. 샘플 작품의 색상은 브랜드 색상과 별도로 유지합니다.
- 차분함과 정돈된 표현은 여백·정보 순서·제한된 색으로 반영했습니다. 확인되지 않은 성격 진단이나 퍼스널컬러를 사실로 단정하지 않습니다.
- `/`: 제목·짧은 소개 아래에 넓은 금속/유리 전시 배경과 실제 리뷰 예시를 배치합니다. 리뷰 순서는 ‘작업 고르기 → 화면 짚기 → 의견 남기기’ 세 항목으로 표시합니다. 입력창은 상세 화면에 두고 반복 설명 섹션을 늘리지 않았습니다.
- `/works`: 작업 갤러리. 6종 샘플 또는 공개 작업을 검색·분류합니다. 실제 작업에서만 정렬을 제공하며 live / sample-empty / error / sample-error 상태, 기존 검색 링크와 목록 복귀 상태를 유지합니다.
- `/guide`: 리뷰 방법. 그림 3장과 접이식 질문 3개로 구성합니다. 제목 영역은 흑연색과 겹친 사각 프레임으로 통일했습니다.
- `/posts/:id`: 화면과 의견을 한 공간에 놓고, 핀 선택·수정 전/수정안 전환·체험 의견 추가/삭제를 제공합니다. 위치별 초안·의견은 컴포넌트 메모리에만 남으며 이동/새로고침 후 사라집니다. 서버 저장이나 실제 공동 작업으로 표현하지 않습니다.
- 갈피록은 사이드바의 지원 현황·일정·준비 체크를 오가는 관리 도구입니다. 고른시선은 상단 메뉴의 갤러리·리뷰 화면을 중심으로 구성하며 기록·통계·일정 메뉴를 가져오지 않았습니다.
- 공개 가입은 제공하지 않습니다. 실제 글의 Auth·CRUD·댓글 코드는 유지하고 Auth 설정·DB schema·migration은 변경하지 않았습니다.
- 데스크톱 제목 최대 64px, 모바일 제목 33–38px, 의견 본문 15px, 모바일 의견 입력 16px, 주요 버튼 최소 44px입니다. 760px 이하 소개 영역을 세로로 배치하고 600px 이하 리뷰 미리보기/갤러리를 1열로 구성합니다. breakpoint는 실제 브라우저 검사 viewport 기록이 아닙니다.
- 지정 색상 대비 계산 12쌍 통과: 본문 14.15:1, 보조 글 5.75:1, 기본 버튼 15.33:1, 노란 CTA/선택 핀 11.13:1, 히어로 설명 7.37:1, 리뷰 예시 설명 5.74:1, 어두운 제목 영역 설명 최소 6.60:1, 입력 테두리 3.88:1, 배경 위 포커스 4.09:1. 선택 핀에는 어두운 테두리를 추가했습니다. 전체 페이지 WCAG 적합 판정은 아닙니다.
- 상태 로직·정적 출력 검사 15개 통과: 샘플 데이터, 검색/분류, 빈 검색, 정렬, 아이디 정책, 이미지 URL 정책, 버전별 리뷰, 6종 그림의 전후 차이, 핀/의견 연결, 입력 제한, 위치별 초안, 의견 추가/삭제, 홈 구조와 링크, 안내 화면, 기존 검색 링크. 실제 브라우저 조작 검사는 아닙니다.
- `npm run lint`, `npm run build`, `git diff --check` 통과. JS 740.98 kB(gzip 222.84 kB), CSS 29.89 kB(gzip 6.64 kB), 새 배경 WebP 89.62 kB. npm 환경 설정 `http-proxy` 경고는 남아 있으나 컴파일 오류는 없었습니다.
- 이전 회차의 실제 브라우저 검사는 현재 배포된 **기존 Portfolio Feedback Hub** 대상입니다: `/signup` → `/login`, 빈 로그인 오류, 비밀번호 표시/숨김, 게스트 이동, 비로그인 `/write` → `/login` 확인. 이번 새 화면의 UI 검사와 구분합니다.
- 이전 운영 DB 읽기 전용 조회에서 5개 주요 테이블 RLS 활성, posts/comments 0건, signup 차단 함수 존재를 확인했습니다. 함수 존재만으로 Auth Hook 활성이나 가입 차단 실행 결과를 확인했다고 볼 수 없습니다.
- 임시 계정 생성·테스트·정리는 사용자 요청 범위이나, 연결 도구에 Auth Admin 계정 생성/삭제 기능이 없고 관리 대시보드는 미인증 상태입니다. 임시 계정·비밀번호·테스트 게시물을 만들지 않았으며 삭제할 새 기록도 없습니다. 실제 로그인 성공·CRUD·소유권 행동 검증은 미완료입니다. 가입 제한 해제나 auth.users 직접 삽입으로 우회하지 않았습니다.
- 로컬 파일/loopback HTTP 브라우저 접근이 차단되어 새 화면의 실제 폰트·모바일 렌더링·호버·클릭·키보드·확대 dialog 검사는 미완료입니다. 차단 경로를 재시도하거나 우회하지 않았습니다. 최종 시각 마감 완료로 판정하지 않습니다.
- 단일 HTML 미리보기는 샘플 응답·비로그인 상태이며 실제 인증/DB 저장에 연결되지 않습니다. 이번 회차에서 커밋·푸시·배포는 하지 않았습니다.

---

## 실행 방법

### 2026-09-28 마감 추가

- 흑연·실버·노랑 방향을 유지하며 화면 가장자리의 프레임/기준점 배경, 갤러리 받침 배경, 어두운 footer를 추가했습니다. `src/assets/studio-field.svg`는 직접 작성한 장식용 벡터이며 외부 이미지나 템플릿을 추가하지 않았습니다.
- 배경을 설명이나 기능으로 사용하지 않습니다. 글·입력창은 밝은 면 위에 유지하고 footer 포커스는 밝은 노랑으로 구분합니다. 모바일 갤러리 배경이 viewport를 벗어나지 않도록 여백을 조정했습니다.
- 2026-09-28(KST) Webflow 2026 trends와 Framer Kern의 공개 페이지를 다시 확인했습니다. 제한된 강조색·간결한 카피·역할별 페이지 분리를 참고했으며 참고 자료의 자산은 복제하지 않았습니다.
- 배포 전 lint·build·정적/로직 검사 15개 통과. 실제 브라우저 검수와 비공개 인증 검수의 결과는 별도로 기록합니다.
- 이번 사용자 메시지에서 고른시선 커밋·푸시·배포 승인을 확인했습니다. 공유 저장소의 다른 작업 변경은 이 배포에 포함하지 않습니다.

```bash
npm ci
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

- HTTPS·hostname·userinfo·Picsum 차단은 URL 형식과 허용 host 경계를 검사하는 기능이며, 이미지의 저작권·라이선스·초상권·상표권을 자동 검증하지 않음
- 실제 `image_url`을 사용할 경우 제공자가 사용 권리를 보유해야 하며, 공개 포트폴리오 반영 전 별도 출처·권리 기록 필요
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

## 개편 참고와 생성 이미지 기록

2026-09-27 확인: [Webflow 2026 trends](https://webflow.com/blog/web-design-trends-2026)의 간결한 카피·고유 시각 체계, [Gionatan Nese Projects](https://www.gionatannese.com/projects)의 작업별 진입 구조, [Cosmos](https://www.cosmos.so/)의 시각 자료 탐색을 참고했습니다. 원본 디자인·이미지·카피를 복제하지 않았습니다. 색상·간격·배치는 이 프로젝트에 맞춰 구성했습니다. 참고 사이트의 등록 연도가 모두 2026년이라는 뜻은 아닙니다.

3차 구성에서는 [NN/g의 Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)를 참고했습니다. 이 글은 2006년의 사용성 원칙이며 2026년에 새로 생긴 트렌드가 아닙니다. 4차에서는 [MarkUp 공식 제품 소개](https://www.markup.io/)와 [Pastel 공식 사용 안내](https://help.usepastel.com/en/articles/1996011-reviewing-websites-in-pastel)의 화면 위치와 의견을 연결하는 구조를 확인하고, 이 작업에 맞는 작은 피드백 보드로 재구성했습니다. 2026-09-27 열람했지만 Pastel 안내 자체의 작성일은 2022-11-23입니다. 해당 서비스의 이미지·브랜드·성과 수치를 가져오지 않았습니다. 실제 이용자 테스트나 채용 성과 측정은 하지 않았습니다.

5차에서는 [Figma 공식 포트폴리오 페이지 구성 안내](https://help.figma.com/hc/en-us/articles/31010075634967-FD4B-Assemble-your-portfolio-pages)의 홈·상세 분리와 공통 탐색, [Framer First Impression](https://www.framer.com/marketplace/templates/first-impression/)의 홈·UX 사례·리디자인 사례 페이지 구성을 확인했습니다. 해당 템플릿은 2026-06-16 공개, 2026-09-20 업데이트로 표기되어 있었습니다. 템플릿 파일·디자인·자산은 복제하지 않았습니다. [NN/g 홈페이지 설계 원칙](https://www.nngroup.com/articles/homepage-design-principles/)은 2024-03-15 자료이며 서비스의 목적과 다음 행동을 먼저 보여주는 기존 사용성 원칙으로 참고했습니다. 이 원칙이 2026년에 새로 생겼다는 의미는 아닙니다. 모두 2026-09-27 열람했습니다.

6차에서는 [Webflow의 2026 디자인 흐름](https://webflow.com/blog/web-design-trends-2026)(2026-01-08 업데이트)의 고유 시각 체계·그래픽과 UI의 결합·짧은 카피를 참고했습니다. [Framer Ferreira](https://www.framer.com/marketplace/templates/ferreira/)(2026-09-16 공개·업데이트)의 이미지 중심 구성과 제한된 색·텍스트 스타일도 확인했습니다. 두 자료를 2026-09-27 열람했으며 특정 스타일이 채용에 유리하다는 근거로 사용하지 않습니다. 구성 원칙만 참고하고 유료 템플릿·타사 자산은 사용하지 않았습니다.

이미지 생성 방식: 내장 image generation. 아래 원문 프롬프트를 사용했습니다. 생성 결과가 법적 권리·상표의 독점성이나 제3자 권리 비침해를 보증한다는 의미는 아닙니다.

### perspective-sculpture.webp

> Use case: stylized-concept. Asset type: original art exhibition website artwork, no interface. Create a sophisticated quiet contemporary 3D still life for a Korean design review platform's fictional project '시선의 모양'. Wide landscape 3:2 composition. Two very large interlocking, smoothly curved sculptural loop forms stand on a cool pale lavender studio floor, one frosted lilac translucent glass, the other matte porcelain ivory with soft blue-grey shaded edges. Not a perfect torus: elongated asymmetrical organic openings, architectural substantial sculptural mass, elegant proportions. A small reflective brushed silver sphere rests in the foreground to the right. Hero subject is centered with generous but purposeful breathing room; forms occupy 70 percent of image height. Realistic ambient occlusion, soft directional daylight from upper left, diffuse grounded shadows, fine subtle film grain, tactile materials, exceptional refined gallery art direction, cool Summer Light palette with charcoal shadow accents. Background a seamless very pale grey lavender with gentle natural lighting falloff, not a decorative gradient. No type, no logos, no watermarks, no frames, no UI, no people, no brand references. This must be a standalone original composition, suitable for a polished art exhibition hero and a gallery thumbnail. Avoid generic floating plastic blobs, oversaturation, neon, exaggerated gloss, multiple clutter objects.

### season-iris.webp

> Use case: stylized-concept. Asset type: original editorial botanical art for a fictional flower studio website. Landscape 3:2, sophisticated art photography. One sculptural pale blue-lilac iris-like flower with translucent pleated petals, branching into three delicate blooms, stem curved elegantly from lower left to upper right, resting against a smooth desaturated midnight plum studio backdrop (#302c3b). Extreme tactile petal detail, cool lavender and ice blue highlights, grey sage stems, luminous edges from large diffuse window illumination. Bold asymmetric arrangement, flower occupies right two thirds, left third dark and quiet for separately typeset website title. A single loose petal below. Fine photographic grain, real shadows, restrained luxury editorial sensibility. Original fictional botanical composition, not an identifiable artist's work or existing campaign. No text, no logos, no watermark, no UI, no borders, no objects besides the botanical subject. Avoid pink neon, generic vector petals, random floating orbs, excessive bloom, synthetic high saturation. Quiet refined contrasting companion to a pale lavender sculpture image.


### 7차 참고 및 신규 배경

2026-09-27 열람한 [Framer SURFACE](https://www.framer.com/marketplace/templates/surface/)(2026-02-13 공개, 2026-08-02 업데이트)의 흑백 기반 시각 위계와 작품 탐색, [Framer Kern](https://www.framer.com/marketplace/templates/kern/)(2026-04-30 공개, 2026-08-05 업데이트)의 제한된 강조색·홈/작업 아카이브/상세 분리를 참고했습니다. [Webflow 2026 trends](https://webflow.com/blog/web-design-trends-2026)의 고유 시각 체계, 그래픽과 제품 UI 결합, 짧은 카피도 참고했습니다. 구성 원칙만 참고했으며 템플릿 파일·원본 이미지·카피는 복제하지 않았습니다. 유행이 취업 성과를 보장한다는 근거로 사용하지 않습니다.

`src/assets/perspective-studio.webp`는 2026-09-27 내장 이미지 생성으로 만든 독자적인 금속/유리 프레임 정물입니다. 원본 1536×1024 PNG를 같은 크기의 WebP(89,622 bytes)로 변환·압축했습니다. 별도 자르기·이미지 합성을 하지 않았으며 화면에서의 크롭/배치는 CSS로 처리합니다. 외부 스톡 사진·브랜드를 가져오지 않았지만 제3자 권리 비침해에 대한 법적 보증은 아닙니다. 원본 프롬프트는 아래와 같습니다.

### perspective-studio.webp

> Use case: original editorial 3D still life, architectural material study for a design critique website called Goreunsiseon. Create a wide landscape 3:2 image, no interface, no text. An elegant sculptural arrangement of three large upright rectangular viewfinder frames with generous square openings, at subtly different angles, made of brushed silver aluminum, smoked translucent glass, and matte graphite. One very thin pale butter-yellow translucent glass plate intersects a frame, giving a restrained warm light reflection. These are substantial precise architectural objects resting on a pale neutral silver-grey studio floor, not floating. Frames are gathered on the LEFT 52 percent of the composition, filling roughly 80 percent of the image height. The RIGHT 48 percent is quiet seamless light grey negative space, for a separate real UI card to be overlaid in HTML. Soft daylight from upper left, beautifully graduated shadows cast diagonally toward the lower right, tactile microtexture and delicate film grain, crisp material edges, realistic ambient occlusion. A small flat charcoal circular disk lies at the base. Palette strictly neutral graphite, aluminum silver, offwhite, and one pale yellow accent. A refined contemporary design studio mood with bold silhouette and meaningful spatial depth. Camera front three-quarter view, long lens, floor horizon seamless, carefully cropped close enough to see materials. No purple, pink, blue, green, teal, neon, glossy plastic blobs, organic loops, flowers, transport motifs, brands, logos, watermark, typography, UI, people or mockup devices. Entirely original composition, no imitation of an identifiable artist or commercial artwork.
