// Service de validation SIRET via API open data
// Utilise l'API entreprises.data.gouv.fr (gratuite, sans clé API)

export interface SiretValidationResult {
  isValid: boolean
  companyName?: string
  address?: string
  postalCode?: string
  city?: string
  naf?: string
  nafLabel?: string
  legalForm?: string
  employeeRange?: string
  creationDate?: string
  error?: string
}

export interface SireneCompany {
  siret: string
  siren: string
  nom_complet: string
  nom_raison_sociale: string
  adresse: string
  code_postal: string
  libelle_commune: string
  activite_principale: string
  libelle_activite_principale: string
  nature_juridique: string
  tranche_effectif_salarie: string
  date_creation: string
}

/**
 * Valide un numéro SIRET et récupère les informations de l'entreprise
 * Utilise l'API recherche-entreprises.api.gouv.fr (100% gratuite)
 */
export async function validateSiret(siret: string): Promise<SiretValidationResult> {
  // Nettoyage du SIRET
  const cleanSiret = siret.replace(/\s/g, "")
  
  // Vérification format (14 chiffres)
  if (!/^\d{14}$/.test(cleanSiret)) {
    return {
      isValid: false,
      error: "Le SIRET doit contenir exactement 14 chiffres"
    }
  }

  // Vérification clé Luhn (algorithme de validation SIRET)
  // Note: Certains SIRET officiels (ex: La Poste) ne suivent pas l'algorithme Luhn
  // On fait juste un warning mais on continue la vérification via l'API
  if (!isValidLuhn(cleanSiret)) {
    console.warn("SIRET Luhn check failed, continuing with API validation:", cleanSiret)
  }
  
  try {
    // Utiliser l'API Recherche Entreprises (100% gratuite et ouverte)
    // Documentation: https://recherche-entreprises.api.gouv.fr/
    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${cleanSiret}`,
      {
        headers: {
          "Accept": "application/json"
        }
      }
    )

    if (!response.ok) {
      // Si erreur, essayer de parser le message
      if (response.status === 404) {
        return {
          isValid: false,
          error: "SIRET non trouvé dans la base INSEE"
        }
      }
      return {
        isValid: false,
        error: "Erreur lors de la validation du SIRET"
      }
    }

    const data = await response.json()

    // Vérifier si des résultats ont été trouvés
    if (!data || !data.results || data.results.length === 0) {
      return {
        isValid: false,
        error: "Aucune entreprise trouvée pour ce SIRET"
      }
    }

    // Trouver l'entreprise correspondante au SIRET exact
    const company = data.results.find((r: { siege?: { siret?: string } }) => 
      r.siege?.siret === cleanSiret
    ) || data.results[0]

    if (!company) {
      return {
        isValid: false,
        error: "SIRET non trouvé"
      }
    }

    // Extraire les informations de la réponse
    return {
      isValid: true,
      companyName: company.nom_complet || company.nom_raison_sociale || "Entreprise",
      address: company.siege?.adresse,
      postalCode: company.siege?.code_postal,
      city: company.siege?.libelle_commune,
      naf: company.activite_principale,
      nafLabel: company.libelle_activite_principale,
      legalForm: company.nature_juridique,
      employeeRange: company.tranche_effectif_salarie,
      creationDate: company.date_creation
    }

  } catch (error) {
    console.error("Erreur validation SIRET:", error)
    return {
      isValid: false,
      error: "Impossible de valider le SIRET. Veuillez réessayer."
    }
  }
}

/**
 * Algorithme de Luhn pour validation des numéros SIRET/SIREN
 */
function isValidLuhn(siret: string): boolean {
  let sum = 0
  for (let i = 0; i < siret.length; i++) {
    let digit = parseInt(siret[siret.length - 1 - i], 10)
    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
  }
  return sum % 10 === 0
}

/**
 * Formatte un SIRET pour l'affichage (XXX XXX XXX XXXXX)
 */
export function formatSiret(siret: string): string {
  const clean = siret.replace(/\D/g, "").slice(0, 14)
  if (clean.length <= 3) return clean
  if (clean.length <= 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`
  if (clean.length <= 9) return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`
  return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`
}
