"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Users, 
  Search,
  Plus,
  Filter,
  ChevronRight,
  Clock,
  Flame,
  TrendingUp,
  TrendingDown,
  Mail,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
interface TeamMember {
  id: string
  name: string
  email: string
  position: string
  department: string
  avatar?: string
  score: number
  scoreChange: number
  modulesCompleted: number
  totalModules: number
  lastActivity: Date
  status: "active" | "inactive" | "at_risk"
  streak: number
  joinedAt: Date
}

// Mock data
const members: TeamMember[] = [
  {
    id: "1",
    name: "Marie Laurent",
    email: "marie.laurent@company.fr",
    position: "Chauffeur-livreur",
    department: "Logistique",
    score: 85,
    scoreChange: 5,
    modulesCompleted: 8,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "active",
    streak: 12,
    joinedAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@company.fr",
    position: "Responsable qualité",
    department: "Qualité",
    score: 92,
    scoreChange: 2,
    modulesCompleted: 10,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: "active",
    streak: 24,
    joinedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Sophie Martin",
    email: "sophie.martin@company.fr",
    position: "Préparatrice commandes",
    department: "Logistique",
    score: 54,
    scoreChange: -8,
    modulesCompleted: 4,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "at_risk",
    streak: 0,
    joinedAt: new Date("2024-06-01"),
  },
  {
    id: "4",
    name: "Lucas Bernard",
    email: "lucas.bernard@company.fr",
    position: "Magasinier",
    department: "Logistique",
    score: 72,
    scoreChange: 0,
    modulesCompleted: 6,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "inactive",
    streak: 3,
    joinedAt: new Date("2024-04-20"),
  },
  {
    id: "5",
    name: "Emma Petit",
    email: "emma.petit@company.fr",
    position: "Chauffeur-livreur",
    department: "Logistique",
    score: 78,
    scoreChange: 3,
    modulesCompleted: 7,
    totalModules: 10,
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: "active",
    streak: 8,
    joinedAt: new Date("2024-05-12"),
  },
]

function getStatusBadge(status: TeamMember["status"]) {
  const styles = {
    active: "bg-emerald-500/10 text-emerald-500",
    inactive: "bg-yellow-500/10 text-yellow-500",
    at_risk: "bg-red-500/10 text-red-500",
  }
  const labels = {
    active: "Actif",
    inactive: "Inactif",
    at_risk: "À risque",
  }
  return (
    <Badge className={styles[status]}>
      {labels[status]}
    </Badge>
  )
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `Il y a ${diffMins}min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  return `Il y a ${diffDays}j`
}

export default function TeamMembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("score")

  // Get unique departments
  const departments = [...new Set(members.map(m => m.department))]

  // Filter and sort
  let filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.position.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || m.status === filterStatus
    const matchesDept = filterDepartment === "all" || m.department === filterDepartment

    return matchesSearch && matchesStatus && matchesDept
  })

  // Sort
  filteredMembers = filteredMembers.sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.score - a.score
      case "name":
        return a.name.localeCompare(b.name)
      case "activity":
        return b.lastActivity.getTime() - a.lastActivity.getTime()
      case "progress":
        return (b.modulesCompleted / b.totalModules) - (a.modulesCompleted / a.totalModules)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Membres de l&apos;équipe
          </h1>
          <p className="text-muted-foreground">
            {members.length} membres • {members.filter(m => m.status === "active").length} actifs
          </p>
        </div>
        <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
          <Plus className="w-4 h-4 mr-2" />
          Inviter un membre
        </Button>
      </div>

      {/* Filters */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, email, poste..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                  <SelectItem value="at_risk">À risque</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="activity">Activité</SelectItem>
                  <SelectItem value="progress">Progression</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map(member => (
          <Card key={member.id} className="bento-card hover:border-vyxo-gold/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-vyxo-navy text-white">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer un message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Assigner un module
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-400">
                      Retirer de l&apos;équipe
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 rounded-lg bg-slate-800/50">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg font-bold">{member.score}%</span>
                    {member.scoreChange !== 0 && (
                      <span className={`text-xs ${member.scoreChange > 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {member.scoreChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-800/50">
                  <p className="text-lg font-bold">{member.modulesCompleted}/{member.totalModules}</p>
                  <p className="text-xs text-muted-foreground">Modules</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-800/50">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-lg font-bold">{member.streak}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Streak</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progression</span>
                  <span>{Math.round((member.modulesCompleted / member.totalModules) * 100)}%</span>
                </div>
                <Progress 
                  value={(member.modulesCompleted / member.totalModules) * 100} 
                  className="h-2"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusBadge(member.status)}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(member.lastActivity)}
                  </span>
                </div>
                <Link href={`/team/members/${member.id}`}>
                  <Button variant="ghost" size="sm" className="h-8">
                    Détails
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Aucun membre trouvé</h3>
          <p className="text-muted-foreground">
            Ajustez vos filtres ou invitez de nouveaux membres
          </p>
        </div>
      )}
    </div>
  )
}
