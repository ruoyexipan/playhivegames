'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export default function GamePage() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug') || ''
  
  const [game, setGame] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [dislikeCount, setDislikeCount] = useState(0)
  const [pageUrl, setPageUrl] = useState('')
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)

  useEffect(() => {
    setPageUrl(window.location.href)
    
    // 检测是否是移动设备
    const checkMobile = () => {
      const userAgent = navigator.userAgent || ''
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      setIsMobile(mobile)
    }
    checkMobile()
    
    if (slug) {
      const foundGame = gamesData.games.find((g) => g.slug === slug)
      if (foundGame) {
        setGame(foundGame)
        setLikeCount(((foundGame.id * 123 + 456) % 1000))
        setDislikeCount(((foundGame.id * 456 + 789) % 300))
      }
    }
  }, [slug])

  if (!game) {
    return (
      <main className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-6xl mb-4">😞</p>
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <Link href="/" className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500">
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  // 按浏览量排序的热门游戏
  const trendingGames = [...gamesData.games]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 50)
  
  // Related Games: 同分类下的10个游戏（排除当前游戏）
  const relatedGames = game
    ? gamesData.games
        .filter((g) => g.id !== game.id && g.category.some((cat: string) => game.category.includes(cat)))
        .slice(0, 10)
    : []

  // 生成分享链接
  const getShareUrl = () => {
    const url = pageUrl || `https://playhivegames.com/game?slug=${slug}`
    return encodeURIComponent(url)
  }
  
  const getShareText = () => {
    return encodeURIComponent(`Play ${game.title} online for free on PlayHive Games!`)
  }
  
  // 复制链接
  const copyLink = () => {
    const url = pageUrl || `https://playhivegames.com/game?slug=${slug}`
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied!')
    })
  }
  
  // 原生分享（移动端）
  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: `Play ${game.title} online for free!`,
        url: pageUrl || `https://playhivegames.com/game?slug=${slug}`
      })
    }
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Game Container */}
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <div className="relative" style={{ paddingBottom: isMobile ? '120%' : '62.5%' }}>
                {isLoading && !hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto mb-3"></div>
                      <p className="text-slate-400 text-sm">Loading game...</p>
                    </div>
                  </div>
                )}
                {hasError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                    <img src={game.thumbnail} alt={game.title} className="w-48 h-36 object-cover rounded-lg mb-4" />
                    <p className="text-slate-400 mb-4 text-sm">This game cannot be embedded</p>
                    <a href={game.iframe} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors font-medium">
                      🎮 Play Now (Opens in New Tab)
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={game.iframe}
                    className="absolute inset-0 w-full h-full border-0"
                    width={isMobile ? "720" : "1280"}
                    height={isMobile ? "1080" : "720"}
                    frameBorder="0"
                    allowFullScreen
                    title={game.title}
                    onLoad={() => setIsLoading(false)}
                    onError={() => { setIsLoading(false); setHasError(true); }}
                    {...(!isMobile && { sandbox: "allow-scripts allow-same-origin allow-popups allow-forms allow-modals" })}
                  />
                )}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold mb-3">{game.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-400 hidden sm:inline">Played {((game.id * 1234) % 100000).toLocaleString()} times</span>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500 font-bold">{Math.round(likeCount / (likeCount + dislikeCount) * 100)}%</span>
                    <span className="text-slate-400">({likeCount}/{likeCount + dislikeCount})</span>
                  </div>
                  <button onClick={() => { if (!liked) { setLikeCount(prev => prev + 1); if (disliked) { setDislikeCount(prev => prev - 1); setDisliked(false); } } else { setLikeCount(prev => prev - 1); } setLiked(!liked); }} className={`${liked ? 'text-green-500' : 'text-slate-400 hover:text-green-500'} transition-colors cursor-pointer`}>👍</button>
                  <button onClick={() => { if (!disliked) { setDislikeCount(prev => prev + 1); if (liked) { setLikeCount(prev => prev - 1); setLiked(false); } } else { setDislikeCount(prev => prev - 1); } setDisliked(!disliked); }} className={`${disliked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'} transition-colors cursor-pointer`}>👎</button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a href={game.iframe} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">🔗 Open in new window</a>
                <button onClick={() => { const iframe = document.querySelector('iframe'); if (iframe?.requestFullscreen) { iframe.requestFullscreen(); } }} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">⛶ Fullscreen</button>
                <button onClick={() => setReportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">🐛 Report</button>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}&quote=${getShareText()}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded hover:bg-blue-500 transition-colors" title="Share on Facebook">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${getShareUrl()}&text=${getShareText()}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-sky-500 rounded hover:bg-sky-400 transition-colors" title="Share on Twitter">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={`https://api.whatsapp.com/send?text=${getShareText()}%20${getShareUrl()}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-green-600 rounded hover:bg-green-500 transition-colors" title="Share on WhatsApp">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <h2 className="font-bold mb-2">About {game.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{game.description}</p>
              
              {/* Game Info */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-700 rounded-lg p-3">
                  <h3 className="text-xs text-slate-400 mb-1">Category</h3>
                  <p className="text-sm font-medium capitalize">{game.category.join(', ')}</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <h3 className="text-xs text-slate-400 mb-1">Platform</h3>
                  <p className="text-sm font-medium">Web Browser</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <h3 className="text-xs text-slate-400 mb-1">Technology</h3>
                  <p className="text-sm font-medium">HTML5</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <h3 className="text-xs text-slate-400 mb-1">Price</h3>
                  <p className="text-sm font-medium">Free</p>
                </div>
              </div>
              
              {/* How to Play */}
              <div className="mt-4">
                <h3 className="font-bold mb-2">How to Play {game.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {game.title} is a free online {game.category[0] || 'browser'} game that you can play directly in your web browser. 
                  No download or installation required. Simply click the play button and enjoy the game. 
                  This HTML5 game works on both desktop and mobile devices.
                </p>
              </div>
              
              {/* Game Features */}
              <div className="mt-4">
                <h3 className="font-bold mb-2">Game Features</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Free to play - no registration required</li>
                  <li>• Works on desktop and mobile browsers</li>
                  <li>• HTML5 technology - no plugins needed</li>
                  <li>• Instant loading - play immediately</li>
                  <li>• Regular updates and new content</li>
                </ul>
              </div>
              
              {/* FAQ Section */}
              <div className="mt-6 pt-4 border-t border-slate-700">
                <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Is {game.title} free to play?</h4>
                    <p className="text-slate-300 text-sm">Yes, {game.title} is completely free to play on PlayHive Games. No payment or registration required.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Can I play {game.title} on mobile?</h4>
                    <p className="text-slate-300 text-sm">Yes, {game.title} works on mobile browsers. The game is built with HTML5 technology, making it compatible with smartphones and tablets.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Do I need to download {game.title}?</h4>
                    <p className="text-slate-300 text-sm">No, you don't need to download anything. {game.title} runs directly in your web browser.</p>
                  </div>
                </div>
              </div>
              
              {/* External Links */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <h3 className="font-bold mb-2">More Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://www.crazygames.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                      More free online games at CrazyGames
                    </a>
                  </li>
                  <li>
                    <a href="https://www.poki.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                      Play more games at Poki
                    </a>
                  </li>
                  <li>
                    <a href="https://html5test.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                      Check your browser HTML5 support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <h2 className="font-bold mb-2">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {game.category.map((cat: string) => (
                  <Link key={cat} href={`/category/${cat}`} className="px-3 py-1 bg-slate-700 rounded-full text-xs hover:bg-slate-600 transition-colors capitalize">{cat}</Link>
                ))}
              </div>
            </div>

            {/* YOU MAY LIKE */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="font-bold mb-4">💡 YOU MAY LIKE</h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
                {trendingGames.slice(0, 24).map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-slate-800 rounded-lg p-4 sticky top-16">
              <h3 className="font-bold mb-4">Related Games</h3>
              <div className="grid grid-cols-2 gap-2">
                {relatedGames.map((g) => (
                  <Link key={g.id} href={`/game?slug=${g.slug}`} className="group">
                    <div className="aspect-square rounded overflow-hidden bg-slate-700">
                      <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" onError={(e) => { const target = e.target as HTMLImageElement; target.src = `https://placehold.co/100x100/1e293b/6366f1?text=${encodeURIComponent(g.title.charAt(0))}`; }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
