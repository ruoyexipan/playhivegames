'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

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

export default function CategoryPage() {
  const searchParams = useSearchParams()
  // Support both ?slug=arcade and ?arcade formats
  let slug = searchParams.get('slug') || ''
  if (!slug && typeof window !== 'undefined') {
    // Check if the URL has a direct category parameter
    const search = window.location.search.substring(1)
    const params = search.split('&')
    for (const param of params) {
      const key = param.split('=')[0] || param
      if (categoryNames[key]) {
        slug = key
        break
      }
    }
  }
  const [visibleCount, setVisibleCount] = useState(24)

  const categoryName = categoryNames[slug] || slug
  const filteredGames = gamesData.games.filter((game) => game.category.includes(slug))

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-6 capitalize">{categoryName}</h1>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
          {filteredGames.slice(0, visibleCount).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {visibleCount < filteredGames.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 24, filteredGames.length))}
              className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
            >
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
