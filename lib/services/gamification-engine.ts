// Gamification Service
// Handles XP, levels, badges, achievements, streaks, and leaderboards

// Types
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  category: string
  criteria: string
  xpReward: number
  obtainedAt?: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  category: string
  icon: string
  xpReward: number
  progress: number
  maxProgress: number
  unlockedAt?: Date
}

export interface Streak {
  current: number
  longest: number
  lastActivityAt: Date
  streakStartedAt: Date
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  avatar?: string
  xp: number
  level: number
  modulesCompleted: number
  isCurrentUser?: boolean
}

export interface GamificationProfile {
  userId: string
  totalXp: number
  currentLevel: number
  levelProgress: number
  xpToNextLevel: number
  badges: Badge[]
  achievements: Achievement[]
  streak: Streak
  leaderboardPosition: {
    team?: number
    organization?: number
  }
}

// XP Levels configuration
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  300,    // Level 3
  600,    // Level 4
  1000,   // Level 5
  1500,   // Level 6
  2100,   // Level 7
  2800,   // Level 8
  3600,   // Level 9
  4500,   // Level 10
  5500,   // Level 11
  6600,   // Level 12
  7800,   // Level 13
  9100,   // Level 14
  10500,  // Level 15
  12000,  // Level 16
  13600,  // Level 17
  15300,  // Level 18
  17100,  // Level 19
  19000,  // Level 20
]

// Available badges
export const ALL_BADGES: Badge[] = [
  // Common
  { id: "first-step", name: "Premier Pas", description: "Complétez votre premier module", icon: "🎯", rarity: "common", category: "Learning", criteria: "Complete 1 module", xpReward: 50 },
  { id: "quiz-ace", name: "As du Quiz", description: "Obtenez 100% à un quiz", icon: "⭐", rarity: "common", category: "Quiz", criteria: "100% on a quiz", xpReward: 75 },
  { id: "streak-3", name: "3 Jours Consécutifs", description: "Maintenez un streak de 3 jours", icon: "🔥", rarity: "common", category: "Streak", criteria: "3-day streak", xpReward: 50 },
  
  // Rare
  { id: "module-master-5", name: "Maître des Modules", description: "Complétez 5 modules", icon: "📚", rarity: "rare", category: "Learning", criteria: "Complete 5 modules", xpReward: 150 },
  { id: "streak-7", name: "Semaine en Feu", description: "Maintenez un streak de 7 jours", icon: "🔥", rarity: "rare", category: "Streak", criteria: "7-day streak", xpReward: 100 },
  { id: "perfect-section", name: "Section Parfaite", description: "100% sur une section d'assessment", icon: "💎", rarity: "rare", category: "Assessment", criteria: "100% on a section", xpReward: 125 },
  
  // Epic
  { id: "gdp-fundamentals", name: "Fondamentaux GDP", description: "Complétez le parcours fondamentaux GDP", icon: "🏅", rarity: "epic", category: "Certification", criteria: "Complete GDP fundamentals path", xpReward: 300 },
  { id: "streak-30", name: "Mois de Feu", description: "Maintenez un streak de 30 jours", icon: "🌟", rarity: "epic", category: "Streak", criteria: "30-day streak", xpReward: 500 },
  { id: "cold-chain-master", name: "Maître Chaîne du Froid", description: "Excellence en gestion de la chaîne du froid", icon: "❄️", rarity: "epic", category: "Competency", criteria: "90%+ in cold chain modules", xpReward: 350 },
  
  // Legendary
  { id: "gdp-certified", name: "Certifié GDP", description: "Obtenez la certification GDP officielle", icon: "🏆", rarity: "legendary", category: "Certification", criteria: "Obtain GDP certification", xpReward: 1000 },
  { id: "streak-100", name: "Légende du Streak", description: "Maintenez un streak de 100 jours", icon: "🌋", rarity: "legendary", category: "Streak", criteria: "100-day streak", xpReward: 1500 },
  { id: "all-modules", name: "Encyclopédie Vivante", description: "Complétez tous les modules disponibles", icon: "📖", rarity: "legendary", category: "Learning", criteria: "Complete all modules", xpReward: 2000 },
]

// Achievements
export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: "first-login", name: "Bienvenue!", description: "Première connexion à la plateforme", category: "General", icon: "👋", xpReward: 25, progress: 1, maxProgress: 1 },
  { id: "complete-profile", name: "Profil Complet", description: "Remplissez votre profil à 100%", category: "General", icon: "📝", xpReward: 50, progress: 0, maxProgress: 1 },
  { id: "first-quiz", name: "Premier Quiz", description: "Passez votre premier quiz", category: "Learning", icon: "❓", xpReward: 50, progress: 0, maxProgress: 1 },
  { id: "quiz-master-10", name: "Quiz Master", description: "Réussissez 10 quiz", category: "Learning", icon: "🎓", xpReward: 200, progress: 0, maxProgress: 10 },
  { id: "social-butterfly", name: "Papillon Social", description: "Rejoignez 3 discussions", category: "Social", icon: "🦋", xpReward: 75, progress: 0, maxProgress: 3 },
  { id: "helper", name: "Bienfaiteur", description: "Aidez 5 collègues avec vos réponses", category: "Social", icon: "🤝", xpReward: 150, progress: 0, maxProgress: 5 },
  { id: "speed-learner", name: "Apprenant Rapide", description: "Complétez un module en moins de 30 min", category: "Learning", icon: "⚡", xpReward: 100, progress: 0, maxProgress: 1 },
  { id: "perfectionist", name: "Perfectionniste", description: "Obtenez 5 scores de 100%", category: "Quiz", icon: "💯", xpReward: 250, progress: 0, maxProgress: 5 },
]

