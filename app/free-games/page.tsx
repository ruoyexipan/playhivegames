import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export const metadata = {
  title: 'Free Online Games - Play Instantly | PlayHive Games',
  description: 'Play 2000+ free online games instantly. No download required. Action, puzzle, racing, arcade games and more. Works on all devices.',
  keywords: 'free online games, browser games, HTML5 games, play games online, no download games',
  openGraph: {
    title: 'Free Online Games - PlayHive Games',
    description: 'Play 2000+ free online games instantly. No download required.',
    url: 'https://playhivegames.com/free-games',
  },
  alternates: {
    canonical: 'https://playhivegames.com/free-games',
  },
}

export default function FreeGamesPage() {
  const popularGames = [...gamesData.games]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 50)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="mb-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Free Online Games - Play Instantly
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
            Discover 2000+ <strong>free online games</strong> that load instantly in your browser. 
            No downloads, no signups, no plugins. Play <strong>browser games</strong> on any device - 
            mobile, tablet, or desktop. Start playing now!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/category/action" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">Action</Link>
            <Link href="/category/puzzle" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">Puzzle</Link>
            <Link href="/category/racing" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">Racing</Link>
            <Link href="/category/arcade" className="px-4 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">Arcade</Link>
          </div>
        </section>

        {/* Popular Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Most Popular Free Games</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mb-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Why Play Free Online Games?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">No Downloads Required</h3>
              <p>All our <strong>browser games</strong> run directly in your web browser using HTML5 technology.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Play on Any Device</h3>
              <p>Our <strong>free online games</strong> work on mobile, tablet, and desktop devices.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2000+ Games</h3>
              <p>From action to puzzle, racing to arcade - we have <strong>online games</strong> for everyone.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
