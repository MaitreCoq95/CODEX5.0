"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy,
  Medal,
  Crown,
  Users,
  Building2,
  ChevronUp,
  ChevronDown,
  Minus
} from "lucide-react"

// Mock leaderboard data
const teamLeaderboard = [
  { rank: 1, userId: "u1", userName: "Marie Dupont", avatar: null, xp: 4520, level: 15, modulesCompleted: 18, trend: "up" },
  { rank: 2, userId: "u2", userName: "Jean Martin", avatar: null, xp: 3890, level: 14, modulesCompleted: 15, trend: "same" },
  { rank: 3, userId: "u3", userName: "Sophie Bernard", avatar: null, xp: 3450, level: 13, modulesCompleted: 14, trend: "up" },
  { rank: 4, userId: "current", userName: "Vous", avatar: null, xp: 2450, level: 12, modulesCompleted: 8, trend: "up", isCurrentUser: true },
  { rank: 5, userId: "u4", userName: "Pierre Durand", avatar: null, xp: 2100, level: 11, modulesCompleted: 7, trend: "down" },
  { rank: 6, userId: "u5", userName: "Claire Petit", avatar: null, xp: 1850, level: 10, modulesCompleted: 6, trend: "same" },
  { rank: 7, userId: "u6", userName: "Thomas Roux", avatar: null, xp: 1620, level: 9, modulesCompleted: 5, trend: "down" },
  { rank: 8, userId: "u7", userName: "Julie Moreau", avatar: null, xp: 1400, level: 8, modulesCompleted: 4, trend: "up" },
]

const orgLeaderboard = [
  { rank: 1, userId: "u10", userName: "Équipe Production", avatar: null, xp: 15200, level: 20, modulesCompleted: 45, trend: "up" },
  { rank: 2, userId: "u11", userName: "Équipe Logistique", avatar: null, xp: 12800, level: 18, modulesCompleted: 38, trend: "same" },
  { rank: 3, userId: "u12", userName: "Équipe Qualité", avatar: null, xp: 11500, level: 17, modulesCompleted: 35, trend: "up" },
  { rank: 4, userId: "team", userName: "Votre Équipe", avatar: null, xp: 8900, level: 15, modulesCompleted: 28, trend: "up", isCurrentUser: true },
  { rank: 5, userId: "u13", userName: "Équipe Commercial", avatar: null, xp: 7200, level: 13, modulesCompleted: 22, trend: "down" },
]

function getPodiumStyle(rank: number) {
  switch (rank) {
    case 1:
      return { icon: Crown, bg: "bg-amber-500/20", border: "border-amber-500", text: "text-amber-500" }
    case 2:
      return { icon: Medal, bg: "bg-gray-400/20", border: "border-gray-400", text: "text-gray-400" }
    case 3:
      return { icon: Medal, bg: "bg-amber-700/20", border: "border-amber-700", text: "text-amber-700" }
    default:
      return { icon: null, bg: "", border: "", text: "" }
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <ChevronUp className="w-4 h-4 text-emerald-500" />
    case "down":
      return <ChevronDown className="w-4 h-4 text-red-500" />
    default:
      return <Minus className="w-4 h-4 text-muted-foreground" />
  }
}

