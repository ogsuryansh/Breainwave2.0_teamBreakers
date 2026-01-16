export default function RealityCheckMeter({ roadmapData }) {
  // Mock data - will be replaced with actual calculations
  const hustleScore = 8
  const cgpaRisk = 'High'
  const timeCommitment = 12
  const difficulty = 'Hard'

  const getScoreColor = (score) => {
    if (score <= 3) return 'from-green-500 to-green-600'
    if (score <= 6) return 'from-yellow-500 to-yellow-600'
    if (score <= 9) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-green-400 bg-green-500/10'
    if (risk === 'Medium') return 'text-yellow-400 bg-yellow-500/10'
    return 'text-red-400 bg-red-500/10'
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

      {/* CGPA Risk */}
      <div className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/40 transition-all duration-300">
        <h4 className="font-bold text-white mb-4">CGPA Risk</h4>
        <div className={`inline-block px-4 py-2 rounded-lg font-bold ${getRiskColor(cgpaRisk)}`}>
          {cgpaRisk}
        </div>
        <p className="text-xs text-gray-400 mt-3">Society focus might impact CGPA. Balance needed.</p>
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
          <span className="font-bold text-midnight-secondary">💡 Pro Tip:</span> Focus on skills 
          first, societies second. Your future employer cares about what you built, not where you hung out.
        </p>
      </div>
    </div>
  )
}
