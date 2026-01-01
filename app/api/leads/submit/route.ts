import { NextRequest, NextResponse } from "next/server"
import { evaluationFormSchema, EvaluationFormData } from "@/lib/schemas/evaluation-form.schema"
import { qualifyLead } from "@/lib/services/lead-scoring"
import { sendLeadToAllWebhooks } from "@/lib/services/webhook-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Valider les données du formulaire
    const parseResult = evaluationFormSchema.safeParse(body)
    
    if (!parseResult.success) {
      return NextResponse.json(
        { 
          error: "Données invalides", 
          details: parseResult.error.flatten() 
        },
        { status: 400 }
      )
    }

    const formData: EvaluationFormData = parseResult.data
    
    // Qualifier le lead
    const qualifiedLead = qualifyLead(formData)
    
    // Envoyer aux webhooks CRM
    const webhookResults = await sendLeadToAllWebhooks(qualifiedLead)
    
    // Log des résultats pour debug
    console.log("Lead processed:", {
      company: formData.company_name,
      score: qualifiedLead.leadScore.total,
      level: qualifiedLead.leadScore.level,
      webhookResults
    })

    // Sauvegarder en base de données (à implémenter)
    // await prisma.lead.create({ data: { ... } })

    return NextResponse.json({
      success: true,
      leadId: qualifiedLead.createdAt, // À remplacer par un vrai ID
      score: qualifiedLead.leadScore.total,
      level: qualifiedLead.leadScore.level,
      priority: qualifiedLead.leadScore.priority,
      webhookResults: webhookResults.map(r => ({
        provider: r.provider,
        success: r.success,
        error: r.error
      }))
    })

  } catch (error) {
    console.error("Erreur traitement lead:", error)
    return NextResponse.json(
      { error: "Erreur serveur lors du traitement" },
      { status: 500 }
    )
  }
}

// GET pour tester la configuration des webhooks
export async function GET() {
  // Import de la config (sans exposer les clés)
  const config = {
    hubspot: !!process.env.HUBSPOT_WEBHOOK_URL,
    pipedrive: !!process.env.PIPEDRIVE_WEBHOOK_URL,
    custom: !!process.env.CUSTOM_CRM_WEBHOOK_URL
  }

  return NextResponse.json({
    message: "Lead submission API",
    webhooksConfigured: config,
    endpoints: {
      submit: "POST /api/leads/submit",
      test: "POST /api/leads/submit with test data"
    }
  })
}
