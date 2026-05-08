import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Pages (we'll build these next)
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}