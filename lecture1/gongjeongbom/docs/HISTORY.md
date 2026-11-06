# 공정봄

제조 검사 문제에서 후보 제품을 찾고, 같은 종류의 모델을 비교한 뒤 기술 문의 정보를 정리하는 반응형 B2B 웹사이트 포트폴리오입니다.

## 대상 사용자와 문제

검사 장비의 모델명을 먼저 알지 못하는 제조 실무자가 누락·외관·치수·코드 문제에서 탐색을 시작해 설치 조건과 검사 흐름에 맞는 가상 제품을 좁히도록 설계했습니다. 기업명·제품명·사양은 모두 화면 설계를 위한 가상 정보이며 실제 장비 선정에 사용할 수 없습니다.

## 주요 사용자 흐름

1. 홈에서 해결하려는 검사 문제를 선택합니다.
2. 제품 찾기에서 검색·제품 종류·검사 문제·설치 조건을 조합합니다.
3. 제품 상세에서 적합 조건, 다른 선택, 역할, 구성 범위를 확인합니다.
4. 같은 제품 종류를 최대 3개까지 비교합니다.
5. 선택 제품과 공정 조건을 3단계 기술 문의 데모에서 정리합니다.

## 실제 구현 기능

- `js/data.js`의 가상 제품 7개를 목록·상세·비교·문의에 공통 사용
- 제품별 상세 제목·요약·적합 조건·대안·역할·visual·관련 제품 안내
- 잘못된 제품 ID의 명시적인 찾을 수 없음 상태
- 제품명·검사 문제 검색과 제품 종류·검사 수준·설비 연결 필터
- 같은 제품 종류 최대 3개 비교와 다른 종류 선택 차단
- 모바일 전체 메뉴와 제품 필터의 `Escape` 닫기 및 트리거 초점 복귀
- 문의 오류 요약, radio group 단위 검증, 단계 제목 초점, 완료 상태
- 본문 바로가기와 제품 상세 목차 anchor
- `prefers-reduced-motion` 대응

## 데이터와 연동 범위

제품 상세의 단일 Source of Truth는 `js/data.js`입니다. 제품·사양·선택 문구는 정적 가상 데이터이며 비교 선택과 문의에 전달할 제품 ID만 현재 탭의 `sessionStorage`에 보관합니다.

선택 제품 ID와 별개로, 이름·이메일·문제 설명 등 문의 작성값은 앱에서 별도로 저장하지 않으며 실제 기업·이메일·CRM으로 전송하지 않습니다. 로그인·결제·CMS·API·DB 연동도 포함하지 않습니다.

## 실행 방법

별도 package나 build 과정이 없습니다. 이 폴더를 root로 로컬 HTTP 서버를 실행하고 `index.html`을 엽니다.

```bash
python -m http.server 4173
```

독립 운영 Live URL은 없습니다. 별도 포트폴리오 프로젝트 안의 공정봄 case study와 이 정적 프로젝트의 공개 배포 여부는 서로 다릅니다.

## 핵심 파일과 폴더

| 경로 | 역할 |
| --- | --- |
| `index.html` | 문제 중심 홈과 제품 탐색 진입 |
| `products.html` | 검색·필터·제품 목록 |
| `product.html` | query ID에 따른 제품별 상세 또는 찾을 수 없음 상태 |
| `compare.html` | 같은 종류 제품의 차이 비교 |
| `inquiry.html` | 선택 제품 ID는 현재 탭 `sessionStorage`에 임시 유지하고, 문의 작성값은 별도 저장·외부 전송하지 않는 3단계 기술 문의 데모 |
| `css/style.css` | 공통 디자인, 반응형, 접근성 상태, 모션 |
| `js/data.js` | 7개 catalog와 상세 화면 데이터, 제품 diagram helper |
| `js/common.js` | Header·Footer·본문 바로가기·dialog·비교·문의 공통 상태 |
| `js/products.js` | 제품 검색·필터·목록 상태 |
| `js/product.js` | 제품별 상세 데이터 렌더링과 invalid ID 상태 |
| `js/compare.js` | 비교 화면과 선택 상태 |
| `js/inquiry.js` | 단계 이동·검증·요약·완료 상태 |
| `assets/fonts` | runtime 폰트 2개와 SIL OFL 1.1 문서 2개 |
| `assets/graphics` | 직접 제작한 가상 검사 diagram SVG |

