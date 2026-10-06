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
      position: "82% center",
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
      position: "50% center",
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
      position: "48% center",
      description:
        "물길과 잎사귀, 빛이 머무는 자리를 따라 걷는 숲. 설명 대신 풍경의 소리에 귀 기울이는 21분의 산책.",
      keywords: "자연 숲 다큐 산책 힐링 잔잔한 편안한 짧은",
    },
  ];
  const themes = [
    {
      id: "quiet",
      name: "고요한 밤",
      number: "01",
      english: "A QUIETER NIGHT",
      image: "forest",
      title: "세상의 소리를 잠시 낮추고.",
      description: "파도와 숲 사이, 생각을 비워내는 두 편.",
      previewDescription: "파도와 숲, 조용히 쉬어가는 두 편",
      previewImage: "assets/posters-v8/forest.webp",
      previewWidth: 800,
      previewHeight: 1200,
      films: ["tide", "forest"],
    },
    {
      id: "warmth",
      name: "다정한 하루",
      number: "02",
      english: "A LITTLE WARMTH",
      image: "letters",
      title: "작은 다정함이 필요한 날.",
      description: "오래된 편지와 이웃의 불빛에서 만나는 온기.",
      previewDescription: "편지와 이웃에게서 발견하는 다정함",
      previewImage: "assets/stills/letters.webp",
      previewWidth: 1672,
      previewHeight: 941,
      films: ["letters", "windows"],
    },
    {
      id: "beyond",
      name: "낯선 세계",
      number: "03",
      english: "BEYOND THE FAMILIAR",
      image: "orbit",
      title: "익숙한 풍경 너머로.",
      description: "한밤의 온실에서 먼 궤도까지, 낯선 곳으로의 초대.",
      previewDescription: "미스터리와 SF, 익숙함 너머의 이야기",
      previewImage: "assets/stills/orbit.webp",
      previewWidth: 1672,
      previewHeight: 941,
      films: ["greenhouse", "orbit"],
    },
  ];
  const articles = [
    {
      id: "faces",
      category: "장면 읽기",
      title: "풍경보다 오래 남는, 사람의 얼굴",
      description: "돌아온 사람과 남겨진 마음. 파도가 머문 자리를 읽는 방법.",
      film: "tide",
      paragraphs: [
        "‘파도가 머문 자리’의 출발점은 바다가 아니라, 아버지가 남긴 소리를 듣는 서윤입니다. 익숙한 장소에 돌아왔어도 마음까지 같은 자리에 있는 것은 아닙니다. 이 작품을 고를 때는 풍경의 아름다움보다 인물이 무엇을 피하고 무엇을 마주하려 하는지 먼저 생각해 보세요.",
        "한 편을 고르는 작은 기준을 만들어도 좋습니다. 오늘은 가족에 관한 이야기인지, 관계의 변화인지, 한 사람의 선택인지 살펴보는 겁니다. 줄거리에서 마음이 움직이는 지점을 찾았다면, 그 작품을 찜해 다음 선택으로 남겨두세요.",
      ],
    },
    {
      id: "running-time",
      category: "고르는 기준",
      title: "18분부터 42분까지, 오늘의 러닝타임",
      description:
        "짧은 편지 한 통부터 한밤의 미스터리까지. 내 시간에 맞는 한 편.",
      film: "letters",
      paragraphs: [
        "짧은 여유에는 18분의 ‘여름의 편지’, 조금 더 머물고 싶은 날에는 42분의 ‘밤의 온실’을 골라보세요. 러닝타임은 작품의 깊이를 재는 점수가 아니라, 지금 내게 있는 시간에 맞춰 선택하는 실용적인 기준입니다.",
        "두 편을 이어 고르고 싶다면 기획전을 살펴보세요. ‘고요한 밤’과 ‘다정한 하루’는 각각 총 45분, ‘낯선 세계’는 총 78분입니다. 먼저 분위기를 고르고 작품별 시간을 비교하면, 긴 목록을 다시 훑지 않아도 오늘의 한 편을 정할 수 있습니다.",
      ],
    },
    {
      id: "enclosed-spaces",
      category: "이야기의 공간",
      title: "닫힌 공간에서 시작되는 이야기",
      description: "밤의 온실과 먼 관측 기지. 인물에게 공간이 갖는 의미.",
      film: "greenhouse",
      paragraphs: [
        "‘밤의 온실’에는 자정마다 불이 켜지는 닫힌 문이, ‘느린 궤도’에는 지구에서 멀리 떨어진 관측 기지가 있습니다. 두 설정 모두 익숙한 일상에서 벗어난 장소에 인물을 놓고, 그곳에 머물거나 안으로 들어갈 이유를 묻게 합니다.",
        "미스터리와 SF라는 장르는 다르지만 두 작품은 ‘낯선 세계’ 기획전에서 함께 만날 수 있습니다. 작품 상세의 짧은 소개를 읽으며, 더 알고 싶은 질문이 남는 쪽을 골라보세요. 정답을 찾기보다 호기심이 생긴 작품을 먼저 담는 것으로 충분합니다.",
      ],
    },
  ];
  const $ = (id) => document.getElementById(id);
  const storageKey = "jansang-cinema:saved:v1";
  const notesKey = "jansang-cinema:notes:v1";
  const validIds = new Set(films.map((f) => f.id));
  const state = {
    view: "home",
    mood: "all",
    query: "",
    libraryFilter: "all",
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
      const labelText = btn.classList.contains("card-save")
        ? on
          ? "찜함"
          : "찜"
        : on
          ? "찜 완료"
          : "찜하기";
      btn.setAttribute(
        "aria-label",
        `${film.title} ${labelText}${on ? ", 찜 해제" : ""}`,
      );
      const label = btn.querySelector("span");
      if (label) label.textContent = labelText;
    });
    document.querySelectorAll("[data-note-for]").forEach((badge) => {
      badge.hidden = !state.notes[badge.dataset.noteFor];
    });
    const count = films.filter((film) => inLibrary(film.id)).length;
    $("savedCount").textContent = count;
    $("savedCount")
      .closest("a")
      .setAttribute("aria-label", `내 보관함, 영화 ${count}편`);
    $("storageNote").textContent =
      state.storageAvailable && state.notesStorageAvailable
        ? "찜한 영화와 나의 영화 노트가 이 브라우저에 저장됩니다."
        : "브라우저 저장 공간을 사용할 수 없어 일부 변경은 이 페이지에서만 유지됩니다.";
  }
  // Keep long movie names in deliberate phrase groups at every card size.
  const titleLines = {
    tide: ["파도가", "머문 자리"],
    letters: ["여름의", "편지"],
    greenhouse: ["밤의", "온실"],
    orbit: ["느린", "궤도"],
    windows: ["불이", "켜지는 시간"],
  };
  function makeCard(film) {
    const article = document.createElement("article");
    article.className = "film-card";
    article.dataset.filmId = film.id;
    const displayTitle = (titleLines[film.id] || [film.title])
      .map((line) => `<span class="film-title-line">${line}</span>`)
      .join(" ");
    article.innerHTML = `<h3><button class="film-art" data-detail="${film.id}" aria-label="${film.title} 작품 보기"><img src="assets/posters-v8/${film.image}.webp" alt="" width="800" height="1200" loading="lazy"><span class="film-arrow" aria-hidden="true">${icon("arrow")}</span><span class="film-label"><span class="film-title">${displayTitle}</span></span></button></h3><div class="film-foot"><p><span>${film.genre}</span><span>${film.minutes}분</span></p><button class="card-save save-button" data-save="${film.id}" aria-label="${film.title} 찜하기" aria-pressed="false">${icon("bookmark")}<span>찜</span></button></div><span class="film-note-badge" data-note-for="${film.id}"${state.notes[film.id] ? "" : " hidden"}>노트 있음</span>`;
    return article;
  }
  const themeDescriptionLines = {
    quiet: ["파도와 숲 사이,", "잠시 쉬어가는 두 편."],
    warmth: ["편지와 이웃이 전하는", "작은 다정함."],
    beyond: ["미스터리와 SF,", "낯선 세계로의 초대."],
  };
  function renderThemes(id) {
    const theme = themes.find((t) => t.id === id) || themes[0];
    $("themeNumber").textContent = theme.number;
    $("themeTagline").textContent = theme.english;
    $("themeTitle").textContent = theme.name;
    $("themeDescription").replaceChildren(
      ...themeDescriptionLines[theme.id].flatMap((text, index) => {
        const line = document.createElement("span");
        line.className = "theme-description-line";
        line.textContent = text;
        return index ? [document.createTextNode(" "), line] : [line];
      }),
    );
    const selectedFilms = theme.films.map((id) =>
      films.find((f) => f.id === id),
    );
    $("themeDuration").textContent =
      `작품 ${selectedFilms.length}편 · 총 ${selectedFilms.reduce((sum, f) => sum + f.minutes, 0)}분`;
    $("themeFilms").replaceChildren(...selectedFilms.map(makeCard));
    document.querySelectorAll("[data-theme]").forEach((link) => {
      if (link.dataset.theme === theme.id)
        link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    updateSaveButtons();
  }
  $("themePreviews").innerHTML = themes
    .map(
      (theme) =>
        `<a class="theme-preview" href="#themes/${theme.id}"><div class="theme-preview-image"><img src="${theme.previewImage}" alt="" width="${theme.previewWidth}" height="${theme.previewHeight}" loading="lazy"><span class="theme-preview-number" aria-hidden="true">${theme.number}</span></div><div class="theme-preview-copy"><span class="eyebrow">${theme.english}</span><h3>${theme.name}</h3><p class="theme-preview-description">${theme.previewDescription}</p><span class="theme-preview-meta">작품 2편 ${icon("arrow")}</span></div></a>`,
    )
    .join("");
  $("themeTabs").innerHTML = themes
    .map(
      (theme) =>
        `<a href="#themes/${theme.id}" data-theme="${theme.id}"><span aria-hidden="true">${theme.number}</span>${theme.name}</a>`,
    )
    .join("");
  const articleTitleLines = {
    faces: ["풍경보다 오래 남는,", "사람의 얼굴"],
    "running-time": ["18분부터 42분까지,", "오늘의 러닝타임"],
    "enclosed-spaces": ["닫힌 공간에서", "시작되는 이야기"],
  };
  function makeArticleCard(article) {
    const film = films.find((item) => item.id === article.film);
    const card = document.createElement("article");
    card.className = "journal-card";
    const displayTitle = (articleTitleLines[article.id] || [article.title])
      .map((line) => `<span class="journal-title-line">${line}</span>`)
      .join(" ");
    card.innerHTML = `<button class="journal-card-button" data-article="${article.id}"><span class="journal-card-image"><img src="assets/posters-v8/${film.image}.webp" alt="" width="800" height="1200" loading="lazy"></span><span class="journal-card-copy"><span class="eyebrow">${article.category}</span><h3>${displayTitle}</h3><p>${article.description}</p><span class="journal-card-link">읽어보기 ${icon("arrow")}</span></span></button>`;
    return card;
  }
  // The hero and theme banners already introduce greenhouse and forest.
  const homeSelection = ["tide", "letters", "orbit", "windows"];
  $("homeFilms").replaceChildren(
    ...homeSelection.map((id) =>
      makeCard(films.find((film) => film.id === id)),
    ),
  );
  $("journalGrid").replaceChildren(...articles.map(makeArticleCard));
  $("homeJournal").replaceChildren(
    ...articles.slice(0, 1).map(makeArticleCard),
  );
  function matches(film) {
    const q = state.query.toLocaleLowerCase("ko").replace(/\s+/g, "");
    return (
      (state.view !== "saved" || inLibraryFilter(film.id)) &&
      (state.mood === "all" || state.mood === film.mood) &&
      (!q ||
        `${film.title} ${film.english} ${film.genre} ${film.moodText} ${film.keywords}`
          .toLocaleLowerCase("ko")
          .replace(/\s+/g, "")
          .includes(q))
    );
  }
  function render({ preserveFocus = false } = {}) {
    const focused =
      preserveFocus && $("filmGrid").contains(document.activeElement)
        ? document.activeElement.closest("[data-detail], [data-save]")
        : null;
    const focusedAttribute = focused?.hasAttribute("data-detail")
      ? "data-detail"
      : "data-save";
    const focusedId = focused?.getAttribute(focusedAttribute);
    const visible = films.filter(matches),
      grid = $("filmGrid");
    grid.replaceChildren(...visible.map(makeCard));
    const filtered =
      state.query.trim() ||
      state.mood !== "all" ||
      (state.view === "saved" && state.libraryFilter !== "all");
    const libraryLabels = {
      all: "보관함 전체",
      saved: "찜한 영화",
      noted: "노트 있는 영화",
    };
    $("resultCount").textContent =
      `${state.view === "saved" ? libraryLabels[state.libraryFilter] : filtered ? "검색 결과" : "전체"} ${visible.length}편`;
    $("libraryFilters").hidden = state.view !== "saved";
    $("moodFilters").hidden = state.view === "saved";
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
    grid.hidden = visible.length === 0;
    const emptyLibrary =
      state.view === "saved" && !films.some((film) => inLibrary(film.id));
    const emptyCategory =
      state.view === "saved" &&
      !emptyLibrary &&
      !films.some((film) => inLibraryFilter(film.id));
    $("emptyTitle").textContent = emptyLibrary
      ? "아직 보관한 영화가 없어요."
      : emptyCategory
        ? state.libraryFilter === "saved"
          ? "아직 찜한 영화가 없어요."
          : "아직 노트를 남긴 영화가 없어요."
        : "조건에 맞는 영화가 없어요.";
    $("emptyText").textContent = emptyLibrary
      ? "영화를 찜하거나 나의 영화 노트를 남겨보세요."
      : emptyCategory
        ? "전체 보관함에서 영화를 골라 찜하거나 노트를 남겨보세요."
        : state.view === "saved"
          ? "다른 검색어나 보관함 분류로 다시 찾아보세요."
          : "다른 검색어나 분위기로 다시 찾아보세요.";
    $("emptyAction").dataset.action = emptyLibrary ? "browse" : "reset";
    $("emptyAction").innerHTML =
      `${emptyLibrary ? "영화 둘러보기" : emptyCategory ? "보관함 전체보기" : "조건 초기화"}${icon("arrow")}`;
    $("storageNote").hidden = state.view !== "saved";
    updateSaveButtons();
    if (focusedId) {
      const replacement =
        grid.querySelector(`[${focusedAttribute}="${focusedId}"]`) ||
        grid.querySelector("[data-detail]") ||
        $("emptyAction");
      replacement.focus({ preventScroll: true });
    }
  }
  function resetFilters() {
    state.mood = "all";
    state.query = "";
    if (state.view === "saved") state.libraryFilter = "all";
    $("searchInput").value = "";
    render();
  }
  const catalogFilters = {
    browse: { mood: "all", query: "" },
    saved: { mood: "all", query: "" },
  };
  let searchRequested = false;
  let firstRoute = true;
  function navigate(path) {
    const hash = `#${path}`;
    if (location.hash === hash) route();
    else location.hash = hash;
  }
  function route() {
    document
      .querySelectorAll("dialog[open]")
      .forEach((dialog) => dialog.close());
    const [path, themeId] = location.hash.slice(1).split("/");
    const view = ["browse", "saved", "themes", "journal"].includes(path)
      ? path
      : "home";
    const previousView = state.view;
    if (catalogFilters[previousView])
      catalogFilters[previousView] = { mood: state.mood, query: state.query };
    state.view = view;
    document.body.dataset.view = view;
    document.body.classList.toggle("saved-view", view === "saved");
    $("homeView").hidden = view !== "home";
    $("themesView").hidden = view !== "themes";
    $("journalView").hidden = view !== "journal";
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
        view === "saved" ? "내 보관함" : "영화 둘러보기";
      $("catalogKicker").textContent =
        view === "saved" ? "찜과 노트를 한곳에" : "잔상관의 모든 영화";
      $("catalogDescription").textContent =
        view === "saved"
          ? "찜한 영화와 노트를 남긴 영화를 다시 만나보세요."
          : "분위기로 좁히거나, 마음에 둔 작품을 찾아보세요.";
      if (searchRequested) resetFilters();
      else render();
      heading = $("catalogTitle");
    } else if (view === "themes") {
      renderThemes(themeId);
      heading =
        previousView === "themes" && !firstRoute
          ? $("themeTitle")
          : $("themesTitle");
    } else {
      if (view === "journal") heading = $("journalTitle");
      updateSaveButtons();
    }
    const pageTitle = {
      home: "이야기가 시작되는 곳",
      themes: "기획전",
      journal: "매거진",
      browse: "작품 둘러보기",
      saved: "내 보관함",
    }[view];
    document.title = `${pageTitle} — 잔상관`;
    if (!firstRoute) {
      if (previousView !== "themes" || view !== "themes")
        window.scrollTo({ top: 0, behavior: "instant" });
      if (searchRequested) $("searchInput").focus({ preventScroll: true });
      else heading.focus({ preventScroll: true });
    }
    searchRequested = false;
    firstRoute = false;
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
    if (!/^#(home|browse|saved|themes|journal)(\/|$)/.test(hash)) return;
    event.preventDefault();
    navigate(hash.slice(1));
  });
  $("searchShortcut").addEventListener("click", () => {
    searchRequested = true;
    navigate("browse");
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
  let activeDetailId = null;
  let noteDirty = false;
  function openDialog(dialog, trigger, heading) {
    document.querySelectorAll("dialog[open]").forEach((open) => {
      if (open !== dialog) open.close();
    });
    dialogContexts.set(dialog, { trigger });
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
    heading.focus({ preventScroll: true });
  }
  function noteSavedMessage() {
    return state.notesStorageAvailable
      ? "노트를 저장했어요."
      : "이 페이지에서만 보관 중이에요. 새로고침하면 사라집니다.";
  }
  function updateNoteCount() {
    $("noteCount").textContent = `${$("noteText").value.length}/280`;
    const hasSavedNote = Boolean(state.notes[activeDetailId]);
    $("noteDelete").hidden = !hasSavedNote;
    $("noteDelete").disabled = !hasSavedNote;
  }
  function loadNote() {
    $("noteText").value = state.notes[activeDetailId] || "";
    noteDirty = false;
    updateNoteCount();
    $("noteStatus").textContent = state.notes[activeDetailId]
      ? noteSavedMessage()
      : "영화에서 궁금한 점이나 남겨둘 생각을 노트로 남겨보세요.";
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
    if (trigger?.closest("#articleDialog"))
      trigger = dialogContexts.get($("articleDialog"))?.trigger || trigger;
    activeDetailId = id;
    $("detailTitle").textContent = film.title;
    $("detailDialog").dataset.filmId = film.id;
    $("detailMood").textContent = film.moodText;
    $("detailMeta").textContent =
      `${film.genre} · ${film.minutes}분 · 가상 단편`;
    $("detailDescription").textContent = film.description;
    $("detailImage").src = `assets/posters-v8/${film.image}.webp`;
    $("detailImage").alt = `${film.title}의 가상 영화 포스터`;
    $("detailImage").width = 800;
    $("detailImage").height = 1200;
    $("detailImage").style.objectPosition = "center";
    $("detailSave").dataset.save = id;
    loadNote();
    updateSaveButtons();
    openDialog($("detailDialog"), trigger, $("detailTitle"));
  }
  function showArticle(id, trigger) {
    const article = articles.find((item) => item.id === id);
    if (!article) return;
    const film = films.find((item) => item.id === article.film);
    $("articleTitle").textContent = article.title;
    $("articleCategory").textContent = article.category;
    $("articleImage").src = `assets/posters-v8/${film.image}.webp`;
    $("articleImage").alt = `${film.title}의 가상 영화 포스터`;
    $("articleImage").width = 800;
    $("articleImage").height = 1200;
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
  $("noteText").addEventListener("input", () => {
    noteDirty = $("noteText").value !== (state.notes[activeDetailId] || "");
    updateNoteCount();
    $("noteStatus").textContent = noteDirty
      ? "아직 저장하지 않은 변경 내용이 있어요."
      : state.notes[activeDetailId]
        ? noteSavedMessage()
        : "";
  });
  $("noteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeDetailId) return;
    const value = $("noteText").value.trim();
    if (!value || value.length > 280) {
      $("noteStatus").textContent = "1~280자로 노트를 입력한 뒤 저장해 주세요.";
      $("noteText").focus();
      return;
    }
    state.notes[activeDetailId] = value;
    persistNotes();
    loadNote();
    refreshLibrary();
  });
  $("noteDelete").addEventListener("click", () => {
    if (!activeDetailId || !state.notes[activeDetailId]) return;
    delete state.notes[activeDetailId];
    persistNotes();
    loadNote();
    refreshLibrary();
    $("noteStatus").textContent = state.notesStorageAvailable
      ? "이 영화의 노트를 삭제했어요."
      : "이 페이지의 노트를 지웠어요. 브라우저 저장 공간은 사용할 수 없습니다.";
    $("noteText").focus();
  });
  document.addEventListener("click", (event) => {
    const detail = event.target.closest("[data-detail]");
    if (detail) showDetail(detail.dataset.detail, detail);
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
        `${film.title} · ${wasSaved ? (state.notes[id] ? "찜을 해제했어요. 노트는 보관함에 남아 있어요." : "찜 목록에서 뺐어요.") : state.storageAvailable ? "이 브라우저에 저장했어요." : "잠시 담았어요. 새로고침하면 사라져요."}`,
      );
    }
    const close = event.target.closest("[data-close]");
    if (close) $(close.dataset.close).close();
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        )
          dialog.close();
      }
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusable = [
        ...dialog.querySelectorAll(
          'button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]',
        ),
      ].filter((el) => el.getClientRects().length);
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
      const trigger = dialogContexts.get(dialog)?.trigger;
      dialogContexts.delete(dialog);
      const detailId = dialog.id === "detailDialog" ? activeDetailId : null;
      if (dialog.id === "detailDialog") activeDetailId = null;
      if (document.querySelector("dialog[open]")) return;
      document.body.classList.remove("dialog-open");
      clearTimeout(toastTimer);
      $("toast").classList.remove("visible");
      document.body.append($("toast"));
      const currentReplacement =
        detailId &&
        [...document.querySelectorAll(`[data-detail="${detailId}"]`)].find(
          (el) => !el.closest("dialog") && el.getClientRects().length,
        );
      const heading =
        state.view === "themes"
          ? $("themesTitle")
          : state.view === "journal"
            ? $("journalTitle")
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
      const previousNote = state.notes[activeDetailId];
      state.notes = readNotes(event.key === null ? null : event.newValue);
      state.notesStorageAvailable = true;
      if (
        activeDetailId &&
        $("detailDialog").open &&
        previousNote !== state.notes[activeDetailId]
      ) {
        if (noteDirty) {
          updateNoteCount();
          $("noteStatus").textContent =
            "다른 탭의 노트가 변경됐어요. 입력 중인 내용은 유지했어요.";
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
  route();
})();
