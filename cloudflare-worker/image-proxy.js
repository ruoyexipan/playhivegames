// Cloudflare Worker - 图片代理缓存
// 功能：代理外部图片，缓存到 CDN，支持 WebP 转换

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 健康检查
    if (url.pathname === '/health') {
      return new Response('OK', { status: 200 });
    }
    
    // 获取要代理的图片 URL
    const imageUrl = url.searchParams.get('url');
    
    if (!imageUrl) {
      return new Response(JSON.stringify({
        error: 'Missing url parameter',
        usage: '?url=https://example.com/image.jpg'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 验证 URL 是否来自允许的域名
    const allowedDomains = [
      'tubhai.com',
      'playgama.com',
      'playhop.com',
      'static.playhop.com'
    ];
    
    let imageUrlObj;
    try {
      imageUrlObj = new URL(imageUrl);
    } catch (e) {
      return new Response('Invalid URL', { status: 400 });
    }
    
    const isAllowed = allowedDomains.some(domain => 
      imageUrlObj.hostname === domain || imageUrlObj.hostname.endsWith('.' + domain)
    );
    
    if (!isAllowed) {
      return new Response('Domain not allowed', { status: 403 });
    }
    
    // 构建缓存键
    const cacheKey = new Request(request.url, request);
    const cache = caches.default;
    
    // 检查缓存
    let response = await cache.match(cacheKey);
    
    if (response) {
      // 返回缓存的响应，添加缓存命中标记
      const headers = new Headers(response.headers);
      headers.set('X-Cache', 'HIT');
      return new Response(response.body, {
        status: response.status,
        headers
      });
    }
    
    // 缓存未命中，获取原始图片
    try {
      const accept = request.headers.get('Accept') || '';
      const supportsWebP = accept.includes('webp');
      
      // 构建请求头
      const fetchHeaders = new Headers({
        'User-Agent': 'Mozilla/5.0 (compatible; PlayHiveBot/1.0)',
        'Accept': 'image/webp, image/*, */*',
      });
      
      // 获取原始图片（设置超时）
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10秒超时
      
      response = await fetch(imageUrl, {
        headers: fetchHeaders,
        signal: controller.signal,
        cf: {
          // Cloudflare 特定选项
          cacheTtl: 604800,  // 7天缓存
          cacheEverything: true,
          polish: 'lossy',    // 自动压缩
        }
      });
      
      clearTimeout(timeout);
      
      // 检查响应
      if (!response.ok) {
        return new Response(`Failed to fetch image: ${response.status}`, { 
          status: response.status 
        });
      }
      
      // 构建响应头
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=604800, s-maxage=604800');  // 7天
      headers.set('CDN-Cache-Control', 'max-age=604800');
      headers.set('X-Cache', 'MISS');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      headers.set('Access-Control-Allow-Headers', '*');
      
      // 创建响应
      response = new Response(response.body, {
        status: 200,
        headers
      });
      
      // 存入缓存
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      
      return response;
      
    } catch (error) {
      if (error.name === 'AbortError') {
        return new Response('Request timeout', { status: 504 });
      }
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
};
