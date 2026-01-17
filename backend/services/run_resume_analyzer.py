import sys
import json
from resumeAnalyzerService import ResumeAnalyzerService

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing arguments"}))
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    target_role = sys.argv[2]
    
    service = ResumeAnalyzerService()
    
    # For CLI usage, we need to mock the UploadFile
    class MockUploadFile:
        def __init__(self, file_path):
            self.file_path = file_path
        
        async def read(self):
            with open(self.file_path, 'rb') as f:
                return f.read()
    
    import asyncio
    mock_file = MockUploadFile(pdf_path)
    result = asyncio.run(service.analyze_resume(mock_file, target_role))
    
    print(json.dumps(result))