"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Star
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock quiz data
const mockQuiz = {
  id: "quiz-cold-chain",
  moduleId: "cold-chain",
  moduleTitle: "Gestion de la Chaîne du Froid",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      text: "Quelle est la plage de température acceptable pour le stockage des médicaments standards ?",
      type: "single_choice",
      options: [
        { label: "0°C - 8°C", value: "a", isCorrect: false },
        { label: "8°C - 15°C", value: "b", isCorrect: false },
        { label: "15°C - 25°C", value: "c", isCorrect: true },
        { label: "25°C - 30°C", value: "d", isCorrect: false },
      ],
      explanation: "Selon les GDP, les médicaments standards doivent être stockés entre 15°C et 25°C, sauf indication contraire du fabricant.",
    },
    {
      id: "q2",
      text: "Que devez-vous faire en cas d'excursion de température pendant le transport ?",
      type: "single_choice",
      options: [
        { label: "Ignorer si c'est moins de 30 minutes", value: "a", isCorrect: false },
        { label: "Documenter et évaluer l'impact sur les produits", value: "b", isCorrect: true },
        { label: "Retourner tous les produits au fournisseur", value: "c", isCorrect: false },
        { label: "Attendre la prochaine livraison", value: "d", isCorrect: false },
      ],
      explanation: "Toute excursion de température doit être documentée et évaluée pour déterminer l'impact potentiel sur la qualité des produits.",
    },
    {
      id: "q3",
      text: "La qualification des équipements de transport est-elle obligatoire selon les GDP ?",
      type: "single_choice",
      options: [
        { label: "Vrai", value: "true", isCorrect: true },
        { label: "Faux", value: "false", isCorrect: false },
      ],
      explanation: "Oui, les GDP exigent que tous les équipements de transport soient qualifiés et maintenus pour garantir le maintien des conditions requises.",
    },
    {
      id: "q4",
      text: "Combien de temps les enregistrements de température doivent-ils être conservés ?",
      type: "single_choice",
      options: [
        { label: "1 an", value: "a", isCorrect: false },
        { label: "3 ans", value: "b", isCorrect: false },
        { label: "5 ans minimum", value: "c", isCorrect: true },
        { label: "10 ans", value: "d", isCorrect: false },
      ],
      explanation: "Les enregistrements de température doivent être conservés pendant au moins 5 ans, conformément aux exigences GDP.",
    },
    {
      id: "q5",
      text: "Quel type de monitoring est recommandé pour les produits thermosensibles critiques ?",
      type: "single_choice",
      options: [
        { label: "Contrôle manuel à l'arrivée", value: "a", isCorrect: false },
        { label: "Enregistreur passif jetable", value: "b", isCorrect: false },
        { label: "Monitoring temps réel avec alertes", value: "c", isCorrect: true },
        { label: "Aucun monitoring spécifique", value: "d", isCorrect: false },
      ],
      explanation: "Pour les produits thermosensibles critiques, un monitoring temps réel avec système d'alertes est recommandé pour permettre une intervention rapide.",
    },
  ],
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [startTime] = useState(Date.now())
  
  const quiz = mockQuiz
  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)
  
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }
  
  const goToNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }
  
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }
  
  // Calculate results
  const calculateResults = () => {
    const correctCount = quiz.questions.filter(q => {
      const userAnswer = answers[q.id]
      const correctOption = q.options.find(o => o.isCorrect)
      return userAnswer === correctOption?.value
    }).length
    
    const score = Math.round((correctCount / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore
    const xpEarned = passed ? (score >= 90 ? 150 : score >= 80 ? 100 : 75) : 25
    
    return { score, passed, correctCount, xpEarned }
  }
  
  if (showResults) {
    const results = calculateResults()
    const timeSpent = Math.round((Date.now() - startTime) / 60000)
    
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="bento-card max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            {/* Result Icon */}
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              results.passed ? "bg-emerald-500/10" : "bg-orange-500/10"
            }`}>
              {results.passed ? (
                <Trophy className="w-12 h-12 text-emerald-500" />
              ) : (
                <AlertCircle className="w-12 h-12 text-orange-500" />
              )}
            </div>
            
            {/* Score */}
            <h1 className="text-4xl font-bold mb-2">
              {results.score}%
            </h1>
            <p className={`text-xl font-medium mb-4 ${
              results.passed ? "text-emerald-500" : "text-orange-500"
            }`}>
              {results.passed ? "Félicitations, vous avez réussi !" : "Vous n'avez pas atteint le score minimum"}
            </p>
            
            <Badge className={results.passed ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"}>
              {results.correctCount} / {quiz.questions.length} bonnes réponses
            </Badge>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="p-4 rounded-xl bg-secondary">
                <Clock className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-lg font-bold">{timeSpent} min</p>
                <p className="text-xs text-muted-foreground">Temps passé</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <Star className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
                <p className="text-lg font-bold">+{results.xpEarned}</p>
                <p className="text-xs text-muted-foreground">XP gagnés</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
                <p className="text-lg font-bold">{quiz.passingScore}%</p>
                <p className="text-xs text-muted-foreground">Score requis</p>
              </div>
            </div>
            
            {/* Question Review */}
            <div className="text-left space-y-4 mb-8">
              <h3 className="font-semibold">Résumé des réponses</h3>
              {quiz.questions.map((q, i) => {
                const userAnswer = answers[q.id]
                const correctOption = q.options.find(o => o.isCorrect)
                const isCorrect = userAnswer === correctOption?.value
                
                return (
                  <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Q{i + 1}: {q.text}</p>
                        {!isCorrect && (
                          <p className="text-xs text-muted-foreground">{q.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Link href={`/learning/modules/${params.id}`}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Revoir le module
                </Button>
              </Link>
              {results.passed ? (
                <Link href="/learning/path">
                  <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                    Continuer le parcours
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                  onClick={() => {
                    setAnswers({})
                    setCurrentQuestionIndex(0)
                    setShowResults(false)
                  }}
                >
                  Réessayer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container-vyxo py-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-1">{quiz.moduleTitle}</Badge>
              <h1 className="text-lg font-semibold">Quiz de validation</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} / {quiz.questions.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </div>
      </div>
      
      {/* Question */}
      <div className="container-vyxo py-8 max-w-2xl">
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Question {currentQuestionIndex + 1}</span>
            </div>
            <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent>
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
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={goToPrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              <Button 
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                onClick={goToNext}
                disabled={!answers[currentQuestion.id]}
              >
                {currentQuestionIndex === quiz.questions.length - 1 ? "Terminer" : "Suivant"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
