#!/usr/bin/env python3
"""Bundle the Orsay activities into self-contained, offline-ready HTML files.

For each page (the learn page and the hunt) it inlines:
  - the shared stylesheet (<link rel="stylesheet">)
  - every <script src> (common.js, data.js/artists.js, the engine)
  - all painting photos in museums/orsay/images/ as base64 data URIs

It also writes a dist/index.html landing page whose links point at the
bundled siblings.

Run:  python3 build/inline.py
Out:  dist/index.html, dist/learn.html, dist/orsay.html
      (open any on a phone — they work fully offline)

Stdlib only. Missing photos are fine: those cards fall back to the coloured
emoji placeholder, so the files always build and work.
"""

import base64
import mimetypes
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORSAY = ROOT / "museums" / "orsay"
PARIS = ROOT / "cities" / "paris"
IMAGE_DIRS = [ORSAY / "images", PARIS / "images"]
PWA = ROOT / "pwa"
DIST = ROOT / "dist"

# Injected into each bundled page so the deployed site is an installable,
# offline PWA. Paths are relative because the dist files sit flat at the site
# root. Harmless for the local-file use: the manifest/icons just 404 and the
# service-worker registration is guarded to no-op on file://.
PWA_HEAD = """  <link rel="manifest" href="manifest.webmanifest" />
  <link rel="apple-touch-icon" href="icons/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Can You See?" />
  <meta name="mobile-web-app-capable" content="yes" />
"""
PWA_BODY = """  <script>
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function () {});
      });
    }
  </script>
"""


def inject_pwa(html: str) -> str:
    html = html.replace("</head>", PWA_HEAD + "</head>", 1)
    html = html.replace("</body>", PWA_BODY + "</body>", 1)
    return html

# Each page to bundle: source html -> output filename in dist/
PAGES = {
    ORSAY / "learn.html": "learn.html",
    ORSAY / "orsay.html": "orsay.html",
    PARIS / "paris.html": "paris.html",
}

IMG_EXTS = (".jpg", ".jpeg", ".png", ".webp", ".gif")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def collect_images() -> dict:
    """Map item id (filename stem) -> data URI for any real photo present,
    across every activity's images/ folder."""
    images = {}
    for d in IMAGE_DIRS:
        if d.exists():
            for f in sorted(d.iterdir()):
                if f.suffix.lower() in IMG_EXTS:
                    images[f.stem] = data_uri(f)
    return images


def build_page(src: Path, out_name: str, images: dict) -> None:
    html = read(src)

    # 1. Inline the stylesheet.
    css = read(ROOT / "shared" / "styles.css")
    html = re.sub(
        r'<link[^>]*rel="stylesheet"[^>]*>',
        f"<style>\n{css}\n</style>",
        html,
        count=1,
    )

    # 2. Inline every <script src="..."></script> relative to the page.
    def inline_script(match: re.Match) -> str:
        js = read((src.parent / match.group(1)).resolve())
        return f"<script>\n{js}\n</script>"

    html = re.sub(r'<script\s+src="([^"]+)"\s*></script>', inline_script, html)

    # 3. Inject only the images this page actually references (the ids in its
    #    inlined data), so each bundle carries just its own photos — the Paris
    #    hunt is all-emoji and ships none, instead of every painting.
    used = {k: v for k, v in images.items() if f'"{k}"' in html}
    img_json = ",\n".join(f'    "{k}": "{v}"' for k, v in used.items())
    img_script = f"<script>\nwindow.ARTWORK_IMAGES = {{\n{img_json}\n}};\n</script>"
    html = html.replace("<script>", img_script + "\n  <script>", 1)

    html = inject_pwa(html)

    out = DIST / out_name
    out.write_text(html, encoding="utf-8")
    print(f"✓ {out.relative_to(ROOT)}  ({out.stat().st_size / 1024:.0f} KB, "
          f"{len(used)} photos)")


def build_index() -> None:
    """Landing page with links pointing at the bundled siblings in dist/."""
    html = read(ROOT / "index.html")
    # The bundled pages sit flat in dist/, so flatten the source links.
    html = html.replace("museums/orsay/", "")
    html = html.replace("cities/paris/", "")
    html = inject_pwa(html)
    (DIST / "index.html").write_text(html, encoding="utf-8")
    print(f"✓ {(DIST / 'index.html').relative_to(ROOT)}")


def copy_pwa_assets() -> None:
    """Drop the manifest, service worker and icons alongside the bundles."""
    shutil.copy2(PWA / "manifest.webmanifest", DIST / "manifest.webmanifest")
    shutil.copy2(PWA / "sw.js", DIST / "sw.js")
    shutil.copytree(PWA / "icons", DIST / "icons", dirs_exist_ok=True)
    print("✓ dist/manifest.webmanifest, dist/sw.js, dist/icons/")


def build() -> None:
    DIST.mkdir(parents=True, exist_ok=True)
    images = collect_images()
    for src, out_name in PAGES.items():
        build_page(src, out_name, images)
    build_index()
    copy_pwa_assets()

    have = len(images)
    ids = set(re.findall(r'id:\s*"([^"]+)"', read(ORSAY / "data.js")))
    ids |= set(re.findall(r'id:\s*"([^"]+)"', read(ORSAY / "artists.js")))
    print(f"\nReal photos inlined: {have} / {len(ids)} artworks "
          f"(placeholders used for the rest)")
    if have < len(ids):
        print("Tip: run build/fetch-images.py on a normal connection, then rebuild.")


if __name__ == "__main__":
    build()
