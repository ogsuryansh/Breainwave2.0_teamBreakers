import express from 'express';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

// Chat endpoint - no authentication required for smooth UX
router.post('/', handleChat);

export default router;
