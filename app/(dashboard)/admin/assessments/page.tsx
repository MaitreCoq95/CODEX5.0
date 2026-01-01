"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  Filter,
  FileText,
  Edit,
  Copy,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Archive
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const assessments = [
  {
    id: "gdp-level1",
    name: "Diagnostic GDP Niveau 1",
    certification: "GDP",
    questionsCount: 25,
    sectionsCount: 5,
    status: "published",
    isDemo: true,
    completions: 142,
    avgScore: 68,
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "iso-9001-full",
    name: "Auto-diagnostic ISO 9001 Complet",
    certification: "ISO 9001",
    questionsCount: 45,
    sectionsCount: 8,
    status: "published",
    isDemo: false,
    completions: 89,
    avgScore: 72,
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "haccp-basics",
    name: "Évaluation HACCP Bases",
    certification: "HACCP",
    questionsCount: 20,
    sectionsCount: 4,
    status: "draft",
    isDemo: false,
    completions: 0,
    avgScore: 0,
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "iso-45001",
    name: "ISO 45001 - Santé Sécurité",
    certification: "ISO 45001",
    questionsCount: 35,
    sectionsCount: 6,
    status: "archived",
    isDemo: false,
    completions: 45,
    avgScore: 61,
    updatedAt: new Date("2024-11-20"),
  },
]

const stats = {
  total: assessments.length,
  published: assessments.filter(a => a.status === "published").length,
  draft: assessments.filter(a => a.status === "draft").length,
  totalCompletions: assessments.reduce((sum, a) => sum + a.completions, 0),
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    published: "bg-emerald-500/20 text-emerald-400",
    draft: "bg-yellow-500/20 text-yellow-400",
    archived: "bg-slate-500/20 text-slate-400",
  }
  const labels: Record<string, string> = {
    published: "Publié",
    draft: "Brouillon",
    archived: "Archivé",
  }
  const icons: Record<string, React.ReactNode> = {
    published: <CheckCircle className="w-3 h-3" />,
    draft: <Clock className="w-3 h-3" />,
    archived: <Archive className="w-3 h-3" />,
  }
  return (
    <Badge className={`${styles[status]} gap-1`}>
      {icons[status]}
      {labels[status]}
    </Badge>
  )
}

function getCertificationColor(cert: string): string {
  const colors: Record<string, string> = {
    GDP: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "ISO 9001": "bg-purple-500/10 text-purple-400 border-purple-500/30",
    "ISO 45001": "bg-orange-500/10 text-orange-400 border-orange-500/30",
    HACCP: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  }
  return colors[cert] || "bg-slate-500/10 text-slate-400 border-slate-500/30"
}

export default function AdminAssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssessments = assessments.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.certification.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">
            Gérez vos modèles d&apos;évaluation et diagnostics
          </p>
        </div>
        <Link href="/admin/assessments/new/edit">
          <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel assessment
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">{stats.published}</p>
            <p className="text-sm text-muted-foreground">Publiés</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{stats.draft}</p>
            <p className="text-sm text-muted-foreground">Brouillons</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Eye className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalCompletions}</p>
            <p className="text-sm text-muted-foreground">Complétions</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher un assessment..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Assessments List */}
      <div className="space-y-3">
        {filteredAssessments.map(assessment => (
          <Card key={assessment.id} className="bento-card hover:border-vyxo-gold/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-slate-800">
                  <FileText className="w-6 h-6 text-vyxo-gold" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{assessment.name}</h3>
                    {assessment.isDemo && (
                      <Badge variant="outline" className="text-xs">Demo</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="outline" className={getCertificationColor(assessment.certification)}>
                      {assessment.certification}
                    </Badge>
                    <span>{assessment.questionsCount} questions</span>
                    <span>•</span>
                    <span>{assessment.sectionsCount} sections</span>
                    {assessment.completions > 0 && (
                      <>
                        <span>•</span>
                        <span>{assessment.completions} complétions</span>
                        <span>•</span>
                        <span>Score moy: {assessment.avgScore}%</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(assessment.status)}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/assessments/${assessment.id}/edit`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Prévisualiser
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
