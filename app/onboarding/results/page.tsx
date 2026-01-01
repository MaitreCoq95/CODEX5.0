"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Trophy,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Target,
  Download,
} from "lucide-react"
import { getTemplateByStandard } from "@/lib/data/assessments"
import type { AssessmentTemplate } from "@/lib/types/assessment.types"

// Calculate score from answers
function calculateResults(
  template: AssessmentTemplate,
  answers: Record<string, string | number>
) {
  let totalScore = 0
  let maxPossibleScore = 0
  const sectionResults: Array<{
    id: string
    name: string
    icon: string
    score: number
    maxScore: number
    percentage: number
    weight: number
  }> = []

  template.sections.forEach((section) => {
    let sectionScore = 0
    let sectionMaxScore = 0

    section.questions.forEach((question) => {
      const answer = answers[question.id]
      const weight = question.scoring.weight

      if (question.type === "scale") {
        const value = typeof answer === "number" ? answer : 0
        const maxValue = question.scaleMax || 5
        sectionScore += (value / maxValue) * question.scoring.maxPoints * weight
        sectionMaxScore += question.scoring.maxPoints * weight
      } else if (question.type === "single_choice" && question.options) {
        const selectedOption = question.options.find((o) => o.value === answer)
        sectionScore += (selectedOption?.score || 0) * weight
        sectionMaxScore += question.scoring.maxPoints * weight
      }
    })

    const percentage = sectionMaxScore > 0 ? (sectionScore / sectionMaxScore) * 100 : 0

    sectionResults.push({
      id: section.id,
      name: section.title,
      icon: section.icon || "📊",
      score: sectionScore,
      maxScore: sectionMaxScore,
      percentage,
      weight: section.weight,
    })

    // Weighted contribution to total
    totalScore += percentage * (section.weight / 100)
    maxPossibleScore += section.weight
  })

  // Normalize to 100
  const overallScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

  // Determine maturity level
  const maturityLevel =
    template.maturityLevels.find(
      (level) => overallScore >= level.minScore && overallScore <= level.maxScore
    ) || template.maturityLevels[0]

  // Identify gaps (sections below 50%)
  const gaps = sectionResults
    .filter((s) => s.percentage < 50)
    .sort((a, b) => a.percentage - b.percentage)

  // Identify strengths (sections above 70%)
  const strengths = sectionResults
    .filter((s) => s.percentage >= 70)
    .sort((a, b) => b.percentage - a.percentage)

  return {
    overallScore: Math.round(overallScore),
    maturityLevel,
    sectionResults,
    gaps,
    strengths,
    answeredCount: Object.keys(answers).length,
    totalQuestions: template.sections.reduce((acc, s) => acc + s.questions.length, 0),
  }
}

// Radar Chart Component (simplified SVG)
function RadarChart({
  sections,
}: {
  sections: Array<{ name: string; percentage: number; icon: string }>
}) {
  const size = 300
  const center = size / 2
  const radius = 100
  const angleStep = (2 * Math.PI) / sections.length

  const points = sections.map((section, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (section.percentage / 100) * radius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 30) * Math.cos(angle),
      labelY: center + (radius + 30) * Math.sin(angle),
      section,
    }
  })

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  // Grid circles
  const gridCircles = [25, 50, 75, 100]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-xs mx-auto">
      {/* Grid */}
      {gridCircles.map((pct) => (
        <circle
          key={pct}
          cx={center}
          cy={center}
          r={(pct / 100) * radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {sections.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        )
      })}

      {/* Data polygon */}
      <path d={pathData} fill="rgba(212, 175, 55, 0.3)" stroke="#D4AF37" strokeWidth="2" />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#D4AF37" />
      ))}

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-300 text-xs"
        >
          {p.section.icon}
        </text>
      ))}
    </svg>
  )
}

// Results Content Component
function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const standardCode = searchParams.get("standard") || "ISO_9001"

  const [template, setTemplate] = useState<AssessmentTemplate | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})

  useEffect(() => {
    const loadedTemplate = getTemplateByStandard(standardCode)
    if (loadedTemplate) {
      setTemplate(loadedTemplate)
      const saved = localStorage.getItem(`assessment_${standardCode}`)
      if (saved) {
        setAnswers(JSON.parse(saved))
      }
    }
  }, [standardCode])

  const results = useMemo(() => {
    if (!template) return null
    return calculateResults(template, answers)
  }, [template, answers])

  if (!template || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
        <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Vos Résultats</h1>
          <p className="text-gray-400">{template.name}</p>
        </motion.div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative">
                  <svg className="w-40 h-40" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={results.maturityLevel.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${results.overallScore * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{results.overallScore}%</span>
                  </div>
                </div>

                {/* Maturity Level */}
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-8 h-8" style={{ color: results.maturityLevel.color }} />
                    <span
                      className="text-2xl font-bold"
                      style={{ color: results.maturityLevel.color }}
                    >
                      Niveau {results.maturityLevel.level} - {results.maturityLevel.name}
                    </span>
                  </div>
                  <p className="text-gray-400">{results.maturityLevel.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {results.answeredCount} / {results.totalQuestions} questions répondues
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Radar Chart & Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-vyxo-gold" />
                  Profil de Maturité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChart sections={results.sectionResults} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Scores */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-vyxo-gold" />
                  Scores par Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.sectionResults.map((section) => (
                  <div key={section.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white text-sm">
                        {section.icon} {section.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {Math.round(section.percentage)}%
                      </span>
                    </div>
                    <Progress
                      value={section.percentage}
                      className={`h-2 ${
                        section.percentage >= 70
                          ? "[&>div]:bg-green-500"
                          : section.percentage >= 50
                          ? "[&>div]:bg-yellow-500"
                          : "[&>div]:bg-red-500"
                      }`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Gaps & Strengths */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Gaps */}
          {results.gaps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-red-500/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Points d&apos;Amélioration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {results.gaps.map((gap) => (
                    <div
                      key={gap.id}
                      className="flex items-center justify-between p-2 rounded bg-white/5"
                    >
                      <span className="text-white">
                        {gap.icon} {gap.name}
                      </span>
                      <span className="text-red-400 font-semibold">
                        {Math.round(gap.percentage)}%
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Strengths */}
          {results.strengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-green-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Points Forts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {results.strengths.map((strength) => (
                    <div
                      key={strength.id}
                      className="flex items-center justify-between p-2 rounded bg-white/5"
                    >
                      <span className="text-white">
                        {strength.icon} {strength.name}
                      </span>
                      <span className="text-green-400 font-semibold">
                        {Math.round(strength.percentage)}%
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Card className="bg-vyxo-gold/10 border-vyxo-gold/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Prêt à améliorer votre score ?
              </h3>
              <p className="text-gray-400 mb-4">
                Obtenez votre roadmap personnalisée et des templates pour atteindre la certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
                  onClick={() => router.push('/dashboard/roadmap')}
                >
                  Voir ma Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => router.push('/dashboard')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Accéder au Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Page with Suspense
export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
