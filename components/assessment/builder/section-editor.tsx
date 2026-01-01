"use client"

import { useState } from "react"
import { 
  GripVertical, 
  Plus, 
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings,
  Copy
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QuestionEditor } from "./question-editor"
import {
  type AssessmentSection,
  type AssessmentQuestion,
  createEmptyQuestion,
} from "@/lib/types/assessment.types"

interface SectionEditorProps {
  section: AssessmentSection
  index: number
  onChange: (section: AssessmentSection) => void
  onDelete: () => void
  onDuplicate: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export function SectionEditor({
  section,
  index,
  onChange,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  const updateSection = (updates: Partial<AssessmentSection>) => {
    onChange({ ...section, ...updates })
  }

  const addQuestion = () => {
    const newQuestion = createEmptyQuestion(section.questions.length + 1)
    updateSection({ questions: [...section.questions, newQuestion] })
  }

  const updateQuestion = (questionIndex: number, question: AssessmentQuestion) => {
    const newQuestions = [...section.questions]
    newQuestions[questionIndex] = question
    updateSection({ questions: newQuestions })
  }

  const deleteQuestion = (questionIndex: number) => {
    const newQuestions = section.questions.filter((_, i) => i !== questionIndex)
    // Reorder
    newQuestions.forEach((q, i) => { q.order = i + 1 })
    updateSection({ questions: newQuestions })
  }

  const duplicateQuestion = (questionIndex: number) => {
    const original = section.questions[questionIndex]
    const duplicate: AssessmentQuestion = {
      ...original,
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: `${original.question} (copie)`,
      order: section.questions.length + 1,
    }
    updateSection({ questions: [...section.questions, duplicate] })
  }

  const moveQuestionUp = (questionIndex: number) => {
    if (questionIndex === 0) return
    const newQuestions = [...section.questions]
    ;[newQuestions[questionIndex - 1], newQuestions[questionIndex]] = 
      [newQuestions[questionIndex], newQuestions[questionIndex - 1]]
    newQuestions.forEach((q, i) => { q.order = i + 1 })
    updateSection({ questions: newQuestions })
  }

  const moveQuestionDown = (questionIndex: number) => {
    if (questionIndex === section.questions.length - 1) return
    const newQuestions = [...section.questions]
    ;[newQuestions[questionIndex], newQuestions[questionIndex + 1]] = 
      [newQuestions[questionIndex + 1], newQuestions[questionIndex]]
    newQuestions.forEach((q, i) => { q.order = i + 1 })
    updateSection({ questions: newQuestions })
  }

  const totalScore = section.questions.reduce((sum, q) => sum + q.scoring.maxPoints, 0)
  const criticalCount = section.questions.filter(q => q.scoring.critical).length

  return (
    <Card className="border-slate-600 bg-slate-900">
      {/* Header */}
      <CardHeader className="p-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <button className="cursor-grab text-slate-500 hover:text-slate-300">
            <GripVertical className="w-5 h-5" />
          </button>

          <Badge className="bg-vyxo-gold/20 text-vyxo-gold">
            Section {index + 1}
          </Badge>

          <div className="flex-1">
            <Input
              value={section.title}
              onChange={e => updateSection({ title: e.target.value })}
              className="bg-transparent border-none text-lg font-semibold h-8 p-0 focus-visible:ring-0"
              placeholder="Titre de la section"
            />
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span>{section.questions.length} questions</span>
            <span>•</span>
            <span>Poids: {section.weight}%</span>
            {criticalCount > 0 && (
              <>
                <span>•</span>
                <span className="text-red-400">{criticalCount} critique(s)</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onMoveUp && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMoveUp}>
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
            {onMoveDown && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMoveDown}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDuplicate}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-400 hover:text-red-300" 
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Section Settings */}
        {showSettings && (
          <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-slate-400">Description</Label>
              <Textarea
                value={section.description || ""}
                onChange={e => updateSection({ description: e.target.value })}
                className="bg-slate-900 border-slate-700 h-20"
                placeholder="Description de la section..."
              />
            </div>
            <div>
              <Label className="text-sm text-slate-400">Poids (%)</Label>
              <Input
                type="number"
                value={section.weight}
                onChange={e => updateSection({ weight: parseInt(e.target.value) || 0 })}
                className="bg-slate-900 border-slate-700"
                min={0}
                max={100}
              />
              <p className="text-xs text-slate-500 mt-1">
                Impact sur le score global
              </p>
            </div>
            <div>
              <Label className="text-sm text-slate-400">Temps limite (min)</Label>
              <Input
                type="number"
                value={section.timeLimit || ""}
                onChange={e => updateSection({ timeLimit: parseInt(e.target.value) || undefined })}
                className="bg-slate-900 border-slate-700"
                placeholder="Optionnel"
              />
              <p className="text-xs text-slate-500 mt-1">
                Laisser vide pour désactiver
              </p>
            </div>
          </div>
        )}
      </CardHeader>

      {/* Questions */}
      {isExpanded && (
        <CardContent className="p-4 space-y-3">
          {section.questions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">Aucune question dans cette section</p>
              <Button onClick={addQuestion} className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une question
              </Button>
            </div>
          ) : (
            <>
              {section.questions.map((question, qIndex) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  index={qIndex}
                  onChange={q => updateQuestion(qIndex, q)}
                  onDelete={() => deleteQuestion(qIndex)}
                  onDuplicate={() => duplicateQuestion(qIndex)}
                  onMoveUp={qIndex > 0 ? () => moveQuestionUp(qIndex) : undefined}
                  onMoveDown={qIndex < section.questions.length - 1 ? () => moveQuestionDown(qIndex) : undefined}
                />
              ))}

              <Button 
                variant="outline" 
                className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-vyxo-gold"
                onClick={addQuestion}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une question
              </Button>
            </>
          )}

          {/* Section Stats */}
          {section.questions.length > 0 && (
            <div className="flex items-center gap-4 pt-2 border-t border-slate-800 text-xs text-slate-500">
              <span>Total: {totalScore} pts</span>
              <span>•</span>
              <span>Moy. par question: {Math.round(totalScore / section.questions.length)} pts</span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default SectionEditor
