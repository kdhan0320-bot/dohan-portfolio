# 고른시선 · Portfolio Feedback Hub

디자인 화면에 의견을 남기고 수정 전후를 비교하는 **디자인 피드백 보드**의 포트폴리오용 체험 서비스입니다.

코랄·피치·크림 바탕과 짙은 본문색을 사용합니다. 홈의 실제 리뷰 미리보기, 리뷰 예제, 수정 전후 비교, 피드백 연습, 이용 안내로 구성합니다. 인증·모바일 검수는 실제 확인 범위와 구분합니다.

- 배포 주소: https://kdhan0320-bot.github.io/dohan-portfolio/portfolio-feedback-hub/

---

## 제작 목적

디자인 피드백에서 의견이 가리키는 위치와 수정 이유를 함께 살펴보도록, 화면의 번호·의견·수정 예시를 연결합니다.

실제 협업 플랫폼의 완성을 주장하지 않습니다. 준비된 6종 예제로 위치별 의견 작성과 전후 비교를 체험하는 범위입니다.

---

## 주요 기능

- 로고 클릭으로 홈 이동. 오른쪽 메뉴는 리뷰 예제·수정 전후·피드백 연습·이용 안내
- 홈은 목적 문장·번호 선택과 버전 전환이 가능한 리뷰 미리보기·피드백 연습 배너 1개·리뷰 예제 3개
- 리뷰 예제에서 6종 샘플 또는 실제 공개 작업을 검색·분류·정렬
- 수정 전후는 6종 예제를 선택해 나란히 비교. 피드백 연습은 3가지 연습 주제를 해당 샘플 리뷰에 연결
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

## 2026-09-28 마감·배포·실제 화면 검수

- 흑연·실버·노랑 방향을 유지하며 화면 가장자리의 프레임/기준점 배경, 갤러리 받침 배경, 어두운 footer를 추가했습니다. `src/assets/studio-field.svg`는 직접 작성한 장식용 벡터이며 외부 이미지나 템플릿을 추가하지 않았습니다.
- 배경을 설명이나 기능으로 사용하지 않습니다. 글·입력창은 밝은 면 위에 유지하고 footer 포커스는 밝은 노랑으로 구분합니다. 모바일 갤러리 배경이 viewport를 벗어나지 않도록 여백을 조정했습니다.
- 2026-09-28(KST) Webflow 2026 trends와 Framer Kern의 공개 페이지를 다시 확인했습니다. 제한된 강조색·간결한 카피·역할별 페이지 분리를 참고했으며 참고 자료의 자산은 복제하지 않았습니다.
- 배포 전 lint·build·정적/로직 검사 15개 통과. 실제 브라우저 검수와 비공개 인증 검수의 결과는 별도로 기록합니다.
- 이번 사용자 메시지에서 고른시선 커밋·푸시·배포 승인을 확인했습니다. 공유 저장소의 다른 작업 변경은 이 배포에 포함하지 않았습니다.
- 로컬 고른시선 커밋 `099a707`의 변경만 원격 main `3404c904bfe3671537099a370cfe60abe8a4ddb0`에 반영했습니다. 원격 tree `0b961f3967fd494c4afef81324be3489b5f0377a`가 검토한 release tree와 동일함을 확인했습니다. 일반 git push는 자격 증명 미연결로 실패했고, 인증된 GitHub 연결로 같은 내용을 반영했습니다.
- GitHub Actions `36330199270`의 build/deploy 모두 성공했습니다. 실제 공개 주소에서 제목 ‘고른시선’을 확인하고 검수를 진행했습니다.
- 실제 브라우저 viewport 1363×936에서 홈·갤러리·리뷰 상세·리뷰 방법·관리자 로그인과 홈 하단을 시각 검토했습니다. Pretendard 사용 가능 상태와 홈 이미지 정상 로드를 확인했고, 확인 시 가로 넘침은 없었습니다. 화면 폭 전환 기능을 사용할 수 없어 실제 모바일 렌더링 검수는 미완료입니다.
- 공개 UI 실제 조작 확인: 메뉴 이동, 체험 버튼 hover 색상, 갤러리 분류, 0건/1건 검색과 초기화, 6종 샘플 상세와 수정안 전환, 목록 복귀 시 검색어 유지, 핀 선택, 위치별 초안 복원, 체험 의견 추가/삭제, 빈 입력 오류, 280자 초과 제출 차단, 확대 dialog, Esc 닫기와 실행 버튼으로 포커스 복귀, 안내 질문 3개 펼침.
- 자동 입력은 maxlength를 넘는 300자도 전달할 수 있었으므로 HTML 속성만으로 통과 판정하지 않았습니다. 실제 제출에서 ‘280자 이내’ 오류가 표시되고 등록되지 않는 것을 확인했습니다. 테스트 의견은 삭제하고 초안은 비웠습니다.
- 배포본의 빈 로그인 오류, 비밀번호 password→text→password 전환, 로그인 없이 홈 이동, `/signup`→`/login`, 비로그인 `/write`→`/login`을 확인했습니다. 자격 증명을 입력한 로그인 성공이나 실제 DB CRUD 검증과는 구분합니다. 공개 회원가입은 제공하지 않습니다.
- 빠른 연속 클릭 중 한 번 다른 리뷰로 이동하여 해당 카드의 실제 href와 키보드 진입을 다시 확인했습니다. FAQ 첫 검사의 exact-text selector는 장식 ‘+’ 때문에 일치하지 않아 보이는 문구로 다시 검사했습니다. 이 자동화 문제를 제품 오류로 단정하지 않았습니다.
- 전체 화면 캡처와 scroll 명령에서 브라우저 제어 timeout이 발생했습니다. 기본 viewport 캡처와 실제 스크롤 위치 확인으로 이어갔으며, 최근 브라우저 로그에는 확장 프로그램 metadata 오류가 있었습니다. 이를 앱 자체 오류나 검사 성공으로 바꿔 기록하지 않습니다.
- 추가 마감 색상 대비: footer 본문 8.92:1, 링크 9.96:1, 포커스 10.57:1, 갤러리 보조 글 5.87:1. 개별 조합 계산이며 전체 WCAG 적합 판정은 아닙니다.
- 비공개 검증 계정의 실제 로그인·게시물/댓글 저장·수정·삭제는 관리자 인증 연결이 없어 미완료입니다. 임시 계정·비밀번호·서버 테스트 게시물을 생성하지 않았습니다.

