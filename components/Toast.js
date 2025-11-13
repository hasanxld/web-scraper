import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 
                  'bg-blue-500'

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <div className={`${bgColor} text-white px-6 py-3 rounded shadow-lg flex items-center space-x-2`}>
        <i className={`ri-${type === 'success' ? 'check' : 'error-warning'}-line`}></i>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  )
}
