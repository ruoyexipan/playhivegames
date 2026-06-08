'use client'

import { useState } from 'react'
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

interface CategoryGamesProps {
  games: Game[]
  initialCount?: number
  loadMoreCount?: number
}

export default function CategoryGames({ games, initialCount = 16, loadMoreCount = 16 }: CategoryGamesProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  if (games.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-4xl mb-4">🎮</p>
        <p>No games found in this category.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
        {games.slice(0, visibleCount).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {visibleCount < games.length && (
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
