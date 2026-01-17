import crypto from 'crypto'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
    let token

    // 1. Try to find the Custom Token (Bearer or Cookie)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.authToken) {
        token = req.cookies.authToken
    }

    if (token) {
        try {
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex')

            const user = await User.findOne({
                authToken: hashedToken,
                authTokenExpire: { $gt: Date.now() }
            })

            if (user) {
                req.user = user
                return next()
            }
        } catch (error) {
            console.error("Token verification failed:", error)
        }
    }

    // 2. If no custom token, check for Auth0 Session (OpenID Connect)
    if (req.oidc && req.oidc.isAuthenticated()) {
        try {
            const { sub, email } = req.oidc.user

            // Find user synced from Auth0
            const user = await User.findOne({
                $or: [{ auth0Id: sub }, { email }]
            })

            if (user) {
                req.user = user
                return next()
            }
        } catch (error) {
            console.error("Auth0 session check failed:", error)
        }
    }

    // 3. If neither worked, unauthorized
    return res.status(401).json({ error: 'Not authorized to access this route' })
}

// Optional auth - allows unauthenticated access but attaches user if available
export const optionalAuth = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.authToken) {
        token = req.cookies.authToken
    }

    if (token) {
        try {
            const crypto = await import('crypto')
            const hashedToken = crypto.default
                .createHash('sha256')
                .update(token)
                .digest('hex')

            const User = (await import('../models/User.js')).default
            const user = await User.findOne({
                authToken: hashedToken,
                authTokenExpire: { $gt: Date.now() }
            })

            if (user) {
                req.user = user
            }
        } catch (error) {
            console.warn("Optional auth check failed:", error.message)
        }
    }

    // Continue without requiring auth
    next()
}
