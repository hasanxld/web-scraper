import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function PremiumTopLoader() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true)
        setProgress(10)
        
        // Progressive loading simulation
        const timer1 = setTimeout(() => setProgress(30), 100)
        const timer2 = setTimeout(() => setProgress(50), 300)
        const timer3 = setTimeout(() => setProgress(70), 500)
        const timer4 = setTimeout(() => setProgress(85), 800)
      }
    }

    const handleComplete = (url) => {
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
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Main Progress Bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Progress Fill */}
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          
          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-8 h-full bg-white/30 blur-md animate-pulse-glow"></div>
        </div>
        
        {/* Floating Dots */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full shadow-lg animate-float-dot" style={{ left: `${progress}%` }}></div>
      </div>
      
      {/* Percentage Display */}
      <div className="absolute top-2 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-bold">
        {progress}%
      </div>
    </div>
  )
}
