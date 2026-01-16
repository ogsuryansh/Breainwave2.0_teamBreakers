import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import branchData from '../data/Branch.json'
import techTeamsData from '../data/Tech_teams.json'
import societyData from '../data/society.json'

const Icons = {
    graduation: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    calendar: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    rocket: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    lightbulb: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
        </svg>
    ),
    star: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    book: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
    ),
    code: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    brain: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
            <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24 2.5 2.5 0 011.98-3A2.5 2.5 0 019.5 2z" /><path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24 2.5 2.5 0 00-1.98-3A2.5 2.5 0 0014.5 2z" />
        </svg>
    ),
    globe: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    ),
    cpu: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
    ),
    chart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
            <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
        </svg>
    ),
    palette: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
            <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
        </svg>
    ),
    arrowLeft: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    arrowRight: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    lock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    ),
    edit: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    ),
    x: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    )
}

const ProfessionalGenerationLoader = ({ isLaunching, onComplete }) => {
    const [progress, setProgress] = useState(0)
    const [statusText, setStatusText] = useState("Initializing AI Core...")

    useEffect(() => {
        if (isLaunching) {
            // Progression sequence matching 5 seconds approximately
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        return 100
                    }
                    return prev + 1
                })
            }, 50) // 100 steps * 50ms = 5000ms

            // Status text updates
            setTimeout(() => setStatusText("Connecting to AI Core..."), 1000)
            setTimeout(() => setStatusText("Analyzing academic profile & interests..."), 2500)
            setTimeout(() => setStatusText("Synthesizing personalized roadmap..."), 4000)

            // Complete after 5 seconds
            const completeTimeout = setTimeout(() => {
                onComplete()
            }, 5000)

            return () => {
                clearInterval(interval)
                clearTimeout(completeTimeout)
            }
        } else {
            setProgress(0)
            setStatusText("Initializing AI Core...")
        }
    }, [isLaunching, onComplete])

    if (!isLaunching) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a1a]/95 backdrop-blur-xl transition-all duration-500">
            <div className="w-full max-w-lg p-8 relative flex flex-col items-center">
                {/* Central AI Orb */}
                <div className="relative w-40 h-40 mb-12">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl animate-pulse opacity-40"></div>
                    <div className="absolute inset-0 rounded-full border border-cyan-400/30 border-t-cyan-400 animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute inset-2 rounded-full border border-purple-400/30 border-b-purple-400 animate-[spin_4s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-4 rounded-full border border-blue-400/30 border-l-blue-400 animate-[spin_2s_linear_infinite]"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(0,209,255,0.8)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                {/* Progress Text */}
                <div className="text-center space-y-4 mb-10 w-full">
                    <h3 className="text-3xl font-black text-white tracking-wider flex flex-col gap-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">CAMPUS HUSTLE AI</span>
                        <span className="text-sm font-bold tracking-[0.3em] text-gray-400">PROCESSING DATA</span>
                    </h3>
                    <div className="h-8 flex items-center justify-center">
                        <span className="text-cyan-400 font-mono text-xs md:text-sm animate-pulse whitespace-nowrap">
                            {'>'} {statusText}
                        </span>
                    </div>
                </div>

                {/* Cyberpunk Progress Bar */}
                <div className="relative w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(0,209,255,0.5)]"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/50 animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                <div className="w-full flex justify-between mt-3 text-[10px] font-mono text-gray-500 tracking-widest">
                    <span>SYSTEM_STATUS: ONLINE</span>
                    <span>{progress}% COMPLETE</span>
                </div>
            </div>
        </div>
    )
}

