import { supabase } from '../../../lib/supabase'

// Special auto-generated key for tool
const TOOL_API_KEY = 'sk_tool_auto_generate_hasan_system_2024'

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

  try {
    const apiKey = req.headers['x-api-key']
    const { url } = req.body

    if (!url) {
      return res.status(400).json({
        status: 'error',
        error: 'URL is required'
      })
    }

    // Special auto-generated key for tool
    const isToolRequest = apiKey === TOOL_API_KEY

    // Validate API key for non-tool requests
    if (!isToolRequest) {
      if (!apiKey) {
        return res.status(401).json({
          status: 'error',
          error: 'API key is required'
        })
      }
      
      if (!apiKey.startsWith('sk_')) {
        return res.status(401).json({
          status: 'error',
          error: 'Invalid API key format'
        })
      }

      // Check if API key exists in database
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
    }

    // Validate and sanitize URL
    let targetUrl = url.trim()
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl
    }

    // Basic URL validation
    try {
      new URL(targetUrl)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid URL format'
      })
    }

    // Scrape the website with proper error handling
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    try {
      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        redirect: 'follow'
      })

      clearTimeout(timeout)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const html = await response.text()

      // Return successful response
      return res.status(200).json({
        status: 'success',
        url: targetUrl,
        code: 200,
        tool: 'HASAN',
        html: html,
        content: html,
        timestamp: new Date().toISOString(),
        content_length: html.length
      })

    } catch (fetchError) {
      clearTimeout(timeout)
      
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout - website took too long to respond')
      }
      throw fetchError
    }

  } catch (error) {
    console.error('API Error:', error.message)
    
    return res.status(500).json({
      status: 'error',
      error: error.message,
      code: 500,
      tool: 'HASAN'
    })
  }
}
