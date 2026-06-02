/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用压缩
  compress: true,
  
  // 静态导出
  output: 'export',
  
  // 图片优化
  images: {
    unoptimized: true,
    domains: ['img.playhivegames.com', 'tubhai.com', 'playgama.com', 'playhop.com'],
  },
  
  // React 严格模式
  reactStrictMode: true,
  
  // 优化构建
  experimental: {
    // 优化包大小
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Webpack 优化
  webpack: (config, { isServer }) => {
    // 优化代码分割
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        games: {
          test: /[\\/]data[\\/]games\.json/,
          name: 'games-data',
          chunks: 'all',
          priority: 20,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
        },
      },
    }
    
    return config
  },
}

module.exports = nextConfig
