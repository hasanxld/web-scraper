import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function PremiumLoader() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true)
        setProgress(10)
        
        // Simulate progress
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval)
              return 90
            }
            return prev + Math.random() * 20
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
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Animated Progress Bar */}
      <div className="relative h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        {/* Main Progress */}
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-blue-600 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Pulse Effect */}
        <div className="absolute top-0 left-0 h-full w-8 bg-white/50 blur-md animate-pulse-slow"></div>
      </div>
      
      {/* Loading Spinner Overlay */}
      <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center">
        <div className="bg-white/95 border border-gray-200 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform animate-fade-in">
          <div className="text-center">
            {/* Animated Logo */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <i className="ri-code-s-slash-line text-primary-500 text-xl animate-bounce"></i>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full blur-sm opacity-75 animate-ping"></div>
            </div>
            
            {/* Loading Text */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 animate-pulse">
              Loading...
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Preparing your experience
            </p>
            
            {/* Progress Percentage */}
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-primary-600 min-w-[40px]">
                {Math.round(progress)}%
              </span>
            </div>
            
            {/* Dots Animation */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
                         }
