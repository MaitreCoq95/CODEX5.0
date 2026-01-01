import { NextResponse } from "next/server"
import { gdprService } from "@/lib/services/gdpr-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const userId = "user-123" // In production, get from session

    switch (action) {
      case "consent":
        const consent = await gdprService.getConsent(userId)
        return NextResponse.json({ consent })

      case "privacy":
        const privacy = await gdprService.getPrivacySettings(userId)
        return NextResponse.json({ privacy })

      case "retention":
        const retention = gdprService.getRetentionPolicy()
        return NextResponse.json({ retention })

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in GDPR GET:", error)
    return NextResponse.json(
      { error: "Failed to fetch GDPR data" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, ...params } = body
    const userId = "user-123" // In production, get from session
    const ipAddress = request.headers.get("x-forwarded-for") || "unknown"

    switch (action) {
      case "update_consent":
        const consent = await gdprService.recordConsent({
          userId,
          purposes: params.purposes,
          ipAddress,
          source: params.source || "settings",
        })
        return NextResponse.json({ consent })

      case "revoke_consent":
        await gdprService.revokeConsent(userId)
        return NextResponse.json({ success: true })

      case "export_data":
        const exportData = await gdprService.exportUserData(userId, params.format || "json")
        return NextResponse.json({ export: exportData })

      case "delete_data":
        const deletionRequest = await gdprService.requestDataDeletion({
          userId,
          reason: params.reason,
          dataCategories: params.categories,
        })
        return NextResponse.json({ request: deletionRequest })

      case "update_privacy":
        const privacy = await gdprService.updatePrivacySettings(userId, params.settings)
        return NextResponse.json({ privacy })

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in GDPR POST:", error)
    return NextResponse.json(
      { error: "Failed to process GDPR request" },
      { status: 500 }
    )
  }
}
