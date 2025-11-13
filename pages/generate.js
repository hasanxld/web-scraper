import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { generateApiKey } from '../utils/apiHelpers'
import { supabase } from '../lib/supabase'

export default function Generate() {
  const [apiName, setApiName] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    
    if (!apiName.trim()) {
      showToast('Please enter an API name', 'error')
      return
    }

    setLoading(true)
    
    try {
      const newApiKey = generateApiKey()
      
      // Save to Supabase - FIXED with error handling
      const { data, error } = await supabase
        .from('api_keys')
        .insert([
          {
            key: newApiKey,
            name: apiName.trim(),
            is_active: true,
            total_requests: 0
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error('Failed to save API key to database')
      }

      setGeneratedKey(newApiKey)
      setApiName('')
      showToast('API key generated successfully!')
    } catch (error) {
      console.error('Error generating API key:', error)
      showToast(error.message || 'Failed to generate API key', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey)
    showToast('API key copied to clipboard!')
  }

  return (
    <>
      <Head>
        <title>Generate API Key - WebScraperAPI | Get Your Free API Key</title>
        <meta name="description" content="Generate your free WebScraperAPI key for unlimited web scraping requests. Start extracting data from any website today." />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Generate API Key</h1>
            <p className="text-lg md:text-xl text-gray-600">Create a new API key to start using our web scraping service</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {!generatedKey ? (
              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key Name
                  </label>
                  <input
                    type="text"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    placeholder="e.g., My Production Key"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Give your API key a descriptive name to identify its purpose
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-500 text-white py-3 hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Generating...
                    </span>
                  ) : (
                    'Generate API Key'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500 mx-auto rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white text-2xl"></i>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">API Key Generated Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Save this API key securely. You won't be able to see it again.
                  </p>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <code className="text-green-400 font-mono text-sm break-all">{generatedKey}</code>
                </div>

                <button
                  onClick={handleCopy}
                  className="w-full bg-primary-500 text-white py-3 hover:bg-primary-600 font-medium transition-colors"
                >
                  <i className="ri-clipboard-line mr-2"></i>
                  Copy API Key
                </button>

                <button
                  onClick={() => setGeneratedKey('')}
                  className="w-full border border-gray-300 text-gray-700 py-3 hover:border-primary-500 font-medium transition-colors"
                >
                  Generate Another Key
                </button>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <div className="flex items-start space-x-3">
              <i className="ri-error-warning-line text-yellow-600 text-xl mt-1"></i>
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Important Security Notice</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Store your API keys securely and never expose them in client-side code</li>
                  <li>• Each API key should be used for a specific purpose or application</li>
                  <li>• Regularly rotate your API keys for enhanced security</li>
                  <li>• Monitor your API usage in the dashboard</li>
                  <li>• <strong>Tool Usage:</strong> Use our web scraping tool without API key for quick testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
