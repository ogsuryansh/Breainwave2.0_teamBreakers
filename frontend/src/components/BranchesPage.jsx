import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, BookOpen, Briefcase, ChevronDown, ChevronUp } from 'lucide-react'
import branchData from '../data/Branch.json'

export default function BranchesPage() {
  const [expandedBranch, setExpandedBranch] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const branches = branchData.DTU_BTech_Branches || []

  // Filter branches
  const filteredBranches = branches.filter(branch => {
    if (!searchTerm) return true
    const branchMatch = branch.branch.toLowerCase().includes(searchTerm.toLowerCase())
    const focusMatch = branch.curriculum_focus?.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
    const oppMatch = branch.future_opportunities?.some(o => o.toLowerCase().includes(searchTerm.toLowerCase()))
    return branchMatch || focusMatch || oppMatch
  })

  const getBranchIcon = (branch) => {
    if (branch.includes('Computer')) return '💻'
    if (branch.includes('Electronics')) return '📡'
    if (branch.includes('Mechanical')) return '⚙️'
    if (branch.includes('Electrical')) return '⚡'
    if (branch.includes('Civil')) return '🏗️'
    if (branch.includes('Information')) return '🌐'
    if (branch.includes('Software')) return '🖥️'
    if (branch.includes('Chemical')) return '🧪'
    if (branch.includes('Biotechnology')) return '🧬'
    if (branch.includes('Environmental')) return '🌱'
    if (branch.includes('Production')) return '🏭'
    if (branch.includes('Mathematics')) return '📊'
    if (branch.includes('Engineering Physics')) return '⚛️'
    return '📚'
  }

  const getBranchColor = (index) => {
    const colors = [
      'from-cyan-500 to-blue-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-yellow-500 to-orange-500',
      'from-gray-500 to-slate-500',
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-pink-500',
      'from-red-500 to-pink-500',
      'from-emerald-500 to-green-500',
      'from-lime-500 to-green-500',
      'from-amber-500 to-orange-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
    ]
    return colors[index % colors.length]
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
              B.Tech Branches at DTU
            </span>
          </h1>
          <p className="text-gray-400">Delhi Technological University - Undergraduate Programs</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search branches, curriculum, or careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{branches.length}</div>
            <div className="text-sm text-gray-400">Branches</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">4 Years</div>
            <div className="text-sm text-gray-400">Duration</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">B.Tech</div>
            <div className="text-sm text-gray-400">Degree</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">🎓</div>
            <div className="text-sm text-gray-400">DTU</div>
          </div>
        </div>

        {/* Branches List */}
        <div className="space-y-4">
          {filteredBranches.map((branch, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-midnight-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div
                onClick={() => setExpandedBranch(expandedBranch === index ? null : index)}
                className="p-6 cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getBranchColor(index)} rounded-xl flex items-center justify-center text-2xl`}>
                    {getBranchIcon(branch.branch)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-midnight-primary transition-colors">
                      {branch.branch}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {branch.curriculum_focus?.length || 0} focus areas • {branch.future_opportunities?.length || 0} career paths
                    </p>
                  </div>
                </div>
                {expandedBranch === index ? (
                  <ChevronUp className="w-6 h-6 text-midnight-primary" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-midnight-primary transition-colors" />
                )}
              </div>

              {/* Expanded Content */}
              {expandedBranch === index && (
                <div className="px-6 pb-6 border-t border-white/10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Curriculum Focus */}
                    <div className="bg-white/5 rounded-xl p-5">
                      <h4 className="flex items-center gap-2 text-midnight-primary font-semibold mb-4">
                        <BookOpen className="w-5 h-5" />
                        Curriculum Focus
                      </h4>
                      <ul className="space-y-2">
                        {(branch.curriculum_focus || []).map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-midnight-primary mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Future Opportunities */}
                    <div className="bg-white/5 rounded-xl p-5">
                      <h4 className="flex items-center gap-2 text-midnight-secondary font-semibold mb-4">
                        <Briefcase className="w-5 h-5" />
                        Future Opportunities
                      </h4>
                      <ul className="space-y-2">
                        {(branch.future_opportunities || []).map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-midnight-secondary mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No branches found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
