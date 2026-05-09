import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Code2, LayoutGrid, Play, BookOpen, TrendingUp, Users, Trophy, LogOut, Menu, X, Search, Settings, ChevronRight } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      icon: LayoutGrid,
      label: 'Dashboard',
      path: '/dashboard',
      badge: null,
      color: '#7c3aed',
      stats: 'Your overview'
    },
    {
      icon: Play,
      label: 'Revisions',
      path: '/revisions',
      badge: 3,
      color: '#f43f5e',
      stats: '3 due today'
    },
    {
      icon: BookOpen,
      label: 'A2Z Sheet',
      path: '/a2z',
      badge: '65%',
      color: '#3b82f6',
      stats: '292 / 450 problems'
    },
    {
      icon: TrendingUp,
      label: 'Analytics',
      path: '/topics',
      badge: null,
      color: '#f59e0b',
      stats: 'Topic mastery'
    },
    {
      icon: Users,
      label: 'Friends',
      path: '/friends',
      badge: 2,
      color: '#10b981',
      stats: '2 requests'
    }
  ]

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Icon Dock - When Sidebar Closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen z-30 flex flex-col items-center py-6 gap-4"
            style={{
              background: 'linear-gradient(180deg, var(--card) 0%, var(--bg) 100%)',
              borderRight: '1px solid var(--border)',
              width: '80px',
              transition: 'width 0.3s ease'
            }}
          >
            {/* Logo */}
            <motion.div
              className="p-3 rounded-xl mb-2"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                cursor: 'pointer'
              }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 size={20} color="white" strokeWidth={2.5} />
            </motion.div>

            {/* Menu Icons */}
            <div className="flex-1 flex flex-col gap-3 w-full px-3">
              {menuItems.map((item, i) => {
                const Icon = item.icon
                const active = isActive(item.path)

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="relative flex items-center justify-center gap-4 p-3 rounded-lg transition-all"
                    style={{
                      background: active ? `${item.color}20` : 'transparent',
                      border: active ? `1px solid ${item.color}40` : '1px solid transparent'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.label}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${item.color}15`,
                        color: item.color
                      }}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Bottom Actions */}
            <div className="w-full px-3 flex flex-col gap-2">
              <motion.button
                className="p-3 rounded-lg flex items-center justify-center"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border2)',
                  color: 'var(--text3)'
                }}
                title="Settings"
              >
                <Settings size={16} />
              </motion.button>

              <motion.button
                className="p-3 rounded-lg flex items-center justify-center"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(244,63,94,0.2)',
                  color: '#f43f5e'
                }}
                title="Logout"
              >
                <LogOut size={16} />
              </motion.button>

              {/* Expand Button - Full Width */}
              <motion.button
                onClick={() => setIsOpen(true)}
                className="w-full p-3 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                  color: 'white',
                  border: 'none'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Expand Menu"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 rounded-lg"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          color: 'var(--text1)'
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen w-80 lg:w-72 z-30 flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, var(--card) 0%, var(--bg) 100%)',
              borderRight: '1px solid var(--border)'
            }}
          >
            {/* Header with Close Button */}
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
                >
                  <Code2 size={20} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ color: 'var(--text1)', fontSize: '14px', fontWeight: 'bold' }}>
                    DSAlytics
                  </div>
                  <div style={{ color: 'var(--text3)', fontSize: '10px' }}>
                    beta
                  </div>
                </div>
              </motion.div>
              
              {/* Close Button - Desktop Only */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hidden lg:flex"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border2)',
                  color: 'var(--text3)'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4"
            >
              <motion.div
                className="relative"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--text3)' }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'var(--bg)',
                    border: searchOpen ? '1px solid rgba(124,58,237,0.5)' : '1px solid var(--border2)',
                    color: 'var(--text1)'
                  }}
                />
                {searchOpen && (
                  <div className="absolute top-0 right-3 text-xs" style={{ color: 'var(--text3)', marginTop: '6px' }}>
                    ESC
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 scroll-hidden">
              {filteredItems.map((item, i) => {
                const Icon = item.icon
                const active = isActive(item.path)

                return (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(item.path)
                      setSearchQuery('')
                    }}
                    className="w-full p-3 rounded-xl text-left transition-all relative group"
                    style={{
                      background: active ? `${item.color}20` : 'transparent',
                      border: active ? `1px solid ${item.color}40` : '1px solid transparent'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${item.color}15`,
                            color: item.color
                          }}
                        >
                          <Icon size={16} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <div
                            className="text-sm font-medium"
                            style={{ color: active ? 'var(--text1)' : 'var(--text2)' }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: 'var(--text3)' }}
                          >
                            {item.stats}
                          </div>
                        </div>
                      </div>

                      {/* Badge */}
                      {item.badge && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2 py-1 rounded-md text-xs font-bold flex-shrink-0"
                          style={{
                            background: `${item.color}30`,
                            color: item.color
                          }}
                        >
                          {item.badge}
                        </motion.div>
                      )}
                    </div>

                    {/* Hover Preview */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute left-full ml-2 top-0 pointer-events-none"
                    >
                      <div
                        className="px-3 py-2 rounded-lg text-xs whitespace-nowrap"
                        style={{
                          background: 'var(--card)',
                          border: `1px solid ${item.color}40`,
                          color: 'var(--text1)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                        }}
                      >
                        {item.stats}
                      </div>
                    </motion.div>
                  </motion.button>
                )
              })}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)', margin: '0 1rem' }} />

            {/* Bottom Actions */}
            <div className="p-4 space-y-2">
              <motion.button
                whileHover={{ x: 4 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium"
                style={{
                  color: 'var(--text2)',
                  background: 'transparent',
                  border: '1px solid var(--border2)'
                }}
              >
                <Settings size={16} />
                Settings
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium"
                style={{
                  color: '#f43f5e',
                  background: 'transparent',
                  border: '1px solid rgba(244,63,94,0.2)'
                }}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>

            {/* Collapse Button - Desktop */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="hidden lg:flex items-center justify-center p-3 m-3 rounded-lg"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text3)'
              }}
            >
              <X size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay - Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
