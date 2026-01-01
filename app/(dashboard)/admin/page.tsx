import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  TrendingUp, 
  Award,
  Building2,
  AlertTriangle,
  BookOpen,
  Settings,
  ChevronRight,
  Activity,
  UserPlus,
  FileText,
  BarChart3
} from "lucide-react"
import Link from "next/link"

// Types
interface DepartmentScore {
  name: string
  score: number
  memberCount: number
  change: number
}

interface AdminAlert {
  id: string
  type: "gap" | "inactive" | "deadline" | "certification"
  severity: "warning" | "critical"
  title: string
  description: string
  createdAt: Date
}

// Mock data
const stats = {
  activeUsers: 142,
  usersChange: 3,
  maturityScore: 67,
  maturityChange: 12,
  certifications: 28,
  certificationsChange: 5,
  totalModules: 48,
  completedModules: 34,
}

const departmentScores: DepartmentScore[] = [
  { name: "Logistique", score: 78, memberCount: 45, change: 8 },
  { name: "Production", score: 72, memberCount: 38, change: 5 },
  { name: "Qualité", score: 85, memberCount: 12, change: 3 },
  { name: "Commercial", score: 54, memberCount: 28, change: -2 },
  { name: "RH", score: 62, memberCount: 8, change: 6 },
  { name: "IT", score: 45, memberCount: 11, change: 10 },
]

const alerts: AdminAlert[] = [
  {
    id: "1",
    type: "gap",
    severity: "critical",
    title: "Gap critique détecté",
    description: "Département Commercial : score HACCP < 50%",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "inactive",
    severity: "warning",
    title: "Utilisateurs inactifs",
    description: "8 utilisateurs sans activité depuis 14 jours",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "certification",
    severity: "warning",
    title: "Certifications à renouveler",
    description: "12 certifications expirent dans 30 jours",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
]

const quickActions = [
  { icon: UserPlus, label: "Ajouter utilisateur", href: "/admin/users/new" },
  { icon: BookOpen, label: "Créer module", href: "/admin/content/modules/new" },
  { icon: FileText, label: "Créer assessment", href: "/admin/content/assessments/new" },
  { icon: BarChart3, label: "Voir analytics", href: "/admin/analytics" },
]

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-emerald-500"
  if (score >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Administration</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre organisation
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/settings">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </Link>
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
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                  <span className="text-sm text-emerald-500">+{stats.usersChange}</span>
                </div>
                <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
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
                  <p className="text-2xl font-bold">{stats.maturityScore}%</p>
                  <span className="text-sm text-emerald-500">+{stats.maturityChange}%</span>
                </div>
                <p className="text-sm text-muted-foreground">Maturité globale</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{stats.certifications}</p>
                  <span className="text-sm text-emerald-500">+{stats.certificationsChange}</span>
                </div>
                <p className="text-sm text-muted-foreground">Certifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completedModules}/{stats.totalModules}</p>
                <p className="text-sm text-muted-foreground">Modules complétés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className="bento-card hover:border-vyxo-gold/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-vyxo-navy/10 dark:bg-vyxo-gold/10 flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-vyxo-navy dark:text-vyxo-gold" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department Scores */}
        <Card className="bento-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Maturité par département
            </CardTitle>
            <Link href="/admin/departments">
              <Button variant="ghost" size="sm">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentScores.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{dept.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {dept.memberCount} membres
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${dept.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {dept.change >= 0 ? "+" : ""}{dept.change}%
                    </span>
                    <span className="font-semibold">{dept.score}%</span>
                  </div>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreColor(dept.score)} transition-all`}
                    style={{ width: `${dept.score}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Alertes
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
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
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

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/users">
          <Card className="bento-card hover:border-vyxo-gold/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold mb-1">Utilisateurs</h3>
              <p className="text-sm text-muted-foreground">Gérer les comptes utilisateurs</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/departments">
          <Card className="bento-card hover:border-vyxo-gold/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Building2 className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="font-semibold mb-1">Départements</h3>
              <p className="text-sm text-muted-foreground">Organiser par départements</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/content">
          <Card className="bento-card hover:border-vyxo-gold/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 text-emerald-500 mb-3" />
              <h3 className="font-semibold mb-1">Contenu</h3>
              <p className="text-sm text-muted-foreground">Modules et assessments</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/analytics">
          <Card className="bento-card hover:border-vyxo-gold/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <BarChart3 className="w-8 h-8 text-vyxo-gold mb-3" />
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-sm text-muted-foreground">Rapports et statistiques</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
