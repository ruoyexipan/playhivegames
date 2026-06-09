'use client'

import { useEffect } from 'react'
import gamesData from '@/data/games.json'

interface GameHeadProps {
  slug: string
}

export default function GameHead({ slug }: GameHeadProps) {
  useEffect(() => {
    if (!slug) return

    const game = gamesData.games.find((g) => g.slug === slug)
    if (!game) return

    // Generate SEO data from game
    const primaryCategory = game.category[0] || 'game'
    const metaTitle = `${game.title} - Play Free Online | PlayHive`
    const metaDescription = `Play ${game.title} online for free! ${game.description?.substring(0, 100) || `Enjoy this ${primaryCategory} game`}... No download required on PlayHive Games.`
    const canonical = `https://playhivegames.com/game/${slug}`

    // Update title
    document.title = metaTitle

    // Update meta tags
    const updateMeta = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMeta('description', metaDescription)
    updateMeta('keywords', `${game.title}, free online games, ${primaryCategory} games, browser games`)

    // Open Graph tags
    updateMeta('og:title', metaTitle, 'property')
    updateMeta('og:description', metaDescription, 'property')
    updateMeta('og:url', canonical, 'property')
    updateMeta('og:type', 'website', 'property')
    updateMeta('og:site_name', 'PlayHive Games', 'property')

    // Twitter tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', metaTitle)
    updateMeta('twitter:description', metaDescription)
    updateMeta('twitter:url', canonical)

    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical)
    }

    // JSON-LD Schema
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: game.title,
      description: game.description || `Play ${game.title} online for free`,
      url: canonical,
      genre: primaryCategory,
      gamePlatform: 'Web Browser',
      applicationCategory: 'Game',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    }

    let jsonLdScript = document.getElementById('game-json-ld') as HTMLScriptElement | null
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script') as HTMLScriptElement
      jsonLdScript.id = 'game-json-ld'
      jsonLdScript.type = 'application/ld+json'
      document.head.appendChild(jsonLdScript)
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd)

    // Cleanup
    return () => {
      document.title = 'PlayHive Games | Free Online Games & Browser Games'
      
      updateMeta('description', 'Play free online games instantly at PlayHive Games. 2000+ browser games including action, puzzle, racing & arcade. No download required.')
      updateMeta('keywords', 'PlayHive Games, free online games, html5 games, browser games, no download games')
      
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://playhivegames.com')
      }
      
      const script = document.getElementById('game-json-ld')
      if (script) {
        script.remove()
      }
    }
  }, [slug])

  return null
}
