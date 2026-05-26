import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Introduction</h2>
            <p>
              This Privacy Policy describes how PlayHive Games collects, uses, and protects your personal 
              information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Usage data (pages visited, time spent, etc.)</li>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">How We Use Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns</li>
              <li>Display personalized content and advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and 
              hold certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our services, provide 
              services on our behalf, or perform service-related activities. These third parties have 
              access to your personal information only to perform these tasks on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our 
              contact page.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
