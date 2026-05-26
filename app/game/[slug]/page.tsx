'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

export const runtime = 'edge'

interface GamePageProps {
  params: {
    slug: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const { slug } = params
  const game = gamesData.games.find((g) => g.slug === slug)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(((game?.id || 1) * 123 + 456) % 1000)
  const [dislikeCount, setDislikeCount] = useState(((game?.id || 1) * 456 + 789) % 300)
  const [visibleRelated, setVisibleRelated] = useState(15)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [])

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

  const trendingGames = gamesData.games.filter((g) => g.trending === true).slice(0, 15)

  const handleReport = () => {
    setReportSubmitted(true)
    setTimeout(() => {
      setReportOpen(false)
      setReportSubmitted(false)
    }, 2000)
  }

  const handleFacebookShare = () => {
    const url = encodeURIComponent(pageUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400')
  }

  const handleTwitterShare = () => {
    const url = encodeURIComponent(pageUrl)
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank', 'width=600,height=400')
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Game Container */}
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
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
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-48 h-36 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                    <p className="text-slate-400 mb-4 text-sm">This game cannot be embedded</p>
                    <a
                      href={game.iframe}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors font-medium"
                    >
                      🎮 Play Now (Opens in New Tab)
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={game.iframe}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    allow="autoplay; fullscreen; gamepad; keyboard-while-not-occupied; accelerometer; gyroscope"
                    title={game.title}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false)
                      setHasError(true)
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                  />
                )}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-bold">{game.title}</h1>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-400 hidden sm:inline">Played {((game.id * 1234) % 100000).toLocaleString()} times</span>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500 font-bold">{Math.round(likeCount / (likeCount + dislikeCount) * 100)}%</span>
                    <span className="text-slate-400">({likeCount}/{likeCount + dislikeCount})</span>
                  </div>
                  <button 
                    onClick={() => {
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
                    }}
                    className={`${liked ? 'text-green-500' : 'text-slate-400 hover:text-green-500'} transition-colors cursor-pointer`}
                  >
                    👍
                  </button>
                  <button 
                    onClick={() => {
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
                    }}
                    className={`${disliked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'} transition-colors cursor-pointer`}
                  >
                    👎
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={game.iframe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors"
                >
                  🔗 Open in new window
                </a>
                <button
                  onClick={() => {
                    const iframe = document.querySelector('iframe')
                    if (iframe?.requestFullscreen) {
                      iframe.requestFullscreen()
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors"
                >
                  ⛶ Fullscreen
                </button>
                <button 
                  onClick={() => setReportOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors"
                >
                  🐛 Report
                </button>
                <button
                  onClick={handleFacebookShare}
                  className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded hover:bg-blue-500 transition-colors"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button
                  onClick={handleTwitterShare}
                  className="w-8 h-8 flex items-center justify-center bg-sky-500 rounded hover:bg-sky-400 transition-colors"
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Categories */}
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {game.category.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat}`}
                    className="px-3 py-1 bg-slate-700 rounded-full text-xs hover:bg-slate-600 transition-colors capitalize"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* YOU MAY LIKE */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="font-bold mb-4">💡 YOU MAY LIKE</h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
                {trendingGames.slice(0, visibleRelated).map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
              {visibleRelated < trendingGames.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setVisibleRelated(prev => Math.min(prev + 15, trendingGames.length))}
                    className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors text-sm"
                  >
                    Load more games
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related Games */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-slate-800 rounded-lg p-4 sticky top-16">
              <h3 className="font-bold mb-4">Related Games</h3>
              <div className="grid grid-cols-3 gap-2">
                {trendingGames.map((g) => (
                  <Link key={g.id} href={`/game/${g.slug}`} className="group">
                    <div className="aspect-square rounded overflow-hidden bg-slate-700">
                      <img
                        src={g.thumbnail}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://via.placeholder.com/100/1e293b/6366f1?text=${encodeURIComponent(g.title.charAt(0))}`
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setReportOpen(false)}>
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Report Game</h3>
            {reportSubmitted ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">✅</p>
                <p className="text-green-400">Thank you for your report!</p>
              </div>
            ) : (
              <>
                <p className="text-slate-300 text-sm mb-4">
                  Please describe the issue with this game:
                </p>
                <textarea
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                  rows={4}
                  placeholder="Describe the problem..."
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setReportOpen(false)}
                    className="px-4 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReport}
                    className="px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-500 transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
