"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Building2, Mail, User } from "lucide-react"

interface EnrollmentFormProps {
  certificationId: string
  certificationName: string
}

export function EnrollmentForm({ certificationId, certificationName }: EnrollmentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    industry: "",
    role: ""
  })

  // Pre-filled industries based on certification context could go here, but using generic for now
  const industries = [
    { value: "pharma", label: "Pharmaceutique & Santé" },
    { value: "logistics", label: "Transport & Logistique" },
    { value: "food", label: "Agroalimentaire" },
    { value: "aero", label: "Aéronautique / Sûreté" },
    { value: "tech", label: "Technologie / SaaS" },
    { value: "industry", label: "Industrie Manufacturière" },
    { value: "other", label: "Autre" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call / Lead capture
    // In a real app, we would send this to a backend/CRM
    console.log("Lead Captured:", { ...formData, certificationId })

    // Store in localStorage for the session (simple persistence for the demo flow)
    localStorage.setItem("vyxo_demo_user", JSON.stringify(formData))

    // Simulate delay for UX
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to the assessment page
      router.push(`/demo/${certificationId}/assessment`)
    }, 800)
  }

  const isFormValid = Object.values(formData).every(val => val.trim().length > 0)

  return (
    <Card className="bento-card border-vyxo-gold/20 shadow-2xl shadow-vyxo-gold/5 animate-fade-in-up delay-200">
      <CardHeader>
        <CardTitle className="text-xl">Commencez votre évaluation</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour accéder au questionnaire {certificationName}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  id="fullName" 
                  placeholder="Jean Dupont" 
                  className="pl-9"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="jean@entreprise.com" 
                  className="pl-9"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Entreprise</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="companyName" 
                placeholder="Nom de votre société" 
                className="pl-9"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="industry">Secteur d'activité</Label>
              <Select 
                onValueChange={(val) => setFormData({...formData, industry: val})}
                value={formData.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(ind => (
                    <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Fonction</Label>
              <Input 
                id="role" 
                placeholder="Ex: Responsable Qualité"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold h-12 text-lg mt-4"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Chargement..." : "Démarrer l'Assessment"}
            {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Vos données sont sécurisées. En continuant, vous acceptez nos CGU.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
