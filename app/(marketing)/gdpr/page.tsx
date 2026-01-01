import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  Pencil, 
  Trash2, 
  Download, 
  Ban, 
  ArrowUpDown,
  Mail
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Conformité RGPD - VYXO Codex",
  description: "Découvrez comment VYXO Codex respecte le RGPD et vos droits sur vos données personnelles",
}

const rights = [
  {
    icon: Eye,
    title: "Droit d'accès",
    description: "Vous pouvez demander une copie de toutes les données personnelles que nous détenons à votre sujet.",
    action: "Demander mes données",
  },
  {
    icon: Pencil,
    title: "Droit de rectification",
    description: "Vous pouvez corriger ou mettre à jour vos données personnelles à tout moment via votre profil.",
    action: "Modifier mon profil",
  },
  {
    icon: Trash2,
    title: "Droit à l'effacement",
    description: "Vous pouvez demander la suppression de vos données personnelles (droit à l'oubli).",
    action: "Supprimer mes données",
  },
  {
    icon: Download,
    title: "Droit à la portabilité",
    description: "Vous pouvez recevoir vos données dans un format structuré et réutilisable (JSON/CSV).",
    action: "Exporter mes données",
  },
  {
    icon: Ban,
    title: "Droit d'opposition",
    description: "Vous pouvez vous opposer au traitement de vos données pour certaines finalités.",
    action: "Gérer mes préférences",
  },
  {
    icon: ArrowUpDown,
    title: "Droit à la limitation",
    description: "Vous pouvez demander la limitation du traitement de vos données dans certains cas.",
    action: "Limiter le traitement",
  },
]

export default function GDPRPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-vyxo max-w-4xl">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Protection des données</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Conformité RGPD
          </h1>
          <p className="text-muted-foreground">
            VYXO Codex respecte le Règlement Général sur la Protection des Données (RGPD).
            Voici vos droits et comment les exercer.
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <h2>Notre engagement</h2>
          <p>
            VYXO Consulting s'engage à respecter la réglementation européenne en matière de 
            protection des données personnelles. Nous avons mis en place les mesures techniques 
            et organisationnelles nécessaires pour garantir la sécurité et la confidentialité 
            de vos données.
          </p>
          
          <h3>Principes appliqués</h3>
          <ul>
            <li><strong>Minimisation :</strong> Nous ne collectons que les données strictement nécessaires</li>
            <li><strong>Transparence :</strong> Vous êtes informé de l'utilisation de vos données</li>
            <li><strong>Sécurité :</strong> Vos données sont protégées par des mesures appropriées</li>
            <li><strong>Limitation :</strong> Les données sont conservées pendant une durée définie</li>
          </ul>
        </div>

        {/* Rights Cards */}
        <h2 className="text-2xl font-bold mb-6">Vos droits</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {rights.map((right, index) => (
            <Card key={index} className="bento-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 rounded-xl bg-vyxo-gold/10 flex items-center justify-center">
                    <right.icon className="w-5 h-5 text-vyxo-gold" />
                  </div>
                  {right.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{right.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {right.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <h2>Comment exercer vos droits ?</h2>
          <p>
            Vous pouvez exercer vos droits de plusieurs manières :
          </p>
          <ol>
            <li>
              <strong>Via votre compte :</strong> Accédez à Paramètres → Confidentialité pour 
              modifier vos préférences ou télécharger vos données.
            </li>
            <li>
              <strong>Par email :</strong> Envoyez votre demande à <a href="mailto:privacy@vyxo.fr">privacy@vyxo.fr</a> 
              avec une copie de votre pièce d'identité.
            </li>
            <li>
              <strong>Par courrier :</strong> VYXO Consulting - DPO, Paris, France
            </li>
          </ol>
          <p>
            Nous répondrons à votre demande dans un délai maximum d'un mois. Ce délai peut être 
            prolongé de deux mois supplémentaires pour les demandes complexes.
          </p>

          <h2>Délégué à la Protection des Données (DPO)</h2>
          <p>
            Pour toute question relative à la protection de vos données, vous pouvez contacter 
            notre Délégué à la Protection des Données :
          </p>
          <ul>
            <li><strong>Email :</strong> dpo@vyxo.fr</li>
            <li><strong>Courrier :</strong> VYXO Consulting - DPO, Paris, France</li>
          </ul>

          <h2>Réclamation auprès de la CNIL</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une 
            réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
          </p>
          <ul>
            <li><strong>Site web :</strong> <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a></li>
            <li><strong>Adresse :</strong> CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</li>
          </ul>
        </div>

        {/* Contact CTA */}
        <Card className="bento-card border-vyxo-gold/30 bg-vyxo-gold/5">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-vyxo-gold/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-vyxo-gold" />
              </div>
              <div>
                <h3 className="font-semibold">Une question sur vos données ?</h3>
                <p className="text-sm text-muted-foreground">Notre équipe est là pour vous aider</p>
              </div>
            </div>
            <Link href="mailto:privacy@vyxo.fr">
              <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                Contacter le DPO
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
