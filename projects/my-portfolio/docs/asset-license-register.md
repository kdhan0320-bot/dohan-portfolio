# 자산 라이선스 등록부

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
| IBM Plex Sans KR / IBM Plex Mono | 폰트 | fonts.googleapis.com (Google Fonts, `index.html` CDN `<link>`); 원본은 IBM Plex 공식 저장소 | IBM | SIL Open Font License 1.1 | 가능 | 가능(OFL 조건 준수) | 불필요(단순 웹 사용 시 제작자 표시를 강제하는 라이선스는 아님. 폰트 파일을 재배포할 경우 OFL 및 저작권 고지 유지 필요) | 2026-07-20 | 확인함 — 제작자 IBM, 공식 IBM Plex 저장소 기준 SIL Open Font License 1.1을 확인했다. 실제 프로젝트는 폰트 파일을 저장소에 포함하지 않고 Google Fonts CDN으로 로드한다. |
| `@mui/icons-material` (Material Icons) | 아이콘(코드 패키지) | npm 패키지, `node_modules/@mui/icons-material/package.json` | MUI(Material UI) | MIT | 가능 | 가능 | 불필요 | 2026-07-19 | 확인함 — `package.json`의 `"license": "MIT"` 필드와 패키지 내 `LICENSE` 파일 존재를 직접 확인했다. |
| `public/favicon.svg` | 이미지(favicon) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/jobflow-thumb.svg` | 이미지(썸네일) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/thumbnails/bus-arrival-ui-thumbnail.png` | 이미지(썸네일) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/thumbnails/community-feedback-hub.svg` | 이미지(썸네일) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/thumbnails/minisns-worklog.svg` | 이미지(썸네일) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| `public/thumbnails/ott-service.png` | 이미지(썸네일) | 저장소 내 프로젝트 자체 제작 자산 | 김도한(직접 제작 또는 AI/Figma 보조) | 외부 라이선스 해당 없음 | 가능 | 가능 | 불필요 | 2026-07-20 | 확인함 — 사용자가 프로젝트를 위해 직접 제작하거나 AI/Figma 보조로 생성했고, 외부 이미지·템플릿·회사 로고·브랜드 자산을 무단 사용하지 않았다고 확인했다. |
| SUIT Variable | 폰트 | npm 패키지 `@sun-typeface/suit`(공식 저장소 `github.com/sun-typeface/SUIT`), `node_modules/@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.{css,woff2}`를 `src/main.jsx`에서 import(런타임 CDN 아님) | SUNN(sun.fo) | SIL Open Font License 1.1 | 가능 | 가능(OFL 조건 준수) | 불필요(OFL은 단순 사용 시 표시를 강제하지 않음. 폰트 파일 재배포 시 OFL 및 저작권 고지 유지 필요) | 2026-07-21 | 확인함 — `node_modules/@sun-typeface/suit/LICENSE`(SIL OFL 1.1 전문)와 `package.json`의 `"license": "OFL-1.1"` 필드를 직접 확인했다. variable WOFF2 1개 파일만 사용하며 다른 weight/포맷 파일은 import하지 않는다. |
| Noto Sans KR | 폰트 | fonts.googleapis.com (Google Fonts, `index.html` CDN `<link>`, weight 400/500/700만 로드); 원본은 Noto CJK 공식 저장소(`github.com/notofonts/noto-cjk`) | Google(Noto 프로젝트) | SIL Open Font License 1.1 | 가능 | 가능(OFL 조건 준수) | 불필요(단순 웹 사용 시 제작자 표시를 강제하는 라이선스는 아님. 폰트 파일을 재배포할 경우 OFL 및 저작권 고지 유지 필요) | 2026-07-23 | 확인함 — `github.com/notofonts/noto-cjk`의 `Sans/LICENSE` 파일 원문(SIL Open Font License, Version 1.1)을 직접 확인했다. Human Signal Phase 5A-F에서 `/projects` 페이지 전용 Figma typography로 추가했고, 폰트 파일을 저장소에 포함하지 않고 Google Fonts CDN으로 로드한다. |

