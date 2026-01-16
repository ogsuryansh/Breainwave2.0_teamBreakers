import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Calendar, Building, Sparkles, Target, Clock, ChevronRight } from 'lucide-react'
import eventsData from '../data/Events.json'

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [expandedEvent, setExpandedEvent] = useState(null)

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

  const getTypeGradient = (type) => {
    if (type?.includes('Tech')) return 'from-cyan-500 to-blue-600'
    if (type?.includes('Cultural')) return 'from-purple-500 to-pink-600'
    if (type?.includes('Entrepreneur')) return 'from-amber-500 to-orange-600'
    if (type?.includes('Management')) return 'from-emerald-500 to-teal-600'
    if (type?.includes('Sports')) return 'from-red-500 to-rose-600'
    if (type?.includes('Career')) return 'from-indigo-500 to-violet-600'
    return 'from-midnight-primary to-midnight-secondary'
  }

  const getTypeIcon = (type) => {
    if (type?.includes('Tech')) return '💻'
    if (type?.includes('Cultural')) return '🎭'
    if (type?.includes('Entrepreneur')) return '🚀'
    if (type?.includes('Management')) return '📊'
    if (type?.includes('Sports')) return '⚽'
    if (type?.includes('Career')) return '💼'
    if (type?.includes('Induction')) return '🎓'
    if (type?.includes('Talent')) return '🌟'
    return '🎉'
  }

  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors mb-6 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-midnight-primary uppercase tracking-wider">DTU Events</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-midnight-primary via-purple-400 to-midnight-secondary bg-clip-text text-transparent">
                  Annual Events & Fests
                </span>
              </h1>
              <p className="text-gray-400 max-w-2xl">
                Discover the vibrant campus life at {eventsData.university}. From technical hackathons to cultural extravaganzas, find your passion.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-midnight-primary to-cyan-400 bg-clip-text text-transparent">{events.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-midnight-secondary bg-clip-text text-transparent">{allTypes.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:ring-1 focus:ring-midnight-primary/50 focus:outline-none transition-all text-white placeholder-gray-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Events
              </button>
              {allTypes.slice(0, 4).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {type.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-midnight-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-midnight-primary/10"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient(event.type)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Event Image - Full Width on Top */}
              <div className="relative w-full h-52 overflow-hidden">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-contain bg-gradient-to-br from-gray-900 to-gray-800 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient(event.type)} flex items-center justify-center ${event.image ? 'hidden' : 'flex'}`}>
                  <span className="text-6xl">{getTypeIcon(event.type)}</span>
                </div>
                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-3 py-1.5 bg-gradient-to-r ${getTypeGradient(event.type)} text-white rounded-full font-medium shadow-lg`}>
                    {event.type}
                  </span>
                </div>
                {/* Emoji Icon */}
                <div className="absolute top-3 right-3">
                  <span className="text-3xl drop-shadow-lg">{getTypeIcon(event.type)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-midnight-primary transition-colors mb-3">
                  {event.name}
                </h3>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-midnight-primary" />
                      {event.time_of_year}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                      <Building className="w-3.5 h-3.5 text-midnight-secondary" />
                      {event.organised_by}
                    </span>
                  </div>

                  {/* Opportunities Preview */}
                  {event.opportunities && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-midnight-primary" />
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Key Opportunities</span>
                      </div>
                      <ul className="space-y-1.5">
                        {event.opportunities.slice(0, 2).map((opp, idx) => (
                          <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-midnight-primary shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills Tags */}
                  {event.skills_gained && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                      {event.skills_gained.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 bg-midnight-primary/10 text-midnight-primary rounded-lg border border-midnight-primary/20 hover:bg-midnight-primary/20 transition-colors"
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
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
            <Calendar className="w-5 h-5 text-midnight-primary" />
            <span className="text-gray-400">Stay updated with campus events throughout the year</span>
          </div>
        </div>
      </div>
    </div>
  )
}
