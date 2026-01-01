"use client"

import { QualifiedLead } from "@/lib/services/lead-scoring"
import { CheckCircle2, AlertTriangle, TrendingUp, Building2, Target, Clock } from "lucide-react"

interface LeadScoreResultProps {
  qualifiedLead: QualifiedLead
}

export function LeadScoreResult({ qualifiedLead }: LeadScoreResultProps) {
  const { leadScore, maturityScore, insights, formData } = qualifiedLead

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-amber-400"
    if (score >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Header avec score principal */}
      <div className="bg-gradient-to-r from-vyxo-gold/20 to-transparent border border-vyxo-gold/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">Score de qualification</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${getScoreColor(leadScore.total)}`}>
                {leadScore.total}
              </span>
              <span className="text-gray-500">/100</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl">{leadScore.badge.split(" ")[0]}</span>
            <p className="text-white font-medium">{leadScore.badge.split(" ").slice(1).join(" ")}</p>
            <p className="text-vyxo-gold text-sm flex items-center justify-end gap-1">
              <Clock className="w-4 h-4" />
              Contact sous {leadScore.priority}
            </p>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor(leadScore.total)} transition-all duration-1000`}
            style={{ width: `${leadScore.total}%` }}
          />
        </div>
      </div>

      {/* Breakdown du score */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Score de maturité */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-vyxo-gold" />
            <h4 className="text-white font-medium">Maturité Organisationnelle</h4>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-3xl font-bold ${getScoreColor(maturityScore.score)}`}>
              {maturityScore.score}
            </span>
            <span className="text-gray-500">/100</span>
            <span className="text-sm ml-2">{maturityScore.label}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(maturityScore.score)}`}
              style={{ width: `${maturityScore.score}%` }}
            />
          </div>
        </div>

        {/* Détail du scoring */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-vyxo-gold" />
            <h4 className="text-white font-medium">Détail du score</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Fonction</span>
              <span className="text-white">+{leadScore.breakdown.role} pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Taille entreprise</span>
              <span className="text-white">+{leadScore.breakdown.companySize} pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Resp. Qualité</span>
              <span className="text-white">+{leadScore.breakdown.qualityManager} pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Certifications ({formData.certifications?.length || 0})</span>
              <span className="text-white">+{leadScore.breakdown.certifications} pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">SIRET fourni</span>
              <span className={leadScore.breakdown.siret > 0 ? "text-green-400" : "text-gray-500"}>
                {leadScore.breakdown.siret > 0 ? `+${leadScore.breakdown.siret} pts ✓` : "Non fourni"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights personnalisés */}
      {insights.messages.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-vyxo-gold" />
            <h4 className="text-white font-medium">Points d&apos;attention identifiés</h4>
          </div>
          <div className="space-y-2">
            {insights.messages.map((msg, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommandations */}
      {insights.recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h4 className="text-white font-medium">Recommandations</h4>
          </div>
          <ul className="space-y-1">
            {insights.recommendations.map((rec, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                <span className="text-green-400">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
