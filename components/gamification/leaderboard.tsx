"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Flame,
  Zap,
  Star,
  ChevronUp,
  ChevronDown
} from "lucide-react"

interface LeaderboardEntry {
  id: string
  rank: number
  previousRank?: number
  name: string
  avatar?: string
  department?: string
  score: number
  xp: number
  streak: number
  level: number
  badges: number
  isCurrentUser?: boolean
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  period?: "week" | "month" | "all"
  onPeriodChange?: (period: string) => void
  showDepartment?: boolean
  maxEntries?: number
  currentUserId?: string
}

export function Leaderboard({
  entries,
  period = "week",
  onPeriodChange,
  showDepartment = true,
  maxEntries = 10,
  currentUserId
}: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState(period)

  const sortedEntries = [...entries]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, maxEntries)
    .map((entry, index) => ({ ...entry, rank: index + 1 }))

  const getRankChange = (entry: LeaderboardEntry) => {
    if (!entry.previousRank) return null
    const change = entry.previousRank - entry.rank
    if (change > 0) return { icon: <ChevronUp className="w-4 h-4 text-emerald-500" />, value: change }
    if (change < 0) return { icon: <ChevronDown className="w-4 h-4 text-red-500" />, value: Math.abs(change) }
    return { icon: <Minus className="w-4 h-4 text-slate-500" />, value: 0 }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-vyxo-gold" />
      case 2: return <Medal className="w-6 h-6 text-slate-300" />
      case 3: return <Medal className="w-6 h-6 text-orange-400" />
      default: return <span className="text-lg font-bold text-muted-foreground">{rank}</span>
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-vyxo-gold/20 to-transparent border-vyxo-gold/30"
      case 2: return "bg-gradient-to-r from-slate-500/10 to-transparent border-slate-500/30"
      case 3: return "bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/30"
      default: return "border-slate-700"
    }
  }

  const handlePeriodChange = (value: string) => {
    setActiveTab(value)
    onPeriodChange?.(value)
  }

  // Find current user position if not in top entries
  const currentUserEntry = entries.find(e => e.id === currentUserId)
  const isCurrentUserInTop = sortedEntries.some(e => e.id === currentUserId)

  return (
    <Card className="bento-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-vyxo-gold" />
          Classement
        </CardTitle>
        <Tabs value={activeTab} onValueChange={handlePeriodChange}>
          <TabsList className="h-8">
            <TabsTrigger value="week" className="text-xs px-3">Semaine</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-3">Mois</TabsTrigger>
            <TabsTrigger value="all" className="text-xs px-3">Tout</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-8 pt-4">
          {[1, 0, 2].map((podiumIndex) => {
            const entry = sortedEntries[podiumIndex]
            if (!entry) return null
            const isFirst = podiumIndex === 0
            
            return (
              <div 
                key={entry.id} 
                className={`flex flex-col items-center ${isFirst ? "order-2" : podiumIndex === 1 ? "order-1" : "order-3"}`}
              >
                <div className="relative mb-2">
                  <Avatar className={`${isFirst ? "w-16 h-16" : "w-12 h-12"} ring-2 ${
                    isFirst ? "ring-vyxo-gold" : podiumIndex === 1 ? "ring-slate-400" : "ring-orange-400"
                  }`}>
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="bg-vyxo-navy text-white">
                      {entry.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    isFirst ? "bg-vyxo-gold" : podiumIndex === 1 ? "bg-slate-400" : "bg-orange-400"
                  }`}>
                    <span className="text-xs font-bold text-vyxo-navy">
                      {entry.rank}
                    </span>
                  </div>
                </div>
                <p className="font-medium text-sm text-center">{entry.name.split(" ")[0]}</p>
                <p className="text-xs text-vyxo-gold font-bold">{entry.xp.toLocaleString()} XP</p>
              </div>
            )
          })}
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {sortedEntries.map((entry) => {
            const rankChange = getRankChange(entry)
            const isCurrentUser = entry.id === currentUserId

            return (
              <div
                key={entry.id}
                className={`
                  flex items-center gap-4 p-3 rounded-xl border transition-all
                  ${getRankStyle(entry.rank)}
                  ${isCurrentUser ? "ring-2 ring-vyxo-gold/50" : ""}
                `}
              >
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>

                {/* Rank Change */}
                <div className="w-8 flex items-center justify-center">
                  {rankChange && (
                    <div className="flex items-center">
                      {rankChange.icon}
                      {rankChange.value > 0 && (
                        <span className="text-xs">{rankChange.value}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* User */}
                <Avatar className="w-10 h-10">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback className="bg-vyxo-navy text-white text-sm">
                    {entry.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {entry.name}
                    {isCurrentUser && (
                      <Badge className="ml-2 text-xs bg-vyxo-gold/10 text-vyxo-gold">Vous</Badge>
                    )}
                  </p>
                  {showDepartment && entry.department && (
                    <p className="text-xs text-muted-foreground">{entry.department}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center hidden md:block">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{entry.streak}</span>
                    </div>
                  </div>
                  <div className="text-center hidden md:block">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">{entry.badges}</span>
                    </div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-vyxo-gold flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {entry.xp.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Niveau {entry.level}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Current user if not in top */}
        {currentUserEntry && !isCurrentUserInTop && (
          <div className="mt-4 pt-4 border-t border-dashed border-slate-700">
            <p className="text-xs text-center text-muted-foreground mb-2">
              Votre position
            </p>
            <div className={`
              flex items-center gap-4 p-3 rounded-xl border border-vyxo-gold/30
              bg-vyxo-gold/5 ring-2 ring-vyxo-gold/30
            `}>
              <div className="w-8 flex justify-center">
                <span className="text-lg font-bold">#{entries.findIndex(e => e.id === currentUserId) + 1}</span>
              </div>
              <Avatar className="w-10 h-10">
                <AvatarImage src={currentUserEntry.avatar} />
                <AvatarFallback className="bg-vyxo-navy text-white text-sm">
                  {currentUserEntry.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{currentUserEntry.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-vyxo-gold">{currentUserEntry.xp.toLocaleString()} XP</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Leaderboard
