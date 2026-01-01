"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  Award, 
  AlertTriangle, 
  BookOpen,
  Building2,
  Activity,
  Clock,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

interface AdminStats {
  users: {
    total: number
    active: number
    inactive: number
    atRisk: number
    change: number
  }
  maturity: {
    score: number
    change: number
    level: string
  }
  certifications: {
    total: number
    expiringSoon: number
    change: number
  }
  modules: {
    completedToday: number
    avgProgress: number
  }
}

interface DepartmentProgress {
  name: string
  score: number
  memberCount: number
  change: number
}

interface AdminStatsGridProps {
  stats: AdminStats
}

export function AdminStatsGrid({ stats }: AdminStatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Users */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            {stats.users.change !== 0 && (
              <Badge className={stats.users.change > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
                {stats.users.change > 0 ? "+" : ""}{stats.users.change}%
              </Badge>
            )}
          </div>
          <p className="text-3xl font-bold">{stats.users.active}</p>
          <p className="text-sm text-muted-foreground">
            Utilisateurs actifs sur {stats.users.total}
          </p>
          {stats.users.atRisk > 0 && (
            <p className="text-xs text-orange-500 mt-2">
              ⚠️ {stats.users.atRisk} à risque
            </p>
          )}
        </CardContent>
      </Card>

      {/* Maturity Score */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-vyxo-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-vyxo-gold" />
            </div>
            <Badge className={stats.maturity.change >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
              {stats.maturity.change >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(stats.maturity.change)}%
            </Badge>
          </div>
          <p className="text-3xl font-bold">{stats.maturity.score}%</p>
          <p className="text-sm text-muted-foreground">Score de maturité</p>
          <p className="text-xs text-vyxo-gold mt-2">{stats.maturity.level}</p>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500">
              +{stats.certifications.change}
            </Badge>
          </div>
          <p className="text-3xl font-bold">{stats.certifications.total}</p>
          <p className="text-sm text-muted-foreground">Certifications obtenues</p>
          {stats.certifications.expiringSoon > 0 && (
            <p className="text-xs text-orange-500 mt-2">
              🔔 {stats.certifications.expiringSoon} expirent bientôt
            </p>
          )}
        </CardContent>
      </Card>

      {/* Today Activity */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <Badge variant="outline" className="text-xs">
              Aujourd&apos;hui
            </Badge>
          </div>
          <p className="text-3xl font-bold">{stats.modules.completedToday}</p>
          <p className="text-sm text-muted-foreground">Modules complétés</p>
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progression moy.</span>
              <span>{stats.modules.avgProgress}%</span>
            </div>
            <Progress value={stats.modules.avgProgress} className="h-1" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface DepartmentLeaderboardProps {
  departments: DepartmentProgress[]
  onViewAll?: () => void
}

export function DepartmentLeaderboard({ departments, onViewAll }: DepartmentLeaderboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "[&>div]:bg-emerald-500"
    if (score >= 60) return "[&>div]:bg-yellow-500"
    return "[&>div]:bg-red-500"
  }

  return (
    <Card className="bento-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Performance par département
        </CardTitle>
        {onViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            Voir tout
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept, index) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${index === 0 ? "bg-vyxo-gold/20 text-vyxo-gold" : 
                      index === 1 ? "bg-slate-500/20 text-slate-400" :
                      index === 2 ? "bg-orange-500/20 text-orange-400" :
                      "bg-slate-700 text-slate-500"}
                  `}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {dept.memberCount} membres
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getScoreColor(dept.score)}`}>
                    {dept.score}%
                  </p>
                  <p className={`text-xs ${dept.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {dept.change >= 0 ? "+" : ""}{dept.change}%
                  </p>
                </div>
              </div>
              <Progress 
                value={dept.score} 
                className={`h-2 ${getProgressColor(dept.score)}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface AdminAlert {
  id: string
  type: "gap" | "inactive" | "deadline" | "certification"
  severity: "warning" | "critical"
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

interface AdminAlertsListProps {
  alerts: AdminAlert[]
  onDismiss?: (id: string) => void
}

export function AdminAlertsList({ alerts, onDismiss }: AdminAlertsListProps) {
  if (alerts.length === 0) {
    return (
      <Card className="bento-card">
        <CardContent className="py-8 text-center">
          <Activity className="w-10 h-10 mx-auto text-emerald-500 mb-3" />
          <p className="font-medium">Aucune alerte</p>
          <p className="text-sm text-muted-foreground">
            Tout fonctionne correctement
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bento-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Alertes ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${
              alert.severity === "critical"
                ? "border-red-500/30 bg-red-500/5"
                : "border-orange-500/30 bg-orange-500/5"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className={
                      alert.severity === "critical" 
                        ? "border-red-500 text-red-500"
                        : "border-orange-500 text-orange-500"
                    }
                  >
                    {alert.severity === "critical" ? "🔴 Critique" : "🟠 Attention"}
                  </Badge>
                </div>
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {alert.description}
                </p>
              </div>
            </div>
            {alert.actionHref && alert.actionLabel && (
              <Link href={alert.actionHref}>
                <Button size="sm" variant="outline" className="mt-3">
                  {alert.actionLabel}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { type AdminStats, type DepartmentProgress, type AdminAlert }
