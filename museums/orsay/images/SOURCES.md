# Painting images — sources & licensing

The hunt uses photographs of artworks in the Musée d'Orsay. All the **paintings
and the sculpture are in the public domain** (the artists died well over 100
years ago). Faithful photographic reproductions of public-domain 2-D artworks
are also public domain (Wikimedia's *PD-Art* policy), so they're free to reuse.

Images are downloaded by running `build/fetch-images.py` on a normal internet
connection (CI does this automatically on deploy), then rebuilding with
`python3 build/inline.py`. Until then, each card shows a coloured emoji
placeholder and the hunt works fine.

Rather than relying on a single hard-coded Commons filename per artwork (which
silently dropped paintings to placeholders whenever a name was off),
`fetch-images.py` tries the verified Orsay-specific Commons file **first** and
then falls back to resolving the image by Wikipedia article title via the
MediaWiki API. Edit the `ARTWORKS` map in that script to change a source.

| id | Artwork | Artist | Used by | Notes |
|----|---------|--------|---------|-------|
| `clock` | The station clock | — | hunt | **Modern photograph** — may be copyrighted, so this card uses the 🕰️ placeholder. Add your own freely-licensed photo if you like. |
| `little-dancer` | Little Dancer Aged Fourteen | Edgar Degas | both | sculpture, PD |
| `ballet-class` | The Ballet Class | Edgar Degas | both | PD |
| `racehorses` | Racehorses before the Stands | Edgar Degas | learn | PD |
| `poppies` | Poppy Field (Coquelicots) | Claude Monet | both | PD |
| `water-lilies` | Blue Water Lilies | Claude Monet | both | PD |
| `gare-saint-lazare` | The Gare Saint-Lazare | Claude Monet | learn | PD |
| `rouen-cathedral` | Rouen Cathedral | Claude Monet | learn | PD |
| `starry-rhone` | Starry Night Over the Rhône | Vincent van Gogh | both | PD |
| `vangogh-selfportrait` | Self-Portrait (1889) | Vincent van Gogh | both | PD |
| `bedroom-arles` | The Bedroom (Arles) | Vincent van Gogh | both | PD |
| `church-auvers` | The Church at Auvers-sur-Oise | Vincent van Gogh | learn | PD |
| `moulin-galette` | Bal du moulin de la Galette | Pierre-Auguste Renoir | both | PD |
| `girls-piano` | Young Girls at the Piano | Pierre-Auguste Renoir | learn | PD |
| `swing` | The Swing (La Balançoire) | Pierre-Auguste Renoir | learn | PD |
| `snake-charmer` | The Snake Charmer | Henri Rousseau | hunt | PD |
| `arearea` | Arearea (Joyousness) | Paul Gauguin | both | PD |
| `tahitian-women` | Tahitian Women on the Beach | Paul Gauguin | learn | PD |
| `card-players` | The Card Players | Paul Cézanne | both | PD |
| `apples-oranges` | Apples and Oranges | Paul Cézanne | learn | PD |
| `sainte-victoire` | Mont Sainte-Victoire | Paul Cézanne | learn | PD |

Source: Wikipedia / Wikimedia Commons (see the `ARTWORKS` map in
`build/fetch-images.py` for the exact Commons file and article title used per
artwork). The Commons filenames were verified to resolve on 2026-05-29; if one
ever breaks, the MediaWiki title fallback now covers it automatically.

**Heads-up on the Gauguin file names.** On Commons, `Paul Gauguin 056.jpg` is
*Tahitian Women on the Beach* — **not** *Arearea* (confirmed via each painting's
Wikidata item, property P18). `arearea` therefore uses
`Paul Gauguin - Arearea - Google Art Project.jpg`. The two were swapped once,
which silently showed the wrong painting on the Arearea card, so keep them
straight if you edit the list.
