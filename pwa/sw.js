/* Service worker for the "Can You See?" PWA.
 *
 * The bundled pages are self-contained (images are inlined), so the whole app
 * is offline once these few files are cached. Strategy:
 *   - page navigations: network-first (fresh content when online, e.g. updated
 *     paintings), falling back to cache when offline — so a new deploy reaches
 *     returning visitors instead of being masked by a stale cache.
 *   - other assets: cache-first, stashing same-origin GETs at runtime.
 *
 * Bump CACHE when the app changes to roll out a fresh copy.
 */
const CACHE = "cys-v2";
const SHELL = [
  "./",
  "index.html",
  "learn.html",
  "orsay.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  const isPage = req.mode === "navigate" || req.destination === "document";

  if (isPage) {
    // Network-first: get fresh pages when online, fall back to cache offline.
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match("index.html")))
    );
    return;
  }

  // Other assets: cache-first, stashing same-origin GETs at runtime.
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => caches.match("index.html"));
    })
  );
});
