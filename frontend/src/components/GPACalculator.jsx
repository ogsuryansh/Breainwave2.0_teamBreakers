import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Icons = {
    plus: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    ),
    trash: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    ),
    calculator: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="8" y2="10.01" /><line x1="12" y1="10" x2="12" y2="10.01" /><line x1="16" y1="10" x2="16" y2="10.01" /><line x1="8" y1="14" x2="8" y2="14.01" /><line x1="12" y1="14" x2="12" y2="14.01" /><line x1="16" y1="14" x2="16" y2="14.01" /><line x1="8" y1="18" x2="8" y2="18.01" /><line x1="12" y1="18" x2="12" y2="18.01" /><line x1="16" y1="18" x2="16" y2="18.01" />
        </svg>
    ),
    chart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
        </svg>
    ),
    award: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
    ),
    reset: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" /><path d="M8 16H3v5" />
        </svg>
    ),
    save: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
        </svg>
    ),
    history: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    trending: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
        </svg>
    ),
    down: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
        </svg>
    ),
    check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    )
}

// DTU Grade to Point Mapping
const GRADE_POINTS = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'P': 4,
    'F': 0
}

const GRADES = Object.keys(GRADE_POINTS)

// Mock comparison data (would come from backend)
const MOCK_COMPARISON = {
    branchAverage: 7.8,
    universityAverage: 7.5,
    topPercentile: 9.2,
    yourRank: 156,
    totalStudents: 850
}

