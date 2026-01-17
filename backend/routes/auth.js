import express from 'express'
import mongoose from 'mongoose'
import crypto from 'crypto'
import User from '../models/User.js'
import { register, login, logout, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)

router.get('/auth0-login', (req, res) => {
    // Check if Auth0 is properly configured
    const isAuth0Configured = process.env.AUTH0_ISSUER_BASE_URL &&
        process.env.AUTH0_CLIENT_ID;

    // If Auth0 is not configured, redirect to mock login
    if (!isAuth0Configured || !req.oidc || !req.oidc.login) {
        console.log('🔄 Redirecting to mock login (Auth0 not configured)')
        return res.redirect('/api/auth/mock-login')
    }

    // Use req.oidc (not res.oidc)
    return req.oidc.login({
        returnTo: '/api/auth/callback',
        authorizationParams: {
            redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`
        }
    })
})

router.get('/callback', async (req, res) => {
    try {
        if (!req.oidc.isAuthenticated()) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`)
        }

        const { email, name, sub, picture } = req.oidc.user

        let user = await User.findOne({ $or: [{ auth0Id: sub }, { email }] })

        if (!user) {
            user = await User.create({
                auth0Id: sub,
                email,
                name,
                username: email.split('@')[0] + '_' + Date.now(),
                avatar: picture || ''
            })
        } else if (!user.auth0Id) {
            user.auth0Id = sub
            user.avatar = picture || user.avatar
            await user.save()
        }

        const token = user.generateAuthToken()
        await user.save()

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.redirect(`${process.env.FRONTEND_URL}?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        }))}`)
    } catch (error) {
        console.error('Auth0 callback error:', error)
        res.redirect(`${process.env.FRONTEND_URL}/login?error=callback_failed`)
    }
})

// MOCK LOGIN for Development when Auth0 is not configured
router.get('/mock-login', async (req, res) => {
    try {
        // Check if MongoDB is connected
        const isDbConnected = mongoose.connection.readyState === 1;

        if (!isDbConnected) {
            console.warn('⚠️  MongoDB not connected. Using in-memory mock login.');

            // Generate a temporary token without DB
            const tempToken = crypto.randomBytes(32).toString('hex');
            const mockUser = {
                id: 'temp_dev_user_123',
                name: 'Developer Mode (No DB)',
                email: 'dev_user@example.com',
                username: 'dev_hero',
                avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Developer'
            };

            res.cookie('authToken', tempToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            });

            return res.redirect(`${process.env.FRONTEND_URL}?token=${tempToken}&user=${encodeURIComponent(JSON.stringify(mockUser))}`);
        }

        // Normal DB-backed mock login
        const mockEmail = 'dev_user@example.com'

        let user = await User.findOne({ email: mockEmail })
        if (!user) {
            user = await User.create({
                auth0Id: 'mock|dev_user_123',
                email: mockEmail,
                name: 'Developer Mode',
                username: 'dev_hero',
                avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Developer'
            })
        }

        const token = user.generateAuthToken()
        await user.save()

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        // Redirect to Frontend with Token
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        }))}`)

    } catch (error) {
        console.error("Mock Login Failed:", error)
        res.status(500).send("Mock Login Failed")
    }
})

router.get('/logout-auth0', (req, res) => {
    if (req.oidc && req.oidc.logout) {
        res.oidc.logout({
            returnTo: process.env.FRONTEND_URL
        })
    } else {
        // Mock logout
        res.clearCookie('authToken');
        res.redirect(process.env.FRONTEND_URL);
    }
})

export default router
