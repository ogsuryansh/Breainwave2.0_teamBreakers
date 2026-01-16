const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const generateRoadmap = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/api/roadmap/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error('Failed to generate roadmap')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}

export const generateAudio = async (roadmapData) => {
    try {
        const response = await fetch(`${API_URL}/api/roadmap/audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roadmap: roadmapData })
        })

        if (!response.ok) {
            throw new Error('Failed to generate audio')
        }

        const blob = await response.blob()
        return blob
    } catch (error) {
        console.error('Audio API Error:', error)
        throw error
    }
}
