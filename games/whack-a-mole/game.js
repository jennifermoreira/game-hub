(function () {
  const $ = function (id) { return document.getElementById(id); };
  const KEY = "gamehub.mole.high";
  const DURATION = 30;

  let holes = [];
  let score = 0;
  let timeLeft = DURATION;
  let running = false;
  let current = -1;
  let tickId = null;
  let moleId = null;

  function high() {
    try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { return 0; }
  }

  function hide() {
    if (current >= 0) {
      holes[current].classList.remove("up");
      holes[current].textContent = "";
      current = -1;
    }
  }

  function popUp() {
    if (!running) return;
    hide();
    let i;
    do { i = Math.floor(Math.random() * holes.length); } while (i === current);
    current = i;
    holes[i].classList.add("up");
    holes[i].textContent = "🐹";
    // Moles get faster as time runs out.
    const delay = 450 + (timeLeft / DURATION) * 550;
    moleId = setTimeout(popUp, delay);
  }

  function whack(i) {
    if (!running || i !== current) return;
    score++;
    $("score").textContent = score;
    hide();
  }

  function end() {
    running = false;
    clearInterval(tickId);
    clearTimeout(moleId);
    hide();
    let text = "Time's up! You whacked " + score + ".";
    if (score > high()) {
      try { localStorage.setItem(KEY, score); } catch (e) { /* storage unavailable */ }
      text += " New high score!";
      $("high").textContent = score;
    }
    $("msg").textContent = text;
    $("start").disabled = false;
    $("start").textContent = "Play again";
  }

  function start() {
    score = 0;
    timeLeft = DURATION;
    running = true;
    $("score").textContent = 0;
    $("time").textContent = timeLeft;
    $("msg").textContent = "";
    $("start").disabled = true;
    tickId = setInterval(function () {
      timeLeft--;
      $("time").textContent = timeLeft;
      if (timeLeft <= 0) end();
    }, 1000);
    popUp();
  }

  for (let i = 0; i < 9; i++) {
    const b = document.createElement("button");
    b.className = "hole";
    b.setAttribute("aria-label", "Hole " + (i + 1));
    b.addEventListener("click", function () { whack(i); });
    $("grid").appendChild(b);
    holes.push(b);
  }
  $("high").textContent = high();
  $("start").addEventListener("click", start);
})();
