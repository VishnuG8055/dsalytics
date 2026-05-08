import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ background: 'var(--bg-primary)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
               style={{ borderColor: 'var(--accent)' }} />
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}