import os
import tempfile
import uuid
from fastapi import UploadFile
from utils.pdfParser import (
    extract_text_from_pdf, 
    extract_keywords, 
    calculate_resume_score,
    get_target_keywords_by_role
)

class ResumeAnalyzerService:
    def __init__(self):
        self.upload_dir = "uploads/resumes"
        os.makedirs(self.upload_dir, exist_ok=True)
    
    async def analyze_resume(self, file: UploadFile, target_role: str) -> dict:
        """Main function to analyze resume"""
        try:
            # Save uploaded file temporarily
            file_id = str(uuid.uuid4())
            temp_path = os.path.join(self.upload_dir, f"{file_id}.pdf")
            
            with open(temp_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            # Extract text and analyze
            text = extract_text_from_pdf(temp_path)
            if not text:
                return {"error": "Could not extract text from PDF"}
            
            resume_keywords = extract_keywords(text)
            target_keywords = get_target_keywords_by_role(target_role)
            
            analysis_result = calculate_resume_score(resume_keywords, target_keywords)
            
            # Clean up temp file
            try:
                os.remove(temp_path)
            except:
                pass
            
            return {
                "success": True,
                "analysis": analysis_result,
                "resume_summary": {
                    "word_count": len(text.split()),
                    "keyword_count": len(resume_keywords)
                },
                "recommendations": self._generate_recommendations(analysis_result, target_role)
            }
            
        except Exception as e:
            return {"error": str(e)}
    
    def _generate_recommendations(self, analysis: dict, target_role: str) -> list:
        """Generate personalized recommendations"""
        recommendations = []
        score = analysis["score"]
        
        if score < 30:
            recommendations.append(f"Your resume is <strong>{score}%</strong> aligned with {target_role.replace('_', ' ').title()} role")
            recommendations.append("Consider taking foundational courses in core technologies")
            recommendations.append("Build 2-3 projects showcasing required skills")
        elif score < 60:
            recommendations.append(f"Good start! Your resume is <strong>{score}%</strong> aligned")
            recommendations.append("Focus on gaining practical experience with missing skills")
            recommendations.append("Add certifications and detailed project descriptions")
        else:
            recommendations.append(f"Excellent! Your resume is <strong>{score}%</strong> aligned")
            recommendations.append("Consider adding leadership experiences and complex projects")
            recommendations.append("Highlight specific achievements with metrics")
        
        # Add specific skill recommendations
        if analysis["missing_keywords"]:
            recommendations.append(f"<strong>Missing Skills:</strong> {', '.join(analysis['missing_keywords'][:5])}")
        
        return recommendations