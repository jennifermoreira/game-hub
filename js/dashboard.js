(function () {
  const grid = document.getElementById("grid");
  const pickBtn = document.getElementById("pick-btn");
  const pickResult = document.getElementById("pick-result");
  const filterBtns = document.querySelectorAll("[data-filter]");
  let filter = "all";

  function visibleGames() {
    return GAMES.filter(function (g) {
      return filter === "all" || g.players === filter || g.players === "both";
    });
  }

  function render() {
    grid.innerHTML = "";
    visibleGames().forEach(function (g) {
      const a = document.createElement("a");
      a.className = "game-card";
      a.href = g.path;
      a.id = "card-" + g.id;

      const icon = document.createElement("div");
      icon.className = "icon";
      icon.textContent = g.icon;
      const h = document.createElement("h2");
      h.textContent = g.title;
      const p = document.createElement("p");
      p.textContent = g.description;
      const meta = document.createElement("div");
      meta.className = "meta";
      [g.playersLabel, g.time].forEach(function (t) {
        const s = document.createElement("span");
        s.textContent = t;
        meta.appendChild(s);
      });

      a.append(icon, h, p, meta);
      grid.appendChild(a);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.dataset.filter;
      filterBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
      pickResult.textContent = "";
      render();
    });
  });

  pickBtn.addEventListener("click", function () {
    const list = visibleGames();
    if (!list.length) return;
    pickBtn.disabled = true;
    let ticks = 0;
    const total = 14;
    const timer = setInterval(function () {
      document.querySelectorAll(".game-card").forEach(function (c) { c.classList.remove("picked"); });
      const g = list[Math.floor(Math.random() * list.length)];
      document.getElementById("card-" + g.id).classList.add("picked");
      ticks++;
      if (ticks >= total) {
        clearInterval(timer);
        pickResult.textContent = "Tonight we play: " + g.icon + " " + g.title + "!";
        pickBtn.disabled = false;
      }
    }, 120);
  });

  render();
})();
// Admin access: Ctrl+Shift+Z (desktop) or tap the 🎮 icon (mobile) opens a passcode prompt.
(function () {
  const modal = document.getElementById("admin-modal");
  const pass = document.getElementById("admin-pass");
  const msg = document.getElementById("admin-msg");

  function openModal() {
    msg.textContent = "";
    pass.value = "";
    modal.classList.remove("hidden");
    pass.focus();
  }
  function closeModal() { modal.classList.add("hidden"); }

  function submit() {
    if (pass.value === ADMIN_PASSCODE) {
      try { sessionStorage.setItem(ADMIN_SESSION_KEY, "1"); } catch (e) { /* storage unavailable */ }
      window.location.href = ADMIN_PAGE;
    } else {
      msg.textContent = "Wrong passcode.";
      pass.value = "";
    }
  }

  document.getElementById("admin-trigger").addEventListener("click", openModal);
  document.getElementById("admin-go").addEventListener("click", submit);
  document.getElementById("admin-cancel").addEventListener("click", closeModal);
  pass.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z") { e.preventDefault(); openModal(); }
    else if (e.key === "Escape") closeModal();
  });
})();

