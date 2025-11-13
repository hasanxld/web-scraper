import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import Toast from '../components/Toast'

export default function Home() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [websiteUrl, setWebsiteUrl] = useState('')

  useEffect(() => {
    const currentUrl = window.location.origin
    setWebsiteUrl(currentUrl)
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!url) {
      showToast('Please enter a website URL', 'error')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/hasan/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk_tool_auto_generate_hasan_system_2024'
        },
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        setResult(data.html || data.content)
        showToast('Website scraped successfully!')
      } else {
        showToast(data.error || 'Failed to scrape website. Please check the URL.', 'error')
      }
    } catch (error) {
      console.error('Scraping error:', error)
      showToast('Network error. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    showToast('Copied to clipboard!')
  }

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scraped-content.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('Download started!')
  }

  const handleReset = () => {
    setUrl('')
    setResult('')
  }

  const highlightCode = (html) => {
    if (!html) return ''
    
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"(.*?)"/g, '<span class="text-yellow-300">"$1"</span>')
      .replace(/&lt;!DOCTYPE(.*?)&gt;/g, '<span class="text-purple-400">&lt;!DOCTYPE$1&gt;</span>')
      .replace(/&lt;(\/?)(html|head|body|div|span|p|a|img|script|style|link|meta|title|h1|h2|h3|h4|h5|h6|ul|ol|li|table|tr|td|th|form|input|button|select|option|br|hr|nav|header|footer|section|article|aside|main)(.*?)&gt;/g, '<span class="text-blue-400">&lt;$1$2$3&gt;</span>')
      .replace(/&lt;(\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)&gt;/g, '<span class="text-blue-300">&lt;$1$2$3&gt;</span>')
      .replace(/class=(".*?")/g, 'class=<span class="text-green-400">$1</span>')
      .replace(/id=(".*?")/g, 'id=<span class="text-green-400">$1</span>')
      .replace(/href=(".*?")/g, 'href=<span class="text-green-400">$1</span>')
      .replace(/src=(".*?")/g, 'src=<span class="text-green-400">$1</span>')
      .replace(/&lt;!--(.*?)--&gt;/g, '<span class="text-gray-500">&lt;!--$1--&gt;</span>')
  }

  return (
    <>
      <Head>
        <title>WebScraperAPI - Advanced Web Scraping API & Tool</title>
        <meta name="description" content="Powerful web scraping API and online tool. Extract HTML content from any website instantly. Free web scraper with real-time results." />
        <meta name="keywords" content="web scraping, API, HTML extractor, data scraping, web scraper, online tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={websiteUrl} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Advanced Web 
                <span className="text-primary-500"> Scraping</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Extract HTML content from any website with our powerful, reliable scraping tool and API. 
                Fast, secure, and developer-friendly.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Web Scraping Tool
                </h2>
                <p className="text-gray-600">
                  Enter any website URL to extract HTML content instantly - No API Key Required!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com or https://example.com"
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-500 text-white px-8 py-3 hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Scraping...
                      </>
                    ) : (
                      <>
                        <span className="ri-download-line mr-2"></span>
                        Scrape Website
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Try: example.com, google.com, or any website URL
                </p>
              </form>

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-blue-600 font-medium">Scraping website content...</span>
                  </div>
                </div>
              )}

              {result && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-900 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="text-white font-medium">Scraped Content</h3>
                      <p className="text-gray-400 text-sm">Length: {result.length} characters</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-white hover:bg-gray-600 text-sm transition-colors"
                      >
                        <span className="ri-clipboard-line"></span>
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white hover:bg-primary-600 text-sm transition-colors"
                      >
                        <span className="ri-download-line"></span>
                        <span>Download</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white hover:bg-gray-500 text-sm transition-colors"
                      >
                        <span className="ri-refresh-line"></span>
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-4 overflow-auto max-h-96">
                    <pre className="text-sm">
                      <code 
                        className="language-html block"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightCode(result) 
                        }}
                      />
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Scraper?</h2>
              <p className="text-lg text-gray-600">Powerful features for developers and businesses</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 border border-gray-200 hover:border-primary-500 transition-colors rounded-lg hover:shadow-lg">
                  <div className="w-16 h-16 bg-primary-500 mx-auto mb-4 flex items-center justify-center rounded-lg">
                    <span className={`${feature.icon} text-white text-2xl`}></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary-500">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need More Power?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Generate your API key for unlimited requests and advanced features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/generate" className="bg-white text-primary-500 px-6 py-3 hover:bg-gray-100 font-medium rounded-lg transition-colors">
                Generate API Key
              </a>
              <a href="/docs" className="border-2 border-white text-white px-6 py-3 hover:bg-white hover:text-primary-500 font-medium rounded-lg transition-colors">
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

const features = [
  {
    icon: 'ri-zap-line',
    title: 'Lightning Fast',
    description: 'Get results in seconds with our optimized scraping engine and advanced caching system.'
  },
  {
    icon: 'ri-shield-keyhole-line',
    title: 'No API Key Required',
    description: 'Use our tool instantly without any registration or API key. Fast and hassle-free.'
  },
  {
    icon: 'ri-global-line',
    title: 'No CORS Issues',
    description: 'Built with CORS support for seamless integration with any web application or website.'
  }
]
