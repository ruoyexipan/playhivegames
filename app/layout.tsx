import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'PlayHive Games | Free Online Games & Browser Games',
  description: 'Play free online games instantly at PlayHive Games. 1500+ browser games including action, puzzle, racing & arcade. No download required. Start playing now!',
  keywords: 'PlayHive Games, free online games, play games online, html5 games, browser games, no download games, free games for kids, action games online, puzzle games free, racing games browser, arcade games html5, shooting games online, multiplayer browser games, online games without download, best free games 2026, web games online, instant play games, free gaming platform',
  openGraph: {
    title: 'PlayHive Games - Play 1500+ Free Online Games',
    description: 'PlayHive Games is a free online gaming platform with 1500+ HTML5 games. No download required.',
    url: 'https://playhivegames.com',
    siteName: 'PlayHive Games',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayHive Games - Free Online Games',
    description: 'Play 1500+ free online games at PlayHive Games. No download required.',
  },
  alternates: {
    canonical: 'https://playhivegames.com',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PlayHive Games',
  url: 'https://playhivegames.com',
  description: 'PlayHive Games is a free online gaming platform offering 1500+ HTML5 games playable instantly in any browser.',
  publisher: {
    '@type': 'Organization',
    name: 'PlayHive Games',
    url: 'https://playhivegames.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://playhivegames.com/favicon-64x64.png'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://playhivegames.com/?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlayHive Games',
  url: 'https://playhivegames.com',
  logo: 'https://playhivegames.com/favicon-64x64.png',
  description: 'PlayHive Games is a free online gaming platform providing instant access to 1500+ HTML5 browser games across 22 categories.',
  foundingDate: '2026',
  sameAs: [
    'https://github.com/ruoyexipan/playhivegames'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://playhivegames.com/contact'
  }
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is PlayHive Games?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PlayHive Games is a free online gaming platform that offers over 1500 HTML5 games playable instantly in any web browser without downloads or registration.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to download anything to play games on PlayHive Games?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, all games on PlayHive Games run directly in your browser using HTML5 technology. No downloads, plugins, or installations are required.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of games are available on PlayHive Games?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PlayHive Games offers games across 22 categories including action, puzzle, racing, arcade, shooting, sports, adventure, strategy, simulation, and more.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is PlayHive Games free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, PlayHive Games is completely free to use. All 1500+ games are free to play with no hidden fees or premium tiers.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I play PlayHive Games on mobile devices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, PlayHive Games works on all devices including desktops, laptops, tablets, and smartphones. The platform is fully responsive and mobile-friendly.'
      }
    }
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
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="msvalidate.01" content="54DAD8E047F0F6B817C080ABDAE52903" />
        <link rel="canonical" href="https://playhivegames.com" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-64x64.png" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JLELJC6XEZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JLELJC6XEZ');
            `
          }}
        />
        {/* Ahrefs Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var ahrefs_analytics_script = document.createElement('script');
              ahrefs_analytics_script.async = true;
              ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
              ahrefs_analytics_script.setAttribute('data-key', '34bww/kITibTC62y7KAH4w');
              document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>
        {/* SEO Content for crawlers */}
        <noscript>
          <h1>PlayHive Games - Free Online Games</h1>
          <p>Play 2000+ free online games and browser games instantly. No download required. Action, puzzle, racing, arcade games and more.</p>
          <p>Our online games work on all devices. Start playing now!</p>
        </noscript>
        
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('SW registration failed:', error);
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
