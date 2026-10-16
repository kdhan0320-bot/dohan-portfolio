# 자산 라이선스 등록부

## 최신 기록: 2026-10-16 샘플 진입·작업 폭·소개 흐름 정리

최신 로컬 브라우저 화면으로 현재 자산 6개를 갱신했습니다. PNG 두 개는 반환 원본 그대로 저장했고 JPEG 네 개는 PNG 캡처를 System.Drawing JPEG 품질 94로 형식만 변환했습니다. 그림 생성·글자 교체·합성·이미지 파일 자르기·크기 조정은 하지 않았습니다.

| 파일 (`public/detail/current/`) | 이번 캡처 | 저장 픽셀 |
| --- | --- | --- |
| `galpirok-welcome.jpg` | 그라데이션을 보강한 홈, 샘플 체험하기 | 1440×900 |
| `galpirok-welcome-mobile.jpg` | 모바일 홈 첫 화면 | 375×812 |
| `galpirok-overview.jpg` | 1320px 작업 폭과 두 열의 오늘의 지원 | 2560×1440 |
| `galpirok-flow-ready.jpg` | 모션브릿지의 완료한 준비 항목 2개 | 1440×900 |
| `galpirok-checklist-filter-all-v2.png` | 전체 분류, 진행 중 5개 | 2560×1440 |
| `galpirok-checklist-filter-empty-v2.png` | 기타 분류, 빈 결과 | 2560×1440 |

모바일 홈의 검사 viewport는 390×844였으며 캡처 도구 반환 파일은 375×812입니다. 파일을 확대하지 않았으며 메타에는 저장 픽셀 비율을 사용합니다. 나머지 위 파일의 저장 픽셀은 검사 viewport와 같습니다.

현재 필터 두 상태의 CSS 부분 보기는 PC x630/y270/1265×610, 모바일 x918/y383/360×315입니다. 빈 결과의 안내 글자가 보이도록 실제 UI 정렬과 표시 위치를 맞췄습니다. 준비 완료 부분 보기는 x53/y169/1320×650입니다. 모바일 마감의 이전·현재 원본은 재사용하며 둘 다 x15/y125/345×505를 표시합니다. 모바일은 개선 후가 기본인 선택 보기이며 전체 원본 링크를 제공합니다. 회사 상세 원본의 540px 영역은 표시 최대 폭 390px로 사용합니다.

사용 흐름의 네 이미지는 같은 그리드 영역에서 최대 높이를 예약합니다. 2560×1440, 390×844, 360×800에서 기록→마감→준비→지원 완료 선택 시 스크롤과 버튼의 y 위치가 각각 동일했습니다. 이는 해당 동작의 위치 측정이며 전체 CLS나 사용자 성과 수치가 아닙니다. 현재 필터 비교는 개선 전후가 아니라 현재 두 상태입니다. 실제 사용자 데이터·독립 수행·채용 성과를 주장하지 않습니다.

이하의 같은 날짜 기록도 이전 회차의 내용입니다. 현재 파일·표시 좌표는 이 최신 기록을 우선합니다.

## 이전 이력: 2026-10-16 기존 필터 원본의 부분 보기

`galpirok-checklist-filter-all-v2.png`와 `galpirok-checklist-filter-empty-v2.png` 두 2560×1440 원본을 재사용합니다. 이미지 파일은 변경하지 않았습니다. 소개에서는 선택 버튼으로 현재 두 상태를 번갈아 표시하며, 두 파일 모두 동일한 CSS 부분 보기 좌표를 사용합니다.

| 표시 조건 | 원본 픽셀 기준 부분 보기 | 실제로 보이는 범위 |
| --- | --- | --- |
| 761px 이상 | x515 / y270 / 1500×610 | 제목, 필터, 회사 선택과 준비 목록의 작업 영역 |
| 760px 이하 | x824 / y383 / 360×315 | PC 상태 탭과 목록 시작, 준비 항목 일부 |

모바일 캡션에도 `PC 부분 보기`라고 명시하고 2560×1440 전체 원본 링크를 제공합니다. 원본의 PC 상태를 모바일 서비스 화면으로 표시하거나, 현재 두 상태를 개선 전후로 설명하지 않습니다. 글자 교체·화면 합성·AI 이미지 생성·이미지 파일의 자르기·크기 변경은 없습니다. 모바일 마감의 기존 개선 전후 캡처는 기본 노출로 바꾸었으며 자산 내용은 그대로입니다.

실제 브라우저 2560×1440·390×844·360×800에서 표시·전환을 확인했습니다. 390px의 비교 영역은 335×293.125 CSS px이며 전체→기타 전환 전후 top459.765625·scroll2805가 같았습니다. 360px에서는 305×266.875 CSS px, Enter 전환과 원본 링크의 실제 2560×1440 로딩을 확인했습니다. 이는 해당 검사 위치에서의 배치 확인이며 전체 CLS·사용성 성과 수치가 아닙니다.

아래는 이전 제작·검증 이력입니다.

## 이전 이력: 2026-10-16 갈피록의 현재 필터 두 상태 캡처와 소개 표시 크기

수정한 갈피록의 로컬 실제 UI에서 준비 체크의 전체 분류와 기타 분류를 차례로 선택하고, 브라우저가 반환한 PNG 원본 두 개를 새 경로에 저장했습니다. 기존 자산은 덮어쓰지 않았습니다. 두 화면 모두 CSS viewport 2560×1440·스크롤 0이며 실제 저장 픽셀도 2560×1440입니다.

| 파일 (`public/detail/current/`) | 실제 캡처 상태 | 저장 픽셀 |
| --- | --- | --- |
| `galpirok-checklist-filter-all-v2.png` | 현재 버전 · 전체 회사·공통 준비, 진행 중, 전체 분류 | 2560×1440 |
| `galpirok-checklist-filter-empty-v2.png` | 현재 버전 · 전체 회사·공통 준비, 진행 중, 기타 분류의 빈 결과 | 2560×1440 |

두 상태에서 작업 영역 시작 y237·상태 탭 y391이 같음을 브라우저에서 확인했습니다. 소개의 제목·캡션은 현재의 두 필터 상태임을 명시합니다. 과거 초기 화면과 비교해 필터 이동이 해결됐다는 증거로 사용하지 않으며, 사용자 만족도·작업 속도·채용 성과의 측정으로 설명하지 않습니다. 비교를 펼치면 두 원본 비율 전체와 원본 링크를 제공합니다.

갈피록 상세의 홈 이미지는 기존 `galpirok-welcome.jpg`와 모바일 대응 원본을 재사용하며 표시 최대 폭만 PC 1000px·모바일 280px로 정리했습니다. 사용 흐름의 세로형 회사 상세는 PC 표시 최대 폭 390px입니다. 기존 CSS 부분 보기 좌표와 원본 링크는 유지하며 원본 이미지 파일의 크기·비율·내용은 변경하지 않았습니다. 다른 작품의 자산은 수정하지 않았습니다.

김도한의 실제 기여 요약을 소개 첫 화면으로 옮겼습니다. 서비스 목적·우선순위, 문제 제기·수정 요청, 갈피·그라데이션 방향 선택·공개 판단과 AI의 화면·코드 구현, 검사·조작·캡처를 구분합니다. 캡처는 2026.09.27 기준 가상 샘플이며 실제 이용자 기록이 아닙니다. 새 AI 비트맵 그림 생성, 합성, 글자 교체나 캡처 파일 자체의 자르기·크기 변경은 하지 않았습니다. 기존 폰트·아이콘의 권리와 고지는 갈피록의 자산 고지를 따릅니다.

로컬 실제 브라우저의 2560×1440·390×844에서 소개 배치와 이미지 로딩을 확인했고, 포트폴리오 lint 오류 0개와 production build 성공을 확인했습니다. 실제 계정 인증·DB 저장 유지, 모바일 실기기, 전체 사이트 CLS, 사용자 조사·채용 효과를 검증한 기록은 아닙니다.

아래는 이전 제작·검증 이력입니다. 현재 필터 비교 자산과 표시 폭은 이 최신 기록을 우선합니다.

## 이전 이력: 2026-10-16 갈피록의 고정 작업 위치·그라데이션·같은 회사 흐름 캡처

수정한 갈피록의 로컬 실제 UI를 브라우저에서 캡처하고, 반환된 PNG를 Pillow의 JPEG 품질 91로 변환했습니다. 기존 현재 화면 9개를 갱신하고 같은 모션브릿지 기록의 사용 흐름 8개를 추가해 총 17개 파일을 저장했습니다. 아래 CSS viewport는 브라우저 표시 영역이며 저장 픽셀과 구분합니다. 캡처 도구가 더 작은 픽셀 치수를 반환한 경우에도 원본 크기를 바꾸지 않았습니다.

| 파일 (`public/detail/current/`) | 변경·실제 범위 | CSS viewport | 저장 픽셀 |
| --- | --- | --- | --- |
| `galpirok-welcome.jpg` | 교체 · 그라데이션 배경의 PC 홈 | 1440×900 | 1440×900 |
| `galpirok-welcome-mobile.jpg` | 교체 · 모바일 홈 첫 화면 | 390×844 | 375×812 |
| `galpirok-overview.jpg` | 교체 · 오늘의 지원 | 2560×1440 | 2560×1440 |
| `galpirok-board.jpg` | 교체 · 단계별 회사 기록 | 2560×1440 | 2560×1440 |
| `galpirok-calendar.jpg` | 교체 · 달력과 다가오는 마감 | 2560×1440 | 2560×1440 |
| `galpirok-checklist-wide.jpg` | 교체 · 일정한 시작 위치의 큰 화면 준비 체크 | 2560×1440 | 2560×1440 |
| `galpirok-calendar-mobile.jpg` | 교체 · 날짜 탐색을 접은 다가오는 마감 목록 | 390×844 | 390×844 |
| `galpirok-register.jpg` | 교체 · PC 회사 등록 입력 창 | 1440×900 | 1440×900 |
| `galpirok-register-mobile.jpg` | 교체 · 모바일 회사 등록 입력 창 | 390×844 | 390×844 |
| `galpirok-flow-record.jpg` | 추가 · 모션브릿지의 지원 예정 상세 | 1440×900 | 1440×900 |
| `galpirok-flow-record-mobile.jpg` | 추가 · 같은 지원 예정 기록의 모바일 상세 | 390×844 | 390×844 |
| `galpirok-flow-deadline.jpg` | 추가 · 모션브릿지의 9월 29일 마감 확인 | 1440×1000 | 1425×990 |
| `galpirok-flow-deadline-mobile.jpg` | 추가 · 같은 마감의 모바일 목록 | 390×844 | 390×844 |
| `galpirok-flow-ready.jpg` | 추가 · 모션브릿지에 연결된 준비 항목 완료 | 1440×900 | 1440×900 |
| `galpirok-flow-ready-mobile.jpg` | 추가 · 같은 준비 완료의 모바일 화면 | 390×844 | 390×844 |
| `galpirok-flow-applied.jpg` | 추가 · 모션브릿지를 지원 완료로 저장한 상세 | 1440×900 | 1440×900 |
| `galpirok-flow-applied-mobile.jpg` | 추가 · 같은 지원 완료의 모바일 상세 | 390×844 | 390×844 |

사용 흐름은 같은 가상 회사의 기록 → 마감 확인 → 준비 완료 → 지원 완료 순서로 실제 UI를 조작한 결과입니다. 준비 체크 완료는 지원 상태를 자동 변경하지 않으며, 지원 완료로 변경한 회사는 관심·지원 예정 상태만 표시하는 마감 목록에서 제외됩니다. 소개에서는 실제 캡처를 먼저 보여주고 행동·상태 규칙을 뒤에 설명합니다. 단계 선택은 캡처를 바꾸는 기능이며 서비스 데이터 편집이 아닙니다.

PC 부분 보기 좌표는 원본 픽셀 기준 회사 기록·지원 완료 x885/y0/540×900, 준비 완료 x32/y169/1361×650, 마감 확인 x32/y167/1347×772입니다. 원본 JPEG는 전체 viewport를 보존하고 CSS에서 표시 영역만 지정했습니다. 회사 상세의 표시 폭은 540px이며 모바일 비교 캡처는 기존 390px를 유지합니다. 부분 보기 캡션과 전체 원본 링크를 제공하고, 760px 이하에서는 대응 모바일 원본·캡션·링크로 전환합니다. 모바일 홈은 저장 비율 375×812의 첫 화면 전체를 표시하며 기존 상하 부분 보기 규칙을 해제했습니다.

메인 히어로와 작업 목록의 표지에는 최신 보드·오늘의 지원 원본을 사용합니다. 현재 작업 영역 시작 y237에 맞춰 두 표지의 CSS 세로 위치를 `-15.192%`(237/1560)로 갱신했습니다. 이 위치 조정은 원본 파일 자체를 자르는 작업이 아닙니다. 갈피록 표지 외에 다른 작품의 자산을 갱신하지 않았습니다.

`galpirok-checklist.jpg`(1425×891), `galpirok-checklist-mobile.jpg`(375×812), `galpirok-board-mobile.jpg`(390×844)는 이번에 다시 촬영하지 않았습니다. 비교용 `public/detail/galpirok-checklist-before-wide.jpg`(2560×1440)와 `galpirok-calendar-before-mobile.jpg`(390×844)도 이전 원본 그대로 유지합니다. 사용 흐름은 새 `galpirok-flow-*` 파일을 참조하며, 같은 경로의 과거 치수와 제작 이력은 아래의 이전 기록으로 보존합니다.

김도한은 서비스 목적·우선순위 설정, 큰 화면 배치·문서 같은 인상·배경 그림에 대한 문제 제기, 갈피 정체성과 은은한 그라데이션 방향 선택, 수정 요구·공개 판단을 맡았습니다. AI는 구체적인 디자인·코드 구현과 검사·캡처를 수행했습니다. 필터 변경 시 약 87px 이동한 현상과 모바일 마감 문제를 AI가 검토에서 확인한 것으로 구분하며, 김도한의 독립 구현·사용자 조사·채용 성과로 설명하지 않습니다.

최종 이미지를 포함한 포트폴리오 빌드가 성공했습니다. 실제 브라우저에서 2560×1440 홈 표지·대표작·기여 설명·PC 비교, 1440×1000 사용 흐름 4단계, 390×844·360×800 단계 선택·이미지 전환·모바일 비교를 확인했습니다. 확인한 화면의 이미지 로딩 실패·가로 넘침·브라우저 오류 로그는 없었습니다. 이 기록은 해당 브라우저 화면과 조작의 확인 범위이며 전체 사이트의 CLS 측정이나 실제 모바일 기기 검증을 뜻하지 않습니다.

화면은 2026.09.27 기준 가상 샘플이며 실제 이용자 기록이 아닙니다. 새 AI 비트맵 그림 생성, 화면 합성, 글자 교체, 캡처 파일 자체의 자르기·크기 변경은 하지 않았습니다. 큰 폴더 배경은 코드 기반의 은은한 CSS 그라데이션으로 바꿨고 갈피 정체성은 로고·단계 탭·선택 상태에 남겼습니다. 기존 폰트·아이콘의 권리와 고지는 갈피록의 자산 고지를 따릅니다. 실제 계정의 인증·DB 저장 유지, 모바일 실기기, 사용자 조사·채용 효과는 이 캡처의 검증 범위가 아닙니다.

## 이전 이력: 2026-10-16 갈피록 서비스 흐름·화면 밀도 개선의 캡처

