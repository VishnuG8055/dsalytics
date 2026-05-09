import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, CheckCircle2, Zap, BookOpen, MoreHorizontal, Play, Trophy, Users, AlertCircle, ArrowUpRight, RotateCw, X, Settings } from 'lucide-react'

export default function Dashboard() {
  const [lastSync, setLastSync] = useState('2 hours ago')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({
    name: 'Alex Johnson',
    username: 'alexcodes',
    leetcodeUsername: '',
    email: 'alex@example.com',
    bio: 'Grinding DSA one problem at a time 🚀',
    photo: null,
    github: 'https://github.com/alexcodes',
    linkedin: 'https://www.linkedin.com/in/alexjohnson',
    targetProblems: 300,
    targetStreak: 30,
    a2zTargetDate: '2024-12-31',
    notificationsEnabled: true,
    emailReminders: true,
    streakReminders: true
  })

  // User Profile
  const user = {
    name: 'Alex Johnson',
    username: 'alexcodes',
    avatar: 'A',
    level: 'Expert',
    joinDate: 'Mar 2024'
  }

  const userStats = {
    totalSolved: 127,
    streak: 12,
    confidenceScore: 78,
    a2zProgress: 65
  }

  const revisionQueue = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', daysOverdue: 2, type: 'revision1', topic: 'Arrays' },
    { id: 2, title: 'Reverse Integer', difficulty: 'Medium', daysOverdue: 0, type: 'revision2', topic: 'Math' },
    { id: 3, title: 'Palindrome Number', difficulty: 'Easy', daysOverdue: -1, type: 'revision1', topic: 'Strings' }
  ]

  const topicStats = [
    { topic: 'Arrays', mastery: 82, problems: 23, trend: '+5%' },
    { topic: 'Strings', mastery: 71, problems: 18, trend: '+2%' },
    { topic: 'Trees', mastery: 65, problems: 15, trend: '-1%' },
    { topic: 'DP', mastery: 58, problems: 12, trend: '+8%' }
  ]

  const weakTopics = [
    { topic: 'Graphs', mastery: 35, problems: 8, priority: 'High' },
    { topic: 'Bit Manipulation', mastery: 42, problems: 6, priority: 'Medium' }
  ]

  const difficultyDistribution = [
    { name: 'Easy', value: 45, color: '#10b981' },
    { name: 'Medium', value: 55, color: '#f59e0b' },
    { name: 'Hard', value: 27, color: '#f43f5e' }
  ]

  const progressData = [
    { week: 'W1', solved: 8, revised: 2 },
    { week: 'W2', solved: 12, revised: 4 },
    { week: 'W3', solved: 10, revised: 6 },
    { week: 'W4', solved: 15, revised: 8 },
    { week: 'W5', solved: 18, revised: 11 }
  ]

  const recentActivity = [
    { id: 1, action: 'Solved', problem: 'Two Sum', time: '2 hours ago', status: 'accepted' },
    { id: 2, action: 'Completed', revision: 'Rev 2 - Arrays', time: '5 hours ago', status: 'success' },
    { id: 3, action: 'Marked Confident', problem: 'Binary Search', time: '1 day ago', status: 'confident' },
    { id: 4, action: 'Started', topic: 'Dynamic Programming', time: '2 days ago', status: 'started' }
  ]

  const friendStats = [
    { name: 'Sarah', solved: 156, streak: 18, avatar: 'S' },
    { name: 'Mike', solved: 142, streak: 15, avatar: 'M' },
    { name: 'Emma', solved: 138, streak: 22, avatar: 'E' }
  ]

  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--bg)' }}>
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-2xl" style={{ color: 'var(--text1)' }}>
                  Edit Profile
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-lg hover:bg-opacity-20"
                  style={{ color: 'var(--text3)' }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="text-sm font-bold mb-3 block" style={{ color: 'var(--text1)' }}>
                    Profile Photo
                  </label>
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center cursor-pointer mb-3 font-bold text-2xl transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {editForm.photo ? '📷' : 'A'}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setEditForm({ ...editForm, photo: e.target.files[0].name })
                      }
                    }}
                    className="block text-sm"
                    style={{ color: 'var(--text2)' }}
                  />
                  <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>
                    {editForm.photo ? `Uploaded: ${editForm.photo}` : 'Max 5MB, JPG/PNG'}
                  </p>
                </div>

                {/* Basic Info */}
                <div className="space-y-4 p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid var(--border2)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text1)' }}>Basic Information</h3>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      DSAlytics Username
                    </label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      LeetCode Username
                    </label>
                    <input
                      type="text"
                      value={editForm.leetcodeUsername}
                      onChange={(e) => setEditForm({ ...editForm, leetcodeUsername: e.target.value })}
                      placeholder="e.g., someone_cool"
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      placeholder="Tell others about your DSA journey..."
                      maxLength={150}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                      rows="3"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                    <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>
                      {editForm.bio.length}/150 characters
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4 p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid var(--border2)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text1)' }}>Social Links</h3>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      GitHub Profile Link
                    </label>
                    <input
                      type="url"
                      value={editForm.github}
                      onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                      placeholder="https://github.com/your-username"
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(16,185,129,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                    {editForm.github && (
                      <a
                        href={editForm.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-1 inline-block"
                        style={{ color: '#10b981' }}
                      >
                        Open Profile →
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      LinkedIn Profile Link
                    </label>
                    <input
                      type="url"
                      value={editForm.linkedin}
                      onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                      placeholder="https://www.linkedin.com/in/your-username"
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(16,185,129,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                    {editForm.linkedin && (
                      <a
                        href={editForm.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-1 inline-block"
                        style={{ color: '#10b981' }}
                      >
                        Open Profile →
                      </a>
                    )}
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-4 p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid var(--border2)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text1)' }}>Goals</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                        Target Problems
                      </label>
                      <input
                        type="number"
                        value={editForm.targetProblems}
                        onChange={(e) => setEditForm({ ...editForm, targetProblems: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border2)',
                          color: 'var(--text1)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                        Target Streak (days)
                      </label>
                      <input
                        type="number"
                        value={editForm.targetStreak}
                        onChange={(e) => setEditForm({ ...editForm, targetStreak: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border2)',
                          color: 'var(--text1)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text2)' }}>
                      A2Z Completion Target Date
                    </label>
                    <input
                      type="date"
                      value={editForm.a2zTargetDate}
                      onChange={(e) => setEditForm({ ...editForm, a2zTargetDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text1)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border2)'}
                    />
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4 p-4 rounded-xl" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid var(--border2)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text1)' }}>Notifications</h3>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.notificationsEnabled}
                      onChange={(e) => setEditForm({ ...editForm, notificationsEnabled: e.target.checked })}
                      className="w-4 h-4 rounded"
                      style={{
                        accentColor: '#7c3aed'
                      }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text2)' }}>Enable all notifications</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.emailReminders}
                      onChange={(e) => setEditForm({ ...editForm, emailReminders: e.target.checked })}
                      className="w-4 h-4 rounded"
                      style={{
                        accentColor: '#7c3aed'
                      }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text2)' }}>Email reminders for due revisions</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.streakReminders}
                      onChange={(e) => setEditForm({ ...editForm, streakReminders: e.target.checked })}
                      className="w-4 h-4 rounded"
                      style={{
                        accentColor: '#7c3aed'
                      }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text2)' }}>Streak break warnings</span>
                  </label>
                </div>

                {/* Badges Section - Display Only */}
                <div className="space-y-4 p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid var(--border2)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text1)' }}>Your Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { emoji: '🔥', label: 'Week Warrior', earned: true },
                      { emoji: '⭐', label: 'First 50', earned: true },
                      { emoji: '🏆', label: 'Century Club', earned: false },
                      { emoji: '🎯', label: 'Topic Master', earned: false }
                    ].map((badge, i) => (
                      <div
                        key={i}
                        className="px-3 py-2 rounded-lg text-center"
                        style={{
                          background: badge.earned ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${badge.earned ? 'rgba(124,58,237,0.3)' : 'var(--border2)'}`,
                          opacity: badge.earned ? 1 : 0.5
                        }}
                      >
                        <div className="text-lg mb-1">{badge.emoji}</div>
                        <div className="text-xs" style={{ color: 'var(--text2)' }}>
                          {badge.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    color: 'var(--text2)'
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowEditModal(false)
                    alert(`Profile saved!\n\nName: ${editForm.name}\nLeetCode: ${editForm.leetcodeUsername || 'Not set'}\nBio: ${editForm.bio}\nTarget: ${editForm.targetProblems} problems by ${editForm.a2zTargetDate}`)
                  }}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: '1px solid rgba(124,58,237,0.3)'
                  }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header with User Profile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text1)' }}>
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>
              Keep pushing your DSA mastery. Last sync: {lastSync}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: '#7c3aed',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onClick={() => setLastSync('Just now')}
          >
            <RotateCw size={14} strokeWidth={2} />
            Sync LeetCode
          </motion.button>
        </div>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer group"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.15)'
          }}
          onClick={() => setShowEditModal(true)}
          whileHover={{
            background: 'rgba(124,58,237,0.12)',
            borderColor: 'rgba(124,58,237,0.25)'
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white'
            }}
          >
            {user.avatar}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: 'var(--text1)' }}>
              @{user.username}
            </p>
            <p className="text-xs" style={{ color: 'var(--text3)' }}>
              {user.level} • Joined {user.joinDate}
            </p>
          </div>
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trophy size={16} style={{ color: '#f59e0b' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--text1)' }}>
              {Math.floor(userStats.totalSolved / 10)} XP
            </span>
            <Settings size={16} style={{ color: '#7c3aed' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: CheckCircle2, label: 'Total Solved', value: userStats.totalSolved, color: '#10b981' },
          { icon: Zap, label: 'Current Streak', value: userStats.streak + ' days', color: '#f59e0b' },
          { icon: TrendingUp, label: 'Confidence', value: userStats.confidenceScore + '%', color: '#8b5cf6' },
          { icon: BookOpen, label: 'A2Z Progress', value: userStats.a2zProgress + '%', color: '#3b82f6' }
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl cursor-pointer"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
              whileHover={{ y: -4, boxShadow: `0 10px 30px ${stat.color}15` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`
                  }}
                >
                  <Icon size={18} style={{ color: stat.color }} strokeWidth={2} />
                </div>
                <MoreHorizontal size={16} style={{ color: 'var(--text3)' }} />
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--text3)' }}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text1)' }}>
                {stat.value}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -2 }}
          className="flex items-center justify-between p-5 rounded-2xl font-semibold"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--text1)'
          }}
        >
          <div className="flex items-center gap-3">
            <Play size={20} style={{ color: '#7c3aed' }} />
            Start Today's Revisions
          </div>
          <ArrowUpRight size={16} />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -2 }}
          className="flex items-center justify-between p-5 rounded-2xl font-semibold"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--text1)'
          }}
        >
          <div className="flex items-center gap-3">
            <AlertCircle size={20} style={{ color: '#f43f5e' }} />
            Focus on Weak Topics
          </div>
          <ArrowUpRight size={16} />
        </motion.button>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revision Queue */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg" style={{ color: 'var(--text1)' }}>
              Revision Queue
            </h2>
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: 'rgba(244,63,94,0.1)',
                color: '#f43f5e'
              }}
            >
              {revisionQueue.length} due
            </div>
          </div>
          <div className="space-y-3">
            {revisionQueue.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="p-3 rounded-lg group cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border2)'
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'var(--border)'
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text1)' }}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: item.difficulty === 'Easy' ? 'rgba(16,185,129,0.1)' : item.difficulty === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(244,63,94,0.1)',
                          color: item.difficulty === 'Easy' ? '#10b981' : item.difficulty === 'Medium' ? '#f59e0b' : '#f43f5e'
                        }}
                      >
                        {item.difficulty}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text3)' }}>
                        {item.topic}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full mt-4 py-2.5 rounded-lg text-sm font-medium"
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.2)',
              color: '#a78bfa'
            }}
          >
            View all →
          </motion.button>
        </motion.div>

        {/* Difficulty Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <h2 className="font-bold text-lg mb-6" style={{ color: 'var(--text1)' }}>
            Problem Distribution
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={difficultyDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {difficultyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {difficultyDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span style={{ color: 'var(--text2)' }}>{item.name}</span>
                </div>
                <span style={{ color: 'var(--text1)' }} className="font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weak Topics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg" style={{ color: 'var(--text1)' }}>
              Focus Areas
            </h2>
            <AlertCircle size={18} style={{ color: '#f43f5e' }} />
          </div>
          <div className="space-y-4">
            {weakTopics.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="p-3 rounded-lg"
                style={{
                  background: 'rgba(244,63,94,0.08)',
                  border: '1px solid rgba(244,63,94,0.15)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm" style={{ color: 'var(--text1)' }}>
                    {item.topic}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: item.priority === 'High' ? 'rgba(244,63,94,0.2)' : 'rgba(245,158,11,0.2)',
                      color: item.priority === 'High' ? '#f43f5e' : '#f59e0b'
                    }}
                  >
                    {item.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text3)' }}>
                  <span>{item.problems} problems</span>
                  <span>{item.mastery}% mastery</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Activity + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <h2 className="font-bold text-lg mb-6" style={{ color: 'var(--text1)' }}>
            Weekly Activity
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border2)" />
              <XAxis dataKey="week" stroke="var(--text3)" fontSize={12} />
              <YAxis stroke="var(--text3)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
                cursor={{ fill: 'rgba(124,58,237,0.05)' }}
              />
              <Bar dataKey="solved" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="revised" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text1)' }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="flex items-start gap-3 pb-3"
                style={{
                  borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border2)' : 'none'
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    background: item.status === 'accepted' ? 'rgba(16,185,129,0.15)' : item.status === 'success' ? 'rgba(124,58,237,0.15)' : 'rgba(245,158,11,0.15)',
                    color: item.status === 'accepted' ? '#10b981' : item.status === 'success' ? '#7c3aed' : '#f59e0b'
                  }}
                >
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text1)' }}>
                    {item.action}{' '}
                    <span style={{ color: '#a78bfa' }}>
                      {item.problem || item.revision || item.topic}
                    </span>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text3)' }}>
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Topic Mastery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="p-6 rounded-2xl mb-8"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)'
        }}
      >
        <h2 className="font-bold text-lg mb-6" style={{ color: 'var(--text1)' }}>
          Topic Mastery
        </h2>
        <div className="space-y-4">
          {topicStats.map((item, i) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text1)' }}>
                    {item.topic}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text3)' }}>
                    {item.problems} problems
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: '#7c3aed' }}>
                    {item.mastery}%
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: item.trend.startsWith('+') ? '#10b981' : '#f43f5e'
                    }}
                  >
                    {item.trend}
                  </span>
                </div>
              </div>
              <div
                className="w-full h-2.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.mastery}%` }}
                  transition={{ delay: 0.75 + i * 0.08, duration: 0.6 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #7c3aed, #a78bfa)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Friends Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg" style={{ color: 'var(--text1)' }}>
            Friend Leaderboard
          </h2>
          <Users size={18} style={{ color: '#7c3aed' }} />
        </div>
        <div className="space-y-3">
          {friendStats.map((friend, i) => (
            <motion.div
              key={friend.name}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border2)'
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.04)'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-xs"
                  style={{
                    background: i === 0 ? 'linear-gradient(135deg, #f59e0b, #f97316)' : i === 1 ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'linear-gradient(135deg, #6b7280, #4b5563)',
                    color: 'white'
                  }}
                >
                  {friend.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text1)' }}>
                    #{i + 1} {friend.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text3)' }}>
                    {friend.streak} day streak
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold" style={{ color: '#7c3aed' }}>
                {friend.solved} solved
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}