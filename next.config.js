/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Static export for Cloudflare Pages
  output: 'export',
  
  // Optimize images
  images: {
    unoptimized: true,
    domains: ['img.playhivegames.com', 'tubhai.com', 'playgama.com', 'playhop.com'],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
