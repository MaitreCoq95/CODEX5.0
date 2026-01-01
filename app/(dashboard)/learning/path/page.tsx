import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Target,
  Clock,
  CheckCircle2,
  Lock,
  Play,
  Award,
  ChevronRight,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

// Mock learning path data
const learningPath = {
  id: "path-gdp-1",
  goal: "Certification GDP Niveau 1",
  certification: "GDP",
  targetDate: "Mars 2025",
  progress: {
    overallProgress: 45,
    modulesCompleted: 4,
    totalModules: 9,
    estimatedTimeRemaining: 8,
    onTrack: true,
  },
  modules: [
    { moduleId: "gdp-intro", moduleTitle: "Introduction aux GDP", order: 1, status: "completed" as const, score: 92, estimatedDuration: 30, category: "GDP" },
    { moduleId: "quality-system", moduleTitle: "Système Qualité Pharmaceutique", order: 2, status: "completed" as const, score: 85, estimatedDuration: 45, category: "GDP" },
    { moduleId: "documentation", moduleTitle: "Documentation et Traçabilité", order: 3, status: "completed" as const, score: 78, estimatedDuration: 40, category: "GDP" },
    { moduleId: "personnel", moduleTitle: "Personnel et Formation", order: 4, status: "completed" as const, score: 88, estimatedDuration: 35, category: "GDP" },
    { moduleId: "cold-chain", moduleTitle: "Gestion de la Chaîne du Froid", order: 5, status: "in_progress" as const, estimatedDuration: 50, category: "GDP" },
    { moduleId: "transport", moduleTitle: "Transport et Livraison", order: 6, status: "available" as const, estimatedDuration: 35, category: "GDP" },
    { moduleId: "complaints", moduleTitle: "Gestion des Réclamations", order: 7, status: "locked" as const, estimatedDuration: 30, category: "GDP" },
    { moduleId: "self-inspection", moduleTitle: "Auto-inspections", order: 8, status: "locked" as const, estimatedDuration: 25, category: "GDP" },
    { moduleId: "gdp-advanced", moduleTitle: "GDP Niveau Avancé", order: 9, status: "locked" as const, estimatedDuration: 60, category: "GDP" },
  ],
  milestones: [
    { order: 1, title: "Fondamentaux GDP", completed: true, requiredModules: ["gdp-intro", "quality-system"], reward: { type: "badge", icon: "🎯" } },
    { order: 2, title: "Expert Documentation", completed: true, requiredModules: ["documentation", "personnel"], reward: { type: "xp", value: 500 } },
    { order: 3, title: "Maître Chaîne du Froid", completed: false, requiredModules: ["cold-chain", "transport"], reward: { type: "badge", icon: "❄️" } },
    { order: 4, title: "Certification Prêt", completed: false, requiredModules: ["gdp-advanced"], reward: { type: "certification", icon: "🏆" } },
  ],
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    case "in_progress":
      return <Play className="w-5 h-5 text-vyxo-gold" />
    case "available":
      return <div className="w-5 h-5 rounded-full border-2 border-vyxo-gold" />
    default:
      return <Lock className="w-5 h-5 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    completed: "bg-emerald-500/10 text-emerald-500",
    in_progress: "bg-vyxo-gold/10 text-vyxo-gold",
    available: "bg-blue-500/10 text-blue-500",
    locked: "bg-gray-500/10 text-gray-500",
  }
  const labels: Record<string, string> = {
    completed: "Complété",
    in_progress: "En cours",
    available: "Disponible",
    locked: "Verrouillé",
  }
  return <Badge className={styles[status]}>{labels[status]}</Badge>
}

export default function LearningPathPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/learning">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Mon Parcours</h1>
          <p className="text-muted-foreground">{learningPath.goal}</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bento-card bg-gradient-to-r from-vyxo-navy to-vyxo-navy/80 text-white">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <Badge className="bg-vyxo-gold text-vyxo-navy mb-2">{learningPath.certification}</Badge>
              <h2 className="text-2xl font-bold mb-4">{learningPath.goal}</h2>
              <div className="flex items-center gap-2 mb-2">
                <Progress value={learningPath.progress.overallProgress} className="h-3 flex-1" />
                <span className="font-bold">{learningPath.progress.overallProgress}%</span>
              </div>
              <p className="text-white/70 text-sm">
                {learningPath.progress.modulesCompleted} modules sur {learningPath.progress.totalModules} complétés
              </p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-white/10">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-70" />
              <p className="text-2xl font-bold">{learningPath.progress.estimatedTimeRemaining}h</p>
              <p className="text-sm text-white/70">restantes</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-white/10">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-70" />
              <p className="text-lg font-bold">{learningPath.targetDate}</p>
              <p className="text-sm text-white/70">objectif</p>
              {learningPath.progress.onTrack && (
                <Badge className="bg-emerald-500 mt-2">En bonne voie</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Jalons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
            {learningPath.milestones.map((milestone, index) => (
              <div key={milestone.order} className="flex items-center gap-4">
                <div 
                  className={`flex flex-col items-center min-w-[100px] p-4 rounded-xl border ${
                    milestone.completed 
                      ? "bg-emerald-500/10 border-emerald-500/30" 
                      : "border-border"
                  }`}
                >
                  <span className="text-2xl mb-2">
                    {milestone.completed ? "✅" : milestone.reward?.icon || "🎯"}
                  </span>
                  <span className="text-sm font-medium text-center">{milestone.title}</span>
                </div>
                {index < learningPath.milestones.length - 1 && (
                  <ChevronRight className={`w-5 h-5 shrink-0 ${
                    milestone.completed ? "text-emerald-500" : "text-muted-foreground"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modules Timeline */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>Modules du Parcours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-6">
              {learningPath.modules.map((module, index) => (
                <div key={module.moduleId} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    module.status === "completed" ? "bg-emerald-500/10" :
                    module.status === "in_progress" ? "bg-vyxo-gold/10 ring-2 ring-vyxo-gold" :
                    module.status === "available" ? "bg-blue-500/10" :
                    "bg-secondary"
                  }`}>
                    {getStatusIcon(module.status)}
                  </div>
                  
                  {/* Module card */}
                  <div className={`flex-1 p-4 rounded-xl border transition-colors ${
                    module.status === "in_progress" ? "border-vyxo-gold bg-vyxo-gold/5" :
                    module.status === "locked" ? "opacity-50" :
                    "hover:border-vyxo-gold/50"
                  }`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(module.status)}
                          <span className="text-sm text-muted-foreground">
                            ~{module.estimatedDuration} min
                          </span>
                        </div>
                        <h3 className="font-semibold">{module.moduleTitle}</h3>
                        {module.score !== undefined && (
                          <p className="text-sm text-emerald-500 mt-1">Score: {module.score}%</p>
                        )}
                      </div>
                      
                      {module.status !== "locked" && (
                        <Link href={`/learning/modules/${module.moduleId}`}>
                          <Button 
                            size="sm"
                            variant={module.status === "in_progress" ? "default" : "outline"}
                            className={module.status === "in_progress" ? "bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy" : ""}
                          >
                            {module.status === "completed" ? "Revoir" :
                             module.status === "in_progress" ? "Continuer" : "Commencer"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
