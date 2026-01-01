import { NextResponse } from "next/server"
import { webhookService } from "@/lib/services/integrations"

// Mock webhook subscriptions
const mockSubscriptions = [
  {
    id: "wh_001",
    url: "https://example.com/webhooks/vyxo",
    events: ["assessment.completed", "certification.obtained"],
    active: true,
    createdAt: "2024-12-01T10:00:00Z",
    lastTriggered: "2024-12-15T14:30:00Z",
    failureCount: 0,
  },
]

export async function GET() {
  try {
    return NextResponse.json({ webhooks: mockSubscriptions })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch webhooks" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url, events } = body
    
    if (!url || !events || events.length === 0) {
      return NextResponse.json(
        { error: "URL and events are required" },
        { status: 400 }
      )
    }
    
    // Generate webhook secret
    const secret = `whsec_${Math.random().toString(36).substring(2, 15)}`
    
    const newWebhook = {
      id: `wh_${Date.now()}`,
      url,
      events,
      secret,
      active: true,
      createdAt: new Date().toISOString(),
      lastTriggered: null,
      failureCount: 0,
    }
    
    // TODO: Save to database
    // await prisma.webhookSubscription.create({ data: newWebhook })
    
    return NextResponse.json({
      webhook: newWebhook,
      message: "Webhook created successfully. Keep the secret safe!",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create webhook" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const webhookId = searchParams.get("id")
    
    if (!webhookId) {
      return NextResponse.json(
        { error: "Webhook ID is required" },
        { status: 400 }
      )
    }
    
    // TODO: Delete from database
    // await prisma.webhookSubscription.delete({ where: { id: webhookId } })
    
    return NextResponse.json({ success: true, message: "Webhook deleted" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete webhook" },
      { status: 500 }
    )
  }
}
