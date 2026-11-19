(function () {
  const $ = function (id) { return document.getElementById(id); };
  const SYMBOLS = ["🍎", "🐶", "🚀", "🎸", "🌈", "⚽", "🍕", "🐱"];
  const KEY = "gamehub.memory.best";

  let first = null;
  let lock = false;
  let moves = 0;
  let matched = 0;
  let seconds = 0;
  let timerId = null;

  function best() {
    try { return parseInt(localStorage.getItem(KEY), 10) || null; } catch (e) { return null; }
  }
  function showBest() {
    const b = best();
    $("best").textContent = b ? b + " moves" : "—";
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function stopTimer() { clearInterval(timerId); timerId = null; }

  function startTimer() {
    if (timerId) return;
    timerId = setInterval(function () { seconds++; $("time").textContent = seconds; }, 1000);
  }

  function flip(tile) {
    if (lock || tile.classList.contains("flipped") || tile.classList.contains("matched")) return;
    startTimer();
    tile.classList.add("flipped");
    tile.textContent = tile.dataset.sym;
    if (!first) { first = tile; return; }

    moves++;
    $("moves").textContent = moves;
    if (first.dataset.sym === tile.dataset.sym) {
      first.classList.replace("flipped", "matched");
      tile.classList.replace("flipped", "matched");
      first = null;
      matched++;
      if (matched === SYMBOLS.length) win();
    } else {
      lock = true;
      const a = first;
      first = null;
      setTimeout(function () {
        a.classList.remove("flipped"); a.textContent = "";
        tile.classList.remove("flipped"); tile.textContent = "";
        lock = false;
      }, 800);
    }
  }

  function win() {
    stopTimer();
    const b = best();
    let text = "You won in " + moves + " moves and " + seconds + "s!";
    if (!b || moves < b) {
      try { localStorage.setItem(KEY, moves); } catch (e) { /* storage unavailable */ }
      text += " New best!";
      showBest();
    }
    $("msg").textContent = text;
  }

  function newGame() {
    stopTimer();
    first = null; lock = false; moves = 0; matched = 0; seconds = 0;
    $("moves").textContent = 0;
    $("time").textContent = 0;
    $("msg").textContent = "";
    const board = $("board");
    board.innerHTML = "";
    shuffle(SYMBOLS.concat(SYMBOLS)).forEach(function (sym) {
      const t = document.createElement("button");
      t.className = "tile";
      t.dataset.sym = sym;
      t.setAttribute("aria-label", "Card");
      t.addEventListener("click", function () { flip(t); });
      board.appendChild(t);
    });
    showBest();
  }

  $("restart").addEventListener("click", newGame);
  newGame();
})();
