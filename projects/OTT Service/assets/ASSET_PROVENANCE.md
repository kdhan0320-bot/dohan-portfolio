# Streaming UI Concept Asset Provenance

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
