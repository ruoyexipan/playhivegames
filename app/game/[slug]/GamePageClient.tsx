'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import GameHead from '@/components/GameHead'
import gamesData from '@/data/games.json'

interface GamePageClientProps {
  slug: string
}

export default function GamePageClient({ slug }: GamePageClientProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [dislikeCount, setDislikeCount] = useState(0)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [reportMessage, setReportMessage] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  const game = gamesData.games.find((g) => g.slug === slug)
  
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || ''
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      setIsMobile(mobile)
    }
    checkMobile()
    
    // 初始化点赞数（模拟数据）
    if (game) {
      setLikeCount(((game.id * 123 + 456) % 1000))
      setDislikeCount(((game.id * 456 + 789) % 300))
    }
  }, [game])
  
  // 全屏功能
  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen()
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen()
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen()
      }
    }
  }
  
  // 点赞
  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1)
      if (disliked) {
        setDislikeCount(prev => prev - 1)
        setDisliked(false)
      }
    } else {
      setLikeCount(prev => prev - 1)
    }
    setLiked(!liked)
  }
  
  // 踩
  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(prev => prev + 1)
      if (liked) {
        setLikeCount(prev => prev - 1)
        setLiked(false)
      }
    } else {
      setDislikeCount(prev => prev - 1)
    }
    setDisliked(!disliked)
  }
  
  // 举报
  const handleReport = () => {
    const subject = encodeURIComponent(`Report Issue: ${game?.title || 'Unknown Game'}`)
    const body = encodeURIComponent(
      `Game: ${game?.title || 'Unknown'}\nURL: https://playhivegames.com/game/${slug}\n\nIssue Description:\n${reportMessage}`
    )
    window.open(`mailto:zhaolinhao6@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setReportSubmitted(true)
    setTimeout(() => {
      setReportOpen(false)
      setReportSubmitted(false)
      setReportMessage('')
    }, 2000)
  }
  
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
  const relatedGames = gamesData.games
    .filter((g) => g.id !== game.id && g.category.some((cat: string) => game.category.includes(cat)))
    .slice(0, 10)

  // JSON-LD Structured Data
  const videoGameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description || `Play ${game.title} online for free`,
    url: `https://playhivegames.com/game/${slug}`,
    genre: game.category[0] || 'game',
    gamePlatform: 'Web Browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    image: game.thumbnail,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '100',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://playhivegames.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: game.category[0]?.charAt(0).toUpperCase() + game.category[0]?.slice(1) || 'Games',
        item: `https://playhivegames.com/category/${game.category[0]}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: game.title,
        item: `https://playhivegames.com/game/${slug}`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <GameHead slug={slug} />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Game Container */}
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <div className="relative" style={{ paddingBottom: isMobile ? '120%' : '62.5%' }}>
                <iframe
                  ref={iframeRef}
                  src={game.iframe}
                  className="absolute inset-0 w-full h-full border-0"
                  width={isMobile ? "720" : "1280"}
                  height={isMobile ? "1080" : "720"}
                  frameBorder="0"
                  allowFullScreen
                  title={game.title}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                />
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold mb-3">{game.title}</h1>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {/* Open in new window */}
                <a href={game.iframe} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">
                  🔗 Open in new window
                </a>
                
                {/* Fullscreen */}
                <button onClick={handleFullscreen} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">
                  ⛶ Fullscreen
                </button>
                
                {/* Report */}
                <button onClick={() => setReportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">
                  🐛 Report
                </button>
              </div>
              
              {/* Like/Dislike & Share */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Like/Dislike */}
                <div className="flex items-center gap-4">
                  <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${liked ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                    👍 {likeCount}
                  </button>
                  <button onClick={handleDislike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${disliked ? 'bg-red-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                    👎 {dislikeCount}
                  </button>
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <span className="text-green-500 font-bold">{Math.round(likeCount / (likeCount + dislikeCount) * 100)}%</span>
                    <span>positive</span>
                  </div>
                </div>
                
                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://playhivegames.com/game/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded hover:bg-blue-500 transition-colors" title="Share on Facebook">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://playhivegames.com/game/${slug}`)}&text=${encodeURIComponent(`Play ${game.title} online for free!`)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-sky-500 rounded hover:bg-sky-400 transition-colors" title="Share on Twitter">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href={`https://reddit.com/submit?url=${encodeURIComponent(`https://playhivegames.com/game/${slug}`)}&title=${encodeURIComponent(`Play ${game.title} online for free!`)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded hover:bg-orange-500 transition-colors" title="Share on Reddit">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Report Modal */}
            {reportOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setReportOpen(false)}>
                <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4">Report an Issue</h3>
                  {reportSubmitted ? (
                    <div className="text-center py-4">
                      <p className="text-green-400 mb-2">✓ Report submitted!</p>
                      <p className="text-slate-400 text-sm">Opening email client...</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-slate-400 text-sm mb-4">
                        Describe the issue with <strong>{game.title}</strong> and we'll look into it.
                      </p>
                      <textarea
                        value={reportMessage}
                        onChange={(e) => setReportMessage(e.target.value)}
                        placeholder="Describe the issue..."
                        className="w-full bg-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-400 resize-none h-24 mb-4"
                      />
                      <div className="flex gap-2">
                        <button onClick={handleReport} className="flex-1 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium">
                          Submit Report
                        </button>
                        <button onClick={() => setReportOpen(false)} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm">
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

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
              
              {/* Game Controls */}
              <div className="mt-4">
                <h3 className="font-bold mb-2">Game Controls</h3>
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-300 text-sm">
                    Use your mouse and keyboard to control the game. 
                    Click or tap to interact with game elements. 
                    Follow in-game instructions for specific controls.
                  </p>
                </div>
              </div>
              
              {/* Game Tips */}
              <div className="mt-4">
                <h3 className="font-bold mb-2">Tips for Playing {game.title}</h3>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>• Start with the tutorial to learn the basics</li>
                  <li>• Practice regularly to improve your skills</li>
                  <li>• Watch other players to learn new strategies</li>
                  <li>• Take breaks to avoid fatigue</li>
                  <li>• Have fun and don't worry about losing!</li>
                </ul>
              </div>
              
              {/* Game Ratings */}
              <div className="mt-4">
                <h3 className="font-bold mb-2">Game Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < 4 ? 'text-yellow-400' : 'text-gray-500'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">4.0/5 (Based on player feedback)</span>
                </div>
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
                  <Link key={g.id} href={`/game/${g.slug}`} className="group">
                    <div className="aspect-square rounded overflow-hidden bg-slate-700">
                      <img src={g.thumbnail} alt={`${g.title} - Free online ${g.category[0] || 'browser'} game on PlayHive Games`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" onError={(e) => { const target = e.target as HTMLImageElement; target.src = `https://placehold.co/100x100/1e293b/6366f1?text=${encodeURIComponent(g.title.charAt(0))}`; }} />
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
