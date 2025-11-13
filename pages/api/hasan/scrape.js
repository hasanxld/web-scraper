import { supabase } from '../../../lib/supabase'

// Special auto-generated key for tool
const TOOL_API_KEY = 'sk_tool_auto_generate_hasan_system_2024'

export default async function handler(req, res) {
  // Set CORS headers - FIXED
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, X-API-Key')

  // Handle preflight request - FIXED
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      error: 'Method not allowed. Use POST.'
    })
  }

  const apiKey = req.headers['x-api-key'] || req.headers['X-API-Key']
  const { url } = req.body

  console.log('API Request:', { apiKey: apiKey ? 'provided' : 'missing', url })

  // Special auto-generated key for tool (no validation required) - FIXED
  const isToolRequest = apiKey === TOOL_API_KEY

  // Validate API key for non-tool requests - FIXED
  if (!isToolRequest) {
    if (!apiKey) {
      return res.status(401).json({
        status: 'error',
        error: 'API key is required. Use x-api-key header.'
      })
    }
    
    if (!apiKey.startsWith('sk_')) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid API key format'
      })
    }
  }

  // Validate URL - FIXED
  if (!url) {
    return res.status(400).json({
      status: 'error',
      error: 'URL is required in request body'
    })
  }

  let sanitizedUrl;
  try {
    // Ensure URL has protocol
    let urlToScrape = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      urlToScrape = 'https://' + url;
    }
    
    const urlObj = new URL(urlToScrape);
    sanitizedUrl = urlObj.href;
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid URL format'
    })
  }

  try {
    let apiKeyData = null

    if (!isToolRequest) {
      // Check if API key exists and is active for non-tool requests - FIXED
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
          total_requests: (keyData.total_requests || 0) + 1,
          last_used: new Date().toISOString()
        })
        .eq('id', keyData.id)

      // Log the request
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
      await supabase
        .from('api_requests')
        .insert([
          {
            api_key_id: keyData.id,
            endpoint: '/api/hasan/scrape',
            method: 'POST',
            status_code: 200,
            ip_address: clientIp,
            user_agent: req.headers['user-agent'] || 'unknown'
          }
        ])
    }

    console.log('Scraping URL:', sanitizedUrl)

    // Scrape the website - COMPLETELY FIXED
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const scrapeResponse = await fetch(sanitizedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        redirect: 'follow'
      })

      clearTimeout(timeoutId)

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
              html_content: htmlContent.substring(0, 10000), // Limit size
              status: 'success'
            }
          ])
      }

      console.log('Scraping successful, content length:', htmlContent.length)

      // Return success response - FIXED
      return res.status(200).json({
        status: 'success',
        url: sanitizedUrl,
        code: 200,
        tool: 'HASAN',
        html: htmlContent,
        content: htmlContent,
        timestamp: new Date().toISOString(),
        source: isToolRequest ? 'tool_auto_key' : 'user_api_key',
        content_length: htmlContent.length
      })

    } catch (fetchError) {
      clearTimeout(timeoutId)
      throw fetchError
    }

  } catch (error) {
    console.error('Scraping error:', error.message)

    // Log failed request for non-tool requests
    if (!isToolRequest && apiKeyData) {
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
      await supabase
        .from('api_requests')
        .insert([
          {
            api_key_id: apiKeyData.id,
            endpoint: '/api/hasan/scrape',
            method: 'POST',
            status_code: 500,
            ip_address: clientIp,
            user_agent: req.headers['user-agent'] || 'unknown',
            error_message: error.message
          }
        ])
    }

    return res.status(500).json({
      status: 'error',
      error: error.message || 'Failed to scrape website',
      url: sanitizedUrl,
      code: 500,
      tool: 'HASAN'
    })
  }
              }
