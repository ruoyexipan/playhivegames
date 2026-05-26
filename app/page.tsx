'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export default function Home() {
  const [visibleTrending, setVisibleTrending] = useState(30)
  const [visibleNew, setVisibleNew] = useState(16)
  const [visiblePopular, setVisiblePopular] = useState(16)
  const [visibleRecommended, setVisibleRecommended] = useState(16)

  const { games } = gamesData

  // Sort all games by played_times descending for Trending
  const trendingGames = [...games].sort((a, b) => (b.played_times || 0) - (a.played_times || 0))
  
  const newGames = games.filter((g) => g.new)
  const popularGames = games.filter((g) => g.popular)
  const recommendedGames = games.filter((g) => !g.new && !g.popular)

  // playhive.com NEW GAMES pattern + specific game adjustments
  const isFeatured = (index: number, gameTitle: string) => {
    // Draw Bridge: Brain Game 3D - large card
    if (gameTitle.includes('Draw Bridge: Brain Game 3D')) return true
    // CrowdGate - small card (explicitly exclude)
    if (gameTitle.includes('CrowdGate')) return false
    // Default pattern
    return index === 0 || index === 9 || index === 17 || index === 26
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Trending Games - sorted by played times */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔥</span>
            <span>Play Trending Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 auto-rows-auto">
            {trendingGames.slice(0, visibleTrending).map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                featured={isFeatured(index, game.title)}
              />
            ))}
          </div>
          {visibleTrending < trendingGames.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleTrending(prev => Math.min(prev + 30, trendingGames.length))}
                className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                Load more games
              </button>
            </div>
          )}
        </section>

        {/* New Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🆕</span>
            <span>NEW GAMES</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {newGames.slice(0, visibleNew).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {visibleNew < newGames.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleNew(prev => Math.min(prev + 16, newGames.length))}
                className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                Load more games
              </button>
            </div>
          )}
        </section>

        {/* Popular Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⭐</span>
            <span>POPULAR GAMES</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {popularGames.slice(0, visiblePopular).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {visiblePopular < popularGames.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisiblePopular(prev => Math.min(prev + 16, popularGames.length))}
                className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                Load more games
              </button>
            </div>
          )}
        </section>

        {/* You May Like */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💡</span>
            <span>YOU MAY LIKE</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {recommendedGames.slice(0, visibleRecommended).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {visibleRecommended < recommendedGames.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleRecommended(prev => Math.min(prev + 16, recommendedGames.length))}
                className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                Load more games
              </button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  )
}
