// Assessment Types - Unified type definitions for the Assessment Engine
// Used by Builder, Runtime, and Results components

// ===================
// QUESTION TYPES
// ===================

export type QuestionType = 
  | 'single'    // Radio buttons - one choice
  | 'multi'     // Checkboxes - multiple choices
  | 'scale'     // Slider or numbered scale (1-5, 1-10)
  | 'text'      // Free text input
  | 'file'      // File upload
  | 'matrix'    // Likert matrix

export interface QuestionOption {
  id: string
  label: string
  value: string | number
  score: number         // Points for this option
  isCorrect?: boolean   // For quiz mode
  followUp?: string[]   // Question IDs to show if selected
}

export interface QuestionScoring {
  maxPoints: number
  weight: number        // Weight within section (0-100)
  critical: boolean     // If failed = automatic alert
  gapIfBelow?: number   // Score threshold to flag as gap
}

export interface ConditionalLogic {
  dependsOnQuestionId: string
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains'
  value: string | string[]
}

export interface AssessmentQuestion {
  id: string
  type: QuestionType
  question: string
  description?: string
  helpText?: string
  required: boolean
  
  // Options for single/multi/matrix
  options?: QuestionOption[]
  
  // Scale config
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: { min: string; max: string }
  
  // Matrix config
  matrixRows?: string[]
  matrixColumns?: QuestionOption[]
  
  // File config
  acceptedFileTypes?: string[]
  maxFileSize?: number // MB
  
  // Scoring
  scoring: QuestionScoring
  
  // Conditional display
  conditionalDisplay?: ConditionalLogic
  
  // Metadata
  order: number
  category?: string
  tags?: string[]
}

// ===================
// SECTION
// ===================

export interface AssessmentSection {
  id: string
  title: string
  description?: string
  icon?: string
  
  // Weighting
  weight: number        // Weight in overall score (0-100)
  order: number
  
  // Questions
  questions: AssessmentQuestion[]
  
  // Timer (optional)
  timeLimit?: number    // Minutes
  
  // Display
  collapsed?: boolean
}

// ===================
// TEMPLATE
// ===================

export interface MaturityLevel {
  level: number
  name: string
  description: string
  minScore: number
  maxScore: number
  color?: string
  icon?: string
}

export type ScoringMethod = 'weighted' | 'simple' | 'average'

export interface AssessmentTemplate {
  id: string
  name: string
  description?: string
  certification: string  // 'GDP', 'ISO_9001', etc.
  version: string
  
  // Content
  sections: AssessmentSection[]
  
  // Scoring
  scoringMethod: ScoringMethod
  maturityLevels: MaturityLevel[]
  passingScore?: number
  
  // Metadata
  estimatedDuration: number  // Minutes
  questionsCount: number
  
  // Publishing
  status: 'draft' | 'published' | 'archived'
  isDemo: boolean
  
  // Organization
  organizationId?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// ===================
// SESSION (Runtime)
// ===================

export interface QuestionAnswer {
  questionId: string
  value: string | string[] | number | null
  answeredAt: Date
  timeSpent: number     // Seconds spent on this question
  skipped?: boolean
  attachmentUrl?: string
}

export interface SectionProgress {
  sectionId: string
  status: 'not_started' | 'in_progress' | 'completed'
  answeredCount: number
  totalCount: number
  timeSpent: number     // Seconds
}

export type SessionStatus = 'not_started' | 'in_progress' | 'completed' | 'abandoned'

export interface AssessmentSession {
  id: string
  templateId: string
  userId?: string
  
  // For demo/anonymous sessions
  email?: string
  companyName?: string
  industry?: string
  employeeCount?: string
  
  // Progress
  status: SessionStatus
  currentSectionIndex: number
  currentQuestionIndex: number
  
  // Answers
  answers: QuestionAnswer[]
  sectionProgress: SectionProgress[]
  
  // Timing
  startedAt: Date
  lastActivityAt: Date
  completedAt?: Date
  totalTimeSpent: number  // Seconds
  
