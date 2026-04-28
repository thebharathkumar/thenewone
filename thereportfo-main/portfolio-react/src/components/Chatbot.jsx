import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Minimize2 } from 'lucide-react'
import './Chatbot.css'

// ─── Knowledge Base ────────────────────────────────────────────────────────────
const KB = {
    identity: {
        patterns: ['who are you', 'tell me about yourself', 'introduce yourself', 'who is bharath', 'about bharath', 'about you'],
        response: `IDENTITY SCAN COMPLETE.\n\nI am the portfolio intelligence for **Bharath Kumar Rajesh**.\n\n→ AI Engineer & Published Researcher\n→ MS Computer Science @ Pace University (3.86 GPA)\n→ Graduate Research Assistant — building RAG pipelines & multi-agent AI systems\n→ AWS Certified Solutions Architect | RHCSA Certified\n→ Based in New York City\n\nCurrently seeking **AI Engineer / ML Engineer** roles from Summer 2026.`
    },
    skills: {
        patterns: ['skills', 'technologies', 'tech stack', 'what can you do', 'programming', 'languages', 'tools', 'know how to'],
        response: `CAPABILITY MATRIX LOADED.\n\n**AI / ML Stack:**\n→ Python · PyTorch · TensorFlow · scikit-learn\n→ LangChain · LangGraph · BERT · FAISS · RAG\n→ NLP · Computer Vision · LLM APIs (OpenAI, Gemini)\n\n**Cloud & Infrastructure:**\n→ AWS (SAA-C03) · Docker · Kubernetes · Linux/Unix\n\n**Full-Stack:**\n→ React · Node.js · Java · Go · TypeScript\n→ PostgreSQL · MongoDB\n\n**Specialization:** Agentic AI systems, semantic search, LLM pipelines.`
    },
    experience: {
        patterns: ['experience', 'work', 'job', 'employment', 'career', 'positions', 'roles'],
        response: `WORK HISTORY RETRIEVED.\n\n**[1] Graduate Research Assistant — Pace University** (Aug 2024 – Present)\n→ Production RAG pipelines serving 1,000+ users\n→ Multi-agent AI systems with 35% hallucination reduction\n→ Data engineering & ML model deployment\n\n**[2] Campus Ambassador — Perplexity AI** (2025 – Present)\n→ Driving AI adoption across Pace University campus\n\n**[3] Open Source Contributor — Layer5 / CNCF** (2023)\n→ 5 merged PRs, 800+ lines in Meshery (Go + TypeScript)\n→ 15% reduction in container startup time`
    },
    projects: {
        patterns: ['projects', 'built', 'created', 'portfolio work', 'what have you made', 'github', 'code', 'repository'],
        response: `PROJECT MANIFEST LOADED.\n\n**[1] Large-Scale AI IR System** (2026)\n→ Sub-100ms P99 latency · 10K+ QPS · MRR@5: 92%\n→ RAG + semantic search + Kubernetes auto-scaling\n\n**[2] AI Teaching Agent** (2025)\n→ LangGraph agents · FAISS vector DB · BERT grading\n→ Searches across PDFs, videos, and lecture audio\n\n**[3] Handwritten Medical Data Digitization** (2024)\n→ CV + NLP pipeline for healthcare records\n\n**[4] Plant Disease CNN** (2023)\n→ 95% accuracy · ResNet-50 · Published in Springer Nature\n\n**[5] COVID-19 Sentiment Analysis** (2023)\n→ 90% accuracy · 50K+ records · Flask REST API\n\nAll code available at **github.com/thebharathkumar`
    },
    education: {
        patterns: ['education', 'degree', 'university', 'college', 'gpa', 'study', 'student', 'pace', 'vtu', 'masters', 'bachelors'],
        response: `ACADEMIC RECORDS RETRIEVED.\n\n**[1] Master of Science — Computer Science**\nPace University · New York, NY\nGPA: 3.86 / 4.0 · Aug 2024 – May 2026\n→ Graduate Research Assistant\n→ AI & ML specialization\n\n**[2] B.E. — Computer Science**\nVisvesvaraya Technological University (VTU)\nBangalore, India · 2020 – 2024\n→ Technical Lead, VCET Tech Club\n→ Published IEEE researcher`
    },
    publications: {
        patterns: ['publications', 'research', 'papers', 'published', 'ieee', 'springer', 'journal', 'articles'],
        response: `RESEARCH ARCHIVE ACCESSED.\n\n**[1] Plant Disease Classification using CNN**\n→ Published in Atlantis Press / Springer Nature\n→ ResNet-50 transfer learning · 95% accuracy\n→ Role: Corresponding Author\n\n**[2] COVID-19 Sentiment Analysis using ML**\n→ Published in IJARESM\n→ NLP classification · 50K+ text records\n→ 90% classification accuracy\n\nBharath is an active published researcher in AI & ML.`
    },
    certifications: {
        patterns: ['certifications', 'certified', 'aws', 'rhcsa', 'credentials', 'badges', 'licenses'],
        response: `CERTIFICATION DATABASE LOADED. (16+ total)\n\n**Featured:**\n→ AWS Certified Solutions Architect – Associate (SAA-C03)\n→ Red Hat Certified System Administrator (RHCSA)\n→ Certified for AI — micro1\n\n**Additional:**\n→ Claude with Amazon Bedrock (Anthropic)\n→ AWS Educate (Cloud, ML, NLP)\n→ Forage Simulations (JPMorgan, Accenture, Citi)\n→ Coursera, Cognizant, Unschool programs\n→ Pace INSPIRE Program`
    },
    contact: {
        patterns: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin', 'social', 'message', 'touch'],
        response: `COMMUNICATION CHANNELS ONLINE.\n\n📧 **Email:** bharath.kr702@gmail.com\n💼 **LinkedIn:** linkedin.com/in/thebharathkumar\n🐙 **GitHub:** github.com/thebharathkumar\n📍 **Location:** New York City, NY\n\nBharath is actively open to **AI Engineer, ML Engineer, and Data Engineer** opportunities starting Summer 2026.\n\nFeel free to reach out — response guaranteed within 24 hours.`
    },
    location: {
        patterns: ['location', 'where', 'city', 'new york', 'based', 'live', 'country'],
        response: `LOCATION DATA RETRIEVED.\n\n📍 **New York City, NY** (current)\n🇮🇳 Originally from Bangalore, India\n\nBharath relocated to NYC in August 2024 to pursue his Master's at Pace University and is open to roles throughout the US.`
    },
    hiring: {
        patterns: ['looking for', 'job', 'hiring', 'open to', 'available', 'roles', 'opportunities', 'internship', 'full time'],
        response: `STATUS: ACTIVELY SEEKING OPPORTUNITIES.\n\n**Target Roles:**\n→ AI Engineer\n→ ML Engineer\n→ Data Engineer\n→ Software Engineer (AI/ML focus)\n\n**Timeline:** Available from Summer 2026 (full-time)\n**Location:** Open to NYC + remote\n\nBharath brings production AI experience, published research, AWS + RHCSA certifications, and a 3.86 GPA. Reach out at **bharath.kr702@gmail.com**`
    },
    greeting: {
        patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'greetings', 'sup', 'yo'],
        response: `SYSTEMS ONLINE. WELCOME.\n\nI am the AI assistant for **Bharath Kumar Rajesh's** portfolio. I can answer questions about his:\n\n→ Background & skills\n→ Work experience\n→ Projects & research\n→ Education & certifications\n→ Contact information\n\nWhat would you like to know?`
    },
    help: {
        patterns: ['help', 'what can you', 'commands', 'options', 'topics', 'menu', 'guide'],
        response: `COMMAND LIST AVAILABLE.\n\nYou can ask me about:\n\n💡 **"Tell me about Bharath"** — overview\n🛠️ **"What are his skills?"** — tech stack\n💼 **"Show me his experience"** — work history\n🚀 **"What projects has he built?"** — project list\n🎓 **"Education background"** — academic records\n📜 **"Research publications"** — papers\n🏆 **"Certifications"** — credentials\n📧 **"How to contact him"** — contact info\n🎯 **"Is he open to opportunities?"** — job status`
    }
}

