const CACHE_VERSION = '2'
const CACHE_NAME = `cegrad-ucc-v${CACHE_VERSION}`
const STATIC_CACHE = `cegrad-ucc-static-v${CACHE_VERSION}`
const DYNAMIC_CACHE = `cegrad-ucc-dynamic-v${CACHE_VERSION}`

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/launchericon-192x192.png',
  '/icons/launchericon-512x512.png',
  '/about',
  '/events',
  '/events/',
  '/help',
  '/help/',
  '/hub',
  '/hub/',
  '/login',
  '/login/',
  '/signup',
  '/signup/',
  '/report',
  '/report/',
  '/report/new',
  '/track',
  '/track/',
  '/admin',
  '/admin/',
  '/user/profile',
  '/user/notifications',
  '/user/userDashboard',
]

const CRITICAL_URLS = new Set([
  '/',
  '/manifest.json',
])

const urlsToCache = PRECACHE_URLS

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
        .catch(err => {
          console.warn('Precache failed; continuing with critical urls:', err)
          return Promise.all(
            Array.from(CRITICAL_URLS)
              .map(url => cache.add(url).catch(() => {}))
          )
        })
    })
  )
  self.skipWaiting()
})

// Clean old caches
async function cleanupOldCaches() {
  const cacheNames = await caches.keys()
  const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE]
  const toDelete = cacheNames.filter(name => !validCaches.includes(name))
  return Promise.all(toDelete.map(name => caches.delete(name)))
}

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
  cleanupOldCaches()
})

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) {
    return
  }

  if (event.request.mode === 'navigate') {
    const isOnline = navigator.onLine ?? true

    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            if (isOnline) {
              fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                  caches.open(DYNAMIC_CACHE).then(cache => {
                    cache.put(event.request, networkResponse)
                  })
                }
              }).catch(() => {})
            }
            return cachedResponse
          }

          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200) {
                return response
              }

              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(event.request, responseClone)
              })

              return response
            })
            .catch(() => {
              return caches.match('/')
            })
        })
    )
    return
  }

  if (['script', 'style', 'image', 'font'].includes(event.request.destination)) {
    event.respondWith(
      caches.match(event.request, { cacheName: STATIC_CACHE }).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, responseClone)
            })
          }

          return networkResponse
        })
        .catch(() => {
          if (event.request.destination === 'image') {
            return new Response('<svg></svg>', { headers: { 'Content-Type': 'image/svg+xml' } })
          }
          return new Response('', { status: 503 })
        })
      })
    )
    return
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200) {
          return response
        }

        const responseClone = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone)
        })

        return response
      })
      .catch(() => {
        return caches.match(event.request).then(response => {
          return response || caches.match(OFFLINE_URL) || new Response('', { status: 503 })
        })
      })
  )
})
