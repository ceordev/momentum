import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home, Settings, ClipboardCheck, Sparkles } from 'lucide-react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SettingsPage from './pages/Settings'
import TaskReview from './pages/TaskReview'

function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Sparkles, label: 'Inicio' },
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/review', icon: ClipboardCheck, label: 'Revisión' },
    { path: '/settings', icon: Settings, label: 'Configuración' },
  ]
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Momentum AI</h1>
              <p className="text-xs text-gray-500">Asistente de Proyectos</p>
            </div>
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page without navigation */}
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Landing />
          </div>
        } />
        
        {/* App pages with standard layout */}
        <Route path="/dashboard" element={
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Dashboard />
            </main>
          </div>
        } />
        
        <Route path="/review" element={
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <TaskReview />
            </main>
          </div>
        } />
        
        <Route path="/settings" element={
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <SettingsPage />
            </main>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
