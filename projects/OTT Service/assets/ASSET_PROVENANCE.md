# 잔상관 Asset Provenance

최신 수정일: 2026-10-11 (한국 시간)

## v22 현재 사용 범위 — 2026-10-11

- 영화 12편의 포스터는 기존 `posters-v8/` 6장과 `posters-v13/` 6장을 유지합니다. 홈 대표 장면은 `posters-v13/bluehour-hero.webp`입니다.
- 큐레이션 대표 이미지는 기존 가로 스틸 `stills/forest.webp`, `stills/letters.webp`, `stills/orbit.webp`를 재사용합니다. 홈 큐레이션은 숲·`stills/tide.webp`·파란 오후의 가로 장면을 조합합니다.
- 큐레이션 노트는 해당 가상 작품의 `stills/tide.webp`, `stills/letters.webp`, `stills/greenhouse.webp`를 사용합니다.
- 새 이미지 생성·외부 이미지 도입·원본 파일 변경은 없습니다. 아래 기존 생성 기록과 해시가 그대로 적용됩니다. 겹친 프레임·영사광과 오버레이는 CSS이며, 정적 그레인은 CSS 안의 자체 SVG feTurbulence입니다. 선택 화살표도 자체 SVG 경로입니다. 외부 자산을 추가하지 않았으며 작품명과 서비스 문구는 HTML입니다.
- 영화·줄거리는 가상이며 AI 이미지와 재생·예매 미제공 고지를 유지합니다. 아래 소식·혜택·캠페인 관련 설명은 과거 버전 이력으로 현재 화면에서는 사용하지 않습니다.

## 이전 이력: v13 자산 구성 — 2026-10-06

기존 `posters-v8/`의 가상 작품 포스터 6장에 `posters-v13/`의 신규 포스터 6장을 더해 총 12편을 소개합니다. 홈 대표 장면은 `posters-v13/bluehour-hero.webp`, 자체 기획전 배너는 `campaigns-v13/film-weekend.webp`입니다. 기존 대표 이미지·스틸·필름 배경 파일과 생성 기록은 삭제하지 않고 보존합니다. 아래의 v8–v12 기록은 당시 사용 범위를 설명하며 v13의 화면 참조 목록과 구분합니다.

신규 이미지 8장은 2026-10-06 내장 OpenAI `image_gen.imagegen` 도구로 생성했습니다. 정확한 생성 모델 버전은 도구가 제공하지 않아 추정하지 않습니다. 외부 영화·배우·브랜드·기존 캐릭터·특정 작가의 이미지 파일을 입력하지 않았습니다. `bluehour-hero`만 이번에 직접 생성한 `bluehour` 원본을 인물·배경 연속성 참고 이미지로 사용했습니다. 나머지 7장은 참조 이미지 입력 없이 생성했습니다.

새 자산은 실사풍 인물 포스터 4장, 애니메이션 포스터 2장, 같은 애니메이션의 와이드 장면 1장, 일반적인 영사기·필름 소재의 자체 캠페인 이미지 1장입니다. 생성 이미지의 배포 파일은 비율을 유지한 리사이즈와 WebP 변환을 거쳤습니다. 세부 처리와 전체 프롬프트를 아래에 기록합니다. 영화 제목·장르·러닝타임·버튼·캠페인 문구는 HTML/CSS로 표시합니다.

12편의 영화·이야기는 가상 설정이며 실제 상영·배급·영상 제공 사실을 주장하지 않습니다. 소식·혜택의 실제 개봉작은 KOBIS 제목·장르·순위·관객 수와 조회 기준일만 표시하며 실제 영화 포스터나 스틸을 가져오지 않았습니다. Netflix·네이버 안내는 공식 서비스명을 일반 텍스트로 표기하고 공식 링크로 연결하며 외부 로고·광고 이미지를 가져오지 않았습니다.

출처 기록과 자체 생성은 저작권·상표·유사성에 관한 법적 무위험이나 독점권의 보증이 아닙니다. 기존 글꼴의 SIL OFL 원문과 아래 생성·저작권 기록을 유지합니다. UI 시각·기능 검증 결과는 README의 해당 버전 검증 기록과 별도로 확인해야 합니다.

### 신규 배포 이미지 8장

| 파일                              | 치수     |      용량 | SHA-256                                                            |
| --------------------------------- | -------- | --------: | ------------------------------------------------------------------ |
| `posters-v13/bluehour.webp`       | 800×1200 | 263,098 B | `0225728494ca3ebaa174ceb6e3026836e705aedac04fce9b143385213002e39a` |
| `posters-v13/bluehour-hero.webp`  | 1920×800 | 360,616 B | `9c4dbf7efd661a1ecc734ab23f164d0f4079ffa9afb64e85a1944bc8c094e7a8` |
| `posters-v13/atlas.webp`          | 800×1200 | 211,094 B | `6155123d894c19e602aac2c8b6273dc4100a56ab9a82ee81c2161644daf31d20` |
| `posters-v13/rooftop.webp`        | 800×1200 | 122,288 B | `865bf5390a4b38363e8c0bef59323a229fb89273efa25a420257c627751c9c35` |
| `campaigns-v13/film-weekend.webp` | 1440×480 |  44,332 B | `6845bf19436921f0f953fd764513e3fa75fb97fbb19a1dc8b80cf81a584db702` |
| `posters-v13/signal.webp`         | 800×1200 |  80,602 B | `579c135ea80726452c670c3ae977bb19348ed356bc449dedf0fbd668ba600e7b` |
| `posters-v13/relay.webp`          | 800×1200 |  87,020 B | `7bc1bdd52cfcd6d9414981622d03ace50817cd5bb905593246d115582176169e` |
| `posters-v13/nocturne.webp`       | 800×1200 | 119,818 B | `d6cb2276a4889966d4812413330087ea96bccc11031294644b0188d295186ca4` |

### 신규 이미지 처리 및 생성 프롬프트 원문

#### posters-v13/bluehour.webp

- 원본 PNG: `exec-bda40cd5-1ce1-465d-81dd-74cbbe81c401.png`, 1024×1536
- 원본 SHA-256: `fef695bc04d82a0db91e7438cfb0c5f143063fbec7b08c5845c8e68b096f515c`
- 배포 치수: 800×1200
- 참조 이미지 입력: 없음
- 처리 기록: Resize and WebP conversion only; no crop, color editing or compositing.
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: illustration-story. Asset type: original animated feature film vertical key art, strictly 2:3 portrait aspect ratio, intended final size 800x1200. This is an image only, no typography. The original fictional Korean feature is called "파란 오후" for context only; do not write that name or any letters.
Scene: a modern fictional Korean coastal city, on a pedestrian bridge above vivid turquoise water during a breezy late summer afternoon. Powder blue sky, soft coral warmth, architectural bridge perspective and a distant hillside city establish the setting without dominating it.
Subjects: TWO original, clearly adult Korean bicycle couriers, one woman in her late twenties and one man in his early thirties, full or three-quarter figures, prominent enough to occupy about sixty percent of the composition. Both have stopped while walking their bicycles and look thoughtfully toward the sea, one glancing back toward the other with a quiet hopeful smile. The woman has a short dark bob, a light powder-blue overshirt over a white tee, navy cropped trousers, plain coral messenger satchel. The man has short tousled dark hair, a pale sage-green windbreaker, dark blue trousers, simple light-gray delivery backpack. Everyday adult proportions and nuanced expressions, clearly not children or teenagers. Two believable city bicycles, one cream and one muted teal, with coherent handlebars, wheels and hand placement.
Style: distinctive original cinematic animated feature art, refined hand-painted environmental textures with precise expressive character shapes, subtle paper-like brush grain, dimensional lighting, sophisticated color separation and atmospheric depth. Not a generic flat vector illustration or stock travel advertisement.
Composition: characters central and slightly upper-middle, story and facial expressions unmistakable at poster size. Lower central twenty percent visually calm shaded bridge pavement and subtle long shadows for HTML title placement, organically part of the picture; no artificial blank box or border.
Palette: summer-light powder blue and silver-blue with clear teal sea and restrained coral accents. A hopeful, quietly adventurous narrative moment with real human connection.
Constraints: no text, no logo, no watermark, no symbols that resemble lettering, no UI, no credits. Do not reference or imitate any existing animated film, commercial character, living artist, studio style, actor or celebrity. Original characters and composition only. Avoid scenery-only framing, tiny people, childish character design, oversaturated neon, photorealism and exaggerated fantasy anatomy.
```

#### posters-v13/bluehour-hero.webp

- 원본 PNG: `exec-31ae7edc-e729-4fa4-bf23-d315fc1a058e.png`, 1942×809
- 원본 SHA-256: `48a123158ca1cdab40c7fa0019d2a7a9100e757ec26c0b042c65d3344c57b5b9`
- 배포 치수: 1920×800
- 참조 이미지 입력: `exec-bda40cd5-1ce1-465d-81dd-74cbbe81c401.png`
- 처리 기록: Resize and WebP conversion only; no crop, color editing or compositing.
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: illustration-story. Asset type: original cinematic animated feature widescreen hero key art, approximately 2.4:1 landscape (1920x800 target), no text.
The provided image is the character and world reference for the fictional Korean animated feature "파란 오후". Create a NEW wider cinematic moment in the SAME fictional world. Preserve the SAME two original adult Korean couriers, faces, hairstyles, clothing colors and bicycles: woman late twenties with short dark bob, powder-blue overshirt, white tee, dark navy cropped trousers, coral messenger satchel and cream bicycle; man early thirties with short tousled dark hair, sage windbreaker, navy trousers, light-gray delivery backpack and muted teal bicycle. Keep both clearly adult.
Scene/composition: hopeful late summer afternoon on the same coastal pedestrian bridge above clear turquoise sea, with an expansive powder-blue sky, soft coral light, distant hillside city and islands. Place BOTH prominent characters and their bicycles within the RIGHT 55 percent, close enough to read expressions; one looks toward the sea while the other turns toward their companion. They have stopped mid-journey, a quietly adventurous movie moment. Keep faces around the upper-right and within safe margins.
The LEFT 40–45 percent is organic deep blue shade from the bridge entrance or an out-of-frame overhead structure, fading naturally into the sunny scene toward the middle. Include faint bridge railing perspective and softly visible harbor shapes in this shade; low-detail space for a future HTML movie title, not a blank black box, not a gradient panel, not a split image. One continuous believable environment. The left must be dark enough for large pale lettering while the right retains bright summer light.
Style: match the reference's original feature-animation character rendering and nuanced painted environment, expressive faces, refined textures, dimensional cinematic light, atmospheric depth. Make the image feel like high-quality original film key art, not a website/UI mockup or a stock travel banner.
Constraints: retain original adult character identity and wardrobe, anatomical coherence and bicycle structures. No text, title, credits, logos, UI, watermark or typography. No existing commercial animated film/character/studio/artist style references. Avoid tiny humans, landscape-only framing, photo realism, excessive neon or an entirely dark/melancholic scene.
```

#### posters-v13/atlas.webp

- 원본 PNG: `exec-7aa7a858-7874-4c6a-b2ee-fb6bb8dc3b68.png`, 1024×1536
- 원본 SHA-256: `59ee61577c95657fc08cac041911fe3f579d6ab51cad729d87427164f5131695`
- 배포 치수: 800×1200
- 참조 이미지 입력: 없음
- 처리 기록: Aspect-preserving Lanczos resize to target; subpixel edge fit only where source ratio rounds; WebP quality 88, method 6. No creative content edits.
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: illustration-story.
Asset type: original artwork for a fictional animated fantasy film poster, no typography.
Primary request: an unforgettable painterly animated-film portrait poster, exactly 2:3 vertical composition.
Subject: a young boy with an original clearly readable face, short black hair and a weathered ochre travel coat, standing beside a magnificent giant folded-paper bird with closed wings. The bird has beautiful layered ivory paper feathers and an intelligent gentle expression. The pair occupies the middle of the image and feels emotionally connected.
Scene: a magical stair-built hillside city under a deep blue and lilac violet night sky. A few glowing orange stars float nearby, one folded orange star in the boy's hands. Rich atmospheric depth, distinct high-quality painted animation imagery, tangible paper texture, cinematic lighting, enchanting rather than childish.
Composition: character faces distinct and unobscured in the upper-middle to middle area, giant bird reads immediately even as a thumbnail, dynamic but coherent triangular silhouette. Lower central 22% is quiet dark lavender-blue shadow with no important subject, reserved for a title to be typeset later.
Constraints: fully original fictional character design. No reference to any real artist, studio, film or existing character. No letters, words, numbers, titles, captions, logos, signatures or watermarks anywhere. No frame, no UI. Create the artwork only.
```

#### posters-v13/rooftop.webp

- 원본 PNG: `exec-ea73f08b-5ada-496f-ba45-1cf573186e30.png`, 1024×1536
- 원본 SHA-256: `68906cbf50ef37c8dc551583f6775ec60f3e5c126bc4f621c48087ee175212ef`
- 배포 치수: 800×1200
- 참조 이미지 입력: 없음
- 처리 기록: Aspect-preserving Lanczos resize to target; subpixel edge fit only where source ratio rounds; WebP quality 88, method 6. No creative content edits.
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: photorealistic-natural.
Asset type: original movie-poster artwork for a fictional Korean music comedy, no typography.
Primary request: lively cinematic photograph, 2:3 vertical portrait poster, of exactly three Korean adult friends in their late twenties playing in a small rooftop band.
Subjects: a smiling Korean man playing an electric bass at left, a Korean woman singing into a handheld wired microphone at center, and a Korean man playing a compact drum kit at right. Natural original fictional faces, expressive performance body language, anatomically coherent hands and realistic instruments. They look like friends having a joyful slightly scrappy evening rehearsal, not an idol promotional shoot.
Scene: intimate ordinary rooftop rehearsal at coral-pink sunset, soft butter-yellow accents in their casual summer clothing and instrument details. Modest out-of-focus nearby rooftops only along the lower horizon, keep city scenery restrained.
Composition: clean portrait poster composition. Top central 25 percent is uncluttered coral-pink sky with quiet light and no cables or objects, reserved for a title to be typeset later. People's faces occupy the central portion, not the top. Keep the three people individually readable at thumbnail size, bass and microphone and drums identifiable, medium-wide photograph with natural film grain and warm cinematic glow.
Constraints: three fully original adult characters, no celebrities, no identifiable film or brand reference. Absolutely no letters, words, numbers, titles, subtitles, logos, signatures or watermarks anywhere, including instrument surfaces. No frame, UI or phone mockup. Artwork only.
```

#### campaigns-v13/film-weekend.webp

- 원본 PNG: `exec-482a2a67-03ff-4241-b899-9d3196593e4a.png`, 2172×724
- 원본 SHA-256: `ac950f3dedb568459ed4e582dc5bc90b27394a803c4d4f872ae5d18a7ab30eee`
- 배포 치수: 1440×480
- 참조 이미지 입력: 없음
- 처리 기록: Aspect-preserving Lanczos resize to target; subpixel edge fit only where source ratio rounds; WebP quality 88, method 6. No creative content edits.
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: ads-marketing.
Asset type: original campaign banner artwork for a fictional independent-cinema movie weekend promotion, with no typography.
Primary request: a beautifully art-directed stylized 3D miniature movie-night still life, very wide horizontal 3:1 composition.
Scene/backdrop: warm coral-apricot seamless studio backdrop with simple soft orange tones and gentle tonal depth. Matte tactile materials, warm soft light, crisp but gentle shadows.
Subject arrangement: in the RIGHTMOST 40 percent, a small attractive unbranded retro movie projector, a film reel, two completely blank cinema tickets, and a few tiny translucent amber light fragments, composed as a unified playful sculptural still life. Projector in muted cream with coral details, tickets warm butter-yellow, reel deep terracotta. Clearly recognizable silhouettes and modest scale.
Composition: the LEFT 58 percent is clean uninterrupted apricot negative space reserved for advertising copy, no objects, no projector beam crossing this copy area. Objects sit grounded along the right lower-middle, all complete within the image. Balanced elegant campaign quality, charming and warm, not cluttered.
Constraints: no text, letters, numbers, perforated fake text, logos, brand names, watermarks or signatures anywhere, including the tickets and projector. Absolutely no website screen, interface, mobile phone, laptop, UI mockup, browser frame or poster text. One original banner artwork only. Exact 3:1 wide landscape aspect ratio.
```

#### posters-v13/signal.webp

- 원본 PNG: `exec-51c6ac90-21c8-4166-89dc-22c70d3395ff.png`, 1024×1536
- 원본 SHA-256: `9b424334691f7faeb9294067614913db4b214180d1249947860f2578ea03654b`
- 배포 치수: 800×1200
- 참조 이미지 입력: 없음
- 처리 기록: Pillow RGB conversion and proportional LANCZOS resize from 1024x1536 to 800x1200; WebP quality 88 method 6; no creative editing
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: ads-marketing. Asset type: original fictional film key art for a cinema portfolio, a single portrait 2:3 movie poster, 1024x1536. Create a photorealistic cinematic noir image, NO typography. A fictional adult Korean woman radio repair technician in a small old radio workshop holds a compact unbranded handheld radio close to her ear, listening with visibly anxious focus and glancing to the side as if she has just heard an impossible transmission. Her face is sharply readable near the central-right lower half of the vertical poster. Red task-light illumination, warm amber illuminated radio tuning dial and rich teal shadows; detailed believable workshop props, shallow depth of field, expressive cinema lighting, restrained film grain. Reserve the upper-left 25% as deep clean darkness for an HTML title overlay; leave the subject completely below that title area. Portrait composition with a clear mysterious narrative and a real dramatic human face, not a nature landscape. No real actors or celebrity likenesses, no references to existing commercial films or fictional characters. No visible readable text, no numbers on props, no logos, no watermark, no borders. Hand and radio anatomically credible.
```

#### posters-v13/relay.webp

