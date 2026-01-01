import { NextResponse } from "next/server"
import { gamificationEngine, ALL_BADGES, ALL_ACHIEVEMENTS } from "@/lib/services/gamification-engine"

// Mock gamification profile
const mockProfile = {
  userId: "user-123",
  totalXp: 2450,
  streak: {
    current: 7,
    longest: 14,
    lastActivityAt: new Date().toISOString(),
    streakStartedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  badges: [
    { ...ALL_BADGES[0], obtainedAt: new Date("2024-12-10").toISOString() }, // first-step
    { ...ALL_BADGES[1], obtainedAt: new Date("2024-12-12").toISOString() }, // quiz-ace
    { ...ALL_BADGES[2], obtainedAt: new Date("2024-12-08").toISOString() }, // streak-3
    { ...ALL_BADGES[4], obtainedAt: new Date("2024-12-14").toISOString() }, // streak-7
  ],
  achievements: [
    { ...ALL_ACHIEVEMENTS[0], unlockedAt: new Date("2024-12-05").toISOString() }, // first-login
    { ...ALL_ACHIEVEMENTS[2], unlockedAt: new Date("2024-12-08").toISOString() }, // first-quiz
    { ...ALL_ACHIEVEMENTS[3], progress: 6 }, // quiz-master-10
    { ...ALL_ACHIEVEMENTS[7], progress: 2 }, // perfectionist
  ],
  leaderboardPosition: {
    team: 4,
    organization: 28,
  },
}

export async function GET(request: Request) {
  try {
    // Calculate level from XP
    const levelInfo = gamificationEngine.calculateLevel(mockProfile.totalXp)

    const profile = {
      ...mockProfile,
      currentLevel: levelInfo.level,
      levelProgress: levelInfo.progress,
      xpToNextLevel: levelInfo.xpToNext,
    }

    // TODO: Fetch from database
    // const profile = await prisma.gamificationProfile.findUnique({
    //   where: { userId: user.id },
    //   include: { badges: true, achievements: true }
    // })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching gamification profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch gamification profile" },
      { status: 500 }
    )
  }
}

// POST - Award XP or badge
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, value } = body

    // Calculate XP reward based on action
    const rewards = gamificationEngine.getXpRewards()
    let xpEarned = 0

    switch (action) {
      case "module_complete":
        xpEarned = rewards.moduleComplete
        break
      case "quiz_pass":
        xpEarned = rewards.quizPass
        break
      case "quiz_perfect":
        xpEarned = rewards.quizPerfect
        break
      case "daily_login":
        xpEarned = rewards.dailyLogin
        break
      default:
        xpEarned = value || 0
    }

    // TODO: Update in database
    // await prisma.gamificationProfile.update({
    //   where: { userId: user.id },
    //   data: { totalXp: { increment: xpEarned } }
    // })

    return NextResponse.json({
      success: true,
      xpEarned,
      newTotalXp: mockProfile.totalXp + xpEarned,
    })
  } catch (error) {
    console.error("Error updating gamification:", error)
    return NextResponse.json(
      { error: "Failed to update gamification" },
      { status: 500 }
    )
  }
}
