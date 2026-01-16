import User from '../models/User.js'
import crypto from 'crypto'

export const register = async (req, res) => {
    try {
        const { name, email, username, password } = req.body

        if (!name || !email || !username || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' })
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email or username' })
        }

        const user = await User.create({ name, email, username, password })

        const token = user.generateAuthToken()
        await user.save()

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                avatar: user.avatar
            },
            token
        })
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({ error: 'Server error during registration' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: 'Please provide username and password' })
        }

        const user = await User.findOne({
            $or: [{ username }, { email: username }]
        }).select('+password')

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = user.generateAuthToken()
        await user.save()

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                avatar: user.avatar
            },
            token
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Server error during login' })
    }
}

export const logout = async (req, res) => {
    try {
        req.user.authToken = undefined
        req.user.authTokenExpire = undefined
        await req.user.save()

        res.clearCookie('authToken')
        res.json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json({ error: 'Server error during logout' })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('roadmaps')
        res.json({ success: true, user })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const googleCallback = async (req, res) => {
    try {
        const token = req.user.generateAuthToken()
        await req.user.save()

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`)
    } catch (error) {
        console.error('Google callback error:', error)
        res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`)
    }
}
