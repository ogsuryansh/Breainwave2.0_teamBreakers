import express from 'express'
import { generateRoadmap, getLatestRoadmap, generateAudio, deleteRoadmap } from '../controllers/roadmapController.js'
import { protect, optionalAuth } from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', optionalAuth, generateRoadmap)
router.get('/latest', protect, getLatestRoadmap)
router.post('/audio', generateAudio)
router.delete('/:id', protect, deleteRoadmap)

export default router
