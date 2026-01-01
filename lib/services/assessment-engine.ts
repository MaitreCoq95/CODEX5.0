// Assessment Engine Service
// Handles scoring, gap analysis, and recommendations

import { AssessmentTemplate, AssessmentSession } from "@prisma/client"

// Types
export interface MaturityLevel {
  level: number
  name: string
  description: string
  minScore: number
  maxScore: number
}

export interface AssessmentAnswer {
  questionId: string
  value: string | string[] | number
  answeredAt: Date
  timeSpent: number
}

export interface SectionScore {
  sectionId: string
  sectionName: string
  score: number
  maxScore: number
  percentage: number
  weight: number
}

export interface IdentifiedGap {
  id: string
  severity: "low" | "medium" | "high" | "critical"
  category: string
  title: string
  description: string
  impactScore: number
  recommendedActions: string[]
  estimatedEffort: "low" | "medium" | "high"
  relatedModules?: string[]
}

export interface PriorityAction {
  rank: number
  action: string
  rationale: string
  quickWin: boolean
  estimatedImpact: "low" | "medium" | "high"
  category: string
}

export interface AssessmentScore {
  overallScore: number
  maturityLevel: MaturityLevel
  sectionScores: SectionScore[]
  gaps: IdentifiedGap[]
  strengths: string[]
  priorityActions: PriorityAction[]
  certificationReadiness: {
    certification: string
    readinessPercentage: number
    estimatedTimeToReady: string
    blockers: string[]
  }
}

// Default maturity levels
export const DEFAULT_MATURITY_LEVELS: MaturityLevel[] = [
  { level: 1, name: "Initial", description: "Processus ad-hoc, non documentés", minScore: 0, maxScore: 20 },
  { level: 2, name: "Géré", description: "Processus de base définis", minScore: 21, maxScore: 40 },
  { level: 3, name: "Défini", description: "Processus standardisés", minScore: 41, maxScore: 60 },
  { level: 4, name: "Maîtrisé", description: "Processus mesurés et contrôlés", minScore: 61, maxScore: 80 },
  { level: 5, name: "Optimisé", description: "Amélioration continue", minScore: 81, maxScore: 100 },
]

// Assessment Engine Class
export class AssessmentEngine {
  
  /**
   * Calculate the overall maturity score from answers
   */
  calculateMaturityScore(
    answers: AssessmentAnswer[],
    template: { sections: any[] },
    maturityLevels: MaturityLevel[] = DEFAULT_MATURITY_LEVELS
  ): AssessmentScore {
    
    const sectionScores = this.calculateSectionScores(answers, template.sections)
    const overallScore = this.calculateWeightedOverall(sectionScores)
    const maturityLevel = this.determineMaturityLevel(overallScore, maturityLevels)
    const gaps = this.identifyGaps(sectionScores, answers, template.sections)
    const strengths = this.identifyStrengths(sectionScores)
    const priorityActions = this.generatePriorityActions(gaps, sectionScores)
    const certificationReadiness = this.calculateCertificationReadiness(overallScore, gaps)
    
    return {
      overallScore,
      maturityLevel,
      sectionScores,
      gaps,
      strengths,
      priorityActions,
      certificationReadiness,
    }
  }
  
  /**
   * Calculate scores per section
   */
  private calculateSectionScores(
    answers: AssessmentAnswer[],
    sections: any[]
  ): SectionScore[] {
    return sections.map((section, index) => {
      const sectionAnswers = answers.filter(a => 
        section.questions?.some((q: any) => q.id === a.questionId)
      )
      
      let totalScore = 0
      let maxScore = 0
      
      section.questions?.forEach((question: any) => {
        const answer = sectionAnswers.find(a => a.questionId === question.id)
        maxScore += 100 // Each question has max 100 points
        
        if (answer) {
          const selectedOption = question.options?.find(
            (opt: any) => opt.label === answer.value || opt.value === answer.value
          )
          totalScore += selectedOption?.score || 0
        }
      })
      
      const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
      
      return {
        sectionId: section.id || `section-${index}`,
        sectionName: section.title || `Section ${index + 1}`,
        score: totalScore,
        maxScore,
        percentage,
        weight: section.weight || 1,
      }
    })
  }
  
  /**
   * Calculate weighted overall score
   */
  private calculateWeightedOverall(sectionScores: SectionScore[]): number {
    const totalWeight = sectionScores.reduce((sum, s) => sum + s.weight, 0)
    const weightedSum = sectionScores.reduce(
      (sum, s) => sum + (s.percentage * s.weight),
      0
    )
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
  }
  
  /**
   * Determine maturity level from score
   */
  private determineMaturityLevel(
    score: number,
    levels: MaturityLevel[]
  ): MaturityLevel {
    const sorted = [...levels].sort((a, b) => b.minScore - a.minScore)
    return sorted.find(level => score >= level.minScore) || levels[0]
  }
  
