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
        return 'ri-checkbox-circle-fill'
      case 'error':
        return 'ri-error-warning-fill'
      case 'warning':
        return 'ri-alert-fill'
      default:
        return 'ri-information-fill'
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`${getBgColor()} text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 min-w-[300px] border-l-4 ${type === 'success' ? 'border-green-600' : type === 'error' ? 'border-red-600' : type === 'warning' ? 'border-yellow-600' : 'border-blue-600'}`}>
        <i className={`${getIcon()} text-xl`}></i>
        <span className="flex-1 font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="hover:bg-white/20 p-1 rounded transition-colors"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  )
}
