/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['*'],
    unoptimized: true,
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
}

module.exports = nextConfig
