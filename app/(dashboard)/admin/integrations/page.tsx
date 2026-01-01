"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft,
  Check,
  X,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"

// Mock data
const integrations = [
  {
    id: "google",
    name: "Google Workspace",
    icon: "🔵",
    description: "SSO, Calendar, Drive export",
    connected: true,
    connectedAt: "1 déc 2024",
    email: "admin@company.com",
    features: [
      { id: "sso", name: "Single Sign-On", enabled: true },
      { id: "calendar", name: "Sync Calendrier", enabled: false },
      { id: "drive", name: "Export Drive", enabled: true },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    icon: "🟦",
    description: "SSO, Teams, SharePoint",
    connected: false,
    connectedAt: null,
    email: null,
    features: [
      { id: "sso", name: "Single Sign-On", enabled: false },
      { id: "teams", name: "Notifications Teams", enabled: false },
      { id: "sharepoint", name: "Sync SharePoint", enabled: false },
    ],
  },
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    description: "Notifications, Slash commands",
    connected: true,
    connectedAt: "5 déc 2024",
    workspace: "company-workspace",
    features: [
      { id: "notifications", name: "Notifications", enabled: true },
      { id: "commands", name: "Slash Commands", enabled: true },
    ],
  },
]

const webhooks = [
  {
    id: "wh_001",
    url: "https://example.com/webhooks/vyxo",
    events: ["assessment.completed", "certification.obtained"],
    active: true,
    lastTriggered: "15 déc 2024",
  },
]

const apiKeys = [
  {
    id: "key_001",
    name: "Production API",
    prefix: "vyxo_live_",
    createdAt: "1 déc 2024",
    lastUsed: "Aujourd'hui",
  },
]

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"oauth" | "webhooks" | "api">("oauth")
  const [showApiKey, setShowApiKey] = useState(false)
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Intégrations</h1>
          <p className="text-muted-foreground">
            Connectez vos outils et gérez vos API
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {(["oauth", "webhooks", "api"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "bg-vyxo-gold text-vyxo-navy" : ""}
          >
            {tab === "oauth" ? "Connexions" : tab === "webhooks" ? "Webhooks" : "Clés API"}
          </Button>
        ))}
      </div>

      {/* OAuth Integrations */}
      {activeTab === "oauth" && (
        <div className="space-y-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="bento-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{integration.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{integration.name}</h3>
                        {integration.connected ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500">
                            <Check className="w-3 h-3 mr-1" />
                            Connecté
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Non connecté</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      {integration.connected && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Connecté le {integration.connectedAt} {integration.email && `• ${integration.email}`}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant={integration.connected ? "outline" : "default"}
                    className={!integration.connected ? "bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90" : ""}
                  >
                    {integration.connected ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Déconnecter
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Connecter
                      </>
                    )}
                  </Button>
                </div>

                {integration.connected && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3">Fonctionnalités</p>
                    <div className="flex flex-wrap gap-4">
                      {integration.features.map((feature) => (
                        <div key={feature.id} className="flex items-center gap-2">
                          <Switch checked={feature.enabled} id={`${integration.id}-${feature.id}`} />
                          <Label htmlFor={`${integration.id}-${feature.id}`} className="text-sm">
                            {feature.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Webhooks */}
      {activeTab === "webhooks" && (
        <div className="space-y-4">
          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Webhooks configurés</CardTitle>
                <Button className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
              <CardDescription>
                Recevez des notifications en temps réel pour les événements importants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {webhooks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucun webhook configuré
                </p>
              ) : (
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <div 
                      key={webhook.id}
                      className="flex items-center justify-between p-4 rounded-xl border"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm bg-secondary px-2 py-0.5 rounded">{webhook.url}</code>
                          <Badge variant={webhook.active ? "default" : "secondary"}>
                            {webhook.active ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Dernier déclenchement: {webhook.lastTriggered}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 rounded-xl bg-secondary/50">
                <p className="text-sm font-medium mb-2">Événements disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {["assessment.completed", "module.completed", "certification.obtained", "gap.identified", "alert.triggered", "user.created"].map((event) => (
                    <Badge key={event} variant="outline" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* API Keys */}
      {activeTab === "api" && (
        <div className="space-y-4">
          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Clés API</CardTitle>
                <Button className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une clé
                </Button>
              </div>
              <CardDescription>
                Gérez vos clés d'accès à l'API VYXO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div 
                    key={key.id}
                    className="flex items-center justify-between p-4 rounded-xl border"
                  >
                    <div>
                      <p className="font-medium">{key.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-sm bg-secondary px-2 py-0.5 rounded">
                          {showApiKey ? `${key.prefix}xxxxxxxxxxxx` : `${key.prefix}••••••••••••`}
                        </code>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Créée le {key.createdAt} • Dernière utilisation: {key.lastUsed}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-600 font-medium">⚠️ Sécurité</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ne partagez jamais vos clés API. Utilisez des variables d'environnement pour les stocker.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Documentation link */}
          <Card className="bento-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Documentation API</h3>
                  <p className="text-sm text-muted-foreground">
                    Consultez la documentation complète de l'API REST
                  </p>
                </div>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir la documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
