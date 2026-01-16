import { useState } from 'react'

export default function SelectionForm({ onGenerateRoadmap, onBack }) {
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        interests: []
    })

    const branches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'Biotech']
    const semesters = ['1st', '2nd', '3rd', '4th']
    const interests = ['Coding', 'AI/ML', 'Web Dev', 'Robotics', 'Finance', 'Product']

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }))
    }

    const handleGenerate = () => {
        if (formData.branch && formData.semester && formData.interests.length > 0) {
            onGenerateRoadmap(formData)
        }
    }

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-4 relative overflow-x-hidden w-full">
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-midnight-secondary/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-midnight-primary/10 blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <button
                onClick={onBack}
                className="absolute top-8 left-4 md:left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back
            </button>

            <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden group z-10 animate-fade-in">
                <div className="space-y-8 relative z-10">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Build Your Profile</h2>
                        <p className="text-gray-400 text-sm">Tell us about your academic journey</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-midnight-primary/20 text-midnight-primary text-xs font-bold">1</span>
                            <label className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                                Select Branch
                            </label>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                            {branches.map(branch => (
                                <button
                                    key={branch}
                                    onClick={() => setFormData(prev => ({ ...prev, branch }))}
                                    className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all duration-300 transform hover:-translate-y-1 ${formData.branch === branch
                                            ? 'bg-midnight-primary text-black shadow-[0_0_20px_rgba(0,209,255,0.3)] scale-105'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                        }`}
                                >
                                    {branch}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-midnight-accent/20 text-midnight-accent text-xs font-bold">2</span>
                            <label className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                                Select Year
                            </label>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {semesters.map(sem => (
                                <button
                                    key={sem}
                                    onClick={() => setFormData(prev => ({ ...prev, semester: sem }))}
                                    className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${formData.semester === sem
                                            ? 'bg-midnight-accent text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] scale-105'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                        }`}
                                >
                                    {sem} Year
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-midnight-secondary/20 text-midnight-secondary text-xs font-bold">3</span>
                            <label className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                                Your Interests
                            </label>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {interests.map(interest => (
                                <button
                                    key={interest}
                                    onClick={() => handleInterestToggle(interest)}
                                    className={`py-3 px-3 rounded-xl text-xs font-medium transition-all duration-300 transform hover:-translate-y-1 ${formData.interests.includes(interest)
                                            ? 'bg-midnight-secondary text-white shadow-[0_0_20px_rgba(112,0,255,0.4)] scale-105'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                        }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!formData.branch || !formData.semester || formData.interests.length === 0}
                        className="group relative w-full py-4 px-6 bg-gradient-to-r from-midnight-secondary via-midnight-primary to-midnight-secondary bg-[length:200%_auto] text-white font-black text-base md:text-lg rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[right_center] hover:shadow-[0_0_30px_rgba(0,209,255,0.4)]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Generate My Roadmap
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
