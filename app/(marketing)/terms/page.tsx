import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation - VYXO Codex",
  description: "Conditions générales d'utilisation de la plateforme VYXO Codex",
}

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-vyxo max-w-4xl">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Légal</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : 16 décembre 2025
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir 
            les modalités et conditions d'utilisation de la plateforme VYXO Codex (ci-après "la Plateforme"), 
            éditée par VYXO Consulting SAS.
          </p>

          <h2>2. Acceptation des conditions</h2>
          <p>
            L'utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU. 
            En créant un compte ou en utilisant nos services, vous reconnaissez avoir lu, compris et 
            accepté l'intégralité des présentes conditions.
          </p>

          <h2>3. Description des services</h2>
          <p>VYXO Codex propose les services suivants :</p>
          <ul>
            <li>Assessments de maturité opérationnelle (GDP, ISO, HACCP)</li>
            <li>Modules de formation en ligne adaptatifs</li>
            <li>Tableaux de bord et analytics de suivi</li>
            <li>Génération de rapports et certifications</li>
            <li>Outils de gestion d'équipe et d'assignation</li>
          </ul>

          <h2>4. Création de compte</h2>
          <p>
            Pour accéder aux services, l'utilisateur doit créer un compte en fournissant des informations 
            exactes et à jour. L'utilisateur est responsable de la confidentialité de ses identifiants 
            et de toute activité effectuée sous son compte.
          </p>

          <h2>5. Abonnements et paiements</h2>
          <p>
            Les services sont proposés selon différentes formules d'abonnement. Les prix sont indiqués 
            hors taxes et peuvent être modifiés avec un préavis de 30 jours. Les abonnements sont 
            renouvelés automatiquement sauf résiliation par l'utilisateur.
          </p>

          <h2>6. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de la Plateforme (textes, vidéos, images, modules de formation) 
            sont la propriété exclusive de VYXO Consulting ou de ses partenaires. Toute reproduction, 
            distribution ou modification sans autorisation préalable est interdite.
          </p>

          <h2>7. Données personnelles</h2>
          <p>
            Le traitement des données personnelles est régi par notre Politique de Confidentialité, 
            accessible à l'adresse /privacy. L'utilisateur consent au traitement de ses données 
            conformément à cette politique.
          </p>

          <h2>8. Responsabilité</h2>
          <p>
            VYXO Consulting s'engage à fournir ses services avec diligence. Toutefois, la Plateforme 
            est fournie "en l'état" et VYXO Consulting ne garantit pas l'absence d'erreurs ou 
            d'interruptions de service.
          </p>

          <h2>9. Résiliation</h2>
          <p>
            L'utilisateur peut résilier son abonnement à tout moment depuis son espace personnel. 
            VYXO Consulting se réserve le droit de suspendre ou résilier un compte en cas de 
            violation des présentes CGU.
          </p>

          <h2>10. Modification des CGU</h2>
          <p>
            VYXO Consulting peut modifier les présentes CGU à tout moment. Les utilisateurs seront 
            informés de toute modification significative par email. La continuation de l'utilisation 
            après modification vaut acceptation.
          </p>

          <h2>11. Droit applicable</h2>
          <p>
            Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la 
            compétence exclusive des tribunaux de Paris.
          </p>

          <h2>12. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l'adresse :
            <br />
            <strong>Email :</strong> legal@vyxo.fr
            <br />
            <strong>Adresse :</strong> VYXO Consulting SAS, Paris, France
          </p>
        </div>
      </div>
    </div>
  )
}
