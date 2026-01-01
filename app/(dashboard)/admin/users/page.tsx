"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Edit,
  UserX,
  Trash2,
  Upload,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from "lucide-react"
import Link from "next/link"

// Types
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

// Mock data
const users: AdminUser[] = [
  { id: "1", email: "marie.laurent@company.fr", name: "Marie Laurent", role: "user", department: "Logistique", score: 85, status: "active", createdAt: new Date("2024-03-15"), lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "2", email: "thomas.dubois@company.fr", name: "Thomas Dubois", role: "manager", department: "Qualité", score: 92, status: "active", createdAt: new Date("2024-02-10"), lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000) },
  { id: "3", email: "sophie.martin@company.fr", name: "Sophie Martin", role: "user", department: "Logistique", score: 54, status: "inactive", createdAt: new Date("2024-04-20"), lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { id: "4", email: "lucas.bernard@company.fr", name: "Lucas Bernard", role: "user", department: "Production", score: 72, status: "active", createdAt: new Date("2024-05-05"), lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000) },
  { id: "5", email: "emma.petit@company.fr", name: "Emma Petit", role: "admin", department: "RH", score: 88, status: "active", createdAt: new Date("2024-01-20"), lastLogin: new Date(Date.now() - 30 * 60 * 1000) },
  { id: "6", email: "jean.moreau@company.fr", name: "Jean Moreau", role: "user", department: "Commercial", score: 45, status: "invited", createdAt: new Date("2024-12-10") },
  { id: "7", email: "claire.durand@company.fr", name: "Claire Durand", role: "manager", department: "Production", score: 78, status: "active", createdAt: new Date("2024-06-15"), lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000) },
  { id: "8", email: "paul.lefevre@company.fr", name: "Paul Lefèvre", role: "user", department: "IT", score: 65, status: "active", createdAt: new Date("2024-07-22"), lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000) },
]

const departments = ["Logistique", "Qualité", "Production", "Commercial", "RH", "IT"]

function getRoleBadge(role: AdminUser["role"]) {
  const styles = {
    admin: "bg-purple-500/10 text-purple-500",
    manager: "bg-blue-500/10 text-blue-500",
    user: "bg-gray-500/10 text-gray-500",
  }
  const labels = {
    admin: "Admin",
    manager: "Manager",
    user: "Utilisateur",
  }
  return <Badge className={styles[role]}>{labels[role]}</Badge>
}

function getStatusBadge(status: AdminUser["status"]) {
  const styles = {
    active: "bg-emerald-500/10 text-emerald-500",
    inactive: "bg-yellow-500/10 text-yellow-500",
    invited: "bg-blue-500/10 text-blue-500",
  }
  const labels = {
    active: "🟢 Actif",
    inactive: "🟡 Inactif",
    invited: "📧 Invité",
  }
  return <Badge variant="outline" className={styles[status]}>{labels[status]}</Badge>
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
}

function formatRelativeTime(date?: Date): string {
  if (!date) return "Jamais"
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `Il y a ${diffMins}min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  return `Il y a ${diffDays}j`
}

export default function AdminUsersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter
    return matchesSearch && matchesRole && matchesDepartment
  })

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    invited: users.filter(u => u.status === "invited").length,
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs de votre organisation
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importer CSV
          </Button>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Créez un compte et envoyez une invitation par email
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom</Label>
                    <Input placeholder="Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input placeholder="Dupont" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="jean.dupont@company.fr" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rôle</Label>
                    <Select defaultValue="user">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Département</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Un email d'invitation sera envoyé automatiquement
                  </span>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Annuler
                </Button>
                <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                  Créer et inviter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Actifs</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{stats.inactive}</p>
            <p className="text-sm text-muted-foreground">Inactifs</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">{stats.invited}</p>
            <p className="text-sm text-muted-foreground">Invités</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="user">Utilisateur</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les depts.</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bento-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Utilisateur</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Rôle</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Département</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                      Score
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Dernière connexion</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-secondary/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-vyxo-navy text-white text-sm">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(user.role)}</td>
                    <td className="p-4 hidden md:table-cell">{user.department}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className={`font-medium ${
                        user.score >= 80 ? "text-emerald-500" : 
                        user.score >= 60 ? "text-yellow-500" : "text-red-500"
                      }`}>
                        {user.score}%
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {formatRelativeTime(user.lastLogin)}
                    </td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4 text-right">
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
                            <Mail className="w-4 h-4 mr-2" />
                            Envoyer email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-yellow-600">
                            <UserX className="w-4 h-4 mr-2" />
                            Désactiver
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredUsers.length} sur {users.length} utilisateurs
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="min-w-8">1</Button>
              <Button variant="ghost" size="sm" className="min-w-8">2</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
