// Adaptive Learning Engine Service
// Handles personalized learning paths, competency tracking, and recommendations

// Types
export interface UserLearningProfile {
  userId: string
  currentLevel: {
    overall: number
    byCategory: { categoryId: string; categoryName: string; level: number }[]
  }
  learningStyle: {
    preferredContentType: ("text" | "video" | "interactive")[]
    avgSessionDuration: number
    pace: "slow" | "medium" | "fast"
  }
  strengths: string[]
  weaknesses: string[]
  recommendedModules: string[]
  lastAssessment?: {
    date: Date
    score: number
    gaps: string[]
  }
}

export interface LearningPath {
  id: string
  userId: string
  goal: string
  certification: string
  targetDate?: Date
  modules: LearningPathModule[]
  milestones: Milestone[]
  progress: PathProgress
}

export interface LearningPathModule {
  moduleId: string
  moduleTitle: string
  order: number
  status: "locked" | "available" | "in_progress" | "completed"
  startedAt?: Date
  completedAt?: Date
  score?: number
  mandatory: boolean
  estimatedDuration: number
  category: string
}

export interface Milestone {
  order: number
  title: string
  description: string
  requiredModules: string[]
  completed: boolean
  completedAt?: Date
  reward?: {
    type: "badge" | "xp" | "certification"
    value: string | number
  }
}

export interface PathProgress {
  overallProgress: number
  modulesCompleted: number
  totalModules: number
  estimatedTimeRemaining: number
  onTrack: boolean
  nextModule?: string
}

export interface Competency {
  id: string
  name: string
  category: string
  description: string
  currentLevel: number
  targetLevel: number
  linkedModules: string[]
}

export interface QuizQuestion {
  id: string
  text: string
  type: "single_choice" | "multiple_choice" | "true_false"
  options: { label: string; value: string; isCorrect: boolean }[]
  difficulty: "easy" | "medium" | "hard"
  explanation: string
  linkedContent?: string
}

export interface QuizResult {
  quizId: string
  moduleId: string
  score: number
  passed: boolean
  timeSpent: number
  questionResults: QuestionResult[]
  analysis: {
    strengths: string[]
    weaknesses: string[]
    recommendedReview: string[]
  }
  xpEarned: number
}

export interface QuestionResult {
  questionId: string
  isCorrect: boolean
  userAnswer: string[]
  correctAnswer: string[]
  explanation: string
  timeSpent: number
}

// Adaptive Learning Engine
export class AdaptiveLearningEngine {
  
