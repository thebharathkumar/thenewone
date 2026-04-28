import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const projects = [
    {
      title: 'agent-triage',
      year: '2026',
      description: 'A CLI that ingests multi-agent trace files and produces a ranked report of which failure patterns matter most. Patterns are scored across frequency, severity, and recovery, then surfaced with confidence levels, trend classification, and a regression mode for comparing two batches of runs.',
      highlights: ['95% Test Coverage', 'Confidence Scoring', 'Regression Mode'],
      tags: ['Python', 'Click', 'Pydantic', 'OpenTelemetry', 'pytest'],
      color: 'var(--neon-cyan)',
      featured: true,
      github: 'https://github.com/thebharathkumar/agent-triage'
    },
    {
      title: 'mcp-otel-audit',
      year: '2026',
      description: 'A reproducible audit harness comparing the four major MCP OpenTelemetry instrumentations against semantic-conventions v1.40.0. Each implementation runs the same MCP server in an isolated docker-compose stack, with raw OTLP captured and scored using OTel Weaver\'s live-check.',
      highlights: ['Maintainer Engagement', 'Published Writeup', 'OTel Semconv v1.40'],
      tags: ['Python 3.12', 'OpenTelemetry', 'OTel Weaver', 'Docker Compose', 'FastMCP'],
      color: 'var(--neon-purple)',
      featured: true,
      github: 'https://github.com/thebharathkumar/mcp-otel-audit',
      link: 'https://medium.com/@thebharathkumar/auditing-mcp-opentelemetry-instrumentations-8cbd0a8b6778'
    },
    {
      title: 'Large-Scale AI Information Retrieval System',
      year: '2026',
      description: 'Scalable distributed system with sub-100ms P99 query latency at 10K+ QPS. ML ranking pipeline (MRR@5: 92%), generative AI with RAG and semantic search across large-scale corpora. Containerized with Kubernetes auto-scaling and Prometheus/Grafana observability.',
      highlights: ['sub-100ms P99', '10K+ QPS', 'MRR@5: 92%'],
      tags: ['Python', 'Java', 'NLP', 'LangChain', 'FAISS', 'Docker', 'AWS', 'Kubernetes'],
      color: 'var(--neon-cyan)',
      featured: true
    },
    {
      title: 'AI Teaching Agent',
      year: '2025',
      description: 'Full-stack agentic AI platform with RAG architecture and FAISS vector search across lecture videos, audio, and PDFs. LangGraph multi-step reasoning agents with tool-calling, BERT-based NLP grading pipeline. Paper in preparation.',
      highlights: ['LangGraph Agents', 'FAISS Semantic Search', 'Paper in Prep'],
      tags: ['Python', 'LangGraph', 'LangChain', 'BERT', 'FAISS', 'OpenAI API', 'AWS'],
      color: 'var(--neon-purple)',
      featured: true
    },
    {
      title: 'Handwritten Medical Data Digitization',
      year: '2024',
      description: 'Deep learning models combining computer vision and NLP to digitize handwritten medical records into structured, searchable data. Applied ML algorithms for information retrieval and large-scale data processing.',
      highlights: ['Computer Vision + NLP', 'Information Retrieval', 'Healthcare AI'],
      tags: ['PyTorch', 'NLP', 'Computer Vision', 'Information Retrieval'],
      color: 'var(--neon-green)',
      featured: false
    },
    {
      title: 'Plant Disease Classification CNN',
      year: '2023',
      description: 'CNN research using ResNet-50 transfer learning for automated agricultural disease detection. Achieved 95% classification accuracy on 10K-image dataset. Published in Atlantis Press / Springer Nature.',
      highlights: ['95% Accuracy', 'ResNet-50', 'Springer Nature'],
      tags: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'OpenCV'],
      color: 'var(--neon-blue)',
      featured: false
    },
    {
      title: 'COVID-19 Sentiment Analysis',
      year: '2023',
      description: 'End-to-end NLP classification pipeline preprocessing 50K+ text records. ML models achieving 90% accuracy. Flask REST API for real-time predictions with TF-IDF feature engineering.',
      highlights: ['90% Accuracy', '50K+ Records', 'Real-time API'],
      tags: ['Python', 'Flask', 'NLP', 'scikit-learn', 'TF-IDF'],
      color: 'var(--neon-pink)',
      featured: false
    },
    {
      title: 'Open Source: Layer5 (CNCF)',
      year: '2023',
      description: 'Merged 5 PRs contributing 800+ lines across Go backend and TypeScript frontend of Meshery, a CNCF cloud-native management plane. Reduced container startup time 15% in CI benchmarks.',
      highlights: ['5 Merged PRs', '800+ Lines', '15% Faster CI'],
      tags: ['Go', 'TypeScript', 'Docker', 'Kubernetes', 'Networking'],
      color: 'var(--neon-orange)',
      featured: false
    }
  ]

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          PROJECTS & RESEARCH
        </motion.h2>

        {/* GitHub Banner */}
        <motion.a
          href="https://github.com/thebharathkumar"
          target="_blank"
          rel="noopener noreferrer"
          className="github-banner"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <Github size={18} />
          <span>All projects & source code available on <strong>github.com/thebharathkumar</strong></span>
        </motion.a>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card card ${project.featured ? 'featured' : ''}`}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.15 + index * 0.07, duration: 0.5 }}
              whileHover={{ y: -3 }}
              style={{ '--project-color': project.color }}
            >
              <div className="project-top-row">
                <span className="project-year">{project.year}</span>
                {project.featured && (
                  <span className="project-badge" style={{ color: project.color, borderColor: `${project.color}30` }}>
                    Featured
                  </span>
                )}
              </div>

              <h3>{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-highlights">
                {project.highlights.map((h, i) => (
                  <span key={i} className="highlight-chip" style={{ color: project.color, borderColor: `${project.color}25`, background: `${project.color}08` }}>
                    {h}
                  </span>
                ))}
              </div>

              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              {(project.github || project.link) && (
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{ color: project.color }}
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{ color: project.color }}
                      aria-label={`${project.title} writeup`}
                    >
                      <ExternalLink size={14} /> Writeup
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
