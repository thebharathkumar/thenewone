import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

const BackToTop = () => (
  <motion.button
    className="back-to-top"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label="Back to top"
  >
    <ArrowUp size={20} />
  </motion.button>
)

export default BackToTop
