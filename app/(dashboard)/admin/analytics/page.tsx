import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Download,
  Calendar,
  FileText,
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from "lucide-react"

// Types
interface KPI {
  label: string
  value: string
  change: number
  trend: "up" | "down"
}

interface ModulePerformance {
  name: string
  completions: number
  avgScore: number
  avgTime: string
}

interface AtRiskUser {
  name: string
  score: number
  lastActive: string
  issue: string
}

// Mock data
const kpis: KPI[] = [
  { label: "Utilisateurs actifs", value: "142", change: 8, trend: "up" },
  { label: "Maturité globale", value: "67%", change: 12, trend: "up" },
  { label: "Modules complétés", value: "892", change: 23, trend: "up" },
  { label: "Certifications", value: "28", change: 5, trend: "up" },
]

const modulePerformance: ModulePerformance[] = [
  { name: "GDP Niveau 1", completions: 128, avgScore: 82, avgTime: "42min" },
  { name: "ISO 9001 Bases", completions: 95, avgScore: 78, avgTime: "58min" },
  { name: "Sécurité routière", completions: 87, avgScore: 85, avgTime: "28min" },
  { name: "HACCP Niveau 1", completions: 67, avgScore: 71, avgTime: "65min" },
  { name: "Documentation", completions: 54, avgScore: 79, avgTime: "35min" },
]

const certificationFunnel = [
  { stage: "Inscrits", count: 142, percentage: 100 },
  { stage: "Modules démarrés", count: 128, percentage: 90 },
  { stage: "Modules complétés", count: 98, percentage: 69 },
  { stage: "Quiz passés", count: 72, percentage: 51 },
  { stage: "Certifiés", count: 28, percentage: 20 },
]

const atRiskUsers: AtRiskUser[] = [
  { name: "Sophie Martin", score: 54, lastActive: "5 jours", issue: "Inactivité" },
  { name: "Jean Moreau", score: 45, lastActive: "8 jours", issue: "Score faible" },
  { name: "Paul Lefèvre", score: 38, lastActive: "12 jours", issue: "Inactivité + Score" },
]

const departmentScores = [
  { name: "Qualité", score: 85, change: 3 },
  { name: "Logistique", score: 78, change: 8 },
  { name: "Production", score: 72, change: 5 },
  { name: "RH", score: 62, change: 6 },
  { name: "Commercial", score: 54, change: -2 },
  { name: "IT", score: 45, change: 10 },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des performances de votre organisation
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            30 derniers jours
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
          <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bento-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{kpi.label}</span>
                <Badge 
                  variant="secondary"
                  className={kpi.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}
                >
                  {kpi.trend === "up" ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {kpi.change}%
                </Badge>
              </div>
              <p className="text-3xl font-bold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Department Scores */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Maturité par département
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentScores.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={dept.change >= 0 ? "text-emerald-500" : "text-red-500"}>
                      {dept.change >= 0 ? "+" : ""}{dept.change}%
                    </span>
                    <span className="font-bold">{dept.score}%</span>
                  </div>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      dept.score >= 80 ? "bg-emerald-500" : 
                      dept.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${dept.score}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certification Funnel */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Funnel Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {certificationFunnel.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1">
                  <div className="h-8 bg-secondary rounded-lg overflow-hidden relative">
                    <div 
                      className="h-full bg-vyxo-gold/30 flex items-center justify-end pr-2"
                      style={{ width: `${stage.percentage}%` }}
                    >
                      <span className="text-sm font-medium">{stage.count}</span>
                    </div>
                  </div>
                </div>
                <div className="w-12 text-sm text-muted-foreground text-right">
                  {stage.percentage}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Module Performance */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">Module</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Complétions</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Score moy.</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Temps moy.</th>
                  </tr>
                </thead>
                <tbody>
                  {modulePerformance.map((module, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 font-medium">{module.name}</td>
                      <td className="py-3 text-right">{module.completions}</td>
                      <td className="py-3 text-right">
                        <span className={
                          module.avgScore >= 80 ? "text-emerald-500" : 
                          module.avgScore >= 60 ? "text-yellow-500" : "text-red-500"
                        }>
                          {module.avgScore}%
                        </span>
                      </td>
                      <td className="py-3 text-right text-muted-foreground">{module.avgTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* At Risk Users */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Utilisateurs à risque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {atRiskUsers.map((user, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-orange-500/30 bg-orange-500/5"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Inactif depuis {user.lastActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-red-500">{user.score}%</p>
                    <Badge variant="outline" className="text-xs">{user.issue}</Badge>
                  </div>
                  <Button variant="outline" size="sm">Contacter</Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              Voir tous les utilisateurs à risque
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
