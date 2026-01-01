"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Award, Lock, CheckCircle2, Star, Sparkles } from "lucide-react"

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  category: string
  unlockedAt?: Date
  progress?: number
  requirement?: string
}

interface BadgeGridProps {
  badges: BadgeItem[]
  showLocked?: boolean
  compact?: boolean
  onBadgeClick?: (badge: BadgeItem) => void
}

const RARITY_CONFIG = {
  common: { 
    color: "from-slate-500 to-slate-600", 
    border: "border-slate-500/30",
    text: "text-slate-400",
    label: "Commun",
    glow: ""
  },
  uncommon: { 
    color: "from-emerald-500 to-emerald-600", 
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    label: "Peu commun",
    glow: "shadow-emerald-500/20"
  },
  rare: { 
    color: "from-blue-500 to-blue-600", 
    border: "border-blue-500/30",
    text: "text-blue-400",
    label: "Rare",
    glow: "shadow-blue-500/20"
  },
  epic: { 
    color: "from-purple-500 to-purple-600", 
    border: "border-purple-500/30",
    text: "text-purple-400",
    label: "Épique",
    glow: "shadow-purple-500/30"
  },
  legendary: { 
    color: "from-vyxo-gold to-yellow-500", 
    border: "border-vyxo-gold/50",
    text: "text-vyxo-gold",
    label: "Légendaire",
    glow: "shadow-yellow-500/40"
  },
}

export function BadgeGrid({
  badges,
  showLocked = true,
  compact = false,
  onBadgeClick
}: BadgeGridProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null)

  const unlockedBadges = badges.filter(b => b.unlockedAt)
  const lockedBadges = badges.filter(b => !b.unlockedAt)

  const handleBadgeClick = (badge: BadgeItem) => {
    setSelectedBadge(badge)
    onBadgeClick?.(badge)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  const BadgeCard = ({ badge, locked = false }: { badge: BadgeItem; locked?: boolean }) => {
    const rarity = RARITY_CONFIG[badge.rarity]
    
    return (
      <div
        onClick={() => handleBadgeClick(badge)}
        className={`
          relative p-4 rounded-xl border cursor-pointer transition-all duration-300
          hover:scale-105 hover:z-10
          ${locked ? "opacity-50 grayscale" : `${rarity.border} shadow-lg ${rarity.glow}`}
          ${compact ? "p-3" : "p-4"}
        `}
      >
        {/* Background gradient */}
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-br ${rarity.color} opacity-10
        `} />
        
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className={`
            mx-auto mb-2 text-4xl
            ${compact ? "text-3xl" : "text-4xl"}
          `}>
            {locked ? <Lock className="w-8 h-8 text-slate-500 mx-auto" /> : badge.icon}
          </div>

          {/* Name */}
          <p className={`font-medium text-sm ${locked ? "text-slate-500" : ""}`}>
            {badge.name}
          </p>

          {/* Rarity */}
          <Badge className={`mt-2 text-xs ${rarity.text} bg-transparent border ${rarity.border}`}>
            {rarity.label}
          </Badge>

          {/* Progress for locked badges */}
          {locked && badge.progress !== undefined && (
            <div className="mt-2">
              <Progress value={badge.progress} className="h-1" />
              <p className="text-xs text-muted-foreground mt-1">{badge.progress}%</p>
            </div>
          )}

          {/* Unlocked indicator */}
          {!locked && (
            <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-emerald-500" />
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-vyxo-gold" />
              Badges obtenus ({unlockedBadges.length})
            </h3>
            <div className={`grid gap-4 ${compact ? "grid-cols-4 md:grid-cols-6" : "grid-cols-3 md:grid-cols-5"}`}>
              {unlockedBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {showLocked && lockedBadges.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-muted-foreground">
              <Lock className="w-5 h-5" />
              À débloquer ({lockedBadges.length})
            </h3>
            <div className={`grid gap-4 ${compact ? "grid-cols-4 md:grid-cols-6" : "grid-cols-3 md:grid-cols-5"}`}>
              {lockedBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} locked />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Badge Detail Modal */}
      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="max-w-sm">
          {selectedBadge && (
            <>
              <DialogHeader className="text-center">
                <div className="mx-auto mb-2 text-6xl">
                  {selectedBadge.unlockedAt ? selectedBadge.icon : <Lock className="w-16 h-16 text-slate-500" />}
                </div>
                <DialogTitle className="flex items-center justify-center gap-2">
                  {selectedBadge.name}
                  <Badge className={`${RARITY_CONFIG[selectedBadge.rarity].text} bg-transparent border`}>
                    {RARITY_CONFIG[selectedBadge.rarity].label}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedBadge.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Catégorie</span>
                  <Badge variant="outline">{selectedBadge.category}</Badge>
                </div>

                {selectedBadge.unlockedAt ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Obtenu le</span>
                    <span className="text-emerald-400">{formatDate(selectedBadge.unlockedAt)}</span>
                  </div>
                ) : (
                  <>
                    {selectedBadge.requirement && (
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <p className="text-sm text-muted-foreground">
                          <Lock className="w-4 h-4 inline mr-2" />
                          {selectedBadge.requirement}
                        </p>
                      </div>
                    )}
                    {selectedBadge.progress !== undefined && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progression</span>
                          <span>{selectedBadge.progress}%</span>
                        </div>
                        <Progress value={selectedBadge.progress} className="h-2" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Badge Unlock Animation
interface BadgeUnlockModalProps {
  badge: BadgeItem | null
  onClose: () => void
}

export function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  if (!badge) return null

  const rarity = RARITY_CONFIG[badge.rarity]

  return (
    <Dialog open={!!badge} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <div className="py-6">
          <Sparkles className="w-8 h-8 mx-auto text-vyxo-gold mb-4 animate-pulse" />
          <p className="text-sm text-vyxo-gold font-medium mb-6">NOUVEAU BADGE DÉBLOQUÉ !</p>
          
          <div className={`
            mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br ${rarity.color}
            flex items-center justify-center text-5xl mb-4 shadow-xl ${rarity.glow}
            animate-in zoom-in-50 duration-500
          `}>
            {badge.icon}
          </div>

          <h2 className="text-xl font-bold mb-2">{badge.name}</h2>
          <Badge className={`${rarity.text} bg-transparent border ${rarity.border}`}>
            {rarity.label}
          </Badge>
          <p className="text-muted-foreground mt-4">{badge.description}</p>

          <Button 
            onClick={onClose}
            className="mt-6 bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
          >
            Super !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BadgeGrid
