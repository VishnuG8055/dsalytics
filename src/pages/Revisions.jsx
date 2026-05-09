import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ExternalLink, Shuffle, Download } from 'lucide-react'

// All solved problems with revision tracking
const ALL_SOLVED_PROBLEMS = [
  { id: 11, name: 'Two Sum', leetcode: 1, difficulty: 'Easy', revisions: 1, fullyConfident: false },
  { id: 12, name: 'Best Time to Buy and Sell Stock', leetcode: 121, difficulty: 'Easy', revisions: 2, fullyConfident: false },
  { id: 13, name: 'Contains Duplicate', leetcode: 217, difficulty: 'Easy', revisions: 0, fullyConfident: true },
  { id: 18, name: 'Product of Array Except Self', leetcode: 238, difficulty: 'Medium', revisions: 0, fullyConfident: false },
]

const getDifficultyColor = (diff) => {
  if (diff === 'Easy') return { bg: '#10b98120', text: '#10b981' }
  if (diff === 'Medium') return { bg: '#f59e0b20', text: '#f59e0b' }
  return { bg: '#f43f5e20', text: '#f43f5e' }
}

export default function Revisions() {
  const [isShuffled, setIsShuffled] = useState(false)
  const [displayProblems, setDisplayProblems] = useState([])
  const [problems, setProblems] = useState(ALL_SOLVED_PROBLEMS)
  const [selectedProblem, setSelectedProblem] = useState(null)
  
  // Filter states
  const [showFirst, setShowFirst] = useState(true)
  const [showSecond, setShowSecond] = useState(true)
  const [showThird, setShowThird] = useState(true)
  const [showConfident, setShowConfident] = useState(true)

  // Toggle confident status for a problem
  const toggleConfident = (leetcodeId) => {
    setProblems(prev => prev.map(p => 
      p.leetcode === leetcodeId ? { ...p, fullyConfident: !p.fullyConfident } : p
    ))
  }

  // Update revisions count
  const updateRevisions = (leetcodeId, newCount) => {
    setProblems(prev => prev.map(p => 
      p.leetcode === leetcodeId ? { ...p, revisions: newCount, fullyConfident: false } : p
    ))
  }

  // Update selected problem when problems change
  useEffect(() => {
    if (selectedProblem) {
      const updatedProblem = problems.find(p => p.leetcode === selectedProblem.leetcode)
      if (updatedProblem) {
        setSelectedProblem(updatedProblem)
      }
    }
  }, [problems])

  // Update display based on filters and shuffle
  useEffect(() => {
    let filtered = problems.filter(p => {
      // Check if problem matches ANY of the enabled filters
      const matches = []
      
      if (showFirst && p.revisions === 1 && !p.fullyConfident) matches.push(true)
      if (showSecond && p.revisions === 2 && !p.fullyConfident) matches.push(true)
      if (showThird && p.revisions === 3 && !p.fullyConfident) matches.push(true)
      if (showConfident && p.fullyConfident) matches.push(true)
      if (p.revisions === 0 && !p.fullyConfident && (showFirst || showSecond || showThird)) matches.push(true) // New problems
      
      return matches.length > 0
    })

    // Sort by problem number if not shuffled
    if (!isShuffled) {
      filtered.sort((a, b) => a.leetcode - b.leetcode)
    }
    
    setDisplayProblems(filtered)
  }, [problems, showFirst, showSecond, showThird, showConfident, isShuffled])

  const handleShuffle = () => {
    // Fisher-Yates shuffle
    let shuffled = [...displayProblems]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setDisplayProblems(shuffled)
    setIsShuffled(true)
  }

  const handleSync = () => {
    // TODO: Sync solved problems from LeetCode API
    console.log('Syncing from LeetCode...')
    alert('Sync feature coming soon! Will fetch your solved problems from LeetCode')
    // This will fetch the user's solved problems from LeetCode
  }

  const handleUnshuffle = () => {
    setIsShuffled(false)
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6" style={{ background: 'var(--bg)' }}>
      {/* ═══ HEADER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div>
            <h1 style={{
              color: 'var(--text1)',
              fontSize: 'clamp(20px, 5vw, 28px)',
              fontWeight: '800',
              marginBottom: '4px'
            }}>
              Revision Queue
            </h1>
            <p style={{ color: 'var(--text3)', fontSize: 'clamp(11px, 2vw, 12px)', fontWeight: '500' }}>
              {displayProblems.length} problem{displayProblems.length !== 1 ? 's' : ''} ready for practice
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sync Button */}
            <motion.button
              onClick={handleSync}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap flex items-center gap-2 transition-all"
              style={{
                background: 'var(--card)',
                color: 'var(--text1)',
                border: '1px solid var(--border)'
              }}
              title="Sync solved problems from LeetCode"
            >
              <Download size={14} />
              Sync
            </motion.button>

            {/* Shuffle Button */}
            {!isShuffled ? (
              <motion.button
                onClick={handleShuffle}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap flex items-center gap-2 transition-all"
                style={{
                  background: 'var(--card)',
                  color: 'var(--text1)',
                  border: '1px solid var(--border)'
                }}
              >
                <Shuffle size={14} />
                Shuffle
              </motion.button>
            ) : (
              <motion.button
                onClick={handleUnshuffle}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap flex items-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}
              >
                <Shuffle size={14} />
                Unshuffle
              </motion.button>
            )}

            {/* Filter Checkboxes */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Revised 1x */}
              <motion.label
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all"
                style={{
                  background: 'var(--card)',
                  border: showFirst ? '1px solid #3b82f6' : '1px solid var(--border)',
                }}
              >
                <input
                  type="checkbox"
                  checked={showFirst}
                  onChange={(e) => setShowFirst(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#3b82f6'
                  }}
                />
                <span style={{ color: 'var(--text2)', fontSize: '12px', fontWeight: '600' }}>
                  Revised 1x
                </span>
              </motion.label>

              {/* Revised 2x */}
              <motion.label
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all"
                style={{
                  background: 'var(--card)',
                  border: showSecond ? '1px solid #f59e0b' : '1px solid var(--border)',
                }}
              >
                <input
                  type="checkbox"
                  checked={showSecond}
                  onChange={(e) => setShowSecond(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#f59e0b'
                  }}
                />
                <span style={{ color: 'var(--text2)', fontSize: '12px', fontWeight: '600' }}>
                  Revised 2x
                </span>
              </motion.label>

              {/* Revised 3x */}
              <motion.label
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all"
                style={{
                  background: 'var(--card)',
                  border: showThird ? '1px solid #a78bfa' : '1px solid var(--border)',
                }}
              >
                <input
                  type="checkbox"
                  checked={showThird}
                  onChange={(e) => setShowThird(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#a78bfa'
                  }}
                />
                <span style={{ color: 'var(--text2)', fontSize: '12px', fontWeight: '600' }}>
                  Revised 3x
                </span>
              </motion.label>

              {/* Fully Confident */}
              <motion.label
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all"
                style={{
                  background: 'var(--card)',
                  border: showConfident ? '1px solid #10b981' : '1px solid var(--border)',
                }}
              >
                <input
                  type="checkbox"
                  checked={showConfident}
                  onChange={(e) => setShowConfident(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#10b981'
                  }}
                />
                <span style={{ color: 'var(--text2)', fontSize: '12px', fontWeight: '600' }}>
                  Fully Confident
                </span>
              </motion.label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ PROBLEMS LIST ═══ */}
      {displayProblems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg p-12 text-center"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto 16px' }} />
          <h2 style={{ color: 'var(--text1)', fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '800', marginBottom: '8px' }}>
            No Problems Yet
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 'clamp(12px, 2vw, 14px)' }}>
            Solve some LeetCode problems to see them here
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <AnimatePresence mode="popLayout">
            {displayProblems.map((problem, idx) => (
              <motion.div
                key={`${problem.leetcode}-${isShuffled}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.1) }}
                onClick={() => setSelectedProblem(problem)}
                className="flex items-center justify-between gap-3 p-3 rounded-lg group hover:bg-opacity-80 transition-all cursor-pointer"
                style={{
                  background: problem.fullyConfident ? 'rgba(16, 185, 129, 0.08)' : 'var(--card)',
                  border: problem.fullyConfident ? '1px solid #10b98140' : '1px solid var(--border)'
                }}
              >
                {/* Problem Number & Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: problem.fullyConfident 
                      ? 'linear-gradient(135deg, #10b981, #34d399)'
                      : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 'clamp(11px, 1.5vw, 12px)',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    #{problem.leetcode}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div style={{
                      color: problem.fullyConfident ? '#10b981' : 'var(--text1)',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: problem.fullyConfident ? '500' : '600',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      opacity: problem.fullyConfident ? 0.7 : 1
                    }}>
                      {problem.name}
                    </div>
                  </div>
                </div>

                {/* Revision Count, Difficulty & Checkbox */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Fully Confident Badge */}
                  {problem.fullyConfident && (
                    <div
                      className="px-2 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: '#10b98120',
                        color: '#10b981'
                      }}
                    >
                      ✓ Confident
                    </div>
                  )}

                  {/* Revision Badge */}
                  {problem.revisions > 0 && !problem.fullyConfident && (
                    <div
                      className="px-2 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: problem.revisions === 1 ? '#3b82f620' : problem.revisions === 2 ? '#f59e0b20' : '#a78bfa20',
                        color: problem.revisions === 1 ? '#3b82f6' : problem.revisions === 2 ? '#f59e0b' : '#a78bfa'
                      }}
                    >
                      {problem.revisions === 1 ? 'Revised 1x' : problem.revisions === 2 ? 'Revised 2x' : 'Revised 3x'}
                    </div>
                  )}

                  <div
                    className="px-2 py-1 rounded-lg text-xs font-semibold"
                    style={{
                      background: getDifficultyColor(problem.difficulty).bg,
                      color: getDifficultyColor(problem.difficulty).text
                    }}
                  >
                    {problem.difficulty}
                  </div>

                  {/* Confident Checkbox - Round Checkbox */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleConfident(problem.leetcode)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center transition-all duration-200"
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: problem.fullyConfident ? '#10b981' : 'transparent',
                      border: problem.fullyConfident ? 'none' : '2px solid var(--text3)',
                      cursor: 'pointer'
                    }}
                    title="Mark as fully confident"
                  >
                    {problem.fullyConfident && (
                      <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                    )}
                  </motion.button>

                  <a
                    href={`https://leetcode.com/problems/two-sum/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{
                      background: 'var(--card2)',
                      color: '#7c3aed'
                    }}
                    title="Open on LeetCode"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ═══ PROBLEM DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProblem(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              {/* Modal Header */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: 'var(--text3)', fontWeight: '600', marginBottom: '4px' }}>
                      LeetCode #{selectedProblem.leetcode}
                    </div>
                    <h2 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: '800', color: 'var(--text1)' }}>
                      {selectedProblem.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-3">
                      <div
                        className="px-2 py-1 rounded-lg text-xs font-semibold"
                        style={{
                          background: getDifficultyColor(selectedProblem.difficulty).bg,
                          color: getDifficultyColor(selectedProblem.difficulty).text
                        }}
                      >
                        {selectedProblem.difficulty}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedProblem(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'var(--card2)',
                      border: 'none',
                      color: 'var(--text2)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Problem Description */}
              <div className="p-6">
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: 'var(--text1)', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
                    Description
                  </h3>
                  <p style={{ color: 'var(--text2)', fontSize: '13px', lineHeight: '1.6' }}>
                    This is a {selectedProblem.difficulty.toLowerCase()} difficulty problem on LeetCode. 
                    Click the "View on LeetCode" button below to see the full problem statement with examples and test cases.
                  </p>
                </div>

                {/* Revision Status Section */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: 'var(--text1)', fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>
                    Revision Status
                  </h3>
                  
                  <div className="space-y-2">
                    {/* First Revised */}
                    <motion.button
                      onClick={() => updateRevisions(selectedProblem.leetcode, 1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
                      style={{
                        background: selectedProblem.revisions === 1 ? '#3b82f615' : 'var(--card2)',
                        border: selectedProblem.revisions === 1 ? '1px solid #3b82f6' : '1px solid var(--border)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: selectedProblem.revisions === 1 ? '#3b82f6' : 'var(--text3)',
                        transition: 'all 0.2s'
                      }} />
                      <span style={{ color: selectedProblem.revisions === 1 ? '#3b82f6' : 'var(--text2)', fontWeight: selectedProblem.revisions === 1 ? '600' : '500', fontSize: '13px' }}>
                        First Revision
                      </span>
                    </motion.button>

                    {/* Second Revised */}
                    <motion.button
                      onClick={() => updateRevisions(selectedProblem.leetcode, 2)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
                      style={{
                        background: selectedProblem.revisions === 2 ? '#f59e0b15' : 'var(--card2)',
                        border: selectedProblem.revisions === 2 ? '1px solid #f59e0b' : '1px solid var(--border)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: selectedProblem.revisions === 2 ? '#f59e0b' : 'var(--text3)',
                        transition: 'all 0.2s'
                      }} />
                      <span style={{ color: selectedProblem.revisions === 2 ? '#f59e0b' : 'var(--text2)', fontWeight: selectedProblem.revisions === 2 ? '600' : '500', fontSize: '13px' }}>
                        Second Revision
                      </span>
                    </motion.button>

                    {/* Third Revised */}
                    <motion.button
                      onClick={() => updateRevisions(selectedProblem.leetcode, 3)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
                      style={{
                        background: selectedProblem.revisions === 3 ? '#a78bfa15' : 'var(--card2)',
                        border: selectedProblem.revisions === 3 ? '1px solid #a78bfa' : '1px solid var(--border)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: selectedProblem.revisions === 3 ? '#a78bfa' : 'var(--text3)',
                        transition: 'all 0.2s'
                      }} />
                      <span style={{ color: selectedProblem.revisions === 3 ? '#a78bfa' : 'var(--text2)', fontWeight: selectedProblem.revisions === 3 ? '600' : '500', fontSize: '13px' }}>
                        Third Revision
                      </span>
                    </motion.button>

                    {/* Fully Confident */}
                    <motion.button
                      onClick={() => toggleConfident(selectedProblem.leetcode)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
                      style={{
                        background: selectedProblem.fullyConfident ? '#10b98115' : 'var(--card2)',
                        border: selectedProblem.fullyConfident ? '1px solid #10b981' : '1px solid var(--border)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: selectedProblem.fullyConfident ? '#10b981' : 'var(--text3)',
                        transition: 'all 0.2s'
                      }} />
                      <span style={{ color: selectedProblem.fullyConfident ? '#10b981' : 'var(--text2)', fontWeight: selectedProblem.fullyConfident ? '600' : '500', fontSize: '13px' }}>
                        Fully Confident
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={`https://leetcode.com/problems/two-sum/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all text-white"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                      textDecoration: 'none',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    View on LeetCode
                  </a>
                  <motion.button
                    onClick={() => setSelectedProblem(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background: 'var(--card2)',
                      color: 'var(--text1)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
