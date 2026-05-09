import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text1)' }}>
          Striver A2Z Sheet
        </h1>
        <p className="text-sm" style={{ color: 'var(--text2)' }}>
          Track your progress on the complete 450-problem roadmap
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="p-12 rounded-2xl text-center"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)'
        }}
      >
        <BookOpen size={48} style={{ color: '#3b82f6', margin: '0 auto 16px' }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text1)' }}>
          A2Z Sheet Page Coming Soon
        </h2>
        <p style={{ color: 'var(--text2)' }}>
          View all 450 problems with automatic sync from your LeetCode profile
        </p>
      </motion.div>
    </div>
  )
}
