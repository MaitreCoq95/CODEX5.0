"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Loader2, ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react"
import { getTemplateByStandard, getAvailableStandards } from "@/lib/data/assessments"
import type { AssessmentTemplate, AssessmentSection, AssessmentQuestion } from "@/lib/types/assessment.types"

// Question Renderer Component
function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: AssessmentQuestion
  value: string | number | null
  onChange: (value: string | number) => void
}) {
  if (question.type === "scale") {
    const scaleValues = Array.from(
      { length: (question.scaleMax || 5) - (question.scaleMin || 1) + 1 },
      (_, i) => (question.scaleMin || 1) + i
    )

    return (
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-400">
          <span>{question.scaleLabels?.min || "Min"}</span>
          <span>{question.scaleLabels?.max || "Max"}</span>
        </div>
        <div className="flex gap-2 justify-between">
          {scaleValues.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                value === v
                  ? "bg-vyxo-gold text-vyxo-navy border-vyxo-gold"
                  : "border-white/20 text-white hover:border-vyxo-gold/50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (question.type === "single_choice" && question.options) {
    return (
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.value as string)}
            className={`w-full p-4 rounded-lg border text-left transition-all ${
              value === option.value
                ? "border-vyxo-gold bg-vyxo-gold/10"
                : "border-white/20 bg-white/5 hover:border-white/40"
            }`}
          >
            <span className={value === option.value ? "text-vyxo-gold" : "text-white"}>
              {option.label}
            </span>
          </button>
        ))}
      </div>
    )
  }

  return null
}

// Main Assessment Component
function AssessmentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const standardCode = searchParams.get("standard") || "ISO_9001"

  const [template, setTemplate] = useState<AssessmentTemplate | null>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Load template
  useEffect(() => {
    const loadedTemplate = getTemplateByStandard(standardCode)
    if (loadedTemplate) {
      setTemplate(loadedTemplate)
      // Load saved answers from localStorage
      const saved = localStorage.getItem(`assessment_${standardCode}`)
      if (saved) {
        setAnswers(JSON.parse(saved))
      }
    }
  }, [standardCode])

  // Auto-save
  const saveProgress = useCallback(() => {
    if (template) {
      localStorage.setItem(`assessment_${standardCode}`, JSON.stringify(answers))
    }
  }, [answers, standardCode, template])

  useEffect(() => {
    const interval = setInterval(saveProgress, 30000) // Auto-save every 30s
    return () => clearInterval(interval)
  }, [saveProgress])

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement du questionnaire...</p>
        </div>
      </div>
    )
  }

  const currentSection = template.sections[currentSectionIndex]
  const currentQuestion = currentSection?.questions[currentQuestionIndex]
  const totalQuestions = template.sections.reduce((acc, s) => acc + s.questions.length, 0)
  const answeredCount = Object.keys(answers).length

  // Calculate progress
  let questionNumber = 0
  for (let i = 0; i < currentSectionIndex; i++) {
    questionNumber += template.sections[i].questions.length
  }
  questionNumber += currentQuestionIndex + 1
  const progressPercent = (answeredCount / totalQuestions) * 100

  const handleAnswer = (value: string | number) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
    }
  }

  const goNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else if (currentSectionIndex < template.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Complete - go to results
      saveProgress()
      router.push(`/onboarding/results?standard=${standardCode}`)
    }
  }

  const goPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1)
      setCurrentQuestionIndex(template.sections[currentSectionIndex - 1].questions.length - 1)
    }
  }

  const isLastQuestion =
    currentSectionIndex === template.sections.length - 1 &&
    currentQuestionIndex === currentSection.questions.length - 1
  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0
  const hasAnswer = currentQuestion && answers[currentQuestion.id] !== undefined

  const handleManualSave = async () => {
    setIsSaving(true)
    saveProgress()
    await new Promise((r) => setTimeout(r, 500))
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-white">{template.name}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualSave}
              className="text-gray-400 hover:text-white"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>
              Question {questionNumber} / {totalQuestions}
            </span>
            <span>{Math.round(progressPercent)}% complété</span>
          </div>
        </div>

        {/* Section indicator */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-vyxo-gold">
            <span className="text-2xl">{currentSection.icon}</span>
            <span className="font-semibold">{currentSection.title}</span>
          </div>
          {currentSection.description && (
            <p className="text-gray-400 text-sm mt-1">{currentSection.description}</p>
          )}
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg leading-relaxed">
                {currentQuestion?.question}
              </CardTitle>
              {currentQuestion?.description && (
                <p className="text-gray-400 text-sm">{currentQuestion.description}</p>
              )}
            </CardHeader>
            <CardContent>
              {currentQuestion && (
                <QuestionRenderer
                  question={currentQuestion}
                  value={answers[currentQuestion.id] ?? null}
                  onChange={handleAnswer}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={isFirstQuestion}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <Button
            onClick={goNext}
            disabled={currentQuestion?.required && !hasAnswer}
            className="flex-1 bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
          >
            {isLastQuestion ? (
              <>
                Terminer
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Section progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {template.sections.map((section, idx) => (
            <div
              key={section.id}
              className={`w-3 h-3 rounded-full transition-all ${
                idx < currentSectionIndex
                  ? "bg-green-500"
                  : idx === currentSectionIndex
                  ? "bg-vyxo-gold"
                  : "bg-white/20"
              }`}
              title={section.title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Page with Suspense
export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  )
}
