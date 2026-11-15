// Service worker : garde l'application en cache pour l'utiliser hors ligne.
const CACHE = 'kdence-4436526778';
const FICHIERS = ["./","index.html","manifest.webmanifest","lib/calibrage.json","lib/eb-garamond-400-italique.woff2","lib/eb-garamond-400.woff2","lib/eb-garamond-600.woff2","lib/frequences.json","lib/jszip.min.js","lib/mammoth.browser.min.js","lib/pdf.min.js","lib/pdf.worker.min.js","icones/icone-192.png","icones/icone-512.png","icones/icone-96.png","icones/icone-adaptative-512.png"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(cles => Promise.all(cles.filter(c => c !== CACHE).map(c => caches.delete(c)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
