import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function Docs() {
  const [copiedLang, setCopiedLang] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [activeSection, setActiveSection] = useState('introduction')

  useEffect(() => {
    // Auto-detect current website URL
    const currentUrl = window.location.origin
    setWebsiteUrl(currentUrl)
  }, [])

  const copyCode = (code, lang) => {
    navigator.clipboard.writeText(code)
    setCopiedLang(lang)
    setTimeout(() => setCopiedLang(''), 2000)
  }

  const codeExamples = {
    javascript: `fetch('${websiteUrl}/api/hasan/scrape', {
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

url = '${websiteUrl}/api/hasan/scrape'
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
  '${websiteUrl}/api/hasan/scrape' \\
  -H 'Content-Type: application/json' \\
  -H 'x-api-key: your_api_key_here' \\
  -d '{
    "url": "https://example.com"
  }'`,

    php: `<?php
$url = '${websiteUrl}/api/hasan/scrape';
$data = array('url' => 'https://example.com');
$payload = json_encode($data);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'x-api-key: your_api_key_here'
));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`
  }

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'examples', title: 'Examples' },
    { id: 'error-codes', title: 'Error Codes' }
  ]

  return (
    <>
      <Head>
        <title>API Documentation - WebScraperAPI | Complete Developer Guide</title>
        <meta name="description" content="Complete WebScraperAPI documentation with code examples in JavaScript, Python, PHP, cURL. Learn how to integrate our web scraping API." />
        <meta name="keywords" content="web scraping API documentation, API docs, code examples, JavaScript, Python, PHP, cURL" />
        <link rel="canonical" href={`${websiteUrl}/docs`} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
            <p className="text-gray-600">
              Complete guide to using the WebScraperAPI
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Friendly Sidebar - IMPROVED */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Contents</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                        setActiveSection(section.id)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content - MOBILE OPTIMIZED */}
            <div className="flex-1 min-w-0">
              {/* Desktop Header */}
              <div className="hidden lg:block mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
                <p className="text-xl text-gray-600">
                  Complete guide to using the WebScraperAPI with code examples in multiple languages
                </p>
              </div>

              <div className="space-y-8">
                {/* Introduction */}
                <section id="introduction" className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-600 mb-4">
                    WebScraperAPI provides a simple yet powerful interface for extracting HTML content from any website. 
                    Our API handles proxies, browsers, and CAPTCHAs so you can focus on data extraction.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                      <strong>Base URL:</strong> <code className="bg-blue-100 px-2 py-1 rounded text-sm">{websiteUrl}/api/hasan</code>
                    </p>
                  </div>
                </section>

                {/* Authentication */}
                <section id="authentication" className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Authentication</h2>
                  <p className="text-gray-600 mb-4">
                    All API requests require an API key sent in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">x-api-key</code> header.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Important:</strong> Keep your API keys secure and never expose them in client-side code.
                    </p>
                  </div>
                </section>

                {/* Quick Start */}
                <section id="quick-start" className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
                  <p className="text-gray-600 mb-6">
                    Here's how to make your first API request in different programming languages:
                  </p>

                  <div className="space-y-4">
                    {Object.entries(codeExamples).map(([lang, code]) => (
                      <div key={lang} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-900 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <span className="text-white font-mono text-sm capitalize">{lang}</span>
                          <button
                            onClick={() => copyCode(code, lang)}
                            className="text-gray-300 hover:text-white flex items-center space-x-2 text-sm bg-gray-800 px-3 py-1 rounded"
                          >
                            <i className="ri-clipboard-line"></i>
                            <span>{copiedLang === lang ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre className="p-4 bg-gray-800 text-gray-200 overflow-x-auto text-xs sm:text-sm">
                          <code>{code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>

                {/* API Reference */}
                <section id="api-reference" className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-900 text-white px-4 py-3">
                      <span className="font-mono text-sm sm:text-base">POST /api/hasan/scrape</span>
                    </div>
                    
                    <div className="p-4 sm:p-6 space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Request Headers</h4>
                        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                          <table className="w-full text-sm min-w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-semibold">Header</th>
                                <th className="text-left py-2 font-semibold">Description</th>
                                <th className="text-left py-2 font-semibold">Required</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 font-mono text-xs sm:text-sm">x-api-key</td>
                                <td className="py-2">Your API key</td>
                                <td className="py-2">Yes</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-xs sm:text-sm">Content-Type</td>
                                <td className="py-2">application/json</td>
                                <td className="py-2">Yes</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Request Body</h4>
                        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-xs sm:text-sm">
{`{
  "url": "https://example.com"
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Response</h4>
                        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-xs sm:text-sm">
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

                {/* Error Codes */}
                <section id="error-codes" className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Error Codes</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-semibold">Code</th>
                          <th className="text-left py-2 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-mono">400</td>
                          <td className="py-2">Bad Request - Invalid URL or missing parameters</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-mono">401</td>
                          <td className="py-2">Unauthorized - Invalid or missing API key</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-mono">500</td>
                          <td className="py-2">Internal Server Error - Scraping failed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
              }
