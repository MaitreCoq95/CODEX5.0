"use client"

import { useState, useCallback } from "react"
import { 
  Save, 
  Eye, 
  Settings,
  Plus,
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionEditor } from "./section-editor"
import {
  type AssessmentTemplate,
  type AssessmentSection,
  type ScoringMethod,
  createEmptySection,
  createEmptyTemplate,
  DEFAULT_MATURITY_LEVELS,
} from "@/lib/types/assessment.types"

const CERTIFICATIONS = [
  { value: "GDP", label: "GDP - Bonnes Pratiques de Distribution" },
  { value: "ISO_9001", label: "ISO 9001 - Management Qualité" },
  { value: "ISO_45001", label: "ISO 45001 - Santé Sécurité" },
  { value: "ISO_14001", label: "ISO 14001 - Environnement" },
  { value: "ISO_27001", label: "ISO 27001 - Sécurité Information" },
  { value: "HACCP", label: "HACCP - Sécurité Alimentaire" },
  { value: "MASE", label: "MASE - Sécurité Entreprises" },
  { value: "EN_9100", label: "EN 9100 - Aéronautique" },
  { value: "CUSTOM", label: "Personnalisé" },
]

interface AssessmentBuilderProps {
  initialTemplate?: Partial<AssessmentTemplate>
  onSave: (template: Partial<AssessmentTemplate>) => Promise<void>
  onPreview?: (template: Partial<AssessmentTemplate>) => void
  onBack?: () => void
}

