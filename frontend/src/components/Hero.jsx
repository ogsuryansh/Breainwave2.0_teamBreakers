import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Hero({ onStart }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Initial animations
    tl.fromTo(".glass-container",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(".neon-beam",
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 1.5, ease: "expo.out", stagger: 0.2 },
        "-=1"
      )
      .fromTo(".hero-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      )

    // Floating animation for the card
    gsap.to(".glass-container", {
      y: "-=10",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#050510] overflow-hidden flex items-center justify-center font-['Space_Grotesk']">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a2e] to-[#050014]" />

      {/* Neon Lasers (Reference Image Style) */}
      {/* Top Left Cyan Beam */}
      <div className="neon-beam absolute -top-20 -left-20 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="neon-beam absolute top-10 left-0 w-[40vw] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] rotate-[-45deg] opacity-70" />

      {/* Bottom Right Pink Beam */}
      <div className="neon-beam absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-pink-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="neon-beam absolute bottom-20 right-0 w-[40vw] h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent blur-[1px] rotate-[-45deg] opacity-70" />

      {/* Main Glass Card Container */}
      <div className="glass-container relative z-10 w-[90%] max-w-[500px] md:max-w-[700px] p-[1px] rounded-[3rem] bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-2xl backdrop-blur-3xl">
        <div className="w-full h-full rounded-[3rem] bg-[#0f0f20]/60 p-8 md:p-12 relative overflow-hidden">

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Top Label */}


            {/* Layered Typography */}
            <div className="relative mb-6">
              {/* Background Text */}
              <h1 className="hero-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] text-[3rem] md:text-[5rem] font-bold text-white/5 whitespace-nowrap select-none font-['Syncopate'] z-0">
                CAMPUS
              </h1>

              {/* Foreground Text */}
              <h2 className="hero-text relative z-10 text-3xl md:text-4xl font-bold text-white leading-tight font-['Syncopate'] text-glow">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  HUSTLE
                </span>
              </h2>
            </div>

            {/* Description - Small Text as requested */}
            <p className="hero-text text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-10 font-light">
              Your personalized executable roadmap tailored for the DTU ecosystem.
              Turn academic chaos into a structured success strategy.
            </p>

            {/* Service Grid (Three Cards from reference) */}
            <div className="hero-text grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
              {[
                { title: 'Roadmap', desc: '6-Month Action Plan' },
                { title: 'Mentorship', desc: 'Personalized AI Interface' },
                { title: 'Network', desc: 'Alumni & Industry Experts' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-default">
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Get Started Button */}
            <button
              onClick={onStart}
              className="hero-text group relative px-10 py-3 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(112,0,255,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 border border-white/20 rounded-full" />
              <span className="relative flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase font-['Syncopate']">
                Initialize
              </span>
            </button>

          </div>

          {/* Decorative Blur Circles inside Card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none" />
        </div>
      </div>


    </div>
  )
}
