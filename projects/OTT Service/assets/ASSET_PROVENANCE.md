# 잔상관 Asset Provenance

최신 수정일: 2026-09-28 (한국 시간)

## 현재 사용하는 영화 키아트 — 2026-09-28 개편

풍경 위주였던 이전 장면을 인물·관계·사건이 드러나는 2:3 포스터 6종과 와이드 대표 장면 1종으로 교체했습니다. 아래 자산은 내장 OpenAI image_gen 도구로 각각 생성했습니다. 외부 입력 이미지, 특정 배우·유명인, 실제 영화 포스터·스틸, 브랜드·로고는 참조하지 않았습니다. 도구가 정확한 모델 버전을 제공하지 않아 모델명은 추정하지 않습니다.

출력 후 처리는 비율을 유지한 리사이즈와 WebP 인코딩이며, 창작적 합성·리터칭은 하지 않았습니다. 제목과 장르·러닝타임은 HTML로 표시합니다. 작품 6편과 이야기는 가상 설정이며 실제 배급·상영·영상 제공 사실을 주장하지 않습니다.

기존 이미지와 필름 배경 파일은 삭제하지 않고 보존했습니다. 현재 HTML/CSS/JS는 `posters-v8/`의 아래 7개 이미지만 사용합니다. 자체 SVG 로고·아이콘과 로컬 Pretendard/OFL은 유지합니다. AI 이미지와 가상 작품임을 홈페이지 하단 및 이용안내에 표시했습니다.

외부 영화 자산을 복제하지 않은 사실이 저작권·상표·유사성에 관한 법적 무위험이나 독점권을 보증하지는 않습니다. 상표 등록 가능성이나 법률 적합성에 대한 전문 검토는 수행하지 않았습니다.

| 파일 | 치수 | 용량 | SHA-256 |
| --- | --- | ---: | --- |
| `posters-v8/forest.webp` | 800×1200 | 109,050 B | `b53d05e393c8c7fd694208deaa910320c7437833c3467bac608f5ddd1d66a25b` |
| `posters-v8/greenhouse-hero.webp` | 1916×821 | 112,404 B | `7935262954f7ef7852021e44f4e2bf22d35a1e224985ca17980502b04be1da4d` |
| `posters-v8/greenhouse.webp` | 800×1200 | 93,118 B | `9fd782e36b4bd9fb30ada99f0571e834dedfb6c88b75359722e3083d207d7b48` |
| `posters-v8/letters.webp` | 800×1200 | 82,450 B | `5d993dd6f717a20311314cac5733b49ad9203a015417190714e3a9f61fc2cbdc` |
| `posters-v8/orbit.webp` | 800×1200 | 102,934 B | `faaea82789545e3b774e87c2084e1dbbf761a0ffe2748bd7fb31ca11baa16f8c` |
| `posters-v8/tide.webp` | 800×1200 | 75,918 B | `8983922e4441bfc2ec7845f326017395efdca530b891b5c37ad5a672d29b6f22` |
| `posters-v8/windows.webp` | 800×1200 | 69,468 B | `e59a94c15366e5ddd46214bc5551841fbd0adeac7755640f0537dd65d8af5b0a` |

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

| 파일 | 크기 | SHA-256 |
| --- | ---: | --- |
| `stills/forest.webp` | 453,800 bytes | `93bf23fb55c66eb0e7b1eeccd1f8dc950e1b71b19ce916bb680b030d941ce49c` |
| `stills/greenhouse.webp` | 319,818 bytes | `90f4c5715997ba1e81ef3725a52c4d876ca4f7c1781454ecbe86d1bf16c16b29` |
| `stills/letters.webp` | 169,138 bytes | `3d09a89bb1451e3fa5091e36ffd70c7642c04e442790d3bb499d9b8195c89ba6` |
| `stills/orbit.webp` | 137,656 bytes | `3c4baf133fc0d92c1c7750e0eca2754d436138fd525ce2fb00aeed774ce56125` |
| `stills/tide.webp` | 163,612 bytes | `7beed8ce22686214667b7004b0c3546da9a69ce4011ca290a37fef7cc615f46e` |
| `stills/windows.webp` | 245,666 bytes | `2f5726f69289803de9d6e642e2bfac45458e105fc58468955cdcd2f4bd8efa39` |
| `jansang-mark.svg` | 236 bytes | `57dca14d3397e43223fedff41fd91ff3d9c57aec5d6e9ce610a7399e36180486` |

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

