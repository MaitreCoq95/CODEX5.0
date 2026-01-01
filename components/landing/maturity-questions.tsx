"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { 
  getMaturityQuestionsForNorms
} from "@/lib/data/maturity-questions"
import { CheckCircle2, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

interface MaturityQuestionsProps {
  selectedNorms: string[]
  onComplete: (answers: Record<string, number>, tags: string[]) => void
  onSkip?: () => void
}

export function MaturityQuestions({ selectedNorms, onComplete, onSkip }: MaturityQuestionsProps) {
  const questions = useMemo(() => getMaturityQuestionsForNorms(selectedNorms), [selectedNorms])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const answered = answers[currentQuestion?.id] !== undefined

  const handleAnswer = (value: number, tag?: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
    if (tag) {
      setSelectedTags(prev => [...prev, tag])
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      // Terminé - calculer le score et retourner
      onComplete(answers, selectedTags)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header avec progression */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-vyxo-gold" />
          <span className="text-white font-medium">
            Évaluation de maturité ({currentIndex + 1}/{questions.length})
          </span>
        </div>
        {onSkip && (
          <button 
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            Passer cette étape →
          </button>
        )}
      </div>

      {/* Barre de progression */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-vyxo-gold transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-slide-in-up">
        {/* Catégorie */}
        <div className="mb-4">
          <span className="text-xs text-vyxo-gold bg-vyxo-gold/20 px-3 py-1 rounded-full">
            {currentQuestion.category}
          </span>
        </div>

        {/* Texte de la question */}
        <h3 className="text-xl font-semibold text-white mb-6">
          {currentQuestion.text}
        </h3>

        {/* Options de réponse */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.value, option.tag)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                answers[currentQuestion.id] === option.value
                  ? "bg-vyxo-gold/20 border-vyxo-gold text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {answers[currentQuestion.id] === option.value && (
                  <CheckCircle2 className="w-5 h-5 text-vyxo-gold" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>

        <div className="text-gray-500 text-sm">
          {Object.keys(answers).length} / {questions.length} répondues
        </div>

        <Button
          onClick={handleNext}
          disabled={!answered}
          className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-medium"
        >
          {currentIndex === questions.length - 1 ? (
            <>
              Voir mon score
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Info */}
      <p className="text-center text-gray-500 text-xs">
        Ces questions nous permettent d&apos;évaluer précisément votre niveau de maturité
        et de personnaliser notre accompagnement.
      </p>
    </div>
  )
}
