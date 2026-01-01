"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  Shield,
  Key,
  Smartphone,
  LogOut,
  History,
  AlertTriangle,
  Check,
  X,
  Lock
} from "lucide-react"
import Link from "next/link"

// Mock data
const mfaConfig = {
  enabled: false,
  methods: ["totp"] as const,
  backupCodes: 5,
}

const activeSessions = [
  { id: "s1", device: "Chrome - Windows", location: "Paris, France", lastActive: "Maintenant", current: true },
  { id: "s2", device: "Safari - iPhone", location: "Paris, France", lastActive: "Il y a 2h", current: false },
  { id: "s3", device: "Firefox - MacOS", location: "Lyon, France", lastActive: "Hier", current: false },
]

const recentSecurityEvents = [
  { id: "e1", action: "Connexion réussie", device: "Chrome", location: "Paris", time: "Il y a 5 min", status: "success" },
  { id: "e2", action: "Mot de passe modifié", device: "-", location: "Paris", time: "Il y a 2 jours", status: "success" },
  { id: "e3", action: "Échec de connexion", device: "Unknown", location: "Amsterdam", time: "Il y a 5 jours", status: "failure" },
]

export default function SecurityPage() {
  const [mfa, setMfa] = useState(mfaConfig)
  const [showMfaSetup, setShowMfaSetup] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  
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
          <h1 className="text-3xl font-bold">Sécurité</h1>
          <p className="text-muted-foreground">
            Gérez la sécurité de votre compte
          </p>
        </div>
      </div>

      {/* Password */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Mot de passe
          </CardTitle>
          <CardDescription>
            Dernière modification: il y a 30 jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showPasswordChange ? (
            <Button onClick={() => setShowPasswordChange(true)}>
              Modifier le mot de passe
            </Button>
          ) : (
            <div className="space-y-4">
              <Input type="password" placeholder="Mot de passe actuel" />
              <Input type="password" placeholder="Nouveau mot de passe" />
              <Input type="password" placeholder="Confirmer le nouveau mot de passe" />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPasswordChange(false)}>
                  Annuler
                </Button>
                <Button className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90">
                  Enregistrer
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* MFA */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Authentification à deux facteurs (2FA)
          </CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Status 2FA</p>
              <p className="text-sm text-muted-foreground">
                {mfa.enabled ? "Activé avec une application d'authentification" : "Non activé"}
              </p>
            </div>
            <Badge className={mfa.enabled ? "bg-emerald-500" : "bg-orange-500"}>
              {mfa.enabled ? "Actif" : "Inactif"}
            </Badge>
          </div>
          
          {!mfa.enabled && !showMfaSetup && (
            <Button onClick={() => setShowMfaSetup(true)}>
              <Shield className="w-4 h-4 mr-2" />
              Activer la 2FA
            </Button>
          )}
          
          {showMfaSetup && (
            <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm">1. Scannez ce QR code avec votre application d'authentification</p>
              <div className="w-40 h-40 bg-white rounded-lg mx-auto flex items-center justify-center">
                <span className="text-xs text-muted-foreground">[QR Code]</span>
              </div>
              <p className="text-sm">2. Entrez le code à 6 chiffres</p>
              <Input placeholder="000000" maxLength={6} className="text-center text-2xl tracking-widest" />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowMfaSetup(false)}>
                  Annuler
                </Button>
                <Button 
                  className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
                  onClick={() => {
                    setMfa({...mfa, enabled: true})
                    setShowMfaSetup(false)
                  }}
                >
                  Vérifier et activer
                </Button>
              </div>
            </div>
          )}
          
          {mfa.enabled && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Codes de récupération restants: {mfa.backupCodes}
              </p>
              <div className="flex gap-2">
                <Button variant="outline">Générer nouveaux codes</Button>
                <Button variant="destructive" onClick={() => setMfa({...mfa, enabled: false})}>
                  Désactiver 2FA
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Sessions actives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div 
                key={session.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  session.current ? "border-emerald-500/30 bg-emerald-500/5" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    session.current ? "bg-emerald-500/10" : "bg-secondary"
                  }`}>
                    <Lock className={`w-5 h-5 ${session.current ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && <Badge className="bg-emerald-500">Session actuelle</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <X className="w-4 h-4 mr-1" />
                    Déconnecter
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 text-red-500">
            Déconnecter toutes les autres sessions
          </Button>
        </CardContent>
      </Card>

      {/* Security Log */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Activité de sécurité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSecurityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  {event.status === "success" ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{event.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.device} • {event.location}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/audit-logs">
            <Button variant="outline" className="w-full mt-4">
              Voir tous les logs
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
