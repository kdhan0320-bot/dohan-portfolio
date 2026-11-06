# 작업 폴더와 복구 안내

2026-11-06에 현재 공개 저장소의 main을 기준으로 작업 폴더와 Git 기록을 통합했습니다. 공개 URL은 유지하며 lecture1 구조 안에서 작품 이름을 정리했습니다.

## 현재 백업 기준

- 현재 작업·배포 코드: main 브랜치. 로컬의 portfolio-workspace와 비교해 최신 여부를 확인합니다.
- 최신 GitHub 백업: [backup/current-workspace](https://github.com/kdhan0320-bot/dohan-portfolio/tree/backup/current-workspace). 검수된 main과 같은 커밋으로 생성·갱신합니다.
- 최신 작업실 파일 백업: D:\Archive\my_ai_web\backups\current-workspace. 기존 웹 작품뿐 아니라 ai-projects·design-resources·상위 작업 안내를 함께 보관합니다. BACKUP-INFO.json에서 기준 커밋·파일 수·제외 항목을 확인합니다.
- 날짜가 붙은 기존 백업 브랜치와 폴더는 과거 복구용입니다. 최신 작업 위치로 사용하지 않습니다.

최신 백업은 파일을 바꿀 때마다 자동 동기화되는 폴더가 아닙니다. 작업 완료 후 현재 원본을 기준으로 복사·검증하고 갱신합니다. 이전 최신 백업에만 남은 파일을 확인하기 전에는 덮어쓰거나 일괄 삭제하지 않습니다. node_modules·dist·캐시·자동 검수 출력·로그와 중첩 backups·.git은 최신 파일 사본에서 제외합니다. Git 기록은 원격 main과 백업 브랜치에 보존합니다. .env·로컬 도구 설정은 로컬 사본으로만 보존하고 내용은 읽거나 공개하지 않습니다.

GitHub 백업은 이 저장소의 추적 파일 범위입니다. 상위 ai-projects·design-resources·공통 안내가 GitHub에 자동 포함되는 것은 아니며, 이 자료는 최신 로컬 작업실 백업에 포함합니다.

## 이전 정리 기록

| 이전 폴더 | 현재 폴더 |
| --- | --- |
| my-portfolio | lecture1/portfolio |
| my-community | lecture1/pumuiseon |
| jobflow-dashboard | lecture1/galpirok |
| OTT Service | lecture1/jansang-cinema |
| mini_sns | lecture1/mini-sns |
| gijunseon | lecture1/gijunseon |
| gongjeongbom | lecture1/gongjeongbom |

작업 위치: `D:\Archive\my_ai_web\portfolio-workspace`

로컬 백업: `D:\Archive\my_ai_web\backups`

- 2026-11-06-initial-migration: 이전 D드라이브 자료와 C드라이브 작업 사본·검수 기록
- 2026-11-06-before-reorganization/workspace: 이번 구조 변경 직전 자료와 이전 저장소 기록
- 2026-11-06-before-reorganization/retired-code: 실행·빌드·테스트에서 연결되지 않은 코드와 옛 이미지

변경 전 GitHub 복구 지점: backup/workspace-before-reorganization-20261106, 기준 6612c0f. 최신 배포를 복구할 때 다른 작업의 커밋을 덮어쓰지 않도록 현재 원격 상태를 확인합니다. 원본 .env와 로컬 도구 설정은 값 확인 없이 보존했으며 Git에는 포함하지 않습니다.

이전 C드라이브의 sources와 프로젝트 AGENTS.md는 ChatGPT 동기화 참고자료입니다. 이를 작업 원본으로 변경하거나 삭제하지 않습니다.

정리한 파일은 89개 코드·스타일과 품의선의 옛 이미지 7개입니다. npm 설치용 의존성 5개는 품의선의 현재 실행 코드에서 사용되지 않아 제거했습니다. 현재 사용자 화면·공개 주소·DB 스키마를 변경하는 작업은 아닙니다.

## 정리 후 확인

- 네 React 작품의 lint·production build 통과. 갈피록의 기존 react-refresh 경고 1개, Mini SNS의 기존 경고 9개와 큰 번들 경고는 남아 있습니다.
- 품의선·갈피록의 기존 업무 규칙 테스트 통과.
- 기존에 유지하는 설치 패키지의 버전 변경 없음. 품의선은 직접 의존성 5개와 관련 하위 설치 패키지가 줄었습니다.
- PC 1440·모바일 390에서 24개 화면과 홈 14개 폭: 62개 화면 검사 통과. 7개 표지·샘플·게스트 동작 검사 통과. 검사 중 HTTP 오류·페이지 실행 예외·가로 넘침·깨진 이미지 없음.
- 홈·소개·품의선·설비결·잔상관·기준선 캡처를 별도로 시각 확인했습니다. 새 폴더 구조에 따른 주요 화면의 누락이나 잘림을 확인하지 못했습니다. 승인 Figma와의 전체 재대조나 계정·실제 DB 쓰기 테스트를 수행한 것은 아닙니다.
- 현재 README와 색상 기준 문서의 로컬 링크 확인 완료. 과거 제작 이력의 내용은 당시 기록이며 현재 작업 기준과 구분합니다.
- 검수 재실행: tools/site-audit-kit/README.md. 원본 결과·화면은 같은 도구의 audit-output/workspace-reorganization에 있으며 Git에서 제외합니다.

## 별도 C드라이브 사본 정리

2026-11-06에 C:\work와 C:\Work_repo-audit를 보관한 뒤 삭제했습니다. 복구 위치는 D:\Archive\my_ai_web\backups\2026-11-06-retired-c-work입니다. work에 670개 파일, repo-audit에 52개 파일을 보존했으며 일반 파일의 내용과 로컬 설정의 존재·크기를 대조했습니다. 두 Git 저장소의 무결성 검사도 통과했습니다. 긴 경로가 있는 이전 Git을 검사할 때는 core.longpaths=true 옵션을 사용합니다. 재설치·재생성이 가능한 의존성·빌드·캐시·로그는 제외했으며 상세 목록은 해당 백업의 verification.json에 있습니다.

## 과거 임시 자료 정리

2026-11-06에 C:\tmp와 C:\Users\user\Documents\Codex를 확인했습니다. 실행 중 프로그램·활성 작업의 경로, 파일 열림 상태, 재검사 중 변경 여부를 확인한 뒤 과거 자료만 정리했습니다. 현재 작품 코드와 D드라이브 검수 자료는 유지했습니다.

- 일반 자료 16,302개를 최신 작업본·기존 D드라이브 백업과 내용으로 대조했습니다. 이 중 2,250개는 최신 작업본과 동일했습니다.
- 3,653개는 기존 D드라이브 백업에 동일 내용이 있었고, 6,599개는 다른 과거 임시 파일과 같아 중복 보관을 줄였습니다.
- 고유 파일 6,031개와 내용 확인 없이 보존한 로컬 설정 19개를 backups/2026-11-06-c-temp-review/preserved에 추가 보관했습니다. 비교 목록의 target 경로가 각 원본의 실제 보관 위치입니다.
- 보관본과 참조 파일을 검증한 뒤 과거 자료와 재생성 가능한 캐시·의존성 파일 59,073개를 제거했습니다. C:\tmp는 비워진 뒤 삭제했고 Documents\Codex의 빈 날짜 폴더 4개를 제거했습니다.
- 앱에서 사용하는 Documents\Codex 상위 폴더, 앱 설정·인증정보·캐시 및 ChatGPT 동기화 참고자료는 유지했습니다.

기록과 복구 안내는 D:\Archive\my_ai_web\backups\2026-11-06-c-temp-review의 보관 안내.txt, comparison.json, cleanup-result.json에 있습니다. 이 자료는 과거 참고용이며 현재 실행 프로젝트 위에 일괄 덮어쓰지 않습니다.
