import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap } from 'lucide-react'
import './Education.css'

const Education = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const education = [
    {
      school: 'Pace University',
      degree: 'Master of Science in Computer Science',
      location: 'New York, NY',
      period: 'Aug 2024 – May 2026',
      gpa: '3.86 / 4.0',
      status: 'In Progress',
      highlights: ['Graduate Research Assistant', 'AI & ML specialization']
    },
    {
      school: 'Visvesvaraya Technological University (VTU)',
      degree: 'Bachelor of Engineering in Computer Science',
      location: 'Bangalore, India',
      period: '2020 – 2024',
      gpa: null,
      status: 'Completed',
      highlights: ['Technical Lead – VCET Tech Club', 'Published IEEE researcher']
    }
  ]

  return (
    <section className="education" id="education" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: -40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          EDUCATION
        </motion.h2>

        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-card card"
              initial={{ y: 60, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6 }}
            >
              <div className="edu-top">
                <div className="edu-icon">
                  <GraduationCap size={26} />
                </div>
                <span className={`edu-status ${edu.status === 'In Progress' ? 'in-progress' : 'completed'}`}>
                  {edu.status}
                </span>
              </div>

              <h3>{edu.school}</h3>
              <p className="degree">{edu.degree}</p>

              <div className="edu-meta">
                <span>{edu.location}</span>
                <span className="edu-period">{edu.period}</span>
              </div>

              {edu.gpa && (
                <div className="gpa-badge">
                  <span className="gpa-label">GPA</span>
                  <span className="gpa-value">{edu.gpa}</span>
                </div>
              )}

              <div className="edu-highlights">
                {edu.highlights.map((h, i) => (
                  <span key={i} className="edu-chip">▸ {h}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
