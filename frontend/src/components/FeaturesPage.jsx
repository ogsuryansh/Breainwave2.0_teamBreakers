import { useNavigate } from 'react-router-dom'
import { Rocket, Sparkles, Brain, Code, Terminal, Target, BookOpen, Users, Calendar, Award, Zap, Shield } from 'lucide-react'

export default function FeaturesPage() {
    const navigate = useNavigate()

    const features = [
        {
            title: "AI Roadmap Generator",
            description: "Get a personalized 6-month learning path tailored to your branch, semester, and career goals.",
            icon: <Target className="w-8 h-8 text-cyan-400" />,
            color: "from-cyan-500/20 to-blue-500/20",
            borderColor: "group-hover:border-cyan-500/50",
            path: "/"
        },
        {
            title: "Enhanced CV Analyzer",
            description: "Upload your resume and get AI-powered feedback, missing keywords, and ATS optimization tips.",
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            color: "from-purple-500/20 to-pink-500/20",
            borderColor: "group-hover:border-purple-500/50",
            path: "/enhanced-roadmap"
        },
        {
            title: "Smart Campus AI",
            description: "Your 24/7 campus assistant. Ask about courses, events, or just clear your academic doubts.",
            icon: <Brain className="w-8 h-8 text-emerald-400" />,
            color: "from-emerald-500/20 to-green-500/20",
            borderColor: "group-hover:border-emerald-500/50",
            path: "/"
        },
        {
            title: "GPA Calculator",
            description: "Track your academic performance with our precise SGPA and CGPA calculator designed for your university.",
            icon: <Terminal className="w-8 h-8 text-orange-400" />,
            color: "from-orange-500/20 to-red-500/20",
            borderColor: "group-hover:border-orange-500/50",
            path: "/gpa-calculator"
        },
        {
            title: "Tech Teams & Societies",
            description: "Discover and connect with campus communities that match your interests and passions.",
            icon: <Users className="w-8 h-8 text-yellow-400" />,
            color: "from-yellow-500/20 to-amber-500/20",
            borderColor: "group-hover:border-yellow-500/50",
            path: "/societies"
        },
        {
            title: "Placement Stats",
            description: "Access real-time placement data, salary trends, and recruiter insights for your branch.",
            icon: <Award className="w-8 h-8 text-indigo-400" />,
            color: "from-indigo-500/20 to-violet-500/20",
            borderColor: "group-hover:border-indigo-500/50",
            path: "/placement-stats"
        }
    ]

    const upcomingFeatures = [
        { name: "Peer-to-Peer Mentorship", icon: <Users className="w-5 h-5" /> },
        { name: "Automated Mock Interviews", icon: <Code className="w-5 h-5" /> },
        { name: "Event Ticketing System", icon: <Calendar className="w-5 h-5" /> },
        { name: "Verified Skill Badges", icon: <Shield className="w-5 h-5" /> },
    ]

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-midnight-bg">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-midnight-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-200 mb-6 animate-fade-in-up">
                        Powering Your <span className="text-cyan-400">Campus Journey</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                        Everything you need to excel in your academic and professional life, all in one futuristic platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(feature.path)}
                            className={`group relative bg-[#0F0F12] border border-white/5 rounded-3xl p-8 hover:bg-[#1A1A1E] transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="relative z-10">
                                <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-white/20">
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>

                                <div className="mt-6 flex items-center text-sm font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Explore Feature <Rocket className="w-4 h-4 ml-2" />
                                </div>
                            </div>

                            <div className={`absolute inset-0 border-2 border-transparent ${feature.borderColor} rounded-3xl transition-colors duration-500 pointer-events-none`}></div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Features Preview */}
                <div className="bg-[#0F0F12]/50 border border-white/5 rounded-3xl p-10 max-w-5xl mx-auto backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-yellow-400" /> Coming Soon
                            </h3>
                            <p className="text-gray-400">We are constantly evolving. Here's what's next.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                            {upcomingFeatures.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-20">
                    <button
                        onClick={() => navigate('/')}
                        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full text-lg shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                    >
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    )
}
