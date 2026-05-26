'use client'

import { useState } from 'react'
import GameCard from './GameCard'

interface Game {
  id: number
  title: string
  slug: string
  category: string[]
  thumbnail: string
  description: string
}

interface GameGridProps {
  games: Game[]
  initialCount?: number
}

export default function GameGrid({ games, initialCount = 18 }: GameGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, games.length))
  }

  const visibleGames = games.slice(0, visibleCount)
  const hasMore = visibleCount < games.length

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button onClick={loadMore} className="load-more-btn">
            Load more games
          </button>
        </div>
      )}

      {games.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-4xl mb-4">🎮</p>
          <p>No games found in this category.</p>
        </div>
      )}
    </>
  )
}
