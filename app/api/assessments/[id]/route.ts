import { NextResponse } from "next/server"
import { assessmentEngine } from "@/lib/services/assessment-engine"

// Mock template for GDP assessment
const mockTemplate = {
  id: "gdp-level1",
  name: "Évaluation GDP Niveau 1",
  certification: "GDP",
  estimatedDuration: 20,
  sections: [
    {
      id: "section-1",
      title: "Système Qualité",
      weight: 1.2,
      questions: [
        {
          id: "q1",
          text: "Disposez-vous d'un système qualité pharmaceutique documenté conforme aux BPD ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "En cours de mise en place", value: "partial", score: 25 },
            { label: "Oui, partiellement documenté", value: "mostly", score: 60 },
            { label: "Oui, complet et revu périodiquement", value: "complete", score: 100 },
          ],
          helpText: "Un système qualité documenté est requis par le chapitre 1 des GDP.",
        },
        {
          id: "q2",
          text: "Comment gérez-vous les réclamations clients ?",
          type: "single_choice",
          options: [
            { label: "Pas de procédure formelle", value: "none", score: 0 },
            { label: "Traitement au cas par cas", value: "adhoc", score: 30 },
            { label: "Procédure définie mais non systématique", value: "partial", score: 60 },
            { label: "Procédure documentée avec suivi et analyse", value: "complete", score: 100 },
          ],
        },
        {
          id: "q3",
          text: "Réalisez-vous des auto-inspections régulières ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "Occasionnellement", value: "occasional", score: 40 },
            { label: "Annuellement", value: "annual", score: 70 },
            { label: "Régulièrement avec suivi des actions", value: "regular", score: 100 },
          ],
        },
      ],
    },
    {
      id: "section-2",
      title: "Chaîne du Froid",
      weight: 1.5,
      questions: [
        {
          id: "q4",
          text: "Comment surveillez-vous la température pendant le transport ?",
          type: "single_choice",
          options: [
            { label: "Pas de surveillance", value: "none", score: 0 },
            { label: "Surveillance manuelle ponctuelle", value: "manual", score: 30 },
            { label: "Enregistreurs de température passifs", value: "passive", score: 60 },
            { label: "Monitoring temps réel avec alertes", value: "realtime", score: 100 },
          ],
        },
        {
          id: "q5",
          text: "Vos équipements de transport sont-ils qualifiés ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "Qualification initiale uniquement", value: "initial", score: 40 },
            { label: "Qualification et maintenance préventive", value: "maintenance", score: 70 },
            { label: "Qualification complète avec requalification périodique", value: "complete", score: 100 },
          ],
        },
      ],
    },
    {
      id: "section-3",
      title: "Traçabilité",
      weight: 1.0,
      questions: [
        {
          id: "q6",
          text: "Pouvez-vous tracer un lot de la réception à la livraison ?",
          type: "single_choice",
          options: [
            { label: "Non", value: "no", score: 0 },
            { label: "Partiellement (quelques étapes manquantes)", value: "partial", score: 50 },
            { label: "Oui, traçabilité complète", value: "complete", score: 100 },
          ],
        },
        {
          id: "q7",
          text: "Avez-vous testé votre procédure de rappel dans les 12 derniers mois ?",
          type: "yes_no",
          options: [
            { label: "Oui", value: "yes", score: 100 },
            { label: "Non", value: "no", score: 0 },
          ],
        },
      ],
    },
  ],
}

// GET - Get assessment template
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // TODO: Replace with database query
    // const template = await prisma.assessmentTemplate.findUnique({
    //   where: { id },
    // })

    if (id !== mockTemplate.id) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ template: mockTemplate })
  } catch (error) {
    console.error("Error fetching assessment:", error)
    return NextResponse.json(
      { error: "Failed to fetch assessment" },
      { status: 500 }
    )
  }
}

// POST - Submit assessment answers
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { answers } = body

    // Convert answers to the format expected by the engine
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: value as string,
      answeredAt: new Date(),
      timeSpent: 0,
    }))

    // Calculate score using the assessment engine
    const score = assessmentEngine.calculateMaturityScore(
      formattedAnswers,
      { sections: mockTemplate.sections }
    )

    // TODO: Save session to database
    // const session = await prisma.assessmentSession.create({
    //   data: {
    //     templateId: id,
    //     userId: user.id,
    //     answers: formattedAnswers,
    //     overallScore: score.overallScore,
    //     maturityLevel: score.maturityLevel.name,
    //     sectionScores: score.sectionScores,
    //     gapAnalysis: score.gaps,
    //     recommendations: score.priorityActions,
    //     status: 'completed',
    //     completedAt: new Date(),
    //   },
    // })

    return NextResponse.json({
      success: true,
      sessionId: `session-${Date.now()}`,
      score,
    })
  } catch (error) {
    console.error("Error submitting assessment:", error)
    return NextResponse.json(
      { error: "Failed to submit assessment" },
      { status: 500 }
    )
  }
}