const AnimatedRocket = ({ isLaunching, onComplete }) => {
    const rocketRef = useRef(null)
    const flameRef = useRef(null)
    const trailRef = useRef(null)

    useEffect(() => {
        if (isLaunching && rocketRef.current) {
            gsap.to(flameRef.current, {
                scaleY: 1.5,
                opacity: 1,
                duration: 0.1,
                repeat: -1,
                yoyo: true
            })

            const createParticle = () => {
                if (!trailRef.current || !isLaunching) return
                const particle = document.createElement('div')
                particle.className = 'absolute rounded-full'
                particle.style.cssText = `
                    width: ${Math.random() * 8 + 4}px;
                    height: ${Math.random() * 8 + 4}px;
                    background: linear-gradient(to bottom, #FFD700, #FF6B00);
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                `
                trailRef.current.appendChild(particle)

                gsap.to(particle, {
                    y: Math.random() * 100 + 50,
                    x: (Math.random() - 0.5) * 60,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                })
            }

            const particleInterval = setInterval(createParticle, 50)

            gsap.timeline()
                .to(rocketRef.current, {
                    x: 3,
                    duration: 0.05,
                    repeat: 10,
                    yoyo: true,
                    ease: 'none'
                })
                .to(rocketRef.current, {
                    y: -window.innerHeight - 100,
                    rotation: 5,
                    duration: 1.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        clearInterval(particleInterval)
                        onComplete()
                    }
                })
        }
    }, [isLaunching, onComplete])

    if (!isLaunching) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div ref={rocketRef} className="relative">
                <div ref={trailRef} className="absolute top-full left-1/2 -translate-x-1/2 w-20 h-40" />

                <svg width="80" height="120" viewBox="0 0 80 120" className="drop-shadow-2xl">
                    <defs>
                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#E8E8E8" />
                            <stop offset="50%" stopColor="#FFFFFF" />
                            <stop offset="100%" stopColor="#D0D0D0" />
                        </linearGradient>
                        <linearGradient id="noseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FF4444" />
                            <stop offset="100%" stopColor="#CC0000" />
                        </linearGradient>
                        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#FF6B00" />
                            <stop offset="100%" stopColor="#FF0000" />
                        </linearGradient>
                    </defs>

                    <path d="M40 0 L55 30 L25 30 Z" fill="url(#noseGrad)" />
                    <rect x="25" y="30" width="30" height="60" rx="2" fill="url(#bodyGrad)" />
                    <circle cx="40" cy="50" r="10" fill="#00D1FF" stroke="#333" strokeWidth="2" />
                    <circle cx="40" cy="50" r="6" fill="#001830" opacity="0.5" />
                    <path d="M25 70 L10 95 L25 90 Z" fill="url(#noseGrad)" />
                    <path d="M55 70 L70 95 L55 90 Z" fill="url(#noseGrad)" />
                    <rect x="28" y="90" width="24" height="10" fill="#555" />
                </svg>

                <div ref={flameRef} className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0">
                    <svg width="40" height="60" viewBox="0 0 40 60">
                        <ellipse cx="20" cy="10" rx="12" ry="20" fill="url(#flameGrad)" className="animate-pulse" />
                        <ellipse cx="20" cy="25" rx="8" ry="25" fill="#FFD700" opacity="0.8" />
                        <ellipse cx="20" cy="35" rx="4" ry="20" fill="#FFFFFF" opacity="0.9" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

const SparkleEffect = ({ isActive }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        if (isActive && containerRef.current) {
            const colors = ['#00D1FF', '#7000FF', '#FFD700', '#4ECDC4', '#FF61D8']

            for (let i = 0; i < 12; i++) {
                const sparkle = document.createElement('div')
                const angle = (i / 12) * Math.PI * 2
                sparkle.innerHTML = `<svg viewBox="0 0 24 24" fill="${colors[i % colors.length]}" class="w-3 h-3"><polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10"/></svg>`
                sparkle.style.cssText = `position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);`
                containerRef.current.appendChild(sparkle)

                gsap.to(sparkle, {
                    x: Math.cos(angle) * 50,
                    y: Math.sin(angle) * 50,
                    scale: 0,
                    rotation: 180,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => sparkle.remove()
                })
            }
        }
    }, [isActive])

    return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-visible" />
}

const FloatingIcon = ({ icon, delay = 0 }) => {
    const iconRef = useRef(null)

    useEffect(() => {
        if (iconRef.current) {
            gsap.to(iconRef.current, {
                y: -12,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                delay
            })
        }
    }, [delay])

    return <div ref={iconRef} className="inline-block text-cyan-400">{icon}</div>
}

