import { v4 as uuidv4 } from 'uuid'

export const generateApiKey = () => {
  return `sk_${uuidv4().replace(/-/g, '')}_${Date.now()}`
}

export const validateApiKey = (key) => {
  return key.startsWith('sk_') && key.length > 30
}

export const sanitizeUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.href
  } catch {
    return null
  }
}
