(function () {
  const $ = function (id) { return document.getElementById(id); };

  let custom = loadList(STORAGE_KEY);
  let drawn = loadList(DRAWN_KEY); // "Type|text" keys already drawn
  let spinning = false;

  function loadList(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }

  function saveDrawn() {
    try { localStorage.setItem(DRAWN_KEY, JSON.stringify(drawn)); } catch (e) { /* storage unavailable */ }
  }

  function keyOf(item) { return item.type + "|" + item.text; }

  function allItems() {
    let list = [];
    Object.keys(ITEMS).forEach(function (type) {
      ITEMS[type].forEach(function (text) { list.push({ type: type, text: text }); });
    });
    custom.forEach(function (c) { list.push({ type: c.type, text: c.text }); });
    return list;
  }

  function pool() {
    return allItems().filter(function (item) { return drawn.indexOf(keyOf(item)) === -1; });
  }

  function show(item) {
    $("challenge-text").textContent = (item.type === "Gift" ? "🎁 " : "🎯 ") + item.text;
  }

  function updateCount() {
    const n = pool().length;
    $("count-line").textContent = n + " left in the roulette";
    $("reset-btn").classList.toggle("hidden", !drawn.length);
    if (!n) $("spin-btn").disabled = true;
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
      show(list[Math.floor(Math.random() * list.length)]);
      ticks++;
      if (ticks >= 12) {
        clearInterval(timer);
        const pick = list[Math.floor(Math.random() * list.length)];
        drawn.push(keyOf(pick));
        saveDrawn();
        show(pick);
        box.classList.remove("spinning");
        box.classList.add("done");
        $("spin-btn").disabled = false;
        $("spin-btn").textContent = "🎰 Spin again";
        spinning = false;
        updateCount();
      }
    }, 90);
  }

  $("spin-btn").addEventListener("click", spin);
  $("reset-btn").addEventListener("click", function () {
    if (spinning) return;
    drawn = [];
    saveDrawn();
    $("spin-btn").disabled = false;
    $("spin-btn").textContent = "🎰 Spin";
    $("challenge-box").classList.remove("done");
    $("challenge-text").textContent = "Spin the roulette to get a gift or challenge!";
    updateCount();
  });
  updateCount();
  if (!pool().length) $("challenge-text").textContent = "All gifts and challenges have been drawn!";
})();
