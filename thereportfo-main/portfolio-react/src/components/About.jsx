import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Database, Award, BookOpen } from 'lucide-react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { number: '3.86', label: 'MSCS GPA', icon: <Award size={20} />, color: 'var(--neon-cyan)' },
    { number: '1K+', label: 'Users Served', icon: <Database size={20} />, color: 'var(--neon-purple)' },
    { number: '90%', label: 'ML Accuracy', icon: <Brain size={20} />, color: 'var(--neon-pink)' },
    { number: '16+', label: 'Certifications', icon: <BookOpen size={20} />, color: 'var(--neon-green)' }
  ]

  return (
    <section className="about" id="about" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ABOUT ME
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text card"
            initial={{ x: -60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="about-intro">Hi, I'm Bharath.</p>
            <p>
              I'm an AI Engineer and published researcher based in New York City,
              currently completing my Master's in Computer Science at Pace University (3.86 GPA).
              I specialize in building AI systems, LLM pipelines, RAG architectures, and agentic workflows at scale.
            </p>
            <p>
              As a Graduate Assistant AI Engineering and Software Systems at Pace University,
              I design and deploy production RAG pipelines, NLP
              models, and multi-agent systems — serving 1,000+
              users and cutting hallucination rates by 35%.
            </p>
            <div className="about-highlight">
              <span className="highlight-icon">▶</span>
              <p>
                <strong>Seeking AI Engineer, ML Engineer, or Data Engineer roles — open to full-time from Summer 2026.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ x: 60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.05, y: -4 }}
                style={{ '--stat-color': stat.color }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="stat-number" style={{ color: stat.color }}>{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
