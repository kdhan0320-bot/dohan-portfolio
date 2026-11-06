# 갈피록

입사지원 현황·마감일·준비·면접 기록 관리입니다.

[공개 사이트](https://kdhan0320-bot.github.io/dohan-portfolio/jobflow-dashboard/)

## 실행과 검사

이 작품 폴더에서 실행합니다.

```powershell
npm ci
npm run dev -- --host 127.0.0.1
npm run lint
npm run build
```

기존 업무 규칙 테스트: `node --test tests/*.test.mjs`

## 파일 안내

- src: 현재 화면과 동작 코드
- public: 주소로 제공되는 이미지·글꼴
- package-lock.json: 설치 버전 기록
- dist: 빌드 결과, 직접 수정하지 않음

샘플 체험과 계정 모드를 구분합니다. 계정 기능은 기존 Supabase 환경설정이 필요하며, 이번 폴더 정리에서는 실제 계정이나 DB를 변경하지 않았습니다.

## 제작 이력과 근거

[기존 제작 이력과 검증 범위](docs/HISTORY.md)에 이전 README를 보존했습니다. 당시 기록과 현재 상태는 구분해서 읽습니다. [작업공간 안내](../../README.md)에서 폴더·공개 주소·배포 절차를 확인할 수 있습니다.
