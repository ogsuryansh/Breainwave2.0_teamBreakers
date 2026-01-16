import https from 'https';

const API_KEY = process.env.ONDEMAND_API_KEY;
const ENDPOINT_ID = 'predefined-openai-gpt4.1-nano';

export const generateRoadmapWithAI = async (branch, semester, interests) => {
  console.log(`🎯 Generating AI roadmap for ${branch} (${semester}) interested in: ${interests.join(', ')}`);

  return new Promise((resolve, reject) => {
    const prompt = `
    Generate a highly detailed and personalized 6-month academic and career roadmap for a student with the following profile:
    - Branch: ${branch}
    - Semester: ${semester}
    - Interests: ${interests.join(', ')}

    BE CREATIVE AND SPECIFIC. Do NOT use generic placeholders like "Project Name" or "Focus Area". 
    Instead, invent cool, unique project names (e.g., "NeuralNetwork Visualizer", "DeFi Dashboard", "EcoTrack IoT").
    
    CRITICAL REQUIREMENTS:
    1. The timeline MUST contain exactly 6 distinct months (Month 1 to Month 6).
    2. "Month 3" MUST include a milestone for "Mid-Term Examinations".
    3. "Month 6" MUST include a milestone for "End-Term Examinations".
    4. Each month must have a unique, catchy title related to the specific technology or skill being learned that month.
    
    Return ONLY a valid JSON object with the following structure. Do NOT include any markdown formatting.

    {
      "studentInfo": {
        "branch": "${branch}",
        "semester": "${semester}",
        "interests": ${JSON.stringify(interests)},
        "targetRole": "suggested target role based on interests"
      },
      "hustleScore": 85,
      "targetRole": "same suggested target role",
      "timeline": [
        {
          "month": "Month 1",
          "title": "Specific Tech Focus (e.g., React & Tailwind)",
          "description": "Detailed description of what to learn.",
          "milestones": [
            { "title": "Specific task 1", "completed": false },
            { "title": "Specific task 2", "completed": false }
          ]
        },
        {
          "month": "Month 2",
          "title": "Advanced Concepts",
          "description": "Description...",
          "milestones": []
        },
        {
          "month": "Month 3",
          "title": "Mid-Term & Project Phase 1",
          "description": "Balancing academics and projects.",
          "milestones": [
             { "title": "Mid-Term Examinations", "completed": false },
             { "title": "Project Phase 1 Submission", "completed": false }
          ]
        },
        { "month": "Month 4", "title": "...", "description": "...", "milestones": [] },
        { "month": "Month 5", "title": "...", "description": "...", "milestones": [] },
        {
          "month": "Month 6",
          "title": "Final Deployment & End-Terms",
          "description": "Wrapping up projects and exams.",
          "milestones": [
             { "title": "End-Term Examinations", "completed": false },
             { "title": "Deploy Final Capstone", "completed": false }
          ]
        }
      ],
      "skills": ["List of 6-8 relevant specific skills"],
      "projects": [
        {
          "name": "Unique Project Name",
          "description": "Description of the project and tech stack.",
          "difficulty": "Medium",
          "duration": "4 weeks"
        },
        {
          "name": "Another Unique Project",
          "description": "Description.",
          "difficulty": "Hard",
          "duration": "6 weeks"
        }
      ],
      "resources": [
        { "title": "Real Resource Name", "url": "https://actual-url.com", "type": "Course/Article" }
      ]
    }
    `;

    const requestData = JSON.stringify({
      query: prompt,
      endpointId: ENDPOINT_ID,
      responseMode: "sync",
      maxTokens: 5000
    });

    const options = {
      hostname: 'api.on-demand.io',
      path: '/chat/v1/sessions/query',
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`API Request failed with status code ${res.statusCode}`);
          console.error('Points to check: API Key validity, Endpoint availability, Quota limits');
          return resolve(getMockRoadmap(branch, semester, interests));
        }

        try {
          const response = JSON.parse(body);
          if (response.data && response.data.answer) {
            let answerText = response.data.answer;

            // Aggressive cleanup
            answerText = answerText.replace(/```json/g, '')
              .replace(/```/g, '')
              .trim();

            // Attempt to remove trailing commas (common LLM JSON error)
            answerText = answerText.replace(/,(\s*[}\]])/g, '$1');

            const firstOpen = answerText.indexOf('{');
            const lastClose = answerText.lastIndexOf('}');

            if (firstOpen !== -1 && lastClose !== -1) {
              answerText = answerText.substring(firstOpen, lastClose + 1);

              try {
                const roadmap = JSON.parse(answerText);
                console.log('✅ Successfully generated roadmap via OnDemand API');
                resolve(roadmap);
              } catch (parseError) {
                console.error("JSON Parse Error:", parseError.message);
                console.log("Raw AI Response (Partial):", answerText.substring(0, 500) + "...");
                // Retry with safe evaluation if simple parse fails (dangerous but effective for slightly malformed JSON)
                // For now, falling back to mock is safer than eval()
                throw parseError;
              }
            } else {
              throw new Error('No JSON object found in response');
            }
          } else {
            throw new Error('Invalid API response structure');
          }
        } catch (error) {
          console.error('Error parsing AI response:', error);
          console.log('Falling back to mock data due to AI error.');
          // console.log('Full Raw Body:', body); // Uncomment for deep debugging
          resolve(getMockRoadmap(branch, semester, interests));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      resolve(getMockRoadmap(branch, semester, interests));
    });

    req.write(requestData);
    req.end();
  });
};

