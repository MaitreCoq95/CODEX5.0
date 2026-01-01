import { NextResponse } from "next/server"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "user" | "manager" | "admin"
  department: string
  score: number
  status: "active" | "inactive" | "invited"
  createdAt: Date
  lastLogin?: Date
}

const mockUsers: AdminUser[] = [
  { id: "1", email: "marie.laurent@company.fr", name: "Marie Laurent", role: "user", department: "Logistique", score: 85, status: "active", createdAt: new Date("2024-03-15"), lastLogin: new Date() },
  { id: "2", email: "thomas.dubois@company.fr", name: "Thomas Dubois", role: "manager", department: "Qualité", score: 92, status: "active", createdAt: new Date("2024-02-10"), lastLogin: new Date() },
  { id: "3", email: "sophie.martin@company.fr", name: "Sophie Martin", role: "user", department: "Logistique", score: 54, status: "inactive", createdAt: new Date("2024-04-20") },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const department = searchParams.get("department")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filtered = [...mockUsers]

    if (role && role !== "all") {
      filtered = filtered.filter(u => u.role === role)
    }
    if (department && department !== "all") {
      filtered = filtered.filter(u => u.department === department)
    }
    if (status && status !== "all") {
      filtered = filtered.filter(u => u.status === status)
    }
    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(s) || 
        u.email.toLowerCase().includes(s)
      )
    }

    return NextResponse.json({
      users: filtered,
      total: mockUsers.length,
      filtered: filtered.length,
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, role, department, sendInvitation } = body

    // TODO: Create user in database
    // TODO: Send invitation email if sendInvitation is true

    const newUser: AdminUser = {
      id: Date.now().toString(),
      email,
      name,
      role: role || "user",
      department,
      score: 0,
      status: "invited",
      createdAt: new Date(),
    }

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}
