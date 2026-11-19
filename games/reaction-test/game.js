(function () {
  const $ = function (id) { return document.getElementById(id); };
  const KEY = "gamehub.reaction.best";

  let state = "idle"; // idle | wait | go | early
  let timeoutId = null;
  let startTime = 0;
  let times = [];

  function best() {
    try { return parseInt(localStorage.getItem(KEY), 10) || null; } catch (e) { return null; }
  }

  function setPad(cls, text) {
    $("pad").className = "pad " + cls;
    $("pad-text").textContent = text;
    state = cls;
  }

  function stats() {
    const b = best();
    $("best").textContent = b ? b + " ms" : "—";
    if (times.length) {
      const avg = Math.round(times.reduce(function (a, c) { return a + c; }, 0) / times.length);
      $("avg").textContent = avg + " ms";
    } else {
      $("avg").textContent = "—";
      $("last").textContent = "—";
    }
  }

  function begin() {
    setPad("wait", "Wait for green…");
    timeoutId = setTimeout(function () {
      startTime = performance.now();
      setPad("go", "CLICK NOW!");
    }, 1500 + Math.random() * 3000);
  }

  $("pad").addEventListener("click", function () {
    if (state === "idle" || state === "early") {
      begin();
    } else if (state === "wait") {
      clearTimeout(timeoutId);
      setPad("early", "Too soon! Click to try again.");
    } else if (state === "go") {
      const ms = Math.round(performance.now() - startTime);
      times.push(ms);
      $("last").textContent = ms + " ms";
      const b = best();
      if (!b || ms < b) {
        try { localStorage.setItem(KEY, ms); } catch (e) { /* storage unavailable */ }
      }
      stats();
      setPad("idle", ms + " ms. Click to go again.");
    }
  });

  $("reset").addEventListener("click", function () {
    clearTimeout(timeoutId);
    times = [];
    try { localStorage.removeItem(KEY); } catch (e) { /* storage unavailable */ }
    stats();
    setPad("idle", "Click to start");
  });

  stats();
})();
