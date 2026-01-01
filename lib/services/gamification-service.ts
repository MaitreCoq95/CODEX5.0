import { CERTIFICATIONS } from "./multi-norms-service"

export type Rank = "Rookie" | "Pro" | "Expert" | "Master" | "Legend"

export interface UserProgress {
  xp: number
  level: number
  rank: Rank
  nextLevelXp: number
  progress: number // 0-100
  streakDays: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date | null
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface LeaderboardEntry {
  id: string
  name: string
  company: string
  xp: number
  rank: Rank
  avatar?: string
  isCurrentUser?: boolean
}

// XP Thresholds: Level N needs N * 1000 XP (simplified)
const XP_PER_LEVEL = 1000

export const GAMIFICATION_SERVICE = {
  
  // Calculate level based on total XP
  calculateProgress(totalXp: number): UserProgress {
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
    const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL
    const nextLevelXp = level * XP_PER_LEVEL
    const progressInLevel = totalXp - currentLevelBaseXp
    const percent = (progressInLevel / XP_PER_LEVEL) * 100

    let rank: Rank = "Rookie"
    if (level >= 5) rank = "Pro"
    if (level >= 10) rank = "Expert"
    if (level >= 20) rank = "Master"
    if (level >= 50) rank = "Legend"

    return {
      xp: totalXp,
      level,
      rank,
      nextLevelXp,
      progress: Math.round(percent),
      streakDays: 12 // Fake streak for demo
    }
  },

  // Mock Badges for the demo
  getUserBadges(): Badge[] {
    return [
      {
        id: "pioneer",
        name: "Pioneer",
        description: "Membre fondateur de la plateforme",
        icon: "🚀",
        unlockedAt: new Date("2024-01-01"),
        rarity: "legendary"
      },
      {
        id: "haccp-expert",
        name: "HACCP Expert",
        description: "Maîtrise totale de la sécurité alimentaire",
        icon: "🍽️",
        unlockedAt: new Date("2024-03-15"),
        rarity: "epic"
      },
      {
        id: "cyber-guardian",
        name: "Cyber Guardian",
        description: "Certification ISO 27001 validée",
        icon: "🛡️",
        unlockedAt: new Date("2024-02-20"),
        rarity: "rare"
      },
      {
        id: "quiz-master",
        name: "Quiz Master",
        description: "100 réponses correctes aux assessments",
        icon: "🧠",
        unlockedAt: null, // Locked
        rarity: "epic"
      }
    ]
  },

  // Mock Leaderboard for the demo
  getLeaderboard(): LeaderboardEntry[] {
    return [
      { id: "1", name: "Sophie Martin", company: "PharmaCorp", xp: 15400, rank: "Master" },
      { id: "2", name: "Thomas Dubois", company: "LogiTrans", xp: 12300, rank: "Expert" },
      { id: "me", name: "Vous", company: "Votre Entreprise", xp: 9500, rank: "Expert", isCurrentUser: true }, // Level 10 close to 11
      { id: "3", name: "Marie L.", company: "FoodIndustry", xp: 8200, rank: "Pro" },
      { id: "4", name: "Jean P.", company: "AeroSec", xp: 7500, rank: "Pro" },
    ]
  }
}
