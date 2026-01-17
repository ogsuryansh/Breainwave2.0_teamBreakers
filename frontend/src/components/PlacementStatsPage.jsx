import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Building2, Users, DollarSign, BarChart3 } from 'lucide-react'
import placementData from '../data/PlacementStats.json'

export default function PlacementStatsPage() {
  const [selectedYear, setSelectedYear] = useState('2025')

  const years = placementData.years || {}
  const yearList = Object.keys(years).sort((a, b) => b - a)
  const currentYearData = years[selectedYear] || {}

  const getBranchColor = (placement_ratio) => {
    if (placement_ratio >= 75) return 'text-green-400'
    if (placement_ratio >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatBranchName = (name) => {
    return name.replace(/_/g, ' ')
  }

  // Sort branches by average package
  const sortedBranches = Object.entries(currentYearData.branch_wise_stats || {})
    .sort(([, a], [, b]) => (b.average_package_lpa || 0) - (a.average_package_lpa || 0))

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
              Placement Statistics
            </span>
          </h1>
          <p className="text-gray-400">{placementData.university} - {placementData.report_type}</p>
        </div>

        {/* Year Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {yearList.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedYear === year
                    ? 'bg-midnight-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Highlights */}
        {currentYearData.overall_highlights && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-midnight-primary" />
              Overall Highlights - Batch {currentYearData.batch}
              <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                currentYearData.status === 'Finalized' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {currentYearData.status}
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-5 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-400">
                  ₹{currentYearData.overall_highlights.highest_package_lpa} LPA
                </div>
                <div className="text-sm text-gray-400">Highest Package</div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-5 text-center">
                <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-cyan-400">
                  ₹{currentYearData.overall_highlights.average_package_lpa} LPA
                </div>
                <div className="text-sm text-gray-400">Average Package</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-xl p-5 text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-400">
                  ₹{currentYearData.overall_highlights.median_package_lpa} LPA
                </div>
                <div className="text-sm text-gray-400">Median Package</div>
              </div>
              
              {currentYearData.overall_highlights.total_offers && (
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-xl p-5 text-center">
                  <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-orange-400">
                    {currentYearData.overall_highlights.total_offers}
                  </div>
                  <div className="text-sm text-gray-400">Total Offers</div>
                </div>
              )}
            </div>

            {/* Top Recruiters */}
            {currentYearData.overall_highlights.top_recruiters && (
              <div className="mt-6">
                <h3 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Top Recruiters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentYearData.overall_highlights.top_recruiters.map((company, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-midnight-primary/10 text-midnight-primary rounded-lg border border-midnight-primary/20 font-medium"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Branch-wise Stats */}
        <div>
          <h2 className="text-xl font-bold mb-4">Branch-wise Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBranches.map(([branch, stats], index) => (
              <div
                key={branch}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-midnight-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-white">{formatBranchName(branch)}</h3>
                  <span className="text-xs px-2 py-1 bg-midnight-primary/20 text-midnight-primary rounded-full">
                    #{index + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Average</span>
                    <span className="font-bold text-midnight-primary">₹{stats.average_package_lpa} LPA</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Highest</span>
                    <span className="font-bold text-green-400">₹{stats.highest_package_lpa} LPA</span>
                  </div>
                  
                  {stats.placement_ratio !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Placement %</span>
                      <span className={`font-bold ${getBranchColor(stats.placement_ratio)}`}>
                        {stats.placement_ratio}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {stats.placement_ratio !== undefined && (
                  <div className="mt-4">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          stats.placement_ratio >= 75 ? 'bg-green-500' :
                          stats.placement_ratio >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${stats.placement_ratio}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-midnight-primary/10 rounded-xl border border-midnight-primary/20">
          <p className="text-sm text-gray-400">
            <span className="text-midnight-primary font-semibold">Note: </span>
            All packages are in {placementData.currency}. Data is compiled from official DTU placement reports and may be subject to change.
          </p>
        </div>
      </div>
    </div>
  )
}
