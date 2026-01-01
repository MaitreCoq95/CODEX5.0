import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy,
  Zap,
  Flame,
  Star,
  Lock,
  CheckCircle2,
  Target,
  Award
} from "lucide-react"
import Link from "next/link"

// Mock data
const profile = {
  level: 12,
  xp: 2450,
  xpToNextLevel: 550,
  levelProgress: 82,
  streak: { current: 7, longest: 14 },
}

const badges = [
  { id: "first-step", name: "Premier Pas", icon: "🎯", rarity: "common", obtained: true, obtainedAt: "10 déc" },
  { id: "quiz-ace", name: "As du Quiz", icon: "⭐", rarity: "common", obtained: true, obtainedAt: "12 déc" },
  { id: "streak-3", name: "3 Jours", icon: "🔥", rarity: "common", obtained: true, obtainedAt: "8 déc" },
  { id: "streak-7", name: "Semaine en Feu", icon: "🔥", rarity: "rare", obtained: true, obtainedAt: "14 déc" },
  { id: "module-master-5", name: "Maître des Modules", icon: "📚", rarity: "rare", obtained: false },
  { id: "gdp-fundamentals", name: "Fondamentaux GDP", icon: "🏅", rarity: "epic", obtained: false },
  { id: "cold-chain-master", name: "Maître Chaîne du Froid", icon: "❄️", rarity: "epic", obtained: false },
  { id: "gdp-certified", name: "Certifié GDP", icon: "🏆", rarity: "legendary", obtained: false },
]

const achievements = [
  { id: "first-login", name: "Bienvenue!", description: "Première connexion", icon: "👋", progress: 1, maxProgress: 1, xp: 25, unlocked: true },
  { id: "first-quiz", name: "Premier Quiz", description: "Passez votre premier quiz", icon: "❓", progress: 1, maxProgress: 1, xp: 50, unlocked: true },
  { id: "quiz-master-10", name: "Quiz Master", description: "Réussissez 10 quiz", icon: "🎓", progress: 6, maxProgress: 10, xp: 200, unlocked: false },
  { id: "perfectionist", name: "Perfectionniste", description: "Obtenez 5 scores de 100%", icon: "💯", progress: 2, maxProgress: 5, xp: 250, unlocked: false },
  { id: "speed-learner", name: "Apprenant Rapide", description: "Module en <30 min", icon: "⚡", progress: 0, maxProgress: 1, xp: 100, unlocked: false },
  { id: "helper", name: "Bienfaiteur", description: "Aidez 5 collègues", icon: "🤝", progress: 1, maxProgress: 5, xp: 150, unlocked: false },
]

function getRarityStyle(rarity: string) {
  const styles: Record<string, string> = {
    common: "border-gray-500/30 bg-gray-500/5",
    rare: "border-blue-500/30 bg-blue-500/5",
    epic: "border-purple-500/30 bg-purple-500/5",
    legendary: "border-amber-500/30 bg-amber-500/5 ring-1 ring-amber-500/20",
  }
  return styles[rarity] || styles.common
}

function getRarityBadge(rarity: string) {
  const styles: Record<string, string> = {
    common: "bg-gray-500/10 text-gray-500",
    rare: "bg-blue-500/10 text-blue-500",
    epic: "bg-purple-500/10 text-purple-500",
    legendary: "bg-amber-500/10 text-amber-500",
  }
  const labels: Record<string, string> = {
    common: "Commun",
    rare: "Rare",
    epic: "Épique",
    legendary: "Légendaire",
  }
  return <Badge className={styles[rarity]}>{labels[rarity]}</Badge>
}

export default function AchievementsPage() {
  const obtainedBadges = badges.filter(b => b.obtained).length
  const unlockedAchievements = achievements.filter(a => a.unlocked).length
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">
            Collectionnez des badges et débloquez des succès
          </p>
        </div>
        <Link href="/leaderboard">
          <Button variant="outline">
            <Trophy className="w-4 h-4 mr-2" />
            Voir le classement
          </Button>
        </Link>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-vyxo-gold to-amber-400 flex items-center justify-center">
                <span className="text-xl font-bold text-vyxo-navy">{profile.level}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Niveau</p>
                <Progress value={profile.levelProgress} className="h-2 mt-1" />
                <p className="text-xs text-muted-foreground mt-1">{profile.xpToNextLevel} XP restants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto text-vyxo-gold mb-1" />
            <p className="text-2xl font-bold">{profile.xp.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">XP Total</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto text-orange-500 mb-1" />
            <p className="text-2xl font-bold">{profile.streak.current}</p>
            <p className="text-sm text-muted-foreground">Streak actuel</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto text-purple-500 mb-1" />
            <p className="text-2xl font-bold">{obtainedBadges}/{badges.length}</p>
            <p className="text-sm text-muted-foreground">Badges obtenus</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Badges ({obtainedBadges}/{badges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`relative p-4 rounded-xl border transition-all ${
                  badge.obtained 
                    ? getRarityStyle(badge.rarity) 
                    : "opacity-40 grayscale border-border"
                }`}
              >
                {!badge.obtained && (
                  <Lock className="absolute top-2 right-2 w-4 h-4 text-muted-foreground" />
                )}
                <div className="text-center">
                  <span className="text-4xl block mb-2">{badge.icon}</span>
                  <h4 className="font-semibold text-sm">{badge.name}</h4>
                  <div className="mt-2">
                    {getRarityBadge(badge.rarity)}
                  </div>
                  {badge.obtained && badge.obtainedAt && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Obtenu le {badge.obtainedAt}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Succès ({unlockedAchievements}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  ach.unlocked 
                    ? "bg-emerald-500/5 border-emerald-500/30" 
                    : "border-border"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  ach.unlocked ? "bg-emerald-500/10" : "bg-secondary"
                }`}>
                  {ach.unlocked ? ach.icon : "🔒"}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{ach.name}</h4>
                    {ach.unlocked && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{ach.description}</p>
                  {!ach.unlocked && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>{ach.progress}/{ach.maxProgress}</span>
                        <span>{Math.round((ach.progress / ach.maxProgress) * 100)}%</span>
                      </div>
                      <Progress value={(ach.progress / ach.maxProgress) * 100} className="h-1.5" />
                    </div>
                  )}
                </div>
                
                <div className="text-right shrink-0">
                  <Badge variant="outline" className="text-vyxo-gold border-vyxo-gold/30">
                    +{ach.xp} XP
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
