import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './Hero.css'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

// ─── Hero Main ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reducedMotion = usePrefersReducedMotion()

  const [canvasInView, setCanvasInView] = useState(false)

  const heroRef = useRef(null)

  // Mount the WebGL canvas only when the hero is actually on screen
  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === 'undefined') {
      setCanvasInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setCanvasInView(entry.isIntersecting),
      { rootMargin: '120px' }
    )
    io.observe(heroRef.current)
    return () => io.disconnect()
  }, [])

  const bgColor = isLight ? '#E6D8C3' : '#0b0f1e'
  const cCyan = isLight ? '#3E4A3F' : '#67e8f9'
  const cPurple = isLight ? '#4A584B' : '#c4b5fd'
  const cPink = isLight ? '#5B6B5D' : '#f9a8d4'

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-3d-background" aria-hidden="true">
        {!reducedMotion && canvasInView && (
          <Suspense fallback={null}>
            <HeroCanvas
              isLight={isLight}
              bgColor={bgColor}
              cCyan={cCyan}
              cPurple={cPurple}
              cPink={cPink}
            />
          </Suspense>
        )}
      </div>

      <div className="hero-container container">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <span className="badge-dot" />
          Open to Opportunities • Summer 2026
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 90 }}
        >
          BHARATH KUMAR RAJESH
        </motion.h1>

        <motion.div
          className="hero-tagline-box"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <span className="typewriter-text">
            AI Engineer · Published Researcher · AWS Certified
          </span>
        </motion.div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          MS Computer Science @ Pace University&nbsp;&nbsp;|&nbsp;&nbsp;New York City
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <motion.a href="#projects" className="btn btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            View My Work <ArrowRight size={15} />
          </motion.a>
          <motion.a href="#contact" className="btn btn-secondary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Get In Touch <Mail size={15} />
          </motion.a>
          <motion.a
            href="https://thebharath.co"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View Resume <ExternalLink size={15} />
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.a
            href="https://github.com/thebharathkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub profile"
            whileHover={{ scale: 1.2 }}
          >
            <Github size={22} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/thebharathkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn profile"
            whileHover={{ scale: 1.2 }}
          >
            <Linkedin size={22} />
          </motion.a>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-hidden="true"
        >
          <motion.div
            className="scroll-dot"
            animate={reducedMotion ? {} : { y: [0, 9, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundColor: cCyan }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
