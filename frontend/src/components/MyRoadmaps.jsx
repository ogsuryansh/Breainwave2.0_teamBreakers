import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

export default function MyRoadmaps() {
    const navigate = useNavigate()
    const [savedRoadmaps, setSavedRoadmaps] = useState([])

    useEffect(() => {
        loadRoadmaps()
    }, [])

    const loadRoadmaps = () => {
        const saved = localStorage.getItem('savedRoadmaps')
        if (saved) {
            setSavedRoadmaps(JSON.parse(saved))
        }
    }

    const deleteRoadmap = (id) => {
        if (confirm('Are you sure you want to delete this roadmap?')) {
            const updated = savedRoadmaps.filter(r => r.id !== id)
            setSavedRoadmaps(updated)
            localStorage.setItem('savedRoadmaps', JSON.stringify(updated))
        }
    }

    const viewRoadmap = (roadmap) => {
        // Store selected roadmap and navigate to view
        localStorage.setItem('viewingRoadmap', JSON.stringify(roadmap))
        navigate('/roadmap-view')
    }

    const getScoreColor = (score) => {
        if (score >= 85) return 'from-green-400 to-emerald-500'
        if (score >= 75) return 'from-cyan-400 to-blue-500'
        if (score >= 65) return 'from-yellow-400 to-orange-500'
        return 'from-orange-400 to-red-500'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] py-20 px-4">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-600/20 to-transparent blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-cyan-600/20 to-transparent blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </button>
                    <h1 className="text-3xl font-black text-white">My Roadmaps</h1>
                    <div className="w-24" /> {/* Spacer for centering */}
                </div>

                {savedRoadmaps.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4 opacity-20">📋</div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Roadmaps Yet</h2>
                        <p className="text-gray-400 mb-6">Generate your first roadmap to get started!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                            Create Roadmap
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedRoadmaps.map((roadmap, index) => (
                            <div
                                key={roadmap.id}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Hustle Score Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`px-3 py-1.5 bg-gradient-to-r ${getScoreColor(roadmap.hustleScore)} rounded-full`}>
                                        <span className="text-white text-xs font-bold">
                                            Hustle: {roadmap.hustleScore}/100
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteRoadmap(roadmap.id)
                                        }}
                                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                                        title="Delete roadmap"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            <line x1="10" y1="11" x2="10" y2="17" />
                                            <line x1="14" y1="11" x2="14" y2="17" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Student Info */}
                                <div className="mb-4">
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        {roadmap.studentInfo?.branch || 'Roadmap'}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300">
                                            {roadmap.studentInfo?.semester || 'N/A'}
                                        </span>
                                        {roadmap.studentInfo?.interests?.slice(0, 2).map((interest, i) => (
                                            <span key={i} className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Target Role */}
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {roadmap.targetRole}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                                    <div className="bg-white/5 rounded-lg p-2 text-center">
                                        <div className="text-gray-400">Timeline</div>
                                        <div className="text-white font-bold">{roadmap.timeline?.length || 0} months</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-2 text-center">
                                        <div className="text-gray-400">Projects</div>
                                        <div className="text-white font-bold">{roadmap.projects?.length || 0}</div>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="text-xs text-gray-500 mb-4">
                                    Created: {new Date(roadmap.createdAt).toLocaleDateString()}
                                </div>

                                {/* View Button */}
                                <button
                                    onClick={() => viewRoadmap(roadmap)}
                                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all group-hover:scale-105"
                                >
                                    View Roadmap →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
