(function () {
  const $ = function (id) { return document.getElementById(id); };
  const LEVELS = ["All", "Mild", "Medium", "Wild"];

  let level = "All";
  let custom = load();
  let last = null;
  let spinning = false;

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
  }

  function pool() {
    let list = [];
    Object.keys(CHALLENGES).forEach(function (l) {
      if (level === "All" || level === l) list = list.concat(CHALLENGES[l]);
    });
    custom.forEach(function (c) {
      if (level === "All" || level === c.level) list.push(c.text);
    });
    return list;
  }

  function updateCount() {
    $("count-line").textContent = pool().length + " challenges in this pool";
  }

  function renderLevels() {
    const c = $("levels");
    c.innerHTML = "";
    LEVELS.forEach(function (l) {
      const b = document.createElement("button");
      b.className = "chip" + (l === level ? " active" : "");
      b.textContent = l;
      b.addEventListener("click", function () {
        level = l;
        renderLevels();
        updateCount();
      });
      c.appendChild(b);
    });
  }

  function spin() {
    if (spinning) return;
    const list = pool();
    if (!list.length) return;
    spinning = true;
    $("spin-btn").disabled = true;
    const box = $("challenge-box");
    box.classList.remove("done");
    box.classList.add("spinning");
    let ticks = 0;
    const timer = setInterval(function () {
      $("challenge-text").textContent = list[Math.floor(Math.random() * list.length)];
      ticks++;
      if (ticks >= 12) {
        clearInterval(timer);
        let pick;
        do { pick = list[Math.floor(Math.random() * list.length)]; }
        while (list.length > 1 && pick === last);
        last = pick;
        $("challenge-text").textContent = pick;
        box.classList.remove("spinning");
        box.classList.add("done");
        $("spin-btn").disabled = false;
        $("spin-btn").textContent = "🎰 Spin again";
        spinning = false;
      }
    }, 90);
  }

  $("spin-btn").addEventListener("click", spin);
  renderLevels();
  updateCount();
})();
