export const calculateMetrics = (branch, semester, interests) => {
    const semesterNumber = parseInt(semester.replace(/\D/g, ''))

    const hustleScore = calculateHustleScore(interests, semesterNumber)
    const cgpaRisk = calculateCGPARisk(interests.length, semesterNumber)
    const timeCommitment = calculateTimeCommitment(interests.length)
    const difficulty = calculateDifficulty(branch, interests)

    return {
        hustleScore,
        cgpaRisk,
        timeCommitment,
        difficulty
    }
}

const calculateHustleScore = (interests, semester) => {
    let score = 50

    score += interests.length * 10

    if (semester <= 2) {
        score += 10
    }

    if (interests.includes('Coding') || interests.includes('AI/ML')) {
        score += 15
    }

    return Math.min(Math.max(score, 0), 100)
}

const calculateCGPARisk = (interestCount, semester) => {
    let risk = 30

    if (interestCount > 3) {
        risk += 20
    }

    if (semester >= 3) {
        risk += 15
    }

    return Math.min(risk, 100)
}

const calculateTimeCommitment = (interestCount) => {
    const baseHours = 10
    const additionalHours = interestCount * 5

    return `${baseHours + additionalHours}-${baseHours + additionalHours + 10} hrs/week`
}

const calculateDifficulty = (branch, interests) => {
    const difficultBranches = ['CSE', 'ECE']
    const difficultInterests = ['AI/ML', 'Robotics']

    let difficulty = 'Medium'

    if (difficultBranches.includes(branch)) {
        difficulty = 'High'
    }

    const hasDifficultInterest = interests.some(interest =>
        difficultInterests.includes(interest)
    )

    if (hasDifficultInterest && difficulty === 'High') {
        difficulty = 'Very High'
    } else if (hasDifficultInterest) {
        difficulty = 'High'
    }

    return difficulty
}
