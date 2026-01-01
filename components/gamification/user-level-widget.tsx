"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GAMIFICATION_SERVICE } from "@/lib/services/gamification-service"
import { Trophy, Zap } from "lucide-react"

export function UserLevelWidget() {
  // Use mock data from service
  const progress = GAMIFICATION_SERVICE.calculateProgress(9500) // Hardcoded XP for demo impact

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress.progress / 100) * circumference

  return (
    <Card className="bento-card border-vyxo-gold/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 bg-vyxo-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5 text-vyxo-gold" />
          Niveau & Progression
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex items-center gap-8">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full -rotate-90 transform">
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              className="text-secondary"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-vyxo-gold transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{progress.level}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Level</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 flex-1">
          <div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider text-[10px]">Rang Actuel</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-vyxo-gold to-amber-500 bg-clip-text text-transparent">
              {progress.rank}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress.xp} XP</span>
              <span>{progress.nextLevelXp} XP</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-vyxo-navy to-vyxo-gold" 
                style={{ width: `${progress.progress}%` }} 
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Série en cours : <span className="font-bold text-foreground">{progress.streakDays} jours</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
