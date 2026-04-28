import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Code2, Users, Mic2 } from 'lucide-react'
import './Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const experiences = [
    {
      title: 'Graduate Assistant AI Engineering and Software Systems',
      company: 'Pace University',
      location: 'New York, NY',
      date: 'Mar 2025 – Present',
      current: true,
      icon: <Briefcase size={16} />,
      description: [
        'Designed and deployed AI/ML models for document intelligence: NLP text extraction and parsing over 50K+ records',
        'Built production RAG pipeline using LangChain, OpenAI embeddings, and ChromaDB — 92% retrieval accuracy, monitored via Grafana',
        'Developed agentic workflows with tool-calling and multi-agent orchestration, reducing inference costs by 40%',
        'Built automated ML evaluation framework with regression testing; reduced hallucination rate by 35%'
      ],
      tags: ['Python', 'LangChain', 'ChromaDB', 'OpenAI', 'RAG', 'FastAPI']
    },
    {
      title: 'Campus Ambassador',
      company: 'Perplexity AI',
      location: 'Pace University, New York',
      date: '2025 – Present',
      current: true,
      icon: <Mic2 size={16} />,
      description: [
        'Driving adoption of AI tools and developer education at Pace University',
        'Organizing workshops and events to promote Perplexity AI among students and researchers',
        'Bridging AI product innovation with academic community engagement'
      ],
      tags: ['AI Education', 'Developer Advocacy', 'Community Building', 'Generative AI']
    },
    {
      title: 'Software Development Intern',
      company: "Let's Be The Change",
      location: 'Bangalore, India',
      date: 'Sep 2023 – May 2024',
      current: false,
      icon: <Code2 size={16} />,
      description: [
        'Developed a Flutter-based community engagement app serving 1,000+ active users on iOS and Android',
        'Built a web administration portal using React and Node.js for managing app features and monitoring user activity',
        'Deployed scalable backend on AWS (EC2, RDS, S3) with PostgreSQL; reduced API latency from 2s → 400ms'
      ],
      tags: ['Flutter', 'Dart', 'React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      title: 'Machine Learning Research Intern',
      company: 'Compsoft Technologies',
      location: 'Bangalore, India',
      date: 'Aug 2023 – Sep 2023',
      current: false,
      icon: <Briefcase size={16} />,
      description: [
        'Developed ML model for sentiment analysis on social media data achieving 90% accuracy',
        'Engineered Flask web application for real-time predictions with REST API',
        'Published research paper on sentiment analysis techniques in IEEE conference'
      ],
      tags: ['Python', 'Flask', 'NLP', 'scikit-learn', 'ML Research']
    },
    {
      title: 'Data Science Intern',
      company: 'Pantechelearning',
      location: 'Chennai, India',
      date: 'Jun 2023 – Jul 2023',
      current: false,
      icon: <Code2 size={16} />,
      description: [
        'Built data visualization dashboards using Python (Matplotlib, Seaborn) for business analytics',
        'Performed exploratory data analysis on customer behavior datasets (100K+ records)',
        'Automated data cleaning and preprocessing pipelines using Pandas and NumPy'
      ],
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Alltramatic',
      location: 'Bangalore, India',
      date: 'Dec 2022 – Feb 2023',
      current: false,
      icon: <Code2 size={16} />,
      description: [
        'Developed RESTful APIs using Spring Boot and Java for e-commerce platform',
        'Implemented authentication and authorization using JWT and Spring Security',
        'Optimized database queries, reducing API response time by 40%'
      ],
      tags: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'JWT']
    },
    {
      title: 'Open Source Contributor',
      company: 'Layer5 (CNCF)',
      location: 'Remote',
      date: 'Mar 2023 – Aug 2023',
      current: false,
      icon: <Code2 size={16} />,
      description: [
        'Merged 5 PRs contributing 800+ lines across Go backend and TypeScript frontend of Meshery (cloud-native management plane)',
        'Reduced container startup time by 15% in CI benchmarks; delivered through collaborative code review'
      ],
      tags: ['Go', 'TypeScript', 'Kubernetes', 'Docker', 'CNCF']
    },
    {
      title: 'Technical Lead – Core Team',
      company: 'VCET Tech Club',
      location: 'Bangalore, India',
      date: 'Aug 2021 – May 2024',
      current: false,
      icon: <Users size={16} />,
      description: [
        'Led technical team of 15+ members organizing coding competitions and hackathons',
        'Mentored 100+ students in web development; organized annual tech fest with 500+ participants'
      ],
      tags: ['Leadership', 'Mentoring', 'Event Management']
    }
  ]

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          EXPERIENCE
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.07, duration: 0.45 }}
            >
              <div className="timeline-connector">
                <div className="timeline-marker">{exp.icon}</div>
                {index < experiences.length - 1 && <div className="timeline-line" />}
              </div>

              <motion.div
                className="timeline-content card"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  {exp.current && <span className="badge-current">Current</span>}
                </div>
                <div className="timeline-meta">
                  <span className="meta-company">{exp.company}</span>
                  <span className="meta-sep">·</span>
                  <span>{exp.location}</span>
                  <span className="meta-sep">·</span>
                  <span className="meta-date">{exp.date}</span>
                </div>
                <ul className="exp-list">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="tags">
                  {exp.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