export function AssessmentBuilder({
  initialTemplate,
  onSave,
  onPreview,
  onBack,
}: AssessmentBuilderProps) {
  const [template, setTemplate] = useState<Partial<AssessmentTemplate>>(
    initialTemplate || createEmptyTemplate()
  )
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const updateTemplate = useCallback((updates: Partial<AssessmentTemplate>) => {
    setTemplate(prev => ({ ...prev, ...updates }))
    setHasUnsavedChanges(true)
  }, [])

  const addSection = () => {
    const newSection = createEmptySection((template.sections?.length || 0) + 1)
    updateTemplate({ sections: [...(template.sections || []), newSection] })
  }

  const updateSection = (sectionIndex: number, section: AssessmentSection) => {
    const newSections = [...(template.sections || [])]
    newSections[sectionIndex] = section
    updateTemplate({ sections: newSections })
  }

  const deleteSection = (sectionIndex: number) => {
    const newSections = (template.sections || []).filter((_, i) => i !== sectionIndex)
    newSections.forEach((s, i) => { s.order = i + 1 })
    updateTemplate({ sections: newSections })
  }

  const duplicateSection = (sectionIndex: number) => {
    const original = template.sections?.[sectionIndex]
    if (!original) return
    const duplicate: AssessmentSection = {
      ...original,
      id: `sect-${Date.now()}`,
      title: `${original.title} (copie)`,
      order: (template.sections?.length || 0) + 1,
      questions: original.questions.map(q => ({
        ...q,
        id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })),
    }
    updateTemplate({ sections: [...(template.sections || []), duplicate] })
  }

  const moveSectionUp = (sectionIndex: number) => {
    if (sectionIndex === 0) return
    const newSections = [...(template.sections || [])]
    ;[newSections[sectionIndex - 1], newSections[sectionIndex]] = 
      [newSections[sectionIndex], newSections[sectionIndex - 1]]
    newSections.forEach((s, i) => { s.order = i + 1 })
    updateTemplate({ sections: newSections })
  }

  const moveSectionDown = (sectionIndex: number) => {
    if (sectionIndex === (template.sections?.length || 0) - 1) return
    const newSections = [...(template.sections || [])]
    ;[newSections[sectionIndex], newSections[sectionIndex + 1]] = 
      [newSections[sectionIndex + 1], newSections[sectionIndex]]
    newSections.forEach((s, i) => { s.order = i + 1 })
    updateTemplate({ sections: newSections })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Calculate questionsCount
      const questionsCount = template.sections?.reduce(
        (sum, s) => sum + s.questions.length, 0
      ) || 0
      await onSave({ ...template, questionsCount })
      setHasUnsavedChanges(false)
    } finally {
      setIsSaving(false)
    }
  }

  // Stats
  const totalQuestions = template.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0
  const totalWeight = template.sections?.reduce((sum, s) => sum + s.weight, 0) || 0
  const criticalQuestions = template.sections?.reduce(
    (sum, s) => sum + s.questions.filter(q => q.scoring.critical).length, 0
  ) || 0

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-vyxo-gold" />
                  <Input
                    value={template.name || ""}
                    onChange={e => updateTemplate({ name: e.target.value })}
                    className="bg-transparent border-none text-xl font-bold h-8 p-0 focus-visible:ring-0 w-auto"
                    placeholder="Nom de l'assessment"
                  />
                  {hasUnsavedChanges && (
                    <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                      Non sauvegardé
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                  <span>{totalQuestions} questions</span>
                  <span>•</span>
                  <span>{template.sections?.length || 0} sections</span>
                  <span>•</span>
                  <span>~{template.estimatedDuration} min</span>
                  {criticalQuestions > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-red-400">
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        {criticalQuestions} critiques
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onPreview && (
                <Button variant="outline" onClick={() => onPreview(template)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Prévisualiser
                </Button>
              )}
              <Button 
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>Sauvegarde...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 mb-6">
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="scoring">Scoring</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            {template.sections?.map((section, sIndex) => (
              <SectionEditor
                key={section.id}
                section={section}
                index={sIndex}
                onChange={s => updateSection(sIndex, s)}
                onDelete={() => deleteSection(sIndex)}
                onDuplicate={() => duplicateSection(sIndex)}
                onMoveUp={sIndex > 0 ? () => moveSectionUp(sIndex) : undefined}
                onMoveDown={sIndex < (template.sections?.length || 0) - 1 ? () => moveSectionDown(sIndex) : undefined}
              />
            ))}

            <Button 
              variant="outline" 
              className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-vyxo-gold py-8"
              onClick={addSection}
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter une section
            </Button>

            {/* Weight Warning */}
            {totalWeight !== 100 && template.sections && template.sections.length > 0 && (
              <Card className="border-yellow-500/50 bg-yellow-500/10">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <p className="text-yellow-500 text-sm">
                    Le total des poids des sections est de {totalWeight}%. 
                    Pour un scoring correct, le total devrait être de 100%.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Paramètres de l&apos;assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Nom de l&apos;assessment</Label>
                    <Input
                      value={template.name || ""}
                      onChange={e => updateTemplate({ name: e.target.value })}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <Label>Certification associée</Label>
                    <Select
                      value={template.certification || ""}
                      onValueChange={value => updateTemplate({ certification: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {CERTIFICATIONS.map(cert => (
                          <SelectItem key={cert.value} value={cert.value}>
                            {cert.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={template.description || ""}
                    onChange={e => updateTemplate({ description: e.target.value })}
                    className="bg-slate-800 border-slate-700 min-h-[100px]"
                    placeholder="Décrivez l'objectif de cet assessment..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label>Durée estimée (minutes)</Label>
                    <Input
                      type="number"
                      value={template.estimatedDuration || 15}
                      onChange={e => updateTemplate({ estimatedDuration: parseInt(e.target.value) || 15 })}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <Label>Version</Label>
                    <Input
                      value={template.version || "1.0"}
                      onChange={e => updateTemplate({ version: e.target.value })}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Select
                      value={template.status || "draft"}
                      onValueChange={(value: "draft" | "published" | "archived") => updateTemplate({ status: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scoring Tab */}
          <TabsContent value="scoring">
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle>Configuration du scoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Méthode de calcul</Label>
                  <Select
                    value={template.scoringMethod || "weighted"}
                    onValueChange={(value: ScoringMethod) => updateTemplate({ scoringMethod: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weighted">Pondéré (par section)</SelectItem>
                      <SelectItem value="simple">Simple (somme des points)</SelectItem>
                      <SelectItem value="average">Moyenne des sections</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-4 block">Niveaux de maturité</Label>
                  <div className="space-y-2">
                    {(template.maturityLevels || DEFAULT_MATURITY_LEVELS).map((level, i) => (
                      <div key={i} className="flex items-center gap-4 bg-slate-800 rounded-lg p-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: level.color }}
                        />
                        <span className="font-medium w-24">Niveau {level.level}</span>
                        <Input
                          value={level.name}
                          className="bg-slate-900 border-slate-700 w-32"
                          readOnly
                        />
                        <span className="text-slate-400 text-sm">
                          {level.minScore} - {level.maxScore}%
                        </span>
                        <span className="text-slate-500 text-sm flex-1">
                          {level.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AssessmentBuilder
