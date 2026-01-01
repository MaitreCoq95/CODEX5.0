import { NextResponse } from "next/server"

interface MemberDetail {
  id: string
  name: string
  email: string
  position: string
  department: string
  avatar?: string
  score: number
  modulesCompleted: number
  totalModules: number
  timeSpent: string
  streak: number
  lastActivity: Date
  joinedAt: Date
  modules: {
    id: string
    title: string
    category: string
    status: "completed" | "in_progress" | "todo"
    score?: number
    progress?: number
    completedAt?: Date
    assignedAt?: Date
    deadline?: Date
  }[]
  competencies: {
    name: string
    score: number
    category: string
  }[]
  certifications: {
    id: string
    name: string
    status: "obtained" | "in_progress"
    obtainedAt?: Date
    progress?: number
  }[]
  managerNotes?: string
}

// Mock data
const mockMemberDetail: MemberDetail = {
  id: "1",
  name: "Marie Laurent",
  email: "marie.laurent@company.fr",
  position: "Chauffeur-livreur",
  department: "Équipe Logistique",
  score: 85,
  modulesCompleted: 8,
  totalModules: 12,
  timeSpent: "12h 34min",
  streak: 12,
  lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  joinedAt: new Date("2024-03-15"),
  modules: [
    { id: "1", title: "GDP Niveau 1 - Fondamentaux", category: "GDP", status: "completed", score: 92, completedAt: new Date("2024-11-15") },
    { id: "2", title: "GDP Niveau 2 - Transport", category: "GDP", status: "completed", score: 88, completedAt: new Date("2024-11-20") },
    { id: "9", title: "GDP Niveau 3 - Validation", category: "GDP", status: "in_progress", progress: 65, deadline: new Date("2024-12-25") },
    { id: "11", title: "HACCP Niveau 2", category: "HACCP", status: "todo" },
  ],
  competencies: [
    { name: "Gestion chaîne du froid", score: 88, category: "GDP" },
    { name: "Documentation", score: 85, category: "ISO" },
    { name: "Sécurité routière", score: 95, category: "Sécurité" },
    { name: "HACCP", score: 72, category: "HACCP" },
    { name: "Procédures ISO", score: 68, category: "ISO" },
  ],
  certifications: [
    { id: "c1", name: "GDP Transport Niveau 2", status: "obtained", obtainedAt: new Date("2024-12-01") },
    { id: "c2", name: "GDP Transport Niveau 3", status: "in_progress", progress: 65 },
  ],
  managerNotes: "Marie progresse bien sur les modules GDP. À surveiller: HACCP.",
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // TODO: Replace with actual database query
    // const member = await prisma.user.findUnique({
    //   where: { id },
    //   include: {
    //     moduleProgress: true,
    //     competencies: true,
    //     certifications: true,
    //   }
    // })

    return NextResponse.json({ member: { ...mockMemberDetail, id } })
  } catch (error) {
    console.error("Error fetching member detail:", error)
    return NextResponse.json(
      { error: "Failed to fetch member detail" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    // TODO: Update member data in database
    // if (body.managerNotes !== undefined) {
    //   await prisma.managerNote.upsert({
    //     where: { memberId_managerId: { memberId: id, managerId: currentUser.id } },
    //     update: { content: body.managerNotes },
    //     create: { memberId: id, managerId: currentUser.id, content: body.managerNotes }
    //   })
    // }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating member:", error)
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    )
  }
}
