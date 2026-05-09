import logo from '../assets/svg_logo.jpg'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Our Projects', href: '#projects' },
  { name: 'Our Goals', href: '#goals' },
  { name: 'Founder', href: '#founder' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="SVDAN Foundation Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-400"
              />
              <div>
                <p className="text-orange-400 font-bold text-sm leading-tight">
                  Shahir Visharad Dr. Azad
                </p>
                <p className="text-orange-400 font-bold text-sm leading-tight">
                  Nayakawadi Foundation
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Established in 2002, dedicated to serving society
              through humanitarian initiatives.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-3">
            <h4 className="text-white font-bold text-base mb-1">Quick Links</h4>
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center sm:items-start gap-3">
            <h4 className="text-white font-bold text-base mb-1">Connect With Us</h4>
            <a
              href="mailto:svdanfoundation@gmail.com"
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200"
            >
              svdanfoundation@gmail.com
            </a>
            <a
              href="tel:+918010388950"
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200"
            >
              +91 8010388950
            </a>
            <a
              href="https://www.instagram.com/dr.azad_nayakawadi_foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 text-sm transition-colors duration-200"
            >
              Follow us on Instagram
            </a>
            <p className="text-gray-400 text-sm">
              Kolhapur, Maharashtra, India
            </p>
            <a
              href="https://www.instagram.com/dr.azad_nayakawadi_foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-pink-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
            >
              Follow on Instagram
            </a>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs text-center">
            2026 Shahir Visharad Dr. Azad Nayakawadi Foundation. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Made with love for a better society
          </p>
        </div>
      </div>

    </footer>
  )
}
