# orsay-can-you-see

A toddler scavenger hunt through Paris — starting with **"Orsay, Can You See?"**,
an *I-spy* art adventure for a young child at the Musée d'Orsay. 🔎🖼️

Standing in the museum, your little art detective hunts for famous paintings (and
the giant station clock!), taps a card when she spots it on the wall, and earns a
star + confetti. Big tappable cards, bright colours, a "fun fact" for each
artist, and a progress bar — all designed to be read aloud to a 4-year-old.

There are two activities so far:

- **🎨 Learn Before We Go** — a study gallery grouped by artist, plus a
  *guess-the-artist* quiz to play at home before the trip, so the paintings feel
  like old friends by the time you arrive.
- **🖼️ Orsay, Can You See?** — the in-museum scavenger hunt.

## Use it on your phone (works fully offline)

The museum's wifi and cell signal are unreliable, so the app is built to need
**no internet** once it's on your phone. There are two ways to get it there.

### Option A — Install as an app (recommended)

The app is a PWA: install it once at home and it lives as an icon on your home
screen, opens fullscreen, and works offline in the museum.

1. **One-time repo setup:** in GitHub, go to **Settings → Pages → Build and
   deployment** and set the **Source** to **GitHub Actions**. Pushing to `main`
   then auto-builds the site (the CI even downloads the real painting photos) and
   publishes it. The page URL is printed at the end of the *Deploy to GitHub
   Pages* action and shown under the repo's **Environments → github-pages**.
2. On your phone, open that URL **once while on wifi** (this caches everything).
3. Tap the browser's share/menu and **Add to Home Screen**.
4. Done — launch it from the icon any time, fully offline. Progress saves
   automatically; a **🔄 Start over** button lets her replay.

### Option B — Copy the files (no hosting, fully private)

Each file in **`dist/`** is completely self-contained (images included), so you
can just carry them around:

1. AirDrop / email / save `dist/index.html`, `dist/learn.html`, `dist/orsay.html`
   to your phone's Files app.
2. Open one in your browser — works in airplane mode. `index.html` links to both
   activities; the other two also open on their own.

You can also open any `dist/*.html` (or `index.html`) in a browser on a computer.

## Edit the hunt

Everything about the hunt lives in one file: **`museums/orsay/data.js`**.
Change a clue, add an artwork, reorder items — then rebuild the offline file:

```bash
python3 build/inline.py        # → dist/*.html (+ PWA manifest, sw, icons)
```

### The painting photos

The real public-domain photos are **committed in `museums/orsay/images/`**, so
the build needs no internet and every deploy ships the full set of pictures (no
"sometimes an emoji" from a flaky download). One card — the giant station clock
— stays an emoji on purpose: it's a modern photograph, not a public-domain
artwork. See `museums/orsay/images/SOURCES.md` for the full list and licensing.

To refresh the photos or add new ones (after editing the artwork lists), run the
downloader on a normal connection and rebuild, then commit the new images:

```bash
python3 build/fetch-images.py  # refreshes museums/orsay/images/ (needs internet)
python3 build/inline.py        # rebuild the single-file app
```

## Project layout

```
index.html                 Landing page linking to each activity
shared/common.js           Shared helpers (DOM, image fallback, confetti)
shared/styles.css          Kid-friendly styling (shared across activities)
shared/hunt.js             The scavenger-hunt engine (museum-agnostic)
shared/learn.js            The learn engine (study gallery + quiz)
museums/orsay/orsay.html   The Orsay hunt page
museums/orsay/data.js      ← edit this to change the hunt content
museums/orsay/learn.html   The "learn before we go" page
museums/orsay/artists.js   ← edit this to change the artists/paintings
museums/orsay/images/      Public-domain painting photos
build/inline.py            Bundles everything into dist/*.html + PWA assets
build/fetch-images.py      Downloads the painting photos (via Commons + the MediaWiki API)
build/generate-icons.js    Generates the app icons (no dependencies)
pwa/                       PWA manifest, service worker, icons
.github/workflows/         CI that builds and deploys to GitHub Pages
dist/                      The single-file, offline, phone-ready builds
```

## Roadmap

- 🔊 **Tap-to-hear narration** so she can play it solo (the code already has a
  seam for the browser's text-to-speech — flip `CYS.NARRATION` in
  `shared/common.js`).
- 🏛️ **More museums** (the Louvre, the Pompidou) reusing the same engine.
- 🗼 **City-wide Paris adventures** beyond museums.

Made with love for one very precocious art detective.
