"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  Download,
  FileText,
  Search,
  Filter,
  Clock,
  CheckCircle,
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  Wrench,
} from "lucide-react"
import {
  getTemplatesForStandard,
  getTemplateCounts,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  FORMAT_ICONS,
} from "@/lib/data/templates"
import type { Template, TemplateCategory } from "@/lib/data/templates"

// Category filter button
function CategoryButton({
  category,
  label,
  icon,
  count,
  isActive,
  onClick,
}: {
  category: TemplateCategory | "all"
  label: string
  icon: React.ReactNode
  count: number
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        isActive
          ? "bg-vyxo-gold text-vyxo-navy border-vyxo-gold"
          : "bg-white/5 text-white border-white/20 hover:border-vyxo-gold/50"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      <Badge variant="secondary" className="ml-1">
        {count}
      </Badge>
    </button>
  )
}

// Template Card
function TemplateCard({
  template,
  onDownload,
}: {
  template: Template
  onDownload: () => void
}) {
  const categoryColors: Record<TemplateCategory, string> = {
    manuel: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    procedure: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    formulaire: "bg-green-500/20 text-green-400 border-green-500/30",
    outil: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  const formatColors: Record<string, string> = {
    docx: "bg-blue-600/20 text-blue-300",
    xlsx: "bg-green-600/20 text-green-300",
    pdf: "bg-red-600/20 text-red-300",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-vyxo-gold/30 transition-all group h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{CATEGORY_ICONS[template.category]}</span>
              <Badge variant="outline" className={categoryColors[template.category]}>
                {CATEGORY_LABELS[template.category]}
              </Badge>
            </div>
            <Badge className={formatColors[template.format]}>
              {FORMAT_ICONS[template.format]} {template.format.toUpperCase()}
            </Badge>
          </div>
          <CardTitle className="text-white text-lg mt-2 group-hover:text-vyxo-gold transition-colors">
            {template.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-white/10 text-gray-400"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>~{template.estimatedCompletionHours}h</span>
            </div>
            <Button
              size="sm"
              onClick={onDownload}
              className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
            >
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Templates Content
function TemplatesContent() {
  const searchParams = useSearchParams()
  const standardCode = searchParams.get("standard") || "ISO_9001"

  const [activeCategory, setActiveCategory] = useState<TemplateCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [downloadedTemplates, setDownloadedTemplates] = useState<string[]>([])

  // Load downloaded templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`downloaded_templates_${standardCode}`)
    if (saved) {
      setDownloadedTemplates(JSON.parse(saved))
    }
  }, [standardCode])

  // Get templates and counts
  const allTemplates = useMemo(() => getTemplatesForStandard(standardCode), [standardCode])
  const counts = useMemo(() => getTemplateCounts(standardCode), [standardCode])

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = allTemplates

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((t) => t.category === activeCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return result
  }, [allTemplates, activeCategory, searchQuery])

  // Handle download
  const handleDownload = (template: Template) => {
    // Track download
    const updated = [...downloadedTemplates, template.id]
    setDownloadedTemplates(updated)
    localStorage.setItem(`downloaded_templates_${standardCode}`, JSON.stringify(updated))

    // Simulate download (in real app, would download from Supabase Storage)
    alert(`📥 Template "${template.name}" téléchargé !\n\n(En production, le fichier serait téléchargé depuis Supabase Storage)`)
  }

  // Standard names
  const standardNames: Record<string, string> = {
    ISO_9001: "ISO 9001:2015",
    GDP: "GDP / BPD",
    ISO_27001: "ISO 27001:2022",
    HACCP: "HACCP",
    ISO_42001: "ISO 42001",
    ISO_13485: "ISO 13485:2016",
    SURETE: "Sûreté Aéroportuaire",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Bibliothèque de Templates</h1>
          <p className="text-gray-400">
            {standardNames[standardCode]} - {allTemplates.length} templates disponibles
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{counts.manuel}</p>
                <p className="text-blue-400 text-sm">Manuels</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{counts.procedure}</p>
                <p className="text-purple-400 text-sm">Procédures</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{counts.formulaire}</p>
                <p className="text-green-400 text-sm">Formulaires</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <Wrench className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-white">{counts.outil}</p>
                <p className="text-orange-400 text-sm">Outils</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Rechercher un template..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <CategoryButton
              category="all"
              label="Tous"
              icon={<FileText className="w-4 h-4" />}
              count={allTemplates.length}
              isActive={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            <CategoryButton
              category="manuel"
              label="Manuels"
              icon={<BookOpen className="w-4 h-4" />}
              count={counts.manuel}
              isActive={activeCategory === "manuel"}
              onClick={() => setActiveCategory("manuel")}
            />
            <CategoryButton
              category="procedure"
              label="Procédures"
              icon={<ClipboardList className="w-4 h-4" />}
              count={counts.procedure}
              isActive={activeCategory === "procedure"}
              onClick={() => setActiveCategory("procedure")}
            />
            <CategoryButton
              category="formulaire"
              label="Formulaires"
              icon={<FileSpreadsheet className="w-4 h-4" />}
              count={counts.formulaire}
              isActive={activeCategory === "formulaire"}
              onClick={() => setActiveCategory("formulaire")}
            />
            <CategoryButton
              category="outil"
              label="Outils"
              icon={<Wrench className="w-4 h-4" />}
              count={counts.outil}
              isActive={activeCategory === "outil"}
              onClick={() => setActiveCategory("outil")}
            />
          </div>
        </motion.div>

        {/* Templates Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onDownload={() => handleDownload(template)}
              />
            ))}
          </div>
        </AnimatePresence>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucun template trouvé</p>
          </div>
        )}

        {/* Downloaded count */}
        {downloadedTemplates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-white">
                  {downloadedTemplates.length} template(s) téléchargé(s)
                </span>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Page with Suspense
export default function TemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
        </div>
      }
    >
      <TemplatesContent />
    </Suspense>
  )
}
