#!/bin/bash

# Skills Component
cat > src/components/Skills.jsx << 'EOF'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const skillCategories = [
    { title: 'Languages', skills: ['Python', 'SQL', 'JavaScript', 'Java', 'Dart', 'C++'] },
    { title: 'Frameworks', skills: ['React', 'Flutter', 'Flask', 'TensorFlow', 'PyTorch'] },
    { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD'] },
    { title: 'Data & ML', skills: ['Spark', 'Airflow', 'NLP', 'CNNs', 'MLOps', 'Power BI'] }
  ]

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ rotate: -5, opacity: 0 }}
          animate={inView ? { rotate: 0, opacity: 1 } : {}}
        >
          SKILLS & TECH
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category card"
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.1, type: 'spring' }}
            >
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="tag"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {skill}
                  </motion.span>
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
EOF

cat > src/components/Skills.css << 'EOF'
.skills {
  background: var(--bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.skill-category h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  background: var(--accent-yellow);
  border: 3px solid var(--black);
  padding: 10px;
  margin: -32px -32px 20px -32px;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
EOF

# Education Component
cat > src/components/Education.jsx << 'EOF'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap } from 'lucide-react'
import './Education.css'

const Education = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const education = [
    {
      school: 'Pace University',
      degree: 'Master of Science in Computer Science',
      location: 'New York, NY',
      period: 'Aug 2024 - May 2026',
      gpa: '3.86/4.0'
    },
    {
      school: 'Jyothy Institute of Technology (VTU)',
      degree: 'Bachelor of Engineering in Computer Science',
      location: 'Bangalore, India',
      period: '2020 - 2024'
    }
  ]

  return (
    <section className="education" id="education" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: -50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
        >
          EDUCATION
        </motion.h2>

        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-card card"
              initial={{ y: 100, opacity: 0, rotate: -5 }}
              animate={inView ? { y: 0, opacity: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.2, type: 'spring' }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="edu-icon">
                <GraduationCap size={40} />
              </div>
              <h3>{edu.school}</h3>
              <p className="degree">{edu.degree}</p>
              <div className="edu-meta">
                <span>{edu.location}</span>
                <span>{edu.period}</span>
              </div>
              {edu.gpa && (
                <div className="gpa-badge">{edu.gpa} GPA</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
EOF

cat > src/components/Education.css << 'EOF'
.education {
  background: var(--white);
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.education-card {
  text-align: center;
}

.edu-icon {
  width: 80px;
  height: 80px;
  background: var(--accent-blue);
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: var(--shadow-brutal);
}

.education-card h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.degree {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 15px 0;
}

.edu-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  font-weight: 600;
}

.gpa-badge {
  display: inline-block;
  background: var(--accent-yellow);
  border: 3px solid var(--black);
  padding: 8px 20px;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  box-shadow: 4px 4px 0px var(--black);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .education-grid {
    grid-template-columns: 1fr;
  }
}
EOF

# Contact Component (NO PHONE NUMBER)
cat > src/components/Contact.jsx << 'EOF'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Linkedin, Github, MapPin } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring' }}
        >
          LET'S CONNECT
        </motion.h2>

        <motion.div
          className="contact-content"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
        >
          <div className="contact-box card">
            <p className="contact-message">
              Looking for Software Engineer, Data Engineer, or ML Engineer roles starting Summer 2026. 
              Let's build something amazing together!
            </p>

            <div className="contact-links">
              <motion.a
                href="mailto:bharath.kr702@gmail.com"
                className="contact-link"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Mail size={24} />
                bharath.kr702@gmail.com
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/thebharathkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <Linkedin size={24} />
                linkedin.com/in/thebharathkumar
              </motion.a>

              <motion.a
                href="https://github.com/thebharathkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Github size={24} />
                github.com/thebharathkumar
              </motion.a>

              <motion.div
                className="contact-link"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin size={24} />
                New York City, NY
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
EOF

cat > src/components/Contact.css << 'EOF'
.contact {
  background: var(--bg-secondary);
}

.contact-content {
  max-width: 800px;
  margin: 60px auto 0;
}

.contact-box {
  background: var(--accent-yellow);
  text-align: center;
}

.contact-message {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.8;
  margin-bottom: 40px;
}

.contact-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--white);
  border: var(--border);
  padding: 20px;
  font-weight: 600;
  color: var(--black);
  text-decoration: none;
  box-shadow: var(--shadow-brutal);
  transition: all 0.3s ease;
}

.contact-link:hover {
  transform: translate(-4px, -4px);
  box-shadow: var(--shadow-brutal-lg);
}
EOF

# Simple components
cat > src/components/Certifications.jsx << 'EOF'
import './Certifications.css'

const Certifications = () => (
  <section className="certifications" id="certifications">
    <div className="container">
      <h2 className="section-title">CERTIFICATIONS</h2>
      <div className="cert-grid">
        <div className="cert-card card">
          <h3>AWS Solutions Architect</h3>
          <p>Amazon Web Services • Jan 2026</p>
        </div>
        <div className="cert-card card">
          <h3>RHCSA</h3>
          <p>Red Hat • Jul 2022</p>
        </div>
      </div>
    </div>
  </section>
)

export default Certifications
EOF

cat > src/components/Certifications.css << 'EOF'
.certifications {
  background: var(--white);
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.cert-card {
  text-align: center;
}

.cert-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--accent-blue);
}
EOF

cat > src/components/Publications.jsx << 'EOF'
import './Publications.css'

const Publications = () => (
  <section className="publications" id="publications">
    <div className="container">
      <h2 className="section-title">PUBLICATIONS</h2>
      <div className="publication-card card">
        <span className="pub-badge">PEER-REVIEWED</span>
        <h3>Deep Learning for Plant Disease Classification</h3>
        <p>Atlantis Highlights in Engineering, Springer Nature • Sep 2023</p>
      </div>
    </div>
  </section>
)

export default Publications
EOF

cat > src/components/Publications.css << 'EOF'
.publications {
  background: var(--bg-secondary);
}

.publication-card {
  max-width: 800px;
  margin: 60px auto 0;
  text-align: center;
  background: var(--accent-pink);
  color: var(--white);
}

.pub-badge {
  background: var(--accent-yellow);
  color: var(--black);
  border: 3px solid var(--black);
  padding: 8px 16px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 20px;
}

.publication-card h3 {
  font-size: 2rem;
  margin: 20px 0;
}
EOF

cat > src/components/Footer.jsx << 'EOF'
import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>&copy; 2026 Bharath Kumar Rajesh. Built with React, Three.js & Framer Motion</p>
    </div>
  </footer>
)

export default Footer
EOF

cat > src/components/Footer.css << 'EOF'
.footer {
  background: var(--black);
  color: var(--white);
  padding: 40px 0;
  text-align: center;
  border-top: var(--border-thick);
}

.footer p {
  font-size: 1rem;
  font-weight: 600;
}
EOF

cat > src/components/BackToTop.jsx << 'EOF'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      className="back-to-top"
      onClick={scrollToTop}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp size={24} />
    </motion.button>
  )
}

export default BackToTop
EOF

cat > src/components/BackToTop.css << 'EOF'
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  background: var(--accent-pink);
  color: var(--white);
  border: var(--border);
  cursor: pointer;
  box-shadow: var(--shadow-brutal);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
}
EOF

echo "All remaining components created successfully!"
