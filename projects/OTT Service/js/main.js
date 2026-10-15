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
      position: "58% center",
      detailPosition: "center 36%",
      detailRatio: "1.15",
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
      posterPath: "assets/stills/greenhouse.webp",
      posterPosition: "50% center",
      position: "50% center",
      detailPosition: "50% center",
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
      position: "63% center",
      detailPosition: "center 6%",
      detailRatio: "1.35",
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
      position: "48% center",
      detailPosition: "center 14%",
      detailRatio: "1.45",
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
      posterPath: "assets/frames-v24/atlas.webp",
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
      posterPath: "assets/posters-v13/rooftop.webp",
      detailPosition: "center 47%",
      detailRatio: "1.18",
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
      posterPath: "assets/posters-v13/signal.webp",
      detailPosition: "center 60%",
      detailRatio: "1.2",
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
      posterPath: "assets/posters-v13/relay.webp",
      detailPosition: "center 28%",
      detailRatio: "1.1",
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
      posterPath: "assets/posters-v13/nocturne.webp",
      detailPosition: "center 60%",
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
        tide: "첫 선택 · 남겨진 소리에서 기억으로",
        forest: "인물의 기억보다 풍경의 소리가 궁금할 때",
        bluehour: "옛 친구와 나란히 시간을 보내는 재회",
        nocturne: "재회의 오후와 대비되는 새벽 식탁의 대화",
      },
    },
    {
      id: "warmth",
      name: "다정한 반전",
      number: "02",
      article: "running-time",
      previewDescription: "편지·연주·계주로 다시 잇는 관계",
      previewImage: "assets/stills/letters.webp",
      glimpseImage: "assets/stills/windows.webp",
      imageAlt: "햇살이 드는 창가, 나무 책상 위에 놓인 편지",
      accent: "#EDBA88",
      descriptionLines: ["편지와 연주, 멈춘 엘리베이터와 마지막 계주."],
      films: ["letters", "windows", "rooftop", "relay"],
      filmNotes: {
        letters: "18분의 입구 · 편지가 불러오는 지난여름",
        windows: "오랜 친구 대신, 이름 모를 이웃과 한자리",
        rooftop: "편지와 다른 방식으로, 말 못 한 마음을 연주로",
        relay: "함께 모이는 데서 한발 더, 동료에게 건네는 바통",
      },
    },
    {
      id: "beyond",
      name: "상상 바깥으로",
      number: "03",
      article: "enclosed-spaces",
      previewDescription: "온실의 비밀, 종이별과 미래의 신호",
      previewImage: "assets/stills/greenhouse.webp",
      glimpseImage: "assets/stills/orbit.webp",
      imageAlt: "우주 관측 기지의 넓은 창 너머로 보이는 행성과 고리",
      accent: "#C3B6EC",
      descriptionLines: ["온실의 비밀, 우주 메시지·종이별·미래의 신호."],
      films: ["greenhouse", "orbit", "atlas", "signal"],
      filmNotes: {
        greenhouse: "일지의 흔적을 좇는 미스터리부터",
        orbit: "사건 추적에서 귀환을 기다리는 일상으로",
        atlas: "기다리는 사람과 소원을 고르는 아이",
        signal: "일지와 다른 단서, 자기 목소리로 온 구조 요청",
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
        "소리로 기억을 만나는 〈파도가 머문 자리〉에서 시작해보세요. 아버지가 남긴 소리라는 단서와, 설명 대신 풍경의 소리에 귀 기울이는 〈숲의 호흡〉을 대비해 골랐습니다.",
        "함께 보내는 시간이 궁금하면 〈파란 오후〉와 〈새벽 두 시의 식탁〉으로 옮겨가세요. 옛 친구와 다시 보내는 오후, 손님과 주인이 이야기를 시작하는 새벽을 나란히 두었습니다.",
      ],
    },
    {
      id: "running-time",
      category: "큐레이션 노트",
      title: "서로에게 건네는 작은 용기",
      film: "letters",
      paragraphs: [
        "짧은 이야기부터 찾는다면 18분의 〈여름의 편지〉가 입구입니다. 부치지 않은 편지를 찾는 두 친구와, 마지막 연주로 못다 한 말을 건네는 〈옥상의 작은 밴드〉를 ‘남겨둔 마음’으로 묶었습니다.",
        "〈불이 켜지는 시간〉은 멈춘 엘리베이터가 이웃을 모으고, 〈마지막 바통〉은 계주가 선수에게 동료를 돌아보게 합니다. 지난 기억을 따라갈지, 함께할 계기에서 출발할지 골라보세요.",
      ],
    },
    {
      id: "enclosed-spaces",
      category: "큐레이션 노트",
      title: "익숙한 세계 바깥의 신호",
      film: "greenhouse",
      paragraphs: [
        "단서를 좇고 싶다면 〈밤의 온실〉부터 살펴보세요. 사라진 관리자의 일지를 읽는 이야기 옆에, 아직 일어나지 않은 사고를 막으려 신호의 발신지를 추적하는 〈수신 불가〉를 놓았습니다.",
        "다른 입구는 〈느린 궤도〉와 〈별을 접는 아이〉입니다. 귀환을 기다리는 일상과 마지막 종이에 담을 소원을 나란히 두었습니다. 사건의 답보다 인물의 기다림과 고민에 관심이 갈 때 골라보세요.",
      ],
    },
  ];
  const $ = (id) => document.getElementById(id);
  const storageKey = "jansang-cinema:saved:v1";
  const notesKey = "jansang-cinema:notes:v1";
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
      button.textContent = state.notes[button.dataset.detail]
        ? "메모 수정하기" : "메모 남기기";
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
    renderHomeLibrary();
    requestRailUpdate();
  }
  // Keep long movie names in deliberate phrase groups at every card size.
  const titleLines = {
    tide: ["파도가", "머문 자리"],
    letters: ["여름의", "편지"],
    greenhouse: ["밤의", "온실"],
    orbit: ["느린", "궤도"],
    windows: ["불이", "켜지는 시간"],
    forest: ["숲의 호흡"],
    bluehour: ["파란", "오후"],
    atlas: ["별을 접는", "아이"],
    rooftop: ["옥상의", "작은 밴드"],
    signal: ["수신", "불가"],
    relay: ["마지막", "바통"],
    nocturne: ["새벽 두 시의", "식탁"],
  };
  const posterLayouts = {
    tide: "bottom-left",
    letters: "bottom-center",
    greenhouse: "top-left",
    orbit: "bottom-center",
    windows: "bottom-left",
    forest: "top-center",
    bluehour: "top-center",
    atlas: "bottom-center",
    rooftop: "top-left",
    signal: "bottom-left",
    relay: "top-left",
    nocturne: "bottom-center",
  };
  const posterPath = (film) =>
    film.posterPath || `assets/posters-v8/${film.image}.webp`;
  function makeCard(film, context = "catalog") {
    const article = document.createElement("article");
    article.className = "film-card";
    article.dataset.filmId = film.id;
    article.dataset.cardContext = context;
    article.dataset.posterLayout = posterLayouts[film.id];
    const displayTitle = (titleLines[film.id] || [film.title])
      .map((line) => `<span class="film-title-line">${line}</span>`)
      .join(" ");
    article.innerHTML = `<h3><button class="film-art" type="button" data-detail="${film.id}" aria-label="${film.title} 작품 보기"><img src="${posterPath(film)}" alt="" width="800" height="1200" loading="lazy"><span class="film-label"><span class="film-title">${displayTitle}</span></span></button></h3><div class="film-foot"><div class="film-caption">${context === "home" ? "" : `<p class="film-card-title">${film.title}</p>`}<p class="film-card-meta"><span>${film.genre}</span><span>${film.minutes}분</span></p></div><button class="poster-save save-button" type="button" data-save="${film.id}" aria-label="${film.title} 찜하기" title="${film.title} 찜하기" aria-pressed="false">${icon("bookmark")}</button></div><span class="film-note-badge" data-note-for="${film.id}"${state.notes[film.id] ? "" : " hidden"}>${context === "saved" ? "관심 메모" : "메모 있음"}</span>`;
    if (film.posterPosition)
      article.querySelector(".film-art img").style.objectPosition = film.posterPosition;
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
      noteButton.setAttribute("aria-label", `${film.title} 관심 메모 열기`);
      noteButton.textContent = state.notes[film.id] ? "메모 수정하기" : "메모 남기기";
      actions.append(noteButton);
      copy.append(actions);
      article.append(copy);
    }
    return article;
  }
  function renderThemes(id) {
    const theme = themes.find((item) => item.id === id);
    $("themesPageHeading").hidden = Boolean(theme);
    $("themesView").setAttribute("aria-labelledby", theme ? "themeTitle" : "themesTitle");
    $("themeOverview").hidden = Boolean(theme);
    $("themeDetail").hidden = !theme;
    $("themeTabs").hidden = !theme;
    document.querySelectorAll("[data-theme]").forEach((link) => {
      if (theme && link.dataset.theme === theme.id)
        link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (!theme) {
      updateSaveButtons();
      return false;
    }
    $("themeDetail").dataset.theme = theme.id;
    $("themeDetail").style.setProperty("--theme-accent", theme.accent);
    $("themeCollection").dataset.theme = theme.id;
    $("themeNumber").textContent = theme.number;
    $("themeTagline").textContent = "큐레이션";
    $("themeTitle").textContent = theme.name;
    $("themeArticle").dataset.article = theme.article;
    $("themeDescription").replaceChildren(
      ...theme.descriptionLines.flatMap((text, index) => {
        const line = document.createElement("span");
        line.className = "theme-description-line";
        line.textContent = text;
        return index ? [document.createTextNode(" "), line] : [line];
      }),
    );
    const selectedFilms = theme.films.map((filmId) =>
      films.find((film) => film.id === filmId),
    );
    $("themeDuration").textContent =
      `작품 ${selectedFilms.length}편 · 총 ${selectedFilms.reduce((sum, film) => sum + film.minutes, 0)}분`;
    $("themeFilms").replaceChildren(
      ...selectedFilms.map((film) => {
        const card = makeCard(film, "theme");
        const note = document.createElement("p");
        note.className = "film-curator-note";
        note.textContent = theme.filmNotes[film.id];
        card.append(note);
        return card;
      }),
    );
    updateSaveButtons();
    return true;
  }
  function makeThemePreview(theme) {
    const link = document.createElement("a");
    link.className = "theme-preview theme-overview-card";
    link.href = `#themes/${theme.id}`;
    link.dataset.themePreview = theme.id;
    link.style.setProperty("--theme-accent", theme.accent);
    link.innerHTML = `<div class="theme-preview-image"><img src="${theme.previewImage}" alt="" width="1672" height="941" loading="lazy"><span class="theme-preview-number" aria-hidden="true">${theme.number}</span></div><div class="theme-preview-copy"><h3>${theme.name}</h3><p class="theme-preview-description">${theme.previewDescription}</p><span class="theme-preview-meta">작품 ${theme.films.length}편${icon("arrow")}</span></div>`;
    const glimpse = document.createElement("img");
    glimpse.className = "theme-preview-glimpse";
    glimpse.src = theme.glimpseImage;
    glimpse.alt = "";
    glimpse.setAttribute("aria-hidden", "true");
    glimpse.width = 1672;
    glimpse.height = 941;
    glimpse.loading = "lazy";
    link.querySelector(".theme-preview-image > img").after(glimpse);
    return link;
  }
  $("themeOverview").replaceChildren(
    ...themes.map(makeThemePreview),
  );
  $("themeTabs").innerHTML = themes
    .map(
      (theme) =>
        `<a href="#themes/${theme.id}" data-theme="${theme.id}"><span aria-hidden="true">${theme.number}</span>${theme.name}</a>`,
    )
    .join("");
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
      libraryFilms.map((film) => [film.id, state.notes[film.id] || ""]),
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
        return button;
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
    document.querySelectorAll("[data-home-mood]").forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.homeMood === state.homeMood),
      ),
    );
    [railPrevious, railNext, railStatus].forEach((control) => {
      if (control) control.hidden = visible.length === 0;
    });
    if (!visible.length) {
      if (railPrevious) railPrevious.disabled = true;
      if (railNext) railNext.disabled = true;
    }
    filmRail.scrollLeft = 0;
    updateSaveButtons();
  }
  const filmRail = $("homeFilms");
  const railPrevious = document.querySelector('[data-rail-prev="homeFilms"]');
  const railNext = document.querySelector('[data-rail-next="homeFilms"]');
  const railStatus = document.querySelector('[data-rail-status="homeFilms"]');
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
    if (railPrevious) railPrevious.disabled = left <= 2;
    if (railNext) railNext.disabled = left >= max - 2;
    if (
      (focused === railPrevious && railPrevious.disabled) ||
      (focused === railNext && railNext.disabled)
    ) {
      const target =
        railPrevious && !railPrevious.disabled
          ? railPrevious
          : railNext && !railNext.disabled
            ? railNext
            : filmRail;
      target.focus({ preventScroll: true });
    }
    const cards = [...filmRail.children].map((card, index) => {
      const rect = card.getBoundingClientRect();
      const fullyVisible = shown && (
        max <= 2 || (rect.left >= metrics.start - 1 && rect.right <= metrics.end + 1)
      );
      card.classList.toggle("rail-card-partial", shown && !fullyVisible);
      // Keep the visible poster as the entry point when its metadata is clipped.
      // Move keyboard focus off controls that are about to become hidden.
      if (!fullyVisible && card.querySelector(".film-foot")?.contains(focused))
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
      railStatus.textContent = visible.length
        ? `${visible[0].index + 1}${visible.length > 1 ? `–${visible.at(-1).index + 1}` : ""} / ${filmRail.children.length}`
        : `0 / ${filmRail.children.length}`;
    }
  }
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
  railPrevious?.addEventListener("click", () => scrollRail(-1));
  railNext?.addEventListener("click", () => scrollRail(1));
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
        `${film.title} ${film.english} ${film.genre} ${film.moodText} ${film.keywords}`
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
    const visible = orderedFilms.filter(matches);
    const emptyLibrary =
      state.view === "saved" && !films.some((film) => inLibrary(film.id));
    if (state.sort === "title")
      visible.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    if (state.sort === "short")
      visible.sort((a, b) => a.minutes - b.minutes);
    const grid = $("filmGrid");
    grid.classList.toggle("library-reading", state.view === "saved");
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
    $("resultCount").textContent =
      `${state.view === "saved" ? libraryLabels[state.libraryFilter] : filtered ? "검색 결과" : "전체"} ${visible.length}편`;
    $("libraryFilters").hidden = state.view !== "saved" || emptyLibrary;
    $("catalogTools").hidden = emptyLibrary;
    $("catalogOptions").hidden = emptyLibrary;
    $("resultsBar").hidden = emptyLibrary;
    $("moodFilters").hidden = state.view === "saved";
    $("sortField").hidden = emptyLibrary;
    $("durationField").hidden = state.view !== "browse";
    $("durationFilter").value = state.duration;
    $("catalogSort").value = state.sort;
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
          ? "다른 검색어나 보관함 분류로 다시 찾아보세요."
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
        grid.querySelector(`[${focusedAttribute}="${focusedId}"]`) ||
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
      const hasTheme = renderThemes(themeId);
      heading = hasTheme ? $("themeTitle") : $("themesTitle");
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
  let activeDetailId = null;
  let detailImageRequest = 0;
  let noteDirty = false;
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
    if (!activeDetailId) return;
    const value = $("noteText").value;
    noteDirty = value !== (state.notes[activeDetailId] || "");
    if (noteDirty) {
      noteDrafts.set(activeDetailId, {
        value,
        conflicted: noteDrafts.get(activeDetailId)?.conflicted || false,
      });
    } else noteDrafts.delete(activeDetailId);
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
    dialog.querySelector(".dialog-scroll")?.scrollTo({ top: scrollTop, behavior: "instant" });
    document.body.classList.add("dialog-open");
    focusTarget.focus({ preventScroll: true });
  }
  function noteSavedMessage() {
    return state.notesStorageAvailable
      ? "메모를 저장했어요."
      : "이 페이지에서만 보관 중이에요. 새로고침하면 사라집니다.";
  }
  function updateNoteDisclosureLabel() {
    $("noteDisclosureLabel").textContent = noteDrafts.has(activeDetailId)
      ? "관심 메모 이어쓰기"
      : state.notes[activeDetailId]
        ? "관심 메모 수정하기"
        : "관심 메모 남기기";
  }
  function updateNoteCount() {
    $("noteCount").textContent = `${$("noteText").value.length}/280`;
    const hasSavedNote = Boolean(state.notes[activeDetailId]);
    $("noteDelete").hidden = !hasSavedNote;
    $("noteDelete").disabled = !hasSavedNote;
    updateNoteDisclosureLabel();
  }
  function loadNote() {
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
    updateNoteCount();
    resizeNoteText();
    $("noteStatus").textContent = draft
      ? noteDraftMessage()
      : state.notes[activeDetailId]
        ? noteSavedMessage()
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
    detailImage.alt = `${film.title}의 가상 영화 포스터`;
    detailImage.width = 800;
    detailImage.height = 1200;
    detailImage.style.objectPosition = film.detailPosition || film.posterPosition || "center";
    $("detailDialog").style.setProperty("--detail-image-ratio", film.detailRatio || "1.4");
    detailImage.src = posterPath(film);
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
    loadNote();
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
    $("articleTitle").textContent = article.title;
    $("articleCategory").textContent = article.category;
    $("articleImage").src = `assets/stills/${film.image}.webp`;
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
    $("articleFilmLink").dataset.detail = film.id;
    $("articleFilmLink").textContent = `${film.title} 작품 보기`;
    openDialog($("articleDialog"), trigger, $("articleTitle"));
  }
  function focusNote() {
    if (!activeDetailId || !$("detailDialog").open) return;
    $("noteDisclosure").open = true;
    updateNoteDisclosureLabel();
    resizeNoteText();
    $("noteText").focus();
  }
  $("noteText").addEventListener("input", () => {
    rememberNoteDraft();
    updateNoteCount();
    resizeNoteText();
    $("noteStatus").textContent = noteDirty
      ? noteDraftMessage()
      : state.notes[activeDetailId]
        ? noteSavedMessage()
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
    state.notes[activeDetailId] = value;
    noteDrafts.delete(activeDetailId);
    persistNotes();
    loadNote();
    refreshLibrary();
  });
  $("noteDelete").addEventListener("click", () => {
    if (!activeDetailId || !state.notes[activeDetailId]) return;
    delete state.notes[activeDetailId];
    noteDrafts.delete(activeDetailId);
    persistNotes();
    loadNote();
    refreshLibrary();
    $("noteStatus").textContent = state.notesStorageAvailable
      ? "이 영화의 메모를 삭제했어요."
      : "이 페이지의 메모를 지웠어요. 브라우저 저장 공간은 사용할 수 없습니다.";
    $("noteText").focus();
  });
  document.addEventListener("click", (event) => {
    const detail = event.target.closest("[data-detail]");
    if (detail) {
      showDetail(detail.dataset.detail, detail);
      if (detail.hasAttribute("data-open-note")) focusNote();
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
      // A queued close event must not steal focus from the new route heading.
      if (!context?.restoreFocus || context.routeVersion !== dialogRouteVersion) return;
      const currentReplacement =
        detailId &&
        [...document.querySelectorAll(`[data-detail="${detailId}"]`)].find(
          (el) => !el.closest("dialog") && el.getClientRects().length &&
            (!trigger?.hasAttribute("data-open-note") || el.hasAttribute("data-open-note")),
        );
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
    if (!savedChanged && !notesChanged) return;
    if (savedChanged) {
      state.saved = readSaved(event.key === null ? null : event.newValue);
      state.storageAvailable = true;
    }
    if (notesChanged) {
      const previousNotes = state.notes;
      state.notes = readNotes(event.key === null ? null : event.newValue);
      state.notesStorageAvailable = true;
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
        if (noteDirty) {
          updateNoteCount();
          $("noteStatus").textContent = noteDraftMessage();
        } else loadNote();
      }
    }
    refreshLibrary({ preserveFocus: true });
  });
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault();
    $("main-content").focus();
    $("main-content").scrollIntoView({ block: "start" });
  });
  renderHome();
  route();
})();
