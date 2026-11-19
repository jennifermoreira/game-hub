(function () {
  const $ = function (id) { return document.getElementById(id); };
  let custom = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(custom)); } catch (e) { /* storage unavailable */ }
  }

  function setUnlocked(on) {
    $("login").classList.toggle("hidden", on);
    $("panel").classList.toggle("hidden", !on);
    try {
      if (on) sessionStorage.setItem(ADMIN_SESSION_KEY, "1"); else sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) { /* storage unavailable */ }
  }

  function login() {
    if ($("passcode").value === ADMIN_PASSCODE) {
      $("login-msg").textContent = "";
      $("passcode").value = "";
      setUnlocked(true);
    } else {
      $("login-msg").textContent = "Wrong passcode.";
    }
  }

  function renderCustom() {
    const ul = $("custom-list");
    ul.innerHTML = "";
    custom.forEach(function (c, i) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = c.type;
      span.append(tag, document.createTextNode(c.text));
      const del = document.createElement("button");
      del.textContent = "✕";
      del.setAttribute("aria-label", "Remove item");
      del.addEventListener("click", function () {
        custom.splice(i, 1);
        save();
        renderCustom();
      });
      li.append(span, del);
      ul.appendChild(li);
    });
    $("reset-btn").classList.toggle("hidden", !custom.length);
  }

  function addChallenge() {
    const input = $("new-challenge");
    const text = input.value.trim();
    if (!text) return;
    custom.push({ text: text, type: $("new-level").value });
    save();
    input.value = "";
    renderCustom();
  }

  $("login-btn").addEventListener("click", login);
  $("passcode").addEventListener("keydown", function (e) { if (e.key === "Enter") login(); });
  $("logout-btn").addEventListener("click", function () { setUnlocked(false); });
  $("add-btn").addEventListener("click", addChallenge);
  $("new-challenge").addEventListener("keydown", function (e) { if (e.key === "Enter") addChallenge(); });
  $("reset-btn").addEventListener("click", function () {
    custom = [];
    save();
    renderCustom();
  });

  try { if (sessionStorage.getItem(ADMIN_SESSION_KEY)) setUnlocked(true); } catch (e) { /* storage unavailable */ }
  renderCustom();
})();
