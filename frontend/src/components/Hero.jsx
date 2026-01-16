export default function Hero({ onStart }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0B]">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-midnight-secondary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-midnight-primary/20 blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="fixed left-0 top-0 h-screen w-20 border-r border-white/5 flex flex-col justify-center items-center space-y-8 z-40 bg-black/20 backdrop-blur-sm hidden lg:flex">
        {['00', '01', '02', '03', '04', '05', '06'].map((num, idx) => (
          <div key={num} className={`text-sm font-mono ${idx === 0 ? 'text-midnight-primary' : 'text-gray-600'} hover:text-midnight-primary transition duration-300 cursor-pointer`}>
            {num}
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10">
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

        <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-8 py-6 border-t border-white/5 backdrop-blur-sm z-30">
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
