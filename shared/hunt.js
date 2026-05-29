/*
 * Generic scavenger-hunt engine — museum-agnostic.
 *
 * Give it a `window.HUNT` object (see museums/orsay/data.js) and it renders a
 * grid of big tappable cards, tracks "found" items in localStorage, celebrates
 * with confetti, and shows a progress bar.
 *
 * Reused across museums: a future museums/louvre/ page just loads this file
 * with its own data.js.
 */
(function () {
  "use strict";

  // --- Config (one place to flip future features) -------------------------
  var HUNT_CONFIG = {
    narration: false, // set true later to enable tap-to-hear (Web Speech API)
  };

  var data = window.HUNT;
  if (!data) {
    document.body.innerHTML = "<p style='padding:20px'>No hunt data found.</p>";
    return;
  }

  var STORAGE_KEY = "hunt:" + (data.id || data.title || "default");

  // --- Saved progress ------------------------------------------------------
  function loadFound() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveFound(found) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch (e) {
      /* private mode / storage full — game still works for the session */
    }
  }
  var found = loadFound();

  // --- Narration seam (no-op until enabled) --------------------------------
  function speak(text) {
    if (!HUNT_CONFIG.narration) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  // --- Build the DOM -------------------------------------------------------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  document.title = data.title;

  var header = el("header", { class: "hunt-header" }, [
    el("h1", {}, [data.title]),
    el("p", {}, [data.subtitle || ""]),
  ]);
  var progressBar = el("span");
  var countLabel = el("span", { class: "count" });
  header.appendChild(
    el("div", { class: "progress" }, [
      el("span", { class: "bar" }, [progressBar]),
      countLabel,
    ])
  );

  var grid = el("main", { class: "hunt-grid" });

  data.items.forEach(function (item) {
    var card = el("div", { class: "card", "data-id": item.id });

    // Art (real image if present, else coloured placeholder)
    var art = el("div", { class: "art" });
    art.style.background = item.color || "#ccc";
    // Single-file builds inject base64 data URIs into window.HUNT_IMAGES;
    // otherwise we load the photo from the images/ folder.
    var inlined = window.HUNT_IMAGES && window.HUNT_IMAGES[item.id];
    var img = el("img", {
      alt: item.title,
      src: inlined || "images/" + item.id + ".jpg",
      loading: "lazy",
    });
    // If the real photo is missing, fall back to the emoji placeholder.
    img.addEventListener("error", function () {
      img.remove();
      art.appendChild(el("div", { class: "placeholder-icon" }, [item.icon || "🖼️"]));
    });
    art.appendChild(img);
    art.appendChild(el("div", { class: "stamp" }, ["✅"]));
    card.appendChild(art);

    // Body
    var body = el("div", { class: "body" });
    body.appendChild(el("h2", {}, [item.title]));
    body.appendChild(el("p", { class: "find" }, [item.find]));
    if (item.where) body.appendChild(el("p", { class: "where" }, [item.where]));

    var fact = el("p", { class: "fact" }, [item.fact || ""]);
    body.appendChild(fact);

    var factBtn = el("button", { class: "fact-btn", type: "button" }, ["💡 Fun fact"]);
    factBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      card.classList.toggle("show-fact");
    });
    body.appendChild(factBtn);

    var speakBtn = el("button", { class: "speak-btn", type: "button" }, ["🔊 Hear it"]);
    speakBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      speak(item.title + ". " + item.find + " " + (item.fact || ""));
    });
    body.appendChild(speakBtn);

    card.appendChild(body);

    if (found[item.id]) card.classList.add("found");

    // Tap the card (anywhere except the buttons) to mark found / unfound.
    card.addEventListener("click", function () {
      var nowFound = !card.classList.contains("found");
      card.classList.toggle("found", nowFound);
      if (nowFound) {
        found[item.id] = true;
        celebrate(card);
      } else {
        delete found[item.id];
      }
      saveFound(found);
      updateProgress();
    });

    grid.appendChild(card);
  });

  // --- Footer (win message + reset) ---------------------------------------
  var winLabel = el("span", { class: "win" });
  var resetBtn = el("button", { class: "reset-btn", type: "button" }, ["🔄 Start over"]);
  resetBtn.addEventListener("click", function () {
    found = {};
    saveFound(found);
    document.querySelectorAll(".card.found").forEach(function (c) {
      c.classList.remove("found");
    });
    updateProgress();
  });
  var footer = el("div", { class: "footer-bar" }, [winLabel, resetBtn]);

  // --- Mount ---------------------------------------------------------------
  document.body.appendChild(header);
  document.body.appendChild(grid);
  document.body.appendChild(footer);
  if (HUNT_CONFIG.narration) document.body.classList.add("narration");

  // --- Progress + celebration ---------------------------------------------
  function updateProgress() {
    var total = data.items.length;
    var n = data.items.filter(function (i) { return found[i.id]; }).length;
    progressBar.style.width = Math.round((n / total) * 100) + "%";
    countLabel.textContent = "⭐ " + n + " / " + total;
    winLabel.textContent =
      n === total ? "🎉 You found them all! Great job, art detective!" : "";
    if (n === total && total > 0) burstConfetti(40);
  }

  function celebrate(card) {
    var rect = card.getBoundingClientRect();
    burstConfetti(16, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  var COLORS = ["#e63946", "#457b9d", "#c9a227", "#2a9d8f", "#e76f51", "#f4a261"];
  function burstConfetti(count, x, y) {
    for (var i = 0; i < count; i++) {
      var c = document.createElement("div");
      c.className = "confetti";
      c.style.background = COLORS[i % COLORS.length];
      c.style.left = (x != null ? x : Math.random() * window.innerWidth) + "px";
      if (y != null) c.style.top = y + "px";
      c.style.animationDelay = (Math.random() * 0.3) + "s";
      document.body.appendChild(c);
      (function (node) {
        setTimeout(function () { node.remove(); }, 2000);
      })(c);
    }
  }

  updateProgress();
})();
