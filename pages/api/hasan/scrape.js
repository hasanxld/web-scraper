import { supabase } from '../../../lib/supabase'
import { validateApiKey, sanitizeUrl } from '../../../utils/apiHelpers'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      error: 'Method not allowed'
    })
  }

  const apiKey = req.headers['x-api-key']
  const { url } = req.body

  // Special auto-generated key for tool (no validation required)
  const isToolRequest = apiKey === 'sk_tool_auto_generate_hasan_system'

  // Validate API key for non-tool requests
  if (!isToolRequest && (!apiKey || !validateApiKey(apiKey))) {
    return res.status(401).json({
      status: 'error',
      error: 'Invalid API key'
    })
  }

  // Validate URL
  if (!url) {
    return res.status(400).json({
      status: 'error',
      error: 'URL is required'
    })
  }

  const sanitizedUrl = sanitizeUrl(url)
  if (!sanitizedUrl) {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid URL'
    })
  }

  try {
    let apiKeyData = null

    if (!isToolRequest) {
      // Check if API key exists and is active for non-tool requests
      const { data: keyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', apiKey)
        .eq('is_active', true)
        .single()

      if (apiKeyError || !keyData) {
        return res.status(401).json({
          status: 'error',
          error: 'Invalid or inactive API key'
        })
      }

      apiKeyData = keyData

      // Update API key usage
      await supabase
        .from('api_keys')
        .update({
          total_requests: keyData.total_requests + 1,
          last_used: new Date().toISOString()
        })
        .eq('id', keyData.id)

      // Log the request
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      await supabase
        .from('api_requests')
        .insert([
          {
            api_key_id: keyData.id,
            endpoint: '/api/hasan/scrape',
            method: 'POST',
            status_code: 200,
            ip_address: clientIp,
            user_agent: req.headers['user-agent']
          }
        ])
    }

    // Scrape the website
    const scrapeResponse = await fetch(sanitizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    })

    if (!scrapeResponse.ok) {
      throw new Error(`HTTP error! status: ${scrapeResponse.status}`)
    }

    const htmlContent = await scrapeResponse.text()

    // Save scraping result for non-tool requests
    if (!isToolRequest && apiKeyData) {
      await supabase
        .from('scraping_results')
        .insert([
          {
            api_key_id: apiKeyData.id,
            url: sanitizedUrl,
            html_content: htmlContent,
            status: 'success'
          }
        ])
    }

    // Return success response
    res.status(200).json({
      status: 'success',
      url: sanitizedUrl,
      code: 200,
      tool: 'HASAN',
      html: htmlContent,
      content: htmlContent,
      timestamp: new Date().toISOString(),
      source: isToolRequest ? 'tool_auto_key' : 'user_api_key'
    })

  } catch (error) {
    console.error('Scraping error:', error)

    // Log failed request for non-tool requests
    if (!isToolRequest && apiKeyData) {
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      await supabase
        .from('api_requests')
        .insert([
          {
            api_key_id: apiKeyData.id,
            endpoint: '/api/hasan/scrape',
            method: 'POST',
            status_code: 500,
            ip_address: clientIp,
            user_agent: req.headers['user-agent'],
            response_time: null
          }
        ])
    }

    res.status(500).json({
      status: 'error',
      error: error.message,
      url: sanitizedUrl,
      code: 500,
      tool: 'HASAN'
    })
  }
}
