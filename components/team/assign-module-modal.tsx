"use client"

import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { Search, CalendarIcon, BookOpen, Users, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

interface Module {
  id: string
  title: string
  category: string
  duration: string
  description?: string
}

interface AssignModuleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  members: TeamMember[]
  modules: Module[]
  preSelectedMembers?: string[]
  preSelectedModule?: string
  onAssign: (data: {
    moduleId: string
    memberIds: string[]
    deadline?: Date
    priority: string
    message?: string
  }) => Promise<void>
}

export function AssignModuleModal({
  open,
  onOpenChange,
  members,
  modules,
  preSelectedMembers = [],
  preSelectedModule,
  onAssign
}: AssignModuleModalProps) {
  const [step, setStep] = useState<"module" | "members" | "options">("module")
  const [selectedModule, setSelectedModule] = useState<string>(preSelectedModule || "")
  const [selectedMembers, setSelectedMembers] = useState<string[]>(preSelectedMembers)
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [priority, setPriority] = useState("normal")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter modules
  const filteredModules = modules.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter members
  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const handleAssign = async () => {
    if (!selectedModule || selectedMembers.length === 0) return

    setIsSubmitting(true)
    try {
      await onAssign({
        moduleId: selectedModule,
        memberIds: selectedMembers,
        deadline,
        priority,
        message: message || undefined,
      })
      
      // Reset and close
      setStep("module")
      setSelectedModule("")
      setSelectedMembers([])
      setDeadline(undefined)
      setPriority("normal")
      setMessage("")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      GDP: "bg-blue-500/10 text-blue-500",
      ISO: "bg-purple-500/10 text-purple-500",
      Sécurité: "bg-orange-500/10 text-orange-500",
      HACCP: "bg-emerald-500/10 text-emerald-500",
    }
    return colors[category] || "bg-slate-500/10 text-slate-500"
  }

  const selectedModuleData = modules.find(m => m.id === selectedModule)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-vyxo-gold" />
            Assigner un module
          </DialogTitle>
          <DialogDescription>
            {step === "module" && "Sélectionnez le module à assigner"}
            {step === "members" && "Choisissez les membres de l'équipe"}
            {step === "options" && "Configurez les options d'assignation"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 py-4">
          {["module", "members", "options"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s
                    ? "bg-vyxo-gold text-vyxo-navy"
                    : ["module", "members", "options"].indexOf(step) > i
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    ["module", "members", "options"].indexOf(step) > i
                      ? "bg-emerald-500"
                      : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Module */}
        {step === "module" && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un module..."
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {filteredModules.map(module => (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedModule === module.id
                      ? "border-vyxo-gold bg-vyxo-gold/10"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getCategoryColor(module.category)}>
                          {module.category}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {module.duration}
                        </span>
                      </div>
                      <h4 className="font-medium">{module.title}</h4>
                      {module.description && (
                        <p className="text-sm text-slate-500 mt-1">{module.description}</p>
                      )}
                    </div>
                    {selectedModule === module.id && (
                      <div className="w-5 h-5 rounded-full bg-vyxo-gold flex items-center justify-center">
                        <span className="text-vyxo-navy text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Members */}
        {step === "members" && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un membre..."
                className="pl-10"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                {selectedMembers.length} membre(s) sélectionné(s)
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (selectedMembers.length === members.length) {
                    setSelectedMembers([])
                  } else {
                    setSelectedMembers(members.map(m => m.id))
                  }
                }}
              >
                {selectedMembers.length === members.length ? "Désélectionner tout" : "Sélectionner tout"}
              </Button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {filteredMembers.map(member => (
                <div
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMembers.includes(member.id)
                      ? "border-vyxo-gold bg-vyxo-gold/10"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    className="border-slate-500"
                  />
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-vyxo-navy text-white text-xs">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Options */}
        {step === "options" && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-400 mb-2">Récapitulatif</h4>
              {selectedModuleData && (
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-vyxo-gold" />
                  <span className="font-medium">{selectedModuleData.title}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  {selectedMembers.length} membre{selectedMembers.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label>Date limite (optionnel)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label>Priorité</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Basse</SelectItem>
                  <SelectItem value="normal">🔵 Normale</SelectItem>
                  <SelectItem value="high">🟠 Haute</SelectItem>
                  <SelectItem value="urgent">🔴 Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label>Message personnalisé (optionnel)</Label>
              <Input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Ajoutez un message pour le(s) membre(s)..."
              />
            </div>

            {/* Warning if urgent */}
            {priority === "urgent" && (
              <div className="flex items-center gap-2 text-orange-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                Les membres recevront une notification push immédiate
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          {step !== "module" && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setStep(step === "options" ? "members" : "module")
              }}
            >
              Précédent
            </Button>
          )}
          
          {step !== "options" ? (
            <Button
              onClick={() => {
                setSearchQuery("")
                setStep(step === "module" ? "members" : "options")
              }}
              disabled={step === "module" ? !selectedModule : selectedMembers.length === 0}
              className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
            >
              Continuer
            </Button>
          ) : (
            <Button
              onClick={handleAssign}
              disabled={isSubmitting}
              className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
            >
              {isSubmitting ? "Assignation..." : "Assigner le module"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AssignModuleModal
