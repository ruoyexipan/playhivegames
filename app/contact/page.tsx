import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>General Inquiry</option>
                  <option>Game Suggestion</option>
                  <option>Bug Report</option>
                  <option>Business Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">📧 Email</h3>
              <p className="text-slate-300">contact@playhive.com</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">📍 Location</h3>
              <p className="text-slate-300">Online Platform</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">⏰ Response Time</h3>
              <p className="text-slate-300">We typically respond within 24-48 hours</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">💬 What We Help With</h3>
              <ul className="text-slate-300 space-y-1">
                <li>• Game suggestions</li>
                <li>• Technical issues</li>
                <li>• Business inquiries</li>
                <li>• General feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
