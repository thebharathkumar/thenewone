import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { useScrollY } from './hooks/useScrollY'
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
  const scrollY = useScrollY()
  const showBackToTop = scrollY > 500

  return (
    <ThemeProvider>
      <a href="#home" className="skip-link">Skip to content</a>
      <div className="App">
        <ThermalScrollEffect scrollY={scrollY} />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Publications />
          <Contact />
        </main>
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
