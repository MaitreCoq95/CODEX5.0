"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GAMIFICATION_SERVICE } from "@/lib/services/gamification-service"
import { BarChart3, Medal, TrendingUp } from "lucide-react"

export function LeaderboardWidget() {
  const leaderboard = GAMIFICATION_SERVICE.getLeaderboard()

  return (
    <Card className="bento-card overflow-hidden">
      <CardHeader className="pb-2 bg-secondary/10 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-green-500" />
          Classement Sectoriel
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {leaderboard.map((entry, index) => {
            const isTop3 = index < 3
            return (
              <div 
                key={entry.id}
                className={`
                  flex items-center gap-4 p-4 transition-colors
                  ${entry.isCurrentUser ? "bg-vyxo-gold/10 border-l-4 border-l-vyxo-gold" : "hover:bg-secondary/20"}
                `}
              >
                <div className={`
                  w-8 h-8 flex items-center justify-center rounded-full font-bold
                  ${index === 0 ? "bg-yellow-500 text-black" : 
                    index === 1 ? "bg-gray-400 text-black" :
                    index === 2 ? "bg-amber-700 text-white" : "bg-secondary text-muted-foreground"}
                `}>
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-semibold flex items-center gap-2">
                     {entry.name}
                     {entry.isCurrentUser && (
                       <span className="text-[10px] bg-vyxo-gold text-vyxo-navy px-1.5 py-0.5 rounded-full">Moi</span>
                     )}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{entry.company}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold font-mono">{entry.xp.toLocaleString()} XP</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{entry.rank}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="p-3 bg-secondary/20 text-center text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          Voir le classement complet
        </div>
      </CardContent>
    </Card>
  )
}
