import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, Brain, Rocket, Target, 
  Calendar, BookOpen, Zap, CheckCircle,
  Download, Share2, RefreshCw, Star,
  TrendingUp, Users, Clock, Award
} from 'lucide-react'
import ResumeAnalyzer from './ResumeAnalyzer'
import SkillTree from './SkillTree'

// Sample roadmap data structure
const sampleRoadmap = [
  {
    month: 1,
    theme: 'Foundation Skills',
    focus: 'Core Programming & Basics',
    milestones: [
      'Learn Python Basics',
      'Git & Version Control',
      'Basic Data Structures',
      'Problem Solving Patterns'
    ],
    resources: ['Python.org', 'LeetCode', 'freeCodeCamp']
  },
  {
    month: 2,
    theme: 'Web Development',
    focus: 'Frontend Fundamentals',
    milestones: [
      'HTML5 & CSS3 Mastery',
      'JavaScript ES6+',
      'React Basics',
      'Responsive Design'
    ],
    resources: ['MDN Web Docs', 'React Docs', 'Frontend Mentor']
  },
  {
    month: 3,
    theme: 'Backend Development',
    focus: 'Server-side Programming',
    milestones: [
      'Node.js & Express',
      'REST APIs',
      'Database Design',
      'Authentication'
    ],
    resources: ['Node.js Docs', 'MongoDB University', 'Postman']
  },
  {
    month: 4,
    theme: 'Full Stack Integration',
    focus: 'Connecting Frontend & Backend',
    milestones: [
      'MERN Stack Projects',
      'State Management',
      'API Integration',
      'Deployment'
    ],
    resources: ['Next.js', 'Vercel', 'Heroku']
  },
  {
    month: 5,
    theme: 'Advanced Topics',
    focus: 'Specialization',
    milestones: [
      'TypeScript',
      'GraphQL',
      'Testing (Jest)',
      'Performance Optimization'
    ],
    resources: ['TypeScript Docs', 'Apollo GraphQL', 'Jest Docs']
  },
  {
    month: 6,
    theme: 'Production Ready',
    focus: 'Real-world Applications',
    milestones: [
      'Microservices',
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'System Design'
    ],
    resources: ['Docker Docs', 'Kubernetes.io', 'AWS Docs']
  }
]

