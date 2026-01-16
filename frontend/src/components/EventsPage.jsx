import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Calendar, Building, Users } from 'lucide-react'
import eventsData from '../data/Events.json'

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const events = eventsData.events || []

  // Get unique types
  const allTypes = [...new Set(events.map(e => e.type))]

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organised_by?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || event.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeEmoji = (type) => {
    if (type?.includes('Tech')) return '💻'
    if (type?.includes('Cultural')) return '🎭'
    if (type?.includes('Entrepreneur')) return '🚀'
    if (type?.includes('Management')) return '📊'
    if (type?.includes('Sports')) return '⚽'
    return '🎉'
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
              Annual Events & Fests
            </span>
          </h1>
          <p className="text-gray-400">{eventsData.university}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
          >
            <option value="all">All Types</option>
            {allTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{events.length}</div>
            <div className="text-sm text-gray-400">Total Events</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">{allTypes.length}</div>
            <div className="text-sm text-gray-400">Event Types</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{filteredEvents.length}</div>
            <div className="text-sm text-gray-400">Showing</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">🎪</div>
            <div className="text-sm text-gray-400">DTU</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-midnight-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Event Image */}
              {event.image && (
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="absolute top-3 right-3 text-3xl">
                    {getTypeEmoji(event.type)}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-3 py-1 bg-midnight-primary/20 text-midnight-primary rounded-full border border-midnight-primary/30">
                    {event.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-midnight-primary transition-colors">
                  {event.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-midnight-primary" />
                    {event.time_of_year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4 text-midnight-secondary" />
                    {event.organised_by}
                  </span>
                </div>

                {/* Opportunities */}
                {event.opportunities && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Opportunities</p>
                    <ul className="space-y-1">
                      {event.opportunities.slice(0, 3).map((opp, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-midnight-primary mt-0.5">•</span>
                          {opp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {event.skills_gained && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {event.skills_gained.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-midnight-primary/10 text-midnight-primary rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No events found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
