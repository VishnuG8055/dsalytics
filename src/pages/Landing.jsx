import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Zap, BookOpen,
  BarChart3, RefreshCw, Brain, Users, Flame,
  Star, Code2, Sparkles, Menu, X,
  Award, ChevronRight, Sun, Moon
} from 'lucide-react'

// ─── Theme context helper ──────────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])
  return { dark, toggle: () => setDark(d => !d) }
}

// ─── Cursor glow ──────────────────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 18 })
  const sy = useSpring(y, { stiffness: 60, damping: 18 })
  useEffect(() => {
    const fn = e => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return (
    <motion.div className="fixed pointer-events-none z-20" style={{
      left: sx, top: sy, width: 520, height: 520, x: '-50%', y: '-50%',
      background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
      borderRadius: '50%'
    }} />
  )
}

// ─── Background ───────────────────────────────────────────────────────────
function Background() {
  return (
    <>
      <div className="noise" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `
          linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)`,
        backgroundSize: '72px 72px'
      }} />
      <div className="fixed pointer-events-none z-0" style={{
        top: '-25%', left: '-15%', width: '65vw', height: '65vw',
        background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
        borderRadius: '50%'
      }} />
      <div className="fixed pointer-events-none z-0" style={{
        bottom: '0%', right: '-20%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 65%)',
        borderRadius: '50%'
      }} />
    </>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────
function Navbar({ dark, toggleTheme }) {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'A2Z Sheet', href: '#a2z-sheet' },
    { label: 'Revision', href: '#revision' },
    { label: 'Social', href: '#social' },
  ]

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? dark ? 'rgba(6,6,10,0.9)' : 'rgba(248,248,252,0.92)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(40px)' : 'none',
            border: scrolled ? '1px solid var(--border2)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none'
          }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                <Code2 size={16} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse-glow"
                style={{ background: '#10b981' }} />
            </div>
            <div>
              <div className="font-bold text-[15px] leading-none tracking-tight"
                style={{ color: 'var(--text1)', letterSpacing: '-0.02em' }}>
                DSAlytics
              </div>
              <div className="text-[10px] mono mt-0.5" style={{ color: 'var(--text3)' }}>beta</div>
            </div>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <motion.a
                key={l.label}
                href={l.href}
                onHoverStart={() => setActive(l.label)}
                onHoverEnd={() => setActive('')}
                className="relative px-4 py-2 rounded-xl text-[13px] font-medium transition-colors duration-150"
                style={{ color: active === l.label ? 'var(--text1)' : 'var(--text2)' }}
              >
                {active === l.label && (
                  <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                    style={{ background: 'var(--violet-dim)', border: '1px solid rgba(124,58,237,0.2)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                )}
                <span className="relative z-10">{l.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--violet-dim)', border: '1px solid var(--border2)', color: 'var(--violet-light)' }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={dark ? 'moon' : 'sun'}
                  initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {dark ? <Moon size={15} /> : <Sun size={15} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className="btn-ghost px-4 py-2 rounded-xl text-[13px]">
              Sign in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/login')}
              className="btn-violet flex items-center gap-2 px-5 py-2 rounded-xl text-[13px]">
              Get started <ArrowRight size={13} strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>
              {dark ? <Moon size={14} /> : <Sun size={14} />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobile(!mobile)}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>
              {mobile ? <X size={15} /> : <Menu size={15} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobile && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
              className="mt-2 p-3 rounded-2xl"
              style={{ background: dark ? 'rgba(6,6,10,0.96)' : 'rgba(248,248,252,0.96)', backdropFilter: 'blur(40px)', border: '1px solid var(--border2)' }}>
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobile(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: 'var(--text2)' }}>{l.label}</a>
              ))}
              <div className="flex gap-2 mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <button onClick={() => navigate('/login')}
                  className="btn-ghost flex-1 py-2.5 rounded-xl text-sm text-center">Sign in</button>
                <button onClick={() => navigate('/login')}
                  className="btn-violet flex-1 py-2.5 rounded-xl text-sm text-center">Get started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// ─── Typewriter ───────────────────────────────────────────────────────────
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[idx]; let t
    if (!del && text.length < word.length) t = setTimeout(() => setText(word.slice(0, text.length + 1)), 72)
    else if (!del) t = setTimeout(() => setDel(true), 2000)
    else if (del && text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 36)
    else { setDel(false); setIdx((idx + 1) % words.length) }
    return () => clearTimeout(t)
  }, [text, del, idx, words])
  return (
    <span className="gradient-text">
      {text}<span style={{ color: '#a78bfa', animation: 'blink 1s ease-in-out infinite' }}>|</span>
    </span>
  )
}

