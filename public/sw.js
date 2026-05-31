// PlayHive Games Service Worker
// 缓存游戏资源，提升加载速度

const CACHE_VERSION = 'v1';
const CACHE_NAME = `playhive-${CACHE_VERSION}`;
const GAME_CACHE = `playhive-games-${CACHE_VERSION}`;
const IMAGE_CACHE = `playhive-images-${CACHE_VERSION}`;

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/globals.css',
];

// 安装事件 - 预缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // 立即激活
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== GAME_CACHE && 
              cacheName !== IMAGE_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 立即控制所有客户端
  self.clients.claim();
});

// 判断是否是图片请求
function isImageRequest(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url) ||
         url.includes('/thumbs/') ||
         url.includes('/images/') ||
         url.includes('image');
}

// 判断是否是游戏资源
function isGameResource(url) {
  return url.includes('playgama.com') ||
         url.includes('playhop.com') ||
         url.includes('tubhai.com') ||
         url.includes('gamearter.com');
}

// 判断是否是静态资源
function isStaticAsset(url) {
  return url.includes('/_next/static/') ||
         url.includes('/static/') ||
         url.endsWith('.js') ||
         url.endsWith('.css');
}

// Fetch 事件 - 拦截请求
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;
  
  // 跳过 chrome-extension 和其他非 http 请求
  if (!url.protocol.startsWith('http')) return;
  
  // 图片资源 - Cache First 策略
  if (isImageRequest(url.href) || isImageRequest(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // 返回缓存，同时后台更新
            event.waitUntil(
              fetch(event.request).then((networkResponse) => {
                if (networkResponse.ok) {
                  cache.put(event.request, networkResponse);
                }
              }).catch(() => {})
            );
            return cachedResponse;
          }
          
          // 缓存未命中，从网络获取
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // 网络失败，返回占位图
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#1e293b" width="400" height="300"/><text fill="#6366f1" font-family="Arial" font-size="20" x="50%" y="50%" text-anchor="middle">Loading...</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          });
        });
      })
    );
    return;
  }
  
  // 游戏资源 - Network First 策略（游戏内容可能更新）
  if (isGameResource(url.href)) {
    event.respondWith(
      caches.open(GAME_CACHE).then((cache) => {
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          return cache.match(event.request);
        });
      })
    );
    return;
  }
  
  // 静态资源 - Cache First 策略
  if (isStaticAsset(url.href)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(event.request, networkResponse.clone()));
          }
          return networkResponse;
        });
      })
    );
    return;
  }
  
  // 其他请求 - Network First 策略
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// 监听消息
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // 清除特定缓存
  if (event.data === 'clearImageCache') {
    caches.delete(IMAGE_CACHE).then(() => {
      console.log('[SW] Image cache cleared');
    });
  }
  
  // 获取缓存大小
  if (event.data === 'getCacheSize') {
    caches.keys().then((names) => {
      let totalSize = 0;
      Promise.all(
        names.map((name) => 
          caches.open(name).then((cache) => 
            cache.keys().then((keys) => totalSize += keys.length)
          )
        )
      ).then(() => {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ type: 'cacheSize', size: totalSize });
          });
        });
      });
    });
  }
});
