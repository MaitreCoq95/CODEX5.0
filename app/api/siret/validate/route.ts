import { NextRequest, NextResponse } from "next/server"
import { validateSiret } from "@/lib/services/siret-service"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const siret = searchParams.get("siret")

  if (!siret) {
    return NextResponse.json(
      { error: "Le paramètre SIRET est requis" },
      { status: 400 }
    )
  }

  try {
    const result = await validateSiret(siret)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur API SIRET:", error)
    return NextResponse.json(
      { isValid: false, error: "Erreur serveur lors de la validation" },
      { status: 500 }
    )
  }
}
