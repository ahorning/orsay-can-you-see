# Paris hunt images — sources & licensing

Most cards in **"Have You Seine It?"** use a bright emoji on purpose — it keeps
the hunt fully offline and works for everyday things that look different every
time (a baguette, a café, a pigeon). No photos required.

A few **less-familiar** things are "photo-friendly": a real picture helps a
small child recognize them before the trip. To add one, drop a JPEG at
`cities/paris/images/<id>.jpg` and it replaces the emoji automatically (the app
falls back to the emoji whenever a photo is missing, so nothing breaks).

The easiest, worry-free source is **your own photo** — you'll be right there!
If you'd rather use a public-domain image, check the licence on the file before
committing it (outdoor photos are often CC-BY, which is fine to reuse *with
attribution* but isn't public domain). France has limited "freedom of panorama",
so prefer clearly public-domain or your own snapshots.

| id | What to find | Photo-friendly? | Notes |
|----|--------------|-----------------|-------|
| `eiffel-tower` | The Eiffel Tower | emoji 🗼 | The night-time light show is copyrighted — daytime photos of the tower itself are fine. |
| `seine-boat` | A bateau-mouche on the Seine | emoji 🛥️ | |
| `carousel` | A carousel / merry-go-round | emoji 🎠 | |
| `metro-sign` | An Art Nouveau "Métropolitain" entrance | **yes** 🚇 | Guimard's design (d. 1942) is old; mind the photographer's licence. |
| `wallace-fountain` | A green Wallace drinking fountain | **yes** ⛲ | |
| `baguette` | Someone carrying a baguette | emoji 🥖 | |
| `louvre-pyramid` | The Louvre glass pyramid | emoji 🔺 | |
| `sacre-coeur` | The Sacré-Cœur basilica | **yes** ⛪ | |
| `arc-triomphe` | The Arc de Triomphe | emoji 🏛️ | |
| `sidewalk-cafe` | A pavement café | emoji ☕ | |
| `bouquinistes` | The green riverside book boxes | **yes** 📚 | |
| `pigeons` | Pigeons | emoji 🐦 | |

After adding any photos, rebuild the offline bundles with
`python3 build/inline.py`.