- 원본 PNG: `exec-f222621a-0f20-440f-a425-e7674bae8510.png`, 1024×1536
- 원본 SHA-256: `51c76f6372b3c85fa07edf3836a769ab39908cd150a5ec5c2a233a8f12d46b86`
- 배포 치수: 800×1200
- 참조 이미지 입력: 없음
- 처리 기록: Pillow RGB conversion and proportional LANCZOS resize from 1024x1536 to 800x1200; WebP quality 88 method 6; no creative editing
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: ads-marketing. Asset type: original fictional film key art for a cinema portfolio, a single portrait 2:3 movie poster, 1024x1536. Create a photorealistic dramatic sports-movie poster with NO typography. A fictional adult Korean female relay runner in a vivid unbranded orange racing uniform accelerates powerfully to receive a baton. Dynamic diagonal 45-degree composition of her athletic body, hand reaching backward toward the incoming baton and another teammate's clearly readable hand. Her determined face is visible and human, showing pressure and competitive stakes. Deep cobalt-blue stadium environment at dusk, restrained floodlights and a suggestion of track lanes, motion blur limited to background, crisp main athlete. Frame her head and upper torso around the middle-right of the poster, with entire vital action in the middle and lower portions. Reserve the upper-left 25% as calm deep blue air for an HTML title overlay. Cinematic sports drama photography, tactile skin, authentic running gesture and believable anatomy. No real athlete or celebrity likeness, no existing film or character reference, no sports brands, no sponsors or lettering on uniforms, no text, no logos, no watermark, no borders.
```

#### posters-v13/nocturne.webp

- 원본 PNG: `exec-efa54b1b-4594-49fe-b3ee-e7d0c220067a.png`, 1024×1536
- 원본 SHA-256: `c1083bc86461b12500a9c111a4db4c97f33c86edc84dcd558afe072161173789`
- 배포 치수: 800×1200
- 참조 이미지 입력: 없음
- 처리 기록: Pillow RGB conversion and proportional LANCZOS resize from 1024x1536 to 800x1200; WebP quality 88 method 6; no creative editing
- 배포 파일 해시·용량: 위 표 참조

```text
Use case: ads-marketing. Asset type: original fictional film key art for a cinema portfolio, a single portrait 2:3 movie poster, 1024x1536. Create a photorealistic cinematic human-comedy film image with NO typography. Inside the tiny kitchen of a modest Korean late-night diner, a fictional middle-aged Korean woman cook and a fictional young adult Korean male delivery courier face one another over a steaming bowl being passed from her to him. The cook has a warm wry smile and the courier's tired face brightens with surprised gratitude; expressive eyes and human chemistry are clearly visible. Both main characters and their hands are visible in the middle and lower portion of the poster, face heights approximately 42–55% from top. Teal early-dawn light enters through a small window while warm apricot practical indoor lighting illuminates faces and steam. Humble well-used stainless counter and plain bowls support the scene, without clutter. Reserve the upper 10–25% as a clean faded mint kitchen wall for an HTML title overlay. Cinematic composition and subtle film texture, charming understated humor, believable bodies and bowl handoff, not a stock restaurant advertisement. No real actor or celebrity likeness, no existing movie or character reference. No text on any prop or clothing, no menu writing, no logos, no watermark, no borders.
```

### 로고·아이콘·글꼴과 실제 정보의 출처

로고·파비콘은 기존 자체 프레임 도형을 유지한 벡터 자산이며 화면의 시안색과 청색 바탕에 맞춰 색을 조정했습니다. UI 북마크·화살표 등은 자체 inline SVG입니다. 신규 외부 아이콘 라이브러리는 추가하지 않았습니다. 글꼴은 기존 로컬 Pretendard와 Jansang Display 및 각각의 OFL 고지를 보존합니다. 신규 영화명에 기존 서브셋에 없는 글자를 요구하지 않도록 Pretendard 중심으로 표시합니다.

- 실제 흥행 정보: [영화진흥위원회 KOBIS 일별 집계](https://www.kobis.or.kr/kobis/business/main/searchMainDailyBoxOffice.do), **2026-10-05 일 관객 수 / 2026-10-06 확인**. 사이트의 외부 링크는 [일별 박스오피스](https://www.kobis.or.kr/kobis/business/stat/boxs/findDailyBoxOfficeList.do)입니다. 정적 기록이며 실시간 데이터가 아니고 사후 집계가 보정될 수 있습니다.
- OTT 안내: [네이버 공식 Netflix 결합 혜택](https://mkt.naver.com/netflix), [공식 월간 결제 금액](https://help.naver.com/service/23168/contents/21564?lang=ko&osType=COMMONOS), **2026-10-06 확인**. 유료 멤버십·VAT 포함 월 4,900원 정기결제·광고형 스탠다드 선택·계정 연결·월 선택 콘텐츠 1개·패밀리 선택권 1명·업그레이드 추가 요금 조건을 안내합니다. 잔상관과의 제휴·유료 광고가 아닙니다.
- 자체 기획전 캠페인: `film-weekend.webp`의 생성 기록은 위와 같습니다. 실제 상영 행사나 유료 티켓·쿠폰 혜택을 제공한다는 의미가 아닙니다.

## 이전 생성 기록 — 2026-09-28 영화 키아트 (v8)

풍경 위주였던 이전 장면을 인물·관계·사건이 드러나는 2:3 포스터 6종과 와이드 대표 장면 1종으로 교체했습니다. 아래 자산은 내장 OpenAI image_gen 도구로 각각 생성했습니다. 외부 입력 이미지, 특정 배우·유명인, 실제 영화 포스터·스틸, 브랜드·로고는 참조하지 않았습니다. 도구가 정확한 모델 버전을 제공하지 않아 모델명은 추정하지 않습니다.

출력 후 처리는 비율을 유지한 리사이즈와 WebP 인코딩이며, 창작적 합성·리터칭은 하지 않았습니다. 제목과 장르·러닝타임은 HTML로 표시합니다. 작품 6편과 이야기는 가상 설정이며 실제 배급·상영·영상 제공 사실을 주장하지 않습니다.

당시 기존 이미지와 필름 배경 파일은 삭제하지 않고 보존했습니다. v8–v12에서는 `posters-v8/`의 아래 7개 이미지, 기존 `cinema-film-atmosphere.webp` 배경, 기획전용 `stills/letters.webp`·`stills/orbit.webp`를 사용했습니다. v13의 현재 사용 범위는 문서 상단을 기준으로 합니다. 자체 SVG 로고·아이콘과 로컬 Pretendard/OFL은 유지합니다. AI 이미지와 가상 작품임을 홈페이지 하단 및 이용안내에 표시했습니다.

외부 영화 자산을 복제하지 않은 사실이 저작권·상표·유사성에 관한 법적 무위험이나 독점권을 보증하지는 않습니다. 상표 등록 가능성이나 법률 적합성에 대한 전문 검토는 수행하지 않았습니다.

| 파일                              | 치수     |      용량 | SHA-256                                                            |
| --------------------------------- | -------- | --------: | ------------------------------------------------------------------ |
| `posters-v8/forest.webp`          | 800×1200 | 109,050 B | `b53d05e393c8c7fd694208deaa910320c7437833c3467bac608f5ddd1d66a25b` |
| `posters-v8/greenhouse-hero.webp` | 1916×821 | 112,404 B | `7935262954f7ef7852021e44f4e2bf22d35a1e224985ca17980502b04be1da4d` |
| `posters-v8/greenhouse.webp`      | 800×1200 |  93,118 B | `9fd782e36b4bd9fb30ada99f0571e834dedfb6c88b75359722e3083d207d7b48` |
| `posters-v8/letters.webp`         | 800×1200 |  82,450 B | `5d993dd6f717a20311314cac5733b49ad9203a015417190714e3a9f61fc2cbdc` |
| `posters-v8/orbit.webp`           | 800×1200 | 102,934 B | `faaea82789545e3b774e87c2084e1dbbf761a0ffe2748bd7fb31ca11baa16f8c` |
| `posters-v8/tide.webp`            | 800×1200 |  75,918 B | `8983922e4441bfc2ec7845f326017395efdca530b891b5c37ad5a672d29b6f22` |
| `posters-v8/windows.webp`         | 800×1200 |  69,468 B | `e59a94c15366e5ddd46214bc5551841fbd0adeac7755640f0537dd65d8af5b0a` |

### 생성 프롬프트 원문

#### tide

```text
Use case: ads-marketing. Asset type: original cinematic key art for a fictional Korean drama in an independent-film discovery website; single portrait poster background, 2:3 aspect ratio.
Primary request: a gripping, emotionally nuanced FILM POSTER photographic composition, not a landscape illustration. Fictional Korean woman in her early thirties, realistic and distinctive face with no resemblance to any famous person. Close / medium portrait occupies about sixty percent of the frame. She stands inside a weathered seaside house and turns toward an empty wooden chair that suggests an absent father, with grief held quietly in her eyes. Her face and shoulders are the unmistakable focal point. Restrained stormy teal, deep navy and desaturated ivory; natural cold side-light, slightly damp dark hair, real skin texture, subtle 35 mm film grain. Through one blurred window only a small trace of the sea; the house and sea are supporting narrative cues, never the primary subject. A precise, elegant theatrical-drama composition with believable cinematography and natural anatomy, not fashion advertising. Let the lower twenty percent fall gradually into deep navy shadow for separately rendered HTML title text while preserving a continuous photographic scene.
Constraints: one vertical composition, not a collage or grid. Photorealistic live-action cinema. NO text, letters, titles, captions, credits, logos, brands, watermark, famous actors or existing film references. No generic landscape, no illustration, no bright sky dominating. Opaque background.
```

#### letters

```text
Use case: ads-marketing. Asset type: original cinematic key art for a fictional Korean relationship drama in an independent-film discovery website; a single portrait poster background in 2:3 aspect ratio.
Primary request: a cinematic photograph of TWO fictional Korean adults in their late twenties, a woman and a man, facing each other at very close conversational distance at an old summer boardinghouse. The woman holds one folded unposted plain letter between them at chest level, and both look intently at each other with unresolved affection and hesitation. Their distinct, believable faces and shoulders occupy about sixty percent of the whole poster; their eyes tell a story. Neither face resembles a famous person. A tactile, elegant live-action romantic drama keyart, not a fashion campaign. Late-afternoon golden amber light entering the boardinghouse, soft sunlit cream curtains and old olive painted wood behind them out of focus. Photograph at eye level with a 50mm cinematic lens, realistic fine hair and skin, subtle analog film grain. Foreground characters sharply rendered, environment only a supporting cue.
Palette: warm faded amber and muted olive, deep brown/navy lower shadows, luminous skin, distinct from teal thriller art. Composition: portrait close/medium shot, balanced two figures, faces clearly readable even as a small movie poster. Let the bottom twenty percent darken naturally into continuous deep shadow, suitable for separately overlaid HTML title.
Constraints: NO words or letters visible anywhere, even on the letter. No titles, captions, credits, logos, brands, watermark, real actors, existing-film reference, collage, grid, illustration or scenic landscape. One opaque photographic poster composition.
```

#### greenhouse

```text
Use case: ads-marketing. Asset type: original cinematic key art for a fictional Korean mystery film in an independent-film discovery website. Single 2:3 portrait poster background.
Primary request: striking photorealistic live-action mystery FILM POSTER with one fictional Korean woman researcher in her thirties, strongly recognizable human protagonist taking sixty percent of the composition. Close / medium portrait of her face and shoulders, looking suddenly sideways with alert restrained apprehension, her gloved hand holding a small practical flashlight close to her chest. Half her face lit by warm amber bounce, the other half in deep teal shadow. She wears a dark practical field jacket, not a glamorous costume. No resemblance to any known person. Behind her, night-time glasshouse panes fogged with condensation and faint ordered silhouettes of unusual leaves; dark botanical geometry suggests a secret without competing with her face. Flashlight beam cuts the damp air diagonally but is believable, delicate, not a giant graphic streak. Premium theatrical mystery keyart, eye-level 65mm cinema lens, realistic skin pores, convincing hands and natural anatomy, subtle 35mm grain, restrained high contrast. Deep teal-green, midnight navy, small amber highlights. Large legible expressive eyes as the focal point; no landscape panorama. Preserve the upper face and flashlight clearly. Bottom twenty percent gradually becomes continuous deep navy shadow for HTML title overlay; it must not look like an added black rectangle.
Constraints: one opaque vertical image; NO text, lettering, film titles, captions, logos, brands, billing blocks, watermark, existing film references or famous actors. No illustration, no collage, no grid, no gore or horror monster.
```

#### orbit

```text
Use case: ads-marketing
Asset type: original portrait film key art for a fictional Korean cinema portfolio, 2:3 portrait ratio, 1024x1536.
Primary request: a striking photorealistic science-fiction movie poster BACKGROUND, no typography. Fictional Korean male astronaut in his thirties, extremely compelling close portrait through an open clear visor, introspective and isolated. He is an invented person, not an actor or celebrity. His face, helmet and shoulders occupy about 65 percent of the entire frame; the human story must be the immediate focus.
Scene: a quiet spacecraft communications alcove in deep orbit. A tiny distant Earth reflected in one side of the visor and indistinct unlettered communication indicators create story context. The face is anatomically natural, slightly tired, subtle moisture in the eyes, precise real skin texture.
Composition: head and torso in upper 75 percent, three-quarter turn with eyes looking just beyond camera. Asymmetric cinematic framing, large readable silhouette, no collage. Bottom 20 percent naturally falls into deep navy shadow, an uncluttered zone for later HTML film title.
Lighting: rich electric blue side light and a delicate pale violet rim, realistic dramatic cinematic exposure, cinematic film grain, restrained color grading, high-end contemporary theatrical key art.
Constraints: ONLY one continuous original cinematic photo scene. No text, no letters, no logos, no credits, no watermarks, no brands, no recognizable real people, no existing movie visual composition. Do not show any readable screen text. Do not produce a landscape postcard, drawn illustration, flat avatar, or generic glowing nebula. Entire image edge to edge.
```

#### windows

```text
Use case: ads-marketing
Asset type: original portrait film key art for a fictional Korean ensemble drama, 2:3 portrait ratio, 1024x1536.
Primary request: cinematic photorealistic movie poster BACKGROUND, no typography. Two fictional Korean adult neighbors, a man in his early forties and a woman in her thirties, inside a stopped apartment elevator. Both are invented ordinary people, not celebrities. The mood suggests two strangers slowly finding connection during a delay. Their large faces and upper bodies occupy approximately 65 percent of the composition and carry the story.
Scene: gently worn steel-blue elevator interior, close and tactile, no readable floor displays. The man is nearer the left in three-quarter profile looking toward the closed door, the woman a little further right looking the opposite direction, a subtle reflective surface quietly unites them without duplicating faces. Their body language is restrained and emotionally believable.
Composition: close/mid two-person portrait, layered depth, natural adult anatomy, clear separation of faces in upper two thirds. The bottom 20 percent fades through real coat shadows into near-navy, quiet for HTML titles. No graphic borders or collage.
Lighting: a warm practical ceiling light falls softly on realistic skin, contrasted against cool steel-blue shadows, subtle amber highlights, polished contemporary arthouse film key art, intimate cinematic 35mm photographic realism.
Constraints: no typography, no text, no logos, no credits, no brands, no watermarks, no real actors or recognizable public figures, no imitation of a specific movie poster. No scenic postcard, no cartoon or painterly treatment, no flat stock-photo smiles. Edge-to-edge photograph.
```

#### forest

```text
Use case: ads-marketing
Asset type: original portrait key art for a fictional human-led nature documentary, 2:3 portrait ratio, 1024x1536.
Primary request: compelling cinematic photorealistic documentary poster BACKGROUND, no typography. An invented Korean adult female field sound recordist, about thirty-five, wearing professional unbranded over-ear headphones and holding a small field recorder in a misty forest at dawn. Her attentive face and upper torso occupy about 60 percent of the frame; she is the unmistakable protagonist, not a tiny figure in scenery. Serious curious expression, listening with intent, looking slightly off camera. Realistic face and hands, tactile outdoor jacket, subtly damp hair.
Scene: soft out-of-focus trunks and fine emerald-green dawn mist receding behind the sound recordist, with only enough nature to tell the story of her work. No sweeping landscape. A plain recorder and coiled cable suggest a documentary mission, no readable manufacturer markings or display text.
Composition: cinematic close/mid portrait, slightly asymmetrical, face high in frame with substantial believable photographic detail. Upper 75 percent carries the subject; bottom 20 percent becomes dark jacket and deep green-navy shadow as a clean area for later HTML titles.
Lighting: soft luminous dawn from behind with natural reflected light on the face, rich forest emerald and charcoal blue, controlled contrast, fine film grain, sophisticated theatrical documentary key art rather than travel advertising.
Constraints: no text, no lettering, no logos, no credits, no brands, no watermarks, no celebrities, no existing film poster imitation. No postcard-like landscape, no tiny human silhouette, no drawing or fantasy illustration. One continuous edge-to-edge original photographic scene.
```

#### greenhouse-hero

```text
Use case: photorealistic-natural.
Asset type: cinematic widescreen website hero image for an original fictional Korean mystery film called "밤의온실" (do NOT render the title or any text).
Create a genuinely cinematic narrative frame with a clear human dramatic focus, not a landscape or botanical photograph.
Scene: a dim abandoned botanical research greenhouse at night, fogged glass panes and shadowy structural frames receding into deep space. Practical amber light from a distant interior contrasts with restrained cool teal night light.
Main subject: an entirely fictional Korean woman researcher in her early thirties, waist-up, occupying the right-center foreground at approximately 65–80 percent of the width. A believable natural face with a tense, alert expression; she turns her head back toward the camera as if she has heard someone behind her. Plain dark field jacket, no labels, one hand naturally holding a small flashlight pointed down. Realistic hands and anatomy. Her face must remain legible with soft motivated edge light and nuanced natural skin texture.
Narrative background: one indistinct human silhouette, far behind her through a misted glass door, slightly out of focus. A suggestion of suspense, no violence, no horror monster.
Composition: wide landscape ratio approximately 2:1. Subject dominates the right 60 percent, while the left 35 percent contains organically dark shadowed greenhouse atmosphere with a few barely visible leaf shapes and glass reflections, suitable for a large HTML title overlay. It must feel like one continuous scene, not a blank black panel, split screen, collage or poster graphic.
Style: high-end contemporary live-action film still, anamorphic cinematic lens, selective focus, strong foreground-to-background depth, subtle fine film grain, realistic light falloff, careful restrained teal/amber grade. Emotionally suspenseful and visually convincing.
Avoid: generic scenic nature, relaxing landscape, wallpaper, glossy stock photography, oversaturated colors, overdone lens flares, illustrated/anime look, graphics, typography, text, watermark, logos, brands, famous actors, recognizable existing film compositions. No text anywhere.
```

---

## 이전 작업 자산 보존 기록

최신 수정일: 2026-09-28 (한국 시간)

2차 마감: 로고 파비콘의 배경·선 색상을 새 청회색 UI 팔레트에 맞춤. 작품 이미지 6종은 재생성하거나 교체하지 않음.

### 이전 화면에서 사용한 자산

- 이미지 6종: 이 대화에서 OpenAI 이미지 생성 도구로 신규 생성. 실제 이미지 입력, 배우·인물 사진, 기존 영화 스틸·포스터, 특정 작가 스타일·브랜드·캐릭터 참조 없음. 정확한 모델 버전은 도구가 제공하지 않아 기록하지 않음.
- 최초 출력: PNG, 각 1672×941. 웹용 WebP로 Pillow 인코딩(quality=86, method=6). 파일 형식 변환 외 자르기·합성·보정 없음. 화면의 크롭과 음영은 CSS로 적용.
- 제목·작품 설명·러닝타임: 프로젝트용 가상 설정. 실제 영화 및 실제 제공 영상 정보가 아님.
- 로고 `jansang-mark.svg` 및 inline symbol 7종(mark, arrow, bookmark, search, close, check, back): 이 수정에서 직접 작성한 단순 SVG 도형. 외부 아이콘/브랜드 로고를 가져오지 않음.
- 글꼴: 기존 로컬 Pretendard Variable와 `fonts/OFL.txt` 유지.
- AI 이미지 사용 사실은 페이지 하단과 프로젝트 안내에 고지.

외부 영화 자산을 가져오지 않은 사실과 법률상 무위험·독점성 보장은 다릅니다. 상표 등록/사용 가능성의 법률 검토는 수행하지 않았습니다. 생성 자산의 저작권 성립·제3자 유사성에 대한 법적 보증은 하지 않습니다. 기존 자산은 삭제하지 않았으며 현재 HTML/CSS/JS에서 참조하지 않습니다.

### 이전 배포 파일 검증값

| 파일                     |          크기 | SHA-256                                                            |
| ------------------------ | ------------: | ------------------------------------------------------------------ |
| `stills/forest.webp`     | 453,800 bytes | `93bf23fb55c66eb0e7b1eeccd1f8dc950e1b71b19ce916bb680b030d941ce49c` |
| `stills/greenhouse.webp` | 319,818 bytes | `90f4c5715997ba1e81ef3725a52c4d876ca4f7c1781454ecbe86d1bf16c16b29` |
| `stills/letters.webp`    | 169,138 bytes | `3d09a89bb1451e3fa5091e36ffd70c7642c04e442790d3bb499d9b8195c89ba6` |
| `stills/orbit.webp`      | 137,656 bytes | `3c4baf133fc0d92c1c7750e0eca2754d436138fd525ce2fb00aeed774ce56125` |
| `stills/tide.webp`       | 163,612 bytes | `7beed8ce22686214667b7004b0c3546da9a69ce4011ca290a37fef7cc615f46e` |
| `stills/windows.webp`    | 245,666 bytes | `2f5726f69289803de9d6e642e2bfac45458e105fc58468955cdcd2f4bd8efa39` |
| `jansang-mark.svg`       |     236 bytes | `57dca14d3397e43223fedff41fd91ff3d9c57aec5d6e9ce610a7399e36180486` |

## 신규 이미지 생성 프롬프트 원문

### tide.webp

```text
Use case: photorealistic-natural. Asset: cinematic hero still for an original fictional Korean independent film named 'Where the tide stays' (do not render text). Create an ultra-wide 16:9 landscape film still, quiet fictional coastal village at blue hour. A small weathered seaside house on the right third has a single warm amber window; dark rocks and sea grass in foreground, luminous silver blue sea through the center, a faint distant headland and soft fog. Left third must be naturally dark uncluttered shoreline and deep blue atmospheric space for white UI type. Restrained analog film grain, subtle halation, believable natural light, richly detailed tactile surfaces, poetic contemplative framing, premium cinema photography, not a painting. Deep desaturated petrol blue, sea mist and tiny warm light. No text, letters, logo, watermark, people, recognizable landmarks, existing film references, protected characters, brand elements or artist imitation. Output one wide image.
```

### letters.webp

```text
Use case: photorealistic-natural. Create one cinematic landscape 16:9 still for an original fictional gentle drama. Close but spacious interior of a quiet summer seaside room. Off-white translucent curtains softly billowing beside a large open window, worn honey oak writing desk with a single blank folded envelope and a small clear glass holding a pale yellow flower. Late-afternoon sunlight casts beautiful tall shadows. A glimpse of out-of-focus soft sea blue beyond. Tactile linen, wood and paper, warm ivory and muted apricot, analog cinema photograph, restrained fine grain, elegant imperfect realism. No readable writing, text, logos, watermarks, people, recognizable landmarks, existing movie references or artist imitation.
```

### greenhouse.webp

```text
Use case: photorealistic-natural. Create one cinematic landscape 16:9 still for an original fictional mystery film. An abandoned Victorian-style glass greenhouse deep in a misty forest at midnight, mossy window frames, rich fern silhouettes, a single subtle pale amber bulb inside illuminating one empty wooden chair. Geometric glass roof, rain droplets, atmospheric volumetric moonlight. Frame greenhouse in the middle with balanced surrounding vegetation. Desaturated forest green, black olive, silver moonlight. Premium analog cinema photograph, natural texture, restrained film grain, quiet mysterious composition. No people, text, logos, watermarks, recognizable landmarks, existing film references, artist imitation or protected characters.
```

### orbit.webp

```text
Use case: stylized-concept. Asset: original fictional quiet science-fiction cinema still, wide landscape 16:9. View from an elegant empty observation room in a small orbital research station; an immense softly lit blue-gray ringed planet fills a tall curved window, tiny ivory console with no writing in foreground, gentle cream reflection on brushed metal. Architectural, tangible, restrained analog science fiction, subtle film grain, photoreal cinematic lighting, vast silence and wonder. One coherent photograph-like frame, not collage. Pearl gray, washed steel blue, a restrained muted orange indicator glow. No people, astronaut characters, franchise designs, recognizable spaceship designs, text, logos, watermarks or existing film references.
```

### windows.webp

```text
Use case: photorealistic-natural. Create one cinematic wide 16:9 landscape still for an original fictional urban drama. Quiet courtyard between understated mid-century apartment buildings in an invented city at twilight, four stories, dusky muted terracotta and warm pale concrete, many small windows with a few amber lights just coming on. A wet courtyard reflects a pale salmon dusk sky; a modest tree silhouette, stillness after rain. Frontal architectural composition with intimate human scale, no people. Original premium independent cinema art direction, restrained analog grain, rich detail, natural lens and light. Emphasis on terracotta, dusty rose and pale amber, different from a blue science fiction image. No text, logos, watermarks, recognizable real buildings, existing film references or artists.
```

### forest.webp

```text
Use case: photorealistic-natural. Create one cinematic wide 16:9 frame for an original fictional nature documentary. Ethereal pale morning mist weaving through a deep mountain forest of tall slender trees, tiny wooden footbridge crossing still water in the lower center, lush moss and ferns, delicate beams of diffused dawn light. Soft silver sage and emerald palette, quiet contemplative framing with depth, real botanical detail, high-end nature cinema photograph, subtle film grain. No people, signs, text, logos, watermarks, identifiable famous locations, existing film references or artist imitation. Balanced image suitable for wide film card and atmospheric collection backdrop.
```

## 기존 버전 기록 (아래 내용은 2026-08-15 기록)

확인일: 2026-08-15

## WebP 제작 계약

WebP 11개는 `2026-08-04T10:16:08+09:00`에 ChatGPT Python 환경에서 Pillow·NumPy를 이용해 기하 도형, gradient, procedural noise와 blur를 조합한 절차형 이미지로 제작했다는 저장소 기록이 있습니다. 이 기록은 외부 입력 이미지를 사용하지 않았고 실제 인물·배우·브랜드·영화·게임·서비스·로고·캐릭터를 참조하지 않았으며, 이미지 내부 문자·워터마크가 없다고 선언합니다.

과거 자산 생성 기록에는 `manifest.json`·`manifest.md`·`validation.json`이 언급되지만 현재 저장소에서 해당 파일 위치는 확인되지 않습니다. 현재 보존된 근거는 파일별 dimensions·scene brief·seed·SHA-256을 기록한 이 문서와 `fonts/OFL.txt`입니다. 완전한 generator source와 원본 prompt도 확인되지 않으며, OpenAI 이미지 생성 모델이나 확인되지 않은 모델명을 사용했다고 주장하지 않습니다. 같은 결과의 정확한 재생성·독점성·법률상 무위험을 보증하지 않습니다.

## 권리 확인 수준

- Pretendard v1.3.9 Variable: `THIRD_PARTY_LICENSE_VERIFIED`. 공식 Pretendard의 local WOFF2를 runtime에서 사용하고 SIL Open Font License 1.1 전문을 `fonts/OFL.txt`로 보존합니다.
- WebP 11개: `USER_DECLARED_AI_ASSISTED`. ChatGPT Python 환경의 Pillow·NumPy procedural 제작, 외부 입력 이미지 없음, 실제 인물·브랜드·영화·게임·캐릭터 참조 없음이라는 내용은 저장소 생성 기록에 따른 선언입니다. 현재 파일 검사에서 인물·영화 스틸·로고·워터마크는 발견되지 않았지만 generator source·원본 prompt·manifest 위치와 독립 제작자 증명은 확인되지 않습니다.
- 프로젝트 SVG·favicon 8개와 inline icon 7개: `REPOSITORY_DECLARATION_ONLY`. 현재 파일에서 simple geometry만 사용하고 external `href`·embedded raster·logo·wordmark가 없는 것은 확인했지만, 독립 제작자 증명은 확인되지 않았습니다. Git author 기록만으로 제작자를 확정하지 않습니다.

외부 입력·인물·브랜드 요소가 현재 파일에서 발견되지 않았다는 사실은 자산의 독립 제작 경위가 증명됐다는 뜻이 아닙니다. 위 분류는 저장소에 남아 있는 선언·파일 구조·라이선스 원문으로 확인 가능한 범위를 구분합니다.

| 파일                             | dimensions | scene brief                                                                                | seed | 생성·입력·참조·편집 방식                                                                                                                                                                   | SHA-256                                                            |  bytes | 확인일     |
| -------------------------------- | ---------: | ------------------------------------------------------------------------------------------ | ---: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | -----: | ---------- |
| `posters/signal-01-hero.webp`    |   840×1050 | 가상의 야간 도시 스카이라인, 중심의 청록색 좌표 신호와 원형 분석 파동, 하단 라벨 안전 영역 | 1101 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `c9c4f51a8bdefdbe16d9c4b606b5e57a2437aff599a283205f9502f25f5e4955` | 33,016 | 2026-08-04 |
| `posters/signal-01-card.webp`    |   1200×750 | 가상의 야간 도시와 수직 좌표 신호, 카드 중앙에서 즉시 식별되는 원형 signal                 | 1102 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `0aebb531388b7735dcaea0a4c702580dcc026d1fe4629534dd940122bc6c2cc9` | 38,812 | 2026-08-04 |
| `posters/blue-02-card.webp`      |   1200×750 | 해 질 무렵 비어 있는 수변 플랫폼, 푸른 잔광과 잔잔한 수평선                                | 1202 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `bc743a36e7076c80794d3aa2bd07131bf8a8124fbb8827999d46d82674e33c6b` | 30,898 | 2026-08-04 |
| `posters/city-03-card.webp`      |   1200×750 | 지도에서 삭제된 듯한 비정상적 도시 grid와 반복되는 원근 구조                               | 1303 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `d31b67314f6416bd4b158cc692193d0823db8ec05f4e0a8e5d6c821b3dc93225` | 59,650 | 2026-08-04 |
| `posters/room-04-card.webp`      |   1200×750 | 소리가 차단된 실험실 공간과 벽을 통과하는 추상 진동 파형                                   | 1404 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `61cfb00821e97837e85384ca48ae71a35fdd5efc47601fbe76a070be941ddf08` | 21,522 | 2026-08-04 |
| `posters/archive-05-card.webp`   |   1200×750 | 어두운 기록 보관소, 반복되는 보관 칸 사이에서 누락된 한 칸을 강조하는 빛                   | 1505 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `b41b0db838842ed14844b419d54f82a5e6d64959e8a4ab913be23c41e88504b8` | 19,980 | 2026-08-04 |
| `posters/runway-06-card.webp`    |   1200×750 | 비어 있는 야간 활주로와 원근선, 정상 경로에서 벗어난 비정상 신호                           | 1606 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `29ac7dcba8232a554239a751d1bc9064ca942442b40438fff799a4199e692772` | 31,944 | 2026-08-04 |
| `posters/focus-07-card.webp`     |   1200×750 | 암실·렌즈·필름 프레임을 추상화한 장면, 중심 초점과 주변 프레임                             | 1707 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `aaa59fabdd31c05360ab6addfefea3a401481b8993d898f0a64a7316a8072f8f` | 57,932 | 2026-08-04 |
| `posters/midnight-08-card.webp`  |   1200×750 | 자정의 가상 도시 교차로와 한 지점으로 모이는 호출 신호                                     | 1808 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `76449b93737892e4eaf23a9724b04ee61be7d5f0ced65689f7f9930b33bcb418` | 53,774 | 2026-08-04 |
| `posters/frequency-09-card.webp` |   1200×750 | 여러 추상 송신탑에서 동시에 퍼지는 파형과 간섭 무늬                                        | 1909 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `8bfe73a7bed28c0ba817c54d5b31c332984e6e1e6581e4516cb36379b41eb70d` | 68,256 | 2026-08-04 |
| `posters/ocean-10-card.webp`     |   1200×750 | 심해 관측 구조물과 지도에 없는 기하학적 구조, 청록색 탐지 빛                               | 2010 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `cab60eac03c960af180da1e7a0252ed5e8abecaaa233207d938edf60168689fd` | 42,882 | 2026-08-04 |

## 프로젝트 내부 SVG

다음 SVG는 저장소 선언상 이 프로젝트를 위해 작성됐으며 `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, 단순 곡선, gradient와 blur geometry만 사용합니다. 현재 파일에서 외부 `href`, embedded raster, base64, 실제 logo와 문자 요소는 발견되지 않았습니다.

