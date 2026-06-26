#!/usr/bin/env python3
"""Download public-domain painting photos for the hunt + learn pages.

Each artwork lists one or more resolvers, tried in order until one yields a real
image:
  ("commons", "File Name.jpg")      -> a specific Wikimedia Commons file
  ("title", lang, "Article Title")  -> the article's main image (pageimages API)

We try the hand-verified Commons file first, then fall back to resolving by
Wikipedia article title — so a single renamed/wrong filename no longer silently
drops a painting to its emoji placeholder (the bug that left many cards blank).
Writes <museum>/images/<id>.jpg for every collection below (Orsay + Louvre).

Stdlib only. Per-artwork failures are reported but never abort the run, so the
deploy still succeeds. Run on a machine with internet (CI does this on deploy):

    python3 build/fetch-images.py
"""

import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORSAY_DEST = ROOT / "museums" / "orsay" / "images"
LOUVRE_DEST = ROOT / "museums" / "louvre" / "images"
THUMB = 900  # px wide — sharp on phones, keeps the offline bundle reasonable
UA = ("orsay-can-you-see/1.0 "
      "(https://github.com/ahorning/orsay-can-you-see; educational kids project)")

# id -> ordered list of resolvers. Commons filenames are the Orsay-specific,
# hand-verified ones; the title resolver is the robust fallback. NOTE the
# Gauguin pair: "Paul Gauguin 056.jpg" IS Tahitian Women on the Beach, not
# Arearea (they were once swapped) — keep them straight.
ARTWORKS = {
    "little-dancer": [
        ("commons", "Degas - The Little Fourteen-Year-Old Dancer, 29.100.370, DP-14939-001.jpg"),
        ("title", "en", "Little Dancer of Fourteen Years")],
    "ballet-class": [
        ("commons", "Edgar Degas - The Ballet Class - Google Art Project.jpg"),
        ("title", "en", "The Ballet Class (Degas, Musée d'Orsay)")],
    "racehorses": [
        ("commons", "Edgar Germain Hilaire Degas 040.jpg"),
        ("title", "fr", "Le Défilé")],
    "the-star": [
        ("commons", "Edgar Degas - Ballet (L'Étoile).jpg"),
        ("title", "en", "The Star (Degas)")],
    "poppies": [
        ("commons", "Claude Monet - Poppy Field - Google Art Project.jpg"),
        ("title", "en", "The Poppy Field near Argenteuil")],
    "water-lilies": [
        ("commons", "Claude Monet - Blue Water Lilies - Google Art Project.jpg"),
        ("title", "en", "Water Lilies (Monet series)")],
    "gare-saint-lazare": [
        ("commons", "La Gare Saint-Lazare - Claude Monet.jpg"),
        ("title", "en", "Gare Saint-Lazare (Monet series)")],
    "rouen-cathedral": [
        ("commons", "Claude Monet - Rouen Cathedral, Facade (Sunset).JPG"),
        ("title", "en", "Rouen Cathedral (Monet series)")],
    "magpie": [
        ("commons", "Claude Monet - The Magpie - Google Art Project.jpg"),
        ("title", "en", "The Magpie (Monet)")],
    "starry-rhone": [
        ("commons", "Starry Night Over the Rhone.jpg"),
        ("title", "en", "Starry Night Over the Rhône")],
    "vangogh-selfportrait": [
        ("commons", "Vincent van Gogh - Self-Portrait - Google Art Project (454045).jpg"),
        ("title", "en", "Van Gogh self-portrait (1889)")],
    "bedroom-arles": [
        ("commons", "Vincent van Gogh - De slaapkamer - Google Art Project.jpg"),
        ("title", "en", "Bedroom in Arles")],
    "church-auvers": [
        ("commons", "Vincent van Gogh - The Church in Auvers-sur-Oise, View from the Chevet - Google Art Project.jpg"),
        ("title", "en", "The Church at Auvers")],
    "moulin-galette": [
        ("commons", "Pierre-Auguste Renoir, Le Moulin de la Galette.jpg"),
        ("title", "en", "Bal du moulin de la Galette")],
    "girls-piano": [
        ("commons", "Auguste Renoir - Young Girls at the Piano - Google Art Project.jpg"),
        ("title", "en", "Girls at the Piano")],
    "swing": [
        ("commons", "Pierre-Auguste Renoir - La Balançoire.jpg"),
        ("title", "en", "The Swing (Renoir)")],
    "dance-city": [
        ("commons", "Pierre-Auguste Renoir 019.jpg"),
        ("title", "en", "Dance in the City")],
    "dance-country": [
        ("commons", "Pierre Auguste Renoir - Country Dance - Google Art Project.jpg"),
        ("title", "en", "Dance in the Country")],
    "arearea": [
        ("commons", "Paul Gauguin - Arearea - Google Art Project.jpg"),
        ("title", "en", "Arearea")],
    "tahitian-women": [
        ("commons", "Paul Gauguin 056.jpg"),
        ("title", "en", "Tahitian Women on the Beach")],
    "white-horse": [
        ("commons", "Paul Gauguin - Le cheval blanc.jpg"),
        ("title", "en", "The White Horse (Gauguin)")],
    "card-players": [
        ("commons", "Les Joueurs de cartes, par Paul Cézanne.jpg"),
        ("title", "en", "The Card Players")],
    "apples-oranges": [
        ("commons", "Pommes et oranges, par Paul Cézanne, musée d'Orsay.jpg"),
        ("title", "en", "Still Life with Apples and Oranges")],
    "sainte-victoire": [
        ("commons", "Paul Cézanne - Mont Sainte-Victoire - Google Art Project.jpg"),
        ("title", "en", "Mont Sainte-Victoire (Cézanne)")],
    "snake-charmer": [
        ("commons", "Henri Rousseau, known as le Douanier - The Snake Charmer - Google Art Project.jpg"),
        ("title", "en", "The Snake Charmer (Rousseau)")],
    "the-circus": [
        ("commons", "Georges Seurat, 1891, Le Cirque (The Circus), oil on canvas, 185 x 152 cm, Musée d'Orsay.jpg"),
        ("title", "en", "The Circus (Seurat)")],
    "jane-avril": [
        ("commons", "Henri de Toulouse-Lautrec - Jane Avril Dancing - Google Art Project.jpg"),
        ("title", "en", "Jane Avril Dancing")],
    "clowness": [
        ("commons", "Toulouse-Lautrec - The Clown Cha-U-Kao, 1895.jpg"),
        ("title", "en", "Cha-U-Kao")],
    "white-cat": [
        ("commons", "Le Chat blanc.jpg"),
        ("commons", 'Pierre Bonnard , "Le Chat blanc", 1894.jpg'),
        ("title", "fr", "Le Chat blanc")],
}

