import { v4 as uuidv4 } from 'uuid'

export const generateApiKey = () => {
  return `sk_${uuidv4().replace(/-/g, '')}_${Date.now().toString(36)}`
}

export const validateApiKey = (key) => {
  return key && key.startsWith('sk_') && key.length > 30
}

export const sanitizeUrl = (url) => {
  try {
    let urlToSanitize = url.trim()
    
    // Add protocol if missing
    if (!urlToSanitize.startsWith('http://') && !urlToSanitize.startsWith('https://')) {
      urlToSanitize = 'https://' + urlToSanitize
    }
    
    const urlObj = new URL(urlToSanitize)
    return urlObj.href
  } catch (error) {
    console.error('URL sanitization error:', error)
    return null
  }
}

// Special tool API key - FIXED
export const TOOL_API_KEY = 'sk_tool_auto_generate_hasan_system_2024'
