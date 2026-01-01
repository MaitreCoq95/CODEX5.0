"use client"

import { useState } from "react"
import { CompetencyMatrix } from "@/components/learning"
import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, BookOpen, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data
const categories = [
  {
    id: "gdp",
    name: "GDP - Bonnes Pratiques Distribution",
    competencies: [
      { id: "gdp-1", name: "Système Qualité", category: "GDP", level: 85, status: "mastered" as const, modulesCompleted: 4, totalModules: 4 },
      { id: "gdp-2", name: "Documentation", category: "GDP", level: 72, status: "in_progress" as const, modulesCompleted: 3, totalModules: 4 },
      { id: "gdp-3", name: "Chaîne du froid", category: "GDP", level: 45, status: "in_progress" as const, modulesCompleted: 2, totalModules: 5 },
      { id: "gdp-4", name: "Transport", category: "GDP", level: 38, status: "in_progress" as const, modulesCompleted: 1, totalModules: 4 },
      { id: "gdp-5", name: "Réclamations", category: "GDP", level: 90, status: "mastered" as const, modulesCompleted: 3, totalModules: 3 },
    ]
  },
  {
    id: "iso",
    name: "ISO 9001 - Management Qualité",
    competencies: [
      { id: "iso-1", name: "Contexte organisation", category: "ISO", level: 65, status: "in_progress" as const, modulesCompleted: 2, totalModules: 3 },
      { id: "iso-2", name: "Leadership", category: "ISO", level: 55, status: "in_progress" as const, modulesCompleted: 2, totalModules: 4 },
      { id: "iso-3", name: "Planification", category: "ISO", level: 30, status: "not_started" as const, modulesCompleted: 0, totalModules: 3 },
      { id: "iso-4", name: "Support", category: "ISO", level: 0, status: "not_started" as const, modulesCompleted: 0, totalModules: 4 },
      { id: "iso-5", name: "Audit interne", category: "ISO", level: 78, status: "in_progress" as const, modulesCompleted: 3, totalModules: 4 },
    ]
  },
  {
    id: "haccp",
    name: "HACCP - Sécurité Alimentaire",
    competencies: [
      { id: "haccp-1", name: "Analyse des dangers", category: "HACCP", level: 60, status: "in_progress" as const, modulesCompleted: 2, totalModules: 3 },
      { id: "haccp-2", name: "Points critiques (CCP)", category: "HACCP", level: 45, status: "in_progress" as const, modulesCompleted: 1, totalModules: 3 },
      { id: "haccp-3", name: "Surveillance", category: "HACCP", level: 25, status: "not_started" as const, modulesCompleted: 0, totalModules: 2 },
      { id: "haccp-4", name: "Actions correctives", category: "HACCP", level: 0, status: "not_started" as const, modulesCompleted: 0, totalModules: 2 },
    ]
  },
  {
    id: "security",
    name: "Sécurité",
    competencies: [
      { id: "sec-1", name: "Sécurité routière", category: "Sécurité", level: 92, status: "mastered" as const, modulesCompleted: 3, totalModules: 3 },
      { id: "sec-2", name: "EPI", category: "Sécurité", level: 88, status: "mastered" as const, modulesCompleted: 2, totalModules: 2 },
      { id: "sec-3", name: "Gestes et postures", category: "Sécurité", level: 75, status: "in_progress" as const, modulesCompleted: 2, totalModules: 3 },
    ]
  }
]

export default function CompetenciesPage() {
  const [selectedCompetency, setSelectedCompetency] = useState<any>(null)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href="/learning" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-vyxo-gold" />
            Matrice de Compétences
          </h1>
          <p className="text-muted-foreground">
            Visualisez et développez vos compétences professionnelles
          </p>
        </div>
        <Link href="/learning/path">
          <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
            <TrendingUp className="w-4 h-4 mr-2" />
            Mon parcours
          </Button>
        </Link>
      </div>

      {/* Matrix */}
      <CompetencyMatrix 
        categories={categories}
        onCompetencyClick={setSelectedCompetency}
        showProgress={true}
      />

      {/* Competency Detail Modal */}
      <Dialog 
        open={!!selectedCompetency} 
        onOpenChange={() => setSelectedCompetency(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-vyxo-gold" />
              {selectedCompetency?.name}
            </DialogTitle>
            <DialogDescription>
              Catégorie: {selectedCompetency?.category}
            </DialogDescription>
          </DialogHeader>

          {selectedCompetency && (
            <div className="space-y-4">
              {/* Level */}
              <div className="p-4 rounded-xl bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Niveau actuel</span>
                  <span className={`text-xl font-bold ${
                    selectedCompetency.level >= 80 ? "text-emerald-500" :
                    selectedCompetency.level >= 60 ? "text-yellow-500" :
                    selectedCompetency.level >= 40 ? "text-orange-500" : "text-red-500"
                  }`}>
                    {selectedCompetency.level}%
                  </span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      selectedCompetency.level >= 80 ? "bg-emerald-500" :
                      selectedCompetency.level >= 60 ? "bg-yellow-500" :
                      selectedCompetency.level >= 40 ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${selectedCompetency.level}%` }}
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Modules complétés</span>
                <Badge variant="outline">
                  {selectedCompetency.modulesCompleted}/{selectedCompetency.totalModules}
                </Badge>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Statut</span>
                <Badge className={
                  selectedCompetency.status === "mastered" ? "bg-emerald-500/10 text-emerald-500" :
                  selectedCompetency.status === "in_progress" ? "bg-blue-500/10 text-blue-500" :
                  "bg-slate-500/10 text-slate-500"
                }>
                  {selectedCompetency.status === "mastered" ? "✅ Maîtrisé" :
                   selectedCompetency.status === "in_progress" ? "🔄 En cours" :
                   "⏳ Non démarré"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Link href={`/learning/competencies/${selectedCompetency.id}/quiz`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Quiz adaptatif
                  </Button>
                </Link>
                <Link href={`/learning/competencies/${selectedCompetency.id}`} className="flex-1">
                  <Button className="w-full bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Voir modules
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
