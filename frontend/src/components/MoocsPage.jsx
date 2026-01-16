import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Monitor, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import moocData from '../data/Mooc.json'

export default function MoocsPage() {
  const [expandedBranch, setExpandedBranch] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const branches = moocData.DTU_MOOC_Lists_by_Branch || {}
  const branchList = Object.entries(branches)

  const getBranchIcon = (branch) => {
    if (branch.includes('Computer')) return '💻'
    if (branch.includes('Information')) return '🌐'
    if (branch.includes('Electronics')) return '📡'
    if (branch.includes('Electrical')) return '⚡'
    if (branch.includes('Mechanical')) return '⚙️'
    if (branch.includes('Civil')) return '🏗️'
    if (branch.includes('Chemical')) return '🧪'
    if (branch.includes('Biotechnology')) return '🧬'
    if (branch.includes('Environmental')) return '🌱'
    if (branch.includes('Production')) return '🏭'
    return '📚'
  }

  const getBranchColor = (index) => {
    const colors = [
      'from-cyan-500 to-blue-500',
      'from-blue-500 to-indigo-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-purple-500 to-pink-500',
      'from-red-500 to-orange-500',
      'from-teal-500 to-cyan-500',
      'from-pink-500 to-rose-500',
      'from-emerald-500 to-green-500',
      'from-indigo-500 to-purple-500',
    ]
    return colors[index % colors.length]
  }

  // Count total courses
  const totalCourses = branchList.reduce((sum, [_, data]) => sum + (data.typical_NPTEL_courses?.length || 0), 0)

  // Filter branches based on search
  const filteredBranches = branchList.filter(([branch, data]) => {
    if (!searchTerm) return true
    const branchMatch = branch.toLowerCase().replace(/_/g, ' ').includes(searchTerm.toLowerCase())
    const courseMatch = data.typical_NPTEL_courses?.some(course => 
      course.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return branchMatch || courseMatch
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
              MOOC Courses (NPTEL/SWAYAM)
            </span>
          </h1>
          <p className="text-gray-400">DTU Approved MOOCs by Branch for DEC/GEC Credits</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search branches or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{branchList.length}</div>
            <div className="text-sm text-gray-400">Branches</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">{totalCourses}</div>
            <div className="text-sm text-gray-400">Total Courses</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">NPTEL</div>
            <div className="text-sm text-gray-400">Platform</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">📜</div>
            <div className="text-sm text-gray-400">Credits</div>
          </div>
        </div>

        {/* Branches List */}
        <div className="space-y-4">
          {filteredBranches.map(([branch, data], index) => (
            <div
              key={branch}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-midnight-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div
                onClick={() => setExpandedBranch(expandedBranch === branch ? null : branch)}
                className="p-6 cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getBranchColor(index)} rounded-xl flex items-center justify-center text-2xl`}>
                    {getBranchIcon(branch)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-midnight-primary transition-colors">
                      {branch.replace(/_/g, ' ')}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {data.typical_NPTEL_courses?.length || 0} courses available
                    </p>
                  </div>
                </div>
                {expandedBranch === branch ? (
                  <ChevronUp className="w-6 h-6 text-midnight-primary" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-midnight-primary transition-colors" />
                )}
              </div>

              {/* Expanded Content */}
              {expandedBranch === branch && (
                <div className="px-6 pb-6 border-t border-white/10">
                  {/* Courses Grid */}
                  <div className="mt-6">
                    <h4 className="flex items-center gap-2 text-midnight-primary font-semibold mb-4">
                      <Monitor className="w-5 h-5" />
                      NPTEL Courses
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(data.typical_NPTEL_courses || []).map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="w-8 h-8 bg-midnight-primary/20 rounded-lg flex items-center justify-center text-midnight-primary text-sm font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm text-gray-300">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {data.DTU_branch_specific_notes && (
                    <div className="mt-6 p-4 bg-midnight-primary/10 rounded-xl border border-midnight-primary/20">
                      <p className="text-sm text-gray-300">
                        <span className="text-midnight-primary font-semibold">📌 Note: </span>
                        {data.DTU_branch_specific_notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No branches or courses found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
