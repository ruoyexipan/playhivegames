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

// 分类描述
const categoryDescriptions: Record<string, string> = {
  '3d': 'Immerse yourself in stunning 3D graphics and gameplay. Our 3D games feature realistic environments, smooth animations, and engaging mechanics that bring your gaming experience to life.',
  'action': 'Get your adrenaline pumping with our action games collection! From intense combat to fast-paced adventures, these games will keep you on the edge of your seat.',
  'adventure': 'Embark on epic journeys and explore vast worlds. Our adventure games offer compelling stories, challenging puzzles, and unforgettable experiences.',
  'arcade': 'Classic arcade fun for everyone! Enjoy retro-style games with modern twists, perfect for quick gaming sessions and endless entertainment.',
  'archery': 'Test your aim and precision with our archery games. From target practice to medieval battles, these games challenge your shooting skills.',
  'boys': 'Exciting games designed for boys of all ages. Action-packed adventures, racing games, and more!',
  'bubble-shooter': 'Pop colorful bubbles in these addictive puzzle games. Match colors, plan your shots, and clear the board!',
  'clicker': 'Addictive clicking games that keep you coming back for more. Simple to play, hard to put down!',
  'desktop': 'Games optimized for desktop browsers. Enjoy full-screen gameplay with keyboard and mouse controls.',
  'driving': 'Get behind the wheel in our driving games collection. From street racing to off-road adventures, experience the thrill of the road.',
  'fighting': 'Enter the ring and battle opponents in our fighting games. Master combos, learn special moves, and become the champion!',
  'girls': 'Fun games for girls of all ages. Fashion, cooking, design, and more creative adventures!',
  'html5': 'Modern HTML5 games that run directly in your browser. No plugins required, instant gameplay!',
  'hypercasual': 'Simple, addictive games perfect for quick breaks. Easy to learn, challenging to master!',
  'logic': 'Challenge your brain with logic and puzzle games. Solve problems, think strategically, and sharpen your mind!',
  'multiplayer': 'Play with friends and players worldwide. Compete, cooperate, and socialize in multiplayer games!',
  'puzzle': 'Exercise your brain with our puzzle games collection. From classic jigsaws to mind-bending challenges!',
  'racing': 'Speed demons rejoice! Our racing games offer high-speed thrills, challenging tracks, and competitive gameplay.',
  'shooting': 'Take aim and fire in our shooting games. From FPS to sniper challenges, test your accuracy and reflexes.',
  'sports': 'Virtual sports for every fan. Football, basketball, tennis, and more - play your favorite sports online!',
  'strategy': 'Plan, build, and conquer in our strategy games. Test your tactical thinking and leadership skills!',
  'stunt': 'Perform amazing stunts and tricks in these action-packed games. Push the limits of physics and creativity!',
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
  const description = categoryDescriptions[slug] || `Play the best ${categoryName.toLowerCase()} online for free on PlayHive Games. No download required.`
  
  return {
    title: `${categoryName} - Play Free Online Games | PlayHive Games`,
    description: description,
    openGraph: {
      title: `${categoryName} - PlayHive Games`,
      description: description,
      url: `https://playhivegames.com/category/${slug}`,
    },
    alternates: {
      canonical: `https://playhivegames.com/category/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const categoryName = categoryNames[slug] || slug
  const categoryDescription = categoryDescriptions[slug] || ''
  const filteredGames = gamesData.games.filter((game) => game.category.includes(slug))

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-2 capitalize">{categoryName}</h1>
        
        {/* Category Description */}
        {categoryDescription && (
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            {categoryDescription}
          </p>
        )}
        
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
        
        {/* SEO Content */}
        {filteredGames.length > 0 && (
          <div className="mt-8 bg-slate-800 rounded-lg p-6">
            <h2 className="font-bold mb-3">About {categoryName}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              PlayHive Games offers {filteredGames.length} free {categoryName.toLowerCase()} that you can play directly in your browser. 
              No downloads or installations required. Our {categoryName.toLowerCase()} are updated regularly with new content. 
              Enjoy playing {categoryName.toLowerCase()} on any device - desktop, tablet, or mobile!
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
