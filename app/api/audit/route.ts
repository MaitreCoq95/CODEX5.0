import { NextResponse } from "next/server"
import { auditService } from "@/lib/services/audit-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const action = searchParams.get("action")
    const result = searchParams.get("result")
    const limit = parseInt(searchParams.get("limit") || "100")
    const offset = parseInt(searchParams.get("offset") || "0")

    const logs = await auditService.query(
      {
        userId: userId || undefined,
        action: action as any || undefined,
        result: result as any || undefined,
        organizationId: "org-1", // In production, get from session
      },
      limit,
      offset
    )

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching audit logs:", error)
    return NextResponse.json(
      { error: "Failed to fetch audit logs" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, resource, resourceId, changes, metadata, result, errorMessage } = body

    // In production, get user info from session
    const log = await auditService.log({
      userId: "user-123",
      userEmail: "user@example.com",
      action,
      resource,
      resourceId,
      changes,
      metadata,
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      result: result || "success",
      errorMessage,
      organizationId: "org-1",
    })

    return NextResponse.json({ log })
  } catch (error) {
    console.error("Error creating audit log:", error)
    return NextResponse.json(
      { error: "Failed to create audit log" },
      { status: 500 }
    )
  }
}
