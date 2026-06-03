'use client'

import Link from 'next/link'

interface Game {
  id: number
  title: string
  slug: string
  category: string[]
  thumbnail: string
  iframe?: string
  description: string
}

interface GameCardProps {
  game: Game
  featured?: boolean
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  // Generate consistent rating based on game id
  const rating = ((game.id * 7 + 3) % 20 + 70)
  const stars = Math.floor(rating / 20)
  const categoryName = game.category[0]?.replace('-', ' ') || 'game'
  
  return (
    <Link 
      href={`/game/${game.slug}`} 
      className={`block group ${featured ? 'col-span-2 row-span-2' : ''}`}
    >
      <div className="relative overflow-hidden rounded-lg bg-slate-800">
        <div className={`${featured ? 'aspect-square' : 'aspect-[4/3]'}`}>
          <img
            src={game.thumbnail}
            alt={`${game.title} - Free online ${categoryName} game | PlayHive Games`}
            title={`Play ${game.title} online for free`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/400x300/1e293b/6366f1?text=${encodeURIComponent(game.title.substring(0, 20))}`
            }}
          />
        </div>
        
        {/* Hover overlay with stars and title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
          {/* Stars */}
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < stars ? 'text-yellow-400' : 'text-gray-500'}`}>
                ★
              </span>
            ))}
          </div>
          {/* Title */}
          <h3 className="text-xs font-medium text-white leading-tight line-clamp-2">{game.title}</h3>
        </div>
      </div>
    </Link>
  )
}
