let todosCache = 'my-cache';

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(todosCache).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                '/taskLogo.jpg',
                '/index.html',
                '/'
            ])
        })
    )
})

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response){
                return response
            }
        })
    )
})