수정한 갈피록의 로컬 개발 서버를 실제 브라우저에서 실행하고 도구가 반환한 JPEG 원본을 저장했습니다. 기존 현재 화면 8개를 교체하고 회사 등록 PC·모바일과 지원 현황 모바일 3개를 추가했습니다. 아래 표의 픽셀 치수는 실제 파일에서 읽은 값이며 CSS viewport와 구분합니다.

| 파일 (`public/detail/current/`) | 변경·실제 범위 | CSS viewport | 저장 픽셀 |
| --- | --- | --- | --- |
| `galpirok-welcome.jpg` | 교체 · 홈의 목적·시작 행동·샘플 회사 기록 | 1440×900 | 1440×900 |
| `galpirok-overview.jpg` | 교체 · 오늘의 지원 전체 화면 | 2560×1440 | 2560×1440 |
| `galpirok-board.jpg` | 교체 · 단계별 회사 기록 전체 화면 | 2560×1440 | 2560×1440 |
| `galpirok-calendar.jpg` | 교체 · 달력과 다가오는 마감 전체 화면 | 2560×1440 | 2560×1440 |
| `galpirok-checklist.jpg` | 교체 · 기본 PC 준비 체크 | 1440×900 | 1425×891 |
| `galpirok-checklist-wide.jpg` | 교체 · 내용 높이에 맞춘 큰 화면 준비 체크 | 2560×1440 | 2560×1440 |
| `galpirok-checklist-mobile.jpg` | 교체 · 모바일 회사 선택·상태·준비 항목 | 390×844 | 375×812 |
| `galpirok-calendar-mobile.jpg` | 교체 · 모바일 기본 마감 목록 | 390×844 | 375×812 |
| `galpirok-register.jpg` | 추가 · 회사 등록 입력 창 | 1440×900 | 1440×900 |
| `galpirok-register-mobile.jpg` | 추가 · 모바일 회사 등록 입력 창 | 390×844 | 390×844 |
| `galpirok-board-mobile.jpg` | 추가 · 모바일 전형 단계 선택과 회사 기록 | 390×844 | 390×844 |

`galpirok-welcome-mobile.jpg`(375×1029)는 이전 모바일 홈 전체 페이지 캡처를 유지합니다. 이번에 다시 촬영했다고 표시하지 않습니다. 비교용 `public/detail/galpirok-checklist-before-wide.jpg`(2560×1440)와 `galpirok-calendar-before-mobile.jpg`(390×844)도 기존 원본을 그대로 유지합니다. 같은 파일 경로의 과거 촬영 치수는 아래 이력에 보존하고 현재 파일 치수는 이 절을 우선합니다.

상세의 사용 흐름은 회사 등록 → 상태 변경 → 마감 확인 → 준비 완료를 선택하면 실제 캡처가 바뀌는 구조입니다. 단계별 회사·준비 항목은 샘플 예시이며, 포트폴리오에서 서비스 데이터를 편집하는 기능이 아닙니다. 짧은 제목·행동 다음에 실제 화면을 먼저 표시하고 구성 이유는 화면 아래에 둡니다. 준비 체크·모바일 마감의 전후 비교는 기본적으로 접혀 있고 펼치면 원본 비율로 표시합니다.

PC 보드·달력은 원본 전체를 저장한 상태에서 CSS 부분 보기로 읽는 크기를 확보합니다. 보드의 원본 좌표는 x492·y330·너비1560·높이905, 달력은 x492·y276·너비1560·높이1012입니다. 캡션에 ‘실제 작업 영역 부분 보기’를 표시하며 ‘전체 화면 보기’ 링크는 편집하지 않은 2560×1440 원본으로 연결됩니다. 760px 이하에서는 PC 부분 보기를 해제하고 대응 모바일 원본과 원본 링크를 사용합니다. 모바일 홈은 기존 CSS 부분 보기(375:530·세로 위치 75%)와 전체 원본 링크를 유지합니다.

원본 이미지·모바일 `<source>`에 실제 치수를 지정하고 PC 부분 보기의 컨테이너에는 별도 비율을 지정해 로딩 전에 공간을 예약합니다. 이는 표시 구현이며 별도의 전체 CLS 성능 측정이나 사용자 성과를 뜻하지 않습니다. 모바일 마감 비교의 공통 조건은 브라우저 표시 영역 390×844이며 이전·현재 파일의 저장 픽셀이 같다는 뜻은 아닙니다.

메인 히어로와 작업 목록의 갈피록 표지는 같은 보드·오늘의 지원 2560×1440 원본을 CSS 부분 보기로 표시합니다. 갈피록 `record` 분기에 작업 영역을 담는 표시 창을 두고 원본의 위치·너비를 조정하며, 다른 프로젝트 표지에는 이 규칙을 적용하지 않습니다. 추가 합성 이미지나 별도 비트맵 편집본은 만들지 않았습니다.

김도한의 역할은 서비스 목적·우선순위 설정, 상단 쏠림·문서 같은 인상에 대한 피드백, 갈피·폴더 방향 선택, 개선 요구·공개 판단입니다. AI는 구체적인 화면·코드 기반 그래픽 제안, 코드 작성·수정, 샘플·코드 검사와 캡처를 수행했습니다. 이를 독립 구현·사용자 조사·채용 성과로 소개하지 않습니다. 화면은 2026.09.27 기준 가상 샘플이며 실제 이용자 기록이 아닙니다.

새 AI 비트맵 그림 생성, 화면 합성, 글자 교체, 캡처 파일 자체의 자르기·크기 변경은 하지 않았습니다. 서비스의 갈피·폴더 배경은 AI 협업으로 작성한 SVG·CSS이며, 기존 폰트·아이콘의 권리와 고지는 갈피록의 자산 고지를 따릅니다. 현재 파일의 출처·치수와 표현 범위는 위 기록을 따르며, 아래 절은 당시 제작·검증 이력입니다.

## 이전 이력: 2026-10-16 갈피록 큰 화면 작업 공간·월 경계 마감 개선과 비교 증거

수정한 갈피록을 로컬 개발 서버에서 실행하고 브라우저 도구가 반환한 실제 JPEG 원본 9개를 저장했습니다. 기존 8개 현재 화면 경로를 갱신하고 큰 화면 준비 체크 1개를 추가했습니다. PC 기본 CSS viewport는 1440×900, 비교용 큰 화면은 2560×1440, 모바일은 390×844입니다. 모바일 홈만 전체 페이지 캡처이며 나머지는 해당 viewport 캡처입니다. 실제 JPEG 저장 치수는 아래와 같이 파일에서 직접 읽어 확인했습니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 저장 픽셀 |
| --- | --- | --- |
| `galpirok-welcome.jpg` | 홈 · 시작 행동·지원 단계별 샘플 회사 기록과 갈피 배경 | 1440×900 |
| `galpirok-welcome-mobile.jpg` | 모바일 홈 전체 페이지 · 목적·시작 행동·회사 기록 | 375×1029 |
| `galpirok-overview.jpg` | 오늘의 지원 · 가까운 마감과 준비 기록 | 1425×891 |
| `galpirok-board.jpg` | 지원 현황 · 단계별 회사 기록 | 1425×891 |
| `galpirok-calendar.jpg` | PC 마감 일정 · 월별 달력과 가까운 마감 | 1425×891 |
| `galpirok-checklist.jpg` | PC 준비 체크 · 상태·분류와 기록행 | 1425×891 |
| `galpirok-checklist-wide.jpg` | 2560×1440 준비 체크 · 작업 영역과 갈피·폴더 배경 | 2560×1440 |
| `galpirok-checklist-mobile.jpg` | 모바일 준비 체크 · 상태·분류와 기록행 | 390×844 |
| `galpirok-calendar-mobile.jpg` | 모바일 기본 마감 목록 · 다음 달의 가까운 마감 포함 | 390×844 |

비교용으로 이전 실제 화면 2개를 원본 그대로 복사했습니다. 캡처를 합성하거나 그림으로 재현한 비교가 아닙니다.

| 파일 (`public/detail/`) | 출처·상태 | 저장 픽셀 |
| --- | --- | --- |
| `galpirok-checklist-before-wide.jpg` | 2026-10-16 개선 전 공개본 검토의 `checklist-2560.jpg`. 전체 회사·공통 준비, 전체 분류, 진행 중 5개, 완료 4/전체 9개 | 2560×1440 |
| `galpirok-calendar-before-mobile.jpg` | 이번 개선 전 `current/galpirok-calendar-mobile.jpg`의 복사. 2026.09.27 기준 9월의 기본 마감 목록 | 390×844 |

준비 체크는 같은 크기·같은 샘플 상태, 마감은 같은 390×844 기본 화면의 월 경계 차이를 비교합니다. 화면 비교는 가상 데이터의 배치·동작 차이에 대한 증거이며 실제 사용자 연구·작업 속도·채용 효과의 측정이 아닙니다. 모든 원본 링크를 제공하고 두 비교는 원본 비율 전체를 표시합니다. 모바일 홈만 CSS 비율 375:530·세로 위치 75%로 기록 영역을 부분 보기로 표시하며 대체 텍스트·캡션에 범위를 밝히고 전체 원본으로 연결합니다.

김도한의 서비스 목적·우선순위 설정, 큰 화면 상단 쏠림과 문서 같은 인상의 직접 지적, AI 그림 없이 갈피·폴더를 살리는 방향 선택과 공개 판단을 AI의 구체적 디자인 제안·코드 작성·검사·캡처와 구분합니다. 서비스 배경은 코드로 작성한 SVG·CSS이며 이번 자산 제작에 AI 그림 생성 도구는 사용하지 않았습니다. 화면 합성·문자 교체·캡처 후 크기 변경도 하지 않았습니다. 기존 폰트·아이콘의 권리는 서비스의 자산 고지를 따릅니다.

아래는 같은 경로를 이전에 촬영했던 이력입니다. 현재 파일 치수·참조는 이 절의 9개 현재 화면과 2개 이전 비교 원본을 기준으로 합니다.

## 이전 이력: 2026-10-16 갈피록 홈 구성·준비 체크 추가 개선 화면

홈 구성과 준비 체크를 추가 개선한 갈피록의 로컬 소스를 개발 서버에서 실행해 실제 UI 6개를 브라우저 도구로 캡처했습니다. 아래 파일은 모두 도구가 반환한 JPEG 원본입니다. CSS viewport는 PC 1440×900·모바일 390×844이며, 모바일 홈만 전체 페이지 캡처입니다. JPEG 파일에서 직접 읽은 실제 저장 픽셀은 아래와 같습니다. 캡처 후 합성·재생성·글자 교체·확대 편집은 하지 않았습니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 저장 픽셀 |
| --- | --- | --- |
| `galpirok-welcome.jpg` | PC 소개 홈 · 목적·시작 행동과 단계별 샘플 회사 기록 | 1440×900 |
| `galpirok-welcome-mobile.jpg` | 모바일 홈 전체 페이지 · 목적·시작 행동과 회사 기록 | 375×1029 |
| `galpirok-checklist.jpg` | PC 준비 체크 · 상태 탭·필터와 기록행 | 1440×900 |
| `galpirok-calendar.jpg` | PC 마감 일정 · 달력과 회사별 마감 목록 | 1425×891 |
| `galpirok-checklist-mobile.jpg` | 모바일 준비 체크 · 상태 탭·필터와 기록행 | 390×844 |
| `galpirok-calendar-mobile.jpg` | 모바일 마감 일정 · 접힌 달력과 회사별 마감 목록 | 390×844 |

`galpirok-welcome-mobile.jpg`는 이번에 추가했고 나머지 5개는 같은 경로의 현재 화면을 갱신했습니다. 이전 캡처인 `galpirok-overview.jpg`(PC 오늘의 지원, 1363×936)와 `galpirok-board.jpg`(PC 지원 현황, 1348×926)는 유지했으며 이번에 다시 촬영한 파일로 표시하지 않습니다. 두 파일의 당시 CSS viewport는 1363×936입니다.

서비스의 가상 샘플은 2026년 9월 27일 기준이며 실제 이용자 기록이 아닙니다. 김도한은 목적·개선 방향·우선순위·검증 범위·공개를 결정했고, AI는 디자인 제안·코드 작성과 검사·캡처를 맡았습니다. 이번 소개 자산을 별도 AI 그림이나 독립 디자인·직접 코딩·사용자 조사 성과로 설명하지 않습니다. 기존 폰트·아이콘 등 서비스 자산의 제작·권리 범위는 해당 프로젝트 고지를 따릅니다.

메인·작업 목록·갈피록 상세는 현재 화면과 유지한 캡처를 참조합니다. 상세 첫 화면은 모바일에서 실제 모바일 홈의 지원 기록 영역을 CSS 비율 375:530·세로 위치 75%로 보여줍니다. 마감 사례는 PC에서도 모바일 캡처의 상단을 CSS 비율 390:620으로 보여주고 PC 원본을 별도 링크로 제공합니다. 두 경우 모두 캡션·대체 텍스트에 부분 보기임을 표시하고 전체 모바일 원본으로 연결합니다. 원본 파일 치수와 내용은 표와 같으며 파일 자체를 자르거나 합성하지 않았습니다.

이전 `public/detail/galpirok-*-pc.jpg` 4개와 `jobflow-kanban-1440.png`는 보존하되 갈피록의 현행 결과 화면으로 사용하지 않습니다. AI 그림 생성 도구를 사용하지 않았으며 기존 화면을 꾸며내지 않았습니다.

## 2026-10-15 잔상관 v34 현재 보관함과 바통 구도