const RoadmapGenerator = () => {
  const [roadmap, setRoadmap] = useState(sampleRoadmap)
  const [enhancedRoadmap, setEnhancedRoadmap] = useState(null)
  const [activeView, setActiveView] = useState('timeline') // 'timeline' or 'skilltree'
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('full_stack')
  const [userInputs, setUserInputs] = useState({
    currentLevel: 'beginner',
    targetRole: 'full_stack',
    timeCommitment: '20',
    interests: ['web', 'mobile', 'ai']
  })

  // Handle resume analysis completion
  const handleAnalysisComplete = (enhancedData) => {
    setEnhancedRoadmap(enhancedData)
    if (enhancedData?.enhancedRoadmap) {
      setRoadmap(enhancedData.enhancedRoadmap)
    }
    setActiveView('skilltree') // Auto-switch to skill tree view
  }

  // Generate new roadmap
  const generateRoadmap = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // In real implementation, this would be an API call
      const newRoadmap = sampleRoadmap.map((month, index) => ({
        ...month,
        theme: `${selectedRole.replace('_', ' ')} - Phase ${index + 1}`,
        milestones: [
          ...month.milestones,
          `Customized for ${selectedRole}`,
          'AI Recommended Priority'
        ]
      }))
      
      setRoadmap(newRoadmap)
      setEnhancedRoadmap(null)
      setLoading(false)
    }, 1500)
  }

  // Download roadmap as PDF
  const downloadRoadmap = () => {
    // Implement PDF download logic
    alert('Roadmap downloaded!')
  }

  // Share roadmap
  const shareRoadmap = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Learning Roadmap',
        text: 'Check out my personalized learning roadmap!',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Update user inputs
  const updateInputs = (key, value) => {
    setUserInputs(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Calculate progress
  const calculateProgress = () => {
    if (!enhancedRoadmap) return 0
    const totalSkills = enhancedRoadmap.missingSkills?.length || 0
    const completedSkills = enhancedRoadmap.missingSkills?.filter(s => 
      roadmap.flatMap(m => m.milestones).some(m => m.toLowerCase().includes(s))
    ).length || 0
    return totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-midnight-primary via-purple-400 to-midnight-secondary bg-clip-text text-transparent">
                      AI Roadmap Generator
                    </span>
                  </h1>
                  <p className="text-gray-400">Personalized learning path with skill gap analysis</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-midnight-primary" />
                  <span>{roadmap.length} months</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-midnight-primary" />
                  <span>{roadmap.flatMap(m => m.milestones).length} skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-midnight-primary" />
                  <span>Personalized</span>
                </div>
                {enhancedRoadmap && (
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>{enhancedRoadmap.resumeScore}% match</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={generateRoadmap}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </>
                )}
              </button>
              <button
                onClick={downloadRoadmap}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:text-white transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={shareRoadmap}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:text-white transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Resume Analyzer Section */}
        <div className="mb-8">
          <ResumeAnalyzer 
            onAnalysisComplete={handleAnalysisComplete}
            roadmapData={roadmap}
          />
        </div>

        {/* View Toggle & Progress */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveView('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeView === 'timeline'
                    ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Timeline View
              </button>
              <button
                onClick={() => setActiveView('skilltree')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeView === 'skilltree'
                    ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Brain className="w-4 h-4" />
                Skill Tree View
              </button>
            </div>

            {/* Progress Indicator */}
            {enhancedRoadmap && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  Resume Match: <span className="font-bold text-white">{enhancedRoadmap.resumeScore}%</span>
                </div>
                <div className="text-sm text-gray-400">
                  Skills to Learn: <span className="font-bold text-white">{enhancedRoadmap.missingSkills?.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{calculateProgress()}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Settings */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Level</label>
                <select 
                  value={userInputs.currentLevel}
                  onChange={(e) => updateInputs('currentLevel', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-midnight-primary focus:outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Target Role</label>
                <select 
                  value={userInputs.targetRole}
                  onChange={(e) => {
                    updateInputs('targetRole', e.target.value)
                    setSelectedRole(e.target.value)
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-midnight-primary focus:outline-none"
                >
                  <option value="full_stack">Full Stack Developer</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="data_scientist">Data Scientist</option>
                  <option value="ml_engineer">ML Engineer</option>
                  <option value="devops">DevOps Engineer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Weekly Hours: <span className="text-white">{userInputs.timeCommitment}h</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={userInputs.timeCommitment}
                  onChange={(e) => updateInputs('timeCommitment', e.target.value)}
                  className="w-full accent-midnight-primary"
                />
              </div>
              <div>
                <button
                  onClick={generateRoadmap}
                  className="w-full h-full flex items-center justify-center gap-2 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  <Zap className="w-4 h-4" />
                  Update Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-h-[600px]">
          {activeView === 'timeline' ? (
            /* Timeline View */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Learning Timeline</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Click on any milestone to mark as complete</span>
                </div>
              </div>

              <div className="space-y-8">
                {roadmap.map((month, monthIndex) => (
                  <div key={monthIndex} className="relative pl-8 pb-8 border-l border-white/10 last:border-l-0 last:pb-0">
                    {/* Month Indicator */}
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-full border-4 border-midnight-bg"></div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-white">Month {month.month}</span>
                        <span className="px-3 py-1 bg-midnight-primary/20 text-midnight-primary text-xs rounded-full">
                          {month.theme}
                        </span>
                      </div>
                      <p className="text-gray-400">{month.focus}</p>
                    </div>

                    {/* Milestones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {month.milestones.map((milestone, milestoneIndex) => {
                        const isFromResume = enhancedRoadmap?.missingSkills?.some(skill => 
                          milestone.toLowerCase().includes(skill.toLowerCase())
                        )
                        
                        return (
                          <div 
                            key={milestoneIndex}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${
                              isFromResume
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-white/10 hover:border-midnight-primary/50'
                            }`}
                            onClick={() => {
                              // Mark as complete logic
                              const newRoadmap = [...roadmap]
                              const milestoneText = newRoadmap[monthIndex].milestones[milestoneIndex]
                              if (milestoneText.startsWith('✓ ')) {
                                newRoadmap[monthIndex].milestones[milestoneIndex] = milestoneText.slice(2)
                              } else {
                                newRoadmap[monthIndex].milestones[milestoneIndex] = `✓ ${milestoneText}`
                              }
                              setRoadmap(newRoadmap)
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {milestone.startsWith('✓ ') ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <div className="w-4 h-4 border border-white/30 rounded"></div>
                                  )}
                                  <h4 className="font-medium text-white">
                                    {milestone.startsWith('✓ ') ? milestone.slice(2) : milestone}
                                  </h4>
                                </div>
                                {isFromResume && (
                                  <span className="inline-block px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                                    Recommended by AI
                                  </span>
                                )}
                              </div>
                              {milestone.startsWith('✓ ') && (
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Resources */}
                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Recommended Resources</h5>
                      <div className="flex flex-wrap gap-2">
                        {month.resources.map((resource, index) => (
                          <a
                            key={index}
                            href="#"
                            className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {resource}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Skill Tree View */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Interactive Skill Tree</h2>
                  <p className="text-gray-400">Visualize your learning path and dependencies</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">Completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-400">Current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400">Upcoming</span>
                  </div>
                </div>
              </div>

              <div className="h-[500px] border border-white/10 rounded-xl overflow-hidden">
                <SkillTree 
                  roadmapData={roadmap}
                  userSkills={enhancedRoadmap?.missingSkills || []}
                />
              </div>
            </div>
          )}
        </div>

        {/* Roadmap Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Target Role</h3>
                <p className="text-sm text-gray-400">{selectedRole.replace('_', ' ').toUpperCase()}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Time Required</span>
                <span className="text-white">{roadmap.length} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Skills</span>
                <span className="text-white">{roadmap.flatMap(m => m.milestones).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Weekly Hours</span>
                <span className="text-white">{userInputs.timeCommitment}h</span>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Progress</h3>
                <p className="text-sm text-gray-400">Based on resume analysis</p>
              </div>
            </div>
            {enhancedRoadmap ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {enhancedRoadmap.resumeScore}%
                  </div>
                  <div className="text-sm text-gray-400">Resume Match</div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${enhancedRoadmap.resumeScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  {enhancedRoadmap.missingSkills?.length || 0} skills added to roadmap
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400">Upload resume to see progress</p>
              </div>
            )}
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Achievements</h3>
                <p className="text-sm text-gray-400">Complete milestones to unlock</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: 'First Step', desc: 'Complete 5 milestones', unlocked: true },
                { name: 'Skill Hunter', desc: 'Learn 10 new skills', unlocked: false },
                { name: 'Roadmap Master', desc: 'Complete entire roadmap', unlocked: false },
                { name: 'Resume Expert', desc: 'Achieve 80% match', unlocked: false }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-500 to-amber-600' 
                      : 'bg-white/5'
                  }`}>
                    {achievement.unlocked ? (
                      <Star className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-4 h-4 border border-white/30 rounded"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{achievement.name}</div>
                    <div className="text-xs text-gray-400">{achievement.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadmapGenerator