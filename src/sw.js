const version = "v1";
const cachePrefix = "fontkeeper-";
const staticCacheName = `${cachePrefix}cache-${version}`;
const expectedCaches = [staticCacheName];
const filesToCache = [
  "/",
  "index.html",
  "preload.js",
  "app.js",
  "app.css",
  "assets/android-chrome-192x192.png",
  "assets/android-chrome-512x512.png",
  "assets/apple-touch-icon.png",
  "assets/browserconfig.xml",
  "assets/favicon-16x16.png",
  "assets/favicon-32x32.png",
  "assets/favicon.ico",
  "assets/mstile-144x144.png",
  "assets/mstile-150x150.png",
  "assets/mstile-310x150.png",
  "assets/mstile-310x310.png",
  "assets/mstile-70x70.png",
  "assets/safari-pinned-tab.svg",
  "assets/site.webmanifest",
];

self.addEventListener("install", (event) => {
  console.log(`SW - Installed `, event);
  event.waitUntil(
    (async () => {
      // const activeVersionPromise = storage.get('active-version');
      const cache = await caches.open(staticCacheName);
      await cache.addAll(filesToCache).catch((err) => {
        console.log(`cache.addAll: `, err);
      });

      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log(`SW - Activated `, event);
  event.waitUntil(
    (async () => {
      // remove caches beginning "svgomg-" that aren't in expectedCaches
      for (const cacheName of await caches.keys()) {
        if (!cacheName.startsWith(cachePrefix)) continue;
        if (!expectedCaches.includes(cacheName)) await caches.delete(cacheName);
      }
      // await storage.set('active-version', version);
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("chrome-extension")) {
    return;
  }
  event.respondWith(
    (async function () {
      // Try to get the response from a cache.
      const cache = await caches.open(staticCacheName);
      const cachedResponse = await cache.match(event.request);
      // Return it if we found one.
      if (cachedResponse) {
        console.log(`SW - Loaded from cache:`, event.request.url);
        return cachedResponse;
      } else {
        console.log(`SW - Fetching:`, event.request.url);
        return fetch(event.request).then(async (res) => {
          await cache.put(event.request, res.clone());
          return res;
        });
      }
    })()
  );
});

// const db = indexedDB.open("concular-db");

// db.onsuccess = (e) => {
//   const transaction = e.target.result.transaction(["manufacturers"]);
//   const store = transaction.objectStore("manufacturers");
//   const tx = store.getAll();
//   tx.onsuccess = (a) => {
//     console.log("PGS");
//     console.log(a);
//   };
// };
