const CACHE_NAME = 'study-flow-v2';
const ASSETS = [
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest'
];

// Install Service Worker and cache all assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve cached assets when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
