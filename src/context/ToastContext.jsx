import { createContext, useContext, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

const ToastContext = createContext(null)

const TOAST_TYPES = {
  success: { bg: '#10b98120', border: '#10b981', icon: CheckCircle2, color: '#10b981' },
  error: { bg: '#f43f5e20', border: '#f43f5e', icon: AlertCircle, color: '#f43f5e' },
  warning: { bg: '#f59e0b20', border: '#f59e0b', icon: AlertTriangle, color: '#f59e0b' },
  info: { bg: '#3b82f620', border: '#3b82f6', icon: Info, color: '#3b82f6' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now()
    const toast = { id, message, type }

    setToasts(prev => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 z-[999] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function Toast({ toast, onRemove }) {
  const typeConfig = TOAST_TYPES[toast.type] || TOAST_TYPES.info
  const Icon = typeConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 20 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="mb-3 pointer-events-auto"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm"
        style={{
          background: typeConfig.bg,
          border: `1px solid ${typeConfig.border}`,
        }}
      >
        <Icon size={18} style={{ color: typeConfig.color, flexShrink: 0 }} />
        <p
          className="text-sm font-medium flex-1 max-w-xs"
          style={{ color: 'var(--text1)' }}
        >
          {toast.message}
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(toast.id)}
          className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
          style={{ color: typeConfig.color }}
        >
          <X size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
