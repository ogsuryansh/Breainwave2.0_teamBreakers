import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
  ArrowLeft, User, GraduationCap, Calendar, Rocket, Users,
  Lightbulb, FileText, Edit3, Save, X, MapPin, Mail, Clock,
  BookOpen, Target, Award, TrendingUp, Settings, LogOut,
  ChevronRight, Sparkles, BarChart3, CheckCircle
} from 'lucide-react'

export default function ProfileDashboard() {
  const { user: auth0User, isAuthenticated: isAuth0Authenticated, logout } = useAuth0()

  // Custom auth check
  const localUserStr = localStorage.getItem('user')
  const localUser = localUserStr ? JSON.parse(localUserStr) : null
  const isLocalAuthenticated = !!localStorage.getItem('authToken')

  const isAuthenticated = isAuth0Authenticated || isLocalAuthenticated
  const user = localUser || auth0User

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    branch: '',
    semester: '',
    techTeam: '',
    society: '',
    interests: [],
    aboutMe: '',
    cgpa: '',
    targetCompanies: '',
    skills: []
  })

  const [savedRoadmaps, setSavedRoadmaps] = useState([])
  const [attendanceStats, setAttendanceStats] = useState(null)

  // Load saved profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }

    // Load roadmaps
    const roadmaps = JSON.parse(localStorage.getItem('savedRoadmaps') || '[]')
    setSavedRoadmaps(roadmaps)

    // Load attendance data if any
    const attendance = localStorage.getItem('attendanceStats')
    if (attendance) {
      setAttendanceStats(JSON.parse(attendance))
    }
  }, [])

  // Save profile data
  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profileData))
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSkillAdd = (skill) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const handleSkillRemove = (skill) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-midnight-bg text-white flex items-center justify-center">
        <div className="text-center">
          <User className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Please Login</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to view your profile</p>
          <Link
            to="/login"
            className="px-6 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Login Now
          </Link>
        </div>
      </div>
    )
  }

  const interestOptions = [
    { name: 'Coding', icon: '💻', color: 'from-blue-500 to-cyan-400' },
    { name: 'AI/ML', icon: '🧠', color: 'from-purple-500 to-pink-400' },
    { name: 'Web Dev', icon: '🌐', color: 'from-green-500 to-emerald-400' },
    { name: 'Robotics', icon: '🤖', color: 'from-orange-500 to-yellow-400' },
    { name: 'Finance', icon: '📊', color: 'from-emerald-500 to-teal-400' },
    { name: 'Product Management', icon: '🎨', color: 'from-pink-500 to-rose-400' },
    { name: 'Data Science', icon: '📈', color: 'from-indigo-500 to-purple-400' },
    { name: 'Cybersecurity', icon: '🔒', color: 'from-red-500 to-orange-400' },
  ]

  const branches = [
    'Computer Engineering', 'Information Technology', 'Electronics & Communication',
    'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
    'Production & Industrial', 'Software Engineering', 'Mathematics & Computing',
    'Engineering Physics', 'Environmental Engineering', 'Biotechnology'
  ]

  const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']

  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Cover */}
              <div className="h-24 bg-gradient-to-r from-midnight-primary via-purple-500 to-midnight-secondary relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4">
                  <img
                    src={user?.avatar || user?.picture}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-2xl border-4 border-midnight-bg object-cover shadow-xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://cdn.auth0.com/avatars/default.png";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-midnight-bg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'User'}</h2>
                <p className="text-gray-400 text-sm flex items-center gap-2 mb-4">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>

                {profileData.branch && (
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <GraduationCap className="w-4 h-4 text-midnight-primary" />
                    {profileData.branch}
                  </div>
                )}

                {profileData.semester && (
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    {profileData.semester}
                  </div>
                )}

                {profileData.techTeam && profileData.techTeam !== 'None' && (
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Rocket className="w-4 h-4 text-orange-400" />
                    {profileData.techTeam}
                  </div>
                )}

                {profileData.society && profileData.society !== 'None' && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Users className="w-4 h-4 text-pink-400" />
                    {profileData.society}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-midnight-primary" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-midnight-primary">{savedRoadmaps.length}</div>
                  <div className="text-xs text-gray-400">Roadmaps</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profileData.interests.length}</div>
                  <div className="text-xs text-gray-400">Interests</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{profileData.skills.length}</div>
                  <div className="text-xs text-gray-400">Skills</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-400">{profileData.cgpa || '—'}</div>
                  <div className="text-xs text-gray-400">CGPA</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/my-roadmaps"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-midnight-primary" />
                    My Roadmaps
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  to="/gpa-calculator"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-gray-300">
                    <Target className="w-5 h-5 text-emerald-400" />
                    GPA Calculator
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  to="/attendance"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-amber-400" />
                    Attendance Tracker
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </Link>
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  className="flex items-center justify-between p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors group w-full"
                >
                  <span className="flex items-center gap-3 text-red-400">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </span>
                  <ChevronRight className="w-5 h-5 text-red-400/50 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Details */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-midnight-primary" />
                Academic Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Branch */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Branch / Department</label>
                  {isEditing ? (
                    <select
                      value={profileData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white"
                    >
                      <option value="" className="bg-midnight-bg">Select Branch</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch} className="bg-midnight-bg">{branch}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {profileData.branch || 'Not specified'}
                    </div>
                  )}
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Current Semester</label>
                  {isEditing ? (
                    <select
                      value={profileData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white"
                    >
                      <option value="" className="bg-midnight-bg">Select Semester</option>
                      {semesters.map(sem => (
                        <option key={sem} value={sem} className="bg-midnight-bg">{sem}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {profileData.semester || 'Not specified'}
                    </div>
                  )}
                </div>

                {/* CGPA */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Current CGPA</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={profileData.cgpa}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                      placeholder="e.g., 8.5"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {profileData.cgpa || 'Not specified'}
                    </div>
                  )}
                </div>

                {/* Target Companies */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Target Companies</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.targetCompanies}
                      onChange={(e) => handleInputChange('targetCompanies', e.target.value)}
                      placeholder="e.g., Google, Microsoft, Amazon"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {profileData.targetCompanies || 'Not specified'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Campus Involvement */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-400" />
                Campus Involvement
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Tech Team */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tech Team</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.techTeam}
                      onChange={(e) => handleInputChange('techTeam', e.target.value)}
                      placeholder="e.g., Team Inferno, DTU AUV"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {profileData.techTeam || 'None'}
                    </div>
                  )}
                </div>

                {/* Society */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Society</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.society}
                      onChange={(e) => handleInputChange('society', e.target.value)}
                      placeholder="e.g., IEEE DTU, ACM DTU"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {profileData.society || 'None'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-400" />
                Interests & Passions
              </h3>

              <div className="flex flex-wrap gap-3">
                {interestOptions.map(interest => {
                  const isSelected = profileData.interests.includes(interest.name)
                  return (
                    <button
                      key={interest.name}
                      onClick={() => isEditing && handleInterestToggle(interest.name)}
                      disabled={!isEditing}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isSelected
                        ? `bg-gradient-to-r ${interest.color} text-white shadow-lg`
                        : 'bg-white/5 text-gray-400 border border-white/10'
                        } ${isEditing ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
                    >
                      <span className="text-lg">{interest.icon}</span>
                      {interest.name}
                      {isSelected && <CheckCircle className="w-4 h-4" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                Skills
              </h3>

              {isEditing && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSkillAdd(e.target.value.trim())
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {profileData.skills.length > 0 ? (
                  profileData.skills.map(skill => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 px-3 py-1.5 bg-midnight-primary/20 text-midnight-primary rounded-lg text-sm border border-midnight-primary/30"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet. {isEditing ? 'Add your skills above!' : 'Click Edit to add skills.'}</p>
                )}
              </div>
            </div>

            {/* About Me */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-pink-400" />
                About Me
              </h3>

              {isEditing ? (
                <textarea
                  value={profileData.aboutMe}
                  onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                  placeholder="Tell us about yourself, your goals, and what you want to achieve..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:outline-none text-white placeholder-gray-500 resize-none"
                />
              ) : (
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 min-h-[100px]">
                  {profileData.aboutMe || 'No description added yet. Click Edit to add information about yourself.'}
                </div>
              )}
            </div>

            {/* Recent Roadmaps */}
            {savedRoadmaps.length > 0 && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-midnight-primary" />
                    Recent Roadmaps
                  </h3>
                  <Link
                    to="/my-roadmaps"
                    className="text-sm text-midnight-primary hover:text-midnight-secondary transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {savedRoadmaps.slice(0, 3).map((roadmap, index) => (
                    <div
                      key={roadmap.id || index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-white">
                          {roadmap.title || `Roadmap ${index + 1}`}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Created {new Date(roadmap.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
