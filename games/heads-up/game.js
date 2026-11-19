(function () {
  const $ = function (id) { return document.getElementById(id); };
  const screens = ["setup", "countdown", "play", "results"];
  const LENGTHS = [30, 60, 90];

  let category = "Animals";
  let difficulty = "Easy";
  let length = 60;
  let deck = [];
  let got = [];
  let passed = [];
  let timeLeft = 0;
  let timerId = null;
  let active = false;

  function show(name) {
    screens.forEach(function (s) { $(s).classList.toggle("hidden", s !== name); });
  }

  function makeChips(containerId, items, isActive, onPick) {
    const c = $(containerId);
    c.innerHTML = "";
    items.forEach(function (item) {
      const b = document.createElement("button");
      b.className = "chip" + (isActive(item) ? " active" : "");
      b.textContent = typeof item === "number" ? item + "s" : item;
      b.addEventListener("click", function () {
        onPick(item);
        Array.prototype.forEach.call(c.children, function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      });
      c.appendChild(b);
    });
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function buildDeck() {
    const levels = difficulty === "Mixed" ? ["Easy", "Medium", "Hard"] : [difficulty];
    let words = [];
    const cats = category === "All Categories" ? Object.keys(WORDS) : [category];
    cats.forEach(function (c) {
      levels.forEach(function (l) { words = words.concat(WORDS[c][l]); });
    });
    return shuffle(words);
  }

  function nextWord() {
    if (!deck.length) deck = buildDeck();
    $("word").textContent = deck.pop();
  }

  function flash(cls) {
    const card = $("word-card");
    card.classList.add(cls);
    setTimeout(function () { card.classList.remove(cls); }, 220);
  }

  function answer(correct) {
    if (!active) return;
    const w = $("word").textContent;
    (correct ? got : passed).push(w);
    $("hud-score").textContent = got.length + " ✔";
    flash(correct ? "flash-good" : "flash-bad");
    nextWord();
  }

  function fill(listId, items) {
    const ul = $(listId);
    ul.innerHTML = "";
    if (!items.length) items = ["—"];
    items.forEach(function (w) {
      const li = document.createElement("li");
      li.textContent = w;
      ul.appendChild(li);
    });
  }

  function endRound() {
    active = false;
    clearInterval(timerId);
    $("final-score").textContent = got.length + " correct";
    fill("got-list", got);
    fill("pass-list", passed);
    show("results");
  }

  function startPlay() {
    got = []; passed = [];
    deck = buildDeck();
    timeLeft = length;
    $("timer").textContent = timeLeft;
    $("timer").classList.remove("low");
    $("hud-score").textContent = "0 ✔";
    $("hud-cat").textContent = category + " · " + difficulty;
    nextWord();
    show("play");
    active = true;
    timerId = setInterval(function () {
      timeLeft--;
      $("timer").textContent = timeLeft;
      $("timer").classList.toggle("low", timeLeft <= 10);
      if (timeLeft <= 0) endRound();
    }, 1000);
  }

  function startCountdown() {
    let n = 3;
    $("count-num").textContent = n;
    show("countdown");
    const id = setInterval(function () {
      n--;
      if (n <= 0) { clearInterval(id); startPlay(); }
      else $("count-num").textContent = n;
    }, 1000);
  }

  makeChips("categories", Object.keys(WORDS).concat("All Categories"),
    function (c) { return c === category; }, function (c) { category = c; });
  makeChips("difficulties", DIFFICULTIES,
    function (d) { return d === difficulty; }, function (d) { difficulty = d; });
  makeChips("lengths", LENGTHS,
    function (l) { return l === length; }, function (l) { length = l; });

  $("start-btn").addEventListener("click", startCountdown);
  $("got-btn").addEventListener("click", function () { answer(true); });
  $("pass-btn").addEventListener("click", function () { answer(false); });
  $("again-btn").addEventListener("click", startCountdown);
  $("setup-btn").addEventListener("click", function () { show("setup"); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); answer(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); answer(false); }
  });
})();
