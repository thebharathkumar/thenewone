import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, CheckCircle, BookOpen } from 'lucide-react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { number: '10K+', label: 'Daily Users (Pace Platform)', icon: <Users size={20} />, color: 'var(--neon-cyan)' },
    { number: '12', label: 'Zero-Regression Releases', icon: <CheckCircle size={20} />, color: 'var(--neon-purple)' },
    { number: '2', label: 'Published Papers', icon: <BookOpen size={20} />, color: 'var(--neon-pink)' }
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
              I work on the infrastructure side of AI systems: multi-agent workflows, evaluation
              pipelines, and observability for LLM-based applications. The part that interests me
              is taking experimental agent setups and turning them into something that runs
              reliably in production, with the eval and trace layers doing real work instead of
              just being dashboards.
            </p>
            <p>
              At Pace I built a multi-agent platform on LangGraph and Claude (Amazon Bedrock)
              serving 10,000+ daily users, with per-step evaluation graders driving 12 consecutive
              zero-regression releases. Outside of that, I shipped <strong>agent-triage</strong>,
              a CLI for scoring multi-agent failure patterns with confidence scoring and
              regression mode, and <strong>mcp-otel-audit</strong>, a public conformance audit of
              the four major MCP OpenTelemetry instrumentations that the Pydantic Logfire and
              MCP-Python maintainer engaged with directly.
            </p>
            <p>
              I'm finishing my MS in Computer Science at Pace (3.86 GPA, May 2026) and looking
              for AI Engineer or Applied AI roles where the work is closer to agent
              infrastructure than model training.
            </p>
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
