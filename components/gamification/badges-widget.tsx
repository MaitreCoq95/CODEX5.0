"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GAMIFICATION_SERVICE } from "@/lib/services/gamification-service"
import { Award, Lock } from "lucide-react"

export function BadgesWidget() {
  const badges = GAMIFICATION_SERVICE.getUserBadges()

  const rarityColors = {
    common: "bg-gray-500",
    rare: "bg-blue-500",
    epic: "bg-purple-500",
    legendary: "bg-yellow-500"
  }

  return (
    <Card className="bento-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            Badges & Succès
          </div>
          <Badge variant="secondary" className="text-xs">
            {badges.filter(b => b.unlockedAt).length} / {badges.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`
                group relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all
                ${badge.unlockedAt 
                  ? "bg-secondary/30 border-transparent hover:bg-secondary/50 hover:scale-105 cursor-pointer" 
                  : "bg-secondary/10 border-dashed opacity-60 grayscale"
                }
              `}
              title={badge.description}
            >
              <div className="text-3xl mb-2 filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all">
                {badge.icon}
              </div>
              
              {!badge.unlockedAt && (
                <div className="absolute top-1 right-1">
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </div>
              )}

              <div className={`w-2 h-2 rounded-full mb-1 ${rarityColors[badge.rarity]}`} />
              
              <div className="text-[10px] text-center font-medium leading-tight truncate w-full">
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
