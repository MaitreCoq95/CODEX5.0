import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  Mail,
  BookOpen,
  MoreHorizontal,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  Play,
  Award,
  Calendar,
  MessageSquare,
  Save,
  Flame
} from "lucide-react"
import Link from "next/link"

// Types
interface MemberModule {
  id: string
  title: string
  category: string
  status: "completed" | "in_progress" | "todo"
  score?: number
  progress?: number
  completedAt?: Date
  assignedAt?: Date
  deadline?: Date
}

// Mock data
const member = {
  id: "1",
  name: "Marie Laurent",
  email: "marie.laurent@company.fr",
  position: "Chauffeur-livreur",
  department: "Équipe Logistique",
  avatar: null,
  score: 85,
  modulesCompleted: 8,
  totalModules: 12,
  timeSpent: "12h 34min",
  streak: 12,
  lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  joinedAt: new Date("2024-03-15"),
}

const modules: MemberModule[] = [
  {
    id: "1",
    title: "GDP Niveau 1 - Fondamentaux",
    category: "GDP",
    status: "completed",
    score: 92,
    completedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    title: "GDP Niveau 2 - Transport",
    category: "GDP",
    status: "completed",
    score: 88,
    completedAt: new Date("2024-11-20"),
  },
  {
    id: "3",
    title: "Sécurité routière",
    category: "Sécurité",
    status: "completed",
    score: 95,
    completedAt: new Date("2024-11-25"),
  },
  {
    id: "4",
    title: "Gestion chaîne du froid",
    category: "GDP",
    status: "completed",
    score: 78,
    completedAt: new Date("2024-12-01"),
  },
  {
    id: "5",
    title: "Documentation qualité",
    category: "ISO",
    status: "completed",
    score: 85,
    completedAt: new Date("2024-12-05"),
  },
  {
    id: "6",
    title: "Procédures d'urgence",
    category: "Sécurité",
    status: "completed",
    score: 90,
    completedAt: new Date("2024-12-08"),
  },
  {
    id: "7",
    title: "HACCP Niveau 1",
    category: "HACCP",
    status: "completed",
    score: 72,
    completedAt: new Date("2024-12-10"),
  },
  {
    id: "8",
    title: "Traçabilité produits",
    category: "GDP",
    status: "completed",
    score: 88,
    completedAt: new Date("2024-12-12"),
  },
  {
    id: "9",
    title: "GDP Niveau 3 - Validation",
    category: "GDP",
    status: "in_progress",
    progress: 65,
    assignedAt: new Date("2024-12-10"),
    deadline: new Date("2024-12-25"),
  },
  {
    id: "10",
    title: "Audit interne",
    category: "ISO",
    status: "in_progress",
    progress: 30,
    assignedAt: new Date("2024-12-12"),
    deadline: new Date("2024-12-30"),
  },
  {
    id: "11",
    title: "HACCP Niveau 2",
    category: "HACCP",
    status: "todo",
    assignedAt: new Date("2024-12-15"),
  },
  {
    id: "12",
    title: "Management qualité",
    category: "ISO",
    status: "todo",
    assignedAt: new Date("2024-12-15"),
  },
]

const competencies = [
  { name: "Gestion chaîne du froid", score: 88, category: "GDP" },
  { name: "Documentation", score: 85, category: "ISO" },
  { name: "Sécurité routière", score: 95, category: "Sécurité" },
  { name: "HACCP", score: 72, category: "HACCP" },
  { name: "Procédures ISO", score: 68, category: "ISO" },
]

const managerNotes = "Marie progresse bien sur les modules GDP. À surveiller: les modules HACCP où elle a un score inférieur à la moyenne. Prévoir un accompagnement personnalisé sur ce sujet. RDV prévu le 20/12 pour point de suivi."

function getStatusIcon(status: MemberModule["status"]) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    case "in_progress":
      return <Play className="w-5 h-5 text-blue-500" />
    case "todo":
      return <Circle className="w-5 h-5 text-muted-foreground" />
  }
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

export default function TeamMemberDetailPage({ params }: { params: { id: string } }) {
  const completedModules = modules.filter((m) => m.status === "completed")
  const inProgressModules = modules.filter((m) => m.status === "in_progress")
  const todoModules = modules.filter((m) => m.status === "todo")

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <Link 
          href="/team" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'équipe
        </Link>
        
        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={member.avatar || undefined} />
                  <AvatarFallback className="bg-vyxo-navy text-white text-xl">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{member.name}</h1>
                  <p className="text-muted-foreground">
                    {member.position} • {member.department}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    📧 {member.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer message
                </Button>
                <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Assigner module
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
            <p className="text-2xl font-bold">{member.score}%</p>
            <p className="text-xs text-muted-foreground">Score Global</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{member.modulesCompleted}/{member.totalModules}</p>
            <p className="text-xs text-muted-foreground">Progression</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{member.timeSpent}</p>
            <p className="text-xs text-muted-foreground">Temps passé</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto text-orange-500 mb-2" />
            <p className="text-2xl font-bold">{member.streak}j</p>
            <p className="text-xs text-muted-foreground">Streak actuel</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Modules */}
        <div className="lg:col-span-2 space-y-6">
          {/* In Progress */}
          {inProgressModules.length > 0 && (
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-500" />
                  En cours ({inProgressModules.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inProgressModules.map((module) => (
                  <div key={module.id} className="p-4 rounded-xl border bg-blue-500/5 border-blue-500/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge className={getCategoryColor(module.category)}>{module.category}</Badge>
                        <h4 className="font-medium mt-2">{module.title}</h4>
                      </div>
                      {module.deadline && (
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Deadline</p>
                          <p className="text-sm font-medium">
                            {module.deadline.toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={module.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Completed */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Complétés ({completedModules.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(module.status)}
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Complété le {module.completedAt?.toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getCategoryColor(module.category)}>{module.category}</Badge>
                      <Badge variant="outline" className="font-semibold">
                        {module.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* To Do */}
          {todoModules.length > 0 && (
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Circle className="w-5 h-5 text-muted-foreground" />
                  À faire ({todoModules.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todoModules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(module.status)}
                        <div>
                          <p className="font-medium text-muted-foreground">{module.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Assigné le {module.assignedAt?.toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(module.category)}>{module.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Competencies */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Compétences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {competencies.map((comp, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{comp.name}</span>
                    <span className="font-medium">{comp.score}%</span>
                  </div>
                  <Progress 
                    value={comp.score} 
                    className={`h-2 ${comp.score >= 80 ? "[&>div]:bg-emerald-500" : comp.score >= 60 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"}`} 
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">💪 Forces</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">Sécurité routière</Badge>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">Chaîne du froid</Badge>
                </div>
                
                <h4 className="font-medium text-sm mt-4 mb-2">📈 À améliorer</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">HACCP</Badge>
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">Procédures ISO</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manager Notes */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Notes Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                defaultValue={managerNotes}
                placeholder="Ajoutez vos notes privées sur ce membre..."
                className="min-h-32 resize-none"
              />
              <Button variant="outline" className="mt-3 w-full">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Ces notes sont visibles uniquement par vous
              </p>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-vyxo-gold" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg border bg-vyxo-gold/5 border-vyxo-gold/20">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-vyxo-gold" />
                  <span className="font-medium">GDP Transport Niveau 2</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Obtenu le 01/12/2024</p>
              </div>
              <div className="p-3 rounded-lg border border-dashed">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">GDP Transport Niveau 3</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">En cours (65%)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
