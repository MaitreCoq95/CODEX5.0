"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, TrendingUp, Star, Crown } from "lucide-react"
import confetti from "canvas-confetti"

interface XPBarProps {
  currentXP: number
  levelXP: number
  level: number
  levelName: string
  nextLevelName?: string
  showAnimation?: boolean
  compact?: boolean
}

const LEVEL_COLORS: Record<number, { bg: string; text: string; glow: string }> = {
  1: { bg: "from-slate-600 to-slate-700", text: "text-slate-400", glow: "shadow-slate-500/20" },
  2: { bg: "from-emerald-600 to-emerald-700", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  3: { bg: "from-blue-600 to-blue-700", text: "text-blue-400", glow: "shadow-blue-500/20" },
  4: { bg: "from-purple-600 to-purple-700", text: "text-purple-400", glow: "shadow-purple-500/20" },
  5: { bg: "from-vyxo-gold to-yellow-600", text: "text-vyxo-gold", glow: "shadow-yellow-500/30" },
}

export function XPBar({
  currentXP,
  levelXP,
  level,
  levelName,
  nextLevelName,
  showAnimation = false,
  compact = false
}: XPBarProps) {
  const [displayedXP, setDisplayedXP] = useState(showAnimation ? 0 : currentXP)
  const [hasAnimated, setHasAnimated] = useState(false)
  const progress = Math.min((displayedXP / levelXP) * 100, 100)
  const xpToNext = levelXP - currentXP

  const colors = LEVEL_COLORS[Math.min(level, 5)] || LEVEL_COLORS[1]

  useEffect(() => {
    if (showAnimation && !hasAnimated) {
      const duration = 1500
      const steps = 50
      const increment = currentXP / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= currentXP) {
          setDisplayedXP(currentXP)
          clearInterval(timer)
          setHasAnimated(true)
          
          // Trigger confetti at the end if close to level up
          if (progress > 90) {
            confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } })
          }
        } else {
          setDisplayedXP(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [showAnimation, currentXP, hasAnimated, progress])

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`
          w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} 
          flex items-center justify-center font-bold text-white text-sm
          shadow-lg ${colors.glow}
        `}>
          {level}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={colors.text}>{levelName}</span>
            <span className="text-muted-foreground">{displayedXP}/{levelXP} XP</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>
    )
  }

  return (
    <Card className="bento-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Level Badge */}
          <div className={`
            relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg}
            flex items-center justify-center shadow-xl ${colors.glow}
          `}>
            <span className="text-2xl font-bold text-white">{level}</span>
            {level >= 5 && (
              <Crown className="absolute -top-2 -right-2 w-5 h-5 text-vyxo-gold" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-bold ${colors.text}`}>{levelName}</h3>
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Niveau {level}
              </Badge>
            </div>
            {nextLevelName && (
              <p className="text-sm text-muted-foreground">
                Prochain: {nextLevelName} • {xpToNext} XP restants
              </p>
            )}
          </div>

          {/* XP Count */}
          <div className="text-right">
            <div className="flex items-center gap-1 text-vyxo-gold">
              <Zap className="w-5 h-5" />
              <span className="text-2xl font-bold">{displayedXP.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">XP Total</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progression niveau {level}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 ease-out`}
              style={{ width: `${progress}%` }}
            />
            {/* Shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ 
                transform: `translateX(${progress - 100}%)`,
                transition: "transform 1.5s ease-out"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 XP</span>
            <span>{levelXP.toLocaleString()} XP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// XP Gain Animation Component
interface XPGainToastProps {
  amount: number
  reason: string
  onComplete: () => void
}

export function XPGainToast({ amount, reason, onComplete }: XPGainToastProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-right fade-in duration-300">
      <div className="flex items-center gap-3 px-4 py-3 bg-vyxo-navy border border-vyxo-gold/30 rounded-xl shadow-xl">
        <div className="w-10 h-10 rounded-xl bg-vyxo-gold/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-vyxo-gold" />
        </div>
        <div>
          <p className="font-bold text-vyxo-gold">+{amount} XP</p>
          <p className="text-xs text-muted-foreground">{reason}</p>
        </div>
      </div>
    </div>
  )
}

export default XPBar
