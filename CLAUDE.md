# Project memory — orsay-can-you-see

## What this is
A tiny, dependency-free web app that turns a Musée d'Orsay visit into an *I-spy*
art scavenger hunt for a precocious 4-year-old. The repo name is a pun:
**"Orsay, can you see?"** Built for one specific kid (good at guessing artists,
great memory for paintings) ahead of a family trip to Paris.

## Locked product decisions
- **Fully offline.** Must work in airplane mode inside the museum (spotty wifi).
- **Real public-domain painting photos** so she can match the screen to the wall.
- **Text clues now**, with a clean seam for **tap-to-hear narration** later
  (Web Speech API — flip `CYS.NARRATION` in `shared/common.js`). *Not built yet.*
- **Orsay-only for v1**, files organized so other museums can be added later.
- Two delivery paths, both required:
  - **Option A — PWA** on GitHub Pages (installable, offline after first load).
  - **Option B — self-contained `dist/*.html`** files (images base64-inlined) to
    AirDrop/email to a phone; open in airplane mode.

## Activities
- **Learn Before We Go** (`museums/orsay/learn.html`) — study gallery grouped by
  artist + a guess-the-artist quiz, to play at home before the trip.
- **Orsay, Can You See?** (`museums/orsay/orsay.html`) — the in-museum hunt:
  tap a card when she spots the artwork → ✓ + star + confetti; progress bar;
  localStorage persistence; parent-tappable reset.
- **Have You Seine It?** (`cities/paris/paris.html`) — a city-wide Paris hunt
  (Eiffel Tower, a bateau on the Seine, a Wallace fountain, a baguette…). Same
  `shared/hunt.js` engine. Title is the Seine≈"seen" pun (parallel to
  Orsay≈"O say can you see"). Cards are **emoji by design**; a few "photo-
  friendly" ids (`metro-sign`, `wallace-fountain`, `sacre-coeur`, `bouquinistes`)
  show a photo if one is dropped at `cities/paris/images/<id>.jpg`.

## Architecture / where things live
- `index.html` — landing page (title: "Orsay, Can You See?" 🕰️).
- `shared/common.js` — `window.CYS` namespace: `el()`, `imageSrc()`, `artTile()`,
  `speak()`, `confetti()`, `store`, `NARRATION` flag. `imageSrc()` uses
  `window.ARTWORK_IMAGES` (base64 map injected by the build) and falls back to
  `images/<id>.jpg`, then to a coloured emoji placeholder.
- `shared/hunt.js` — scavenger-hunt engine (museum-agnostic).
- `shared/learn.js` — study gallery + quiz engine.
- `shared/styles.css` — all styling. Art-tile selectors are generalized to `.art`
  (NOT scoped to `.card`) so the quiz image scales too. Confetti uses a fixed,
  clipped `#confetti-layer`.
- `museums/orsay/data.js` — **the only file to edit for Orsay hunt content.**
  Each item: `id, title, find, where, fact, color, icon`.
- `cities/paris/data.js` — same shape; **the only file to edit for Paris hunt
  content.** `cities/paris/paris.html` is a thin page loading the shared engine
  (parallel to `museums/orsay/orsay.html`, just one dir shallower → `../../shared`).
- `museums/orsay/artists.js` — learn-page artists + works. Degas's work id is
  `racehorses` (not "blue-dancers").
- `museums/orsay/images/SOURCES.md` — artwork licensing + the Gauguin note.
- `museums/orsay/images/*.jpg` — **the painting photos are committed** (20 of
  them). The build inlines these; deploys need no network and always ship every
  picture. The clock stays emoji on purpose. `fetch-images.py` is now only for
  refreshing/adding photos locally (then commit them).
- `build/fetch-images.py` — refreshes the committed photos. Each artwork has
  ordered resolvers: a hand-verified Commons file FIRST, then a MediaWiki
  pageimages title fallback, so one bad filename can't silently drop a card to
  its emoji. Stdlib only; per-artwork failures never abort (returns 0). Needs
  real internet — **not** run in CI anymore (the committed images are used).
- `build/inline.py` — bundles every page in `PAGES` (Orsay learn + hunt, Paris
  hunt) into flat `dist/*.html` (inlines CSS/JS + base64 images), injects PWA
  tags, copies PWA assets, writes `dist/index.html`. `collect_images()` scans all
  `IMAGE_DIRS`; each bundle is injected with **only the photos whose id it
  references** (so all-emoji `paris.html` is ~25 KB, not 8 MB).
- `build/generate-icons.js` — dependency-free Node PNG encoder for app icons.
- `pwa/` — `manifest.webmanifest`, `sw.js` (CACHE `cys-v3`, precaches
  `paris.html` too, **network-first for page navigations** so deploys reach
  returning visitors, cache-first for assets), `icons/`.
- `.github/workflows/deploy.yml` — runs `inline.py` (no live fetch anymore — the
  photos are committed) and deploys `dist/` to Pages. Requires **Settings → Pages
  → Source = GitHub Actions**.

## Gauguin gotcha
`Paul Gauguin 056.jpg` is *Tahitian Women on the Beach*, NOT *Arearea* (they were
once swapped on Commons). Keep `arearea` and `tahitian-women` straight.

## Build / deploy
```bash
python3 build/fetch-images.py   # needs a normal connection (CI does this on deploy)
python3 build/inline.py         # → dist/*.html (+ PWA manifest, sw, icons)
```
Pushing to `main` auto-builds and publishes via GitHub Actions.

## Working in THIS sandbox (important)
- **No outbound network here.** External hosts are blocked (403 / "Host not in
  allowlist"). `WebSearch` works; `WebFetch` and `curl` do not. So you can't run
  `fetch-images.py` here — but you don't need to: the 20 photos are committed in
  `museums/orsay/images/`, so `build/inline.py` works fully offline.
- The committed `dist/*.html` (~8 MB each, 20 base64 images) match the committed
  source images. For CSS/JS changes you can either rebuild with `inline.py`
  (safe now that images are committed) or **patch the dist bundles in place**
  (Python `str.replace`); either way verify the image count stays at 20.

## Conventions
- Develop on branch `claude/paris-museum-activities-x1aJE`; never push straight to
  `main`. Land changes via squash-merged PRs.
- Vanilla JS, no build framework, no dependencies. Keep it boring and readable.
- Terse, kid-facing copy. Big tap targets, bright colours, read-aloud friendly.

## Roadmap (not built)
- 🔊 Tap-to-hear narration (seam already in place).
- 🏛️ More museums (Louvre, Pompidou) reusing the engines.
- 📸 Photos for the Paris hunt's photo-friendly cards (own snaps or PD Commons).
- 🗼 More city-wide adventures (the Paris hunt is built; add neighbourhoods?).
