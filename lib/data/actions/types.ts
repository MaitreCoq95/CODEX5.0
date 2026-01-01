// Action Types for Roadmap Generation

export type ActionPriority = "critical" | "high" | "medium" | "low"
export type ActionCategory = "documentation" | "process" | "training" | "audit" | "infrastructure" | "management"
export type ActionEffort = "low" | "medium" | "high"

export interface Action {
  id: string
  sectionId: string // Links to assessment section
  title: string
  description: string
  priority: ActionPriority
  category: ActionCategory
  estimatedHours: number
  effort: ActionEffort
  templateIds?: string[] // Links to related templates
  prerequisites?: string[] // Other action IDs that must be done first
  deliverables: string[]
  tips?: string[]
}

export interface ActionSet {
  standard: string
  standardName: string
  actions: Action[]
}

export interface Sprint {
  number: number
  name: string
  actions: Action[]
  totalHours: number
  startWeek: number
  endWeek: number
}

export interface Roadmap {
  id: string
  standard: string
  userId?: string
  createdAt: Date
  sprints: Sprint[]
  totalActions: number
  totalHours: number
  estimatedWeeks: number
  completedActions: string[]
}
