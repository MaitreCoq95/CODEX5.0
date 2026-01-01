import { NextResponse } from "next/server"
import { multiNormsService, CERTIFICATIONS } from "@/lib/services/multi-norms-service"

export async function GET() {
  try {
    const certifications = CERTIFICATIONS.map(cert => ({
      id: cert.id,
      name: cert.name,
      fullName: cert.fullName,
      description: cert.description,
      icon: cert.icon,
      color: cert.color,
      questionCount: cert.categories.reduce((sum, cat) => sum + cat.questions.length, 0),
      categories: cert.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        clause: cat.clause,
        weight: cat.weight,
        questionCount: cat.questions.length,
      })),
    }))

    return NextResponse.json({ certifications })
  } catch (error) {
    console.error("Error fetching norms:", error)
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
      { status: 500 }
    )
  }
}
