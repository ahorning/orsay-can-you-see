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

The museum's wifi and cell signal are unreliable, so the hunt is packaged as one
self-contained file that needs **no internet** once it's on your phone.

1. Get the files in **`dist/`** onto your phone (AirDrop them, email them to
   yourself, or save them to the Files app). `dist/index.html` links to both
   activities; `dist/learn.html` and `dist/orsay.html` also open on their own.
2. Open one in your browser. Add it to your home screen for one-tap access.
3. That's it — it works in airplane mode. Progress is saved automatically, and a
   **🔄 Start over** button lets her play again.

You can also just open `index.html` (or `museums/orsay/orsay.html`) in any
browser on a computer.

## Edit the hunt

Everything about the hunt lives in one file: **`museums/orsay/data.js`**.
Change a clue, add an artwork, reorder items — then rebuild the offline file:

```bash
python3 build/inline.py        # → dist/orsay.html
```

### Add the real painting photos

By default each card shows a friendly emoji placeholder. To use real
public-domain photos of the artworks (so she can match the screen to the wall):

```bash
bash build/fetch-images.sh     # downloads photos (needs a normal connection)
python3 build/inline.py        # rebuild the single-file app
```

See `museums/orsay/images/SOURCES.md` for the artworks and licensing.

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
build/inline.py            Bundles everything into dist/*.html
build/fetch-images.sh      Downloads the painting photos
dist/                      The single-file, offline, phone-ready builds
```

## Roadmap

- 🔊 **Tap-to-hear narration** so she can play it solo (the code already has a
  seam for the browser's text-to-speech — flip `HUNT_CONFIG.narration` in
  `shared/hunt.js`).
- 🏛️ **More museums** (the Louvre, the Pompidou) reusing the same engine.
- 🗼 **City-wide Paris adventures** beyond museums.

Made with love for one very precocious art detective.
