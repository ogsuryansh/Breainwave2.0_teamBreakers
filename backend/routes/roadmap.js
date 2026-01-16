import express from 'express'
import { generateRoadmap, generateAudio, deleteRoadmap } from '../controllers/roadmapController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', protect, generateRoadmap)
router.post('/audio', generateAudio) // Audio generation might be public or protected, leaving public for now as it uses roadmap content
router.delete('/:id', protect, deleteRoadmap)

export default router
