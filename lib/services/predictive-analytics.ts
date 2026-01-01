// Predictive Analytics Service
// Risk prediction, trend analysis, and user detection

export interface RiskPrediction {
  riskLevel: "low" | "medium" | "high"
  probability: number
  factors: string[]
  recommendations: string[]
}

export interface AtRiskUser {
  userId: string
  userName: string
  email: string
  riskScore: number
  riskFactors: string[]
  suggestedActions: string[]
  lastActivity: Date
  daysInactive: number
}

export interface MaturityProjection {
  currentScore: number
  projectedScore: number
  confidence: number
  trend: "improving" | "stable" | "declining"
  assumptions: string[]
  recommendations: string[]
}

export interface TrendAnalysis {
  metric: string
  currentValue: number
  previousValue: number
  changePercent: number
  trend: "up" | "down" | "stable"
  forecast: number[]
}

export class PredictiveAnalyticsService {
  
  /**
   * Predict certification risk for a user
   */
  async predictCertificationRisk(
    userId: string,
    certificationId: string,
    userData: {
      currentProgress: number
      quizScores: number[]
      daysActive: number
      averageSessionDuration: number
      completedModules: number
      totalModules: number
    }
  ): Promise<RiskPrediction> {
    // Calculate base risk factors
    const factors: string[] = []
    let riskScore = 0
    
    // Progress factor (weight: 35%)
    const progressScore = userData.currentProgress
    if (progressScore < 30) {
      factors.push("Progression insuffisante dans le parcours")
      riskScore += 35
    } else if (progressScore < 60) {
      factors.push("Progression modérée - besoin d'accélération")
      riskScore += 20
    }
    
    // Quiz performance factor (weight: 25%)
    const avgQuizScore = userData.quizScores.length > 0
      ? userData.quizScores.reduce((a, b) => a + b, 0) / userData.quizScores.length
      : 0
    if (avgQuizScore < 60) {
      factors.push("Scores de quiz inférieurs à la moyenne")
      riskScore += 25
    } else if (avgQuizScore < 75) {
      factors.push("Scores de quiz à améliorer")
      riskScore += 15
    }
    
    // Engagement factor (weight: 20%)
    if (userData.daysActive < 7) {
      factors.push("Faible nombre de jours d'activité")
      riskScore += 20
    } else if (userData.daysActive < 14) {
      factors.push("Engagement irrégulier")
      riskScore += 10
    }
    
    // Session duration factor (weight: 20%)
    if (userData.averageSessionDuration < 10) {
      factors.push("Sessions trop courtes pour un apprentissage efficace")
      riskScore += 20
    } else if (userData.averageSessionDuration < 20) {
      factors.push("Sessions pourraient être plus longues")
      riskScore += 10
    }
    
    // Determine risk level
    let riskLevel: "low" | "medium" | "high" = "low"
    if (riskScore >= 60) {
      riskLevel = "high"
    } else if (riskScore >= 35) {
      riskLevel = "medium"
    }
    
    // Generate recommendations based on factors
    const recommendations: string[] = []
    if (progressScore < 60) {
      recommendations.push("Planifier des sessions d'apprentissage régulières")
      recommendations.push("Définir des objectifs hebdomadaires")
    }
    if (avgQuizScore < 75) {
      recommendations.push("Revoir les modules avant de passer les quiz")
      recommendations.push("Utiliser les ressources supplémentaires")
    }
    if (userData.daysActive < 14) {
      recommendations.push("Activer les rappels quotidiens")
      recommendations.push("Rejoindre un groupe d'étude")
    }
    if (userData.averageSessionDuration < 20) {
      recommendations.push("Réserver des créneaux de 30 min minimum")
      recommendations.push("Minimiser les distractions pendant l'apprentissage")
    }
    
    return {
      riskLevel,
      probability: Math.min(riskScore / 100, 0.95),
      factors: factors.length > 0 ? factors : ["Aucun facteur de risque identifié"],
      recommendations: recommendations.length > 0 ? recommendations : ["Maintenir le rythme actuel"],
    }
  }
  
