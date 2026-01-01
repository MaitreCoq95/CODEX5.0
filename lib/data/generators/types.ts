// Document Generator Types - Wizard-based document generation with AI

export interface GeneratorField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "date" | "company_name" | "ai_assisted"
  placeholder?: string
  required?: boolean
  aiPrompt?: string // Prompt to send to AI for suggestions
  options?: { value: string; label: string }[]
  defaultValue?: string
  helpText?: string
}

export interface GeneratorStep {
  id: string
  title: string
  description: string
  icon: string
  fields: GeneratorField[]
}

export interface DocumentGenerator {
  id: string
  templateId: string // Links to original template
  name: string
  description: string
  standard: string
  category: "manuel" | "procedure" | "formulaire"
  isPremium: boolean
  steps: GeneratorStep[]
  outputFormat: "docx" | "pdf"
  estimatedMinutes: number
}

// AI assistance response
export interface AIsuggestion {
  text: string
  confidence: number
}
