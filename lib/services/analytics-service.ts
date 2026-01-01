// Service Analytics pour tracking des events funnel landing page
// Supporte Google Analytics 4, Mixpanel et events custom

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    mixpanel?: {
      track: (event: string, props?: Record<string, unknown>) => void
      identify: (id: string) => void
      people: {
        set: (props: Record<string, unknown>) => void
      }
    }
  }
}

export type FunnelStep = 
  | "page_view"
  | "role_selected"
  | "form_started"
  | "form_field_filled"
  | "form_submitted"
  | "maturity_started"
  | "maturity_completed"
  | "maturity_skipped"
  | "score_viewed"
  | "modules_viewed"
  | "cta_clicked"
  | "confirmation_viewed"
  | "email_sent"
  | "share_link_copied"
  | "director_invited"

export interface AnalyticsEvent {
  event: FunnelStep
  properties?: Record<string, unknown>
}

/**
 * Envoie un event à Google Analytics 4
 */
function sendToGA4(event: FunnelStep, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, {
      event_category: "landing_funnel",
      ...properties
    })
  }
}

/**
 * Envoie un event à Mixpanel
 */
function sendToMixpanel(event: FunnelStep, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.track(event, {
      source: "landing_page",
      ...properties
    })
  }
}

/**
 * Log en console pour debug
 */
function logEvent(event: FunnelStep, properties?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 [Analytics] ${event}`, properties || "")
  }
}

/**
 * Track un event funnel
 */
export function trackEvent(event: FunnelStep, properties?: Record<string, unknown>) {
  logEvent(event, properties)
  sendToGA4(event, properties)
  sendToMixpanel(event, properties)
}

// ============================================
// EVENTS PRÉ-DÉFINIS POUR LE FUNNEL
// ============================================

/**
 * Page landing vue
 */
export function trackPageView(variant: string = "A") {
  trackEvent("page_view", {
    page: "/landing",
    variant,
    timestamp: new Date().toISOString()
  })
}

/**
 * Rôle sélectionné (Dirigeant/Manager)
 */
export function trackRoleSelected(role: "dirigeant" | "manager") {
  trackEvent("role_selected", {
    role,
    is_decision_maker: role === "dirigeant"
  })
}

/**
 * Formulaire commencé (premier champ rempli)
 */
export function trackFormStarted(firstField: string) {
  trackEvent("form_started", {
    first_field: firstField
  })
}

/**
 * Champ du formulaire rempli
 */
export function trackFieldFilled(fieldName: string, fieldValue?: string | number) {
  trackEvent("form_field_filled", {
    field: fieldName,
    has_value: !!fieldValue
  })
}

/**
 * Formulaire soumis
 */
export function trackFormSubmitted(data: {
  role: string
  companySize: string
  certificationCount: number
  hasSiret: boolean
}) {
  trackEvent("form_submitted", {
    role: data.role,
    company_size: data.companySize,
    certification_count: data.certificationCount,
    has_siret: data.hasSiret
  })
}

/**
 * Questions de maturité démarrées
 */
export function trackMaturityStarted(questionCount: number) {
  trackEvent("maturity_started", {
    total_questions: questionCount
  })
}

/**
 * Questions de maturité terminées
 */
export function trackMaturityCompleted(data: {
  answeredCount: number
  totalCount: number
  score: number
}) {
  trackEvent("maturity_completed", {
    answered: data.answeredCount,
    total: data.totalCount,
    completion_rate: Math.round((data.answeredCount / data.totalCount) * 100),
    maturity_score: data.score
  })
}

/**
 * Questions de maturité passées
 */
export function trackMaturitySkipped() {
  trackEvent("maturity_skipped")
}

/**
 * Score affiché
 */
export function trackScoreViewed(data: {
  leadScore: number
  maturityScore: number
  level: string
  priority: string
}) {
  trackEvent("score_viewed", {
    lead_score: data.leadScore,
    maturity_score: data.maturityScore,
    level: data.level,
    priority: data.priority
  })
}

/**
 * Modules preview vus
 */
export function trackModulesViewed(data: {
  normsCount: number
  freeModules: number
  lockedModules: number
}) {
  trackEvent("modules_viewed", {
    norms_selected: data.normsCount,
    free_modules: data.freeModules,
    locked_modules: data.lockedModules
  })
}

/**
 * CTA final cliqué
 */
export function trackCTAClicked(destination: string) {
  trackEvent("cta_clicked", {
    destination,
    timestamp: new Date().toISOString()
  })
}

/**
 * Page confirmation vue
 */
export function trackConfirmationViewed(role: "dirigeant" | "manager", score: number) {
  trackEvent("confirmation_viewed", {
    role,
    score
  })
}

/**
 * Lien de partage copié
 */
export function trackShareLinkCopied() {
  trackEvent("share_link_copied")
}

/**
 * Invitation dirigeant envoyée
 */
export function trackDirectorInvited() {
  trackEvent("director_invited")
}

// ============================================
// IDENTIFICATION UTILISATEUR
// ============================================

/**
 * Identifie l'utilisateur dans Mixpanel
 */
export function identifyUser(email: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.identify(email)
    if (properties) {
      window.mixpanel.people.set(properties)
    }
  }
}
