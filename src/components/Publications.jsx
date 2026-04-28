import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import './Publications.css'

const Publications = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const publications = [
    {
      badge: 'Atlantis Press / Springer Nature',
      badgeColor: 'var(--neon-purple)',
      conference: 'ICACECS 2023',
      title: 'Deep CNN-Based Approach for Identifying Medicinal and Edible Plants',
      date: 'Sep 2023',
      role: 'Corresponding Author',
      description: 'Trained CNN architectures using ResNet-50 transfer learning with image processing (OpenCV, PyTorch). Achieved 95% classification accuracy on 10K-image dataset for automated agricultural and medicinal plant identification.',
      tags: ['CNN', 'ResNet-50', 'PyTorch', 'Computer Vision', 'Transfer Learning'],
      link: 'https://www.atlantis-press.com/proceedings/icacecs-23/125995742'
    },
    {
      badge: 'IJARESM',
      badgeColor: 'var(--neon-cyan)',
      conference: 'Vol. 11, Issue 11 • Nov 2023',
      title: 'Driver Drowsiness Detection using AI',
      date: 'Nov 2023',
      role: null,
      description: 'Developed real-time computer vision system for detecting driver drowsiness using AI-based deep learning techniques, enhancing road safety detection accuracy by 90%.',
      tags: ['Computer Vision', 'AI Safety', 'Real-time Systems', 'Deep Learning'],
      link: 'https://www.ijaresm.com/sahasransu-mohanty'
    }
  ]

  return (
    <section className="publications" id="publications" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          PUBLICATIONS
        </motion.h2>

        <div className="publications-grid">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              className="publication-card card"
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ y: -3 }}
              style={{ '--pub-color': pub.badgeColor }}
            >
              <div className="pub-header">
                <span className="pub-peer-label">✦ PEER-REVIEWED</span>
                <span className="pub-venue" style={{ color: pub.badgeColor }}>{pub.badge}</span>
              </div>

              <div className="pub-conference">{pub.conference}</div>
              <h3>{pub.title}</h3>

              {pub.role && (
                <span className="pub-role">{pub.role}</span>
              )}

              <p className="pub-desc">{pub.description}</p>

              <div className="tags">
                {pub.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="pub-link btn btn-secondary">
                <ExternalLink size={14} /> Read Publication
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Publications
