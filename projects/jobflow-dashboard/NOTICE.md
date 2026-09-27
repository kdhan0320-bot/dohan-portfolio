# 갈피록 NOTICE (구 JobFlow)

이 문서는 JobFlow 구직 관리 대시보드에서 현재 확인한 자산 provenance와 direct runtime dependency 정보를 추적하기 위한 안내입니다. 법률 의견이나 권리 보증서가 아닙니다.

## 중앙 자산 등록부

포트폴리오에서 사용하는 JobFlow 자산의 상세 origin·derivative·확인 상태는 다음 중앙 등록부가 Source of Truth입니다.

- [projects/my-portfolio/docs/asset-license-register.md](../my-portfolio/docs/asset-license-register.md)

이 프로젝트 수준 NOTICE는 중앙 등록부를 대체하거나 그 확인 범위를 넓히지 않습니다.

## 현재 자산 역할과 확인 범위

| 자산 | 역할 | 현재 확인 범위 |
| --- | --- | --- |
| `public/galpirok-favicon.svg`, `public/favicon.svg` | 갈피록 favicon (새 파일명으로 이전 아이콘 캐시와 분리) | 2026-09-27 이번 작업에서 단순 도형과 path로 새로 작성한 AI 보조 SVG입니다. 외부 이미지 입력 없음. |
| `src/components/ui/Brand.jsx` | 갈피록 로고와 종이·노트 일러스트 | 2026-09-27 이번 작업에서 코드로 새로 작성. 외부 SVG·사진·실존 회사 로고 입력 없음. AI 보조 제작이며 독점성과 상표 권리는 별도 확인 사항입니다. |
| `../my-portfolio/public/detail/jobflow-dashboard-1440.png` | 포트폴리오 JobFlow desktop Dashboard runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/detail/jobflow-dashboard-390.png` | 포트폴리오 JobFlow mobile Dashboard runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/detail/jobflow-kanban-1440.png` | 포트폴리오 전형 보드 runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/detail/jobflow-checklist-1440.png` | 포트폴리오 체크리스트 runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/thumbnails/normalized/jobflow-card-1600x1000.png` | 포트폴리오 Home·Projects 카드용 normalized thumbnail | 등록된 `jobflow-dashboard-1440.png`를 비율 유지해 배치한 derivative로 중앙 등록부에 기록되어 있습니다. |

현재 `projects/jobflow-dashboard`의 source·`public` 범위를 확인한 결과 외부 사진과 실제 회사 logo는 사용하지 않습니다. 글꼴은 로컬 Pretendard Variable과 OS system UI 대체 글꼴을 사용하며, 화면 icon은 아래 `@mui/icons-material` package를 사용합니다. 이 확인은 현재 저장소 범위에 한정되며 독점성이나 법률상 무위험을 보증하지 않습니다.

## 내부 작업 화면의 코드 그래픽 (2026-09-27)

`src/styles/workspace.css`의 파일 탭·책갈피·종이 카드와 `CompletionRing.jsx`의 진행도 SVG는 이번 작업에서 새로 작성한 코드 기반 표현입니다. 외부 이미지·아이콘 파일을 복사하지 않았습니다. 진행도는 실제 체크리스트 건수로 계산하며 연습 카드 장식은 데이터를 나타내지 않습니다. 기존 MUI 아이콘의 라이선스는 아래와 같습니다.

## Direct runtime dependencies

아래 버전과 license 표기는 현재 `package-lock.json`의 direct runtime package entry에 기록된 `version`과 `license`를 옮긴 것입니다.

| Package | Locked version | Declared license |
| --- | ---: | --- |
| `@emotion/react` | `11.14.0` | MIT |
| `@emotion/styled` | `11.14.1` | MIT |
| `@mui/icons-material` | `9.1.1` | MIT |
| `@mui/material` | `9.1.1` | MIT |
| `@supabase/supabase-js` | `2.108.2` | MIT |
| `react` | `18.3.1` | MIT |
| `react-dom` | `18.3.1` | MIT |
| `react-router-dom` | `7.17.0` | MIT |

각 package의 사용·재배포 조건은 해당 package의 license 원문을 따릅니다. 이 표는 transitive dependency 전체 목록이 아닙니다.

