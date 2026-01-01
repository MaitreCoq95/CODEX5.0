import { NextResponse } from "next/server"

interface Assignment {
  id: string
  moduleId: string
  moduleName: string
  assignedTo: {
    id: string
    name: string
    status: "not_started" | "in_progress" | "completed"
    progress: number
    completedAt?: Date
  }[]
  priority: "low" | "normal" | "high" | "urgent"
  deadline?: Date
  message?: string
  createdAt: Date
}

// Mock data
const mockAssignments: Assignment[] = [
  {
    id: "1",
    moduleId: "m1",
    moduleName: "GDP Niveau 3 - Validation",
    priority: "high",
    deadline: new Date("2024-12-25"),
    message: "Module prioritaire pour la certification Q1 2025",
    createdAt: new Date("2024-12-10"),
    assignedTo: [
      { id: "1", name: "Marie Laurent", status: "in_progress", progress: 65 },
      { id: "2", name: "Thomas Dubois", status: "completed", progress: 100, completedAt: new Date("2024-12-14") },
      { id: "3", name: "Sophie Martin", status: "not_started", progress: 0 },
    ],
  },
  {
    id: "2",
    moduleId: "m2",
    moduleName: "Audit interne ISO",
    priority: "normal",
    deadline: new Date("2024-12-30"),
    createdAt: new Date("2024-12-12"),
    assignedTo: [
      { id: "1", name: "Marie Laurent", status: "in_progress", progress: 30 },
      { id: "4", name: "Lucas Bernard", status: "in_progress", progress: 45 },
    ],
  },
]

export async function GET() {
  try {
    // TODO: Replace with actual database query
    return NextResponse.json({ assignments: mockAssignments })
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { moduleId, assignTo, selectedMembers, deadline, priority, message } = body
    
    // TODO: Create assignment in database
    // const assignment = await prisma.moduleAssignment.create({
    //   data: {
    //     moduleId,
    //     assignedTo: selectedMembers,
    //     deadline: deadline ? new Date(deadline) : null,
    //     priority,
    //     message,
    //   }
    // })
    
    // TODO: Send notifications to assigned members
    
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      moduleId,
      moduleName: "New Module", // Would be fetched from DB
      priority: priority || "normal",
      deadline: deadline ? new Date(deadline) : undefined,
      message: message || undefined,
      createdAt: new Date(),
      assignedTo: (selectedMembers || []).map((id: string) => ({
        id,
        name: `Member ${id}`,
        status: "not_started" as const,
        progress: 0,
      })),
    }

    return NextResponse.json({ assignment: newAssignment }, { status: 201 })
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 500 }
    )
  }
}
