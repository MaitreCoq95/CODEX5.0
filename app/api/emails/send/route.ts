import { NextRequest, NextResponse } from "next/server"
import { sendConfirmationEmail, sendDirectorInvite } from "@/lib/services/email-service"
import { qualifyLead } from "@/lib/services/lead-scoring"
import { evaluationFormSchema } from "@/lib/schemas/evaluation-form.schema"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, formData, role, directorEmail, shareLink } = body

    // Validation basique
    if (!type || !formData) {
      return NextResponse.json(
        { error: "Type et formData requis" },
        { status: 400 }
      )
    }

    // Valider les données du formulaire
    const parseResult = evaluationFormSchema.safeParse(formData)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parseResult.error.flatten() },
        { status: 400 }
      )
    }

    const qualifiedLead = qualifyLead(parseResult.data)

    switch (type) {
      case "confirmation": {
        // Email de confirmation au lead
        const result = await sendConfirmationEmail(
          qualifiedLead,
          role || "dirigeant",
          shareLink
        )
        return NextResponse.json(result)
      }

      case "director-invite": {
        // Invitation au dirigeant depuis un manager
        if (!directorEmail) {
          return NextResponse.json(
            { error: "Email du dirigeant requis" },
            { status: 400 }
          )
        }
        const result = await sendDirectorInvite(
          directorEmail,
          parseResult.data.email,
          parseResult.data.company_name,
          shareLink || `https://vyxo-codex.fr/share/${Date.now().toString(36)}`
        )
        return NextResponse.json(result)
      }

      default:
        return NextResponse.json(
          { error: `Type d'email inconnu: ${type}` },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error("Erreur envoi email:", error)
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi" },
      { status: 500 }
    )
  }
}

// GET pour info
export function GET() {
  return NextResponse.json({
    message: "Email API",
    types: {
      confirmation: "Email de confirmation au lead (role: dirigeant | manager)",
      "director-invite": "Invitation au dirigeant depuis un manager"
    },
    configured: !!process.env.EMAIL_API_KEY || !!process.env.RESEND_API_KEY
  })
}
