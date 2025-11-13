import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Contact() {
  const [websiteUrl, setWebsiteUrl] = useState('')

  useEffect(() => {
    setWebsiteUrl(window.location.origin)
  }, [])

  return (
    <>
      <Head>
        <title>Contact Us - WebScraperAPI | Get Help & Support</title>
        <meta name="description" content="Contact WebScraperAPI support team. Get help with API integration, technical issues, and partnership inquiries." />
        <link rel="canonical" href={`${websiteUrl}/contact`} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8">
              Get in touch with our support team
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">kinghasanbd1@gmail.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-whatsapp-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                      <p className="text-gray-600">+8801744298642</p>
                      <p className="text-sm text-gray-500">Available for quick support</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-customer-service-2-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Support</h3>
                      <p className="text-gray-600">Technical assistance</p>
                      <p className="text-sm text-gray-500">API integration help</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
