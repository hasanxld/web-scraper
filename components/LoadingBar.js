import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function LoadingBar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
      setProgress(30)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 300)
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
      <div 
        className="h-1 bg-gradient-to-r from-primary-500 to-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="h-1 bg-gray-200 w-full -mt-1"></div>
    </div>
  )
}
