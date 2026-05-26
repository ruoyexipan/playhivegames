'use client'

import Link from 'next/link'
import { useState } from 'react'

const allCategories = [
  { id: '3d', name: '3D', icon: '🎮' },
  { id: 'action', name: 'Action', icon: '⚔️' },
  { id: 'adventure', name: 'Adventure', icon: '🧭' },
  { id: 'arcade', name: 'Arcade', icon: '🕹️' },
  { id: 'archery', name: 'Archery', icon: '🏹' },
  { id: 'boys', name: 'Boys', icon: '👦' },
  { id: 'bubble-shooter', name: 'Bubble Shooter', icon: '🫧' },
  { id: 'clicker', name: 'Clicker', icon: '👆' },
  { id: 'desktop', name: 'Desktop', icon: '💻' },
  { id: 'driving', name: 'Driving', icon: '🏎️' },
  { id: 'fighting', name: 'Fighting', icon: '🥊' },
  { id: 'girls', name: 'Girls', icon: '👧' },
  { id: 'html5', name: 'HTML5', icon: '🌐' },
  { id: 'hypercasual', name: 'Hypercasual', icon: '🎯' },
  { id: 'logic', name: 'Logic', icon: '🧠' },
  { id: 'multiplayer', name: 'Multiplayer', icon: '👥' },
  { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
  { id: 'racing', name: 'Racing', icon: '🏁' },
  { id: 'shooting', name: 'Shooting', icon: '🔫' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'strategy', name: 'Strategy', icon: '♟️' },
  { id: 'stunt', name: 'Stunt', icon: '🤸' },
]

const visibleCategories = allCategories.slice(0, 10)
const moreCategories = allCategories.slice(10)

export default function Navbar() {
  const [showMore, setShowMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-11 gap-2">
            {/* Home */}
            <Link
              href="/"
              className="flex items-center gap-1 px-3 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex-shrink-0"
            >
              🏠 Home
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-600 flex-shrink-0"></div>

            {/* Categories */}
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-hide min-w-0">
              {visibleCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="flex items-center gap-1 px-2.5 h-8 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-xs whitespace-nowrap transition-colors flex-shrink-0"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}

              {/* MORE Button */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-1 px-2.5 h-8 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-xs whitespace-nowrap transition-colors flex-shrink-0"
              >
                MORE
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-600 flex-shrink-0"></div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-shrink-0">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search game"
                  className="w-40 px-3 h-8 bg-slate-700 rounded-l-lg text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 h-8 bg-slate-600 hover:bg-slate-500 rounded-r-lg transition-colors"
                >
                  🔍
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* MORE Dropdown */}
      {showMore && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <div
            className="absolute top-14 right-4 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-700">
              <h3 className="text-sm font-semibold text-white">More Categories</h3>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {moreCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors"
                  onClick={() => setShowMore(false)}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
