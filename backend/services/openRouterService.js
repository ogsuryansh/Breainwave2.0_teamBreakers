
// ENHANCED MOCK AI SERVICE - Production Quality
// Generates detailed, personalized roadmaps without external API dependencies

export const generateRoadmapWithAI = async (branch, semester, interests) => {
  console.log(`🎯 Generating roadmap for ${branch} (${semester}) interested in: ${interests.join(', ')}`)

  await new Promise(resolve => setTimeout(resolve, 1500));

  const safeInterests = interests && interests.length > 0 ? interests : ["Tech", "Innovation"];
  const primary = safeInterests[0];
  const secondary = safeInterests[1] || "Software Development";
  const semesterNum = parseInt(semester.match(/\d+/)?.[0] || "3");
  const isEarlySem = semesterNum <= 4;

  // Generate variation
  const inputHash = (branch + semester + interests.join('')).split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const variation = Math.abs(inputHash) % 5;

  // Calculate hustle score
  const baseScore = 70;
  const semesterBonus = (8 - semesterNum) * 2;
  const interestBonus = interests.length * 3;
  const variationOffset = (variation - 2) * 3;
  const hustleScore = Math.min(95, Math.max(65, baseScore + semesterBonus + interestBonus + variationOffset));

  const studentInfo = {
    branch: branch,
    semester: semester,
    interests: interests,
    targetRole: `${primary} Specialist`
  };

  return {
    studentInfo,
    hustleScore,
    targetRole: `Senior ${primary} Engineer / Tech Lead`,
    timeline: [
      {
        month: "Month 1",
        title: `${branch} Foundation & ${primary} Basics`,
        description: `Build strong foundation in ${branch} while exploring ${primary}. Focus on core concepts and industry applications.`,
        milestones: [
          { title: `Achieve 8.5+ CGPA in ${semester} core subjects`, completed: false },
          { title: `Complete "Introduction to ${primary}" online course`, completed: false },
          { title: "Join DTU technical society (SAE/IEEE/ACM)", completed: false },
          { title: "Set up professional GitHub profile", completed: false },
          { title: `Read 2 research papers on ${primary} trends`, completed: false },
          { title: "Connect with 20+ DTU alumni on LinkedIn", completed: false }
        ]
      },
      {
        month: "Month 2",
        title: `${primary} Project Development`,
        description: "Move from theory to practice with hands-on projects and competitive programming.",
        milestones: [
          { title: `Build complete ${primary} project with deployment`, completed: false },
          { title: "Participate in DTU hackathon", completed: false },
          { title: "Make 5 open-source contributions", completed: false },
          { title: "Solve 30 DSA problems on LeetCode", completed: false },
          { title: `Attend 2 industry webinars on ${primary}`, completed: false },
          { title: "Write 3 technical blog posts", completed: false }
        ]
      },
      {
        month: "Month 3",
        title: `Advanced ${primary} & ${secondary}`,
        description: "Deep dive into specialized topics and start building substantial portfolio.",
        milestones: [
          { title: `Complete advanced ${primary} certification`, completed: false },
          { title: `Build medium-complexity ${primary} + ${secondary} project`, completed: false },
          { title: "Apply for DTU research internship", completed: false },
          { title: "Solve 40 more DSA problems (Trees, Graphs, DP)", completed: false },
          { title: `Present project at campus tech talk`, completed: false },
          { title: `Learn ${branch}-specific tools (MATLAB/Python libs)`, completed: false }
        ]
      },
      {
        month: "Month 4",
        title: "Industry-Grade Portfolio Project",
        description: "Build substantial project showcasing end-to-end skills with clean code and documentation.",
        milestones: [
          { title: `Design system architecture for major ${primary} app`, completed: false },
          { title: "Collaborate with 3-4 peers using Git workflows", completed: false },
          { title: "Write comprehensive documentation (README, API docs)", completed: false },
          { title: "Set up CI/CD pipeline with automated testing", completed: false },
          { title: "Attend 3+ tech meetups in Delhi NCR", completed: false },
          { title: "Apply to 5 summer internships", completed: false }
        ]
      },
      {
        month: "Month 5",
        title: "Interview Preparation & Professional Branding",
        description: "Intensive prep for placements with focus on DSA, system design, and behavioral questions.",
        milestones: [
          { title: "Solve 80+ LeetCode problems (all patterns)", completed: false },
          { title: "Complete 10 mock interviews with feedback", completed: false },
          { title: "Revamp resume with quantifiable achievements", completed: false },
          { title: "Learn system design fundamentals", completed: false },
          { title: "Publish 2 in-depth technical articles (500+ views)", completed: false },
          { title: "Prepare STAR answers for 15 behavioral questions", completed: false }
        ]
      },
      {
        month: "Month 6",
        title: "Career Launch & Applications",
        description: "Final sprint for securing offers. Apply strategically and showcase portfolio.",
        milestones: [
          { title: isEarlySem ? "Secure 3+ interview calls and 1 internship offer" : "Secure 2+ job offers above campus average", completed: false },
          { title: "Launch professional portfolio website", completed: false },
          { title: "Present project at college symposium", completed: false },
          { title: "Apply to 20+ positions (FAANG + unicorns + startups)", completed: false },
          { title: "Reach 100+ LinkedIn connections", completed: false },
          { title: "Document 6-month journey in blog series", completed: false }
        ]
      }
    ],
    skills: [
      ...safeInterests,
      `${branch} Core Engineering`,
      "Data Structures & Algorithms",
      "System Design",
      "Git & Version Control",
      "Problem Solving",
      "Technical Communication",
      "Cloud Platforms (AWS/GCP)",
      "Testing & CI/CD"
    ],
    projects: [
      {
        name: `${primary} Innovation Platform`,
        description: `Production-ready application using ${branch} principles. Features auth, real-time updates, responsive design, and comprehensive testing. Solves real DTU campus problem with 100+ users.`,
        difficulty: "Hard",
        duration: "4-5 weeks"
      },
      {
        name: "DTU Campus Super App",
        description: `Mobile-first ${primary} solution integrating attendance, timetable, resources, and marketplace. Microservices backend with offline-first PWA. Team project using Agile sprints.`,
        difficulty: "Hard",
        duration: "3-4 weeks"
      },
      {
        name: `${secondary} Analytics Dashboard`,
        description: `Interactive data visualization with real-time API integration. Demonstrates full-stack skills and ${branch} analytical thinking.`,
        difficulty: "Medium",
        duration: "2-3 weeks"
      }
    ],
    resources: [
      { title: `${branch} Complete Roadmap 2025`, url: "https://roadmap.sh/software-engineer", type: "Article" },
      { title: "DTU Alumni Network", url: "https://dtu.ac.in/Web/Alumni", type: "Community" },
      { title: `Advanced ${primary} Specialization`, url: "https://coursera.org", type: "Course" },
      { title: "DSA Interview Prep - LeetCode", url: "https://leetcode.com/explore/interview", type: "Practice" },
      { title: "GitHub Student Pack", url: "https://education.github.com/pack", type: "Resource" },
      { title: "System Design Interview Guide", url: "https://www.educative.io/courses/grokking-the-system-design-interview", type: "Course" },
      { title: "Tech Interview Handbook", url: "https://techinterviewhandbook.org", type: "Guide" },
      { title: "GeeksforGeeks DSA Course", url: "https://practice.geeksforgeeks.org", type: "Practice" }
    ]
  }
}
