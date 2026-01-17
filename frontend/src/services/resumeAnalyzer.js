import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/resume';

export const resumeAnalyzerService = {
  // Upload and analyze resume
  async analyzeResume(file, targetRole) {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw error;
    }
  },

  // Get available roles
  async getAvailableRoles() {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      return { success: false, roles: [] };
    }
  },

  // Generate roadmap with missing skills
  generateRoadmapWithSkills(analysisResult, baseRoadmap) {
    const missingSkills = analysisResult.analysis?.missing_keywords || [];
    const score = analysisResult.analysis?.score || 0;

    // Add missing skills to roadmap milestones
    const enhancedRoadmap = baseRoadmap.map((month, index) => {
      if (index < 3 && missingSkills.length > 0) {
        // Distribute missing skills across first 3 months
        const skillsToAdd = missingSkills.slice(index * 2, (index + 1) * 2);
        if (skillsToAdd.length > 0) {
          return {
            ...month,
            milestones: [
              ...month.milestones,
              ...skillsToAdd.map(skill => `Learn ${skill.toUpperCase()}`)
            ]
          };
        }
      }
      return month;
    });

    return {
      enhancedRoadmap,
      missingSkills,
      resumeScore: score
    };
  }
};