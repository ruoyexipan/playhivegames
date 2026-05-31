// Cloudflare Worker - 游戏代理
// 解决 iframe 跨域问题

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 健康检查
  if (url.pathname === '/health') {
    return new Response('OK', { status: 200 })
  }
  
  // 代理游戏页面
  if (url.pathname.startsWith('/game/')) {
    // 提取游戏 slug
    const slug = url.pathname.replace('/game/', '').replace(/\/$/, '')
    
    if (!slug) {
      return new Response('Missing game slug', { status: 400 })
    }
    
    // 构建 playgama.com 的 URL
    const targetUrl = `https://playgama.com/export/game/${slug}?clid=p_ac6d9de9-2ee4-433b-90e9-ebfa9707def4`
    
    try {
      // 获取游戏页面
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        }
      })
      
      // 创建新的响应，添加 CORS 头
      const modified = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      })
      
      // 添加 CORS 头
      modified.headers.set('Access-Control-Allow-Origin', '*')
      modified.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
      modified.headers.set('Access-Control-Allow-Headers', '*')
      
      // 添加缓存头
      modified.headers.set('Cache-Control', 'public, max-age=3600')
      
      return modified
      
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 })
    }
  }
  
  // 代理静态资源
  if (url.pathname.startsWith('/static/') || url.pathname.startsWith('/assets/')) {
    const targetUrl = `https://playgama.com${url.pathname}`
    
    try {
      const response = await fetch(targetUrl)
      
      const modified = new Response(response.body, {
        status: response.status,
        headers: response.headers
      })
      
      modified.headers.set('Access-Control-Allow-Origin', '*')
      modified.headers.set('Cache-Control', 'public, max-age=604800')
      
      return modified
      
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 })
    }
  }
  
  // 默认：返回 404
  return new Response('Not Found', { status: 404 })
}
