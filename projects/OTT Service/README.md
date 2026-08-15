# Streaming UI Concept

## 1. 한 줄 목적

가상 콘텐츠 탐색을 장르 필터·native dialog·찜 상태 동기화로 구현한 Vanilla JavaScript 반응형 퍼블리싱입니다.

## 2. 구현 과제

어두운 콘텐츠 UI의 분위기를 유지하면서 정보 가독성·keyboard flow·filter·dialog·page-memory 상태를 반응형으로 일관되게 구현했습니다.

## 3. 기술 스택

- HTML
- CSS (`css/style.css`)
- Vanilla JavaScript (`js/main.js`)
- Static HTML·JavaScript data
- 별도 framework·package·build tool 없음

## 4. 주요 화면·인터랙션

- Hero와 번호 기반 가상 catalog 10개
- 장르 filter 6종
- native `<dialog>` 기반 프로젝트 안내·작품 정보·미리보기 UI
- Hero·card·dialog 사이에서 동기화되는 찜 상태
- 데스크톱·모바일 navigation과 실제 포트폴리오·GitHub 링크

## 5. ACTUAL INTERACTION · STATIC DATA · PAGE MEMORY 계약

장르 필터·native dialog·찜 상태 동기화는 실제 browser interaction으로 구현했습니다. Catalog의 제목·장르·설명·연도·회차·데모 평점은 static data입니다. Favorite는 현재 page memory에서만 유지되며 `localStorage`와 `sessionStorage`를 사용하지 않고, reload 시 모두 초기화됩니다.

## 6. 포함하지 않은 기능

- 실제 영상 재생·스트리밍
- 회원가입·로그인
- 결제·구독
- API·DB·Storage
- 새로고침 이후 상태 유지
- runtime AI

## 7. 실행 방법

별도 설치나 빌드 과정이 없습니다. 저장소 루트에서 로컬 HTTP server를 실행한 뒤 `projects/OTT Service/index.html`을 엽니다.

별도 승인 Figma는 없습니다. 현재 HTML·CSS·JavaScript와 운영 화면이 구현 Source of Truth입니다.

## 8. 폴더·파일 역할

```text
projects/OTT Service/
├─ index.html                  # 화면 구조와 자체 SVG symbol sprite
├─ css/style.css              # dark UI·responsive·focus style
├─ js/main.js                 # filter·dialog·찜·mobile menu 상태
└─ assets/
   ├─ ASSET_PROVENANCE.md     # 이미지·SVG·icon·font provenance
   ├─ favicon.svg             # 자체 signal geometry favicon
   ├─ backdrops/              # Hero fallback SVG
   ├─ posters/                # procedural WebP와 fallback SVG
   └─ fonts/                  # Pretendard Variable WOFF2·OFL
```

폴더명 `OTT Service`와 공개 경로 `/ott-service/`는 기존 배포 copy 계약 때문에 유지합니다. 사용자 노출 작품명은 `Streaming UI Concept`입니다.

## 9. 접근성·반응형

- `본문으로 바로가기` skip link와 programmatic main focus target
- CSS의 767px mobile 경계와 같은 `matchMedia('(min-width: 768px)')` 상태 동기화
- mobile menu 초기 focus, 외부 pointer·Escape·link 닫기, desktop 전환 시 동등 navigation target으로 focus 이동
- dialog 초기 focus, Tab·Shift+Tab 순환, Escape·backdrop 닫기와 trigger focus 복귀
- button `aria-label`·`aria-pressed`, 장식 icon `aria-hidden`, `prefers-reduced-motion` 대응

## 10. 자산·폰트 요약

WebP 11개는 ChatGPT Python 환경에서 Pillow·NumPy를 이용해 기하 도형, gradient, procedural noise와 blur를 조합한 절차형 이미지입니다. 외부 입력 이미지와 실제 인물·브랜드·영화·게임·캐릭터 참조를 사용하지 않았고 이미지 내부 문자·워터마크가 없습니다. fallback SVG 7개, favicon과 inline symbol icon 7종은 프로젝트 내부에서 단순 geometry로 새로 작성했습니다.

글꼴은 로컬 `PretendardVariable.woff2` v1.3.9를 사용하며 `OFL.txt`의 SIL Open Font License 1.1을 유지합니다. 파일별 dimensions·scene brief·seed·SHA-256과 세부 근거는 [`assets/ASSET_PROVENANCE.md`](assets/ASSET_PROVENANCE.md)에 기록합니다.

## 11. 현재 한계

과거 자산 생성 기록에는 `manifest.json`·`manifest.md`·`validation.json`이 언급되지만 현재 저장소에서 해당 파일 위치는 확인되지 않습니다. 현재 보존된 근거는 파일별 dimensions·scene brief·seed·SHA-256을 기록한 `ASSET_PROVENANCE.md`와 `OFL.txt`입니다. 완전한 generator source와 원본 prompt도 확인되지 않아 같은 결과의 정확한 재생성을 주장하지 않습니다. 절차형 결과의 독점성이나 법률상 무위험도 보증하지 않습니다. screen reader의 실제 수동 낭독과 모든 상태의 수치형 contrast 측정은 별도 사용자 환경 검토가 필요합니다.
