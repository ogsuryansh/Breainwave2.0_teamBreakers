import axios from 'axios'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

export const generateRoadmapWithAI = async (branch, semester, interests) => {
  const prompt = buildPrompt(branch, semester, interests)

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const aiResponse = response.data.candidates[0].content.parts[0].text
    return JSON.parse(aiResponse)
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message)
    throw new Error('Failed to generate roadmap with AI')
  }
}

const buildPrompt = (branch, semester, interests) => {
  return `You are an expert career advisor for DTU engineering students. Generate a comprehensive 6-month career development roadmap for a DTU ${branch} student in ${semester} year interested in: ${interests.join(', ')}.

Return ONLY a valid JSON object (no markdown formatting) with this exact structure:
{
  "targetRole": "Specific job role they should aim for",
  "timeline": [
    {
      "month": "Month 1",
      "title": "Focus area title",
      "description": "What to accomplish this month",
      "milestones": [
        { "title": "Specific actionable task", "completed": false },
        { "title": "Another task", "completed": false }
      ]
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    {
      "name": "Project name",
      "description": "Brief description",
      "difficulty": "Easy/Medium/Hard",
      "duration": "2 weeks"
    }
  ],
  "resources": [
    { "title": "Resource name", "url": "https://example.com", "type": "Course/Article/Video" }
  ]
}

Make it specific to DTU campus, include DTU societies/clubs, local hackathons, and DTU-specific opportunities. Be realistic about time commitments and semester workload.`
}
