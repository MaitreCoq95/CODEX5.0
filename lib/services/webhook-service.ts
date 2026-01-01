// Service de webhooks pour intégration CRM
// Supporte HubSpot, Pipedrive et un CRM personnalisé configurable

import { QualifiedLead, generateCRMPayload } from "@/lib/services/lead-scoring"

export interface WebhookConfig {
  url: string
  apiKey?: string
  headers?: Record<string, string>
  enabled: boolean
}

export interface WebhooksConfig {
  hubspot?: WebhookConfig
  pipedrive?: WebhookConfig
  custom?: WebhookConfig // CRM personnalisé
}

export interface WebhookResult {
  provider: string
  success: boolean
  statusCode?: number
  error?: string
  responseData?: unknown
}

// Configuration des webhooks depuis les variables d'environnement
export function getWebhooksConfig(): WebhooksConfig {
  return {
    hubspot: {
      url: process.env.HUBSPOT_WEBHOOK_URL || "",
      apiKey: process.env.HUBSPOT_API_KEY,
      enabled: !!process.env.HUBSPOT_WEBHOOK_URL
    },
    pipedrive: {
      url: process.env.PIPEDRIVE_WEBHOOK_URL || "",
      apiKey: process.env.PIPEDRIVE_API_KEY,
      enabled: !!process.env.PIPEDRIVE_WEBHOOK_URL
    },
    custom: {
      url: process.env.CUSTOM_CRM_WEBHOOK_URL || "",
      apiKey: process.env.CUSTOM_CRM_API_KEY,
      headers: process.env.CUSTOM_CRM_HEADERS 
        ? JSON.parse(process.env.CUSTOM_CRM_HEADERS) 
        : {},
      enabled: !!process.env.CUSTOM_CRM_WEBHOOK_URL
    }
  }
}

/**
 * Envoie un lead à un webhook spécifique
 */
async function sendToWebhook(
  config: WebhookConfig,
  provider: string,
  payload: unknown
): Promise<WebhookResult> {
  if (!config.enabled || !config.url) {
    return {
      provider,
      success: false,
      error: `${provider} webhook not configured`
    }
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers
    }

    if (config.apiKey) {
      headers["Authorization"] = `Bearer ${config.apiKey}`
    }

    const response = await fetch(config.url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    })

    const responseData = await response.json().catch(() => null)

    return {
      provider,
      success: response.ok,
      statusCode: response.status,
      responseData,
      error: response.ok ? undefined : `HTTP ${response.status}`
    }
  } catch (error) {
    return {
      provider,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}

/**
 * Transforme le payload pour HubSpot
 */
function formatForHubSpot(crmPayload: ReturnType<typeof generateCRMPayload>) {
  const { lead } = crmPayload
  
  return {
    properties: {
      company: lead.company_name,
      siret: lead.siret,
      email: lead.contact.email,
      phone: lead.contact.phone,
      jobtitle: lead.contact.function,
      hs_lead_status: lead.scoring.lead_level === "HOT" ? "NEW" : "OPEN",
      lead_score: lead.scoring.lead_score,
      maturity_score: lead.scoring.maturity_score,
      certifications: lead.organization.certifications?.join(", "),
      company_size: lead.organization.size,
      has_quality_manager: lead.organization.has_quality_manager,
      vyxo_tags: lead.tags.join(", "),
      vyxo_priority: lead.scoring.lead_priority,
      vyxo_insights: lead.insights.join("\n"),
      vyxo_recommendations: lead.recommendations.join("\n")
    }
  }
}

/**
 * Transforme le payload pour Pipedrive
 */
function formatForPipedrive(crmPayload: ReturnType<typeof generateCRMPayload>) {
  const { lead } = crmPayload
  
  return {
    name: lead.company_name,
    org_id: null, // À créer ou matcher
    owner_id: null, // À définir selon configuration
    value: getLeadValue(lead.scoring.lead_score),
    currency: "EUR",
    status: "open",
    expected_close_date: getExpectedCloseDate(lead.scoring.lead_priority),
    label: lead.scoring.lead_level,
    custom_fields: {
      siret: lead.siret,
      email: lead.contact.email,
      phone: lead.contact.phone,
      function: lead.contact.function,
      lead_score: lead.scoring.lead_score,
      maturity_score: lead.scoring.maturity_score,
      certifications: lead.organization.certifications?.join(", "),
      company_size: lead.organization.size,
      tags: lead.tags.join(", ")
    }
  }
}

/**
 * Format pour CRM personnalisé (flexible, envoie tout)
 */
function formatForCustomCRM(crmPayload: ReturnType<typeof generateCRMPayload>) {
  return {
    ...crmPayload,
    metadata: {
      source: "vyxo-codex-landing",
      timestamp: new Date().toISOString(),
      version: "1.0"
    }
  }
}

/**
 * Estime une valeur commerciale selon le score
 */
function getLeadValue(score: number): number {
  if (score >= 80) return 15000
  if (score >= 60) return 8000
  if (score >= 40) return 4000
  return 2000
}

/**
 * Calcule une date de closing estimée selon la priorité
 */
function getExpectedCloseDate(priority: string): string {
  const now = new Date()
  let daysToAdd = 30
  
  if (priority === "4h") daysToAdd = 14
  else if (priority === "24h") daysToAdd = 21
  else if (priority === "48h") daysToAdd = 30
  else daysToAdd = 60
  
  now.setDate(now.getDate() + daysToAdd)
  return now.toISOString().split("T")[0]
}

/**
 * Envoie un lead qualifié à tous les webhooks configurés
 */
export async function sendLeadToAllWebhooks(
  qualifiedLead: QualifiedLead
): Promise<WebhookResult[]> {
  const config = getWebhooksConfig()
  const crmPayload = generateCRMPayload(qualifiedLead)
  const results: WebhookResult[] = []

  // HubSpot
  if (config.hubspot?.enabled) {
    const hubspotPayload = formatForHubSpot(crmPayload)
    results.push(await sendToWebhook(config.hubspot, "hubspot", hubspotPayload))
  }

  // Pipedrive
  if (config.pipedrive?.enabled) {
    const pipedrivePayload = formatForPipedrive(crmPayload)
    results.push(await sendToWebhook(config.pipedrive, "pipedrive", pipedrivePayload))
  }

  // CRM Personnalisé
  if (config.custom?.enabled) {
    const customPayload = formatForCustomCRM(crmPayload)
    results.push(await sendToWebhook(config.custom, "custom", customPayload))
  }

  return results
}

/**
 * Envoie uniquement au CRM personnalisé
 */
export async function sendLeadToCustomCRM(
  qualifiedLead: QualifiedLead
): Promise<WebhookResult> {
  const config = getWebhooksConfig()
  
  if (!config.custom?.enabled) {
    return {
      provider: "custom",
      success: false,
      error: "Custom CRM webhook not configured"
    }
  }

  const crmPayload = generateCRMPayload(qualifiedLead)
  const customPayload = formatForCustomCRM(crmPayload)
  
  return sendToWebhook(config.custom, "custom", customPayload)
}
