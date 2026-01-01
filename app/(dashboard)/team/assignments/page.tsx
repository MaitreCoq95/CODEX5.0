"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Users,
  AlertTriangle,
  MoreHorizontal,
  Bell
} from "lucide-react"
import Link from "next/link"

// Types
interface ModuleAssignment {
  id: string
  moduleId: string
  moduleName: string
  assignedTo: {
    id: string
    name: string
    avatar?: string
    status: "not_started" | "in_progress" | "completed"
    progress: number
    completedAt?: Date
  }[]
  priority: "low" | "normal" | "high" | "urgent"
  deadline?: Date
  message?: string
  createdAt: Date
}

interface TeamMember {
  id: string
  name: string
  avatar?: string
}

interface Module {
  id: string
  title: string
  category: string
  duration: string
}

// Mock data
const assignments: ModuleAssignment[] = [
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
  {
    id: "3",
    moduleId: "m3",
    moduleName: "HACCP Niveau 2",
    priority: "low",
    createdAt: new Date("2024-12-15"),
    assignedTo: [
      { id: "1", name: "Marie Laurent", status: "not_started", progress: 0 },
      { id: "3", name: "Sophie Martin", status: "not_started", progress: 0 },
      { id: "5", name: "Emma Petit", status: "not_started", progress: 0 },
    ],
  },
]

const teamMembers: TeamMember[] = [
  { id: "1", name: "Marie Laurent" },
  { id: "2", name: "Thomas Dubois" },
  { id: "3", name: "Sophie Martin" },
  { id: "4", name: "Lucas Bernard" },
  { id: "5", name: "Emma Petit" },
]

const availableModules: Module[] = [
  { id: "m1", title: "GDP Niveau 3 - Validation", category: "GDP", duration: "4h" },
  { id: "m2", title: "Audit interne ISO", category: "ISO", duration: "6h" },
  { id: "m3", title: "HACCP Niveau 2", category: "HACCP", duration: "3h" },
  { id: "m4", title: "Sécurité routière avancée", category: "Sécurité", duration: "2h" },
  { id: "m5", title: "Management qualité", category: "ISO", duration: "5h" },
]

function getPriorityBadge(priority: ModuleAssignment["priority"]) {
  const styles = {
    urgent: "bg-red-500/10 text-red-500 border-red-500/30",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    normal: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    low: "bg-gray-500/10 text-gray-500 border-gray-500/30",
  }
  const labels = {
    urgent: "🔴 Urgent",
    high: "🟠 Haute",
    normal: "🔵 Normale",
    low: "⚪ Basse",
  }
  return <Badge variant="outline" className={styles[priority]}>{labels[priority]}</Badge>
}

function getStatusIcon(status: "not_started" | "in_progress" | "completed") {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    case "in_progress":
      return <Play className="w-4 h-4 text-blue-500" />
    case "not_started":
      return <Circle className="w-4 h-4 text-muted-foreground" />
  }
}

function calculateOverallProgress(assignedTo: ModuleAssignment["assignedTo"]): number {
  if (assignedTo.length === 0) return 0
  return Math.round(assignedTo.reduce((sum, m) => sum + m.progress, 0) / assignedTo.length)
}

export default function TeamAssignmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [priority, setPriority] = useState<string>("normal")

  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => 
      a.assignedTo.every(m => m.status === "completed")
    ).length,
    inProgress: assignments.filter(a => 
      a.assignedTo.some(m => m.status === "in_progress") &&
      !a.assignedTo.every(m => m.status === "completed")
    ).length,
    overdue: assignments.filter(a => 
      a.deadline && a.deadline < new Date() && 
      !a.assignedTo.every(m => m.status === "completed")
    ).length,
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">
            Gérez les modules assignés à votre équipe
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Nouvel assignment</DialogTitle>
              <DialogDescription>
                Assignez un module à un ou plusieurs membres de votre équipe
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Module</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un module" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{module.title}</span>
                          <Badge variant="secondary" className="ml-2">{module.category}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assigner à</Label>
                <div className="grid grid-cols-2 gap-2">
                  {teamMembers.map((member) => (
                    <label
                      key={member.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMembers.includes(member.id)
                          ? "border-vyxo-gold bg-vyxo-gold/5"
                          : "border-border hover:border-vyxo-gold/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedMembers.includes(member.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers([...selectedMembers, member.id])
                          } else {
                            setSelectedMembers(selectedMembers.filter(id => id !== member.id))
                          }
                        }}
                      />
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-vyxo-navy text-white text-xs">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                    </label>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1"
                  onClick={() => setSelectedMembers(teamMembers.map(m => m.id))}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Sélectionner tout
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priorité</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">⚪ Basse</SelectItem>
                      <SelectItem value="normal">🔵 Normale</SelectItem>
                      <SelectItem value="high">🟠 Haute</SelectItem>
                      <SelectItem value="urgent">🔴 Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Deadline (optionnel)</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message (optionnel)</Label>
                <Textarea placeholder="Ajoutez un message pour les membres assignés..." />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Les membres seront notifiés par email
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Annuler
              </Button>
              <Button 
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                disabled={!selectedModule || selectedMembers.length === 0}
              >
                Créer l'assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Assignments</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Terminés</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
            <p className="text-sm text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
            <p className="text-sm text-muted-foreground">En retard</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => {
          const overallProgress = calculateOverallProgress(assignment.assignedTo)
          const isOverdue = assignment.deadline && assignment.deadline < new Date()
          
          return (
            <Card key={assignment.id} className="bento-card">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Module Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-vyxo-navy/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-vyxo-navy dark:text-vyxo-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{assignment.moduleName}</h3>
                          {getPriorityBadge(assignment.priority)}
                          {isOverdue && (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              En retard
                            </Badge>
                          )}
                        </div>
                        
                        {assignment.message && (
                          <p className="text-sm text-muted-foreground mt-1">{assignment.message}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Créé le {assignment.createdAt.toLocaleDateString("fr-FR")}
                          </span>
                          {assignment.deadline && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Deadline: {assignment.deadline.toLocaleDateString("fr-FR")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progression globale</span>
                        <span className="font-medium">{overallProgress}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                    </div>
                  </div>

                  {/* Members Progress */}
                  <div className="lg:w-80">
                    <p className="text-sm font-medium mb-3">Progression par membre</p>
                    <div className="space-y-2">
                      {assignment.assignedTo.map((member) => (
                        <div 
                          key={member.id}
                          className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50"
                        >
                          {getStatusIcon(member.status)}
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-vyxo-navy text-white text-xs">
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm flex-1">{member.name}</span>
                          <span className="text-sm font-medium">{member.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
