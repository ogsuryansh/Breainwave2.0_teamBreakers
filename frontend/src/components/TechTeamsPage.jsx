import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Rocket, ExternalLink, ImageIcon } from 'lucide-react'
import techTeamsData from '../data/Tech_teams.json'

export default function TechTeamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const teams = techTeamsData.teams || []

  // Get unique categories
  const allCategories = [...new Set(teams.map(t => t.category).filter(Boolean))]

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || team.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category) => {
    const colors = {
      'Robotics': 'from-cyan-500 to-blue-500',
      'Automotive': 'from-red-500 to-orange-500',
      'Aerospace': 'from-purple-500 to-pink-500',
      'Marine': 'from-teal-500 to-cyan-500',
    }
    return colors[category] || 'from-midnight-primary to-midnight-secondary'
  }

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
              Technical Project Teams
            </span>
          </h1>
          <p className="text-gray-400">{techTeamsData.university}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
          >
            <option value="all">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{teams.length}</div>
            <div className="text-sm text-gray-400">Total Teams</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">{allCategories.length}</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{filteredTeams.length}</div>
            <div className="text-sm text-gray-400">Showing</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">🚀</div>
            <div className="text-sm text-gray-400">Innovation</div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-midnight-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Team Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-midnight-primary/20 to-midnight-secondary/20">
                {team.image ? (
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center ${team.image ? 'hidden' : 'flex'}`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor(team.category)} rounded-2xl flex items-center justify-center`}>
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-3 py-1 bg-gradient-to-r ${getCategoryColor(team.category)} text-white rounded-full font-medium`}>
                    {team.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-midnight-primary transition-colors">
                    {team.name}
                  </h3>
                  {team.link && team.link !== "" && (
                    <a
                      href={team.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-midnight-primary transition-colors p-1"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{team.description}</p>

                <div className="flex flex-wrap gap-2">
                  {(team.domain || []).slice(0, 3).map((domain, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-midnight-primary/10 text-midnight-primary rounded-full border border-midnight-primary/20"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No teams found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
