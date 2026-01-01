// Templates Index - Export all template sets
import { ISO9001_TEMPLATES } from "./iso9001-templates"
import { GDP_TEMPLATES } from "./gdp-templates"
import { ISO27001_TEMPLATES } from "./iso27001-templates"
import { HACCP_TEMPLATES } from "./haccp-templates"
import { ISO42001_TEMPLATES } from "./iso42001-templates"
import { ISO13485_TEMPLATES } from "./iso13485-templates"
import { SURETE_TEMPLATES } from "./surete-templates"
import { TemplateSet, Template, TemplateCategory } from "./types"

export * from "./types"

// All template sets by standard
export const TEMPLATE_SETS: Record<string, TemplateSet> = {
  ISO_9001: ISO9001_TEMPLATES,
  GDP: GDP_TEMPLATES,
  ISO_27001: ISO27001_TEMPLATES,
  HACCP: HACCP_TEMPLATES,
  ISO_42001: ISO42001_TEMPLATES,
  ISO_13485: ISO13485_TEMPLATES,
  SURETE: SURETE_TEMPLATES,
}

// Get templates for a specific standard
export function getTemplatesForStandard(standardCode: string): Template[] {
  return TEMPLATE_SETS[standardCode]?.templates || []
}

// Get templates by category
export function getTemplatesByCategory(
  standardCode: string,
  category: TemplateCategory
): Template[] {
  const templates = getTemplatesForStandard(standardCode)
  return templates.filter((t) => t.category === category)
}

// Get template by ID
export function getTemplateById(standardCode: string, templateId: string): Template | undefined {
  const templates = getTemplatesForStandard(standardCode)
  return templates.find((t) => t.id === templateId)
}

// Get templates linked to an action
export function getTemplatesForAction(standardCode: string, actionId: string): Template[] {
  const templates = getTemplatesForStandard(standardCode)
  return templates.filter((t) => t.actionIds?.includes(actionId))
}

// Get template counts by category for a standard
export function getTemplateCounts(standardCode: string): Record<TemplateCategory, number> {
  const templates = getTemplatesForStandard(standardCode)
  return {
    manuel: templates.filter((t) => t.category === "manuel").length,
    procedure: templates.filter((t) => t.category === "procedure").length,
    formulaire: templates.filter((t) => t.category === "formulaire").length,
    outil: templates.filter((t) => t.category === "outil").length,
  }
}

// Export individual sets
export {
  ISO9001_TEMPLATES,
  GDP_TEMPLATES,
  ISO27001_TEMPLATES,
  HACCP_TEMPLATES,
  ISO42001_TEMPLATES,
  ISO13485_TEMPLATES,
  SURETE_TEMPLATES,
}
