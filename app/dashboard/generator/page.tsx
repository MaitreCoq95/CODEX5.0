"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Loader2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  Wand2,
  Check,
  Crown,
  Clock,
} from "lucide-react"
import { getGeneratorById, getGeneratorsForStandard } from "@/lib/data/generators"
import type { DocumentGenerator, GeneratorField, GeneratorStep } from "@/lib/data/generators"

// Mock AI suggestion function (replace with real API call)
async function getAISuggestion(prompt: string, context: Record<string, string>): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Replace placeholders in prompt
  let processedPrompt = prompt
  Object.entries(context).forEach(([key, value]) => {
    processedPrompt = processedPrompt.replace(new RegExp(`{${key}}`, "g"), value || `[${key}]`)
  })

  // Mock responses based on field type
  if (prompt.includes("périmètre SMQ")) {
    return `Le système de management de la qualité de ${context.company_name || "[Entreprise]"} couvre l'ensemble des activités liées à ${context.activity || "[activité]"}, depuis la conception jusqu'à la livraison au client final. Ce périmètre inclut tous les processus supports nécessaires à la réalisation de nos produits et services, conformément aux exigences de la norme ISO 9001:2015.`
  }

  if (prompt.includes("engagement de la direction")) {
    return `La direction de ${context.company_name || "[Entreprise]"} s'engage pleinement dans la démarche qualité et considère la satisfaction de nos clients comme une priorité stratégique.

Nous nous engageons à :
• Fournir les ressources nécessaires au bon fonctionnement du SMQ
• Promouvoir l'amélioration continue à tous les niveaux de l'organisation
• Assurer la conformité aux exigences légales et réglementaires applicables
• Communiquer sur l'importance de satisfaire les exigences clients`
  }

  if (prompt.includes("axes stratégiques")) {
    return `1. **Excellence de la satisfaction client** - Anticiper et dépasser les attentes de nos clients par une écoute active et une réactivité exemplaire.

2. **Amélioration continue des processus** - Optimiser nos méthodes de travail pour gagner en efficacité et réduire les non-conformités.

3. **Développement des compétences** - Investir dans la formation de nos collaborateurs pour maintenir un haut niveau d'expertise.

4. **Innovation et adaptation** - Rester à la pointe de notre secteur en intégrant les meilleures pratiques et technologies.

5. **Performance environnementale** - Réduire notre impact environnemental dans toutes nos activités.`
  }

  if (prompt.includes("enjeux internes")) {
    return `• Maintien et développement des compétences clés de nos équipes
• Optimisation de nos processus de production pour améliorer la productivité
• Gestion efficace des ressources et maîtrise des coûts
• Communication interne fluide entre les différents services
• Adaptation de notre organisation aux évolutions du marché`
  }

  if (prompt.includes("enjeux externes")) {
    return `• Évolution des attentes et exigences de nos clients
• Pression concurrentielle croissante sur notre marché
• Évolutions réglementaires et normatives applicables à notre secteur
• Innovations technologiques impactant notre activité
• Contexte économique et ses répercussions sur notre activité`
  }

  if (prompt.includes("parties intéressées")) {
    return `**Clients**
• Qualité constante des produits/services
• Respect des délais de livraison
• Réactivité et support technique

**Collaborateurs**
• Conditions de travail sécurisées
• Développement des compétences
• Reconnaissance et évolution professionnelle

**Fournisseurs**
• Relations commerciales durables
• Respect des engagements contractuels
• Visibilité sur les besoins

**Actionnaires**
• Rentabilité et croissance
• Pérennité de l'entreprise
• Transparence de la gouvernance

**Autorités réglementaires**
• Conformité aux exigences légales
• Déclarations et reporting dans les délais`
  }

  if (prompt.includes("sources")) {
    return `• Audits internes et externes
• Réclamations et retours clients
• Contrôles qualité en production
• Revues de processus
• Suggestions du personnel
• Incidents et accidents
• Analyses des indicateurs de performance
• Non-conformités fournisseurs`
  }

  return "Contenu généré par l'IA basé sur vos informations..."
}

// AI-Assisted Field Component
function AIAssistedField({
  field,
  value,
  onChange,
  context,
}: {
  field: GeneratorField
  value: string
  onChange: (value: string) => void
  context: Record<string, string>
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const handleGenerate = async () => {
    if (!field.aiPrompt) return
    setIsGenerating(true)
    try {
      const suggestion = await getAISuggestion(field.aiPrompt, context)
      onChange(suggestion)
      setHasGenerated(true)
    } catch (error) {
      console.error("AI generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">{field.label}</label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="border-vyxo-gold/50 text-vyxo-gold hover:bg-vyxo-gold/10"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-1" />
              {hasGenerated ? "Régénérer" : "Générer avec IA"}
            </>
          )}
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={6}
        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 resize-none"
      />
      {field.helpText && <p className="text-xs text-gray-500">{field.helpText}</p>}
    </div>
  )
}

// Render a single field
function RenderField({
  field,
  value,
  onChange,
  context,
}: {
  field: GeneratorField
  value: string
  onChange: (value: string) => void
  context: Record<string, string>
}) {
  switch (field.type) {
    case "ai_assisted":
      return (
        <AIAssistedField field={field} value={value} onChange={onChange} context={context} />
      )

    case "textarea":
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">{field.label}</label>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
      )

    case "select":
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">{field.label}</label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )

    case "date":
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">{field.label}</label>
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/5 border-white/20 text-white"
          />
        </div>
      )

    default:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">{field.label}</label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
      )
  }
}