| 파일                                  | dimensions·역할               | SHA-256                                                            |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| `backdrops/backdrop-night-signal.svg` | 1600×500 Hero fallback        | `e1b6540468a3f310e15d2c48f0a521d97ad49b306e6dee3e06cdc770bdfe33f0` |
| `posters/poster-night-signal.svg`     | 400×250 signal fallback       | `0bc8be5fdfa2ef8e108e72e13ddd05412844aab1e2599aab4d851ddfb4451d50` |
| `posters/poster-blue-hour.svg`        | 400×250 blue-hour fallback    | `1a040b28494654406286fcc25e525b94d0639ed01063547ebf3fc06fcb58e1d8` |
| `posters/poster-zero-city.svg`        | 400×250 city fallback         | `253f54e7f04499186aff57299bd48ff105dfab7e28e9c34037ad99cc8c6427a2` |
| `posters/poster-quiet-room.svg`       | 400×250 room fallback         | `f45a304149ab2a69aca91d5b31dc6249efc727501501af68c5ef971970fdc256` |
| `posters/poster-last-archive.svg`     | 400×250 archive fallback      | `b2d6f2d1f32e54b0514841036fbb095fe611d9d0f5b6bb0cb83e7d4d0f32df5e` |
| `posters/poster-runway-404.svg`       | 400×250 runway fallback       | `82bcb596ac44ad1ed2f39d80928e210922b785c7f285f74f0cce5ad9dd19af24` |
| `favicon.svg`                         | 32×32 signal geometry favicon | `2615478783c8924104d25fcf14405566bfe31144ff5aedda578034e3097d341b` |

