import GamePageClient from './GamePageClient'
import gamesData from '@/data/games.json'

// 生成静态参数 - 热门游戏优先
export function generateStaticParams() {
  // 按浏览量排序，优先预渲染热门游戏
  const sortedGames = [...gamesData.games].sort((a, b) => (b.views || 0) - (a.views || 0))
  
  // 预渲染所有游戏（可以限制数量以加快构建）
  // const gamesToPreRender = sortedGames.slice(0, 1000)  // 只预渲染前1000个
  
  return sortedGames.map((game) => ({
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
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Play Free Online`,
      description: `Play ${game.title} online for free! No download required.`,
    },
    alternates: {
      canonical: `https://playhivegames.com/game/${slug}`,
    },
    // 添加 robots 标签
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  }
}

// 强制静态生成
export const dynamic = 'force-static'
export const revalidate = false  // 不重新验证，使用缓存

export default function GamePage({ params }: { params: { slug: string } }) {
  return <GamePageClient slug={params.slug} />
}
