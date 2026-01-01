"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Lock,
  CheckCircle2,
  Clock,
  Star,
  ChevronRight,
  BookOpen,
  Award,
  Zap
} from "lucide-react"
import Link from "next/link"

interface PathModule {
  id: string
  title: string
  description: string
  duration: string
  type: "lesson" | "quiz" | "practice" | "assessment"
  status: "locked" | "available" | "in_progress" | "completed"
  score?: number
  xpReward: number
  requiredModules?: string[]
}

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  icon: string
  color: string
  modules: PathModule[]
  estimatedDuration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  certification?: string
}

interface PersonalizedPathProps {
  path: LearningPath
  onModuleClick?: (module: PathModule) => void
  onStartPath?: () => void
}

export function PersonalizedPath({ 
  path, 
  onModuleClick,
  onStartPath 
}: PersonalizedPathProps) {
  const completedModules = path.modules.filter(m => m.status === "completed").length
  const progress = Math.round((completedModules / path.modules.length) * 100)
  const currentModule = path.modules.find(m => m.status === "available" || m.status === "in_progress")
  const totalXP = path.modules.reduce((sum, m) => sum + m.xpReward, 0)
  const earnedXP = path.modules
    .filter(m => m.status === "completed")
    .reduce((sum, m) => sum + m.xpReward, 0)

  const getStatusIcon = (status: PathModule["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      case "in_progress": return <Play className="w-5 h-5 text-blue-500" />
      case "available": return <div className="w-5 h-5 rounded-full border-2 border-vyxo-gold" />
      case "locked": return <Lock className="w-5 h-5 text-slate-500" />
    }
  }

  const getTypeLabel = (type: PathModule["type"]) => {
    switch (type) {
      case "lesson": return "📖 Leçon"
      case "quiz": return "❓ Quiz"
      case "practice": return "🛠️ Pratique"
      case "assessment": return "📝 Évaluation"
    }
  }

  const getDifficultyColor = (difficulty: LearningPath["difficulty"]) => {
    switch (difficulty) {
      case "beginner": return "bg-emerald-500/10 text-emerald-500"
      case "intermediate": return "bg-yellow-500/10 text-yellow-500"
      case "advanced": return "bg-red-500/10 text-red-500"
    }
  }

  const getDifficultyLabel = (difficulty: LearningPath["difficulty"]) => {
    switch (difficulty) {
      case "beginner": return "Débutant"
      case "intermediate": return "Intermédiaire"
      case "advanced": return "Avancé"
    }
  }

  return (
    <Card className="bento-card overflow-hidden">
      {/* Header */}
      <div 
        className="p-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${path.color}20, transparent)` }}
      >
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{path.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{path.title}</h2>
              <p className="text-sm text-muted-foreground">{path.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getDifficultyColor(path.difficulty)}>
                  {getDifficultyLabel(path.difficulty)}
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {path.estimatedDuration}
                </Badge>
                {path.certification && (
                  <Badge className="bg-vyxo-gold/10 text-vyxo-gold">
                    <Award className="w-3 h-3 mr-1" />
                    {path.certification}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {progress === 0 && onStartPath && (
            <Button 
              onClick={onStartPath}
              className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
            >
              <Play className="w-4 h-4 mr-2" />
              Commencer
            </Button>
          )}
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {completedModules}/{path.modules.length} modules
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* XP Counter */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-vyxo-gold" />
            <span className="font-medium">{earnedXP}</span>
            <span className="text-muted-foreground">/ {totalXP} XP</span>
          </div>
        </div>
      </div>

      {/* Modules Timeline */}
      <CardContent className="p-6">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[11px] top-5 bottom-5 w-0.5 bg-slate-700" />
          
          <div className="space-y-4">
            {path.modules.map((module, index) => {
              const isClickable = module.status !== "locked"
              
              return (
                <div
                  key={module.id}
                  onClick={() => isClickable && onModuleClick?.(module)}
                  className={`
                    relative flex items-start gap-4 p-4 rounded-xl border transition-all
                    ${isClickable ? "cursor-pointer hover:border-vyxo-gold/50" : "opacity-60"}
                    ${module.status === "in_progress" 
                      ? "border-blue-500/50 bg-blue-500/5" 
                      : module.status === "completed"
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-slate-700"
                    }
                  `}
                >
                  {/* Status icon */}
                  <div className="relative z-10 bg-vyxo-navy rounded-full p-1">
                    {getStatusIcon(module.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">
                        {getTypeLabel(module.type)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        {module.xpReward} XP
                      </Badge>
                    </div>
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </span>
                      {module.score !== undefined && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {module.score}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  {isClickable && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Current module CTA */}
        {currentModule && (
          <div className="mt-6 p-4 rounded-xl bg-vyxo-gold/10 border border-vyxo-gold/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-vyxo-gold font-medium">
                  {currentModule.status === "in_progress" ? "Reprendre" : "Prochaine étape"}
                </p>
                <p className="font-medium">{currentModule.title}</p>
              </div>
              <Button 
                onClick={() => onModuleClick?.(currentModule)}
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
              >
                <Play className="w-4 h-4 mr-2" />
                {currentModule.status === "in_progress" ? "Continuer" : "Commencer"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PersonalizedPath
