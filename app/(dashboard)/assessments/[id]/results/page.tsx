"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  RefreshCw,
  CheckCircle,
  Star,
  BookOpen
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ScoreGauge,
  SectionBreakdown,
  GapsList,
  PriorityActions,
  CertificationReadiness,
} from "@/components/assessment/results"
import { type AssessmentResults } from "@/lib/types/assessment.types"

// Mock data - will be replaced with API call
const getMockResults = (id: string): AssessmentResults => ({
  sessionId: id,
  templateId: "gdp-level1",
  completedAt: new Date(),
  overallScore: 68,
  maturityLevel: {
    level: 4,
    name: "Maîtrisé",
    description: "Processus mesurés et contrôlés",
    minScore: 61,
    maxScore: 80,
    color: "#22c55e",
  },
  sectionScores: [
    { sectionId: "1", sectionName: "Système Qualité", score: 75, maxScore: 100, percentage: 75, weight: 25, questionsAnswered: 5, questionsTotal: 5 },
    { sectionId: "2", sectionName: "Chaîne du Froid", score: 45, maxScore: 100, percentage: 45, weight: 30, questionsAnswered: 6, questionsTotal: 6 },
    { sectionId: "3", sectionName: "Documentation", score: 80, maxScore: 100, percentage: 80, weight: 20, questionsAnswered: 4, questionsTotal: 4 },
    { sectionId: "4", sectionName: "Traçabilité", score: 60, maxScore: 100, percentage: 60, weight: 15, questionsAnswered: 5, questionsTotal: 5 },
    { sectionId: "5", sectionName: "Réclamations", score: 85, maxScore: 100, percentage: 85, weight: 10, questionsAnswered: 3, questionsTotal: 3 },
  ],
  gaps: [
    {
      id: "gap-1",
      severity: "high",
      category: "Chaîne du Froid",
      title: "Absence de monitoring température temps réel",
      description: "Aucun système de suivi continu des températures n'est en place pour les produits thermosensibles.",
      impactScore: 55,
      recommendedActions: [
        "Installer des capteurs de température connectés",
        "Mettre en place un système d'alertes automatiques",
        "Former le personnel à l'utilisation des outils"
      ],
      relatedModules: ["Gestion Chaîne du Froid", "Qualification Transport"],
      estimatedEffort: "medium",
    },
    {
      id: "gap-2",
      severity: "medium",
      category: "Traçabilité",
      title: "Traçabilité lot partielle",
      description: "Le suivi des lots n'est pas complet sur l'ensemble de la chaîne de distribution.",
      impactScore: 40,
      recommendedActions: [
        "Implémenter un système de traçabilité lot à lot",
        "Tester les procédures de rappel"
      ],
      relatedModules: ["Traçabilité Avancée"],
      estimatedEffort: "high",
    },
  ],
  strengths: [
    "Excellence en gestion des réclamations (85%)",
    "Documentation bien structurée (80%)",
    "Responsable Qualité désigné et formé",
  ],
  priorityActions: [
    {
      rank: 1,
      action: "Installer un système de monitoring température IoT",
      rationale: "Adresse le gap critique en Chaîne du Froid",
      quickWin: false,
      estimatedImpact: "high",
      category: "Chaîne du Froid",
    },
    {
      rank: 2,
      action: "Mettre à jour les procédures de rappel produit",
      rationale: "Améliore la traçabilité et la réactivité",
      quickWin: true,
      estimatedImpact: "medium",
      category: "Traçabilité",
    },
    {
      rank: 3,
      action: "Former l'équipe aux nouveaux outils digitaux",
      rationale: "Maximise l'adoption des solutions mises en place",
      quickWin: true,
      estimatedImpact: "medium",
      category: "Formation",
    },
  ],
  certificationReadiness: {
    certification: "GDP",
    readinessPercentage: 68,
    estimatedTimeToReady: "3-4 mois",
    blockers: ["Monitoring température insuffisant"],
    nextSteps: [
      "Résoudre les gaps critiques identifiés",
      "Compléter les formations obligatoires",
      "Planifier un audit blanc interne"
    ],
  },
})

interface PageProps {
  params: Promise<{ id: string }>
}

export default function AssessmentResultsPage({ params }: PageProps) {
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadResults = async () => {
      const resolvedParams = await params
      const data = getMockResults(resolvedParams.id)
      setResults(data)
      setIsLoading(false)
    }
    loadResults()
  }, [params])

  if (isLoading || !results) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Chargement des résultats...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/assessments">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <h1 className="text-xl font-bold">Résultats de l&apos;évaluation</h1>
                </div>
                <p className="text-sm text-slate-400">
                  Complété le {results.completedAt.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                <Download className="w-4 h-4 mr-2" />
                Télécharger PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Score */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-slate-700 bg-slate-900">
              <CardContent className="p-6">
                <ScoreGauge 
                  score={results.overallScore} 
                  maturityLevel={results.maturityLevel} 
                />
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="w-5 h-5 text-vyxo-gold" />
                  Points forts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {results.strengths.map((strength, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {strength}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-vyxo-gold/30 bg-vyxo-gold/10">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-10 h-10 text-vyxo-gold mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Améliorez votre score</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Suivez nos formations adaptées à vos gaps
                </p>
                <Button className="w-full bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                  Voir les formations recommandées
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="breakdown" className="space-y-6">
              <TabsList className="bg-slate-800">
                <TabsTrigger value="breakdown">Scores</TabsTrigger>
                <TabsTrigger value="gaps">
                  Écarts
                  {results.gaps.length > 0 && (
                    <Badge className="ml-2 bg-red-500/20 text-red-400">
                      {results.gaps.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="actions">Plan d&apos;action</TabsTrigger>
                <TabsTrigger value="certification">Certification</TabsTrigger>
              </TabsList>

              <TabsContent value="breakdown">
                <Card className="border-slate-700 bg-slate-900">
                  <CardContent className="p-6">
                    <SectionBreakdown sections={results.sectionScores} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gaps">
                <Card className="border-slate-700 bg-slate-900">
                  <CardContent className="p-6">
                    <GapsList 
                      gaps={results.gaps} 
                      onViewModule={(id) => router.push(`/learning/modules/${id}`)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actions">
                <Card className="border-slate-700 bg-slate-900">
                  <CardContent className="p-6">
                    <PriorityActions actions={results.priorityActions} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certification">
                <Card className="border-slate-700 bg-slate-900">
                  <CardContent className="p-6">
                    <CertificationReadiness readiness={results.certificationReadiness} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Besoin d&apos;accompagnement ? Nos consultants peuvent vous aider.
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/assessments/${results.sessionId}/take`}>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refaire l&apos;évaluation
              </Button>
            </Link>
            <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
              Contacter un consultant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
