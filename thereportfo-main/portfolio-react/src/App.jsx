import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Publications from './components/Publications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThermalScrollEffect from './components/ThermalScrollEffect'
import BackToTop from './components/BackToTop'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        <ThermalScrollEffect />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Publications />
        <Contact />
        <Footer />
        <AnimatePresence>
          {showBackToTop && <BackToTop />}
        </AnimatePresence>
        <Chatbot />
      </div>
    </ThemeProvider>
  )
}

export default App
