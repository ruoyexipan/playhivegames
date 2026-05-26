import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit a website. They are widely used to make websites work more efficiently and to 
              provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website.</li>
              <li><strong>Advertising Cookies:</strong> These are used to provide relevant advertisements.</li>
              <li><strong>Preference Cookies:</strong> These remember your settings and preferences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Third-Party Cookies</h2>
            <p>
              We may use third-party services that use cookies, including Google Analytics and 
              Google AdSense. These services help us analyze website traffic and serve relevant 
              advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Please note that 
              removing or blocking cookies may impact your user experience and parts of the website 
              may no longer be fully accessible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Changes to This Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes 
              by posting the new Cookie Policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
