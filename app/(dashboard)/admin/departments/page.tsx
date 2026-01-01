"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
  Building2,
  Users,
  TrendingUp,
  Edit,
  Trash2,
  MoreHorizontal,
  UserCog
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
interface Department {
  id: string
  name: string
  managerId?: string
  managerName?: string
  memberCount: number
  avgScore: number
  createdAt: Date
}

// Mock data
const departments: Department[] = [
  { id: "1", name: "Logistique", managerId: "m1", managerName: "Thomas Dubois", memberCount: 45, avgScore: 78, createdAt: new Date("2024-01-01") },
  { id: "2", name: "Production", managerId: "m2", managerName: "Claire Durand", memberCount: 38, avgScore: 72, createdAt: new Date("2024-01-01") },
  { id: "3", name: "Qualité", managerId: "m1", managerName: "Thomas Dubois", memberCount: 12, avgScore: 85, createdAt: new Date("2024-01-01") },
  { id: "4", name: "Commercial", memberCount: 28, avgScore: 54, createdAt: new Date("2024-02-15") },
  { id: "5", name: "RH", managerId: "m3", managerName: "Emma Petit", memberCount: 8, avgScore: 62, createdAt: new Date("2024-01-01") },
  { id: "6", name: "IT", memberCount: 11, avgScore: 45, createdAt: new Date("2024-03-01") },
]

const managers = [
  { id: "m1", name: "Thomas Dubois" },
  { id: "m2", name: "Claire Durand" },
  { id: "m3", name: "Emma Petit" },
]

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500"
  if (score >= 60) return "text-yellow-500"
  return "text-red-500"
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-emerald-500"
  if (score >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

export default function AdminDepartmentsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const stats = {
    total: departments.length,
    totalMembers: departments.reduce((acc, d) => acc + d.memberCount, 0),
    avgScore: Math.round(departments.reduce((acc, d) => acc + d.avgScore, 0) / departments.length),
    withoutManager: departments.filter(d => !d.managerId).length,
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Départements</h1>
          <p className="text-muted-foreground">
            Organisez votre structure par départements
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau département
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau département</DialogTitle>
              <DialogDescription>
                Créez un département et assignez un manager
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nom du département</Label>
                <Input placeholder="Ex: Marketing" />
              </div>
              
              <div className="space-y-2">
                <Label>Manager (optionnel)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                Créer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Building2 className="w-6 h-6 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Départements</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalMembers}</p>
            <p className="text-sm text-muted-foreground">Membres total</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
            <p className="text-2xl font-bold">{stats.avgScore}%</p>
            <p className="text-sm text-muted-foreground">Score moyen</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <UserCog className="w-6 h-6 mx-auto text-orange-500 mb-2" />
            <p className="text-2xl font-bold">{stats.withoutManager}</p>
            <p className="text-sm text-muted-foreground">Sans manager</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="bento-card">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{dept.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {dept.memberCount} membres
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Éditer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserCog className="w-4 h-4 mr-2" />
                    Assigner manager
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              {/* Manager */}
              <div className="mb-4">
                {dept.managerName ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-vyxo-navy text-white text-xs">
                        {dept.managerName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{dept.managerName}</span>
                    <Badge variant="secondary" className="text-xs">Manager</Badge>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-orange-500 border-orange-500/30">
                    Aucun manager assigné
                  </Badge>
                )}
              </div>

              {/* Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Score moyen</span>
                  <span className={`font-bold ${getScoreColor(dept.avgScore)}`}>
                    {dept.avgScore}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBarColor(dept.avgScore)} transition-all`}
                    style={{ width: `${dept.avgScore}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm">
                  <Users className="w-4 h-4 mr-1" />
                  Voir membres
                </Button>
                <span className="text-xs text-muted-foreground">
                  Créé le {dept.createdAt.toLocaleDateString("fr-FR")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
