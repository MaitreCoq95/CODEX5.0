import { NextResponse } from "next/server"
import { aiService } from "@/lib/services/ai-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case "generate_content":
        const content = await aiService.generateModuleContent(
          params.topic,
          params.difficulty || "intermediate",
          params.industry || "Pharmaceutique"
        )
        return NextResponse.json({ content })

      case "generate_quiz":
        const questions = await aiService.generateQuizQuestions(
          params.moduleContent,
          params.numQuestions || 5,
          params.difficulty || "medium"
        )
        return NextResponse.json({ questions })

      case "generate_recommendations":
        const recommendations = await aiService.generatePersonalizedRecommendations(
          params.userProfile,
          params.assessmentResults
        )
        return NextResponse.json({ recommendations })

      case "feedback":
        const feedback = await aiService.provideFeedbackOnExercise(
          params.exercisePrompt,
          params.userSubmission,
          params.rubric
        )
        return NextResponse.json({ feedback })

      default:
        return NextResponse.json(
          { error: "Unknown action" },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("AI generate error:", error)
    return NextResponse.json(
      { error: "AI generation failed", details: (error as Error).message },
      { status: 500 }
    )
  }
}
