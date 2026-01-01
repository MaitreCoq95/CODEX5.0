import { NextResponse } from "next/server"

// Mock integrations status
const mockIntegrations = {
  google: {
    connected: true,
    connectedAt: "2024-12-01T10:00:00Z",
    email: "admin@company.com",
    features: {
      sso: true,
      calendarSync: false,
      driveExport: true,
    },
  },
  microsoft: {
    connected: false,
    connectedAt: null,
    email: null,
    features: {
      sso: false,
      teamsNotifications: false,
      sharepointSync: false,
    },
  },
  slack: {
    connected: true,
    connectedAt: "2024-12-05T14:30:00Z",
    workspace: "company-workspace",
    channels: ["#qualite", "#formation"],
    features: {
      notifications: true,
      slashCommands: true,
    },
  },
  stripe: {
    connected: true,
    customerId: "cus_xxx",
    plan: "professional",
    status: "active",
    currentPeriodEnd: "2025-01-15T00:00:00Z",
  },
}

export async function GET() {
  try {
    return NextResponse.json({
      integrations: mockIntegrations,
      availableIntegrations: [
        { id: "google", name: "Google Workspace", description: "SSO, Calendar, Drive" },
        { id: "microsoft", name: "Microsoft 365", description: "SSO, Teams, SharePoint" },
        { id: "slack", name: "Slack", description: "Notifications, Slash commands" },
        { id: "stripe", name: "Stripe", description: "Billing & Subscriptions" },
      ],
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch integrations status" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { integration, action } = body
    
    switch (action) {
      case "connect":
        // Generate OAuth URL for the integration
        const redirectUrls: Record<string, string> = {
          google: "https://accounts.google.com/o/oauth2/v2/auth?...",
          microsoft: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?...",
          slack: "https://slack.com/oauth/v2/authorize?...",
        }
        return NextResponse.json({ redirectUrl: redirectUrls[integration] || "" })
        
      case "disconnect":
        // Remove integration tokens from database
        return NextResponse.json({ success: true, message: `${integration} disconnected` })
        
      case "test":
        // Test the integration connection
        return NextResponse.json({ success: true, message: `${integration} connection OK` })
        
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update integration" },
      { status: 500 }
    )
  }
}