// Gamification Engine
export class GamificationEngine {
  
  /**
   * Calculate level from total XP
   */
  calculateLevel(totalXp: number): { level: number; progress: number; xpToNext: number } {
    let level = 1
    
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (totalXp >= LEVEL_THRESHOLDS[i]) {
        level = i + 1
      } else {
        break
      }
    }
    
    const currentLevelXp = LEVEL_THRESHOLDS[level - 1] || 0
    const nextLevelXp = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 2000
    const xpInCurrentLevel = totalXp - currentLevelXp
    const xpNeeded = nextLevelXp - currentLevelXp
    
    return {
      level,
      progress: Math.round((xpInCurrentLevel / xpNeeded) * 100),
      xpToNext: nextLevelXp - totalXp,
    }
  }
  
  /**
   * Calculate streak from activity dates
   */
  calculateStreak(activityDates: Date[]): Streak {
    if (activityDates.length === 0) {
      return {
        current: 0,
        longest: 0,
        lastActivityAt: new Date(),
        streakStartedAt: new Date(),
      }
    }
    
    // Sort dates descending
    const sorted = [...activityDates].sort((a, b) => b.getTime() - a.getTime())
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let lastDate: Date | null = null
    let streakStart = sorted[0]
    
    for (const date of sorted) {
      const d = new Date(date)
      d.setHours(0, 0, 0, 0)
      
      if (!lastDate) {
        tempStreak = 1
        lastDate = d
      } else {
        const diff = (lastDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
        if (diff === 1) {
          tempStreak++
          streakStart = d
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 1
          streakStart = d
        }
        lastDate = d
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak)
    
    // Check if streak is still active (activity today or yesterday)
    const mostRecent = new Date(sorted[0])
    mostRecent.setHours(0, 0, 0, 0)
    const daysSinceActivity = (today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24)
    
    if (daysSinceActivity <= 1) {
      currentStreak = tempStreak
    }
    
    return {
      current: currentStreak,
      longest: longestStreak,
      lastActivityAt: sorted[0],
      streakStartedAt: streakStart,
    }
  }
  
  /**
   * Check and award badges based on user activity
   */
  checkBadgeEligibility(
    completedModules: number,
    quizScores: number[],
    streakDays: number,
    hasCertification: boolean
  ): Badge[] {
    const earnedBadges: Badge[] = []
    
    // Module badges
    if (completedModules >= 1) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "first-step")!, obtainedAt: new Date() })
    }
    if (completedModules >= 5) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "module-master-5")!, obtainedAt: new Date() })
    }
    
    // Quiz badges
    if (quizScores.some(s => s === 100)) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "quiz-ace")!, obtainedAt: new Date() })
    }
    
    // Streak badges
    if (streakDays >= 3) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "streak-3")!, obtainedAt: new Date() })
    }
    if (streakDays >= 7) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "streak-7")!, obtainedAt: new Date() })
    }
    if (streakDays >= 30) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "streak-30")!, obtainedAt: new Date() })
    }
    
    // Certification badge
    if (hasCertification) {
      earnedBadges.push({ ...ALL_BADGES.find(b => b.id === "gdp-certified")!, obtainedAt: new Date() })
    }
    
    return earnedBadges.filter(Boolean)
  }
  
  /**
   * Build leaderboard from user data
   */
  buildLeaderboard(
    users: { userId: string; userName: string; avatar?: string; xp: number; modulesCompleted: number }[],
    currentUserId: string
  ): LeaderboardEntry[] {
    const sorted = [...users].sort((a, b) => b.xp - a.xp)
    
    return sorted.map((user, index) => ({
      rank: index + 1,
      userId: user.userId,
      userName: user.userName,
      avatar: user.avatar,
      xp: user.xp,
      level: this.calculateLevel(user.xp).level,
      modulesCompleted: user.modulesCompleted,
      isCurrentUser: user.userId === currentUserId,
    }))
  }
  
  /**
   * Get rarity color for badges
   */
  getRarityColor(rarity: Badge["rarity"]): string {
    const colors = {
      common: "bg-gray-500/10 text-gray-500 border-gray-500/30",
      rare: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      epic: "bg-purple-500/10 text-purple-500 border-purple-500/30",
      legendary: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    }
    return colors[rarity]
  }
  
  /**
   * XP rewards configuration
   */
  getXpRewards() {
    return {
      moduleComplete: 100,
      quizPass: 75,
      quizPerfect: 150,
      assessmentComplete: 200,
      dailyLogin: 10,
      streakBonus: (days: number) => Math.min(days * 5, 50),
      helpAnswer: 25,
      badgeEarned: (badge: Badge) => badge.xpReward,
    }
  }
}

// Export singleton
export const gamificationEngine = new GamificationEngine()
