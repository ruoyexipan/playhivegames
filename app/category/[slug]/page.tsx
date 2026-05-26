'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export const runtime = 'edge'

const categoryNames: Record<string, string> = {
  '3d': '3D Games',
  'action': 'Action Games',
  'adventure': 'Adventure Games',
  'arcade': 'Arcade Games',
  'archery': 'Archery Games',
  'boys': 'Games for Boys',
  'bubble-shooter': 'Bubble Shooter Games',
  'clicker': 'Clicker Games',
  'desktop': 'Desktop Games',
  'driving': 'Driving Games',
  'fighting': 'Fighting Games',
  'girls': 'Games for Girls',
  'html5': 'HTML5 Games',
  'hypercasual': 'Hypercasual Games',
  'logic': 'Logic Games',
  'multiplayer': 'Multiplayer Games',
  'puzzle': 'Puzzle Games',
  'racing': 'Racing Games',
  'shooting': 'Shooting Games',
  'sports': 'Sports Games',
  'strategy': 'Strategy Games',
  'stunt': 'Stunt Games',
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const [visibleCount, setVisibleCount] = useState(18)

  if (!categoryNames[slug]) {
    notFound()
  }

  const filteredGames = gamesData.games.filter((game) =>
    game.category.includes(slug)
  )

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredGames.length))
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Header */}
        <h1 className="text-xl font-bold mb-6">
          {categoryNames[slug]}
        </h1>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredGames.slice(0, visibleCount).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {visibleCount < filteredGames.length && (
          <div className="flex justify-center mt-8">
            <button onClick={loadMore} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors">
              Load more games
            </button>
          </div>
        )}

        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-4">🎮</p>
            <p>No games found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
