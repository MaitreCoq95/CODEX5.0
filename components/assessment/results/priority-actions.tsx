"use client"

import { Zap, Target, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type PriorityAction } from "@/lib/types/assessment.types"

interface PriorityActionsProps {
  actions: PriorityAction[]
}

export function PriorityActions({ actions }: PriorityActionsProps) {
  const getImpactColor = (impact: string) => {
    const colors: Record<string, string> = {
      high: "text-emerald-400 bg-emerald-500/20",
      medium: "text-yellow-400 bg-yellow-500/20",
      low: "text-slate-400 bg-slate-500/20",
    }
    return colors[impact] || colors.low
  }

  if (actions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        Aucune action prioritaire identifiée.
      </div>
    )
  }

  // Separate quick wins
  const quickWins = actions.filter(a => a.quickWin)
  const otherActions = actions.filter(a => !a.quickWin)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Plan d&apos;action prioritaire</h3>

      {/* Quick Wins Section */}
      {quickWins.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h4 className="font-medium text-yellow-400">Quick Wins</h4>
            <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
              Actions rapides à fort impact
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {quickWins.map((action) => (
              <Card 
                key={action.rank}
                className="border-yellow-500/30 bg-yellow-500/5"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{action.action}</p>
                      <p className="text-xs text-slate-400 mt-1">{action.rationale}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {action.category}
                        </Badge>
                        <Badge className={`text-xs ${getImpactColor(action.estimatedImpact)}`}>
                          Impact {action.estimatedImpact === "high" ? "élevé" : action.estimatedImpact === "medium" ? "moyen" : "faible"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Actions */}
      {otherActions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-vyxo-gold" />
            <h4 className="font-medium">Actions structurantes</h4>
          </div>

          <div className="space-y-3">
            {otherActions.map((action, index) => (
              <div 
                key={action.rank}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div className="w-8 h-8 rounded-full bg-vyxo-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-vyxo-gold font-bold text-sm">{action.rank}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{action.action}</p>
                  <p className="text-sm text-slate-400 mt-1">{action.rationale}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {action.category}
                    </Badge>
                    <Badge className={`text-xs ${getImpactColor(action.estimatedImpact)}`}>
                      Impact {action.estimatedImpact === "high" ? "élevé" : action.estimatedImpact === "medium" ? "moyen" : "faible"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline suggestion */}
      <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-slate-400" />
          <h4 className="font-medium text-slate-300">Suggestion de timeline</h4>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-vyxo-gold">{quickWins.length}</p>
            <p className="text-xs text-slate-500">Quick Wins</p>
            <p className="text-xs text-slate-400 mt-1">Semaine 1</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{Math.ceil(otherActions.length / 2)}</p>
            <p className="text-xs text-slate-500">Actions moyen terme</p>
            <p className="text-xs text-slate-400 mt-1">Mois 1-2</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{Math.floor(otherActions.length / 2)}</p>
            <p className="text-xs text-slate-500">Actions long terme</p>
            <p className="text-xs text-slate-400 mt-1">Mois 3+</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriorityActions
