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

      <Navbar />

      <Slideshow />

      <AboutSection />

      <ProjectsSection />

      <GoalsSection />

      <FounderSection />

      <StayInTouch />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-12 bg-orange-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ['0 0 0px #f97316', '0 0 20px #f97316', '0 0 0px #f97316'] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => navigate('/register')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-colors duration-200"
        >
          Register Now — ₹449
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ['0 0 0px #22c55e', '0 0 20px #22c55e', '0 0 0px #22c55e'] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          onClick={() => navigate('/donate')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-colors duration-200"
        >
          Donate Now
        </motion.button>
      </div>

      <Footer />

    </div>
  )
}
