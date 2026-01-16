import express from 'express'
import { generateRoadmap, generateAudio } from '../controllers/roadmapController.js'

const router = express.Router()

router.post('/generate', generateRoadmap)
router.post('/audio', generateAudio)

export default router
