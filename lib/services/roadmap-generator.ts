// Roadmap Generator Service
// Generates personalized action plan based on assessment gaps

import { getActionsForSection, Action, Sprint, Roadmap } from "@/lib/data/actions"

interface SectionScore {
  id: string
  name: string
  percentage: number
  weight: number
}

interface RoadmapGeneratorOptions {
  maxSprintActions?: number // Max actions per sprint (default: 4)
  targetSprintWeeks?: number // Weeks per sprint (default: 2)
  prioritizeGaps?: boolean // Focus on sections < 50% (default: true)
}

const DEFAULT_OPTIONS: RoadmapGeneratorOptions = {
  maxSprintActions: 4,
  targetSprintWeeks: 2,
  prioritizeGaps: true,
}

// Priority weights for sorting
const PRIORITY_WEIGHTS = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

/**
 * Generate a roadmap from assessment results
 */
export function generateRoadmap(
  standardCode: string,
  sectionScores: SectionScore[],
  options: RoadmapGeneratorOptions = {}
): Roadmap {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  // Step 1: Identify gaps (sections below threshold)
  const gaps = sectionScores
    .filter((s) => opts.prioritizeGaps ? s.percentage < 60 : true)
    .sort((a, b) => a.percentage - b.percentage)

  // Step 2: Collect relevant actions for gap sections
  let actionsToSchedule: Action[] = []

  gaps.forEach((gap) => {
    const sectionActions = getActionsForSection(standardCode, gap.id)
    
    // Scale priority based on gap severity
    const gapSeverity = gap.percentage < 30 ? 1.5 : gap.percentage < 50 ? 1.2 : 1.0
    
    sectionActions.forEach((action) => {
      // Add with adjusted priority weight
      actionsToSchedule.push({
        ...action,
        // Mark as higher priority if section is very low
        priority: gap.percentage < 30 && action.priority !== "critical" 
          ? "high" 
          : action.priority,
      })
    })
  })

  // If prioritizeGaps is true but we have few actions, add actions from OK sections too
  if (actionsToSchedule.length < 10) {
    const okSections = sectionScores.filter((s) => s.percentage >= 60)
    okSections.forEach((section) => {
      const sectionActions = getActionsForSection(standardCode, section.id)
      // Only add critical/high priority from OK sections
      sectionActions
        .filter((a) => a.priority === "critical" || a.priority === "high")
        .forEach((action) => {
          if (!actionsToSchedule.find((a) => a.id === action.id)) {
            actionsToSchedule.push(action)
          }
        })
    })
  }

  // Step 3: Sort actions by priority and dependencies
  actionsToSchedule = sortActionsByPriority(actionsToSchedule)

  // Step 4: Distribute into sprints
  const sprints = distributeIntoSprints(actionsToSchedule, opts.maxSprintActions!)

  // Calculate totals
  const totalHours = actionsToSchedule.reduce((sum, a) => sum + a.estimatedHours, 0)
  const estimatedWeeks = sprints.length * opts.targetSprintWeeks!

  return {
    id: `roadmap-${standardCode}-${Date.now()}`,
    standard: standardCode,
    createdAt: new Date(),
    sprints,
    totalActions: actionsToSchedule.length,
    totalHours,
    estimatedWeeks,
    completedActions: [],
  }
}

/**
 * Sort actions by priority, respecting dependencies
 */
function sortActionsByPriority(actions: Action[]): Action[] {
  return actions.sort((a, b) => {
    // First by priority
    const priorityDiff = PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Then by effort (low effort first for quick wins)
    const effortOrder = { low: 1, medium: 2, high: 3 }
    return effortOrder[a.effort] - effortOrder[b.effort]
  })
}

/**
 * Distribute actions into balanced sprints
 */
function distributeIntoSprints(actions: Action[], maxPerSprint: number): Sprint[] {
  const sprints: Sprint[] = []
  let currentSprint: Action[] = []
  let currentHours = 0
  const maxHoursPerSprint = 40 // ~1 week of work per sprint

  actions.forEach((action) => {
    // Check if we should start a new sprint
    const shouldNewSprint =
      currentSprint.length >= maxPerSprint ||
      (currentHours + action.estimatedHours > maxHoursPerSprint && currentSprint.length > 0)

    if (shouldNewSprint) {
      sprints.push(createSprint(sprints.length + 1, currentSprint))
      currentSprint = []
      currentHours = 0
    }

    currentSprint.push(action)
    currentHours += action.estimatedHours
  })

  // Don't forget the last sprint
  if (currentSprint.length > 0) {
    sprints.push(createSprint(sprints.length + 1, currentSprint))
  }

  // Add week calculations
  let weekCounter = 1
  sprints.forEach((sprint) => {
    sprint.startWeek = weekCounter
    sprint.endWeek = weekCounter + 1
    weekCounter += 2
  })

  return sprints
}

/**
 * Create a sprint object
 */
function createSprint(number: number, actions: Action[]): Sprint {
  const totalHours = actions.reduce((sum, a) => sum + a.estimatedHours, 0)
  
  // Generate sprint name based on main categories
  const categories = [...new Set(actions.map((a) => a.category))]
  const categoryLabels: Record<string, string> = {
    documentation: "Documentation",
    process: "Processus",
    training: "Formation",
    audit: "Audit",
    infrastructure: "Infrastructure",
    management: "Management",
  }
  
  const mainCategory = categories[0]
  const name = `Sprint ${number} - ${categoryLabels[mainCategory] || "Actions"}`

  return {
    number,
    name,
    actions,
    totalHours,
    startWeek: 0, // Will be set later
    endWeek: 0,
  }
}

/**
 * Get recommended actions for a specific gap
 */
export function getRecommendedActionsForGap(
  standardCode: string,
  sectionId: string,
  currentScore: number
): { immediate: Action[]; recommended: Action[] } {
  const actions = getActionsForSection(standardCode, sectionId)

  // Immediate: critical + high priority
  const immediate = actions.filter(
    (a) => a.priority === "critical" || (a.priority === "high" && currentScore < 40)
  )

  // Recommended: medium + remaining high
  const recommended = actions.filter(
    (a) => !immediate.includes(a) && (a.priority === "high" || a.priority === "medium")
  )

  return { immediate, recommended }
}

export default {
  generateRoadmap,
  getRecommendedActionsForGap,
}
