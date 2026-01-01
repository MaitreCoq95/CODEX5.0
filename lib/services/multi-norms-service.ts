// Multi-Norms Question Bank Service
// Comprehensive question banks for various certifications

import {
  CEIV_PHARMA_CATEGORIES,
  ISO42001_CATEGORIES,
  YELLOW_BELT_CATEGORIES,
  GREEN_BELT_CATEGORIES,
  SURETE_11_2_1_CATEGORIES,
  SURETE_11_2_3_9_CATEGORIES,
  SURETE_11_2_3_10_CATEGORIES,
  SURETE_11_2_3_6_CATEGORIES,
  SURETE_11_2_3_8_CATEGORIES,
  SURETE_11_2_5_CATEGORIES,
  OEA_AEOS_CATEGORIES,
  HACCP_CATEGORIES,
  HACCP_TRANSPORT_CATEGORIES,
  ISO22000_CATEGORIES,
} from "./certifications-phase3"

export type SupportedCertification =
  // 💊 Transport Pharma & Cold Chain
  | "GDP"           // Good Distribution Practice
  | "CEIV_PHARMA"   // IATA Cold Chain
  // 🔒 Sécurité de l'Information
  | "ISO27001"      // Information Security
  | "ISO42001"      // AI Management System
  | "ISO27701"      // Privacy/RGPD
  | "SOC2"          // Security Controls
  // ⚙️ Excellence Opérationnelle
  | "YELLOW_BELT"   // Lean Six Sigma L1
  | "GREEN_BELT"    // Lean Six Sigma L2
  | "LEAN_SIX_SIGMA" // Full LSS
  | "KAIZEN"        // Continuous Improvement
  | "LEAN_MANAGEMENT" // Lean principles
  // ✈️ Sûreté Aéroportuaire
  | "SURETE_11_2_1"   // Sensibilisation générale
  | "SURETE_11_2_3_9" // Acceptation fret
  | "SURETE_11_2_3_10" // Manipulation fret sécurisé
  | "SURETE_11_2_3_6" // Contrôles RA/AH
  | "SURETE_11_2_3_8" // Supervision
  | "SURETE_11_2_5"   // Responsable Sûreté
  | "OEA_AEOS"        // Sûreté Supply Chain
  // 🍽️ Sécurité Alimentaire
  | "HACCP"           // Codex Alimentarius
  | "HACCP_TRANSPORT" // HACCP Logistique
  | "ISO22000"        // Food Safety Management

export interface NormQuestion {
  id: string
  text: string
  clause?: string
  helpText?: string
  type: "single_choice" | "multiple_choice" | "scale" | "yes_no"
  options: {
    label: string
    score: number // 0-100
    gapLevel: "none" | "minor" | "major" | "critical"
  }[]
}

export interface NormCategory {
  id: string
  name: string
  clause?: string
  weight: number // percentage weight in final score
  questions: NormQuestion[]
}

export interface MaturityLevel {
  level: number
  name: string
  minScore: number
  maxScore: number
  description: string
  certificationReadiness: string
  color: string
}

export interface CertificationConfig {
  id: SupportedCertification
  name: string
  fullName: string
  description: string
  icon: string
  color: string
  categories: NormCategory[]
  maturityLevels: MaturityLevel[]
}

// Maturity levels (shared across norms)
const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: 1,
    name: "Initial",
    minScore: 0,
    maxScore: 20,
    description: "Processus ad hoc, non documentés",
    certificationReadiness: "Non prêt - travail majeur requis",
    color: "#EF4444", // red
  },
  {
    level: 2,
    name: "Émergent",
    minScore: 21,
    maxScore: 40,
    description: "Début de formalisation",
    certificationReadiness: "6-12 mois de préparation",
    color: "#F97316", // orange
  },
  {
    level: 3,
    name: "Défini",
    minScore: 41,
    maxScore: 60,
    description: "Processus documentés et appliqués",
    certificationReadiness: "3-6 mois de préparation",
    color: "#EAB308", // yellow
  },
  {
    level: 4,
    name: "Maîtrisé",
    minScore: 61,
    maxScore: 80,
    description: "Processus mesurés et contrôlés",
    certificationReadiness: "1-3 mois de préparation",
    color: "#22C55E", // green
  },
  {
    level: 5,
    name: "Optimisé",
    minScore: 81,
    maxScore: 100,
    description: "Amélioration continue",
    certificationReadiness: "Prêt pour certification",
    color: "#10B981", // emerald
  },
]

