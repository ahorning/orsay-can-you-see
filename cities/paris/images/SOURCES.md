# Paris hunt images — sources & licensing

Most cards in **"Have You Seine It?"** use a bright emoji on purpose — it keeps
the hunt fully offline and works for everyday things that look different every
time (a baguette, a café, a pigeon). No photos required.

A few **less-familiar** things are "photo-friendly": a picture helps a small
child recognize them before the trip. These four now ship with a **real
public-domain / freely-licensed photo** (`cities/paris/images/<id>.jpg`) so she
can match the screen to the real thing. Each one's hand-drawn **SVG
illustration** is kept as an offline fallback (`<id>.svg`); the precedence is
**real photo → SVG illustration → emoji**, so nothing ever breaks.

All four subjects are safe to photograph: the depicted *designs* are themselves
public domain (the Wallace fountain dates to 1872; Hector Guimard's métro
entrances — Guimard d. 1942 — are PD in France since 2013; Sacré-Cœur's
architect Paul Abadie d. 1884; the bouquiniste boxes aren't a copyrightable
work), so only the *photographer's* licence matters. France has limited
"freedom of panorama", so we deliberately keep copyrighted-by-design subjects
(the Louvre pyramid, the Eiffel Tower's night light-show) as emoji.

**Want a different photo?** Drop your own JPEG at `cities/paris/images/<id>.jpg`
— your own snapshot is the most worry-free source, and it automatically wins
over everything else.

### Photo credits
- **`sacre-coeur.jpg`** — Thomas Bresson, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0).
  [Commons file](https://commons.wikimedia.org/wiki/File:Paris_75018_Basilique_du_Sacr%C3%A9-C%C5%93ur_20160223_exterior_(01).jpg).
- **`wallace-fountain.jpg`** — besopha, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0).
  [Commons file](https://commons.wikimedia.org/wiki/File:Fontaine_Wallace,_Paris_27_October_2012.jpg).
- **`metro-sign.jpg`** — Jpatokal, public domain.
  [Commons file](https://commons.wikimedia.org/wiki/File:Sign_Metropolitain.JPG).
- **`bouquinistes.jpg`** — Ingolfson, public domain.
  [Commons file](https://commons.wikimedia.org/wiki/File:Wooden_Box_Shops_Along_The_Seine.jpg).

| id | What to find | Photo-friendly? | Notes |
|----|--------------|-----------------|-------|
| `eiffel-tower` | The Eiffel Tower | emoji 🗼 | The night-time light show is copyrighted — daytime photos of the tower itself are fine. |
| `seine-boat` | A bateau-mouche on the Seine | emoji 🛥️ | |
| `carousel` | A carousel / merry-go-round | emoji 🎠 | |
| `metro-sign` | An Art Nouveau "Métropolitain" entrance | **photo** 🚇 | Real PD photo (SVG fallback kept). |
| `wallace-fountain` | A green Wallace drinking fountain | **photo** ⛲ | Real CC-BY photo (SVG fallback kept). |
| `baguette` | Someone carrying a baguette | emoji 🥖 | |
| `louvre-pyramid` | The Louvre glass pyramid | emoji 🔺 | I. M. Pei's pyramid (d. 2019) is still under copyright — kept emoji on purpose. |
| `sacre-coeur` | The Sacré-Cœur basilica | **photo** ⛪ | Real CC-BY photo (SVG fallback kept). |
| `arc-triomphe` | The Arc de Triomphe | emoji 🏛️ | |
| `sidewalk-cafe` | A pavement café | emoji ☕ | |
| `bouquinistes` | The green riverside book boxes | **photo** 📚 | Real PD photo (SVG fallback kept). |
| `pigeons` | Pigeons | emoji 🐦 | |

After adding or changing any photos/illustrations, rebuild the offline bundles
with `python3 build/inline.py`.
