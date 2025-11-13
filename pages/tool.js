import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Toast from '../components/Toast'

export default function Tool() {
  const [url, setUrl] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!url || !apiKey) {
      showToast('Please enter both URL and API Key', 'error')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/hasan/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data.html || data.content)
        showToast('Successfully scraped website!')
      } else {
        showToast(data.error || 'Failed to scrape website', 'error')
      }
    } catch (error) {
      showToast('An error occurred while scraping', 'error')
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
    setApiKey('')
  }

  return (
    <>
      <Head>
        <title>Web Scraping Tool - WebScraperAPI</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Web Scraping Tool</h1>
            <p className="text-xl text-gray-600">Extract HTML content from any website</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-500 text-white py-3 hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Scraping...
                    </span>
                  ) : (
                    'Scrape Website'
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 hover:border-primary-500 font-medium"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {result && (
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Scraped Content</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:border-primary-500"
                  >
                    <i className="ri-clipboard-line"></i>
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white hover:bg-primary-600"
                  >
                    <i className="ri-download-line"></i>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="p-6 bg-gray-900 text-green-400 overflow-auto max-h-96">
                <code>{result}</code>
              </pre>
            </div>
          )}
        </div>
      </main>

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
