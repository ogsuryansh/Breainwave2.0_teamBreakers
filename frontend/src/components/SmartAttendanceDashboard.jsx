import { useReducer, useState, useRef, useEffect } from 'react'
import { 
  Bot, Calendar, AlertTriangle, CheckCircle, XCircle, Clock, 
  Upload, Edit3, Save, Send, TrendingUp, TrendingDown, Users,
  BookOpen, Beaker, GraduationCap, Settings, ChevronRight,
  MessageCircle, Zap, Target, BarChart3, RefreshCw
} from 'lucide-react'

// ============================================
// DATA STRUCTURES & INITIAL STATE
// ============================================

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TIME_SLOTS = [
  '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00',
  '2:00-3:00', '3:00-4:00', '4:00-5:00'
]

const STATUS_TYPES = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  CANCELLED: 'Cancelled',
  MASS_BUNK: 'Mass Bunk',
  TEACHER_ABSENT: 'Teacher Absent',
  EMPTY: 'Empty'
}

const CLASS_TYPES = {
  LECTURE: 'Lecture',
  LAB: 'Lab',
  TUTORIAL: 'Tutorial'
}

const STATUS_COLORS = {
  [STATUS_TYPES.PRESENT]: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
  [STATUS_TYPES.ABSENT]: 'bg-red-500/20 border-red-500 text-red-400',
  [STATUS_TYPES.CANCELLED]: 'bg-gray-500/20 border-gray-500 text-gray-400',
  [STATUS_TYPES.MASS_BUNK]: 'bg-purple-500/20 border-purple-500 text-purple-400',
  [STATUS_TYPES.TEACHER_ABSENT]: 'bg-amber-500/20 border-amber-500 text-amber-400',
  [STATUS_TYPES.EMPTY]: 'bg-white/5 border-white/10 text-gray-500'
}

const STATUS_ICONS = {
  [STATUS_TYPES.PRESENT]: CheckCircle,
  [STATUS_TYPES.ABSENT]: XCircle,
  [STATUS_TYPES.CANCELLED]: Clock,
  [STATUS_TYPES.MASS_BUNK]: Users,
  [STATUS_TYPES.TEACHER_ABSENT]: GraduationCap,
  [STATUS_TYPES.EMPTY]: null
}

// Sample timetable data generator
const generateSampleTimetable = () => {
  const subjects = [
    { name: 'Data Structures', type: CLASS_TYPES.LECTURE },
    { name: 'DBMS', type: CLASS_TYPES.LECTURE },
    { name: 'Operating Systems', type: CLASS_TYPES.LECTURE },
    { name: 'Computer Networks', type: CLASS_TYPES.LECTURE },
    { name: 'DS Lab', type: CLASS_TYPES.LAB },
    { name: 'DBMS Lab', type: CLASS_TYPES.LAB },
    { name: 'CN Lab', type: CLASS_TYPES.LAB },
    { name: 'Maths Tutorial', type: CLASS_TYPES.TUTORIAL },
  ]

  const timetable = {}
  
  DAYS.forEach(day => {
    timetable[day] = {}
    TIME_SLOTS.forEach((slot, index) => {
      // Randomly assign subjects with some empty slots
      if (Math.random() > 0.3) {
        const subject = subjects[Math.floor(Math.random() * subjects.length)]
        const statuses = [STATUS_TYPES.PRESENT, STATUS_TYPES.PRESENT, STATUS_TYPES.PRESENT, STATUS_TYPES.ABSENT, STATUS_TYPES.EMPTY]
        timetable[day][slot] = {
          id: `${day}-${slot}`,
          subject: subject.name,
          type: subject.type,
          status: STATUS_TYPES.EMPTY,
          span: subject.type === CLASS_TYPES.LAB ? 2 : 1,
          history: generateAttendanceHistory(subject.name)
        }
      } else {
        timetable[day][slot] = {
          id: `${day}-${slot}`,
          subject: null,
          type: null,
          status: STATUS_TYPES.EMPTY,
          span: 1,
          history: []
        }
      }
    })
  })

  return timetable
}

