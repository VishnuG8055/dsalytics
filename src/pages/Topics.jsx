import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts'
import {
  TrendingUp, Brain, Zap, AlertCircle,
  ChevronDown, CheckCircle, Target, BarChart3
} from 'lucide-react'

const TOPICS = [
  {
    name: 'Arrays', solved: 23, total: 40, mastery: 82,
    easy: 12, medium: 8, hard: 3,
    trend: '+5%', color: '#7c3aed', weakAreas: ['Sliding Window', 'Prefix Sum'],
    recentlySolved: ['Two Sum', 'Best Time to Buy Stock', 'Product Except Self']
  },
  {
    name: 'Strings', solved: 14, total: 22, mastery: 71,
    easy: 8, medium: 5, hard: 1,
    trend: '+2%', color: '#3b82f6', weakAreas: ['String Hashing', 'KMP'],
    recentlySolved: ['Valid Palindrome', 'Longest Substring', 'Group Anagrams']
  },
  {
    name: 'Binary Search', solved: 10, total: 18, mastery: 65,
    easy: 4, medium: 5, hard: 1,
    trend: '+8%', color: '#10b981', weakAreas: ['Search Space', 'Rotated Arrays'],
    recentlySolved: ['Binary Search', 'Search Insert Position']
  },
  {
    name: 'Trees', solved: 12, total: 25, mastery: 58,
    easy: 5, medium: 5, hard: 2,
    trend: '-1%', color: '#f59e0b', weakAreas: ['Tree DP', 'Serialization'],
    recentlySolved: ['Inorder Traversal', 'Level Order']
  },
  {
    name: 'Dynamic Programming', solved: 9, total: 35, mastery: 44,
    easy: 3, medium: 5, hard: 1,
    trend: '+3%', color: '#ec4899', weakAreas: ['2D DP', 'Interval DP', 'Bitmask DP'],
    recentlySolved: ['Climbing Stairs', 'House Robber', 'Coin Change']
  },
  {
    name: 'Graphs', solved: 6, total: 28, mastery: 35,
    easy: 2, medium: 3, hard: 1,
    trend: '-2%', color: '#f43f5e', weakAreas: ['Dijkstra', 'Topological Sort', 'SCC'],
    recentlySolved: ['Number of Islands', 'Clone Graph']
  },
  {
    name: 'Linked Lists', solved: 8, total: 15, mastery: 60,
    easy: 4, medium: 3, hard: 1,
    trend: '+1%', color: '#06b6d4', weakAreas: ['Complex Pointer Manipulation'],
    recentlySolved: ['Reverse Linked List', 'Merge Sorted Lists']
  },
  {
    name: 'Stack & Queue', solved: 7, total: 14, mastery: 55,
    easy: 3, medium: 3, hard: 1,
    trend: '+4%', color: '#8b5cf6', weakAreas: ['Monotonic Stack'],
    recentlySolved: ['Valid Parentheses', 'Min Stack']
  },
]

const radarData = TOPICS.map(t => ({ topic: t.name.split(' ')[0], mastery: t.mastery, fullMark: 100 }))

function MasteryBar({ topic, index }) {
  const masteryColor =
    topic.mastery >= 70 ? '#10b981' :
    topic.mastery >= 50 ? '#f59e0b' : '#f43f5e'

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: topic.color }} />
          <span className="text-[13px] font-medium" style={{ color: 'var(--text1)' }}>
            {topic.name}
          </span>
          <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
            {topic.solved}/{topic.total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium"
            style={{ color: topic.trend.startsWith('+') ? '#10b981' : '#f43f5e' }}>
            {topic.trend}
          </span>
          <span className="text-[13px] font-bold mono" style={{ color: masteryColor }}>
            {topic.mastery}%
          </span>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${topic.mastery}%` }}
          transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${topic.color}, ${topic.color}99)` }}
        />
      </div>
    </motion.div>
  )
}

