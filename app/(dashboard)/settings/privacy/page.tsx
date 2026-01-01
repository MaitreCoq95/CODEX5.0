"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft,
  Shield,
  Download,
  Trash2,
  Eye,
  Bell,
  Lock,
  FileText,
  AlertTriangle,
  Check
} from "lucide-react"
import Link from "next/link"

// Mock data
const consent = {
  analytics: true,
  marketing: false,
  thirdPartySharing: false,
  grantedAt: "15 déc 2024",
}

const privacySettings = {
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
  activityTracking: true,
  profileVisibility: "team" as const,
}

const dataCategories = [
  { id: "profile", name: "Profil utilisateur", size: "2.3 KB" },
  { id: "assessments", name: "Historique des évaluations", size: "15.8 KB" },
  { id: "modules", name: "Progression des modules", size: "8.2 KB" },
  { id: "certifications", name: "Certifications", size: "4.1 KB" },
  { id: "activity", name: "Logs d'activité", size: "42.6 KB" },
]

const retentionPolicy = [
  { category: "Profil utilisateur", period: "Jusqu'à suppression", basis: "Contrat" },
  { category: "Historique de formation", period: "5 ans", basis: "Obligation légale" },
  { category: "Certifications", period: "10 ans", basis: "Obligation légale" },
  { category: "Logs de connexion", period: "1 an", basis: "Sécurité" },
]

export default function PrivacyPage() {
  const [consentState, setConsentState] = useState(consent)
  const [settings, setSettings] = useState(privacySettings)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [exportRequested, setExportRequested] = useState(false)
  
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Confidentialité & RGPD</h1>
          <p className="text-muted-foreground">
            Gérez vos données personnelles et vos préférences
          </p>
        </div>
      </div>

      {/* Consent Management */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Consentements
          </CardTitle>
          <CardDescription>
            Dernière mise à jour: {consent.grantedAt}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Cookies essentiels</p>
              <p className="text-sm text-muted-foreground">Nécessaires au fonctionnement du service</p>
            </div>
            <Badge className="bg-emerald-500">Requis</Badge>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Analytics</p>
              <p className="text-sm text-muted-foreground">Statistiques d'utilisation anonymisées</p>
            </div>
            <Switch 
              checked={consentState.analytics} 
              onCheckedChange={(c) => setConsentState({...consentState, analytics: c})}
            />
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Communications marketing</p>
              <p className="text-sm text-muted-foreground">Newsletters et offres promotionnelles</p>
            </div>
            <Switch 
              checked={consentState.marketing} 
              onCheckedChange={(c) => setConsentState({...consentState, marketing: c})}
            />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Partage avec des tiers</p>
              <p className="text-sm text-muted-foreground">Partenaires et prestataires</p>
            </div>
            <Switch 
              checked={consentState.thirdPartySharing} 
              onCheckedChange={(c) => setConsentState({...consentState, thirdPartySharing: c})}
            />
          </div>
          
          <Button className="w-full mt-4">Enregistrer les préférences</Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Préférences de notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">Notifications par email</Label>
            <Switch 
              id="email-notif"
              checked={settings.emailNotifications} 
              onCheckedChange={(c) => setSettings({...settings, emailNotifications: c})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notif">Notifications par SMS</Label>
            <Switch 
              id="sms-notif"
              checked={settings.smsNotifications} 
              onCheckedChange={(c) => setSettings({...settings, smsNotifications: c})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="activity">Suivi d'activité (pour recommandations)</Label>
            <Switch 
              id="activity"
              checked={settings.activityTracking} 
              onCheckedChange={(c) => setSettings({...settings, activityTracking: c})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Portability */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Télécharger mes données
          </CardTitle>
          <CardDescription>
            Droit à la portabilité (Article 20 RGPD)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {dataCategories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{cat.size}</span>
              </div>
            ))}
          </div>
          
          {exportRequested ? (
            <div className="flex items-center gap-2 p-4 bg-emerald-500/10 rounded-lg">
              <Check className="w-5 h-5 text-emerald-500" />
              <span className="text-emerald-500">Export demandé - vous recevrez un email sous 24h</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setExportRequested(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Format JSON
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setExportRequested(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Format CSV
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Retention Policy */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Politique de conservation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Catégorie</th>
                  <th className="text-left py-2">Durée</th>
                  <th className="text-left py-2">Base légale</th>
                </tr>
              </thead>
              <tbody>
                {retentionPolicy.map((item, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2">{item.category}</td>
                    <td className="py-2 text-muted-foreground">{item.period}</td>
                    <td className="py-2">
                      <Badge variant="outline">{item.basis}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="bento-card border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-500">
            <Trash2 className="w-5 h-5" />
            Supprimer mes données
          </CardTitle>
          <CardDescription>
            Droit à l'effacement (Article 17 RGPD)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-orange-500/10 rounded-lg mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-orange-500">Attention</p>
                <p className="text-muted-foreground">
                  Certaines données ne peuvent pas être supprimées en raison d'obligations légales 
                  (facturation, certifications, logs de sécurité).
                </p>
              </div>
            </div>
          </div>
          
          {!showDeleteConfirm ? (
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Demander la suppression de mes données
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Êtes-vous sûr ? Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Annuler
                </Button>
                <Button variant="destructive" className="flex-1">
                  Confirmer la suppression
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legal Links */}
      <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
        <Link href="/privacy" className="hover:underline">Politique de confidentialité</Link>
        <Link href="/terms" className="hover:underline">Conditions d'utilisation</Link>
        <Link href="/gdpr" className="hover:underline">Mentions RGPD</Link>
        <a href="mailto:dpo@vyxo.fr" className="hover:underline">Contacter le DPO</a>
      </div>
    </div>
  )
}
