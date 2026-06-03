'use client'

import Link from 'next/link'
import { useRef, useCallback } from 'react'

interface Game {
  id: number
  title: string
  slug: string
  category: string[]
  thumbnail: string
  iframe?: string
  description: string
}

interface GameCardProps {
  game: Game
  featured?: boolean
}

// 全局预加载缓存
const preloadedIframes = new Set<string>()
let preloadContainer: HTMLDivElement | null = null

// 创建隔离的预加载容器
function getPreloadContainer() {
  if (!preloadContainer) {
    preloadContainer = document.createElement('div')
    preloadContainer.id = 'iframe-preload-container'
    preloadContainer.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:0;height:0;overflow:hidden;pointer-events:none;z-index:-1;'
    document.body.appendChild(preloadContainer)
  }
  return preloadContainer
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  
  const rating = ((game.id * 7 + 3) % 20 + 70)
  const stars = Math.floor(rating / 20)
  const categoryName = game.category[0]?.replace('-', ' ') || 'game'
  
  // Hover 时预加载 iframe
  const handleMouseEnter = useCallback(() => {
    const iframeUrl = game.iframe
    if (!iframeUrl || preloadedIframes.has(iframeUrl)) return
    
    // 创建隐藏的 iframe 预加载（使用 fixed 容器隔离）
    const iframe = document.createElement('iframe')
    iframe.src = iframeUrl
    iframe.style.cssText = 'width:1px;height:1px;border:none;opacity:0;'
    iframeRef.current = iframe
    
    const container = getPreloadContainer()
    container.appendChild(iframe)
    preloadedIframes.add(iframeUrl)
    
    // 30秒后清理
    setTimeout(() => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe)
      }
      preloadedIframes.delete(iframeUrl)
    }, 30000)
  }, [game.iframe])
  
  return (
    <Link 
      href={`/game/${game.slug}`} 
      className={`block group ${featured ? 'col-span-2 row-span-2' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative overflow-hidden rounded-lg bg-slate-800">
        <div className={`${featured ? 'aspect-square' : 'aspect-[4/3]'}`}>
          <img
            src={game.thumbnail}
            alt={`${game.title} - Free online ${categoryName} game | PlayHive Games`}
            title={`Play ${game.title} online for free`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/400x300/1e293b/6366f1?text=${encodeURIComponent(game.title.substring(0, 20))}`
            }}
          />
        </div>
        
        {/* Hover overlay with stars and title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < stars ? 'text-yellow-400' : 'text-gray-500'}`}>
                ★
              </span>
            ))}
          </div>
          <h3 className="text-xs font-medium text-white leading-tight line-clamp-2">{game.title}</h3>
        </div>
        
        {/* 预加载指示器 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Preloading..."></div>
        </div>
      </div>
    </Link>
  )
}
