/*
 * Scavenger-hunt engine — museum-agnostic.
 *
 * Give it a `window.HUNT` object (see museums/orsay/data.js) and it renders a
 * grid of big tappable cards, tracks "found" items in localStorage, celebrates
 * with confetti, and shows a progress bar.
 *
 * Reuses helpers from shared/common.js (window.CYS), which must load first.
 */
(function () {
  "use strict";

  var CYS = window.CYS;
  var el = CYS.el;
  var data = window.HUNT;
  if (!data) {
    document.body.innerHTML = "<p style='padding:20px'>No hunt data found.</p>";
    return;
  }

  var STORAGE_KEY = "hunt:" + (data.id || data.title || "default");
  var found = CYS.store.get(STORAGE_KEY);

  document.title = data.title;

  // --- Header + progress ---------------------------------------------------
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

  // --- Cards ---------------------------------------------------------------
  var grid = el("main", { class: "hunt-grid" });

  data.items.forEach(function (item) {
    var card = el("div", { class: "card", "data-id": item.id });

    var art = CYS.artTile(item);
    art.appendChild(el("div", { class: "stamp" }, ["✅"]));
    card.appendChild(art);

    var body = el("div", { class: "body" });
    body.appendChild(el("h2", {}, [item.title]));
    body.appendChild(el("p", { class: "find" }, [item.find]));
    if (item.where) body.appendChild(el("p", { class: "where" }, [item.where]));
    body.appendChild(el("p", { class: "fact" }, [item.fact || ""]));

    var factBtn = el("button", { class: "fact-btn", type: "button" }, ["💡 Fun fact"]);
    factBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      card.classList.toggle("show-fact");
    });
    body.appendChild(factBtn);

    var speakBtn = el("button", { class: "speak-btn", type: "button" }, ["🔊 Hear it"]);
    speakBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      CYS.speak(item.title + ". " + item.find + " " + (item.fact || ""), CYS.NARRATION);
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
        var r = card.getBoundingClientRect();
        CYS.confetti(16, r.left + r.width / 2, r.top + r.height / 2);
      } else {
        delete found[item.id];
      }
      CYS.store.set(STORAGE_KEY, found);
      updateProgress();
    });

    grid.appendChild(card);
  });

  // --- Footer (win message + reset) ---------------------------------------
  var winLabel = el("span", { class: "win" });
  var resetBtn = el("button", { class: "reset-btn", type: "button" }, ["🔄 Start over"]);
  resetBtn.addEventListener("click", function () {
    found = {};
    CYS.store.set(STORAGE_KEY, found);
    document.querySelectorAll(".card.found").forEach(function (c) {
      c.classList.remove("found");
    });
    updateProgress();
  });
  var footer = el("div", { class: "footer-bar" }, [winLabel, resetBtn]);

  document.body.appendChild(header);
  document.body.appendChild(grid);
  document.body.appendChild(footer);
  if (CYS.NARRATION) document.body.classList.add("narration");

  function updateProgress() {
    var total = data.items.length;
    var n = data.items.filter(function (i) { return found[i.id]; }).length;
    progressBar.style.width = Math.round((n / total) * 100) + "%";
    countLabel.textContent = "⭐ " + n + " / " + total;
    winLabel.textContent =
      n === total ? "🎉 You found them all! Great job, art detective!" : "";
    if (n === total && total > 0) CYS.confetti(40);
  }

  updateProgress();
})();
