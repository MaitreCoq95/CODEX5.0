import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité - VYXO Codex",
  description: "Notre politique de confidentialité et de protection des données personnelles",
}

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-vyxo max-w-4xl">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Légal</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : 16 décembre 2025
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            VYXO Consulting SAS ("nous", "notre") s'engage à protéger la vie privée des utilisateurs 
            de la plateforme VYXO Codex. Cette politique explique comment nous collectons, utilisons 
            et protégeons vos données personnelles.
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les types de données suivants :</p>
          
          <h3>2.1 Données d'identification</h3>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email professionnelle</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Fonction et département</li>
            <li>Nom de l'organisation</li>
          </ul>

          <h3>2.2 Données d'utilisation</h3>
          <ul>
            <li>Progression dans les modules de formation</li>
            <li>Résultats des assessments et quiz</li>
            <li>Temps passé sur la plateforme</li>
            <li>Interactions avec les contenus</li>
          </ul>

          <h3>2.3 Données techniques</h3>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur</li>
            <li>Système d'exploitation</li>
            <li>Cookies et technologies similaires</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont traitées pour :</p>
          <ul>
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience d'apprentissage</li>
            <li>Générer des rapports et analytics</li>
            <li>Communiquer avec vous (notifications, support)</li>
            <li>Respecter nos obligations légales</li>
          </ul>

          <h2>4. Base légale</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li><strong>Exécution du contrat :</strong> fourniture des services</li>
            <li><strong>Intérêt légitime :</strong> amélioration des services, sécurité</li>
            <li><strong>Consentement :</strong> communications marketing</li>
            <li><strong>Obligation légale :</strong> conservation des données financières</li>
          </ul>

          <h2>5. Partage des données</h2>
          <p>
            Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :
          </p>
          <ul>
            <li>Votre organisation (pour les comptes entreprise)</li>
            <li>Nos sous-traitants techniques (hébergement, email)</li>
            <li>Autorités légales si requis par la loi</li>
          </ul>

          <h2>6. Conservation des données</h2>
          <p>
            Vos données sont conservées pendant la durée de votre abonnement, puis pendant une 
            période de 3 ans après la fin de la relation commerciale, sauf obligation légale 
            de conservation plus longue.
          </p>

          <h2>7. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
            protéger vos données : chiffrement, contrôle d'accès, audits de sécurité réguliers.
          </p>

          <h2>8. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Rectification :</strong> corriger vos données inexactes</li>
            <li><strong>Effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Limitation :</strong> restreindre le traitement</li>
            <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Opposition :</strong> vous opposer au traitement</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à privacy@vyxo.fr
          </p>

          <h2>9. Cookies</h2>
          <p>
            Nous utilisons des cookies pour le bon fonctionnement du site et l'analyse d'audience. 
            Vous pouvez gérer vos préférences via le bandeau cookies ou les paramètres de votre navigateur.
          </p>

          <h2>10. Modifications</h2>
          <p>
            Cette politique peut être mise à jour. Les changements significatifs vous seront notifiés 
            par email. La date de dernière mise à jour figure en haut de cette page.
          </p>

          <h2>11. Contact DPO</h2>
          <p>
            Pour toute question relative à la protection de vos données :
            <br />
            <strong>Email :</strong> dpo@vyxo.fr
            <br />
            <strong>Courrier :</strong> VYXO Consulting - DPO, Paris, France
          </p>
        </div>
      </div>
    </div>
  )
}
