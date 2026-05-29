#!/usr/bin/env python3
"""Bundle the Orsay hunt into one self-contained, offline-ready HTML file.

Reads museums/orsay/orsay.html and inlines:
  - the shared stylesheet (<link rel="stylesheet">)
  - data.js and shared/hunt.js (<script src>)
  - any real painting photos in museums/orsay/images/ as base64 data URIs

Run:  python3 build/inline.py
Out:  dist/orsay.html   (open it on a phone — works fully offline)

Stdlib only, no dependencies. Missing photos are fine: those cards fall back
to the coloured emoji placeholder, so the file always builds and works.
"""

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORSAY = ROOT / "museums" / "orsay"
IMAGES = ORSAY / "images"
OUT = ROOT / "dist" / "orsay.html"

IMG_EXTS = (".jpg", ".jpeg", ".png", ".webp", ".gif")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def collect_images() -> dict:
    """Map item id -> data URI for any real photo present in images/."""
    images = {}
    if not IMAGES.exists():
        return images
    for f in sorted(IMAGES.iterdir()):
        if f.suffix.lower() in IMG_EXTS:
            images[f.stem] = data_uri(f)
    return images


def build() -> None:
    html = read(ORSAY / "orsay.html")

    # 1. Inline the stylesheet: <link rel="stylesheet" href="../../shared/styles.css" />
    css = read(ROOT / "shared" / "styles.css")
    html = re.sub(
        r'<link[^>]*rel="stylesheet"[^>]*>',
        f"<style>\n{css}\n</style>",
        html,
        count=1,
    )

    # 2. Inline the image map, then the scripts (data.js then hunt.js).
    images = collect_images()
    img_json = ",\n".join(
        f'    "{k}": "{v}"' for k, v in images.items()
    )
    img_script = f"<script>\nwindow.HUNT_IMAGES = {{\n{img_json}\n}};\n</script>"

    def inline_script(match: re.Match) -> str:
        src = match.group(1)
        # Resolve relative to the orsay.html location.
        script_path = (ORSAY / src).resolve()
        js = read(script_path)
        return f"<script>\n{js}\n</script>"

    html = re.sub(r'<script\s+src="([^"]+)"\s*></script>', inline_script, html)

    # Drop the image map in just before the first inlined script block.
    html = html.replace("<script>", img_script + "\n  <script>", 1)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")

    size_kb = OUT.stat().st_size / 1024
    have = len(images)
    total = len(re.findall(r'id:\s*"', read(ORSAY / "data.js")))
    print(f"✓ Wrote {OUT.relative_to(ROOT)}  ({size_kb:.0f} KB)")
    print(f"  Real photos inlined: {have} (placeholders used for the rest)")
    if have < total:
        print("  Tip: run build/fetch-images.sh on a normal connection, then rebuild.")


if __name__ == "__main__":
    build()
