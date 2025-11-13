import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function LoadingBar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true)
        setProgress(30)
        
        // Simulate progress
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval)
              return 90
            }
            return prev + 10
          })
        }, 200)
      }
    }

    const handleComplete = (url) => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 500)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 bg-blue-500 shadow-lg">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="h-1 bg-gray-200 w-full -mt-1"></div>
    </div>
  )
}
