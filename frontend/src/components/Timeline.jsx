export default function Timeline({ roadmapData }) {
  const months = [
    { month: 'Month 1', icon: '📚', title: 'Learning', desc: 'Master fundamentals' },
    { month: 'Month 2', icon: '🛠️', title: 'Building', desc: 'First project' },
    { month: 'Month 3', icon: '⚙️', title: 'Projects', desc: 'Build in public' },
    { month: 'Month 4', icon: '🤝', title: 'Networking', desc: 'Join societies' },
    { month: 'Month 5', icon: '💼', title: 'Internship', desc: 'Real experience' },
    { month: 'Month 6', icon: '🏆', title: 'Interview Ready', desc: 'Land the role' }
  ]

  return (
    <div className="w-full">
      {/* Horizontal Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Your 6-Month Roadmap</h2>
        
        {/* Timeline Container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {months.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center"
              >
                {/* Timeline Node */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-full flex items-center justify-center text-3xl border-2 border-midnight-accent/30 backdrop-blur-lg hover:border-midnight-accent transition-all duration-300 cursor-pointer group">
                    {item.icon}
                    <div className="absolute inset-0 rounded-full bg-midnight-accent/10 group-hover:bg-midnight-accent/20 transition-all duration-300"></div>
                  </div>
                  
                  {/* Connector Line */}
                  {idx < months.length - 1 && (
                    <div className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-midnight-primary to-transparent"></div>
                  )}
                </div>

                {/* Month Info */}
                <div className="text-center mt-6 w-24">
                  <p className="text-xs text-midnight-primary font-bold mb-1">{item.month}</p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Milestones */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-6">Key Milestones</h3>
        
        {months.map((item, idx) => (
          <div
            key={idx}
            className="backdrop-blur-xl bg-white/5 border border-midnight-primary/20 rounded-xl p-6 hover:border-midnight-primary/40 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-2">{item.month}: {item.title}</h4>
                <p className="text-gray-400 text-sm">
                  {roadmapData?.branch} focused milestones tailored to your interests. 
                  Specific society recruitment dates, project deadlines, and skill targets included.
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-midnight-primary/20 text-midnight-primary px-3 py-1 rounded-full">
                    Action Item
                  </span>
                  <span className="text-xs bg-midnight-secondary/20 text-midnight-secondary px-3 py-1 rounded-full">
                    Skill Build
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
