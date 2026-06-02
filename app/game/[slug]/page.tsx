import GamePageClient from './GamePageClient'
import gamesData from '@/data/games.json'

// 生成静态参数
export function generateStaticParams() {
  return gamesData.games.map((game) => ({
    slug: game.slug,
  }))
}

// 生成元数据
export function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const game = gamesData.games.find((g) => g.slug === slug)
  
  if (!game) {
    return {
      title: 'Game Not Found - PlayHive Games',
      description: 'The requested game was not found.',
    }
  }

  const primaryCategory = game.category[0] || 'game'
  
  return {
    title: `${game.title} - Play Free Online | PlayHive`,
    description: `Play ${game.title} online for free! ${game.description?.substring(0, 100) || `Enjoy this ${primaryCategory} game`}... No download required on PlayHive Games.`,
    openGraph: {
      title: `${game.title} - Play Free Online`,
      description: `Play ${game.title} online for free! No download required.`,
      url: `https://playhivegames.com/game/${slug}`,
    },
    alternates: {
      canonical: `https://playhivegames.com/game/${slug}`,
    },
  }
}

export default function GamePage({ params }: { params: { slug: string } }) {
  return <GamePageClient slug={params.slug} />
}
