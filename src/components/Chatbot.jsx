import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Minimize2 } from 'lucide-react'
import './Chatbot.css'

// ─── Static fallback knowledge base ────────────────────────────────────────────
// Used when /api/chat is unavailable (local dev without ANTHROPIC_API_KEY,
// pure-static deploy without the serverless function, etc.).
const KB = {
    identity: {
        patterns: ['who are you', 'tell me about yourself', 'introduce yourself', 'who is bharath', 'about bharath', 'about you'],
        response: `I'm the portfolio assistant for **Bharath Kumar Rajesh**.\n\n→ AI Engineer & Published Researcher\n→ MS Computer Science @ Pace University (3.86 GPA)\n→ Graduate Research Assistant — building RAG pipelines & multi-agent AI systems\n→ AWS Certified Solutions Architect | RHCSA Certified\n→ Based in New York City\n\nCurrently seeking **AI Engineer / ML Engineer** roles from Summer 2026.`
    },
    skills: {
        patterns: ['skills', 'technologies', 'tech stack', 'what can you do', 'programming', 'languages', 'tools', 'know how to'],
        response: `**AI / ML Stack:**\n→ Python · PyTorch · TensorFlow · scikit-learn\n→ LangChain · LangGraph · BERT · FAISS · RAG\n→ NLP · Computer Vision · LLM APIs (OpenAI, Anthropic)\n\n**Cloud & Infrastructure:**\n→ AWS (SAA-C03) · Docker · Kubernetes · Linux/Unix\n\n**Full-Stack:**\n→ React · Node.js · Java · TypeScript · PostgreSQL\n\n**Specialization:** Agentic AI systems, semantic search, LLM pipelines.`
    },
    experience: {
        patterns: ['experience', 'work', 'job', 'employment', 'career', 'positions', 'roles'],
        response: `**Graduate Research Assistant — Pace University** (Mar 2025 – Present)\n→ Production RAG pipelines serving 1,000+ users\n→ Multi-agent AI systems with 35% hallucination reduction\n\n**Campus Ambassador — Perplexity AI** (2025 – Present)\n→ Driving AI adoption at Pace University\n\n**Open Source Contributor — Layer5 / CNCF** (2023)\n→ 5 merged PRs, 800+ lines in Meshery (Go + TypeScript)\n→ 15% reduction in container startup time`
    },
    projects: {
        patterns: ['projects', 'built', 'created', 'portfolio work', 'what have you made', 'github', 'code', 'repository'],
        response: `**[1] Large-Scale AI IR System** (2026)\n→ Sub-100ms P99 latency · 10K+ QPS · MRR@5 92%\n→ RAG + semantic search + Kubernetes auto-scaling\n\n**[2] AI Teaching Agent** (2025)\n→ LangGraph agents · FAISS vector DB · BERT grading\n\n**[3] Handwritten Medical Data Digitization** (2024)\n→ CV + NLP pipeline for healthcare records\n\n**[4] Plant Disease CNN** (2023)\n→ 95% accuracy · ResNet-50 · Published in Springer Nature\n\nAll code at **github.com/thebharathkumar**.`
    },
    education: {
        patterns: ['education', 'degree', 'university', 'college', 'gpa', 'study', 'student', 'pace', 'vtu', 'masters', 'bachelors'],
        response: `**Master of Science — Computer Science**\nPace University · New York, NY\nGPA: 3.86 / 4.0 · Aug 2024 – May 2026\n\n**B.E. — Computer Science**\nVisvesvaraya Technological University · Bangalore\n2020 – 2024 · Published IEEE researcher`
    },
    publications: {
        patterns: ['publications', 'research', 'papers', 'published', 'ieee', 'springer', 'journal', 'articles'],
        response: `**Plant Disease Classification using CNN**\n→ Atlantis Press / Springer Nature (ICACECS 2023)\n→ ResNet-50 transfer learning · 95% accuracy · Corresponding Author\n\n**Driver Drowsiness Detection using AI**\n→ IJARESM Vol. 11, Issue 11 (Nov 2023)\n→ Real-time CV system · 90% accuracy`
    },
    certifications: {
        patterns: ['certifications', 'certified', 'aws', 'rhcsa', 'credentials', 'badges', 'licenses'],
        response: `**Featured (16+ total):**\n→ AWS Certified Solutions Architect – Associate (SAA-C03)\n→ Red Hat Certified System Administrator (RHCSA)\n→ Certified for AI — micro1\n→ Claude with Amazon Bedrock — Anthropic\n→ AWS Educate (Cloud, ML, NLP)`
    },
    contact: {
        patterns: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin', 'social', 'message', 'touch'],
        response: `**Email:** bharath.kr702@gmail.com\n**LinkedIn:** linkedin.com/in/thebharathkumar\n**GitHub:** github.com/thebharathkumar\n**Location:** New York City, NY\n\nActively open to **AI Engineer, ML Engineer, and Data Engineer** roles starting Summer 2026.`
    },
    location: {
        patterns: ['location', 'where', 'city', 'new york', 'based', 'live', 'country'],
        response: `**New York City, NY** (current)\nOriginally from Bangalore, India.\n\nRelocated to NYC in August 2024 for the MSCS at Pace University. Open to roles throughout the US.`
    },
    hiring: {
        patterns: ['looking for', 'job', 'hiring', 'open to', 'available', 'roles', 'opportunities', 'internship', 'full time'],
        response: `**Target roles:** AI Engineer · ML Engineer · Data Engineer · Software Engineer (AI/ML focus)\n\n**Timeline:** Available from Summer 2026 (full-time)\n**Location:** Open to NYC + remote\n\nReach out at **bharath.kr702@gmail.com**.`
    },
    greeting: {
        patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'greetings', 'sup', 'yo'],
        response: `Hi! I'm the AI assistant for **Bharath Kumar Rajesh's** portfolio. Ask me about his skills, projects, experience, or how to get in touch.`
    },
    help: {
        patterns: ['help', 'what can you', 'commands', 'options', 'topics', 'menu', 'guide'],
        response: `You can ask me about:\n\n• **Background & skills**\n• **Work experience**\n• **Projects & research**\n• **Education & certifications**\n• **How to contact Bharath**\n• **Whether he's open to opportunities**`
    }
}

