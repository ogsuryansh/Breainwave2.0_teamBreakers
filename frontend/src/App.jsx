import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import SelectionForm from './components/SelectionForm'
import Timeline from './components/Timeline'
import RealityCheckMeter from './components/RealityCheckMeter'
import Navigation from './components/Navigation'

function App() {
  const [roadmapData, setRoadmapData] = useState(null)
  const [currentStep, setCurrentStep] = useState('hero')

  const handleStart = () => {
    setCurrentStep('form')
  }

  const handleBackToHero = () => {
    setCurrentStep('hero')
  }

  const handleGenerateRoadmap = (data) => {
    setRoadmapData(data)
    setCurrentStep('roadmap')
  }

  const handleBackToForm = () => {
    setCurrentStep('form')
  }

  return (
    <div className="min-h-screen bg-midnight-bg text-white overflow-hidden">
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />

      {currentStep === 'hero' && (
        <Hero onStart={handleStart} />
      )}

      {currentStep === 'form' && (
        <SelectionForm
          onBack={handleBackToHero}
          onGenerateRoadmap={handleGenerateRoadmap}
        />
      )}

      {currentStep === 'roadmap' && (
        <div className="pt-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
          <button
            onClick={handleBackToForm}
            className="mb-8 px-4 py-2 border border-midnight-primary text-midnight-primary hover:bg-midnight-primary hover:text-midnight-bg transition-all duration-300 rounded-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Selection
          </button>

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Your 6-Month Roadmap</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Timeline roadmapData={roadmapData} />
              </div>
              <div>
                <RealityCheckMeter roadmapData={roadmapData} />
              </div>
            </div>

            <div className="mt-8 text-center pb-12">
              <button className="px-8 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white font-bold hover:shadow-lg hover:shadow-midnight-primary/50 transition-all duration-300 rounded-lg">
                📥 Download My Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
