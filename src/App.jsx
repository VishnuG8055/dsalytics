import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Sidebar from './components/Sidebar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Revisions from './pages/Revisions'
import A2Z from './pages/A2Z'
import Topics from './pages/Topics'
import Friends from './pages/Friends'
import Resources from './pages/Resources'

function AppLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-20">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes with Sidebar */}
          <Route path="/dashboard" element={
            <AppLayout><Dashboard /></AppLayout>
          } />
          <Route path="/revisions" element={
            <AppLayout><Revisions /></AppLayout>
          } />
          <Route path="/a2z" element={
            <AppLayout><A2Z /></AppLayout>
          } />
          <Route path="/topics" element={
            <AppLayout><Topics /></AppLayout>
          } />
          <Route path="/friends" element={
            <AppLayout><Friends /></AppLayout>
          } />
          <Route path="/resources" element={
            <AppLayout><Resources /></AppLayout>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}