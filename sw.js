const CACHE_NAME = 'pedinobet-cache-v5'; // index.html güncellemeleri için versiyonu v5 yaptık
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
];

// Kurulum
self.addEventListener('install', (e) => {
  // Yeni SW yüklenince beklemeden aktif ol
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Aktivasyon ve Eski Cache Temizliği
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Eski önbellek siliniyor:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// İstekleri Yakala (Offline Destek)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});