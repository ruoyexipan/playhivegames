import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'PlayHive Games - Play Free Online Games',
  description: 'Play free online games without download. Action, puzzle, racing, sports, and more HTML5 games.',
  keywords: 'free games, online games, html5 games, browser games, playhive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
