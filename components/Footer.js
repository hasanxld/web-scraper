import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 flex items-center justify-center">
                <i className="ri-code-s-slash-line text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold">WebScraperAPI</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Advanced web scraping API for developers. Extract data from any website with our powerful, 
              reliable, and easy-to-use web scraping service.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/8801744298642" className="text-gray-400 hover:text-green-500 transition-colors">
                <i className="ri-whatsapp-line text-2xl"></i>
              </a>
              <a href="mailto:kinghasanbd1@gmail.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                <i className="ri-mail-line text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/tool" className="text-gray-400 hover:text-white transition-colors">Scraping Tool</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors">API Docs</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} WebScraperAPI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Email: kinghasanbd1@gmail.com</span>
            <span className="text-gray-400 text-sm">WhatsApp: +8801744298642</span>
          </div>
        </div>
      </div>
    </footer>
  )
            }
