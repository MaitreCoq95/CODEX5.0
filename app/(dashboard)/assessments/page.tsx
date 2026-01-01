import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  FileText,
  Clock,
  Play,
  CheckCircle2,
  BarChart3,
  ChevronRight,
  Award,
  Target
} from "lucide-react"
import Link from "next/link"

// Types
interface Assessment {
  id: string
  name: string
  description: string
  certification: string
  estimatedDuration: number
  questionsCount: number
  status: "available" | "in_progress" | "completed"
  progress?: number
  lastScore?: number
  lastAttemptAt?: Date
}

// Mock data
const assessments: Assessment[] = [
  {
    id: "gdp-level1",
    name: "Évaluation GDP Niveau 1",
    description: "Diagnostic complet de votre conformité aux Bonnes Pratiques de Distribution",
    certification: "GDP",
    estimatedDuration: 20,
    questionsCount: 25,
    status: "completed",
    lastScore: 72,
    lastAttemptAt: new Date("2024-12-10"),
  },
  {
    id: "iso-9001",
    name: "Auto-diagnostic ISO 9001",
    description: "Évaluez la maturité de votre système de management de la qualité",
    certification: "ISO 9001",
    estimatedDuration: 30,
    questionsCount: 35,
    status: "in_progress",
    progress: 45,
  },
  {
    id: "haccp",
    name: "Évaluation HACCP",
    description: "Diagnostic de votre système de gestion de la sécurité alimentaire",
    certification: "HACCP",
    estimatedDuration: 25,
    questionsCount: 30,
    status: "available",
  },
  {
    id: "iso-27001",
    name: "Auto-diagnostic ISO 27001",
    description: "Évaluez votre système de management de la sécurité de l'information",
    certification: "ISO 27001",
    estimatedDuration: 35,
    questionsCount: 40,
    status: "available",
  },
]

const stats = {
  completed: assessments.filter(a => a.status === "completed").length,
  inProgress: assessments.filter(a => a.status === "in_progress").length,
  avgScore: 72,
  certifications: 1,
}

function getStatusBadge(status: Assessment["status"]) {
  const styles = {
    available: "bg-blue-500/10 text-blue-500",
    in_progress: "bg-yellow-500/10 text-yellow-500",
    completed: "bg-emerald-500/10 text-emerald-500",
  }
  const labels = {
    available: "Disponible",
    in_progress: "En cours",
    completed: "Complété",
  }
  return <Badge className={styles[status]}>{labels[status]}</Badge>
}

function getCertificationColor(cert: string): string {
  const colors: Record<string, string> = {
    GDP: "bg-blue-500/10 text-blue-500",
    "ISO 9001": "bg-purple-500/10 text-purple-500",
    "ISO 27001": "bg-orange-500/10 text-orange-500",
    HACCP: "bg-emerald-500/10 text-emerald-500",
  }
  return colors[cert] || "bg-gray-500/10 text-gray-500"
}

export default function AssessmentsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">
            Évaluez votre niveau de maturité et identifiez vos axes d'amélioration
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Complétés</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Play className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{stats.inProgress}</p>
            <p className="text-sm text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
            <p className="text-2xl font-bold">{stats.avgScore}%</p>
            <p className="text-sm text-muted-foreground">Score moyen</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{stats.certifications}</p>
            <p className="text-sm text-muted-foreground">Certifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tous les assessments</h2>
        
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="bento-card hover:border-vyxo-gold/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCertificationColor(assessment.certification)}>
                      {assessment.certification}
                    </Badge>
                    {getStatusBadge(assessment.status)}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{assessment.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      ~{assessment.estimatedDuration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {assessment.questionsCount} questions
                    </span>
                    {assessment.lastScore !== undefined && (
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Dernier score: {assessment.lastScore}%
                      </span>
                    )}
                  </div>
                  
                  {assessment.status === "in_progress" && assessment.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-medium">{assessment.progress}%</span>
                      </div>
                      <Progress value={assessment.progress} className="h-2" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {assessment.status === "completed" && (
                    <Link href={`/assessments/${assessment.id}/results`}>
                      <Button variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Voir résultats
                      </Button>
                    </Link>
                  )}
                  
                  <Link href={`/demo/${assessment.certification}`}>
                    <Button 
                      className={assessment.status === "in_progress" 
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
                        : assessment.status === "completed"
                          ? "bg-secondary hover:bg-secondary/80"
                          : "bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                      }
                    >
                      {assessment.status === "in_progress" ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continuer
                        </>
                      ) : assessment.status === "completed" ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Refaire
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Commencer
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
