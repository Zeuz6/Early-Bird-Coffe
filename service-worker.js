const CACHE_NAME = "early-bird-coffee-v1";

const filesToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/logo.png",
    "/icon-192.png",
    "/icon-512.png",
    "/coffee-grounds.png",
    "/coffee-pods.png",
    "/early-bird-mug.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(filesToCache);

            })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response ||
                    fetch(event.request);

            })

    );

});