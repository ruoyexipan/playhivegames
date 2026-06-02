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
  {
    question: 'What types of games are available?',
    answer: 'We offer games across 22 categories including: Action, Adventure, Arcade, Puzzle, Racing, Shooting, Sports, Strategy, Simulation, and more. Whether you enjoy brain teasers, fast-paced action, or creative games, you\'ll find something to enjoy.',
  },
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