// GDP Question Bank
const GDP_CATEGORIES: NormCategory[] = [
  {
    id: "gdp-quality",
    name: "Système Qualité Pharmaceutique",
    clause: "Chapter 1",
    weight: 25,
    questions: [
      {
        id: "gdp-q1",
        text: "Disposez-vous d'un système qualité pharmaceutique documenté conforme aux BPD ?",
        clause: "1.1",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "En cours de mise en place", score: 25, gapLevel: "major" },
          { label: "Oui, partiellement documenté", score: 60, gapLevel: "minor" },
          { label: "Oui, complet et revu périodiquement", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "gdp-q2",
        text: "Avez-vous un Responsable Pharmaceutique désigné ?",
        clause: "2.2",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Oui, mais pas formellement nommé", score: 40, gapLevel: "major" },
          { label: "Oui, nommé et formé", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "gdp-q3",
        text: "Comment gérez-vous les réclamations qualité ?",
        clause: "1.4",
        type: "single_choice",
        options: [
          { label: "Pas de processus formel", score: 0, gapLevel: "critical" },
          { label: "Traitement au cas par cas", score: 30, gapLevel: "major" },
          { label: "Processus documenté", score: 70, gapLevel: "minor" },
          { label: "Processus avec analyse des causes et CAPA", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "gdp-cold-chain",
    name: "Chaîne du Froid",
    clause: "Chapter 9.4",
    weight: 30,
    questions: [
      {
        id: "gdp-q4",
        text: "Comment surveillez-vous la température pendant le transport ?",
        clause: "9.4.1",
        type: "single_choice",
        options: [
          { label: "Pas de surveillance", score: 0, gapLevel: "critical" },
          { label: "Surveillance manuelle ponctuelle", score: 30, gapLevel: "major" },
          { label: "Enregistreurs de température passifs", score: 60, gapLevel: "minor" },
          { label: "Monitoring temps réel avec alertes", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "gdp-q5",
        text: "Vos véhicules sont-ils qualifiés pour le transport sous température dirigée ?",
        clause: "9.4.2",
        type: "single_choice",
        options: [
          { label: "Non qualifiés", score: 0, gapLevel: "critical" },
          { label: "Qualification initiale uniquement", score: 40, gapLevel: "major" },
          { label: "Qualification avec maintenance préventive", score: 70, gapLevel: "minor" },
          { label: "Qualification complète avec cartographie et requalification", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "gdp-q6",
        text: "Comment gérez-vous les excursions de température ?",
        clause: "9.4.3",
        type: "single_choice",
        options: [
          { label: "Pas de procédure", score: 0, gapLevel: "critical" },
          { label: "Gestion réactive", score: 35, gapLevel: "major" },
          { label: "Procédure documentée", score: 65, gapLevel: "minor" },
          { label: "Procédure avec évaluation d'impact et décision RP", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "gdp-traceability",
    name: "Traçabilité",
    clause: "Chapter 5",
    weight: 25,
    questions: [
      {
        id: "gdp-q7",
        text: "Votre système de traçabilité permet-il un rappel en moins de 24h ?",
        clause: "5.5",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Entre 24h et 48h", score: 50, gapLevel: "major" },
          { label: "Moins de 24h", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "gdp-q8",
        text: "Sérialisez-vous les produits conformément à la directive européenne ?",
        clause: "5.6",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "En cours de déploiement", score: 50, gapLevel: "major" },
          { label: "Oui, conforme FMD", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "gdp-personnel",
    name: "Personnel",
    clause: "Chapter 2",
    weight: 20,
    questions: [
      {
        id: "gdp-q9",
        text: "Le personnel reçoit-il une formation initiale et continue aux BPD ?",
        clause: "2.4",
        type: "single_choice",
        options: [
          { label: "Pas de formation", score: 0, gapLevel: "critical" },
          { label: "Formation initiale uniquement", score: 40, gapLevel: "major" },
          { label: "Formation initiale + recyclage annuel", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "gdp-q10",
        text: "Les fiches de poste définissent-elles les responsabilités BPD ?",
        clause: "2.3",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Partiellement", score: 50, gapLevel: "minor" },
          { label: "Oui, documentées et signées", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ISO 27001 Question Bank
const ISO27001_CATEGORIES: NormCategory[] = [
  {
    id: "iso27-context",
    name: "Contexte de l'Organisation",
    clause: "4",
    weight: 15,
    questions: [
      {
        id: "iso27-q1",
        text: "Avez-vous défini le périmètre de votre SMSI ?",
        clause: "4.3",
        type: "single_choice",
        options: [
          { label: "Non défini", score: 0, gapLevel: "critical" },
          { label: "Défini informellement", score: 40, gapLevel: "major" },
          { label: "Documenté mais non validé", score: 70, gapLevel: "minor" },
          { label: "Documenté, validé et communiqué", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "iso27-q2",
        text: "Avez-vous identifié les parties intéressées et leurs exigences ?",
        clause: "4.2",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, documenté", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso27-risk",
    name: "Gestion des Risques",
    clause: "6.1",
    weight: 25,
    questions: [
      {
        id: "iso27-q3",
        text: "Comment identifiez-vous les risques de sécurité de l'information ?",
        clause: "6.1.2",
        type: "single_choice",
        options: [
          { label: "Pas d'identification formelle", score: 0, gapLevel: "critical" },
          { label: "Identification ponctuelle", score: 35, gapLevel: "major" },
          { label: "Analyse de risques annuelle", score: 65, gapLevel: "minor" },
          { label: "Processus continu avec registre des risques", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "iso27-q4",
        text: "Disposez-vous d'un plan de traitement des risques ?",
        clause: "6.1.3",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Informel", score: 40, gapLevel: "major" },
          { label: "Documenté", score: 70, gapLevel: "minor" },
          { label: "Documenté avec suivi et revue", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso27-access",
    name: "Contrôle d'Accès",
    clause: "A.9",
    weight: 20,
    questions: [
      {
        id: "iso27-q5",
        text: "Comment gérez-vous les accès aux systèmes d'information ?",
        clause: "A.9.2",
        type: "single_choice",
        options: [
          { label: "Pas de gestion formelle", score: 0, gapLevel: "critical" },
          { label: "Gestion manuelle des comptes", score: 40, gapLevel: "major" },
          { label: "Processus documenté avec revues périodiques", score: 70, gapLevel: "minor" },
          { label: "IAM automatisé avec revues et audit trail", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "iso27-q6",
        text: "Utilisez-vous l'authentification multi-facteurs ?",
        clause: "A.9.4",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Pour certains systèmes critiques", score: 60, gapLevel: "minor" },
          { label: "Pour tous les accès sensibles", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso27-incident",
    name: "Gestion des Incidents",
    clause: "A.16",
    weight: 20,
    questions: [
      {
        id: "iso27-q7",
        text: "Avez-vous un processus de gestion des incidents de sécurité ?",
        clause: "A.16.1",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Réactif uniquement", score: 35, gapLevel: "major" },
          { label: "Processus documenté", score: 70, gapLevel: "minor" },
          { label: "Processus avec analyse post-incident et amélioration", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso27-continuity",
    name: "Continuité d'Activité",
    clause: "A.17",
    weight: 20,
    questions: [
      {
        id: "iso27-q8",
        text: "Disposez-vous d'un plan de continuité d'activité ?",
        clause: "A.17.1",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "En cours de rédaction", score: 30, gapLevel: "major" },
          { label: "Documenté", score: 60, gapLevel: "minor" },
          { label: "Documenté et testé régulièrement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]



export const CERTIFICATIONS: CertificationConfig[] = [
  // 💊 Transport Pharma & Cold Chain
  {
    id: "GDP",
    name: "GDP",
    fullName: "Good Distribution Practice",
    description: "Bonnes Pratiques de Distribution des médicaments",
    icon: "💊",
    color: "#3B82F6",
    categories: GDP_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "CEIV_PHARMA",
    name: "CEIV Pharma",
    fullName: "IATA Cold Chain Certification",
    description: "Certification IATA pour le transport pharmaceutique",
    icon: "✈️",
    color: "#0EA5E9",
    categories: CEIV_PHARMA_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  // 🔒 Sécurité de l'Information
  {
    id: "ISO27001",
    name: "ISO 27001",
    fullName: "Sécurité de l'Information",
    description: "Système de Management de la Sécurité de l'Information",
    icon: "🔒",
    color: "#8B5CF6",
    categories: ISO27001_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "ISO42001",
    name: "ISO 42001",
    fullName: "Management de l'IA",
    description: "Système de Management de l'Intelligence Artificielle",
    icon: "🤖",
    color: "#A855F7",
    categories: ISO42001_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  // ⚙️ Excellence Opérationnelle
  {
    id: "YELLOW_BELT",
    name: "Yellow Belt",
    fullName: "Lean Six Sigma Yellow Belt",
    description: "Fondamentaux Lean Six Sigma - Niveau 1",
    icon: "🟡",
    color: "#EAB308",
    categories: YELLOW_BELT_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "GREEN_BELT",
    name: "Green Belt",
    fullName: "Lean Six Sigma Green Belt",
    description: "Lean Six Sigma - Niveau 2",
    icon: "🟢",
    color: "#22C55E",
    categories: GREEN_BELT_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  // ✈️ Sûreté Aéroportuaire
  {
    id: "SURETE_11_2_1",
    name: "11.2.1",
    fullName: "Sensibilisation Générale Sûreté",
    description: "Formation de base pour tout personnel aviation",
    icon: "🛡️",
    color: "#EF4444",
    categories: SURETE_11_2_1_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "SURETE_11_2_3_9",
    name: "11.2.3.9",
    fullName: "Acceptation Fret Aérien",
    description: "Personnel acceptant du fret ou courrier aérien",
    icon: "📦",
    color: "#F97316",
    categories: SURETE_11_2_3_9_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "SURETE_11_2_3_10",
    name: "11.2.3.10",
    fullName: "Manipulation Fret Sécurisé",
    description: "Personnel manipulant du fret déjà sécurisé",
    icon: "🏭",
    color: "#F59E0B",
    categories: SURETE_11_2_3_10_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "SURETE_11_2_3_6",
    name: "11.2.3.6",
    fullName: "Contrôles Sûreté RA/AH",
    description: "Personnel chargé des contrôles de sûreté fret",
    icon: "🔍",
    color: "#3B82F6",
    categories: SURETE_11_2_3_6_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "SURETE_11_2_3_8",
    name: "11.2.3.8",
    fullName: "Supervision Sûreté Fret",
    description: "Personnel supervisant les contrôles de sûreté",
    icon: "👁️",
    color: "#6366F1",
    categories: SURETE_11_2_3_8_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "SURETE_11_2_5",
    name: "11.2.5",
    fullName: "Responsable Sûreté",
    description: "Formation Responsable Sûreté / Référent DGAC",
    icon: "👔",
    color: "#A855F7",
    categories: SURETE_11_2_5_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "OEA_AEOS",
    name: "OEA-AEOS",
    fullName: "Sûreté Supply Chain",
    description: "Opérateur Économique Agréé - Sûreté",
    icon: "🌐",
    color: "#10B981",
    categories: OEA_AEOS_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  // 🍽️ Sécurité Alimentaire & Logistique
  {
    id: "HACCP",
    name: "HACCP",
    fullName: "HACCP Codex Alimentarius",
    description: "Analyse des dangers et points critiques (Fabrication)",
    icon: "🍽️",
    color: "#F59E0B",
    categories: HACCP_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "HACCP_TRANSPORT",
    name: "HACCP Transport",
    fullName: "HACCP Logistique & Transport",
    description: "Maîtrise sanitaire transport et stockage",
    icon: "🚛",
    color: "#0EA5E9",
    categories: HACCP_TRANSPORT_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
  {
    id: "ISO22000",
    name: "ISO 22000",
    fullName: "Sécurité des Denrées Alimentaires",
    description: "Système de Management de la Sécurité Alimentaire",
    icon: "🍏",
    color: "#22C55E",
    categories: ISO22000_CATEGORIES,
    maturityLevels: MATURITY_LEVELS,
  },
]

// Service class
export class MultiNormsService {
  
  getCertification(id: SupportedCertification): CertificationConfig | undefined {
    return CERTIFICATIONS.find(c => c.id === id)
  }
  
  getAllCertifications(): CertificationConfig[] {
    return CERTIFICATIONS
  }
  
  getQuestions(certificationId: SupportedCertification): NormQuestion[] {
    const cert = this.getCertification(certificationId)
    if (!cert) return []
    return cert.categories.flatMap(c => c.questions)
  }
  
  calculateScore(certificationId: SupportedCertification, answers: Record<string, number>): {
    overallScore: number
    categoryScores: { categoryId: string; name: string; score: number; weight: number }[]
    maturityLevel: MaturityLevel
    gaps: { questionId: string; gapLevel: string; category: string }[]
  } {
    const cert = this.getCertification(certificationId)
    if (!cert) throw new Error(`Certification ${certificationId} not found`)
    
    const categoryScores: { categoryId: string; name: string; score: number; weight: number }[] = []
    const gaps: { questionId: string; gapLevel: string; category: string }[] = []
    
    for (const category of cert.categories) {
      let categoryTotal = 0
      let questionCount = 0
      
      for (const question of category.questions) {
        const answerScore = answers[question.id]
        if (answerScore !== undefined) {
          categoryTotal += answerScore
          questionCount++
          
          // Find the gap level for this answer
          const option = question.options.find(o => o.score === answerScore)
          if (option && option.gapLevel !== "none") {
            gaps.push({
              questionId: question.id,
              gapLevel: option.gapLevel,
              category: category.name,
            })
          }
        }
      }
      
      const categoryScore = questionCount > 0 ? categoryTotal / questionCount : 0
      categoryScores.push({
        categoryId: category.id,
        name: category.name,
        score: Math.round(categoryScore),
        weight: category.weight,
      })
    }
    
    // Calculate weighted overall score
    const overallScore = Math.round(
      categoryScores.reduce((sum, cat) => sum + (cat.score * cat.weight / 100), 0)
    )
    
    // Determine maturity level
    const maturityLevel = cert.maturityLevels.find(
      m => overallScore >= m.minScore && overallScore <= m.maxScore
    ) || cert.maturityLevels[0]
    
    return {
      overallScore,
      categoryScores,
      maturityLevel,
      gaps: gaps.sort((a, b) => {
        const order = { critical: 0, major: 1, minor: 2 }
        return (order[a.gapLevel as keyof typeof order] || 3) - (order[b.gapLevel as keyof typeof order] || 3)
      }),
    }
  }
}

// Export singleton
export const multiNormsService = new MultiNormsService()
