import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RealityCheckMeter({ roadmapData }) {
  const navigate = useNavigate()
  const [cgpaData, setCgpaData] = useState(null)

  // Load CGPA data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cgpaHistory')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.semesters && parsed.semesters.length > 0) {
        setCgpaData(parsed)
      }
    }
  }, [])

  // Get hustle score from roadmap data (dynamic)
  const hustleScore = roadmapData?.hustleScore || 75
  const studentInfo = roadmapData?.studentInfo || {}

  // Calculate CGPA risk based on actual data
  const getCGPARisk = () => {
    if (!cgpaData || !cgpaData.currentCGPA) return { risk: 'Unknown', color: 'text-gray-400 bg-gray-500/10' }
    const cgpa = cgpaData.currentCGPA
    if (cgpa >= 8.5) return { risk: 'Low', color: 'text-green-400 bg-green-500/10' }
    if (cgpa >= 7.0) return { risk: 'Medium', color: 'text-yellow-400 bg-yellow-500/10' }
    return { risk: 'High', color: 'text-red-400 bg-red-500/10' }
  }

  const cgpaRiskInfo = getCGPARisk()

  const getScoreColor = (score) => {
    if (score >= 85) return { gradient: 'from-green-500 to-emerald-600', text: 'text-green-400' }
    if (score >= 75) return { gradient: 'from-cyan-500 to-blue-600', text: 'text-cyan-400' }
    if (score >= 65) return { gradient: 'from-yellow-500 to-orange-600', text: 'text-yellow-400' }
    return { gradient: 'from-orange-500 to-red-600', text: 'text-orange-400' }
  }

  const getCGPAColor = (cgpa) => {
    if (cgpa >= 9) return 'from-green-400 to-emerald-500'
    if (cgpa >= 8) return 'from-cyan-400 to-blue-500'
    if (cgpa >= 7) return 'from-yellow-400 to-orange-500'
    return 'from-orange-400 to-red-500'
  }

  const scoreColors = getScoreColor(hustleScore)
  const percentage = (hustleScore / 100) * 100
  const circumference = 2 * Math.PI * 54 // radius = 54
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="space-y-6">
      {/* Student Info Header */}
      {studentInfo.branch && (
        <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Roadmap For</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/10">
              <span className="text-gray-400">Branch: </span>
              <span className="text-cyan-400 font-bold">{studentInfo.branch}</span>
            </div>
            <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/10">
              <span className="text-gray-400">Semester: </span>
              <span className="text-purple-400 font-bold">{studentInfo.semester}</span>
            </div>
          </div>
          {studentInfo.interests && studentInfo.interests.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-gray-400 text-xs">Interests:</span>
              {studentInfo.interests.map((interest, i) => (
                <span key={i} className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 text-xs font-medium">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <h3 className="text-xl font-bold">Reality Check</h3>

      {/* Circular Hustle Score Gauge */}
      <div className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/40 transition-all duration-300">
        <h4 className="font-bold text-white mb-6 text-center">Hustle Score</h4>

        {/* Circular Progress */}
        <div className="relative flex items-center justify-center">
          <svg className="transform -rotate-90" width="140" height="140">
            {/* Background Circle */}
            <circle
              cx="70"
              cy="70"
              r="54"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-gray-700"
            />
            {/* Progress Circle */}
            <circle
              cx="70"
              cy="70"
              r="54"
              stroke="url(#hustleGradient)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="hustleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={scoreColors.gradient.split(' ')[0].replace('from-', 'stop-')} />
                <stop offset="100%" className={scoreColors.gradient.split(' ')[1].replace('to-', 'stop-')} />
              </linearGradient>
            </defs>
          </svg>

          {/* Score Display (Centered) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-black ${scoreColors.text}`}>
              {hustleScore}
            </div>
            <div className="text-xs text-gray-400 mt-1">out of 100</div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-4">
          {hustleScore >= 85 ? 'Excellent commitment level! 🚀' :
            hustleScore >= 75 ? 'High effort required ⚡' :
              'Moderate dedication needed 💪'}
        </p>
      </div>

      {/* CGPA Risk - Clickable */}
      <div
        onClick={() => navigate('/gpa-calculator')}
        className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-white">CGPA Tracker</h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>

        {cgpaData && cgpaData.currentCGPA ? (
          <>
            {/* Current CGPA Display */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-4xl font-black bg-gradient-to-r ${getCGPAColor(cgpaData.currentCGPA)} bg-clip-text text-transparent`}>
                {cgpaData.currentCGPA.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">
                <div>Current CGPA</div>
                <div className="text-xs">{cgpaData.totalCredits || 0} credits</div>
              </div>
            </div>

            {/* Mini Progress Bar */}
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full bg-gradient-to-r ${getCGPAColor(cgpaData.currentCGPA)} rounded-full transition-all`}
                style={{ width: `${(cgpaData.currentCGPA / 10) * 100}%` }}
              />
            </div>

            {/* Risk Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${cgpaRiskInfo.color} text-xs font-medium`}>
              <span>Risk: {cgpaRiskInfo.risk}</span>
            </div>

            <p className="text-xs text-gray-500 mt-2 group-hover:text-gray-400 transition-colors">
              Click to view full analysis →
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm mb-3">No CGPA data yet</p>
            <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
              Calculate Your CGPA →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
