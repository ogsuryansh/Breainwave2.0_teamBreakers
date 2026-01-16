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

  // Mock data - will be replaced with actual calculations
  const hustleScore = 8
  const timeCommitment = 12
  const difficulty = 'Hard'

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
    if (score <= 3) return 'from-green-500 to-green-600'
    if (score <= 6) return 'from-yellow-500 to-yellow-600'
    if (score <= 9) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  const getCGPAColor = (cgpa) => {
    if (cgpa >= 9) return 'from-green-400 to-emerald-500'
    if (cgpa >= 8) return 'from-cyan-400 to-blue-500'
    if (cgpa >= 7) return 'from-yellow-400 to-orange-500'
    return 'from-orange-400 to-red-500'
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Reality Check</h3>

      {/* Hustle Score Gauge */}
      <div className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-white">Hustle Score</h4>
          <span className="text-2xl font-bold text-midnight-accent">{hustleScore}/10</span>
        </div>

        {/* Gauge Background */}
        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full bg-gradient-to-r ${getScoreColor(hustleScore)} transition-all duration-500`}
            style={{ width: `${(hustleScore / 10) * 100}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-400">High effort needed</p>
      </div>

      {/* CGPA Risk - Clickable */}
      <div 
        onClick={() => navigate('/gpa-calculator')}
        className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-white">CGPA Tracker</h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors">
            <path d="M9 18l6-6-6-6"/>
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

            {/* Latest Semester Preview */}
            {cgpaData.semesters && cgpaData.semesters.length > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  Last: Sem {cgpaData.semesters[cgpaData.semesters.length - 1].semester}
                </span>
                <span className="text-cyan-400 font-bold">
                  SGPA: {cgpaData.semesters[cgpaData.semesters.length - 1].sgpa.toFixed(2)}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`inline-block px-4 py-2 rounded-lg font-bold ${cgpaRiskInfo.color}`}>
              {cgpaRiskInfo.risk}
            </div>
            <p className="text-xs text-gray-400 mt-3">Click to add your CGPA data</p>
          </>
        )}

        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-xs text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
            </svg>
            Open GPA Calculator
          </span>
        </div>
      </div>

      {/* Time Commitment */}
      <div className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/40 transition-all duration-300">
        <h4 className="font-bold text-white mb-4">Weekly Time Commitment</h4>
        <p className="text-2xl font-bold text-midnight-primary">{timeCommitment} hours</p>
        <p className="text-xs text-gray-400 mt-2">You'll need to be serious about this</p>
      </div>

      {/* Difficulty Level */}
      <div className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/40 transition-all duration-300">
        <h4 className="font-bold text-white mb-4">Difficulty</h4>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-4 rounded-full ${
                i < 4
                  ? 'bg-gradient-to-r from-midnight-secondary to-midnight-primary'
                  : 'bg-gray-700'
              }`}
            ></div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">{difficulty}</p>
      </div>

      {/* Personalized Note */}
      <div className="backdrop-blur-xl bg-midnight-secondary/10 border border-midnight-secondary/30 rounded-xl p-4">
        <p className="text-xs text-gray-300 leading-relaxed">
          <span className="font-bold text-midnight-secondary">Pro Tip:</span> Focus on skills 
          first, societies second. Your future employer cares about what you built, not where you hung out.
        </p>
      </div>
    </div>
  )
}
