// Assessment Templates Index
// Export all diagnostic questionnaires for different standards

import { ISO9001_TEMPLATE } from "./iso9001-questions"
import { GDP_TEMPLATE } from "./gdp-questions"
import { ISO27001_TEMPLATE } from "./iso27001-questions"
import { HACCP_TEMPLATE } from "./haccp-questions"
import { ISO42001_TEMPLATE } from "./iso42001-questions"
import { ISO13485_TEMPLATE } from "./iso13485-questions"
import { SURETE_TEMPLATE } from "./surete-questions"
import { AssessmentTemplate } from "@/lib/types/assessment.types"

// All available templates
export const ASSESSMENT_TEMPLATES: Record<string, AssessmentTemplate> = {
  ISO_9001: ISO9001_TEMPLATE,
  GDP: GDP_TEMPLATE,
  ISO_27001: ISO27001_TEMPLATE,
  HACCP: HACCP_TEMPLATE,
  ISO_42001: ISO42001_TEMPLATE,
  ISO_13485: ISO13485_TEMPLATE,
  SURETE: SURETE_TEMPLATE,
}

// Get template by standard code
export function getTemplateByStandard(standardCode: string): AssessmentTemplate | null {
  return ASSESSMENT_TEMPLATES[standardCode] || null
}

// Get all available standards
export function getAvailableStandards(): { code: string; name: string; icon: string }[] {
  return [
    { code: "ISO_9001", name: "ISO 9001 - Management de la Qualité", icon: "🏆" },
    { code: "GDP", name: "GDP - Bonnes Pratiques de Distribution", icon: "💊" },
    { code: "ISO_27001", name: "ISO 27001 - Sécurité de l'Information", icon: "🔒" },
    { code: "HACCP", name: "HACCP - Sécurité Alimentaire", icon: "🍽️" },
    { code: "ISO_42001", name: "ISO 42001 - Gouvernance de l'IA", icon: "🤖" },
    { code: "ISO_13485", name: "ISO 13485 - Dispositifs Médicaux", icon: "🩺" },
    { code: "SURETE", name: "Sûreté Aéroportuaire", icon: "✈️" },
  ]
}

// Re-export individual templates
export {
  ISO9001_TEMPLATE,
  GDP_TEMPLATE,
  ISO27001_TEMPLATE,
  HACCP_TEMPLATE,
  ISO42001_TEMPLATE,
  ISO13485_TEMPLATE,
  SURETE_TEMPLATE,
}
