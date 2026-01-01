import { NextResponse } from "next/server"
import { aiService } from "@/lib/services/ai-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, context } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    const response = await aiService.chat(messages, context)

    return NextResponse.json({ 
      response,
      model: "gpt-4o-mini",
    })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json(
      { error: "AI chat failed", details: (error as Error).message },
      { status: 500 }
    )
  }
}
