"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Clock,
  Brain,
  Zap,
  Target,
  Trophy
} from "lucide-react"
import confetti from "canvas-confetti"

interface AdaptiveQuestion {
  id: string
  text: string
  options: { id: string; text: string }[]
  correctAnswer: string
  difficulty: "easy" | "medium" | "hard"
  competency: string
  explanation?: string
  points: number
}

interface AdaptiveQuizProps {
  questions: AdaptiveQuestion[]
  competencyName: string
  onComplete: (result: {
    score: number
    correctAnswers: number
    totalQuestions: number
    finalDifficulty: string
    timeSpent: number
    competencyGain: number
  }) => void
  onExit?: () => void
  initialDifficulty?: "easy" | "medium" | "hard"
}

export function AdaptiveQuiz({
  questions,
  competencyName,
  onComplete,
  onExit,
  initialDifficulty = "medium"
}: AdaptiveQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(initialDifficulty)
  const [correctCount, setCorrectCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  // Filter questions by current difficulty
  const getQuestionsByDifficulty = (diff: string) => 
    questions.filter(q => q.difficulty === diff)

  // Get current question based on difficulty
  const currentQuestion = (() => {
    const difficultyQuestions = getQuestionsByDifficulty(difficulty)
    if (difficultyQuestions.length === 0) return questions[currentIndex % questions.length]
    return difficultyQuestions[currentIndex % difficultyQuestions.length]
  })()

  const totalQuestions = Math.min(10, questions.length) // Cap at 10 questions

  const handleAnswer = (answerId: string) => {
    if (isAnswered) return
    setSelectedAnswer(answerId)
  }

  const handleValidate = () => {
    if (!selectedAnswer || isAnswered) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setIsAnswered(true)

    if (correct) {
      // Calculate points based on difficulty and time
      const timeBonus = Math.max(0, 10 - Math.floor((Date.now() - questionStartTime) / 1000))
      const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2
      const points = Math.round(currentQuestion.points * difficultyMultiplier + timeBonus)
      
      setScore(prev => prev + points)
      setStreak(prev => prev + 1)
      setCorrectCount(prev => prev + 1)

      // Adaptive difficulty: increase after 2 correct in a row
      if (streak >= 1 && difficulty !== "hard") {
        setDifficulty(difficulty === "easy" ? "medium" : "hard")
      }

      // Confetti on streak
      if (streak >= 2) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
      }
    } else {
      setStreak(0)
      // Decrease difficulty after wrong answer
      if (difficulty !== "easy") {
        setDifficulty(difficulty === "hard" ? "medium" : "easy")
      }
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      // Quiz complete
      setIsComplete(true)
      
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      const finalScore = Math.round((correctCount / totalQuestions) * 100)
      const competencyGain = Math.round((correctCount / totalQuestions) * 15)

      if (finalScore >= 80) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      }

      onComplete({
        score,
        correctAnswers: correctCount,
        totalQuestions,
        finalDifficulty: difficulty,
        timeSpent,
        competencyGain
      })
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
      setQuestionStartTime(Date.now())
    }
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-emerald-500/10 text-emerald-500"
      case "medium": return "bg-yellow-500/10 text-yellow-500"
      case "hard": return "bg-red-500/10 text-red-500"
      default: return "bg-slate-500/10 text-slate-500"
    }
  }

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case "easy": return "Facile"
      case "medium": return "Moyen"
      case "hard": return "Difficile"
      default: return diff
    }
  }

  // Results Screen
  if (isComplete) {
    const percentage = Math.round((correctCount / totalQuestions) * 100)
    const competencyGain = Math.round((correctCount / totalQuestions) * 15)

    return (
      <Card className="max-w-2xl mx-auto bento-card">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            {percentage >= 80 ? (
              <Trophy className="w-16 h-16 mx-auto text-vyxo-gold" />
            ) : percentage >= 60 ? (
              <Target className="w-16 h-16 mx-auto text-blue-500" />
            ) : (
              <Brain className="w-16 h-16 mx-auto text-purple-500" />
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {percentage >= 80 ? "Excellent !" : percentage >= 60 ? "Bien joué !" : "Continuez !"}
          </h2>
          <p className="text-muted-foreground mb-6">
            Quiz adaptatif {competencyName} terminé
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-3xl font-bold text-vyxo-gold">{score}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-3xl font-bold">{correctCount}/{totalQuestions}</p>
              <p className="text-xs text-muted-foreground">Bonnes réponses</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-3xl font-bold text-emerald-500">+{competencyGain}%</p>
              <p className="text-xs text-muted-foreground">Compétence</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-sm text-muted-foreground">Niveau final :</span>
            <Badge className={getDifficultyColor(difficulty)}>
              {getDifficultyLabel(difficulty)}
            </Badge>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onExit}>
              Retour
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
            >
              Refaire le quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">{competencyName}</h2>
          <p className="text-sm text-muted-foreground">Question {currentIndex + 1}/{totalQuestions}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getDifficultyColor(difficulty)}>
            {getDifficultyLabel(difficulty)}
          </Badge>
          {streak >= 2 && (
            <Badge className="bg-orange-500/10 text-orange-500">
              🔥 x{streak}
            </Badge>
          )}
          <Badge variant="outline" className="text-vyxo-gold border-vyxo-gold">
            {score} pts
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="h-2" />

      {/* Question Card */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id
            const isTheCorrect = option.id === currentQuestion.correctAnswer
            
            let optionClass = "p-4 rounded-xl border-2 cursor-pointer transition-all "
            
            if (isAnswered) {
              if (isTheCorrect) {
                optionClass += "border-emerald-500 bg-emerald-500/10"
              } else if (isSelected && !isTheCorrect) {
                optionClass += "border-red-500 bg-red-500/10"
              } else {
                optionClass += "border-slate-700 opacity-50"
              }
            } else {
              optionClass += isSelected 
                ? "border-vyxo-gold bg-vyxo-gold/10"
                : "border-slate-700 hover:border-slate-500"
            }

            return (
              <div
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={optionClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  {isAnswered && isTheCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                  {isAnswered && isSelected && !isTheCorrect && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            )
          })}

          {/* Explanation */}
          {isAnswered && currentQuestion.explanation && (
            <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm">
                <span className="font-medium text-blue-400">💡 Explication : </span>
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onExit}>
          Quitter
        </Button>
        {!isAnswered ? (
          <Button
            onClick={handleValidate}
            disabled={!selectedAnswer}
            className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
          >
            Valider
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
          >
            {currentIndex + 1 >= totalQuestions ? "Voir résultats" : "Question suivante"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default AdaptiveQuiz
