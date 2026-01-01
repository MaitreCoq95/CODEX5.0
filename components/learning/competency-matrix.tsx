"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronRight, TrendingUp, Award, BookOpen } from "lucide-react"

interface Competency {
  id: string
  name: string
  category: string
  level: number
  targetLevel?: number
  lastAssessed?: Date
  status: "not_started" | "in_progress" | "mastered"
  modulesCompleted: number
  totalModules: number
}

interface CompetencyCategory {
  id: string
  name: string
  competencies: Competency[]
}

interface CompetencyMatrixProps {
  categories: CompetencyCategory[]
  onCompetencyClick?: (competency: Competency) => void
  showProgress?: boolean
}

export function CompetencyMatrix({
  categories,
  onCompetencyClick,
  showProgress = true
}: CompetencyMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getColorByLevel = (level: number) => {
    if (level >= 80) return { bg: "bg-emerald-500", text: "text-emerald-500" }
    if (level >= 60) return { bg: "bg-yellow-500", text: "text-yellow-500" }
    if (level >= 40) return { bg: "bg-orange-500", text: "text-orange-500" }
    if (level > 0) return { bg: "bg-red-500", text: "text-red-500" }
    return { bg: "bg-slate-700", text: "text-slate-500" }
  }

  const getStatusLabel = (status: Competency["status"]) => {
    switch (status) {
      case "mastered": return "Maîtrisé"
      case "in_progress": return "En cours"
      case "not_started": return "Non démarré"
    }
  }

  const filteredCategories = selectedCategory
    ? categories.filter(c => c.id === selectedCategory)
    : categories

  // Calculate overall stats
  const allCompetencies = categories.flatMap(c => c.competencies)
  const avgLevel = Math.round(
    allCompetencies.reduce((sum, c) => sum + c.level, 0) / allCompetencies.length
  )
  const masteredCount = allCompetencies.filter(c => c.status === "mastered").length

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      {showProgress && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
              <p className="text-2xl font-bold">{avgLevel}%</p>
              <p className="text-xs text-muted-foreground">Niveau moyen</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
              <p className="text-2xl font-bold">{masteredCount}/{allCompetencies.length}</p>
              <p className="text-xs text-muted-foreground">Maîtrisées</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-bold">{categories.length}</p>
              <p className="text-xs text-muted-foreground">Catégories</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <div className="w-6 h-6 mx-auto text-purple-500 mb-2 flex items-center justify-center">
                🎯
              </div>
              <p className="text-2xl font-bold">
                {allCompetencies.filter(c => c.status === "in_progress").length}
              </p>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "bg-vyxo-gold text-vyxo-navy" : ""}
        >
          Toutes
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "bg-vyxo-gold text-vyxo-navy" : ""}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Matrix Grid */}
      <div className="space-y-6">
        {filteredCategories.map(category => (
          <Card key={category.id} className="bento-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <TooltipProvider>
                  {category.competencies.map(competency => {
                    const colors = getColorByLevel(competency.level)
                    
                    return (
                      <Tooltip key={competency.id}>
                        <TooltipTrigger asChild>
                          <div
                            onClick={() => onCompetencyClick?.(competency)}
                            className={`
                              p-4 rounded-xl border cursor-pointer transition-all
                              hover:border-vyxo-gold/50 hover:scale-[1.02]
                              ${competency.status === "mastered" 
                                ? "border-emerald-500/30 bg-emerald-500/5" 
                                : "border-slate-700"
                              }
                            `}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium truncate pr-2">
                                {competency.name}
                              </span>
                              <span className={`text-sm font-bold ${colors.text}`}>
                                {competency.level}%
                              </span>
                            </div>
                            
                            <Progress 
                              value={competency.level} 
                              className={`h-2 [&>div]:${colors.bg}`}
                            />

                            <div className="flex items-center justify-between mt-2">
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {competency.modulesCompleted}/{competency.totalModules}
                              </Badge>
                              {competency.status === "mastered" && (
                                <span className="text-xs">✅</span>
                              )}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-medium">{competency.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {getStatusLabel(competency.status)}
                            </p>
                            {competency.targetLevel && (
                              <p className="text-xs">
                                Objectif: {competency.targetLevel}%
                              </p>
                            )}
                            {competency.lastAssessed && (
                              <p className="text-xs text-muted-foreground">
                                Dernière évaluation: {competency.lastAssessed.toLocaleDateString("fr-FR")}
                              </p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>Expert (80%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Avancé (60-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span>Intermédiaire (40-59%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Débutant (&lt;40%)</span>
        </div>
      </div>
    </div>
  )
}

export default CompetencyMatrix
