import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User.js'

export const setupPassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id })

                if (!user) {
                    user = await User.findOne({ email: profile.emails[0].value })

                    if (user) {
                        user.googleId = profile.id
                        user.avatar = profile.photos[0]?.value || ''
                        await user.save()
                    } else {
                        user = await User.create({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            name: profile.displayName,
                            username: profile.emails[0].value.split('@')[0] + '_' + Date.now(),
                            avatar: profile.photos[0]?.value || ''
                        })
                    }
                }

                done(null, user)
            } catch (error) {
                done(error, null)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (error) {
            done(error, null)
        }
    })
}
