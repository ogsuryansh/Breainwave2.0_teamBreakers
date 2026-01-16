import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { auth } from 'express-openid-connect'
import { connectDB } from './config/database.js'
import authRoutes from './routes/auth.js'
import roadmapRoutes from './routes/roadmap.js'

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    routes: {
        login: false,
        callback: '/api/auth/callback'
    }
}

const isAuth0Configured = process.env.AUTH0_ISSUER_BASE_URL &&
    !process.env.AUTH0_ISSUER_BASE_URL.includes('your-domain') &&
    process.env.AUTH0_CLIENT_ID !== 'your_auth0_client_id';

if (isAuth0Configured) {
    app.use(auth(config))
} else {
    console.warn("⚠️  AUTH0 CONFIGURATION MISSING OR DEFAULT. Starting in DEV MODE.")
    console.warn("⚠️  /api/auth/auth0-login will perform a mock login.")

    // Mock OIDC middleware to prevent crashes
    app.use((req, res, next) => {
        req.oidc = {
            isAuthenticated: () => false,
            user: null,
            login: (options) => res.redirect('/api/auth/mock-login') // Redirect to internal mock login
        }
        next()
    })
}

app.get('/', (req, res) => {
    res.json({
        message: 'Campus Hustle API is running',
        isAuthenticated: req.oidc.isAuthenticated()
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/roadmap', roadmapRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
