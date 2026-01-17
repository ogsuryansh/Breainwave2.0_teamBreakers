const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken')
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
}

// Enhanced Roadmap and Resume Analysis APIs
export const analyzeResume = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/api/resume/analyze`, {
            method: 'POST',
            headers: {
                // Remove Content-Type for FormData - browser sets it automatically
                'Authorization': getAuthHeaders().Authorization || ''
            },
            body: formData
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to analyze resume')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Resume Analysis Error:', error)
        throw error
    }
}

export const getResumeRoles = async () => {
    try {
        const response = await fetch(`${API_URL}/api/resume/roles`, {
            method: 'GET',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to fetch roles')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Roles API Error:', error)
        return { success: false, roles: [] }
    }
}

export const generateEnhancedRoadmap = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/resume/enhanced`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to generate enhanced roadmap')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Enhanced Roadmap Error:', error)
        throw error
    }
}

export const saveEnhancedRoadmap = async (roadmapData) => {
    try {
        const response = await fetch(`${API_URL}/api/resume/save-enhanced`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(roadmapData)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to save enhanced roadmap')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Save Roadmap Error:', error)
        throw error
    }
}

// Original APIs (keep existing)
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