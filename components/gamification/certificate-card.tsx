"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, CheckCircle2, Calendar, User, Building2 } from "lucide-react"

interface CertificateData {
  id: string
  recipientName: string
  certificationName: string
  certificationLevel?: string
  issuedDate: Date
  expiryDate?: Date
  issuerName: string
  issuerLogo?: string
  score?: number
  skills?: string[]
  certificateNumber: string
}

interface CertificateCardProps {
  certificate: CertificateData
  onDownload?: (certificate: CertificateData) => void
  compact?: boolean
}

export function CertificateCard({ certificate, onDownload, compact = false }: CertificateCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  const isExpired = certificate.expiryDate && new Date() > certificate.expiryDate
  const isExpiringSoon = certificate.expiryDate && 
    !isExpired && 
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) > certificate.expiryDate

  if (compact) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-700 hover:border-vyxo-gold/50 transition-all">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vyxo-gold to-yellow-600 flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{certificate.certificationName}</p>
          <p className="text-sm text-muted-foreground">{formatDate(certificate.issuedDate)}</p>
        </div>
        {isExpired ? (
          <Badge className="bg-red-500/10 text-red-500">Expiré</Badge>
        ) : isExpiringSoon ? (
          <Badge className="bg-orange-500/10 text-orange-500">Expire bientôt</Badge>
        ) : (
          <Badge className="bg-emerald-500/10 text-emerald-500">Valide</Badge>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDownload?.(certificate)}
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="bento-card overflow-hidden">
      {/* Certificate Header - Gold gradient */}
      <div className="h-32 bg-gradient-to-br from-vyxo-gold via-yellow-500 to-orange-500 relative">
        <div className="absolute inset-0 bg-[url('/patterns/certificate-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Award className="w-16 h-16 text-white/90" />
        </div>
        {/* Decorative corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-white/30" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-white/30" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-white/30" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-white/30" />
      </div>

      <CardContent className="p-6 text-center">
        {/* Status Badge */}
        <div className="flex justify-center -mt-10 mb-4">
          {isExpired ? (
            <Badge className="bg-red-500 text-white px-4 py-1 text-sm">
              Certificat Expiré
            </Badge>
          ) : (
            <Badge className="bg-emerald-500 text-white px-4 py-1 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Certificat Valide
            </Badge>
          )}
        </div>

        {/* Certification Title */}
        <h3 className="text-xl font-bold mb-1">{certificate.certificationName}</h3>
        {certificate.certificationLevel && (
          <Badge variant="outline" className="mb-4">{certificate.certificationLevel}</Badge>
        )}

        {/* Recipient */}
        <p className="text-muted-foreground mb-2">Délivré à</p>
        <p className="text-lg font-semibold mb-4">{certificate.recipientName}</p>

        {/* Score */}
        {certificate.score && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vyxo-gold/10 mb-4">
            <span className="text-vyxo-gold font-bold text-lg">{certificate.score}%</span>
            <span className="text-sm text-muted-foreground">Score obtenu</span>
          </div>
        )}

        {/* Skills */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {certificate.skills.map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="flex items-center gap-2 justify-center">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{formatDate(certificate.issuedDate)}</span>
          </div>
          {certificate.expiryDate && (
            <div className={`flex items-center gap-2 justify-center ${
              isExpired ? "text-red-500" : isExpiringSoon ? "text-orange-500" : ""
            }`}>
              <Calendar className="w-4 h-4" />
              <span>Exp: {formatDate(certificate.expiryDate)}</span>
            </div>
          )}
        </div>

        {/* Certificate Number */}
        <p className="text-xs text-muted-foreground mb-4">
          N° {certificate.certificateNumber}
        </p>

        {/* Issuer */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
          <Building2 className="w-4 h-4" />
          <span>{certificate.issuerName}</span>
        </div>

        {/* Download Button */}
        <Button 
          onClick={() => onDownload?.(certificate)}
          className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger le certificat PDF
        </Button>
      </CardContent>
    </Card>
  )
}

// Certificates List View
interface CertificatesListProps {
  certificates: CertificateData[]
  onDownload?: (certificate: CertificateData) => void
}

export function CertificatesList({ certificates, onDownload }: CertificatesListProps) {
  const validCertificates = certificates.filter(c => 
    !c.expiryDate || new Date() <= c.expiryDate
  )
  const expiredCertificates = certificates.filter(c => 
    c.expiryDate && new Date() > c.expiryDate
  )

  return (
    <div className="space-y-6">
      {validCertificates.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Certificats valides ({validCertificates.length})
          </h3>
          <div className="space-y-2">
            {validCertificates.map(cert => (
              <CertificateCard 
                key={cert.id} 
                certificate={cert} 
                compact 
                onDownload={onDownload}
              />
            ))}
          </div>
        </div>
      )}

      {expiredCertificates.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-muted-foreground">
            <Award className="w-5 h-5" />
            Certificats expirés ({expiredCertificates.length})
          </h3>
          <div className="space-y-2 opacity-60">
            {expiredCertificates.map(cert => (
              <CertificateCard 
                key={cert.id} 
                certificate={cert} 
                compact 
                onDownload={onDownload}
              />
            ))}
          </div>
        </div>
      )}

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Aucun certificat</h3>
          <p className="text-muted-foreground">
            Complétez des parcours pour obtenir vos premiers certificats
          </p>
        </div>
      )}
    </div>
  )
}

export default CertificateCard
