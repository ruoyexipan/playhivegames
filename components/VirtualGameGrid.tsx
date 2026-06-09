'use client'

import { useState, useMemo } from 'react'
import GameCard from '@/components/GameCard'

interface Game {
  id: number
  title: string
  slug: string
  category: string[]
  thumbnail: string
  iframe?: string
  description: string
}

interface VirtualGameGridProps {
  games: Game[]
  initialCount?: number
  loadMoreCount?: number
}

export default function VirtualGameGrid({ games, initialCount = 16, loadMoreCount = 16 }: VirtualGameGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const hasMore = visibleCount < games.length

  // 使用 useMemo 缓存切片后的游戏列表
  const visibleGames = useMemo(() => {
    return games.slice(0, visibleCount)
  }, [games, visibleCount])

  if (games.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-4xl mb-4">🎮</p>
        <p>No games found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
        {visibleGames.map((game) => (
          <div key={game.id} style={{ contentVisibility: 'auto', containIntrinsicSize: '0 200px' }}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(prev => Math.min(prev + loadMoreCount, games.length))}
            className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
          >
            Load more games
          </button>
        </div>
      )}
    </>
  )
}
