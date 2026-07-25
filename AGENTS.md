# Dohan AI Workspace — Agent Rules

이 파일은 `C:\work\my_ai_web` 전체에 적용되는 공통 운영 기준이다. 프로젝트별 목적, 구조, 명령, 디자인 세부 기준은 각 프로젝트의 `README.md`와 기존 문서에서 관리한다.

## 역할과 언어

- 모든 사용자 응답과 작업 보고는 한국어로 작성한다. 코드, 명령, 경로, 파일명처럼 필요한 부분만 영어를 사용한다.
- 사용자는 Product Owner이며 범위, 승인 디자인, 공개 여부, 배포 여부를 최종 결정한다.
- 한 작업에는 하나의 핵심 목표를 두고, 요청 범위를 불필요하게 확장하지 않는다.

## 작업 보호와 진행

- 작업 시작과 종료 시 branch, HEAD, `git status`를 확인한다.
- 사용자가 이미 만든 수정, unstaged WIP, untracked 파일을 임의로 되돌리거나 덮어쓰거나 정리하지 않는다.
- 요청과 관계없는 파일을 포맷하거나 수정하지 않는다. 다른 작업자의 변경으로 보이는 내용도 사용자 승인 없이 제거하지 않는다.
- 사용자가 목표, Source of Truth, 변경 허용 범위와 성공 기준을 정한 뒤에는 허용 범위 안의 읽기·검색·수정, lint, build, 관련 test와 브라우저 검사를 사소한 단계마다 다시 묻지 않고 수정부터 최종 검사까지 수행한다.
- 단, 이 문서에 명시된 승인 필수 작업이 필요하면 중단하고 승인받는다.

## Source of Truth

- 디자인은 사용자가 승인한 현재 Figma node/version/export를 기준으로 한다.
- 코드는 현재 local working tree를 기준으로 한다.
- 현재 실제 파일과 Git·배포·DB 상태가 과거 보고서, 스크린샷, 문서보다 우선한다.
- 테스트가 승인 디자인과 충돌하면 테스트 통과만을 위해 디자인을 임의 변경하지 않는다.
- Figma와 다르게 구현해야 하면 차이, 이유, 사용자 영향, 승인 여부를 명확히 기록한다.

## 승인과 보안

- 기존 파일·자산·문서·폴더의 삭제, 이동, rename은 사용자 승인이 필요하다.
- commit, push, PR, merge, deploy는 사용자 승인이 필요하다.
- package·lockfile, workflow(CI/CD), DB·migration, secret 관련 변경은 사용자 승인이 필요하다.
- checkout, switch, restore, stash, reset, rebase, clean, cherry-pick, branch 생성·삭제는 사용자 승인이 필요하다.
- `git status`, `diff`, `log`, `show`, `branch` 조회 등 읽기 전용 Git 명령은 승인 없이 사용할 수 있다.
- `.env*`, `_private/**`, token, secret 값은 읽거나 출력하거나 기록하지 않는다. 필요한 경우 값의 존재 여부만 확인한다.

## 구현과 검사

- 기존 코드 패턴, package script, 설정, 자산을 우선 재사용한다. UI 검사는 기존 `tools/site-audit-kit`을 우선 사용한다.
- 구현 회차에서는 Figma 디자인을 수정하지 않는다. Figma 변경이 필요하면 구현 회차와 분리된 디자인 수정 회차로 진행한다.
- 실제 프로젝트 자산을 Figma media frame에 배치하고, 실제 자산을 가짜 placeholder UI로 대체하지 않는다.
- 새 protocol, RUN 폴더, ZIP·report 생성 체계, skill, agent 체계를 임의로 만들지 않는다. 이미 존재하는 `site-audit-kit`의 ZIP, review, capture 기능은 작업에 필요하거나 사용자가 요청한 경우 재사용할 수 있다.
- 작업 위험에 맞춰 필요한 lint, build, 관련 test와 필요한 viewport만 검사한다.
- 반응형 기준은 CSS viewport이며, 물리 모니터 해상도나 Windows 배율과 혼동하지 않는다.
- 실행하지 않은 검사나 확인하지 않은 기능을 PASS로 보고하지 않는다.
- UI 완료는 자동 검사 통과와 수동 시각 검토를 구분해 판단한다. 실제 로드된 폰트와 자산을 사용한 browser native-size PNG를 확인하고, 승인 Figma와 주요 geometry·bounding box·텍스트·overflow·clip을 비교한다.
- demo, mock, static, 브라우저 메모리 전용 동작과 실제 API·DB 연동을 구분해 설명한다.

## 반복 방지와 중단 조건

- 새 오류, 새 변경 또는 새 근거가 없으면 같은 검색, 명령, 검사를 반복하지 않는다.
- 이미 확인한 사실을 다른 도구나 agent로 이유 없이 다시 조사하지 않는다.
- 성공한 명령은 명령명과 결과를 간단히 보고하고, 실패한 명령만 핵심 오류를 제시한다.
- 목표나 승인 디자인이 서로 충돌하거나, 승인 필수 작업이 필요하거나, 같은 핵심 문제를 두 번 수정해도 해결되지 않을 때만 사용자에게 질문하거나 작업을 중단한다.
- 기존 코드 패턴으로 판단 가능한 사소한 구현 선택은 질문하지 않는다.

## 최종 보고

1. 변경한 파일
2. 핵심 변경 내용
3. 실제 실행한 검사와 결과
4. 남은 차이와 확인 불가 사항
5. branch·HEAD·최종 status
6. commit·push·deploy 여부

검증 범위를 넘는 “완벽”, “100% 동일”, “문제 없음” 표현을 사용하지 않는다.
