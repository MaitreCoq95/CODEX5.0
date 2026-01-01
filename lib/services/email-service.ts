// Service d'envoi d'emails transactionnels
// Supporte Resend, SendGrid et SMTP personnalisé

import { QualifiedLead } from "@/lib/services/lead-scoring"

export interface EmailConfig {
  provider: "resend" | "sendgrid" | "smtp"
  apiKey?: string
  from: string
  replyTo?: string
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// Configuration depuis les variables d'environnement
export function getEmailConfig(): EmailConfig {
  return {
    provider: (process.env.EMAIL_PROVIDER as EmailConfig["provider"]) || "resend",
    apiKey: process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM || "Vyxo Codex <noreply@vyxo-codex.fr>",
    replyTo: process.env.EMAIL_REPLY_TO || "contact@vyxo-codex.fr"
  }
}

/**
 * Template email pour Dirigeant (accès complet)
 */
export function getConfirmationDirigeantTemplate(lead: QualifiedLead): { subject: string; html: string } {
  const { formData, leadScore } = lead
  
  return {
    subject: `🎯 ${formData.company_name} - Votre évaluation Vyxo Codex est confirmée`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation Vyxo Codex</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #22c55e20, transparent); padding: 40px 40px 20px;">
              <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">
                  Félicitations, votre évaluation est confirmée !
                </h1>
              </div>
            </td>
          </tr>
          
          <!-- Score -->
          <tr>
            <td style="padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align: center; padding: 20px; background-color: #ffffff08; border-radius: 12px;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px;">Votre score</p>
                    <p style="color: #f59e0b; font-size: 32px; font-weight: bold; margin: 0;">${leadScore.total}</p>
                    <p style="color: #64748b; font-size: 12px; margin: 0;">/100</p>
                  </td>
                  <td width="10"></td>
                  <td width="33%" style="text-align: center; padding: 20px; background-color: #ffffff08; border-radius: 12px;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px;">Priorité</p>
                    <p style="color: #22c55e; font-size: 20px; font-weight: bold; margin: 0;">${leadScore.priority}</p>
                    <p style="color: #64748b; font-size: 12px; margin: 0;">contact</p>
                  </td>
                  <td width="10"></td>
                  <td width="33%" style="text-align: center; padding: 20px; background-color: #f59e0b20; border-radius: 12px; border: 1px solid #f59e0b40;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px;">Statut</p>
                    <p style="color: #f59e0b; font-size: 16px; font-weight: bold; margin: 0;">Accès Complet</p>
                    <p style="color: #64748b; font-size: 12px; margin: 0;">débloqué</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Prochaines étapes -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px;">📋 Prochaines étapes</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff05; border-radius: 12px; padding: 16px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #ffffff10;">
                    <table>
                      <tr>
                        <td style="background-color: #f59e0b; color: #0f172a; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold;">1</td>
                        <td style="padding-left: 12px;">
                          <p style="color: #ffffff; font-size: 14px; margin: 0; font-weight: 500;">Un expert vous contactera sous ${leadScore.priority}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #ffffff10;">
                    <table>
                      <tr>
                        <td style="background-color: #f59e0b; color: #0f172a; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold;">2</td>
                        <td style="padding-left: 12px;">
                          <p style="color: #ffffff; font-size: 14px; margin: 0; font-weight: 500;">Appel découverte de 30 minutes</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <table>
                      <tr>
                        <td style="background-color: #f59e0b; color: #0f172a; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold;">3</td>
                        <td style="padding-left: 12px;">
                          <p style="color: #ffffff; font-size: 14px; margin: 0; font-weight: 500;">Réception de votre rapport personnalisé</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <a href="https://vyxo-codex.fr/codex" style="display: block; background-color: #f59e0b; color: #0f172a; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; text-align: center;">
                Accéder à mes modules d'évaluation →
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 40px; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2025 Vyxo Codex - Tous droits réservés<br>
                <a href="mailto:support@vyxo-codex.fr" style="color: #f59e0b;">support@vyxo-codex.fr</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }
}

/**
 * Template email pour Manager (invitation au dirigeant)
 */
export function getConfirmationManagerTemplate(lead: QualifiedLead, shareLink: string): { subject: string; html: string } {
  const { formData, leadScore } = lead
  
  return {
    subject: `📋 ${formData.company_name} - Évaluation Vyxo Codex initiée`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f620, transparent); padding: 40px 40px 20px;">
              <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">📋</div>
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">
                  Votre évaluation est enregistrée !
                </h1>
              </div>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
                Votre diagnostic préliminaire pour <strong style="color: #ffffff;">${formData.company_name}</strong> 
                a été enregistré avec un score de <strong style="color: #f59e0b;">${leadScore.total}/100</strong>.
              </p>
              <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
                Pour débloquer l'accès complet, partagez ce lien avec votre direction :
              </p>
            </td>
          </tr>
          
          <!-- Share Link -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background-color: #ffffff08; border: 1px solid #ffffff20; border-radius: 8px; padding: 16px;">
                <p style="color: #64748b; font-size: 12px; margin: 0 0 8px;">Lien de partage :</p>
                <p style="color: #f59e0b; font-size: 14px; margin: 0; word-break: break-all;">
                  ${shareLink}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <a href="${shareLink}" style="display: block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; text-align: center;">
                Copier le lien de partage
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 40px; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2025 Vyxo Codex - Tous droits réservés
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }
}

