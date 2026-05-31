import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'

// 所有分类
const categoryNames: Record<string, string> = {
  '3d': '3D Games',
  'action': 'Action Games',
  'adventure': 'Adventure Games',
  'arcade': 'Arcade Games',
  'archery': 'Archery Games',
  'boys': 'Games for Boys',
  'bubble-shooter': 'Bubble Shooter Games',
  'clicker': 'Clicker Games',
  'desktop': 'Desktop Games',
  'driving': 'Driving Games',
  'fighting': 'Fighting Games',
  'girls': 'Games for Girls',
  'html5': 'HTML5 Games',
  'hypercasual': 'Hypercasual Games',
  'logic': 'Logic Games',
  'multiplayer': 'Multiplayer Games',
  'puzzle': 'Puzzle Games',
  'racing': 'Racing Games',
  'shooting': 'Shooting Games',
  'sports': 'Sports Games',
  'strategy': 'Strategy Games',
  'stunt': 'Stunt Games',
}

// 生成所有分类的静态参数
export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    slug: slug,
  }))
}

// 生成元数据
export function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const categoryName = categoryNames[slug] || slug
  
  return {
    title: `${categoryName} - Play Free Online Games | PlayHive Games`,
    description: `Play the best ${categoryName.toLowerCase()} online for free on PlayHive Games. No download required.`,
    openGraph: {
      title: `${categoryName} - PlayHive Games`,
      description: `Play the best ${categoryName.toLowerCase()} online for free.`,
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const categoryName = categoryNames[slug] || slug
  const filteredGames = gamesData.games.filter((game) => game.category.includes(slug))

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-6 capitalize">{categoryName}</h1>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-4">🎮</p>
            <p>No games found in this category.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
