'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export default function HomeClient() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
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

  if (!searchQuery) return null

  return (
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
              <button
                onClick={() => setVisibleSearch(prev => Math.min(prev + 24, searchResults.length))}
                className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                Load more games
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <p className="text-4xl mb-4">🔍</p>
          <p>No games found for &quot;{searchQuery}&quot;</p>
          <Link href="/" className="text-indigo-400 hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      )}
    </section>
  )
}
