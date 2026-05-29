#!/usr/bin/env bash
#
# Download public-domain painting photos for the Orsay hunt.
#
# Run this on a NORMAL internet connection (the build sandbox blocks
# external image hosts). Then rebuild the single-file app:
#
#     bash build/fetch-images.sh
#     python3 build/inline.py
#
# Images are saved to museums/orsay/images/<id>.jpg to match data.js.
# Any download that fails is reported at the end — open that artwork's
# Wikipedia page, copy the exact file name, and update the list below.
# (See images/SOURCES.md for titles, artists and licensing.)

set -u
cd "$(dirname "$0")/.." || exit 1
DEST="museums/orsay/images"
mkdir -p "$DEST"

# id  ->  Wikimedia Commons file name (artwork reproductions are public domain)
# Note: "clock" is intentionally omitted — it's a modern photograph that may be
# copyrighted, so that card uses the emoji placeholder. Add one yourself if you
# find a freely-licensed photo.
declare -A FILES=(
  # Degas
  [little-dancer]="Edgar Degas - The Little Fourteen Year Old Dancer - Google Art Project.jpg"
  [ballet-class]="Edgar Degas - The Ballet Class - Google Art Project.jpg"
  [racehorses]="Edgar Degas - Le Défilé, dit aussi Chevaux de course devant les tribunes.jpg"
  # Monet
  [poppies]="Claude Monet - Poppy Field - Google Art Project.jpg"
  [water-lilies]="Claude Monet - Blue Water Lilies - Google Art Project.jpg"
  [gare-saint-lazare]="Claude Monet - La Gare Saint-Lazare.jpg"
  [rouen-cathedral]="Claude Monet - Rouen Cathedral, Facade (sunset).jpg"
  # Van Gogh
  [starry-rhone]="Starry Night Over the Rhone.jpg"
  [vangogh-selfportrait]="Vincent van Gogh - Self-Portrait - Google Art Project (454045).jpg"
  [bedroom-arles]="Vincent van Gogh - De slaapkamer - Google Art Project.jpg"
  [church-auvers]="Vincent van Gogh - The Church in Auvers-sur-Oise, View from the Chevet - Google Art Project.jpg"
  # Renoir
  [moulin-galette]="Pierre-Auguste Renoir, Le Moulin de la Galette.jpg"
  [girls-piano]="Auguste Renoir - Young Girls at the Piano - Google Art Project.jpg"
  [swing]="Pierre-Auguste Renoir - La Balançoire.jpg"
  # Gauguin
  [arearea]="Paul Gauguin 056.jpg"
  [tahitian-women]="Paul Gauguin - Tahitian Women on the Beach - Google Art Project.jpg"
  # Cézanne
  [card-players]="Paul Cézanne - The Card Players - Google Art Project.jpg"
  [apples-oranges]="Paul Cézanne - Apples and Oranges - Google Art Project.jpg"
  [sainte-victoire]="Paul Cézanne - Mont Sainte-Victoire - Google Art Project.jpg"
  # Rousseau (hunt only)
  [snake-charmer]="Henri Rousseau - The Snake Charmer.jpg"
)

WIDTH=800
failed=()

for id in "${!FILES[@]}"; do
  name="${FILES[$id]}"
  # URL-encode spaces; Special:FilePath resolves the canonical file by name.
  encoded="${name// /%20}"
  url="https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=${WIDTH}"
  out="$DEST/$id.jpg"
  echo "↓ $id"
  if curl -fsSL -A "orsay-can-you-see/1.0" -o "$out" "$url" \
     && file "$out" | grep -qiE "image|bitmap"; then
    echo "  ok ($(du -h "$out" | cut -f1))"
  else
    echo "  FAILED: $name"
    rm -f "$out"
    failed+=("$id — $name")
  fi
done

echo
if [ ${#failed[@]} -eq 0 ]; then
  echo "All images downloaded. Now run:  python3 build/inline.py"
else
  echo "Some downloads failed (the app still works with placeholders for these):"
  for f in "${failed[@]}"; do echo "  - $f"; done
  echo "Fix the file names above (check the artwork's Wikipedia page), then re-run."
fi
