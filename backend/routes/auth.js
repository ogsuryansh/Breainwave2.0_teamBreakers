import express from 'express'
import User from '../models/User.js'
import { register, login, logout, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)

router.get('/auth0-login', (req, res) => {
    res.oidc.login({
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

router.get('/logout-auth0', (req, res) => {
    res.oidc.logout({
        returnTo: process.env.FRONTEND_URL
    })
})

export default router