  /**
   * Generate a personalized learning path based on assessment results
   */
  generatePersonalizedPath(
    userId: string,
    targetCertification: string,
    assessmentScore: number,
    gaps: string[]
  ): LearningPath {
    // Base modules for GDP certification
    const baseModules: LearningPathModule[] = [
      { moduleId: "gdp-intro", moduleTitle: "Introduction aux GDP", order: 1, status: "available", mandatory: true, estimatedDuration: 30, category: "GDP" },
      { moduleId: "quality-system", moduleTitle: "Système Qualité Pharmaceutique", order: 2, status: "locked", mandatory: true, estimatedDuration: 45, category: "GDP" },
      { moduleId: "documentation", moduleTitle: "Documentation et Traçabilité", order: 3, status: "locked", mandatory: true, estimatedDuration: 40, category: "GDP" },
      { moduleId: "cold-chain", moduleTitle: "Gestion de la Chaîne du Froid", order: 4, status: "locked", mandatory: true, estimatedDuration: 50, category: "GDP" },
      { moduleId: "transport", moduleTitle: "Transport et Livraison", order: 5, status: "locked", mandatory: true, estimatedDuration: 35, category: "GDP" },
      { moduleId: "complaints", moduleTitle: "Gestion des Réclamations", order: 6, status: "locked", mandatory: false, estimatedDuration: 30, category: "GDP" },
      { moduleId: "self-inspection", moduleTitle: "Auto-inspections", order: 7, status: "locked", mandatory: false, estimatedDuration: 25, category: "GDP" },
      { moduleId: "gdp-advanced", moduleTitle: "GDP Niveau Avancé", order: 8, status: "locked", mandatory: true, estimatedDuration: 60, category: "GDP" },
    ]

    // Reorder based on gaps - prioritize modules addressing gaps
    const gapModuleMap: Record<string, string[]> = {
      "Chaîne du Froid": ["cold-chain", "transport"],
      "Système Qualité": ["quality-system", "documentation"],
      "Traçabilité": ["documentation", "complaints"],
    }

    // Add gap-related modules as priority
    gaps.forEach(gap => {
      const modules = gapModuleMap[gap] || []
      modules.forEach(modId => {
        const mod = baseModules.find(m => m.moduleId === modId)
        if (mod) {
          mod.mandatory = true
        }
      })
    })

    // Create milestones
    const milestones: Milestone[] = [
      {
        order: 1,
        title: "Fondamentaux GDP",
        description: "Maîtrise des bases des Bonnes Pratiques de Distribution",
        requiredModules: ["gdp-intro", "quality-system"],
        completed: false,
        reward: { type: "badge", value: "gdp-fundamentals" },
      },
      {
        order: 2,
        title: "Expert Documentation",
        description: "Excellence en gestion documentaire et traçabilité",
        requiredModules: ["documentation"],
        completed: false,
        reward: { type: "xp", value: 500 },
      },
      {
        order: 3,
        title: "Maître Chaîne du Froid",
        description: "Expertise en gestion de la chaîne du froid",
        requiredModules: ["cold-chain", "transport"],
        completed: false,
        reward: { type: "badge", value: "cold-chain-master" },
      },
      {
        order: 4,
        title: "Certification GDP Prêt",
        description: "Prêt pour la certification officielle GDP",
        requiredModules: ["gdp-advanced"],
        completed: false,
        reward: { type: "certification", value: "GDP Level 1" },
      },
    ]

    // Calculate progress
    const completedModules = baseModules.filter(m => m.status === "completed").length
    const totalModules = baseModules.length
    const totalDuration = baseModules
      .filter(m => m.status !== "completed")
      .reduce((sum, m) => sum + m.estimatedDuration, 0)

    return {
      id: `path-${userId}-${Date.now()}`,
      userId,
      goal: `Obtenir certification ${targetCertification}`,
      certification: targetCertification,
      modules: baseModules,
      milestones,
      progress: {
        overallProgress: Math.round((completedModules / totalModules) * 100),
        modulesCompleted: completedModules,
        totalModules,
        estimatedTimeRemaining: Math.round(totalDuration / 60), // hours
        onTrack: true,
        nextModule: baseModules.find(m => m.status === "available")?.moduleId,
      },
    }
  }

  /**
   * Build user learning profile from activity data
   */
  buildLearningProfile(
    userId: string,
    completedModules: string[],
    quizScores: { moduleId: string; score: number }[],
    assessmentResults?: { score: number; gaps: string[] }
  ): UserLearningProfile {
    // Calculate levels by category
    const categories = ["GDP", "ISO", "HACCP", "Sécurité"]
    const byCategory = categories.map(cat => ({
      categoryId: cat.toLowerCase(),
      categoryName: cat,
      level: this.calculateCategoryLevel(quizScores, cat),
    }))

    const overallLevel = Math.round(
      byCategory.reduce((sum, c) => sum + c.level, 0) / byCategory.length
    )

    // Determine strengths and weaknesses
    const strengths = byCategory.filter(c => c.level >= 70).map(c => c.categoryName)
    const weaknesses = byCategory.filter(c => c.level < 50).map(c => c.categoryName)

    // Generate recommended modules
    const recommendedModules = this.getRecommendedModules(weaknesses, assessmentResults?.gaps || [])

    return {
      userId,
      currentLevel: {
        overall: overallLevel,
        byCategory,
      },
      learningStyle: {
        preferredContentType: ["interactive", "video"],
        avgSessionDuration: 25,
        pace: overallLevel > 70 ? "fast" : overallLevel > 40 ? "medium" : "slow",
      },
      strengths,
      weaknesses,
      recommendedModules,
      lastAssessment: assessmentResults ? {
        date: new Date(),
        score: assessmentResults.score,
        gaps: assessmentResults.gaps,
      } : undefined,
    }
  }

