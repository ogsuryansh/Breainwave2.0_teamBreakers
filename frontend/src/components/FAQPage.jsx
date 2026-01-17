import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, ChevronDown, HelpCircle, Search, 
  Sparkles, GraduationCap, Calendar, Users, 
  Rocket, BookOpen, TrendingUp, Calculator,
  MessageCircle, Mail, Github
} from 'lucide-react'

const faqData = [
  {
    category: 'General',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-600',
    questions: [
      {
        q: 'What is Campus Hustle?',
        a: 'Campus Hustle is an AI-powered platform designed specifically for DTU students to navigate their college journey. It provides personalized roadmaps, attendance tracking, GPA calculations, and comprehensive information about societies, tech teams, and campus events.'
      },
      {
        q: 'Is Campus Hustle free to use?',
        a: 'Yes! Campus Hustle is completely free for all DTU students. Our mission is to help every student make the most of their college experience without any financial barriers.'
      },
      {
        q: 'How do I get started?',
        a: 'Simply visit the homepage and click "Get Started". You can generate a personalized roadmap by filling out the selection form with your interests, goals, and preferences. No account required to explore, but signing up helps save your progress.'
      },
      {
        q: 'Is my data safe and private?',
        a: 'Absolutely. We take privacy seriously. Your personal data is encrypted and stored securely. We never share your information with third parties. You can delete your data anytime from your account settings.'
      }
    ]
  },
  {
    category: 'AI Roadmap Generator',
    icon: Rocket,
    color: 'from-purple-500 to-pink-600',
    questions: [
      {
        q: 'How does the AI roadmap work?',
        a: 'Our AI analyzes your inputs including your branch, interests, career goals, and current semester to create a personalized semester-wise roadmap. It considers DTU-specific opportunities like societies, tech teams, and placement preparation timelines.'
      },
      {
        q: 'Can I regenerate my roadmap?',
        a: 'Yes! You can regenerate your roadmap anytime by going back to the selection form and updating your preferences. Each generation creates a fresh roadmap based on your current inputs.'
      },
      {
        q: 'How accurate is the AI recommendation?',
        a: 'Our AI is trained on data from successful DTU alumni and current industry trends. While it provides excellent guidance, remember that every journey is unique. Use it as a guide, not a strict rulebook.'
      },
      {
        q: 'Can I save and download my roadmap?',
        a: 'Yes! You can save multiple roadmaps to your account and access them from "My Roadmaps". You can also download them as PDF for offline reference.'
      }
    ]
  },
  {
    category: 'GPA Calculator',
    icon: Calculator,
    color: 'from-emerald-500 to-teal-600',
    questions: [
      {
        q: 'How is CGPA calculated?',
        a: 'CGPA is calculated using the formula: Sum of (Credits × Grade Points) / Total Credits. Our calculator uses DTU\'s official grading system where A+ = 10, A = 9, B+ = 8, B = 7, C+ = 6, C = 5, D = 4, and F = 0.'
      },
      {
        q: 'Can I calculate my expected CGPA?',
        a: 'Yes! You can input your current CGPA and credits, then add expected grades for upcoming semesters to predict your final CGPA. Great for planning your academic goals.'
      },
      {
        q: 'Does it support all DTU branches?',
        a: 'Yes, the GPA calculator works for all branches. You can customize subjects and credits according to your specific curriculum.'
      },
      {
        q: 'Can I save my GPA calculations?',
        a: 'Currently, calculations are stored in your browser. We\'re working on cloud sync so you can access your calculations across devices.'
      }
    ]
  },
  {
    category: 'Attendance Tracker',
    icon: Calendar,
    color: 'from-amber-500 to-orange-600',
    questions: [
      {
        q: 'How does the Smart Attendance Tracker work?',
        a: 'Upload your timetable (or use our sample data), then mark your attendance daily. The AI calculates safe bunks, predicts future attendance, and answers questions like "Can I bunk tomorrow?" using natural language.'
      },
      {
        q: 'What is the minimum attendance requirement at DTU?',
        a: 'DTU requires 75% minimum attendance in each subject to be eligible for exams. Our tracker helps you maintain this by showing exactly how many classes you can miss safely.'
      },
      {
        q: 'How are "Mass Bunks" and "Teacher Absent" handled?',
        a: 'You can configure this in Settings! Choose whether mass bunks or teacher absences count as present or absent based on your college\'s policy. This affects the attendance calculation accordingly.'
      },
      {
        q: 'Can I ask the AI questions about my attendance?',
        a: 'Yes! The chat interface lets you ask questions like "Can I bunk Data Structures?", "What\'s my attendance?", or "How many classes can I miss?" The AI responds with personalized calculations.'
      }
    ]
  },
  {
    category: 'Societies & Tech Teams',
    icon: Users,
    color: 'from-pink-500 to-rose-600',
    questions: [
      {
        q: 'When do society recruitments happen?',
        a: 'Most societies conduct recruitments in August-September (odd semester) for freshers. Some have second rounds in January-February. Keep an eye on our Events page and society Instagram handles for announcements.'
      },
      {
        q: 'How do I join a tech team?',
        a: 'Tech teams like DTU Supermileage, Team Inferno, DTU AUV etc. have recruitment drives usually in September. They typically have multiple rounds including aptitude tests, interviews, and sometimes tasks. Check our Tech Teams page for details.'
      },
      {
        q: 'Can I be in multiple societies?',
        a: 'Yes, but manage your time wisely! Being in 2-3 societies is common, but being active in too many can affect academics. Quality over quantity - it\'s better to contribute meaningfully to fewer societies.'
      },
      {
        q: 'What are the benefits of joining societies?',
        a: 'Societies offer: skill development, networking, leadership opportunities, event management experience, and most importantly - a community. Many recruiters also value society involvement during placements.'
      }
    ]
  },
  {
    category: 'Placements & Career',
    icon: TrendingUp,
    color: 'from-indigo-500 to-violet-600',
    questions: [
      {
        q: 'When do placements start at DTU?',
        a: 'Campus placements typically begin in August of your final year (7th semester). However, preparation should start from 5th semester. Internship drives happen in 6th semester (January-March).'
      },
      {
        q: 'What CGPA is required for placements?',
        a: 'Most companies have a cutoff of 6.0-7.0 CGPA. Top companies like Google, Microsoft may have 7.5+ cutoff. However, skills often matter more than CGPA - focus on building a strong profile.'
      },
      {
        q: 'How should I prepare for placements?',
        a: 'Start with DSA (Data Structures & Algorithms), practice on LeetCode/Codeforces, build projects, contribute to open source, do internships, and prepare for aptitude tests. Our AI roadmap can create a personalized prep plan for you.'
      },
      {
        q: 'What about higher studies (MS/MBA)?',
        a: 'Check our Masters page for detailed guidance on GRE/GMAT prep, university selection, and application timelines. Start preparing in your 5th-6th semester for Fall admissions.'
      }
    ]
  },
  {
    category: 'Technical Issues',
    icon: HelpCircle,
    color: 'from-gray-500 to-slate-600',
    questions: [
      {
        q: 'The website is not loading properly. What should I do?',
        a: 'Try these steps: 1) Clear browser cache and cookies, 2) Try a different browser (Chrome/Firefox recommended), 3) Disable browser extensions, 4) Check your internet connection. If issues persist, contact us.'
      },
      {
        q: 'My roadmap is not generating. What\'s wrong?',
        a: 'Ensure you\'ve filled all required fields in the form. If the AI is taking too long, it might be high traffic. Wait a moment and try again. If it fails repeatedly, report the issue through our feedback form.'
      },
      {
        q: 'How do I report a bug or suggest a feature?',
        a: 'We love feedback! You can: 1) Use the feedback button on the website, 2) Open an issue on our GitHub repository, 3) Email us directly. Bug reports with screenshots are especially helpful.'
      },
      {
        q: 'Is there a mobile app?',
        a: 'Currently, Campus Hustle is a web application optimized for both desktop and mobile browsers. A dedicated mobile app is on our roadmap for future development.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedQuestions, setExpandedQuestions] = useState({})

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    (selectedCategory === 'all' || category.category === selectedCategory) &&
    category.questions.length > 0
  )

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const totalQuestions = faqData.reduce((acc, cat) => acc + cat.questions.length, 0)

  return (
    <div className="min-h-screen bg-midnight-bg text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors mb-6 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-midnight-primary via-purple-400 to-midnight-secondary bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about Campus Hustle. Can't find what you're looking for? Feel free to reach out to us.
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span>{faqData.length} Categories</span>
              <span>•</span>
              <span>{totalQuestions} Questions</span>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-midnight-primary focus:ring-1 focus:ring-midnight-primary/50 focus:outline-none transition-all text-white placeholder-gray-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                All
              </button>
              {faqData.slice(0, 4).map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.category
                      ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, catIndex) => {
            const CategoryIcon = category.icon
            return (
              <div key={category.category} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Category Header */}
                <div className={`p-5 border-b border-white/10 bg-gradient-to-r ${category.color} bg-opacity-10`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{category.category}</h2>
                      <span className="text-sm text-gray-400">{category.questions.length} questions</span>
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-white/5">
                  {category.questions.map((item, qIndex) => {
                    const isExpanded = expandedQuestions[`${catIndex}-${qIndex}`]
                    return (
                      <div key={qIndex} className="group">
                        <button
                          onClick={() => toggleQuestion(catIndex, qIndex)}
                          className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="font-medium text-white group-hover:text-midnight-primary transition-colors">
                            {item.q}
                          </span>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-midnight-primary' : ''
                            }`} 
                          />
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96' : 'max-h-0'
                        }`}>
                          <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 backdrop-blur-xl bg-gradient-to-r from-midnight-primary/10 to-midnight-secondary/10 border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Can't find the answer you're looking for? Our team is here to help you with any questions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:support@campushustle.com"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </a>
            <a
              href="https://github.com/ogsuryansh/Breainwave2.0_teamBreakers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'GPA Calculator', path: '/gpa-calculator', icon: Calculator },
            { name: 'Attendance', path: '/attendance', icon: Calendar },
            { name: 'Societies', path: '/societies', icon: Users },
            { name: 'Tech Teams', path: '/tech-teams', icon: Rocket },
          ].map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-midnight-primary/50 transition-all group"
            >
              <link.icon className="w-5 h-5 text-midnight-primary" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
