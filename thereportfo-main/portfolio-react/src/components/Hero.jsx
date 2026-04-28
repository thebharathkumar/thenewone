import { useRef, useMemo, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Download, Mail, ArrowRight, Github, Linkedin, X, ArrowLeft } from 'lucide-react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'
import './Hero.css'

// ─── Interactive Thermal Glow ──────────────────────────────────────────────────
const InteractiveThermalGlow = () => {
  const lightRef = useRef()
  const meshRef = useRef()
  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    // Convert 2D mouse [-1, 1] to 3D world coordinates over the canvas viewport
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    if (lightRef.current && meshRef.current) {
      // Smoothly interpolate the light/mesh towards mouse position
      lightRef.current.position.lerp(new THREE.Vector3(x, y, 1), 0.15)
      meshRef.current.position.lerp(new THREE.Vector3(x, y, 0), 0.15)
    }
  })

  return (
    <>
      <pointLight ref={lightRef} color="#fb923c" intensity={4} distance={6} decay={2} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  )
}

// ─── Neural Network Particle Field ───────────────────────────────────────────
const NeuralNetwork = ({ color }) => {
  const pointsRef = useRef()
  const linesRef = useRef()

  const { positions, linePositions } = useMemo(() => {
    const nodeCount = 28
    const pos = []
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 6
      const z = (Math.random() - 0.5) * 5
      nodes.push([x, y, z])
      pos.push(x, y, z)
    }

    const linePos = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i][0] - nodes[j][0]
        const dy = nodes[i][1] - nodes[j][1]
        const dz = nodes[i][2] - nodes[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 3.5) linePos.push(...nodes[i], ...nodes[j])
      }
    }

    return { positions: new Float32Array(pos), linePositions: new Float32Array(linePos) }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.05
      linesRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} color={color} transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.1} />
      </lineSegments>
    </>
  )
}

// ─── Pulsing Orb ─────────────────────────────────────────────────────────────
const PulsingOrb = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4
      const s = 1 + Math.sin(state.clock.elapsedTime * speed * 1.5) * 0.1
      meshRef.current.scale.setScalar(s)
    }
  })
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.8} />
    </mesh>
  )
}

// ─── Rotating Ring ────────────────────────────────────────────────────────────
const RotatingRing = ({ color }) => {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.014, 8, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.55} />
    </mesh>
  )
}

// ─── Floating Ring ────────────────────────────────────────────────────────────
const FloatingRing = ({ color }) => {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 3 + state.clock.elapsedTime * 0.15
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={[3, 0.5, 0]}>
      <torusGeometry args={[1, 0.011, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5} />
    </mesh>
  )
}

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

