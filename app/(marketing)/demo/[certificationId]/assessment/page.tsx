"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CERTIFICATIONS } from "@/lib/services/multi-norms-service"
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Save } from "lucide-react"

// Helper to flatten questions from categories into a linear array
function flattenQuestions(categories: any[]) {
  const flatQuestions: any[] = []
  categories.forEach(cat => {
    cat.questions.forEach((q: any) => {
      flatQuestions.push({
        ...q,
        categoryName: cat.name,
        categoryId: cat.id
      })
    })
  })
  return flatQuestions
}

export default function AssessmentPage({ params }: { params: { certificationId: string } }) {
  const router = useRouter()
  const certConfig = CERTIFICATIONS.find(c => c.id === params.certificationId)
  
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({}) // questionId -> score
  const [loading, setLoading] = useState(true)

  // Load questions on mount
  useEffect(() => {
    if (certConfig) {
      const flat = flattenQuestions(certConfig.categories)
      setQuestions(flat)
    }
    setLoading(false)
  }, [certConfig])

  // Restore progress from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem(`assessment_${params.certificationId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAnswers(parsed)
        // Auto-advance to the first unanswered question
        // Logic: find first index where questionId is not in keys of parsed
        // Simplification for now: just load answers
      } catch (e) {
        console.error("Failed to load saved progress", e)
      }
    }
  }, [params.certificationId])

  if (!certConfig) return <div className="p-8 text-center">Certification not found</div>
  if (loading) return <div className="p-8 text-center animate-pulse">Chargement de l'évaluation...</div>
  if (questions.length === 0) return <div className="p-8 text-center text-red-500">Erreur : Aucune question configurée pour cette certification.</div>

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / questions.length) * 100
  const isAnswered = answers[currentQuestion.id] !== undefined

  const handleSelectOption = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: score }
    setAnswers(newAnswers)
    localStorage.setItem(`assessment_${params.certificationId}`, JSON.stringify(newAnswers))
    
    // Auto advance after short delay for better UX
    setTimeout(() => {
     if (currentQuestionIndex < questions.length - 1) {
       handleNext()
     }
    }, 400)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Finish
      router.push(`/demo/${params.certificationId}/results`)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/30 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" className="text-muted-foreground" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quitter
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{certConfig.name}</span>
            <Badge variant="outline" className="bg-background">Question {currentQuestionIndex + 1}/{questions.length}</Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bento-card border-none shadow-2xl animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-vyxo-gold/10 text-vyxo-gold hover:bg-vyxo-gold/20">
                {currentQuestion.categoryName}
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl leading-tight">
              {currentQuestion.text}
            </CardTitle>
            {currentQuestion.description && (
              <CardDescription className="text-lg mt-2">
                {currentQuestion.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {currentQuestion.options.map((option: any, idx: number) => {
                const isSelected = answers[currentQuestion.id] === option.score
                
                return (
                  <div 
                    key={idx}
                    onClick={() => handleSelectOption(option.score)}
                    className={`
                      relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                      ${isSelected 
                        ? "border-vyxo-gold bg-vyxo-gold/5 shadow-md" 
                        : "border-border hover:border-vyxo-gold/50 hover:bg-secondary/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                        ${isSelected ? "border-vyxo-gold bg-vyxo-gold text-vyxo-navy" : "border-muted-foreground text-transparent group-hover:border-vyxo-gold"}
                      `}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium text-lg ${isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {option.label}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t">
              <Button 
                variant="ghost" 
                onClick={handlePrev} 
                disabled={currentQuestionIndex === 0}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!isAnswered}
                className={`
                  px-8 font-semibold transition-all
                  ${!isAnswered ? "opacity-50 cursor-not-allowed" : "bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 shadow-lg shadow-vyxo-gold/20"}
                `}
              >
                {currentQuestionIndex === questions.length - 1 ? "Terminer" : "Suivant"}
                {currentQuestionIndex < questions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
                {currentQuestionIndex === questions.length - 1 && <CheckCircle2 className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tip / Help */}
        <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
           <HelpCircle className="w-4 h-4" />
           <span>Besoin d'aide pour comprendre une question ? <a href="#" className="underline hover:text-vyxo-gold">Consultez le guide {certConfig.name}</a></span>
        </div>

      </div>
    </div>
  )
}