// Generator Wizard Component
function GeneratorWizard({ generator }: { generator: DocumentGenerator }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const step = generator.steps[currentStep]
  const progress = ((currentStep + 1) / generator.steps.length) * 100

  const updateField = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleNext = () => {
    if (currentStep < generator.steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Generate document
      handleGenerate()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate document generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setIsComplete(true)
  }

  const handleDownload = () => {
    // In production, this would generate and download the actual document
    alert(`📥 Document "${generator.name}" généré avec succès !\n\nVos données ont été intégrées dans le template.\n\n(En production, le fichier ${generator.outputFormat.toUpperCase()} serait téléchargé)`)
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Document Généré !</h2>
        <p className="text-gray-400 mb-6">
          Votre {generator.name.toLowerCase()} est prêt au téléchargement.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleDownload} className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90">
            <Download className="w-4 h-4 mr-2" />
            Télécharger ({generator.outputFormat.toUpperCase()})
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-white/20 text-white"
          >
            Retour aux templates
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            Étape {currentStep + 1} sur {generator.steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 [&>div]:bg-vyxo-gold" />

        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {generator.steps.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-center gap-2 ${
                i <= currentStep ? "text-vyxo-gold" : "text-gray-600"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  i < currentStep
                    ? "bg-vyxo-gold text-vyxo-navy"
                    : i === currentStep
                    ? "border-2 border-vyxo-gold"
                    : "border border-gray-600"
                }`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : s.icon}
              </div>
              <span className="hidden md:block text-xs">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <span className="text-2xl">{step.icon}</span>
                {step.title}
              </CardTitle>
              <p className="text-gray-400">{step.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {step.fields.map((field) => (
                <RenderField
                  key={field.id}
                  field={field}
                  value={formData[field.id] || field.defaultValue || ""}
                  onChange={(value) => updateField(field.id, value)}
                  context={formData}
                />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="border-white/20 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>

        <Button
          onClick={handleNext}
          disabled={isGenerating}
          className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Génération...
            </>
          ) : currentStep === generator.steps.length - 1 ? (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Générer le Document
            </>
          ) : (
            <>
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// Generator Selection Page
function GeneratorSelection({ standardCode }: { standardCode: string }) {
  const router = useRouter()
  const generators = getGeneratorsForStandard(standardCode)

  if (generators.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Aucun générateur disponible pour cette norme.</p>
        <p className="text-gray-500 text-sm mt-2">Les générateurs IA arrivent bientôt !</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {generators.map((gen) => (
        <motion.div
          key={gen.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card
            className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-vyxo-gold/50 cursor-pointer transition-all h-full"
            onClick={() => router.push(`?standard=${standardCode}&generator=${gen.id}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge className="bg-vyxo-gold/20 text-vyxo-gold border-vyxo-gold/30">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  ~{gen.estimatedMinutes} min
                </div>
              </div>
              <CardTitle className="text-white mt-2">{gen.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">{gen.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Wand2 className="w-4 h-4 text-vyxo-gold" />
                <span className="text-gray-300">
                  {gen.steps.length} étapes • Assistance IA incluse
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// Main Content
function GeneratorContent() {
  const searchParams = useSearchParams()
  const standardCode = searchParams.get("standard") || "ISO_9001"
  const generatorId = searchParams.get("generator")

  const generator = generatorId ? getGeneratorById(standardCode, generatorId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-vyxo-gold" />
            <h1 className="text-3xl font-bold text-white">
              {generator ? generator.name : "Générateur de Documents IA"}
            </h1>
          </div>
          <p className="text-gray-400">
            {generator
              ? generator.description
              : "Créez vos documents personnalisés en quelques minutes avec l'aide de l'intelligence artificielle."}
          </p>
        </motion.div>

        {/* Content */}
        {generator ? (
          <GeneratorWizard generator={generator} />
        ) : (
          <GeneratorSelection standardCode={standardCode} />
        )}
      </div>
    </div>
  )
}

// Page with Suspense
export default function GeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
          <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
        </div>
      }
    >
      <GeneratorContent />
    </Suspense>
  )
}
