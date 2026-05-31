'use client'

import { useEffect } from 'react'
import gamesData from '@/data/games.json'
import seoTagsData from '@/data/game-seo-tags.json'

interface GameHeadProps {
  slug: string
}

export default function GameHead({ slug }: GameHeadProps) {
  useEffect(() => {
    if (!slug) return

    const game = gamesData.games.find((g) => g.slug === slug)
    if (!game) return

    const seoTag = seoTagsData.find((tag) => tag.slug === slug)
    if (!seoTag) return

    // Update title
    document.title = seoTag.meta_title

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
    updateMeta('description', seoTag.meta_description)
    updateMeta('keywords', seoTag.keywords.join(', '))

    // Open Graph tags
    updateMeta('og:title', seoTag.meta_title, 'property')
    updateMeta('og:description', seoTag.meta_description, 'property')
    updateMeta('og:url', seoTag.url, 'property')
    updateMeta('og:type', 'website', 'property')
    updateMeta('og:site_name', 'PlayHive Games', 'property')

    // Twitter tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', seoTag.meta_title)
    updateMeta('twitter:description', seoTag.meta_description)
    updateMeta('twitter:url', seoTag.url)

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', seoTag.canonical)

    // JSON-LD Schema
    let jsonLdScript = document.getElementById('game-json-ld') as HTMLScriptElement | null
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script') as HTMLScriptElement
      jsonLdScript.id = 'game-json-ld'
      jsonLdScript.type = 'application/ld+json'
      document.head.appendChild(jsonLdScript)
    }
    jsonLdScript.textContent = JSON.stringify(seoTag.json_ld)

    // Cleanup function to restore default meta tags
    return () => {
      document.title = 'PlayHive Games - Free Online Games Platform | Play 1500+ HTML5 Games Instantly'
      
      const defaultMeta = {
        description: 'PlayHive Games is a free online gaming platform offering 1500+ HTML5 games playable instantly in any browser. No downloads, no signups required.',
        keywords: 'PlayHive Games, free online games, play games online, html5 games, browser games, no download games'
      }
      
      updateMeta('description', defaultMeta.description)
      updateMeta('keywords', defaultMeta.keywords)
      
      // Remove game-specific JSON-LD
      const script = document.getElementById('game-json-ld')
      if (script) {
        script.remove()
      }
    }
  }, [slug])

  return null
}
