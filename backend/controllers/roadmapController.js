import { generateRoadmapWithAI } from '../services/openRouterService.js'
import { generateRoadmapAudio, createRoadmapSummary } from '../services/elevenLabsService.js'
import { calculateMetrics } from '../utils/calculateMetrics.js'

export const generateRoadmap = async (req, res) => {
    try {
        const { branch, semester, interests } = req.body

        if (!branch || !semester || !interests || interests.length === 0) {
            return res.status(400).json({
                error: 'Missing required fields: branch, semester, and interests'
            })
        }

        const aiRoadmap = await generateRoadmapWithAI(branch, semester, interests)
        const metrics = calculateMetrics(branch, semester, interests)

        res.json({
            success: true,
            data: {
                ...aiRoadmap,
                metrics,
                branch,
                semester,
                interests
            }
        })
    } catch (error) {
        console.error('Error generating roadmap:', error)
        res.status(500).json({
            error: 'Failed to generate roadmap',
            details: error.message
        })
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