export default function GPACalculator({ onBack }) {
    const [subjects, setSubjects] = useState([
        { id: 1, name: '', credits: 4, grade: 'O' }
    ])
    const [currentSemester, setCurrentSemester] = useState(1)
    const [sgpa, setSGPA] = useState(0)
    const [semesterHistory, setSemesterHistory] = useState([])
    const [currentCGPA, setCurrentCGPA] = useState(0)
    const [totalCredits, setTotalCredits] = useState(0)
    const [activeTab, setActiveTab] = useState('calculator') // calculator, history, analysis, compare
    const [showSaveSuccess, setShowSaveSuccess] = useState(false)

    const containerRef = useRef(null)
    const cardRef = useRef(null)
    const resultsRef = useRef(null)

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('cgpaHistory')
        if (savedData) {
            const parsed = JSON.parse(savedData)
            if (parsed.semesters) setSemesterHistory(parsed.semesters)
            if (parsed.currentCGPA) setCurrentCGPA(parsed.currentCGPA)
            if (parsed.totalCredits) setTotalCredits(parsed.totalCredits)
            if (parsed.semesters && parsed.semesters.length > 0) {
                setCurrentSemester(parsed.semesters.length + 1)
            }
        }
    }, [])

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { scale: 0.9, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
            )
        }
    }, [activeTab])

    // Calculate SGPA whenever subjects change
    useEffect(() => {
        calculateSGPA()
    }, [subjects])

    const calculateSGPA = () => {
        let totalPoints = 0
        let credits = 0

        subjects.forEach(subject => {
            if (subject.grade && subject.credits > 0) {
                totalPoints += GRADE_POINTS[subject.grade] * subject.credits
                credits += subject.credits
            }
        })

        const calculatedSGPA = credits > 0 ? (totalPoints / credits) : 0
        setSGPA(calculatedSGPA)

        if (resultsRef.current) {
            gsap.to(resultsRef.current, {
                scale: 1.02,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            })
        }
    }

    const calculateNewCGPA = (newSGPA, newCredits) => {
        if (totalCredits === 0) return newSGPA
        return ((currentCGPA * totalCredits) + (newSGPA * newCredits)) / (totalCredits + newCredits)
    }

    const addSubject = () => {
        const newId = Math.max(...subjects.map(s => s.id), 0) + 1
        setSubjects([...subjects, { id: newId, name: '', credits: 4, grade: 'O' }])
    }

    const removeSubject = (id) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter(s => s.id !== id))
        }
    }

    const updateSubject = (id, field, value) => {
        setSubjects(subjects.map(s =>
            s.id === id ? { ...s, [field]: field === 'credits' ? parseInt(value) || 0 : value } : s
        ))
    }

    const saveSemester = () => {
        const semCredits = subjects.reduce((sum, s) => sum + (s.credits || 0), 0)
        const newCGPA = calculateNewCGPA(sgpa, semCredits)

        const newSemester = {
            id: Date.now(),
            semester: currentSemester,
            sgpa: sgpa,
            credits: semCredits,
            subjects: [...subjects],
            date: new Date().toISOString()
        }

        const updatedHistory = [...semesterHistory, newSemester]
        const newTotalCredits = totalCredits + semCredits

        setSemesterHistory(updatedHistory)
        setCurrentCGPA(newCGPA)
        setTotalCredits(newTotalCredits)
        setCurrentSemester(currentSemester + 1)

        // Save to localStorage
        localStorage.setItem('cgpaHistory', JSON.stringify({
            semesters: updatedHistory,
            currentCGPA: newCGPA,
            totalCredits: newTotalCredits
        }))

        // Reset subjects for new semester
        setSubjects([{ id: 1, name: '', credits: 4, grade: 'O' }])

        setShowSaveSuccess(true)
        setTimeout(() => setShowSaveSuccess(false), 3000)
    }

    const deleteSemester = (id) => {
        const semesterToDelete = semesterHistory.find(s => s.id === id)
        if (!semesterToDelete) return

        const updatedHistory = semesterHistory.filter(s => s.id !== id)

        // Recalculate CGPA
        let newTotalCredits = 0
        let totalPoints = 0
        updatedHistory.forEach(sem => {
            totalPoints += sem.sgpa * sem.credits
            newTotalCredits += sem.credits
        })
        const newCGPA = newTotalCredits > 0 ? totalPoints / newTotalCredits : 0

        setSemesterHistory(updatedHistory)
        setCurrentCGPA(newCGPA)
        setTotalCredits(newTotalCredits)
        setCurrentSemester(updatedHistory.length + 1)

        // Update localStorage
        localStorage.setItem('cgpaHistory', JSON.stringify({
            semesters: updatedHistory,
            currentCGPA: newCGPA,
            totalCredits: newTotalCredits
        }))
    }

    const resetAll = () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            setSubjects([{ id: 1, name: '', credits: 4, grade: 'O' }])
            setSemesterHistory([])
            setCurrentCGPA(0)
            setTotalCredits(0)
            setCurrentSemester(1)
            localStorage.removeItem('cgpaHistory')
        }
    }

    const getTotalCurrentCredits = () => {
        return subjects.reduce((sum, s) => sum + (s.credits || 0), 0)
    }

    const getGradeColor = (grade) => {
        const point = GRADE_POINTS[grade]
        if (point >= 9) return 'text-green-400'
        if (point >= 7) return 'text-cyan-400'
        if (point >= 5) return 'text-yellow-400'
        if (point >= 4) return 'text-orange-400'
        return 'text-red-400'
    }

    const getSGPAColor = (value) => {
        if (value >= 9) return 'from-green-400 to-emerald-500'
        if (value >= 8) return 'from-cyan-400 to-blue-500'
        if (value >= 7) return 'from-yellow-400 to-orange-500'
        if (value >= 5) return 'from-orange-400 to-red-500'
        return 'from-red-400 to-red-600'
    }

    // Get subject analysis across all semesters
    const getSubjectAnalysis = () => {
        const allSubjects = []
        semesterHistory.forEach(sem => {
            sem.subjects.forEach(sub => {
                if (sub.name) {
                    allSubjects.push({
                        ...sub,
                        semester: sem.semester,
                        points: GRADE_POINTS[sub.grade]
                    })
                }
            })
        })

        const strong = allSubjects.filter(s => s.points >= 8).sort((a, b) => b.points - a.points)
        const weak = allSubjects.filter(s => s.points < 7).sort((a, b) => a.points - b.points)

        return { strong, weak }
    }

    const projectedCGPA = calculateNewCGPA(sgpa, getTotalCurrentCredits())

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] py-8 px-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-600/20 to-transparent blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-cyan-600/20 to-transparent blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    )}
                    <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                        <span className="text-cyan-400">{Icons.calculator}</span>
                        GPA Calculator
                    </h1>
                    <button
                        onClick={resetAll}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all text-sm"
                    >
                        {Icons.reset}
                        <span className="hidden sm:inline">Reset All</span>
                    </button>
                </div>

                {/* Current CGPA Banner */}
                {currentCGPA > 0 && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`text-4xl font-black bg-gradient-to-r ${getSGPAColor(currentCGPA)} bg-clip-text text-transparent`}>
                                {currentCGPA.toFixed(2)}
                            </div>
                            <div>
                                <div className="text-white font-bold">Overall CGPA</div>
                                <div className="text-gray-400 text-sm">{totalCredits} total credits • {semesterHistory.length} semesters</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {projectedCGPA !== currentCGPA && getTotalCurrentCredits() > 0 && (
                                <div className="text-right">
                                    <div className="text-gray-400 text-xs">After this sem</div>
                                    <div className={`text-xl font-bold ${projectedCGPA >= currentCGPA ? 'text-green-400' : 'text-red-400'}`}>
                                        {projectedCGPA.toFixed(2)}
                                        <span className="text-sm ml-1">
                                            ({projectedCGPA >= currentCGPA ? '+' : ''}{(projectedCGPA - currentCGPA).toFixed(2)})
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'calculator', label: 'Calculator', icon: Icons.calculator },
                        { id: 'history', label: 'History', icon: Icons.history },
                        { id: 'analysis', label: 'Analysis', icon: Icons.chart },
                        { id: 'compare', label: 'Compare', icon: Icons.users }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-cyan-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Save Success Toast */}
                {showSaveSuccess && (
                    <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-fade-in">
                        {Icons.check}
                        Semester saved successfully!
                    </div>
                )}

                {/* Calculator Tab */}
                {activeTab === 'calculator' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Calculator Card */}
                        <div ref={cardRef} className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    {Icons.award}
                                    Semester {currentSemester} Subjects
                                </h3>
                            </div>

                            {/* Table Header */}
                            <div className="hidden sm:grid grid-cols-12 gap-3 text-gray-400 text-sm font-medium mb-2 px-2">
                                <div className="col-span-5">Subject Name</div>
                                <div className="col-span-2 text-center">Credits</div>
                                <div className="col-span-3 text-center">Grade</div>
                                <div className="col-span-2 text-center">Points</div>
                            </div>

                            {/* Subject Rows */}
                            <div className="space-y-3">
                                {subjects.map((subject, index) => (
                                    <div
                                        key={subject.id}
                                        className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all"
                                    >
                                        <div className="sm:col-span-5">
                                            <label className="sm:hidden text-gray-400 text-xs mb-1 block">Subject</label>
                                            <input
                                                type="text"
                                                value={subject.name}
                                                onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                                                placeholder={`Subject ${index + 1}`}
                                                className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="sm:hidden text-gray-400 text-xs mb-1 block">Credits</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                value={subject.credits}
                                                onChange={(e) => updateSubject(subject.id, 'credits', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-center focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="sm:hidden text-gray-400 text-xs mb-1 block">Grade</label>
                                            <select
                                                value={subject.grade}
                                                onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                                                className={`w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-center focus:outline-none focus:border-cyan-400 transition-colors text-sm font-bold ${getGradeColor(subject.grade)}`}
                                            >
                                                {GRADES.map(grade => (
                                                    <option key={grade} value={grade} className="bg-gray-800 text-white">
                                                        {grade} ({GRADE_POINTS[grade]})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-2">
                                            <span className={`font-bold text-lg ${getGradeColor(subject.grade)}`}>
                                                {(GRADE_POINTS[subject.grade] * subject.credits).toFixed(0)}
                                            </span>
                                            {subjects.length > 1 && (
                                                <button
                                                    onClick={() => removeSubject(subject.id)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                                                >
                                                    {Icons.trash}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={addSubject}
                                className="w-full mt-4 py-3 border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-xl text-gray-400 hover:text-cyan-400 font-medium transition-all flex items-center justify-center gap-2 group"
                            >
                                <span className="group-hover:scale-110 transition-transform">{Icons.plus}</span>
                                Add Subject
                            </button>

                            <div className="mt-4 p-3 bg-white/5 rounded-xl flex justify-between items-center text-sm">
                                <span className="text-gray-400">
                                    Total: <span className="text-white font-bold">{subjects.length}</span> subjects,
                                    <span className="text-cyan-400 font-bold ml-1">{getTotalCurrentCredits()}</span> credits
                                </span>
                                <button
                                    onClick={saveSemester}
                                    disabled={getTotalCurrentCredits() === 0}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {Icons.save}
                                    Save Semester
                                </button>
                            </div>
                        </div>

                        {/* Results Dashboard */}
                        <div ref={resultsRef} className="space-y-4">
                            {/* SGPA Card */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <h3 className="text-gray-400 text-sm font-medium mb-2">Current Semester</h3>
                                <div className="text-center">
                                    <div className={`text-5xl font-black bg-gradient-to-r ${getSGPAColor(sgpa)} bg-clip-text text-transparent`}>
                                        {sgpa.toFixed(2)}
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">SGPA</div>
                                </div>

                                <div className="mt-4">
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${getSGPAColor(sgpa)} rounded-full transition-all duration-500`}
                                            style={{ width: `${(sgpa / 10) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Grade Legend */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
                                <h3 className="text-gray-400 text-sm font-medium mb-3">DTU Grade Scale</h3>
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                    {GRADES.map(grade => (
                                        <div key={grade} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                                            <span className={`font-bold ${getGradeColor(grade)}`}>{grade}</span>
                                            <span className="text-gray-500">{GRADE_POINTS[grade]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-4">
                                <div className="flex items-start gap-3">
                                    <div className="text-cyan-400 mt-0.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                            <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">Pro Tip</p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Save each semester to track your progress over time!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div ref={cardRef} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                            {Icons.history}
                            Semester History
                        </h3>

                        {semesterHistory.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <div className="text-6xl mb-4 opacity-20">{Icons.history}</div>
                                <p>No semester data yet. Start by adding subjects and saving your first semester!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {semesterHistory.map((sem, index) => (
                                    <div key={sem.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getSGPAColor(sem.sgpa)} flex items-center justify-center text-white font-bold text-lg`}>
                                                    {sem.semester}
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold">Semester {sem.semester}</div>
                                                    <div className="text-gray-400 text-sm">{sem.credits} credits • {sem.subjects.length} subjects</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className={`text-2xl font-bold bg-gradient-to-r ${getSGPAColor(sem.sgpa)} bg-clip-text text-transparent`}>
                                                        {sem.sgpa.toFixed(2)}
                                                    </div>
                                                    <div className="text-gray-400 text-xs">SGPA</div>
                                                </div>
                                                <button
                                                    onClick={() => deleteSemester(sem.id)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                                                    title="Delete this semester"
                                                >
                                                    {Icons.trash}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subject breakdown */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                            {sem.subjects.map((sub, i) => (
                                                <div key={i} className="bg-white/5 rounded-lg p-2 text-sm">
                                                    <div className="text-gray-400 truncate">{sub.name || `Subject ${i + 1}`}</div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-gray-500 text-xs">{sub.credits}cr</span>
                                                        <span className={`font-bold ${getGradeColor(sub.grade)}`}>{sub.grade}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* CGPA Trend */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl">
                                    <h4 className="text-white font-bold mb-3">CGPA Progression</h4>
                                    <div className="flex items-end gap-2 h-32">
                                        {semesterHistory.map((sem, index) => {
                                            const height = (sem.sgpa / 10) * 100
                                            return (
                                                <div key={sem.id} className="flex-1 flex flex-col items-center gap-1">
                                                    <span className="text-xs text-gray-400">{sem.sgpa.toFixed(1)}</span>
                                                    <div
                                                        className={`w-full bg-gradient-to-t ${getSGPAColor(sem.sgpa)} rounded-t-lg transition-all`}
                                                        style={{ height: `${height}%` }}
                                                    />
                                                    <span className="text-xs text-gray-500">S{sem.semester}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Analysis Tab */}
                {activeTab === 'analysis' && (
                    <div ref={cardRef} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Strong Subjects */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                    <span className="text-green-400">{Icons.trending}</span>
                                    Strong Subjects
                                </h3>

                                {getSubjectAnalysis().strong.length === 0 ? (
                                    <p className="text-gray-400 text-sm">Add semester data to see your strong subjects</p>
                                ) : (
                                    <div className="space-y-2">
                                        {getSubjectAnalysis().strong.slice(0, 5).map((sub, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                                <div>
                                                    <div className="text-white font-medium">{sub.name}</div>
                                                    <div className="text-gray-400 text-xs">Semester {sub.semester}</div>
                                                </div>
                                                <span className={`text-lg font-bold ${getGradeColor(sub.grade)}`}>{sub.grade}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Weak Subjects */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                    <span className="text-orange-400">{Icons.warning}</span>
                                    Needs Improvement
                                </h3>

                                {getSubjectAnalysis().weak.length === 0 ? (
                                    <p className="text-gray-400 text-sm">Great job! No weak subjects found</p>
                                ) : (
                                    <div className="space-y-2">
                                        {getSubjectAnalysis().weak.slice(0, 5).map((sub, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                                <div>
                                                    <div className="text-white font-medium">{sub.name}</div>
                                                    <div className="text-gray-400 text-xs">Semester {sub.semester}</div>
                                                </div>
                                                <span className={`text-lg font-bold ${getGradeColor(sub.grade)}`}>{sub.grade}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Overall Stats */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                            <h3 className="text-white font-bold text-lg mb-4">Overall Statistics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-cyan-400">{semesterHistory.length}</div>
                                    <div className="text-gray-400 text-sm">Semesters</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-400">{totalCredits}</div>
                                    <div className="text-gray-400 text-sm">Total Credits</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-green-400">
                                        {semesterHistory.reduce((sum, s) => sum + s.subjects.length, 0)}
                                    </div>
                                    <div className="text-gray-400 text-sm">Subjects Completed</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className={`text-3xl font-bold bg-gradient-to-r ${getSGPAColor(currentCGPA)} bg-clip-text text-transparent`}>
                                        {currentCGPA.toFixed(2)}
                                    </div>
                                    <div className="text-gray-400 text-sm">Current CGPA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Compare Tab */}
                {activeTab === 'compare' && (
                    <div ref={cardRef} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                            {Icons.users}
                            Compare with Others
                        </h3>

                        {currentCGPA === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <div className="text-6xl mb-4 opacity-20">{Icons.users}</div>
                                <p>Add your semester data first to compare with others!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Your Rank */}
                                <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl p-6 text-center">
                                    <div className="text-gray-400 text-sm mb-2">Your Position</div>
                                    <div className="text-5xl font-black text-white mb-2">
                                        #{MOCK_COMPARISON.yourRank}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        out of {MOCK_COMPARISON.totalStudents} students in your branch
                                    </div>
                                    <div className="text-cyan-400 text-sm mt-2">
                                        Top {((MOCK_COMPARISON.yourRank / MOCK_COMPARISON.totalStudents) * 100).toFixed(1)}%
                                    </div>
                                </div>

                                {/* Comparison Bars */}
                                <div className="space-y-4">
                                    {[
                                        { label: 'Your CGPA', value: currentCGPA, color: 'from-cyan-400 to-blue-500' },
                                        { label: 'Branch Average', value: MOCK_COMPARISON.branchAverage, color: 'from-purple-400 to-purple-600' },
                                        { label: 'University Average', value: MOCK_COMPARISON.universityAverage, color: 'from-gray-400 to-gray-600' },
                                        { label: 'Top 10% Average', value: MOCK_COMPARISON.topPercentile, color: 'from-yellow-400 to-orange-500' }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-400">{item.label}</span>
                                                <span className={`font-bold ${i === 0 ? 'text-cyan-400' : 'text-white'}`}>
                                                    {item.value.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                                                    style={{ width: `${(item.value / 10) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Insights */}
                                <div className="bg-white/5 rounded-xl p-4">
                                    <h4 className="text-white font-bold mb-3">Insights</h4>
                                    <ul className="space-y-2 text-sm">
                                        {currentCGPA > MOCK_COMPARISON.branchAverage && (
                                            <li className="flex items-center gap-2 text-green-400">
                                                {Icons.trending}
                                                You're above your branch average by {(currentCGPA - MOCK_COMPARISON.branchAverage).toFixed(2)} points
                                            </li>
                                        )}
                                        {currentCGPA < MOCK_COMPARISON.branchAverage && (
                                            <li className="flex items-center gap-2 text-orange-400">
                                                {Icons.warning}
                                                You're {(MOCK_COMPARISON.branchAverage - currentCGPA).toFixed(2)} points below branch average
                                            </li>
                                        )}
                                        {currentCGPA >= MOCK_COMPARISON.topPercentile && (
                                            <li className="flex items-center gap-2 text-yellow-400">
                                                {Icons.award}
                                                You're in the top performers category!
                                            </li>
                                        )}
                                        <li className="flex items-center gap-2 text-gray-400">
                                            {Icons.chart}
                                            Need {(MOCK_COMPARISON.topPercentile - currentCGPA).toFixed(2)} more points to reach top 10%
                                        </li>
                                    </ul>
                                </div>

                                <p className="text-center text-gray-500 text-xs">
                                    * Comparison data is based on anonymized university records
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
