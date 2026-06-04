'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export default function HomeClient() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  
  const [visibleTrending, setVisibleTrending] = useState(32)
  const [visibleNew, setVisibleNew] = useState(16)
  const [visiblePopular, setVisiblePopular] = useState(16)
  const [visibleRecommended, setVisibleRecommended] = useState(16)
  const [visibleSearch, setVisibleSearch] = useState(24)

  const { games } = gamesData

  const searchResults = searchQuery
    ? games.filter((g) => {
        const query = searchQuery.toLowerCase()
        return (
          g.title.toLowerCase().includes(query) ||
          g.description?.toLowerCase().includes(query) ||
          g.category.some(c => c.toLowerCase().includes(query))
        )
      })
    : []

  const trendingGames = [...games].sort((a, b) => (b.views || 0) - (a.views || 0))
  const popularGames = [...games].sort((a, b) => (b.upvote || 0) - (a.upvote || 0)).slice(0, 50)
  const newGames = [...games].sort((a, b) => (a.created_date || '').localeCompare(b.created_date || '')).slice(0, 50)
  const recommendedGames = games.filter((g) => !g.new && !g.popular)

  const isFeatured = (index: number) => {
    return index === 0 || index === 8 || index === 18 || index === 28
  }

  return (
    <>
      {/* Search Results */}
      {searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            Search results for: &quot;{searchQuery}&quot; ({searchResults.length} games found)
          </h2>
          {searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
                {searchResults.slice(0, visibleSearch).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
              {visibleSearch < searchResults.length && (
                <div className="flex justify-center mt-6">
                  <button onClick={() => setVisibleSearch(prev => Math.min(prev + 24, searchResults.length))} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm">Load more games</button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-4">🔍</p>
              <p>No games found for &quot;{searchQuery}&quot;</p>
              <Link href="/" className="text-indigo-400 hover:underline mt-4 inline-block">Back to Home</Link>
            </div>
          )}
        </section>
      )}

      {/* Trending Games */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔥</span>
            <span>Play Trending Browser Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {trendingGames.slice(0, visibleTrending).map((game, index) => (
              <GameCard key={game.id} game={game} featured={isFeatured(index)} />
            ))}
          </div>
          {visibleTrending < trendingGames.length && (
            <div className="flex justify-center mt-6">
              <button onClick={() => setVisibleTrending(prev => Math.min(prev + 32, trendingGames.length))} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm">Load more games</button>
            </div>
          )}
        </section>
      )}

      {/* New Games */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🆕</span>
            <span>Fresh Titles Added to Our Online Games Weekly</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {newGames.slice(0, visibleNew).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {visibleNew < newGames.length && (
            <div className="flex justify-center mt-6">
              <button onClick={() => setVisibleNew(prev => Math.min(prev + 16, newGames.length))} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm">Load more games</button>
            </div>
          )}
        </section>
      )}

      {/* Popular Games */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⭐</span>
            <span>Most Popular Free Online Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {popularGames.slice(0, visiblePopular).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {visiblePopular < popularGames.length && (
            <div className="flex justify-center mt-6">
              <button onClick={() => setVisiblePopular(prev => Math.min(prev + 16, popularGames.length))} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm">Load more games</button>
            </div>
          )}
        </section>
      )}

      {/* You May Like */}
      {!searchQuery && (
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
              <button onClick={() => setVisibleRecommended(prev => Math.min(prev + 16, recommendedGames.length))} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm">Load more games</button>
            </div>
          )}
        </section>
      )}
    </>
  )
}
