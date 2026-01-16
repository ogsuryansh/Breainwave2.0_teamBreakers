# Campus Hustle Backend

Node.js/Express backend for generating personalized student roadmaps.

## Setup

```bash
npm install
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### POST /api/roadmap/generate

Generate a personalized 6-month roadmap.

**Request Body:**
```json
{
  "branch": "CSE",
  "semester": "1st",
  "interests": ["Coding", "AI/ML", "Web Dev"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "timeline": [...],
    "metrics": {
      "hustleScore": 85,
      "cgpaRisk": 45,
      "timeCommitment": "20-30 hrs/week",
      "difficulty": "High"
    },
    "branch": "CSE",
    "semester": "1st",
    "interests": ["Coding", "AI/ML", "Web Dev"]
  }
}
```

## Environment Variables

Create a `.env` file:
```
PORT=5000
NODE_ENV=development
```

## Project Structure

```
backend/
├── server.js           # Main server file
├── routes/             # API routes
├── controllers/        # Business logic
├── utils/              # Helper functions
└── data/               # Templates and data
```
