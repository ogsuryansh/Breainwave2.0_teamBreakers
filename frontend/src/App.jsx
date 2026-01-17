import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import SelectionForm from './components/SelectionForm'
import Timeline from './components/Timeline'
import RealityCheckMeter from './components/RealityCheckMeter'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Register from './components/Register'
import GPACalculator from './components/GPACalculator'
import MyRoadmaps from './components/MyRoadmaps'
import SocietiesPage from './components/SocietiesPage'
import TechTeamsPage from './components/TechTeamsPage'
import ElectivesPage from './components/ElectivesPage'
import EventsPage from './components/EventsPage'
import MastersPage from './components/MastersPage'
import MoocsPage from './components/MoocsPage'
import PlacementStatsPage from './components/PlacementStatsPage'
import BranchesPage from './components/BranchesPage'
import SmartAttendanceDashboard from './components/SmartAttendanceDashboard'
import FAQPage from './components/FAQPage'
import ProfileDashboard from './components/ProfileDashboard'
import AboutPage from './components/AboutPage'
import RoadmapGenerator from './components/RoadmapGenerator' // NEW IMPORT
import Chatbot from './components/Chatbot'
import { generateRoadmap as generateRoadmapAPI, generateAudio, deleteRoadmap, getLatestRoadmap } from './services/api'
import html2pdf from 'html2pdf.js'

