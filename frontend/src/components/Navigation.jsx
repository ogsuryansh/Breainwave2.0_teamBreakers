import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/5 supports-[backdrop-filter]:bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-midnight-primary to-midnight-secondary rounded-xl rotate-6 opacity-50 group-hover:rotate-12 transition-transform duration-300 blur-sm" />
              <div className="relative w-full h-full bg-gradient-to-r from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center shadow-lg hover:shadow-midnight-primary/25 transition-all duration-300">
                <span className="text-white font-black text-lg">CH</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              Campus Hustle
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {['Features', 'About', 'FAQ'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-midnight-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <Link
              to="/gpa-calculator"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              GPA Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-midnight-primary transition-all group-hover:w-full" />
            </Link>
          </div>

          <Link 
            to="/login"
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full border border-white/10 hover:border-midnight-primary/50 transition-all duration-300 shadow-[0_0_0_1px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(0,209,255,0.2)]"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}
