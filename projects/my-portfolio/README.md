# 김도한 | UX/UI 디자인 · 웹퍼블리싱 포트폴리오

공개 주소: https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/

## 현재 디자인 기준

사용자가 요청한 전면 리디자인을 코드에 반영했다. 첨부된 건축 포트폴리오의 편집 그리드와 회청색 레퍼런스를 참고하되, 외부 템플릿 이미지·코드는 포함하지 않는다. 이전 Human Signal Figma 화면을 그대로 구현한 버전이 아니다. 이번 구현에서는 Figma 원본을 수정하지 않았다.

- 배경 `#F7F8FA`, 본문 `#202B36`, 보조 `#536371`, 강조 `#36566E`, 보조면 `#DFE7EF`.
- SUIT Variable을 기존 설치 패키지에서 자체 번들링한다. 별도 Google Fonts 요청은 없다.
- 메인은 짧은 소개 → 대표 3개 → 추가 4개 → 소개·역량 → 연락 순서다.
- 대표는 갈피록·설비결·잔상관, 추가 작업은 기준선·고른시선·온정류·소요빛이다.
- 최대 콘텐츠 폭 1280px, 기본 한글 본문 16px 이상. 모바일은 단일 열, 큰 화면의 목록은 2열이다.
- 장식 로고 히어로·준비 중 메뉴·과도한 문서형 설명을 줄이고 실제 화면을 우선 배치한다.

## 화면과 경로

| 경로 | 내용 |
| --- | --- |
| `/` | 메인, 소개, 연락 |
| `/about` | 홈 소개 섹션으로 이동 |
| `/projects` | 공개 작업 7개와 전체/웹사이트/Figma 필터 |
| `/projects/jobflow` | 갈피록 |
| `/projects/seolbiit` | 설비결 |
| `/projects/ott-service` | 잔상관 |
| `/projects/gongjeongbom` | 기준선 |
| `/projects/feedback-hub` | 고른시선 |
| `/projects/bus-arrival` | 온정류 |
| `/projects/brewstep` | 소요빛 |

HashRouter를 사용한다. 기존 외부 링크를 유지하기 위해 내부 slug는 변경하지 않았다. 상세는 제목·바로가기·실제 화면 → 배경 → 화면과 판단 → 제작 범위·한계·기여 순서다. 이미지 원본 링크를 제공하며 같은 이미지를 반복 나열하지 않는다.

## 정보의 기준

- `src/data/projectsFallbackData.js`: 공개 이름·소개·역할·도구·외부 링크·제작 범위.
- `src/data/projectsData.js`: 정렬·현재 썸네일 URL·화면 유형.
- `src/data/portfolioMeta.js`: 메인 메타와 상세의 설명·화면 연결.
- `src/index.css`: 공통 팔레트·헤더·메인·소개·연락.
- `src/pages/portfolioEditorial.css`: 전체 작업과 상세 페이지.
- `src/theme.js`: MUI 기본 테마. 기존 보관 컴포넌트와의 호환을 위해 legacy export 이름을 유지한다.

갈피록·고른시선·잔상관은 웹 결과물을 연결한다. 기준선·설비결·온정류·소요빛은 현재 Figma 디자인으로 표시한다. 최신 Figma 화면을 이전 웹 구현이나 완전한 프로토타입으로 설명하지 않는다.

가상 데이터·브라우저 메모리·localStorage·실제 서버 저장은 각 프로젝트의 현재 코드와 상세 설명에서 구분한다. 사용자 조사나 채용 성과 수치를 임의로 만들지 않는다. 김도한의 요구사항·피드백·방향 선택과 AI의 디자인 제안·편집·구현 참여를 구분한다.

## 현재 이미지

`public/detail/current/`의 Figma 8장은 실제 디자인 노드에서 원본 크기로 내보낸 이미지다. 공개 웹 화면 2장은 실제 브라우저 캡처다. 기존 갈피록 4장은 현행 웹앱의 PC 캡처를 재사용한다. 이전 자산은 삭제하지 않았지만 현재 데이터에서는 연결하지 않는다. 파일별 출처는 `docs/asset-license-register.md`를 참고한다.

## 실행과 검증

```bash
npm run dev
npm run lint
npm run build
```

기존 `tools/site-audit-kit`의 기준처럼 실제 렌더링에서 h1·이미지 로딩·가로 넘침·콘솔 오류·키보드 이동을 확인한다. 새 디자인의 시각 검토는 자동 검사와 구분한다. 브라우저 시뮬레이션은 모바일 실기기 검증을 뜻하지 않는다.

## 운영

`main` push는 기존 GitHub Actions 배포를 실행하므로 commit·push·deploy는 루트 `AGENTS.md`의 승인 기준을 따른다. 이번 디자인 작업은 패키지·lockfile·workflow·DB·secret을 변경하지 않는다.
