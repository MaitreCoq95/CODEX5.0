import { NextResponse } from "next/server"

interface AdminDashboardResponse {
  stats: {
    activeUsers: number
    usersChange: number
    maturityScore: number
    maturityChange: number
    certifications: number
    certificationsChange: number
    totalModules: number
    completedModules: number
  }
  departmentScores: {
    name: string
    score: number
    memberCount: number
    change: number
  }[]
  alerts: {
    id: string
    type: string
    severity: "warning" | "critical"
    title: string
    description: string
    createdAt: Date
  }[]
  recentActivity: {
    userId: string
    userName: string
    action: string
    timestamp: Date
  }[]
}

const mockDashboard: AdminDashboardResponse = {
  stats: {
    activeUsers: 142,
    usersChange: 3,
    maturityScore: 67,
    maturityChange: 12,
    certifications: 28,
    certificationsChange: 5,
    totalModules: 48,
    completedModules: 34,
  },
  departmentScores: [
    { name: "Logistique", score: 78, memberCount: 45, change: 8 },
    { name: "Production", score: 72, memberCount: 38, change: 5 },
    { name: "Qualité", score: 85, memberCount: 12, change: 3 },
    { name: "Commercial", score: 54, memberCount: 28, change: -2 },
    { name: "RH", score: 62, memberCount: 8, change: 6 },
    { name: "IT", score: 45, memberCount: 11, change: 10 },
  ],
  alerts: [
    {
      id: "1",
      type: "gap",
      severity: "critical",
      title: "Gap critique détecté",
      description: "Département Commercial : score HACCP < 50%",
      createdAt: new Date(),
    },
    {
      id: "2",
      type: "inactive",
      severity: "warning",
      title: "Utilisateurs inactifs",
      description: "8 utilisateurs sans activité depuis 14 jours",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ],
  recentActivity: [
    { userId: "1", userName: "Marie Laurent", action: "Module complété", timestamp: new Date() },
    { userId: "2", userName: "Thomas Dubois", action: "Certification obtenue", timestamp: new Date() },
  ],
}

export async function GET() {
  try {
    // TODO: Replace with actual database queries
    return NextResponse.json(mockDashboard)
  } catch (error) {
    console.error("Error fetching admin dashboard:", error)
    return NextResponse.json(
      { error: "Failed to fetch admin dashboard" },
      { status: 500 }
    )
  }
}
