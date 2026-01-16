import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.authToken) {
        token = req.cookies.authToken
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized to access this route' })
    }

    try {
        const decoded = jwt.decode(token) // In real app use verify, but verify requires secret from User model generation logic which is internal.
        // Wait, User.js generates token using crypto, NOT jwt. 
        // Let's re-read User.js closely.

        // User.js: 
        // generateAuthToken = function() { const token = crypto.randomBytes(32).toString('hex'); ... return token; }
        // It returns a opaque random string (hex). It hashes it and stores in authToken field in DB.

        // So we need to hash the token and find user.
        const crypto = await import('crypto')
        const hashedToken = crypto.default
            .createHash('sha256')
            .update(token)
            .digest('hex')

        const user = await User.findOne({
            authToken: hashedToken,
            authTokenExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(401).json({ error: 'Not authorized to access this route' })
        }

        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: 'Not authorized to access this route' })
    }
}
