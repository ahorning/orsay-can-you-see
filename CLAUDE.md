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
  ship a hand-drawn **SVG illustration** at `cities/paris/images/<id>.svg`
  (original to this repo, public domain — keeps the hunt offline with no
  licensing worries). Picture precedence in `artTile()` is **real photo → SVG
  illustration → emoji**: drop a `cities/paris/images/<id>.jpg` (your own
  snapshot works great) and it automatically wins over the illustration.

## Architecture / where things live
- `index.html` — landing page (title: "Orsay, Can You See?" 🕰️).
- `shared/common.js` — `window.CYS` namespace: `el()`, `imageSrc()`, `artTile()`,
  `speak()`, `confetti()`, `store`, `NARRATION` flag. `imageSrc()` uses
  `window.ARTWORK_IMAGES` (base64 map injected by the build) and falls back to
  `images/<id>.jpg`. `artTile()` then tries `images/<id>.svg` (the Paris
  illustrations) before the coloured emoji placeholder.
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
  `IMAGE_DIRS` (jpg/png/webp/gif **and svg**; a real raster wins over an `.svg`
  of the same id); each bundle is injected with **only the photos whose id it
  references** (so `paris.html` is ~36 KB — just its 4 tiny SVGs — not 8 MB).
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
- **Outbound network is an allowlist, not a total block.** Traffic goes through a
  proxy that denies unlisted hosts with `403` + header `x-deny-reason:
  host_not_allowed` ("Host not in allowlist"). On the default Claude-Code-on-the-
  web policy the allowlist is **dev/package hosts only**: reachable =
  `pypi.org`, `files.pythonhosted.org`, `github.com`, `raw.githubusercontent.com`,
  `registry.npmjs.org`; **denied** = all of Wikimedia/Wikipedia
  (`commons.wikimedia.org`, `upload.wikimedia.org`, `*.wikipedia.org`),
  `wikidata.org`, public CDNs (jsdelivr, unpkg), `archive.org`, even
  `musee-orsay.fr`. `WebSearch` (a server-side tool) works; `curl`/`urllib`/
  `WebFetch` to a denied host do not. Don't waste time probing — to check, one
  `curl -s -o /dev/null -w "%{http_code}"` is enough.
- **Therefore `fetch-images.py` can't run on the default web policy** (it needs
  `commons.wikimedia.org` + `upload.wikimedia.org` + `*.wikipedia.org`). You
  usually don't need it: the artwork photos are committed under
  `museums/orsay/images/`, so `build/inline.py` works fully offline.
- The committed `dist/*.html` are big (~8 MB for the painting-heavy Orsay pages)
  and must match the committed source images. For CSS/JS changes either rebuild
  with `inline.py` (safe — images are committed) or **patch the dist bundles in
  place** (Python `str.replace`); either way verify the inlined image count
  didn't drop (the build prints "N photos" per page).

## How we fetch/add artwork images (the photos in museums/orsay/images/)
This is how the committed photos got there, and how to add more:
1. **`build/fetch-images.py` downloads them from Wikimedia Commons** (verified
   Commons file first, MediaWiki `pageimages` title fallback second) into
   `museums/orsay/images/<id>.jpg`. Add a new painting by adding its `<id>` +
   resolvers to the `ARTWORKS` map. It needs real network to `*.wikimedia.org`
   and `*.wikipedia.org` (the Commons `Special:FilePath` redirect and the API
   thumbnails both serve bytes from **`upload.wikimedia.org`** — that host is the
   one people forget to allowlist).
2. Run it **where that network is reachable**, then `build/inline.py`, then
   **commit the new `*.jpg` + rebuilt `dist/`**. CI does *not* fetch (deploy
   builds from committed images), so an un-fetched id ships as its emoji
   placeholder.
3. **To fetch from a Claude-Code web session:** the default policy blocks
   Wikimedia (see above), so first change the *environment's* Network-access
   policy (web UI, set at env-creation time — NOT editable from inside a running
   container, NOT a `settings.json` thing) to **Full access** or a **custom
   allowlist** containing `commons.wikimedia.org`, `upload.wikimedia.org`,
   `en.wikipedia.org`, `fr.wikipedia.org`. Then **start a new session** (the
   policy is baked in at container startup) and run the two scripts.
   Docs: https://code.claude.com/docs/en/claude-code-on-the-web
4. **Fallback when you can't widen the policy:** `github.com` /
   `raw.githubusercontent.com` *are* reachable, so the same public-domain files
   can be pulled from a GitHub mirror — but verify each matches the actual Orsay
   painting (see the Gauguin file-swap gotcha) before trusting a mirror.

## Conventions
- Develop on branch `claude/paris-museum-activities-x1aJE`; never push straight to
  `main`. Land changes via squash-merged PRs.
- Vanilla JS, no build framework, no dependencies. Keep it boring and readable.
- Terse, kid-facing copy. Big tap targets, bright colours, read-aloud friendly.

## Roadmap (not built)
- 🔊 Tap-to-hear narration (seam already in place).
- 🏛️ More museums (Louvre, Pompidou) reusing the engines.
- 📸 Real photos for the Paris hunt's photo-friendly cards (own snaps or PD
  Commons) to replace the shipped SVG illustrations — drop `<id>.jpg`, it wins.
- 🗼 More city-wide adventures (the Paris hunt is built; add neighbourhoods?).