function HomePage() {
  const [roadmapData, setRoadmapData] = useState(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const selectionFormRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Handle authentication from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const userStr = params.get('user')

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr))

        // Store auth data
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))

        console.log('✅ Authentication successful:', user.name)

        // Clean URL (remove token and user params)
        navigate('/', { replace: true })
      } catch (error) {
        console.error('Failed to parse user data from URL:', error)
      }
    }
  }, [location, navigate])

  useState(() => {
    const fetchLatest = async () => {
      const saved = await getLatestRoadmap()
      if (saved) {
        setRoadmapData(saved)
        setShowRoadmap(true)
      }
    }
    fetchLatest()
  }, [])

  const handleDownloadPDF = () => {
    const element = document.getElementById('roadmap-pdf-content');
    element.classList.remove('hidden'); // Temporarily show for capture

    const opt = {
      margin: 1,
      filename: 'my-campus-hustle-roadmap.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      element.classList.add('hidden'); // Hide again
    });
  }

  const handleStart = () => {
    selectionFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleBackToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleGenerateRoadmap = async (formData) => {
    setLoading(true)
    setError(null)

    // Ensure animation plays for at least 2 seconds (reduced for better UX)
    const minAnimationTime = new Promise(resolve => setTimeout(resolve, 2000))

    try {
      // Run API call and timer in parallel
      const [response] = await Promise.all([
        generateRoadmapAPI(formData),
        minAnimationTime
      ])

      console.log("Roadmap Data received:", response.data)

      // Save roadmap to localStorage
      const roadmapWithMetadata = {
        id: Date.now(),
        ...response.data,
        createdAt: new Date().toISOString()
      }

      const savedRoadmaps = JSON.parse(localStorage.getItem('savedRoadmaps') || '[]')
      savedRoadmaps.unshift(roadmapWithMetadata)
      localStorage.setItem('savedRoadmaps', JSON.stringify(savedRoadmaps))

      setRoadmapData(response.data)
      setShowRoadmap(true)
    } catch (err) {
      console.error(err)
      alert(`Error generating roadmap: ${err.message || 'Unknown error'}`)
      setError('Failed to generate roadmap. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToForm = () => {
    setShowRoadmap(false)
  }

  const handleDownloadAudio = async (roadmap) => {
    setLoading(true)
    try {
      const audioBlob = await generateAudio(roadmap)
      const url = window.URL.createObjectURL(audioBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'roadmap-mentor.mp3'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to generate audio:', err)
      alert('Failed to generate voice mentor. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRoadmap = async () => {
    if (!confirm('Are you sure you want to delete this roadmap? This cannot be undone.')) return

    setLoading(true)
    try {
      if (roadmapData._id) {
        await deleteRoadmap(roadmapData._id)
      }
      setRoadmapData(null)
      setShowRoadmap(false)
      // Also remove from local storage if needed, or refresh list
      localStorage.removeItem('currentRoadmap') // Example cleanup
    } catch (err) {
      console.error("Failed to delete", err)
      alert("Failed to delete roadmap")
    } finally {
      setLoading(false)
    }
  }

  if (showRoadmap) {
    return (
      <div className="min-h-screen bg-midnight-bg text-white overflow-hidden">
        <div className="fixed inset-0 -z-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <Navigation />

        <div className="pt-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
          <button
            onClick={handleBackToForm}
            className="mb-8 px-4 py-2 border border-midnight-primary text-midnight-primary hover:bg-midnight-primary hover:text-midnight-bg transition-all duration-300 rounded-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Selection
          </button>

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Your 6-Month Roadmap</h1>
            {roadmapData.targetRole && (
              <p className="text-center text-midnight-primary text-xl mb-8">
                Path to: {roadmapData.targetRole}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Timeline roadmapData={roadmapData} />
              </div>
              <div>
                <RealityCheckMeter roadmapData={roadmapData} />
              </div>
            </div>

            <div className="mt-8 text-center pb-12 flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => handleDownloadAudio(roadmapData)}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-midnight-secondary to-midnight-primary text-white font-bold hover:shadow-lg hover:shadow-midnight-secondary/50 transition-all duration-300 rounded-lg disabled:opacity-50"
              >
                {loading ? '🎧 Generating...' : '🎧 Voice Mentor'}
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-8 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white font-bold hover:shadow-lg hover:shadow-midnight-primary/50 transition-all duration-300 rounded-lg"
              >
                📥 Download PDF
              </button>
              <button
                onClick={handleDeleteRoadmap}
                className="px-8 py-3 border border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 rounded-lg"
              >
                🗑️ Delete Plan
              </button>
              {/* NEW BUTTON: Enhanced Roadmap Generator */}
              <button
                onClick={() => window.location.href = '/enhanced-roadmap'}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 rounded-lg"
              >
                🚀 Enhanced Generator
              </button>
            </div>
          </div>

          {/* Hidden Print Container for PDF */}
          <div id="roadmap-pdf-content" className="hidden">
            <div className="p-8 bg-white text-black">
              <h1 className="text-3xl font-bold mb-4 text-center">My 6-Month Roadmap</h1>
              <div className="mb-4 text-center">
                <p><strong>Target Role:</strong> {roadmapData.targetRole}</p>
                <p><strong>Hustle Score:</strong> {roadmapData.hustleScore}/100</p>
              </div>

              <div className="space-y-6">
                {roadmapData.timeline.map((item, idx) => (
                  <div key={idx} className="border-b pb-4">
                    <h3 className="text-xl font-bold">{item.month}: {item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <ul className="list-disc pl-5">
                      {item.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="text-sm">{m.title}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Projects to Build</h3>
                {roadmapData.projects.map((proj, idx) => (
                  <div key={idx} className="mb-4">
                    <h4 className="font-bold">{proj.name} ({proj.difficulty})</h4>
                    <p className="text-sm">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-bg text-white overflow-x-hidden scroll-smooth">
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />
      <Sidebar />

      <Hero onStart={handleStart} />

      <div ref={selectionFormRef}>
        <SelectionForm
          onBack={handleBackToHero}
          onGenerateRoadmap={handleGenerateRoadmap}
          loading={loading}
          error={error}
        />
      </div>

      {/* About Section (3rd page section) */}
      <div id="about-section">
        <AboutPage embedded={true} />
      </div>
    </div>
  )
}

function GPACalculatorPage() {
  const navigate = useNavigate()
  return <GPACalculator onBack={() => navigate('/')} />
}

function EnhancedRoadmapPage() {
  return <RoadmapGenerator />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gpa-calculator" element={<GPACalculatorPage />} />
        <Route path="/my-roadmaps" element={<MyRoadmaps />} />
        <Route path="/societies" element={<SocietiesPage />} />
        <Route path="/tech-teams" element={<TechTeamsPage />} />
        <Route path="/electives" element={<ElectivesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/masters" element={<MastersPage />} />
        <Route path="/moocs" element={<MoocsPage />} />
        <Route path="/placement-stats" element={<PlacementStatsPage />} />
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/attendance" element={<SmartAttendanceDashboard />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        {/* NEW ROUTE FOR ENHANCED ROADMAP */}
        <Route path="/enhanced-roadmap" element={<EnhancedRoadmapPage />} />
      </Routes>

      {/* AI Chatbot - Available on all pages */}
      <Chatbot />
    </Router>
  )
}

export default App