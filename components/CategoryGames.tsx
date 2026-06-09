'use client'

import VirtualGameGrid from '@/components/VirtualGameGrid'

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
  return <VirtualGameGrid games={games} initialCount={initialCount} loadMoreCount={loadMoreCount} />
}
