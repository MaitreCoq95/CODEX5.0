"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Save, 
  Plus, 
  Edit2, 
  Trash2, 
  Clock,
  Tag,
  Lock
} from "lucide-react"

interface ManagerNote {
  id: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface ManagerNotesProps {
  memberId: string
  notes: ManagerNote[]
  onSave: (note: Omit<ManagerNote, "id" | "createdAt" | "updatedAt">) => Promise<void>
  onUpdate: (id: string, content: string, tags: string[]) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const AVAILABLE_TAGS = [
  { label: "Performance", color: "bg-blue-500/10 text-blue-500" },
  { label: "Comportement", color: "bg-purple-500/10 text-purple-500" },
  { label: "Formation", color: "bg-emerald-500/10 text-emerald-500" },
  { label: "Objectifs", color: "bg-orange-500/10 text-orange-500" },
  { label: "Action requise", color: "bg-red-500/10 text-red-500" },
]

export function ManagerNotes({ 
  memberId, 
  notes, 
  onSave, 
  onUpdate, 
  onDelete 
}: ManagerNotesProps) {
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [editTags, setEditTags] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const toggleTag = (tag: string, isEditing = false) => {
    if (isEditing) {
      setEditTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      )
    } else {
      setSelectedTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      )
    }
  }

  const handleSaveNew = async () => {
    if (!newNoteContent.trim()) return

    setIsSaving(true)
    try {
      await onSave({ content: newNoteContent, tags: selectedTags })
      setNewNoteContent("")
      setSelectedTags([])
      setIsAddingNote(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingId || !editContent.trim()) return

    setIsSaving(true)
    try {
      await onUpdate(editingId, editContent, editTags)
      setEditingId(null)
      setEditContent("")
      setEditTags([])
    } finally {
      setIsSaving(false)
    }
  }

  const startEdit = (note: ManagerNote) => {
    setEditingId(note.id)
    setEditContent(note.content)
    setEditTags(note.tags)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className="bento-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Notes Manager
          <Badge variant="outline" className="ml-2 text-xs">
            <Lock className="w-3 h-3 mr-1" />
            Privé
          </Badge>
        </CardTitle>
        {!isAddingNote && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNote(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Note Form */}
        {isAddingNote && (
          <div className="space-y-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <Textarea
              value={newNoteContent}
              onChange={e => setNewNoteContent(e.target.value)}
              placeholder="Ajoutez une note privée sur ce membre..."
              className="min-h-24 resize-none"
            />
            
            {/* Tags */}
            <div>
              <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map(tag => (
                  <button
                    key={tag.label}
                    onClick={() => toggleTag(tag.label)}
                    className={`
                      px-2 py-1 rounded text-xs font-medium transition-all
                      ${selectedTags.includes(tag.label) 
                        ? tag.color + " ring-2 ring-white/20" 
                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                      }
                    `}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingNote(false)
                  setNewNoteContent("")
                  setSelectedTags([])
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={handleSaveNew}
                disabled={!newNoteContent.trim() || isSaving}
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
              >
                <Save className="w-4 h-4 mr-1" />
                {isSaving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {notes.length === 0 && !isAddingNote ? (
          <div className="text-center py-8 text-slate-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Aucune note pour ce membre</p>
            <Button
              variant="link"
              className="text-vyxo-gold"
              onClick={() => setIsAddingNote(true)}
            >
              Ajouter une première note
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map(note => (
              <div
                key={note.id}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/30"
              >
                {editingId === note.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="min-h-20 resize-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_TAGS.map(tag => (
                        <button
                          key={tag.label}
                          onClick={() => toggleTag(tag.label, true)}
                          className={`
                            px-2 py-1 rounded text-xs font-medium transition-all
                            ${editTags.includes(tag.label) 
                              ? tag.color + " ring-2 ring-white/20" 
                              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                            }
                          `}
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        disabled={isSaving}
                        className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                      >
                        {isSaving ? "..." : "Mettre à jour"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {note.tags.map(tag => {
                          const tagConfig = AVAILABLE_TAGS.find(t => t.label === tag)
                          return (
                            <Badge 
                              key={tag}
                              className={tagConfig?.color || "bg-slate-500/10 text-slate-500"}
                            >
                              {tag}
                            </Badge>
                          )
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(note.updatedAt)}
                        {note.updatedAt > note.createdAt && (
                          <span className="text-slate-600">(modifié)</span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => startEdit(note)}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-300"
                          onClick={() => onDelete(note.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-center text-slate-600 pt-2">
          Ces notes sont visibles uniquement par vous et les autres managers
        </p>
      </CardContent>
    </Card>
  )
}

export default ManagerNotes
