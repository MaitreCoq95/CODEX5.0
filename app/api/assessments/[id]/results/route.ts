import { NextResponse } from "next/server"

// Mock results for testing
const mockResults = {
  sessionId: "session-123",
  assessmentId: "gdp-level1",
  assessmentName: "Évaluation GDP Niveau 1",
  certification: "GDP",
  completedAt: new Date().toISOString(),
  timeSpent: 18,
  
  overallScore: 72,
  maturityLevel: {
    level: 4,
    name: "Maîtrisé",
    description: "Processus mesurés et contrôlés",
    minScore: 61,
    maxScore: 80,
  },
  
  sectionScores: [
    { sectionId: "section-1", sectionName: "Système Qualité", score: 230, maxScore: 300, percentage: 77, weight: 1.2 },
    { sectionId: "section-2", sectionName: "Chaîne du Froid", score: 130, maxScore: 200, percentage: 65, weight: 1.5 },
    { sectionId: "section-3", sectionName: "Traçabilité", score: 150, maxScore: 200, percentage: 75, weight: 1.0 },
  ],
  
  gaps: [
    {
      id: "gap-1",
      severity: "high",
      category: "Chaîne du Froid",
      title: "Monitoring température insuffisant",
      description: "Le système de surveillance de température actuel ne permet pas un suivi temps réel",
      impactScore: 35,
      recommendedActions: [
        "Installer des capteurs IoT connectés",
        "Mettre en place des alertes automatiques",
        "Former le personnel aux procédures d'urgence",
      ],
      estimatedEffort: "medium",
      relatedModules: ["Gestion Chaîne du Froid", "Qualification Transport"],
    },
    {
      id: "gap-2",
      severity: "medium",
      category: "Traçabilité",
      title: "Test de rappel non effectué récemment",
      description: "Aucun exercice de rappel n'a été réalisé dans les 12 derniers mois",
      impactScore: 25,
      recommendedActions: [
        "Planifier un exercice de rappel simulé",
        "Documenter la procédure de rappel",
        "Former les équipes concernées",
      ],
      estimatedEffort: "low",
      relatedModules: ["Traçabilité Avancée"],
    },
  ],
  
  strengths: [
    "Excellence en Système Qualité (77%)",
    "Bonne gestion documentaire",
    "Auto-inspections régulières",
  ],
  
  priorityActions: [
    { rank: 1, action: "Installer un système de monitoring température temps réel", rationale: "Adresse le gap critique en Chaîne du Froid", quickWin: false, estimatedImpact: "high", category: "Chaîne du Froid" },
    { rank: 2, action: "Réaliser un exercice de rappel simulé", rationale: "Quick win pour améliorer la traçabilité", quickWin: true, estimatedImpact: "medium", category: "Traçabilité" },
    { rank: 3, action: "Former le personnel aux procédures d'urgence température", rationale: "Complète le système de monitoring", quickWin: false, estimatedImpact: "medium", category: "Chaîne du Froid" },
  ],
  
  certificationReadiness: {
    certification: "GDP",
    readinessPercentage: 72,
    estimatedTimeToReady: "3-4 mois",
    blockers: ["Monitoring température insuffisant"],
  },
  
  benchmark: {
    industryAverage: 65,
    percentile: 78,
    sampleSize: 145,
  },
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // TODO: Fetch from database
    // const session = await prisma.assessmentSession.findFirst({
    //   where: { 
    //     OR: [
    //       { id },
    //       { templateId: id, userId: user.id, status: 'completed' }
    //     ]
    //   },
    //   orderBy: { completedAt: 'desc' },
    //   include: { template: true }
    // })

    return NextResponse.json({ results: mockResults })
  } catch (error) {
    console.error("Error fetching results:", error)
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    )
  }
}
