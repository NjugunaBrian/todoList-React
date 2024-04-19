/* eslint-disable no-restricted-globals */
const todosCache = 'my-cache';

//put the static assets and routes you want to cache here
const filesToCache = [
    '/',
    './components',
    './hooks',
    './App.css',
    './App.js',
    './index.js',
];

//the event handler for the activate event
self.addEventListener('activate', e => self.clients.claim());

//the event handler for the install event
//typically used to cache assets
self.addEventListener('install', e => {
    e.waitUntil(
        caches.name(todosCache)
        .then(cache => cache.addFiles(filesToCache))
    );
});

//fetch event handler, to intercept requests and serve all
//static assets from the cache
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => response ? response : fetch(e.request))
    )
});


