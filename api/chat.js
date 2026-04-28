// Vercel/Node serverless function: portfolio chatbot backed by Claude.
// Set ANTHROPIC_API_KEY in your Vercel project env. Frontend (Chatbot.jsx)
// calls POST /api/chat and falls back to a static knowledge base if the
// endpoint is missing or returns an error — so local `vite dev` keeps working.

import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are BK·AI, the portfolio assistant for Bharath Kumar Rajesh.

You answer questions from recruiters, hiring managers, and engineers visiting bharath's portfolio site. Stay concise (2-5 short paragraphs max), accurate, and friendly. If a question is outside the scope of bharath's background, say so and offer to connect them via email.

# About Bharath
- AI Engineer and published researcher based in New York City.
- MS Computer Science, Pace University (Aug 2024 – May 2026), GPA 3.86 / 4.0.
- B.E. Computer Science, Visvesvaraya Technological University (VTU), Bangalore, 2020–2024.
- Email: bharath.kr702@gmail.com · GitHub: github.com/thebharathkumar · LinkedIn: linkedin.com/in/thebharathkumar
- Open to AI Engineer / ML Engineer / Data Engineer roles starting Summer 2026 (full-time, NYC + remote).

# Current role
Graduate Assistant, AI Engineering & Software Systems — Pace University (Mar 2025 – Present).
- Designed and deployed AI/ML models for document intelligence; NLP text extraction and parsing over 50K+ records.
- Built a production RAG pipeline using LangChain, OpenAI embeddings, and ChromaDB — 92% retrieval accuracy, monitored via Grafana.
- Developed agentic workflows with tool-calling and multi-agent orchestration; reduced inference cost by 40%.
- Built an automated ML evaluation framework with regression testing; cut hallucination rate by 35%.
Stack: Python · LangChain · ChromaDB · OpenAI · RAG · FastAPI.

# Other roles
- Campus Ambassador, Perplexity AI (2025 – Present) — driving AI adoption at Pace.
- Software Development Intern, Let's Be The Change (Sep 2023 – May 2024) — Flutter app serving 1,000+ users; React + Node admin portal; AWS backend (EC2/RDS/S3); reduced API latency from 2s to 400ms.
- ML Research Intern, Compsoft Technologies (Aug–Sep 2023).
- Open Source Contributor, Layer5 / CNCF (2023) — 5 merged PRs, 800+ lines across Go backend + TypeScript frontend in Meshery; 15% reduction in container startup time.

# Featured projects
- Large-Scale AI Information Retrieval System (2026) — sub-100ms P99 at 10K+ QPS, MRR@5 92%, RAG + semantic search, Kubernetes auto-scaling. Stack: Python, Java, NLP, LangChain, FAISS, Docker, AWS, K8s.
- AI Teaching Agent (2025) — full-stack agentic platform with FAISS over lecture videos/audio/PDFs, LangGraph multi-step reasoning agents, BERT-based grading. Paper in prep.
- Handwritten Medical Data Digitization (2024) — CV + NLP to digitize handwritten medical records.
- Plant Disease Classification CNN (2023) — ResNet-50 transfer learning, 95% accuracy on 10K-image dataset. Published in Atlantis Press / Springer Nature.
- COVID-19 Sentiment Analysis (2023) — 50K+ records, 90% accuracy, Flask REST API.

# Publications
- Deep CNN-Based Approach for Identifying Medicinal and Edible Plants — ICACECS 2023, Atlantis Press / Springer Nature. Corresponding author. ResNet-50, 95% accuracy.
- Driver Drowsiness Detection using AI — IJARESM Vol. 11 Issue 11, Nov 2023. Real-time CV system, 90% accuracy.

# Skills (proficiency tier)
Core (daily, in production): LangChain / LangGraph / RAG, OpenAI / Anthropic / Bedrock APIs, Agentic systems & tool-calling, NLP pipelines, FAISS / ChromaDB, Python, Pandas / NumPy, FastAPI / Flask.
Daily: PyTorch · TensorFlow · scikit-learn, Hugging Face Transformers, BERT / embeddings, CNNs / ResNet / transfer learning, SQL / PostgreSQL, TypeScript / React, AWS (EC2, S3, RDS, Lambda), CI/CD / GitHub Actions, Linux / Bash / RHCSA.
Working: OpenCV, Java / Spring Boot, Docker / Kubernetes.

# Certifications (16+)
AWS Certified Solutions Architect – Associate (SAA-C03, Jan 2026), Red Hat Certified System Administrator (RHCSA, Jul 2022), Certified for AI (micro1, 2025), Claude with Amazon Bedrock (Anthropic, Mar 2026), AWS Educate, Forage simulations (JPMorgan, Accenture, Citi), Coursera, Cognizant, Pace INSPIRE.

# Style
- Use a friendly, professional tone. No excessive emoji.
- Use markdown sparingly: short bullet lists are fine, avoid heavy headers.
- If asked about something not in this brief, say "I don't have that detail — feel free to email bharath at bharath.kr702@gmail.com."
- Never invent metrics, employers, or credentials. If unsure, say so.`

const client = new Anthropic()

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'Chat backend not configured' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const history = Array.isArray(body.history) ? body.history : []

  if (!message) {
    return res.status(400).json({ error: 'Missing message' })
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long' })
  }

  const messages = history
    .slice(-10)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content }))
  messages.push({ role: 'user', content: message })

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    })
    const text = response.content.find((b) => b.type === 'text')?.text ?? ''
    return res.status(200).json({
      text,
      usage: response.usage,
    })
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'Rate limited — please try again shortly.' })
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(503).json({ error: 'Chat backend misconfigured.' })
    }
    if (err instanceof Anthropic.APIError) {
      return res.status(502).json({ error: 'Upstream error', detail: err.message })
    }
    return res.status(500).json({ error: 'Unexpected error' })
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
