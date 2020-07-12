const VERSION = 'v1';
//primero se tiene que instalar para que funcione se le pasa un precache
self.addEventListener('install', event =>{
    event.waitUntil(precache())
})
//despues  se le pasa el request con fetch 
self.addEventListener('fetch', event =>{
    const request =  event.request;
    //Necesitamos solo recibir los get los otros traen info no necesaria
    if(request.method !== 'GET'){
        return
    }

    //buscar en cache 
    event.respondWith(cachedResponse(request))

    //actualizar el cache
    event.waitUntil(updateCache(request))
})

async function precache() {
    const cache = await caches.open(VERSION)
    //se le pasan todos los archivos necesarios para el buen funcionamiento
    return cache.addAll([
        // '/' <--- este es necesario y obligatorio
        '/',
    '/index.html',
    '/assets/index.js',
    '/assets/MediaPlayer.js',
    '/assets/plugins/AutoPlay.js',
    '/assets/plugins/AutoPause.js',
    '/assets/index.css',
    '/assets/BigBuckBunny.mp4',
    ])

}

async function cachedResponse(request){
    const cache = await caches.open(VERSION)
    const response = await cache.match(request)
    // si no hay respues el fetch es para que busque en la red en internet 
    return response || fetch(request)
}

async function updateCache(){
    const cache = await caches.open(VERSION)
    const response = await fetch(request)
    return cache.put(request, response)
}