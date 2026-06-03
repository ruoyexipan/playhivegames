import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export const metadata = {
  title: 'Play Free Games Online - No Download Required | PlayHive Games',
  description: 'Play free games online instantly! 2000+ browser games including action, puzzle, racing & arcade. No download, no signup. Start playing now!',
  keywords: 'play free games, free games online, browser games, online games, no download games',
  openGraph: {
    title: 'Play Free Games Online - PlayHive Games',
    description: 'Play free games online instantly! 2000+ browser games, no download required.',
    url: 'https://playhivegames.com/play-free-games',
  },
  alternates: {
    canonical: 'https://playhivegames.com/play-free-games',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PlayFreeGamesPage() {
  // Get popular games
  const popularGames = [...gamesData.games]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 50)

  // Get games by category
  const actionGames = gamesData.games.filter(g => g.category.includes('action')).slice(0, 12)
  const puzzleGames = gamesData.games.filter(g => g.category.includes('puzzle')).slice(0, 12)
  const racingGames = gamesData.games.filter(g => g.category.includes('racing')).slice(0, 12)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Play Free Games Online - Instant Browser Games
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
            Want to <strong>play free games</strong> without downloading anything? You're in the right place! 
            PlayHive Games offers 2,000+ browser games that load instantly. No signups, no plugins, 
            no waiting. Just pick a game and start playing!
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
          </div>
        </section>

        {/* Why Play Free Games */}
        <section className="mb-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Why Play Free Games on PlayHive?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">No Downloads Required</h3>
              <p>
                All our games run directly in your browser. No need to install apps or download files. 
                Just click and play—it's that simple.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2,000+ Free Games</h3>
              <p>
                From action-packed adventures to brain-teasing puzzles, we have games for every taste. 
                New titles are added weekly, so there's always something fresh to play.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Play on Any Device</h3>
              <p>
                Whether you're on a phone, tablet, or computer, our games work everywhere. 
                Take your gaming on the go with mobile-friendly controls.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🔥 Most Popular Free Games</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {popularGames.slice(0, 24).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Action Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">⚔️ Play Free Action Games</h2>
          <p className="text-slate-400 text-sm mb-4">
            Looking for adrenaline-pumping action? Our free action games deliver fast-paced gameplay 
            with exciting combat, epic battles, and thrilling adventures.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {actionGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Puzzle Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🧩 Play Free Puzzle Games</h2>
          <p className="text-slate-400 text-sm mb-4">
            Challenge your brain with our collection of free puzzle games. From classic jigsaws 
            to mind-bending logic puzzles, there's something for every problem solver.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {puzzleGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Racing Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🏁 Play Free Racing Games</h2>
          <p className="text-slate-400 text-sm mb-4">
            Speed demons rejoice! Our free racing games offer high-speed thrills, challenging tracks, 
            and competitive gameplay. Race against the clock or compete with friends.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {racingGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How can I play free games online?</h3>
              <p className="text-slate-300 text-sm">
                Simply visit PlayHive Games and click on any game to start playing instantly. 
                No downloads, no signups, no plugins required. All games run directly in your browser.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Are these games really free?</h3>
              <p className="text-slate-300 text-sm">
                Yes! All 2,000+ games on PlayHive Games are completely free to play. 
                No hidden fees, no premium tiers, no paywalls. Play as much as you want!
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I play free games on my phone?</h3>
              <p className="text-slate-300 text-sm">
                Absolutely! Our games work on smartphones, tablets, laptops, and desktops. 
                The platform adapts to your screen size for the best gaming experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What types of free games are available?</h3>
              <p className="text-slate-300 text-sm">
                We offer games across 22 categories including action, puzzle, racing, arcade, 
                shooting, sports, strategy, and more. There's something for everyone!
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Play Free Games?</h2>
          <p className="text-white/90 mb-6">
            Browse our collection of 2,000+ free games and start playing instantly!
          </p>
          <Link href="/" className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-white/90 transition font-medium">
            Browse All Games
          </Link>
        </section>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How can I play free games online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Simply visit PlayHive Games and click on any game to start playing instantly. No downloads, no signups, no plugins required.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are these games really free?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! All 2,000+ games on PlayHive Games are completely free to play. No hidden fees, no premium tiers, no paywalls.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I play free games on my phone?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely! Our games work on smartphones, tablets, laptops, and desktops.',
                  },
                },
              ],
            }),
          }}
        />
      </div>
      <Footer />
    </main>
  )
}
