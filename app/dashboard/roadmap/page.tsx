"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  FileText,
  AlertTriangle,
  Target,
  Zap,
  Download,
} from "lucide-react"
import { getTemplateByStandard } from "@/lib/data/assessments"
import { generateRoadmap } from "@/lib/services/roadmap-generator"
import type { Sprint, Action } from "@/lib/data/actions"

// Priority badge colors
const priorityColors = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

// Category icons
const categoryIcons: Record<string, string> = {
  documentation: "📄",
  process: "⚙️",
  training: "🎓",
  audit: "🔍",
  infrastructure: "🏗️",
  management: "👔",
}

// Action Card Component
function ActionCard({
  action,
  isCompleted,
  onToggle,
}: {
  action: Action
  isCompleted: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-4 transition-all ${
        isCompleted
          ? "bg-green-500/10 border-green-500/30"
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`mt-1 transition-colors ${
            isCompleted ? "text-green-500" : "text-gray-500 hover:text-white"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg">{categoryIcons[action.category]}</span>
            <h4 className={`font-medium ${isCompleted ? "line-through text-gray-500" : "text-white"}`}>
              {action.title}
            </h4>
            <Badge variant="outline" className={priorityColors[action.priority]}>
              {action.priority}
            </Badge>
          </div>

          <p className="text-gray-400 text-sm mt-1">{action.description}</p>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {action.estimatedHours}h
            </span>
            {action.templateIds && action.templateIds.length > 0 && (
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {action.templateIds.length} template(s)
              </span>
            )}
          </div>

          {/* Expandable details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-vyxo-gold text-sm mt-2 hover:underline"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {expanded ? "Masquer" : "Voir les livrables"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 pl-4 border-l-2 border-vyxo-gold/30"
            >
              <p className="text-sm text-gray-300 mb-2">Livrables attendus :</p>
              <ul className="text-sm text-gray-400 space-y-1">
                {action.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-vyxo-gold rounded-full" />
                    {d}
                  </li>
                ))}
              </ul>
              {action.tips && action.tips.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-300 mb-1">💡 Conseils :</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {action.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Sprint Timeline Component
function SprintTimeline({
  sprints,
  completedActions,
  onToggleAction,
}: {
  sprints: Sprint[]
  completedActions: string[]
  onToggleAction: (actionId: string) => void
}) {
  const [expandedSprints, setExpandedSprints] = useState<number[]>([1])

  const toggleSprint = (sprintNum: number) => {
    setExpandedSprints((prev) =>
      prev.includes(sprintNum) ? prev.filter((n) => n !== sprintNum) : [...prev, sprintNum]
    )
  }

  return (
    <div className="space-y-4">
      {sprints.map((sprint) => {
        const completedCount = sprint.actions.filter((a) =>
          completedActions.includes(a.id)
        ).length
        const progress = (completedCount / sprint.actions.length) * 100
        const isExpanded = expandedSprints.includes(sprint.number)

        return (
          <Card
            key={sprint.number}
            className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden"
          >
            <CardHeader
              className="cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleSprint(sprint.number)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-vyxo-gold" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <CardTitle className="text-white text-lg">{sprint.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Semaines {sprint.startWeek}-{sprint.endWeek}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {sprint.totalHours}h estimées
                      </span>
                      <span>
                        {completedCount}/{sprint.actions.length} actions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-24">
                  <Progress value={progress} className="h-2" />
                  <span className="text-xs text-gray-500 mt-1 block text-right">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0 space-y-3">
                {sprint.actions.map((action) => (
                  <ActionCard
                    key={action.id}
                    action={action}
                    isCompleted={completedActions.includes(action.id)}
                    onToggle={() => onToggleAction(action.id)}
                  />
                ))}
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}

// Main Roadmap Content
function RoadmapContent() {
  const searchParams = useSearchParams()
  const standardCode = searchParams.get("standard") || "ISO_9001"

  const [completedActions, setCompletedActions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Load assessment results and generate roadmap
  const roadmap = useMemo(() => {
    const template = getTemplateByStandard(standardCode)
    if (!template) return null

    // Get saved answers
    const saved = localStorage.getItem(`assessment_${standardCode}`)
    if (!saved) {
      // Generate demo roadmap with simulated gaps
      const demoScores = template.sections.map((s, i) => ({
        id: s.id,
        name: s.title,
        percentage: 30 + Math.random() * 40, // 30-70% random scores
        weight: s.weight,
      }))
      return generateRoadmap(standardCode, demoScores)
    }

    // Calculate real scores from answers
    const answers = JSON.parse(saved)
    const sectionScores = template.sections.map((section) => {
      let score = 0
      let maxScore = 0

      section.questions.forEach((q) => {
        const answer = answers[q.id]
        if (q.type === "scale") {
          score += typeof answer === "number" ? answer : 0
          maxScore += q.scaleMax || 5
        } else if (q.type === "single_choice" && q.options) {
          const opt = q.options.find((o) => o.value === answer)
          score += opt?.score || 0
          maxScore += q.scoring?.maxPoints || 5
        }
      })

      return {
        id: section.id,
        name: section.title,
        percentage: maxScore > 0 ? (score / maxScore) * 100 : 0,
        weight: section.weight,
      }
    })

    return generateRoadmap(standardCode, sectionScores)
  }, [standardCode])

  // Load completed actions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`roadmap_completed_${standardCode}`)
    if (saved) {
      setCompletedActions(JSON.parse(saved))
    }
    setLoading(false)
  }, [standardCode])

  // Save completed actions
  const toggleAction = (actionId: string) => {
    setCompletedActions((prev) => {
      const updated = prev.includes(actionId)
        ? prev.filter((id) => id !== actionId)
        : [...prev, actionId]
      localStorage.setItem(`roadmap_completed_${standardCode}`, JSON.stringify(updated))
      return updated
    })
  }

  if (loading || !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
        <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
      </div>
    )
  }

  const completedPercent = (completedActions.length / roadmap.totalActions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Votre Roadmap</h1>
          <p className="text-gray-400">Plan d&apos;action personnalisé vers la certification</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-vyxo-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{roadmap.totalActions}</p>
              <p className="text-gray-400 text-sm">Actions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-vyxo-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{roadmap.sprints.length}</p>
              <p className="text-gray-400 text-sm">Sprints</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-vyxo-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{roadmap.totalHours}h</p>
              <p className="text-gray-400 text-sm">Estimées</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-vyxo-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{roadmap.estimatedWeeks}</p>
              <p className="text-gray-400 text-sm">Semaines</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-vyxo-gold/10 border-vyxo-gold/20">
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-white font-medium">Progression globale</span>
                <span className="text-vyxo-gold font-bold">
                  {completedActions.length}/{roadmap.totalActions} ({Math.round(completedPercent)}%)
                </span>
              </div>
              <Progress value={completedPercent} className="h-3 [&>div]:bg-vyxo-gold" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Alert if no assessment */}
        {!localStorage.getItem(`assessment_${standardCode}`) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-yellow-400 font-medium">Roadmap démo</p>
                  <p className="text-gray-400 text-sm">
                    Complétez le diagnostic pour une roadmap personnalisée.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-yellow-500/30 text-yellow-400"
                  onClick={() => window.location.href = `/onboarding/assessment?standard=${standardCode}`}
                >
                  Faire le diagnostic
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Sprint Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Plan par Sprint</h2>
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>

          <SprintTimeline
            sprints={roadmap.sprints}
            completedActions={completedActions}
            onToggleAction={toggleAction}
          />
        </motion.div>
      </div>
    </div>
  )
}

// Page with Suspense
export default function RoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
        </div>
      }
    >
      <RoadmapContent />
    </Suspense>
  )
}
