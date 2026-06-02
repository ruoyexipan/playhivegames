import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | PlayHive Games',
  description: 'Find answers to common questions about PlayHive Games. Learn how to play games, what devices are supported, and more.',
  openGraph: {
    title: 'FAQ - PlayHive Games',
    description: 'Find answers to common questions about PlayHive Games.',
  },
  alternates: {
    canonical: 'https://playhivegames.com/faq',
  },
}

const faqData = [
  // 通用问题
  {
    question: 'What is PlayHive Games?',
    answer: 'PlayHive Games is a free online gaming platform that offers over 2,000 HTML5 games playable instantly in any web browser. No downloads, registrations, or plugins are required. We provide a wide variety of games across 22 categories including action, puzzle, racing, arcade, shooting, and more.',
  },
  {
    question: 'Is PlayHive Games really free?',
    answer: 'Yes, PlayHive Games is completely free to use. All games on our platform are free to play with no hidden fees, premium tiers, or required registrations. You can play as many games as you want without any cost.',
  },
  {
    question: 'Do I need to download anything to play?',
    answer: 'No, you don\'t need to download anything. All games on PlayHive Games run directly in your web browser using HTML5 technology. Simply click on a game and start playing immediately. No plugins, installations, or downloads required.',
  },
  {
    question: 'What devices can I use to play games?',
    answer: 'PlayHive Games works on all modern devices including desktop computers, laptops, tablets, and smartphones. Our platform is fully responsive and optimized for both desktop and mobile browsers. Games work on Chrome, Firefox, Safari, Edge, and other modern browsers.',
  },
  
  // 游戏类型相关
  {
    question: 'What types of games are available?',
    answer: 'We offer games across 22 categories including: Action, Adventure, Arcade, Puzzle, Racing, Shooting, Sports, Strategy, Simulation, and more. Whether you enjoy brain teasers, fast-paced action, or creative games, you\'ll find something to enjoy.',
  },
  {
    question: 'Do you have racing games?',
    answer: 'Yes! We have a large collection of racing games including car racing, bike racing, truck racing, and more. Popular titles include MR RACER, Deadly Descent, and various stunt racing games. All racing games are free to play online.',
  },
  {
    question: 'Are there puzzle games available?',
    answer: 'Absolutely! We offer hundreds of puzzle games including block puzzles, word puzzles, match-3 games, jigsaw puzzles, and brain teasers. Our puzzle games are perfect for exercising your brain and passing time.',
  },
  {
    question: 'Can I play shooting games online?',
    answer: 'Yes, we have many shooting games available including FPS games, sniper games, and target shooting games. Popular titles include Hazmob FPS and various other action-packed shooting games.',
  },
  {
    question: 'Do you have multiplayer games?',
    answer: 'Yes, we offer multiplayer games where you can play with friends or other players online. These include .io games, battle royale games, and cooperative games.',
  },
  {
    question: 'Are there games for girls?',
    answer: 'Yes, we have a dedicated category for girls games including dress-up games, cooking games, makeup games, and fashion games. These games are fun and creative for players of all ages.',
  },
  {
    question: 'Do you have 3D games?',
    answer: 'Yes, we offer many 3D games that run directly in your browser. These games feature stunning graphics and immersive gameplay without requiring any downloads or special hardware.',
  },
  
  // 平台相关
  {
    question: 'How often are new games added?',
    answer: 'We regularly add new games to our platform. Our collection is updated with fresh content to keep the gaming experience exciting. Check back often to discover new games!',
  },
  {
    question: 'Can I play games on my mobile phone?',
    answer: 'Yes! All our games are built with HTML5 technology, making them compatible with mobile browsers. You can play on your smartphone or tablet without downloading any apps. Simply visit our website on your mobile browser and start playing.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No, you don\'t need to create an account. PlayHive Games allows you to play all games instantly without any registration. Just visit the site and start playing!',
  },
  {
    question: 'Are the games safe to play?',
    answer: 'Yes, all games on PlayHive Games are safe to play. We carefully curate our game collection and ensure they meet quality and safety standards. Our platform uses secure connections and doesn\'t require any personal information.',
  },
  
  // 游戏玩法相关
  {
    question: 'How do I find specific games?',
    answer: 'You can use our search function to find specific games by name. You can also browse games by category using the navigation menu. Our homepage features trending games, new releases, and popular games to help you discover great content.',
  },
  {
    question: 'Can I share games with friends?',
    answer: 'Yes! Each game page has social sharing buttons that allow you to share games on Facebook, Twitter, Reddit, and other platforms. You can also copy the game link to share directly with friends.',
  },
  {
    question: 'What should I do if a game doesn\'t load?',
    answer: 'If a game doesn\'t load, try refreshing the page. Make sure you have a stable internet connection. If the issue persists, try using a different browser or clearing your browser cache. Some games may take a few seconds to load initially.',
  },
  {
    question: 'Are there any age restrictions?',
    answer: 'PlayHive Games offers games suitable for all ages. We have games for kids, teens, and adults. Some games may have age recommendations, but there are no strict age restrictions for using our platform.',
  },
  {
    question: 'Can I suggest a game to be added?',
    answer: 'We appreciate game suggestions! While we don\'t have a formal submission system, you can contact us through our contact page with your suggestions. We\'re always looking to expand our game collection.',
  },
  {
    question: 'How does PlayHive Games make money?',
    answer: 'PlayHive Games is supported by advertising. We display non-intrusive ads on our platform to keep the service free for all users. We don\'t sell user data or require any payments.',
  },
  
  // 技术相关
  {
    question: 'What technology do you use?',
    answer: 'PlayHive Games uses HTML5 technology for all our games. This means games run directly in your web browser without requiring Flash Player or any other plugins. Our platform is built with modern web technologies for optimal performance.',
  },
  {
    question: 'Do I need Flash Player?',
    answer: 'No, you don\'t need Flash Player. All our games use HTML5 technology, which is supported by all modern browsers. Flash Player is no longer supported and we\'ve migrated all games to HTML5.',
  },
  {
    question: 'Why are some games slow to load?',
    answer: 'Game loading speed depends on your internet connection and the game\'s complexity. Most games load within a few seconds. If a game is slow to load, try refreshing the page or checking your internet connection.',
  },
  {
    question: 'Can I play games offline?',
    answer: 'No, an internet connection is required to play games on PlayHive Games. Our games run directly in your browser and need to load game assets from our servers.',
  },
  
  // 比较相关
  {
    question: 'How is PlayHive Games different from other gaming sites?',
    answer: 'PlayHive Games offers a curated collection of high-quality HTML5 games with no downloads required. Unlike many gaming sites, we focus on instant play, clean design, and a safe gaming environment. Our platform is optimized for both desktop and mobile devices.',
  },
  {
    question: 'Is PlayHive Games better than CrazyGames?',
    answer: 'Both platforms offer free online games. PlayHive Games focuses on a curated collection of high-quality HTML5 games with instant play and no downloads. We encourage you to try both and see which you prefer!',
  },
  {
    question: 'Is PlayHive Games better than Poki?',
    answer: 'PlayHive Games and Poki both offer free online games. PlayHive Games features a curated collection with instant play and no downloads required. We recommend trying both platforms to find your favorite games!',
  },
  
  // 安全相关
  {
    question: 'Is it safe to play games on PlayHive Games?',
    answer: 'Yes, PlayHive Games is safe to use. We use HTTPS encryption, don\'t require personal information, and carefully curate our game collection. Our platform is designed with user safety in mind.',
  },
  {
    question: 'Do you collect personal data?',
    answer: 'We respect your privacy. PlayHive Games uses cookies for basic functionality and analytics. We don\'t collect personal information or require registration. Please see our Privacy Policy for details.',
  },
  {
    question: 'Are there viruses in the games?',
    answer: 'No, our games are safe from viruses. All games run in a sandboxed environment within your browser. We don\'t require any downloads or installations that could contain malware.',
  },
  
  // 特定游戏类型
  {
    question: 'Can I play car racing games?',
    answer: 'Yes! We have many car racing games including formula racing, street racing, off-road racing, and more. Popular titles include MR RACER, Deadly Descent, and various other racing games.',
  },
  {
    question: 'Are there zombie games?',
    answer: 'Yes, we offer zombie-themed games including zombie shooting games, zombie survival games, and zombie apocalypse games. These games are action-packed and thrilling!',
  },
  {
    question: 'Do you have io games?',
    answer: 'Yes, we have popular .io games including multiplayer online games where you compete against other players. These games are simple to play but highly addictive!',
  },
  {
    question: 'Can I play cooking games?',
    answer: 'Yes, we have cooking games where you can run restaurants, bake cakes, and prepare meals. These games are fun and creative for players who enjoy simulation games.',
  },
  {
    question: 'Are there dress-up games?',
    answer: 'Yes, we have dress-up games and fashion games where you can style characters, create outfits, and express your creativity. These games are popular among players who enjoy fashion and design.',
  },
  
  // 其他常见问题
  {
    question: 'Can I save my game progress?',
    answer: 'Game progress saving depends on the specific game. Many games use browser local storage to save progress automatically. However, clearing your browser data may reset your progress.',
  },
  {
    question: 'How do I report a broken game?',
    answer: 'If you find a broken game, you can use the Report button on the game page to let us know. We\'ll investigate and fix the issue as soon as possible.',
  },
  {
    question: 'Can I request a specific game?',
    answer: 'While we don\'t have a formal game request system, you can contact us through our contact page with your suggestions. We appreciate your feedback and consider it when adding new games.',
  },
  {
    question: 'Why do some games have ads?',
    answer: 'Ads help us keep PlayHive Games free for everyone. We display non-intrusive ads to support our platform and continue offering free games. We strive to keep ads minimal and non-disruptive.',
  },
  {
    question: 'Can I play games without internet?',
    answer: 'No, an internet connection is required to play games on PlayHive Games. Our games load from our servers and require an active connection to play.',
  },
  {
    question: 'What browser should I use?',
    answer: 'We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best gaming experience. All modern browsers support HTML5 games.',
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-400 mb-8">
          Find answers to common questions about PlayHive Games
        </p>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">{faq.question}</h2>
              <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Additional SEO Content */}
        <div className="mt-12 bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-slate-300 mb-4">
            If you couldn't find the answer to your question, feel free to{' '}
            <Link href="/contact" className="text-indigo-400 hover:underline">
              contact us
            </Link>
            . We're here to help!
          </p>
          <p className="text-slate-300">
            PlayHive Games is committed to providing the best free online gaming experience. 
            We continuously improve our platform based on user feedback.
          </p>
        </div>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqData.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
      <Footer />
    </main>
  )
}
