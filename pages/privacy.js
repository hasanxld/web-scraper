import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Privacy() {
  const [websiteUrl, setWebsiteUrl] = useState('')

  useEffect(() => {
    setWebsiteUrl(window.location.origin)
  }, [])

  return (
    <>
      <Head>
        <title>Privacy Policy - WebScraperAPI | Data Protection</title>
        <meta name="description" content="WebScraperAPI privacy policy. Learn how we protect your data and handle API usage information." />
        <link rel="canonical" href={`${websiteUrl}/privacy`} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information to provide better services to our users. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>API usage data and request logs</li>
                  <li>Website URLs submitted for scraping</li>
                  <li>IP addresses for security and analytics</li>
                  <li>Browser and device information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Develop new features and functionality</li>
                  <li>Monitor and analyze usage patterns</li>
                  <li>Ensure service security and prevent abuse</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect against unauthorized access, 
                  alteration, disclosure, or destruction of your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600">Email: kinghasanbd1@gmail.com</p>
                  <p className="text-gray-600">WhatsApp: +8801744298642</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
