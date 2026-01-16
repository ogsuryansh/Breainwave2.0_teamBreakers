import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Users, ExternalLink } from 'lucide-react'
import societyData from '../data/society.json'

export default function SocietiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('all')

  const societies = societyData.societies || []

  // Get unique domains
  const allDomains = [...new Set(societies.flatMap(s => s.domain || []))]

  // Filter societies
  const filteredSocieties = societies.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      society.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      society.full_form?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDomain = selectedDomain === 'all' || (society.domain || []).includes(selectedDomain)
    return matchesSearch && matchesDomain
  })

  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-midnight-primary to-midnight-secondary bg-clip-text text-transparent">
              Technical & Professional Societies
            </span>
          </h1>
          <p className="text-gray-400">{societyData.university}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search societies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
          >
            <option value="all">All Domains</option>
            {allDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{societies.length}</div>
            <div className="text-sm text-gray-400">Total Societies</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">{allDomains.length}</div>
            <div className="text-sm text-gray-400">Domains</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{filteredSocieties.length}</div>
            <div className="text-sm text-gray-400">Showing</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">🎓</div>
            <div className="text-sm text-gray-400">DTU</div>
          </div>
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSocieties.map((society) => (
            <div
              key={society.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-midnight-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                {society.website && (
                  <a
                    href={society.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-midnight-primary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-midnight-primary transition-colors">
                {society.name}
              </h3>
              {society.full_form && (
                <p className="text-sm text-midnight-secondary mb-3">{society.full_form}</p>
              )}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{society.description}</p>

              <div className="flex flex-wrap gap-2">
                {(society.domain || []).slice(0, 3).map((domain, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-midnight-primary/10 text-midnight-primary rounded-full border border-midnight-primary/20"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredSocieties.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No societies found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
