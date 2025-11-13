import '../styles/globals.css'
import LoadingBar from '../components/LoadingBar'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Auto-detect and set site URL
    if (typeof window !== 'undefined') {
      const siteUrl = window.location.origin
      if (!process.env.NEXT_PUBLIC_SITE_URL) {
        process.env.NEXT_PUBLIC_SITE_URL = siteUrl
      }
    }
  }, [])

  return (
    <>
      <LoadingBar />
      <Component {...pageProps} />
    </>
  )
}
