import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, ArrowRight, Github, Linkedin, X, ArrowLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './Hero.css'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

// ─── Resume Data ──────────────────────────────────────────────────────────────
const resumeList = [
  { id: 'ai', title: 'AI Engineer', icon: '🧠', path: '/resumes/Bharath_Kumar_Resume_AI_ENGINEER.pdf', desc: 'Focus on Artificial Intelligence and Agentic Systems' },
  { id: 'ml', title: 'ML Engineer', icon: '🤖', path: '/resumes/Bharath_Kumar_Resume_ML_ENGINEER.pdf', desc: 'Focus on Machine Learning models and infrastructure' },
  { id: 'research', title: 'Research Engineer', icon: '🔬', path: '/resumes/Bharath_Kumar_Resume_RESEARCH_ENGINEER.pdf', desc: 'Focus on AI/ML Research and cutting-edge NLP' },
  { id: 'swe', title: 'Software Engineer (SWE)', icon: '💻', path: '/resumes/Bharath_Kumar_Resume_SWE.pdf', desc: 'Generalist Software Engineering' },
  { id: 'fullstack', title: 'Fullstack Engineer', icon: '🌐', path: '/resumes/Bharath_Kumar_Resume_FULLSTACK_ENGINEER.pdf', desc: 'End-to-end web and application development' },
  { id: 'backend', title: 'Backend Engineer', icon: '⚙️', path: '/resumes/Bharath_Kumar_Resume_BACKEND_ENGINEER.pdf', desc: 'Focus on scalable server-side systems and APIs' },
  { id: 'data', title: 'Data Engineer', icon: '📊', path: '/resumes/Bharath_Kumar_Resume_DATA_ENGINEER.pdf', desc: 'Focus on data pipelines and scaled processing' },
  { id: 'analyst', title: 'Data Analyst', icon: '📈', path: '/resumes/Bharath_Kumar_Resume_DATA_ANALYST.pdf', desc: 'Focus on analytics, BI, and data visualization' },
  { id: 'cloud', title: 'Cloud Engineer', icon: '☁️', path: '/resumes/Bharath_Kumar_Resume_CLOUD_ENGINEER.pdf', desc: 'Focus on AWS, GCP, Azure infrastructure' },
  { id: 'devops', title: 'DevOps Engineer', icon: '🏗️', path: '/resumes/Bharath_Kumar_Resume_DEVOPS_ENGINEER.pdf', desc: 'Focus on CI/CD pipelines and deployment' },
  { id: 'sre', title: 'Site Reliability Eng (SRE)', icon: '🛡️', path: '/resumes/Bharath_Kumar_Resume_SRE.pdf', desc: 'Focus on system stability and high availability' },
  { id: 'qa', title: 'Quality Engineer', icon: '✅', path: '/resumes/Bharath_Kumar_Resume_QUALITY_ENGINEER.pdf', desc: 'Focus on automated testing and QA systems' },
  { id: 'solutions', title: 'Solutions Engineer', icon: '🤝', path: '/resumes/Bharath_Kumar_Resume_SOLUTIONS_ENGINEER.pdf', desc: 'Customer-facing technical architecture' },
  { id: 'devrel', title: 'Developer Advocate', icon: '🥑', path: '/resumes/Bharath_Kumar_Resume_DEV_ADVOCATE.pdf', desc: 'Focus on community, docs, and DevRel' },
  { id: 'aipm', title: 'AI Product Manager', icon: '📱', path: '/resumes/Bharath_Kumar_Resume_AI_PM.pdf', desc: 'Product leadership in AI/ML products' },
  { id: 'techpm', title: 'Technical PM', icon: '📋', path: '/resumes/Bharath_Kumar_Resume_TECHNICAL_PM.pdf', desc: 'Technical Product Management & Strategy' },
]

const groupedResumes = {
  ai_data: {
    title: 'AI & Data',
    desc: 'Machine Learning, Data Science, and AI Engineering',
    icon: '🧠',
    roles: ['ai', 'ml', 'research', 'data', 'analyst'],
  },
  swe_infra: {
    title: 'Software & Infrastructure',
    desc: 'Fullstack, Backend, Cloud, and SRE',
    icon: '💻',
    roles: ['swe', 'fullstack', 'backend', 'cloud', 'devops', 'sre', 'qa'],
  },
  product_advocacy: {
    title: 'Product & Advocacy',
    desc: 'Product Management, Solutions, and DevRel',
    icon: '🥑',
    roles: ['solutions', 'devrel', 'aipm', 'techpm'],
  },
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// ─── Hero Main ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reducedMotion = usePrefersReducedMotion()

  const [showResumeModal, setShowResumeModal] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [canvasInView, setCanvasInView] = useState(false)

  const heroRef = useRef(null)
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

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

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setStep(2)
  }

  const handleCloseModal = useCallback(() => {
    setShowResumeModal(false)
    setStep(1)
    setSelectedCategory(null)
    triggerRef.current?.focus()
  }, [])

  const handleBack = () => {
    setStep(1)
    setSelectedCategory(null)
  }

  // Modal: Escape to close + simple focus trap + auto-focus on open
  useEffect(() => {
    if (!showResumeModal) return
    const node = modalRef.current
    const focusables = node?.querySelectorAll(FOCUSABLE)
    focusables?.[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        handleCloseModal()
        return
      }
      if (e.key !== 'Tab' || !focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [showResumeModal, step, handleCloseModal])

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
            AI Engineer · Building infrastructure for agentic systems · Published Researcher
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
          <motion.button
            ref={triggerRef}
            onClick={() => setShowResumeModal(true)}
            className="btn btn-accent"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-haspopup="dialog"
            aria-expanded={showResumeModal}
          >
            Download Resume <Download size={15} />
          </motion.button>
        </motion.div>

        {showResumeModal && (
          <div
            className="resume-modal-overlay"
            onClick={handleCloseModal}
            role="presentation"
          >
            <motion.div
              className="resume-modal-content"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-modal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {step === 2 && (
                <button className="back-btn" onClick={handleBack} aria-label="Back to domain selection">
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button className="close-modal" onClick={handleCloseModal} aria-label="Close resume picker">
                <X size={20} />
              </button>

              <h3 id="resume-modal-title" className="modal-title">
                {step === 1 ? 'Select a Domain' : groupedResumes[selectedCategory].title}
              </h3>
              <p className="modal-desc">
                {step === 1 ? 'Which domain are you hiring for?' : 'Which specific role aligns with your needs?'}
              </p>

              <div className="resume-options custom-scrollbar">
                {step === 1
                  ? Object.entries(groupedResumes).map(([id, group]) => (
                      <button key={id} className="resume-option-card quiz-option-card" onClick={() => handleCategorySelect(id)}>
                        <div className="option-icon" aria-hidden="true">{group.icon}</div>
                        <div className="option-text">
                          <strong>{group.title}</strong>
                          <span>{group.desc}</span>
                        </div>
                      </button>
                    ))
                  : resumeList
                      .filter((r) => groupedResumes[selectedCategory].roles.includes(r.id))
                      .map((resume) => (
                        <a
                          key={resume.id}
                          href={resume.path}
                          download={`Bharath_Kumar_${resume.title.replace(/ /g, '_')}_Resume.pdf`}
                          className="resume-option-card"
                        >
                          <div className="option-icon" aria-hidden="true">{resume.icon}</div>
                          <div className="option-text">
                            <strong>{resume.title}</strong>
                            <span>{resume.desc}</span>
                          </div>
                        </a>
                      ))}
              </div>
            </motion.div>
          </div>
        )}

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
