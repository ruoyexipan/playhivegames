import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Welcome to PlayHive Games</h2>
            <p>
              PlayHive Games is a free online gaming platform where you can play free online games 
              instantly in your browser. There is no download, no signup, and no installation required. 
              All games run smoothly on mobile, tablet, and desktop devices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
            <p>
              Whether you enjoy puzzle challenges, action adventures, arcade classics, or 3D browser games, 
              PlayHive Games offers a growing collection of titles designed for quick and easy play. You can 
              start playing within seconds without worrying about storage space or updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Free to play - no hidden fees</li>
              <li>No registration required</li>
              <li>Works on all devices</li>
              <li>Instant loading games</li>
              <li>Regular updates with new games</li>
              <li>Safe and secure platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions, suggestions, or feedback, please feel free to contact us. 
              We are always looking to improve our platform and provide the best gaming experience.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
