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

  // Validate API key
  if (!apiKey || !validateApiKey(apiKey)) {
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
    // Check if API key exists and is active
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .eq('is_active', true)
      .single()

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid or inactive API key'
      })
    }

    // Update API key usage
    await supabase
      .from('api_keys')
      .update({
        total_requests: apiKeyData.total_requests + 1,
        last_used: new Date().toISOString()
      })
      .eq('id', apiKeyData.id)

    // Log the request
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    await supabase
      .from('api_requests')
      .insert([
        {
          api_key_id: apiKeyData.id,
          endpoint: '/api/hasan/scrape',
          method: 'POST',
          status_code: 200,
          ip_address: clientIp,
          user_agent: req.headers['user-agent']
        }
      ])

    // Scrape the website
    const scrapeResponse = await fetch(sanitizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!scrapeResponse.ok) {
      throw new Error(`HTTP error! status: ${scrapeResponse.status}`)
    }

    const htmlContent = await scrapeResponse.text()

    // Save scraping result
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

    // Return success response
    res.status(200).json({
      status: 'success',
      url: sanitizedUrl,
      code: 200,
      tool: 'HASAN',
      html: htmlContent,
      content: htmlContent,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Scraping error:', error)

    // Log failed request
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    await supabase
      .from('api_requests')
      .insert([
        {
          api_key_id: apiKeyData?.id,
          endpoint: '/api/hasan/scrape',
          method: 'POST',
          status_code: 500,
          ip_address: clientIp,
          user_agent: req.headers['user-agent'],
          response_time: null
        }
      ])

    res.status(500).json({
      status: 'error',
      error: error.message,
      url: sanitizedUrl,
      code: 500,
      tool: 'HASAN'
    })
  }
      }
