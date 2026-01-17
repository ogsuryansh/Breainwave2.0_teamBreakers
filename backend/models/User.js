import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: function () {
            return !this.auth0Id
        },
        minlength: 6,
        select: false
    },
    auth0Id: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String,
        default: ''
    },
    authToken: {
        type: String,
        select: false
    },
    authTokenExpire: {
        type: Date,
        select: false
    },
    roadmaps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roadmap'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function () {
    // Generate avatar if missing
    if (!this.avatar && this.name) {
        this.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${this.name}`
    }

    if (!this.isModified('password')) {
        return
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.generateAuthToken = function () {
    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')

    this.authToken = hashedToken
    this.authTokenExpire = Date.now() + (7 * 24 * 60 * 60 * 1000)

    return token
}

export default mongoose.model('User', userSchema)
