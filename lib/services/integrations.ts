// Integration Services
// OAuth providers, Slack, Microsoft Teams, and other third-party integrations

// Types
export interface OAuthProvider {
  id: string
  name: string
  type: "google" | "microsoft" | "slack"
  status: "connected" | "disconnected" | "error"
  connectedAt?: Date
  expiresAt?: Date
  scopes: string[]
  metadata?: Record<string, any>
}

export interface IntegrationConfig {
  google?: {
    clientId: string
    enabled: boolean
    syncUsers: boolean
    calendarSync: boolean
  }
  microsoft?: {
    tenantId: string
    clientId: string
    enabled: boolean
    teamsNotifications: boolean
  }
  slack?: {
    workspaceId: string
    botToken: string
    enabled: boolean
    channels: string[]
  }
}

export interface WebhookSubscription {
  id: string
  url: string
  events: WebhookEvent[]
  secret: string
  active: boolean
  createdAt: Date
  lastTriggered?: Date
  failureCount: number
}

export type WebhookEvent = 
  | "assessment.completed"
  | "module.completed"
  | "certification.obtained"
  | "gap.identified"
  | "alert.triggered"
  | "user.created"

// Google Workspace Integration
export class GoogleWorkspaceIntegration {
  private clientId: string
  private clientSecret: string
  
  constructor(config: { clientId: string; clientSecret: string }) {
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
  }
  
  async getAuthUrl(redirectUri: string, scopes: string[]): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "consent",
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }
  
  async exchangeCodeForTokens(code: string, redirectUri: string) {
    // In production, exchange authorization code for access tokens
    // POST to https://oauth2.googleapis.com/token
    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresIn: 3600,
    }
  }
  
  async syncUsers(accessToken: string) {
    // Fetch users from Google Workspace Admin SDK
    // GET https://admin.googleapis.com/admin/directory/v1/users
    return []
  }
  
  async exportCertificateToDrive(accessToken: string, fileBuffer: Buffer, fileName: string, folderId?: string) {
    // Upload file to Google Drive
    // POST https://www.googleapis.com/upload/drive/v3/files
    return { fileId: "mock-file-id", webViewLink: "https://drive.google.com/..." }
  }
  
  async createCalendarEvent(accessToken: string, event: {
    title: string
    description: string
    startTime: Date
    endTime: Date
    attendees: string[]
  }) {
    // Create calendar event
    // POST https://www.googleapis.com/calendar/v3/calendars/primary/events
    return { eventId: "mock-event-id" }
  }
}

// Microsoft 365 Integration
export class Microsoft365Integration {
  private tenantId: string
  private clientId: string
  private clientSecret: string
  
  constructor(config: { tenantId: string; clientId: string; clientSecret: string }) {
    this.tenantId = config.tenantId
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
  }
  
  async getAuthUrl(redirectUri: string, scopes: string[]): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopes.join(" "),
      response_mode: "query",
    })
    return `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize?${params.toString()}`
  }
  
  async authenticateWithAzureAD(code: string, redirectUri: string) {
    // Exchange code for tokens
    // POST https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token
    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresIn: 3600,
    }
  }
  
  async sendTeamsNotification(accessToken: string, channelId: string, message: string) {
    // Send message to Teams channel
    // POST https://graph.microsoft.com/v1.0/teams/{team-id}/channels/{channel-id}/messages
    return { messageId: "mock-message-id" }
  }
  
  async uploadToSharePoint(accessToken: string, siteId: string, filePath: string, fileBuffer: Buffer) {
    // Upload to SharePoint
    // PUT https://graph.microsoft.com/v1.0/sites/{site-id}/drive/root:/{path}:/content
    return { itemId: "mock-item-id", webUrl: "https://sharepoint.com/..." }
  }
}

// Slack Integration
export class SlackIntegration {
  private botToken: string
  
  constructor(config: { botToken: string }) {
    this.botToken = config.botToken
  }
  
  async sendChannelMessage(channel: string, message: string, blocks?: any[]) {
    // POST https://slack.com/api/chat.postMessage
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel,
        text: message,
        blocks,
      }),
    })
    return response.json()
  }
  
  async handleSlashCommand(command: string, args: string[], userId: string): Promise<string> {
    switch (command) {
      case "/vyxo-status":
        return `📊 *Votre statut VYXO*\n• Niveau: 12\n• XP: 2,450\n• Streak: 7 jours`
      case "/vyxo-team":
        return `👥 *Équipe Qualité*\n• 8 membres actifs\n• Score moyen: 78%\n• 2 alertes en cours`
      case "/vyxo-alerts":
        return `⚠️ *Alertes actives*\n• Marie D. - Inactivité 5 jours\n• Module GDP expire dans 30j`
      default:
        return `Commande non reconnue. Essayez: /vyxo-status, /vyxo-team, /vyxo-alerts`
    }
  }
  
  buildRichMessage(title: string, fields: { label: string; value: string }[], color: string = "#DAA520") {
    return [
      {
        type: "section",
        text: { type: "mrkdwn", text: `*${title}*` },
      },
      {
        type: "section",
        fields: fields.map(f => ({
          type: "mrkdwn",
          text: `*${f.label}:*\n${f.value}`,
        })),
      },
    ]
  }
}