---

## 2026-09-28 히어로 폭·배경 재마감

- 사용자가 지적한 중간 이미지의 전폭 배치를 공통 `.shell` 폭으로 변경했습니다. 제목·메뉴·갤러리와 같은 좌우 정렬을 사용하며 패널 안쪽 여백, 정물 크롭, 리뷰 카드 최대 폭과 모바일 내부 여백을 조정했습니다.
- 기존 생성 정물을 재사용하고 `studio-field.svg`를 직접 작성한 겹친 프레임·반투명 판·미세한 점 패턴으로 보강했습니다. 기존 흑연/실버/옅은 노랑을 유지하며 새 외부 이미지·폰트·의존성을 추가하지 않았습니다.
- 본문 landmark로 프로그램 포커스가 이동할 때 페이지 전체에 나타나던 금색 테두리를 제거했습니다. 링크·버튼·입력·dialog의 키보드 포커스 스타일과 본문 바로가기 동작은 유지합니다.
- Framer Kern(2026-04-30 공개, 2026-08-05 수정)과 Webflow 2026 trends를 다시 확인하고 정렬·제한된 강조색·짧은 카피 원칙을 참고했습니다. 배경 장식 때문에 설명 문구나 메뉴를 추가하지 않았습니다.
- 변경 후 lint·build·기존 로직/정적 렌더링 검사 15개 통과. 배포된 화면의 실제 브라우저 확인은 별도로 기록합니다.
- 공개 회원가입은 제공하지 않습니다. 이전 인증 연결 요청이 거절된 상태이므로 실제 계정 생성·로그인 성공·서버 게시물 CRUD 검증은 수행하지 않았습니다. 공개 샘플의 체험 의견은 브라우저 메모리 동작입니다.

## 2026-09-28 갈피록과 배경 그래픽 차별화

