import { NextResponse } from "next/server"

// Types for team data
interface TeamMember {
  id: string
  name: string
  email: string
  position: string
  department: string
  avatar?: string
  score: number
  modulesCompleted: number
  totalModules: number
  lastActivity: Date
  status: "active" | "inactive" | "at_risk"
  streak: number
}

interface TeamAlert {
  id: string
  type: "inactivity" | "low_score" | "deadline_missed" | "gap_identified"
  severity: "warning" | "critical"
  memberId: string
  memberName: string
  message: string
  createdAt: Date
}

interface TeamDashboardResponse {
  stats: {
    totalMembers: number
    avgScore: number
    scoreChange: number
    modulesCompleted: number
    totalModules: number
    avgStreak: number
  }
  members: TeamMember[]
  alerts: TeamAlert[]
  heatmap: {
    members: string[]
    competencies: string[]
    scores: number[][]
  }
}

// Mock data - will be replaced with actual database queries
const mockTeamData: TeamDashboardResponse = {
  stats: {
    totalMembers: 12,
    avgScore: 68,
    scoreChange: 3,
    modulesCompleted: 34,
    totalModules: 48,
    avgStreak: 5,
  },
  members: [
    {
      id: "1",
      name: "Marie Laurent",
      email: "marie.laurent@company.fr",
      position: "Chauffeur-livreur",
      department: "Logistique",
      score: 85,
      modulesCompleted: 8,
      totalModules: 10,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "active",
      streak: 12,
    },
    {
      id: "2",
      name: "Thomas Dubois",
      email: "thomas.dubois@company.fr",
      position: "Responsable qualité",
      department: "Qualité",
      score: 92,
      modulesCompleted: 10,
      totalModules: 10,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: "active",
      streak: 24,
    },
    {
      id: "3",
      name: "Sophie Martin",
      email: "sophie.martin@company.fr",
      position: "Préparatrice commandes",
      department: "Logistique",
      score: 54,
      modulesCompleted: 4,
      totalModules: 10,
      lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "at_risk",
      streak: 0,
    },
  ],
  alerts: [
    {
      id: "1",
      type: "inactivity",
      severity: "critical",
      memberId: "3",
      memberName: "Sophie Martin",
      message: "Aucune activité depuis 5 jours",
      createdAt: new Date(),
    },
    {
      id: "2",
      type: "low_score",
      severity: "warning",
      memberId: "3",
      memberName: "Sophie Martin",
      message: "Score inférieur à 60% (54%)",
      createdAt: new Date(),
    },
  ],
  heatmap: {
    members: ["Marie", "Thomas", "Sophie"],
    competencies: ["GDP", "ISO 9001", "Sécurité", "Logistique", "HACCP"],
    scores: [
      [88, 85, 95, 90, 72],
      [92, 89, 88, 85, 80],
      [54, 50, 60, 55, 45],
    ],
  },
}

export async function GET() {
  try {
    // TODO: Replace with actual database query
    // const team = await prisma.team.findFirst({
    //   where: { managerId: user.id },
    //   include: { members: true }
    // })

    return NextResponse.json(mockTeamData)
  } catch (error) {
    console.error("Error fetching team data:", error)
    return NextResponse.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    )
  }
}
