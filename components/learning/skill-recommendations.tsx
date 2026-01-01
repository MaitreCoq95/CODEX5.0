"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Brain,
  ChevronRight,
  Zap
} from "lucide-react"
import Link from "next/link"

interface Recommendation {
  id: string
  type: "module" | "quiz" | "path" | "assessment"
  title: string
  description: string
  reason: string
  priority: "high" | "medium" | "low"
  estimatedTime: string
  xpReward: number
  competency?: string
  href: string
}

interface SkillRecommendationsProps {
  recommendations: Recommendation[]
  userStrengths?: string[]
  userWeaknesses?: string[]
  onRecommendationClick?: (recommendation: Recommendation) => void
}

export function SkillRecommendations({
  recommendations,
  userStrengths = [],
  userWeaknesses = [],
  onRecommendationClick
}: SkillRecommendationsProps) {
  const getPriorityColor = (priority: Recommendation["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-500 border-red-500/30"
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
      case "low": return "bg-blue-500/10 text-blue-500 border-blue-500/30"
    }
  }

  const getPriorityLabel = (priority: Recommendation["priority"]) => {
    switch (priority) {
      case "high": return "🔥 Prioritaire"
      case "medium": return "📌 Recommandé"
      case "low": return "💡 Suggéré"
    }
  }

  const getTypeIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "module": return "📚"
      case "quiz": return "❓"
      case "path": return "🛤️"
      case "assessment": return "📝"
    }
  }

  const getTypeLabel = (type: Recommendation["type"]) => {
    switch (type) {
      case "module": return "Module"
      case "quiz": return "Quiz"
      case "path": return "Parcours"
      case "assessment": return "Évaluation"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <Card className="bento-card bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-vyxo-gold" />
                Recommandations personnalisées
              </h3>
              <p className="text-sm text-muted-foreground">
                Basées sur votre profil et vos objectifs
              </p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {userStrengths.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">💪 Vos forces</p>
                <div className="flex flex-wrap gap-1">
                  {userStrengths.map((strength, i) => (
                    <Badge key={i} className="bg-emerald-500/10 text-emerald-500">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {userWeaknesses.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">📈 À améliorer</p>
                <div className="flex flex-wrap gap-1">
                  {userWeaknesses.map((weakness, i) => (
                    <Badge key={i} className="bg-orange-500/10 text-orange-500">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card 
            key={rec.id}
            className={`bento-card overflow-hidden transition-all hover:border-vyxo-gold/50 cursor-pointer ${
              index === 0 ? "ring-2 ring-vyxo-gold/20" : ""
            }`}
            onClick={() => onRecommendationClick?.(rec)}
          >
            <CardContent className="p-0">
              <div className="flex">
                {/* Priority indicator */}
                <div className={`w-1 ${
                  rec.priority === "high" ? "bg-red-500" :
                  rec.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
                }`} />
                
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Type & Priority */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {getTypeIcon(rec.type)} {getTypeLabel(rec.type)}
                        </Badge>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {getPriorityLabel(rec.priority)}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold mb-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {rec.description}
                      </p>

                      {/* Reason */}
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-800/50">
                        <Target className="w-4 h-4 text-vyxo-gold mt-0.5" />
                        <p className="text-xs">
                          <span className="text-vyxo-gold font-medium">Pourquoi : </span>
                          {rec.reason}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rec.estimatedTime}
                        </span>
                        <span className="text-xs flex items-center gap-1">
                          <Zap className="w-3 h-3 text-vyxo-gold" />
                          <span className="text-vyxo-gold font-medium">+{rec.xpReward} XP</span>
                        </span>
                        {rec.competency && (
                          <Badge variant="outline" className="text-xs">
                            {rec.competency}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button 
                      size="sm"
                      className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy shrink-0"
                    >
                      Commencer
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card className="bento-card">
          <CardContent className="py-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Aucune recommandation</h3>
            <p className="text-muted-foreground">
              Complétez plus de modules pour recevoir des recommandations personnalisées
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SkillRecommendations