수정 서비스에서 Chromium, deviceScaleFactor 1, 움직임 축소, JPEG 품질 92로 실제 화면 13개를 캡처했습니다. 12개는 변경된 보관함·메모 및 `relay` 구도가 포함되는 화면의 갱신이고, 1개는 PC 메모 읽기 목록의 전체 원본 링크입니다. 이미지 생성·편집·권리 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다. 소개의 실제 사용자 역할과 AI 협업 범위는 그대로 유지합니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v34-home.jpg` | PC 홈 가로 목록의 실제 6–9/12 위치 | 1440×960 |
| `jansang-v34-browse-mobile-full.jpg` | 모바일 영화 찾기 전체 페이지 · 원본 링크 | 390×2817 |
| `jansang-v34-saved.jpg` | PC 훑기 검색·정렬·보기 선택과 세 작품 | 1440×484 |
| `jansang-v34-saved-full.jpg` | 같은 훑기의 전체 PC 뷰포트 · 원본 링크 | 1440×960 |
| `jansang-v34-saved-mobile.jpg` | 모바일 보기 선택과 완전한 세 작품 행 | 390×631 |
| `jansang-v34-saved-mobile-full.jpg` | 같은 훑기의 모바일 전체 페이지 · 원본 링크 | 390×1234 |
| `jansang-v34-reading-full.jpg` | 같은 세 작품을 한 작품씩 읽는 PC 메모 읽기 전체 페이지 · 별도 원본 링크 | 1440×1536 |
| `jansang-v34-note.jpg` | `forest` 메모 읽기 팝업과 좌우 배경 | 1440×598 |
| `jansang-v34-note-full.jpg` | 같은 팝업의 전체 PC 뷰포트 · 원본 링크 | 1440×960 |
| `jansang-v34-note-mobile.jpg` | 같은 메모의 모바일 읽기 화면 · 수정은 별도 진입 | 390×844 |
| `jansang-v34-curation.jpg` | ‘다정한 반전’의 네 작품과 선정 이유 | 1440×570 |
| `jansang-v34-curation-full.jpg` | 같은 큐레이션 PC 전체 페이지 · 원본 링크 | 1440×1320 |
| `jansang-v34-curation-mobile-full.jpg` | 같은 큐레이션 모바일 전체 페이지 · 원본 링크 | 390×1540 |

PC 홈·보관함·메모는 1440×960, 큐레이션은 1440×1080 viewport에서 촬영했습니다. 모바일 전체 페이지·메모는 390×844, 작품 훑기 영역은 완전한 세 행을 담는 390×1100 viewport입니다. 캡처 후 사진·화면 합성, 글자 교체, 크기 변경을 하지 않았습니다.

바뀌지 않은 범위의 `jansang-v33-home-mobile.jpg`, `jansang-v33-browse.jpg`, `jansang-v33-browse-mobile.jpg`, `jansang-v33-curation-mobile.jpg`는 이전 캡처로 재사용합니다. 새로 촬영한 파일이라고 표기하지 않으며 이전 자산과 생성 이력도 보존합니다.

보관함은 새 검사 브라우저에서 실제 입력·저장·찜 조작으로 만든 시연입니다. `forest`에는 짧은 메모와 찜, `relay`에는 긴 메모만, `bluehour`에는 찜만 저장했습니다. 읽기 목록은 같은 데이터를 보여주고, 읽기 팝업은 `forest` 메모를 열어 입력창이 숨겨지고 ‘메모 수정’ 진입이 보이는 상태입니다. 실제 이용자 기록·사용자 조사 자료가 아닙니다.

13개 이미지의 실제 치수와 원본/빌드 제공 파일 해시를 확인했습니다. 390·1100·1101·1440px에서 표시 이미지의 원본 비율, 두 화면 선택, 캡션·원본 링크와 추가 PC 링크의 표시 경계를 확인했습니다. 메모 원본은 390·1440px, PC 읽기 목록 원본은 1440px에서 실제 새 탭으로 열었습니다. 실제 이미지와 소개 PNG의 배치도 별도로 검토했습니다.

## 이전 이력: 2026-10-15 잔상관 v33 현재 탐색·보관함·큐레이션 화면

수정 서비스의 실제 화면을 Chromium, deviceScaleFactor 1, 움직임 축소, JPEG 품질 92로 캡처했습니다. 새 영화 이미지의 생성·편집·권리 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다. 소개에서는 AI 이미지·디자인·코드 협업 범위를 유지하며, 이 캡처를 별도의 독립 제작이나 사용자 조사 결과로 설명하지 않습니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v33-home.jpg` | PC 홈 가로 목록의 실제 6–9/12 위치 | 1440×960 |
| `jansang-v33-home-mobile.jpg` | 모바일 홈 첫 뷰포트 · 스크롤 없음 | 390×844 |
| `jansang-v33-browse.jpg` | PC 영화 찾기의 조건과 작품 격자 | 1440×1080 |
| `jansang-v33-browse-mobile.jpg` | 모바일 조건과 완전한 첫 작품 행 | 390×587 |
| `jansang-v33-browse-mobile-full.jpg` | 같은 영화 찾기 전체 페이지 · 원본 링크 | 390×2817 |
| `jansang-v33-saved.jpg` | PC 훑기 검색·정렬·보기 선택과 세 작품 | 1440×484 |
| `jansang-v33-saved-full.jpg` | 같은 훑기의 전체 PC 뷰포트 · 원본 링크 | 1440×960 |
| `jansang-v33-saved-mobile.jpg` | 모바일 보기 선택과 완전한 세 작품 행 | 390×631 |
| `jansang-v33-saved-mobile-full.jpg` | 같은 훑기의 모바일 전체 페이지 · 원본 링크 | 390×1234 |
| `jansang-v33-note.jpg` | `forest` 메모 읽기 팝업과 좌우 배경 | 1440×598 |
| `jansang-v33-note-full.jpg` | 같은 팝업의 전체 PC 뷰포트 · 원본 링크 | 1440×960 |
| `jansang-v33-note-mobile.jpg` | 같은 메모의 모바일 읽기 화면 · 수정은 별도 진입 | 390×844 |
| `jansang-v33-curation.jpg` | ‘다정한 반전’의 네 작품과 선정 이유 | 1440×570 |
| `jansang-v33-curation-full.jpg` | 같은 큐레이션 PC 전체 페이지 · 원본 링크 | 1440×1320 |
| `jansang-v33-curation-mobile.jpg` | 모바일 첫 두 작품과 선정 이유 | 390×424 |
| `jansang-v33-curation-mobile-full.jpg` | 같은 큐레이션 모바일 전체 페이지 · 원본 링크 | 390×1540 |

모바일 전체 페이지·홈·메모 읽기는 390×844, 모바일 영역 캡처는 카드 끝까지 담는 390×1100 viewport를 사용했습니다. PC 홈·보관함·메모 읽기는 1440×960, 영화 찾기·큐레이션은 1440×1080입니다. 원본 링크는 표에 적힌 전체 페이지 또는 전체 뷰포트를 가리킵니다. 사진·화면 합성, 글자 교체, 캡처 후 크기 변경은 하지 않았습니다.

보관함은 검사 브라우저에서 실제 입력·저장·찜 조작으로 만든 시연입니다. `forest`에는 짧은 메모와 찜, `relay`에는 긴 메모만, `bluehour`에는 찜만 저장했습니다. 읽기 팝업은 같은 `forest` 메모를 열었으며 입력창은 숨겨져 있고 ‘메모 수정’ 진입이 보이는 상태입니다. 실제 이용자 기록이 아닙니다. 이전 파일과 생성 이력은 보존합니다.

신규 16개 파일의 실제 치수와 원본/build 제공 파일 해시를 확인했습니다. 본문 캡처의 원본 비율, 모바일/PC의 캡션과 원본 링크, 두 시연 화면 선택을 검사했고 390·1440px에서 메모 원본을 새 탭으로 열었습니다. 실제 이미지와 소개 PNG에서 완전한 작품 행·선정 이유·읽기 원문과 버튼의 배치를 별도로 확인했습니다.

## 이전 이력: 2026-10-15 잔상관 v32 실제 모바일 홈과 보관함의 두 상태

수정한 잔상관을 Chromium, deviceScaleFactor 1, 움직임 축소, JPEG 품질 92로 직접 캡처했습니다. 홈 PC는 실제 가로 목록을 6–9/12 위치로 이동했고, 모바일은 스크롤하지 않은 첫 화면입니다. 여러 영화 이미지를 한 화면으로 합성하지 않았습니다. 영화 이미지는 기존 자산이며 생성·편집 이력은 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v32-home.jpg` | PC 홈 가로 목록의 새벽 식탁·편지·온실·느린 궤도 · 실제 6–9/12 위치 | 1440×960 |
| `jansang-v32-home-mobile.jpg` | 모바일 홈 첫 뷰포트 · 페이지/목록 스크롤 없음 | 390×844 |
| `jansang-v32-saved.jpg` | PC 작품 훑기의 검색·정렬·보기 선택과 세 카드 · 상단 중복 제목 생략 | 1440×484 |
| `jansang-v32-saved-full.jpg` | 같은 작품 훑기 상태의 PC 전체 뷰포트 · 원본 링크 | 1440×960 |
| `jansang-v32-saved-mobile.jpg` | 모바일 보기 선택과 완전한 세 작품 행 · 페이지 제목 생략 | 390×631 |
| `jansang-v32-saved-mobile-full.jpg` | 같은 상태의 모바일 전체 페이지 · 원본 링크 | 390×1234 |
| `jansang-v32-note.jpg` | 같은 `forest` 저장 메모의 PC 읽기 팝업 · 상하 빈 배경 생략 | 1440×598 |
| `jansang-v32-note-full.jpg` | 같은 읽기 팝업을 연 PC 전체 뷰포트 · 원본 링크 | 1440×960 |
| `jansang-v32-note-mobile.jpg` | 같은 저장 메모의 모바일 읽기 팝업 · 수정 진입이 보이는 상태 | 390×844 |

보관함은 별도 검사 브라우저에서 실제 입력·저장·찜 조작으로 `forest`의 짧은 메모와 찜, `relay`의 긴 메모만, `bluehour`의 찜만 있는 예시를 만들었습니다. 메모 팝업은 ‘메모 보기’로 진입한 읽기 상태이며 편집 입력창은 숨겨져 있습니다. 캡처마다 실제 viewport와 영역을 기록했고, 모바일 훑기 영역은 마지막 카드까지 담기 위해 390×1100 viewport에서 촬영했습니다. 모바일 홈·메모 보기·보관함 전체는 390×844, PC는 1440×960입니다. 캡처 후 이미지 합성·문자 교체·크기 변경은 하지 않았습니다. 실제 이용자 기록·사용자 조사·독립 구현 성과로 설명하지 않습니다.

기존 v31 영화 찾기 캡처 3개와 큐레이션 캡처 4개는 해당 근거로 재사용합니다. 새 캡처로 재표기하지 않으며 이전 자산·생성 이력을 보존합니다.

신규 9개 파일의 실제 치수·원본 비율과 원본/build 제공 파일 해시 일치를 확인했습니다. 실제 PNG에서 세 작품 행과 메모 읽기 팝업의 캡처 범위를 검토했고, 소개의 화면 선택·1100px 이미지 분기에서 캡션과 원본 링크가 같은 상태로 연결되는지 확인했습니다. 390·1440px에서 메모 원본 링크를 새 탭으로 열어 해당 화면을 확인했습니다.

## 이전 이력: 2026-10-15 잔상관 v31 큐레이션의 선정 이유와 현재 화면

수정한 잔상관을 Chromium의 deviceScaleFactor 1·움직임 축소 설정에서 JPEG 품질 92로 직접 캡처했습니다. 본문에는 명시한 실제 영역을 표시하고, 생략한 페이지의 전체 캡처를 링크합니다. 캡처 후 합성·문자 교체·크기 변경은 하지 않았습니다. 영화 이미지의 생성·편집 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다. `letters`의 최종 봉투 이미지 변경 후 영화 찾기·큐레이션 캡처를 새로 만들었습니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v31-home.jpg` | 홈 가로 목록 · 소개 첫 결과·메인·목록 표지 | 1440×960 |
| `jansang-v31-browse.jpg` | PC 영화 찾기의 조건·제목·작품 격자 | 1440×1080 |
| `jansang-v31-browse-mobile.jpg` | 모바일 조건과 완전한 첫 작품 행 · 페이지 헤더·제목 생략 | 390×587 |
| `jansang-v31-browse-mobile-full.jpg` | 같은 모바일 영화 찾기 전체 페이지 · 전체 화면 링크 | 390×2817 |
| `jansang-v31-saved.jpg` | PC 보관함 ‘메모 읽기’·정렬·작품 수·서로 다른 저장 상태 세 카드 | 1440×727 |
| `jansang-v31-saved-mobile.jpg` | 모바일 보관함의 `forest` 한 카드와 메모 원문 · 시연 화면 일부 | 390×381 |
| `jansang-v31-saved-mobile-full.jpg` | 같은 시연 데이터 세 작품의 모바일 전체 페이지 · 전체 화면 링크 | 390×1807 |
| `jansang-v31-curation.jpg` | ‘다정한 반전’의 선정작 네 편과 작품별 이유 | 1440×570 |
| `jansang-v31-curation-full.jpg` | 같은 큐레이션 전체 페이지 · 전체 화면 링크 | 1440×1320 |
| `jansang-v31-curation-mobile.jpg` | 같은 큐레이션의 첫 두 작품과 전체 선정 이유 · 부분 화면 | 390×424 |
| `jansang-v31-curation-mobile-full.jpg` | 같은 큐레이션의 모바일 전체 페이지 · 전체 화면 링크 | 390×1540 |

보관함은 새 검사 브라우저에서 작품 상세의 메모 입력·저장·찜을 직접 조작했습니다. `forest`는 찜과 짧은 메모, `relay`는 더 긴 메모만, `bluehour`는 찜만 있는 시연 데이터입니다. ‘메모 읽기’를 선택한 상태이며 실제 이용자 기록이 아닙니다. 모바일 캡처는 390×844, PC 홈은 1440×960, 나머지 PC 화면은 1440×1080 브라우저에서 생성했습니다. 본문에 표시하는 모바일 이미지의 원본 폭은 390px이고 확대하지 않습니다. 큐레이션의 작품별 이유는 가상 영화 줄거리에 기반한 AI의 편집 제안이며, 김도한의 독립 선정·사용자 조사로 설명하지 않습니다. 이전 자산과 생성 이력은 보존합니다.

신규 11개 파일의 실제 디코딩·치수·원본 비율과 원본/build 제공 파일 해시 일치를 확인했습니다. 보관함과 큐레이션의 원본 링크는 390·1440px에서 실제 새 탭으로 열어 해당 전체/영역 캡처와 일치함을 확인했습니다. 1100px 이하의 큐레이션은 첫 두 작품 캡처와 모바일 전체 원본을 함께 사용하며, 더 넓은 화면에서는 네 작품 캡처와 PC 전체 원본을 연결합니다.

## 이전 이력: 2026-10-15 잔상관 v30 증거 영역과 전체 화면

수정한 잔상관을 Chromium의 deviceScaleFactor 1·움직임 축소 설정에서 JPEG 품질 92로 직접 캡처했습니다. 모바일 본문은 실제 영역만 캡처하고 캡션에 생략 범위를 명시하며, 해당 화면의 전체 페이지 캡처도 링크합니다. 캡처 후 합성·문자 교체·크기 변경은 하지 않았습니다. 서비스가 사용한 영화 이미지와 기존 스틸 편집 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v30-home.jpg` | 현재 홈 가로 목록 · 소개 첫 결과·메인·목록 표지 | 1440×960 |
| `jansang-v30-browse.jpg` | PC 영화 찾기의 조건·제목·작품 격자 | 1440×1080 |
| `jansang-v30-browse-mobile.jpg` | 모바일 조건과 완전한 첫 작품 행 · 페이지 헤더·제목 생략 | 390×587 |
| `jansang-v30-browse-mobile-full.jpg` | 같은 모바일 영화 찾기 전체 페이지 · 전체 화면 링크 | 390×2817 |
| `jansang-v30-saved.jpg` | PC 보관함 정렬·작품 수·서로 다른 저장 상태 세 카드 | 1440×699 |
| `jansang-v30-saved-mobile.jpg` | 모바일 보관함의 `forest` 한 카드와 메모 원문 · 시연 화면 일부 | 390×381 |
| `jansang-v30-saved-mobile-full.jpg` | 같은 시연 데이터 세 작품의 모바일 전체 페이지 · 전체 화면 링크 | 390×1743 |
| `jansang-v30-curation.jpg` | 현재 파란 숨 고르기 상세 · 원본 링크 | 1440×1080 |

시연 데이터는 v29와 같은 내용으로 새 검사 브라우저의 작품 상세에서 직접 입력·저장했습니다. `forest`는 찜과 짧은 메모, `relay`는 더 긴 메모만, `bluehour`는 찜만 저장했습니다. 모바일 본문 한 카드가 보관함 전체나 수량 비교를 뜻하지 않으며, 실제 이용자 기록·사용자 조사 자료가 아닙니다. 모바일 캡처는 390×844 브라우저에서, PC 화면은 1440×960/1080 브라우저에서 생성했습니다. 본문과 전체 화면 링크의 범위, 원본과 build 제공 파일 8개의 해시를 확인했고 이전 자산은 보존합니다.

## 이전 이력: 2026-10-15 잔상관 v29 현재 화면의 역할과 저장 상태

수정한 잔상관을 Chromium의 deviceScaleFactor 1·움직임 축소 설정에서 JPEG 품질 92로 직접 캡처했습니다. 현재 서비스의 홈·영화 찾기·보관함 세 화면을 본문 증거로 연결하며, 영화 찾기와 보관함은 모바일/PC 대응 캡처 중 하나만 표시합니다. 화면 합성·글자 교체·이미지 확대·새 영화 이미지 생성은 하지 않았습니다. 영화 원본의 출처와 편집 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v29-home.jpg` | 홈 가로 목록 · 소개 첫 결과·메인·목록 표지 | 1440×960 |
| `jansang-v29-browse.jpg` | 영화 찾기의 조건·제목·작품 격자 | 1440×1080 |
| `jansang-v29-browse-mobile.jpg` | 같은 영화 찾기의 모바일 격자 | 390×1100 |
| `jansang-v29-saved.jpg` | 현재 보관함의 정렬·작품 수·서로 다른 저장 상태의 세 카드 | 1440×699 |
| `jansang-v29-saved-mobile.jpg` | 같은 세 작품과 메모 원문의 모바일 화면 | 390×1141 |
| `jansang-v29-curation.jpg` | 현재 파란 숨 고르기 상세 · 원본 링크 | 1440×1080 |