## 이전 Inline UI icon 기록

`index.html`의 자체 SVG symbol sprite는 `play`, `heart`, `star`, `info`, `close`, `arrow-left`, `external` 7종입니다. 저장소 선언상 모두 원·선·삼각형·polygon·단순 곡선으로 이 프로젝트를 위해 작성됐고 `<use>`로 반복 사용합니다. 당시 파일에서 외부 icon library와 외부 SVG 참조는 발견되지 않았습니다.

## 글꼴

- 파일: `fonts/PretendardVariable.woff2`
- 버전: Pretendard v1.3.9 Variable
- 라이선스: SIL Open Font License 1.1
- 로딩: 외부 CDN 없이 local WOFF2
- 고지: `fonts/OFL.txt` 유지

## 2026-09-28 구성 단순화

기존 잔상관 생성 이미지 6종과 프레임 로고를 재사용했습니다. 새 외부 이미지나 폰트를 추가하지 않았습니다. 같은 숲 장면을 반복하는 하단 큐레이션 배너를 화면에서 제외하고, 모바일 대표 이미지의 CSS object-position을 88% center로 조정했습니다. WebP 원본 바이트와 해시는 그대로이며, 래스터 합성·재생성은 하지 않았습니다. 이미지에는 실제 작품의 배급·상영 권한을 주장하는 정보가 없습니다.

