import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function Topics() {
  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text1)' }}>
          Topic Analytics
        </h1>
        <p className="text-sm" style={{ color: 'var(--text2)' }}>
          Deep dive into your mastery by topic
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
        <TrendingUp size={48} style={{ color: '#f59e0b', margin: '0 auto 16px' }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text1)' }}>
          Analytics Page Coming Soon
        </h2>
        <p style={{ color: 'var(--text2)' }}>
          Comprehensive statistics for all your topics with performance trends
        </p>
      </motion.div>
    </div>
  )
}
