import { NextRequest, NextResponse } from "next/server"
import { partnerApplicationSchema, type PartnerApplicationData } from "@/lib/schemas/partner-application.schema"

// POST /api/partners/apply
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation Zod
    const validationResult = partnerApplicationSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed", 
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const data: PartnerApplicationData = validationResult.data

    // Scoring de la candidature
    const score = calculatePartnerScore(data)

    // Préparation du payload
    const applicationPayload = {
      application: {
        ...data,
        scoring: score,
        created_at: new Date().toISOString(),
        source: "landing_partners"
      }
    }

    // Log pour debug (en prod, envoyer au CRM)
    console.log("Partner Application Received:", applicationPayload)

    // TODO: Intégrer avec le CRM (webhook)
    // await sendToCRM(applicationPayload)

    // TODO: Envoyer email de confirmation
    // await sendConfirmationEmail(data.email, data.first_name)

    return NextResponse.json({
      success: true,
      message: "Candidature reçue avec succès",
      score: score.total,
      level: score.level
    })

  } catch (error) {
    console.error("Error processing partner application:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// Scoring de la candidature partenaire
function calculatePartnerScore(data: PartnerApplicationData) {
  let score = 0
  const breakdown: Record<string, number> = {}

  // Expérience (max 30)
  const expScores: Record<string, number> = {
    "less_1": 5,
    "1_3": 15,
    "3_5": 20,
    "5_10": 25,
    "10_plus": 30
  }
  breakdown.experience = expScores[data.experience] || 0
  score += breakdown.experience

  // Clients actifs (max 25)
  const clientScores: Record<string, number> = {
    "0": 0,
    "1_2": 10,
    "3_5": 15,
    "6_10": 20,
    "10_plus": 25
  }
  breakdown.clients = clientScores[data.clients_actifs] || 0
  score += breakdown.clients

  // CA annuel (max 25)
  const caScores: Record<string, number> = {
    "less_30k": 5,
    "30_60k": 10,
    "60_100k": 15,
    "100_150k": 20,
    "150k_plus": 25
  }
  breakdown.ca = caScores[data.ca_annuel] || 0
  score += breakdown.ca

  // Missions complétées (max 15)
  const missionScores: Record<string, number> = {
    "0_5": 5,
    "5_10": 10,
    "10_20": 12,
    "20_plus": 15
  }
  breakdown.missions = missionScores[data.missions_completed] || 0
  score += breakdown.missions

  // Formule souhaitée (bonus)
  const formulaScores: Record<string, number> = {
    "revenue_share": 0,
    "licence_pro": 5,
    "all_in": 10,
    "unknown": 0
  }
  breakdown.formula = formulaScores[data.formule_souhaitee] || 0
  score += breakdown.formula

  // Disponibilité (bonus)
  if (data.disponibilite === "immediate") {
    breakdown.disponibilite = 5
    score += 5
  } else {
    breakdown.disponibilite = 0
  }

  // Niveau de qualification
  let level: "HOT" | "QUALIFIED" | "NURTURE" | "COLD"
  let priority: "4h" | "24h" | "48h" | "7j"

  if (score >= 80) {
    level = "HOT"
    priority = "4h"
  } else if (score >= 60) {
    level = "QUALIFIED"
    priority = "24h"
  } else if (score >= 40) {
    level = "NURTURE"
    priority = "48h"
  } else {
    level = "COLD"
    priority = "7j"
  }

  // Tags auto
  const tags: string[] = []
  
  // Tags formule
  tags.push(`partner_formula_${data.formule_souhaitee}`)
  
  // Tags profil
  if (["5_10", "10_plus"].includes(data.experience)) {
    tags.push("partner_senior")
  }
  if (["100_150k", "150k_plus"].includes(data.ca_annuel)) {
    tags.push("partner_high_revenue")
  }
  if (["6_10", "10_plus"].includes(data.clients_actifs)) {
    tags.push("partner_experienced")
  }
  if (data.disponibilite === "immediate") {
    tags.push("partner_ready_now")
  }
  
  // Tags spécialisations
  data.specializations.forEach(spec => {
    tags.push(`spec_${spec}`)
  })

  // Alert si profil idéal
  const isIdealProfile = 
    ["5_10", "10_plus"].includes(data.experience) &&
    ["3_5", "6_10", "10_plus"].includes(data.clients_actifs) &&
    ["60_100k", "100_150k", "150k_plus"].includes(data.ca_annuel)

  if (isIdealProfile) {
    tags.push("partner_ideal_profile", "alert_high_priority")
  }

  return {
    total: score,
    breakdown,
    level,
    priority,
    tags,
    isIdealProfile
  }
}
