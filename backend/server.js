import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { spawn } from 'child_process'

const router = express.Router()

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/resumes')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed'), false)
    }
  }
})

// Analyze resume endpoint
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const { targetRole } = req.body
    const filePath = req.file.path

    // Simple keyword analysis (without Python for now)
    // In production, you would call a Python script here
    
    // Mock analysis for development
    const mockAnalysis = {
      success: true,
      analysis: {
        score: Math.floor(Math.random() * 50) + 50, // Random score 50-100%
        matching_keywords: ['python', 'javascript', 'react', 'node'],
        missing_keywords: ['docker', 'kubernetes', 'aws', 'typescript'],
        match_count: 4,
        total_target_keywords: 8
      },
      resume_summary: {
        word_count: 450,
        keyword_count: 12
      },
      recommendations: [
        "Your resume is <strong>75%</strong> aligned with Full Stack Developer role",
        "Consider learning Docker and Kubernetes for DevOps skills",
        "Add AWS cloud certifications to your resume",
        "Build 2-3 projects showcasing required skills"
      ]
    }

    // Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting temp file:', err)
    })

    res.json(mockAnalysis)

  } catch (error) {
    console.error('Route error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Get available roles
router.get('/roles', (req, res) => {
  const roles = [
    { id: 'ev_engineer', name: 'EV Engineer', icon: '⚡' },
    { id: 'data_scientist', name: 'Data Scientist', icon: '📊' },
    { id: 'full_stack', name: 'Full Stack Developer', icon: '💻' },
    { id: 'ml_engineer', name: 'ML Engineer', icon: '🤖' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
    { id: 'product_manager', name: 'Product Manager', icon: '🎯' },
    { id: 'ux_designer', name: 'UX Designer', icon: '🎨' },
    { id: 'devops', name: 'DevOps Engineer', icon: '⚙️' }
  ]
  
  res.json({ success: true, roles })
})

// Enhanced roadmap generation
router.post('/enhanced', async (req, res) => {
  try {
    const { userLevel, targetRole, timeCommitment, interests, missingSkills } = req.body
    
    // Generate enhanced roadmap based on missing skills
    const enhancedRoadmap = {
      success: true,
      roadmap: {
        userLevel,
        targetRole,
        timeCommitment,
        totalMonths: 6,
        months: generateEnhancedMonths(missingSkills, targetRole),
        missingSkills: missingSkills || [],
        generatedAt: new Date().toISOString()
      }
    }
    
    res.json(enhancedRoadmap)
  } catch (error) {
    console.error('Error generating enhanced roadmap:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to generate enhanced roadmap'
    })
  }
})

// Save enhanced roadmap
router.post('/save-enhanced', async (req, res) => {
  try {
    const { roadmapData } = req.body
    
    // In production, save to database
    // For now, just return success
    res.json({
      success: true,
      message: 'Roadmap saved successfully',
      id: Date.now().toString()
    })
  } catch (error) {
    console.error('Error saving roadmap:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to save roadmap'
    })
  }
})

// Helper functions
function generateEnhancedMonths(missingSkills, targetRole) {
  const months = []
  const skillGroups = chunkArray(missingSkills, 8) // 8 skills per month max
  
  for (let i = 0; i < 6; i++) {
    const monthSkills = skillGroups[i] || []
    months.push({
      month: i + 1,
      theme: getMonthTheme(i, targetRole),
      focus: getMonthFocus(i, targetRole),
      milestones: [
        ...monthSkills.map(skill => `Learn ${skill}`),
        ...getDefaultMilestones(i, targetRole)
      ],
      resources: getMonthResources(i, targetRole)
    })
  }
  
  return months
}

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

function getMonthTheme(monthIndex, targetRole) {
  const themes = {
    full_stack: ['Foundation', 'Frontend', 'Backend', 'Database', 'DevOps', 'Projects'],
    data_scientist: ['Python Basics', 'Data Analysis', 'ML Basics', 'Advanced ML', 'Deep Learning', 'Projects'],
    ml_engineer: ['Python & Math', 'ML Fundamentals', 'Deep Learning', 'NLP/CV', 'MLOps', 'Projects'],
    devops: ['Linux & Git', 'Containers', 'Orchestration', 'CI/CD', 'Cloud', 'Projects']
  }
  
  return themes[targetRole]?.[monthIndex] || `Phase ${monthIndex + 1}`
}

function getMonthFocus(monthIndex, targetRole) {
  const focuses = {
    0: 'Building strong fundamentals',
    1: 'Core skill development',
    2: 'Advanced concepts',
    3: 'Specialization',
    4: 'Production readiness',
    5: 'Real-world application'
  }
  return focuses[monthIndex]
}

function getDefaultMilestones(monthIndex, targetRole) {
  const defaults = {
    0: ['Setup development environment', 'Learn Git basics'],
    1: ['Build a simple project', 'Join relevant communities'],
    2: ['Contribute to open source', 'Start a portfolio'],
    3: ['Learn testing strategies', 'Study system design'],
    4: ['Prepare for interviews', 'Build complex project'],
    5: ['Polish portfolio', 'Network with professionals']
  }
  return defaults[monthIndex] || []
}

function getMonthResources(monthIndex, targetRole) {
  const resources = {
    0: ['MDN Web Docs', 'freeCodeCamp', 'YouTube tutorials'],
    1: ['Official documentation', 'Udemy courses', 'Stack Overflow'],
    2: ['GitHub repositories', 'Medium articles', 'Dev.to'],
    3: ['AWS/Azure/GCP docs', 'Docker docs', 'Kubernetes.io'],
    4: ['LeetCode', 'HackerRank', 'Interview Cake'],
    5: ['LinkedIn Learning', 'Coursera', 'edX']
  }
  return resources[monthIndex] || []
}

export default router
