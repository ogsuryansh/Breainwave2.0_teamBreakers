export default function Timeline({ roadmapData }) {
  if (!roadmapData || !roadmapData.timeline) {
    return <div className="text-center text-gray-400">Loading roadmap data...</div>
  }

  const timelineData = roadmapData.timeline

  return (
    <div className="w-full">
      {/* Horizontal Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Your 6-Month Roadmap</h2>

        {/* Timeline Container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {timelineData.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* Timeline Node */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-full flex items-center justify-center text-xl text-white font-bold border-2 border-midnight-accent/30 backdrop-blur-lg group-hover:border-midnight-accent group-hover:scale-110 transition-all duration-300">
                    {idx + 1}
                  </div>

                  {/* Connector Line */}
                  {idx < timelineData.length - 1 && (
                    <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-midnight-primary to-midnight-primary/20 -z-10 transform scale-x-150 origin-left"></div>
                  )}
                </div>

                {/* Month Info */}
                <div className="text-center mt-4 w-32 px-2">
                  <p className="text-xs text-midnight-primary font-bold mb-1 uppercase tracking-wider">{item.month}</p>
                  <p className="text-xs font-medium text-white line-clamp-2">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Milestones */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-midnight-primary">📌</span> Key Milestones
        </h3>

        {timelineData.map((item, idx) => (
          <div
            key={idx}
            className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-midnight-primary/10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-midnight-primary/20 flex items-center justify-center text-midnight-primary font-bold shrink-0 mt-1 group-hover:bg-midnight-primary group-hover:text-white transition-colors duration-300">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-lg">{item.title}</h4>
                  <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{item.month}</span>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2">
                  {item.milestones.map((milestone, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-3 text-sm text-gray-400 group/milestone">
                      <div className="w-1.5 h-1.5 rounded-full bg-midnight-primary/60 group-hover/milestone:bg-midnight-primary group-hover/milestone:scale-125 transition-all"></div>
                      <span className="group-hover/milestone:text-gray-200 transition-colors">{milestone.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
