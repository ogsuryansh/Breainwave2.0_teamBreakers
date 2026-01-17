import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Users, Rocket, Brain,
  Target, Shield, Zap, Globe,
  Code, Heart, Award, Clock,
  Mail, Github, Linkedin, Twitter,
  MessageCircle, Sparkles, GraduationCap
} from 'lucide-react'

const teamMembers = [
  {
    name: 'Ansh Giri',
    role: 'Full Stack Developer',
    bio: 'Passionate about building scalable web applications with modern technologies.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ansh',
    github: '#',
    linkedin: '#'
  },
  {
    name: 'Shivam Kumar',
    role: 'Full Stack Developer',
    bio: 'Skilled in creating seamless full-stack solutions and robust application architectures.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shivam',
    github: '#',
    linkedin: '#'
  },
  {
    name: 'Vansh',
    role: 'Team Leader',
    bio: 'Leading the vision and contributing across the entire technical stack to ensure project excellence.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vansh',
    github: '#',
    linkedin: '#'
  },
  {
    name: 'Tanvi Rustagi',
    role: 'Designer & PPT Expert',
    bio: 'Crafting compelling visual narratives and intuitive designs that captivate users.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvi',
    github: '#',
    linkedin: '#'
  }
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Leverage cutting-edge artificial intelligence to generate personalized recommendations and insights.',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Rocket,
    title: 'Fast & Efficient',
    description: 'Optimized performance ensuring quick load times and smooth user experience.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with end-to-end encryption and privacy-first approach.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Live data synchronization and instant updates across all devices.',
    color: 'from-amber-500 to-orange-600'
  },
  {
    icon: Globe,
    title: 'Accessible Anywhere',
    description: 'Responsive design that works seamlessly on desktop, tablet, and mobile.',
    color: 'from-indigo-500 to-violet-600'
  },
  {
    icon: Users,
    title: 'Collaborative Tools',
    description: 'Built-in collaboration features for team projects and shared workspaces.',
    color: 'from-pink-500 to-rose-600'
  }
]

const stats = [
  { label: 'Active Users', value: '1K+', icon: Users },
  { label: 'Lines of Code', value: '50K+', icon: Code },
  { label: 'Happy Clients', value: '100+', icon: Heart },
  { label: 'Projects Built', value: '50+', icon: Award },
  { label: 'Uptime', value: '99.9%', icon: Clock },
  { label: 'Team Members', value: '4', icon: Users }
]

export default function AboutPage({ embedded = false }) {
  const [activeTab, setActiveTab] = useState('mission')

  return (
    <div className={`${embedded ? 'w-full py-16' : 'min-h-screen'} bg-midnight-bg text-white relative overflow-hidden`}>
      {/* Background Effects - Only show if not embedded to avoid overlap, or adjust z-index */}
      {!embedded && (
        <div className="fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-midnight-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-midnight-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        </div>
      )}

      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? '' : 'py-12 pt-24'}`}>
        {/* Header */}
        <div className="mb-12">
          {!embedded && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-midnight-primary hover:text-midnight-secondary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          )}

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-midnight-primary via-purple-400 to-midnight-secondary bg-clip-text text-transparent">
                About Team Breakers
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              The minds behind Campus Hustle, empowering the next generation of students with intelligent tools.
            </p>
          </div>
        </div>

        {/* Mission & Vision Tabs */}
        <div className="mb-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('mission')}
              className={`flex-1 px-6 py-4 text-lg font-medium transition-all ${activeTab === 'mission'
                ? 'text-white border-b-2 border-midnight-primary'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex-1 px-6 py-4 text-lg font-medium transition-all ${activeTab === 'vision'
                ? 'text-white border-b-2 border-midnight-primary'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Our Vision
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 px-6 py-4 text-lg font-medium transition-all ${activeTab === 'story'
                ? 'text-white border-b-2 border-midnight-primary'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Our Story
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'mission' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-2">Transforming Student Experiences</h3>
                <p className="text-gray-300 leading-relaxed">
                  At Team Breakers, our mission is to revolutionize how students navigate their academic journey with Campus Hustle.
                  We combine artificial intelligence with human-centered design to create tools that simplify complex
                  academic challenges, from GPA calculations to attendance tracking and beyond.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We believe every student deserves access to intelligent tools that help them make informed decisions,
                  optimize their time, and achieve their full potential. Our platform bridges the gap between academic
                  requirements and student needs, creating a seamless educational experience.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-2">Shaping the Future of Education</h3>
                <p className="text-gray-300 leading-relaxed">
                  We envision a world where technology empowers every student to excel academically while maintaining
                  a healthy work-life balance. Our vision extends beyond tools – we're building an ecosystem that
                  supports holistic student development.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By 2025, we aim to become the go-to platform for students across multiple universities,
                  providing personalized AI-driven guidance, real-time collaboration tools, and comprehensive
                  career development resources.
                </p>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-2">From Idea to Impact</h3>
                <p className="text-gray-300 leading-relaxed">
                  Campus Hustle began as a small project by Team Breakers at DTU who noticed the challenges students
                  faced in managing their academic responsibilities. What started as a simple GPA calculator quickly
                  evolved into a comprehensive platform addressing multiple pain points in student life.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today, we're a dedicated team of developers, designers, and educators committed to improving
                  the student experience. Every feature we build is inspired by real student feedback and designed
                  with care to make academic life more manageable and rewarding.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all group"
                >
                  <Icon className="w-6 h-6 text-midnight-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Meet Our Team</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Passionate individuals coming together to build something meaningful for the student community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all group"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-midnight-primary/30 group-hover:border-midnight-primary transition-colors"
                />
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <div className="text-sm text-midnight-primary mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-midnight-primary/10 to-midnight-secondary/10 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="mailto:contact@campushustle.com"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
            <a
              href="https://github.com/ogsuryansh/Breainwave2.0_teamBreakers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              <Github className="w-5 h-5" />
              GitHub Repository
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              <Twitter className="w-5 h-5" />
              Follow on Twitter
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Campus Hustle. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ by Team Breakers for DTU students worldwide.</p>
        </div>
      </div>
    </div>
  )
}