export default function LeaderboardPage() {
  const [scope, setScope] = useState<"team" | "organization">("team")
  const [period, setPeriod] = useState<"week" | "month" | "all_time">("month")
  
  const leaderboard = scope === "team" ? teamLeaderboard : orgLeaderboard
  const topThree = leaderboard.slice(0, 3)
  const restOfList = leaderboard.slice(3)
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Classement</h1>
          <p className="text-muted-foreground">
            Comparez-vous aux autres apprenants
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex bg-secondary rounded-lg p-1">
          <Button 
            variant={scope === "team" ? "default" : "ghost"}
            size="sm"
            onClick={() => setScope("team")}
            className={scope === "team" ? "bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90" : ""}
          >
            <Users className="w-4 h-4 mr-2" />
            Mon Équipe
          </Button>
          <Button 
            variant={scope === "organization" ? "default" : "ghost"}
            size="sm"
            onClick={() => setScope("organization")}
            className={scope === "organization" ? "bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90" : ""}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Organisation
          </Button>
        </div>
        
        <div className="flex bg-secondary rounded-lg p-1">
          {(["week", "month", "all_time"] as const).map((p) => (
            <Button 
              key={p}
              variant={period === p ? "default" : "ghost"}
              size="sm"
              onClick={() => setPeriod(p)}
              className={period === p ? "" : ""}
            >
              {p === "week" ? "Cette semaine" : p === "month" ? "Ce mois" : "Tout temps"}
            </Button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <Card className="bento-card overflow-hidden">
        <div className="bg-gradient-to-r from-vyxo-navy to-vyxo-navy/80 text-white p-6">
          <div className="flex items-end justify-center gap-4">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full border-2 ${getPodiumStyle(2).border} ${getPodiumStyle(2).bg} flex items-center justify-center mb-2`}>
                <span className="text-2xl font-bold">{topThree[1]?.userName.charAt(0)}</span>
              </div>
              <p className="font-medium text-sm truncate max-w-[100px]">{topThree[1]?.userName}</p>
              <Badge className="mt-1 bg-gray-400">{topThree[1]?.xp.toLocaleString()} XP</Badge>
              <div className="w-20 h-24 bg-gray-400/20 rounded-t-lg mt-2 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400">2</span>
              </div>
            </div>
            
            {/* 1st place */}
            <div className="flex flex-col items-center -mb-4">
              <Crown className="w-8 h-8 text-amber-400 mb-2" />
              <div className={`w-20 h-20 rounded-full border-2 ${getPodiumStyle(1).border} ${getPodiumStyle(1).bg} flex items-center justify-center mb-2`}>
                <span className="text-3xl font-bold">{topThree[0]?.userName.charAt(0)}</span>
              </div>
              <p className="font-semibold truncate max-w-[120px]">{topThree[0]?.userName}</p>
              <Badge className="mt-1 bg-amber-500">{topThree[0]?.xp.toLocaleString()} XP</Badge>
              <div className="w-24 h-32 bg-amber-500/20 rounded-t-lg mt-2 flex items-center justify-center">
                <span className="text-4xl font-bold text-amber-500">1</span>
              </div>
            </div>
            
            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full border-2 ${getPodiumStyle(3).border} ${getPodiumStyle(3).bg} flex items-center justify-center mb-2`}>
                <span className="text-2xl font-bold">{topThree[2]?.userName.charAt(0)}</span>
              </div>
              <p className="font-medium text-sm truncate max-w-[100px]">{topThree[2]?.userName}</p>
              <Badge className="mt-1 bg-amber-700">{topThree[2]?.xp.toLocaleString()} XP</Badge>
              <div className="w-20 h-16 bg-amber-700/20 rounded-t-lg mt-2 flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-700">3</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Full List */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Classement complet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div 
                key={entry.userId}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  entry.isCurrentUser 
                    ? "bg-vyxo-gold/10 border border-vyxo-gold" 
                    : "hover:bg-secondary"
                }`}
              >
                {/* Rank */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  entry.rank <= 3 
                    ? `${getPodiumStyle(entry.rank).bg} ${getPodiumStyle(entry.rank).text}` 
                    : "bg-secondary text-muted-foreground"
                }`}>
                  <span className="font-bold">{entry.rank}</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vyxo-gold to-amber-400 flex items-center justify-center shrink-0">
                    <span className="font-bold text-vyxo-navy">{entry.userName.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className={`font-medium truncate ${entry.isCurrentUser ? "text-vyxo-gold" : ""}`}>
                      {entry.userName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Niveau {entry.level} • {entry.modulesCompleted} modules
                    </p>
                  </div>
                </div>
                
                {/* XP & Trend */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="font-bold">{entry.xp.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                  {getTrendIcon(entry.trend)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
