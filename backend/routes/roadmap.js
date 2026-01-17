import express from 'express'
import { generateRoadmap, getLatestRoadmap, generateAudio, deleteRoadmap } from '../controllers/roadmapController.js'
// Auth removed to allow smooth roadmap generation
// import { protect } from '../middleware/auth.js'

const router = express.Router()

// All routes work without authentication for smooth user experience
router.post('/generate', generateRoadmap)
router.get('/latest', getLatestRoadmap)
router.post('/audio', generateAudio)
router.delete('/:id', deleteRoadmap)

export default router
