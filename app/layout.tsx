import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'PlayHive Games - Free Online Games | Play 1400+ HTML5 Games No Download',
  description: 'Play 1400+ free online games at PlayHive! Enjoy action, puzzle, racing, arcade, shooting & HTML5 games. No download, no signup. Play instantly on mobile & desktop.',
  keywords: 'free online games, play games online, html5 games, browser games, no download games, free games for kids, action games, puzzle games, racing games, arcade games, shooting games, multiplayer games, online games free, playhive games',
  openGraph: {
    title: 'PlayHive Games - Free Online Games',
    description: 'Play 1400+ free online games. No download required.',
    url: 'https://playhivegames.com',
    siteName: 'PlayHive Games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayHive Games - Free Online Games',
    description: 'Play 1400+ free online games. No download required.',
  },
  alternates: {
    canonical: 'https://playhivegames.com',
  },
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
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