// Generate random attendance history for a subject
const generateAttendanceHistory = (subject) => {
  if (!subject) return []
  const history = []
  const totalClasses = Math.floor(Math.random() * 20) + 15
  
  for (let i = 0; i < totalClasses; i++) {
    const rand = Math.random()
    let status
    if (rand > 0.25) status = STATUS_TYPES.PRESENT
    else if (rand > 0.15) status = STATUS_TYPES.ABSENT
    else if (rand > 0.08) status = STATUS_TYPES.MASS_BUNK
    else status = STATUS_TYPES.TEACHER_ABSENT
    
    history.push({
      date: new Date(Date.now() - (totalClasses - i) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status
    })
  }
  return history
}

// Initial settings
const initialSettings = {
  massBunkCountsAsPresent: false,
  teacherAbsentCountsAsPresent: true,
  targetAttendance: 75,
  warningThreshold: 80
}

// ============================================
// REDUCER FOR STATE MANAGEMENT
// ============================================

const actionTypes = {
  SET_TIMETABLE: 'SET_TIMETABLE',
  UPDATE_CELL: 'UPDATE_CELL',
  UPDATE_STATUS: 'UPDATE_STATUS',
  MERGE_CELLS: 'MERGE_CELLS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  MARK_ATTENDANCE: 'MARK_ATTENDANCE',
  TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE'
}

const attendanceReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TIMETABLE:
      return { ...state, timetable: action.payload }
    
    case actionTypes.UPDATE_CELL:
      return {
        ...state,
        timetable: {
          ...state.timetable,
          [action.payload.day]: {
            ...state.timetable[action.payload.day],
            [action.payload.slot]: {
              ...state.timetable[action.payload.day][action.payload.slot],
              ...action.payload.updates
            }
          }
        }
      }
    
    case actionTypes.UPDATE_STATUS:
      const currentCell = state.timetable[action.payload.day][action.payload.slot]
      const newHistory = currentCell.subject ? [
        ...currentCell.history,
        { date: new Date().toISOString().split('T')[0], status: action.payload.status }
      ] : currentCell.history
      
      return {
        ...state,
        timetable: {
          ...state.timetable,
          [action.payload.day]: {
            ...state.timetable[action.payload.day],
            [action.payload.slot]: {
              ...currentCell,
              status: action.payload.status,
              history: newHistory
            }
          }
        }
      }
    
    case actionTypes.UPDATE_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } }
    
    case actionTypes.TOGGLE_EDIT_MODE:
      return { ...state, editMode: !state.editMode }
    
    default:
      return state
  }
}

// ============================================
// CALCULATION FUNCTIONS
// ============================================

// Calculate attendance for a subject
const calculateSubjectAttendance = (history, settings) => {
  if (!history || history.length === 0) return { percentage: 100, present: 0, total: 0 }
  
  let present = 0
  let total = 0
  
  history.forEach(record => {
    if (record.status === STATUS_TYPES.PRESENT) {
      present++
      total++
    } else if (record.status === STATUS_TYPES.ABSENT) {
      total++
    } else if (record.status === STATUS_TYPES.MASS_BUNK) {
      if (settings.massBunkCountsAsPresent) {
        present++
      }
      total++
    } else if (record.status === STATUS_TYPES.TEACHER_ABSENT) {
      if (settings.teacherAbsentCountsAsPresent) {
        present++
      }
      // Teacher absent might not count towards total based on settings
      if (!settings.teacherAbsentCountsAsPresent) {
        total++
      }
    }
  })
  
  const percentage = total > 0 ? (present / total) * 100 : 100
  return { percentage, present, total }
}

// Calculate safe bunks available
const calculateSafeBunks = (present, total, targetPercentage = 75) => {
  // Formula: (present) / (total + x) >= target/100
  // Solving for x: x <= (present * 100 / target) - total
  if (total === 0) return Infinity
  
  const maxBunks = Math.floor((present * 100 / targetPercentage) - total)
  return Math.max(0, maxBunks)
}

// Predict attendance after bunking
const predictAttendance = (present, total, daysToBunk) => {
  const newTotal = total + daysToBunk
  const newPercentage = (present / newTotal) * 100
  return {
    percentage: newPercentage,
    isAboveTarget: newPercentage >= 75,
    isWarning: newPercentage >= 65 && newPercentage < 75,
    isCritical: newPercentage < 65
  }
}

