import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'PlayHive Games - Free Online Games | Play 1500+ HTML5 Games No Download',
  description: 'Play 1500+ free online games at PlayHive! No download, no signup. Enjoy action, puzzle, racing, arcade, shooting, sports & HTML5 games instantly on mobile & desktop. Best free gaming site 2026.',
  keywords: 'free online games, play games online, html5 games, browser games, no download games, free games for kids, action games online, puzzle games free, racing games browser, arcade games html5, shooting games online, multiplayer browser games, online games without download, play free games now, best free games 2026, web games online, instant play games, playhive games, free gaming platform, browser game collection',
  openGraph: {
    title: 'PlayHive Games - Play 1500+ Free Online Games',
    description: 'No download required. Play action, puzzle, racing, arcade games instantly.',
    url: 'https://playhivegames.com',
    siteName: 'PlayHive Games',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayHive Games - Free Online Games',
    description: 'Play 1500+ free online games. No download required.',
  },
  alternates: {
    canonical: 'https://playhivegames.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PlayHive Games',
  url: 'https://playhivegames.com',
  description: 'Play 1500+ free online games. No download required.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://playhivegames.com/?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'PlayHive Games',
    url: 'https://playhivegames.com'
  }
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlayHive Games',
  url: 'https://playhivegames.com',
  sameAs: [
    'https://twitter.com/playhivegames',
    'https://facebook.com/playhivegames'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://playhivegames.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
