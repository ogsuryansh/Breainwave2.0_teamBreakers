import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
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
import { generateRoadmap as generateRoadmapAPI, generateAudio } from './services/api'

function HomePage() {
  const [roadmapData, setRoadmapData] = useState(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const selectionFormRef = useRef(null)

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

    try {
      const response = await generateRoadmapAPI(formData)
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
              <button className="px-8 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white font-bold hover:shadow-lg hover:shadow-midnight-primary/50 transition-all duration-300 rounded-lg">
                📥 Download PDF
              </button>
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
    </div>
  )
}

function GPACalculatorPage() {
  const navigate = useNavigate()
  return <GPACalculator onBack={() => navigate('/')} />
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
      </Routes>
    </Router>
  )
}

export default App
