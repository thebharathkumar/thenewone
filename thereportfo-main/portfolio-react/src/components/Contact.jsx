import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const contactItems = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'bharath.kr702@gmail.com',
      href: 'mailto:bharath.kr702@gmail.com',
      color: 'var(--neon-cyan)'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/thebharathkumar',
      href: 'https://linkedin.com/in/thebharathkumar',
      color: 'var(--neon-blue)'
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      value: 'github.com/thebharathkumar',
      href: 'https://github.com/thebharathkumar',
      color: 'var(--neon-purple)'
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'New York City, NY',
      href: null,
      color: 'var(--neon-pink)'
    }
  ]

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          LET'S CONNECT
        </motion.h2>

        <div className="contact-layout">
          <motion.div
            className="contact-message-box card"
            initial={{ x: -60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="contact-header">
              <Send size={24} color="var(--neon-cyan)" />
              <h3>Open to Opportunities</h3>
            </div>
            <p>
              I'm actively looking for <strong>Software Engineer</strong>, <strong>Data Engineer</strong>, or <strong>ML Engineer</strong> roles starting Summer 2026.
            </p>
            <p>
              Whether you have an exciting project, a job opportunity, or just want to talk AI — my inbox is always open. Let's build something amazing together!
            </p>
            <motion.a
              href="mailto:bharath.kr702@gmail.com"
              className="btn btn-primary contact-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={18} /> Send Me an Email
            </motion.a>
          </motion.div>

          <motion.div
            className="contact-links-box"
            initial={{ x: 60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-link card">
                    <span className="contact-link-icon" style={{ color: item.color }}>{item.icon}</span>
                    <div>
                      <div className="contact-link-label">{item.label}</div>
                      <div className="contact-link-value" style={{ color: item.color }}>{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="contact-link card">
                    <span className="contact-link-icon" style={{ color: item.color }}>{item.icon}</span>
                    <div>
                      <div className="contact-link-label">{item.label}</div>
                      <div className="contact-link-value" style={{ color: item.color }}>{item.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