// ─── Hero Main ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setStep(2)
  }

  const handleCloseModal = () => {
    setShowResumeModal(false)
    setStep(1)
    setSelectedCategory(null)
  }

  const handleBack = () => {
    setStep(1)
    setSelectedCategory(null)
  }

  const groupedResumes = {
    'ai_data': {
      title: 'AI & Data',
      desc: 'Machine Learning, Data Science, and AI Engineering',
      icon: '🧠',
      roles: ['ai', 'ml', 'research', 'data', 'analyst']
    },
    'swe_infra': {
      title: 'Software & Infrastructure',
      desc: 'Fullstack, Backend, Cloud, and SRE',
      icon: '💻',
      roles: ['swe', 'fullstack', 'backend', 'cloud', 'devops', 'sre', 'qa']
    },
    'product_advocacy': {
      title: 'Product & Advocacy',
      desc: 'Product Management, Solutions, and DevRel',
      icon: '🥑',
      roles: ['solutions', 'devrel', 'aipm', 'techpm']
    }
  }

  const bgColor = isLight ? '#E6D8C3' : '#0b0f1e'
  const cCyan = isLight ? '#3E4A3F' : '#67e8f9'
  const cPurple = isLight ? '#4A584B' : '#c4b5fd'
  const cPink = isLight ? '#5B6B5D' : '#f9a8d4'

  return (
    <section className="hero" id="home">
      <div className="hero-3d-background">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <color attach="background" args={[bgColor]} />
          <ambientLight intensity={isLight ? 0.8 : 0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color={cCyan} />
          <pointLight position={[-5, -5, 3]} intensity={0.8} color={cPurple} />
          <pointLight position={[0, 8, -4]} intensity={0.6} color={cPink} />

          {!isLight && <Stars radius={60} depth={40} count={2000} factor={3} saturation={0} fade speed={0.4} />}
          <NeuralNetwork color={cCyan} />
          <RotatingRing color={cPurple} />
          <FloatingRing color={cPink} />
          <PulsingOrb position={[-3.5, 1.5, 0]} color={cCyan} speed={0.8} />
          <PulsingOrb position={[4, -1.5, -1]} color={cPurple} speed={1.2} />
          <PulsingOrb position={[-1, -2, 1]} color={cPink} speed={0.6} />

          {isLight && <InteractiveThermalGlow />}

          <OrbitControls
            enableZoom={false} enablePan={false}
            autoRotate autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      <div className="hero-container container">
        {/* Status Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <span className="badge-dot" />
          Open to Opportunities • Summer 2026
        </motion.div>

        {/* Name — single h1, white-space:nowrap, fluid font-size */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 90 }}
        >
          BHARATH KUMAR RAJESH
        </motion.h1>

        {/* Tagline Box */}
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

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          MS Computer Science @ Pace University&nbsp;&nbsp;|&nbsp;&nbsp;New York City
        </motion.p>

        {/* Buttons */}
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
          <motion.button onClick={() => setShowResumeModal(true)} className="btn btn-accent" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Download Resume <Download size={15} />
          </motion.button>
        </motion.div>

        {/* Resume Selection Modal */}
        {showResumeModal && (
          <div className="resume-modal-overlay" onClick={handleCloseModal}>
            <motion.div
              className="resume-modal-content"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {step === 2 && (
                <button className="back-btn" onClick={handleBack}>
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button className="close-modal" onClick={handleCloseModal}>
                <X size={20} />
              </button>

              <h3 className="modal-title">
                {step === 1 ? 'Select a Domain' : groupedResumes[selectedCategory].title}
              </h3>
              <p className="modal-desc">
                {step === 1 ? 'Which domain are you hiring for?' : 'Which specific role aligns with your needs?'}
              </p>

              <div className="resume-options custom-scrollbar">
                {step === 1 ? (
                  Object.entries(groupedResumes).map(([id, group]) => (
                    <button key={id} className="resume-option-card quiz-option-card" onClick={() => handleCategorySelect(id)}>
                      <div className="option-icon">{group.icon}</div>
                      <div className="option-text">
                        <strong>{group.title}</strong>
                        <span>{group.desc}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  resumeList.filter(r => groupedResumes[selectedCategory].roles.includes(r.id)).map((resume) => (
                    <a key={resume.id} href={resume.path} download={`Bharath_Kumar_${resume.title.replace(/ /g, '_')}_Resume.pdf`} className="resume-option-card">
                      <div className="option-icon">{resume.icon}</div>
                      <div className="option-text">
                        <strong>{resume.title}</strong>
                        <span>{resume.desc}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Social Links */}
        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.a href="https://github.com/thebharathkumar" target="_blank" rel="noopener noreferrer"
            className="social-link" whileHover={{ scale: 1.2 }}>
            <Github size={22} />
          </motion.a>
          <motion.a href="https://linkedin.com/in/thebharathkumar" target="_blank" rel="noopener noreferrer"
            className="social-link" whileHover={{ scale: 1.2 }}>
            <Linkedin size={22} />
          </motion.a>
        </motion.div>

        <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <motion.div className="scroll-dot" animate={{ y: [0, 9, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ backgroundColor: cCyan }} />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