const FALLBACK = `QUERY NOT RECOGNIZED.\n\nI'm tuned to answer questions about Bharath Kumar Rajesh. Try asking about:\n→ Skills & experience\n→ Projects & research\n→ Education & certifications\n→ Contact information\n\nOr type **"help"** for the full command list.`

// ─── Response Engine ────────────────────────────────────────────────────────────
const getResponse = (input) => {
    const text = input.toLowerCase().trim()
    for (const key of Object.keys(KB)) {
        if (KB[key].patterns.some(p => text.includes(p))) {
            return KB[key].response
        }
    }
    return FALLBACK
}

// ─── Format response with bold/newline ─────────────────────────────────────────
const FormatMessage = ({ text }) => {
    const lines = text.split('\n')
    return (
        <span className="bot-message-text">
            {lines.map((line, i) => {
                const parts = line.split(/(\*\*.*?\*\*)/g)
                return (
                    <span key={i}>
                        {parts.map((part, j) =>
                            part.startsWith('**') && part.endsWith('**')
                                ? <strong key={j}>{part.slice(2, -2)}</strong>
                                : <span key={j}>{part}</span>
                        )}
                        {i < lines.length - 1 && <br />}
                    </span>
                )
            })}
        </span>
    )
}

// ─── Suggested Questions ────────────────────────────────────────────────────────
const SUGGESTIONS = [
    'Tell me about Bharath',
    'What are his skills?',
    'Show his projects',
    'Is he hiring?',
    'Contact info'
]

