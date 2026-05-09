import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import {
  Search, UserPlus, Users, Trophy, TrendingUp,
  Flame, BookOpen, Brain, X, ChevronRight,
  Medal, Crown, Zap, BarChart3
} from 'lucide-react'

// ── Helpers ───────────────────────────────────────────────────────────────
function Avatar({ name = '?', size = 36, gradient = ['#7c3aed', '#a78bfa'] }) {
  return (
    <div className="rounded-full flex items-center justify-center font-bold shrink-0"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        fontSize: size * 0.35, color: 'white'
      }}>
      {name[0]?.toUpperCase()}
    </div>
  )
}

const GRADIENTS = [
  ['#7c3aed', '#a78bfa'], ['#10b981', '#34d399'], ['#f59e0b', '#fbbf24'],
  ['#ef4444', '#f87171'], ['#3b82f6', '#60a5fa'], ['#ec4899', '#f472b6'],
]

// ── Add Friend Modal ──────────────────────────────────────────────────────
function AddFriendModal({ onClose, onAdd, currentUserId }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [adding, setAdding] = useState(false)
  const [msg, setMsg] = useState('')

  async function search() {
    if (!query.trim()) return
    setSearching(true); setResult(null); setMsg('')
    const { data } = await supabase
      .from('users')
      .select('id, display_name, leetcode_username')
      .eq('leetcode_username', query.trim())
      .single()
    setSearching(false)
    if (!data) setMsg('No user found with that username.')
    else if (data.id === currentUserId) setMsg("That's you!")
    else setResult(data)
  }

  async function add() {
    if (!result) return
    setAdding(true)
    const { error } = await supabase.from('friends').insert({
      user_id: currentUserId,
      friend_user_id: result.id
    })
    setAdding(false)
    if (error?.code === '23505') setMsg('Already in your friends list.')
    else if (error) setMsg('Something went wrong.')
    else { onAdd(result); onClose() }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-[14px] tracking-tight" style={{ color: 'var(--text1)' }}>
              Add a friend
            </h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text2)' }}>
              Search by LeetCode username
            </p>
          </div>
          <button onClick={onClose}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>
            <X size={12} />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text3)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
              placeholder="e.g. striver_79"
              className="w-full pl-7 pr-3 py-2 rounded-lg text-[12px] outline-none mono"
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                color: 'var(--text1)'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.4)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={search} disabled={searching}
            className="px-3 py-2 rounded-lg text-[12px] font-medium"
            style={{ background: '#7c3aed', color: 'white' }}>
            {searching
              ? <div className="w-3 h-3 rounded-full border-1.5 border-white/20 border-t-white animate-spin" />
              : 'Search'}
          </motion.button>
        </div>

        <AnimatePresence>
          {msg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-[11px] mb-3" style={{ color: 'var(--text3)' }}>{msg}</motion.p>
          )}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-2.5 rounded-lg mb-3"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2">
                <Avatar name={result.display_name || result.leetcode_username} size={30} />
                <div>
                  <div className="text-[12px] font-medium" style={{ color: 'var(--text1)' }}>
                    {result.display_name || result.leetcode_username}
                  </div>
                  <div className="text-[10px] mono" style={{ color: 'var(--text3)' }}>
                    @{result.leetcode_username}
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={add} disabled={adding}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }}>
                <UserPlus size={11} />
                {adding ? 'Adding...' : 'Add'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ── Compare Modal ─────────────────────────────────────────────────────────
function CompareModal({ me, friend, onClose }) {
  const metrics = [
    { label: 'Total Solved', meVal: me.total_solved, frVal: friend.total_solved, color: '#7c3aed', icon: TrendingUp },
    { label: 'Weekly Solved', meVal: me.weekly_solved, frVal: friend.weekly_solved, color: '#10b981', icon: Zap },
    { label: 'Streak', meVal: me.current_streak, frVal: friend.current_streak, color: '#f59e0b', icon: Flame, suffix: 'd' },
    { label: 'A2Z Progress', meVal: me.a2z_completed, frVal: friend.a2z_completed, color: '#3b82f6', icon: BookOpen },
    { label: 'Confidence', meVal: me.confidence_pct, frVal: friend.confidence_pct, color: '#ec4899', icon: Brain, suffix: '%' },
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
        className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[14px] tracking-tight" style={{ color: 'var(--text1)' }}>
            Head to Head
          </h3>
          <button onClick={onClose}
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>
            <X size={12} />
          </button>
        </div>

        {/* Avatars */}
        <div className="flex items-center justify-between mb-5 px-3">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={me.display_name || 'You'} size={40} gradient={GRADIENTS[0]} />
            <span className="text-[11px] font-semibold" style={{ color: 'var(--text1)' }}>
              {me.display_name || 'You'}
            </span>
          </div>
          <div className="text-[12px] font-bold" style={{ color: 'var(--text3)' }}>vs</div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={friend.display_name || friend.leetcode_username} size={40} gradient={GRADIENTS[1]} />
            <span className="text-[11px] font-semibold" style={{ color: 'var(--text1)' }}>
              {friend.display_name || friend.leetcode_username}
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {metrics.map(({ label, meVal, frVal, color, icon: Icon, suffix = '' }) => {
            const total = (meVal + frVal) || 1
            const mePct = Math.round((meVal / total) * 100)
            const frPct = 100 - mePct
            const meWins = meVal >= frVal
            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Icon size={11} style={{ color }} />
                    <span className="text-[10px] font-medium" style={{ color: 'var(--text2)' }}>{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold mono"
                      style={{ color: meWins ? color : 'var(--text3)' }}>
                      {meVal}{suffix}
                    </span>
                    <span className="text-[9px]" style={{ color: 'var(--text3)' }}>·</span>
                    <span className="text-[11px] font-bold mono"
                      style={{ color: !meWins ? color : 'var(--text3)' }}>
                      {frVal}{suffix}
                    </span>
                  </div>
                </div>
                {/* Split bar */}
                <div className="h-1.5 rounded-full overflow-hidden flex"
                  style={{ background: 'var(--border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mePct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-l-full"
                    style={{ background: color, opacity: meWins ? 1 : 0.35 }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${frPct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-r-full"
                    style={{ background: color, opacity: !meWins ? 1 : 0.35 }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Winner */}
        <div className="mt-4 p-2.5 rounded-lg text-center"
          style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.1)' }}>
          {(() => {
            let meWins = 0, frWins = 0
            metrics.forEach(({ meVal, frVal }) => { meVal >= frVal ? meWins++ : frWins++ })
            const winner = meWins > frWins ? (me.display_name || 'You') : (friend.display_name || friend.leetcode_username)
            return (
              <p className="text-[11px]" style={{ color: 'var(--text2)' }}>
                <span style={{ color: '#a78bfa', fontWeight: 600 }}>{winner}</span>
                {' '}leads • {Math.max(meWins, frWins)}/5 🏆
              </p>
            )
          })()}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Friend Card ───────────────────────────────────────────────────────────
function FriendCard({ friend, index, myStats, onCompare, onRemove }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const stats = [
    { icon: TrendingUp, val: friend.total_solved || 0, color: '#7c3aed' },
    { icon: Flame, val: `${friend.current_streak || 0}d`, color: '#f59e0b' },
    { icon: BookOpen, val: friend.a2z_completed || 0, color: '#10b981' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-lg p-3 transition-all group hover:border-[rgba(124,58,237,0.3)] duration-150"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
    >

      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Avatar name={friend.display_name || friend.leetcode_username} size={34} gradient={gradient} />
          <div>
            <div className="text-[12px] font-semibold" style={{ color: 'var(--text1)' }}>
              {friend.display_name || friend.leetcode_username}
            </div>
            <div className="text-[10px] mono" style={{ color: 'var(--text3)' }}>
              @{friend.leetcode_username}
            </div>
          </div>
        </div>
        <button onClick={() => onRemove(friend.id)}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-[rgba(244,63,94,0.15)]"
          style={{ background: 'rgba(244,63,94,0.05)', color: '#f43f5e' }}>
          <X size={10} />
        </button>
      </div>

      {/* Mini stats */}
      <div className="flex gap-1.5 mb-2">
        {stats.map(({ icon: Icon, val, color }, i) => (
          <div key={i} className="flex-1 flex items-center gap-1 px-2 py-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <Icon size={10} style={{ color }} />
            <span className="text-[11px] font-bold mono" style={{ color }}>{val}</span>
          </div>
        ))}
      </div>

      {/* A2Z bar */}
      <div className="mb-2.5">
        <div className="flex justify-between mb-1">
          <span className="text-[9px]" style={{ color: 'var(--text3)' }}>A2Z</span>
          <span className="text-[9px] font-bold mono" style={{ color: '#10b981' }}>
            {friend.a2z_completed || 0}/450
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((friend.a2z_completed || 0) / 450) * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #10b981)' }} />
        </div>
      </div>

      <button
        onClick={() => onCompare(friend)}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 hover:bg-[rgba(124,58,237,0.14)]"
        style={{ background: 'rgba(124,58,237,0.08)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.12)' }}
      >
        <BarChart3 size={10} /> Compare
        <ChevronRight size={10} />
      </button>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function Friends() {
  const { user } = useAuth()
  const [tab, setTab] = useState('friends')
  const [friends, setFriends] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [myStats, setMyStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [comparing, setComparing] = useState(null)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    
    const currentUserId = user?.id || 'mock-user-123'
    
    // Mock data for development
    const mockMe = {
      user_id: currentUserId,
      weekly_solved: 12,
      total_solved: 45,
      current_streak: 8,
      a2z_completed: 120,
      confidence_pct: 72,
      display_name: 'You',
      leetcode_username: 'yourname'
    }
    
    const mockFriends = [
      {
        user_id: 'friend1',
        display_name: 'Alex Chen',
        leetcode_username: 'alexchen',
        weekly_solved: 15,
        total_solved: 52,
        current_streak: 12,
        a2z_completed: 180,
        confidence_pct: 85
      },
      {
        user_id: 'friend2',
        display_name: 'Sarah Miller',
        leetcode_username: 'sarahmiller',
        weekly_solved: 8,
        total_solved: 38,
        current_streak: 5,
        a2z_completed: 95,
        confidence_pct: 65
      },
      {
        user_id: 'friend3',
        display_name: 'Lisa Zhang',
        leetcode_username: 'lisaz',
        weekly_solved: 18,
        total_solved: 61,
        current_streak: 22,
        a2z_completed: 280,
        confidence_pct: 92
      }
    ]
    
    setMyStats(mockMe)
    setFriends(mockFriends)
    setLeaderboard([mockMe, ...mockFriends])
    
    setLoading(false)
    
    // Uncomment below to use real Supabase when backend is ready
    /*
    // Load my stats
    const { data: me } = await supabase
      .from('leaderboard_cache')
      .select('*, users(display_name, leetcode_username)')
      .eq('user_id', user.id)
      .single()
    setMyStats(me)

    // Load friends
    const { data: friendLinks } = await supabase
      .from('friends')
      .select('friend_user_id')
      .eq('user_id', user.id)

    if (friendLinks?.length) {
      const ids = friendLinks.map(f => f.friend_user_id)
      const { data: friendStats } = await supabase
        .from('leaderboard_cache')
        .select('*, users(display_name, leetcode_username)')
        .in('user_id', ids)
      setFriends(friendStats?.map(f => ({ ...f, ...f.users })) || [])

      // Friends leaderboard = me + friends
      const allIds = [...ids, user.id]
      const { data: lb } = await supabase
        .from('leaderboard_cache')
        .select('*, users(display_name, leetcode_username)')
        .in('user_id', allIds)
      setLeaderboard(lb?.map(u => ({ ...u, ...u.users })) || [])
    }

    setLoading(false)
    */
  }

  async function removeFriend(friendUserId) {
    await supabase.from('friends').delete()
      .eq('user_id', user.id).eq('friend_user_id', friendUserId)
    setFriends(f => f.filter(fr => fr.user_id !== friendUserId))
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-5xl mx-auto"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-[clamp(1.3rem,3vw,1.8rem)] tracking-tight" style={{ color: 'var(--text1)', letterSpacing: '-0.02em' }}>
            Friends
          </h1>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--text2)' }}>
            Compare progress and compete with friends
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] sm:text-[12px] font-semibold transition-all hover:shadow-lg"
          style={{ background: '#7c3aed', color: 'white', border: '1px solid rgba(255,255,255,0.08)' }}>
          <UserPlus size={13} /> Add Friend
        </motion.button>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 rounded-lg mb-6 w-fit transition-all"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        {[
          { key: 'friends', icon: Users, label: 'Friends' },
          { key: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        ].map(({ key, icon: Icon, label }) => (
          <motion.button key={key}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab(key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] sm:text-[12px] font-medium transition-all duration-150"
            style={{
              background: tab === key ? '#7c3aed' : 'transparent',
              color: tab === key ? 'white' : 'var(--text2)'
            }}>
            <Icon size={12} /> {label}
          </motion.button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-5 h-5 rounded-full border-2 animate-spin"
            style={{ borderColor: 'rgba(124,58,237,0.2)', borderTopColor: '#7c3aed' }} />
        </div>
      ) : (
        <AnimatePresence mode="wait">

          {/* ── FRIENDS TAB ── */}
          {tab === 'friends' && (
            <motion.div key="friends"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

              {friends.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.12)' }}>
                    <Users size={18} style={{ color: '#7c3aed' }} />
                  </div>
                  <h3 className="font-semibold text-[13px] mb-1.5" style={{ color: 'var(--text1)' }}>
                    No friends yet
                  </h3>
                  <p className="text-[12px] mb-4 max-w-xs" style={{ color: 'var(--text2)' }}>
                    Add friends by their LeetCode username to compare progress and stay accountable.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold"
                    style={{ background: '#7c3aed', color: 'white' }}>
                    <UserPlus size={12} /> Add your first friend
                  </motion.button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {friends.map((f, i) => (
                    <FriendCard key={f.user_id} friend={f} index={i}
                      myStats={myStats}
                      onCompare={fr => setComparing({ me: myStats, friend: { ...fr } })}
                      onRemove={() => removeFriend(f.user_id)} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── LEADERBOARD TAB ── */}
          {tab === 'leaderboard' && (
            <motion.div key="leaderboard"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

              {/* Leaderboard list - Streak based */}
              {leaderboard.length === 0 ? (
                <div className="text-center py-12">
                  <Flame size={24} className="mx-auto mb-2" style={{ color: 'var(--text3)' }} />
                  <p className="text-[12px]" style={{ color: 'var(--text2)' }}>
                    Add friends to see the streak leaderboard.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="p-3 space-y-2">
                    {[...leaderboard]
                      .sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0))
                      .map((u, rank) => (
                        <motion.div
                          key={u.user_id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: rank * 0.04 }}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(124,58,237,0.04)] transition-all duration-150"
                          style={{
                            background: u.user_id === (user?.id || 'mock-user-123') ? 'rgba(124,58,237,0.06)' : 'transparent',
                            border: u.user_id === (user?.id || 'mock-user-123') ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent',
                          }}
                        >
                          {/* Rank + Avatar + Name */}
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="text-[11px] font-bold text-[#a78bfa] w-5 text-center">#{rank + 1}</div>
                            <Avatar
                              name={u.display_name || u.leetcode_username}
                              size={28}
                              gradient={GRADIENTS[rank % GRADIENTS.length]}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[12px] font-medium truncate flex items-center gap-1"
                                style={{ color: 'var(--text1)' }}>
                                {u.display_name || u.leetcode_username}
                                {u.user_id === (user?.id || 'mock-user-123') && (
                                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap"
                                    style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>you</span>
                                )}
                              </div>
                              <div className="text-[9px] mono truncate" style={{ color: 'var(--text3)' }}>
                                @{u.leetcode_username}
                              </div>
                            </div>
                          </div>

                          {/* Streak + Profile Button */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                              <span style={{ fontSize: '12px' }}>🔥</span>
                              <span className="text-[12px] font-bold mono" style={{ color: '#f59e0b' }}>
                                {u.current_streak || 0}
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                background: 'rgba(124,58,237,0.08)',
                                color: '#a78bfa',
                                border: '1px solid rgba(124,58,237,0.15)',
                                padding: '5px 12px',
                                borderRadius: '6px',
                                fontSize: '10px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
                                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
                              }}
                            >
                              Profile
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showAdd && (
          <AddFriendModal
            currentUserId={user?.id || 'mock-user-123'}
            onClose={() => setShowAdd(false)}
            onAdd={() => loadData()}
          />
        )}
        {comparing && (
          <CompareModal
            me={comparing.me}
            friend={comparing.friend}
            onClose={() => setComparing(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