## 이전 배경 장식 — 2026-09-28 구성 개편 (현재 화면 미사용)

`cinema-atmosphere.svg`는 직접 작성한 양쪽 청색 방사형 그라데이션·옅은 보랏빛 반사광·낮은 불투명도의 사선과 가장자리 선입니다. 이전의 작은 겹친 직사각형 장식을 교체했습니다. 외부 이미지·인물·상표·폰트·스크립트를 포함하지 않으며 래스터 이미지 편집을 하지 않았습니다. 당시 홈·작품·테마·찜 화면에 사용했습니다. 이후 시각 마감에서 선과 그리드가 맞지 않아 화면 참조를 해제했으며 원본 파일은 보존합니다.

- 크기: 1600×1200 SVG viewBox
- bytes: 958
- SHA-256: `1513c275ad5c331b6e038de3a751bfdf4e9bb1de842dd1f2e87fc4513ce4e962`

작품·테마 카드와 장식용 필름 묶음은 기존 생성 스틸 6종을 CSS로 크롭·배치한 것입니다. 원본 WebP 바이트와 위 해시는 그대로 유지됩니다. 새로운 외부 영화 자산이나 사진을 추가하지 않았습니다.

## 이전 필름 배경 — 2026-09-28 시각 마감

`cinema-film-atmosphere.webp`는 이 대화의 OpenAI 이미지 생성 도구로 새로 만든 영화 탐색 UI 배경입니다. 외부 입력 이미지를 사용하지 않았으며 기존 영화·배우·브랜드·특정 작가를 참조하지 않았습니다. 프롬프트는 일반적인 아날로그 필름 소재와 푸른 빛, 중앙의 어두운 빈 공간만 요청했습니다. 출력에서 글자·로고·워터마크·얼굴·영화 스틸은 보이지 않았습니다. 제3자 유사성이나 법률상 독점성을 보증하는 검토는 아닙니다.

