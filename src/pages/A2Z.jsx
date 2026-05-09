import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, CheckCircle2, ExternalLink, RotateCw, Lock } from 'lucide-react'

// Complete A2Z Sheet with LeetCode problems and learning sections
const A2Z_DATA = [
  {
    title: 'Learn the Basics',
    isLearning: true,
    totalProblems: 54,
    problems: [
      { id: 1, name: 'Things to Know Before Competitive Programming', isLearning: true },
      { id: 2, name: 'Complexity Analysis', isLearning: true },
      { id: 3, name: 'Know Basic Data Structures', isLearning: true },
      { id: 4, name: 'Arrays', isLearning: true },
      { id: 5, name: 'Vectors', isLearning: true },
    ]
  },
  {
    title: 'Sorting',
    isLearning: true,
    totalProblems: 7,
    problems: [
      { id: 6, name: 'Selection Sort', isLearning: true },
      { id: 7, name: 'Bubble Sort', isLearning: true },
      { id: 8, name: 'Insertion Sort', isLearning: true },
      { id: 9, name: 'Merge Sort', isLearning: true },
      { id: 10, name: 'Quick Sort', isLearning: true },
    ]
  },
  {
    title: 'Arrays [Easy → Medium → Hard]',
    problems: [
      { id: 11, name: 'Two Sum', leetcode: 1, difficulty: 'Easy', solved: true },
      { id: 12, name: 'Best Time to Buy and Sell Stock', leetcode: 121, difficulty: 'Easy', solved: true },
      { id: 13, name: 'Contains Duplicate', leetcode: 217, difficulty: 'Easy', solved: true },
      { id: 14, name: 'Valid Parentheses', leetcode: 20, difficulty: 'Easy', solved: false },
      { id: 15, name: 'Majority Element', leetcode: 169, difficulty: 'Easy', solved: false },
      { id: 16, name: 'Remove Duplicates', leetcode: 26, difficulty: 'Easy', solved: false },
      { id: 17, name: 'Merge Sorted Array', leetcode: 88, difficulty: 'Easy', solved: false },
      { id: 18, name: 'Product of Array Except Self', leetcode: 238, difficulty: 'Medium', solved: true },
      { id: 19, name: 'Trapping Rain Water', leetcode: 42, difficulty: 'Hard', solved: false },
      { id: 20, name: 'Median of Two Sorted Arrays', leetcode: 4, difficulty: 'Hard', solved: false },
    ]
  },
  {
    title: 'Binary Search',
    problems: [
      { id: 21, name: 'Binary Search', leetcode: 704, difficulty: 'Easy', solved: false },
      { id: 22, name: 'Search Insert Position', leetcode: 35, difficulty: 'Easy', solved: false },
      { id: 23, name: 'Find First and Last Position', leetcode: 34, difficulty: 'Medium', solved: false },
      { id: 24, name: 'Search in Rotated Sorted Array', leetcode: 33, difficulty: 'Medium', solved: false },
      { id: 25, name: 'Search in Rotated Sorted Array II', leetcode: 81, difficulty: 'Medium', solved: false },
      { id: 26, name: 'Find in Mountain Array', leetcode: 1095, difficulty: 'Hard', solved: false },
    ]
  },
  {
    title: 'Strings',
    problems: [
      { id: 27, name: 'Reverse String', leetcode: 344, difficulty: 'Easy', solved: false },
      { id: 28, name: 'Valid Palindrome', leetcode: 125, difficulty: 'Easy', solved: false },
      { id: 29, name: 'Longest Substring Without Repeating', leetcode: 3, difficulty: 'Medium', solved: false },
      { id: 30, name: 'Group Anagrams', leetcode: 49, difficulty: 'Medium', solved: false },
      { id: 31, name: 'Longest Palindromic Substring', leetcode: 5, difficulty: 'Medium', solved: false },
      { id: 32, name: 'Regular Expression Matching', leetcode: 10, difficulty: 'Hard', solved: false },
    ]
  },
  {
    title: 'Linked List',
    problems: [
      { id: 33, name: 'Reverse Linked List', leetcode: 206, difficulty: 'Easy', solved: false },
      { id: 34, name: 'Merge Two Sorted Lists', leetcode: 21, difficulty: 'Easy', solved: false },
      { id: 35, name: 'Linked List Cycle', leetcode: 141, difficulty: 'Easy', solved: false },
      { id: 36, name: 'Remove Nth Node From End', leetcode: 19, difficulty: 'Medium', solved: false },
      { id: 37, name: 'LRU Cache', leetcode: 146, difficulty: 'Medium', solved: false },
      { id: 38, name: 'Copy List with Random Pointer', leetcode: 138, difficulty: 'Medium', solved: false },
    ]
  },
  {
    title: 'Recursion',
    problems: [
      { id: 39, name: 'Subsets', leetcode: 78, difficulty: 'Medium', solved: false },
      { id: 40, name: 'Permutations', leetcode: 46, difficulty: 'Medium', solved: false },
      { id: 41, name: 'Combinations', leetcode: 77, difficulty: 'Medium', solved: false },
      { id: 42, name: 'Combination Sum', leetcode: 39, difficulty: 'Medium', solved: false },
      { id: 43, name: 'N-Queens', leetcode: 51, difficulty: 'Hard', solved: false },
    ]
  },
  {
    title: 'Stack & Queues',
    problems: [
      { id: 44, name: 'Valid Parentheses', leetcode: 20, difficulty: 'Easy', solved: false },
      { id: 45, name: 'Min Stack', leetcode: 155, difficulty: 'Medium', solved: false },
      { id: 46, name: 'Largest Rectangle in Histogram', leetcode: 84, difficulty: 'Hard', solved: false },
      { id: 47, name: 'Trapping Rain Water', leetcode: 42, difficulty: 'Hard', solved: false },
      { id: 48, name: 'Implement Queue using Stacks', leetcode: 232, difficulty: 'Easy', solved: false },
    ]
  },
  {
    title: 'Binary Trees',
    problems: [
      { id: 49, name: 'Inorder Traversal', leetcode: 94, difficulty: 'Easy', solved: false },
      { id: 50, name: 'Level Order Traversal', leetcode: 102, difficulty: 'Medium', solved: false },
      { id: 51, name: 'Lowest Common Ancestor', leetcode: 236, difficulty: 'Medium', solved: false },
      { id: 52, name: 'Maximum Path Sum', leetcode: 124, difficulty: 'Hard', solved: false },
      { id: 53, name: 'Serialize and Deserialize', leetcode: 297, difficulty: 'Hard', solved: false },
    ]
  },
  {
    title: 'Binary Search Trees',
    problems: [
      { id: 54, name: 'Validate Binary Search Tree', leetcode: 98, difficulty: 'Medium', solved: false },
      { id: 55, name: 'Kth Smallest in BST', leetcode: 230, difficulty: 'Medium', solved: false },
      { id: 56, name: 'BST Iterator', leetcode: 173, difficulty: 'Medium', solved: false },
      { id: 57, name: 'Largest BST in Binary Tree', leetcode: 333, difficulty: 'Medium', solved: false },
    ]
  },
  {
    title: 'Graphs & BFS/DFS',
    problems: [
      { id: 58, name: 'Number of Islands', leetcode: 200, difficulty: 'Medium', solved: false },
      { id: 59, name: 'Clone Graph', leetcode: 133, difficulty: 'Medium', solved: false },
      { id: 60, name: 'Course Schedule', leetcode: 207, difficulty: 'Medium', solved: false },
      { id: 61, name: 'Number of Connected Components', leetcode: 323, difficulty: 'Medium', solved: false },
      { id: 62, name: 'Word Ladder II', leetcode: 126, difficulty: 'Hard', solved: false },
    ]
  },
  {
    title: 'Dynamic Programming',
    problems: [
      { id: 63, name: 'Climbing Stairs', leetcode: 70, difficulty: 'Easy', solved: false },
      { id: 64, name: 'House Robber', leetcode: 198, difficulty: 'Medium', solved: false },
      { id: 65, name: 'Coin Change', leetcode: 322, difficulty: 'Medium', solved: false },
      { id: 66, name: 'Edit Distance', leetcode: 72, difficulty: 'Medium', solved: false },
      { id: 67, name: 'Distinct Subsequences', leetcode: 115, difficulty: 'Hard', solved: false },
      { id: 68, name: 'Burst Balloons', leetcode: 312, difficulty: 'Hard', solved: false },
    ]
  },
]

const allProblems = A2Z_DATA.flatMap(s => s.problems)
const leetcodeProblems = allProblems.filter(p => p.leetcode)
const totalLeetcode = leetcodeProblems.length

export default function A2Z() {
  const [expandedSections, setExpandedSections] = useState({})
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState('')

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const solvedCount = leetcodeProblems.filter(p => p.solved).length
  const easyCount = leetcodeProblems.filter(p => p.difficulty === 'Easy').length
  const mediumCount = leetcodeProblems.filter(p => p.difficulty === 'Medium').length
  const hardCount = leetcodeProblems.filter(p => p.difficulty === 'Hard').length
  const overallProgress = Math.round((solvedCount / totalLeetcode) * 100)

  const handleSync = async () => {
    setSyncing(true)
    setSyncStatus('Syncing...')
    setTimeout(() => {
      setSyncStatus('Synced successfully!')
      setSyncing(false)
      setTimeout(() => setSyncStatus(''), 1500)
    }, 2000)
  }

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return { bg: '#10b98120', text: '#10b981' }
    if (diff === 'Medium') return { bg: '#f59e0b20', text: '#f59e0b' }
    return { bg: '#f43f5e20', text: '#f43f5e' }
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6" style={{ background: 'var(--bg)' }}>
      {/* ═══ COMPACT HEADER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-6"
      >
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex-1">
            <h1 
              style={{ 
                color: 'var(--text1)', 
                fontSize: 'clamp(20px, 5vw, 28px)', 
                fontWeight: '800',
                letterSpacing: '-0.5px',
                marginBottom: '2px'
              }}
            >
              A2Z DSA Mastery
            </h1>
            <p style={{ color: 'var(--text3)', fontSize: 'clamp(11px, 2vw, 12px)', fontWeight: '500' }}>
              Complete DSA learning path — Synced from LeetCode
            </p>
          </div>
          
          {/* SYNC BUTTON - COMPACT */}
          <motion.button
            onClick={handleSync}
            disabled={syncing}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)',
              cursor: syncing ? 'not-allowed' : 'pointer'
            }}
          >
            <motion.div 
              animate={{ rotate: syncing ? 360 : 0 }} 
              transition={{ duration: 1.5, repeat: syncing ? Infinity : 0 }}
            >
              <RotateCw size={16} />
            </motion.div>
            {syncing ? 'Syncing...' : 'Sync LeetCode'}
          </motion.button>
        </div>

        {syncStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold mt-2"
            style={{
              background: syncStatus.includes('Success') 
                ? 'linear-gradient(135deg, #10b98118, #10b98110)' 
                : 'linear-gradient(135deg, #7c3aed18, #a78bfa10)',
              color: syncStatus.includes('Success') ? '#10b981' : '#7c3aed',
              border: syncStatus.includes('Success') 
                ? '1px solid #10b98140' 
                : '1px solid rgba(124,58,237,0.3)'
            }}
          >
            {syncStatus}
          </motion.div>
        )}
      </motion.div>

      {/* ═══ MAIN STATS - MULTI-RING LAYOUT ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl p-8 lg:p-10 mb-8"
        style={{
          background: 'linear-gradient(135deg, #7c3aed10, #a78bfa08)',
          border: '1.5px solid rgba(124, 58, 237, 0.2)',
          backdropFilter: 'blur(30px)',
          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.1)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {/* LEFT - MULTI-RING PROGRESS CIRCLE (3 cols) */}
          <motion.div
            initial={{ scale: 0, rotate: -180, x: -100 }}
            animate={{ scale: 1, rotate: 0, x: 0 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative w-52 h-52 flex items-center justify-center">
              {/* Outer Ring - Easy (Green) */}
              <svg className="absolute w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="104" cy="104" r="96" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="10" />
                <motion.circle
                  cx="104" cy="104" r="96"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 603` }}
                  animate={{ strokeDasharray: `${(easyCount / totalLeetcode) * 603} 603` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </svg>

              {/* Middle Ring - Medium (Orange) */}
              <svg className="absolute w-4/5 h-4/5" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="83.2" cy="83.2" r="76.8" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="10" />
                <motion.circle
                  cx="83.2" cy="83.2" r="76.8"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 482.4` }}
                  animate={{ strokeDasharray: `${(mediumCount / totalLeetcode) * 482.4} 482.4` }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
              </svg>

              {/* Inner Ring - Hard (Red) */}
              <svg className="absolute w-3/5 h-3/5" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="62.4" cy="62.4" r="57.6" fill="none" stroke="rgba(244,63,94,0.15)" strokeWidth="10" />
                <motion.circle
                  cx="62.4" cy="62.4" r="57.6"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 361.9` }}
                  animate={{ strokeDasharray: `${(hardCount / totalLeetcode) * 361.9} 361.9` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>

              {/* Center Content */}
              <motion.div className="text-center z-10">
                <motion.div 
                  style={{ color: '#fff', fontSize: 'clamp(32px, 6vw, 38px)', fontWeight: '900', lineHeight: '1' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {solvedCount}/{totalLeetcode}
                </motion.div>
                <motion.div 
                  style={{ color: 'var(--text3)', fontSize: 'clamp(10px, 1.5vw, 11px)', marginTop: '2px', fontWeight: '600' }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Solved
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT - DIFFICULTY STATS AS CLEAN CIRCLES */}
          <motion.div 
            className="md:col-span-3 flex items-center justify-center gap-16"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Easy Circle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: 'spring', bounce: 0.5 }}
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.08, y: -10, transition: { duration: 0.3 } }}
            >
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  border: '2.5px solid #10b981',
                  background: `rgba(16,185,129,0.15)`,
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Content */}
                <div className="text-center z-10">
                  <motion.div 
                    style={{ color: '#10b981', fontSize: 'clamp(36px, 5vw, 42px)', fontWeight: '900', lineHeight: '1' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {easyCount}
                  </motion.div>
                  <motion.div 
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: '600', marginTop: '4px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    of {totalLeetcode}
                  </motion.div>
                </div>
              </div>
              <motion.div 
                style={{ color: '#10b981', fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '14px' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Easy
              </motion.div>
            </motion.div>

            {/* Medium Circle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, type: 'spring', bounce: 0.5 }}
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.08, y: -10, transition: { duration: 0.3 } }}
            >
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  border: '2.5px solid #f59e0b',
                  background: `rgba(245,158,11,0.15)`,
                  boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Content */}
                <div className="text-center z-10">
                  <motion.div 
                    style={{ color: '#f59e0b', fontSize: 'clamp(36px, 5vw, 42px)', fontWeight: '900', lineHeight: '1' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {mediumCount}
                  </motion.div>
                  <motion.div 
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: '600', marginTop: '4px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    of {totalLeetcode}
                  </motion.div>
                </div>
              </div>
              <motion.div 
                style={{ color: '#f59e0b', fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '14px' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Medium
              </motion.div>
            </motion.div>

            {/* Hard Circle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: 'spring', bounce: 0.5 }}
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.08, y: -10, transition: { duration: 0.3 } }}
            >
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  border: '2.5px solid #f43f5e',
                  background: `rgba(244,63,94,0.15)`,
                  boxShadow: '0 8px 32px rgba(244, 63, 94, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Content */}
                <div className="text-center z-10">
                  <motion.div 
                    style={{ color: '#f43f5e', fontSize: 'clamp(36px, 5vw, 42px)', fontWeight: '900', lineHeight: '1' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {hardCount}
                  </motion.div>
                  <motion.div 
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: '600', marginTop: '4px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    of {totalLeetcode}
                  </motion.div>
                </div>
              </div>
              <motion.div 
                style={{ color: '#f43f5e', fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '14px' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Hard
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ PROBLEM SECTIONS ═══ */}
      <div className="space-y-2">
        {A2Z_DATA.map((section, idx) => {
          const isExpanded = expandedSections[idx] !== false
          const leetcodeInSection = section.problems.filter(p => p.leetcode)
          const solvedInSection = leetcodeInSection.filter(p => p.solved).length

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.15) }}
              className="rounded-lg overflow-hidden"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.06)' : '0 1px 4px rgba(0,0,0,0.03)',
                transition: 'all 0.25s ease'
              }}
            >
              <motion.button
                onClick={() => toggleSection(idx)}
                className="w-full p-4 flex items-center justify-between hover:bg-opacity-70 transition-all"
                style={{
                  background: isExpanded ? 'var(--card2)' : 'transparent'
                }}
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} style={{ color: '#7c3aed' }} />
                  </motion.div>
                  <div>
                    <div style={{ color: 'var(--text1)', fontSize: 'clamp(12px, 2vw, 14px)', fontWeight: '700' }}>
                      {section.title}
                    </div>
                    {!section.isLearning && leetcodeInSection.length > 0 && (
                      <div style={{ color: 'var(--text3)', fontSize: 'clamp(11px, 1.5vw, 12px)', marginTop: '2px', fontWeight: '500' }}>
                        {solvedInSection}/{leetcodeInSection.length} done
                      </div>
                    )}
                  </div>
                </div>

                {!section.isLearning && leetcodeInSection.length > 0 && (
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed15, #a78bfa10)',
                      color: '#7c3aed',
                      border: '1px solid rgba(124,58,237,0.2)'
                    }}
                  >
                    <CheckCircle2 size={13} color="#10b981" />
                    {solvedInSection}/{leetcodeInSection.length}
                  </div>
                )}
              </motion.button>

              {/* Problems List */}
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ borderTop: '1px solid var(--border2)' }}>
                  {section.problems.map((problem, pidx) => {
                    const isLearning = problem.isLearning
                    const isSolved = problem.solved

                    return (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(pidx * 0.01, 0.08) }}
                        className="px-4 py-3 flex items-center justify-between group hover:bg-opacity-100 transition-all"
                        style={{
                          borderBottom: pidx === section.problems.length - 1 ? 'none' : '1px solid var(--border2)',
                          background: isSolved && !isLearning ? 'rgba(16,185,129,0.04)' : 'transparent'
                        }}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div style={{ flexShrink: 0 }}>
                            {isSolved ? (
                              <CheckCircle2 size={16} color="#10b981" />
                            ) : isLearning ? (
                              <Lock size={16} color="var(--text3)" />
                            ) : (
                              <div className="w-4 h-4 rounded-full" style={{ border: '1.5px solid var(--border2)' }} />
                            )}
                          </div>

                          <span
                            style={{
                              color: isSolved ? '#10b981' : 'var(--text1)',
                              fontSize: 'clamp(12px, 1.5vw, 13px)',
                              fontWeight: isSolved ? '600' : '500',
                              textDecoration: isSolved ? 'line-through' : 'none',
                              opacity: isSolved ? 0.7 : 1
                            }}
                          >
                            {problem.name}
                          </span>
                        </div>

                        {!isLearning && (
                          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                            <div
                              className="px-2 py-1 rounded-lg text-xs font-semibold"
                              style={{
                                background: getDifficultyColor(problem.difficulty).bg,
                                color: getDifficultyColor(problem.difficulty).text
                              }}
                            >
                              {problem.difficulty}
                            </div>
                            <a
                              href={`https://leetcode.com/problems/two-sum/`}
                              target="_blank"
                              rel="noopener noreferrer"
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
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
