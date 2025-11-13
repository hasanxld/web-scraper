import Head from 'next/head'
import Header from '../components/Header'
import { useState } from 'react'

export default function Docs() {
  const [copiedLang, setCopiedLang] = useState('')

  const copyCode = (code, lang) => {
    navigator.clipboard.writeText(code)
    setCopiedLang(lang)
    setTimeout(() => setCopiedLang(''), 2000)
  }

  const codeExamples = {
    javascript: `fetch('https://${process.env.NEXT_PUBLIC_SITE_URL}/api/hasan/scrape', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your_api_key_here'
  },
  body: JSON.stringify({
    url: 'https://example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,

    python: `import requests

url = 'https://${process.env.NEXT_PUBLIC_SITE_URL}/api/hasan/scrape'
headers = {
    'Content-Type': 'application/json',
    'x-api-key': 'your_api_key_here'
}
data = {
    'url': 'https://example.com'
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,

    curl: `curl -X POST \\
  'https://${process.env.NEXT_PUBLIC_SITE_URL}/api/hasan/scrape' \\
  -H 'Content-Type: application/json' \\
  -H 'x-api-key: your_api_key_here' \\
  -d '{
    "url": "https://example.com"
  }'`
  }

  return (
    <>
      <Head>
        <title>API Documentation - WebScraperAPI</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
            <p className="text-xl text-gray-600">
              Comprehensive guide to using the WebScraperAPI
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="sticky top-8 space-y-2">
                {['Introduction', 'Authentication', 'Quick Start', 'API Reference', 'Examples', 'Error Codes'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Introduction */}
              <section id="introduction">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  WebScraperAPI provides a simple yet powerful interface for extracting HTML content from any website. 
                  Our API handles proxies, browsers, and CAPTCHAs so you can focus on data extraction.
                </p>
              </section>

              {/* Authentication */}
              <section id="authentication">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h2>
                <p className="text-gray-600 mb-4">
                  All API requests require an API key sent in the <code className="bg-gray-100 px-2 py-1">x-api-key</code> header.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> Keep your API keys secure and never expose them in client-side code.
                  </p>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
                <p className="text-gray-600 mb-6">
                  Here's how to make your first API request in different programming languages:
                </p>

                <div className="space-y-6">
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <div key={lang} className="border border-gray-200">
                      <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
                        <span className="text-white font-mono text-sm">{lang}</span>
                        <button
                          onClick={() => copyCode(code, lang)}
                          className="text-gray-300 hover:text-white flex items-center space-x-2"
                        >
                          <i className="ri-clipboard-line"></i>
                          <span>{copiedLang === lang ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="p-4 bg-gray-800 text-green-400 overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </section>

              {/* API Reference */}
              <section id="api-reference">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
                
                <div className="border border-gray-200">
                  <div className="bg-gray-900 text-white px-4 py-3">
                    <span className="font-mono">POST /api/hasan/scrape</span>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Request Headers</h4>
                      <div className="bg-gray-50 p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2">Header</th>
                              <th className="text-left py-2">Description</th>
                              <th className="text-left py-2">Required</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200">
                              <td className="py-2 font-mono">x-api-key</td>
                              <td className="py-2">Your API key</td>
                              <td className="py-2">Yes</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">Content-Type</td>
                              <td className="py-2">application/json</td>
                              <td className="py-2">Yes</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Request Body</h4>
                      <div className="bg-gray-800 p-4">
                        <pre className="text-green-400">
{`{
  "url": "https://example.com"
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Response</h4>
                      <div className="bg-gray-800 p-4">
                        <pre className="text-green-400">
{`{
  "status": "success",
  "url": "https://example.com",
  "code": 200,
  "tool": "HASAN",
  "html": "<!DOCTYPE html>...",
  "content": "<!DOCTYPE html>...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
    }
