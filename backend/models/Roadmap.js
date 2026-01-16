import mongoose from 'mongoose'

const roadmapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    interests: [{
        type: String
    }],
    targetRole: String,
    timeline: [{
        month: String,
        title: String,
        description: String,
        milestones: [{
            title: String,
            completed: {
                type: Boolean,
                default: false
            }
        }]
    }],
    skills: [String],
    projects: [{
        name: String,
        description: String,
        difficulty: String,
        duration: String
    }],
    resources: [{
        title: String,
        url: String,
        type: String
    }],
    metrics: {
        hustleScore: Number,
        cgpaRisk: Number,
        timeCommitment: String,
        difficulty: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

roadmapSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model('Roadmap', roadmapSchema)
