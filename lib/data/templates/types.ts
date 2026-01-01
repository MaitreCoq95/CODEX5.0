// Template Types for Document Library

export type TemplateCategory = "manuel" | "procedure" | "formulaire" | "outil"
export type TemplateFormat = "docx" | "xlsx" | "pdf"

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  format: TemplateFormat
  standard: string
  sectionId?: string // Links to assessment section
  actionIds?: string[] // Links to roadmap actions
  fileUrl?: string // Supabase Storage URL (for real files)
  previewUrl?: string
  version: string
  downloadCount?: number
  tags: string[]
  estimatedCompletionHours?: number
}

export interface TemplateSet {
  standard: string
  standardName: string
  templates: Template[]
}

// Category labels in French
export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  manuel: "Manuel",
  procedure: "Procédure",
  formulaire: "Formulaire",
  outil: "Outil",
}

// Category icons
export const CATEGORY_ICONS: Record<TemplateCategory, string> = {
  manuel: "📘",
  procedure: "📋",
  formulaire: "📝",
  outil: "🛠️",
}

// Format icons
export const FORMAT_ICONS: Record<TemplateFormat, string> = {
  docx: "📄",
  xlsx: "📊",
  pdf: "📕",
}
