# orsay-can-you-see

A toddler scavenger hunt through Paris — starting with **"Orsay, Can You See?"**,
an *I-spy* art adventure for a young child at the Musée d'Orsay. 🔎🖼️

Standing in the museum, your little art detective hunts for famous paintings (and
the giant station clock!), taps a card when she spots it on the wall, and earns a
star + confetti. Big tappable cards, bright colours, a "fun fact" for each
artist, and a progress bar — all designed to be read aloud to a 4-year-old.

## Use it on your phone (works fully offline)

The museum's wifi and cell signal are unreliable, so the hunt is packaged as one
self-contained file that needs **no internet** once it's on your phone.

1. Get **`dist/orsay.html`** onto your phone (AirDrop it, email it to yourself,
   or save it to the Files app).
2. Open it in your browser. Add it to your home screen for one-tap access.
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
shared/styles.css          Kid-friendly styling (shared across museums)
shared/hunt.js             The scavenger-hunt engine (museum-agnostic)
museums/orsay/orsay.html   The Orsay hunt page
museums/orsay/data.js      ← edit this to change the hunt content
museums/orsay/images/      Public-domain painting photos
build/inline.py            Bundles everything into dist/orsay.html
build/fetch-images.sh      Downloads the painting photos
dist/orsay.html            The single-file, offline, phone-ready build
```

## Roadmap

- 🔊 **Tap-to-hear narration** so she can play it solo (the code already has a
  seam for the browser's text-to-speech — flip `HUNT_CONFIG.narration` in
  `shared/hunt.js`).
- 🏛️ **More museums** (the Louvre, the Pompidou) reusing the same engine.
- 🗼 **City-wide Paris adventures** beyond museums.

Made with love for one very precocious art detective.
