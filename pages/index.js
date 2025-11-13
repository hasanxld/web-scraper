import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>WebScraperAPI - Powerful Web Scraping API</title>
        <meta name="description" content="Advanced web scraping API with real-time data extraction" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Advanced Web Scraping
                <span className="text-primary-500"> API</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Extract data from any website with our powerful, reliable, and easy-to-use web scraping API. 
                Built for developers, by developers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/generate" className="bg-primary-500 text-white px-8 py-4 hover:bg-primary-600 font-medium text-lg">
                  Get Started Free
                </Link>
                <Link href="/docs" className="border-2 border-gray-300 text-gray-700 px-8 py-4 hover:border-primary-500 font-medium text-lg">
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600">Everything you need for web scraping</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 border border-gray-200 hover:border-primary-500 transition-colors">
                  <div className="w-16 h-16 bg-primary-500 mx-auto mb-4 flex items-center justify-center">
                    <i className={`${feature.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-500">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Scraping?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Generate your API key and start extracting data in minutes.
            </p>
            <Link href="/generate" className="bg-white text-primary-500 px-8 py-4 hover:bg-gray-100 font-medium text-lg inline-block">
              Generate API Key
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 WebScraperAPI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

const features = [
  {
    icon: 'ri-shield-keyhole-line',
    title: 'Secure API Keys',
    description: 'Generate and manage secure API keys with detailed access controls and usage monitoring.'
  },
  {
    icon: 'ri-zap-line',
    title: 'High Performance',
    description: 'Lightning-fast scraping with advanced caching and concurrent request handling.'
  },
  {
    icon: 'ri-global-line',
    title: 'No CORS Issues',
    description: 'Built with CORS support for seamless integration with any web application.'
  }
]
