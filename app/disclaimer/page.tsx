import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">General Information</h2>
            <p>
              The information provided on PlayHive Games is for general informational purposes only. 
              All information on the site is provided in good faith, however we make no representation 
              or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, 
              reliability, availability, or completeness of any information on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">External Links</h2>
            <p>
              The site may contain links to external websites that are not provided or maintained by 
              or in any way affiliated with PlayHive Games. Please note that we do not guarantee the 
              accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Game Content</h2>
            <p>
              All games on PlayHive Games are provided by third-party services. We do not own or host 
              these games directly. The game content is the property of their respective owners. 
              If you believe any game infringes on your rights, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p>
              In no event shall PlayHive Games be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses, resulting from your access to or 
              use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Disclaimer, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
