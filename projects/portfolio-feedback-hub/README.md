# Portfolio Feedback Hub

취업 준비생과 UX/UI 학습자가 포트폴리오와 피드백 요청을 공유하는 취업용 커뮤니티 데모입니다.

- 배포 주소: https://kdhan0320-bot.github.io/dohan-portfolio/my-community/

---

## 제작 목적

포트폴리오를 만들었지만 객관적인 피드백을 받기 어려운 문제를 해결하기 위해, 게시글 탐색과 댓글 중심의 공개 피드백 흐름을 구현했습니다.

단순히 기능이 많은 게시판이 아니라, 포트폴리오 피드백이라는 목적에 맞춘 정보 위계, 탐색용 분류, 계산형 상태 표시, 피드백 요청 템플릿을 중심으로 설계했습니다.

---

## 주요 기능

- 로그인 / 회원가입
- 게스트로 둘러보기
- 테스트 계정 체험 안내
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

---

## 테스트 계정

- 아이디: demo
- 비밀번호: demo1234!

배포 환경의 Supabase Auth에 해당 계정이 등록되어 있어야 테스트 계정 로그인이 가능합니다.

테스트 계정 로그인이 실패해도 게스트 모드로 목록, 상세, 검색, 필터, 정렬 등 주요 화면을 확인할 수 있습니다.

이 프로젝트는 데모 목적의 프로젝트이며, 실제 개인정보를 입력하지 않는 것을 권장합니다.

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

실제 운영 서비스가 아니므로 테스트 계정, 샘플 데이터, 게스트 모드는 시연 목적에 맞게 구성되어 있습니다.

README에는 실제 구현된 기능과 향후 개선 예정 기능을 구분해 작성했습니다.