  // Auto-save
  lastSavedAt?: Date
}

// ===================
// RESULTS
// ===================

export interface SectionScore {
  sectionId: string
  sectionName: string
  score: number
  maxScore: number
  percentage: number
  weight: number
  questionsAnswered: number
  questionsTotal: number
}

export type GapSeverity = 'low' | 'medium' | 'high' | 'critical'
export type EffortLevel = 'low' | 'medium' | 'high'

export interface IdentifiedGap {
  id: string
  severity: GapSeverity
  category: string
  title: string
  description: string
  impactScore: number
  
  // Actions
  recommendedActions: string[]
  relatedModules?: string[]
  estimatedEffort: EffortLevel
  
  // Source
  fromQuestionId?: string
  fromSectionId?: string
}

export interface PriorityAction {
  rank: number
  action: string
  rationale: string
  quickWin: boolean
  estimatedImpact: 'low' | 'medium' | 'high'
  category: string
  relatedGapId?: string
}

export interface CertificationReadiness {
  certification: string
  readinessPercentage: number
  estimatedTimeToReady: string
  blockers: string[]
  nextSteps: string[]
}

export interface AssessmentResults {
  sessionId: string
  templateId: string
  completedAt: Date
  
  // Scores
  overallScore: number
  maturityLevel: MaturityLevel
  sectionScores: SectionScore[]
  
  // Analysis
  gaps: IdentifiedGap[]
  strengths: string[]
  priorityActions: PriorityAction[]
  
  // Certification
  certificationReadiness: CertificationReadiness
  
  // Benchmark (optional)
  benchmark?: {
    industryAverage: number
    percentile: number
    comparedTo: number  // Number of assessments compared
  }
}

// ===================
// BUILDER HELPERS
// ===================

export const DEFAULT_MATURITY_LEVELS: MaturityLevel[] = [
  { level: 1, name: "Initial", description: "Processus ad-hoc, non documentés", minScore: 0, maxScore: 20, color: "#ef4444" },
  { level: 2, name: "Géré", description: "Processus de base définis", minScore: 21, maxScore: 40, color: "#f97316" },
  { level: 3, name: "Défini", description: "Processus standardisés", minScore: 41, maxScore: 60, color: "#eab308" },
  { level: 4, name: "Maîtrisé", description: "Processus mesurés et contrôlés", minScore: 61, maxScore: 80, color: "#22c55e" },
  { level: 5, name: "Optimisé", description: "Amélioration continue", minScore: 81, maxScore: 100, color: "#10b981" },
]

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  single: "Choix unique",
  multi: "Choix multiple",
  scale: "Échelle",
  text: "Texte libre",
  file: "Téléchargement",
  matrix: "Matrice",
}

export const QUESTION_TYPE_ICONS: Record<QuestionType, string> = {
  single: "CircleDot",
  multi: "CheckSquare",
  scale: "Sliders",
  text: "AlignLeft",
  file: "Upload",
  matrix: "Grid3X3",
}

// ===================
// FACTORY FUNCTIONS
// ===================

export function createEmptyQuestion(order: number): AssessmentQuestion {
  return {
    id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'single',
    question: '',
    required: true,
    order,
    options: [
      { id: 'opt-1', label: 'Option 1', value: 1, score: 0 },
      { id: 'opt-2', label: 'Option 2', value: 2, score: 50 },
      { id: 'opt-3', label: 'Option 3', value: 3, score: 100 },
    ],
    scoring: {
      maxPoints: 100,
      weight: 1,
      critical: false,
    },
  }
}

export function createEmptySection(order: number): AssessmentSection {
  return {
    id: `sect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: `Section ${order}`,
    description: '',
    weight: 100,
    order,
    questions: [],
  }
}

export function createEmptyTemplate(): Partial<AssessmentTemplate> {
  return {
    id: `tpl-${Date.now()}`,
    name: 'Nouvel Assessment',
    description: '',
    certification: 'GDP',
    version: '1.0',
    sections: [createEmptySection(1)],
    scoringMethod: 'weighted',
    maturityLevels: DEFAULT_MATURITY_LEVELS,
    estimatedDuration: 15,
    questionsCount: 0,
    status: 'draft',
    isDemo: false,
  }
}
