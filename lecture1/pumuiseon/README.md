# 품의선

구매 요청·결재·발주·입고·지급을 연결하는 브라우저 저장 시연입니다.

[공개 사이트](https://kdhan0320-bot.github.io/dohan-portfolio/portfolio-feedback-hub/)

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

품의선의 시작점은 src/main.jsx → src/procurement/ProcurementApp.jsx입니다. 이전 커뮤니티 앱 코드는 백업 후 정리했습니다. 실제 AI·권한 인증·결재 서버·업체 주문·DB에 연결하지 않는 브라우저 저장 시연입니다.

## 제작 이력과 근거

[기존 제작 이력과 검증 범위](docs/HISTORY.md)에 이전 README를 보존했습니다. 당시 기록과 현재 상태는 구분해서 읽습니다. [작업공간 안내](../../README.md)에서 폴더·공개 주소·배포 절차를 확인할 수 있습니다.