// Webhook Service
export class WebhookService {
  async triggerWebhook(subscription: WebhookSubscription, event: WebhookEvent, payload: any) {
    const signature = this.generateSignature(payload, subscription.secret)
    
    try {
      const response = await fetch(subscription.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": signature,
          "X-Webhook-Event": event,
        },
        body: JSON.stringify({
          event,
          timestamp: new Date().toISOString(),
          data: payload,
        }),
      })
      
      return { success: response.ok, statusCode: response.status }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }
  
  private generateSignature(payload: any, secret: string): string {
    // In production, use HMAC-SHA256
    const crypto = require("crypto")
    return crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(payload))
      .digest("hex")
  }
  
  async verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
    const expectedSignature = this.generateSignature(JSON.parse(payload), secret)
    return signature === expectedSignature
  }
}

// Email Service (using Resend)
export class EmailService {
  private apiKey: string
  private fromEmail: string
  
  constructor(config: { apiKey: string; fromEmail: string }) {
    this.apiKey = config.apiKey
    this.fromEmail = config.fromEmail
  }
  
  async sendEmail(to: string, subject: string, html: string) {
    // POST https://api.resend.com/emails
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.fromEmail,
        to,
        subject,
        html,
      }),
    })
    return response.json()
  }
  
  async sendWelcomeEmail(user: { email: string; name: string }) {
    return this.sendEmail(
      user.email,
      "Bienvenue sur VYXO Codex! 🎉",
      `
        <h1>Bienvenue ${user.name}!</h1>
        <p>Votre compte VYXO Codex est prêt.</p>
        <p>Commencez votre parcours vers la certification GDP dès maintenant.</p>
        <a href="https://codex.vyxo.fr/learning" style="background:#DAA520;color:#1A2744;padding:12px 24px;text-decoration:none;border-radius:8px;">
          Commencer mon parcours
        </a>
      `
    )
  }
  
  async sendAssessmentResult(user: { email: string; name: string }, score: number, certification: string) {
    const passed = score >= 70
    return this.sendEmail(
      user.email,
      `${passed ? "✅" : "📊"} Résultats de votre assessment ${certification}`,
      `
        <h1>Résultats de votre assessment</h1>
        <p>Bonjour ${user.name},</p>
        <p>Votre score: <strong>${score}%</strong></p>
        ${passed 
          ? "<p style='color:green'>Félicitations! Vous avez réussi l'assessment.</p>"
          : "<p>Consultez vos recommandations pour améliorer votre score.</p>"
        }
        <a href="https://codex.vyxo.fr/assessments" style="background:#DAA520;color:#1A2744;padding:12px 24px;text-decoration:none;border-radius:8px;">
          Voir mes résultats
        </a>
      `
    )
  }
  
  async sendCertificateEmail(user: { email: string; name: string }, certName: string, certNumber: string) {
    return this.sendEmail(
      user.email,
      `🏆 Votre certificat ${certName} est disponible!`,
      `
        <h1>Félicitations ${user.name}!</h1>
        <p>Vous avez obtenu la certification <strong>${certName}</strong>.</p>
        <p>Numéro de certificat: ${certNumber}</p>
        <a href="https://codex.vyxo.fr/learning/certifications" style="background:#DAA520;color:#1A2744;padding:12px 24px;text-decoration:none;border-radius:8px;">
          Télécharger mon certificat
        </a>
      `
    )
  }
  
  async sendInactivityReminder(user: { email: string; name: string }, daysSinceActivity: number) {
    return this.sendEmail(
      user.email,
      `Vous nous manquez! 😢`,
      `
        <h1>Bonjour ${user.name},</h1>
        <p>Cela fait ${daysSinceActivity} jours que vous ne vous êtes pas connecté à VYXO Codex.</p>
        <p>Votre streak vous attend! Reprenez votre progression dès maintenant.</p>
        <a href="https://codex.vyxo.fr/learning" style="background:#DAA520;color:#1A2744;padding:12px 24px;text-decoration:none;border-radius:8px;">
          Reprendre ma formation
        </a>
      `
    )
  }
}

// Export instances with mock config
export const googleIntegration = new GoogleWorkspaceIntegration({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
})

export const microsoftIntegration = new Microsoft365Integration({
  tenantId: process.env.AZURE_TENANT_ID || "",
  clientId: process.env.AZURE_CLIENT_ID || "",
  clientSecret: process.env.AZURE_CLIENT_SECRET || "",
})

export const slackIntegration = new SlackIntegration({
  botToken: process.env.SLACK_BOT_TOKEN || "",
})

export const webhookService = new WebhookService()

export const emailService = new EmailService({
  apiKey: process.env.RESEND_API_KEY || "",
  fromEmail: "noreply@codex.vyxo.fr",
})
