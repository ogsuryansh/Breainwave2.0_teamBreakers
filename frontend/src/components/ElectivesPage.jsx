import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, BookOpen, Tag } from 'lucide-react'
import electiveData from '../data/Elective.json'

export default function ElectivesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const electives = electiveData[" elective courses"] || []

  // Get unique types
  const allTypes = [...new Set(electives.map(e => e.type))]

  // Filter electives
  const filteredElectives = electives.filter(elective => {
    const matchesSearch = elective.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elective.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (elective.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || elective.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type) => {
    return type === 'AEC' ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'
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
              Elective Courses
            </span>
          </h1>
          <p className="text-gray-400">AEC & VAC Elective Courses at DTU</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, codes, or tags..."
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
            <div className="text-2xl font-bold text-midnight-primary">{electives.length}</div>
            <div className="text-sm text-gray-400">Total Courses</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">{electives.filter(e => e.type === 'AEC').length}</div>
            <div className="text-sm text-gray-400">AEC Courses</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{electives.filter(e => e.type === 'VAC').length}</div>
            <div className="text-sm text-gray-400">VAC Courses</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">{filteredElectives.length}</div>
            <div className="text-sm text-gray-400">Showing</div>
          </div>
        </div>

        {/* Electives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElectives.map((elective, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-midnight-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(elective.type)} rounded-xl flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  elective.type === 'AEC' 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {elective.type}
                </span>
              </div>

              <p className="text-xs text-midnight-primary font-mono mb-2">{elective.course_code}</p>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-midnight-primary transition-colors line-clamp-2">
                {elective.course_title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(elective.tags || []).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-white/5 text-gray-300 rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Benefits */}
              {elective.benefits && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Benefits</p>
                  {elective.benefits.slice(0, 2).map((benefit, idx) => (
                    <p key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-midnight-primary mt-0.5">•</span>
                      {benefit}
                    </p>
                  ))}
                </div>
              )}

              {/* Slots */}
              {elective.allotted_slots && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500">
                    Slots: <span className="text-midnight-secondary">{elective.allotted_slots.join(', ')}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredElectives.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No electives found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
