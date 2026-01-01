import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  TrendingUp, 
  BookOpen,
  AlertTriangle,
  MessageSquare,
  Plus,
  MoreHorizontal,
  Activity,
  Clock,
  ChevronRight,
  Flame
} from "lucide-react"
import Link from "next/link"

// Types
interface TeamMember {
  id: string
  name: string
  email: string
  position: string
  avatar?: string
  score: number
  modulesCompleted: number
  totalModules: number
  lastActivity: Date
  status: "active" | "inactive" | "at_risk"
  streak: number
}

interface TeamAlert {
  id: string
  type: "inactivity" | "low_score" | "deadline_missed" | "gap_identified"
  severity: "warning" | "critical"
  memberId: string
  memberName: string
  message: string
  createdAt: Date
}

// Mock data
const teamStats = {
  totalMembers: 12,
  avgScore: 68,
  scoreChange: 3,
  modulesCompleted: 34,
  totalModules: 48,
  avgStreak: 5,
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Marie Laurent",
    email: "marie.laurent@company.fr",
    position: "Chauffeur-livreur",
    score: 85,
    modulesCompleted: 8,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "active",
    streak: 12,
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@company.fr",
    position: "Responsable qualité",
    score: 92,
    modulesCompleted: 10,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: "active",
    streak: 24,
  },
  {
    id: "3",
    name: "Sophie Martin",
    email: "sophie.martin@company.fr",
    position: "Préparatrice commandes",
    score: 54,
    modulesCompleted: 4,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "at_risk",
    streak: 0,
  },
  {
    id: "4",
    name: "Lucas Bernard",
    email: "lucas.bernard@company.fr",
    position: "Magasinier",
    score: 72,
    modulesCompleted: 6,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "inactive",
    streak: 3,
  },
  {
    id: "5",
    name: "Emma Petit",
    email: "emma.petit@company.fr",
    position: "Chauffeur-livreur",
    score: 78,
    modulesCompleted: 7,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: "active",
    streak: 8,
  },
]

const alerts: TeamAlert[] = [
  {
    id: "1",
    type: "inactivity",
    severity: "critical",
    memberId: "3",
    memberName: "Sophie Martin",
    message: "Aucune activité depuis 5 jours",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "low_score",
    severity: "warning",
    memberId: "3",
    memberName: "Sophie Martin",
    message: "Score inférieur à 60% (54%)",
    createdAt: new Date(),
  },
  {
    id: "3",
    type: "deadline_missed",
    severity: "warning",
    memberId: "4",
    memberName: "Lucas Bernard",
    message: "Module GDP Niveau 1 non terminé (deadline dépassée)",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

// Heatmap data
const competencies = ["GDP", "ISO 9001", "Sécurité", "Logistique", "HACCP"]
const heatmapData = teamMembers.map(member => ({
  name: member.name.split(" ")[0],
  scores: [
    Math.floor(Math.random() * 40) + 60,
    Math.floor(Math.random() * 40) + 50,
    Math.floor(Math.random() * 40) + 55,
    Math.floor(Math.random() * 40) + 45,
    Math.floor(Math.random() * 40) + 40,
  ],
}))

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-emerald-500"
  if (score >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

function getStatusBadge(status: TeamMember["status"]) {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-0">🟢 Actif</Badge>
    case "inactive":
      return <Badge className="bg-yellow-500/10 text-yellow-500 border-0">🟡 Inactif</Badge>
    case "at_risk":
      return <Badge className="bg-red-500/10 text-red-500 border-0">🔴 À risque</Badge>
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `Il y a ${diffMins}min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  return `Il y a ${diffDays}j`
}

export default function TeamDashboardPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mon Équipe</h1>
          <p className="text-muted-foreground">
            Gérez et suivez la progression de votre équipe
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/team/assignments">
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Assignments
            </Button>
          </Link>
          <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
            <Plus className="w-4 h-4 mr-2" />
            Assigner module
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamStats.totalMembers}</p>
                <p className="text-sm text-muted-foreground">Membres équipe</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-vyxo-gold/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-vyxo-gold" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{teamStats.avgScore}%</p>
                  <span className="text-sm text-emerald-500">+{teamStats.scoreChange}%</span>
                </div>
                <p className="text-sm text-muted-foreground">Score moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {teamStats.modulesCompleted}/{teamStats.totalModules}
                </p>
                <p className="text-sm text-muted-foreground">Modules complétés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamStats.avgStreak}j</p>
                <p className="text-sm text-muted-foreground">Streak moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Members Table */}
        <Card className="bento-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Membres de l'équipe
            </CardTitle>
            <Link href="/team/members">
              <Button variant="ghost" size="sm">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <Link 
                  key={member.id} 
                  href={`/team/members/${member.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 rounded-xl border hover:border-vyxo-gold/50 hover:bg-secondary/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-vyxo-navy text-white">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden md:block">
                        <p className="font-semibold">{member.modulesCompleted}/{member.totalModules}</p>
                        <p className="text-xs text-muted-foreground">modules</p>
                      </div>
                      <div className="w-24 hidden md:block">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{member.score}%</span>
                        </div>
                        <Progress value={member.score} className="h-2" />
                      </div>
                      <div className="text-right hidden lg:block">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="w-4 h-4" />
                          {formatRelativeTime(member.lastActivity)}
                        </div>
                      </div>
                      {getStatusBadge(member.status)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Alertes équipe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-xl border ${
                  alert.severity === "critical" 
                    ? "border-red-500/30 bg-red-500/5" 
                    : "border-orange-500/30 bg-orange-500/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{alert.memberName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      alert.severity === "critical" 
                        ? "border-red-500 text-red-500" 
                        : "border-orange-500 text-orange-500"
                    }
                  >
                    {alert.severity === "critical" ? "🔴" : "🟠"}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Assigner
                  </Button>
                </div>
              </div>
            ))}
            
            {alerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Aucune alerte</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Competency Heatmap */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Heatmap Compétences Équipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">Membre</th>
                  {competencies.map((comp) => (
                    <th key={comp} className="text-center p-2 font-medium text-sm text-muted-foreground">
                      {comp}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 font-medium">{row.name}</td>
                    {row.scores.map((score, j) => (
                      <td key={j} className="p-2 text-center">
                        <div 
                          className={`inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-sm font-medium ${getScoreColor(score)}`}
                        >
                          {score}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span>Expert (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500" />
              <span>Intermédiaire (60-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span>Débutant (&lt;60%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
