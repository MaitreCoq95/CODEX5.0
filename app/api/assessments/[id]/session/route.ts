import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { assessmentEngine } from "@/lib/services/assessment-engine"

// Session creation schema
const createSessionSchema = z.object({
  email: z.string().email().optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  employeeCount: z.string().optional(),
})

// Answer submission schema
const submitAnswerSchema = z.object({
  questionId: z.string(),
  value: z.union([z.string(), z.array(z.string()), z.number(), z.null()]),
  timeSpent: z.number().default(0),
})

// Mock sessions storage (in production, use database)
const sessions: Map<string, any> = new Map()

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/assessments/[id]/session - Start a new session
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate input
    const validationResult = createSessionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Create new session
    const sessionId = `sess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const session = {
      id: sessionId,
      templateId: id,
      email: data.email,
      companyName: data.companyName,
      industry: data.industry,
      employeeCount: data.employeeCount,
      status: "in_progress",
      currentSectionIndex: 0,
      currentQuestionIndex: 0,
      answers: [],
      sectionProgress: [],
      startedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      totalTimeSpent: 0,
    }

    sessions.set(sessionId, session)

    return NextResponse.json({
      success: true,
      data: session,
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// GET /api/assessments/[id]/session?sessionId=xxx - Get session by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Session ID required" },
        { status: 400 }
      )
    }

    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: session,
    })

  } catch (error) {
    console.error("Error fetching session:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// PUT /api/assessments/[id]/session - Update session (save progress)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { sessionId, answer, currentSectionIndex, currentQuestionIndex } = body

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Session ID required" },
        { status: 400 }
      )
    }

    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      )
    }

    // Update answer if provided
    if (answer) {
      const validationResult = submitAnswerSchema.safeParse(answer)
      if (!validationResult.success) {
        return NextResponse.json(
          { success: false, error: "Invalid answer format" },
          { status: 400 }
        )
      }

      const answerData = validationResult.data
      const existingIndex = session.answers.findIndex(
        (a: any) => a.questionId === answerData.questionId
      )

      const answerRecord = {
        questionId: answerData.questionId,
        value: answerData.value,
        answeredAt: new Date().toISOString(),
        timeSpent: answerData.timeSpent,
      }

      if (existingIndex >= 0) {
        session.answers[existingIndex] = answerRecord
      } else {
        session.answers.push(answerRecord)
      }
    }

    // Update navigation state
    if (currentSectionIndex !== undefined) {
      session.currentSectionIndex = currentSectionIndex
    }
    if (currentQuestionIndex !== undefined) {
      session.currentQuestionIndex = currentQuestionIndex
    }

    // Update timestamps
    session.lastActivityAt = new Date().toISOString()
    session.lastSavedAt = new Date().toISOString()

    sessions.set(sessionId, session)

    return NextResponse.json({
      success: true,
      data: session,
    })

  } catch (error) {
    console.error("Error updating session:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// PATCH /api/assessments/[id]/session - Complete session
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { sessionId, action } = body

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Session ID required" },
        { status: 400 }
      )
    }

    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      )
    }

    if (action === "complete") {
      session.status = "completed"
      session.completedAt = new Date().toISOString()

      // TODO: Calculate scores using assessment engine
      // const template = await getTemplate(session.templateId)
      // const results = assessmentEngine.calculateMaturityScore(session.answers, template)
      // session.overallScore = results.overallScore
      // session.sectionScores = results.sectionScores
      // session.gapAnalysis = results.gaps
      // session.recommendations = results.priorityActions

      sessions.set(sessionId, session)

      return NextResponse.json({
        success: true,
        message: "Session completed",
        data: session,
      })
    }

    if (action === "abandon") {
      session.status = "abandoned"
      sessions.set(sessionId, session)

      return NextResponse.json({
        success: true,
        message: "Session abandoned",
      })
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    )

  } catch (error) {
    console.error("Error completing session:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