  /**
   * Detect at-risk users in an organization
   */
  async detectAtRiskUsers(
    users: {
      userId: string
      userName: string
      email: string
      lastActivity: Date
      progress: number
      quizAverage: number
      modulesCompleted: number
    }[]
  ): Promise<AtRiskUser[]> {
    const now = new Date()
    const atRiskUsers: AtRiskUser[] = []
    
    for (const user of users) {
      const daysInactive = Math.floor(
        (now.getTime() - new Date(user.lastActivity).getTime()) / (1000 * 60 * 60 * 24)
      )
      
      const riskFactors: string[] = []
      const suggestedActions: string[] = []
      let riskScore = 0
      
      // Inactivity check
      if (daysInactive >= 14) {
        riskFactors.push(`Inactivité prolongée (${daysInactive} jours)`)
        suggestedActions.push("Envoyer un email de rappel personnalisé")
        riskScore += 40
      } else if (daysInactive >= 7) {
        riskFactors.push(`Inactivité (${daysInactive} jours)`)
        suggestedActions.push("Notification push de motivation")
        riskScore += 20
      }
      
      // Progress check
      if (user.progress < 20 && user.modulesCompleted === 0) {
        riskFactors.push("N'a pas commencé sa formation")
        suggestedActions.push("Planifier un appel d'onboarding")
        riskScore += 30
      } else if (user.progress < 40) {
        riskFactors.push("Progression lente")
        suggestedActions.push("Proposer un plan de rattrapage")
        riskScore += 15
      }
      
      // Quiz performance
      if (user.quizAverage < 50) {
        riskFactors.push("Difficultés avec les quiz")
        suggestedActions.push("Proposer une session de tutorat")
        riskScore += 25
      }
      
      // Only add users with significant risk
      if (riskScore >= 30) {
        atRiskUsers.push({
          userId: user.userId,
          userName: user.userName,
          email: user.email,
          riskScore: Math.min(riskScore, 100),
          riskFactors,
          suggestedActions,
          lastActivity: user.lastActivity,
          daysInactive,
        })
      }
    }
    
    // Sort by risk score descending
    return atRiskUsers.sort((a, b) => b.riskScore - a.riskScore)
  }
  
  /**
   * Project maturity score
   */
  async projectMaturityScore(
    historicalScores: { date: Date; score: number }[],
    monthsAhead: number
  ): Promise<MaturityProjection> {
    if (historicalScores.length < 2) {
      return {
        currentScore: historicalScores[0]?.score || 0,
        projectedScore: historicalScores[0]?.score || 0,
        confidence: 0.3,
        trend: "stable",
        assumptions: ["Données historiques insuffisantes"],
        recommendations: ["Collecter plus de données avant projection"],
      }
    }
    
    // Sort by date
    const sorted = [...historicalScores].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    
    const currentScore = sorted[sorted.length - 1].score
    const previousScore = sorted[0].score
    
    // Calculate trend
    const monthsBetween = Math.max(1, Math.ceil(
      (new Date(sorted[sorted.length - 1].date).getTime() - new Date(sorted[0].date).getTime()) 
      / (1000 * 60 * 60 * 24 * 30)
    ))
    const monthlyChange = (currentScore - previousScore) / monthsBetween
    
    // Project forward
    const projectedScore = Math.min(100, Math.max(0, 
      currentScore + (monthlyChange * monthsAhead)
    ))
    
    // Determine trend
    let trend: "improving" | "stable" | "declining"
    if (monthlyChange > 2) {
      trend = "improving"
    } else if (monthlyChange < -2) {
      trend = "declining"
    } else {
      trend = "stable"
    }
    
    // Calculate confidence based on data quality
    const dataPoints = sorted.length
    const confidence = Math.min(0.9, 0.3 + (dataPoints * 0.1))
    
    // Generate assumptions and recommendations
    const assumptions = [
      "Le rythme de progression actuel est maintenu",
      "Pas de changement majeur dans l'organisation",
      `Basé sur ${dataPoints} points de données`,
    ]
    
    const recommendations: string[] = []
    if (trend === "declining") {
      recommendations.push("Analyser les causes de la baisse")
      recommendations.push("Renforcer l'engagement des équipes")
    } else if (trend === "improving") {
      recommendations.push("Maintenir les bonnes pratiques actuelles")
      recommendations.push("Documenter les facteurs de succès")
    } else {
      recommendations.push("Identifier les leviers d'amélioration")
      recommendations.push("Fixer des objectifs plus ambitieux")
    }
    
    return {
      currentScore,
      projectedScore: Math.round(projectedScore * 10) / 10,
      confidence,
      trend,
      assumptions,
      recommendations,
    }
  }
  
  /**
   * Analyze trends for a metric
   */
  analyzeTrend(
    currentValue: number,
    previousValue: number,
    historicalValues: number[]
  ): TrendAnalysis {
    const changePercent = previousValue > 0 
      ? ((currentValue - previousValue) / previousValue) * 100 
      : 0
    
    let trend: "up" | "down" | "stable"
    if (changePercent > 5) {
      trend = "up"
    } else if (changePercent < -5) {
      trend = "down"
    } else {
      trend = "stable"
    }
    
    // Simple linear forecast
    const forecast: number[] = []
    if (historicalValues.length >= 3) {
      const avgChange = historicalValues.slice(-3).reduce((sum, v, i, arr) => {
        if (i === 0) return 0
        return sum + (v - arr[i - 1])
      }, 0) / 2
      
      for (let i = 1; i <= 3; i++) {
        forecast.push(Math.round((currentValue + avgChange * i) * 10) / 10)
      }
    }
    
    return {
      metric: "",
      currentValue,
      previousValue,
      changePercent: Math.round(changePercent * 10) / 10,
      trend,
      forecast,
    }
  }
}

// Export singleton
export const predictiveAnalyticsService = new PredictiveAnalyticsService()
