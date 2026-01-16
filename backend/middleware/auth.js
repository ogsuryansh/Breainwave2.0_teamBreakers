import User from '../models/User.js'
import crypto from 'crypto'

export const protect = async (req, res, next) => {
    try {
        let token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({ error: 'Not authorized, no token' })
        }

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')

        const user = await User.findOne({
            authToken: hashedToken,
            authTokenExpire: { $gt: Date.now() }
        }).select('+authToken +authTokenExpire')

        if (!user) {
            return res.status(401).json({ error: 'Not authorized, invalid or expired token' })
        }

        req.user = user
        next()
    } catch (error) {
        console.error('Auth middleware error:', error)
        res.status(401).json({ error: 'Not authorized' })
    }
}
