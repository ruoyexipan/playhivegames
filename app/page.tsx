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

  const trendingGames = [...games].sort((a, b) => (b.views || 0) - (a.views || 0))
  
  // POPULAR GAMES: 点赞最高的前50个游戏
  const popularGames = [...games]
    .sort((a, b) => (b.upvote || 0) - (a.upvote || 0))
    .slice(0, 50)
  
  // NEW GAMES: 最新添加的游戏（按创建日期升序，旧的在前）
  const newGames = [...games]
    .sort((a, b) => {
      const dateA = a.created_date || ''
      const dateB = b.created_date || ''
      return dateA.localeCompare(dateB)
    })
    .slice(0, 50)
  
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
            {/* Hero Section with SEO Content */}
            <section className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Play Free Online Games - Instant Browser Games
              </h1>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
                Discover 2,000+ free online games you can play instantly in your browser. 
                No downloads, no signups, no plugins required. From action-packed adventures to brain-teasing puzzles, 
                our HTML5 games load in seconds and work on any device.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/category/action" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Action Games
                </Link>
                <Link href="/category/puzzle" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Puzzle Games
                </Link>
                <Link href="/category/racing" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Racing Games
                </Link>
                <Link href="/category/arcade" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Arcade Games
                </Link>
                <Link href="/category/shooting" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                  Shooting Games
                </Link>
                <Link href="/category/girls" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
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
                    href={`/category/${cat.id}`}
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

            {/* FAQ Section with Keywords */}
            <section className="mb-10 bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What is PlayHive Games?</h3>
                  <p className="text-slate-300 text-sm">
                    PlayHive Games is your go-to destination for free online games. We offer over 2,000 browser games 
                    that load instantly—no downloads, no signups, no plugins. Whether you're into action, puzzles, racing, 
                    or arcade classics, you'll find something to play in seconds.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do I need to download anything to play?</h3>
                  <p className="text-slate-300 text-sm">
                    Nope! All our games run on HTML5 technology, which means they play directly in your web browser. 
                    Just click and start playing—no installs, no waiting, no storage space needed.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What types of online games are available?</h3>
                  <p className="text-slate-300 text-sm">
                    We've got 22 categories covering everything from fast-paced action games and mind-bending puzzles 
                    to retro arcade titles and competitive multiplayer experiences. New games are added weekly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is PlayHive Games really free?</h3>
                  <p className="text-slate-300 text-sm">
                    100% free. No hidden fees, no premium tiers, no paywalls. Every game on our platform is 
                    completely free to play as much as you want.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I play on mobile devices?</h3>
                  <p className="text-slate-300 text-sm">
                    Absolutely! Our games work on phones, tablets, laptops, and desktops. The platform adapts 
                    to your screen size, so you can play wherever you are.
                  </p>
                </div>
              </div>
            </section>

            {/* About Section - SEO Optimized */}
            <section className="mb-10 bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Why PlayHive Games?</h2>
              <p className="text-slate-300 mb-4">
                We built PlayHive Games for people who want to play games without the hassle. 
                No account creation, no payment walls, no 500MB downloads. Just pick a game and play.
              </p>
              <p className="text-slate-300 mb-4">
                Our library includes 2,000+ HTML5 games across 22 categories. Whether you have 5 minutes 
                between meetings or a whole afternoon to kill, we've got you covered. Every game loads in 
                under 3 seconds and works on any modern browser.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">2,000+</div>
                  <div className="text-xs text-slate-400">Free Games</div>
                </div>
                <div className="text-center p-3 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">22</div>
                  <div className="text-xs text-slate-400">Categories</div>
                </div>
                <div className="text-center p-3 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">&lt;3s</div>
                  <div className="text-xs text-slate-400">Load Time</div>
                </div>
                <div className="text-center p-3 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">0</div>
                  <div className="text-xs text-slate-400">Downloads</div>
                </div>
              </div>
              <p className="text-slate-300">
                Ready to play? Browse our <Link href="/category/action" className="text-indigo-400 hover:underline">action games</Link>, 
                try some <Link href="/category/puzzle" className="text-indigo-400 hover:underline">puzzles</Link>, or check out 
                what's <Link href="/category/racing" className="text-indigo-400 hover:underline">racing</Link> up the charts.
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
