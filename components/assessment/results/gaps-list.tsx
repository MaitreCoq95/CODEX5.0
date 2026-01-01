"use client"

import { AlertTriangle, AlertCircle, Info, ChevronRight, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type IdentifiedGap, type GapSeverity } from "@/lib/types/assessment.types"

interface GapsListProps {
  gaps: IdentifiedGap[]
  onViewModule?: (moduleId: string) => void
}

export function GapsList({ gaps, onViewModule }: GapsListProps) {
  const getSeverityConfig = (severity: GapSeverity) => {
    const config = {
      critical: {
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/30",
        label: "Critique",
        badgeClass: "bg-red-500/20 text-red-400",
      },
      high: {
        icon: <AlertCircle className="w-5 h-5" />,
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/30",
        label: "Élevé",
        badgeClass: "bg-orange-500/20 text-orange-400",
      },
      medium: {
        icon: <AlertCircle className="w-5 h-5" />,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-500/30",
        label: "Moyen",
        badgeClass: "bg-yellow-500/20 text-yellow-400",
      },
      low: {
        icon: <Info className="w-5 h-5" />,
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/30",
        label: "Faible",
        badgeClass: "bg-blue-500/20 text-blue-400",
      },
    }
    return config[severity]
  }

  const getEffortLabel = (effort: string): string => {
    const labels: Record<string, string> = {
      low: "Effort faible",
      medium: "Effort modéré",
      high: "Effort important",
    }
    return labels[effort] || effort
  }

  // Group gaps by severity
  const criticalGaps = gaps.filter(g => g.severity === "critical")
  const highGaps = gaps.filter(g => g.severity === "high")
  const otherGaps = gaps.filter(g => !["critical", "high"].includes(g.severity))

  if (gaps.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <span className="text-3xl">🎉</span>
        </div>
        <h3 className="text-lg font-semibold text-emerald-400 mb-2">
          Aucun écart majeur détecté !
        </h3>
        <p className="text-slate-400 text-sm">
          Votre organisation atteint un bon niveau de maturité.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Écarts identifiés</h3>
        <div className="flex items-center gap-2 text-sm">
          {criticalGaps.length > 0 && (
            <Badge className="bg-red-500/20 text-red-400">
              {criticalGaps.length} critique{criticalGaps.length > 1 ? "s" : ""}
            </Badge>
          )}
          {highGaps.length > 0 && (
            <Badge className="bg-orange-500/20 text-orange-400">
              {highGaps.length} élevé{highGaps.length > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {gaps.map((gap) => {
          const config = getSeverityConfig(gap.severity)
          
          return (
            <Card 
              key={gap.id} 
              className={`border ${config.bg}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={config.color}>
                    {config.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{gap.title}</h4>
                      <Badge className={config.badgeClass}>
                        {config.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {gap.category}
                      </Badge>
                    </div>

                    <p className="text-slate-400 text-sm mb-3">
                      {gap.description}
                    </p>

                    {/* Recommended Actions */}
                    {gap.recommendedActions.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-slate-500 mb-2">Actions recommandées :</p>
                        <ul className="space-y-1">
                          {gap.recommendedActions.slice(0, 3).map((action, i) => (
                            <li 
                              key={i} 
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <ChevronRight className="w-4 h-4 text-vyxo-gold shrink-0 mt-0.5" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related Modules */}
                    {gap.relatedModules && gap.relatedModules.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-500">Formations suggérées :</span>
                        {gap.relatedModules.map((module, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-vyxo-gold hover:text-vyxo-gold/80"
                            onClick={() => onViewModule?.(module)}
                          >
                            <BookOpen className="w-3 h-3 mr-1" />
                            {module}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Effort indicator */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-500">
                      <span>Impact: {gap.impactScore} pts</span>
                      <span>•</span>
                      <span>{getEffortLabel(gap.estimatedEffort)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default GapsList
