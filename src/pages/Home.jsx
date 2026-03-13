import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Slideshow from '../components/Slideshow'
import AboutSection from '../components/AboutSection'
import ProjectsSection from '../components/ProjectsSection'
import GoalsSection from '../components/GoalsSection'
import FounderSection from '../components/FounderSection'
import StayInTouch from '../components/StayInTouch'
import Footer from '../components/Footer'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div id="home" className="w-full overflow-x-hidden pt-4 sm:pt-0">

      {/* Navbar */}
      <Navbar />

      {/* Slideshow */}
      <Slideshow />

      {/* Register Now Button */}
      <div className="flex justify-center items-center py-10 bg-white">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ['0 0 0px #f97316', '0 0 20px #f97316', '0 0 0px #f97316'] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => navigate('/register')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-colors duration-200"
        >
          🎯 Register Now — ₹449
        </motion.button>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Goals Section */}
      <GoalsSection />

      {/* Founder Section */}
      <FounderSection />

      {/* Stay In Touch */}
      <StayInTouch />

      {/* Footer */}
      <Footer />

    </div>
  )
}