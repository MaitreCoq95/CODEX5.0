"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ChevronLeft,
  ChevronRight,
  Clock,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { useRouter } from "next/navigation"

// Types
interface QuestionOption {
  label: string
  value: string
  score: number
}

interface Question {
  id: string
  text: string
  type: "single_choice" | "multiple_choice" | "scale" | "yes_no"
  options: QuestionOption[]
  helpText?: string
}

interface Section {
  id: string
  title: string
  description?: string
  questions: Question[]
}

interface AssessmentTemplate {
  id: string
  name: string
  certification: string
  sections: Section[]
}

// Mock assessment template
const mockTemplate: AssessmentTemplate = {
  id: "gdp-level1",
  name: "Évaluation GDP Niveau 1",
  certification: "GDP",
  sections: [
    {
      id: "section-1",
      title: "Système Qualité",
      description: "Évaluation du système de management de la qualité",
      questions: [
        {
          id: "q1",
          text: "Disposez-vous d'un système qualité pharmaceutique documenté conforme aux BPD ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "En cours de mise en place", value: "partial", score: 25 },
            { label: "Oui, partiellement documenté", value: "mostly", score: 60 },
            { label: "Oui, complet et revu périodiquement", value: "complete", score: 100 },
          ],
          helpText: "Un système qualité documenté est requis par le chapitre 1 des GDP.",
        },
        {
          id: "q2",
          text: "Comment gérez-vous les réclamations clients ?",
          type: "single_choice",
          options: [
            { label: "Pas de procédure formelle", value: "none", score: 0 },
            { label: "Traitement au cas par cas", value: "adhoc", score: 30 },
            { label: "Procédure définie mais non systématique", value: "partial", score: 60 },
            { label: "Procédure documentée avec suivi et analyse", value: "complete", score: 100 },
          ],
        },
        {
          id: "q3",
          text: "Réalisez-vous des auto-inspections régulières ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "Occasionnellement", value: "occasional", score: 40 },
            { label: "Annuellement", value: "annual", score: 70 },
            { label: "Régulièrement avec suivi des actions", value: "regular", score: 100 },
          ],
        },
      ],
    },
    {
      id: "section-2",
      title: "Chaîne du Froid",
      description: "Gestion de la température et qualification des équipements",
      questions: [
        {
          id: "q4",
          text: "Comment surveillez-vous la température pendant le transport ?",
          type: "single_choice",
          options: [
            { label: "Pas de surveillance", value: "none", score: 0 },
            { label: "Surveillance manuelle ponctuelle", value: "manual", score: 30 },
            { label: "Enregistreurs de température passifs", value: "passive", score: 60 },
            { label: "Monitoring temps réel avec alertes", value: "realtime", score: 100 },
          ],
        },
        {
          id: "q5",
          text: "Vos équipements de transport sont-ils qualifiés ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "Qualification initiale uniquement", value: "initial", score: 40 },
            { label: "Qualification et maintenance préventive", value: "maintenance", score: 70 },
            { label: "Qualification complète avec requalification périodique", value: "complete", score: 100 },
          ],
        },
      ],
    },
    {
      id: "section-3",
      title: "Traçabilité",
      description: "Systèmes de traçabilité et gestion des rappels",
      questions: [
        {
          id: "q6",
          text: "Pouvez-vous tracer un lot de la réception à la livraison ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "Partiellement (quelques étapes manquantes)", value: "partial", score: 50 },
            { label: "Oui, traçabilité complète", value: "complete", score: 100 },
          ],
        },
        {
          id: "q7",
          text: "Avez-vous testé votre procédure de rappel dans les 12 derniers mois ?",
          type: "yes_no",
          options: [
            { label: "Oui", value: "yes", score: 100 },
            { label: "Non", value: "no", score: 0 },
          ],
        },
      ],
    },
  ],
}

export default function TakeAssessmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime] = useState(new Date())
  
  const template = mockTemplate
  const currentSection = template.sections[currentSectionIndex]
  const currentQuestion = currentSection?.questions[currentQuestionIndex]
  
  // Calculate progress
  const totalQuestions = template.sections.reduce((acc, s) => acc + s.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progressPercent = Math.round((answeredQuestions / totalQuestions) * 100)
  
  // Calculate overall question index
  const overallQuestionIndex = template.sections
    .slice(0, currentSectionIndex)
    .reduce((acc, s) => acc + s.questions.length, 0) + currentQuestionIndex + 1
  
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }
  
  const goToNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (currentSectionIndex < template.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1)
      setCurrentQuestionIndex(0)
    }
  }
  
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1)
      setCurrentQuestionIndex(template.sections[currentSectionIndex - 1].questions.length - 1)
    }
  }
  
  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0
  const isLastQuestion = currentSectionIndex === template.sections.length - 1 && 
                         currentQuestionIndex === currentSection.questions.length - 1
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to results
    router.push(`/assessments/${params.id}/results`)
  }
  
  const elapsedMinutes = Math.floor((new Date().getTime() - startTime.getTime()) / 60000)
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container-vyxo py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{template.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <Badge>{template.certification}</Badge>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {elapsedMinutes} min
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Question {overallQuestionIndex} sur {totalQuestions}</span>
              <span>{progressPercent}% complété</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container-vyxo py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Sections navigation */}
          <div className="hidden lg:block">
            <Card className="bento-card sticky top-32">
              <CardHeader>
                <CardTitle className="text-sm">Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {template.sections.map((section, index) => {
                  const sectionAnswered = section.questions.filter(q => answers[q.id]).length
                  const isComplete = sectionAnswered === section.questions.length
                  const isCurrent = index === currentSectionIndex
                  
                  return (
                    <div 
                      key={section.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        isCurrent 
                          ? "bg-vyxo-gold/10 border border-vyxo-gold" 
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => {
                        setCurrentSectionIndex(index)
                        setCurrentQuestionIndex(0)
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${isCurrent ? "text-vyxo-gold" : ""}`}>
                          {section.title}
                        </span>
                        {isComplete && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {sectionAnswered}/{section.questions.length} répondues
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
          
          {/* Question area */}
          <div className="lg:col-span-3">
            <Card className="bento-card">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Badge variant="outline">{currentSection.title}</Badge>
                </div>
                <CardTitle className="text-xl">{currentQuestion?.text}</CardTitle>
                {currentQuestion?.helpText && (
                  <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-blue-500/10 text-sm">
                    <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>{currentQuestion.helpText}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {/* Answer options */}
                {currentQuestion?.type === "single_choice" || currentQuestion?.type === "yes_no" ? (
                  <RadioGroup 
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleAnswer}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div 
                        key={option.value}
                        className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                          answers[currentQuestion.id] === option.value
                            ? "border-vyxo-gold bg-vyxo-gold/5"
                            : "hover:border-vyxo-gold/50"
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : null}
                
                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={goToPrevious}
                    disabled={isFirstQuestion}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>
                  
                  {isLastQuestion ? (
                    <Button 
                      className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                      onClick={handleSubmit}
                      disabled={isSubmitting || answeredQuestions < totalQuestions}
                    >
                      {isSubmitting ? (
                        <>Calcul des résultats...</>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Terminer l'assessment
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                      onClick={goToNext}
                      disabled={!answers[currentQuestion.id]}
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
