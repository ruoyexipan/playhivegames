// PlayHive Games Service Worker - 优化版
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `playhive-static-${CACHE_VERSION}`;
const GAME_CACHE = `playhive-games-${CACHE_VERSION}`;
const IMAGE_CACHE = `playhive-images-${CACHE_VERSION}`;

// 预缓存的静态资源
const PRECACHE_URLS = [
  '/',
  '/globals.css',
];

// 安装事件
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // 不使用 skipWaiting，避免页面刷新
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.includes(CACHE_VERSION)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 不使用 clients.claim()，避免页面重新加载
});

// 判断资源类型
function getResourceType(url) {
  if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url)) {
    return 'image';
  }
  if (url.includes('playgama.com') || url.includes('playhop.com') || url.includes('tubhai.com')) {
    return 'game';
  }
  if (url.includes('/_next/static/')) {
    return 'static';
  }
  return 'other';
}

// Fetch 事件处理
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;
  
  // 跳过非 HTTP 请求
  if (!url.protocol.startsWith('http')) return;
  
  const resourceType = getResourceType(url.href);
  
  switch (resourceType) {
    case 'image':
      // 图片：缓存优先，后台更新
      event.respondWith(
        caches.open(IMAGE_CACHE).then((cache) => {
          return cache.match(event.request).then((cached) => {
            if (cached) {
              // 后台更新
              event.waitUntil(
                fetch(event.request).then((response) => {
                  if (response.ok) {
                    cache.put(event.request, response);
                  }
                }).catch(() => {})
              );
              return cached;
            }
            
            return fetch(event.request).then((response) => {
              if (response.ok) {
                cache.put(event.request, response.clone());
              }
              return response;
            }).catch(() => {
              // 返回占位图
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#1e293b" width="400" height="300"/></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            });
          });
        })
      );
      break;
      
    case 'game':
      // 游戏资源：网络优先
      event.respondWith(
        caches.open(GAME_CACHE).then((cache) => {
          return fetch(event.request).then((response) => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => {
            return cache.match(event.request);
          });
        })
      );
      break;
      
    case 'static':
      // 静态资源：缓存优先
      event.respondWith(
        caches.match(event.request).then((cached) => {
          return cached || fetch(event.request).then((response) => {
            if (response.ok) {
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(event.request, response);
              });
            }
            return response;
          });
        })
      );
      break;
      
    default:
      // 其他：网络优先
      event.respondWith(
        fetch(event.request).catch(() => {
          return caches.match(event.request);
        })
      );
  }
});

// 监听消息
self.addEventListener('message', (event) => {
  if (event.data === 'clearCaches') {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
});
