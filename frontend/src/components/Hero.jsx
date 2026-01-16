export default function Hero({ onStart }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0B]">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-midnight-secondary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-midnight-primary/20 blur-[120px] animate-pulse delay-1000" />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7000FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00D1FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7000FF" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="35%" fill="url(#particleGradient)" className="animate-pulse" />
        {Array.from({ length: 100 }).map((_, i) => {
          const angle = (i / 100) * Math.PI * 2
          const radius = 30 + (i % 3) * 5
          const cx = 50 + Math.cos(angle) * radius
          const cy = 50 + Math.sin(angle) * radius
          return (
            <circle
              key={i}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="1"
              fill="#00D1FF"
              opacity={0.3 + (i % 3) * 0.2}
            />
          )
        })}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle1 = (i / 50) * Math.PI * 2
          const angle2 = ((i + 1) / 50) * Math.PI * 2
          const radius = 35
          const x1 = 50 + Math.cos(angle1) * radius
          const y1 = 50 + Math.sin(angle1) * radius
          const x2 = 50 + Math.cos(angle2) * radius
          const y2 = 50 + Math.sin(angle2) * radius
          return (
            <line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#7000FF"
              strokeWidth="0.5"
              opacity="0.2"
            />
          )
        })}
      </svg>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 lg:px-20 pt-20 pb-10">
        <div className="text-center animate-fade-in relative z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-r from-midnight-secondary/30 to-midnight-primary/30 blur-[80px] -z-10 rounded-full" />

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            CAMPUS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-midnight-secondary to-midnight-primary">
              HUSTLE
            </span>
          </h1>

          <p className="text-xl text-gray-300 font-light tracking-wide mb-6 max-w-2xl mx-auto">
            Your 6-Month Executable Roadmap Tailored for DTU
          </p>

          <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed border-l-2 border-midnight-primary/50 pl-4 py-1 text-left md:text-center md:border-l-0 md:border-b-2 md:pl-0 md:pb-1 md:inline-block">
            Not generic advice. Not AI hallucinations. Specific, actionable steps for YOUR college ecosystem.
          </p>
        </div>

        <div className="mt-10 animate-fade-in">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            Start Your Journey
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-8 lg:px-20 py-6 border-t border-white/5 backdrop-blur-sm z-30">
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-midnight-primary transition">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-midnight-primary transition">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-midnight-primary transition">Instagram</a>
          </div>

          <div className="text-xs text-gray-600 font-mono hidden sm:block">
            DESIGNED FOR BUILDERS
          </div>
        </div>
      </div>
    </div>
  )
}
