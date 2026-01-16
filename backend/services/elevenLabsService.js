import axios from 'axios'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1/text-to-speech'

export const generateRoadmapAudio = async (roadmapSummary, voiceId = 'EXAVITQu4vr4xnSDxMaL') => {
    try {
        const response = await axios.post(
            `${ELEVENLABS_URL}/${voiceId}`,
            {
                text: roadmapSummary,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            },
            {
                headers: {
                    'Accept': 'audio/mpeg',
                    'xi-api-key': ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            }
        )

        return response.data
    } catch (error) {
        console.error('ElevenLabs API Error:', error.response?.data || error.message)
        throw new Error('Failed to generate audio')
    }
}

export const createRoadmapSummary = (roadmap) => {
    const { targetRole, timeline, skills } = roadmap

    let summary = `Welcome to your personalized 6-month roadmap to becoming a ${targetRole}! `
    summary += `Over the next six months, you'll master ${skills.slice(0, 3).join(', ')}, and more. `

    summary += `Here's your journey: `
    timeline.forEach((month, index) => {
        if (index < 3) {
            summary += `In ${month.month}, focus on ${month.title}. `
        }
    })

    summary += `Stay consistent, track your progress, and remember - every expert was once a beginner. Let's hustle!`

    return summary
}
