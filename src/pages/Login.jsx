import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Code2, Mail, Lock, Eye, EyeOff, ArrowRight, User, CheckCircle } from 'lucide-react'

function LeftPanel() {
  const features = [
    { text: 'Auto-sync Striver A2Z sheet from LeetCode', color: '#10b981' },
    { text: '7 / 30 / 90 day spaced revision scheduling', color: '#7c3aed' },
    { text: 'Topic mastery & confidence tracking', color: '#8b5cf6' },
    { text: 'Compare progress with friends', color: '#3b82f6' },
  ]

  return (
    <div
      className="hidden lg:flex flex-col w-[44%] relative overflow-hidden"
      style={{
        background: '#06060d',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}
    >

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '15%',
          width: '70%',
          height: '70%',
          background:
            'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
          borderRadius: '50%'
        }}
      />

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col h-full p-10">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => (window.location.href = '/')}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)'
            }}
          >
            <Code2 size={16} color="white" strokeWidth={2.5} />
          </div>

          <div>
            <div
              className="font-bold text-[14px]"
              style={{
                color: '#f0f0fa',
                letterSpacing: '-0.02em'
              }}
            >
              DSAlytics
            </div>

            <div
              className="text-[9px] mono"
              style={{ color: '#44445a' }}
            >
              beta
            </div>
          </div>
        </motion.div>

        {/* PERFECT CENTER */}
        <div className="flex-1 flex items-center justify-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full max-w-md"
          >

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium mb-6"
              style={{
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.2)',
                color: '#a78bfa'
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#10b981' }}
              />

              2,400+ learners tracking smarter
            </div>

            {/* Heading */}
            <h2
              className="font-bold leading-[1.15] mb-3"
              style={{
                fontSize: 'clamp(2rem, 3vw, 2.4rem)',
                letterSpacing: '-0.035em',
                color: '#f0f0fa'
              }}
            >
              Track quality,
              <br />

              <span
                style={{
                  background:
                    'linear-gradient(135deg, #c4b5fd, #a78bfa, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                not just quantity.
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-[14px] leading-relaxed mb-9"
              style={{
                color: '#8888a8',
                maxWidth: '320px'
              }}
            >
              The only DSA tracker that connects your LeetCode solves
              directly to the Striver A2Z roadmap.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map(({ text, color }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}20`
                    }}
                  >
                    <CheckCircle
                      size={12}
                      style={{ color }}
                      strokeWidth={2.5}
                    />
                  </div>

                  <span
                    className="text-[13px]"
                    style={{ color: '#8888a8' }}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <p
            className="text-[13px] leading-relaxed mb-3"
            style={{ color: '#777799' }}
          >
            "The revision queue reminded me of problems I completely forgot.
            One came up in my Amazon interview."
          </p>

          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{
                background:
                  'linear-gradient(135deg, #7c3aed, #a78bfa)',
                color: 'white'
              }}
            >
              A
            </div>

            <div>
              <div
                className="text-[12px] font-medium"
                style={{ color: '#e0e0f0' }}
              >
                Arjun S.
              </div>

              <div
                className="text-[10px]"
                style={{ color: '#666680' }}
              >
                SDE-1 · Amazon
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

function InputField({ icon: Icon, type = 'text', placeholder, value, onChange, rightEl }) {
  return (
    <div className="relative">
      <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--text3)' }} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200"
        style={{
          paddingLeft: '2.25rem',
          paddingRight: rightEl ? '2.5rem' : '1rem',
          background: 'var(--card)',
          border: '1px solid var(--border2)',
          color: 'var(--text1)',
          fontFamily: "'Space Grotesk', sans-serif"
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
        onBlur={e => e.target.style.borderColor = 'var(--border2)'}
      />
      {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function switchMode(m) {
    setMode(m); setError(''); setSuccess('');
    setForm({ email: '', password: '' })
  }

  async function handleGoogle() {
    setGoogleLoading(true); setError('')
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
    if (err) { setError(err.message); setGoogleLoading(false) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')

    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (mode === 'signup' && form.password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email: form.email, password: form.password
        })
        if (err) throw err
        setSuccess('Account created! Please check your email for the confirmation link.')
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: form.email, password: form.password
        })
        if (err) throw err
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <LeftPanel />

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[320px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 cursor-pointer"
            onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
              <Code2 size={14} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[14px]" style={{ color: 'var(--text1)' }}>DSAlytics</span>
          </div>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div key={mode}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
              className="mb-6">
              <h1 className="font-bold tracking-tight mb-1"
                style={{ fontSize: '1.55rem', letterSpacing: '-0.03em', color: 'var(--text1)' }}>
                {mode === 'login' ? 'Welcome back' : 'Create an account'}
              </h1>
              <p className="text-[12px]" style={{ color: 'var(--text2)' }}>
                {mode === 'login'
                  ? 'Sign in to continue your DSA journey.'
                  : 'Start tracking smarter today.'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Google */}
          <motion.button
                whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.975 }}
                onClick={handleGoogle} disabled={googleLoading}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[13px] font-medium mb-4 transition-all"
                style={{
                  background: 'var(--card)', border: '1px solid var(--border2)',
                  color: 'var(--text1)', opacity: googleLoading ? 0.6 : 1
                }}>
                {googleLoading
                  ? <div className="w-4 h-4 rounded-full border-2 animate-spin"
                      style={{ borderColor: 'rgba(124,58,237,0.3)', borderTopColor: '#7c3aed' }} />
                  : <svg width="15" height="15" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                }
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </motion.button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-[11px]" style={{ color: 'var(--text3)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div key="s1"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}
                className="space-y-3">
                <InputField icon={Mail} type="email" placeholder="Email address"
                  value={form.email} onChange={v => set('email', v)} />
                <InputField icon={Lock} type={showPass ? 'text' : 'password'}
                  placeholder="Password" value={form.password}
                  onChange={v => set('password', v)}
                  rightEl={
                    <button type="button" onClick={() => setShowPass(s => !s)}
                      style={{ color: 'var(--text3)' }}>
                      {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  } />
              </motion.div>
            </AnimatePresence>

            {/* Error / Success */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} className="mt-3 px-3 py-2.5 rounded-xl text-[12px]"
                  style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.18)', color: '#f43f5e' }}>
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} className="mt-3 px-3 py-2.5 rounded-xl text-[12px]"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', color: '#10b981' }}>
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : '0 0 24px rgba(124,58,237,0.3)' }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                style={{
                  background: loading ? 'rgba(124,58,237,0.45)' : '#7c3aed',
                  color: 'white', border: '1px solid rgba(255,255,255,0.08)',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}>
                {loading
                  ? <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  : <>{mode === 'login' ? 'Sign in' : 'Create account'}<ArrowRight size={14} strokeWidth={2.5} /></>
                }
              </motion.button>
            </div>
          </form>

          {/* Toggle */}
          <p className="text-center text-[12px] mt-5" style={{ color: 'var(--text3)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
              className="font-semibold"
              style={{ color: '#a78bfa' }}
              onMouseEnter={e => e.target.style.color = '#7c3aed'}
              onMouseLeave={e => e.target.style.color = '#a78bfa'}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          <p className="text-center text-[11px] mt-4" style={{ color: 'var(--text3)' }}>
            By continuing you agree to our{' '}
            <span style={{ color: 'var(--text2)', cursor: 'pointer' }}>Terms</span>
            {' & '}
            <span style={{ color: 'var(--text2)', cursor: 'pointer' }}>Privacy</span>
          </p>

        </motion.div>
      </div>
    </div>
  )
}