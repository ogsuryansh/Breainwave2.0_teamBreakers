export default function Timeline({ roadmapData }) {
  if (!roadmapData || !roadmapData.timeline) {
    return <div className="text-center text-gray-400 animate-pulse">Loading your personalized roadmap...</div>
  }

  // Ensure we have icons for all items
  const timelineData = roadmapData.timeline.map((item, idx) => ({
    ...item,
    icon: item.icon || ['🚀', '🛠️', '⚙️', '🌐', '💼', '🎓'][idx] || '✨'
  }));

  return (
    <div className="w-full">
      {/* Horizontal Timeline Section */}
      <div className="mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-bg via-transparent to-midnight-bg z-10 pointer-events-none"></div>

        <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Your 6-Month Journey
        </h2>

        {/* Scrollable Container with Hide Scrollbar */}
        <div className="overflow-x-auto pb-12 pt-4 px-4 hide-scrollbar">
          <div className="flex justify-between min-w-[800px] relative">

            {/* Continuous Background Line */}
            <div className="absolute top-10 left-0 w-full h-1 bg-gray-800 rounded-full -z-10"></div>

            {/* Progress Line (Gradient) */}
            <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm -z-10"></div>

            {timelineData.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center group relative flex-1"
              >
                {/* Connector Line Fill (for individual segments if needed, but we used a global line above for cleaner look) */}

                {/* Timeline Node - Floating Glass Effect */}
                <div className="relative mb-6 transform transition-all duration-500 group-hover:-translate-y-2">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>

                  {/* The Node Bubble */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 backdrop-blur-xl flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50 transition-all duration-300 z-20">
                    <span className="transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                      {item.icon}
                    </span>

                    {/* Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold border-4 border-midnight-bg z-30 shadow-lg">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Downward Indicator Arrow (Only visible on hover) */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-500">
                    ▼
                  </div>
                </div>

                {/* Month Info Card */}
                <div className="text-center px-4 transition-all duration-300 group-hover:scale-105">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-blue-300 mb-2">
                    {item.month}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight min-h-[40px] flex items-center justify-center max-w-[140px] mx-auto">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Milestones Section - Cards */}
      <div className="grid grid-cols-1 gap-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            📌 Detailed Milestones
          </span>
        </h3>

        {timelineData.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800/50 border border-white/5 p-1 transition-all duration-300 hover:border-blue-500/30"
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative bg-midnight-bg/80 backdrop-blur-sm rounded-xl p-6 h-full">
              <div className="flex flex-col md:flex-row gap-6">

                {/* Left: Icon & Month */}
                <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-blue-400 font-bold text-sm tracking-wider uppercase">{item.month}</div>
                    <div className="text-white font-bold text-lg leading-tight">{item.title}</div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
                    "{item.description}"
                  </p>

                  <div className="space-y-3">
                    {item.milestones.map((milestone, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-3 group/item">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover/item:bg-purple-400 transition-colors"></div>
                        <span className="text-sm text-gray-400 group-hover/item:text-gray-200 transition-colors">
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Resource Tags if available */}
                  {item.resources && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.resources.map((res, rIdx) => (
                        <span key={rIdx} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500 border border-white/5">
                          {res}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