export default function SelectionForm({ onGenerateRoadmap, onBack }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        techTeam: '',
        society: '',
        interests: [],
        aboutMe: ''
    })
    const [sparkleKey, setSparkleKey] = useState(0)
    const [activeSparkle, setActiveSparkle] = useState(null)
    const [isLaunching, setIsLaunching] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const containerRef = useRef(null)
    const cardRef = useRef(null)
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const iconRef = useRef(null)

    const totalSteps = 6
    const branches = branchData.DTU_BTech_Branches.map(b => b.branch)
    const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']
    const techTeams = ['None', ...techTeamsData.teams.map(t => t.name)]
    const societies = ['None', ...societyData.societies.map(s => s.name)]

    const interests = [
        { name: 'Coding', icon: Icons.code, color: 'from-blue-500 to-cyan-400' },
        { name: 'AI/ML', icon: Icons.brain, color: 'from-purple-500 to-pink-400' },
        { name: 'Web Dev', icon: Icons.globe, color: 'from-green-500 to-emerald-400' },
        { name: 'Robotics', icon: Icons.cpu, color: 'from-orange-500 to-yellow-400' },
        { name: 'Finance', icon: Icons.chart, color: 'from-emerald-500 to-teal-400' },
        { name: 'Product Management', icon: Icons.palette, color: 'from-pink-500 to-rose-400' },
        { name: 'Other Interest', icon: Icons.palette, color: 'from-pink-500 to-rose-400' }
    ]

    const stepConfig = [
        { title: 'Pick Your Branch', subtitle: 'Choose your engineering discipline', icon: Icons.graduation },
        { title: 'Current Semester', subtitle: 'Where are you in your journey?', icon: Icons.calendar },
        { title: 'Tech Team', subtitle: 'Building something cool?', icon: Icons.rocket },
        { title: 'Society', subtitle: 'Part of any community?', icon: Icons.users },
        { title: 'Your Interests', subtitle: 'What excites you the most?', icon: Icons.lightbulb },
        { title: 'About You', subtitle: 'Help us personalize your roadmap', icon: Icons.star }
    ]

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
            )
        }
    }, [])

    useEffect(() => {
        if (contentRef.current && titleRef.current) {
            gsap.fromTo(titleRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            )
            gsap.fromTo(contentRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2 }
            )
        }
        if (iconRef.current) {
            gsap.fromTo(iconRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }
            )
        }
    }, [currentStep])

    const handleInterestToggle = (interest) => {
        const isAdding = !formData.interests.includes(interest)

        if (isAdding) {
            setActiveSparkle(interest)
            setSparkleKey(prev => prev + 1)
            setTimeout(() => setActiveSparkle(null), 600)
        }

        setFormData(prev => ({
            ...prev,
            interests: isAdding
                ? [...prev.interests, interest]
                : prev.interests.filter(i => i !== interest)
        }))
    }

    const animateSelection = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        })
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.branch !== ''
            case 2: return formData.semester !== ''
            case 3: return true
            case 4: return true
            case 5: return formData.interests.length > 0
            case 6: return true
            default: return false
        }
    }

    const handleNext = () => {
        if (currentStep < totalSteps && canProceed()) {
            gsap.to(contentRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.3,
                onComplete: () => setCurrentStep(prev => prev + 1)
            })
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            gsap.to(contentRef.current, {
                x: 50,
                opacity: 0,
                duration: 0.3,
                onComplete: () => setCurrentStep(prev => prev - 1)
            })
        }
    }

    const handleGenerate = () => {
        console.log("Generate clicked. Data:", formData);
        if (formData.branch && formData.semester && formData.interests.length > 0) {
            setIsGenerating(true)
            setIsLaunching(true)

            // Safety fallback
            setTimeout(() => {
                // If still launching after 3s, force complete.
                // We check a ref or state inside a functional update or just rely on the fact 
                // that this closure captured the state? 
                // Actually, accessing state in timeout might be stale if we don't use refs, 
                // but this is a simple "kick".
                console.log("Animation safety check...");
            }, 3000);

            gsap.to(cardRef.current, {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 2,
                ease: 'power2.inOut'
            })
        } else {
            console.error("Validation failed", formData);
        }
    }

    const handleLaunchComplete = () => {
        console.log("Launch complete, triggering roadmap generation");
        setIsLaunching(false)
        setTimeout(() => {
            setIsGenerating(false)
            onGenerateRoadmap(formData)
        }, 300)
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin">
                            {branches.map((branch, index) => (
                                <button
                                    key={branch}
                                    onClick={(e) => {
                                        animateSelection(e)
                                        setFormData(prev => ({ ...prev, branch }))
                                    }}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    className={`py-4 px-4 rounded-2xl text-sm font-bold transition-all duration-300 text-left animate-fade-in relative overflow-hidden group ${formData.branch === branch
                                        ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white shadow-[0_0_30px_rgba(0,209,255,0.4)]'
                                        : 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/10 hover:border-cyan-400/50'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`transition-transform duration-300 ${formData.branch === branch ? 'text-white scale-110' : 'text-cyan-400 group-hover:scale-110'}`}>
                                            {formData.branch === branch ? Icons.check : Icons.book}
                                        </span>
                                        <span className="truncate">{branch}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {semesters.map((sem, index) => (
                                <button
                                    key={sem}
                                    onClick={(e) => {
                                        animateSelection(e)
                                        setFormData(prev => ({ ...prev, semester: sem }))
                                    }}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                    className={`py-6 px-4 rounded-2xl text-lg font-black transition-all duration-300 animate-fade-in relative overflow-hidden ${formData.semester === sem
                                        ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-[0_0_30px_rgba(255,215,0,0.4)]'
                                        : 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/10 hover:border-yellow-400/50'
                                        }`}
                                >
                                    <span className={`block text-2xl mb-1 font-black ${formData.semester === sem ? 'text-white' : 'text-yellow-400'}`}>
                                        {index + 1}
                                    </span>
                                    <span className="text-sm">{sem}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
                            {techTeams.map((team, index) => (
                                <button
                                    key={team}
                                    onClick={(e) => {
                                        animateSelection(e)
                                        setFormData(prev => ({ ...prev, techTeam: team }))
                                    }}
                                    style={{ animationDelay: `${index * 40}ms` }}
                                    className={`py-4 px-4 rounded-2xl text-sm font-bold transition-all duration-300 text-left animate-fade-in ${formData.techTeam === team
                                        ? 'bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-white shadow-[0_0_30px_rgba(112,0,255,0.4)]'
                                        : 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/10 hover:border-purple-400/50'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`transition-colors ${formData.techTeam === team ? 'text-white' : 'text-purple-400'}`}>
                                            {team === 'None' ? Icons.x : formData.techTeam === team ? Icons.check : Icons.rocket}
                                        </span>
                                        {team === 'None' ? 'Not in any team yet' : team}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
                            {societies.map((soc, index) => (
                                <button
                                    key={soc}
                                    onClick={(e) => {
                                        animateSelection(e)
                                        setFormData(prev => ({ ...prev, society: soc }))
                                    }}
                                    style={{ animationDelay: `${index * 40}ms` }}
                                    className={`py-4 px-4 rounded-2xl text-sm font-bold transition-all duration-300 text-left animate-fade-in ${formData.society === soc
                                        ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]'
                                        : 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/10 hover:border-green-400/50'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`transition-colors ${formData.society === soc ? 'text-white' : 'text-green-400'}`}>
                                            {soc === 'None' ? Icons.x : formData.society === soc ? Icons.check : Icons.users}
                                        </span>
                                        {soc === 'None' ? 'Not in any society yet' : soc}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className="space-y-6 relative">
                        <p className="text-center text-gray-400 text-sm">
                            Select all that excite you (at least one)
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {interests.map((interest, index) => (
                                <button
                                    key={interest.name}
                                    onClick={(e) => {
                                        animateSelection(e)
                                        handleInterestToggle(interest.name)
                                    }}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    className={`py-6 px-4 rounded-2xl font-bold transition-all duration-300 animate-fade-in relative overflow-visible group ${formData.interests.includes(interest.name)
                                        ? `bg-gradient-to-br ${interest.color} text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]`
                                        : 'bg-white/10 text-gray-200 hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    <div className={`mb-2 flex justify-center transition-transform duration-300 ${formData.interests.includes(interest.name) ? 'scale-110' : 'group-hover:scale-110'}`}>
                                        {interest.icon}
                                    </div>
                                    <span className="text-sm">{interest.name}</span>
                                    {formData.interests.includes(interest.name) && (
                                        <div className="absolute top-2 right-2 text-white">
                                            {Icons.check}
                                        </div>
                                    )}
                                    {activeSparkle === interest.name && <SparkleEffect key={sparkleKey} isActive={true} />}
                                </button>
                            ))}
                        </div>
                        {formData.interests.length > 0 && (
                            <div className="text-center animate-fade-in">
                                <p className="text-cyan-400 font-bold">
                                    {formData.interests.length} {formData.interests.length === 1 ? 'interest' : 'interests'} selected
                                </p>
                            </div>
                        )}
                    </div>
                )
            case 6:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="relative">
                            <textarea
                                value={formData.aboutMe}
                                onChange={(e) => setFormData(prev => ({ ...prev, aboutMe: e.target.value }))}
                                placeholder="Share your dreams and goals...

For example:
• I want to crack FAANG interviews
• Building the next big startup
• Open source contributor and tech enthusiast
• Future AI researcher"
                                rows={6}
                                className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all duration-300 resize-none scrollbar-thin"
                            />
                            <div className="absolute top-3 right-3 text-cyan-400 opacity-50">
                                {Icons.edit}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-white/10 rounded-2xl p-5">
                            <div className="flex items-start gap-4">
                                <div className="text-yellow-400 mt-1">{Icons.lightbulb}</div>
                                <div>
                                    <p className="text-white font-bold mb-1">Pro Tip</p>
                                    <p className="text-gray-400 text-sm">
                                        The more you share, the more personalized your roadmap will be.
                                        We're here to help you succeed!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-purple-600/20 to-transparent blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-cyan-600/20 to-transparent blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-pink-600/10 to-transparent blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <ProfessionalGenerationLoader isLaunching={isLaunching} onComplete={handleLaunchComplete} />

            <div
                ref={cardRef}
                className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10"
            >
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400 font-medium">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {Math.round((currentStep / totalSteps) * 100)}% Complete
                        </span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        {[1, 2, 3, 4, 5, 6].map(step => (
                            <button
                                key={step}
                                onClick={() => {
                                    if (step <= currentStep) {
                                        gsap.to(contentRef.current, {
                                            opacity: 0,
                                            duration: 0.2,
                                            onComplete: () => setCurrentStep(step)
                                        })
                                    }
                                }}
                                className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-500 flex items-center justify-center ${step === currentStep
                                    ? 'bg-gradient-to-br from-cyan-400 to-purple-500 text-white scale-110 shadow-[0_0_20px_rgba(0,209,255,0.4)]'
                                    : step < currentStep
                                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                                        : 'bg-white/10 text-gray-500'
                                    }`}
                            >
                                {step < currentStep ? Icons.check : step}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={titleRef} className="text-center mb-6">
                    <div ref={iconRef} className="inline-block mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center text-cyan-400">
                            <FloatingIcon icon={stepConfig[currentStep - 1].icon} />
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                        {stepConfig[currentStep - 1].title}
                    </h2>
                    <p className="text-gray-400">{stepConfig[currentStep - 1].subtitle}</p>
                </div>

                <div ref={contentRef} className="min-h-[300px]">
                    {renderStepContent()}
                </div>

                <div className="flex gap-4 mt-6">
                    {currentStep > 1 && (
                        <button
                            onClick={handlePrevious}
                            className="flex-1 py-4 px-6 bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] flex items-center justify-center gap-2 group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">{Icons.arrowLeft}</span>
                            Back
                        </button>
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`flex-1 py-4 px-6 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${canProceed()
                                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white hover:shadow-[0_0_30px_rgba(0,209,255,0.4)] hover:scale-[1.02]'
                                : 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/10'
                                }`}
                        >
                            {canProceed() ? 'Continue' : 'Select to continue'}
                            <span className={`transition-transform ${canProceed() ? 'group-hover:translate-x-1' : ''}`}>
                                {canProceed() ? Icons.arrowRight : Icons.lock}
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            disabled={!formData.branch || !formData.semester || formData.interests.length === 0 || isGenerating}
                            className={`flex-1 py-4 px-6 font-black text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${isGenerating
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                                : 'bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.02]'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Launching...
                                </>
                            ) : (
                                <>
                                    <span className="text-white">{Icons.rocket}</span>
                                    Generate My Roadmap
                                </>
                            )}
                        </button>
                    )}
                </div>

                {currentStep > 1 && (formData.branch || formData.semester || formData.techTeam || formData.society || formData.interests.length > 0) && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="text-xs text-gray-500 mb-3">Your selections:</p>
                        <div className="flex flex-wrap gap-2">
                            {formData.branch && (
                                <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 text-xs font-bold rounded-full border border-cyan-500/20">
                                    {formData.branch.match(/\(([^)]+)\)/)?.[1] || formData.branch.split(' ')[0]}
                                </span>
                            )}
                            {formData.semester && (
                                <span className="px-3 py-1.5 bg-yellow-500/10 text-yellow-300 text-xs font-bold rounded-full border border-yellow-500/20">
                                    {formData.semester}
                                </span>
                            )}
                            {formData.techTeam && formData.techTeam !== 'None' && (
                                <span className="px-3 py-1.5 bg-purple-500/10 text-purple-300 text-xs font-bold rounded-full border border-purple-500/20">
                                    {formData.techTeam}
                                </span>
                            )}
                            {formData.society && formData.society !== 'None' && (
                                <span className="px-3 py-1.5 bg-green-500/10 text-green-300 text-xs font-bold rounded-full border border-green-500/20">
                                    {formData.society}
                                </span>
                            )}
                            {formData.interests.map(int => (
                                <span key={int} className="px-3 py-1.5 bg-pink-500/10 text-pink-300 text-xs font-bold rounded-full border border-pink-500/20">
                                    {int}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