| 파일 | dimensions | scene brief | seed | 생성·입력·참조·편집 방식 | SHA-256 | bytes | 확인일 |
| --- | ---: | --- | ---: | --- | --- | ---: | --- |
| `posters/signal-01-hero.webp` | 840×1050 | 가상의 야간 도시 스카이라인, 중심의 청록색 좌표 신호와 원형 분석 파동, 하단 라벨 안전 영역 | 1101 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `c9c4f51a8bdefdbe16d9c4b606b5e57a2437aff599a283205f9502f25f5e4955` | 33,016 | 2026-08-04 |
| `posters/signal-01-card.webp` | 1200×750 | 가상의 야간 도시와 수직 좌표 신호, 카드 중앙에서 즉시 식별되는 원형 signal | 1102 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `0aebb531388b7735dcaea0a4c702580dcc026d1fe4629534dd940122bc6c2cc9` | 38,812 | 2026-08-04 |
| `posters/blue-02-card.webp` | 1200×750 | 해 질 무렵 비어 있는 수변 플랫폼, 푸른 잔광과 잔잔한 수평선 | 1202 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `bc743a36e7076c80794d3aa2bd07131bf8a8124fbb8827999d46d82674e33c6b` | 30,898 | 2026-08-04 |
| `posters/city-03-card.webp` | 1200×750 | 지도에서 삭제된 듯한 비정상적 도시 grid와 반복되는 원근 구조 | 1303 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `d31b67314f6416bd4b158cc692193d0823db8ec05f4e0a8e5d6c821b3dc93225` | 59,650 | 2026-08-04 |
| `posters/room-04-card.webp` | 1200×750 | 소리가 차단된 실험실 공간과 벽을 통과하는 추상 진동 파형 | 1404 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `61cfb00821e97837e85384ca48ae71a35fdd5efc47601fbe76a070be941ddf08` | 21,522 | 2026-08-04 |
| `posters/archive-05-card.webp` | 1200×750 | 어두운 기록 보관소, 반복되는 보관 칸 사이에서 누락된 한 칸을 강조하는 빛 | 1505 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `b41b0db838842ed14844b419d54f82a5e6d64959e8a4ab913be23c41e88504b8` | 19,980 | 2026-08-04 |
| `posters/runway-06-card.webp` | 1200×750 | 비어 있는 야간 활주로와 원근선, 정상 경로에서 벗어난 비정상 신호 | 1606 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `29ac7dcba8232a554239a751d1bc9064ca942442b40438fff799a4199e692772` | 31,944 | 2026-08-04 |
| `posters/focus-07-card.webp` | 1200×750 | 암실·렌즈·필름 프레임을 추상화한 장면, 중심 초점과 주변 프레임 | 1707 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `aaa59fabdd31c05360ab6addfefea3a401481b8993d898f0a64a7316a8072f8f` | 57,932 | 2026-08-04 |
| `posters/midnight-08-card.webp` | 1200×750 | 자정의 가상 도시 교차로와 한 지점으로 모이는 호출 신호 | 1808 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `76449b93737892e4eaf23a9724b04ee61be7d5f0ced65689f7f9930b33bcb418` | 53,774 | 2026-08-04 |
| `posters/frequency-09-card.webp` | 1200×750 | 여러 추상 송신탑에서 동시에 퍼지는 파형과 간섭 무늬 | 1909 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `8bfe73a7bed28c0ba817c54d5b31c332984e6e1e6581e4516cb36379b41eb70d` | 68,256 | 2026-08-04 |
| `posters/ocean-10-card.webp` | 1200×750 | 심해 관측 구조물과 지도에 없는 기하학적 구조, 청록색 탐지 빛 | 2010 | ChatGPT Python 환경의 Pillow·NumPy procedural geometry·gradient·noise·blur. 외부 입력 이미지 없음. 실제 인물·브랜드·영화·캐릭터 참조 없음. programmatic composition과 WebP encoding만 수행 | `cab60eac03c960af180da1e7a0252ed5e8abecaaa233207d938edf60168689fd` | 42,882 | 2026-08-04 |

## 프로젝트 내부 SVG

다음 SVG는 저장소 선언상 이 프로젝트를 위해 작성됐으며 `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, 단순 곡선, gradient와 blur geometry만 사용합니다. 현재 파일에서 외부 `href`, embedded raster, base64, 실제 logo와 문자 요소는 발견되지 않았습니다.

| 파일 | dimensions·역할 | SHA-256 |
| --- | --- | --- |
| `backdrops/backdrop-night-signal.svg` | 1600×500 Hero fallback | `e1b6540468a3f310e15d2c48f0a521d97ad49b306e6dee3e06cdc770bdfe33f0` |
| `posters/poster-night-signal.svg` | 400×250 signal fallback | `0bc8be5fdfa2ef8e108e72e13ddd05412844aab1e2599aab4d851ddfb4451d50` |
| `posters/poster-blue-hour.svg` | 400×250 blue-hour fallback | `1a040b28494654406286fcc25e525b94d0639ed01063547ebf3fc06fcb58e1d8` |
| `posters/poster-zero-city.svg` | 400×250 city fallback | `253f54e7f04499186aff57299bd48ff105dfab7e28e9c34037ad99cc8c6427a2` |
| `posters/poster-quiet-room.svg` | 400×250 room fallback | `f45a304149ab2a69aca91d5b31dc6249efc727501501af68c5ef971970fdc256` |
| `posters/poster-last-archive.svg` | 400×250 archive fallback | `b2d6f2d1f32e54b0514841036fbb095fe611d9d0f5b6bb0cb83e7d4d0f32df5e` |
| `posters/poster-runway-404.svg` | 400×250 runway fallback | `82bcb596ac44ad1ed2f39d80928e210922b785c7f285f74f0cce5ad9dd19af24` |
| `favicon.svg` | 32×32 signal geometry favicon | `2615478783c8924104d25fcf14405566bfe31144ff5aedda578034e3097d341b` |

## Inline UI icon

`index.html`의 자체 SVG symbol sprite는 `play`, `heart`, `star`, `info`, `close`, `arrow-left`, `external` 7종입니다. 저장소 선언상 모두 원·선·삼각형·polygon·단순 곡선으로 이 프로젝트를 위해 작성됐고 `<use>`로 반복 사용합니다. 현재 파일에서 외부 icon library와 외부 SVG 참조는 발견되지 않았습니다.

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


## 현재 필름 배경 — 2026-09-28 시각 마감

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
- 수록 문자: ASCII U+0020–007E + `가간관궤느는도름리린머문밤불상숲시실여온의이자잔지켜파편호흡`. 브랜드와 현재6편 제목 전부 포함. 새 영화명을 추가할 때는 이 서브셋의 문자 범위를 갱신하거나 UI 폰트로 표시할 것.
- 자체 제작/생성 자산과 허용 라이선스 사용은 출처 추적을 위한 조치이며, 모든 법적 위험이0이라는 보증은 아님.
