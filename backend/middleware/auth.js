import crypto from 'crypto'
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
        // Create hash of the token to match against database
        const hashedToken = crypto
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