- 현재 갈피록의 종이·리본 배경과 고른시선의 대각선 프레임 배치를 비교했습니다. 색이 달라도 기울어진 큰 면을 겹치는 구성이 닮아 있어 고른시선의 주변 그래픽을 교체했습니다.
- `studio-field.svg`를 원형 초점, 위치 표시점, 짧은 연결선, 국소적인 점 무늬로 다시 작성했습니다. 전체 점 질감·대각선 사각 면을 빼고 바탕을 중립적인 밝은 회색으로 조정했습니다.
- 직접 작성한 `focus-mark.svg`를 갤러리·안내 제목·푸터의 공통 장식으로 사용합니다. 넓은 갤러리 받침 박스를 빼고 작품이 공통 격자 안에서 바로 보이게 했습니다. 기존 중앙 정물, 기능, 히어로 정렬은 유지합니다.
- 두 SVG는 직접 작성한 벡터이며 장식은 CSS background로 처리해 스크린 리더에 중복 내용을 추가하지 않습니다. 외부 템플릿·이미지·폰트·의존성은 추가하지 않았습니다.
- 2026-09-28(KST) [Framer Aperture Folio](https://www.framer.com/marketplace/templates/aperture-folio/)(2026-07-03 공개, 2026-09-25 수정)의 고유 기하 그래픽·타이포 위계·갤러리/상세 분리와 [Webflow 2026 trends](https://webflow.com/blog/web-design-trends-2026)의 일관된 고유 시각 체계를 참고했습니다. 템플릿의 형태나 로더를 복제하지 않았습니다. STILLFORM 검색 결과는 열람 단계에서 실패하여 직접 검토한 사례로 사용하지 않았습니다.
- 검증은 lint/build, 기존 로직 검사, 배포 후 실제 공개 UI 조작을 구분합니다. 공개 가입은 미제공이며 이전 관리자 인증 연결 요청이 거절되어 실제 로그인 성공·서버 CRUD는 검증 범위에 포함하지 못합니다.

## 2026-09-28 원형 배경 잘림 마감

- 화면 밖을 중심으로 삼던 반복 배경을 제거하고 `studio-field.svg`의 원·기준점을 240×240 캔버스 안에 다시 그렸습니다. 홈에서는 제목과 소개 사이의 독립된 156px 격자에 배치하며 1150px 이하에서는 본문 공간을 우선합니다.
- 갤러리·안내 배너의 원은 132px(900px 이하 104px)로 조정하고 오른쪽 여백과 텍스트 공간을 따로 확보했습니다. 푸터 장식은 88px의 독립 격자 안에 배치합니다. 600px 이하의 배너·푸터에서는 장식을 숨겨 글과 메뉴가 좁아지지 않도록 했습니다. 큰 원의 음수 좌표·반복 타일·컨테이너 잘림을 사용하지 않습니다.
- 중앙 정물과 리뷰 카드의 공통 폭, 흑연·실버·노랑 테마, 탐색/리뷰 기능을 유지했습니다. CSS와 직접 작성한 SVG만 바꾸었으며 외부 이미지·폰트·라이브러리는 추가하지 않았습니다.
- Framer Kern(2026-08-05 수정)과 Aperture Folio(2026-09-25 수정)의 공개 설명을 재확인했습니다. 명확한 격자·제한된 강조색·일관된 기하 그래픽의 원칙만 참고했으며 템플릿 자산을 복제하지 않았습니다.
- 배포 전 lint·build·기존 상태/정적 렌더링 검사 15개·`git diff --check`를 통과했습니다. 실제 배포 화면과 공개 기능 조작은 별도 확인 대상입니다. 이전 관리자 인증 연결 거절로 계정 생성·로그인 성공·서버 CRUD 검사는 수행하지 않았으며, 실제 모바일 렌더링 검사도 미완료입니다.

## 2026-09-28 전체 배경의 빛·질감 재구성

- 원을 작은 독립 장식으로 배치한 이전 방향은 사용자가 요청한 ‘전체 배경에 자연스럽게 이어지는 시각 요소’와 달랐습니다. 홈·갤러리·배너·푸터에서 과녁형 장식의 사용을 종료하고, 페이지 전체에 하나의 광학적 빛·질감 이미지를 적용했습니다. 기존 SVG 파일은 이력 보존을 위해 유지합니다.
- `src/assets/ambient-light-field.webp`는 내장 이미지 생성 도구로 새로 만든 실버/옅은 노랑 굴절광 배경입니다. 원본 1086×1448 PNG를 같은 크기의 WebP(26,142 bytes)로 형식 변환·압축했습니다. 이미지 자체의 자르기·합성은 하지 않았고 화면 배치는 CSS로 처리합니다. 외부 사진·템플릿 자산·새 폰트는 추가하지 않았습니다. AI 보조 생성물이며 제3자 권리 비침해를 법적으로 보증하지 않습니다.
- 전체 배경은 반복 타일 없이 연속된 면으로 표시하고 40% 밝은 오버레이를 둡니다. 600px 이하에서는 오버레이를 약 55%로 높입니다. 배경 위 보조 글은 `#505653`으로 조정하고 로그인 폼은 밝은 판 위에 배치했습니다. 배너·푸터에는 같은 자산을 어두운 면과 함께 사용합니다. 중앙 정물·리뷰 카드 정렬, 짧은 카피와 홈/갤러리/리뷰 흐름은 유지합니다.
- 2026-09-28 Webflow의 2026 디자인 경향, Framer Kern(2026-08-05 수정), Aperture Folio(2026-09-25 수정)를 확인하고 고유한 시각 체계, 그래픽과 제품 UI의 결합, 짧은 카피와 명확한 격자를 참고했습니다. 특정 효과를 2026년의 필수 조건이나 취업 성과의 근거로 삼지 않았습니다.
- 공개 가입은 미제공이며 이전 관리자 인증 연결 거절 상태를 유지합니다. 실제 계정 생성·로그인 성공·서버 CRUD, 실제 모바일 렌더링 검수는 이번 수정의 완료 검사로 간주하지 않습니다. 임시 계정과 서버 게시물은 생성하지 않습니다.
- 배포 전 lint·build·기존 로직/정적 렌더링 검사 15개·`git diff --check`를 통과했습니다. WebP의 모든 픽셀에 40% 오버레이를 합성해 계산한 가장 어두운 배경색은 `rgb(202,206,206)`이며 본문 대비 9.66:1, 보조 글 4.73:1, 포커스 3.71:1입니다. 지정 색 조합의 계산이며 전체 페이지 WCAG 적합 판정은 아닙니다. 실제 배포 화면 검수와 구분합니다.
- 1차 배포 후 1363×936의 실제 홈 상단·하단에서 연속 배경, 공통 1200px 정렬, Pretendard와 이미지 로드, 가로 넘침 없음을 확인했습니다. 갤러리 로딩 상태에서 푸터 아래로 배경이 남는 현상을 발견하여 페이지 컨테이너를 세로 flex로 바꾸고 짧은 화면의 푸터를 하단에 배치했습니다.

### ambient-light-field.webp 생성 프롬프트

> Use case: stylized-concept. Asset type: an original full-page ambient background image for a polished Korean design-feedback web portfolio, not a hero picture and not an interface. Create a portrait 3:4 composition, ideally 1536x2048, of luminous silver-white light softly refracted through invisible frosted optical glass onto a seamless pale neutral surface. The subject is the LIGHT itself: broad delicate caustic sweeps, a few long tapering silver-grey shadows, and thin champagne-yellow highlights. Gentle tangible depth, photographic optical material, refined art-direction, not a flat vector pattern. Across the upper RIGHT quarter a softly flowing translucent silvery light band bends slowly downward along the right margin; across the lower LEFT quarter a second broad feathered caustic sweep opens upward, with a very restrained pale butter reflection. These are continuous ambient light fields that integrate into the surface, not separate ornaments. Keep the upper-left 45% and the middle broad vertical corridor quiet, luminous and very pale so black web text remains readable. Base palette near #F5F7F7, softly visible silver shading around #D2D9DC and light greys; only a trace of #F0DC80 in refracted highlights. No saturated blues, mint, green, lavender, pink, burgundy. Very subtle fine material texture only, no noisy grain. Natural broad diffused daylight, smooth falloff, no harsh contrast, no hard image borders. Let light gracefully dissolve into the neutral base at the outer edges and especially top/bottom. Background should be visually present but restrained enough behind real website text and white cards. Do not depict any physical object, ring, circle, orb, target, concentric line, ripple, sphere, lens, recognizable shape, ribbon, folded paper, diagonal paper panel, rectangle, sculpture, frame, grid, dot pattern, typography, letters, logo, watermark, mockup, UI or people. Do not imitate an existing artist or commercial image. The result is one cohesive quietly expressive spatial atmosphere across the entire canvas.

## 2026-09-28 최종 사용성 마감

- 중앙 미리보기의 왼쪽 정물은 브랜드 분위기, 오른쪽 카드는 실제 리뷰 예시를 담당하는 의도적인 비대칭 구성입니다. 페이지 바탕의 연속된 빛 이미지는 양쪽에 적용됩니다. 이번에는 배경·팔레트·메뉴를 다시 바꾸지 않았습니다.
- 배포 화면 1363×936에서 홈 상단·하단, 이미지와 Pretendard 로드, 공통 정렬, 가로 넘침 없음을 재확인했습니다. 실제 키보드 점검 중 ‘본문으로 바로가기’ 다음 Tab이 로고로 돌아오는 문제를 재현했습니다. 페이지 제목으로 초점을 보내도록 수정하고 고정 메뉴 높이를 고려한 스크롤 여백을 적용했습니다.
- 존재하지 않는 주소의 복귀 버튼은 ‘게시글 목록으로’라고 표시하면서 홈으로 이동했습니다. ‘작업 갤러리로’라는 실제 목적지와 링크를 일치시키고, 해당 화면에도 공통 배경·버튼·푸터를 적용했습니다.
- 배포 전 `npm run lint`, `npm run build`, 기존 로직·정적 렌더링 15개 검사와 `git diff --check`를 통과했습니다. 실제 브라우저 로그인 성공·서버 게시물 CRUD·모바일 렌더링을 이 정적 검사로 대체하지 않습니다. 공개 회원가입 미제공 및 이전 인증 연결 거절 상태는 유지합니다.
- 2026-09-28 Framer Kern 소개에서 제한된 강조색, 명확한 격자와 홈/작업 목록/상세 분리를 다시 확인했습니다. 외부 템플릿이나 자산을 복제하지 않았고 새 이미지·폰트·패키지·DB 변경은 없습니다.

## 2026-09-28 배경 좌우 균형 마감

- 첫 화면에서 오른쪽에만 배경이 있는 듯 보인 원인은 기존 세로 이미지의 우상단/좌하단에 집중된 빛 분포였습니다. 전체 면에 이미지를 적용했다는 사실만으로 시각적인 불균형이 해결되지는 않았습니다.
- 기존 배경을 내장 이미지 생성 도구로 수정하여 상단의 양쪽에 서로 다른 굴절광이 이어지도록 했습니다. 새 `src/assets/ambient-light-balanced.webp`(1086×1448, 33,320 bytes)는 원본 PNG를 같은 크기로 WebP 변환·압축한 자산입니다. 외부 이미지는 추가하지 않았고, 기존 자산은 이력 보존을 위해 유지합니다. AI 보조 생성물이며 법적 권리 비침해 보증은 아닙니다.
- `--atmosphere` 참조만 교체해 홈·갤러리·리뷰·안내·로그인·오류 화면의 공통 배경과 배너/푸터에 적용했습니다. 중앙 정물·리뷰 미리보기의 역할, 메뉴, 글꼴, 레이아웃, 인증·게시물 로직은 유지합니다.
- 새 WebP 전체 픽셀의 대비 계산: 40% 밝은 오버레이에서 가장 어두운 배경 `rgb(206,209,211)`, 본문 9.99:1, 보조 글자 4.89:1, 포커스 3.84:1입니다. 모바일 규칙의 약 55% 오버레이에서는 각각 11.01:1, 5.39:1, 4.23:1입니다. 색 조합 계산이며 전체 접근성 인증이나 실제 모바일 렌더링 검사가 아닙니다.
- 2026-09-28 다시 확인한 Framer Kern(2026-08-05 갱신)의 제한된 강조색·정렬 체계·홈/작업 목록/상세 분리 원칙을 유지합니다. 구성 참고이며 템플릿 자산은 복제하지 않았습니다. 실제 계정 생성·로그인 성공·서버 CRUD는 기존 인증 연결 거절 상태로 재검증하지 않습니다.

### ambient-light-balanced.webp 수정 프롬프트

배포 전 lint·build·기존 로직/정적 렌더링 검사 15개·`git diff --check`를 통과했습니다. 이 검사는 실제 계정·서버 기능 검사와 구분합니다.

> Use case: lighting-weather. Asset type: full-page ambient background for the Korean design critique portfolio website Goreunsiseon. Image 1 is the edit target. Keep the existing refined silver-grey surface, frosted-glass refracted daylight, restrained pale champagne-yellow highlights, very fine material texture and airy low-contrast quality. Change only the DISTRIBUTION of the light: the current top-left is almost empty while top-right is busy. Rebalance the image so its UPPER THIRD already contains clearly visible but soft light textures on BOTH the LEFT and RIGHT, of comparable visual weight. Add broad, delicate refracted light drifting naturally in from the upper-left edge across the left quarter; retain a softer complementary light on the upper-right. Continue a quiet irregular light field along both sides toward the bottom. Do not mirror or repeat identical patches: make one natural continuous photographic surface. The central area and the upper-left text zone must stay high-key and readable for dark website headings, with subtle low-frequency tonal variation, no dark shadows behind copy. Preserve portrait orientation and the original silver/offwhite/champagne palette; no mint, teal, lavender, blue, pink or burgundy. Avoid large blank halves, hard diagonals, physical objects, circles, rings, arcs, targets, spheres, paper folds, ribbons, geometric panels, grid, borders, text, logos, UI, people, watermark. Light should dissolve gently into the pale base at the edges. This is a background-only refinement, not a website screenshot.

## 가독성과 리뷰 맥락 마감

- 홈의 분위기 설명을 번호 선택·의견 입력·수정안 비교라는 실제 행동으로 바꿨습니다. 기존 금속/유리 자산과 팔레트를 유지하면서 미리보기 폭을 늘리고, 핵심 화면 부분을 보여줘 첫 화면의 높이를 줄였습니다. 홈과 안내 페이지의 체험 순서를 일치시켰습니다.
- 리뷰 제목 아래에 검토 질문을 표시하고 작업 종류·검토 초점을 함께 보존했습니다. 수정안에서는 선택한 번호의 ‘바꾼 점·확인할 점’ 한 세트만 표시합니다. 확인 기준은 제안이며 측정된 사용자 성과가 아닙니다.
- 샘플 분류를 ‘정보 위계·주요 행동·입력·안내’라는 검토 기준으로 맞췄습니다. 기존 분류 URL은 해당 구분 버튼과 이전 결과를 유지하며, 검색은 작업 맥락도 포함합니다.
- 제목 24px, 검토 질문 16px, 의견 본문 15px, 입력 16px, 의견 소멸 안내 14px로 역할을 나눴습니다. 리뷰 상세에서는 공통 배경 위 밝은 덮개를 강화해 검토 화면과 글의 대비를 높였습니다. 갤러리·안내의 제목 배너 높이와 공통 간격도 줄였습니다.
- 새 이미지·외부 템플릿·패키지·인증 설정·DB 변경은 없습니다. 고른시선 외 프로젝트는 변경하지 않았습니다.
- 배포 전 ESLint·Vite build·`git diff --check`와 분류/검색/기존 URL 호환 로직 검사를 통과했습니다. 실제 모바일 렌더링과 비공개 계정 로그인·서버 CRUD는 이 검사에 포함되지 않습니다. 공개 회원가입은 기존처럼 제공하지 않습니다.
- 배포 `d04b7b45` / Actions `37503504176` build·deploy 성공 후, 실제 브라우저 1363×936에서 홈·갤러리·리뷰·안내의 간격과 글자 위계를 검토했습니다. 홈 공통 세 영역이 x=74px/폭=1200px로 일치하고 Pretendard 및 이미지 로드, 홈·리뷰 가로 넘침 없음을 확인했습니다. 새 글/면 조합 6쌍의 대비는 최소 6.23:1입니다. 전체 WCAG 인증은 아닙니다.
- 공개 UI 실제 조작: 수정 전후 전환, 2번 위치 선택과 설명 변경, 빈 의견 오류, 체험 의견 추가·삭제, 확대 창 및 Escape 닫기, 정보 위계 필터 3개 결과, 빈 검색·초기화 6개 복원, FAQ 펼침을 확인했습니다. 테스트 의견은 삭제했으며 계정·비밀번호·운영 게시물은 만들지 않았습니다.
- 브라우저에서 발견한 홈 번호와 제목의 겹침을 추가 조정하고, 안내 그림의 번호 위치도 맞췄습니다. 실제 모바일·hover 동작 전체·비공개 인증 검증을 완료했다고 보고하지 않습니다. 캡처는 도구가 제공하는 실제 JPEG이며 native PNG 검수와 구분합니다.

## 실행 방법

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


## 2026-10-07 목적·메뉴·코랄 테마 개편

- 홈 첫 문장을 ‘화면에 의견을 남기고, 수정 전후를 비교하세요.’로 바꾸고 실제 리뷰 UI를 가장 크게 배치했습니다. 첫 화면의 두 번호 선택과 수정 전/수정안 전환이 동작합니다.
- 홈 메뉴를 없애고 로고로 홈에 돌아갑니다. 오른쪽 메뉴는 리뷰 예제·수정 전후·챌린지·이용 안내입니다. 설명을 반복하는 대신 `/compare`와 `/challenges`를 추가했습니다.
- 링크·버튼의 장식 화살표를 제거했습니다. 샘플 음악 화면의 되감기/앞으로 감기 아이콘은 의미가 있는 화면 요소이므로 유지합니다.
- 사용자가 제공한 소셜 앱 시안의 코랄·피치·크림·짙은 패널 색 비중을 참고했습니다. 이미지 속 인물 사진·브랜드·화면 배치는 복제하지 않았습니다. 주색 `#302C32`, 바탕 `#FFF8F4`, 포인트 `#F18C7C`, 짙은 강조 `#A44438`을 공통 UI에 적용했습니다. 장식 배경의 대비를 낮춰 리뷰 화면을 먼저 보게 합니다. 확인되지 않은 퍼스널컬러·성격을 사실로 단정하지 않습니다.
- 배너 그림은 코드로 만든 화면·댓글 SVG입니다. 챌린지는 가상 연습이며 실제 모집·제출·시상·상금이 없음을 배너와 목록에서 명시합니다. 기존 이미지와 라이선스 범위는 유지합니다.
- [MarkUp](https://www.markup.io/)과 [Pastel](https://usepastel.com/)의 화면 위치에 연결되는 피드백 구조, [Webflow 2026 trends](https://webflow.com/blog/web-design-trends-2026)의 짧은 카피와 제품 UI 중심 구성을 2026-10-07 KST에 확인했습니다. 원본 이미지·브랜드·성과 수치를 가져오지 않았고 유행이나 채용 성과를 보증하지 않습니다.
- 기존 Auth·DB·가입 정책·패키지·배포 워크플로는 이번 변경 대상이 아닙니다. 공개 의견은 브라우저 메모리에서만 체험하며 저장·협업·자동 디자인 생성으로 표현하지 않습니다.
- 배포 전 `npm run lint`, `npm run build`, `git diff --check` 통과. 주요 색상 대비 7쌍은 본문 13.05:1, 보조 글 6.45:1, 코랄 버튼/핀 5.73:1, 배너 본문 5.29:1, 배너 고지 5.30:1, 수정 방향 5.73:1, 초점 윤곽 5.77:1입니다. 전체 WCAG 적합 판정은 아닙니다.
- 실제 배포 `66cadaa6`에서 Chrome 1363×936으로 홈의 두 번호 선택·수정 전후 전환, 로고 홈 이동, 4개 메뉴, 배너→챌린지→샘플 리뷰, 비교 예제 선택(시선의 모양/느린 파장)과 연결 주소 갱신, 목록 검색·초기화, FAQ 펼침을 확인했습니다. 홈·배너·챌린지·비교 화면의 실제 스크린샷에서 정렬을 점검했습니다. 가로 스크롤 없음(문서 폭 1348px / viewport 1363px), Pretendard 로드도 확인했습니다.
- 작은 시작 샘플에서 체험 의견 추가·삭제, 공백 입력 거절, 수정안 전환을 실제 조작했습니다. 테스트 의견과 초안은 정리했으며 계정·비밀번호나 서버 데이터는 생성하지 않았습니다.
- 현재 브라우저는 viewport 크기 변경 기능이 없어 모바일은 CSS·구조 검토만 했습니다. 모바일 실기기 검수와 비공개 QA 계정 로그인·운영 게시물 CRUD는 이번 회차에 재실행하지 않았습니다. 공개 회원가입은 제공하지 않는 기존 정책입니다.
- 스크린샷은 브라우저가 제공하는 원본 JPEG입니다. 확인한 콘솔 오류 항목은 브라우저 확장 content-script 출처였으며, 이 결과만으로 전체 무오류를 단정하지 않습니다.


## 2026-10-07 피드백 반영 마감

- 홈은 완성된 수정안을 먼저 표시합니다. 수정 전으로 전환할 수 있으며 의견 영역에 ‘수정 전 받은 예시 의견’을 표시해 현재 화면의 문제로 오해하지 않도록 했습니다. 홈과 상세·비교 화면에 검토용 디자인 이미지임을 명시했습니다.
- 공개 명칭을 ‘피드백 연습’으로 통일하고 기존 `/challenges` 주소는 유지합니다. 준비된 예제·고정 수정안·의견 미저장의 실제 범위에 맞춰 문구를 줄였습니다.
- 대표 전시 예제의 비교 화면에서 ‘수정 이유’를 펼쳐 유지한 배치·선택한 강조·선택하지 않은 대안·확인할 점을 볼 수 있습니다. 가상 예제의 설계 판단이며 실제 사용자 검증 결과로 표현하지 않습니다. 기존 그림·핀 좌표를 유지합니다.
- 홈에서 ‘수정 이유 함께 보기’로 해당 예제의 비교 화면에 진입합니다. 소개 문구와 리뷰 의견 패널의 왼쪽 기준을 맞추고, 메뉴·버튼·사용 범위 안내의 글자 크기를 보강했습니다.
- 좁은 화면에서는 홈 번호 핀에 별도 여백을 확보해 이미지 글자와 겹치지 않게 했습니다. 반응형 CSS는 실제 모바일 기기 검수와 별개입니다.
- 이 회차는 고른시선 내부의 화면과 안내만 수정합니다. Auth·운영 DB·패키지·배포 워크플로·다른 프로젝트 변경은 없습니다.
- 배포 전 `npm run lint`, `npm run build`, `git diff --check`를 통과했습니다. 추가한 안내·링크·수정 이유 문구의 대비는 5.81:1, 7.26:1, 8.82:1, 6.01:1로 확인했습니다. 전체 접근성 적합 판정은 아닙니다.
- 배포 `6a7ea71`의 GitHub Actions build·deploy 성공 후 Chrome 1363×936에서 홈 기본 수정안, 두 번호 선택, 수정 전후 전환과 연결 주소, 수정 이유 진입·펼치기·Enter로 접기, 비교 예제 변경을 실제 조작했습니다. 피드백 연습·이용 안내·대표 비교 화면은 스크린샷으로 글자 위계·카드와 버튼 정렬을 확인했습니다. 홈에 가로 넘침이 없고 소개 문구와 의견 패널의 텍스트 시작점 차이는 1px입니다.
- 대표 리뷰에서 빈 의견 안내, 임시 의견 추가·삭제, 수정안 전환, 디자인 확대·Esc 닫기와 확대 버튼으로 초점 복귀를 확인했습니다. 테스트 의견은 지웠으며 계정·비밀번호나 서버 데이터는 만들지 않았습니다. 최종 화면은 브라우저 원본 JPEG로 기록했습니다.
- 사용자 피드백의 핵심은 서비스 목적의 혼동이었습니다. 이에 첫 화면에서 리뷰 조작을 보여주고, 고정 예제와 실제 조작 버튼의 구분을 추가했습니다. 위 결과는 구현·동작 확인이며 실제 이용자의 이해도 향상이나 채용 성과를 측정한 결과가 아닙니다.
- 모바일은 CSS 구조 검토만 했습니다. 이 브라우저에서 화면 폭 변경이 적용되지 않아 모바일 실기기 검수는 완료로 표시하지 않습니다. 비공개 QA 로그인·운영 게시물 CRUD·회원가입은 이번 회차의 실검사에 포함하지 않았습니다. 확인한 콘솔 오류 표본은 브라우저 확장 content-script 출처입니다.