// ─── Code card ────────────────────────────────────────────────────────────
function CodeCard() {
  const lines = [
    [{ t: '// Synced from LeetCode ✓', c: '#3d3d5c' }],
    [],
    [{ t: 'const', c: '#a78bfa' }, { t: ' result', c: '#e0e7ff' }, { t: ' = await', c: '#a78bfa' }],
    [{ t: '  lc', c: '#67e8f9' }, { t: '.sync', c: '#6ee7b7' }, { t: '(username)', c: '#e0e7ff' }],
    [],
    [{ t: '// A2Z auto-match ✓', c: '#3d3d5c' }],
    [{ t: 'a2z', c: '#67e8f9' }, { t: '.markSolved', c: '#6ee7b7' }, { t: '(result)', c: '#e0e7ff' }],
    [],
    [{ t: '// Schedule revisions', c: '#3d3d5c' }],
    [{ t: 'spaced', c: '#67e8f9' }, { t: '.queue', c: '#6ee7b7' }, { t: '({', c: '#e0e7ff' }],
    [{ t: '  days:', c: '#e0e7ff' }, { t: ' [7', c: '#fb923c' }, { t: ', 30', c: '#fb923c' }, { t: ', 90]', c: '#fb923c' }],
    [{ t: '})', c: '#e0e7ff' }],
  ]
  return (
    <motion.div className="animate-float"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <div className="rounded-2xl overflow-hidden" style={{
        background: '#0a0a14',
        border: '1px solid rgba(124,58,237,0.2)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
        width: 340
      }}>
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
          {['#f43f5e', '#f59e0b', '#10b981'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.85 }} />
          ))}
          <span className="ml-3 text-[11px] mono" style={{ color: '#44445a' }}>dsalytics.js</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] mono" style={{ color: '#10b981' }}>live sync</span>
          </div>
        </div>
        {/* Code */}
        <div className="p-4 space-y-0.5">
          {lines.map((toks, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.06 }}
              className="flex text-[12px] leading-[1.85] mono">
              <span className="w-5 mr-3 text-right select-none shrink-0"
                style={{ color: '#2a2a40', fontSize: 10 }}>{i + 1}</span>
              <span>{toks.map((t, j) => <span key={j} style={{ color: t.c }}>{t.t}{' '}</span>)}</span>
            </motion.div>
          ))}
        </div>
        {/* Status */}
        <div className="px-4 py-2.5 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.25)' }}>
          <Zap size={10} style={{ color: '#10b981' }} />
          <span className="text-[10px] mono" style={{ color: '#44445a' }}>
            3 synced · A2Z updated · 2 revisions due
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Ticker ───────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    '450+ A2Z Problems', '18 Learning Steps', '7 / 30 / 90 Day Revision', 'Auto LeetCode Sync',
    'Topic Mastery %', 'Friend Comparisons', 'Confidence Scoring', 'Activity Heatmap', 'Smart Insights',
    '450+ A2Z Problems', '18 Learning Steps', '7 / 30 / 90 Day Revision', 'Auto LeetCode Sync',
    'Topic Mastery %', 'Friend Comparisons',
  ]
  return (
    <div className="relative overflow-hidden py-3"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: 'linear-gradient(-90deg, var(--bg), transparent)' }} />
      <div className="flex animate-marquee">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-5 shrink-0">
            <span className="text-[12px] font-medium whitespace-nowrap tracking-wide"
              style={{ color: 'var(--text3)' }}>{item}</span>
            <div className="w-1 h-1 rounded-full" style={{ background: 'var(--text3)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Feature card ─────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, accent, delay, tag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="card-hover relative rounded-2xl p-6 cursor-default overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>

      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${accent}08, transparent 65%)` }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}>
            <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
          </div>
          {tag && (
            <span className="text-[10px] mono px-2 py-1 rounded-lg font-medium"
              style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
              {tag}
            </span>
          )}
        </div>
        <div className="font-semibold text-[14px] mb-2 tracking-tight" style={{ color: 'var(--text1)' }}>
          {title}
        </div>
        <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>{desc}</div>
      </div>
    </motion.div>
  )
}

// ─── A2Z Preview ──────────────────────────────────────────────────────────
function A2ZPreview() {
  const problems = [
    { title: 'Two Sum', topic: 'Arrays', diff: 'Easy', solved: true },
    { title: 'Longest Substring Without Repeating', topic: 'Sliding Window', diff: 'Medium', solved: true },
    { title: 'Merge Intervals', topic: 'Arrays', diff: 'Medium', solved: false },
    { title: 'Binary Tree Level Order Traversal', topic: 'Trees', diff: 'Medium', solved: true },
    { title: 'Word Break', topic: 'Dynamic Programming', diff: 'Medium', solved: false },
    { title: 'N-Queens', topic: 'Backtracking', diff: 'Hard', solved: false },
  ]
  const dc = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#f43f5e' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: '0 16px 48px rgba(0,0,0,0.3)' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}>
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={13} style={{ color: 'var(--violet)' }} />
            <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'var(--text1)' }}>
              Step 3 — Arrays
            </span>
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>4 of 6 solved</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 rounded-full overflow-hidden" style={{ background: 'var(--border2)' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '66%' }}
              viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #10b981)' }} />
          </div>
          <span className="text-[11px] font-bold mono" style={{ color: '#10b981' }}>66%</span>
        </div>
      </div>
      {/* Rows */}
      <div>
        {problems.map((p, i) => (
          <motion.div key={p.title}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between px-5 py-3 transition-colors duration-150"
            style={{ borderBottom: i < problems.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: p.solved ? '#10b981' : 'rgba(255,255,255,0.15)',
                  background: p.solved ? 'rgba(16,185,129,0.1)' : 'transparent'
                }}>
                {p.solved && <CheckCircle size={10} style={{ color: '#10b981' }} strokeWidth={3} />}
              </div>
              <div>
                <div className="text-[12px] font-medium truncate max-w-[200px]"
                  style={{
                    color: p.solved ? 'var(--text3)' : 'var(--text1)',
                    textDecoration: p.solved ? 'line-through' : 'none',
                    textDecorationColor: 'rgba(255,255,255,0.15)'
                  }}>{p.title}</div>
                <div className="text-[10px]" style={{ color: 'var(--text3)' }}>{p.topic}</div>
              </div>
            </div>
            <span className="text-[10px] font-semibold mono px-1.5 py-0.5 rounded"
              style={{ color: dc[p.diff], background: `${dc[p.diff]}12` }}>{p.diff}</span>
          </motion.div>
        ))}
      </div>
      {/* Footer */}
      <div className="px-5 py-2.5 flex items-center gap-2"
        style={{ borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] mono" style={{ color: 'var(--text3)' }}>
          Auto-synced from LeetCode · 4 min ago
        </span>
      </div>
    </motion.div>
  )
}

// ─── Revision Card ────────────────────────────────────────────────────────
function RevisionCard() {
  const items = [
    { title: 'Trapping Rain Water', topic: 'Arrays', overdue: 2, diff: 'Hard' },
    { title: 'LRU Cache', topic: 'Design', overdue: 0, diff: 'Medium' },
    { title: 'Coin Change', topic: 'DP', overdue: 5, diff: 'Medium' },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
        <RefreshCw size={13} style={{ color: 'var(--violet)' }} />
        <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'var(--text1)' }}>
          Today's Queue
        </span>
        <span className="ml-auto text-[10px] font-semibold mono px-2 py-0.5 rounded-lg"
          style={{ background: 'rgba(244,63,94,0.1)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.15)' }}>
          3 due
        </span>
      </div>
      <div className="p-3 space-y-2">
        {items.map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }}
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <div>
              <div className="text-[12px] font-medium" style={{ color: 'var(--text1)' }}>{item.title}</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>{item.topic}</div>
            </div>
            <div className="text-[11px] font-semibold mono"
              style={{ color: item.overdue > 0 ? '#f43f5e' : '#10b981' }}>
              {item.overdue > 0 ? `${item.overdue}d overdue` : 'due today'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Testimonial ──────────────────────────────────────────────────────────
function TestimonialCard({ name, role, text, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5 }}
      className="card-hover rounded-2xl p-5"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />)}
      </div>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>"{text}"</p>
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: 'white' }}>
          {name[0]}
        </div>
        <div>
          <div className="text-[12px] font-semibold" style={{ color: 'var(--text1)' }}>{name}</div>
          <div className="text-[10px]" style={{ color: 'var(--text3)' }}>{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [username, setUsername] = useState('')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const features = [
    { icon: RefreshCw, title: 'Spaced Repetition Engine', desc: 'Problems resurface at 7, 30, and 90 days — proven memory science. Never forget a pattern again.', accent: '#7c3aed', delay: 0, tag: 'Core' },
    { icon: BookOpen, title: 'Striver A2Z Auto-Sync', desc: 'Solve on LeetCode, get auto-checked on your A2Z sheet. 450+ problems, 18 steps, zero manual effort.', accent: '#10b981', delay: 0.06, tag: 'Unique' },
    { icon: Brain, title: 'Confidence Tracking', desc: 'Mark problems as confident after revision. Track real mastery — not just solve count.', accent: '#8b5cf6', delay: 0.12 },
    { icon: BarChart3, title: 'Topic Analytics', desc: 'Mastery % per topic. Instantly know your strongest and weakest areas with visual breakdowns.', accent: '#3b82f6', delay: 0.18 },
    { icon: Flame, title: 'Activity Heatmap', desc: 'GitHub-style heatmap with daily streaks and monthly consistency score. Build the habit.', accent: '#f59e0b', delay: 0.24 },
    { icon: Users, title: 'Friend Comparisons', desc: 'Add friends, compare stats, compete on leaderboards. Accountability drives consistency.', accent: '#ec4899', delay: 0.30 },
  ]

  const testimonials = [
    { name: 'Arjun S.', role: 'SDE-1 · Amazon', text: 'The revision queue reminded me of problems I had completely forgotten. One came up in my Amazon loop.', delay: 0 },
    { name: 'Priya P.', role: 'IIT Delhi · CS Final Year', text: 'The A2Z auto-sync is insane. I solve on LeetCode and my sheet updates automatically. Saves me 20 minutes daily.', delay: 0.1 },
    { name: 'Rahul V.', role: 'Placed · Microsoft', text: 'First platform that asks if I actually remember the solution — not just that I solved it months ago.', delay: 0.2 },
  ]

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
      <Background />
      <CursorGlow />
      <Navbar dark={dark} toggleTheme={toggle} />

      {/* ── HERO ── */}
      <motion.section ref={heroRef} style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex items-center pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 text-[11px] font-medium tracking-wide"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.22)', color: '#a78bfa' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Striver A2Z · Auto-tracked from LeetCode
                <ChevronRight size={11} />
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-[1.08] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', letterSpacing: '-0.03em' }}>
                <span style={{ color: 'var(--text1)' }}>Master DSA.</span><br />
                <span style={{ color: 'var(--text1)' }}>Not just </span>
                <Typewriter words={['solve it.', 'click it.', 'forget it.', 'rush it.']} />
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[15px] leading-relaxed mb-7 max-w-md"
                style={{ color: 'var(--text2)', fontWeight: 400 }}>
                Track LeetCode progress, auto-sync Striver's A2Z sheet,
                schedule revisions, and <span style={{ color: 'var(--text1)', fontWeight: 600 }}>actually retain</span> everything.
              </motion.p>

              {/* Input */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="flex gap-2 mb-4 max-w-sm">
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && username && navigate('/login')}
                  placeholder="LeetCode username..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200 mono"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border2)',
                    color: 'var(--text1)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border2)'}
                />
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="btn-violet px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-1.5 shrink-0">
                  Sync <Zap size={12} strokeWidth={2.5} />
                </motion.button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex items-center gap-5 mb-8">
                {[
                  { icon: CheckCircle, text: 'Free forever' },
                  { icon: Zap, text: '2 min setup' },
                  { icon: Award, text: 'No credit card' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text3)' }}>
                    <Icon size={12} style={{ color: '#10b981' }} strokeWidth={2} />
                    {text}
                  </div>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['A', 'P', 'R', 'S', 'M'].map((l, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                      style={{
                        borderColor: 'var(--bg)',
                        background: ['#7c3aed', '#10b981', '#8b5cf6', '#f59e0b', '#f43f5e'][i],
                        color: 'white'
                      }}>{l}</div>
                  ))}
                </div>
                <div className="text-[12px]" style={{ color: 'var(--text3)' }}>
                  <span style={{ color: 'var(--text2)', fontWeight: 600 }}>2,400+</span> learners tracking their journey
                </div>
              </motion.div>
            </div>

            {/* Right */}
            <div className="hidden lg:flex justify-end">
              <CodeCard />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── TICKER ── */}
      <div className="relative z-10"><Ticker /></div>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium mb-4"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)', color: '#a78bfa' }}>
              <Sparkles size={11} /> Everything you need
            </div>
            <h2 className="font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', letterSpacing: '-0.03em' }}>
              <span style={{ color: 'var(--text1)' }}>Built for </span>
              <span className="gradient-text">serious learners</span>
            </h2>
            <p className="text-[14px] max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
              Every feature built around one goal — making sure you actually retain what you learn.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── A2Z ── */}
      <section id="a2z-sheet" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium mb-5"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', color: '#34d399' }}>
              <Zap size={11} /> Striver A2Z Integration
            </div>
            <h2 className="font-bold tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', color: 'var(--text1)', lineHeight: 1.1 }}>
              Solve on LeetCode.<br />
              <span className="gradient-text-green">Auto-checked on A2Z.</span>
            </h2>
            <p className="text-[14px] leading-relaxed mb-7" style={{ color: 'var(--text2)' }}>
              The entire Striver A2Z roadmap lives inside DSAlytics. When you sync, every solved problem
              is matched by its LeetCode slug and instantly marked — no manual effort ever.
            </p>
            <div className="space-y-2.5">
              {[
                { text: '450+ problems across 18 structured steps', c: '#10b981' },
                { text: 'Zero manual work — fully automated matching', c: '#7c3aed' },
                { text: 'Per-step progress bars + completion %', c: '#8b5cf6' },
                { text: "Striver's video & article link per problem", c: '#3b82f6' },
                { text: 'Bookmarks + personal notes per problem', c: '#f59e0b' },
              ].map(({ text, c }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: `${c}14`, border: `1px solid ${c}22` }}>
                    <CheckCircle size={10} style={{ color: c }} strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px]" style={{ color: 'var(--text2)' }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <A2ZPreview />
        </div>
      </section>

      {/* ── REVISION ── */}
      <section id="revision" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <RevisionCard />
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium mb-5"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)', color: '#a78bfa' }}>
              <RefreshCw size={11} /> Spaced Repetition
            </div>
            <h2 className="font-bold tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', color: 'var(--text1)', lineHeight: 1.1 }}>
              Stop forgetting.<br />
              <span className="gradient-text">Start retaining.</span>
            </h2>
            <p className="text-[14px] leading-relaxed mb-7" style={{ color: 'var(--text2)' }}>
              Solving once isn't enough. Problems resurface at exactly the right intervals — backed by memory science.
            </p>
            <div className="flex gap-3">
              {[
                { n: '7', sub: 'First revision', c: '#7c3aed' },
                { n: '30', sub: 'Second revision', c: '#8b5cf6' },
                { n: '90', sub: 'Confidence check', c: '#10b981' },
              ].map(({ n, sub, c }) => (
                <motion.div key={n}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="flex-1 rounded-2xl p-5 text-center relative overflow-hidden"
                  style={{ background: 'var(--card)', border: `1px solid ${c}20` }}>
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{ background: `radial-gradient(circle at center, ${c}, transparent)` }} />
                  <div className="relative font-bold text-3xl mono mb-1 tracking-tight" style={{ color: c }}>{n}</div>
                  <div className="relative text-[10px] font-medium" style={{ color: 'var(--text3)' }}>days</div>
                  <div className="relative text-[10px] mt-1" style={{ color: 'var(--text3)' }}>{sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL ── */}
      <section id="social" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium mb-4"
              style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.18)', color: '#f9a8d4' }}>
              <Users size={11} /> Friend Comparisons
            </div>
            <h2 className="font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', letterSpacing: '-0.03em' }}>
              <span style={{ color: 'var(--text1)' }}>Learn better </span>
              <span className="gradient-text">together</span>
            </h2>
            <p className="text-[14px] max-w-sm mx-auto" style={{ color: 'var(--text2)' }}>
              Add friends, compare progress, and build accountability that keeps you consistent.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-3">
            <TestimonialCard {...testimonials[0]} />
            <TestimonialCard {...testimonials[1]} />
            <TestimonialCard {...testimonials[2]} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-14 text-center overflow-hidden"
            style={{ background: 'var(--card)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <div className="absolute inset-0 opacity-[0.05] rounded-3xl"
              style={{ background: 'radial-gradient(circle at 50% 0%, #7c3aed, transparent 70%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }} />
            <div className="relative z-10">
              <h2 className="font-bold tracking-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em' }}>
                <span style={{ color: 'var(--text1)' }}>Ready to actually</span><br />
                <span className="gradient-text">master DSA?</span>
              </h2>
              <p className="text-[14px] mb-8" style={{ color: 'var(--text2)' }}>
                Track quality, not just quantity. Start free in 2 minutes.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                className="btn-violet inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[14px] font-semibold">
                Start for Free
                <ArrowRight size={16} strokeWidth={2.5} />
              </motion.button>
              <p className="text-[11px] mt-3" style={{ color: 'var(--text3)' }}>
                No credit card · Free forever
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-7 px-6 text-center"
        style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
            <Code2 size={10} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'var(--text2)' }}>DSAlytics</span>
        </div>
        <p className="text-[11px]" style={{ color: 'var(--text3)' }}>
          Built for serious DSA learners · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}