/**
 * Template pour notifier le dirigeant (partagé par un manager)
 */
export function getDirectorInviteTemplate(
  managerEmail: string,
  companyName: string,
  shareLink: string
): { subject: string; html: string } {
  return {
    subject: `🎯 ${companyName} - Invitation à valider l'évaluation Vyxo Codex`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 40px;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 20px;">
                👋 Un membre de votre équipe a initié une évaluation
              </h1>
              <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
                <strong style="color: #f59e0b;">${managerEmail}</strong> a démarré un diagnostic 
                pour <strong style="color: #ffffff;">${companyName}</strong> sur Vyxo Codex.
              </p>
              <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
                En tant que dirigeant, vous pouvez valider cette inscription pour débloquer 
                l'accès complet aux modules d'évaluation.
              </p>
              <a href="${shareLink}" style="display: inline-block; background-color: #f59e0b; color: #0f172a; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; margin-top: 20px;">
                Valider et accéder à l'évaluation →
              </a>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 24px 40px; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2025 Vyxo Codex
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }
}

/**
 * Envoie un email via Resend
 */
async function sendViaResend(
  config: EmailConfig,
  to: string,
  subject: string,
  html: string
): Promise<EmailResult> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: config.from,
        to,
        subject,
        html,
        reply_to: config.replyTo
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.message || "Erreur Resend" }
    }

    return { success: true, messageId: data.id }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erreur envoi" }
  }
}

/**
 * Envoie un email via SendGrid
 */
async function sendViaSendGrid(
  config: EmailConfig,
  to: string,
  subject: string,
  html: string
): Promise<EmailResult> {
  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: config.from.match(/<(.+)>/)?.[1] || config.from },
        subject,
        content: [{ type: "text/html", value: html }]
      })
    })

    if (!response.ok) {
      return { success: false, error: `SendGrid erreur: ${response.status}` }
    }

    return { success: true, messageId: response.headers.get("x-message-id") || undefined }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erreur envoi" }
  }
}

/**
 * Envoie un email (dispatch selon le provider configuré)
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<EmailResult> {
  const config = getEmailConfig()

  if (!config.apiKey) {
    console.warn("Email API key not configured, skipping email send")
    return { success: false, error: "Email not configured" }
  }

  switch (config.provider) {
    case "resend":
      return sendViaResend(config, to, subject, html)
    case "sendgrid":
      return sendViaSendGrid(config, to, subject, html)
    default:
      return { success: false, error: `Provider ${config.provider} not implemented` }
  }
}

/**
 * Envoie l'email de confirmation selon le rôle
 */
export async function sendConfirmationEmail(
  lead: QualifiedLead,
  role: "dirigeant" | "manager",
  shareLink?: string
): Promise<EmailResult> {
  const email = lead.formData.email

  if (role === "dirigeant") {
    const template = getConfirmationDirigeantTemplate(lead)
    return sendEmail(email, template.subject, template.html)
  } else {
    const link = shareLink || `https://vyxo-codex.fr/share/${Date.now().toString(36)}`
    const template = getConfirmationManagerTemplate(lead, link)
    return sendEmail(email, template.subject, template.html)
  }
}

/**
 * Envoie une invitation au dirigeant (depuis un manager)
 */
export async function sendDirectorInvite(
  directorEmail: string,
  managerEmail: string,
  companyName: string,
  shareLink: string
): Promise<EmailResult> {
  const template = getDirectorInviteTemplate(managerEmail, companyName, shareLink)
  return sendEmail(directorEmail, template.subject, template.html)
}
