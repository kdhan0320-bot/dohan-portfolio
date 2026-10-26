/* 잔상관: fictional films, real browser interactions; no account or streaming API. */
(() => {
  "use strict";
  const films = [
    {
      id: "tide",
      title: "파도가 머문 자리",
      english: "WHERE THE TIDE STAYS",
      genre: "드라마",
      minutes: 24,
      mood: "calm",
      moodText: "잔잔한 여운",
      image: "tide",
      posterPath: "assets/stills/tide.webp",
      posterPosition: "83% center",
      position: "82% center",
      detailPosition: "75% center",
      detailRatio: "1.55",
      description:
        "바닷가 집으로 돌아온 서윤은 아버지가 남긴 파도 소리를 발견한다. 오래 미뤄둔 마음을 마주하는 24분.",
      keywords: "바다 해변 힐링 가족 잔잔한 단편",
    },
    {
      id: "letters",
      title: "여름의 편지",
      english: "LETTERS FROM SUMMER",
      genre: "드라마",
      minutes: 18,
      mood: "warm",
      moodText: "다정한 온기",
      image: "letters",
      posterPath: "assets/frames-v31/letters.webp",
      stillPath: "assets/frames-v31/letters.webp",
      posterPosition: "55% center",
      position: "58% center",
      detailPosition: "55% center",
      detailRatio: "1.35",
      description:
        "하숙집을 정리하던 두 친구에게 나타난 부치지 않은 편지. 잊고 지냈던 여름의 오후가 다시 펼쳐진다.",
      keywords: "여름 편지 친구 따뜻한 다정한 짧은 단편",
    },
    {
      id: "greenhouse",
      title: "밤의 온실",
      english: "THE GLASSHOUSE AT NIGHT",
      genre: "미스터리",
      minutes: 42,
      mood: "mystery",
      moodText: "고요한 긴장",
      image: "greenhouse",
      posterPath: "assets/frames-v35/greenhouse.webp",
      stillPath: "assets/frames-v35/greenhouse.webp",
      posterPosition: "44% center",
      position: "44% center",
      detailPosition: "44% center",
      detailRatio: "1.4",
      description:
        "버려진 온실에 매일 자정, 불이 켜진다. 사라진 관리자의 일지를 따라 연구원은 닫힌 문 너머로 향한다.",
      keywords: "밤 온실 숲 미스터리 추리 긴장 식물",
    },
    {
      id: "orbit",
      title: "느린 궤도",
      english: "A SLOW ORBIT",
      genre: "SF",
      minutes: 36,
      mood: "wonder",
      moodText: "낯선 경이",
      image: "orbit",
      posterPath: "assets/frames-v36/orbit.webp",
      posterPosition: "60% center",
      position: "63% center",
      detailPosition: "center top",
      detailRatio: "1.05",
      description:
        "지구로 돌아갈 날을 기다리는 우주 기록원. 마지막 메시지 한 통이 고요한 관측 기지의 일상을 바꾼다.",
      keywords: "우주 행성 미래 SF 새로운 세계 경이",
    },
    {
      id: "windows",
      title: "불이 켜지는 시간",
      english: "WHEN THE LIGHTS COME ON",
      genre: "드라마",
      minutes: 27,
      mood: "warm",
      moodText: "다정한 온기",
      image: "windows",
      posterPath: "assets/frames-v35/windows.webp",
      stillPath: "assets/frames-v35/windows.webp",
      posterPosition: "left center",
      position: "left center",
      detailPosition: "left 18%",
      detailRatio: "1.05",
      description:
        "서로의 이름도 모르던 아파트 이웃들. 멈춰버린 엘리베이터가 스쳐 지나가던 사람들을 한자리에 모은다.",
      keywords: "도시 이웃 아파트 저녁 따뜻한 일상 단편",
    },
    {
      id: "forest",
      title: "숲의 호흡",
      english: "THE BREATH OF THE FOREST",
      genre: "자연 다큐",
      minutes: 21,
      mood: "calm",
      moodText: "잔잔한 여운",
      image: "forest",
      posterPath: "assets/frames-v24/forest.webp",
      position: "48% center",
      detailPosition: "center 54%",
      detailRatio: "1.55",
      description:
        "물길과 잎사귀, 빛이 머무는 자리를 따라 걷는 숲. 설명 대신 풍경의 소리에 귀 기울이는 21분의 산책.",
      keywords: "자연 숲 다큐 산책 힐링 잔잔한 편안한 짧은",
    },
    {
      id: "bluehour",
      title: "파란 오후",
      english: "BLUE AFTERNOON",
      genre: "애니메이션",
      minutes: 28,
      mood: "warm",
      moodText: "다정한 모험",
      image: "bluehour",
      posterPath: "assets/frames-v24/bluehour.webp",
      posterPosition: "90% center",
      detailPosition: "82% center",
      detailRatio: "1.55",
      description:
        "서로 다른 도시에서 지내던 두 친구가 고향의 바닷가에서 다시 만난다. 자전거를 타고 함께 보내는 오후, 각자의 속도로 흘러가던 하루가 나란히 이어진다.",
      keywords:
        "애니 애니메이션 색채 파랑 오후 바다 해변 자전거 우정 친구 재회 따뜻한 모험",
    },
    {
      id: "atlas",
      title: "별을 접는 아이",
      english: "THE PAPER CONSTELLATION",
      genre: "애니메이션",
      minutes: 34,
      mood: "wonder",
      moodText: "낯선 경이",
      image: "atlas",
      posterPath: "assets/frames-v36/atlas.webp",
      detailPosition: "center 4%",
      detailRatio: "1.25",
      description:
        "종이별을 접으면 밤하늘에 별이 하나 생긴다. 더는 별을 만들 수 없게 된 아이는 마지막 한 장에 누구의 소원을 담을지 고민한다.",
      keywords: "애니 애니메이션 종이 별 밤하늘 판타지 상상 소원 아이 경이로운",
    },
    {
      id: "rooftop",
      title: "옥상의 작은 밴드",
      english: "ROOFTOP ENCORE",
      genre: "음악",
      minutes: 25,
      mood: "warm",
      moodText: "다정한 온기",
      image: "rooftop",
      posterPath: "assets/frames-v33/rooftop.webp",
      position: "center center",
      posterPosition: "center center",
      detailPosition: "center 25%",
      detailRatio: "1.05",
      description:
        "철거를 앞둔 연습실의 마지막 밤, 해체한 밴드가 옥상에 모인다. 관객 한 명을 위한 연주가 서로에게 하지 못한 말을 대신한다.",
      keywords: "음악 밴드 공연 옥상 청춘 친구 연주 기타 따뜻한",
    },
    {
      id: "signal",
      title: "수신 불가",
      english: "NO SIGNAL",
      genre: "미스터리",
      minutes: 38,
      mood: "mystery",
      moodText: "고요한 긴장",
      image: "signal",
      posterPath: "assets/frames-v33/signal.webp",
      position: "center center",
      posterPosition: "center center",
      detailPosition: "center 32%",
      detailRatio: "1.05",
      description:
        "폐쇄된 중계소에서 자신의 목소리가 담긴 구조 요청을 받은 통신 기사. 아직 일어나지 않은 사고를 막기 위해 신호의 발신지를 추적한다.",
      keywords: "미스터리 추리 통신 신호 라디오 중계소 긴장되는 구조",
    },
    {
      id: "relay",
      title: "마지막 바통",
      english: "THE FINAL RELAY",
      genre: "스포츠",
      minutes: 31,
      mood: "warm",
      moodText: "함께하는 용기",
      image: "relay",
      posterPath: "assets/frames-v33/relay.webp",
      position: "center center",
      posterPosition: "center center",
      detailPosition: "center 20%",
      detailRatio: "0.82",
      description:
        "부상 후 트랙을 떠나려던 육상 선수에게 마지막 계주 출전 제안이 온다. 혼자 빠르게 달리는 법만 알던 그는 동료에게 바통을 건네는 법을 배운다.",
      keywords: "스포츠 육상 달리기 계주 트랙 바통 동료 도전 용기 따뜻함 따뜻한",
    },
    {
      id: "nocturne",
      title: "새벽 두 시의 식탁",
      english: "TABLE AT TWO",
      genre: "드라마",
      minutes: 23,
      mood: "warm",
      moodText: "다정한 온기",
      image: "nocturne",
      posterPath: "assets/frames-v31/nocturne.webp",
      posterPosition: "60% center",
      detailPosition: "center top",
      detailRatio: "1.2",
      description:
        "새벽 두 시에만 문을 여는 작은 식당. 긴 하루를 마친 손님과 말수가 적은 주인은 식어가는 국 한 그릇을 사이에 두고 천천히 이야기를 시작한다.",
      keywords: "드라마 새벽 식당 식탁 음식 위로 대화 따뜻한 일상",
    },
  ];
  const themes = [
    {
      id: "quiet",
      name: "파란 숨 고르기",
      number: "01",
      article: "faces",
      previewDescription: "파도·숲의 소리, 재회와 새벽 대화",
      previewImage: "assets/stills/tide.webp",
      glimpseImage: "assets/frames-v24/forest.webp",
      imageAlt: "젖은 잎과 돌 사이로 흐르는 숲의 작은 물길",
      accent: "#9CBFDF",
      descriptionLines: ["파도와 숲의 소리, 재회와 새벽의 대화."],
      films: ["tide", "forest", "bluehour", "nocturne"],
      filmNotes: {
        tide: "아버지가 남긴 소리에서 기억을 꺼내는 이야기",
        forest: "대사보다 물과 숲의 소리에 머무는 21분",
        bluehour: "옛 친구와 다시 나란히 보내는 오후",
        nocturne: "낯선 손님과 주인이 식탁에서 시작하는 대화",
      },
    },
    {
      id: "warmth",
      name: "다정한 반전",
      number: "02",
      article: "running-time",
      previewDescription: "편지·연주·계주로 다시 잇는 관계",
      previewImage: "assets/frames-v31/letters.webp",
      glimpseImage: "assets/frames-v35/windows.webp",
      imageAlt: "하숙집을 정리하다 서랍에서 편지를 꺼내는 두 친구",
      accent: "#EDBA88",
      descriptionLines: ["편지와 연주, 멈춘 엘리베이터와 마지막 계주."],
      films: ["letters", "windows", "rooftop", "relay"],
      filmNotes: {
        letters: "서랍 속 편지로 두 친구의 여름을 되짚기",
        windows: "멈춘 엘리베이터에서 처음 마주한 이웃",
        rooftop: "마지막 연주로 못다 한 말을 전하는 밴드",
        relay: "기록보다 동료를 돌아보는 마지막 계주",
      },
    },
    {
      id: "beyond",
      name: "상상 바깥으로",
      number: "03",
      article: "enclosed-spaces",
      previewDescription: "온실의 비밀, 종이별과 미래의 신호",
      previewImage: "assets/frames-v35/greenhouse.webp",
      glimpseImage: "assets/frames-v36/orbit.webp",
      imageAlt: "관측 기지에서 기록을 멈추고 녹음에 귀 기울이는 기록원",
      accent: "#C3B6EC",
      descriptionLines: ["온실의 비밀, 우주 메시지·종이별·미래의 신호."],
      films: ["greenhouse", "orbit", "atlas", "signal"],
      filmNotes: {
        greenhouse: "사라진 관리자의 일지가 여는 비밀",
        orbit: "녹음 한 통이 바꾸는 관측 기지의 하루",
        atlas: "마지막 종이에 담을 소원을 고르는 아이",
        signal: "자기 목소리로 도착한 미래의 구조 요청",
      },
    },
  ];
  const articles = [
    {
      id: "faces",
      category: "큐레이션 노트",
      title: "풍경 속에 남은 마음",
      film: "tide",
      paragraphs: [
        "기억을 꺼내는 파도와 숲의 소리에서, 친구와 이웃이 나누는 대화로 이어집니다. 사건의 속도보다 인물과 풍경에 머물고 싶을 때 고른 네 편입니다.",
      ],
    },
    {
      id: "running-time",
      category: "큐레이션 노트",
      title: "서로에게 건네는 작은 용기",
      film: "letters",
      paragraphs: [
        "18분의 편지에서 시작해 연주와 계주로 관계를 넓혀갑니다. 말로 다 하지 못한 마음을 무엇으로 건네는지, 서로 다른 행동을 나란히 보세요.",
      ],
    },
    {
      id: "enclosed-spaces",
      category: "큐레이션 노트",
      title: "익숙한 세계 바깥의 신호",
      film: "greenhouse",
      paragraphs: [
        "일지와 신호의 비밀을 좇을지, 귀환과 마지막 소원을 기다릴지 골라보세요. 낯선 세계를 단서가 이끄는 이야기와 인물의 선택이 이끄는 이야기로 묶었습니다.",
      ],
    },
  ];
  const $ = (id) => document.getElementById(id);
  const pickers = new Map();
  const storageKey = "jansang-cinema:saved:v1";
  const notesKey = "jansang-cinema:notes:v1";
  const libraryViewKey = "jansang-cinema:library-view:v1";
  const validIds = new Set(films.map((f) => f.id));
  const durationOptions = new Set(["all", "20", "30", "over30"]);
  function matchesDuration(film, duration) {
    if (duration === "over30") return film.minutes > 30;
    return duration === "all" || film.minutes <= Number(duration);
  }
  function noteExcerpt(note, limit = 72) {
    const characters = Array.from(note.trim().replace(/\s+/g, " "));
    return characters.length > limit
      ? `${characters.slice(0, limit).join("")}…`
      : characters.join("");
  }
  const state = {
    view: "home",
    mood: "all",
    duration: "all",
    homeMood: "all",
    homeDuration: "all",
    query: "",
    libraryFilter: "all",
    libraryView: "reading",
    sort: "recommended",
    saved: new Set(),
    storageAvailable: true,
    notes: {},
    notesStorageAvailable: true,
  };
  function readSaved(value) {
    try {
      const data = JSON.parse(value || "[]");
      return new Set(
        Array.isArray(data) ? data.filter((id) => validIds.has(id)) : [],
      );
    } catch {
      return new Set();
    }
  }
  try {
    state.saved = readSaved(localStorage.getItem(storageKey));
  } catch {
    state.storageAvailable = false;
  }
  function readNotes(value) {
    try {
      const data = JSON.parse(value || "{}");
      if (!data || Array.isArray(data) || typeof data !== "object") return {};
      return Object.fromEntries(
        Object.entries(data).filter(
          ([id, note]) =>
            validIds.has(id) &&
            typeof note === "string" &&
            note.length <= 280 &&
            note.trim(),
        ),
      );
    } catch {
      return {};
    }
  }
  try {
    state.notes = readNotes(localStorage.getItem(notesKey));
  } catch {
    state.notesStorageAvailable = false;
  }
  function readLibraryView(value) {
    try {
      const view = JSON.parse(value);
      return view === "compact" || view === "reading" ? view : "reading";
    } catch {
      return "reading";
    }
  }
  try {
    state.libraryView = readLibraryView(localStorage.getItem(libraryViewKey));
  } catch {
    state.libraryView = "reading";
  }
  const icon = (name) =>
    `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  let toastTimer;
  function notify(message) {
    const el = $("toast");
    const host = document.querySelector("dialog[open]") || document.body;
    host.append(el);
    clearTimeout(toastTimer);
    el.textContent = message;
    el.classList.add("visible");
    toastTimer = setTimeout(() => el.classList.remove("visible"), 2800);
  }
  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...state.saved]));
      state.storageAvailable = true;
    } catch {
      state.storageAvailable = false;
    }
  }
  function inLibrary(id) {
    return state.saved.has(id) || Boolean(state.notes[id]);
  }
  function inLibraryFilter(id) {
    if (state.libraryFilter === "saved") return state.saved.has(id);
    if (state.libraryFilter === "noted") return Boolean(state.notes[id]);
    return inLibrary(id);
  }
  function libraryNoteLabel(id) {
    return state.notes[id] ? "메모 보기" : "메모 남기기";
  }
  function makeDraftLink(film) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "text-link film-draft-link";
    button.dataset.detail = film.id;
    button.dataset.openDraft = "";
    button.textContent = "저장 전 초안 · 이어쓰기";
    button.setAttribute("aria-label", `${film.title} 저장 전 초안 이어쓰기`);
    button.hidden = !noteDrafts.has(film.id);
    return button;
  }
  function updateDraftLinks() {
    document.querySelectorAll("[data-open-draft]").forEach((button) => {
      button.hidden = !noteDrafts.has(button.dataset.detail);
    });
    renderHomeLibrary();
    requestRailUpdate();
  }
  function updateSaveButtons() {
    document.querySelectorAll("[data-save]").forEach((btn) => {
      const film = films.find((f) => f.id === btn.dataset.save);
      if (!film) return;
      const on = state.saved.has(film.id);
      btn.setAttribute("aria-pressed", String(on));
      const label = `${film.title} ${on ? "찜 해제" : "찜하기"}`;
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });
    document.querySelectorAll("[data-note-for]").forEach((badge) => {
      badge.hidden = !state.notes[badge.dataset.noteFor];
    });
    document.querySelectorAll("[data-note-preview-for]").forEach((preview) => {
      const note = state.notes[preview.dataset.notePreviewFor];
      preview.hidden = !note;
      preview.textContent = note
        ? preview.closest('[data-card-context="saved"]') ? note : noteExcerpt(note)
        : "";
    });
    document.querySelectorAll("[data-open-note]").forEach((button) => {
      const film = films.find((item) => item.id === button.dataset.detail);
      if (!film) return;
      const label = libraryNoteLabel(film.id);
      button.textContent = label;
      button.setAttribute("aria-label", `${film.title} ${label}`);
    });
    const count = films.filter((film) => inLibrary(film.id)).length;
    $("savedCount").textContent = count;
    $("savedCount").hidden = count === 0;
    $("savedCount")
      .closest("a")
      .setAttribute("aria-label", `내 보관함, 영화 ${count}편`);
    $("storageNote").textContent =
      state.storageAvailable && state.notesStorageAvailable
        ? "찜과 메모는 이 브라우저에 저장됩니다."
        : "브라우저 저장 공간을 사용할 수 없어 일부 변경은 이 페이지에서만 유지됩니다.";
    updateDraftLinks();
    requestRailUpdate();
  }
  // The complete poster preserves its lettering; scene images remain available for detail views.
  const posterPath = (film) => `assets/posters-v37/${film.id}.jpg`;
  const scenePath = (film) =>
    film.posterPath || `assets/posters-v8/${film.image}.webp`;
  function makeCard(film, context = "catalog") {
    const article = document.createElement("article");
    article.className = "film-card";
    article.dataset.filmId = film.id;
    article.dataset.cardContext = context;
    article.innerHTML = `<h3><button class="film-art" type="button" data-detail="${film.id}" aria-label="${film.title} 작품 보기"><img src="${posterPath(film)}" alt="" width="1024" height="1536" loading="lazy"></button></h3><div class="film-foot"><div class="film-caption">${context === "home" ? "" : `<p class="film-card-title">${film.title}</p>`}<p class="film-card-meta"><span>${film.genre}</span><span>${film.minutes}분</span></p></div><button class="poster-save save-button" type="button" data-save="${film.id}" aria-label="${film.title} 찜하기" title="${film.title} 찜하기" aria-pressed="false">${icon("bookmark")}</button></div><span class="film-note-badge" data-note-for="${film.id}"${state.notes[film.id] ? "" : " hidden"}>${context === "saved" ? "관심 메모" : "메모 있음"}</span>`;
    if (context === "home")
      article.querySelector(".film-art").setAttribute(
        "aria-label", `${film.title} 작품 보기 · ${film.genre} · ${film.minutes}분`,
      );
    if (context === "saved") {
      const preview = document.createElement("p");
      preview.className = "film-note-preview";
      preview.dataset.notePreviewFor = film.id;
      preview.hidden = !state.notes[film.id];
      preview.textContent = state.notes[film.id] || "";
      article.append(preview);
      const copy = document.createElement("div");
      copy.className = "saved-copy";
      copy.append(...[...article.children].slice(1));
      const actions = document.createElement("div");
      actions.className = "saved-actions";
      const noteButton = document.createElement("button");
      noteButton.type = "button";
      noteButton.className = "text-link";
      noteButton.dataset.detail = film.id;
      noteButton.dataset.openNote = "";
      noteButton.textContent = libraryNoteLabel(film.id);
      noteButton.setAttribute("aria-label", `${film.title} ${noteButton.textContent}`);
      actions.append(noteButton, makeDraftLink(film));
      copy.append(actions);
      article.append(copy);
    } else if (context !== "theme") article.append(makeDraftLink(film));
    return article;
  }
  function renderThemes() {
    updateSaveButtons();
  }
  function makeThemePreview(theme) {
    const link = document.createElement("a");
    link.className = "theme-preview theme-overview-card";
    link.href = `#themes/${theme.id}`;
    link.dataset.themePreview = theme.id;
    link.setAttribute("aria-haspopup", "dialog");
    link.innerHTML = `<div class="theme-preview-image"><img src="${theme.previewImage}" alt="" width="1672" height="941" loading="lazy"><img class="theme-glimpse" src="${theme.glimpseImage}" alt="" width="1086" height="1448" loading="lazy"><span class="theme-preview-number" aria-hidden="true">COLLECTION ${theme.number}</span></div><div class="theme-preview-copy"><h3>${theme.name}</h3><p class="theme-preview-description">${theme.previewDescription}</p><span class="theme-preview-meta">작품 ${theme.films.length}편 · 큐레이션 보기${icon("arrow")}</span></div>`;
    return link;
  }
  $("themeOverview").replaceChildren(...themes.map(makeThemePreview));
  document.querySelectorAll("[data-theme-preview]").forEach(link => link.setAttribute("aria-haspopup", "dialog"));
  const homeSelection = [
    "tide",
    "rooftop",
    "atlas",
    "signal",
    "forest",
    "nocturne",
    "letters",
    "greenhouse",
    "orbit",
    "relay",
    "windows",
    "bluehour",
  ];
  const orderedFilms = homeSelection.map((id) =>
    films.find((film) => film.id === id),
  );
  let homeLibrarySignature = "";
  let moodShiftTimer;
  function renderHomeLibrary() {
    const libraryFilms = orderedFilms
      .filter((film) => inLibrary(film.id))
      .slice(0, 3);
    const signature = JSON.stringify(
      libraryFilms.map((film) => [film.id, state.notes[film.id] || "", noteDrafts.has(film.id)]),
    );
    if (signature === homeLibrarySignature) return;
    homeLibrarySignature = signature;
    const container = $("homeLibraryItems");
    const libraryHadFocus = $("homeLibrary").contains(document.activeElement);
    const focusedId = container.contains(document.activeElement)
      ? document.activeElement.closest("[data-detail]")?.dataset.detail
      : null;
    $("homeLibrary").hidden = libraryFilms.length === 0;
    container.replaceChildren(
      ...libraryFilms.map((film) => {
        const entry = document.createElement("div");
        entry.className = "library-mini-entry";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "library-mini-item";
        button.dataset.detail = film.id;
        button.setAttribute(
          "aria-label",
          `${film.title} 작품 보기${state.notes[film.id] ? ", 메모 있음" : ""}`,
        );
        button.innerHTML = `<img src="${posterPath(film)}" alt="" width="80" height="120" loading="lazy"><span class="library-mini-copy"><strong>${film.title}</strong><span>${film.genre} · ${film.minutes}분</span></span>`;
        if (film.posterPosition)
          button.querySelector("img").style.objectPosition = film.posterPosition;
        if (state.notes[film.id]) {
          const preview = document.createElement("span");
          preview.className = "library-mini-note";
          preview.id = `home-note-${film.id}`;
          preview.textContent = noteExcerpt(state.notes[film.id]);
          button.setAttribute("aria-describedby", preview.id);
          button.querySelector(".library-mini-copy").append(preview);
        }
        entry.append(button, makeDraftLink(film));
        return entry;
      }),
    );
    if (focusedId || (libraryHadFocus && !libraryFilms.length)) {
      const replacement =
        (focusedId && container.querySelector(`[data-detail="${focusedId}"]`)) ||
        container.querySelector("[data-detail]") ||
        document.querySelector('.nav [data-view="browse"]');
      replacement?.focus({ preventScroll: true });
    }
  }
  function renderHome() {
    finishRailDrag();
    stopRailMotion();
    const homeView = $("homeView");
    const moodChanged =
      homeView.dataset.atmosphere &&
      homeView.dataset.atmosphere !== state.homeMood;
    homeView.dataset.atmosphere = state.homeMood;
    if (moodChanged) {
      clearTimeout(moodShiftTimer);
      homeView.classList.remove("mood-shift");
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Restart the brief response even if the next mood is chosen quickly.
        void homeView.offsetWidth;
        homeView.classList.add("mood-shift");
        moodShiftTimer = setTimeout(
          () => homeView.classList.remove("mood-shift"),
          1200,
        );
      }
    }
    const visible = orderedFilms.filter(
      (film) =>
        (state.homeMood === "all" || film.mood === state.homeMood) &&
        matchesDuration(film, state.homeDuration),
    );
    filmRail.replaceChildren(...visible.map((film) => makeCard(film, "home")));
    filmRail.hidden = visible.length === 0;
    filmRail.closest(".rail-shell").hidden = visible.length === 0;
    $("homeEmpty").hidden = visible.length > 0;
    $("homeResultCount").textContent = `${visible.length}편`;
    $("homeDuration").value = state.homeDuration;
    syncPickers();
    document.querySelectorAll("[data-home-mood]").forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.homeMood === state.homeMood),
      ),
    );
    railStatus.hidden = visible.length === 0;
    filmRail.scrollLeft = 0;
    updateSaveButtons();
  }
  const filmRail = $("homeFilms");
  const railStatus = document.querySelector('[data-rail-status="homeFilms"]');
  const railPosition = $("railPosition");
  let railFrame = 0;
  let railDrag = null;
  let railSuppressClickUntil = 0;
  let railMotionTimer;
  let railInteractionUntil = 0;
  function railMetrics() {
    const style = getComputedStyle(filmRail);
    const bounds = filmRail.getBoundingClientRect();
    const insetStart = Math.max(
      parseFloat(style.paddingLeft) || 0,
      parseFloat(style.scrollPaddingLeft) || 0,
    );
    const insetEnd = Math.max(
      parseFloat(style.paddingRight) || 0,
      parseFloat(style.scrollPaddingRight) || 0,
    );
    const max = Math.max(0, filmRail.scrollWidth - filmRail.clientWidth);
    return {
      max,
      left: Math.max(0, Math.min(max, filmRail.scrollLeft)),
      start: bounds.left + insetStart,
      end: bounds.right - insetEnd,
      width: Math.max(1, filmRail.clientWidth - insetStart - insetEnd),
      gap: parseFloat(style.columnGap) || 0,
    };
  }
  function stopRailMotion() {
    clearTimeout(railMotionTimer);
    railInteractionUntil = 0;
    filmRail.closest(".rail-shell").classList.remove("rail-moving");
  }
  function armRailMotion() {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      railInteractionUntil = performance.now() + 1200;
  }
  function onRailScroll() {
    requestRailUpdate();
    if (
      performance.now() > railInteractionUntil ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const shell = filmRail.closest(".rail-shell");
    shell.classList.add("rail-moving");
    clearTimeout(railMotionTimer);
    railMotionTimer = setTimeout(() => shell.classList.remove("rail-moving"), 500);
  }
  function updateRail() {
    railFrame = 0;
    const shell = filmRail.closest(".rail-shell");
    const shown = Boolean(filmRail.getClientRects().length);
    const metrics = railMetrics();
    const max = shown ? metrics.max : 0;
    const left = shown ? metrics.left : 0;
    shell.classList.toggle("rail-static", max <= 2);
    shell.classList.toggle("can-scroll-prev", left > 2);
    shell.classList.toggle("can-scroll-next", left < max - 2);
    shell.style.setProperty("--rail-position", String(max > 0 ? left / max : 0));
    shell.style.setProperty(
      "--rail-visible",
      `${max > 0 ? Math.min(100, (metrics.width / (max + metrics.width)) * 100) : 100}%`,
    );
    filmRail.classList.toggle("rail-draggable", max > 2);
    if (railStatus) railStatus.hidden = max <= 2;
    const focused = document.activeElement;
    const cards = [...filmRail.children].map((card, index) => {
      const rect = card.getBoundingClientRect();
      const fullyVisible = shown && (
        max <= 2 || (rect.left >= metrics.start - 1 && rect.right <= metrics.end + 1)
      );
      card.classList.toggle("rail-card-partial", shown && !fullyVisible);
      // Keep the visible poster as the entry point when its metadata is clipped.
      // Move keyboard focus off controls that are about to become hidden.
      if (!fullyVisible && (
        card.querySelector(".film-foot")?.contains(focused) ||
        card.querySelector(".film-draft-link")?.contains(focused)
      ))
        filmRail.focus({ preventScroll: true });
      return {
        rect,
        index,
        fullyVisible,
        visibleWidth: Math.max(0, Math.min(rect.right, metrics.end) - Math.max(rect.left, metrics.start)),
      };
    });
    if (railStatus) {
      let visible = shown ? cards.filter(({ fullyVisible }) => fullyVisible) : [];
      // During a drag, keep a meaningful range even between snap positions.
      if (!visible.length && cards.length) {
        const mostVisible = cards.reduce((best, card) =>
          card.visibleWidth > best.visibleWidth ? card : best,
        );
        if (mostVisible.visibleWidth > 0) visible = [mostVisible];
      }
      const range = visible.length ? `${String(visible[0].index + 1).padStart(2, "0")}${visible.length > 1 ? `–${String(visible.at(-1).index + 1).padStart(2, "0")}` : ""}` : "00";
      railStatus.innerHTML = `<span class="rail-current">${range}</span><span class="rail-divider" aria-hidden="true">/</span><span>${String(cards.length).padStart(2, "0")}</span>`;
      railPosition.value = String(max ? Math.round(left / max * 100) : 0);
      railPosition.setAttribute("aria-valuetext", `전체 ${cards.length}편 중 ${visible.length ? visible[0].index + 1 : 0}번째부터 표시`);
      railPosition.disabled = max <= 2;
    }
  }
  railPosition.addEventListener("input", () => {
    armRailMotion();
    filmRail.scrollTo({ left: railMetrics().max * Number(railPosition.value) / 100, behavior: "instant" });
    requestRailUpdate();
  });
  railPosition.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const metrics = railMetrics();
    const step = (filmRail.firstElementChild?.getBoundingClientRect().width || 1) + metrics.gap;
    const left = event.key === "Home" ? 0 : event.key === "End" ? metrics.max : metrics.left + (event.key === "ArrowRight" ? step : -step);
    filmRail.scrollTo({ left, behavior: "instant" });
    requestRailUpdate();
  });
  function requestRailUpdate() {
    if (!railFrame) railFrame = requestAnimationFrame(updateRail);
  }
  function scrollRail(direction) {
    const first = filmRail.children[0];
    if (!first) return;
    const second = filmRail.children[1];
    const stride = second
      ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
      : first.getBoundingClientRect().width;
    const metrics = railMetrics();
    const count = Math.max(
      1,
      Math.floor((metrics.width + metrics.gap + 1) / Math.max(stride, 1)),
    );
    armRailMotion();
    filmRail.scrollTo({
      left: Math.max(0, Math.min(metrics.max, metrics.left + direction * Math.max(stride, 1) * count)),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    requestRailUpdate();
  }
  function finishRailDrag() {
    if (!railDrag) return;
    const { pointerId, dragging } = railDrag;
    railDrag = null;
    if (dragging) railSuppressClickUntil = performance.now() + 400;
    filmRail.classList.remove("rail-dragging");
    if (filmRail.hasPointerCapture(pointerId))
      filmRail.releasePointerCapture(pointerId);
    requestRailUpdate();
  }
  if (!filmRail.hasAttribute("tabindex")) filmRail.tabIndex = 0;
  filmRail.addEventListener("pointerdown", (event) => {
    armRailMotion();
    if (
      event.pointerType !== "mouse" ||
      !event.isPrimary ||
      event.button !== 0 ||
      filmRail.scrollWidth - filmRail.clientWidth <= 2
    )
      return;
    finishRailDrag();
    railSuppressClickUntil = 0;
    railDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startLeft: filmRail.scrollLeft,
      dragging: false,
    };
  });
  window.addEventListener("pointermove", (event) => {
    if (!railDrag || event.pointerId !== railDrag.pointerId) return;
    if (!(event.buttons & 1)) {
      finishRailDrag();
      return;
    }
    const deltaX = event.clientX - railDrag.startX;
    const deltaY = event.clientY - railDrag.startY;
    if (!railDrag.dragging) {
      if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        finishRailDrag();
        return;
      }
      if (Math.abs(deltaX) < 8) return;
      railDrag.dragging = true;
      filmRail.classList.add("rail-dragging");
      filmRail.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    armRailMotion();
    filmRail.scrollLeft = railDrag.startLeft - deltaX;
  });
  for (const type of ["pointerup", "pointercancel"]) {
    window.addEventListener(type, (event) => {
      if (event.pointerId === railDrag?.pointerId) finishRailDrag();
    });
  }
  filmRail.addEventListener("lostpointercapture", (event) => {
    if (event.pointerId === railDrag?.pointerId) finishRailDrag();
  });
  window.addEventListener("blur", () => {
    finishRailDrag();
    stopRailMotion();
  });
  filmRail.addEventListener("dragstart", (event) => event.preventDefault());
  filmRail.addEventListener(
    "click",
    (event) => {
      if (event.detail === 0 || performance.now() >= railSuppressClickUntil)
        return;
      railSuppressClickUntil = 0;
      event.preventDefault();
      event.stopImmediatePropagation();
    },
    true,
  );
  filmRail.addEventListener("wheel", armRailMotion, { passive: true });
  filmRail.addEventListener("touchmove", armRailMotion, { passive: true });
  filmRail.addEventListener("scroll", onRailScroll, { passive: true });
  filmRail.addEventListener("focusin", (event) => {
    const card = event.target.closest(".film-card");
    if (!card || !event.target.matches(":focus-visible")) return;
    const metrics = railMetrics();
    const rect = card.getBoundingClientRect();
    if (rect.left >= metrics.start - 1 && rect.right <= metrics.end + 1) return;
    // Only scroll this rail; keyboard browsing must not move the page vertically.
    filmRail.scrollTo({
      left: Math.max(0, Math.min(metrics.max, metrics.left + rect.left - metrics.start)),
      behavior: "instant",
    });
    requestRailUpdate();
  });
  filmRail.addEventListener("keydown", (event) => {
    if (
      event.target !== filmRail ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      scrollRail(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      armRailMotion();
      filmRail.scrollTo({
        left: event.key === "Home" ? 0 : filmRail.scrollWidth,
        behavior: "instant",
      });
      requestRailUpdate();
    }
  });
  if (typeof ResizeObserver !== "undefined")
    new ResizeObserver(requestRailUpdate).observe(filmRail);
  window.addEventListener("resize", requestRailUpdate);
  document.fonts?.ready.then(requestRailUpdate);
  function matches(film) {
    const q = state.query.toLocaleLowerCase("ko").replace(/\s+/g, "");
    return (
      (state.view !== "saved" || inLibraryFilter(film.id)) &&
      (state.mood === "all" || state.mood === film.mood) &&
      (state.view !== "browse" || matchesDuration(film, state.duration)) &&
      (!q ||
        `${film.title} ${film.english} ${film.genre} ${film.moodText} ${film.keywords} ${state.view === "saved" ? state.notes[film.id] || "" : ""}`
          .toLocaleLowerCase("ko")
          .replace(/\s+/g, "")
          .includes(q))
    );
  }
  function render({ preserveFocus = false } = {}) {
    const controlsHadFocus = preserveFocus && document.activeElement.closest(
      "#libraryFilters, #catalogTools, #catalogOptions, #resultsBar",
    );
    const focused =
      preserveFocus && $("filmGrid").contains(document.activeElement)
        ? document.activeElement.closest("[data-detail], [data-save]")
        : null;
    const focusedAttribute = focused?.hasAttribute("data-detail")
      ? "data-detail"
      : "data-save";
    const focusedId = focused?.getAttribute(focusedAttribute);
    const focusedNote = focused?.hasAttribute("data-open-note");
    const focusedDraft = focused?.hasAttribute("data-open-draft");
    const visible = orderedFilms.filter(matches);
    const emptyLibrary =
      state.view === "saved" && !films.some((film) => inLibrary(film.id));
    if (state.sort === "title")
      visible.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    if (state.sort === "short")
      visible.sort((a, b) => a.minutes - b.minutes);
    const grid = $("filmGrid");
    grid.classList.toggle("library-reading", state.view === "saved" && state.libraryView === "reading");
    grid.classList.toggle("library-compact", state.view === "saved" && state.libraryView === "compact");
    grid.replaceChildren(...visible.map((film) => makeCard(film, state.view)));
    const filtered =
      state.query.trim() ||
      state.mood !== "all" ||
      (state.view === "browse" && state.duration !== "all") ||
      (state.view === "saved" && state.libraryFilter !== "all");
    const libraryLabels = {
      all: "보관함 전체",
      saved: "찜한 영화",
      noted: "메모 있는 영화",
    };
    const libraryCount = films.filter((film) => inLibrary(film.id)).length;
    $("resultCount").textContent = state.view === "saved" && state.query.trim()
      ? `검색 결과 ${visible.length}편 · 보관함 ${libraryCount}편`
      : `${state.view === "saved" ? libraryLabels[state.libraryFilter] : filtered ? "검색 결과" : "전체"} ${visible.length}편`;
    $("searchInput").placeholder = state.view === "saved" ? "작품 정보·저장 메모 검색" : "제목·장르·분위기·키워드";
    $("searchLabel").textContent = state.view === "saved"
      ? "보관함 영화 제목, 장르, 분위기, 키워드와 저장한 메모 검색"
      : "영화 제목, 장르, 분위기, 키워드 검색";
    $("libraryFilters").hidden = state.view !== "saved" || emptyLibrary;
    $("catalogTools").hidden = emptyLibrary;
    $("catalogOptions").hidden = emptyLibrary;
    $("resultsBar").hidden = emptyLibrary;
    $("libraryView").hidden = state.view !== "saved" || emptyLibrary;
    $("libraryView").querySelectorAll("[data-library-view]").forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.libraryView === state.libraryView)),
    );
    $("moodFilters").hidden = state.view === "saved";
    $("sortField").hidden = emptyLibrary;
    $("durationField").hidden = state.view !== "browse";
    $("durationFilter").value = state.duration;
    $("catalogSort").value = state.sort;
    syncPickers();
    $("catalogTools").classList.toggle("library-tools", state.view === "saved");
    document
      .querySelectorAll("[data-library-filter]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.libraryFilter === state.libraryFilter),
        ),
      );
    $("resetFilters").hidden = !filtered;
    $("clearSearch").hidden = !state.query;
    document
      .querySelectorAll("[data-mood]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.mood === state.mood)),
      );
    $("emptyState").hidden = visible.length > 0;
    $("emptyState").classList.toggle("library-empty", emptyLibrary);
    grid.hidden = visible.length === 0;
    const emptyCategory =
      state.view === "saved" &&
      !emptyLibrary &&
      !films.some((film) => inLibraryFilter(film.id));
    $("emptyTitle").textContent = emptyLibrary
      ? "아직 보관한 영화가 없어요."
      : emptyCategory
        ? state.libraryFilter === "saved"
          ? "아직 찜한 영화가 없어요."
          : "아직 메모를 남긴 영화가 없어요."
        : "조건에 맞는 영화가 없어요.";
    $("emptyText").textContent = emptyLibrary
      ? "찜하거나 관심 메모를 남긴 작품을 모아보세요."
      : emptyCategory
        ? "다른 분류에서 영화를 찾아보세요."
        : state.view === "saved"
          ? `보관함에는 ${libraryCount}편이 있어요. 다른 검색어나 분류로 다시 찾아보세요.`
          : "분위기나 러닝타임을 바꿔보세요.";
    $("emptyAction").dataset.action = emptyLibrary ? "browse" : "reset";
    $("emptyAction").textContent = emptyLibrary
      ? "영화 찾기"
      : emptyCategory
        ? "보관함 전체보기"
        : "조건 초기화";
    $("storageNote").hidden = state.view !== "saved";
    updateSaveButtons();
    if (focusedId) {
      const replacement =
        grid.querySelector(`[${focusedAttribute}="${focusedId}"]${focusedDraft ? "[data-open-draft]:not([hidden])" : focusedNote ? "[data-open-note]" : ""}`) ||
        grid.querySelector("[data-detail]") ||
        $("emptyAction");
      replacement.focus({ preventScroll: true });
    } else if (emptyLibrary && controlsHadFocus) {
      $("emptyAction").focus({ preventScroll: true });
    }
  }
  function resetFilters() {
    state.mood = "all";
    state.duration = "all";
    state.query = "";
    if (state.view === "saved") state.libraryFilter = "all";
    $("searchInput").value = "";
    render();
  }
  const catalogFilters = {
    browse: { mood: "all", duration: "all", query: "", sort: "recommended" },
    saved: { mood: "all", duration: "all", query: "", sort: "recommended" },
  };
  let searchRequested = false;
  let firstRoute = true;
  function navigate(path) {
    const hash = `#${path}`;
    if (location.hash === hash) route();
    else location.hash = hash;
  }
  function route() {
    closePickers();
    stopRailMotion();
    dialogRouteVersion += 1;
    document
      .querySelectorAll("dialog[open]")
      .forEach((dialog) => closeDialog(dialog, { restoreFocus: false }));
    let [path, themeId] = location.hash.slice(1).split("/");
    if (["journal", "news"].includes(path)) {
      history.replaceState(null, "", "#themes");
      path = "themes";
      themeId = undefined;
    }
    const view = ["browse", "saved", "themes"].includes(path)
      ? path
      : "home";
    const previousView = state.view;
    if (catalogFilters[previousView])
      catalogFilters[previousView] = {
        mood: state.mood,
        duration: state.duration,
        query: state.query,
        sort: state.sort,
      };
    state.view = view;
    document.body.dataset.view = view;
    document.body.classList.toggle("saved-view", view === "saved");
    $("homeView").hidden = view !== "home";
    $("themesView").hidden = view !== "themes";
    $("catalogView").hidden = !["browse", "saved"].includes(view);
    document.querySelectorAll(".nav [data-view]").forEach((a) => {
      if (a.dataset.view === view) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    let heading = $("heroTitle");
    if (catalogFilters[view]) {
      Object.assign(state, catalogFilters[view]);
      if (view === "saved") state.mood = "all";
      $("searchInput").value = state.query;
      $("catalogTitle").textContent =
        view === "saved" ? "내 보관함" : "영화 찾기";
      $("catalogKicker").textContent =
        view === "saved" ? "나의 관심 작품" : "단편영화 큐레이션";
      if (searchRequested) resetFilters();
      else render();
      heading = $("catalogTitle");
    } else if (view === "themes") {
      renderThemes();
      heading = $("themesTitle");
    } else {
      updateSaveButtons();
    }
    const pageTitle = {
      home: "취향으로 고르는 단편영화",
      themes: "큐레이션",
      browse: "영화 찾기",
      saved: "내 보관함",
    }[view];
    document.title = `${pageTitle} — 잔상관`;
    if (!firstRoute) {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (searchRequested) $("searchInput").focus({ preventScroll: true });
      else heading.focus({ preventScroll: true });
    }
    searchRequested = false;
    firstRoute = false;
    requestRailUpdate();
    if (view === "themes" && themes.some(item => item.id === themeId))
      showArticle(themes.find(item => item.id === themeId).article, document.querySelector(`#themeOverview [data-theme-preview="${themeId}"]`));
  }
  window.addEventListener("hashchange", route);
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (
      !link ||
      link.classList.contains("skip") ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    const hash = link.getAttribute("href");
    if (!/^#(home|browse|saved|themes|journal|news)(\/|$)/.test(hash)) return;
    event.preventDefault();
    if (link.dataset.themePreview) {
      const theme = themes.find(item => item.id === link.dataset.themePreview);
      if (theme) showArticle(theme.article, link);
      return;
    }
    if (
      state.view === "home" &&
      link.matches('.nav [data-view="browse"]')
    ) {
      catalogFilters.browse = {
        ...catalogFilters.browse,
        mood: state.homeMood,
        duration: state.homeDuration,
        query: "",
      };
    }
    navigate(hash.slice(1));
  });
  $("searchShortcut").addEventListener("click", () => {
    searchRequested = true;
    navigate("browse");
  });
  $("durationFilter").addEventListener("change", (event) => {
    if (!durationOptions.has(event.target.value)) return;
    state.duration = event.target.value;
    render();
  });
  document.querySelectorAll("[data-home-mood]").forEach((button) => {
    button.addEventListener("click", () => {
      state.homeMood = button.dataset.homeMood;
      renderHome();
    });
  });
  $("homeDuration").addEventListener("change", (event) => {
    if (!durationOptions.has(event.target.value)) return;
    state.homeDuration = event.target.value;
    renderHome();
  });
  $("homeReset").addEventListener("click", () => {
    state.homeMood = "all";
    state.homeDuration = "all";
    renderHome();
    document.querySelector('[data-home-mood="all"]').focus();
  });
  $("catalogSort").addEventListener("change", (event) => {
    if (!["recommended", "title", "short"].includes(event.target.value)) return;
    state.sort = event.target.value;
    render();
  });
  $("libraryView").addEventListener("click", (event) => {
    const button = event.target.closest("[data-library-view]");
    if (state.view !== "saved" || !button ||
      !["reading", "compact"].includes(button.dataset.libraryView)) return;
    state.libraryView = button.dataset.libraryView;
    try {
      localStorage.setItem(libraryViewKey, JSON.stringify(state.libraryView));
    } catch {
      notify("보기 선택은 이 페이지에서만 유지돼요. 브라우저 저장 공간을 사용할 수 없습니다.");
    }
    render();
  });
  $("searchInput").addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });
  $("clearSearch").addEventListener("click", () => {
    state.query = "";
    $("searchInput").value = "";
    render();
    $("searchInput").focus();
  });
  document.querySelectorAll("[data-mood]").forEach((b) =>
    b.addEventListener("click", () => {
      state.mood = b.dataset.mood;
      render();
    }),
  );
  document.querySelectorAll("[data-library-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      state.libraryFilter = button.dataset.libraryFilter;
      render();
    }),
  );
  $("resetFilters").addEventListener("click", () => {
    resetFilters();
    document
      .querySelector(
        state.view === "saved"
          ? '[data-library-filter="all"]'
          : '[data-mood="all"]',
      )
      .focus();
  });
  $("emptyAction").addEventListener("click", () => {
    if ($("emptyAction").dataset.action === "browse") navigate("browse");
    else {
      resetFilters();
      $("searchInput").focus();
    }
  });
  const dialogContexts = new Map();
  const pendingDialogClosures = new WeakMap();
  let dialogRouteVersion = 0;
  // Drafts survive internal navigation, but never count as saved library notes.
  // They are intentionally memory-only and disappear on refresh or tab close.
  const noteDrafts = new Map();
  // Deleted notes can be restored across routes, but never survive a reload.
  const deletedNotes = new Map();
  let noteUndoExpanded = false;
  let activeDetailId = null;
  let detailImageRequest = 0;
  let noteDirty = false;
  let noteMode = "edit";
  let noteSizeFrame = 0;
  function resizeNoteText() {
    noteSizeFrame = 0;
    const textarea = $("noteText");
    if (!$("detailDialog").open || !$("noteDisclosure").open || !textarea.getClientRects().length)
      return;
    const scroller = textarea.closest(".dialog-scroll");
    const scrollTop = scroller.scrollTop;
    const style = getComputedStyle(textarea);
    const border = (parseFloat(style.borderTopWidth) || 0) +
      (parseFloat(style.borderBottomWidth) || 0);
    const padding = (parseFloat(style.paddingTop) || 0) +
      (parseFloat(style.paddingBottom) || 0);
    const inlineWidth = textarea.style.width;
    // Keep line wrapping stable while the temporary short height changes the
    // popup scrollbar. Its final width is rechecked by the observer below.
    textarea.style.width = style.width;
    textarea.style.height = "auto";
    const contentHeight = textarea.scrollHeight +
      (style.boxSizing === "border-box" ? border : -padding);
    textarea.style.height = `${Math.max(parseFloat(style.minHeight) || 0, contentHeight)}px`;
    textarea.style.width = inlineWidth;
    textarea.scrollTop = 0;
    // Measuring a shorter temporary box must not pull a long popup back to its top.
    scroller.scrollTop = scrollTop;
  }
  function requestNoteResize() {
    if (!noteSizeFrame) noteSizeFrame = requestAnimationFrame(resizeNoteText);
  }
  function rememberNoteDraft() {
    if (!activeDetailId || noteMode !== "edit") return;
    const value = $("noteText").value;
    noteDirty = value !== (state.notes[activeDetailId] || "");
    if (noteDirty) {
      noteDrafts.set(activeDetailId, {
        value,
        conflicted: noteDrafts.get(activeDetailId)?.conflicted || false,
      });
    } else noteDrafts.delete(activeDetailId);
    updateDraftLinks();
  }
  function closeDialog(dialog, { restoreFocus = true } = {}) {
    if (!dialog?.open) return;
    const context = dialogContexts.get(dialog) || {};
    context.restoreFocus = restoreFocus;
    dialogContexts.delete(dialog);
    if (dialog.id === "detailDialog") {
      rememberNoteDraft();
      activeDetailId = null;
      noteDirty = false;
    }
    const pending = pendingDialogClosures.get(dialog) || [];
    pending.push(context);
    pendingDialogClosures.set(dialog, pending);
    dialog.close();
  }
  function openDialog(dialog, trigger, heading, { returnToArticle = null, scrollTop = 0, focusTarget = heading } = {}) {
    document.querySelectorAll("dialog[open]").forEach((open) => {
      if (open !== dialog) closeDialog(open, { restoreFocus: false });
    });
    dialogContexts.set(dialog, {
      trigger,
      detailId: dialog.id === "detailDialog" ? activeDetailId : null,
      restoreFocus: true,
      routeVersion: dialogRouteVersion,
      returnToArticle,
    });
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    const scroller = dialog.querySelector(".dialog-scroll");
    scroller?.scrollTo({ top: scrollTop, behavior: "instant" });
    dialog.dataset.scrolled = String((scroller?.scrollTop || 0) > 8);
    document.body.classList.add("dialog-open");
    focusTarget.focus({ preventScroll: true });
  }
  function noteSavedMessage() {
    return state.notesStorageAvailable
      ? "메모를 저장했어요."
      : "이 페이지에서만 보관 중이에요. 새로고침하면 사라집니다.";
  }
  function updateNoteDisclosureLabel() {
    $("noteDisclosureLabel").textContent = state.notes[activeDetailId]
      ? noteMode === "read" ? "관심 메모 보기" : "관심 메모 수정"
      : noteDrafts.has(activeDetailId)
        ? "관심 메모 이어쓰기"
        : "관심 메모 남기기";
  }
  function updateNoteCount() {
    $("noteCount").textContent = `${$("noteText").value.length}/280`;
    updateNoteDisclosureLabel();
  }
  function updateNotePresentation(message = "") {
    const savedNote = state.notes[activeDetailId];
    if (!savedNote) noteMode = "edit";
    const reading = noteMode === "read";
    $("noteReader").hidden = !reading;
    $("noteForm").hidden = reading;
    $("noteReadText").textContent = savedNote || "";
    $("noteDraftNotice").hidden = !reading || !noteDrafts.has(activeDetailId);
    $("noteReaderStatus").textContent = message || (state.notesStorageAvailable
      ? "이 브라우저에 저장된 메모" : "브라우저 저장 공간을 사용할 수 없습니다.");
    $("noteCancel").textContent = savedNote ? "수정 취소" : "작성 취소";
    $("noteDelete").disabled = !savedNote;
    updateNoteCount();
    updateDraftLinks();
  }
  function loadNote(message = "") {
    if (
      noteDrafts.get(activeDetailId)?.value ===
      (state.notes[activeDetailId] || "")
    )
      noteDrafts.delete(activeDetailId);
    const draft = noteDrafts.get(activeDetailId);
    $("noteText").value = draft
      ? draft.value
      : state.notes[activeDetailId] || "";
    noteDirty = Boolean(draft);
    updateNotePresentation(message);
    resizeNoteText();
    $("noteStatus").textContent = draft
      ? noteDraftMessage()
      : state.notes[activeDetailId]
        ? "저장된 메모입니다. 수정 후 저장해 주세요."
        : "";
  }
  function noteDraftMessage() {
    if (noteDrafts.get(activeDetailId)?.conflicted)
      return "다른 탭의 저장본이 바뀌었어요. 이 초안을 저장하면 최신 저장본을 덮어씁니다.";
    return "저장 전 메모 · 새로고침하면 사라져요.";
  }
  function refreshLibrary({ preserveFocus = false } = {}) {
    if (state.view === "saved") render({ preserveFocus });
    else updateSaveButtons();
  }
  function persistNotes() {
    try {
      localStorage.setItem(notesKey, JSON.stringify(state.notes));
      state.notesStorageAvailable = true;
    } catch {
      state.notesStorageAvailable = false;
    }
  }
  function renderNoteUndo() {
    const focused = document.activeElement.closest("[data-restore-note], [data-dismiss-note]");
    const focusedHost = focused?.closest(".note-undo-list");
    const focusedAction = focused?.hasAttribute("data-restore-note") ? "data-restore-note" : "data-dismiss-note";
    const focusedId = focused?.getAttribute(focusedAction);
    const focusedGlobal = focused && $("noteUndoTray").contains(focused);
    if (!deletedNotes.size) noteUndoExpanded = false;
    [$("noteUndoList"), $("detailUndoList")].forEach((host) => {
      const entries = [...deletedNotes].filter(([id]) => host.id === "noteUndoList" || id === activeDetailId);
      host.replaceChildren(...entries.map(([id, deleted]) => {
        const film = films.find((item) => item.id === id);
        const item = document.createElement("div");
        item.className = "note-undo-item";
        const copy = document.createElement("p");
        const title = document.createElement("strong");
        title.textContent = film.title;
        copy.append(title, document.createTextNode(` · ${state.notes[id]
          ? "새 메모가 있어 이전 메모를 덮어쓰지 않습니다."
          : deleted.message || "메모를 삭제했어요. 새로고침 전까지 복원할 수 있어요."}`));
        const actions = document.createElement("div");
        actions.className = "note-undo-actions";
        const restore = document.createElement("button");
        restore.type = "button";
        restore.className = "button small";
        restore.dataset.restoreNote = id;
        restore.textContent = "메모 복원";
        restore.setAttribute("aria-label", `${film.title} 메모 복원`);
        restore.disabled = Boolean(state.notes[id]);
        const dismiss = document.createElement("button");
        dismiss.type = "button";
        dismiss.className = "text-link";
        dismiss.dataset.dismissNote = id;
        dismiss.textContent = "복원 안 함";
        dismiss.setAttribute("aria-label", `${film.title} 메모 복원 안 함`);
        actions.append(restore, dismiss);
        item.append(copy, actions);
        return item;
      }));
      host.hidden = entries.length === 0 || (host.id === "noteUndoList" && !noteUndoExpanded);
    });
    $("noteUndoTray").hidden = deletedNotes.size === 0;
    $("noteUndoTitle").textContent = `삭제한 메모 ${deletedNotes.size}개`;
    $("noteUndoToggle").setAttribute("aria-expanded", String(noteUndoExpanded));
    $("noteUndoToggle").textContent = noteUndoExpanded ? "목록 접기" : "복원 목록";
    const singleId = deletedNotes.size === 1 ? deletedNotes.keys().next().value : null;
    const quickRestore = $("noteUndoQuickRestore");
    quickRestore.hidden = !singleId || Boolean(state.notes[singleId]);
    if (!quickRestore.hidden) {
      quickRestore.dataset.restoreNote = singleId;
      quickRestore.setAttribute("aria-label", `${films.find((film) => film.id === singleId).title} 메모 복원`);
    } else quickRestore.removeAttribute("data-restore-note");
    const hasConflict = [...deletedNotes.keys()].some((id) => state.notes[id]);
    const hasError = [...deletedNotes.values()].some((deleted) => deleted.message);
    $("noteUndoStatus").hidden = !hasConflict && !hasError;
    $("noteUndoStatus").textContent = hasConflict
      ? "새 메모가 있는 작품은 덮어쓰지 않아요. 복원 목록에서 확인해 주세요."
      : hasError ? "복원하지 못했어요. 복원 목록에서 확인하고 다시 시도해 주세요." : "";
    if (focusedId) {
      const replacement = focusedGlobal && !noteUndoExpanded
        ? !quickRestore.hidden ? quickRestore : $("noteUndoToggle")
        : focusedHost?.querySelector(`[${focusedAction}="${focusedId}"]:not([disabled])`)
          || focusedHost?.querySelector("button:not([disabled])");
      replacement?.focus({ preventScroll: true });
    }
  }
  $("noteUndoToggle").addEventListener("click", () => {
    noteUndoExpanded = !noteUndoExpanded;
    renderNoteUndo();
  });
  function focusAfterNoteUndo(id) {
    if ($("detailDialog").open && activeDetailId === id) {
      (noteMode === "read" && state.notes[id] ? $("noteDraftNotice").hidden ? $("noteReadText") : $("noteDraftNotice")
        : $("noteDisclosure").querySelector("summary")).focus();
      return;
    }
    const cardButton = $("filmGrid").querySelector(`[data-open-note][data-detail="${id}"]`);
    const target = cardButton?.getClientRects().length ? cardButton
      : !$("noteUndoTray").hidden ? $("noteUndoTitle") : $("main-content");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "nearest", behavior: "instant" });
  }
  function writeNoteChange(notes) {
    try {
      localStorage.setItem(notesKey, JSON.stringify(notes));
      state.notes = notes;
      state.notesStorageAvailable = true;
      return true;
    } catch {
      state.notesStorageAvailable = false;
      return false;
    }
  }
  function restoreDeletedNote(id) {
    const deleted = deletedNotes.get(id);
    if (!deleted) return;
    let latest;
    try {
      latest = readNotes(localStorage.getItem(notesKey));
    } catch {
      deleted.message = "저장 공간을 읽지 못해 복원하지 못했어요. 다시 시도해 주세요.";
      renderNoteUndo();
      return;
    }
    if (latest[id]) {
      state.notes = latest;
      deleted.message = "다른 탭의 새 메모가 있어 복원하지 않았어요.";
      if ($("detailDialog").open && activeDetailId === id) {
        noteMode = "read";
        $("noteDisclosure").open = true;
        loadNote();
      }
      refreshLibrary({ preserveFocus: true });
      renderNoteUndo();
      return;
    }
    if (!writeNoteChange({ ...latest, [id]: deleted.note })) {
      deleted.message = "메모를 복원하지 못했어요. 저장 공간을 확인한 뒤 다시 시도해 주세요.";
      renderNoteUndo();
      return;
    }
    // Preserve a newer local draft if one was started after deleting the note.
    if (!noteDrafts.has(id) && deleted.draft) noteDrafts.set(id, deleted.draft);
    deletedNotes.delete(id);
    if ($("detailDialog").open && activeDetailId === id) {
      noteMode = "read";
      $("noteDisclosure").open = true;
      loadNote("삭제한 메모를 복원했어요.");
    }
    refreshLibrary();
    renderNoteUndo();
    focusAfterNoteUndo(id);
    notify("삭제한 메모를 복원했어요.");
  }
  function showDetail(id, trigger) {
    const film = films.find((f) => f.id === id);
    if (!film) return;
    const articleDialog = $("articleDialog");
    const articleContext = dialogContexts.get(articleDialog);
    const returnToArticle = articleDialog.open && trigger?.closest("#articleDialog")
      ? {
          trigger: articleContext?.trigger,
          scrollTop: articleDialog.querySelector(".dialog-scroll").scrollTop,
          focusTarget: trigger,
        }
      : null;
    if (returnToArticle) trigger = articleContext?.trigger || trigger;
    if ($("detailDialog").open) rememberNoteDraft();
    activeDetailId = id;
    $("detailTitle").textContent = film.title;
    $("detailDialog").dataset.filmId = film.id;
    $("detailMood").textContent = film.moodText;
    $("detailMeta").textContent = `${film.genre} · ${film.minutes}분`;
    $("detailDescription").textContent = film.description;
    const detailImage = $("detailImage");
    const imageRequest = ++detailImageRequest;
    const revealImage = () => {
      if (imageRequest === detailImageRequest)
        detailImage.style.visibility = "visible";
    };
    detailImage.style.visibility = "hidden";
    detailImage.alt = `${film.title}의 가상 영화 장면`;
    detailImage.width = 800;
    detailImage.height = 1200;
    detailImage.style.objectPosition = film.detailPosition || film.posterPosition || "center";
    $("detailDialog").style.setProperty("--detail-image-ratio", film.detailRatio || "1.4");
    detailImage.src = scenePath(film);
    // Keep the previous film's poster hidden until the new source is ready.
    // A failed image still reveals its alternative text instead of staying blank.
    if (typeof detailImage.decode === "function")
      detailImage.decode().then(revealImage, revealImage);
    else {
      detailImage.onload = revealImage;
      detailImage.onerror = revealImage;
      if (detailImage.complete) revealImage();
    }
    $("detailSave").dataset.save = id;
    noteMode = state.notes[id] ? "read" : "edit";
    loadNote();
    renderNoteUndo();
    $("noteDisclosure").open = Boolean(state.notes[id] || noteDrafts.has(id));
    updateNoteDisclosureLabel();
    updateSaveButtons();
    openDialog($("detailDialog"), trigger, $("detailTitle"), { returnToArticle });
    resizeNoteText();
  }
  function showArticle(id, trigger) {
    const article = articles.find((item) => item.id === id);
    if (!article) return;
    const film = films.find((item) => item.id === article.film);
    const theme = themes.find((item) => item.article === article.id);
    $("articleDialog").dataset.theme = theme?.id || "";
    $("articleTitle").textContent = theme?.name || article.title;
    $("articleCategory").textContent = `${trigger?.closest(".home-events") ? "테마 기획전" : "큐레이션"} ${theme?.number || ""} · 작품 ${theme?.films.length || 1}편`;
    $("articleImage").src = theme?.previewImage || scenePath(film);
    $("articleImage").alt = `${film.title}의 가상 영화 장면`;
    $("articleImage").width = 1672;
    $("articleImage").height = 941;
    $("articleBody").replaceChildren(
      ...article.paragraphs.map((copy) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = copy;
        return paragraph;
      }),
    );
    const relatedFilms = (theme?.films || [film.id]).map((id) =>
      films.find((item) => item.id === id),
    );
    $("articleFilmLinks").replaceChildren(...relatedFilms.map((relatedFilm, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "article-film-link";
      button.dataset.detail = relatedFilm.id;
      if (index === 0) button.id = "articleFilmLink";
      button.setAttribute("aria-label", `${relatedFilm.title} 작품 보기 · ${relatedFilm.genre} · ${relatedFilm.minutes}분`);
      button.innerHTML = `<img src="${scenePath(relatedFilm)}" alt="" width="240" height="180" loading="lazy" style="object-position:${relatedFilm.id === "orbit" ? "center 52%" : relatedFilm.detailPosition || relatedFilm.posterPosition || "center"}"><span class="article-film-title">${relatedFilm.title}</span><span class="article-film-meta">${relatedFilm.genre} · ${relatedFilm.minutes}분</span><span class="article-film-note">${theme?.filmNotes[relatedFilm.id] || "작품 보기"}</span>`;
      return button;
    }));
    openDialog($("articleDialog"), trigger, $("articleTitle"));
  }
  function focusNote() {
    if (!activeDetailId || !$("detailDialog").open) return;
    $("noteDisclosure").open = true;
    updateNoteDisclosureLabel();
    resizeNoteText();
    (noteMode === "read"
      ? $("noteDraftNotice").hidden ? $("noteReadText") : $("noteDraftNotice")
      : $("noteText")).focus();
  }
  function editNote() {
    if (!activeDetailId) return;
    noteMode = "edit";
    loadNote();
    focusNote();
  }
  $("noteEdit").addEventListener("click", editNote);
  $("noteResumeDraft").addEventListener("click", editNote);
  $("noteCancel").addEventListener("click", () => {
    if (!activeDetailId) return;
    noteDrafts.delete(activeDetailId);
    noteMode = state.notes[activeDetailId] ? "read" : "edit";
    loadNote(noteMode === "read" ? "수정을 취소했어요. 저장한 메모는 그대로예요." : "");
    if (noteMode === "read") $("noteEdit").focus();
    else {
      $("noteDisclosure").open = false;
      $("noteDisclosure").querySelector("summary").focus();
    }
  });
  $("noteText").addEventListener("input", () => {
    rememberNoteDraft();
    updateNoteCount();
    resizeNoteText();
    $("noteStatus").textContent = noteDirty
      ? noteDraftMessage()
      : state.notes[activeDetailId]
        ? "저장된 메모입니다. 수정 후 저장해 주세요."
        : "";
  });
  $("noteDisclosure").addEventListener("toggle", requestNoteResize);
  if (typeof ResizeObserver !== "undefined") {
    let noteObservedWidth = 0;
    new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.width - noteObservedWidth) < 0.5) return;
      noteObservedWidth = entry.contentRect.width;
      requestNoteResize();
    }).observe($("noteText"));
  }
  window.addEventListener("resize", requestNoteResize);
  document.fonts?.ready.then(requestNoteResize);
  document.fonts?.addEventListener("loadingdone", requestNoteResize);
  $("noteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeDetailId) return;
    const value = $("noteText").value.trim();
    if (!value || value.length > 280) {
      $("noteStatus").textContent = "1~280자로 메모를 입력해 주세요.";
      $("noteText").focus();
      return;
    }
    const previousNote = state.notes[activeDetailId];
    state.notes[activeDetailId] = value;
    persistNotes();
    if (!state.notesStorageAvailable) {
      if (previousNote) state.notes[activeDetailId] = previousNote;
      else delete state.notes[activeDetailId];
      rememberNoteDraft();
      updateNotePresentation();
      $("noteStatus").textContent = "메모를 저장하지 못했어요. 입력은 이 페이지에서 유지되며 새로고침하면 사라집니다.";
      refreshLibrary();
      $("noteText").focus();
      return;
    }
    noteDrafts.delete(activeDetailId);
    noteMode = "read";
    loadNote(noteSavedMessage());
    refreshLibrary();
    renderNoteUndo();
    $("noteReadText").focus();
  });
  $("noteDelete").addEventListener("click", () => {
    if (!activeDetailId || !state.notes[activeDetailId]) return;
    const id = activeDetailId;
    const deleted = { note: state.notes[id], draft: noteDrafts.get(id) };
    let latest;
    try {
      latest = readNotes(localStorage.getItem(notesKey));
    } catch {
      state.notesStorageAvailable = false;
      updateNotePresentation("메모를 삭제하지 못했어요. 저장한 메모는 그대로 남아 있습니다.");
      return;
    }
    if (latest[id] !== deleted.note) {
      state.notes = latest;
      if (noteDrafts.has(id)) noteDrafts.get(id).conflicted = true;
      noteMode = latest[id] ? "read" : "edit";
      loadNote("다른 탭에서 메모가 바뀌어 삭제하지 않았어요. 현재 메모를 확인해 주세요.");
      refreshLibrary();
      focusAfterNoteUndo(id);
      return;
    }
    delete latest[id];
    if (!writeNoteChange(latest)) {
      updateNotePresentation("메모를 삭제하지 못했어요. 저장한 메모는 그대로 남아 있습니다.");
      return;
    }
    deletedNotes.set(id, deleted);
    noteDrafts.delete(id);
    loadNote();
    refreshLibrary();
    renderNoteUndo();
    $("detailUndoList").querySelector("[data-restore-note]").focus();
  });
  document.addEventListener("click", (event) => {
    const restore = event.target.closest("[data-restore-note]");
    if (restore) restoreDeletedNote(restore.dataset.restoreNote);
    const dismiss = event.target.closest("[data-dismiss-note]");
    if (dismiss) {
      const id = dismiss.dataset.dismissNote;
      deletedNotes.delete(id);
      renderNoteUndo();
      focusAfterNoteUndo(id);
    }
    const detail = event.target.closest("[data-detail]");
    if (detail) {
      showDetail(detail.dataset.detail, detail);
      if (detail.hasAttribute("data-open-draft") && noteDrafts.has(detail.dataset.detail)) editNote();
      else if (detail.hasAttribute("data-open-note")) focusNote();
    }
    const article = event.target.closest("[data-article]");
    if (article) showArticle(article.dataset.article, article);
    const about = event.target.closest("[data-about], #aboutButton");
    if (about) openDialog($("aboutDialog"), about, $("aboutTitle"));
    const save = event.target.closest("[data-save]");
    if (save) {
      const id = save.dataset.save;
      if (!validIds.has(id)) return;
      const film = films.find((f) => f.id === id),
        wasSaved = state.saved.has(id);
      wasSaved ? state.saved.delete(id) : state.saved.add(id);
      saveState();
      if (state.view === "saved") {
        const cardIds = [...$("filmGrid").querySelectorAll(".film-card")].map(
            (el) => el.dataset.filmId,
          ),
          index = cardIds.indexOf(id);
        render();
        if (!document.querySelector("dialog[open]")) {
          const target =
            $("filmGrid").querySelectorAll("[data-save]")[
              Math.min(
                index,
                $("filmGrid").querySelectorAll("[data-save]").length - 1,
              )
            ];
          (target || $("emptyAction")).focus({ preventScroll: true });
        }
      } else updateSaveButtons();
      notify(
        `${film.title} · ${wasSaved ? (state.notes[id] ? "찜을 해제했어요. 메모는 남아 있어요." : "찜 목록에서 뺐어요.") : state.storageAvailable ? "이 브라우저에 저장했어요." : "잠시 담았어요. 새로고침하면 사라져요."}`,
      );
    }
    const close = event.target.closest("[data-close]");
    if (close) closeDialog($(close.dataset.close));
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    const scroller = dialog.querySelector(".dialog-scroll");
    scroller?.addEventListener("scroll", () => {
      dialog.dataset.scrolled = String(scroller.scrollTop > 8);
    }, { passive: true });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        )
          closeDialog(dialog);
      }
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      if (document.activeElement === $("noteReadText")) {
        e.preventDefault();
        (e.shiftKey ? $("noteDisclosure").querySelector("summary") : $("noteEdit")).focus();
        return;
      }
      if (document.activeElement === $("noteDraftNotice")) {
        e.preventDefault();
        (e.shiftKey ? $("noteDisclosure").querySelector("summary") : $("noteResumeDraft")).focus();
        return;
      }
      const focusable = [
        ...dialog.querySelectorAll(
          'button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),summary,[tabindex="0"]',
        ),
      ].filter((el) => {
        if (!el.getClientRects().length) return false;
        // Chromium can retain rectangles for content inside closed details.
        const closedDetails = el.closest("details:not([open])");
        if (!closedDetails) return true;
        const summary = closedDetails.querySelector(":scope > summary");
        return summary === el || Boolean(summary?.contains(el));
      });
      if (!focusable.length) return;
      const first = focusable[0],
        last = focusable.at(-1);
      if (!focusable.includes(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
    dialog.addEventListener("close", () => {
      const pending = pendingDialogClosures.get(dialog);
      const context = pending?.shift();
      if (!pending?.length) pendingDialogClosures.delete(dialog);
      const { trigger, detailId } = context || {};
      if (document.querySelector("dialog[open]")) return;
      clearTimeout(toastTimer);
      $("toast").classList.remove("visible");
      document.body.append($("toast"));
      if (context?.restoreFocus && context.routeVersion === dialogRouteVersion && context.returnToArticle) {
        const article = context.returnToArticle;
        openDialog($("articleDialog"), article.trigger, $("articleTitle"), {
          scrollTop: article.scrollTop,
          focusTarget: article.focusTarget,
        });
        return;
      }
      document.body.classList.remove("dialog-open");
      if (dialog.id === "articleDialog" && context?.restoreFocus && state.view === "themes" && location.hash.startsWith("#themes/"))
        history.replaceState(null, "", "#themes");
      // A queued close event must not steal focus from the new route heading.
      if (!context?.restoreFocus || context.routeVersion !== dialogRouteVersion) return;
      if (detailId && deletedNotes.has(detailId)) {
        const undoButton = !noteUndoExpanded
          ? !$("noteUndoQuickRestore").hidden ? $("noteUndoQuickRestore") : $("noteUndoToggle")
          : $("noteUndoList").querySelector(`[data-restore-note="${detailId}"]:not([disabled])`)
            || $("noteUndoList").querySelector(`[data-dismiss-note="${detailId}"]`);
        if (undoButton) {
          undoButton.focus({ preventScroll: true });
          undoButton.closest(noteUndoExpanded ? ".note-undo-item" : ".note-undo-summary")
            .scrollIntoView({ block: "center", behavior: "instant" });
          return;
        }
      }
      const replacements = detailId
        ? [...document.querySelectorAll(`[data-detail="${detailId}"]`)].filter(
          (el) => !el.closest("dialog") && el.getClientRects().length,
        ) : [];
      const sameArea = trigger?.closest(".library-mini-entry")
        ? replacements.filter((el) => el.closest(".library-mini-entry")) : replacements;
      const currentReplacement = trigger?.hasAttribute("data-open-draft")
        ? sameArea.find((el) => el.hasAttribute("data-open-draft"))
          || sameArea.find((el) => el.hasAttribute("data-open-note")) || sameArea[0] || replacements[0]
        : replacements.find((el) => !trigger?.hasAttribute("data-open-note") || el.hasAttribute("data-open-note"));
      const heading =
        state.view === "themes"
          ? $("themesTitle")
          : state.view === "home"
            ? $("heroTitle")
            : $("catalogTitle");
      const target =
        trigger?.isConnected && trigger.getClientRects().length
          ? trigger
          : currentReplacement ||
            (state.view === "saved" && !$("emptyState").hidden
              ? $("emptyAction")
              : heading);
      target.focus({ preventScroll: true });
    });
  });
  window.addEventListener("storage", (event) => {
    try {
      if (event.storageArea !== localStorage) return;
    } catch {
      return;
    }
    const savedChanged = event.key === storageKey || event.key === null;
    const notesChanged = event.key === notesKey || event.key === null;
    const viewChanged = event.key === libraryViewKey || event.key === null;
    if (!savedChanged && !notesChanged && !viewChanged) return;
    if (viewChanged) state.libraryView = readLibraryView(event.key === null ? null : event.newValue);
    if (savedChanged) {
      state.saved = readSaved(event.key === null ? null : event.newValue);
      state.storageAvailable = true;
    }
    if (notesChanged) {
      const previousNotes = state.notes;
      // A queued storage event may predate a restore in this tab.
      // Read the current value so that event cannot roll back the local view.
      try {
        state.notes = readNotes(localStorage.getItem(notesKey));
      } catch {
        state.notesStorageAvailable = false;
        return;
      }
      state.notesStorageAvailable = true;
      deletedNotes.forEach((deleted, id) => {
        if (previousNotes[id] !== state.notes[id]) deleted.message = "";
      });
      noteDrafts.forEach((draft, id) => {
        if (draft.value === (state.notes[id] || "")) noteDrafts.delete(id);
        else if (previousNotes[id] !== state.notes[id]) draft.conflicted = true;
      });
      if (
        activeDetailId &&
        $("detailDialog").open &&
        previousNotes[activeDetailId] !== state.notes[activeDetailId]
      ) {
        noteDirty = noteDrafts.has(activeDetailId);
        if (noteMode === "edit" && noteDirty) {
          updateNotePresentation();
          updateNoteCount();
          $("noteStatus").textContent = noteDraftMessage();
        } else {
          const readerHadFocus = $("noteReader").contains(document.activeElement);
          loadNote();
          if (readerHadFocus && $("noteReader").hidden)
            $("noteDisclosure").querySelector("summary").focus({ preventScroll: true });
        }
      }
    }
    refreshLibrary({ preserveFocus: true });
    renderNoteUndo();
  });
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault();
    $("main-content").focus();
    $("main-content").scrollIntoView({ block: "start" });
  });
  function syncPickers() {
    pickers.forEach(({ select, button, options, label }) => {
      const selected = select.selectedOptions[0];
      button.querySelector(".picker-value").textContent = selected?.textContent || "선택";
      button.setAttribute("aria-label", `${label}: ${selected?.textContent || "선택"}`);
      options.forEach(option => option.setAttribute("aria-selected", String(option.dataset.value === select.value)));
    });
  }
  function closePickers(returnFocus = false) {
    pickers.forEach(({ button, menu }) => {
      if (menu.hidden) return;
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
      if (returnFocus) button.focus({ preventScroll: true });
    });
  }
  function enhanceSelect(select) {
    const label = select.labels?.[0]?.textContent.trim() || "영화 정렬";
    const wrapper = document.createElement("div");
    wrapper.className = "select-picker";
    const button = document.createElement("button");
    button.type = "button";
    button.id = `${select.id}Button`;
    button.className = "picker-button";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `${select.id}Menu`);
    button.innerHTML = '<span class="picker-value"></span><svg class="icon picker-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>';
    const menu = document.createElement("div");
    menu.id = `${select.id}Menu`;
    menu.className = "picker-menu";
    menu.hidden = true;
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-label", label);
    const options = [...select.options].map(item => {
      const option = document.createElement("button");
      option.type = "button";
      option.tabIndex = -1;
      option.className = "picker-option";
      option.dataset.value = item.value;
      option.setAttribute("role", "option");
      option.textContent = item.textContent;
      option.addEventListener("click", () => {
        select.value = item.value;
        closePickers(true);
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncPickers();
      });
      menu.append(option);
      return option;
    });
    const open = (last = false) => {
      closePickers();
      menu.hidden = false;
      button.setAttribute("aria-expanded", "true");
      (last ? options.at(-1) : options.find(option => option.dataset.value === select.value) || options[0]).focus();
    };
    button.addEventListener("click", () => menu.hidden ? open() : closePickers(true));
    button.addEventListener("keydown", event => {
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      open(event.key === "ArrowUp");
    });
    menu.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePickers(true);
      } else if (event.key === "Tab") {
        closePickers(true);
      } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const current = options.indexOf(document.activeElement);
        const index = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
        options[index].focus();
      } else if (event.key.length === 1 && event.key !== " ") {
        const option = options.find(item => item.textContent.startsWith(event.key));
        if (option) { event.preventDefault(); option.focus(); }
      }
    });
    select.after(wrapper);
    wrapper.append(button, menu);
    select.hidden = true;
    select.labels?.[0]?.addEventListener("click", event => { event.preventDefault(); button.focus(); });
    pickers.set(select.id, { select, button, menu, options, label });
  }
  [$("homeDuration"), $("durationFilter"), $("catalogSort")].forEach(enhanceSelect);
  document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".select-picker")) closePickers();
  });
  document.addEventListener("focusin", event => {
    if (!event.target.closest(".select-picker")) closePickers();
  });
  syncPickers();
  renderHome();
  route();
})();
