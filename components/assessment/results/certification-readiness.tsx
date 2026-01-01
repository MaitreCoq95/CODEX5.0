"use client"

import { Target, Clock, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { type CertificationReadiness as CertReadiness } from "@/lib/types/assessment.types"

interface CertificationReadinessProps {
  readiness: CertReadiness
}

export function CertificationReadiness({ readiness }: CertificationReadinessProps) {
  const getReadinessColor = (percentage: number) => {
    if (percentage >= 80) return { color: "text-emerald-400", bg: "bg-emerald-500" }
    if (percentage >= 60) return { color: "text-green-400", bg: "bg-green-500" }
    if (percentage >= 40) return { color: "text-yellow-400", bg: "bg-yellow-500" }
    return { color: "text-orange-400", bg: "bg-orange-500" }
  }

  const colors = getReadinessColor(readiness.readinessPercentage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Prêt pour la certification ?</h3>
        <Badge className="bg-vyxo-gold/20 text-vyxo-gold">
          {readiness.certification}
        </Badge>
      </div>

      {/* Main readiness indicator */}
      <div className="text-center py-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center">
            <div 
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ 
                background: `conic-gradient(${colors.bg.replace('bg-', '#').replace('-500', '')} ${readiness.readinessPercentage}%, #374151 0%)`
              }}
            >
              <div className="w-24 h-24 rounded-full bg-slate-900 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${colors.color}`}>
                  {readiness.readinessPercentage}%
                </span>
                <span className="text-xs text-slate-500">prêt</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-slate-400">
          {readiness.readinessPercentage >= 80 
            ? "Votre organisation est prête pour la certification !" 
            : readiness.readinessPercentage >= 60 
              ? "Quelques ajustements sont nécessaires avant la certification."
              : "Des efforts significatifs sont requis pour atteindre la certification."
          }
        </p>
      </div>

      {/* Time estimate */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50">
        <Clock className="w-5 h-5 text-vyxo-gold" />
        <div>
          <p className="text-sm text-slate-400">Temps estimé avant certification</p>
          <p className="text-lg font-semibold">{readiness.estimatedTimeToReady}</p>
        </div>
      </div>

      {/* Blockers */}
      {readiness.blockers.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="font-medium">Points bloquants</h4>
          </div>
          <ul className="space-y-2">
            {readiness.blockers.map((blocker, i) => (
              <li 
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300 bg-red-500/10 rounded-lg p-3 border border-red-500/30"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                {blocker}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next steps */}
      {readiness.nextSteps && readiness.nextSteps.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Target className="w-5 h-5" />
            <h4 className="font-medium">Prochaines étapes</h4>
          </div>
          <div className="space-y-2">
            {readiness.nextSteps.map((step, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
                </div>
                <span className="text-sm">{step}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success state */}
      {readiness.readinessPercentage >= 80 && readiness.blockers.length === 0 && (
        <div className="text-center p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-emerald-400 mb-2">
            Certification accessible !
          </h4>
          <p className="text-sm text-slate-400">
            Contactez notre équipe pour planifier votre audit de certification {readiness.certification}.
          </p>
        </div>
      )}
    </div>
  )
}

export default CertificationReadiness
