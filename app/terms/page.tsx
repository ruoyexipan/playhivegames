import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using PlayHive Games, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on PlayHive Games for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with or disrupt the service</li>
              <li>Collect or harvest any information from the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Disclaimer</h2>
            <p>
              The materials on PlayHive Games are provided on an as is basis. PlayHive Games makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including without limitation, implied warranties or conditions of merchantability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Limitations</h2>
            <p>
              In no event shall PlayHive Games or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on PlayHive Games.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
