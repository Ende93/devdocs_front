// The name of the cache to store responses in
// If the cache name changes DevDocs is assumed to be updated
const cacheName = APP.service_worker_cache_name;

// Url's to cache when the service worker is installed 
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  ...APP.service_worker_asset_urls,
  ...APP.doc_index_urls,
];

// Set-up the cache
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urlsToCache)),
  );
});

// Remove old caches
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const jobs = keys.map(key => key !== cacheName ? caches.delete(key) : Promise.resolve());
    return Promise.all(jobs);
  })());
});

// Handle HTTP requests
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {
      const response = await fetch(event.request);
      return response;
    } catch (err) {
      const url = new URL(event.request.url);

      const pathname = url.pathname;
      const filename = pathname.substr(1 + pathname.lastIndexOf('/')).split(/\#|\?/g)[0];
      const extensions = ['.html', '.css', '.js', '.json', '.png', '.ico', '.svg', '.xml'];

      // Attempt to return the index page from the cache if the user is visiting a url like devdocs.io/offline or devdocs.io/javascript/global_objects/array/find
      // The index page will make sure the correct documentation or a proper offline page is shown 
      if (url.origin === location.origin && !extensions.some(ext => filename.endsWith(ext))) {
        const cachedIndex = await caches.match('/');
        if (cachedIndex) return cachedIndex;
      }

      throw err;
    }
  })());
});