  /**
   * Generate an adaptive quiz for a module
   */
  generateAdaptiveQuiz(
    moduleId: string,
    userLevel: number
  ): { questions: QuizQuestion[]; passingScore: number } {
    // Determine difficulty distribution based on user level
    const difficulty = this.getDifficultyDistribution(userLevel)
    
    // Mock questions - in real implementation would fetch from database
    const questions: QuizQuestion[] = [
      {
        id: "q1",
        text: "Quelle est la plage de température acceptable pour le stockage des médicaments standards ?",
        type: "single_choice",
        options: [
          { label: "0°C - 8°C", value: "a", isCorrect: false },
          { label: "8°C - 15°C", value: "b", isCorrect: false },
          { label: "15°C - 25°C", value: "c", isCorrect: true },
          { label: "25°C - 30°C", value: "d", isCorrect: false },
        ],
        difficulty: "easy",
        explanation: "Selon les GDP, les médicaments standards doivent être stockés entre 15°C et 25°C, sauf indication contraire du fabricant.",
        linkedContent: "module-cold-chain-section-1",
      },
      {
        id: "q2",
        text: "Que devez-vous faire en cas d'excursion de température pendant le transport ?",
        type: "single_choice",
        options: [
          { label: "Ignorer si c'est moins de 30 minutes", value: "a", isCorrect: false },
          { label: "Documenter et évaluer l'impact sur les produits", value: "b", isCorrect: true },
          { label: "Retourner tous les produits au fournisseur", value: "c", isCorrect: false },
          { label: "Attendre la prochaine livraison", value: "d", isCorrect: false },
        ],
        difficulty: "medium",
        explanation: "Toute excursion de température doit être documentée et évaluée pour déterminer l'impact potentiel sur la qualité des produits.",
        linkedContent: "module-cold-chain-section-3",
      },
      {
        id: "q3",
        text: "Combien de temps les enregistrements de distribution doivent-ils être conservés ?",
        type: "single_choice",
        options: [
          { label: "1 an", value: "a", isCorrect: false },
          { label: "3 ans", value: "b", isCorrect: false },
          { label: "5 ans minimum", value: "c", isCorrect: true },
          { label: "10 ans", value: "d", isCorrect: false },
        ],
        difficulty: "medium",
        explanation: "Les enregistrements de distribution doivent être conservés pendant au moins 5 ans, ou selon les exigences réglementaires locales si elles sont plus strictes.",
        linkedContent: "module-documentation-section-2",
      },
      {
        id: "q4",
        text: "La qualification des équipements de transport est-elle obligatoire selon les GDP ?",
        type: "true_false",
        options: [
          { label: "Vrai", value: "true", isCorrect: true },
          { label: "Faux", value: "false", isCorrect: false },
        ],
        difficulty: "easy",
        explanation: "Oui, les GDP exigent que tous les équipements de transport soient qualifiés et maintenus pour garantir le maintien des conditions requises.",
        linkedContent: "module-transport-section-1",
      },
      {
        id: "q5",
        text: "Quels éléments doivent figurer sur le bon de livraison selon les GDP ?",
        type: "multiple_choice",
        options: [
          { label: "Nom du produit", value: "a", isCorrect: true },
          { label: "Numéro de lot", value: "b", isCorrect: true },
          { label: "Date de péremption", value: "c", isCorrect: true },
          { label: "Prix unitaire", value: "d", isCorrect: false },
        ],
        difficulty: "hard",
        explanation: "Le bon de livraison doit inclure le nom du produit, le numéro de lot et la date de péremption pour assurer la traçabilité complète.",
        linkedContent: "module-documentation-section-1",
      },
    ]

    return {
      questions,
      passingScore: userLevel > 70 ? 80 : userLevel > 40 ? 70 : 60,
    }
  }

