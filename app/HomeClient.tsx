'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import GameCard from '@/components/GameCard'
import VirtualGameGrid from '@/components/VirtualGameGrid'
import gamesData from '@/data/games.json'

export default function HomeClient() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  
  const [visibleTrending, setVisibleTrending] = useState(32)

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
  const recommendedGames = games.slice(0, 50)

  const isFeatured = (index: number) => {
    return index === 0 || index === 8 || index === 18 || index === 28
  }

  // Trending games with featured cards
  const visibleTrendingGames = useMemo(() => {
    return trendingGames.slice(0, visibleTrending)
  }, [trendingGames, visibleTrending])

  return (
    <>
      {/* Search Results */}
      {searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            Search results for: &quot;{searchQuery}&quot; ({searchResults.length} games found)
          </h2>
          {searchResults.length > 0 ? (
            <VirtualGameGrid games={searchResults} initialCount={24} loadMoreCount={24} />
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-4">🔍</p>
              <p>No games found for &quot;{searchQuery}&quot;</p>
              <Link href="/" className="text-indigo-400 hover:underline mt-4 inline-block">Back to Home</Link>
            </div>
          )}
        </section>
      )}

      {/* Trending Games - 保持原来的 featured 卡片 */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔥</span>
            <span>Play Trending Browser Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {visibleTrendingGames.map((game, index) => (
              <GameCard key={game.id} game={game} featured={isFeatured(index)} />
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
      )}

      {/* New Games */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🆕</span>
            <span>Fresh Titles Added to Our Online Games Weekly</span>
          </h2>
          <VirtualGameGrid games={newGames} initialCount={16} loadMoreCount={16} />
        </section>
      )}

      {/* Popular Games */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⭐</span>
            <span>Most Popular Free Online Games</span>
          </h2>
          <VirtualGameGrid games={popularGames} initialCount={16} loadMoreCount={16} />
        </section>
      )}

      {/* You May Like */}
      {!searchQuery && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💡</span>
            <span>YOU MAY LIKE</span>
          </h2>
          <VirtualGameGrid games={recommendedGames} initialCount={16} loadMoreCount={16} />
        </section>
      )}
    </>
  )
}