보관함 시연 데이터는 작품 상세에서 실제 입력·저장·찜 조작으로 만들었습니다. `forest`는 찜과 짧은 메모, `relay`는 더 긴 메모만, `bluehour`는 찜만 저장했습니다. 모바일/PC 캡처는 같은 세 작품·같은 메모의 현행 상태이며 전후 개선 비교나 실제 이용자 기록이 아닙니다. 보관함은 390×1800/1440×1800 브라우저에서 정렬 조작과 작품 수부터 세 번째 카드 하단까지의 영역을 원본 크기로 직접 캡처했습니다. 이전 1편/3편 비교와 과거 자산은 삭제·이동하지 않고 보존합니다.

## 이전 이력: 2026-10-15 잔상관 v28 실제 화면과 수량별 비교

수정한 잔상관을 Chromium의 deviceScaleFactor 1·움직임 축소 설정에서 직접 캡처했습니다. 화면 합성·글자 교체·새 영화 이미지 생성은 하지 않았습니다. 영화 원본과 파비콘의 편집 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md`에 기록합니다.

| 파일 (`public/detail/current/`) | 실제 캡처 범위 | 치수 |
| --- | --- | --- |
| `jansang-v28-home.jpg` | 홈 포스터 목록과 큐레이션 · 소개 첫 결과·메인·목록 표지 | 1440×960 |
| `jansang-v28-mobile.jpg` | 현재 모바일 홈 · 기존 v24 화면과 배치 비교 | 390×844 |
| `jansang-v28-curation.jpg` | 현재 파란 숨 고르기 상세 | 1440×1080 |
| `jansang-v28-saved-1.png` | 현재 1편 보관함의 작품 수와 첫 카드 영역 | 390×452 |
| `jansang-v28-saved-3.png` | 현재 3편 보관함의 작품 수와 같은 첫 카드 영역 | 390×452 |
| `jansang-v28-notes-desktop.jpg` | 현재 3편 보관함의 데스크톱 화면 | 1440×1080 |

보관함은 검사 브라우저에서 메모 입력·저장과 찜을 조작한 시연 데이터입니다. 1편과 3편 비교는 같은 작품 `forest`와 같은 예시 메모를 사용한 현재 상태이며 이전/현재 개선 비교가 아닙니다. PNG는 같은 브라우저 영역을 직접 캡처했고 원본 크기를 보존했습니다. 실제 이용자 기록·사용자 조사·채용 성과로 설명하지 않습니다. 이전 자산과 생성 이력은 보존합니다.

## 이전 이력: 2026-10-15 잔상관 v27 실제 화면 갱신

최종 로컬 잔상관 화면을 Chromium의 deviceScaleFactor 1·움직임 축소 설정에서 JPEG 품질 92로 직접 캡처했습니다. 화면 합성·재생성·글자 교체·새 영화 이미지 생성은 하지 않았습니다. 소개 구조와 원본 화면 비율은 유지했습니다.

| 파일 (`public/detail/current/`) | 실제 캡처·사용 위치 | 픽셀 크기 |
| --- | --- | --- |
| `jansang-v27-home.jpg` | 홈 분위기별 탐색 위치로 스크롤한 화면 · 소개 첫 결과와 표지 | 1440×960 |
| `jansang-v27-mobile.jpg` | 현재 모바일 홈 첫 화면 · v24 이전 화면과 비교 | 390×844 |
| `jansang-v27-curation.jpg` | 현재 파란 숨 고르기 상세 · 원본 링크 | 1440×1080 |
| `jansang-v27-notes.jpg` | 현재 모바일 보관함 · 예시 메모 3편 | 390×844 |
| `jansang-v27-notes-desktop.jpg` | 같은 예시 3편의 데스크톱 보관함 · 원본 링크 | 1440×1080 |

보관함은 별도 검사 브라우저에서 작품 상세의 메모 입력·저장으로 `forest`, `relay`, `bluehour` 세 편에 v26과 같은 예시를 남기고 `forest`를 찜한 결과입니다. 실제 이용자 기록·사용자 조사 자료가 아닙니다. 기존 v24·v25·v26 자산은 보존하며 아래 기록의 현재/사용 위치는 각 버전 당시의 이력입니다. 현행 결과는 위 v27 자산을 사용하고, 이전 비교는 기존 `jansang-v24-mobile-before.png`를 유지합니다. 영화 이미지와 폰트의 출처·권리 확인 범위는 `../../OTT Service/assets/ASSET_PROVENANCE.md` 및 기존 기록을 따릅니다.

신규 5장의 실제 디코딩·픽셀 크기·원본 비율을 확인했고, 원본과 production build에서 제공한 파일의 SHA-256이 일치합니다. 상세의 원본 링크 6개와 보관함 원본 새 탭 열기도 확인했습니다.

## 2026-10-15 잔상관 v26 보관함 캡처

수정한 잔상관 웹의 실제 보관함을 Chromium에서 캡처했습니다. 별도 검사 브라우저에서 작품 상세의 메모 입력·저장 버튼으로 `forest`, `relay`, `bluehour` 세 편에 예시 메모를 남기고, `forest`는 찜했습니다. 실제 이용자 기록·사용자 조사 자료가 아닙니다. 화면 내용 합성·재생성·글자 교체나 새로운 영화 이미지 생성은 하지 않았습니다.

| 파일 (`public/detail/current/`) | 캡처·사용 위치 | 픽셀 크기 |
| --- | --- | --- |
| `jansang-v26-notes.jpg` | 현재 모바일 보관함 · 같은 읽기 카드로 세 편을 저장한 상태 | 390×844 |
| `jansang-v26-notes-desktop.jpg` | 같은 예시 세 편의 데스크톱 보관함 · 원본 링크 | 1440×1080 |

두 파일은 원본과 production build 복사본의 해시가 일치합니다. 이전 v24·v25 보관함 캡처는 보존하며 현재 화면이나 서로 다른 수량의 전후 비교로 표시하지 않습니다. 기존 v25 홈·모바일 홈·큐레이션 캡처는 유지된 구성의 자료로 계속 사용합니다. 영화 이미지 생성 경로와 폰트 고지는 기존 기록 및 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다.

## 2026-10-15 잔상관 v25 결과와 변경 비교

아래 v25 JPEG 5장은 수정한 잔상관 웹을 Chromium에서 직접 캡처한 화면입니다. 화면 내용 합성·재생성, 글자 교체, 새로운 영화 이미지 생성은 하지 않았습니다. 가상 영화 이미지의 기존 생성 경로와 폰트 고지는 `../../OTT Service/assets/ASSET_PROVENANCE.md`를 따릅니다. 메모는 검사 브라우저에서 입력한 시연용 예시이며 실제 이용자 기록이나 사용자 조사 자료가 아닙니다.

| 파일 (`public/detail/current/`) | 실제 캡처 내용과 사용 위치 | 픽셀 크기 |
| --- | --- | --- |
| `jansang-v25-home.jpg` | 현재 홈 · 소개 첫 화면과 포트폴리오 표지 | 1440×960 |
| `jansang-v25-mobile.jpg` | 현재 모바일 홈 · 이전 화면과 비교 | 390×844 |
| `jansang-v25-notes.jpg` | 예시 메모 두 편의 현재 모바일 보관함 · 이전 화면과 비교 | 390×844 |
| `jansang-v25-notes-desktop.jpg` | 같은 예시 두 편의 데스크톱 보관함 · 원본 링크 | 1440×960 |
| `jansang-v25-curation.jpg` | 현재 파란 숨 고르기 상세 · 네 작품과 선정 이유 | 1440×1080 |
| `jansang-v24-mobile-before.png` | 이전 공개 v24 홈의 390×844 실제 검토 PNG를 내용·형식 변경 없이 복사 · 변경 비교 | 390×844 |

기존 `jansang-v24-notes.jpg`는 이전 모바일 보관함 비교에 계속 사용합니다. 다른 v24 캡처도 보존하지만 현재 결과로 표시하지 않습니다. v25 캡처 5장과 production build의 복사본은 파일 해시가 일치함을 확인했습니다. 이 기록은 제작·캡처 경로의 기록이며 독점성이나 법적 무위험을 보증하지 않습니다.

## 2026-10-15 잔상관 v24 화면

다음 3장은 잔상관의 실제 수정본을 Chromium의 deviceScaleFactor 1, 움직임 축소 설정에서 캡처한 JPEG(quality 92)입니다. 화면을 합성하거나 생성 도구로 재작성하지 않았습니다. 이미지 안의 가상 영화 장면은 AI 생성물이며 원본 출처·생성 프롬프트는 `../../OTT Service/assets/ASSET_PROVENANCE.md`에 있습니다. 기존 Pretendard OFL 고지와 자산 이력은 유지합니다.

| 파일 (`public/detail/current/`) | 실제 캡처 내용 | 픽셀 크기 |
| --- | --- | --- |
| `jansang-v24-home.jpg` | 홈 첫 화면, 새 대표 장면과 분위기 탐색 | 1440×960 |
| `jansang-v24-discovery.jpg` | 모바일 홈의 분위기·시간 선택과 연속 포스터 목록 | 390×844 |
| `jansang-v24-notes.jpg` | 별도 검사 브라우저에서 UI로 입력·저장한 예시 메모 2편의 보관함 | 390×844 |

메모에는 ‘예시 메모’라고 표시했으며 실제 사용자 데이터·사용자 조사 결과로 해석하지 않습니다. 이전 `jansang-home.jpg`는 이력으로 보존했고 v24 갱신 시 위 3장을 참조했습니다. 현재 사용 여부는 위 v25 기록을 따릅니다. 사용자 방향·피드백과 AI의 생성·구현 참여를 구분하며 저작권상 독점성이나 법적 무위험을 보증하지 않습니다.

2026-10-07 변경 비교 보완 당시에는 아래에 등록된 기존 `public/detail/jobflow-kanban-1440.png`와 `public/detail/seolbiit-desktop-management.png`를 각각 갈피록·설비결 상세의 이전 화면으로 다시 사용했다. 당시 현행 화면과 원본 비율을 유지해 비교하며 과거 서비스명과 기능 안내가 다름을 명시했다. 2026-10-16 갈피록은 현재 화면의 세 개선 사례로 교체했고 설비결 비교는 유지한다. 신규 외부 이미지·폰트·라이브러리는 추가하지 않았다.

이 문서는 `projects/my-portfolio`에서 쓰는 폰트/이미지/아이콘/영상/mockup/
template/외부 코드의 출처와 라이선스를 기록한다. 판단 기준은 이 문서의 아래
라이선스 원칙과 루트 `AGENTS.md`의 승인·보안 기준을 따른다.

- 화면에 쓰이는 모든 자산(외부 배포처에서 받은 것, 프로젝트 썸네일/
  스크린샷/favicon 포함)을 이 표에 기록한다. "본인 제작으로 보인다"는
  정황만으로 저작권 확인 대상에서 자동 제외하지 않는다.
- `상태`가 `[저작권 확인 필요]` 또는 `[제작자/권리 확인 필요]`인 항목은
  사용자 확인이나 원본 근거(예: 원본 디자인 파일, 실제 제작 과정 기록)로
  확정되기 전까지 실사용(공개 배포)에 대한 최종 승인 근거로 쓰지 않는다.
- 라이선스명을 확실히 확인하지 못했다면 추측해서 적지 않고 `미확인`으로
  둔다.

| 자산 | 유형 | 출처 | 제작자 | 라이선스 | 웹/포트폴리오 이용 | 수정 | 출처표시 | 확인일 | 상태 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Streaming UI Concept / `assets/fonts/PretendardVariable.woff2` v1.3.9 | 폰트(local WOFF2) | 공식 Pretendard 저장소 https://github.com/orioncactus/pretendard · 프로젝트 local file과 `assets/fonts/OFL.txt` | Kil Hyung-jin | SIL Open Font License 1.1 | 가능; Streaming UI runtime active | 가능(OFL 조건 준수) | 단순 웹 사용 시 필수 아님; 재배포 시 저작권 고지와 OFL 유지 | 2026-08-15 | `THIRD_PARTY_LICENSE_VERIFIED` — local WOFF2 v1.3.9 사용과 OFL 전문 보존을 확인했다. 외부 CDN을 요청하지 않는다. |
| Streaming UI Concept / `assets/posters/*.webp` 11개 | 절차형 WebP grouped asset | 저장소 선언: 2026-08-04 ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur · 파일별 dimensions·scene brief·seed·SHA-256은 `assets/ASSET_PROVENANCE.md`에 기록 | 독립 제작자 증명 없음; AI 보조 제작이라는 저장소 선언만 확인 | 별도 제3자 라이선스 확인 대상 없음; 독점성·법률상 무위험 미확인 | 현재 Streaming UI runtime active | 가능하나 완전한 generator source 없음 | 외부 출처표시 근거 없음 | 2026-08-15 | `USER_DECLARED_AI_ASSISTED` — 외부 입력 이미지·실제 인물·브랜드·영화·게임·캐릭터 참조가 없다는 저장소 선언과 현재 파일의 인물·영화 스틸·로고·워터마크 미발견을 구분해 기록한다. generator source·원본 prompt·manifest 위치는 확인 불가이며 정확한 재생성·독점성·법률상 무위험을 보증하지 않는다. |
| Streaming UI Concept / project SVG·favicon 8개 | SVG grouped asset | `assets/backdrops/*.svg`, `assets/posters/*.svg`, `assets/favicon.svg` · 파일별 dimensions·역할·SHA-256은 `assets/ASSET_PROVENANCE.md`에 기록 | 독립 제작자 증명 없음; 프로젝트 내부 작성이라는 저장소 선언만 확인 | 외부 라이선스 해당 없음이라는 저장소 선언; 독립 권리 확인은 제한됨 | 현재 Streaming UI runtime active | 가능 | 외부 출처표시 근거 없음 | 2026-08-15 | `REPOSITORY_DECLARATION_ONLY` — 현재 파일에서 simple geometry 사용, external `href`·embedded raster·logo·wordmark 발견 0. Git author를 creator proof로 사용하지 않았다. |
| Streaming UI Concept / `index.html` inline symbol icon 7종 | inline SVG icon grouped asset | `play`, `heart`, `star`, `info`, `close`, `arrow-left`, `external` symbol · `assets/ASSET_PROVENANCE.md` | 독립 제작자 증명 없음; 프로젝트 내부 작성이라는 저장소 선언만 확인 | 외부 라이선스 해당 없음이라는 저장소 선언; 독립 권리 확인은 제한됨 | 현재 Streaming UI runtime active | 가능 | 외부 출처표시 근거 없음 | 2026-08-15 | `REPOSITORY_DECLARATION_ONLY` — 현재 source에서 simple geometry와 내부 `<use>`만 사용하며 external SVG·icon library·logo·wordmark 발견 0. Git author를 creator proof로 사용하지 않았다. |
| IBM Plex Sans KR / IBM Plex Mono | 폰트 | fonts.googleapis.com (Google Fonts, `index.html` CDN `<link>`); 원본은 IBM Plex 공식 저장소 | IBM | SIL Open Font License 1.1 | 가능 | 가능(OFL 조건 준수) | 불필요(단순 웹 사용 시 제작자 표시를 강제하는 라이선스는 아님. 폰트 파일을 재배포할 경우 OFL 및 저작권 고지 유지 필요) | 2026-07-20 | 확인함 — 제작자 IBM, 공식 IBM Plex 저장소 기준 SIL Open Font License 1.1을 확인했다. 실제 프로젝트는 폰트 파일을 저장소에 포함하지 않고 Google Fonts CDN으로 로드한다. |
| `@mui/icons-material` (Material Icons) | 아이콘(코드 패키지) | npm 패키지, `node_modules/@mui/icons-material/package.json` | MUI(Material UI) | MIT | 가능 | 가능 | 불필요 | 2026-07-19 | 확인함 — `package.json`의 `"license": "MIT"` 필드와 패키지 내 `LICENSE` 파일 존재를 직접 확인했다. |
| Material Symbols Rounded | Figma 아이콘 | Google 공식 `material-design-icons` 저장소 · https://github.com/google/material-design-icons | Google | Apache License 2.0 | 가능 | 가능(크기·색상·Fill·표현 조정) | 필수 아님 | 2026-08-14 | 확인함 — 공식 저장소 LICENSE와 README를 확인했다. 울산 버스 Figma의 navigation·search·location·favorite·route·loading·error·close 등 아이콘에 사용한다. 코드에서 사용하는 `@mui/icons-material` 항목과는 별도 자산이다. |
| `public/favicon.svg` | 이미지(favicon) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/detail/jobflow-dashboard-1440.png` | browser screenshot | JobFlow production build `#/` · 게스트 sample read-only Dashboard · CSS viewport 1440×900 · actual PNG 1440×900 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; 화면의 MUI icon은 `@mui/icons-material` MIT, 글꼴은 OS system UI font stack | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — 외부 사진·타사 브랜드 UI 없음. true PNG signature·dimensions 확인함. |
| `public/detail/jobflow-dashboard-390.png` | browser screenshot | JobFlow production build `#/` · 게스트 sample read-only Dashboard · CSS viewport 390×844 · actual PNG 390×844 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; 화면의 MUI icon은 `@mui/icons-material` MIT, 글꼴은 OS system UI font stack | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — 외부 사진·타사 브랜드 UI 없음. true PNG signature·dimensions 확인함. |
| `public/detail/jobflow-kanban-1440.png` | browser screenshot | JobFlow production build `#/kanban` · 게스트 sample read-only 전형 보드 · CSS viewport 1440×900 · actual PNG 1440×900 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; 화면의 MUI icon은 `@mui/icons-material` MIT, 글꼴은 OS system UI font stack | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — 외부 사진·타사 브랜드 UI 없음. true PNG signature·dimensions 확인함. |
| `public/detail/jobflow-checklist-1440.png` | browser screenshot | JobFlow production build `#/checklist` · 게스트 sample read-only 체크리스트 · CSS viewport 1440×900 · actual PNG 1440×900 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; 화면의 MUI icon은 `@mui/icons-material` MIT, 글꼴은 OS system UI font stack | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — 외부 사진·타사 브랜드 UI 없음. true PNG signature·dimensions 확인함. |
| 울산광역시 BIS 정보 | 공공데이터 참조 | 공공데이터포털 https://www.data.go.kr/data/15052669/openapi.do · dataset ID `15052669`; 울산교통관리센터 노선검색 https://www.its.ulsan.kr/route/route.do 추가 검증 | 울산광역시 | 비용 무료 · 이용허락범위 제한 없음 | 가능(노선·정류장 구조 검증용 참고) | UX 흐름용 정적 예시로 구성 | 제공기관·dataset ID 기록 | 2026-08-14 | 확인함 — `ROUTEID`·`BRSSEQNO`·`STOPID`·`STOPNM` field를 확인하고, 울산교통관리센터 노선검색에서 방향·주요 정류장 순서를 추가 검증했다. 공식 자료 재확인일 2026-08-14, 작품의 runtime API 사용 없음. 도착 예정시간·남은 정류장 수·저상버스 상태는 정적 예시다. 비공식·비제휴 작품으로 울산광역시 공식 앱이나 제휴 프로젝트가 아니다. |
| `public/thumbnails/bus-arrival-ui-thumbnail.png` | Figma composite export | Figma `bzwp6FhsZaaenOA4ABIAFs` · `UlsanBus / Thumbnail Source` node `544:38` 직접 export · actual PNG 1000×563 · SHA-256 `0C1CCB6DCF6AA4E741745636FC7DA5B4EDD1070F8A4416C3F201EEF8F5EE46A8` · screen order `Slot_01__01_Home` → `Slot_02__03_Search_Results` → `Slot_03__06_Route_Detail` → `Slot_04__07_Favorites` · shell: screen 216×480, radius 16px, clip, inside stroke 1px `#E2E8F0`, shadow `#0F172A` 8%·y=2·blur=4 | 김도한 사용자 제작 UI composite | Material Symbols Rounded Apache License 2.0·Noto Sans KR SIL OFL 1.1은 각 독립 항목 참조; 외부 사진·지도 tile·공공기관 로고 없음 | 가능 | capture 교체 가능 | 불필요 | 2026-08-14 | 확인함 — true PNG signature·dimensions·현재 공식 source node와 승인 export hash를 확인했다. |
| `public/detail/bus-arrival-01-home.png` | Figma export | Figma `bzwp6FhsZaaenOA4ABIAFs` · READY `Home` node `59:100` 직접 export · actual PNG 360×800 · SHA-256 `607BB0C00826E7ED04D29D6777E26985DAB2A5EBE0CC0D04151FA82E3F75FE75` | 김도한 사용자 제작 UI capture | Material Symbols Rounded Apache License 2.0·Noto Sans KR SIL OFL 1.1은 각 독립 항목을 참조한다. 외부 사진·지도 tile·공공기관 로고는 없으며, 정류장·노선명은 공공 교통 데이터 참조다. | 가능 | capture 교체 가능 | 불필요 | 2026-08-04 | 확인함 — true PNG signature·dimensions·현재 Figma node hash 일치. |
| `public/detail/bus-arrival-02-search.png` | Figma export | Figma `bzwp6FhsZaaenOA4ABIAFs` · READY `03_Search_Results` node `59:146` 직접 export · actual PNG 360×800 · SHA-256 `99C3DD8FCF285A6B43E1555DB2E0B0D1FE2E47211B60399D37F281BA7D32C20D` | 김도한 사용자 제작 UI capture | Material Symbols Rounded Apache License 2.0·Noto Sans KR SIL OFL 1.1은 각 독립 항목 참조; 외부 사진·지도 tile·공공기관 로고 없음 | 가능 | capture 교체 가능 | 불필요 | 2026-08-14 | 확인함 — 현재 Search Results의 Clear action 표시 상태이며 true PNG signature·dimensions·현재 Figma node와 승인 export hash를 확인했다. |
| `public/detail/bus-arrival-03-station-detail.png` | Figma export | Figma `bzwp6FhsZaaenOA4ABIAFs` · READY `Station Detail` node `223:198` 직접 export · actual PNG 360×800 · SHA-256 `7489209DBFAD679078C27A40447B118B004DFF55FEDDC097BA95701195881AE6` | 김도한 사용자 제작 UI capture | Material Symbols Rounded Apache License 2.0·Noto Sans KR SIL OFL 1.1은 각 독립 항목을 참조한다. 외부 사진·지도 tile·공공기관 로고는 없으며, 정류장·노선명은 공공 교통 데이터 참조다. | 가능 | capture 교체 가능 | 불필요 | 2026-08-04 | 확인함 — true PNG signature·dimensions·현재 Figma node hash 일치. |
| `public/detail/bus-arrival-04-route-detail.png` | Figma export | Figma `bzwp6FhsZaaenOA4ABIAFs` · READY `Route Detail / 농소` node `59:208` 직접 export · actual PNG 360×800 · SHA-256 `CC1ABF7FFD29FE82AC2B1CCC218B6875F5630CDF3E022C87A54C6A2360FF9FDD` | 김도한 사용자 제작 UI capture | Material Symbols Rounded Apache License 2.0·Noto Sans KR SIL OFL 1.1은 각 독립 항목을 참조한다. 외부 사진·지도 tile·공공기관 로고는 없으며, 정류장·노선명은 공공 교통 데이터 참조다. | 가능 | capture 교체 가능 | 불필요 | 2026-08-04 | 확인함 — true PNG signature·dimensions·현재 Figma node hash 일치. |
| `public/detail/bus-arrival-05-states.png` | Figma composite export | Figma `bzwp6FhsZaaenOA4ABIAFs` · `UlsanBus / States Composite Source` node `544:39` 직접 export · actual PNG 1000×563 · SHA-256 `B2877CD649D3DBBA963CD0A87696D6747CB6CA68DC114A308F97989BB896FB7F` · screen order `Slot_01__02_Search_Recent_Empty` → `Slot_02__04_Search_No_Result` → `Slot_03__09_Loading` → `Slot_04__10_Error` · shell: screen 216×480, radius 16px, clip, inside stroke 1px `#E2E8F0`, shadow `#0F172A` 8%·y=2·blur=4 | 김도한 사용자 제작 UI composite | Material Symbols Rounded Apache License 2.0·Noto Sans KR SIL OFL 1.1은 각 독립 항목 참조; 외부 사진·지도 tile·공공기관 로고 없음 | 가능 | capture 교체 가능 | 불필요 | 2026-08-14 | 확인함 — true PNG signature·dimensions·현재 재현 가능한 공식 source node와 승인 export hash를 확인했다. 과거 composite의 정확한 조립 과정까지 복원한 것은 아니다. |
| `public/thumbnails/community-feedback-hub.svg` | 이미지(legacy thumbnail) | 저장소 내 기존 1200×800 SVG · Portfolio Feedback Hub의 과거 More Works 카드 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음; sample-work 스타일의 기본 SVG geometry | 파일 보존; 현재 runtime 미사용 | 가능 | 불필요 | 2026-08-17 | `INACTIVE_REFERENCE_CANDIDATE` — normalized PNG로 runtime reference를 교체했으며 삭제·이동하지 않았다. 기존 제작 경위·권리 판단은 유지한다. |
| `public/detail/feedback-list-1440.png` | browser screenshot | Feedback Hub production build `#/` · posts 0건 → sample-empty · public read-only · CSS viewport 1440×900 · actual PNG 1440×900 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; sample-work SVG·MUI(MIT)·Pretendard(OFL 1.1) 범위 | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — true PNG. 외부 사진·타사 logo 없음. |
| `public/detail/feedback-detail-1440.png` | browser screenshot | Feedback Hub production build `#/posts/sample-7` · sample marker · public read-only · CSS viewport 1440×900 · actual PNG 1440×900 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; sample-work SVG·MUI(MIT)·Pretendard(OFL 1.1) 범위 | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — true PNG. 외부 사진·타사 logo 없음. |
| `public/detail/feedback-list-390.png` | browser screenshot | Feedback Hub production build `#/` · posts 0건 → sample-empty · public read-only · CSS viewport 390×844 · actual PNG 390×844 | 김도한 사용자 제작 UI capture | 외부 라이선스 해당 없음; sample-work SVG·MUI(MIT)·Pretendard(OFL 1.1) 범위 | 가능 | capture 교체 가능 | 불필요 | 2026-08-03 | 확인함 — true PNG. 외부 사진·타사 logo 없음. |
| `public/thumbnails/minisns-worklog.svg` | 이미지(썸네일) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/detail/streaming-ui/streaming-hero-390.png` | browser screenshot | `projects/OTT Service/index.html` Home 초기 상태 · CSS viewport 390×844 · actual PNG 390×844 · SHA-256 `9445E5FD3D35D29D9E91818563230B8E3FB50AFFC712B5B0F77417B6896DCF5C` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — current local UI, font·WebP·SVG 로드, prefers-reduced-motion true·100% zoom, browser viewport bitmap을 RGB PNG로 pixel-preserving encoding. resize·crop·recomposition 없음. |
| `public/detail/streaming-ui/streaming-hero-1024.png` | browser screenshot | `projects/OTT Service/index.html` Home 초기 상태 · CSS viewport 1024×900 · actual PNG 1024×900 · SHA-256 `35B202B248931E43A5C0DA6D7D135A6FF0EFD6DCF053705FDF3B84B95033BCB3` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — current local UI, font·WebP·SVG 로드, prefers-reduced-motion true·100% zoom, browser viewport bitmap을 RGB PNG로 pixel-preserving encoding. resize·crop·recomposition 없음. |
| `public/detail/streaming-ui/streaming-hero-1440.png` | browser screenshot | `projects/OTT Service/index.html` Home 초기 상태 · CSS viewport 1440×900 · actual PNG 1440×900 · SHA-256 `13BE8DD640634B59E94E90BB83FE5A37894CCDD7FC8036109D3811ADE10D06EA` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — current local UI, font·WebP·SVG 로드, prefers-reduced-motion true·100% zoom, browser viewport bitmap을 RGB PNG로 pixel-preserving encoding. resize·crop·recomposition 없음. |
| `public/detail/streaming-ui/streaming-filter-1440.png` | browser screenshot | `projects/OTT Service/index.html` 장르 `스릴러` filter 적용 · status `스릴러 필터 적용: 콘텐츠 2개가 표시됩니다.` · SIGNAL / 01·RUNWAY / 06 노출 · CSS viewport 1440×900 · actual PNG 1440×900 · SHA-256 `575CB0AC83B398A8BF0A522114AECBE0C69CCFBA762C5497C377F91886ABEB51` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — prefers-reduced-motion true·100% zoom, 실제 filter 결과 상태의 browser viewport bitmap을 RGB PNG로 pixel-preserving encoding. resize·crop·recomposition 없음. |
| `public/detail/streaming-ui/streaming-dialog-390.png` | browser screenshot | `projects/OTT Service/index.html` SIGNAL / 01 작품 정보 native dialog open · `contentInfoTitle` initial focus · target CSS viewport 390×844 · captured browser surface/actual PNG 390×844 · SHA-256 `6DD7321B3D37917250FDDC8D1D8E10976AAB384ADB193E27DEC649A28A3687A9` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — native `:modal` 실제 상태, body scroll lock, prefers-reduced-motion true·100% zoom, browser viewport bitmap을 RGB PNG로 pixel-preserving encoding. resize·crop·recomposition 없음. |
| `public/detail/streaming-ui/streaming-favorite-390.png` | browser screenshot | `projects/OTT Service/index.html` SIGNAL / 01 작품 정보 dialog에서 favorite 선택 · Hero·card·featured·dialog 4개 button 동기화 · target CSS viewport 390×844 · captured browser surface/actual PNG 390×844 · SHA-256 `5C4D5D2C61BBAB51E4C8B54D58FA4A4082CEA72B75F6E2D5D91535E09A994027` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — page-memory 4개 상태가 `aria-pressed=true`·`찜 해제`로 동기화되고 reload 후 초기화됨. browser viewport bitmap을 RGB PNG로 pixel-preserving encoding, resize·crop·recomposition 없음. |
| `public/detail/streaming-ui/streaming-guide-1440.png` | browser screenshot | `projects/OTT Service/index.html` 프로젝트 안내 native dialog open · `projectGuideTitle` initial focus · CSS viewport 1440×900 · actual PNG 1440×900 · SHA-256 `14BC5C6E69F0038FC4679681D283BADDD5FF56111E7519DED522C395A76DCCE5` | 김도한 사용자 제작 UI capture | 외부 사진·영화·배우·브랜드·API·CDN 자산 없음; `USER_DECLARED_AI_ASSISTED` WebP·`REPOSITORY_DECLARATION_ONLY` SVG/icon·Pretendard OFL 1.1 포함 | 가능 | capture 교체 가능 | 불필요 | 2026-08-15 | 확인함 — 장르 필터·native dialog·찜 상태 동기화·키보드 탐색 중심 intro가 현재 runtime과 일치하며, native `:modal` 실제 상태, body scroll lock, GitHub `noopener noreferrer`, prefers-reduced-motion true·100% zoom, browser viewport bitmap을 RGB PNG로 pixel-preserving encoding. resize·crop·recomposition 없음. |
| SUIT Variable | 폰트 | npm 패키지 `@sun-typeface/suit`(공식 저장소 `github.com/sun-typeface/SUIT`), `node_modules/@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.{css,woff2}`를 `src/main.jsx`에서 import(런타임 CDN 아님) | SUNN(sun.fo) | SIL Open Font License 1.1 | 가능 | 가능(OFL 조건 준수) | 불필요(OFL은 단순 사용 시 표시를 강제하지 않음. 폰트 파일 재배포 시 OFL 및 저작권 고지 유지 필요) | 2026-07-21 | 확인함 — `node_modules/@sun-typeface/suit/LICENSE`(SIL OFL 1.1 전문)와 `package.json`의 `"license": "OFL-1.1"` 필드를 직접 확인했다. variable WOFF2 1개 파일만 사용하며 다른 weight/포맷 파일은 import하지 않는다. |
| Noto Sans KR | 폰트 | fonts.googleapis.com (Google Fonts, `index.html` CDN `<link>`, weight 400/500/700만 로드); 원본은 Noto CJK 공식 저장소 https://github.com/notofonts/noto-cjk, Sans LICENSE https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE | Google(Noto 프로젝트) | SIL Open Font License 1.1 | 가능 | 가능(OFL 조건 준수) | 불필요(단순 웹 사용 시 제작자 표시를 강제하는 라이선스는 아님. 폰트 파일을 재배포할 경우 OFL 및 저작권 고지 유지 필요) | 2026-08-14 | 확인함 — 공식 Noto CJK 저장소의 `Sans/LICENSE` 파일 원문(SIL Open Font License, Version 1.1)을 확인했다. Human Signal Phase 5A-F의 `/projects` 페이지 전용 Figma typography와 울산 버스 Figma typography·export PNG에 사용한다. 폰트 파일은 저장소에 포함하지 않고 Google Fonts CDN으로 로드하며, 이번 asset 교체로 외부 폰트 파일을 저장소에 추가하지 않았다. |
| Lucide local icon set / BREWSTEP 11개 | Figma local SVG icon set | Lucide 공식 저장소 https://github.com/lucide-icons/lucide · 공식 LICENSE https://github.com/lucide-icons/lucide/blob/main/LICENSE | Lucide Icons contributors · Feather Icons contributors | ISC License; Feather-derived subset MIT License | 가능; BREWSTEP Figma static export | 가능(각 라이선스 조건 준수) | source/package 재배포 시 해당 LICENSE·저작권 고지 유지 | 2026-08-15 | `THIRD_PARTY_LICENSE_VERIFIED` — Figma ASSET_RIGHTS node `304:35`; 실제 사용 ArrowLeft · Check · ChevronRight · Coffee · House · MapPin · Minus · Plus · ReceiptText · Search · ShoppingBag 11개를 local SVG geometry로 배치하며 현재 public PNG에는 static export로 포함한다. 포트폴리오 runtime의 Lucide package·local source binary 사용은 0이다. 타사 brand logo가 아니며 구현 저장소에 source/package를 포함할 경우 notices 보존이 필요하다. 라이선스 확인은 법률상 무위험·비침해를 보증하지 않는다. |
| BREWSTEP brand mark / lockup | Figma native vector/component | Figma `cvfT9QazAFaXVAxZfeUdvr` · Brand / Mark node `566:658` · Brand / Lockup node `569:1024` | 독립 제작자 증명 없음; 저장소/Figma 선언만 확인 | 외부 라이선스 해당 없음이라는 저장소 선언; 상표 clearance 미확인 | 현재 Figma export 안의 static brand expression | 가능 | 외부 출처표시 근거 없음 | 2026-08-15 | `REPOSITORY_DECLARATION_ONLY` — Figma native vector·component이며 외부 logo·watermark 발견 0. 독립 제작 과정 기록·제3자 creator attestation·상표 clearance는 확인하지 못했다. 외부 자산이 아니라는 저장소/Figma 선언이며 상표권·비침해를 보증하지 않는다. |

| Photo / 브루스텝 라떼 · Minimalist Latte Art on White Cup | 제품 사진 | https://www.pexels.com/photo/minimalist-latte-art-on-white-cup-32938766/ | Dicky Agustian · https://www.pexels.com/@dicky-agustian-1841989734/ | Pexels License · https://www.pexels.com/license/ | 가능 | 가능 | 필수 아님; 추적성을 위해 기록 | 2026-08-04 | 확인함 — Figma image hash `4177eed06297e2f3d8f282160358b8a9b92eb469`; 실제 사용 `I383:72;344:618`, `I384:82;375:642`, `382:36`, `I644:367;637:29`, `I646:487;637:52`; 원본 3572×5358, Figma source 1000×1500; Home·Hero·Cart·Review FILL, Menu CROP `[[1.02,0,-0.01],[0,1.02,-0.01]]`. 인물·타사 로고·워터마크 없음, 상표로 사용하지 않음. |
| Photo / 말차 라떼 · Refreshing Iced Matcha Latte on Minimalist Background | 제품 사진 | https://www.pexels.com/photo/refreshing-iced-matcha-latte-on-minimalist-background-32972501/ | Dicky Agustian · https://www.pexels.com/@dicky-agustian-1841989734/ | Pexels License · https://www.pexels.com/license/ | 가능 | 가능 | 필수 아님; 추적성을 위해 기록 | 2026-08-04 | 확인함 — Figma image hash `7606e002699e93f6cb01725ccef864c3a26e64ce`; 실제 사용 `I383:103;342:595`, `I384:91;375:642`; 원본 3696×5543, Figma source 1000×1500; Home CROP `[[0.58,0,0.21],[0,0.58,0.30]]`, Menu CROP `[[0.70,0,0.15],[0,0.70,0.22]]`. 인물·타사 로고·워터마크 없음, 상표로 사용하지 않음. |
| Photo / 아포가토 · Minimalist Affogato with Vanilla Ice Cream | 제품 사진 | https://www.pexels.com/photo/minimalist-affogato-with-vanilla-ice-cream-32972496/ | Dicky Agustian · https://www.pexels.com/@dicky-agustian-1841989734/ | Pexels License · https://www.pexels.com/license/ | 가능 | 가능 | 필수 아님; 추적성을 위해 기록 | 2026-08-04 | 확인함 — Figma image hash `ae9ae489ea7bc36ddbc5fc8ded0616d97281c9f2`; 실제 사용 `I383:112;342:595`, `I384:100;375:642`; 원본 3242×4862, Figma source 1000×1500; Home·Menu CROP `[[1.05,0,-0.025],[0,1.05,-0.025]]`. 인물·타사 로고·워터마크 없음, 상표로 사용하지 않음. |
| Photo / 초콜릿 디저트 · White Ceramic Ramekin with Chocolate Dessert | 제품 사진 | https://www.pexels.com/photo/white-ceramic-ramekin-with-chocolate-dessert-32972542/ | Dicky Agustian · https://www.pexels.com/@dicky-agustian-1841989734/ | Pexels License · https://www.pexels.com/license/ | 가능 | 가능 | 필수 아님; 추적성을 위해 기록 | 2026-08-04 | 확인함 — Figma image hash `187efaa0dff20518292397ff5954a97c17e8bf1e`; 실제 사용 `I384:109;375:642`; 원본 3617×5426, Figma source 1000×1500; Menu CROP `[[0.90,0,0.05],[0,0.90,0.05]]`. 인물·타사 로고·워터마크 없음, 상표로 사용하지 않음. |
| Photo / 에스프레소 · Minimalist Image of Espresso in White Ceramic Cup | 제품 사진 | https://www.pexels.com/photo/minimalist-image-of-espresso-in-white-ceramic-cup-32972556/ | Dicky Agustian · https://www.pexels.com/@dicky-agustian-1841989734/ | Pexels License · https://www.pexels.com/license/ | 가능 | 가능 | 필수 아님; 추적성을 위해 기록 | 2026-08-04 | 확인함 — Figma image hash `6444af7d4708a7d66ec306f4ac9df7bc551ec9f6`; 실제 사용 `I599:102;375:642`; 원본·Figma source 2611×3916; Menu FILL. 인물·타사 로고·워터마크 없음, 상표로 사용하지 않음. |

BREWSTEP 사진은 원본 자체를 재판매하거나 stock 형태로 재배포하지 않는다. 위 기록은
Pexels License가 attribution을 필수로 요구해서가 아니라 추적성을 위해 남긴 것이며,
작가 또는 Pexels가 BREWSTEP을 보증한다는 의미가 아니다. 이 등록부는 법률상 무위험을
보증하지 않는다.

## 현재 source가 참조하는 공개 이미지·아이콘 72개

현재 production DOM inventory에서 확인한 public 이미지·아이콘 72개(BREWSTEP
Detail 33개 + normalized card 1개 = 34개, 기타 38개)를 정확한 경로로 등록한다. BREWSTEP 화면 안의 제품 사진 권리는
위 Pexels 원본 행을 별도로 적용한다. source 미참조 legacy와 카드 reference에서만
비활성인 후보는 현재 자산과 구분해 별도로 기록한다.

### BREWSTEP Detail 공개 이미지 33개 export mapping

공통 current Figma file key는 `cvfT9QazAFaXVAxZfeUdvr`이다. 아래 33개는 모두 true
PNG이며 2026-08-04에 signature·actual dimensions·SHA-256과 source 참조를 확인했다.
`D`는 `DERIVED / CURRENT FIGMA CONTENT CONFIRMED`를 뜻한다. 현재 대응 화면·계약
node는 확인했지만 과거 파생 파일의 정확한 export scale·crop·composite recipe는
기록이 없어 `N/A / 확인 불가`이며, 이번 회차에 재-export하지 않았다.

| 정확한 경로 | 실제 형식·크기 | SHA-256 | portfolio section·CSS viewport | current Figma source node | recipe |
| --- | --- | --- | --- | --- | --- |
| `public/detail/brewstep/detail-hero-desktop-1440.png` | PNG 899×868 | `86D4E52D21A52F5A8B552AD8BD6B3350304A13A25F30EC02BC6CE9112EE318CE` | `hero.media[0]` · CSS 1440 | `706:1560 · 706:1563` | D |
| `public/detail/brewstep/detail-hero-desktop-390.png` | PNG 504×487 | `AEA716FE0F6A58B233287AA4821239EA084E0AE3B650634FF4BF18461E593D8A` | `hero.media[0]` · CSS 390 | `706:1560 · 706:1563` | D |
| `public/detail/brewstep/detail-hero-desktop-1024.png` | PNG 623×644 | `E374F64FAF64CE1B69A9FFE6D0E23B465A1888D2F4A819A5AF2BA0ACCA039AD7` | `hero.media[0]` · CSS 1024 | `706:1560 · 706:1563` | D |
| `public/detail/brewstep/detail-hero-mobile-1440.png` | PNG 275×1017 | `B6B73133661AD5D4A573FEE9952F79597893AA41CC499F6989AC1D184D38307A` | `hero.media[1]` · CSS 1440 | `354:187` | D |
| `public/detail/brewstep/detail-hero-mobile-390.png` | PNG 154×571 | `9C69BD625212F139682B04AF5E93C41A8DFD94B870859FC3DCE430BDE5A305A7` | `hero.media[1]` · CSS 390 | `354:187` | D |
| `public/detail/brewstep/detail-hero-mobile-1024.png` | PNG 191×755 | `76FAB0109CC6006CF7C1BF4426A92A677493E6274D29853B4294D5BBFE002D86` | `hero.media[1]` · CSS 1024 | `354:187` | D |
| `public/detail/brewstep/decision-01-1440-a.png` | PNG 514×754 | `B27EDA7D2C6CB189C4F1EFA5F5BD8300A0974564FE5600DEDC8203024E42AF65` | `decisions[0].media[0]` · CSS 1440 | `399:70 · 629:1088 · READY 모바일 7화면` | D |
| `public/detail/brewstep/decision-01-390-a.png` | PNG 342×506 | `19708FFA75A8A3002EFE98E9C983E3762A42093E5F9EFF819E91014D38836C2E` | `decisions[0].media[0]` · CSS 390 | `399:70 · 629:1088 · READY 모바일 7화면` | D |
| `public/detail/brewstep/decision-01-1024-a.png` | PNG 364×537 | `1606C5A0AE9C09915B1EE88F88D61E1A2957A40A68C4B22D3C3DA404BD615DA6` | `decisions[0].media[0]` · CSS 1024 | `399:70 · 629:1088 · READY 모바일 7화면` | D |
| `public/detail/brewstep/decision-01-1440-b.png` | PNG 514×754 | `12F77FE9E0472E1617C3B8939D6553F31403A89E2E0DE702EB47DA94EAC1323E` | `decisions[0].media[1]` · CSS 1440 | `399:70 · 629:1088` | D |
| `public/detail/brewstep/decision-01-390-b.png` | PNG 342×506 | `7F5825720694CEBC26C13EB101703126C10531F185E5F27524616A8DA4CCB2CC` | `decisions[0].media[1]` · CSS 390 | `399:70 · 629:1088` | D |
| `public/detail/brewstep/decision-01-1024-b.png` | PNG 364×537 | `E0DF78C46F9B93704FE54F872FEA4109933688DD5AF33481A831DDA4A6EC66CF` | `decisions[0].media[1]` · CSS 1024 | `399:70 · 629:1088` | D |
| `public/detail/brewstep/decision-02-1440-a.png` | PNG 514×754 | `B008D54B6441B3B8066BAB173CE2D23E1871507D293D43AA7D3A1ED8DBE551F9` | `decisions[1].media[0]` · CSS 1440 | `644:341 · 645:404 · 771:2576 · 771:2608` | D |
| `public/detail/brewstep/decision-02-390-a.png` | PNG 342×506 | `43B2325C2EC0FA5D3E0CAA1EB6D702522B45EE08940AB62DB01E2CDFA8D3910E` | `decisions[1].media[0]` · CSS 390 | `644:341 · 645:404 · 771:2576 · 771:2608` | D |
| `public/detail/brewstep/decision-02-1024-a.png` | PNG 364×537 | `53D3940044AD9359F10420DAAA03902CE70EFCE6547EDC6FBC64978EC984150D` | `decisions[1].media[0]` · CSS 1024 | `644:341 · 645:404 · 771:2576 · 771:2608` | D |
| `public/detail/brewstep/decision-02-1440-b.png` | PNG 514×754 | `12F77FE9E0472E1617C3B8939D6553F31403A89E2E0DE702EB47DA94EAC1323E` | `decisions[1].media[1]` · CSS 1440 | `647:501 · 771:2649 · 771:2673` | D |
| `public/detail/brewstep/decision-02-390-b.png` | PNG 342×506 | `7F5825720694CEBC26C13EB101703126C10531F185E5F27524616A8DA4CCB2CC` | `decisions[1].media[1]` · CSS 390 | `647:501 · 771:2649 · 771:2673` | D |
| `public/detail/brewstep/decision-02-1024-b.png` | PNG 364×537 | `E0DF78C46F9B93704FE54F872FEA4109933688DD5AF33481A831DDA4A6EC66CF` | `decisions[1].media[1]` · CSS 1024 | `647:501 · 771:2649 · 771:2673` | D |
| `public/detail/brewstep/decision-03-1440-a.png` | PNG 514×754 | `1EB6ECEAC3496E16DE5069E7027DCD3EAF1D916A7976EBF36835E37DF55B6D2B` | `decisions[2].media[0]` · CSS 1440 | `354:187 · 706:1560 · 706:1563` | D |
| `public/detail/brewstep/decision-03-mobile-wide-a.png` | PNG 514×240 | `F433653DFC45B93AA9E9CDDEAD4D7DA93608B8C572260BB5F2200C6A23615402` | `decisions[2].media[0]` · CSS 390 | `354:187 · 706:1560 · 706:1563` | D |
| `public/detail/brewstep/decision-03-1024-a.png` | PNG 364×537 | `9DAB20E5B16D265F83E3D47CCABA075123B7B0890E029BCD155FA69872B0266A` | `decisions[2].media[0]` · CSS 1024 | `354:187 · 706:1560 · 706:1563` | D |
| `public/detail/brewstep/decision-03-1440-b.png` | PNG 514×754 | `9113603CFF0CA5B85316ADC70E86E05886DB045C51BA71A70A945684823F8B99` | `decisions[2].media[1]` · CSS 1440 | `646:453 · 706:1561 · 706:1564` | D |
| `public/detail/brewstep/decision-03-mobile-wide-b.png` | PNG 514×240 | `F3FDFE8C4F7E05E83C31F554E4F8CF5D30CCD297DF83231FAAEEA2031913ED49` | `decisions[2].media[1]` · CSS 390 | `646:453 · 706:1561 · 706:1564` | D |
| `public/detail/brewstep/decision-03-1024-b.png` | PNG 364×537 | `459B70398AEF5057B49C03BEA90ABA52F9DEA2F4F63A13190DBD42B19AD5F41E` | `decisions[2].media[1]` · CSS 1024 | `646:453 · 706:1561 · 706:1564` | D |
| `public/detail/brewstep/main-1440-primary.png` | PNG 1551×992 | `C7E25F1650E03ECCB3DFE8341D51489016B8A49FC762B10738F2DE83C4094341` | `mainScreens[0]` · CSS 1440 | `706:1560 · 706:1563` | D |
| `public/detail/brewstep/main-390-primary.png` | PNG 700×462 | `532694D39D83B4582F5C27B1B8B22EBAA3050F4D75E5300946B957F8E21798BD` | `mainScreens[0]` · CSS 390 | `706:1560 · 706:1563` | D |
| `public/detail/brewstep/main-1024-primary.png` | PNG 1103×728 | `DA343C2D128C28949919D3DDC5A58FF69C5573958CD66E6BB57F535683009720` | `mainScreens[0]` · CSS 1024 | `706:1560 · 706:1563` | D |
| `public/detail/brewstep/main-1440-mobile.png` | PNG 403×764 | `69390CD5B87CFB8C33CC028C14213DFBA65529F3C5C106FE951AFAE421BC26AD` | `mainScreens[1]` · CSS 1440 | `354:187` | D |
| `public/detail/brewstep/main-390-mobile.png` | PNG 256×486 | `3F9950755CA9B157D64E9F9A8D69BAB735C93024D514CDAD210381B6CF988E34` | `mainScreens[1]` · CSS 390 | `354:187` | D |
| `public/detail/brewstep/main-1024-mobile.png` | PNG 287×543 | `D6263F2816B5146092C4363B4FC139470E46CEC734AC0B34AE2F9B3B26A812D0` | `mainScreens[1]` · CSS 1024 | `354:187` | D |
| `public/detail/brewstep/main-1440-detail.png` | PNG 634×458 | `01194B5C7BA888B1AF58B6AF14C95EB59FCAE25FE06B86C279F933F24DF20F12` | `mainScreens[2]` · CSS 1440 | `706:1561 · 706:1564` | D |
| `public/detail/brewstep/main-390-detail.png` | PNG 380×275 | `CDA6AF52FF9B0A547E8E0240C15699AA2B3C9B50E29BC3A7CCE42199712777C3` | `mainScreens[2]` · CSS 390 | `706:1561 · 706:1564` | D |
| `public/detail/brewstep/main-1024-detail.png` | PNG 451×326 | `507578461A8B798B9928DB592D14DC0C1F67A40A1E80253C188B82E300E7186A` | `mainScreens[2]` · CSS 1024 | `706:1561 · 706:1564` | D |

Decision 01/02의 `*-b` 390·1024·1440은 각각 byte-identical하다. 같은 Order Status
export를 주문 값 연속성과 progress 상태 문법이라는 서로 다른 설계 근거로 재사용하는
active semantic reuse이므로 삭제·통합하지 않고 유지한다.

### 기타 19개

| 정확한 경로 | 분류 | origin 또는 derivative source | 사용 화면 | 권리 근거·상태 |
| --- | --- | --- | --- | --- |
| `public/detail/gongjeongbom/compare-1440.png` | browser screenshot | 최종 로컬 route `/compare.html` · 현재 탭 `sessionStorage`의 `gongjeongbom-compare`에 `mv-x300`, `mv-x500`, `mv-x700`을 설정한 3개 제품 선택 비교 top · CSS viewport 1440×900 직접 viewport 캡처 · resize·crop 없음 · actual PNG 1440×900 · SHA-256 `D4C98CC91F6B8675009D782E3171CAE571A1E21D79BEEB6C344FA20B79D1D222` · 최초 캡처 2026-08-09 · 적용·재검증 2026-08-10 | 공정봄 Compare | 사용자 제작 프로젝트 UI 캡처; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/gongjeongbom/home-1440.png` | browser screenshot | 최종 로컬 route `/index.html` · Home desktop initial top · CSS viewport 1440×900 직접 viewport 캡처 · resize·crop 없음 · actual PNG 1440×900 · SHA-256 `B6F9ABB93D79014169062AAB56D0DD28AD5CFBCC7EB1385D51C44B9EB30907A0` · 최초 캡처 2026-08-09 · 적용·재검증 2026-08-10 | 공정봄 Main Screens Home 전용 exact viewport 증거 | 사용자 제작 프로젝트 UI 캡처; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/gongjeongbom/home-hero-1440.png` | browser screenshot | 승인 후보 source ZIP `gongjeongbom-figma-hero-runtime-contract-final-20260810-130342.zip` 내부 `04_browser-candidate-b/candidates/home-1440-semantic-boundary.png` · 최종 로컬 route `/index.html` · Home desktop semantic section boundary · CSS viewport 1440×720 직접 viewport capture · resize·crop 없음 · actual PNG 1440×720 · SHA-256 `78CB5D6078A3076C320F365433C41690E31FDF2CE38E231C7AA890E10C2D5B98` · 적용·재검증 2026-08-10 | 공정봄 Hero desktop semantic section capture | 사용자 제작 프로젝트 UI의 실제 브라우저 capture; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/gongjeongbom/home-390.png` | browser screenshot | 승인 후보 source ZIP `gongjeongbom-figma-hero-runtime-contract-final-20260810-130342.zip` 내부 `04_browser-candidate-b/candidates/home-390-semantic-boundary.png` · 최종 로컬 route `/index.html` · Home mobile semantic section boundary · CSS viewport 390×824 직접 viewport capture · resize·crop 없음 · actual PNG 390×824 · SHA-256 `A3D6CCE8B4169683F2ECEAAA18189586205A716D37D730642DE57A5E75CA67D5` · 적용·재검증 2026-08-10 | 공정봄 Hero mobile semantic section capture | 사용자 제작 프로젝트 UI의 실제 브라우저 capture; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/gongjeongbom/inquiry-1440.png` | browser screenshot | 최종 로컬 route `/inquiry.html?products=mv-x300,mv-x500` · MV-X300·MV-X500 연결 Inquiry Step 2 top · CSS viewport 1440×900 직접 viewport 캡처 · resize·crop 없음 · actual PNG 1440×900 · SHA-256 `C8CAB36E18DE0A668FE6C4F9E5B76DC963BA9A1805CD1F5873086E09E4D50D85` · 최초 캡처 2026-08-09 · 적용·재검증 2026-08-10 | 공정봄 Inquiry | 사용자 제작 프로젝트 UI 캡처; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/gongjeongbom/product-1440.png` | browser screenshot | 최종 로컬 route `/product.html?id=mv-x500` · MV-X500 detail top·Hero · CSS viewport 1440×900 직접 viewport 캡처 · resize·crop 없음 · actual PNG 1440×900 · SHA-256 `E0E256FC311BFBDA62BDC879E60EFCFE08ACAF23AF95540D8B045FFD0E7611B6` · 최초 캡처 2026-08-09 · 적용·재검증 2026-08-10 | 공정봄 Product Detail | 사용자 제작 프로젝트 UI 캡처; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/gongjeongbom/products-1440.png` | browser screenshot | 최종 로컬 route `/products.html` · 전체 7개·검색/필터 미적용 initial top · CSS viewport 1440×900 직접 viewport 캡처 · resize·crop 없음 · actual PNG 1440×900 · SHA-256 `6E0FF327933C39368630C0CCC7F6699BEE4563C5177961DB1CB3DB91281B4288` · 최초 캡처 2026-08-09 · 적용·재검증 2026-08-10 | 공정봄 Products | 사용자 제작 프로젝트 UI 캡처; 외부 사진·브랜드 자산 없음. PNG signature·크기·hash 확인함 |
| `public/detail/seolbiit-completion-flow.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 완료·재점검 node `27:38` 직접 export | 설비잇 Completion Flow | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-cover.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, Cover node `91:16` 직접 export | 설비잇 Detail Hero · Home/Projects card legacy reference | 사용자 제작 Figma 화면이라는 기존 기록을 유지한다. `INACTIVE_REFERENCE_CANDIDATE_FOR_CARD · ACTIVE_DETAIL_HERO` — normalized card로 교체한 뒤에도 `portfolioMeta.js`의 Detail Hero reference는 유지하며, 파일은 삭제·이동하지 않았다. |
| `public/detail/seolbiit-desktop-management.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 데스크톱 관리 node `24:43` 직접 export | 설비잇 Desktop Management | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-error-states.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 오류·빈 상태 node `29:38` 직접 export | 설비잇 Error States | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-mobile-flow.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 모바일 흐름 node `19:2` 직접 export · actual PNG 1000×1048 · SHA-256 `9F8290C99F5621AB042F24C6E4CC79626E4D2E7C459FCD994A79D4A1EED32AF2` · 2026-08-03 재확인 | 설비잇 Mobile Flow | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 현재 Figma node와 hash 일치 확인함 |
| `public/thumbnails/normalized/brewstep-card-1600x1000.png` | Figma native 1× `THUMBNAIL_DERIVATIVE` | Figma `cvfT9QazAFaXVAxZfeUdvr` · final `978:609` · READY `706:1560` · Product `722:18` · Order `722:24` · inner `24/15/1552/970` · Product·Order sibling regions independently scaled · Product copy aligned to Product Hero · Not a literal runtime screenshot · actual PNG 1600×1000 · 279,571 bytes · RGBA, alpha channel 있음, 비불투명 pixel 0 · SHA-256 `CC7EB357529794898562FD9B2E14975250E9B7B197E2724FC6B78C465D5D2E96` | Projects BREWSTEP card | 기존 IBM Plex·Noto Sans KR OFL, Lucide ISC/MIT, brand `REPOSITORY_DECLARATION_ONLY`, Pexels Latte photo ID `32938766` 행을 연결한다. 내부 UI·copy·state·component는 유지되며 신규 외부 asset 0. |
| `public/thumbnails/normalized/bus-arrival-card-1600x1000.png` | Figma native 1× Light Tight composite derivative | Figma `bzwp6FhsZaaenOA4ABIAFs` · final `600:66` · READY `59:100 + 59:146 + 223:198` · inner `24/15/1552/970` `#F8FAFC` · wrapper 390×844 `x=167/605/1043, y=78, gap=48` · READY 360×800 uniform scale `1.055×` · actual PNG 1600×1000 · 142,740 bytes · RGBA, alpha channel 있음, 비불투명 pixel 0 · SHA-256 `839E6A1B72D75914040CB2569E64CDDCCFA83FF81E924A92779ABD28ECB70386` | Home Selected · Projects More Works | 기존 Material Symbols Rounded Apache 2.0, Noto Sans KR OFL, 울산 BIS 정적 공공데이터와 READY export 행을 연결한다. 신규 외부 asset 0. |
| `public/thumbnails/normalized/gongjeongbom-card-1600x1000.png` | browser capture normalized derivative | `projects/gongjeongbom/compare.html` · VS-C100 + VS-C300 session-only selected state · crop `80/50/1440/900` → uniform resize `1552×970` → place `24/15` on `#172432` · actual PNG 1600×1000 · 187,674 bytes · RGB, alpha channel 없음, 비불투명 pixel 0 · SHA-256 `443484BB6BE467B7FDA03EC79EE3F2DAE37D886DE7908FED22E49C4B0FC9C3E3` | Home Featured · Projects Featured | 기존 Compare browser screenshot 행과 `projects/gongjeongbom/README.md`의 Noto Sans KR·Roboto Mono OFL 기록을 연결한다. 외부 사진·브랜드 자산 및 신규 외부 asset 0. |
| `public/thumbnails/normalized/jobflow-card-1600x1000.png` | browser capture normalized derivative | `projects/jobflow-dashboard #/` · current guest sample read-only Dashboard · crop `80/50/1440/900` → uniform resize `1552×970` → place `24/15` on `#172432` · actual PNG 1600×1000 · 271,940 bytes · RGB, alpha channel 없음, 비불투명 pixel 0 · SHA-256 `1695B09A862DD0FE402B4BEEB25D9999043DE42F3001C32436D08277BB2E9C28` | Home Featured · Projects Featured | 기존 `@mui/icons-material` MIT와 guest Dashboard browser screenshot 행을 연결하며 OS/system UI font stack을 사용한다. 외부 사진·타사 브랜드 UI 및 신규 외부 asset 0. |
| `public/thumbnails/normalized/seolbiit-card-1600x1000.png` | Figma READY export normalized derivative | Figma `GInxTqHo6Y87DEe3vuhmMw` · READY `24:43` · crop `80/50/1440/900` → uniform resize `1552×970` → place `24/15` on `#172432` · actual PNG 1600×1000 · 246,049 bytes · RGB, alpha channel 없음, 비불투명 pixel 0 · SHA-256 `A353957281979004A39C7D80E1D6B62FE0505BB7784D8E5314D7B985894EC15D` | Home Featured · Projects Featured | 기존 Noto Sans KR OFL과 Desktop Management export 행을 연결한다. vector icon/logo 제작 provenance의 독립 확인 제한은 유지하며 근거 없이 `VERIFIED_USER_CREATED`로 승격하지 않는다. 신규 외부 asset 0. |
| `public/thumbnails/normalized/feedback-hub-card-1600x1000.png` | browser capture normalized derivative | `projects/portfolio-feedback-hub #/` · public read-only list · `scrollY=293` · crop `80/50/1440/900` → uniform resize `1552×970` → place `24/15` on `#172432` · actual PNG 1600×1000 · 369,740 bytes · RGB, alpha channel 없음, 비불투명 pixel 0 · SHA-256 `DB03BAB0F893DBB7CB6A837386A71DB8E89942BB275F59E7184DC7497131AB75` | Projects More Works | 기존 `@mui/icons-material` MIT, public read-only list screenshot과 `projects/portfolio-feedback-hub/README.md`의 Pretendard OFL 기록을 연결한다. 외부 사진·타사 logo 및 신규 외부 asset 0. |
| `public/thumbnails/normalized/ott-service-card-1600x1000.png` | browser capture normalized derivative | `projects/OTT Service/index.html` · initial SIGNAL / 01 Hero · crop `80/50/1440/900` → uniform resize `1552×970` → place `24/15` on `#172432` · actual PNG 1600×1000 · 907,185 bytes · RGB, alpha channel 없음, 비불투명 pixel 0 · SHA-256 `FFB9284BB4A4DEB8FECFA1493B1B38C5A97568CB66880353639C801C05793E20` | Home Selected · Projects More Works | 기존 Pretendard OFL, `USER_DECLARED_AI_ASSISTED` WebP, `REPOSITORY_DECLARATION_ONLY` SVG/icon 행을 연결한다. 외부 영화·인물·브랜드 및 신규 외부 asset 0. 독점성·법률상 무위험을 보증하지 않는다. |

## 갈피록 리디자인 자산 추가 (2026-09-27, 공개 배포)

| 자산 | 제작 근거 | 외부 입력 | 확인 범위 |
| --- | --- | --- | --- |
| `projects/jobflow-dashboard/public/favicon.svg` | 이번 대화의 코드 편집에서 접힌 종이와 책갈피 path를 새로 작성 | 없음 | AI 보조 제작 경로 확인. 기존 favicon 교체. 독점성·상표 권리 미확인. |
| `projects/jobflow-dashboard/src/components/ui/Brand.jsx` | 이번 대화의 코드 편집에서 Brand·PaperScene SVG를 새로 작성 | 없음 | 원·사각형·path로 구성. 외부 사진·타사 로고 없음. AI 보조 제작이며 법적 무위험 보증 아님. |

MUI 아이콘은 기존 MIT 패키지를 유지하고, 가상 회사는 이름 첫 글자로 표시합니다. 2차 수정에서 `Brand.jsx`에 노트·달력·체크 카드로 구성된 원본 `JournalScene`을 추가했습니다. 사용자 승인으로 위 자산을 공개 배포했습니다. 현재 제품 예시와 날짜 티켓은 `ProductPreview.jsx` 및 JSX/CSS의 원본 구성입니다. 이전 장면 SVG는 보존 파일이며 현재 주요 화면에 사용하지 않습니다. 기존 JobFlow runtime screenshot·normalized thumbnail 행은 이전 화면의 이력이며 새 갈피록 화면의 검증 근거로 사용하지 않습니다.

### 갈피록 로컬 폰트 추가 (2026-09-27, 공개 배포)

- 자산: `projects/jobflow-dashboard/public/fonts/PretendardVariable.woff2`. 기존 `projects/OTT Service/assets/fonts/PretendardVariable.woff2`와 SHA-256 동일: `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`.
- 출처: 공식 Pretendard 저장소 https://github.com/orioncactus/pretendard — 제작자 Kil Hyung-jin, SIL OFL 1.1. 공식 LICENSE를 직접 확인했고 전체 고지를 `projects/jobflow-dashboard/public/fonts/OFL.txt`에 저장했습니다. 웹 번들 포함과 재배포 시 해당 파일을 유지합니다.
- 원본 글리프·폰트명·바이트를 수정하지 않았습니다. CDN 요청 없이 자체 파일로 로드합니다.

### 갈피록 생성 이미지 추가 (2026-09-27, 공개 배포)

이번 대화에서 내장 ImageGen을 두 번 호출해 텍스트 지시만으로 새 이미지를 생성했습니다. 외부 참조 사진·브랜드·특정 작가를 입력하지 않았습니다. 실제 사용 프롬프트 전문은 `projects/jobflow-dashboard/NOTICE.md`에 있습니다. 생성 경로를 확인한 AI 보조 제작 자산이며 법적 무위험·독점성은 보증하지 않습니다. 직접 촬영 사진으로 표시하지 않습니다.

| 자산 | 배포 규격 | SHA-256 |
| --- | --- | --- |
| `projects/jobflow-dashboard/src/assets/galpi-desk.webp` | WebP, 61,352바이트 | `84c418fbcb150cc0f0ae8149d7828776c84a9cb57f2369755f475337ca16c8b6` |
| `projects/jobflow-dashboard/src/assets/galpi-objects.webp` | WebP, 118,852바이트 | `17cc6b730799a31c308b139fe7bed3569e12f7673257737e0fec95f649810a94` |

원본 PNG를 내용과 크기를 유지한 채 WebP 품질 90으로 인코딩했습니다. 현재 `galpi-desk.webp`는 설정 화면의 `JournalArt`에서 사용합니다. `galpi-objects.webp`는 보존 자산이며 현재 주요 화면에서 사용하지 않습니다. 공개 사이트의 주요 데스크톱 화면을 1363×936에서 확인했으며 모바일 및 모든 자산 사용 상태의 시각 검증을 완료했다는 뜻은 아닙니다.

### 갈피록 배경·기능별 원본 벡터 보강 (2026-09-27)

- `projects/jobflow-dashboard/src/assets/galpi-paper-field.svg`: 겹친 종이 면·책갈피·연결선의 원본 SVG path.
- `projects/jobflow-dashboard/src/components/ui/PaperGraphic.jsx`: 폴더·진행 카드·달력·체크리스트·말풍선·필기 6종.
- 이번 코드 편집에서 작성한 AI 보조 벡터이며 외부 이미지·로고·도안 입력 없음. 원본 제작 경로는 확인했으나 독점성·상표 권리의 보증은 아님. 기존 Pretendard OFL 및 MUI MIT 고지는 유지.

### 갈피록 종이 조형 이미지 보강 (2026-09-27)

- `projects/jobflow-dashboard/src/assets/galpi-sculpture.webp`: 이 대화의 내장 ImageGen으로 텍스트만 입력해 생성한 원본 조형 이미지. 1536×1024, 100,134바이트. PNG에서 WebP 품질 87로 형식 변환했으며 크기·내용 변경 없음.
- 외부 참고 이미지·실존 로고·특정 작가 입력 없음. AI 보조 제작으로 표시하며 직접 촬영 또는 직접 모델링으로 주장하지 않습니다. 독점성·법적 무위험을 보증하는 확인은 아닙니다.
- 소개·로그인·오늘의 지원 및 작업 공간 배경에서 사용. 실제 프롬프트는 `projects/jobflow-dashboard/NOTICE.md`에 보존합니다.

## 갱신 규칙

- 새 외부 폰트/이미지/아이콘/영상/mockup/template/코드를 추가할 때는 위
  표에 한 행을 추가하고, 원 배포처 LICENSE를 직접 연 뒤에만 `상태`를
  "확인함"으로 표시한다.
- "무료"라는 블로그·소개 글만 보고 상태를 "확인함"으로 적지 않는다.
- 프로젝트 썸네일/스크린샷/favicon도 사용자 본인이 "직접 만들었다"고
  확인해주거나 원본 제작 근거(디자인 파일, 제작 과정 기록 등)가 있을
  때만 상태를 "확인함"으로 바꾼다. git 커밋 이력만으로는 제작 경위를
  확정하지 않는다.
- 확인하지 못한 채 화면에 이미 쓰인 자산이 있다면 이 표에 `[저작권 확인
  필요]` 또는 `[제작자/권리 확인 필요]`로 남기고, 공개 배포 전 검토
  대상으로 삼는다.


## 갈피록 크랜베리 시각 구분 — 2026-09-27

| 자산 | 제작·권리 확인 범위 | 사용 위치 |
| --- | --- | --- |
| `projects/jobflow-dashboard/src/assets/galpi-rose-archive.webp` | 이번 대화 내장 ImageGen 텍스트 생성. 외부 참고 이미지·로고·작가 지정 없음. 1536×1024, WebP 79,552바이트, 품질 86 변환. AI 보조 제작; 독점성·유사성 부재 보증 아님. 정확한 프롬프트는 해당 프로젝트 NOTICE. | 소개·로그인·설정 장식 |
| `projects/jobflow-dashboard/public/galpirok-rose.svg` | 기존 프로젝트의 직접 작성한 종이·책갈피 path를 크랜베리색으로 변경. 외부 도안 입력 없음. | 브라우저 탭 아이콘 |


## 갈피록 종이 배경 보강 — 2026-09-28

| 자산 | 제작·확인 범위 | 용도 |
| --- | --- | --- |
| `projects/jobflow-dashboard/src/assets/galpi-ribbon-paper.webp` | 내장 ImageGen 텍스트 생성, 외부 이미지 입력 없음. 실제 1774×887, WebP 품질 84, 88,014바이트. AI 보조 제작이며 원본 촬영물 아님. 프롬프트는 프로젝트 NOTICE. | 페이지 상단·날짜 티켓 뒤·면접 연습 바탕 |
| `projects/jobflow-dashboard/src/assets/galpi-paper-landscape.svg` | 프로젝트용 원본 path·gradient·작은 섬유 패턴을 코드로 작성. 외부 도안 입력 없음. | 소개·작업 공간·로그인 배경 |

## 갈피록 상단 메뉴 개편 캡처 — 2026-10-07

공개 GitHub Pages 앱 `17420d1`에서 글자·대비·여백 마감 후 직접 저장한 JPEG입니다. 비회원 소개 또는 가상 샘플 데이터이며 실제 사용자 기록·외부 제작자 UI를 캡처한 것이 아닙니다. CSS viewport 1363×936, 실제 저장 픽셀은 아래와 같습니다. 캡처 후 확대·합성·이미지 생성·텍스트 교체 없음.

| 파일 | 화면 | 저장 픽셀 |
| --- | --- | --- |
| `public/detail/galpirok-welcome-pc.jpg` | 비회원 첫 화면·제품 미리보기 | 1348×926 |
| `public/detail/galpirok-overview-pc.jpg` | 오늘의 지원 | 1348×926 |
| `public/detail/galpirok-board-pc.jpg` | 전형별 지원 현황 | 1348×926 |
| `public/detail/galpirok-checklist-pc.jpg` | 준비 체크 | 1348×926 |

첨부한 워터마크 UI는 색의 역할과 배치 원리 검토에만 사용했으며 제품/포트폴리오 자산으로 복제하지 않았습니다. 배너는 기존 원본 종이 조형 이미지와 코드 SVG를 재배치했습니다. 기존 폰트·아이콘·생성 이미지의 출처와 권리 확인 범위는 위 기록을 유지합니다.


## 현재 포트폴리오 리디자인에서 추가한 화면

다음 이미지는 사용자의 기존 Figma 작업과 공개 웹앱을 직접 내보내거나 캡처한 화면이다. 첨부 레퍼런스의 사진·템플릿은 사이트에 포함하지 않았다. 화면 안에 포함된 개별 사진·아이콘의 권리는 각 원본 프로젝트의 자산 기록을 따른다. 아래 출처 확인은 제3자 자산 전체의 권리 검증을 대신하지 않는다.

| 현재 파일(`public/detail/current/`) | 원본 | 실제 픽셀 크기 |
| --- | --- | --- |
| `gijunseon-home.png` | Figma `3ZJ4TUGqBNAewsJYzheOWo`, `451:747` | 1440×1824 |
| `seolbigyeol-home.png` | Figma `GInxTqHo6Y87DEe3vuhmMw`, `336:229` | 1440×1200 |
| `seolbigyeol-requests.png` | 같은 파일, `336:329` | 1440×1200 |
| `seolbigyeol-review.png` | 같은 파일, `372:361` | 1440×1200 |
| `soyobit-home.png` | Figma `cvfT9QazAFaXVAxZfeUdvr`, `1289:674` | 390×1038 |
| `soyobit-menu.png` | 같은 파일, `1289:708` | 390×980 |
| `onjeongryu-home.png` | Figma `bzwp6FhsZaaenOA4ABIAFs`, `671:797` | 390×1084 |
| `onjeongryu-station.png` | 같은 파일, `673:1314` | 390×900 |
| `goreunsiseon-home.jpg` | 공개 `/portfolio-feedback-hub/` 실제 첫 화면 | 1348×926 |
| `jansang-home.jpg` | 공개 `/ott-service/` 실제 첫 화면 | 1348×926 |

Figma 화면 8개는 텍스트·이미지를 재생성하지 않은 직접 export다. 웹 2개는 CSS viewport 1363×936에서 저장한 JPEG이며 viewport와 저장 픽셀 크기는 다르다. 당시 갈피록 PC 이미지 4개는 기존 실제 캡처를 재사용했다. 2026-10-16 이후 갈피록의 현재 참조는 이 문서 상단의 새 7개 캡처 기록을 따른다. 당시 모든 신규 이미지의 형식·실제 디코딩을 확인했다.

메인 글꼴은 기존 `@sun-typeface/suit`의 SUIT Variable(SIL OFL 1.1)만 번들링한다. 이전 Google Fonts 링크는 현행 index에서 사용하지 않는다. favicon은 기존 자체 SVG의 색상만 현행 팔레트로 바꿨다. 상단 표의 과거 runtime active/일치 기록은 기록 시점에만 적용되며 현재 사용 여부는 프로젝트 코드가 우선한다.

## 2026-10-07 포트폴리오 표지 구성

`HeroSection.jsx` 및 `ProjectCover.jsx`는 위에 등록된 실제 Figma export와 웹 캡처를 CSS로 배치한 구성이다. 새 외부 사진·이미지·서체를 추가하지 않았다. 표지에는 소개용 크롭·회전·겹침을 사용하며, 상세 페이지에서 원본을 볼 수 있다. 코드로 구성한 워드마크 기하 도형과 배경 선은 이번 작업에서 작성했다.

## 2026-10-07 이름·작업 중심 리파인

첫 화면의 부드러운 사선 그림자는 CSS gradient·blur로 작성했다. 첨부 레퍼런스 이미지를 배경 자산으로 복사하지 않았다. 동일한 기존 프로젝트 캡처를 수평 프레임에 배치하며 상시 회전·겹침은 쓰지 않는다. 헤더와 `public/favicon.svg`는 이번에 직접 작성한 단순 D 형태(둥근 사각 배경과 한 개의 evenodd path)를 함께 사용한다. 과거 Figma D2 마크와 현행 마크는 다르며 Figma 파일은 수정하지 않았다. 신규 외부 이미지·서체·아이콘 라이브러리는 추가하지 않았다.
