// Actions Index - Export all action sets
import { ISO9001_ACTIONS } from "./iso9001-actions"
import { GDP_ACTIONS } from "./gdp-actions"
import { ISO27001_ACTIONS } from "./iso27001-actions"
import { HACCP_ACTIONS } from "./haccp-actions"
import { ISO42001_ACTIONS } from "./iso42001-actions"
import { ISO13485_ACTIONS } from "./iso13485-actions"
import { SURETE_ACTIONS } from "./surete-actions"
import { ActionSet, Action } from "./types"

export * from "./types"

// All action sets by standard
export const ACTION_SETS: Record<string, ActionSet> = {
  ISO_9001: ISO9001_ACTIONS,
  GDP: GDP_ACTIONS,
  ISO_27001: ISO27001_ACTIONS,
  HACCP: HACCP_ACTIONS,
  ISO_42001: ISO42001_ACTIONS,
  ISO_13485: ISO13485_ACTIONS,
  SURETE: SURETE_ACTIONS,
}

// Get actions for a specific standard
export function getActionsForStandard(standardCode: string): Action[] {
  return ACTION_SETS[standardCode]?.actions || []
}

// Get actions for a specific section
export function getActionsForSection(standardCode: string, sectionId: string): Action[] {
  const actions = getActionsForStandard(standardCode)
  return actions.filter((a) => a.sectionId === sectionId)
}

// Get action by ID
export function getActionById(standardCode: string, actionId: string): Action | undefined {
  const actions = getActionsForStandard(standardCode)
  return actions.find((a) => a.id === actionId)
}

// Export individual sets
export {
  ISO9001_ACTIONS,
  GDP_ACTIONS,
  ISO27001_ACTIONS,
  HACCP_ACTIONS,
  ISO42001_ACTIONS,
  ISO13485_ACTIONS,
  SURETE_ACTIONS,
}
