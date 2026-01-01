import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Award,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"

// Mock certifications data
const certifications = [
  {
    id: "cert-gdp-1",
    name: "GDP Niveau 1",
    issuer: "VYXO Academy",
    certificateNumber: "GDP-2024-003847",
    obtainedAt: "2024-12-15",
    expiresAt: "2025-12-15",
    status: "valid",
    score: 85,
    pdfUrl: "/certificates/gdp-level1.pdf",
    badgeUrl: "/badges/gdp-level1.png",
    modules: ["Introduction GDP", "Système Qualité", "Documentation", "Chaîne du Froid"],
    verificationUrl: "https://verify.vyxo.fr/GDP-2024-003847",
  },
]

const availableCertifications = [
  {
    id: "cert-gdp-2",
    name: "GDP Niveau 2",
    description: "Certification avancée pour les responsables qualité",
    modules: 8,
    assessmentScore: 75,
    estimatedDuration: "20h",
    status: "locked",
    progress: 45,
  },
  {
    id: "cert-iso-9001",
    name: "ISO 9001 Fundamentals",
    description: "Bases du management de la qualité",
    modules: 6,
    assessmentScore: 70,
    estimatedDuration: "15h",
    status: "available",
    progress: 0,
  },
]

function getStatusBadge(status: string, expiresAt?: string) {
  if (status === "valid") {
    const expDate = expiresAt ? new Date(expiresAt) : null
    const now = new Date()
    const daysUntilExpiry = expDate ? Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 999
    
    if (daysUntilExpiry <= 30) {
      return <Badge className="bg-orange-500/10 text-orange-500">Expire bientôt</Badge>
    }
    return <Badge className="bg-emerald-500/10 text-emerald-500">Valide</Badge>
  }
  if (status === "expired") {
    return <Badge className="bg-red-500/10 text-red-500">Expiré</Badge>
  }
  return <Badge variant="secondary">En attente</Badge>
}

export default function CertificationsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes Certifications</h1>
          <p className="text-muted-foreground">
            Vos diplômes et certificats obtenus
          </p>
        </div>
        <Link href="/assessments">
          <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
            <Award className="w-4 h-4 mr-2" />
            Passer une certification
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">{certifications.length}</p>
            <p className="text-sm text-muted-foreground">Certifications obtenues</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{availableCertifications.filter(c => c.status === "available").length}</p>
            <p className="text-sm text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto text-vyxo-gold mb-2" />
            <p className="text-2xl font-bold">{availableCertifications.filter(c => c.progress > 0).length}</p>
            <p className="text-sm text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Obtained Certifications */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications Obtenues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {certifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucune certification obtenue pour le moment
            </p>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="p-6 rounded-xl border bg-gradient-to-r from-vyxo-gold/5 to-transparent border-vyxo-gold/30"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Certificate Icon */}
                      <div className="w-16 h-16 rounded-xl bg-vyxo-gold/10 flex items-center justify-center shrink-0">
                        <Award className="w-8 h-8 text-vyxo-gold" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{cert.name}</h3>
                          {getStatusBadge(cert.status, cert.expiresAt)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Délivré par {cert.issuer} • N° {cert.certificateNumber}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Obtenu le {new Date(cert.obtainedAt).toLocaleDateString("fr-FR")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Expire le {new Date(cert.expiresAt).toLocaleDateString("fr-FR")}
                          </span>
                          <span className="text-emerald-500 font-medium">
                            Score: {cert.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Vérifier
                      </Button>
                    </div>
                  </div>
                  
                  {/* Modules included */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Modules validés:</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.modules.map((mod, i) => (
                        <Badge key={i} variant="secondary">{mod}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Certifications */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>Certifications Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {availableCertifications.map((cert) => (
              <div 
                key={cert.id}
                className={`p-4 rounded-xl border ${
                  cert.status === "available" 
                    ? "border-blue-500/30 bg-blue-500/5" 
                    : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                  <Badge variant={cert.status === "available" ? "default" : "secondary"}>
                    {cert.status === "available" ? "Disponible" : "Verrouillé"}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>{cert.modules} modules</span>
                  <span>{cert.estimatedDuration}</span>
                  <span>Score min: {cert.assessmentScore}%</span>
                </div>
                
                {cert.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progression</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-vyxo-gold"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <Link href={cert.status === "available" ? `/learning/path?cert=${cert.id}` : "#"}>
                  <Button 
                    className="w-full" 
                    disabled={cert.status === "locked"}
                    variant={cert.status === "available" ? "default" : "secondary"}
                  >
                    {cert.progress > 0 ? "Continuer" : "Commencer"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
