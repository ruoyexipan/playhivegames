import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import HomeClient from './HomeClient'
import gamesData from '@/data/games.json'

export const metadata = {
  title: 'PlayHive Games | Free Online Games & Browser Games',
  description: 'Play free online games instantly at PlayHive Games. 1500+ browser games including action, puzzle, racing & arcade. No download required. Start playing now!',
  keywords: 'PlayHive Games, free online games, html5 games, browser games, no download games, action games, puzzle games, racing games, arcade games',
  openGraph: {
    title: 'PlayHive Games - Play 1500+ Free Online Games',
    description: 'PlayHive Games is a free online gaming platform with 1500+ HTML5 games. No download required.',
    url: 'https://playhivegames.com',
    siteName: 'PlayHive Games',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayHive Games - Free Online Games',
    description: 'Play 1500+ free online games at PlayHive Games. No download required.',
  },
  alternates: {
    canonical: 'https://playhivegames.com',
  },
}

export default function Home() {
  const { games } = gamesData
  
  // 按浏览量排序
  const trendingGames = [...games].sort((a, b) => (b.views || 0) - (a.views || 0))
  
  // 热门游戏（点赞最高）
  const popularGames = [...games]
    .sort((a, b) => (b.upvote || 0) - (a.upvote || 0))
    .slice(0, 50)
  
  // 最新游戏
  const newGames = [...games]
    .sort((a, b) => {
      const dateA = a.created_date || ''
      const dateB = b.created_date || ''
      return dateA.localeCompare(dateB)
    })
    .slice(0, 50)

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section - SEO 优化 */}
        <section className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Play Free Online Games and Browser Games Instantly
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
            Welcome to PlayHive Games, your ultimate destination for <strong>free online games</strong>. 
            We've handpicked 2,000+ <strong>browser games</strong> that load instantly—no downloads, no signups, no plugins. 
            Whether you're into action, puzzles, racing, or arcade classics, our collection of <strong>online games</strong> 
            has something for everyone. Start playing in seconds!
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

        {/* Why Choose PlayHive - SEO 内容 */}
        <section className="mb-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">An Unparalleled Selection of Free Online Games</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">Instant Access with No Downloads</h3>
              <p>
                Our <strong>browser games</strong> run directly in your web browser using HTML5 technology. 
                No waiting for downloads, no installation wizards, no storage space needed. 
                Just click and play—it's that simple.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Discover an Extensive Library of Online Games</h3>
              <p>
                From brain-teasing puzzles to adrenaline-pumping action, our library of 
                <strong> free online games</strong> covers every genre. New titles are added weekly, 
                so there's always something fresh to discover.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Play Online Games Across All Devices</h3>
              <p>
                Whether you're on a lunch break, commuting, or relaxing at home, our 
                <strong> online games</strong> work on any device. Phones, tablets, laptops—
                if it has a browser, it can run our games.
              </p>
            </div>
          </div>
        </section>

        {/* 搜索功能（客户端组件） */}
        <HomeClient />

        {/* Trending Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔥</span>
            <span>Play Trending Browser Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {trendingGames.slice(0, 32).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">The Advantages of Our Browser Games Platform</h2>
          <p className="text-slate-400 text-sm mb-4">
            Explore our massive collection of <strong>free online games</strong> organized by category. 
            Whether you're looking for quick <strong>browser games</strong> for a break or deep 
            <strong>online games</strong> for a long session, we've got you covered.
          </p>
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
            <span>Fresh Titles Added to Our Online Games Weekly</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {newGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Popular Games */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⭐</span>
            <span>Most Popular Free Online Games</span>
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* About Section */}
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
      </div>

      <Footer />
    </main>
  )
}
