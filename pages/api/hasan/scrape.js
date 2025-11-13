import { supabase } from '../../../lib/supabase'

// Special auto-generated key for tool
const TOOL_API_KEY = 'sk_tool_auto_generate_hasan_system_2025'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, X-API-Key')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      error: 'Method not allowed. Use POST.'
    })
  }

  try {
    const apiKey = req.headers['x-api-key'] || req.headers['X-API-Key']
    const { url } = req.body

    console.log('API Request Received:', { 
      hasApiKey: !!apiKey, 
      url: url
    })

    // Special auto-generated key for tool
    const isToolRequest = apiKey === TOOL_API_KEY

    // Validate API key for non-tool requests
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
          error: 'Invalid API key format. Must start with "sk_"'
        })
      }
    }

    // Validate URL
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        status: 'error',
        error: 'URL is required in request body and must be a string'
      })
    }

    let sanitizedUrl;
    try {
      // Ensure URL has protocol
      let urlToScrape = url.trim();
      if (!urlToScrape.startsWith('http://') && !urlToScrape.startsWith('https://')) {
        urlToScrape = 'https://' + urlToScrape;
      }
      
      const urlObj = new URL(urlToScrape);
      sanitizedUrl = urlObj.href;
      console.log('Sanitized URL:', sanitizedUrl);
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: `Invalid URL format: ${url}. Please include http:// or https://`
      })
    }

    let apiKeyData = null;

    // Validate API key for non-tool requests
    if (!isToolRequest) {
      try {
        const { data: keyData, error: apiKeyError } = await supabase
          .from('api_keys')
          .select('*')
          .eq('key', apiKey)
          .eq('is_active', true)
          .single()

        if (apiKeyError || !keyData) {
          console.log('Invalid API key:', apiKey);
          return res.status(401).json({
            status: 'error',
            error: 'Invalid or inactive API key'
          })
        }

        apiKeyData = keyData;
        console.log('Valid API key:', keyData.name);

        // Update API key usage
        await supabase
          .from('api_keys')
          .update({
            total_requests: (keyData.total_requests || 0) + 1,
            last_used: new Date().toISOString()
          })
          .eq('id', keyData.id)

      } catch (dbError) {
        console.error('Database error:', dbError);
        return res.status(500).json({
          status: 'error',
          error: 'Database connection failed'
        })
      }
    }

    console.log('Starting scrape for:', sanitizedUrl);

    // Scrape the website with enhanced error handling
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.log('Request timeout');
      }, 25000); // 25 second timeout

      const fetchOptions = {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        redirect: 'follow',
        timeout: 25000
      };

      const scrapeResponse = await fetch(sanitizedUrl, fetchOptions);
      clearTimeout(timeoutId);

      console.log('Response Status:', scrapeResponse.status);

      if (!scrapeResponse.ok) {
        throw new Error(`HTTP ${scrapeResponse.status}: ${scrapeResponse.statusText}`);
      }

      const contentType = scrapeResponse.headers.get('content-type') || '';
      
      if (!contentType.includes('text/html')) {
        throw new Error(`Unsupported content type: ${contentType}. Only HTML content is supported.`);
      }

      const htmlContent = await scrapeResponse.text();
      
      if (!htmlContent || htmlContent.length === 0) {
        throw new Error('No content received from the website');
      }

      console.log('Scraping successful, content length:', htmlContent.length);

      // Save scraping result for non-tool requests
      if (!isToolRequest && apiKeyData) {
        try {
          await supabase
            .from('scraping_results')
            .insert([
              {
                api_key_id: apiKeyData.id,
                url: sanitizedUrl,
                html_content: htmlContent.substring(0, 15000), // Limit size
                status: 'success',
                content_length: htmlContent.length
              }
            ])
        } catch (insertError) {
          console.error('Failed to save result:', insertError);
          // Continue even if save fails
        }
      }

      // Return success response with proper HTML
      return res.status(200).json({
        status: 'success',
        url: sanitizedUrl,
        code: 200,
        tool: 'HASAN',
        html: htmlContent,
        content: htmlContent,
        timestamp: new Date().toISOString(),
        source: isToolRequest ? 'tool_auto_key' : 'user_api_key',
        content_length: htmlContent.length,
        message: 'Website scraped successfully'
      });

    } catch (scrapeError) {
      console.error('Scraping failed:', scrapeError.message);
      
      let errorMessage = 'Failed to scrape website: ';
      
      if (scrapeError.name === 'AbortError') {
        errorMessage += 'Request timeout (25 seconds)';
      } else if (scrapeError.message.includes('fetch failed')) {
        errorMessage += 'Network error - website may be unreachable';
      } else if (scrapeError.message.includes('HTTP')) {
        errorMessage += scrapeError.message;
      } else {
        errorMessage += scrapeError.message;
      }

      // Log failed request for non-tool requests
      if (!isToolRequest && apiKeyData) {
        try {
          const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
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
                error_message: errorMessage
              }
            ])
        } catch (logError) {
          console.error('Failed to log error:', logError);
        }
      }

      return res.status(500).json({
        status: 'error',
        error: errorMessage,
        url: sanitizedUrl,
        code: 500,
        tool: 'HASAN',
        details: 'Check if the website is accessible and allows scraping'
      });
    }

  } catch (error) {
    console.error('Unexpected API error:', error);
    
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
      code: 500,
      tool: 'HASAN',
      details: 'Please try again later'
    });
  }
}