## Sample data와 문서 작성 도우미

- 게스트 화면은 source에 포함된 가상 sample data를 React 메모리에서 편집할 수 있습니다. 새로고침 또는 명시적 초기화 시 원래 샘플로 되돌아갑니다. 실제 사용자·고객·회사 데이터가 아니며 로그인 사용자의 Supabase row와 병합하지 않습니다.
- `sessionStorage`에는 현재 탭의 guest mode flag만 저장되고 sample row 자체는 저장되지 않습니다.
- 사용자에게 보이는 **문서 작성 도우미**는 브라우저 안에서 local template 문자열을 만듭니다. 제품 runtime에서 외부 LLM 또는 AI API를 호출하지 않습니다.

## 프로젝트 코드 license

dependency와 자산의 license·확인 기록은 JobFlow 프로젝트 코드 자체의 복제, 수정, 배포 또는 재사용 권한을 부여하지 않습니다. 프로젝트 코드의 공개 license 정책은 이 NOTICE에서 정하지 않습니다.

## 2026-09-27 자산 변경 범위

새 화면은 기존 MUI 아이콘(MIT)을 유지하고, 로컬 Pretendard Variable(OFL 1.1)을 추가했습니다. 가상 회사 표시는 이름의 첫 글자를 사용합니다. 기존 포트폴리오 썸네일과 스크린샷은 이전 디자인의 기록이며 이번 작업에서 새 화면 캡처로 교체하지 않았습니다. ‘갈피록’ 명칭의 일반 웹 검색과 새 도형 제작은 상표 등록 여부 또는 법적 무위험을 보증하지 않습니다.

### 2차 수정의 폰트와 그래픽

- `Brand.jsx`의 `JournalScene`: 이번 작업에서 기하 도형·path로 직접 작성한 AI 보조 벡터 그래픽. 외부 이미지·실존 기업 로고를 입력하지 않았습니다.
- `public/fonts/PretendardVariable.woff2`: 기존 저장소 `projects/OTT Service/assets/fonts/PretendardVariable.woff2`에서 바이트 변경 없이 복사했습니다. SHA-256 `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`.
- 폰트 원문: https://github.com/orioncactus/pretendard/blob/main/LICENSE — 2026-09-27 확인. 저작권 고지와 SIL OFL 1.1 전문을 `public/fonts/OFL.txt`에 보존했습니다. 이 작업에서 글리프·이름·폰트 데이터를 수정하지 않았습니다.

### 3차 수정: 원본 생성 이미지 (2026-09-27)

| 자산 | 원본 생성 | 현재 역할 | 배포 파일 |
| --- | --- | --- | --- |
| `src/assets/galpi-desk.webp` | 이번 대화의 내장 ImageGen, 텍스트만 입력, 외부 참조 이미지 없음 | 로그인·오늘의 갈피·샘플 설정의 종이 정물 비주얼 | 1536×1024, 61,352바이트 |
| `src/assets/galpi-objects.webp` | 이번 대화의 내장 ImageGen, 텍스트만 입력, 외부 참조 이미지 없음 | 폴더·지원 서류·기록장. CSS로 각 영역을 표시하며 단계의 정확한 문구·숫자·상태는 HTML로 구성 | 2172×724, 118,852바이트 |

- 모드: **built-in ImageGen**. CLI/API 키를 사용하지 않았습니다. 인물·실존 기업 로고·상표·특정 작가 이름·타인의 참고 이미지를 입력하지 않았습니다.
- 생성된 PNG는 화면용으로 WebP 품질 90으로 인코딩했습니다. 크기·내용을 변경하지 않았고 파일의 형식만 바꿨습니다. 원본 생성 결과는 이 대화에 보존됩니다.
- 현재 확인한 것은 실제 제작 경로와 외부 입력의 범위입니다. 법률상 독점성·상표권·유사성 부재를 보증하지 않습니다. OpenAI 2026-01-01 이용약관의 Content 항목도 출력이 고유하지 않을 수 있음을 명시합니다: https://openai.com/policies/row-terms-of-use/ (2026-09-27 확인).
- 포트폴리오 제작 설명에서는 이미지를 **AI 보조 제작**으로 표시해야 하며 직접 촬영한 사진이라고 표시하지 않습니다. 아래는 실제 사용한 생성 프롬프트입니다.

