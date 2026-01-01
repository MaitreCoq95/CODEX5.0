"use client"

import { useState } from "react"
import { XPBar, BadgeGrid, Leaderboard, CertificatesList } from "@/components/gamification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Users, Star, Flame, Target, TrendingUp } from "lucide-react"

// Mock data
const userProfile = {
  level: 4,
  levelName: "Expert Confirmé",
  nextLevelName: "Maître",
  currentXP: 3250,
  levelXP: 5000,
  totalXP: 12450,
  streak: 12,
  rank: 7,
  badges: 8
}

const badges = [
  { id: "1", name: "Premier Pas", description: "Complétez votre premier module", icon: "🎯", rarity: "common" as const, category: "Progression", unlockedAt: new Date("2024-01-15") },
  { id: "2", name: "Semaine en Feu", description: "7 jours d'activité consécutifs", icon: "🔥", rarity: "rare" as const, category: "Streak", unlockedAt: new Date("2024-02-01") },
  { id: "3", name: "Quiz Parfait", description: "100% sur un quiz", icon: "⭐", rarity: "epic" as const, category: "Performance", unlockedAt: new Date("2024-03-10") },
  { id: "4", name: "Expert GDP", description: "Maîtrisez toutes les compétences GDP", icon: "🏆", rarity: "legendary" as const, category: "Certification", unlockedAt: new Date("2024-06-15") },
  { id: "5", name: "Explorateur", description: "Essayez 5 catégories différentes", icon: "🧭", rarity: "uncommon" as const, category: "Exploration", unlockedAt: new Date("2024-02-20") },
  { id: "6", name: "Mentor", description: "Aidez 3 collègues", icon: "🤝", rarity: "rare" as const, category: "Social" },
  { id: "7", name: "Champion", description: "Top 3 du classement", icon: "👑", rarity: "epic" as const, category: "Compétition", progress: 65, requirement: "Atteignez le top 3 du classement mensuel" },
  { id: "8", name: "Légende", description: "Niveau 10 atteint", icon: "🌟", rarity: "legendary" as const, category: "Progression", progress: 40, requirement: "Atteignez le niveau 10" },
  { id: "9", name: "Rapide", description: "Terminez un module en moins de 10min", icon: "⚡", rarity: "uncommon" as const, category: "Performance", unlockedAt: new Date("2024-04-05") },
  { id: "10", name: "Perfectionniste", description: "Score >90% sur 10 modules", icon: "💎", rarity: "epic" as const, category: "Performance", progress: 70, requirement: "Obtenez plus de 90% sur 10 modules" },
]

const leaderboardEntries = [
  { id: "1", rank: 1, previousRank: 1, name: "Thomas Dubois", department: "Qualité", score: 95, xp: 18500, streak: 45, level: 7, badges: 15 },
  { id: "2", rank: 2, previousRank: 3, name: "Marie Laurent", department: "Logistique", score: 88, xp: 15200, streak: 28, level: 6, badges: 12 },
  { id: "3", rank: 3, previousRank: 2, name: "Emma Petit", department: "Qualité", score: 85, xp: 14800, streak: 21, level: 6, badges: 11 },
  { id: "4", rank: 4, previousRank: 4, name: "Lucas Bernard", department: "Production", score: 82, xp: 13500, streak: 18, level: 5, badges: 10 },
  { id: "5", rank: 5, previousRank: 7, name: "Sophie Martin", department: "Logistique", score: 80, xp: 12800, streak: 14, level: 5, badges: 9 },
  { id: "6", rank: 6, previousRank: 5, name: "Claire Durand", department: "Commercial", score: 78, xp: 12600, streak: 10, level: 5, badges: 9 },
  { id: "7", rank: 7, previousRank: 8, name: "Moi", department: "Logistique", score: 75, xp: 12450, streak: 12, level: 4, badges: 8, isCurrentUser: true },
  { id: "8", rank: 8, previousRank: 6, name: "Paul Lefèvre", department: "IT", score: 72, xp: 11200, streak: 8, level: 4, badges: 7 },
  { id: "9", rank: 9, previousRank: 9, name: "Julie Moreau", department: "RH", score: 70, xp: 10500, streak: 5, level: 4, badges: 6 },
  { id: "10", rank: 10, previousRank: 10, name: "Antoine Blanc", department: "Production", score: 68, xp: 9800, streak: 3, level: 3, badges: 5 },
]

const certificates = [
  { 
    id: "1", 
    recipientName: "Jean Dupont", 
    certificationName: "GDP Niveau 1", 
    certificationLevel: "Fondamentaux",
    issuedDate: new Date("2024-06-15"), 
    expiryDate: new Date("2026-06-15"),
    issuerName: "Vyxo Academy", 
    score: 92,
    skills: ["Documentation", "Qualité", "Traçabilité"],
    certificateNumber: "CERT-GDP-2024-001"
  },
  { 
    id: "2", 
    recipientName: "Jean Dupont", 
    certificationName: "Sécurité au Travail", 
    issuedDate: new Date("2024-04-20"), 
    expiryDate: new Date("2025-04-20"),
    issuerName: "Vyxo Academy", 
    score: 88,
    skills: ["EPI", "Gestes et postures"],
    certificateNumber: "CERT-SEC-2024-015"
  },
  { 
    id: "3", 
    recipientName: "Jean Dupont", 
    certificationName: "ISO 9001 Sensibilisation", 
    issuedDate: new Date("2023-12-01"), 
    expiryDate: new Date("2024-12-01"),
    issuerName: "Vyxo Academy", 
    score: 85,
    skills: ["Système qualité", "Audit"],
    certificateNumber: "CERT-ISO-2023-089"
  },
]

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="w-8 h-8 text-vyxo-gold" />
            Mon Profil
          </h1>
          <p className="text-muted-foreground">
            Votre progression et vos récompenses
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-500">{userProfile.streak} jours</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10">
            <Star className="w-5 h-5 text-purple-500" />
            <span className="font-bold text-purple-500">{userProfile.badges} badges</span>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <XPBar
        level={userProfile.level}
        levelName={userProfile.levelName}
        nextLevelName={userProfile.nextLevelName}
        currentXP={userProfile.currentXP}
        levelXP={userProfile.levelXP}
        showAnimation
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Aperçu
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Classement
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Certificats
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <Card className="bento-card">
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 text-center">
                  <p className="text-3xl font-bold text-vyxo-gold">{userProfile.totalXP.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">XP Total</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 text-center">
                  <p className="text-3xl font-bold">#{userProfile.rank}</p>
                  <p className="text-sm text-muted-foreground">Classement</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 text-center">
                  <p className="text-3xl font-bold text-orange-500">{userProfile.streak}</p>
                  <p className="text-sm text-muted-foreground">Jours consécutifs</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 text-center">
                  <p className="text-3xl font-bold text-purple-500">{userProfile.badges}</p>
                  <p className="text-sm text-muted-foreground">Badges</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card className="bento-card">
              <CardHeader>
                <CardTitle>Derniers badges</CardTitle>
              </CardHeader>
              <CardContent>
                <BadgeGrid 
                  badges={badges.filter(b => b.unlockedAt).slice(0, 6)} 
                  showLocked={false}
                  compact
                />
              </CardContent>
            </Card>
          </div>

          {/* Mini Leaderboard */}
          <Leaderboard 
            entries={leaderboardEntries.slice(0, 5)} 
            currentUserId="7"
            maxEntries={5}
          />
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges">
          <BadgeGrid badges={badges} />
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Leaderboard 
            entries={leaderboardEntries} 
            currentUserId="7"
          />
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <CertificatesList certificates={certificates} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