function TopicDetailCard({ topic, onClose }) {
  const diffData = [
    { name: 'Easy', value: topic.easy, color: '#10b981' },
    { name: 'Medium', value: topic.medium, color: '#f59e0b' },
    { name: 'Hard', value: topic.hard, color: '#f43f5e' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        style={{ background: 'var(--card)', border: '1px solid var(--border2)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${topic.color}15`, border: `1px solid ${topic.color}25` }}>
              <Brain size={18} style={{ color: topic.color }} />
            </div>
            <div>
              <h3 className="font-bold text-[15px]" style={{ color: 'var(--text1)' }}>{topic.name}</h3>
              <p className="text-[11px]" style={{ color: 'var(--text3)' }}>
                {topic.solved} of {topic.total} problems solved
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text3)' }}>
            ✕
          </button>
        </div>

        {/* Mastery ring */}
        <div className="flex items-center gap-4 p-4 rounded-2xl mb-5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <motion.circle cx="32" cy="32" r="26" fill="none"
                stroke={topic.color} strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - topic.mastery / 100) }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[13px] font-bold mono" style={{ color: topic.color }}>
                {topic.mastery}%
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold mb-1" style={{ color: 'var(--text1)' }}>
              Mastery Score
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${topic.mastery}%` }}
                transition={{ duration: 0.9 }}
                style={{ background: `linear-gradient(90deg, ${topic.color}, ${topic.color}88)` }} />
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--text3)' }}>
              {topic.mastery >= 70 ? '🟢 Strong' : topic.mastery >= 50 ? '🟡 Improving' : '🔴 Needs work'}
            </div>
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="mb-5">
          <div className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text2)' }}>
            Difficulty Breakdown
          </div>
          <div className="grid grid-cols-3 gap-2">
            {diffData.map(({ name, value, color }) => (
              <div key={name} className="rounded-xl p-3 text-center"
                style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                <div className="text-[18px] font-bold mono" style={{ color }}>{value}</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak areas */}
        {topic.weakAreas.length > 0 && (
          <div className="mb-5">
            <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text2)' }}>
              Weak Areas to Focus
            </div>
            <div className="flex flex-wrap gap-2">
              {topic.weakAreas.map(area => (
                <span key={area} className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                  style={{ background: 'rgba(244,63,94,0.08)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.18)' }}>
                  ⚠ {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recently solved */}
        <div>
          <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text2)' }}>
            Recently Solved
          </div>
          <div className="space-y-1.5">
            {topic.recentlySolved.map(p => (
              <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)' }}>
                <CheckCircle size={12} style={{ color: '#10b981' }} strokeWidth={2.5} />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text1)' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Topics() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [sortBy, setSortBy] = useState('mastery')

  const sorted = [...TOPICS].sort((a, b) => {
    if (sortBy === 'mastery') return b.mastery - a.mastery
    if (sortBy === 'solved') return b.solved - a.solved
    if (sortBy === 'weakest') return a.mastery - b.mastery
    return 0
  })

  const avgMastery = Math.round(TOPICS.reduce((s, t) => s + t.mastery, 0) / TOPICS.length)
  const strongest = TOPICS.reduce((a, b) => a.mastery > b.mastery ? a : b)
  const weakest = TOPICS.reduce((a, b) => a.mastery < b.mastery ? a : b)
  const totalSolved = TOPICS.reduce((s, t) => s + t.solved, 0)

  const barData = sorted.map(t => ({ name: t.name.split(' ')[0], mastery: t.mastery, color: t.color }))

  return (
    <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-bold text-[1.6rem] tracking-tight mb-1"
          style={{ color: 'var(--text1)', letterSpacing: '-0.03em' }}>
          Topic Analytics
        </h1>
        <p className="text-[13px]" style={{ color: 'var(--text2)' }}>
          Deep dive into your mastery across every DSA topic
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Avg Mastery', val: `${avgMastery}%`, icon: Brain, color: '#7c3aed' },
          { label: 'Total Solved', val: totalSolved, icon: CheckCircle, color: '#10b981' },
          { label: 'Strongest', val: strongest.name, icon: TrendingUp, color: '#f59e0b' },
          { label: 'Needs Work', val: weakest.name, icon: AlertCircle, color: '#f43f5e' },
        ].map(({ label, val, icon: Icon, color }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                <Icon size={14} style={{ color }} strokeWidth={2} />
              </div>
              <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{label}</span>
            </div>
            <div className="font-bold text-[18px] tracking-tight"
              style={{ color: 'var(--text1)', letterSpacing: '-0.02em' }}>
              {val}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">

        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-5"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Target size={14} style={{ color: '#7c3aed' }} />
            <h2 className="font-semibold text-[14px]" style={{ color: 'var(--text1)' }}>
              Mastery Radar
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="topic" tick={{ fill: 'var(--text3)', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Mastery" dataKey="mastery" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.12} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={14} style={{ color: '#10b981' }} />
            <h2 className="font-semibold text-[14px]" style={{ color: 'var(--text1)' }}>
              Mastery by Topic
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} margin={{ left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text3)', fontSize: 10 }} domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
                formatter={v => [`${v}%`, 'Mastery']}
                cursor={{ fill: 'rgba(124,58,237,0.05)' }}
              />
              <Bar dataKey="mastery" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Topic mastery list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-5"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>

        {/* Header + sort */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Zap size={14} style={{ color: '#7c3aed' }} />
            <h2 className="font-semibold text-[14px]" style={{ color: 'var(--text1)' }}>
              All Topics
            </h2>
          </div>
          <div className="flex gap-1">
            {[
              { key: 'mastery', label: 'Mastery' },
              { key: 'solved', label: 'Solved' },
              { key: 'weakest', label: 'Weakest' },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setSortBy(key)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                style={{
                  background: sortBy === key ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: sortBy === key ? '#a78bfa' : 'var(--text3)',
                  border: sortBy === key ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent'
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {sorted.map((topic, i) => (
            <div key={topic.name}
              className="cursor-pointer group"
              onClick={() => setSelectedTopic(topic)}>
              <MasteryBar topic={topic} index={i} />
              {/* Weak area hint */}
              {topic.mastery < 50 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-1.5 flex items-center gap-1.5">
                  <AlertCircle size={10} style={{ color: '#f43f5e' }} />
                  <span className="text-[10px]" style={{ color: '#f43f5e' }}>
                    Focus: {topic.weakAreas[0]}
                  </span>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <p className="text-[11px] mt-4 text-center" style={{ color: 'var(--text3)' }}>
          Click any topic for detailed breakdown
        </p>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedTopic && (
          <TopicDetailCard topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}