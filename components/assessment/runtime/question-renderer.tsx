"use client"

import { HelpCircle, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { 
  SingleChoice, 
  MultiChoice, 
  ScaleQuestion, 
  TextQuestion, 
  FileUpload,
  MatrixQuestion 
} from "./question-types"
import { 
  type AssessmentQuestion,
  type QuestionAnswer 
} from "@/lib/types/assessment.types"

interface QuestionRendererProps {
  question: AssessmentQuestion
  answer: QuestionAnswer | null
  onAnswer: (value: string | string[] | number | null) => void
  disabled?: boolean
}

export function QuestionRenderer({ 
  question, 
  answer, 
  onAnswer,
  disabled 
}: QuestionRendererProps) {
  const currentValue = answer?.value ?? null

  const renderQuestion = () => {
    switch (question.type) {
      case "single":
        return (
          <SingleChoice
            options={question.options || []}
            value={currentValue as string | null}
            onChange={onAnswer}
            disabled={disabled}
          />
        )

      case "multi":
        return (
          <MultiChoice
            options={question.options || []}
            value={(currentValue as string[]) || []}
            onChange={onAnswer}
            disabled={disabled}
          />
        )

      case "scale":
        return (
          <ScaleQuestion
            min={question.scaleMin || 1}
            max={question.scaleMax || 5}
            labels={question.scaleLabels}
            value={currentValue as number | null}
            onChange={onAnswer}
            disabled={disabled}
          />
        )

      case "text":
        return (
          <TextQuestion
            value={(currentValue as string) || ""}
            onChange={onAnswer}
            disabled={disabled}
          />
        )

      case "file":
        return (
          <FileUpload
            value={currentValue as string | null}
            onChange={onAnswer}
            acceptedTypes={question.acceptedFileTypes}
            maxSize={question.maxFileSize}
            disabled={disabled}
          />
        )

      case "matrix":
        return (
          <MatrixQuestion
            rows={question.matrixRows || []}
            columns={question.matrixColumns || question.options || []}
            value={(currentValue as Record<string, string>) || {}}
            onChange={onAnswer}
            disabled={disabled}
          />
        )

      default:
        return (
          <div className="text-slate-500 text-center py-8">
            Type de question non supporté: {question.type}
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Question header */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <h3 className="text-lg font-medium flex-1">
            {question.question}
            {question.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </h3>
          {question.scoring.critical && (
            <Badge className="bg-red-500/20 text-red-400 shrink-0">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Critique
            </Badge>
          )}
        </div>

        {question.description && (
          <p className="text-slate-400 text-sm">{question.description}</p>
        )}

        {question.helpText && (
          <div className="flex items-start gap-2 text-slate-500 text-sm bg-slate-800/50 rounded-lg p-3">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{question.helpText}</span>
          </div>
        )}
      </div>

      {/* Question content */}
      <div className="py-2">
        {renderQuestion()}
      </div>
    </div>
  )
}

export default QuestionRenderer