// ─── Main Chatbot Component ─────────────────────────────────────────────────────
const Chatbot = () => {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 0,
            type: 'bot',
            text: `SYSTEMS INITIALIZING...\n\nHello. I am **BK·AI**, the portfolio intelligence for **Bharath Kumar Rajesh**.\n\nI can answer questions about his skills, projects, experience, and more. Ask me anything.`,
            time: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [open])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typing])

    const sendMessage = async (text) => {
        const userText = text || input.trim()
        if (!userText) return
        setInput('')
        setShowSuggestions(false)

        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'user',
            text: userText,
            time: new Date()
        }])

        setTyping(true)
        await new Promise(r => setTimeout(r, 700 + Math.random() * 500))
        setTyping(false)

        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            type: 'bot',
            text: getResponse(userText),
            time: new Date()
        }])
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                className={`chatbot-trigger ${open ? 'active' : ''}`}
                onClick={() => setOpen(o => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Open AI Assistant"
            >
                <div className="trigger-rings">
                    <span className="ring r1" />
                    <span className="ring r2" />
                    <span className="ring r3" />
                </div>
                <div className="trigger-inner">
                    {open ? <X size={20} /> : <span className="trigger-label">BK<br />·AI</span>}
                </div>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="chatbot-panel"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 30 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="chat-header-scan" />
                            <div className="chat-header-left">
                                <div className="chat-status-dot" />
                                <div>
                                    <div className="chat-title">BK·AI <span className="chat-version">v2.6</span></div>
                                    <div className="chat-subtitle">Portfolio Intelligence · Online</div>
                                </div>
                            </div>
                            <div className="chat-header-right">
                                <span className="chat-time">{timeStr}</span>
                                <button className="chat-minimize" onClick={() => setOpen(false)}>
                                    <Minimize2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    className={`chat-msg ${msg.type}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.type === 'bot' && (
                                        <div className="bot-avatar">
                                            <span>AI</span>
                                        </div>
                                    )}
                                    <div className="msg-bubble">
                                        <FormatMessage text={msg.text} />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <motion.div
                                    className="chat-msg bot"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="bot-avatar"><span>AI</span></div>
                                    <div className="msg-bubble typing-bubble">
                                        <span /><span /><span />
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggestions */}
                            {showSuggestions && (
                                <motion.div
                                    className="suggestions"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {SUGGESTIONS.map(s => (
                                        <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chat-input-area">
                            <div className="chat-input-row">
                                <input
                                    ref={inputRef}
                                    className="chat-input"
                                    placeholder="Ask about skills, projects, experience..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    maxLength={200}
                                />
                                <button
                                    className={`chat-send ${input.trim() ? 'active' : ''}`}
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim()}
                                >
                                    <Send size={15} />
                                </button>
                            </div>
                            <div className="chat-footer-line">
                                BHARATH KUMAR RAJESH · Portfolio AI · {new Date().getFullYear()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Chatbot
