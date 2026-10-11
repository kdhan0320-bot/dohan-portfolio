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
    {
      id: "bluehour",
      title: "파란 오후",
      english: "BLUE AFTERNOON",
      genre: "애니메이션",
      minutes: 28,
      mood: "warm",
      moodText: "다정한 모험",
      image: "bluehour",
      posterPath: "assets/posters-v13/bluehour.webp",
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
      posterPath: "assets/posters-v13/atlas.webp",
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
      mood: "wonder",
      moodText: "새로운 가능성",
      image: "relay",
      posterPath: "assets/posters-v13/relay.webp",
      description:
        "부상 후 트랙을 떠나려던 육상 선수에게 마지막 계주 출전 제안이 온다. 혼자 빠르게 달리는 법만 알던 그는 동료에게 바통을 건네는 법을 배운다.",
      keywords: "스포츠 육상 달리기 계주 트랙 바통 동료 도전 가능성 경이로운",
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
      previewDescription: "고요한 풍경과 느린 대화에 머무는 네 편",
      previewImage: "assets/posters-v8/forest.webp",
      accent: "#9CBFDF",
      descriptionLines: ["고요한 풍경에 머무는 네 편."],
      films: ["tide", "forest", "bluehour", "nocturne"],
    },
    {
      id: "warmth",
      name: "다정한 반전",
      number: "02",
      article: "running-time",
      previewDescription: "작은 용기가 관계를 바꾸는 네 편",
      previewImage: "assets/posters-v13/rooftop.webp",
      accent: "#EDBA88",
      descriptionLines: ["작은 용기가 바꾸는 관계."],
      films: ["letters", "windows", "rooftop", "relay"],
    },
    {
      id: "beyond",
      name: "상상 바깥으로",
      number: "03",
      article: "enclosed-spaces",
      previewDescription: "낯선 규칙으로 일상을 벗어나는 네 편",
      previewImage: "assets/posters-v13/atlas.webp",
      accent: "#C3B6EC",
      descriptionLines: ["익숙한 세계 너머의 상상."],
      films: ["greenhouse", "orbit", "atlas", "signal"],
    },
  ];
  const articles = [
    {
      id: "faces",
      category: "큐레이션 노트",
      title: "풍경 속에 남은 마음",
      film: "tide",
      paragraphs: [
        "‘파도가 머문 자리’의 서윤은 아버지가 남긴 소리를 따라 돌아옵니다. ‘숲의 호흡’은 말 대신 자연의 소리에 머뭅니다. 같은 고요함도 한 사람의 기억과 숲의 풍경에서 서로 다르게 펼쳐집니다.",
        "‘파란 오후’의 재회와 ‘새벽 두 시의 식탁’의 대화까지. 빠른 사건보다 인물과 공간에 천천히 가까워지는 네 편을 묶었습니다.",
      ],
    },
    {
      id: "running-time",
      category: "큐레이션 노트",
      title: "서로에게 건네는 작은 용기",
      film: "letters",
      paragraphs: [
        "부치지 못한 편지, 멈춘 엘리베이터, 마지막 옥상 공연과 계주. ‘다정한 반전’의 네 편은 누군가를 향해 한 걸음 내딛는 순간에서 만납니다.",
        "18분의 ‘여름의 편지’부터 31분의 ‘마지막 바통’까지, 관계가 달라지는 작은 선택에 초점을 맞췄습니다.",
      ],
    },
    {
      id: "enclosed-spaces",
      category: "큐레이션 노트",
      title: "익숙한 세계 바깥의 신호",
      film: "greenhouse",
      paragraphs: [
        "자정마다 불이 켜지는 온실, 지구에서 멀리 떨어진 기지, 종이별로 채우는 밤하늘과 미래에서 온 구조 신호. 평범한 일상에 낯선 규칙이 들어오는 네 편입니다.",
        "미스터리의 긴장과 SF·애니메이션의 상상력을 함께 담았습니다. 공간보다 그 안에서 선택해야 하는 인물에 주목해 보세요.",
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
      if (btn.id === "detailSave")
        $("detailSaveLabel").textContent = on ? "찜한 영화" : "찜하기";
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
  function makeCard(film) {
    const article = document.createElement("article");
    article.className = "film-card";
    article.dataset.filmId = film.id;
    article.dataset.posterLayout = posterLayouts[film.id];
    const displayTitle = (titleLines[film.id] || [film.title])
      .map((line) => `<span class="film-title-line">${line}</span>`)
      .join(" ");
    article.innerHTML = `<h3><button class="film-art" type="button" data-detail="${film.id}" aria-label="${film.title} 작품 보기"><img src="${posterPath(film)}" alt="" width="800" height="1200" loading="lazy"><span class="film-label"><span class="film-title">${displayTitle}</span></span></button></h3><button class="poster-save save-button" type="button" data-save="${film.id}" aria-label="${film.title} 찜하기" title="${film.title} 찜하기" aria-pressed="false">${icon("bookmark")}</button><div class="film-foot"><p><span>${film.genre}</span><span>${film.minutes}분</span></p></div><span class="film-note-badge" data-note-for="${film.id}"${state.notes[film.id] ? "" : " hidden"}>메모 있음</span>`;
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
    $("themeCover").src = theme.previewImage;
    $("themeCover").alt = "";
    $("themeCover").width = 800;
    $("themeCover").height = 1200;
    $("themeFilms").replaceChildren(...selectedFilms.map(makeCard));
    updateSaveButtons();
    return true;
  }
  function makeThemePreview(theme) {
    const link = document.createElement("a");
    link.className = "theme-preview theme-overview-card";
    link.href = `#themes/${theme.id}`;
    link.dataset.themePreview = theme.id;
    link.style.setProperty("--theme-accent", theme.accent);
    link.innerHTML = `<div class="theme-preview-image"><img src="${theme.previewImage}" alt="" width="800" height="1200" loading="lazy"><span class="theme-preview-number" aria-hidden="true">${theme.number}</span></div><div class="theme-preview-copy"><h3>${theme.name}</h3><p class="theme-preview-description">${theme.previewDescription}</p><span class="theme-preview-meta">작품 ${theme.films.length}편</span></div>`;
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
  function renderHomeLibrary() {
    const libraryFilms = orderedFilms
      .filter((film) => inLibrary(film.id))
      .slice(0, 3);
    const signature = JSON.stringify(
      libraryFilms.map((film) => [film.id, Boolean(state.notes[film.id])]),
    );
    if (signature === homeLibrarySignature) return;
    homeLibrarySignature = signature;
    const container = $("homeLibraryItems");
    const focusedId = container.contains(document.activeElement)
      ? document.activeElement.closest("[data-detail]")?.dataset.detail
      : null;
    $("homeLibraryEmpty").hidden = libraryFilms.length > 0;
    container.hidden = libraryFilms.length === 0;
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
        button.innerHTML = `<img src="${posterPath(film)}" alt="" width="80" height="120" loading="lazy"><span class="library-mini-copy"><strong>${film.title}</strong><span>${film.genre} · ${film.minutes}분</span>${state.notes[film.id] ? "<small>메모 있음</small>" : ""}</span>`;
        return button;
      }),
    );
    if (focusedId) {
      const replacement =
        container.querySelector(`[data-detail="${focusedId}"]`) ||
        container.querySelector("[data-detail]") ||
        $("homeLibraryEmpty").querySelector("a");
      replacement?.focus({ preventScroll: true });
    }
  }
  function renderHome() {
    const visible = orderedFilms.filter(
      (film) =>
        (state.homeMood === "all" || film.mood === state.homeMood) &&
        (state.homeDuration === "all" ||
          film.minutes <= Number(state.homeDuration)),
    );
    filmRail.replaceChildren(...visible.map(makeCard));
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
  function updateRail() {
    railFrame = 0;
    if (!filmRail.getClientRects().length) return;
    const max = Math.max(0, filmRail.scrollWidth - filmRail.clientWidth);
    const left = Math.max(0, Math.min(max, filmRail.scrollLeft));
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
    if (railStatus) {
      const bounds = filmRail.getBoundingClientRect();
      const visible = [...filmRail.children]
        .map((card, index) => ({ rect: card.getBoundingClientRect(), index }))
        .filter(
          ({ rect }) =>
            rect.right > bounds.left + 2 && rect.left < bounds.right - 2,
        );
      railStatus.textContent = visible.length
        ? `${visible[0].index + 1}–${visible.at(-1).index + 1} / ${filmRail.children.length}`
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
      ? second.offsetLeft - first.offsetLeft
      : first.getBoundingClientRect().width;
    const count = Math.max(
      1,
      Math.floor((filmRail.clientWidth + 1) / Math.max(stride, 1)),
    );
    filmRail.scrollBy({
      left: direction * Math.max(stride, 1) * count,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    requestRailUpdate();
  }
  if (!filmRail.hasAttribute("tabindex")) filmRail.tabIndex = 0;
  railPrevious?.addEventListener("click", () => scrollRail(-1));
  railNext?.addEventListener("click", () => scrollRail(1));
  filmRail.addEventListener("scroll", requestRailUpdate, { passive: true });
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
      (state.view !== "browse" ||
        state.duration === "all" ||
        film.minutes <= Number(state.duration)) &&
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
    const visible = orderedFilms.filter(matches);
    if (state.view === "browse" && state.sort === "title")
      visible.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    if (state.view === "browse" && state.sort === "short")
      visible.sort((a, b) => a.minutes - b.minutes);
    const grid = $("filmGrid");
    grid.replaceChildren(...visible.map(makeCard));
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
    $("libraryFilters").hidden = state.view !== "saved";
    $("moodFilters").hidden = state.view === "saved";
    $("sortField").hidden = state.view !== "browse";
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
          : "아직 메모를 남긴 영화가 없어요."
        : "조건에 맞는 영화가 없어요.";
    $("emptyText").textContent = emptyLibrary
      ? "마음에 드는 영화를 찜해 모아보세요."
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
    browse: { mood: "all", duration: "all", query: "" },
    saved: { mood: "all", duration: "all", query: "" },
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
    if (link.hasAttribute("data-home-browse")) {
      catalogFilters.browse = {
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
    if (!["all", "30", "45"].includes(event.target.value)) return;
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
    if (!["all", "30", "45"].includes(event.target.value)) return;
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
  // Drafts survive internal navigation, but never count as saved library notes.
  // They are intentionally memory-only and disappear on refresh or tab close.
  const noteDrafts = new Map();
  let activeDetailId = null;
  let noteDirty = false;
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
  function openDialog(dialog, trigger, heading) {
    document.querySelectorAll("dialog[open]").forEach((open) => {
      if (open !== dialog) closeDialog(open, { restoreFocus: false });
    });
    dialogContexts.set(dialog, {
      trigger,
      detailId: dialog.id === "detailDialog" ? activeDetailId : null,
      restoreFocus: true,
    });
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
    heading.focus({ preventScroll: true });
  }
  function noteSavedMessage() {
    return state.notesStorageAvailable
      ? "메모를 저장했어요."
      : "이 페이지에서만 보관 중이에요. 새로고침하면 사라집니다.";
  }
  function updateNoteCount() {
    $("noteCount").textContent = `${$("noteText").value.length}/280`;
    const hasSavedNote = Boolean(state.notes[activeDetailId]);
    $("noteDelete").hidden = !hasSavedNote;
    $("noteDelete").disabled = !hasSavedNote;
    $("noteSummary").textContent =
      hasSavedNote || noteDrafts.has(activeDetailId)
        ? "관심 메모"
        : "관심 메모 남기기";
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
    if (trigger?.closest("#articleDialog"))
      trigger = dialogContexts.get($("articleDialog"))?.trigger || trigger;
    if ($("detailDialog").open) rememberNoteDraft();
    activeDetailId = id;
    $("detailTitle").textContent = film.title;
    $("detailDialog").dataset.filmId = film.id;
    $("detailMood").textContent = film.moodText;
    $("detailMeta").textContent = `${film.genre} · ${film.minutes}분`;
    $("detailDescription").textContent = film.description;
    $("detailImage").src = posterPath(film);
    $("detailImage").alt = `${film.title}의 가상 영화 포스터`;
    $("detailImage").width = 800;
    $("detailImage").height = 1200;
    $("detailImage").style.objectPosition = "center";
    $("detailSave").dataset.save = id;
    loadNote();
    $("noteDisclosure").open = Boolean(state.notes[id] || noteDrafts.has(id));
    updateSaveButtons();
    openDialog($("detailDialog"), trigger, $("detailTitle"));
  }
  function showArticle(id, trigger) {
    const article = articles.find((item) => item.id === id);
    if (!article) return;
    const film = films.find((item) => item.id === article.film);
    $("articleTitle").textContent = article.title;
    $("articleCategory").textContent = article.category;
    $("articleImage").src = posterPath(film);
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
    rememberNoteDraft();
    updateNoteCount();
    $("noteStatus").textContent = noteDirty
      ? noteDraftMessage()
      : state.notes[activeDetailId]
        ? noteSavedMessage()
        : "";
  });
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
      document.body.classList.remove("dialog-open");
      clearTimeout(toastTimer);
      $("toast").classList.remove("visible");
      document.body.append($("toast"));
      // A queued close event must not steal focus from the new route heading.
      if (!context?.restoreFocus) return;
      const currentReplacement =
        detailId &&
        [...document.querySelectorAll(`[data-detail="${detailId}"]`)].find(
          (el) => !el.closest("dialog") && el.getClientRects().length,
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
