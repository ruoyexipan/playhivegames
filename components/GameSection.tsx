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
  trending?: boolean
  new?: boolean
  popular?: boolean
}

interface GameSectionProps {
  title: string
  games: Game[]
  initialCount?: number
}

export default function GameSection({ title, games, initialCount = 12 }: GameSectionProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, games.length))
  }

  const visibleGames = games.slice(0, visibleCount)
  const hasMore = visibleCount < games.length

  return (
    <section className="mb-12">
      <h2 className="section-title">
        <span className="text-3xl">🔥</span>
        <span>{title}</span>
      </h2>

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
    </section>
  )
}
