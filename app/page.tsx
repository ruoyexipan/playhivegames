'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export default function Home() {
  const [visibleTrending, setVisibleTrending] = useState(32)
  const [visibleNew, setVisibleNew] = useState(16)
  const [visiblePopular, setVisiblePopular] = useState(16)
  const [visibleRecommended, setVisibleRecommended] = useState(16)

  const { games } = gamesData

  // Sort all games by played_times descending for Trending
  const trendingGames = [...games].sort((a, b) => (b.played_times || 0) - (a.played_times || 0))
  
  const newGames = games.filter((g) => g.new)
  const popularGames = games.filter((g) => g.popular)
  const recommendedGames = games.filter((g) => !g.new && !g.popular)

  // Featured cards at positions that fill the row (multiples of grid cols)
  const isFeatured = (index: number) => {
    return index === 0 || index === 8 || index === 18 || index === 28
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section with Internal Links */}
        <section className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Play Free Online Games - No Download Required
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            Discover 1500+ free HTML5 games you can play instantly in your browser. 
            Action, puzzle, racing, arcade, shooting and more!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/category?action" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              Action Games
            </Link>
            <Link href="/category?puzzle" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              Puzzle Games
            </Link>
            <Link href="/category?racing" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              Racing Games
            </Link>
            <Link href="/category?arcade" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              Arcade Games
            </Link>
            <Link href="/category?shooting" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              Shooting Games
            </Link>
          </div>
        </section>

        {/* Trending Games - sorted by played times */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔥</span>
            <span>Play Trending Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {trendingGames.slice(0, visibleTrending).map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                featured={isFeatured(index)}
              />
            ))}
          </div>
          {visibleTrending < trendingGames.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleTrending(prev => Math.min(prev + 32, trendingGames.length))}
                className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                Load more games
              </button>
            </div>
          )}
        </section>

        {/* Category Quick Links */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { id: 'action', name: 'Action Games', icon: '⚔️', count: '~200' },
              { id: 'puzzle', name: 'Puzzle Games', icon: '🧩', count: '~180' },
              { id: 'racing', name: 'Racing Games', icon: '🏁', count: '~150' },
              { id: 'arcade', name: 'Arcade Games', icon: '🕹️', count: '~120' },
              { id: 'shooting', name: 'Shooting Games', icon: '🔫', count: '~100' },
              { id: 'sports', name: 'Sports Games', icon: '⚽', count: '~80' },
            ].map((cat) => (
              <Link
                key={cat.id}
                href={`/category?slug=${cat.id}`}
                className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <div className="font-medium text-sm">{cat.name}</div>
                  <div className="text-xs text-slate-400">{cat.count} games</div>
                </div>
              </Link>
            ))}
          </div>
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

        {/* SEO Content Section */}
        <section className="mb-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">About PlayHive Games</h2>
          <p className="text-slate-300 mb-4">
            PlayHive Games is your ultimate destination for free online gaming. 
            With over 1500 HTML5 games across 22 categories, we offer instant entertainment 
            without any downloads or signups.
          </p>
          <p className="text-slate-300 mb-4">
            Whether you are looking for <Link href="/category?action" className="text-indigo-400 hover:underline">action games</Link>, 
            <Link href="/category?puzzle" className="text-indigo-400 hover:underline"> puzzle games</Link>, 
            <Link href="/category?racing" className="text-indigo-400 hover:underline"> racing games</Link>, or 
            <Link href="/category?arcade" className="text-indigo-400 hover:underline"> arcade classics</Link>, 
            we have something for everyone.
          </p>
          <p className="text-slate-300">
            All games run directly in your browser - no Flash, no plugins required. 
            Play on desktop, tablet, or mobile devices anytime, anywhere.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  )
}
