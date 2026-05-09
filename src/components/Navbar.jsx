import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/svg_logo.jpg'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Goals', href: '#goals' },
  { name: 'Founder', href: '#founder' },
  { name: 'Contact', href: '#contact' },
]

const workItems = [
  { name: 'Women Empowerment Session', id: 'work-women' },
  { name: 'Blood Donation Camp', id: 'work-blood' },
  { name: 'Cleanliness Drive', id: 'work-clean' },
  { name: 'Fort Conservation Initiative', id: 'work-fort' },
  { name: 'School Kit Donation Drive', id: 'work-school' },
  { name: 'Ambulance Donation Initiative', id: 'work-ambulance' },
  { name: 'Social Internship Program', id: 'work-teams' },
]

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const navigate = useNavigate()

  const handleWorkClick = (id) => {
    setSidebarOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="SVDAN Foundation Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-orange-400"
            />
            <div>
              <p className="text-xs sm:text-sm font-bold text-orange-600 leading-tight">
                Shahir Visharad Dr. Azad Nayakawadi
              </p>
              <p className="text-xs sm:text-sm font-bold text-orange-600 leading-tight">
                Foundation
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-orange-500 font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate('/donate')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              Donate Now
            </button>
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="w-6 h-0.5 bg-gray-700 block"></span>
            <span className="w-6 h-0.5 bg-gray-700 block"></span>
            <span className="w-6 h-0.5 bg-gray-700 block"></span>
          </button>

        </div>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-orange-500">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <p className="text-white font-bold text-sm leading-tight">
              SVDAN Foundation
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl font-bold"
          >
            X
          </button>
        </div>

        <div className="flex flex-col py-4">

          <button
            onClick={() => setWorkOpen(!workOpen)}
            className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-semibold transition-colors"
          >
            <span>Our Work</span>
            <span className={`transition-transform duration-200 ${workOpen ? 'rotate-180' : ''}`}>
              v
            </span>
          </button>

          {workOpen && (
            <div className="bg-orange-50 border-l-4 border-orange-400 ml-6">
              {workItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleWorkClick(item.id)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 my-3" />

          <div className="px-6 py-2">
            <button
              onClick={() => {
                setSidebarOpen(false)
                navigate('/donate')
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition-all duration-200 shadow-md mb-3"
            >
              Donate Now
            </button>
            <button
              onClick={() => {
                setSidebarOpen(false)
                navigate('/register')
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition-all duration-200 shadow-md"
            >
              Register Now
            </button>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            2026 SVDAN Foundation
          </p>
        </div>
      </div>

      <div className="h-16 sm:h-20" />
    </>
  )
}
