import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Toast from '../components/Toast'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [apiKey, setApiKey] = useState('')
  const [apiData, setApiData] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const fetchData = async () => {
    if (!apiKey) {
      showToast('Please enter an API key', 'error')
      return
    }

    setLoading(true)

    try {
      // Fetch API key details
      const { data: apiKeyData, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', apiKey)
        .single()

      if (error || !apiKeyData) {
        showToast('Invalid API key', 'error')
        return
      }

      setApiData(apiKeyData)

      // Fetch recent requests
      const { data: requestsData } = await supabase
        .from('api_requests')
        .select('*')
        .eq('api_key_id', apiKeyData.id)
        .order('created_at', { ascending: false })
        .limit(50)

      setRequests(requestsData || [])
      
      showToast('Data loaded successfully!')
    } catch (error) {
      console.error('Error fetching data:', error)
      showToast('Failed to fetch data', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard - WebScraperAPI</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Dashboard</h1>
            <p className="text-xl text-gray-600">Monitor your API usage and statistics</p>
          </div>

          {/* API Key Input */}
          <div className="bg-white border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key to view details"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary-500"
              />
              <button
                onClick={fetchData}
                disabled={loading}
                className="bg-primary-500 text-white px-8 py-3 hover:bg-primary-600 font-medium disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'View Details'}
              </button>
            </div>
          </div>

          {apiData && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* API Key Info */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">API Key Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="font-medium">{apiData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className={`font-medium ${apiData.is_active ? 'text-green-600' : 'text-red-600'}`}>
                      {apiData.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Requests</label>
                    <p className="font-medium">{apiData.total_requests}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Used</label>
                    <p className="font-medium">
                      {apiData.last_used ? new Date(apiData.last_used).toLocaleString() : 'Never'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Created</label>
                    <p className="font-medium">{new Date(apiData.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="bg-white border border-gray-200 p-6 md:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Requests</h3>
                {requests.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2">Endpoint</th>
                          <th className="text-left py-2">Method</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((request) => (
                          <tr key={request.id} className="border-b border-gray-200">
                            <td className="py-2">{request.endpoint}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 text-xs ${
                                request.method === 'POST' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {request.method}
                              </span>
                            </td>
                            <td className="py-2">
                              <span className={`px-2 py-1 text-xs ${
                                request.status_code === 200 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {request.status_code}
                              </span>
                            </td>
                            <td className="py-2 text-gray-500">
                              {new Date(request.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No requests found</p>
                )}
              </div>
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
