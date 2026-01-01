"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AssessmentBuilder } from "@/components/assessment/builder"
import { type AssessmentTemplate } from "@/lib/types/assessment.types"

// Mock data for now - will be replaced with API call
const getAssessmentTemplate = async (id: string): Promise<Partial<AssessmentTemplate> | null> => {
  // TODO: Replace with actual API call
  if (id === "new") {
    return null
  }
  
  // Mock existing template
  return {
    id,
    name: "Diagnostic GDP Niveau 1",
    description: "Évaluation complète de votre conformité aux Bonnes Pratiques de Distribution",
    certification: "GDP",
    version: "1.0",
    estimatedDuration: 20,
    questionsCount: 25,
    status: "draft",
    isDemo: false,
    scoringMethod: "weighted",
    sections: [
      {
        id: "sect-1",
        title: "Système Qualité",
        description: "Évaluation de votre système de management de la qualité",
        weight: 25,
        order: 1,
        questions: [
          {
            id: "q-1",
            type: "single",
            question: "Avez-vous un Responsable Qualité désigné ?",
            required: true,
            order: 1,
            options: [
              { id: "opt-1", label: "Non, aucun responsable", value: 1, score: 0 },
              { id: "opt-2", label: "Oui, mais pas formalisé", value: 2, score: 50 },
              { id: "opt-3", label: "Oui, désigné et formé", value: 3, score: 100 },
            ],
            scoring: { maxPoints: 100, weight: 1, critical: true },
          },
          {
            id: "q-2",
            type: "single",
            question: "Votre politique qualité est-elle documentée ?",
            required: true,
            order: 2,
            options: [
              { id: "opt-1", label: "Non documentée", value: 1, score: 0 },
              { id: "opt-2", label: "En cours de rédaction", value: 2, score: 30 },
              { id: "opt-3", label: "Documentée mais non communiquée", value: 3, score: 60 },
              { id: "opt-4", label: "Documentée et communiquée", value: 4, score: 100 },
            ],
            scoring: { maxPoints: 100, weight: 1, critical: false },
          },
        ],
      },
      {
        id: "sect-2",
        title: "Chaîne du Froid",
        description: "Maîtrise de la température des produits thermosensibles",
        weight: 30,
        order: 2,
        questions: [],
      },
    ],
    maturityLevels: [
      { level: 1, name: "Initial", description: "Processus ad-hoc", minScore: 0, maxScore: 20, color: "#ef4444" },
      { level: 2, name: "Géré", description: "Processus de base définis", minScore: 21, maxScore: 40, color: "#f97316" },
      { level: 3, name: "Défini", description: "Processus standardisés", minScore: 41, maxScore: 60, color: "#eab308" },
      { level: 4, name: "Maîtrisé", description: "Processus mesurés", minScore: 61, maxScore: 80, color: "#22c55e" },
      { level: 5, name: "Optimisé", description: "Amélioration continue", minScore: 81, maxScore: 100, color: "#10b981" },
    ],
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function AssessmentEditPage({ params }: PageProps) {
  const [template, setTemplate] = useState<Partial<AssessmentTemplate> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load template on mount
  useState(() => {
    const loadTemplate = async () => {
      const resolvedParams = params instanceof Promise ? await params : params
      const data = await getAssessmentTemplate(resolvedParams.id)
      setTemplate(data)
      setIsLoading(false)
    }
    loadTemplate()
  })

  const handleSave = async (updatedTemplate: Partial<AssessmentTemplate>) => {
    // TODO: Replace with actual API call
    console.log("Saving template:", updatedTemplate)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success (in real app, use toast)
    alert("Assessment sauvegardé avec succès !")
  }

  const handlePreview = (template: Partial<AssessmentTemplate>) => {
    // TODO: Open preview modal or navigate to preview page
    console.log("Preview template:", template)
  }

  const handleBack = () => {
    router.push("/admin/assessments")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  return (
    <AssessmentBuilder
      initialTemplate={template || undefined}
      onSave={handleSave}
      onPreview={handlePreview}
      onBack={handleBack}
    />
  )
}
