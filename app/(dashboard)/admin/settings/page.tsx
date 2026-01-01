"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Building2,
  Palette,
  Link2,
  CreditCard,
  Shield,
  Save,
  Upload,
  Check,
  ExternalLink
} from "lucide-react"

// Mock data
const organization = {
  name: "Vyxo Pharma Distribution",
  industry: "pharmaceutical",
  employeeCount: 142,
  timezone: "Europe/Paris",
  language: "fr",
  logo: null,
}

const branding = {
  primaryColor: "#0F2339",
  secondaryColor: "#C69C6D",
  logoUrl: null,
}

const integrations = [
  { id: "google", name: "Google Workspace", enabled: true, icon: "🔗" },
  { id: "microsoft", name: "Microsoft 365", enabled: false, icon: "🔗" },
  { id: "slack", name: "Slack", enabled: true, icon: "💬" },
  { id: "stripe", name: "Stripe", enabled: true, icon: "💳" },
]

const billing = {
  plan: "Professional",
  status: "active",
  nextBilling: new Date("2025-01-15"),
  amount: 490,
  seats: 150,
  usedSeats: 142,
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("organization")

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez votre organisation et vos intégrations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden md:inline">Organisation</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden md:inline">Branding</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Link2 className="w-4 h-4" />
            <span className="hidden md:inline">Intégrations</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden md:inline">Facturation</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
        </TabsList>

        {/* Organization Tab */}
        <TabsContent value="organization">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>Profil de l'organisation</CardTitle>
              <CardDescription>
                Informations générales sur votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nom de l'organisation</Label>
                  <Input defaultValue={organization.name} />
                </div>
                <div className="space-y-2">
                  <Label>Secteur d'activité</Label>
                  <Select defaultValue={organization.industry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pharmaceutical">Distribution pharmaceutique</SelectItem>
                      <SelectItem value="logistics">Logistique</SelectItem>
                      <SelectItem value="manufacturing">Production industrielle</SelectItem>
                      <SelectItem value="food">Agroalimentaire</SelectItem>
                      <SelectItem value="healthcare">Santé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nombre d'employés</Label>
                  <Input type="number" defaultValue={organization.employeeCount} />
                </div>
                <div className="space-y-2">
                  <Label>Fuseau horaire</Label>
                  <Select defaultValue={organization.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (UTC)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Langue par défaut</Label>
                  <Select defaultValue={organization.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>Personnalisation visuelle</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Logo de l'entreprise</Label>
                  <div className="border-2 border-dashed rounded-xl p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Glissez ou cliquez pour uploader
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG ou SVG (max 2MB)
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Couleur principale</Label>
                    <div className="flex gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg border"
                        style={{ backgroundColor: branding.primaryColor }}
                      />
                      <Input defaultValue={branding.primaryColor} className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Couleur secondaire</Label>
                    <div className="flex gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg border"
                        style={{ backgroundColor: branding.secondaryColor }}
                      />
                      <Input defaultValue={branding.secondaryColor} className="flex-1" />
                    </div>
                  </div>
                </div>
              </div>
              <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="grid md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {integration.enabled ? "Connecté" : "Non connecté"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={integration.enabled} />
                  </div>
                  {integration.enabled && (
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Configurer
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bento-card md:col-span-2">
              <CardHeader>
                <CardTitle>Abonnement actuel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-vyxo-gold/10 border border-vyxo-gold/30 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">Plan {billing.plan}</h3>
                      <Badge className="bg-emerald-500/10 text-emerald-500">Actif</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {billing.usedSeats}/{billing.seats} sièges utilisés
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{billing.amount}€</p>
                    <p className="text-sm text-muted-foreground">/mois</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Prochaine facturation</p>
                    <p className="font-medium">{billing.nextBilling.toLocaleDateString("fr-FR")}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Changer de plan</Button>
                    <Button variant="outline">Voir les factures</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardHeader>
                <CardTitle>Méthode de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expire 12/26</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Modifier
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Configurez les paramètres de sécurité de votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div>
                  <h4 className="font-medium">Authentification à deux facteurs (2FA)</h4>
                  <p className="text-sm text-muted-foreground">
                    Exiger 2FA pour tous les utilisateurs
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div>
                  <h4 className="font-medium">Single Sign-On (SSO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Connectez votre fournisseur d'identité
                  </p>
                </div>
                <Button variant="outline">Configurer</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div>
                  <h4 className="font-medium">Politique de mot de passe</h4>
                  <p className="text-sm text-muted-foreground">
                    Minimum 12 caractères, majuscules, chiffres, symboles
                  </p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500">
                  <Check className="w-3 h-3 mr-1" />
                  Fort
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div>
                  <h4 className="font-medium">Session timeout</h4>
                  <p className="text-sm text-muted-foreground">
                    Déconnexion automatique après inactivité
                  </p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="120">2 heures</SelectItem>
                    <SelectItem value="480">8 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
