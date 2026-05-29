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

  var CONFETTI_COLORS = ["#e63946", "#457b9d", "#c9a227", "#2a9d8f",
                         "#e76f51", "#f4a261", "#ff7aa2", "#8ac926"];

  function confettiLayer() {
    var layer = document.getElementById("confetti-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "confetti-layer";
      document.body.appendChild(layer);
    }
    return layer;
  }

  // Pop pieces from a point (x, y) for a celebratory burst, or -- with no point
  // -- rain them down across the screen. Each piece flies on its own path.
  function confetti(count, x, y) {
    if (!document.createElement("div").animate) return; // no Web Animations API
    if (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var layer = confettiLayer();
    var burst = x != null && y != null;
    for (var i = 0; i < count; i++) confettiPiece(layer, burst, x, y);
  }

  function confettiPiece(layer, burst, ox, oy) {
    var c = document.createElement("div");
    c.className = "confetti";
    var w = 6 + Math.random() * 8;
    c.style.width = Math.round(w) + "px";
    c.style.height = Math.round(w * (0.4 + Math.random() * 0.8)) + "px";
    c.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    if (Math.random() < 0.4) c.style.borderRadius = "50%";
    layer.appendChild(c);

    var spin = Math.round((Math.random() * 6 - 3) * 360);
    var frames, opts;
    if (burst) {
      // launch up-and-out from the point, then fall with gravity
      var dx = Math.round((Math.random() - 0.5) * 2 * (70 + Math.random() * 170));
      var rise = Math.round(70 + Math.random() * 150);
      var drop = Math.round(window.innerHeight * (0.35 + Math.random() * 0.5));
      c.style.left = Math.round(ox) + "px";
      c.style.top = Math.round(oy) + "px";
      frames = [
        { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1, offset: 0 },
        { transform: "translate(calc(-50% + " + Math.round(dx * 0.5) + "px), calc(-50% - " + rise + "px)) rotate(" + Math.round(spin * 0.4) + "deg)", opacity: 1, offset: 0.4 },
        { transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + drop + "px)) rotate(" + spin + "deg)", opacity: 0, offset: 1 }
      ];
      opts = { duration: 1100 + Math.random() * 1000, easing: "cubic-bezier(.15,.6,.3,1)", delay: Math.random() * 90, fill: "forwards" };
    } else {
      // rain down from the top with a side-to-side sway
      var sway = Math.round((Math.random() - 0.5) * 140);
      var fall = window.innerHeight + 40;
      c.style.left = Math.round(Math.random() * window.innerWidth) + "px";
      c.style.top = "-20px";
      frames = [
        { transform: "translate(-50%, 0) rotate(0deg)", opacity: 1, offset: 0 },
        { transform: "translate(calc(-50% + " + sway + "px), " + Math.round(fall * 0.5) + "px) rotate(" + Math.round(spin * 0.5) + "deg)", opacity: 1, offset: 0.6 },
        { transform: "translate(calc(-50% + " + (-sway) + "px), " + fall + "px) rotate(" + spin + "deg)", opacity: 0.9, offset: 1 }
      ];
      opts = { duration: 1900 + Math.random() * 1500, easing: "ease-in", delay: Math.random() * 450, fill: "forwards" };
    }

    var anim = c.animate(frames, opts);
    var done = function () { c.remove(); };
    anim.onfinish = done;
    setTimeout(done, opts.duration + opts.delay + 400); // backstop cleanup
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
