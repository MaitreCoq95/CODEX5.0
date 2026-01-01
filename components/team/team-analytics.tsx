"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, BookOpen, Clock, Award } from "lucide-react"

interface TeamStats {
  totalMembers: number
  activeMembers: number
  avgScore: number
  avgScoreChange: number
  modulesCompleted: number
  totalModules: number
  avgTimeSpent: string
  certificationsEarned: number
  atRiskMembers: number
}

interface TeamAnalyticsCardsProps {
  stats: TeamStats
  period?: "week" | "month" | "quarter"
}

export function TeamAnalyticsCards({ stats, period = "month" }: TeamAnalyticsCardsProps) {
  const periodLabel = period === "week" ? "cette semaine" : period === "quarter" ? "ce trimestre" : "ce mois"

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Members */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Membres actifs</p>
              <p className="text-3xl font-bold mt-1">
                {stats.activeMembers}
                <span className="text-lg text-muted-foreground font-normal">/{stats.totalMembers}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          {stats.atRiskMembers > 0 && (
            <Badge className="mt-3 bg-red-500/10 text-red-500 border-0">
              {stats.atRiskMembers} à risque
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Average Score */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Score moyen équipe</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{stats.avgScore}%</p>
                <div className={`flex items-center ${stats.avgScoreChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {stats.avgScoreChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium ml-1">
                    {stats.avgScoreChange >= 0 ? "+" : ""}{stats.avgScoreChange}%
                  </span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-vyxo-gold/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-vyxo-gold" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            vs période précédente
          </p>
        </CardContent>
      </Card>

      {/* Modules Completed */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Modules complétés</p>
              <p className="text-3xl font-bold mt-1">
                {stats.modulesCompleted}
                <span className="text-lg text-muted-foreground font-normal">/{stats.totalModules}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${(stats.modulesCompleted / stats.totalModules) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Certifications obtenues</p>
              <p className="text-3xl font-bold mt-1">{stats.certificationsEarned}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {periodLabel}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Activity Chart Component
interface ActivityData {
  date: string
  completions: number
  timeSpent: number
}

interface TeamActivityChartProps {
  data: ActivityData[]
}

export function TeamActivityChart({ data }: TeamActivityChartProps) {
  const maxCompletions = Math.max(...data.map(d => d.completions), 1)

  return (
    <Card className="bento-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Activité équipe (7 derniers jours)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-40">
          {data.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-vyxo-gold/80 rounded-t transition-all hover:bg-vyxo-gold"
                style={{ height: `${(day.completions / maxCompletions) * 100}%`, minHeight: 4 }}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {day.date}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-vyxo-gold">
              {data.reduce((sum, d) => sum + d.completions, 0)}
            </p>
            <p className="text-xs text-muted-foreground">modules complétés</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {Math.round(data.reduce((sum, d) => sum + d.timeSpent, 0) / 60)}h
            </p>
            <p className="text-xs text-muted-foreground">temps total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {Math.round(data.reduce((sum, d) => sum + d.completions, 0) / 7)}
            </p>
            <p className="text-xs text-muted-foreground">moy/jour</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamAnalyticsCards
