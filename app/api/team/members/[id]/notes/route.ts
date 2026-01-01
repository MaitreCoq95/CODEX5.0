import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Note schema
const noteSchema = z.object({
  content: z.string().min(1, "Le contenu est requis"),
  tags: z.array(z.string()).default([]),
})

// Mock notes storage (in production, use Prisma/Supabase)
const notesStore: Map<string, any[]> = new Map()

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/team/members/[id]/notes - Get all notes for a member
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const notes = notesStore.get(id) || []

    return NextResponse.json({
      success: true,
      data: notes.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    })
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// POST /api/team/members/[id]/notes - Create a new note
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate
    const result = noteSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: result.error.issues },
        { status: 400 }
      )
    }

    const now = new Date()
    const note = {
      id: `note-${Date.now()}`,
      memberId: id,
      content: result.data.content,
      tags: result.data.tags,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      // In production, add managerId from session
    }

    // Add to store
    const memberNotes = notesStore.get(id) || []
    memberNotes.push(note)
    notesStore.set(id, memberNotes)

    return NextResponse.json({
      success: true,
      data: note,
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating note:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// PUT /api/team/members/[id]/notes - Update a note
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { noteId, content, tags } = body

    if (!noteId) {
      return NextResponse.json(
        { success: false, error: "Note ID required" },
        { status: 400 }
      )
    }

    const memberNotes = notesStore.get(id) || []
    const noteIndex = memberNotes.findIndex(n => n.id === noteId)

    if (noteIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      )
    }

    // Update note
    memberNotes[noteIndex] = {
      ...memberNotes[noteIndex],
      content: content || memberNotes[noteIndex].content,
      tags: tags || memberNotes[noteIndex].tags,
      updatedAt: new Date().toISOString(),
    }

    notesStore.set(id, memberNotes)

    return NextResponse.json({
      success: true,
      data: memberNotes[noteIndex],
    })
  } catch (error) {
    console.error("Error updating note:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// DELETE /api/team/members/[id]/notes - Delete a note
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const noteId = searchParams.get("noteId")

    if (!noteId) {
      return NextResponse.json(
        { success: false, error: "Note ID required" },
        { status: 400 }
      )
    }

    const memberNotes = notesStore.get(id) || []
    const filteredNotes = memberNotes.filter(n => n.id !== noteId)

    if (filteredNotes.length === memberNotes.length) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      )
    }

    notesStore.set(id, filteredNotes)

    return NextResponse.json({
      success: true,
      message: "Note deleted",
    })
  } catch (error) {
    console.error("Error deleting note:", error)
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
