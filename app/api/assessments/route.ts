import { NextResponse } from "next/server"

// Types
interface Assessment {
  id: string
  name: string
  description: string
  certification: string
  estimatedDuration: number
  questionsCount: number
  status: "available" | "in_progress" | "completed"
  progress?: number
  lastScore?: number
  lastAttemptAt?: string
}

// Mock assessments list
const mockAssessments: Assessment[] = [
  {
    id: "gdp-level1",
    name: "Évaluation GDP Niveau 1",
    description: "Diagnostic complet de votre conformité aux Bonnes Pratiques de Distribution",
    certification: "GDP",
    estimatedDuration: 20,
    questionsCount: 25,
    status: "completed",
    lastScore: 72,
    lastAttemptAt: "2024-12-10T10:30:00Z",
  },
  {
    id: "iso-9001",
    name: "Auto-diagnostic ISO 9001",
    description: "Évaluez la maturité de votre système de management de la qualité",
    certification: "ISO 9001",
    estimatedDuration: 30,
    questionsCount: 35,
    status: "in_progress",
    progress: 45,
  },
  {
    id: "haccp",
    name: "Évaluation HACCP",
    description: "Diagnostic de votre système de gestion de la sécurité alimentaire",
    certification: "HACCP",
    estimatedDuration: 25,
    questionsCount: 30,
    status: "available",
  },
  {
    id: "iso-27001",
    name: "Auto-diagnostic ISO 27001",
    description: "Évaluez votre système de management de la sécurité de l'information",
    certification: "ISO 27001",
    estimatedDuration: 35,
    questionsCount: 40,
    status: "available",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const certification = searchParams.get("certification")

    let filtered = [...mockAssessments]

    if (status && status !== "all") {
      filtered = filtered.filter(a => a.status === status)
    }
    if (certification && certification !== "all") {
      filtered = filtered.filter(a => a.certification === certification)
    }

    // TODO: Replace with actual database query
    // const assessments = await prisma.assessmentTemplate.findMany({
    //   where: { status: 'published' },
    //   include: { sessions: { where: { userId } } }
    // })

    return NextResponse.json({
      assessments: filtered,
      stats: {
        total: filtered.length,
        completed: filtered.filter(a => a.status === "completed").length,
        inProgress: filtered.filter(a => a.status === "in_progress").length,
        available: filtered.filter(a => a.status === "available").length,
      },
    })
  } catch (error) {
    console.error("Error fetching assessments:", error)
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    )
  }
}