  /**
   * Identify gaps based on section scores and answers
   */
  private identifyGaps(
    sectionScores: SectionScore[],
    answers: AssessmentAnswer[],
    sections: any[]
  ): IdentifiedGap[] {
    const gaps: IdentifiedGap[] = []
    
    sectionScores.forEach((section, index) => {
      // Section-level gap if score < 60%
      if (section.percentage < 60) {
        const severity = this.getSeverityFromScore(section.percentage)
        
        gaps.push({
          id: `gap-${section.sectionId}`,
          severity,
          category: section.sectionName,
          title: `Score insuffisant en ${section.sectionName}`,
          description: `Le score de ${section.percentage}% est en dessous du seuil minimal de 60%`,
          impactScore: 100 - section.percentage,
          recommendedActions: this.getRecommendedActionsForSection(section.sectionName),
          estimatedEffort: section.percentage < 40 ? "high" : "medium",
          relatedModules: this.getRelatedModules(section.sectionName),
        })
      }
    })
    
    return gaps.sort((a, b) => b.impactScore - a.impactScore)
  }
  
  /**
   * Get severity level from score
   */
  private getSeverityFromScore(score: number): IdentifiedGap["severity"] {
    if (score < 25) return "critical"
    if (score < 40) return "high"
    if (score < 60) return "medium"
    return "low"
  }
  
  /**
   * Get recommended actions for a section
   */
  private getRecommendedActionsForSection(sectionName: string): string[] {
    const actionMap: Record<string, string[]> = {
      "Système Qualité": [
        "Documenter les processus qualité existants",
        "Définir les indicateurs de performance qualité",
        "Former l'équipe aux bonnes pratiques",
      ],
      "Chaîne du Froid": [
        "Installer un système de monitoring température",
        "Qualifier les équipements de transport",
        "Mettre en place des procédures d'alerte",
      ],
      "Documentation": [
        "Créer un système de gestion documentaire",
        "Standardiser les formats de documents",
        "Former aux bonnes pratiques de documentation",
      ],
      "Traçabilité": [
        "Implémenter un système de traçabilité",
        "Définir les points de contrôle",
        "Tester les procédures de rappel",
      ],
    }
    return actionMap[sectionName] || [
      "Évaluer les processus actuels",
      "Identifier les axes d'amélioration",
      "Définir un plan d'action",
    ]
  }
  
  /**
   * Get related training modules for a section
   */
  private getRelatedModules(sectionName: string): string[] {
    const moduleMap: Record<string, string[]> = {
      "Système Qualité": ["GDP Niveau 1", "ISO 9001 Bases"],
      "Chaîne du Froid": ["Gestion Chaîne du Froid", "Qualification Transport"],
      "Documentation": ["Documentation GDP", "Gestion Documentaire"],
      "Traçabilité": ["Traçabilité Avancée", "Systèmes de Rappel"],
    }
    return moduleMap[sectionName] || []
  }
  
  /**
   * Identify strengths from section scores
   */
  private identifyStrengths(sectionScores: SectionScore[]): string[] {
    return sectionScores
      .filter(s => s.percentage >= 80)
      .map(s => `Excellence en ${s.sectionName} (${s.percentage}%)`)
  }
  
  /**
   * Generate priority actions from gaps
   */
  private generatePriorityActions(
    gaps: IdentifiedGap[],
    sectionScores: SectionScore[]
  ): PriorityAction[] {
    const actions: PriorityAction[] = []
    
    // Add actions from critical and high gaps
    gaps
      .filter(g => g.severity === "critical" || g.severity === "high")
      .slice(0, 5)
      .forEach((gap, index) => {
        gap.recommendedActions.slice(0, 2).forEach((action, actionIndex) => {
          actions.push({
            rank: index * 2 + actionIndex + 1,
            action,
            rationale: `Adresse le gap critique en ${gap.category}`,
            quickWin: gap.estimatedEffort === "low",
            estimatedImpact: gap.severity === "critical" ? "high" : "medium",
            category: gap.category,
          })
        })
      })
    
    return actions.slice(0, 10)
  }
  
  /**
   * Calculate certification readiness
   */
  private calculateCertificationReadiness(
    overallScore: number,
    gaps: IdentifiedGap[]
  ): AssessmentScore["certificationReadiness"] {
    const criticalGaps = gaps.filter(g => g.severity === "critical")
    const highGaps = gaps.filter(g => g.severity === "high")
    
    const blockers = criticalGaps.map(g => g.title)
    
    let estimatedTime = "6+ mois"
    if (overallScore >= 80 && criticalGaps.length === 0) {
      estimatedTime = "1-2 mois"
    } else if (overallScore >= 60 && criticalGaps.length === 0) {
      estimatedTime = "3-4 mois"
    } else if (overallScore >= 40) {
      estimatedTime = "5-6 mois"
    }
    
    return {
      certification: "GDP",
      readinessPercentage: Math.min(overallScore, 100),
      estimatedTimeToReady: estimatedTime,
      blockers,
    }
  }
}

// Export singleton instance
export const assessmentEngine = new AssessmentEngine()
