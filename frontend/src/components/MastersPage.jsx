import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, GraduationCap, ChevronDown, ChevronUp, Briefcase, BookOpen } from 'lucide-react'
import mastersData from '../data/Masters.json'

export default function MastersPage() {
  const [expandedProgram, setExpandedProgram] = useState(null)

  const programs = mastersData.DTU_Postgraduate_and_Doctoral_Programs || []

  const getProgramIcon = (program) => {
    if (program.includes('M.Tech')) return '🔧'
    if (program.includes('M.Sc')) return '🔬'
    if (program.includes('MBA')) return '💼'
    if (program.includes('PhD')) return '🎓'
    if (program.includes('Integrated')) return '📚'
    return '🎯'
  }

  const getProgramColor = (index) => {
    const colors = [
      'from-cyan-500 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-midnight-primary to-midnight-secondary bg-clip-text text-transparent">
              Postgraduate & Doctoral Programs
            </span>
          </h1>
          <p className="text-gray-400">Delhi Technological University - Higher Education Programs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">{programs.length}</div>
            <div className="text-sm text-gray-400">Programs</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">25+</div>
            <div className="text-sm text-gray-400">Specializations</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-primary">🎓</div>
            <div className="text-sm text-gray-400">Research</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-midnight-secondary">DTU</div>
            <div className="text-sm text-gray-400">Excellence</div>
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-4">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-midnight-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div
                onClick={() => setExpandedProgram(expandedProgram === index ? null : index)}
                className="p-6 cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getProgramColor(index)} rounded-xl flex items-center justify-center text-2xl`}>
                    {getProgramIcon(program.program)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-midnight-primary transition-colors">
                      {program.program}
                    </h3>
                    <p className="text-sm text-gray-400">{program.duration}</p>
                  </div>
                </div>
                {expandedProgram === index ? (
                  <ChevronUp className="w-6 h-6 text-midnight-primary" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-midnight-primary transition-colors" />
                )}
              </div>

              {/* Expanded Content */}
              {expandedProgram === index && (
                <div className="px-6 pb-6 border-t border-white/10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Curriculum Focus */}
                    <div className="bg-white/5 rounded-xl p-5">
                      <h4 className="flex items-center gap-2 text-midnight-primary font-semibold mb-4">
                        <BookOpen className="w-5 h-5" />
                        Curriculum Focus
                      </h4>
                      <ul className="space-y-2">
                        {(program.curriculum_focus || []).map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-midnight-primary mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Future Opportunities */}
                    <div className="bg-white/5 rounded-xl p-5">
                      <h4 className="flex items-center gap-2 text-midnight-secondary font-semibold mb-4">
                        <Briefcase className="w-5 h-5" />
                        Future Opportunities
                      </h4>
                      <ul className="space-y-2">
                        {(program.future_opportunities || []).map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-midnight-secondary mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Specializations/Disciplines */}
                  {(program.specializations_examples || program.disciplines) && (
                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-3">
                        {program.specializations_examples ? 'Specializations' : 'Disciplines'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(program.specializations_examples || program.disciplines || []).map((spec, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1.5 bg-midnight-primary/10 text-midnight-primary rounded-full border border-midnight-primary/20"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {program.notes && (
                    <div className="mt-6 p-4 bg-midnight-primary/10 rounded-xl border border-midnight-primary/20">
                      <p className="text-sm text-gray-300">
                        <span className="text-midnight-primary font-semibold">Note: </span>
                        {program.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
