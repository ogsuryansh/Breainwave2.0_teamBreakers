import { useState, useRef } from 'react';
import { 
  Upload, FileText, Target, TrendingUp, 
  CheckCircle, XCircle, AlertCircle,
  Download, Zap, Brain, Rocket, Clock
} from 'lucide-react';
import { resumeAnalyzerService } from '../services/resumeAnalyzer';

const ResumeAnalyzer = ({ onAnalysisComplete, roadmapData }) => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('full_stack');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);
  const fileInputRef = useRef(null);

  const roleColors = {
    ev_engineer: 'from-green-500 to-emerald-600',
    data_scientist: 'from-blue-500 to-cyan-600',
    full_stack: 'from-purple-500 to-pink-600',
    ml_engineer: 'from-orange-500 to-red-600',
    cybersecurity: 'from-indigo-500 to-violet-600',
    product_manager: 'from-yellow-500 to-amber-600',
    ux_designer: 'from-pink-500 to-rose-600',
    devops: 'from-gray-500 to-slate-600'
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const analyzeResume = async () => {
    if (!file) {
      alert('Please select a PDF file first');
      return;
    }

    setLoading(true);
    try {
      const result = await resumeAnalyzerService.analyzeResume(file, targetRole);
      
      if (result.success) {
        setAnalysisResult(result);
        
        // Generate enhanced roadmap with missing skills
        if (roadmapData) {
          const enhancedRoadmap = resumeAnalyzerService.generateRoadmapWithSkills(result, roadmapData);
          if (onAnalysisComplete) {
            onAnalysisComplete(enhancedRoadmap);
          }
        }
      } else {
        alert(result.error || 'Failed to analyze resume');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score) => {
    if (score >= 70) return 'Excellent match!';
    if (score >= 40) return 'Good potential';
    return 'Needs improvement';
  };

  const loadAvailableRoles = async () => {
    const result = await resumeAnalyzerService.getAvailableRoles();
    if (result.success) {
      setAvailableRoles(result.roles);
    }
  };

  // Load roles on component mount
  useState(() => {
    loadAvailableRoles();
  }, []);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-midnight-primary to-midnight-secondary rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Resume Gap Analyzer</h2>
          <p className="text-gray-400">Upload your resume to get personalized skill recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          {/* File Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              file 
                ? 'border-midnight-primary bg-midnight-primary/10' 
                : 'border-gray-600 hover:border-midnight-primary hover:bg-white/5'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf"
              className="hidden"
            />
            
            {file ? (
              <div className="space-y-4">
                <FileText className="w-12 h-12 text-midnight-primary mx-auto" />
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-red-400 text-sm hover:text-red-300"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-white font-medium">Drop your resume here</p>
                  <p className="text-gray-400 text-sm mt-1">
                    or click to browse (PDF only, max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Target Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Target className="w-4 h-4 inline mr-2" />
              Target Role
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setTargetRole(role.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    targetRole === role.id
                      ? `border-midnight-primary bg-gradient-to-r ${roleColors[role.id]} bg-opacity-20`
                      : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
                  }`}
                >
                  <div className="text-2xl mb-1">{role.icon}</div>
                  <div className="text-xs text-gray-300">{role.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeResume}
            disabled={!file || loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              !file || loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-midnight-primary to-midnight-secondary hover:opacity-90 hover:scale-[1.02]'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Analyze Resume
              </div>
            )}
          </button>
        </div>

        {/* Right Column - Results */}
        <div>
          {analysisResult ? (
            <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Analysis Results</h3>
                    <p className="text-gray-400 text-sm">Target: {targetRole.replace('_', ' ').toUpperCase()}</p>
                  </div>
                  <div className={`text-4xl font-bold ${getScoreColor(analysisResult.analysis.score)}`}>
                    {analysisResult.analysis.score}%
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  {getScoreMessage(analysisResult.analysis.score)} 
                  <span className="ml-2">
                    Your resume matches <strong>{analysisResult.analysis.match_count}</strong> out of{' '}
                    <strong>{analysisResult.analysis.total_target_keywords}</strong> required skills.
                  </span>
                </p>
                
                {/* Progress Bar */}
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                  <div 
                    className={`h-full bg-gradient-to-r from-midnight-primary to-midnight-secondary transition-all duration-1000`}
                    style={{ width: `${analysisResult.analysis.score}%` }}
                  ></div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {analysisResult.analysis.match_count}
                    </div>
                    <div className="text-xs text-gray-400">Skills Matched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {analysisResult.analysis.missing_keywords.length}
                    </div>
                    <div className="text-xs text-gray-400">Skills Missing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {analysisResult.resume_summary?.keyword_count || 0}
                    </div>
                    <div className="text-xs text-gray-400">Total Keywords</div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="space-y-4">
                <h4 className="font-bold text-white">Skills Breakdown</h4>
                
                {/* Present Skills */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Skills You Have ({analysisResult.analysis.matching_keywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.analysis.matching_keywords.slice(0, 10).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm border border-green-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">Skills to Learn ({analysisResult.analysis.missing_keywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.analysis.missing_keywords.slice(0, 10).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-red-900/30 text-red-300 rounded-full text-sm border border-red-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {analysisResult.recommendations && (
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-midnight-primary" />
                    <h4 className="font-bold text-white">Personalized Recommendations</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-midnight-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span dangerouslySetInnerHTML={{ __html: rec }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* Placeholder before analysis */
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 border border-dashed border-gray-700 rounded-xl">
              <FileText className="w-16 h-16 mb-4" />
              <p className="text-center mb-2">Upload your resume to see analysis</p>
              <p className="text-center text-sm">Get personalized skill recommendations and roadmap enhancements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;