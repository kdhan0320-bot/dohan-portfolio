# 공정봄

제조 검사 문제에서 후보 제품을 찾고, 같은 종류의 모델을 비교한 뒤 기술 문의
정보를 정리하는 반응형 B2B 웹사이트 포트폴리오입니다. 모든 기업명·제품명·사양은
가상 정보입니다.

## 실행

별도 패키지나 빌드 과정이 없습니다. 이 폴더를 루트로 로컬 HTTP 서버를 실행한 뒤
`index.html`을 엽니다.

```bash
python -m http.server 4173
```

## 구현 범위

- 홈 → 제품 찾기 → 제품 상세 → 같은 종류 제품 비교 → 기술 문의 흐름
- 하나의 JavaScript 데이터 구조에서 가상 제품 7개 렌더링
- 제품명·모델명·검사 문제 검색과 제품 종류·검사 문제·설치 조건 필터
- 같은 제품 종류 최대 3개 비교, 다른 종류 비교 차단
- 비교 목록 `sessionStorage` 유지
- 선택 제품을 기술 문의에 전달
- 3단계 문의 폼, 필수 항목·이메일 검증, 오류 요약, 데모 완료 상태
- 모바일 전체 메뉴와 제품 필터의 Escape 닫기 및 트리거 초점 복귀
- `prefers-reduced-motion` 대응

## 데이터와 실제 연동 범위

제품과 사양은 `js/data.js`의 정적 가상 데이터입니다. 비교 선택만 현재 브라우저
탭의 `sessionStorage`에 보관합니다. 기술 문의 입력은 브라우저나 서버에 저장하지
않고, 이메일·CRM·기업 계정으로 전송하지 않습니다. 로그인·결제·CMS·API·DB 연동은
포함하지 않습니다.

## Figma 기준

- 파일: `3ZJ4TUGqBNAewsJYzheOWo`
- 구현 기준: `05_SPEC_QA` node `197:2`
- 모션 기준: `04_MOTION` node `137:2`
- 데스크톱·태블릿·모바일의 승인 최종 화면을 구조와 반응형 기준으로 사용

반복되는 페이지 구조와 상태를 실제 HTML·CSS·JavaScript로 동작하게 만들기 위해
Figma의 일부 정적 샘플 상태는 데이터 기반 상태로 통합했습니다.

## 자산과 라이선스

| 경로 | 내용 | 출처·제작 방식 | 라이선스·권리 상태 |
| --- | --- | --- | --- |
| `assets/fonts/NotoSansKR-400.woff2`, `NotoSansKR-500.woff2`, `NotoSansKR-700.woff2` | 본문·UI용 Noto Sans KR 웹폰트 | Google Fonts 공식 CSS API와 `fonts.gstatic.com`이 프로젝트 문자 집합으로 생성한 WOFF2를 2026-07-31 내려받음. 제작자: Noto Authors. 코드에서 본문·제목·UI에 사용. 별도 수정·크롭·AI 생성 없음 | SIL Open Font License 1.1, 원문 `assets/fonts/OFL.txt` |
| `assets/fonts/RobotoMono-500.woff2` | 모델명·기술 값용 Roboto Mono 웹폰트 | Google Fonts 공식 CSS API와 `fonts.gstatic.com`이 모델명·`PLC`·`Ethernet` 문자 집합으로 생성한 WOFF2를 2026-07-31 내려받음. 제작자: Christian Robertson, Roboto Mono contributors. 코드에서 제한적으로 사용. 별도 수정·크롭·AI 생성 없음 | SIL Open Font License 1.1, 원문 `assets/fonts/RobotoMono-OFL.txt` |
| `assets/fonts/NotoSansKR-VF.ttf` | WOFF2 문자 subset 밖의 한국어를 보완하는 Noto Sans KR variable TTF fallback | Noto 공식 `notofonts/noto-cjk` 저장소의 `Sans/Variable/TTF/Subset/NotoSansKR-VF.ttf`를 2026-07-31 수정 없이 내려받음. WOFF2를 우선하고 누락 글리프에만 사용 | SIL Open Font License 1.1, 원문 `assets/fonts/OFL.txt` |
| `assets/graphics/vision-system.svg` | 가상 비전 시스템 도식 | 이 프로젝트 구현을 위해 기본 SVG 도형으로 직접 작성. 제품 상세에 사용. 수정·크롭·AI 생성 없음 | 프로젝트 직접 제작, 외부 사진·로고·브랜드 자산 없음 |
| `assets/graphics/connector-inspection.svg` | 커넥터 조립 검사 도식 | 이 프로젝트 구현을 위해 기본 SVG 도형으로 직접 작성. 홈 적용 사례에 사용. 수정·크롭·AI 생성 없음 | 프로젝트 직접 제작, 외부 사진·로고·브랜드 자산 없음 |
| `assets/graphics/dimension-measurement.svg` | 치수 측정 도식 | 이 프로젝트 구현을 위해 기본 SVG 도형으로 직접 작성. 홈 적용 사례에 사용. 수정·크롭·AI 생성 없음 | 프로젝트 직접 제작, 외부 사진·로고·브랜드 자산 없음 |
| `assets/graphics/code-reading.svg` | 코드 판독 도식 | 이 프로젝트 구현을 위해 기본 SVG 도형으로 직접 작성. 홈 적용 사례에 사용. 수정·크롭·AI 생성 없음 | 프로젝트 직접 제작, 외부 사진·로고·브랜드 자산 없음 |
| `index.html`, `css/style.css`의 `.signal-*` | 반응형 검사 신호 Hero 장면과 1회 스캔 모션 | Figma 브랜드 그래픽 시스템의 구성 원칙을 기준으로 HTML·CSS 기본 도형과 텍스트로 직접 재구성. 외부 export·이미지·SVG path를 사용하지 않음. AI 생성 없음 | 프로젝트 직접 제작, 외부 사진·로고·제품 이미지 없음 |
| `js/data.js`의 `familyDiagramMarkup()` | 비전 센서·비전 시스템·코드 판독기 제품군 도식 | 기본 SVG 요소로 직접 작성해 홈 카드에 인라인 렌더링. 외부 SVG·제3자 path·base64·AI 생성 없음 | 프로젝트 직접 제작 |
| `js/data.js`의 `modelDiagramMarkup()` | MV-X300·MV-X500·MV-X700 카메라 구성 도식 | 기본 SVG 요소를 데이터에 따라 1·2·4 카메라로 직접 작성해 제품 찾기와 비교 화면에 인라인 렌더링. 외부 SVG·제3자 path·base64·AI 생성 없음 | 프로젝트 직접 제작 |

공식 폰트 출처:

- <https://github.com/notofonts/noto-cjk>
- <https://github.com/notofonts/noto-cjk/blob/main/Sans/README.md>
- <https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE>
- <https://fonts.google.com/noto/specimen/Noto+Sans+KR>
- <https://fonts.google.com/specimen/Roboto+Mono>
- <https://github.com/google/fonts/tree/main/ofl/robotomono>

실존 기업 로고, 실물 제품 사진, 고객사·인증·납품 실적은 사용하지 않았습니다.
