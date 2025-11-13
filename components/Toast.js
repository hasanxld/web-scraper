import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'ri-checkbox-circle-line'
      case 'error':
        return 'ri-error-warning-line'
      case 'info':
        return 'ri-information-line'
      default:
        return 'ri-information-line'
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`${getBgColor()} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]`}>
        <span className={`${getIcon()} text-xl`}></span>
        <span className="flex-1">{message}</span>
        <button 
          onClick={onClose}
          className="hover:bg-white hover:bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
        >
          <span className="ri-close-line"></span>
        </button>
      </div>
    </div>
  )
}
