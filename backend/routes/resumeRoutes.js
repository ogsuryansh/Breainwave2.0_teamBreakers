const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Analyze resume endpoint
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const { targetRole } = req.body;
    const filePath = req.file.path;

    // Call Python service
    const pythonProcess = spawn('python', [
      'services/resumeAnalyzerService.py',
      filePath,
      targetRole || 'full_stack'
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // Clean up uploaded file
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });

      if (code !== 0) {
        console.error('Python error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to analyze resume'
        });
      }

      try {
        const analysisResult = JSON.parse(result);
        res.json({
          success: true,
          ...analysisResult
        });
      } catch (parseError) {
        console.error('Parse error:', parseError);
        res.status(500).json({
          success: false,
          error: 'Invalid response from analyzer'
        });
      }
    });

  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get available roles
router.get('/roles', (req, res) => {
  const roles = [
    { id: 'ev_engineer', name: 'EV Engineer', icon: '⚡' },
    { id: 'data_scientist', name: 'Data Scientist', icon: '📊' },
    { id: 'full_stack', name: 'Full Stack Developer', icon: '💻' },
    { id: 'ml_engineer', name: 'ML Engineer', icon: '🤖' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
    { id: 'product_manager', name: 'Product Manager', icon: '🎯' },
    { id: 'ux_designer', name: 'UX Designer', icon: '🎨' },
    { id: 'devops', name: 'DevOps Engineer', icon: '⚙️' }
  ];
  
  res.json({ success: true, roles });
});

module.exports = router;