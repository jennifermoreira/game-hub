(function () {
  const $ = function (id) { return document.getElementById(id); };
  const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  let cells = Array(9).fill("");
  let turn = "X";
  let over = false;
  let cpu = false;
  const score = { X: 0, O: 0, D: 0 };

  function winner(b) {
    for (const l of LINES) {
      if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return { p: b[l[0]], line: l };
    }
    return null;
  }

  // Minimax: computer plays O and never loses.
  function minimax(b, player) {
    const w = winner(b);
    if (w) return w.p === "O" ? 1 : -1;
    if (b.every(Boolean)) return 0;
    let best = player === "O" ? -2 : 2;
    for (let i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = player;
      const s = minimax(b, player === "O" ? "X" : "O");
      b[i] = "";
      best = player === "O" ? Math.max(best, s) : Math.min(best, s);
    }
    return best;
  }

  function cpuMove() {
    // Add some variety: 25% of the time pick a random move so it is beatable.
    const free = [];
    cells.forEach(function (v, i) { if (!v) free.push(i); });
    if (Math.random() < 0.25) return free[Math.floor(Math.random() * free.length)];
    let bestScore = -2, move = free[0];
    free.forEach(function (i) {
      cells[i] = "O";
      const s = minimax(cells, "X");
      cells[i] = "";
      if (s > bestScore) { bestScore = s; move = i; }
    });
    return move;
  }

  function render() {
    const btns = $("board").children;
    cells.forEach(function (v, i) {
      btns[i].textContent = v;
      btns[i].className = "cell" + (v ? " " + v.toLowerCase() : "");
      btns[i].disabled = over || !!v;
    });
  }

  function finish() {
    const w = winner(cells);
    if (w) {
      over = true;
      score[w.p]++;
      render();
      w.line.forEach(function (i) { $("board").children[i].classList.add("win"); });
      $("status").textContent = w.p + " wins!";
    } else if (cells.every(Boolean)) {
      over = true;
      score.D++;
      $("status").textContent = "It's a draw!";
      render();
    } else {
      return false;
    }
    $("sx").textContent = score.X;
    $("so").textContent = score.O;
    $("sd").textContent = score.D;
    return true;
  }

  function play(i) {
    if (over || cells[i]) return;
    cells[i] = turn;
    render();
    if (finish()) return;
    turn = turn === "X" ? "O" : "X";
    $("status").textContent = turn + "'s turn";
    if (cpu && turn === "O") {
      over = true; // block input during the computer's "thinking"
      render();
      setTimeout(function () {
        over = false;
        cells[cpuMove()] = "O";
        render();
        if (finish()) return;
        turn = "X";
        $("status").textContent = "Your turn (X)";
      }, 400);
    }
  }

  function newRound() {
    cells = Array(9).fill("");
    turn = "X";
    over = false;
    $("status").textContent = cpu ? "Your turn (X)" : "X's turn";
    render();
  }

  function setMode(isCpu) {
    cpu = isCpu;
    $("mode-cpu").classList.toggle("active", isCpu);
    $("mode-2p").classList.toggle("active", !isCpu);
    score.X = score.O = score.D = 0;
    $("sx").textContent = $("so").textContent = $("sd").textContent = 0;
    newRound();
  }

  for (let i = 0; i < 9; i++) {
    const b = document.createElement("button");
    b.addEventListener("click", function () { play(i); });
    b.setAttribute("aria-label", "Cell " + (i + 1));
    $("board").appendChild(b);
  }
  $("mode-2p").addEventListener("click", function () { setMode(false); });
  $("mode-cpu").addEventListener("click", function () { setMode(true); });
  $("restart").addEventListener("click", newRound);
  newRound();
})();