# Louvre artworks. Commons filenames verified to resolve; the title resolver is
# the robust fallback. The famous statues use freely-licensed photos of the
# (public-domain) sculptures. The glass pyramid is intentionally absent — modern
# architecture, so that card keeps its 🔺 emoji placeholder.
LOUVRE_ARTWORKS = {
    "mona-lisa": [
        ("commons", "Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg"),
        ("title", "en", "Mona Lisa")],
    "virgin-st-anne": [
        ("commons", "Leonardo da Vinci - Virgin and Child with St Anne C2RMF retouched.jpg"),
        ("title", "en", "The Virgin and Child with Saint Anne (Leonardo)")],
    "liberty": [
        ("commons", "Eugène Delacroix - Le 28 Juillet. La Liberté guidant le peuple.jpg"),
        ("title", "en", "Liberty Leading the People")],
    "raft-medusa": [
        ("commons", "JEAN LOUIS THÉODORE GÉRICAULT - La Balsa de la Medusa (Museo del Louvre, 1818-19).jpg"),
        ("title", "en", "The Raft of the Medusa")],
    "coronation-napoleon": [
        ("commons", "Jacques-Louis David, The Coronation of Napoleon edit.jpg"),
        ("title", "en", "The Coronation of Napoleon")],
    "wedding-cana": [
        ("commons", "Paolo Veronese 008.jpg"),
        ("title", "en", "The Wedding at Cana (Veronese)")],
    "lacemaker": [
        ("commons", "Johannes Vermeer - The lacemaker (c.1669-1671).jpg"),
        ("title", "en", "The Lacemaker")],
    "astronomer": [
        ("commons", "Johannes Vermeer - The Astronomer - WGA24685.jpg"),
        ("title", "en", "The Astronomer (Vermeer)")],
    "grande-odalisque": [
        ("commons", "Jean Auguste Dominique Ingres, La Grande Odalisque, 1814.jpg"),
        ("title", "en", "Grande Odalisque")],
    "venus-de-milo": [
        ("commons", "Venus de Milo Louvre Ma399 n4.jpg"),
        ("title", "en", "Venus de Milo")],
    "winged-victory": [
        ("commons", "Nike of Samothrake Louvre Ma2369 n4.jpg"),
        ("title", "en", "Winged Victory of Samothrace")],
    "psyche-cupid": [
        ("commons", "Psyché ranimée par le baiser de l'Amour, Louvre.jpg"),
        ("title", "en", "Psyche Revived by Cupid's Kiss")],
    # Arcimboldo — the 1573 "Four Seasons" set, all in the Louvre.
    "arcimboldo-spring": [
        ("commons", "Giuseppe Arcimboldo - Spring, 1573.jpg"),
        ("title", "en", "Spring (Arcimboldo)")],
    "arcimboldo-summer": [
        ("commons", "Giuseppe Arcimboldo - Summer - Google Art Project.jpg"),
        ("title", "en", "Summer (Arcimboldo)")],
    "arcimboldo-autumn": [
        ("commons", "Giuseppe Arcimboldo - Autumn, 1573.jpg"),
        ("title", "en", "Autumn (Arcimboldo)")],
    "arcimboldo-winter": [
        ("commons", "Giuseppe Arcimboldo - Winter, 1573.jpg"),
        ("title", "en", "Winter (Arcimboldo)")],
}