// Fallback Mock Function (kept for reliability)
const getMockRoadmap = (branch, semester, interests) => {
  const safeInterests = interests && interests.length > 0 ? interests : ["Tech", "Innovation"];
  const primary = safeInterests[0];
  const semesterNum = parseInt(semester.match(/\d+/)?.[0] || "3");

  // Calculate hustle score
  const baseScore = 70;
  const semesterBonus = (8 - semesterNum) * 2;
  const interestBonus = interests.length * 3;
  const hustleScore = Math.min(95, Math.max(65, baseScore + semesterBonus + interestBonus));

  return {
    studentInfo: {
      branch,
      semester,
      interests,
      targetRole: `${primary} Specialist`
    },
    hustleScore,
    targetRole: `Senior ${primary} Engineer`,
    timeline: [
      {
        month: "Month 1",
        title: "Foundations & Basics",
        description: `Build strong foundation in ${branch} and ${primary}.`,
        milestones: [
          { title: "Complete introductory course", completed: false },
          { title: "Join related college society", completed: false }
        ]
      },
      {
        month: "Month 2",
        title: "Deep Dive & Practice",
        description: "Advanced topics and small projects.",
        milestones: [
          { title: "Build first mini-project", completed: false },
          { title: "Read documentation", completed: false }
        ]
      },
      {
        month: "Month 3",
        title: "Mid-Terms & Core Concepts",
        description: "Balancing academic exams with project work.",
        milestones: [
          { title: "Mid-Term Examinations", "completed": false },
          { title: "Review core academic subjects", completed: false }
        ]
      },
      {
        month: "Month 4",
        title: "Advanced Projects",
        description: "Start working on significant portfolio pieces.",
        milestones: [
          { title: "Start major side project", completed: false },
          { title: "Contribute to open source", completed: false }
        ]
      },
      {
        month: "Month 5",
        title: "Pre-Exam Prep & Polish",
        description: "Refining skills and preparing for final assessments.",
        milestones: [
          { title: "Polish project documentation", completed: false },
          { title: "Prepare for end-term subjects", completed: false }
        ]
      },
      {
        month: "Month 6",
        title: "End-Term Exams & Review",
        description: "Final examinations and semester review.",
        milestones: [
          { title: "End-Term Examinations", "completed": false },
          { title: "Plan for next semester", completed: false }
        ]
      }
    ],
    skills: [primary, "Problem Solving", "Git"],
    projects: [
      {
        name: `${primary} Starter Project`,
        description: "A beginner friendly project to get started.",
        difficulty: "Easy",
        duration: "2 weeks"
      }
    ],
    resources: [
      { title: "Official Documentation", url: "https://google.com", type: "Docs" }
    ]
  };
}
