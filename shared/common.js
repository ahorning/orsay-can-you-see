/*
 * Shared helpers for the "Can You See?" activities (hunt + learn).
 * Exposes a tiny window.CYS namespace so each engine stays small.
 */
(function () {
  "use strict";

  // Create a DOM node: el("div", {class:"x", html:"<b>hi</b>"}, [child, "text"])
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

  // Resolve an artwork image: single-file builds inject window.ARTWORK_IMAGES
  // (id -> base64 data URI); otherwise load from the images/ folder.
  function imageSrc(id) {
    return (window.ARTWORK_IMAGES && window.ARTWORK_IMAGES[id]) ||
           "images/" + id + ".jpg";
  }

  // Build the square "art" tile for an item, with a graceful emoji fallback
  // when the real photo is missing. Returns the .art element.
  function artTile(item) {
    var art = el("div", { class: "art" });
    art.style.background = item.color || "#ccc";
    var img = el("img", {
      alt: item.title,
      src: imageSrc(item.id),
      loading: "lazy",
    });
    img.addEventListener("error", function () {
      img.remove();
      art.appendChild(el("div", { class: "placeholder-icon" }, [item.icon || "🖼️"]));
    });
    art.appendChild(img);
    return art;
  }

  // Text-to-speech seam — no-op unless `enabled` (kept off for now).
  function speak(text, enabled) {
    if (!enabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  var CONFETTI_COLORS = ["#e63946", "#457b9d", "#c9a227", "#2a9d8f", "#e76f51", "#f4a261"];
  function confetti(count, x, y) {
    for (var i = 0; i < count; i++) {
      var c = document.createElement("div");
      c.className = "confetti";
      c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      c.style.left = (x != null ? x : Math.random() * window.innerWidth) + "px";
      if (y != null) c.style.top = y + "px";
      c.style.animationDelay = Math.random() * 0.3 + "s";
      document.body.appendChild(c);
      (function (node) {
        setTimeout(function () { node.remove(); }, 2000);
      })(c);
    }
  }

  // localStorage that never throws (private mode / full storage).
  var store = {
    get: function (key) {
      try { return JSON.parse(localStorage.getItem(key)) || {}; }
      catch (e) { return {}; }
    },
    set: function (key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    },
  };

  window.CYS = {
    el: el,
    imageSrc: imageSrc,
    artTile: artTile,
    speak: speak,
    confetti: confetti,
    store: store,
    NARRATION: false, // flip to true later to enable tap-to-hear everywhere
  };
})();