| Photo / Brewstep Latte | 제품 사진 | https://www.pexels.com/photo/artistic-latte-on-marble-table-in-cafe-setting-28976618/ | Esra Afşar | Pexels License | 가능 | 가능(비파괴 crop·밝기·색온도 조정) | 불필요; 자발적 기록 | 2026-07-29 | 확인함 — 사용자 제공 BREWSTEP Asset & Rights 기록의 Source·Creator·License·Verified를 대조했다. 제품 상세 export 안에 사용하며 상표·보증 표시에 사용하지 않는다. |
| Photo / Iced Latte | 제품 사진 | https://www.pexels.com/photo/refreshing-iced-coffee-with-ice-cubes-32078317/ | Esra Afşar | Pexels License | 가능 | 가능(비파괴 crop·밝기·색온도 조정) | 불필요; 자발적 기록 | 2026-07-29 | 확인함 — 사용자 제공 BREWSTEP Asset & Rights 기록을 대조했다. 현재 참조 export의 직접 원본으로 단정하지 않고 승인 사진 기록으로만 보존한다. |
| Photo / Cherry Crumble | 제품 사진 | https://www.pexels.com/photo/delicious-cherry-crumble-cake-slice-on-plate-34202448/ | Esra Afşar | Pexels License | 가능 | 가능(비파괴 crop·밝기·색온도 조정) | 불필요; 자발적 기록 | 2026-07-29 | 확인함 — 사용자 제공 BREWSTEP Asset & Rights 기록을 대조했다. 현재 참조 export의 직접 원본으로 단정하지 않고 승인 사진 기록으로만 보존한다. |
| Photo / Butter Croissant | 제품 사진 | https://www.pexels.com/photo/delicious-breakfast-croissant-with-coffee-33565678/ | Esra Afşar | Pexels License | 가능 | 가능(비파괴 crop·밝기·색온도 조정) | 불필요; 자발적 기록 | 2026-07-29 | 확인함 — 사용자 제공 BREWSTEP Asset & Rights 기록을 대조했다. 현재 참조 export의 직접 원본으로 단정하지 않고 승인 사진 기록으로만 보존한다. |

## 현재 source가 참조하는 신규 이미지 49개

아래 표는 현재 source가 참조하는 미추적 이미지 49개만을 정확한 경로로 등록한다.
BREWSTEP 항목에서 `Figma export`는 사용자가 제작한 화면 export 권리를 뜻하고,
화면 안 제품 사진의 권리는 위 Pexels 원본 행과 별도로 적용한다. 현재 참조된
제품 상세 export에서 확인되는 Latte 사진은 `Photo / Brewstep Latte` 원본을 쓴다.

