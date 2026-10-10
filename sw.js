// Bump this string whenever you want to force a fresh precache
const CACHE = 'mru-soccer-v4';
const PAGE = './index.html';
const ASSETS = ['./', PAGE];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first for instant offline loads; refresh the cache in the background when online
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Icons and the manifest always go straight to the network (only needed at install time)
  if (/apple-touch-icon|icon-\d+|manifest/.test(url.pathname)) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const refresh = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(refresh);
        return cached;
      }
      return refresh.then((res) =>
        res || (req.mode === 'navigate' ? caches.match(PAGE) : Response.error())
      );
    })
  );
});
