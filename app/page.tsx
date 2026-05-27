'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export default function Home() {
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

  const trendingGames = [...games].sort((a, b) => (b.played_times || 0) - (a.played_times || 0))
  const newGames = games.filter((g) => g.new)
  const popularGames = games.filter((g) => g.popular)
  const recommendedGames = games.filter((g) => !g.new && !g.popular)

  const isFeatured = (index: number) => {
    return index === 0 || index === 8 || index === 18 || index === 28
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
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
        )}

        {!searchQuery && (
          <>
            {/* BLUF Intro - Direct answer for AI engines */}
            <section className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                PlayHive Games - Free Online Games Platform
              </h1>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-4">
                PlayHive Games is a free online gaming platform that provides instant access to over 1,500 HTML5 games. 
                Players can browse and play games directly in their web browser without downloads, registrations, or plugins. 
                The platform covers 22 game categories including action, puzzle, racing, arcade, shooting, and sports.
              </p>
              <p className="text-white/80 max-w-2xl mx-auto mb-6">
                Founded in 2026, PlayHive Games serves thousands of daily active users across desktop and mobile devices. 
                All games are sourced from licensed HTML5 game providers and run on modern web standards.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/category?slug=action" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Action Games
                </Link>
                <Link href="/category?slug=puzzle" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Puzzle Games
                </Link>
                <Link href="/category?slug=racing" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Racing Games
                </Link>
                <Link href="/category?slug=arcade" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Arcade Games
                </Link>
                <Link href="/category?slug=shooting" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Shooting Games
                </Link>
                <Link href="/category?slug=girls" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Games for Girls
                </Link>
              </div>
            </section>

            {/* Trending Games */}
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🔥</span>
                <span>Play Trending Games</span>
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
                {trendingGames.slice(0, visibleTrending).map((game, index) => (
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

            {/* Category Quick Links */}
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Browse Games by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { id: 'action', name: 'Action Games', icon: '⚔️', count: '439' },
                  { id: 'puzzle', name: 'Puzzle Games', icon: '🧩', count: '513' },
                  { id: 'arcade', name: 'Arcade Games', icon: '🕹️', count: '342' },
                  { id: 'adventure', name: 'Adventure Games', icon: '🧭', count: '203' },
                  { id: 'girls', name: 'Games for Girls', icon: '👧', count: '30' },
                  { id: 'boys', name: 'Games for Boys', icon: '👦', count: '111' },
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

            {/* FAQ Section */}
            <section className="mb-10 bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What is PlayHive Games?</h3>
                  <p className="text-slate-300 text-sm">
                    PlayHive Games is a free online gaming platform that provides instant access to over 1,500 HTML5 games. 
                    Players can browse and play games directly in their web browser without downloads, registrations, or plugins.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do I need to download anything to play?</h3>
                  <p className="text-slate-300 text-sm">
                    No, all games on PlayHive Games run directly in your browser using HTML5 technology. 
                    No downloads, plugins, or installations are required. Simply click and play.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What types of games are available?</h3>
                  <p className="text-slate-300 text-sm">
                    PlayHive Games offers games across 22 categories including action, puzzle, racing, arcade, 
                    shooting, sports, adventure, strategy, simulation, and more. New games are added regularly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is PlayHive Games really free?</h3>
                  <p className="text-slate-300 text-sm">
                    Yes, PlayHive Games is completely free to use. All 1,500+ games are free to play with no hidden fees, 
                    premium tiers, or required registrations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I play on mobile devices?</h3>
                  <p className="text-slate-300 text-sm">
                    Yes, PlayHive Games is fully responsive and works on all devices including desktops, laptops, 
                    tablets, and smartphones running modern web browsers.
                  </p>
                </div>
              </div>
            </section>

            {/* About Section with Data Points */}
            <section className="mb-10 bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About PlayHive Games</h2>
              <p className="text-slate-300 mb-4">
                PlayHive Games launched in 2026 as a free online gaming platform. As of May 2026, 
                the platform hosts over 1,500 HTML5 games across 22 categories, serving thousands of 
                daily active users worldwide.
              </p>
              <p className="text-slate-300 mb-4">
                The platform is built using Next.js 14 and deployed on Cloudflare Pages for optimal performance. 
                All games are sourced from licensed HTML5 game providers including Playgama, ensuring legal compliance 
                and consistent quality.
              </p>
              <p className="text-slate-300 mb-4">
                Key statistics:
              </p>
              <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1">
                <li>1,500+ HTML5 games available</li>
                <li>22 game categories</li>
                <li>24 language translations</li>
                <li>Average page load time under 2 seconds</li>
                <li>99.9% uptime via Cloudflare CDN</li>
              </ul>
              <p className="text-slate-300">
                For more information, visit our <Link href="/about" className="text-indigo-400 hover:underline">About page</Link> or 
                <Link href="/contact" className="text-indigo-400 hover:underline"> contact us</Link> directly.
              </p>
            </section>

            {/* External Citations */}
            <section className="mb-10 bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Game Industry Resources</h2>
              <p className="text-slate-300 mb-4">
                PlayHive Games follows industry best practices for HTML5 game distribution. 
                For more information about browser gaming technology, see these resources:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                    MDN Web Docs - HTML Standard
                  </a> - The official HTML specification used by all browser games
                </li>
                <li>
                  <a href="https://www.w3.org/TR/html52/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                    W3C HTML5 Specification
                  </a> - The web standard powering HTML5 games
                </li>
                <li>
                  <a href="https://web.dev/performance/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                    Web.dev Performance Guide
                  </a> - Best practices for web performance optimization
                </li>
              </ul>
            </section>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
