import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const skillCategories = [
    {
      title: 'AI / ML & Generative AI',
      color: 'var(--neon-cyan)',
      skills: [
        { name: 'PyTorch / TensorFlow', level: 88 },
        { name: 'LangChain / RAG Pipelines', level: 92 },
        { name: 'Hugging Face / LLMs', level: 85 },
        { name: 'OpenAI API / Agentic AI', level: 90 },
        { name: 'scikit-learn', level: 88 }
      ]
    },
    {
      title: 'NLP & Computer Vision',
      color: 'var(--neon-purple)',
      skills: [
        { name: 'NLP / Text Processing', level: 90 },
        { name: 'CNNs / Transfer Learning', level: 86 },
        { name: 'OpenCV / Image Processing', level: 80 },
        { name: 'ChromaDB / Vector DBs', level: 88 },
        { name: 'ResNet / BERT', level: 82 }
      ]
    },
    {
      title: 'Data & Programming',
      color: 'var(--neon-pink)',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Pandas / NumPy', level: 92 },
        { name: 'SQL / PostgreSQL', level: 85 },
        { name: 'Java / Spring Boot', level: 78 },
        { name: 'JavaScript / React', level: 82 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      color: 'var(--neon-green)',
      skills: [
        { name: 'AWS (EC2, S3, RDS)', level: 85 },
        { name: 'Docker / Kubernetes', level: 80 },
        { name: 'CI/CD / Git', level: 88 },
        { name: 'FastAPI / Flask', level: 90 },
        { name: 'Linux / Shell', level: 82 }
      ]
    }
  ]

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
                <div className="skill-cat-dot" style={{ background: category.color, boxShadow: `0 0 10px ${category.color}` }} />
                <h3 style={{ color: category.color }}>{category.title}</h3>
              </div>

              <div className="skill-bars">
                {category.skills.map((skill, i) => (
                  <div key={i} className="skill-bar-item">
                    <div className="skill-bar-label">
                      <span>{skill.name}</span>
                      <span className="skill-bar-pct" style={{ color: category.color }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        style={{ background: `linear-gradient(90deg, ${category.color}66, ${category.color})` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ delay: catIndex * 0.1 + i * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
