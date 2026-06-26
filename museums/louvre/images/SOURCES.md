# Artwork images — sources & licensing

The hunt uses photographs of artworks in the Louvre. All the **paintings are in
the public domain** (the artists died well over 100 years ago), and faithful
photographic reproductions of public-domain 2-D artworks are also public domain
(Wikimedia's *PD-Art* policy). The **statues** are ancient or 19th-century works
in the public domain; their photographs are freely licensed on Wikimedia Commons.

The downloaded images are **committed to the repo** so the build is reproducible
and works offline (no dependency on Wikimedia at build time). To refresh them,
re-run `build/fetch-images.py` on a normal internet connection, then
rebuild with `python3 build/inline.py`. If an image is missing, that card simply
shows a coloured emoji placeholder and the hunt still works fine.

| id | Artwork | Artist | Used by | Notes |
|----|---------|--------|---------|-------|
| `pyramid` | The Louvre Pyramid | I. M. Pei | hunt | **Modern architecture** — may be copyrighted, so this card uses the 🔺 placeholder. Add your own freely-licensed photo if you like. |
| `mona-lisa` | Mona Lisa | Leonardo da Vinci | both | PD |
| `virgin-st-anne` | The Virgin and Child with St. Anne | Leonardo da Vinci | both | PD |
| `liberty` | Liberty Leading the People | Eugène Delacroix | both | PD |
| `raft-medusa` | The Raft of the Medusa | Théodore Géricault | both | PD |
| `coronation-napoleon` | The Coronation of Napoleon | Jacques-Louis David | both | PD |
| `wedding-cana` | The Wedding Feast at Cana | Paolo Veronese | both | PD |
| `lacemaker` | The Lacemaker | Johannes Vermeer | both | PD |
| `astronomer` | The Astronomer | Johannes Vermeer | learn | PD |
| `grande-odalisque` | La Grande Odalisque | J.-A.-D. Ingres | both | PD |
| `arcimboldo-spring` | Spring (The Four Seasons, 1573) | Giuseppe Arcimboldo | learn | PD |
| `arcimboldo-summer` | Summer (The Four Seasons, 1573) | Giuseppe Arcimboldo | both | PD |
| `arcimboldo-autumn` | Autumn (The Four Seasons, 1573) | Giuseppe Arcimboldo | learn | PD |
| `arcimboldo-winter` | Winter (The Four Seasons, 1573) | Giuseppe Arcimboldo | learn | PD |
| `venus-de-milo` | Venus de Milo | unknown (ancient Greek) | both | PD sculpture; freely-licensed photo |
| `winged-victory` | Winged Victory of Samothrace | unknown (ancient Greek) | both | PD sculpture; freely-licensed photo |
| `psyche-cupid` | Psyche Revived by Cupid's Kiss | Antonio Canova | both | PD sculpture; freely-licensed photo |

Source: Wikimedia Commons via `Special:FilePath` (see `build/fetch-images.py`
for the exact file names). If a download fails, open the artwork's Wikipedia page,
copy the precise image file name, and update the script. The statue photo file
names in particular are worth a quick check on first run — there are many photos
of each statue on Commons, so swap in whichever freely-licensed one you prefer.