## Figma Source of Truth

- 파일: `3ZJ4TUGqBNAewsJYzheOWo`
- 구현 기준: `05_SPEC_QA` node `197:2`
- 모션 기준: `04_MOTION` node `137:2`
- 데스크톱·태블릿·모바일의 승인 최종 화면을 구조와 반응형 기준으로 사용

Figma와 구현은 `js/data.js`의 현재 제품별 상세 계약을 공통 기준으로 사용합니다.

## 접근성·반응형 지원

- 390·1024·1440 CSS viewport에 맞춘 레이아웃
- 본문 바로가기, landmark, 한 페이지 한 `h1`, 키보드 포커스 표시
- 문의 radio group 오류 1건 처리, 고유 ID와 오류 summary 링크
- 단계 전환 제목과 완료 상태의 programmatic focus
- 모바일 dialog의 `Escape` 닫기와 focus return
- reduced motion 환경의 기능적 모션 축소

실제 screen reader 음성 출력과 현장 사용자 테스트는 별도 검증이 필요합니다.

## 폰트·그래픽·라이선스

| 경로 | runtime 상태와 제작 방식 | 권리 상태 |
| --- | --- | --- |
| `assets/fonts/NotoSansKR-Variable-Subset.woff2` | 공식 Noto Sans KR variable TTF 원본에서 현재 사용자 노출 문자열과 ASCII·필수 기호를 수집해 `fontTools 4.63.0`과 WOFF2 지원 환경으로 생성한 100–900 variable subset. 본문·제목·UI에서 사용 | SIL Open Font License 1.1, `assets/fonts/OFL.txt` |
| `assets/fonts/RobotoMono-500.ttf` | 모델명·기술 값에 제한적으로 사용하는 TrueType(sfnt) Roboto Mono static 500 subset. SHA-256 `ACCF0063DCBE24AD3E1F73E5FF32A242C38F9F1E2920B54097F78850B7A27042` | SIL Open Font License 1.1, `assets/fonts/RobotoMono-OFL.txt` |
| `assets/graphics/vision-system.svg` | runtime에서 미참조인 직접 제작 초기 비전 시스템 diagram 원본·복구 자산. 화면 복구·재구성 기준으로 보존 | 프로젝트 직접 제작 |
| `assets/graphics/connector-inspection.svg` | 커넥터 조립 검사 도식 | 프로젝트 직접 제작 |
| `assets/graphics/dimension-measurement.svg` | 치수 측정 도식 | 프로젝트 직접 제작 |
| `assets/graphics/code-reading.svg` | 코드 판독 도식 | 프로젝트 직접 제작 |
| `js/data.js`의 diagram helper | 비전 센서·MV-X 카메라 구성의 inline SVG | 프로젝트 직접 제작 |

공식 폰트 출처:

- <https://github.com/notofonts/noto-cjk>
- <https://github.com/notofonts/noto-cjk/blob/main/Sans/README.md>
- <https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE>
- <https://github.com/google/fonts/tree/main/ofl/robotomono>

Noto Sans KR 원본 TTF는 저장소에 포함하지 않습니다. subset을 다시 만들어야 할 때는 위 공식 원본을 받아 같은 문자열 수집 기준과 `fontTools 4.63.0`의 WOFF2 생성 절차를 사용합니다.

실존 기업 로고, 실물 제품 사진, 고객사·인증·납품 실적은 사용하지 않았습니다.

## 현재 한계

- 정적 포트폴리오 데모이며 독립 Live 배포·실제 상담 연동이 없습니다.
- 가상 사양은 산업 장비 성능이나 현장 적합성을 보증하지 않습니다.
- 실제 screen reader, 운영 환경 Core Web Vitals, 법적 권리 체인 전체는 이 저장소만으로 확인할 수 없습니다.
