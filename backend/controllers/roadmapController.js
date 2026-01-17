import { generateRoadmapWithAI } from '../services/openRouterService.js'
import { generateRoadmapAudio, createRoadmapSummary } from '../services/elevenLabsService.js'
import { calculateMetrics } from '../utils/calculateMetrics.js'
import Roadmap from '../models/Roadmap.js'
import User from '../models/User.js'

export const generateRoadmap = async (req, res) => {
    try {
        const { branch, semester, interests } = req.body

        if (!branch || !semester || !interests || interests.length === 0) {
            return res.status(400).json({
                error: 'Missing required fields: branch, semester, and interests'
            })
        }

        console.log(`🚀 Generating roadmap for ${branch}, Semester ${semester}, Interests: ${interests.join(', ')}`)

        const aiRoadmap = await generateRoadmapWithAI(branch, semester, interests)
        const metrics = calculateMetrics(branch, semester, interests)

        // Skip database for now - just return the roadmap for smooth user experience
        // User can see and use roadmap immediately without authentication

        res.json({
            success: true,
            data: {
                ...aiRoadmap,
                _id: 'temp_' + Date.now(), // Temporary ID 
                metrics,
                branch,
                semester,
                interests
            }
        })
    } catch (error) {
        console.error('❌ Error generating roadmap:', error)
        res.status(500).json({
            error: 'Failed to generate roadmap',
            details: error.message
        })
    }
}

export const getLatestRoadmap = async (req, res) => {
    try {
        // If no user is authenticated, just return null
        if (!req.user || !req.user._id) {
            return res.json({ success: true, data: null })
        }

        const roadmap = await Roadmap.findOne({ user: req.user._id })
            .sort({ createdAt: -1 }) // Get the most recent one

        if (!roadmap) {
            return res.json({ success: true, data: null })
        }

        res.json({
            success: true,
            data: roadmap
        })
    } catch (error) {
        console.error('Error fetching latest roadmap:', error)
        res.json({ success: true, data: null }) // Return null instead of error
    }
}

export const generateAudio = async (req, res) => {
    try {
        const { roadmap } = req.body

        if (!roadmap) {
            return res.status(400).json({ error: 'Roadmap data is required' })
        }

        const summary = createRoadmapSummary(roadmap)
        const audioBuffer = await generateRoadmapAudio(summary)

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'attachment; filename="roadmap-audio.mp3"'
        })

        res.send(audioBuffer)
    } catch (error) {
        console.error('Error generating audio:', error)
        res.status(500).json({
            error: 'Failed to generate audio',
            details: error.message
        })
    }
}

export const deleteRoadmap = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id)

        if (!roadmap) {
            return res.status(404).json({ error: 'Roadmap not found' })
        }

        // Ensure user owns the roadmap
        if (roadmap.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized to delete this roadmap' })
        }

        await roadmap.deleteOne()

        // Remove from user's roadmaps array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { roadmaps: roadmap._id }
        })

        res.json({ success: true, message: 'Roadmap removed' })
    } catch (error) {
        console.error('Error deleting roadmap:', error)
        res.status(500).json({ error: 'Server error' })
    }
}
