# 작업 폴더와 복구 안내

2026-11-06에 현재 공개 저장소의 main을 기준으로 작업 폴더와 Git 기록을 통합했습니다. 공개 URL은 유지하며 lecture1 구조 안에서 작품 이름을 정리했습니다.

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
