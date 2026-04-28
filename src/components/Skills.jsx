import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

// Honest proficiency tiers — recruiters trust these more than self-rated %.
const TIER = {
  core: { label: 'Core', rank: 4 },
  daily: { label: 'Daily', rank: 3 },
  working: { label: 'Working', rank: 2 },
  familiar: { label: 'Familiar', rank: 1 },
}

const skillCategories = [
  {
    title: 'AI / ML & Generative AI',
    color: 'var(--neon-cyan)',
    skills: [
      { name: 'LangChain / LangGraph / RAG', tier: 'core' },
      { name: 'OpenAI · Anthropic · Bedrock APIs', tier: 'core' },
      { name: 'PyTorch · TensorFlow · scikit-learn', tier: 'daily' },
      { name: 'Hugging Face Transformers', tier: 'daily' },
      { name: 'Agentic systems & tool-calling', tier: 'core' },
    ],
  },
  {
    title: 'NLP & Computer Vision',
    color: 'var(--neon-purple)',
    skills: [
      { name: 'NLP pipelines / text processing', tier: 'core' },
      { name: 'BERT · embedding models', tier: 'daily' },
      { name: 'FAISS / ChromaDB / vector search', tier: 'core' },
      { name: 'CNNs · ResNet · transfer learning', tier: 'daily' },
      { name: 'OpenCV · image pipelines', tier: 'working' },
    ],
  },
  {
    title: 'Data & Programming',
    color: 'var(--neon-pink)',
    skills: [
      { name: 'Python', tier: 'core' },
      { name: 'Pandas / NumPy', tier: 'core' },
      { name: 'SQL · PostgreSQL', tier: 'daily' },
      { name: 'Java · Spring Boot', tier: 'working' },
      { name: 'TypeScript · React', tier: 'daily' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    color: 'var(--neon-green)',
    skills: [
      { name: 'AWS (EC2, S3, RDS, Lambda)', tier: 'daily' },
      { name: 'Docker · Kubernetes', tier: 'working' },
      { name: 'CI/CD · GitHub Actions', tier: 'daily' },
      { name: 'FastAPI · Flask', tier: 'core' },
      { name: 'Linux · Bash · RHCSA', tier: 'daily' },
    ],
  },
]

const Skills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ rotate: -3, opacity: 0 }}
          animate={inView ? { rotate: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          SKILLS & TECH
        </motion.h2>

        <p className="skills-legend">
          <span className="legend-item"><span className="legend-dot legend-core" /> Core — daily, in production</span>
          <span className="legend-item"><span className="legend-dot legend-daily" /> Daily — frequent use</span>
          <span className="legend-item"><span className="legend-dot legend-working" /> Working — shipped projects</span>
          <span className="legend-item"><span className="legend-dot legend-familiar" /> Familiar — reading-level</span>
        </p>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category card"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              style={{ '--cat-color': category.color }}
            >
              <div className="skill-cat-header">
                <div
                  className="skill-cat-dot"
                  style={{ background: category.color, boxShadow: `0 0 10px ${category.color}` }}
                />
                <h3 style={{ color: category.color }}>{category.title}</h3>
              </div>

              <ul className="skill-list">
                {category.skills.map((skill, i) => {
                  const tier = TIER[skill.tier]
                  return (
                    <li key={i} className="skill-row">
                      <span className="skill-name">{skill.name}</span>
                      <span
                        className={`skill-tier tier-${skill.tier}`}
                        style={{ color: category.color, borderColor: `${category.color}33` }}
                        aria-label={`${skill.name}: ${tier.label} proficiency`}
                      >
                        <span className="tier-dots" aria-hidden="true">
                          {[1, 2, 3, 4].map((n) => (
                            <span
                              key={n}
                              className={`tier-dot ${n <= tier.rank ? 'on' : ''}`}
                              style={n <= tier.rank ? { background: category.color } : {}}
                            />
                          ))}
                        </span>
                        {tier.label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
