# 김도한 포트폴리오 작업공간

기존 웹 작품과 공통 포트폴리오의 수정·검수·Git 기록·GitHub Pages 배포를 이 저장소에서 관리합니다. 실제 작품 폴더는 lecture1입니다.

전체 작업실은 `D:\Archive\my_ai_web`입니다. 새 독립 AI 작품은 상위 ai-projects, 디자인 원본은 design-resources, 이전 버전은 backups에서 관리합니다. 현재 웹 작품은 이 저장소에서 계속 작업합니다.

로컬 작업 위치: `D:\Archive\my_ai_web\portfolio-workspace`

현재 저장소: [dohan-portfolio](https://github.com/kdhan0320-bot/dohan-portfolio) · [공통 포트폴리오](https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/)

최신 복구용 코드는 [현재 작업 백업](https://github.com/kdhan0320-bot/dohan-portfolio/tree/backup/current-workspace)에서 확인합니다. 전체 로컬 작업실의 백업 범위와 과거 백업 구분은 [백업 안내](docs/workspace-migration.md)를 따릅니다.

## 작품 폴더

| 폴더 | 작품 | 역할 | 공개 주소 |
| --- | --- | --- | --- |
| [lecture1/portfolio](lecture1/portfolio/README.md) | 공통 포트폴리오 | 웹·UI 디자인 소개, 작품 상세, 확인된 본인 기여 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/) |
| [lecture1/pumuiseon](lecture1/pumuiseon/README.md) | 품의선 | 구매 요청·결재·발주·입고·지급을 연결하는 브라우저 저장 시연 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/pumuiseon/) |
| [lecture1/galpirok](lecture1/galpirok/README.md) | 갈피록 | 입사지원 현황·마감일·준비·면접 기록 관리 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/galpirok/) |
| [lecture1/jansang-cinema](lecture1/jansang-cinema/README.md) | 잔상관 | 가상 단편영화 탐색·찜·메모 보관 시연 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/jansang-cinema/) |
| [lecture1/gijunseon](lecture1/gijunseon/README.md) | 기준선 | Figma 기반 산업용 비전 검사 기업 웹퍼블리싱 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/gijunseon/) |
| [lecture1/mini-sns](lecture1/mini-sns/README.md) | Mini SNS | 게스트·메모리 상태로 동작하는 SNS 학습 기록 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/mini-sns/) |
| [lecture1/gongjeongbom](lecture1/gongjeongbom/README.md) | 공정봄 | 검사 제품 탐색·비교·문의 흐름 실험작 · 포트폴리오 미편입 | [보기](https://kdhan0320-bot.github.io/dohan-portfolio/gongjeongbom/) |

설비결·온정류·소요빛 등 Figma 작품의 웹 소개는 공통 포트폴리오 안에 있습니다. 폴더 이름과 기존 공개 URL은 서로 다를 수 있으며 위 표가 현재 대응 관계입니다.

## 실행

Node.js 24 LTS를 기준으로 관리합니다. React 작품은 해당 폴더에서 실행합니다.

```powershell
cd lecture1/portfolio
npm ci
npm run dev -- --host 127.0.0.1
```

잔상관·기준선·공정봄은 각 폴더에서 정적 서버를 실행합니다. HTML을 더블클릭하는 방식 대신 서버 주소로 확인합니다.

```powershell
cd lecture1/jansang-cinema
python -m http.server 4178 --bind 127.0.0.1
```

## 수정과 배포

1. 작업 시작 시 이 루트에서 Git 원격·브랜치·작업 상태를 확인합니다. origin은 kdhan0320-bot/dohan-portfolio입니다.
2. 해당 작품만 수정하고 npm run lint, npm run build, 관련 기존 테스트와 브라우저 검수를 실행합니다.
3. 원격의 다른 수정과 충돌이 없는지 확인한 뒤 승인된 작업을 main에 커밋·푸시합니다.
4. Deploy to GitHub Pages 워크플로 완료와 공개 주소를 확인합니다. 폴더명 변경으로 공개 URL을 바꾸지 않습니다.

GitHub Actions는 네 React 작품을 npm ci로 설치하고 lint·build·기존 업무 규칙 테스트 후 게시합니다. 잔상관·기준선·공정봄은 정적 파일을 게시합니다. 공정봄은 독립 주소로만 공개하며 공통 포트폴리오 작품 목록에는 추가하지 않습니다.

## 자료 위치

직접 만드는 작업 사본과 검수 출력은 현재 D드라이브 작업실에 둡니다. 자동 검수 출력은 tools/site-audit-kit/audit-output, 보존할 검수 자료는 review를 사용합니다. C드라이브의 과거 임시 경로를 다시 작업 위치로 사용하지 않습니다.

- [현재 색상 기준](docs/design/포트폴리오-색상-기준.md)과 [이전 PiCKCARE 참고 원문](docs/references/PiCKCARE-팔레트-원문-20260608.md)
- [검수 도구](tools/site-audit-kit/README.md): Playwright 실행·캡처·결과 정리
- [이전 검수 캡처](review/README.md): 코드와 분리한 화면·결과 기록
- 각 작품의 docs/HISTORY.md: 기존 제작 이력·기여 설명·검증 범위
- [이름 변경과 복구 안내](docs/workspace-migration.md)
- [클로드 교차 검토 방법과 요청문](docs/cross-review.md)

로컬 백업은 작업 폴더 밖의 `D:\Archive\my_ai_web\backups`에 보관합니다. node_modules·dist는 재생성 자료이며 Git에 넣지 않습니다. package-lock.json은 설치 재현을 위해 Git에 보관합니다. .env 및 .claude 로컬 설정은 공개하지 않습니다.
