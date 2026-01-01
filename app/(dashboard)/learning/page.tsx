import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen,
  Target,
  Award,
  Clock,
  TrendingUp,
  Play,
  ChevronRight,
  Flame,
  Star,
  Zap
} from "lucide-react"
import Link from "next/link"

// Mock data
const userProfile = {
  level: 12,
  xp: 2450,
  xpToNextLevel: 3000,
  streak: 7,
  totalModules: 24,
  completedModules: 8,
  avgScore: 78,
}

const learningPath = {
  goal: "Certification GDP Niveau 1",
  progress: 33,
  nextModule: {
    id: "cold-chain",
    title: "Gestion de la Chaîne du Froid",
    duration: 50,
    category: "GDP",
  },
  estimatedTimeRemaining: 12, // hours
}

const recentModules = [
  { id: "quality-system", title: "Système Qualité Pharmaceutique", progress: 100, score: 85, completedAt: "12 déc" },
  { id: "documentation", title: "Documentation et Traçabilité", progress: 75, score: null, completedAt: null },
  { id: "gdp-intro", title: "Introduction aux GDP", progress: 100, score: 92, completedAt: "10 déc" },
]

const competencies = [
  { name: "Système Qualité", level: 85, category: "GDP" },
  { name: "Documentation", level: 72, category: "GDP" },
  { name: "Chaîne du Froid", level: 45, category: "GDP" },
  { name: "Transport", level: 38, category: "GDP" },
]

const achievements = [
  { id: "first-module", name: "Premier Pas", icon: "🎯", rarity: "common" },
  { id: "streak-7", name: "Semaine en Feu", icon: "🔥", rarity: "rare" },
  { id: "perfect-quiz", name: "Quiz Parfait", icon: "⭐", rarity: "epic" },
]

export default function LearningPage() {
  const levelProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mon Apprentissage</h1>
          <p className="text-muted-foreground">
            Progressez vers vos objectifs de certification
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/learning/path">
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Mon Parcours
            </Button>
          </Link>
          <Link href="/learning/competencies">
            <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
              <TrendingUp className="w-4 h-4 mr-2" />
              Mes Compétences
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vyxo-gold to-amber-400 flex items-center justify-center">
                <span className="text-lg font-bold text-vyxo-navy">{userProfile.level}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Niveau</p>
                <Progress value={levelProgress} className="h-2 w-20 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto text-orange-500 mb-1" />
            <p className="text-2xl font-bold">{userProfile.streak}</p>
            <p className="text-sm text-muted-foreground">jours consécutifs</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto text-blue-500 mb-1" />
            <p className="text-2xl font-bold">{userProfile.completedModules}/{userProfile.totalModules}</p>
            <p className="text-sm text-muted-foreground">modules complétés</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 mx-auto text-vyxo-gold mb-1" />
            <p className="text-2xl font-bold">{userProfile.avgScore}%</p>
            <p className="text-sm text-muted-foreground">score moyen</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Path */}
          <Card className="bento-card bg-gradient-to-r from-vyxo-navy to-vyxo-navy/80 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Badge className="bg-vyxo-gold text-vyxo-navy mb-2">Objectif actuel</Badge>
                  <h3 className="text-xl font-bold">{learningPath.goal}</h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{learningPath.progress}%</p>
                  <p className="text-sm text-white/70">complété</p>
                </div>
              </div>

              <Progress value={learningPath.progress} className="h-2 mb-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  <span>~{learningPath.estimatedTimeRemaining}h restantes</span>
                </div>
                <Link href="/learning/path">
                  <Button variant="secondary" size="sm">
                    Voir le parcours
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Next Module */}
          <Card className="bento-card border-vyxo-gold/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reprendre où vous en étiez
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">{learningPath.nextModule.category}</Badge>
                  <h3 className="text-lg font-semibold">{learningPath.nextModule.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    ~{learningPath.nextModule.duration} min
                  </p>
                </div>
                <Link href={`/learning/modules/${learningPath.nextModule.id}`}>
                  <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                    <Play className="w-4 h-4 mr-2" />
                    Continuer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Modules */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Modules récents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentModules.map((module) => (
                <div 
                  key={module.id}
                  className="flex items-center justify-between p-3 rounded-xl border hover:border-vyxo-gold/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{module.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Progress value={module.progress} className="h-1.5 w-24" />
                      <span className="text-sm text-muted-foreground">{module.progress}%</span>
                      {module.score && (
                        <span className="text-sm text-emerald-500">Score: {module.score}%</span>
                      )}
                    </div>
                  </div>
                  <Link href={`/learning/modules/${module.id}`}>
                    <Button variant="ghost" size="sm">
                      {module.progress === 100 ? "Revoir" : "Continuer"}
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Competencies Preview */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Compétences
                </span>
                <Link href="/learning/competencies">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {competencies.map((comp) => (
                <div key={comp.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{comp.name}</span>
                    <span className={comp.level >= 70 ? "text-emerald-500" : comp.level >= 50 ? "text-yellow-500" : "text-red-500"}>
                      {comp.level}%
                    </span>
                  </div>
                  <Progress 
                    value={comp.level} 
                    className={`h-1.5 ${comp.level >= 70 ? "[&>div]:bg-emerald-500" : comp.level >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Badges récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {achievements.map((ach) => (
                  <div 
                    key={ach.id}
                    className="flex flex-col items-center p-3 rounded-xl bg-secondary/50 text-center"
                  >
                    <span className="text-2xl mb-1">{ach.icon}</span>
                    <span className="text-xs font-medium">{ach.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* XP Card */}
          <Card className="bento-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{userProfile.xp} XP</p>
                  <p className="text-sm text-muted-foreground">
                    {userProfile.xpToNextLevel - userProfile.xp} XP pour niveau {userProfile.level + 1}
                  </p>
                  <Progress value={levelProgress} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