# Each collection -> where its <id>.jpg files are written.
COLLECTIONS = [
    (ORSAY_DEST, ARTWORKS),
    (LOUVRE_DEST, LOUVRE_ARTWORKS),
]


def http_get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read()


def resolve_title(lang: str, title: str) -> str | None:
    """Main image URL for a Wikipedia article via the pageimages API."""
    query = urllib.parse.urlencode({
        "action": "query",
        "format": "json",
        "formatversion": "2",
        "prop": "pageimages",
        "piprop": "thumbnail",
        "pithumbsize": str(THUMB),
        "titles": title,
        "redirects": "1",
    })
    url = f"https://{lang}.wikipedia.org/w/api.php?{query}"
    data = json.loads(http_get(url).decode("utf-8"))
    for page in data.get("query", {}).get("pages", []):
        source = page.get("thumbnail", {}).get("source")
        if source:
            return source
    return None


def resolve_commons(filename: str) -> str:
    name = urllib.parse.quote(filename)
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{name}?width={THUMB}"


def image_url(resolver) -> str | None:
    kind = resolver[0]
    if kind == "title":
        return resolve_title(resolver[1], resolver[2])
    if kind == "commons":
        return resolve_commons(resolver[1])
    return None


def looks_like_image(data: bytes) -> bool:
    return data[:3] == b"\xff\xd8\xff" or data[:8] == b"\x89PNG\r\n\x1a\n"


def fetch(item_id: str, resolvers, dest: Path) -> bool:
    for resolver in resolvers:
        try:
            url = image_url(resolver)
            if not url:
                continue
            data = http_get(url)
            if not looks_like_image(data):
                continue
            (dest / f"{item_id}.jpg").write_bytes(data)
            print(f"  ok  {item_id}  ({len(data) // 1024} KB, via {resolver[0]})")
            return True
        except Exception as exc:  # network/HTTP/parse — try the next resolver
            print(f"      {item_id}: {resolver} failed ({exc})", file=sys.stderr)
    return False


def main() -> int:
    total = failed = 0
    for dest, artworks in COLLECTIONS:
        dest.mkdir(parents=True, exist_ok=True)
        print(f"→ {dest.relative_to(ROOT)}")
        for item_id, resolvers in artworks.items():
            total += 1
            if not fetch(item_id, resolvers, dest):
                print(f"  --  {item_id}  (no image — will use placeholder)")
                failed += 1
    print(f"\nDownloaded {total - failed} / {total} images.")
    return 0  # never fail the build over a missing picture


if __name__ == "__main__":
    sys.exit(main())
