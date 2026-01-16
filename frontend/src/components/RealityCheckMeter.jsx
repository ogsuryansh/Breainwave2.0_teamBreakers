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
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-cyan-500/10 group">
          {/* Ambient Glow */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/30"></div>
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl transition-all duration-500 group-hover:bg-purple-500/30"></div>

          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Personalized Plan For</h3>

          <div className="space-y-4">
            {/* Branch Item */}
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-3 border border-white/5 transition-colors hover:bg-white/10 hover:border-cyan-500/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Branch</div>
                <div className="font-bold text-white text-sm">{studentInfo.branch}</div>
              </div>
            </div>

            {/* Semester Item */}
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-3 border border-white/5 transition-colors hover:bg-white/10 hover:border-purple-500/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Current Status</div>
                <div className="font-bold text-white text-sm">{studentInfo.semester}</div>
              </div>
            </div>

            {/* Interests */}
            {studentInfo.interests && studentInfo.interests.length > 0 && (
              <div className="pt-2">
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">Focus Areas</div>
                <div className="flex flex-wrap gap-2">
                  {studentInfo.interests.map((interest, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:border-cyan-400/50 transition-all duration-300">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
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
