const CACHE_NAME = 'medinobet-cache-v7'; // İsim düzeltmesi ve sıralama için versiyon güncellendi

const ASSETS = [

  './',

  './index.html',

  './manifest.json',

  'https://cdn.tailwindcss.com',

  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',

  'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'

];

self.addEventListener('install', (e) => {

  self.skipWaiting();

  e.waitUntil(

    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))

  );

});

self.addEventListener('activate', (e) => {

  e.waitUntil(

    caches.keys().then((keyList) => {

      return Promise.all(keyList.map((key) => {

        if (key !== CACHE_NAME) {

          return caches.delete(key);

        }

      }));

    })

  );

});

self.addEventListener('fetch', (e) => {

  e.respondWith(

    caches.match(e.request).then((response) => response || fetch(e.request))

  );

});
 
