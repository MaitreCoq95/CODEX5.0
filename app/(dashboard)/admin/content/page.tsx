import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen,
  FileText,
  Plus,
  ChevronRight,
  Clock,
  Users,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"

// Types
interface Module {
  id: string
  title: string
  category: string
  status: "draft" | "published" | "archived"
  completions: number
  avgScore: number
  duration: number
  updatedAt: Date
}

interface Assessment {
  id: string
  name: string
  type: string
  status: "draft" | "published"
  completions: number
  avgScore: number
  updatedAt: Date
}

// Mock data
const recentModules: Module[] = [
  { id: "1", title: "GDP Niveau 1 - Fondamentaux", category: "GDP", status: "published", completions: 128, avgScore: 82, duration: 45, updatedAt: new Date("2024-12-10") },
  { id: "2", title: "ISO 9001 - Principes de base", category: "ISO", status: "published", completions: 95, avgScore: 78, duration: 60, updatedAt: new Date("2024-12-08") },
  { id: "3", title: "HACCP Niveau 2", category: "HACCP", status: "draft", completions: 0, avgScore: 0, duration: 90, updatedAt: new Date("2024-12-15") },
  { id: "4", title: "Sécurité routière avancée", category: "Sécurité", status: "published", completions: 67, avgScore: 85, duration: 30, updatedAt: new Date("2024-12-05") },
]

const recentAssessments: Assessment[] = [
  { id: "1", name: "Évaluation GDP complète", type: "GDP", status: "published", completions: 48, avgScore: 67, updatedAt: new Date("2024-12-12") },
  { id: "2", name: "Auto-diagnostic ISO 9001", type: "ISO", status: "published", completions: 32, avgScore: 72, updatedAt: new Date("2024-12-10") },
  { id: "3", name: "Test HACCP niveau 1", type: "HACCP", status: "draft", completions: 0, avgScore: 0, updatedAt: new Date("2024-12-14") },
]

const stats = {
  totalModules: 24,
  publishedModules: 18,
  totalAssessments: 8,
  publishedAssessments: 6,
  totalCompletions: 450,
  avgEngagement: 78,
}

function getStatusBadge(status: "draft" | "published" | "archived") {
  const styles = {
    published: "bg-emerald-500/10 text-emerald-500",
    draft: "bg-yellow-500/10 text-yellow-500",
    archived: "bg-gray-500/10 text-gray-500",
  }
  const labels = {
    published: "Publié",
    draft: "Brouillon",
    archived: "Archivé",
  }
  return <Badge className={styles[status]}>{labels[status]}</Badge>
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    GDP: "bg-blue-500/10 text-blue-500",
    ISO: "bg-purple-500/10 text-purple-500",
    Sécurité: "bg-orange-500/10 text-orange-500",
    HACCP: "bg-emerald-500/10 text-emerald-500",
  }
  return colors[category] || "bg-gray-500/10 text-gray-500"
}

export default function AdminContentPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion de contenu</h1>
          <p className="text-muted-foreground">
            Créez et gérez vos modules de formation et assessments
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/content/modules/new">
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Nouveau module
            </Button>
          </Link>
          <Link href="/admin/content/assessments/new">
            <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
              <FileText className="w-4 h-4 mr-2" />
              Nouvel assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalModules}</p>
            <p className="text-sm text-muted-foreground">Modules ({stats.publishedModules} publiés)</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalAssessments}</p>
            <p className="text-sm text-muted-foreground">Assessments ({stats.publishedAssessments} publiés)</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalCompletions}</p>
            <p className="text-sm text-muted-foreground">Complétions totales</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
            <p className="text-2xl font-bold">{stats.avgEngagement}%</p>
            <p className="text-sm text-muted-foreground">Taux d'engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Modules */}
        <Card className="bento-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Modules récents
            </CardTitle>
            <Link href="/admin/content/modules">
              <Button variant="ghost" size="sm">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentModules.map((module) => (
              <div 
                key={module.id}
                className="flex items-center justify-between p-4 rounded-xl border hover:border-vyxo-gold/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getCategoryColor(module.category)}>{module.category}</Badge>
                    {getStatusBadge(module.status)}
                  </div>
                  <h4 className="font-medium truncate">{module.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {module.duration}min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {module.completions}
                    </span>
                    {module.avgScore > 0 && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {module.avgScore}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assessments */}
        <Card className="bento-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Assessments récents
            </CardTitle>
            <Link href="/admin/content/assessments">
              <Button variant="ghost" size="sm">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAssessments.map((assessment) => (
              <div 
                key={assessment.id}
                className="flex items-center justify-between p-4 rounded-xl border hover:border-vyxo-gold/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getCategoryColor(assessment.type)}>{assessment.type}</Badge>
                    {getStatusBadge(assessment.status)}
                  </div>
                  <h4 className="font-medium truncate">{assessment.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {assessment.completions} complétions
                    </span>
                    {assessment.avgScore > 0 && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Moy. {assessment.avgScore}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/admin/content/modules/new">
              <div className="p-4 rounded-xl border hover:border-vyxo-gold/50 transition-colors cursor-pointer text-center">
                <BookOpen className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <p className="font-medium">Créer un module</p>
                <p className="text-xs text-muted-foreground mt-1">Formation interactive</p>
              </div>
            </Link>
            <Link href="/admin/content/assessments/new">
              <div className="p-4 rounded-xl border hover:border-vyxo-gold/50 transition-colors cursor-pointer text-center">
                <FileText className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                <p className="font-medium">Créer un assessment</p>
                <p className="text-xs text-muted-foreground mt-1">Évaluation de maturité</p>
              </div>
            </Link>
            <div className="p-4 rounded-xl border hover:border-vyxo-gold/50 transition-colors cursor-pointer text-center">
              <Plus className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <p className="font-medium">Importer contenu</p>
              <p className="text-xs text-muted-foreground mt-1">SCORM, PDF, Vidéo</p>
            </div>
            <div className="p-4 rounded-xl border hover:border-vyxo-gold/50 transition-colors cursor-pointer text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-vyxo-gold mb-2" />
              <p className="font-medium">Voir analytics</p>
              <p className="text-xs text-muted-foreground mt-1">Performance contenu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
