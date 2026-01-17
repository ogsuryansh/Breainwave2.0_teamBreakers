import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { ChevronDown, Users, Rocket, BookOpen, Calendar, GraduationCap, Monitor, TrendingUp, GitBranch, CalendarCheck, Sparkles } from 'lucide-react'

import logo from '../assets/campusHustle.jpeg'

export default function Navigation() {
  const { user: auth0User, isAuthenticated: isAuth0Authenticated, logout: auth0Logout } = useAuth0()
  const [showResourcesMenu, setShowResourcesMenu] = useState(false)

  // Check for custom auth (stored in localStorage)
  const localUserStr = localStorage.getItem('user')
  const localUser = localUserStr ? JSON.parse(localUserStr) : null
  const isLocalAuthenticated = !!localUser

  // Determine effective user and auth state
  const isAuthenticated = isAuth0Authenticated || isLocalAuthenticated
  const user = localUser || auth0User

  const handleLogout = () => {
    if (isAuth0Authenticated) {
      auth0Logout({ logoutParams: { returnTo: window.location.origin } })
    }
    // Always clear local storage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    // Force reload to update UI state if not waiting for Auth0 redirect
    if (!isAuth0Authenticated) {
      window.location.reload()
    }
  }

  const resourceLinks = [
    { name: 'Societies', path: '/societies', icon: Users, color: 'text-pink-400' },
    { name: 'Tech Teams', path: '/tech-teams', icon: Rocket, color: 'text-red-400' },
    { name: 'Electives', path: '/electives', icon: BookOpen, color: 'text-cyan-400' },
    { name: 'Events', path: '/events', icon: Calendar, color: 'text-orange-400' },
    { name: 'Masters', path: '/masters', icon: GraduationCap, color: 'text-purple-400' },
    { name: 'MOOCs', path: '/moocs', icon: Monitor, color: 'text-green-400' },
    { name: 'Placements', path: '/placement-stats', icon: TrendingUp, color: 'text-yellow-400' },
    { name: 'Branches', path: '/branches', icon: GitBranch, color: 'text-blue-400' },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck, color: 'text-emerald-400' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/5 supports-[backdrop-filter]:bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl">
              <img src={logo} alt="Campus Hustle Logo" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              Campus Hustle
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {/* ENHANCED ROADMAP LINK - ADD THIS */}
            <Link
              to="/enhanced-roadmap"
              className="flex items-center gap-1 text-sm font-medium text-white transition-colors relative group bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 rounded-lg hover:opacity-90"
            >
              <Sparkles className="w-4 h-4" />
              Enhanced Roadmap
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </Link>

            <a
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-midnight-primary transition-all group-hover:w-full" />
            </a>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-midnight-primary transition-all group-hover:w-full" />
            </Link>

            <Link
              to="/faq"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-midnight-primary transition-all group-hover:w-full" />
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowResourcesMenu(true)}
              onMouseLeave={() => setShowResourcesMenu(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${showResourcesMenu ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all group-hover:w-full" />
              </button>

              {showResourcesMenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 py-2 bg-midnight-bg/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-black/50 animate-fade-in">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <link.icon className={`w-4 h-4 ${link.color}`} />
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gpa-calculator"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              GPA Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-midnight-primary transition-all group-hover:w-full" />
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex flex-col items-center group cursor-pointer">
                <img
                  src={user?.avatar || user?.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
                  alt={user?.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-white/20 shadow-sm object-cover group-hover:border-midnight-primary group-hover:ring-2 group-hover:ring-midnight-primary/50 transition-all"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`;
                  }}
                />
                <span className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5 max-w-[60px] truncate">
                  {user?.name || user?.given_name || user?.nickname || 'User'}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-full border border-red-500/20 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full border border-white/10 hover:border-midnight-primary/50 transition-all duration-300 shadow-[0_0_0_1px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(0,209,255,0.2)]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}