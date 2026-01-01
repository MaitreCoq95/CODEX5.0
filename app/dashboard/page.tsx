"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Trophy,
  Target,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Download,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { getTemplateByStandard } from "@/lib/data/assessments"
import { generateRoadmap } from "@/lib/services/roadmap-generator"
import { getTemplateCounts } from "@/lib/data/templates"

// Circle Progress Component
function CircleProgress({ value, size = 120, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference
  
  const getColor = () => {
    if (value >= 70) return "#22C55E"
    if (value >= 50) return "#EAB308"
    return "#EF4444"
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{value}%</span>
        <span className="text-xs text-gray-400">Maturité</span>
      </div>
    </div>
  )
}

// Small Radar Chart for dashboard
function MiniRadarChart({ sections }: { sections: { name: string; value: number }[] }) {
  const size = 150
  const center = size / 2
  const radius = 50
  const angleStep = (2 * Math.PI) / sections.length

  const points = sections.map((s, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (s.value / 100) * radius
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
  })

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[150px]">
      {[25, 50, 75, 100].map((pct) => (
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
      <path d={pathData} fill="rgba(212, 175, 55, 0.3)" stroke="#D4AF37" strokeWidth="2" />
    </svg>
  )
}

// Action Item Component
function ActionItem({ title, status, dueWeek }: { title: string; status: "done" | "current" | "upcoming"; dueWeek: number }) {
  const statusStyles = {
    done: { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "text-gray-500 line-through" },
    current: { icon: <Activity className="w-4 h-4 text-vyxo-gold" />, text: "text-white" },
    upcoming: { icon: <Clock className="w-4 h-4 text-gray-500" />, text: "text-gray-400" },
  }

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
      {statusStyles[status].icon}
      <span className={`flex-1 text-sm ${statusStyles[status].text}`}>{title}</span>
      <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
        S{dueWeek}
      </Badge>
    </div>
  )
}

// Quick Stat Widget
function QuickStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${color}`}>
      {icon}
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  )
}

// Main Dashboard Content
function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const standardCode = searchParams.get("standard") || "ISO_9001"

  const [loading, setLoading] = useState(true)
  const [maturityScore, setMaturityScore] = useState(0)
  const [sectionScores, setSectionScores] = useState<{ name: string; value: number }[]>([])
  const [completedActions, setCompletedActions] = useState<string[]>([])
  const [downloadedTemplatesCount, setDownloadedTemplatesCount] = useState(0)

  // Load data
  useEffect(() => {
    const template = getTemplateByStandard(standardCode)
    if (!template) {
      setLoading(false)
      return
    }

    // Get assessment answers
    const saved = localStorage.getItem(`assessment_${standardCode}`)
    if (saved) {
      const answers = JSON.parse(saved)
      
      // Calculate section scores
      const scores = template.sections.map((section) => {
        let score = 0
        let maxScore = 0
        
        section.questions.forEach((q) => {
          const answer = answers[q.id]
          if (q.type === "scale") {
            score += typeof answer === "number" ? answer : 0
            maxScore += q.scaleMax || 5
          }
        })
        
        return {
          name: section.title.split(" ")[0], // Short name
          value: maxScore > 0 ? Math.round((score / maxScore) * 100) : Math.round(Math.random() * 40 + 30)
        }
      })
      
      setSectionScores(scores)
      setMaturityScore(Math.round(scores.reduce((a, b) => a + b.value, 0) / scores.length))
    } else {
      // Demo data
      setSectionScores([
        { name: "Contexte", value: 65 },
        { name: "Leadership", value: 45 },
        { name: "Planification", value: 35 },
        { name: "Support", value: 55 },
        { name: "Opérations", value: 40 },
        { name: "Performance", value: 50 },
        { name: "Amélioration", value: 30 },
      ])
      setMaturityScore(46)
    }

    // Load completed actions
    const savedActions = localStorage.getItem(`roadmap_completed_${standardCode}`)
    if (savedActions) {
      setCompletedActions(JSON.parse(savedActions))
    }

    // Load downloaded templates count
    const savedDownloads = localStorage.getItem(`downloaded_templates_${standardCode}`)
    if (savedDownloads) {
      setDownloadedTemplatesCount(JSON.parse(savedDownloads).length)
    }

    setLoading(false)
  }, [standardCode])

  // Generate roadmap data
  const roadmapData = useMemo(() => {
    if (sectionScores.length === 0) return null
    
    const scores = sectionScores.map((s) => ({
      id: s.name.toLowerCase(),
      name: s.name,
      percentage: s.value,
      weight: 100 / sectionScores.length
    }))
    
    return generateRoadmap(standardCode, scores)
  }, [standardCode, sectionScores])

  // Template counts
  const templateCounts = useMemo(() => getTemplateCounts(standardCode), [standardCode])
  const totalTemplates = Object.values(templateCounts).reduce((a, b) => a + b, 0)

  // Standard names
  const standardNames: Record<string, string> = {
    ISO_9001: "ISO 9001:2015",
    GDP: "GDP / BPD",
    ISO_27001: "ISO 27001:2022",
    HACCP: "HACCP",
    ISO_42001: "ISO 42001",
    ISO_13485: "ISO 13485:2016",
    SURETE: "Sûreté Aéroportuaire",
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
        <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
      </div>
    )
  }

  const completedPercent = roadmapData 
    ? Math.round((completedActions.length / roadmapData.totalActions) * 100) 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Tableau de Bord</h1>
            <p className="text-gray-400">
              {standardNames[standardCode]} • Bienvenue sur votre espace certification
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20 text-white" asChild>
              <Link href={`/onboarding/assessment?standard=${standardCode}`}>
                Refaire le diagnostic
              </Link>
            </Button>
            <Button className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90" asChild>
              <Link href={`/dashboard/roadmap?standard=${standardCode}`}>
                <Target className="w-4 h-4 mr-2" />
                Voir la Roadmap
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Score + Radar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Maturity Score */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-vyxo-gold" />
                  Score de Maturité
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <CircleProgress value={maturityScore} size={140} />
                <div className="mt-4 text-center">
                  <Badge
                    className={`${
                      maturityScore >= 70
                        ? "bg-green-500/20 text-green-400"
                        : maturityScore >= 50
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {maturityScore >= 70 ? "Niveau Avancé" : maturityScore >= 50 ? "Niveau Intermédiaire" : "Niveau Initial"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Profil par Chapitre</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <MiniRadarChart sections={sectionScores} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Center Column - Progress + Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Sprint Progress */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-vyxo-gold" />
                  Progression Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Actions complétées</span>
                      <span className="text-white font-bold">
                        {completedActions.length}/{roadmapData?.totalActions || 0}
                      </span>
                    </div>
                    <Progress value={completedPercent} className="h-3 [&>div]:bg-vyxo-gold" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <QuickStat
                      icon={<Calendar className="w-5 h-5 text-blue-400" />}
                      label="Sprints"
                      value={roadmapData?.sprints.length || 0}
                      color="bg-blue-500/10"
                    />
                    <QuickStat
                      icon={<Clock className="w-5 h-5 text-purple-400" />}
                      label="Semaines"
                      value={roadmapData?.estimatedWeeks || 0}
                      color="bg-purple-500/10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Actions */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-white text-sm">Actions en Cours</CardTitle>
                <Link href={`/dashboard/roadmap?standard=${standardCode}`} className="text-vyxo-gold text-xs hover:underline flex items-center gap-1">
                  Voir tout <ArrowRight className="w-3 h-3" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-1">
                {roadmapData?.sprints[0]?.actions.slice(0, 4).map((action, i) => (
                  <ActionItem
                    key={action.id}
                    title={action.title}
                    status={completedActions.includes(action.id) ? "done" : i === 0 ? "current" : "upcoming"}
                    dueWeek={1}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Templates + Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Templates Stats */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-vyxo-gold" />
                  Bibliothèque
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <QuickStat
                    icon={<FileText className="w-5 h-5 text-green-400" />}
                    label="Templates"
                    value={totalTemplates}
                    color="bg-green-500/10"
                  />
                  <QuickStat
                    icon={<Download className="w-5 h-5 text-cyan-400" />}
                    label="Téléchargés"
                    value={downloadedTemplatesCount}
                    color="bg-cyan-500/10"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-white/20 text-white"
                  asChild
                >
                  <Link href={`/dashboard/templates?standard=${standardCode}`}>
                    Accéder aux templates
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-vyxo-gold/10 border-vyxo-gold/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-vyxo-gold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Générateur IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">
                  Créez vos documents personnalisés avec l'aide de l'IA.
                </p>
                <Button className="w-full bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90" asChild>
                  <Link href={`/dashboard/generator?standard=${standardCode}`}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Générer un document
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alert */}
            {maturityScore < 50 && (
              <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium text-sm">Attention</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Votre score de maturité est en dessous de 50%. Concentrez-vous sur les actions prioritaires de votre roadmap.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Page with Suspense
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
