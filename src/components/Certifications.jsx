import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import './Certifications.css'

const Certifications = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const featured = [
    {
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: 'Jan 2026',
      color: 'var(--neon-cyan)',
      code: 'SAA-C03',
      skills: ['Solution Architecture', 'AWS']
    },
    {
      title: 'Red Hat Certified System Administrator',
      issuer: 'Red Hat',
      date: 'Jul 2022',
      color: 'var(--neon-pink)',
      code: 'RHCSA RH199',
      skills: ['Linux', 'Systems Administration']
    },
    {
      title: 'Claude with Amazon Bedrock',
      issuer: 'Anthropic',
      date: 'Mar 2026',
      color: 'var(--neon-purple)',
      code: 'Anthropic',
      skills: ['Amazon Bedrock', 'Claude']
    }
  ]

  const additional = [
    { title: 'Certified for AI', issuer: 'micro1', date: '2025', skills: ['Artificial Intelligence'] },
    { title: 'AWS Educate Introduction to Cloud 101', issuer: 'Amazon Web Services', date: 'Oct 2025', skills: ['AWS', 'Cloud'] },
    { title: 'J.P. Morgan – Quantitative Research Job Simulation', issuer: 'Forage', date: 'Jul 2025', id: 'hoPh7a7vqXQfGqgzx' },
    { title: 'Accenture – Data Analytics & Visualization Simulation', issuer: 'Forage', date: 'Jan 2025', skills: ['Apache Airflow', 'Data Analysis'], id: 'sFbZfjtCdyX4Wgyv6' },
    { title: 'Citi – Technology Software Development Simulation', issuer: 'Forage', date: 'Jan 2025', skills: ['Java', 'Project Management'], id: 'TWDfAim4G3wgr2HLt' },
    { title: 'INSPIRE Program Certification', issuer: 'Pace University', date: 'Dec 2024', skills: ['Career Development', 'Interpersonal Skills'] },
    { title: 'Artificial Intelligence Job Simulation', issuer: 'Cognizant', date: 'Sep 2023', skills: ['MLOps', 'PyTorch', 'AWS'] },
    { title: 'Advanced Artificial Intelligence Certification', issuer: 'Unschool', date: 'Aug 2023', skills: ['Deep Learning', 'Machine Learning'] },
    { title: 'Getting Started with AWS Machine Learning', issuer: 'Coursera', date: 'May 2021', id: 'Y4D4E3VNF6YP' },
    { title: 'Artificial Intelligence Certification Course', issuer: 'Programming Hub', date: 'May 2021' },
    { title: 'Git Certification', issuer: 'Programming Hub', date: 'Jul 2021' },
    { title: 'Java', issuer: 'Programming Hub', date: 'May 2021' },
    { title: 'C++ Programming', issuer: 'Programming Hub', date: 'May 2021' },
  ]

  return (
    <section className="certifications" id="certifications" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          CERTIFICATIONS
        </motion.h2>

        {/* ─ Featured Certs ─ */}
        <div className="cert-featured-grid">
          {featured.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-featured-card card"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
              style={{ '--cert-color': cert.color }}
            >
              <div className="cert-code" style={{ color: cert.color }}>{cert.code}</div>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <div className="cert-footer">
                <span className="cert-date">{cert.date}</span>
                <div className="cert-skills">
                  {cert.skills?.map((s, i) => (
                    <span key={i} className="cert-skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─ Additional Learning (collapsed) ─ */}
        <details className="cert-additional-details">
          <summary className="cert-additional-summary">
            <span>Additional Learning</span>
            <span className="cert-additional-count">{additional.length} items</span>
            <span className="cert-additional-chevron" aria-hidden="true">▾</span>
          </summary>

          <div className="cert-list">
            {additional.map((cert, index) => (
              <div key={index} className="cert-list-item">
                <div className="cert-list-dot" />
                <div className="cert-list-content">
                  <span className="cert-list-title">{cert.title}</span>
                  <span className="cert-list-meta">{cert.issuer} · {cert.date}</span>
                </div>
                {cert.skills && (
                  <div className="cert-list-skills">
                    {cert.skills.map((s, i) => (
                      <span key={i} className="cert-skill-tag">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}

export default Certifications
