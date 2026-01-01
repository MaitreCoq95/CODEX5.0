"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { 
  ArrowLeft, 
  ArrowRight, 
  Save,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { QuestionRenderer } from "./question-renderer"
import {
  type AssessmentTemplate,
  type AssessmentSession,
  type AssessmentSection,
  type AssessmentQuestion,
  type QuestionAnswer,
} from "@/lib/types/assessment.types"

interface AssessmentSessionProps {
  template: AssessmentTemplate
  session: AssessmentSession
  onAnswerChange: (questionId: string, value: string | string[] | number | null) => void
  onComplete: () => void
  onSave: () => Promise<void>
  autoSaveInterval?: number  // ms, default 30000 (30s)
}

export function AssessmentSessionComponent({
  template,
  session,
  onAnswerChange,
  onComplete,
  onSave,
  autoSaveInterval = 30000,
}: AssessmentSessionProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(session.currentSectionIndex || 0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(session.currentQuestionIndex || 0)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(session.lastSavedAt || null)
  const [elapsedTime, setElapsedTime] = useState(session.totalTimeSpent || 0)
  const questionStartTime = useRef<Date>(new Date())

  // Current section and question
  const currentSection = template.sections[currentSectionIndex]
  const currentQuestion = currentSection?.questions[currentQuestionIndex]
  const currentAnswer = session.answers.find(a => a.questionId === currentQuestion?.id)

  // Progress calculations
  const totalQuestions = template.sections.reduce((sum, s) => sum + s.questions.length, 0)
  const answeredQuestions = session.answers.filter(a => a.value !== null).length
  const progressPercent = (answeredQuestions / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-save effect
  useEffect(() => {
    const autoSave = setInterval(async () => {
      setIsSaving(true)
      try {
        await onSave()
        setLastSaved(new Date())
      } finally {
        setIsSaving(false)
      }
    }, autoSaveInterval)
    return () => clearInterval(autoSave)
  }, [autoSaveInterval, onSave])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswer = (value: string | string[] | number | null) => {
    if (!currentQuestion) return
    
    // Calculate time spent on this question
    const timeSpent = Math.floor((new Date().getTime() - questionStartTime.current.getTime()) / 1000)
    
    onAnswerChange(currentQuestion.id, value)
  }

  const canGoNext = () => {
    if (!currentQuestion) return false
    if (!currentQuestion.required) return true
    return currentAnswer?.value !== null && currentAnswer?.value !== undefined
  }

  const goToNext = () => {
    questionStartTime.current = new Date()
    
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      // Next question in section
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (currentSectionIndex < template.sections.length - 1) {
      // Next section
      setCurrentSectionIndex(prev => prev + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Assessment complete
      onComplete()
    }
  }

  const goToPrevious = () => {
    questionStartTime.current = new Date()
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentSectionIndex > 0) {
      const prevSection = template.sections[currentSectionIndex - 1]
      setCurrentSectionIndex(prev => prev - 1)
      setCurrentQuestionIndex(prevSection.questions.length - 1)
    }
  }

  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0
  const isLastQuestion = currentSectionIndex === template.sections.length - 1 && 
                         currentQuestionIndex === currentSection.questions.length - 1

  // Question number across all sections
  const globalQuestionNumber = template.sections
    .slice(0, currentSectionIndex)
    .reduce((sum, s) => sum + s.questions.length, 0) + currentQuestionIndex + 1

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header with progress */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-semibold">{template.name}</h1>
              <p className="text-sm text-slate-400">{currentSection?.title}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(elapsedTime)}</span>
              </div>

              {/* Auto-save status */}
              <div className="flex items-center gap-2 text-sm">
                {isSaving ? (
                  <span className="text-yellow-500">Sauvegarde...</span>
                ) : lastSaved ? (
                  <span className="text-slate-500 flex items-center gap-1">
                    <Save className="w-3 h-3" />
                    Sauvegardé
                  </span>
                ) : null}
              </div>

              {/* Manual save */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  setIsSaving(true)
                  await onSave()
                  setLastSaved(new Date())
                  setIsSaving(false)
                }}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">
                Question {globalQuestionNumber} sur {totalQuestions}
              </span>
              <span className="text-vyxo-gold font-medium">
                {Math.round(progressPercent)}% complété
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>

      {/* Section indicator */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {template.sections.map((section, sIndex) => {
            const sectionAnswered = section.questions.filter(q => 
              session.answers.some(a => a.questionId === q.id && a.value !== null)
            ).length
            const isComplete = sectionAnswered === section.questions.length
            const isCurrent = sIndex === currentSectionIndex

            return (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentSectionIndex(sIndex)
                  setCurrentQuestionIndex(0)
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap
                  transition-all text-sm
                  ${isCurrent 
                    ? "bg-vyxo-gold text-vyxo-navy font-medium" 
                    : isComplete
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }
                `}
              >
                {isComplete && !isCurrent && <CheckCircle className="w-4 h-4" />}
                <span>{section.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {sectionAnswered}/{section.questions.length}
                </Badge>
              </button>
            )
          })}
        </div>
      </div>

      {/* Question content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="max-w-3xl mx-auto border-slate-700 bg-slate-900">
          <CardContent className="p-8">
            {currentQuestion ? (
              <QuestionRenderer
                question={currentQuestion}
                answer={currentAnswer || null}
                onAnswer={handleAnswer}
              />
            ) : (
              <div className="text-center py-8 text-slate-500">
                Aucune question disponible
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstQuestion}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {/* Question indicators */}
            <div className="hidden md:flex items-center gap-1">
              {currentSection?.questions.map((q, qIndex) => {
                const hasAnswer = session.answers.some(a => a.questionId === q.id && a.value !== null)
                const isCurrent = qIndex === currentQuestionIndex
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(qIndex)}
                    className={`
                      w-3 h-3 rounded-full transition-all
                      ${isCurrent 
                        ? "bg-vyxo-gold scale-125" 
                        : hasAnswer 
                          ? "bg-emerald-500" 
                          : "bg-slate-700 hover:bg-slate-600"
                      }
                    `}
                  />
                )
              })}
            </div>

            <Button
              onClick={goToNext}
              disabled={currentQuestion?.required && !canGoNext()}
              className={isLastQuestion 
                ? "bg-emerald-500 hover:bg-emerald-600" 
                : "bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
              }
            >
              {isLastQuestion ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terminer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentSessionComponent
