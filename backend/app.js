import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/database.js'
import roadmapRoutes from './routes/roadmap.js'
import authRoutes from './routes/auth.js'
import enhancedRoutes from './routes/enhanced.js'
import chatRoutes from './routes/chat.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from the backend directory
dotenv.config({ path: path.join(__dirname, '.env') })

// Connect to database (but don't crash if it fails)
connectDB().catch(err => {
  console.warn('⚠️ MongoDB connection failed. Some features may be limited.')
  console.warn('Error:', err.message)
})

const app = express()

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ].filter(Boolean),
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cookieParser())

// Auth0 Configuration
import { auth } from 'express-openid-connect'

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET || 'a_very_long_random_string_for_testing_only',
  // Hardcoded fallback for production to prevent "localhost" issues if env vars are missing
  baseURL: process.env.AUTH0_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://breainwave2-0-team-breakers.vercel.app' : 'http://localhost:5000'),
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    login: false,
    callback: '/api/auth/callback'
  }
}

// Emulate simple check from routes/auth.js to avoid mismatch
const isAuth0Configured = config.issuerBaseURL && config.clientID;

if (isAuth0Configured) {
  app.use(auth(config))
} else {
  console.warn("⚠️  AUTH0 CONFIGURATION MISSING. Usage of req.oidc will fail or fallback.")
  // Mock OIDC middleware to prevent crashes if Auth0 not set
  app.use((req, res, next) => {
    req.oidc = {
      isAuthenticated: () => false,
      user: null,
      login: (options) => res.redirect('/api/auth/mock-login')
    }
    next()
  })
}

// Ensure FRONTEND_URL is set correctly for redirects
if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
  console.log("⚠️  Using hardcoded production FRONTEND_URL")
  process.env.FRONTEND_URL = 'https://campushustle.netlify.app'
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/roadmap', roadmapRoutes)
app.use('/api/resume', enhancedRoutes)
app.use('/api/chat', chatRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  })
})

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📡 API available at http://localhost:${PORT}/api`)
  })
}

export default app
