"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TRAINING_MODULES } from "@/lib/services/learning-service"
import { BookOpen, Clock, FileText, GraduationCap, PlayCircle, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AcademyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredModules = TRAINING_MODULES.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const verticals = [
    { id: "all", label: "Tous" },
    { id: "food", label: "Agro (HACCP)" },
    { id: "pharma", label: "Pharma" },
    { id: "cyber", label: "Cyber & IA" },
    { id: "surete", label: "Sûreté" },
    { id: "medtech", label: "MedTech" },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academy</h1>
          <p className="text-muted-foreground">
            Formez vos équipes aux standards d'excellence
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Card className="bg-vyxo-gold/10 border-vyxo-gold/20 p-2 flex items-center gap-3">
              <div className="p-2 bg-vyxo-gold rounded-full text-vyxo-navy">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-vyxo-gold">5</div>
                <div className="text-xs text-muted-foreground">Parcours Actifs</div>
              </div>
           </Card>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher une formation..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto">
          {verticals.map(v => (
            <TabsTrigger key={v.id} value={v.id}>{v.label}</TabsTrigger>
          ))}
        </TabsList>

        {verticals.map(v => (
          <TabsContent key={v.id} value={v.id} className="mt-0">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredModules
                 .filter(m => v.id === "all" || m.vertical === v.id)
                 .map(module => (
                   <Link key={module.id} href={`/academy/${module.id}`} className="group">
                     <Card className="h-full hover:border-vyxo-gold/50 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                       <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-vyxo-navy to-vyxo-gold" />
                       <CardHeader>
                         <div className="flex justify-between items-start mb-2">
                           <div className="text-4xl group-hover:scale-110 transition-transform">{module.icon}</div>
                           {module.referencePdf && (
                             <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 text-[10px] flex items-center gap-1">
                               <FileText className="w-3 h-3" />
                               Premium Content
                             </Badge>
                           )}
                         </div>
                         <CardTitle className="group-hover:text-vyxo-gold transition-colors">{module.title}</CardTitle>
                         <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                       </CardHeader>
                       <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {module.duration}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4" />
                              {module.chapters.length} chapitres
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t flex justify-between items-center">
                             <Badge variant="outline">{module.level}</Badge>
                             <div className="text-vyxo-gold text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                               Commencer
                               <PlayCircle className="w-4 h-4" />
                             </div>
                          </div>
                       </CardContent>
                     </Card>
                   </Link>
                 ))
               }
             </div>
             {filteredModules.filter(m => v.id === "all" || m.vertical === v.id).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Aucune formation trouvée dans cette catégorie.
                </div>
             )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
