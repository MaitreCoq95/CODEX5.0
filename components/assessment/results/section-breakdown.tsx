"use client"

import { type SectionScore } from "@/lib/types/assessment.types"

interface SectionBreakdownProps {
  sections: SectionScore[]
}

export function SectionBreakdown({ sections }: SectionBreakdownProps) {
  const getColorClass = (percentage: number): string => {
    if (percentage >= 80) return "bg-emerald-500"
    if (percentage >= 60) return "bg-green-500"
    if (percentage >= 40) return "bg-yellow-500"
    if (percentage >= 20) return "bg-orange-500"
    return "bg-red-500"
  }

  const getStatusLabel = (percentage: number): { label: string; color: string } => {
    if (percentage >= 80) return { label: "Excellent", color: "text-emerald-400" }
    if (percentage >= 60) return { label: "Bien", color: "text-green-400" }
    if (percentage >= 40) return { label: "À améliorer", color: "text-yellow-400" }
    if (percentage >= 20) return { label: "Faible", color: "text-orange-400" }
    return { label: "Critique", color: "text-red-400" }
  }

  // Sort by percentage ascending (worst first to highlight gaps)
  const sortedSections = [...sections].sort((a, b) => a.percentage - b.percentage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Score par section</h3>
        <span className="text-sm text-slate-500">
          {sections.length} sections
        </span>
      </div>

      <div className="space-y-4">
        {sortedSections.map((section) => {
          const status = getStatusLabel(section.percentage)
          
          return (
            <div key={section.sectionId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{section.sectionName}</span>
                  <span className={`text-xs ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-400">
                    {section.questionsAnswered}/{section.questionsTotal} questions
                  </span>
                  <span className="font-bold w-12 text-right">
                    {section.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getColorClass(section.percentage)}`}
                  style={{ width: `${section.percentage}%` }}
                />
              </div>

              {/* Weight indicator */}
              <div className="text-xs text-slate-500">
                Poids dans le score global: {section.weight}%
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-slate-400">≥80%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-slate-400">60-79%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-slate-400">40-59%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-slate-400">20-39%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-slate-400">&lt;20%</span>
        </div>
      </div>
    </div>
  )
}

export default SectionBreakdown
