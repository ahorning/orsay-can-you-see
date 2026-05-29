# Painting images — sources & licensing

The hunt uses photographs of artworks in the Musée d'Orsay. All the **paintings
and the sculpture are in the public domain** (the artists died well over 100
years ago). Faithful photographic reproductions of public-domain 2-D artworks
are also public domain (Wikimedia's *PD-Art* policy), so they're free to reuse.

Images are **not committed empty** by default — run `build/fetch-images.sh` on a
normal internet connection to download them into this folder, then rebuild with
`python3 build/inline.py`. Until then, each card shows a coloured emoji
placeholder and the hunt works fine.

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

Source: Wikimedia Commons via `Special:FilePath` (see `build/fetch-images.sh`
for the exact file names). If a download fails, open the artwork's Wikipedia
page, copy the precise image file name, and update the script.
