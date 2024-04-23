let todosCache = 'my-cache';

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(todosCache).then(async(cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                '/taskLogo.jpg',
                '/index.html',
                '/static/js/main.ec5bc44b.js',
                '/'
            ])
        })
    )
})

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(async(response) => {
            if (response){
                return response
            }
        })
    )
})