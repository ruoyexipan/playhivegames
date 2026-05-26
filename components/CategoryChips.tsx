'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
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

export default function CategoryChips() {
  const pathname = usePathname()
  const currentCategory = pathname.split('/').pop()

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        <Link
          href="/"
          className={`category-chip ${pathname === '/' ? 'active' : ''}`}
        >
          🏠 All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className={`category-chip ${currentCategory === cat.id ? 'active' : ''}`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