const FALLBACK = `I'm tuned to answer questions about Bharath Kumar Rajesh's background, skills, projects, and experience. Try asking about his projects, certifications, or how to get in touch — or type **"help"** for the full list.`

const matchKB = (input) => {
    const text = input.toLowerCase().trim()
    for (const key of Object.keys(KB)) {
        if (KB[key].patterns.some((p) => text.includes(p))) {
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

const SUGGESTIONS = [
    'Tell me about Bharath',
    'What are his skills?',
    'Show his projects',
    'Is he open to opportunities?',
    'Contact info',
]

const Chatbot = () => {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 0,
            type: 'bot',
            text: `Hi! I'm **BK·AI**, the portfolio assistant for **Bharath Kumar Rajesh**.\n\nAsk me anything about his skills, projects, experience, or how to get in touch.`,
        },
    ])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [llmAvailable, setLlmAvailable] = useState(true)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const triggerRef = useRef(null)

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [open])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typing])

    // Escape closes the panel
    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false)
                triggerRef.current?.focus()
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open])

    const callLLM = useCallback(async (userText, history) => {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 20000)
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    message: userText,
                    history: history.map((m) => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text,
                    })),
                }),
                signal: controller.signal,
            })
            if (!res.ok) {
                if (res.status === 503 || res.status === 404) setLlmAvailable(false)
                return null
            }
            const data = await res.json()
            return typeof data.text === 'string' && data.text.length > 0 ? data.text : null
        } catch {
            return null
        } finally {
            clearTimeout(timeout)
        }
    }, [])

    const sendMessage = async (text) => {
        const userText = (text ?? input).trim()
        if (!userText) return
        setInput('')
        setShowSuggestions(false)

        const history = messages
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), type: 'user', text: userText },
        ])

        setTyping(true)
        let reply = null
        if (llmAvailable) reply = await callLLM(userText, history)
        if (!reply) reply = matchKB(userText)
        setTyping(false)

        setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, type: 'bot', text: reply },
        ])
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            <motion.button
                ref={triggerRef}
                className={`chatbot-trigger ${open ? 'active' : ''}`}
                onClick={() => setOpen((o) => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
                aria-expanded={open}
                aria-controls="bk-ai-panel"
            >
                <div className="trigger-rings" aria-hidden="true">
                    <span className="ring r1" />
                    <span className="ring r2" />
                    <span className="ring r3" />
                </div>
                <div className="trigger-inner">
                    {open ? <X size={20} /> : <span className="trigger-label">BK<br />·AI</span>}
                </div>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="bk-ai-panel"
                        className="chatbot-panel"
                        role="dialog"
                        aria-label="Portfolio assistant"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 30 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    >
                        <div className="chat-header">
                            <div className="chat-header-scan" aria-hidden="true" />
                            <div className="chat-header-left">
                                <div className="chat-status-dot" />
                                <div>
                                    <div className="chat-title">BK·AI</div>
                                    <div className="chat-subtitle">
                                        {llmAvailable ? 'Portfolio assistant · Online' : 'Portfolio assistant · Offline mode'}
                                    </div>
                                </div>
                            </div>
                            <div className="chat-header-right">
                                <button
                                    className="chat-minimize"
                                    onClick={() => {
                                        setOpen(false)
                                        triggerRef.current?.focus()
                                    }}
                                    aria-label="Minimize chat"
                                >
                                    <Minimize2 size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="chat-messages" role="log" aria-live="polite">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    className={`chat-msg ${msg.type}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.type === 'bot' && (
                                        <div className="bot-avatar" aria-hidden="true">
                                            <span>AI</span>
                                        </div>
                                    )}
                                    <div className="msg-bubble">
                                        <FormatMessage text={msg.text} />
                                    </div>
                                </motion.div>
                            ))}

                            {typing && (
                                <motion.div
                                    className="chat-msg bot"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="bot-avatar" aria-hidden="true"><span>AI</span></div>
                                    <div className="msg-bubble typing-bubble">
                                        <span /><span /><span />
                                    </div>
                                </motion.div>
                            )}

                            {showSuggestions && (
                                <motion.div
                                    className="suggestions"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {SUGGESTIONS.map((s) => (
                                        <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-area">
                            <div className="chat-input-row">
                                <input
                                    ref={inputRef}
                                    className="chat-input"
                                    placeholder="Ask about skills, projects, experience..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    maxLength={500}
                                    aria-label="Message input"
                                />
                                <button
                                    className={`chat-send ${input.trim() ? 'active' : ''}`}
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || typing}
                                    aria-label="Send message"
                                >
                                    <Send size={15} />
                                </button>
                            </div>
                            <div className="chat-footer-line">
                                {llmAvailable
                                    ? 'Powered by Claude · Responses may be inaccurate'
                                    : 'Static knowledge base · For details, email bharath.kr702@gmail.com'}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Chatbot