#### 이미지 1 프롬프트

Create an original premium editorial still-life image for a Korean job-search journal web app named Galpirok, but include ABSOLUTELY NO text, letters, numbers, logos, watermarks, UI screens, or typography anywhere. Wide horizontal 3:2 composition. A beautifully art-directed physical arrangement on a seamless very pale cool pink-grey surface (#eee7ee): a large open ivory dotted notebook, a small muted plum folded paper bookmark rising from its center, two overlapping frosted translucent document folders in pale sage and dusty lilac, one carefully arranged ivory blank card with a tiny embossed checkmark, and one slender muted plum pencil. Focus on the tactile folded paper bookmark, visible thick paper edges, translucent materials, soft daylight from upper left and realistic contact shadows. Forms must be believable, architectural, calm and refined, not cartoonish, not childish, no faces or hands. Main objects occupy the right two-thirds and lower middle, leaving clean negative space upper left. Overhead three-quarter isometric photography-like render with exceptional material definition, matte textured paper, soft subtle film grain, restrained contemporary product editorial direction. Palette mostly ivory, pale cool lavender, restrained sage, with a small deep plum accent. No bright saturated colors, no blue gradient, no flowers, no coffee, no gold, no shiny glass blobs. This is a substantial hero visual that should look like an original art-directed stationery photograph, not a small generic vector icon. Background continues seamlessly to edges.

#### 이미지 2 프롬프트

An original high-end editorial product still-life asset, a single EXTRA WIDE panoramic 3:1 horizontal image with three completely separate paper stationery sculptures, each centered within its own equal third of the canvas, with generous empty breathing room and no object crossing the boundaries of its third. Seamless uniform very pale warm grey-white background #f6f3f4. LEFT THIRD: one small open frosted pale sage document folder with two blank ivory cards inside and a folded sage index tab. MIDDLE THIRD: a neat short stack of blank ivory application paper sheets held by a matte dusty plum binder clip, with a slender mauve pencil placed diagonally beside it. RIGHT THIRD: one small closed ivory clothbound journal with a muted dusty plum ribbon bookmark curling out of the bottom. Objects occupy approximately 60% of their individual third's width and 75% of canvas height, same scale, full objects visible. Soft light from upper left, realistic contact shadows, overhead three-quarter product photography perspective, tactile paper and fabric textures. Calm, sophisticated, modern Korean editorial stationery branding, pale muted colors and soft dark plum small accents. ABSOLUTELY NO text, letters, numbers, symbols, handwriting, company marks, logos, watermarks or captions. No infographic, no arrows, no borders, no UI. These are three art objects for later layout by a designer, not a diagram. Match a realistic matte paper still-life with understated beautiful material detail, no plastic cartoon style.


### 4차 구성 정리 (2026-09-27)

큰 정물 히어로와 단계별 사물 카드를 주요 경로에서 제외하고 실제 회사 카드·상태 구분을 시각적 중심으로 사용합니다. 기존 이미지 파일은 보존했습니다. 로그인 예시 보드는 이번 작업에서 HTML/CSS로 직접 구성한 가상 샘플이며 타사 화면 캡처가 아닙니다. 외부 이미지와 새 폰트는 추가하지 않았습니다.

## 2026-09-27 서비스 소개·일정 시각 요소

`ProductPreview.jsx`의 가상 회사 보드·달력·체크리스트와 `DashboardPage.jsx`의 날짜 티켓은 이번 프로젝트를 위해 만든 JSX/CSS 구성입니다. 외부 스크린샷·로고·일러스트를 삽입하지 않았습니다. 제품 예시는 샘플로 표시합니다. 참고 사례의 화면·문구·조사 결과를 복제하지 않았으며, 참고 사실은 README에 기록했습니다.

## 2026-09-27 배경·기능별 그래픽

`src/assets/galpi-paper-field.svg`는 겹친 종이 면·책갈피·연결선을 원본 path로 구성한 배경입니다. `PaperGraphic.jsx`의 폴더·진행 카드·달력·준비 체크·말풍선·필기 6종은 이번 코드 편집에서 직접 작성한 AI 보조 벡터입니다. 외부 이미지·로고·특정 작가의 도안을 입력하거나 복사하지 않았습니다. 장식 그림에는 `aria-hidden`을 적용하고 실제 기능 이름은 텍스트로 제공합니다. 기존 폰트·MUI 아이콘의 라이선스는 그대로 유지합니다.

## 2026-09-27 종이 조형 브랜드 이미지

- `src/assets/galpi-sculpture.webp`: 내장 ImageGen으로 이 프로젝트를 위해 생성한 종이 아치·파일 포켓·책갈피 리본 조형 이미지. 텍스트 지시만 사용했으며 외부 참조 이미지·상표·특정 작가를 입력하지 않았습니다.
- 1536×1024, WebP 100,134바이트. 원본 PNG의 크기·내용을 바꾸지 않고 품질 87로 형식만 변환했습니다. 소개·로그인·오늘의 지원과 작업 공간 배경에 사용합니다.
- AI 보조 제작 이미지이며 직접 촬영 사진이나 직접 모델링 작품으로 표시하지 않습니다. 정확한 기능·데이터는 별도 HTML로 표시하고 이미지는 장식으로 제공합니다. 생성 사실이 저작권상 독점성이나 유사성 부재를 보증하지는 않습니다.
- 소개의 반복된 사용 방법 카드와 로그인 예시 회사 목록을 제거하고, 기능 설명은 한 개의 탭 미리보기에 모았습니다. 기존 자산 파일은 보존합니다.

### 실제 생성 프롬프트

Use case: stylized-concept. Asset type: original hero artwork for Galpirok, a calm Korean job-application organizer. Create a premium tactile paper sculpture, wide landscape 3:2 composition. On a seamless very pale blush-gray studio background (#F3ECEF), arrange three oversized sculptural bookmark ribbons and folded index-folder forms into one striking coherent still life, like a small architectural landscape: a dusty plum thick paper arch in the rear, an upright soft sage translucent file pocket holding just two blank ivory index cards, and a long pale pink ribbon with a crisp V-cut bookmark tip curling gently toward the viewer. One small matte mauve sphere as a restrained balancing element. Detailed fibrous cardstock edges, subtle translucent vellum, realistic soft contact shadows, studio photography-like 3D rendering, strong readable silhouette. Objects occupy middle and right of frame, generous empty margin around them, all forms fully visible, no cut-offs. Refined editorial art direction with clear dimensionality, asymmetric but balanced, soft directional light from upper left. Palette dusty rose, deeper muted plum, pale neutral ivory and small sage accent; avoid dominant lavender or blue. No desk, no notebook, no laptop, no piles of papers, no flowers, no cups, no people. Absolutely no text, letters, numerals, logos, watermarks, brands, UI, charts or pseudo-writing. This is an original brand sculpture, not a diagram and not a functional product screenshot. Calm, beautiful and distinctive, no plastic toy look, no glossy chrome, no neon, no glass blobs.

## 2026-09-27 설비결과 색상·조형 구분

- 새 `src/assets/galpi-rose-archive.webp`는 내장 ImageGen에서 텍스트만으로 생성한 AI 보조 제작 종이·책갈피 정물입니다. 외부 참고 이미지, 타사 로고, 특정 작가 이름을 입력하지 않았습니다. 원본 PNG 1536×1024를 같은 크기 WebP(품질 86, 79,552바이트)로 인코딩했습니다. 소개·로그인·설정에서 장식으로 사용하며 직접 촬영·모델링 작품으로 표시하지 않습니다.
- `public/galpirok-rose.svg`는 기존 갈피록 원본 path의 크랜베리색 변형입니다. 코드 로고와 색을 맞추고 브라우저 캐시가 이전 보라 아이콘을 유지하지 않도록 별도 URL을 사용합니다.
- 기존 생성 자산은 보존하지만 작업 화면의 큰 중복 이미지 배경에서는 제외했습니다. 기존 폰트·MUI 라이선스는 유지하며 새 외부 폰트·아이콘·이미지를 복사하지 않았습니다. 생성 경로 확인이 상표권·저작권상 유사성 부재나 독점성을 보증하지는 않습니다.

### 새 종이 오브젝트의 실제 프롬프트

Use case: stylized-concept. Asset type: original Korean job-application journal website hero artwork, landscape 1536x1024. Create a refined editorial still life made entirely from tactile paper and bookbinding materials on a seamless very light neutral ivory studio background (#F8F5F0). Primary subject is one sculptural fan of about seven large unprinted archival index cards rising elegantly out of a low open bookbinding folder. The fan curves to the upper right and provides a strong distinctive silhouette. Some sheets are ivory, two are powder blush (#F1D5D8), one is muted cranberry rose (#AB4655). A deep cranberry cloth bookmark ribbon with a clear V-cut tail flows gently from the folder toward the lower foreground, physically resting on the surface. The folder is cream with a deep cranberry fabric spine, subtle realistic handmade paper edges, vellum layer, bookbinding details. Objects arranged asymmetrically in the center-right with generous negative space, ample margins, fully visible no cropping. Sophisticated restrained art direction, soft directional studio lighting, convincing shadows, physical paper rather than plastic, premium stationery sculpture, not a flat interface screenshot. Palette is neutral ivory, muted cranberry RED and blush pink, with tiny charcoal detail. NO purple, lavender, violet, blue, teal, green, rainbow, generic arch, spheres, flowers, plants, coffee, laptop, people, logos, letters, labels, numbers, watermarks or writing. This is a distinct brand artwork, no mock UI, no charts, no factual diagram. Calm and precise, quietly expressive and warm, not childish, not glossy. Output one polished high resolution image.

## 2026-09-28 배경과 제본 시각 요소 보강

- `src/assets/galpi-ribbon-paper.webp`: 내장 ImageGen에 텍스트만 입력하여 생성한 종이·크랜베리 리본 배경. 실제 출력 1774×887, WebP 품질 84, 88,014바이트. 원본 PNG와 동일 크기이며 형식만 변환했습니다. 외부 참조 이미지·브랜드·특정 작가를 입력하지 않았습니다. AI 보조 제작이며 직접 촬영한 사진으로 표시하지 않습니다.
- `src/assets/galpi-paper-landscape.svg`: 이번 코드 작업에서 직접 구성한 종이 면·접힘·실 곡선·작은 섬유 선 패턴입니다. 기존 보라색 배경을 복사하지 않고 현재 크랜베리 테마에 맞춰 작성했습니다. 외부 도안·아이콘은 추가하지 않았습니다.
- 두 자산은 장식으로만 사용합니다. 수치·사용 과정·상태는 HTML로 표시하며 이미지 위에 가짜 통계나 문구를 넣지 않았습니다. 기존 폰트·아이콘 라이선스는 그대로 유지합니다. 제작 경로 확인은 법적 독점성이나 유사성 부재에 대한 보증이 아닙니다.

### 리본 배경의 실제 생성 프롬프트

Use case: stylized-concept. Asset type: original decorative wide website background banner for a Korean job-preparation journal, 2048x1024 landscape. Create a refined tactile paper and bookbinding composition. Seamless pale neutral ivory background #F6F1EA. The LEFT 60 percent of the frame must remain completely empty, clean softly lit ivory for readable interface content added later, no objects or strong shadows on the left. In the RIGHT 40 percent, arrange three large overlapping blank ivory and soft blush cardstock sheets at different gentle angles, with a long muted cranberry-red grosgrain bookmark ribbon #94394B gracefully forming one flowing S-shaped loop over the paper and ending in a clearly cut V-shaped bookmark tail near the lower right. Close-cropped oversized objects extend naturally beyond the top and right edges. A thin loop of deep rose bookbinding thread and subtle paper edge layers add craft detail. Overhead editorial still-life lighting, beautiful soft but visible physical contact shadows and realistic matte paper grain, tactile cloth weave, quietly expressive and composed. Image is primarily ivory and very light neutral beige, with limited cranberry red ribbon and blush paper, NOT purple, NOT lavender, NOT teal, NOT green, NOT blue. No letters, no text, no labels, no watermarks, no brands, no UI, no charts, no fake handwriting, no people, no flowers, no stationery pen, no books with text, no laptop, no spheres, no generic arch. Premium original art direction for a sophisticated paper journal visual system. Not a screenshot, not a poster with text. Strong large recognisable ribbon silhouette, no clutter.
