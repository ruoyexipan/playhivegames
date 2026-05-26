/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Static export for Cloudflare Pages
  output: 'export',
  
  // Optimize images
  images: {
    unoptimized: true,
  },
  
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
