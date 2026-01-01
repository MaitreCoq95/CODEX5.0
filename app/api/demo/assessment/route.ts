import { NextResponse } from "next/server"
import { multiNormsService, type SupportedCertification } from "@/lib/services/multi-norms-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const normId = searchParams.get("norm") as SupportedCertification

    if (!normId) {
      return NextResponse.json(
        { error: "Norm parameter is required" },
        { status: 400 }
      )
    }

    const certification = multiNormsService.getCertification(normId)
    if (!certification) {
      return NextResponse.json(
        { error: "Certification not found" },
        { status: 404 }
      )
    }

    const questions = multiNormsService.getQuestions(normId)

    return NextResponse.json({
      certification: {
        id: certification.id,
        name: certification.name,
        fullName: certification.fullName,
      },
      questions: questions.map(q => ({
        id: q.id,
        text: q.text,
        clause: q.clause,
        type: q.type,
        options: q.options.map(o => ({
          label: o.label,
          value: o.score,
        })),
      })),
      totalQuestions: questions.length,
    })
  } catch (error) {
    console.error("Error fetching assessment:", error)
    return NextResponse.json(
      { error: "Failed to fetch assessment" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { normId, answers } = body

    if (!normId || !answers) {
      return NextResponse.json(
        { error: "normId and answers are required" },
        { status: 400 }
      )
    }

    const results = multiNormsService.calculateScore(normId, answers)

    return NextResponse.json({
      normId,
      results: {
        overallScore: results.overallScore,
        maturityLevel: results.maturityLevel,
        categoryScores: results.categoryScores,
        gaps: {
          total: results.gaps.length,
          critical: results.gaps.filter(g => g.gapLevel === "critical").length,
          major: results.gaps.filter(g => g.gapLevel === "major").length,
          minor: results.gaps.filter(g => g.gapLevel === "minor").length,
          details: results.gaps,
        },
      },
    })
  } catch (error) {
    console.error("Error calculating results:", error)
    return NextResponse.json(
      { error: "Failed to calculate results" },
      { status: 500 }
    )
  }
}