| 정확한 경로 | 분류 | origin 또는 derivative source | 사용 화면 | 권리 근거·상태 |
| --- | --- | --- | --- | --- |
| `public/detail/brewstep/decision-01-1024-a.png` | Figma export | BREWSTEP 승인 Decisions 1024 node `598:698–703`의 직접 export | BREWSTEP Decision 01 | 사용자 제작 Figma 화면; 제품 사진이 보이는 경우 Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/decision-01-1024-b.png` | Figma export | BREWSTEP 승인 Decisions 1024 node `598:698–703`의 직접 export | BREWSTEP Decision 01 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-01-1440-a.png` | Figma export | BREWSTEP 승인 Decisions 1440 node `598:687–692`의 직접 export | BREWSTEP Decision 01 | 사용자 제작 Figma 화면; 제품 사진이 보이는 경우 Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/decision-01-1440-b.png` | Figma export | BREWSTEP 승인 Decisions 1440 node `598:687–692`의 직접 export | BREWSTEP Decision 01 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-01-390-a.png` | Figma export | BREWSTEP 승인 Decisions 390 node `598:709–714`의 직접 export | BREWSTEP Decision 01 | 사용자 제작 Figma 화면; 제품 사진이 보이는 경우 Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/decision-01-390-b.png` | Figma export | BREWSTEP 승인 Decisions 390 node `598:709–714`의 직접 export | BREWSTEP Decision 01 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-02-1024-a.png` | Figma export | BREWSTEP 승인 Decisions 1024 node `598:698–703`의 직접 export | BREWSTEP Decision 02 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-02-1024-b.png` | Figma export | BREWSTEP 승인 Decisions 1024 node `598:698–703`의 직접 export | BREWSTEP Decision 02 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-02-1440-a.png` | Figma export | BREWSTEP 승인 Decisions 1440 node `598:687–692`의 직접 export | BREWSTEP Decision 02 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-02-1440-b.png` | Figma export | BREWSTEP 승인 Decisions 1440 node `598:687–692`의 직접 export | BREWSTEP Decision 02 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-02-390-a.png` | Figma export | BREWSTEP 승인 Decisions 390 node `598:709–714`의 직접 export | BREWSTEP Decision 02 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-02-390-b.png` | Figma export | BREWSTEP 승인 Decisions 390 node `598:709–714`의 직접 export | BREWSTEP Decision 02 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-03-1024-a.png` | Figma export | BREWSTEP 승인 Decisions 1024 node `598:698–703`의 직접 export | BREWSTEP Decision 03 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-03-1024-b.png` | Figma export | BREWSTEP 승인 Decisions 1024 node `598:698–703`의 직접 export | BREWSTEP Decision 03 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-03-1440-a.png` | Figma export | BREWSTEP 승인 Decisions 1440 node `598:687–692`의 직접 export | BREWSTEP Decision 03 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-03-1440-b.png` | Figma export | BREWSTEP 승인 Decisions 1440 node `598:687–692`의 직접 export | BREWSTEP Decision 03 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-03-mobile-wide-a.png` | Figma export | BREWSTEP 승인 Decisions 390 node `598:709–714`에서 모바일 wide evidence로 직접 export | BREWSTEP Decision 03 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/decision-03-mobile-wide-b.png` | Figma export | BREWSTEP 승인 Decisions 390 node `598:709–714`에서 모바일 wide evidence로 직접 export | BREWSTEP Decision 03 | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/detail-hero-desktop-1024.png` | Figma export | BREWSTEP Product Detail 1440 승인 node `598:696`의 직접 export | BREWSTEP Hero 1024 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/detail-hero-desktop-1440.png` | Figma export | BREWSTEP Product Detail 1440 승인 node `598:685`의 직접 export | BREWSTEP Hero 1440 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/detail-hero-desktop-390.png` | Figma export | BREWSTEP Product Detail 1440 승인 node `598:707`의 직접 export | BREWSTEP Hero 390 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/detail-hero-mobile-1024.png` | Figma export | BREWSTEP Product Detail 390 승인 node `598:697`의 직접 export | BREWSTEP Hero 1024 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/detail-hero-mobile-1440.png` | Figma export | BREWSTEP Product Detail 390 승인 node `598:686`의 직접 export | BREWSTEP Hero 1440 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/detail-hero-mobile-390.png` | Figma export | BREWSTEP Product Detail 390 승인 node `598:708`의 직접 export | BREWSTEP Hero 390 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/main-1024-detail.png` | Figma export | BREWSTEP Main Screens 1024 node `598:704–706`의 직접 export | BREWSTEP Review & Pay | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/main-1024-mobile.png` | Figma export | BREWSTEP Main Screens 1024 node `598:704–706`의 직접 export | BREWSTEP Product Detail 390 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/main-1024-primary.png` | Figma export | BREWSTEP Main Screens 1024 node `598:704–706`의 직접 export | BREWSTEP Product Detail 1440 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/main-1440-detail.png` | Figma export | BREWSTEP Main Screens 1440 node `598:693–695`의 직접 export | BREWSTEP Review & Pay | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/main-1440-mobile.png` | Figma export | BREWSTEP Main Screens 1440 node `598:693–695`의 직접 export | BREWSTEP Product Detail 390 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/main-1440-primary.png` | Figma export | BREWSTEP Main Screens 1440 node `598:693–695`의 직접 export | BREWSTEP Product Detail 1440 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/main-390-detail.png` | Figma export | BREWSTEP Main Screens 390 node `598:715–717`의 직접 export | BREWSTEP Review & Pay | 사용자 제작 Figma 화면. 확인함 |
| `public/detail/brewstep/main-390-mobile.png` | Figma export | BREWSTEP Main Screens 390 node `598:715–717`의 직접 export | BREWSTEP Product Detail 390 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/brewstep/main-390-primary.png` | Figma export | BREWSTEP Main Screens 390 node `598:715–717`의 직접 export | BREWSTEP Product Detail 1440 | 사용자 제작 Figma 화면; Latte Pexels 권리는 별도 행 적용. 확인함 |
| `public/detail/gongjeongbom/compare-1440.png` | browser screenshot | `projects/gongjeongbom/compare.html`의 실제 브라우저 캡처 | 공정봄 Compare | 사용자 제작 프로젝트 UI 캡처; 외부 사진·회사 로고 없음. 확인함 |
| `public/detail/gongjeongbom/home-1440.png` | browser screenshot | `projects/gongjeongbom/index.html`의 실제 브라우저 캡처 | 공정봄 Home 1440 | 사용자 제작 프로젝트 UI 캡처; 외부 사진·회사 로고 없음. 확인함 |
| `public/detail/gongjeongbom/home-390.png` | browser screenshot | `projects/gongjeongbom/index.html`의 실제 브라우저 390px 캡처 | 공정봄 Home 390 | 사용자 제작 프로젝트 UI 캡처; 외부 사진·회사 로고 없음. 확인함 |
| `public/detail/gongjeongbom/inquiry-1440.png` | browser screenshot | `projects/gongjeongbom/inquiry.html`의 실제 브라우저 캡처 | 공정봄 Inquiry | 사용자 제작 프로젝트 UI 캡처; 외부 사진·회사 로고 없음. 확인함 |
| `public/detail/gongjeongbom/product-1440.png` | browser screenshot | `projects/gongjeongbom/product.html`의 실제 브라우저 캡처 | 공정봄 Product Detail | 사용자 제작 프로젝트 UI 캡처; 외부 사진·회사 로고 없음. 확인함 |
| `public/detail/gongjeongbom/products-1440.png` | browser screenshot | `projects/gongjeongbom/products.html`의 실제 브라우저 캡처 | 공정봄 Products | 사용자 제작 프로젝트 UI 캡처; 외부 사진·회사 로고 없음. 확인함 |
| `public/detail/seolbiit-completion-flow.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 완료·재점검 node `27:38` 직접 export | 설비잇 Completion Flow | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-cover.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, Cover node `91:16` 직접 export | 설비잇 Cover·카드 | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-desktop-management.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 데스크톱 관리 node `24:43` 직접 export | 설비잇 Desktop Management | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-error-states.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 오류·빈 상태 node `29:38` 직접 export | 설비잇 Error States | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/detail/seolbiit-mobile-flow.png` | Figma export | 설비잇 원본 Figma `GInxTqHo6Y87DEe3vuhmMw`, 모바일 흐름 node `19:2` 직접 export | 설비잇 Mobile Flow | 사용자 제작 Figma 화면; 외부 이미지·로고·아이콘 추가 없음. 확인함 |
| `public/thumbnails/normalized/brewstep-card-1600x1000.png` | normalized derivative | `public/detail/brewstep/main-1440-primary.png`의 1600×1000 카드용 정규화 파생본 | Projects BREWSTEP card | 원 Figma export 권리 + Latte Pexels 권리 적용. 확인함 |
| `public/thumbnails/normalized/bus-arrival-card-1600x1000.png` | normalized derivative | 등록된 `public/thumbnails/bus-arrival-ui-thumbnail.png`의 1600×1000 카드용 정규화 파생본 | Home·Projects Bus card | 사용자 제작 Figma composite의 crop/pad 파생본. 확인함 |
| `public/thumbnails/normalized/gongjeongbom-card-1600x1000.png` | normalized derivative | `public/detail/gongjeongbom/home-1440.png`과 SHA-256까지 같은 byte-identical 복제본 | Home·Projects 공정봄 card | 사용자 제작 browser screenshot 파생본. 확인함 |
| `public/thumbnails/normalized/jobflow-card-1600x1000.png` | normalized derivative | `public/detail/jobflow-dashboard-1440.png` browser screenshot의 1600×1000 카드용 정규화 파생본 | Home·Projects JobFlow card | 사용자 제작 `projects/jobflow-dashboard` UI의 browser screenshot 파생본. 확인함 |
| `public/thumbnails/normalized/ott-service-card-1600x1000.png` | normalized derivative | 등록된 `public/thumbnails/ott-service.png`의 1600×1000 카드용 정규화 파생본 | Home·Projects OTT card | 사용자 제작 `projects/OTT Service` 화면 썸네일 파생본. 확인함 |

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