  /**
   * Calculate quiz results with detailed feedback
   */
  calculateQuizResult(
    quizId: string,
    moduleId: string,
    questions: QuizQuestion[],
    userAnswers: Record<string, string[]>,
    timeSpent: number
  ): QuizResult {
    const questionResults: QuestionResult[] = questions.map(q => {
      const userAnswer = userAnswers[q.id] || []
      const correctAnswers = q.options.filter(o => o.isCorrect).map(o => o.value)
      const isCorrect = this.checkAnswer(userAnswer, correctAnswers, q.type)

      return {
        questionId: q.id,
        isCorrect,
        userAnswer,
        correctAnswer: correctAnswers,
        explanation: q.explanation,
        timeSpent: Math.round(timeSpent / questions.length),
      }
    })

    const correctCount = questionResults.filter(r => r.isCorrect).length
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= 70

    // Analyze performance
    const incorrectQuestions = questionResults.filter(r => !r.isCorrect)
    const weaknesses = [...new Set(incorrectQuestions.map(q => 
      questions.find(quest => quest.id === q.questionId)?.linkedContent || ""
    ))].filter(Boolean)

    const correctQuestions = questionResults.filter(r => r.isCorrect)
    const strengths = [...new Set(correctQuestions.map(q =>
      questions.find(quest => quest.id === q.questionId)?.linkedContent || ""
    ))].filter(Boolean)

    return {
      quizId,
      moduleId,
      score,
      passed,
      timeSpent,
      questionResults,
      analysis: {
        strengths: strengths.slice(0, 3),
        weaknesses: weaknesses.slice(0, 3),
        recommendedReview: weaknesses,
      },
      xpEarned: passed ? (score >= 90 ? 150 : score >= 80 ? 100 : 75) : 25,
    }
  }

  // Helper methods
  private calculateCategoryLevel(quizScores: { moduleId: string; score: number }[], category: string): number {
    const categoryScores = quizScores.filter(q => q.moduleId.toLowerCase().includes(category.toLowerCase()))
    if (categoryScores.length === 0) return 30 // Default low level if no data
    return Math.round(categoryScores.reduce((sum, q) => sum + q.score, 0) / categoryScores.length)
  }

  private getRecommendedModules(weaknesses: string[], gaps: string[]): string[] {
    const recommendations: string[] = []
    
    if (gaps.includes("Chaîne du Froid") || weaknesses.includes("GDP")) {
      recommendations.push("cold-chain", "transport")
    }
    if (gaps.includes("Traçabilité") || gaps.includes("Documentation")) {
      recommendations.push("documentation")
    }
    if (gaps.includes("Système Qualité")) {
      recommendations.push("quality-system", "self-inspection")
    }

    return [...new Set(recommendations)]
  }

  private getDifficultyDistribution(userLevel: number): { easy: number; medium: number; hard: number } {
    if (userLevel >= 80) return { easy: 10, medium: 40, hard: 50 }
    if (userLevel >= 60) return { easy: 20, medium: 50, hard: 30 }
    if (userLevel >= 40) return { easy: 30, medium: 50, hard: 20 }
    return { easy: 50, medium: 40, hard: 10 }
  }

  private checkAnswer(userAnswer: string[], correctAnswer: string[], type: string): boolean {
    if (type === "multiple_choice") {
      return userAnswer.length === correctAnswer.length &&
        userAnswer.every(a => correctAnswer.includes(a))
    }
    return userAnswer[0] === correctAnswer[0]
  }
}

// Export singleton
export const adaptiveLearningEngine = new AdaptiveLearningEngine()