// Calculate classes needed to reach target
const classesNeededForTarget = (present, total, targetPercentage = 75) => {
  // Formula: (present + x) / (total + x) >= target/100
  // Solving: present + x >= (target/100) * (total + x)
  // present + x >= (target * total / 100) + (target * x / 100)
  // x - (target * x / 100) >= (target * total / 100) - present
  // x * (1 - target/100) >= (target * total - 100 * present) / 100
  // x >= (target * total - 100 * present) / (100 - target)
  
  const currentPercentage = (present / total) * 100
  if (currentPercentage >= targetPercentage) return 0
  
  const needed = Math.ceil((targetPercentage * total - 100 * present) / (100 - targetPercentage))
  return Math.max(0, needed)
}

// ============================================
// RAG CHAT LOGIC PROCESSOR
// ============================================

const processQuery = (query, subjectStats, settings) => {
  const lowerQuery = query.toLowerCase()
  
  // Pattern matching for different query types
  if (lowerQuery.includes('can i bunk') || lowerQuery.includes('can i skip') || lowerQuery.includes('can i miss')) {
    // Check if specific subject mentioned
    const subjectMatch = Object.keys(subjectStats).find(sub => 
      lowerQuery.includes(sub.toLowerCase())
    )
    
    if (subjectMatch) {
      const stats = subjectStats[subjectMatch]
      const safeBunks = calculateSafeBunks(stats.present, stats.total, settings.targetAttendance)
      
      if (safeBunks > 0) {
        return {
          type: 'success',
          message: `✅ Yes! You can safely bunk ${safeBunks} more ${subjectMatch} class${safeBunks > 1 ? 'es' : ''} and still maintain ${settings.targetAttendance}% attendance.`,
          data: { subject: subjectMatch, safeBunks, currentAttendance: stats.percentage }
        }
      } else {
        const needed = classesNeededForTarget(stats.present, stats.total, settings.targetAttendance)
        return {
          type: 'warning',
          message: `⚠️ Not recommended! Your ${subjectMatch} attendance is at ${stats.percentage.toFixed(1)}%. You need to attend ${needed} more classes to reach ${settings.targetAttendance}%.`,
          data: { subject: subjectMatch, needed, currentAttendance: stats.percentage }
        }
      }
    } else {
      // General bunk query - find the safest subject to bunk
      let safestSubject = null
      let maxSafeBunks = 0
      
      Object.entries(subjectStats).forEach(([subject, stats]) => {
        const bunks = calculateSafeBunks(stats.present, stats.total, settings.targetAttendance)
        if (bunks > maxSafeBunks) {
          maxSafeBunks = bunks
          safestSubject = subject
        }
      })
      
      if (safestSubject && maxSafeBunks > 0) {
        return {
          type: 'info',
          message: `📊 Based on your attendance, the safest class to bunk would be ${safestSubject} (${maxSafeBunks} bunks available). Here's a breakdown:`,
          data: { subjectStats, recommendation: safestSubject }
        }
      } else {
        return {
          type: 'danger',
          message: `🚨 You're running low on attendance across all subjects. I wouldn't recommend bunking any class right now.`,
          data: { subjectStats }
        }
      }
    }
  }
  
  if (lowerQuery.includes('how many') && (lowerQuery.includes('miss') || lowerQuery.includes('bunk') || lowerQuery.includes('skip'))) {
    const results = Object.entries(subjectStats).map(([subject, stats]) => {
      const safeBunks = calculateSafeBunks(stats.present, stats.total, settings.targetAttendance)
      return `• ${subject}: ${safeBunks} bunks available (${stats.percentage.toFixed(1)}%)`
    }).join('\n')
    
    return {
      type: 'info',
      message: `📈 Here's how many classes you can miss per subject:\n\n${results}`,
      data: { subjectStats }
    }
  }
  
  if (lowerQuery.includes('attendance') || lowerQuery.includes('percentage') || lowerQuery.includes('status')) {
    const subjectMatch = Object.keys(subjectStats).find(sub => 
      lowerQuery.includes(sub.toLowerCase())
    )
    
    if (subjectMatch) {
      const stats = subjectStats[subjectMatch]
      const safeBunks = calculateSafeBunks(stats.present, stats.total, settings.targetAttendance)
      
      return {
        type: stats.percentage >= settings.targetAttendance ? 'success' : 'warning',
        message: `📊 ${subjectMatch} Attendance:\n• Current: ${stats.percentage.toFixed(1)}%\n• Classes Attended: ${stats.present}/${stats.total}\n• Safe Bunks: ${safeBunks}`,
        data: { subject: subjectMatch, stats }
      }
    } else {
      const overview = Object.entries(subjectStats).map(([subject, stats]) => {
        const emoji = stats.percentage >= 75 ? '✅' : stats.percentage >= 65 ? '⚠️' : '🚨'
        return `${emoji} ${subject}: ${stats.percentage.toFixed(1)}%`
      }).join('\n')
      
      return {
        type: 'info',
        message: `📊 Overall Attendance Summary:\n\n${overview}`,
        data: { subjectStats }
      }
    }
  }
  
  if (lowerQuery.includes('tomorrow') || lowerQuery.includes('today') || lowerQuery.includes('next')) {
    return {
      type: 'info',
      message: `📅 Let me check your schedule and attendance for upcoming classes. Based on your current stats, here are my recommendations for bunking:`,
      data: { subjectStats }
    }
  }
  
  if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
    return {
      type: 'info',
      message: `🤖 I'm your AI Attendance Assistant! Here's what I can help with:\n\n• "Can I bunk [subject]?" - Check if it's safe to skip a class\n• "How many classes can I miss?" - Get bunk allowance for all subjects\n• "What's my attendance?" - View your attendance summary\n• "Can I bunk tomorrow?" - Get recommendations for upcoming classes\n\nTry asking me anything about your attendance!`,
      data: null
    }
  }
  
  return {
    type: 'info',
    message: `🤔 I'm not sure I understood that. Try asking:\n• "Can I bunk Data Structures?"\n• "What's my attendance?"\n• "How many classes can I miss?"`,
    data: null
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function SmartAttendanceDashboard() {
  const [state, dispatch] = useReducer(attendanceReducer, {
    timetable: {},
    settings: initialSettings,
    editMode: false
  })
  
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', content: "👋 Hey! I'm your AI Attendance Assistant. Ask me anything about your classes - like 'Can I bunk tomorrow?' or 'What's my attendance?'" }
  ])
  const [chatInput, setChatInput] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [selectedCell, setSelectedCell] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const chatEndRef = useRef(null)
  
  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])
  
  // Calculate subject statistics
  const getSubjectStats = () => {
    const stats = {}
    
    Object.values(state.timetable).forEach(day => {
      Object.values(day).forEach(cell => {
        if (cell.subject && cell.history.length > 0) {
          if (!stats[cell.subject]) {
            stats[cell.subject] = calculateSubjectAttendance(cell.history, state.settings)
            stats[cell.subject].type = cell.type
          }
        }
      })
    })
    
    return stats
  }
  
  const subjectStats = getSubjectStats()
  
  // Handle timetable upload simulation
  const handleUploadTimetable = () => {
    setIsUploading(true)
    
    // Simulate OCR processing
    setTimeout(() => {
      const sampleTimetable = generateSampleTimetable()
      dispatch({ type: actionTypes.SET_TIMETABLE, payload: sampleTimetable })
      setIsUploading(false)
      
      setChatMessages(prev => [...prev, {
        type: 'bot',
        content: "✅ Timetable uploaded successfully! I've parsed your schedule and loaded the attendance data. Click on any class to mark attendance, or ask me about your bunk allowance!"
      }])
    }, 2000)
  }
  
  // Handle cell click
  const handleCellClick = (day, slot, cell) => {
    if (!cell.subject) return
    setSelectedCell({ day, slot, cell })
  }
  
  // Handle status change
  const handleStatusChange = (status) => {
    if (selectedCell) {
      dispatch({
        type: actionTypes.UPDATE_STATUS,
        payload: {
          day: selectedCell.day,
          slot: selectedCell.slot,
          status
        }
      })
      setSelectedCell(null)
    }
  }
  
  // Handle chat submit
  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    
    setChatMessages(prev => [...prev, { type: 'user', content: chatInput }])
    
    // Process with RAG logic
    const response = processQuery(chatInput, subjectStats, state.settings)
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', content: response.message, data: response.data }])
    }, 500)
    
    setChatInput('')
  }
  
  // Handle subject name edit
  const handleSubjectEdit = (day, slot, newName) => {
    dispatch({
      type: actionTypes.UPDATE_CELL,
      payload: { day, slot, updates: { subject: newName } }
    })
  }
  
  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-midnight-primary uppercase tracking-wider">Smart Tracker</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-midnight-primary via-purple-400 to-midnight-secondary bg-clip-text text-transparent">
                Attendance Dashboard
              </span>
            </h1>
            <p className="text-gray-400 mt-1">AI-powered attendance tracking & bunk predictions</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleUploadTimetable}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-midnight-primary to-cyan-500 hover:from-cyan-500 hover:to-midnight-primary text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
            >
              {isUploading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              {isUploading ? 'Processing...' : 'Upload Timetable'}
            </button>
            
            <button
              onClick={() => dispatch({ type: actionTypes.TOGGLE_EDIT_MODE })}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                state.editMode 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' 
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {state.editMode ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
              {state.editMode ? 'Save Changes' : 'Edit Mode'}
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-midnight-primary" />
              Attendance Settings
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Target Attendance %</label>
                <input
                  type="number"
                  value={state.settings.targetAttendance}
                  onChange={(e) => dispatch({ 
                    type: actionTypes.UPDATE_SETTINGS, 
                    payload: { targetAttendance: Number(e.target.value) }
                  })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-midnight-primary focus:outline-none text-white"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="massBunk"
                  checked={state.settings.massBunkCountsAsPresent}
                  onChange={(e) => dispatch({
                    type: actionTypes.UPDATE_SETTINGS,
                    payload: { massBunkCountsAsPresent: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-midnight-primary focus:ring-midnight-primary"
                />
                <label htmlFor="massBunk" className="text-sm text-gray-300">
                  Mass Bunk counts as Present
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="teacherAbsent"
                  checked={state.settings.teacherAbsentCountsAsPresent}
                  onChange={(e) => dispatch({
                    type: actionTypes.UPDATE_SETTINGS,
                    payload: { teacherAbsentCountsAsPresent: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-midnight-primary focus:ring-midnight-primary"
                />
                <label htmlFor="teacherAbsent" className="text-sm text-gray-300">
                  Teacher Absent counts as Present
                </label>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Warning Threshold %</label>
                <input
                  type="number"
                  value={state.settings.warningThreshold}
                  onChange={(e) => dispatch({
                    type: actionTypes.UPDATE_SETTINGS,
                    payload: { warningThreshold: Number(e.target.value) }
                  })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-midnight-primary focus:outline-none text-white"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timetable Grid - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subject Stats Cards */}
            {Object.keys(subjectStats).length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(subjectStats).slice(0, 8).map(([subject, stats]) => {
                  const safeBunks = calculateSafeBunks(stats.present, stats.total, state.settings.targetAttendance)
                  const isGood = stats.percentage >= state.settings.targetAttendance
                  const isWarning = stats.percentage >= 65 && stats.percentage < state.settings.targetAttendance
                  
                  return (
                    <div
                      key={subject}
                      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 hover:border-midnight-primary/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-gray-400 truncate">{subject}</span>
                        {stats.type === CLASS_TYPES.LAB && <Beaker className="w-4 h-4 text-purple-400 shrink-0" />}
                        {stats.type === CLASS_TYPES.LECTURE && <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />}
                        {stats.type === CLASS_TYPES.TUTORIAL && <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-white/10 rounded-full mb-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isGood ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                            isWarning ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                            'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                          style={{ width: `${Math.min(100, stats.percentage)}%` }}
                        />
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <span className={`text-2xl font-bold ${
                          isGood ? 'text-emerald-400' : isWarning ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {stats.percentage.toFixed(0)}%
                        </span>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{stats.present}/{stats.total}</div>
                          <div className={`text-xs ${safeBunks > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {safeBunks > 0 ? `${safeBunks} bunks left` : 'No bunks!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            
            {/* Weekly Timetable Grid */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-midnight-primary" />
                  Weekly Timetable
                </h3>
                {state.editMode && (
                  <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                    Edit Mode Active
                  </span>
                )}
              </div>
              
              {Object.keys(state.timetable).length === 0 ? (
                <div className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-400 mb-2">No Timetable Loaded</h4>
                  <p className="text-gray-500 mb-4">Upload your timetable image or create one manually</p>
                  <button
                    onClick={handleUploadTimetable}
                    className="px-6 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Upload Timetable
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-24">
                          Time
                        </th>
                        {DAYS.map(day => (
                          <th key={day} className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {day.slice(0, 3)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIME_SLOTS.map((slot, slotIndex) => (
                        <tr key={slot} className="border-t border-white/5">
                          <td className="px-4 py-2 text-xs text-gray-500 whitespace-nowrap">
                            {slot}
                          </td>
                          {DAYS.map(day => {
                            const cell = state.timetable[day]?.[slot]
                            if (!cell) return <td key={day} className="px-2 py-2"></td>
                            
                            const StatusIcon = STATUS_ICONS[cell.status]
                            
                            return (
                              <td key={day} className="px-2 py-2">
                                <div
                                  onClick={() => handleCellClick(day, slot, cell)}
                                  className={`relative p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                                    cell.subject 
                                      ? STATUS_COLORS[cell.status] 
                                      : 'bg-white/5 border-white/5'
                                  } ${state.editMode ? 'ring-2 ring-amber-500/30' : ''}`}
                                >
                                  {cell.subject ? (
                                    <>
                                      {state.editMode ? (
                                        <input
                                          type="text"
                                          value={cell.subject}
                                          onChange={(e) => handleSubjectEdit(day, slot, e.target.value)}
                                          className="w-full bg-transparent text-xs font-medium focus:outline-none"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      ) : (
                                        <span className="text-xs font-medium block truncate">
                                          {cell.subject}
                                        </span>
                                      )}
                                      <div className="flex items-center justify-between mt-1">
                                        <span className="text-[10px] opacity-60">{cell.type}</span>
                                        {StatusIcon && <StatusIcon className="w-3 h-3" />}
                                      </div>
                                    </>
                                  ) : (
                                    <span className="text-xs text-gray-600">—</span>
                                  )}
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Legend */}
              <div className="p-4 border-t border-white/10 flex flex-wrap gap-4">
                {Object.entries(STATUS_TYPES).filter(([_, v]) => v !== 'Empty').map(([key, value]) => {
                  const Icon = STATUS_ICONS[value]
                  return (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <div className={`w-3 h-3 rounded ${STATUS_COLORS[value].split(' ')[0]}`}></div>
                      {Icon && <Icon className="w-3 h-3 text-gray-400" />}
                      <span className="text-gray-400">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* AI Chat Panel */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-[700px] flex flex-col sticky top-24">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-midnight-primary/20 to-midnight-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                          : 'bg-white/10 text-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      
                      {/* Show subject stats if available */}
                      {msg.data?.subjectStats && msg.type === 'bot' && (
                        <div className="mt-3 space-y-2">
                          {Object.entries(msg.data.subjectStats).slice(0, 4).map(([subject, stats]) => {
                            const safeBunks = calculateSafeBunks(stats.present, stats.total, state.settings.targetAttendance)
                            return (
                              <div key={subject} className="bg-white/10 rounded-lg p-2">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="truncate">{subject}</span>
                                  <span className={safeBunks > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                    {safeBunks} bunks
                                  </span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      stats.percentage >= 75 ? 'bg-emerald-500' :
                                      stats.percentage >= 65 ? 'bg-amber-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${Math.min(100, stats.percentage)}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              {/* Quick Actions */}
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Can I bunk?', 'My attendance?', 'Safe bunks?'].map(action => (
                    <button
                      key={action}
                      onClick={() => {
                        setChatInput(action)
                      }}
                      className="shrink-0 text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about your attendance..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Status Change Modal */}
        {selectedCell && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-midnight-bg border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 animate-scaleIn">
              <h3 className="text-xl font-bold text-white mb-2">
                Mark Attendance
              </h3>
              <p className="text-gray-400 mb-4">
                {selectedCell.cell.subject} • {selectedCell.day} {selectedCell.slot}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.values(STATUS_TYPES).filter(s => s !== 'Empty').map(status => {
                  const Icon = STATUS_ICONS[status]
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all hover:scale-105 ${STATUS_COLORS[status]}`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      <span className="font-medium">{status}</span>
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => setSelectedCell(null)}
                className="w-full mt-4 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  )
}