- 생성 1회, PNG 1672×941 / 1,534,955 bytes.
- 원본 PNG SHA-256: `0fe612b1497faccc9772dd4b115e8bc3467ffe7c7a656c324903b0f62cc2f230`.
- Pillow WebP quality=88, method=6으로 형식 변환. 래스터 자르기·합성·보정 없음.
- 배포 WebP: 1672×941 / 34,528 bytes.
- 배포 WebP SHA-256: `053a987696b33d05ecadd68cf66f52c2433936dd9ef763bdd52ba3f2fda15977`.
- 화면에서 CSS 그라데이션·마스크로 어둡기와 가장자리 페이드를 적용. 클릭·포커스를 받지 않는 장식 레이어.
- 작품 스틸 6종의 바이트·해시는 유지. tide 이미지의 CSS object-position만 82% center로 조정.
- 정확한 생성 모델 버전은 도구가 제공하지 않아 기록하지 않음.

### 배경 생성 프롬프트 원문

```text
Use case: photorealistic-natural.
Asset type: original editorial background asset for a quiet Korean independent-cinema film-discovery website, intended to sit behind UI.
Primary request: create a restrained tactile film-material background, ultra-wide 16:9 composition.
Scene/backdrop: almost-black ink navy (#101820).
Subject: a real analogue 35mm photographic film strip curling loosely and organically along only the far-right outer edge and a small lower-left corner, recognizable tiny sprocket perforations and unexposed dark-blue frames.
Style/medium: realistic macro editorial photography with subtle material texture and soft depth of field, quiet premium cinema mood, not shiny plastic CGI.
Composition/framing: wide landscape 16:9; peripheral objects should occupy no more than about 25% of the composition, large central and left-central 70% remains dark low-contrast negative space for interface text. Film extends naturally beyond the canvas edges.
Lighting/mood: subtle cool powder-blue light passing through translucent film, soft broad projector-light falloff, restrained silver-blue edge reflections.
Constraints: original generic unbranded film material only. Must work as a dark website background with pale readable text over it. No movie stills inside the film, no people or faces, no text, letters, numbers, logos, watermarks or film brands.
Avoid: strong straight diagonal bands, rectangular page outlines, sharp geometric interface lines, rainbow or neon or purple chrome ribbons, unrelated decorative objects.
```

## 2026-09-28 최종 반응형 마감

기존 `cinema-film-atmosphere.webp`와 여섯 작품 스틸의 원본 바이트는 유지했습니다. 새 외부 이미지·폰트·아이콘·영상은 추가하지 않았습니다. 1100px 이하의 배경 위치를 오른쪽 기준으로 보정하고, CSS로 약한 청회색 방사형 빛을 더했습니다. 768~1000px 카드 배치와 CSS 크롭 비율을 보정했으며 래스터 자산 자체는 편집하지 않았습니다. 낮은 우선순위의 이미지 preload와 버전이 붙은 스타일 주소를 사용합니다.

## 2026-09-28 브랜드 마감 v9

- `jansang-mark.svg`, `favicon.svg`, HTML 내 `i-mark`: 가로 스크린 프레임과 잔상3겹을 코드로 구성한 자체 벡터. 외부 로고 파일·트레이싱·상표를 사용하지 않음. 상표 등록 가능성이나 기존 모든 상표와의 비유사성을 보증한 것은 아님.
- 기존 `cinema-film-atmosphere.webp`를 실제 배경으로 다시 참조. 새로 생성하거나 다른 이미지를 합성하지 않았음. 원 생성 내역은 위 기록 유지.
- 기존 `posters-v8` 이미지7개 유지. 가로 배너의 CSS 크롭만 보정.
- `fonts/JansangDisplay-600-700.woff2`: Google Fonts 공식 Noto Serif KR 원본에서 FontTools로600–700 범위와 실제 제목 문자125개를 남긴 로컬 WOFF2 서브셋. 내부 family를 `Jansang Display`로 변경하고 Adobe 저작권 메타데이터 유지.72,660B.
- 원본: https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifkr/NotoSerifKR%5Bwght%5D.ttf
- 원본 SHA-256: `11f8d5de6f1b79195efba3828aaa2ec95c1178f5ae976fb23c8d53250a9938f3`
- 서브셋 SHA-256: `973095a0e0f14e11c8315b85de24bead9dcc1921f1e9d51b4e70e078f826daf3`
- 라이선스: SIL OFL1.1 원문 `fonts/OFL-NotoSerifKR.txt` 포함. 공식 원문 https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifkr/OFL.txt
- OFL SHA-256: `5e0da210fb04058a8c0087985d2d456b931c2579811a49655721d3cf0c36b6d6`
- 수록 문자: ASCII U+0020–007E + `가간관궤느는도름리린머문밤불상숲시실여온의이자잔지켜파편호흡`. 당시 브랜드와 6편 제목 전부 포함. 새 영화명을 추가할 때는 이 서브셋의 문자 범위를 갱신하거나 UI 폰트로 표시할 것.
- 자체 제작/생성 자산과 허용 라이선스 사용은 출처 추적을 위한 조치이며, 모든 법적 위험이0이라는 보증은 아님.

## v11 타이포그래피·심벌 색상 마감 (2026-09-28)

새 외부 이미지나 글꼴을 추가하지 않았다. 기존 AI 생성 영화 키아트와 배경, 자체 제작 심벌, 두 로컬 OFL 글꼴을 재사용했다. 포스터 영화명은 이미지에 박아 넣지 않고 HTML 텍스트/CSS로 색·굵기·자간·행 비율만 조정했다. `favicon.svg`와 `jansang-mark.svg`는 기존 도형을 유지하면서 바탕 `#0B0E12`, 심벌 `#D9EC8E`로 색상을 변경했다. 외부 영화 제목 로고·배우·브랜드 자산을 새로 차용하지 않았다.

## v12 재사용 범위와 화면 마감 (2026-10-06)

새 이미지·글꼴·외부 영화 자산은 추가하지 않았습니다. `posters-v8` 인물 포스터 6종과 대표 이미지를 유지하고, 홈의 다정한 하루·낯선 세계 기획전에는 위에 생성 프롬프트가 기록된 기존 `stills/letters.webp`·`stills/orbit.webp`(각 1672×941)를 재사용했습니다. 스틸·포스터·필름 배경·글꼴의 원본 바이트는 수정하지 않았으며 CSS 크롭과 오버레이만 조정했습니다. 기존 로컬 OFL 라이선스 원문과 AI 이미지 고지를 유지합니다.

## v13 브랜드 색상 정합성

2026-10-06, 기존 자체 작성 SVG인 `favicon.svg`와 `jansang-mark.svg`의 색상만 배경 `#08131F`와 심벌 `#97DEEF`로 변경했습니다. 형상과 기존 출처는 유지했습니다. 외부 로고를 가져오지 않았습니다.
