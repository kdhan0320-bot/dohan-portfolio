/* 잔상관: fictional catalogue / real client-side interactions / no account or streaming API */
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
      position: "66% center",
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
  const $ = (id) => document.getElementById(id);
  const storageKey = "jansang-cinema:saved:v1";
  const validIds = new Set(films.map((f) => f.id));
  const state = {
    view: "browse",
    mood: "all",
    query: "",
    saved: new Set(),
    storageAvailable: true,
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
    $("savedCount").textContent = state.saved.size;
    $("storageNote").textContent = state.storageAvailable
      ? "이 브라우저에 저장된 작품입니다."
      : "브라우저 저장 공간을 사용할 수 없어, 이 페이지를 닫으면 찜 목록이 사라집니다.";
  }
  function makeCard(film) {
    const article = document.createElement("article");
    article.className = "film-card";
    article.dataset.filmId = film.id;
    article.innerHTML = `<h3><button class="film-art" data-detail="${film.id}" aria-label="${film.title} 작품 보기"><img src="assets/stills/${film.image}.webp" alt="" width="1672" height="941" loading="lazy" style="object-position:${film.position}"><span class="film-arrow" aria-hidden="true">${icon("arrow")}</span><span class="film-label"><small>${film.english}</small><span class="film-title">${film.title}</span></span></button></h3><div class="film-foot"><p><span>${film.genre}</span><span>${film.minutes}분</span></p><button class="card-save save-button" data-save="${film.id}" aria-label="${film.title} 찜하기" aria-pressed="false">${icon("bookmark")}<span>찜</span></button></div>`;
    return article;
  }
  function matches(film) {
    const q = state.query.toLocaleLowerCase("ko").replace(/\s+/g, "");
    return (
      (state.view !== "saved" || state.saved.has(film.id)) &&
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
    const filtered = state.query.trim() || state.mood !== "all";
    $("resultCount").textContent =
      `${state.view === "saved" ? "찜한 작품" : filtered ? "검색 결과" : "전체"} ${visible.length}편`;
    $("resetFilters").hidden = !filtered;
    $("clearSearch").hidden = !state.query;
    document
      .querySelectorAll("[data-mood]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.mood === state.mood)),
      );
    $("emptyState").hidden = visible.length > 0;
    grid.hidden = visible.length === 0;
    const emptySaved = state.view === "saved" && state.saved.size === 0;
    $("emptyTitle").textContent = emptySaved
      ? "아직 담아둔 장면이 없어요."
      : "찾는 장면이 아직 없어요.";
    $("emptyText").textContent = emptySaved
      ? "마음에 남는 작품을 찜해보세요."
      : "다른 검색어나 분위기로 다시 찾아보세요.";
    $("emptyAction").innerHTML =
      `${emptySaved ? "작품 둘러보기" : "조건 초기화"}${icon("arrow")}`;
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
    $("searchInput").value = "";
    render();
  }
  function setView(view, { scroll = false, reset = true } = {}) {
    state.view = view;
    document.body.classList.toggle("saved-view", view === "saved");
    $("home").hidden = view === "saved";
    $("catalogTitle").textContent =
      view === "saved" ? "찜한 작품" : "작품 둘러보기";
    $("catalogKicker").textContent =
      view === "saved" ? "YOUR COLLECTION" : "THE SCREENING ROOM";
    document.querySelectorAll("[data-view]").forEach((a) => {
      if (a.dataset.view === view) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (reset) resetFilters();
    else render();
    if (scroll) {
      $("browse").scrollIntoView({ block: "start" });
      $("catalogTitle").focus({ preventScroll: true });
    }
  }
  function navigate(view) {
    const hash = view === "saved" ? "#saved" : "#browse";
    if (location.hash === hash) setView(view, { scroll: true });
    else location.hash = hash;
  }
  function route() {
    if (location.hash === "#saved") setView("saved", { scroll: true });
    else if (location.hash === "#browse") setView("browse", { scroll: true });
    else if (location.hash === "#home") {
      setView("browse");
      $("home").scrollIntoView({ block: "start" });
    } else setView("browse");
  }
  window.addEventListener("hashchange", route);
  document.querySelectorAll("[data-view]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(a.dataset.view);
    }),
  );
  document.querySelectorAll(".brand").forEach((a) =>
    a.addEventListener("click", () => {
      setView("browse");
      if (location.hash === "#home")
        $("home").scrollIntoView({ block: "start" });
    }),
  );
  $("searchShortcut").addEventListener("click", () => {
    $("browse").scrollIntoView({ block: "start" });
    $("searchInput").focus({ preventScroll: true });
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
  $("resetFilters").addEventListener("click", () => {
    resetFilters();
    document.querySelector('[data-mood="all"]').focus();
  });
  $("emptyAction").addEventListener("click", () => {
    if (state.view === "saved" && state.saved.size === 0) navigate("browse");
    else {
      resetFilters();
      $("searchInput").focus();
    }
  });
  let activeTrigger = null,
    activeDetailId = null;
  function openDialog(dialog, trigger, heading) {
    activeTrigger = trigger;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
    heading.focus({ preventScroll: true });
  }
  function showDetail(id, trigger) {
    const film = films.find((f) => f.id === id);
    if (!film) return;
    activeDetailId = id;
    $("detailTitle").textContent = film.title;
    $("detailMood").textContent = film.moodText;
    $("detailMeta").textContent = `${film.genre} · ${film.minutes}분`;
    $("detailDescription").textContent = film.description;
    $("detailImage").src = `assets/stills/${film.image}.webp`;
    $("detailImage").alt = `${film.title}의 가상 장면`;
    $("detailImage").style.objectPosition = film.position;
    $("detailSave").dataset.save = id;
    updateSaveButtons();
    openDialog($("detailDialog"), trigger, $("detailTitle"));
  }
  document.addEventListener("click", (event) => {
    const detail = event.target.closest("[data-detail]");
    if (detail) showDetail(detail.dataset.detail, detail);
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
        `${film.title} · ${wasSaved ? "찜 목록에서 뺐어요." : state.storageAvailable ? "이 브라우저에 저장했어요." : "잠시 담았어요. 새로고침하면 사라져요."}`,
      );
    }
    const close = event.target.closest("[data-close]");
    if (close) $(close.dataset.close).close();
  });
  $("aboutButton").addEventListener("click", (e) =>
    openDialog($("aboutDialog"), e.currentTarget, $("aboutTitle")),
  );
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
          'button:not([disabled]),a[href],input,select,[tabindex="0"]',
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
      document.body.classList.remove("dialog-open");
      clearTimeout(toastTimer);
      $("toast").classList.remove("visible");
      document.body.append($("toast"));
      const currentReplacement =
        activeDetailId &&
        document.querySelector(`.film-grid [data-detail="${activeDetailId}"]`);
      const target =
        activeTrigger?.isConnected && activeTrigger.getClientRects().length
          ? activeTrigger
          : currentReplacement || $("catalogTitle");
      target.focus({ preventScroll: true });
      activeTrigger = null;
      activeDetailId = null;
    });
  });
  window.addEventListener("storage", (e) => {
    try {
      if (e.storageArea !== localStorage) return;
    } catch {
      return;
    }
    if (e.key !== storageKey && e.key !== null) return;
    state.saved = readSaved(e.newValue);
    render({ preserveFocus: true });
  });
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault();
    $("main-content").focus();
    $("main-content").scrollIntoView({ block: "start" });
  });
  route();
})();
