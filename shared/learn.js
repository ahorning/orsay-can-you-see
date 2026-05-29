/*
 * "Learn before we go" engine — two modes from one window.ARTISTS dataset:
 *   📚 Study  — a gallery grouped by artist; tap a painting to reveal a fact.
 *   ❓ Guess  — guess-the-artist quiz: see a painting, pick who painted it.
 *
 * Reuses shared/common.js (window.CYS), which must load first.
 */
(function () {
  "use strict";

  var CYS = window.CYS;
  var el = CYS.el;
  var data = window.ARTISTS;
  if (!data) {
    document.body.innerHTML = "<p style='padding:20px'>No artist data found.</p>";
    return;
  }
  document.title = data.title;

  // Flatten every work with a back-reference to its artist (for the quiz).
  var allWorks = [];
  data.artists.forEach(function (a) {
    a.works.forEach(function (w) { allWorks.push({ work: w, artist: a }); });
  });

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // --- Header + mode toggle ------------------------------------------------
  var header = el("header", { class: "hunt-header learn-header" }, [
    el("h1", {}, [data.title]),
    el("p", {}, [data.subtitle || ""]),
    el("p", { class: "learn-stats" }, [
      data.artists.length + " artists · " + allWorks.length + " masterpieces",
    ]),
  ]);
  var btnStudy = el("button", { class: "mode-btn", type: "button" }, ["📚 Study"]);
  var btnQuiz = el("button", { class: "mode-btn", type: "button" }, ["❓ Guess the Artist"]);
  header.appendChild(el("div", { class: "mode-toggle" }, [btnStudy, btnQuiz]));

  var main = el("main", { class: "learn-main" });
  document.body.appendChild(header);
  document.body.appendChild(main);
  if (CYS.NARRATION) document.body.classList.add("narration");

  function setMode(mode) {
    btnStudy.classList.toggle("active", mode === "study");
    btnQuiz.classList.toggle("active", mode === "quiz");
    main.innerHTML = "";
    if (mode === "study") renderGallery();
    else renderQuiz();
  }
  btnStudy.addEventListener("click", function () { setMode("study"); });
  btnQuiz.addEventListener("click", function () { setMode("quiz"); });

  // --- Study gallery -------------------------------------------------------
  function renderGallery() {
    data.artists.forEach(function (a) {
      var section = el("section", { class: "artist-section" });
      section.style.setProperty("--artist", a.color || "#457b9d");

      section.appendChild(
        el("div", { class: "artist-head" }, [
          el("span", { class: "face" }, [a.face || "🎨"]),
          el("div", { class: "artist-meta" }, [
            el("h2", {}, [a.name]),
            el("p", {}, [a.fact || ""]),
          ]),
          el("span", { class: "work-count" }, [String(a.works.length)]),
        ])
      );

      var grid = el("div", { class: "gallery-grid" });
      a.works.forEach(function (w) {
        var card = el("div", { class: "card study-card" });
        card.appendChild(CYS.artTile(w));
        card.appendChild(
          el("div", { class: "body" }, [
            el("h3", { class: "work-title" }, [w.title]),
            el("p", { class: "fact" }, [w.fact || ""]),
          ])
        );
        grid.appendChild(card);
      });
      section.appendChild(grid);
      main.appendChild(section);
    });
  }

  // --- Guess-the-artist quiz ----------------------------------------------
  var deck, qIndex, score;

  function renderQuiz() {
    deck = shuffle(allWorks);
    qIndex = 0;
    score = 0;
    renderQuestion();
  }

  function choicesFor(correctArtist) {
    var others = shuffle(
      data.artists.filter(function (a) { return a.id !== correctArtist.id; })
    ).slice(0, 2);
    return shuffle([correctArtist].concat(others));
  }

  function renderQuestion() {
    main.innerHTML = "";
    if (qIndex >= deck.length) return renderEnd();

    var entry = deck[qIndex];
    var wrap = el("div", { class: "quiz" });

    wrap.appendChild(
      el("div", { class: "quiz-progress" }, [
        "Painting " + (qIndex + 1) + " of " + deck.length + "   ⭐ " + score,
      ])
    );

    var art = CYS.artTile(entry.work);
    art.classList.add("quiz-art");
    wrap.appendChild(art);
    wrap.appendChild(el("p", { class: "quiz-prompt" }, ["Who painted this? 🤔"]));

    var choiceBox = el("div", { class: "choices" });
    var answered = false;
    var feedback = el("p", { class: "quiz-feedback" });
    var nextBtn = el("button", { class: "next-btn", type: "button" }, ["Next ▶"]);
    nextBtn.style.display = "none";
    nextBtn.addEventListener("click", function () { qIndex++; renderQuestion(); });

    choicesFor(entry.artist).forEach(function (artist) {
      var btn = el("button", { class: "choice", type: "button" }, [
        el("span", { class: "face" }, [artist.face || "🎨"]),
        el("span", {}, [artist.name]),
      ]);
      btn.addEventListener("click", function () {
        if (answered) return;
        if (artist.id === entry.artist.id) {
          answered = true;
          btn.classList.add("correct");
          score++;
          var r = btn.getBoundingClientRect();
          CYS.confetti(18, r.left + r.width / 2, r.top);
          feedback.textContent = "Yes! " + entry.work.title + " by " + entry.artist.name + ".";
          feedback.appendChild(el("br"));
          feedback.appendChild(document.createTextNode("💡 " + (entry.work.fact || "")));
          choiceBox.querySelectorAll(".choice").forEach(function (b) { b.disabled = true; });
          nextBtn.textContent = qIndex + 1 >= deck.length ? "See results 🎉" : "Next ▶";
          nextBtn.style.display = "inline-block";
        } else {
          btn.classList.add("wrong");
          btn.disabled = true; // let her try the others
        }
      });
      choiceBox.appendChild(btn);
    });

    wrap.appendChild(choiceBox);
    wrap.appendChild(feedback);
    wrap.appendChild(nextBtn);
    main.appendChild(wrap);
  }

  function renderEnd() {
    var wrap = el("div", { class: "quiz quiz-end" });
    wrap.appendChild(el("div", { class: "big-emoji" }, ["🎉"]));
    wrap.appendChild(el("h2", {}, ["You guessed " + score + " out of " + deck.length + "!"]));
    wrap.appendChild(el("p", {}, ["You're becoming a real art expert."]));
    var again = el("button", { class: "next-btn", type: "button" }, ["Play again 🔄"]);
    again.addEventListener("click", renderQuiz);
    wrap.appendChild(again);
    main.appendChild(wrap);
    CYS.confetti(50);
  }

  setMode("study");
})();
