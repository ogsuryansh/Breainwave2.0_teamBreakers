const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken')
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
}

export const generateRoadmap = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/api/roadmap/generate`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to generate roadmap')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}

export const getLatestRoadmap = async () => {
    try {
        const response = await fetch(`${API_URL}/api/roadmap/latest`, {
            method: 'GET',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            // It's possible the user is not authenticated or has no roadmap, handle gracefully
            if (response.status === 401) return null;
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to fetch roadmap')
        }

        const data = await response.json()
        return data.data
    } catch (error) {
        console.error('API Error:', error)
        return null
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

export const deleteRoadmap = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/roadmap/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to delete roadmap')
        }

        return await response.json()
    } catch (error) {
        console.error('Delete API Error:', error)
        throw error
    }
}
