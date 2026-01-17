import pdfplumber
import re
from typing import List, Dict

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF file"""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""
    return text

def extract_keywords(text: str) -> List[str]:
    """Extract technical keywords from resume text"""
    # Common technical keywords in resumes
    technical_keywords = [
        # Programming Languages
        'python', 'javascript', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift',
        'typescript', 'html', 'css', 'sql', 'r', 'matlab', 'kotlin', 'dart',
        
        # Frameworks & Libraries
        'react', 'angular', 'vue', 'node', 'django', 'flask', 'express', 'spring',
        'laravel', 'rails', 'tensorflow', 'pytorch', 'keras', 'scikit-learn',
        'numpy', 'pandas', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
        
        # Tools & Technologies
        'git', 'jenkins', 'ansible', 'terraform', 'jenkins', 'docker',
        'postgresql', 'mysql', 'mongodb', 'redis', 'firebase',
        'figma', 'adobe', 'photoshop', 'illustrator',
        
        # Engineering & EV specific
        'solidworks', 'autocad', 'matlab', 'simulink', 'ansys', 'catia',
        'finite element', 'cfd', 'cad', 'cam', 'ev', 'electric vehicle',
        'battery', 'bms', 'motor controller', 'powertrain',
        
        # Soft Skills
        'leadership', 'teamwork', 'communication', 'problem solving',
        'project management', 'agile', 'scrum', 'kanban'
    ]
    
    text_lower = text.lower()
    found_keywords = []
    
    for keyword in technical_keywords:
        if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
            found_keywords.append(keyword)
    
    return found_keywords

def calculate_resume_score(resume_keywords: List[str], target_keywords: List[str]) -> Dict:
    """Calculate match percentage between resume and target keywords"""
    if not target_keywords:
        return {"score": 0, "missing": [], "present": []}
    
    resume_set = set(resume_keywords)
    target_set = set(target_keywords)
    
    matching_keywords = list(resume_set.intersection(target_set))
    missing_keywords = list(target_set - resume_set)
    
    score = (len(matching_keywords) / len(target_set)) * 100 if target_set else 0
    
    return {
        "score": round(score, 2),
        "matching_keywords": matching_keywords,
        "missing_keywords": missing_keywords,
        "match_count": len(matching_keywords),
        "total_target_keywords": len(target_set)
    }

def get_target_keywords_by_role(role: str) -> List[str]:
    """Get target keywords for specific roles"""
    role_keywords = {
        "ev_engineer": [
            'matlab', 'simulink', 'solidworks', 'ansys', 'catia',
            'electric vehicle', 'battery', 'bms', 'powertrain',
            'cfd', 'cad', 'python', 'c++', 'control systems',
            'motor design', 'thermal management'
        ],
        "data_scientist": [
            'python', 'r', 'sql', 'machine learning', 'deep learning',
            'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn',
            'statistics', 'data visualization', 'tableau', 'powerbi'
        ],
        "full_stack": [
            'javascript', 'react', 'node', 'express', 'mongodb',
            'postgresql', 'html', 'css', 'typescript', 'docker',
            'aws', 'git', 'rest api', 'graphql'
        ],
        "ml_engineer": [
            'python', 'tensorflow', 'pytorch', 'mlops', 'docker',
            'kubernetes', 'aws', 'gcp', 'huggingface', 'transformer',
            'computer vision', 'nlp', 'reinforcement learning'
        ],
        "cybersecurity": [
            'python', 'linux', 'wireshark', 'metasploit', 'burp suite',
            'network security', 'penetration testing', 'siem', 'soc',
            'firewall', 'encryption', 'cryptography'
        ]
    }
    
    return role_keywords.get(role.lower(), [])