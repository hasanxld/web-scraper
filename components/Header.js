import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 flex items-center justify-center">
                <i className="ri-code-s-slash-line text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">WebScraperAPI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-500 font-medium">
              Home
            </Link>
            <Link href="/tool" className="text-gray-700 hover:text-primary-500 font-medium">
              Tool
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-500 font-medium">
              Dashboard
            </Link>
            <Link href="/docs" className="text-gray-700 hover:text-primary-500 font-medium">
              API Docs
            </Link>
            <Link href="/generate" className="bg-primary-500 text-white px-4 py-2 hover:bg-primary-600 font-medium">
              Generate API Key
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-500 font-medium">
                Home
              </Link>
              <Link href="/tool" className="text-gray-700 hover:text-primary-500 font-medium">
                Tool
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary-500 font-medium">
                Dashboard
              </Link>
              <Link href="/docs" className="text-gray-700 hover:text-primary-500 font-medium">
                API Docs
              </Link>
              <Link href="/generate" className="bg-primary-500 text-white px-4 py-2 hover:bg-primary-600 font-medium text-center font-medium">
                Generate API Key
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
            }
