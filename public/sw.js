let todosCache = 'my-cache';

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(todosCache).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                '/taskLogo.jpg',
                '/ws',
                '/index.html',
                '/'
            ])
        })
    )
})

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            if (response){
                return response
            }
        })
    )
})