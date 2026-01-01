import { NextResponse } from "next/server"
import { aiService } from "@/lib/services/ai-service"
import { predictiveAnalyticsService } from "@/lib/services/predictive-analytics"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case "gaps":
        const gaps = await aiService.analyzeGaps(
          params.assessmentAnswers,
          params.organizationContext || { industry: "Pharmaceutique", regulations: ["GDP"] }
        )
        return NextResponse.json({ gaps })

      case "action_plan":
        const actionPlan = await aiService.generateActionPlan(
          params.gaps,
          params.targetCertification,
          params.timeline
        )
        return NextResponse.json({ actionPlan })

      case "risk_prediction":
        const riskPrediction = await predictiveAnalyticsService.predictCertificationRisk(
          params.userId,
          params.certificationId,
          params.userData
        )
        return NextResponse.json({ prediction: riskPrediction })

      case "at_risk_users":
        const atRiskUsers = await predictiveAnalyticsService.detectAtRiskUsers(
          params.users
        )
        return NextResponse.json({ atRiskUsers })

      case "maturity_projection":
        const projection = await predictiveAnalyticsService.projectMaturityScore(
          params.historicalScores,
          params.monthsAhead || 6
        )
        return NextResponse.json({ projection })

      default:
        return NextResponse.json(
          { error: "Unknown action" },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("AI analyze error:", error)
    return NextResponse.json(
      { error: "AI analysis failed", details: (error as Error).message },
      { status: 500 }
    )
  }
}
