# Plan: "Orsay, Can You See?" — a toddler art scavenger hunt

## Context

We're taking a precocious 4-year-old to Paris and want fun, age-appropriate ways
for her to engage with the city's art. The repo `orsay-can-you-see` is a blank
slate (just a README line: "A toddler scavenger hunt through Paris"). The repo
name is a pun — **"Orsay, can you see…?"** — which is the perfect frame for an
*I-spy / scavenger hunt* through the Musée d'Orsay.

This first deliverable is a small web app the parent loads on a phone. Standing in
front of (or hunting for) famous artworks, the child taps a card when she spots
the painting/detail on the wall and gets a little celebration. The Musée d'Orsay
already runs its own kids' "find the masterpieces" game (petitsmo.fr) and a clue
booklet, so the concept is proven for that space — we're making a personal,
offline, toddler-tuned version.

### Decisions locked with the user
- **Fully offline** — must work in airplane mode inside the museum (spotty wifi/cell).
- **Real painting photos** — public-domain images so she can match screen → wall.
- **Text clues now**, but the data model + UI leave a clean seam to add
  **tap-to-hear narration** later (Web Speech API). *(Saved idea — not built yet.)*
- **Orsay-only for v1**, but files organized so other museums / Paris activities
  can be added later without restructuring.

## Approach

A dependency-free static site. Clean, editable source during development; a tiny
build step inlines images into **one self-contained `orsay.html`** that's trivial
to drop on a phone and open offline.

### Proposed file structure
```
orsay-can-you-see/
├── README.md                     # rewritten (see below)
├── index.html                    # landing page → links to each activity (expandable)
├── shared/
│   ├── styles.css                # shared kid-friendly styling (big cards, bright)
│   └── hunt.js                   # generic scavenger-hunt engine (render, tap, progress, celebrate)
├── museums/
│   └── orsay/
│       ├── orsay.html            # the Orsay hunt page (loads shared css/js + data)
│       ├── data.js               # array of hunt items (the only file to edit to tweak content)
│       └── images/               # local public-domain painting photos
│           ├── clock.jpg
│           ├── little-dancer.jpg
│           └── ...
├── build/
│   └── inline.py                 # stdlib-only: inline images+css+js → dist/orsay.html
└── dist/
    └── orsay.html                # generated single-file offline build (committed for easy phone use)
```

Rationale: keeping items in `data.js` and images as real files makes content easy
to edit; the `inline.py` build produces the bulletproof single offline file. The
`shared/hunt.js` engine is museum-agnostic so a future `museums/louvre/` reuses it.

### The scavenger-hunt engine (`shared/hunt.js`)
A small vanilla-JS module that, given a `HUNT_ITEMS` array, renders a grid of big
tappable cards and handles:
- **Tap to "find it"** → card flips/marks with a ✓ + ⭐, fun confetti/sticker pop.
- **Progress** — "You found 5 of 12!" with a big progress bar of stars.
- **Persistence** — `localStorage` so progress survives if the phone sleeps.
- **A reset button** (parent-tappable) to replay.
- **Narration seam**: each card renders a (currently hidden/optional) 🔊 button
  wired to a `speak(text)` stub — flip one flag later to enable Web Speech API.

### Hunt content (`museums/orsay/data.js`)
~10–12 easy-to-spot, toddler-delightful items. Each item: `image`, `title` (kid
words), `find` (the "can you see…?" spotting challenge), `where` (gentle location
hint, e.g. "upstairs under the big glass roof"), `fact` (one short artist line).

Curated starter set (all in Orsay's collection, public-domain images on Wikimedia):
1. **The giant golden clock** — the old train-station clock. "Can you see the GIANT clock?"
2. **The Little Ballerina** — Degas, *Little Dancer Aged Fourteen* (real tutu!). "Find the little dancer statue."
3. **Dancers in fluffy skirts** — Degas, *The Ballet Class*. "How many ballerinas can you count?"
4. **A field of red flowers** — Monet, *Poppies / Coquelicots*. "Find the lady with the umbrella and the little boy."
5. **A pond full of flowers** — Monet, *Blue Water Lilies*.
6. **Stars over the river** — Van Gogh, *Starry Night Over the Rhône*. "Find the twinkly stars on the water."
7. **The man with the orange beard** — Van Gogh, *Self-Portrait* (swirly blue).
8. **A cozy little bedroom** — Van Gogh, *Bedroom in Arles*. "Count the pictures on the wall."
9. **People dancing outside** — Renoir, *Bal du moulin de la Galette*.
10. **A jungle at night** — Rousseau, *The Snake Charmer*. "Can you spot the snake?"
11. **Find the orange dog** — Gauguin, *Arearea*.
12. **Men playing a game** — Cézanne, *The Card Players*.

(Final list trimmed/ordered for a real-world walking route — Impressionists cluster
on Level 5; the clock and big sculptures lower down — but room numbers kept vague
since the museum rehangs.)

### README.md (rewritten)
Short and friendly:
- What it is: an offline art scavenger hunt for a young child at the Musée d'Orsay.
- The pun / title.
- **How to use on your phone**: open `dist/orsay.html` (or save it to the phone's
  Files and open in a browser) — works fully offline, no signal needed.
- How to edit content (`museums/orsay/data.js`) and rebuild (`python3 build/inline.py`).
- Roadmap: tap-to-hear narration, more museums, city-wide Paris activities.

## Risks / open items
- **Image sourcing needs network at build time.** Implementation will fetch
  public-domain images from Wikimedia Commons. If the environment's network policy
  blocks this, fallback: leave clearly-named empty `images/` slots + a manifest of
  the exact Wikimedia URLs so they can be dropped in later, and the app degrades
  gracefully (colored placeholder + title still works as a hunt).
- All chosen works are old enough to be public domain; will confirm license per
  image and note attribution in a `museums/orsay/images/SOURCES.md`.

## Verification
1. `python3 build/inline.py` → produces `dist/orsay.html` with no missing-asset errors.
2. Open `dist/orsay.html` in a browser; load it, then **kill the network** (DevTools
   offline) and reload — confirm all images and styling still render (truly offline).
3. Tap several cards → checkmark/star/confetti fire; progress counter updates;
   reload page → progress persists; reset button clears it.
4. Mobile check: narrow the viewport (or device emulation) to phone width — cards
   are large, tappable, and readable; no horizontal scroll.
5. Sanity-check each item's image actually matches the named artwork.
