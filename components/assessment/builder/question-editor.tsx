"use client"

import { useState } from "react"
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Copy,
  CircleDot,
  CheckSquare,
  Sliders,
  AlignLeft,
  Upload,
  Grid3X3,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type AssessmentQuestion,
  type QuestionType,
  type QuestionOption,
  QUESTION_TYPE_LABELS,
  createEmptyQuestion,
} from "@/lib/types/assessment.types"

const QUESTION_TYPE_ICONS: Record<QuestionType, React.ReactNode> = {
  single: <CircleDot className="w-4 h-4" />,
  multi: <CheckSquare className="w-4 h-4" />,
  scale: <Sliders className="w-4 h-4" />,
  text: <AlignLeft className="w-4 h-4" />,
  file: <Upload className="w-4 h-4" />,
  matrix: <Grid3X3 className="w-4 h-4" />,
}

interface QuestionEditorProps {
  question: AssessmentQuestion
  index: number
  onChange: (question: AssessmentQuestion) => void
  onDelete: () => void
  onDuplicate: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export function QuestionEditor({
  question,
  index,
  onChange,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}: QuestionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateQuestion = (updates: Partial<AssessmentQuestion>) => {
    onChange({ ...question, ...updates })
  }

  const updateOption = (optionId: string, updates: Partial<QuestionOption>) => {
    const newOptions = question.options?.map(opt =>
      opt.id === optionId ? { ...opt, ...updates } : opt
    )
    updateQuestion({ options: newOptions })
  }

  const addOption = () => {
    const newOption: QuestionOption = {
      id: `opt-${Date.now()}`,
      label: `Option ${(question.options?.length || 0) + 1}`,
      value: (question.options?.length || 0) + 1,
      score: 0,
    }
    updateQuestion({ options: [...(question.options || []), newOption] })
  }

  const removeOption = (optionId: string) => {
    updateQuestion({ options: question.options?.filter(opt => opt.id !== optionId) })
  }

  const updateScoring = (updates: Partial<AssessmentQuestion["scoring"]>) => {
    updateQuestion({ scoring: { ...question.scoring, ...updates } })
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      {/* Header */}
      <CardHeader className="p-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <button className="cursor-grab text-slate-500 hover:text-slate-300">
            <GripVertical className="w-4 h-4" />
          </button>
          
          <Badge variant="outline" className="text-xs">
            Q{index + 1}
          </Badge>
          
          <div className="flex items-center gap-1 text-slate-400">
            {QUESTION_TYPE_ICONS[question.type]}
            <span className="text-xs">{QUESTION_TYPE_LABELS[question.type]}</span>
          </div>

          {question.scoring.critical && (
            <Badge className="bg-red-500/20 text-red-400 text-xs">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Critique
            </Badge>
          )}

          <div className="flex-1" />

          <div className="flex items-center gap-1">
            {onMoveUp && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp}>
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
            {onMoveDown && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDuplicate}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={onDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      {isExpanded && (
        <CardContent className="p-4 space-y-4">
          {/* Question Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-slate-400">Type de question</Label>
              <Select
                value={question.type}
                onValueChange={(value: QuestionType) => updateQuestion({ type: value })}
              >
                <SelectTrigger className="bg-slate-900 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map(type => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {QUESTION_TYPE_ICONS[type]}
                        {QUESTION_TYPE_LABELS[type]}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={question.required}
                  onCheckedChange={checked => updateQuestion({ required: checked })}
                />
                <Label className="text-sm">Obligatoire</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={question.scoring.critical}
                  onCheckedChange={checked => updateScoring({ critical: checked })}
                />
                <Label className="text-sm text-red-400">Critique</Label>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <Label className="text-sm text-slate-400">Question</Label>
            <Textarea
              value={question.question}
              onChange={e => updateQuestion({ question: e.target.value })}
              placeholder="Entrez votre question ici..."
              className="bg-slate-900 border-slate-700 min-h-[80px]"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm text-slate-400">Description (optionnel)</Label>
            <Input
              value={question.description || ""}
              onChange={e => updateQuestion({ description: e.target.value })}
              placeholder="Informations complémentaires..."
              className="bg-slate-900 border-slate-700"
            />
          </div>

          {/* Options for single/multi */}
          {(question.type === "single" || question.type === "multi") && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm text-slate-400">Options de réponse</Label>
                <Button variant="ghost" size="sm" onClick={addOption}>
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                {question.options?.map((option, optIndex) => (
                  <div key={option.id} className="flex items-center gap-2 bg-slate-900 rounded-lg p-2">
                    <span className="text-slate-500 text-sm w-6">{optIndex + 1}.</span>
                    <Input
                      value={option.label}
                      onChange={e => updateOption(option.id, { label: e.target.value })}
                      className="flex-1 bg-transparent border-slate-700 h-8"
                      placeholder="Label de l'option"
                    />
                    <div className="flex items-center gap-1">
                      <Label className="text-xs text-slate-500">Score:</Label>
                      <Input
                        type="number"
                        value={option.score}
                        onChange={e => updateOption(option.id, { score: parseInt(e.target.value) || 0 })}
                        className="w-16 bg-transparent border-slate-700 h-8 text-center"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400"
                      onClick={() => removeOption(option.id)}
                      disabled={question.options?.length === 1}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scale options */}
          {question.type === "scale" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-slate-400">Minimum</Label>
                <Input
                  type="number"
                  value={question.scaleMin || 1}
                  onChange={e => updateQuestion({ scaleMin: parseInt(e.target.value) || 1 })}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label className="text-sm text-slate-400">Maximum</Label>
                <Input
                  type="number"
                  value={question.scaleMax || 5}
                  onChange={e => updateQuestion({ scaleMax: parseInt(e.target.value) || 5 })}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>
          )}

          {/* Advanced Settings Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-slate-400"
          >
            {showAdvanced ? "Masquer" : "Afficher"} les options avancées
          </Button>

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="border-t border-slate-700 pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-slate-400">Points max</Label>
                  <Input
                    type="number"
                    value={question.scoring.maxPoints}
                    onChange={e => updateScoring({ maxPoints: parseInt(e.target.value) || 100 })}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-400">Poids dans la section</Label>
                  <Input
                    type="number"
                    value={question.scoring.weight}
                    onChange={e => updateScoring({ weight: parseInt(e.target.value) || 1 })}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm text-slate-400">Catégorie</Label>
                <Input
                  value={question.category || ""}
                  onChange={e => updateQuestion({ category: e.target.value })}
                  placeholder="Ex: Documentation, Traçabilité..."
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label className="text-sm text-slate-400">Texte d&apos;aide</Label>
                <Input
                  value={question.helpText || ""}
                  onChange={e => updateQuestion({ helpText: e.target.value })}
                  placeholder="Aide contextuelle pour l'utilisateur"
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default QuestionEditor
