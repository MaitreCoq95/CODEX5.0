// GDPR (RGPD) Compliance Service
// Handles consent, data deletion, data export, and privacy controls

import { auditService } from "./audit-service"

export interface DataProcessingConsent {
  userId: string
  purposes: {
    essential: boolean        // Always true, required for service
    analytics: boolean        // Usage analytics
    marketing: boolean        // Marketing communications
    thirdPartySharing: boolean // Data sharing with partners
  }
  grantedAt: Date
  updatedAt: Date
  revokedAt?: Date
  ipAddress: string
  source: "registration" | "settings" | "cookie_banner"
}

export interface DataDeletionRequest {
  id: string
  userId: string
  requestedAt: Date
  reason?: string
  status: "pending" | "processing" | "completed" | "rejected"
  completedAt?: Date
  dataCategories: string[]
  retentionExceptions: string[] // Data that cannot be deleted (legal requirements)
}

export interface UserDataExport {
  userId: string
  generatedAt: Date
  format: "json" | "csv"
  categories: string[]
  downloadUrl?: string
  expiresAt: Date
}

export interface PrivacySettings {
  userId: string
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  activityTracking: boolean
  profileVisibility: "public" | "team" | "private"
  dataRetentionMonths: number
}

// In-memory stores for demo
const consents: Map<string, DataProcessingConsent> = new Map()
const deletionRequests: DataDeletionRequest[] = []
const privacySettings: Map<string, PrivacySettings> = new Map()

export class GDPRService {
  
  /**
   * Record user consent
   */
  async recordConsent(params: {
    userId: string
    purposes: DataProcessingConsent["purposes"]
    ipAddress: string
    source: DataProcessingConsent["source"]
  }): Promise<DataProcessingConsent> {
    const consent: DataProcessingConsent = {
      userId: params.userId,
      purposes: {
        essential: true, // Always true
        analytics: params.purposes.analytics,
        marketing: params.purposes.marketing,
        thirdPartySharing: params.purposes.thirdPartySharing,
      },
      grantedAt: new Date(),
      updatedAt: new Date(),
      ipAddress: params.ipAddress,
      source: params.source,
    }
    
    consents.set(params.userId, consent)
    
    // Log the consent
    await auditService.log({
      userId: params.userId,
      userEmail: "user@example.com", // In production, get from user data
      action: "consent.granted",
      resource: "consent",
      metadata: { purposes: consent.purposes },
      ipAddress: params.ipAddress,
      result: "success",
      organizationId: "org-1",
    })
    
    return consent
  }
  
  /**
   * Update consent preferences
   */
  async updateConsent(userId: string, purposes: Partial<DataProcessingConsent["purposes"]>): Promise<DataProcessingConsent | null> {
    const existing = consents.get(userId)
    if (!existing) return null
    
    existing.purposes = {
      ...existing.purposes,
      ...purposes,
      essential: true, // Cannot be disabled
    }
    existing.updatedAt = new Date()
    
    consents.set(userId, existing)
    return existing
  }
  
  /**
   * Get user consent
   */
  async getConsent(userId: string): Promise<DataProcessingConsent | null> {
    return consents.get(userId) || null
  }
  
  /**
   * Revoke all consent (except essential)
   */
  async revokeConsent(userId: string): Promise<void> {
    const consent = consents.get(userId)
    if (consent) {
      consent.purposes = {
        essential: true,
        analytics: false,
        marketing: false,
        thirdPartySharing: false,
      }
      consent.revokedAt = new Date()
      consent.updatedAt = new Date()
      consents.set(userId, consent)
    }
    
    await auditService.log({
      userId,
      userEmail: "user@example.com",
      action: "consent.revoked",
      resource: "consent",
      ipAddress: "unknown",
      result: "success",
      organizationId: "org-1",
    })
  }
  
  /**
   * Request data deletion (Right to be forgotten)
   */
  async requestDataDeletion(params: {
    userId: string
    reason?: string
    dataCategories?: string[]
  }): Promise<DataDeletionRequest> {
    const request: DataDeletionRequest = {
      id: `del_${Date.now()}`,
      userId: params.userId,
      requestedAt: new Date(),
      reason: params.reason,
      status: "pending",
      dataCategories: params.dataCategories || ["all"],
      retentionExceptions: [
        "Données de facturation (obligation légale: 10 ans)",
        "Logs de sécurité (obligation légale: 1 an)",
        "Certificats délivrés (preuve de formation)",
      ],
    }
    
    deletionRequests.push(request)
    
    await auditService.log({
      userId: params.userId,
      userEmail: "user@example.com",
      action: "data.deleted",
      resource: "user_data",
      resourceId: request.id,
      result: "success",
      organizationId: "org-1",
      ipAddress: "unknown",
    })
    
    return request
  }
  
  /**
   * Process data deletion request
   */
  async processDeletionRequest(requestId: string): Promise<DataDeletionRequest | null> {
    const request = deletionRequests.find(r => r.id === requestId)
    if (!request) return null
    
    request.status = "processing"
    
    // In production, actually delete data from all systems
    // - User profile
    // - Assessment history
    // - Module progress
    // - etc.
    
    // Simulate processing delay
    setTimeout(() => {
      request.status = "completed"
      request.completedAt = new Date()
    }, 2000)
    
    return request
  }
  
  /**
   * Get deletion request status
   */
  async getDeletionRequestStatus(requestId: string): Promise<DataDeletionRequest | null> {
    return deletionRequests.find(r => r.id === requestId) || null
  }
  
  /**
   * Export user data (Data portability)
   */
  async exportUserData(userId: string, format: "json" | "csv" = "json"): Promise<UserDataExport> {
    // In production, gather all user data from database
    const userData = {
      profile: {
        userId,
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        createdAt: "2024-01-15T10:00:00Z",
      },
      assessments: [
        { id: "a1", name: "GDP Assessment", score: 75, completedAt: "2024-12-01" },
      ],
      modules: [
        { id: "m1", name: "Introduction GDP", progress: 100, completedAt: "2024-11-15" },
      ],
      certifications: [
        { id: "c1", name: "GDP Niveau 1", issuedAt: "2024-12-15" },
      ],
      consents: consents.get(userId),
    }
    
    // Create export
    const exportData: UserDataExport = {
      userId,
      generatedAt: new Date(),
      format,
      categories: ["profile", "assessments", "modules", "certifications", "consents"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }
    
    await auditService.log({
      userId,
      userEmail: "user@example.com",
      action: "data.exported",
      resource: "user_data",
      metadata: { format, categories: exportData.categories },
      result: "success",
      organizationId: "org-1",
      ipAddress: "unknown",
    })
    
    return exportData
  }
  
  /**
   * Get/Update privacy settings
   */
  async getPrivacySettings(userId: string): Promise<PrivacySettings> {
    return privacySettings.get(userId) || {
      userId,
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      activityTracking: true,
      profileVisibility: "team",
      dataRetentionMonths: 36,
    }
  }
  
  async updatePrivacySettings(userId: string, settings: Partial<PrivacySettings>): Promise<PrivacySettings> {
    const current = await this.getPrivacySettings(userId)
    const updated = { ...current, ...settings }
    privacySettings.set(userId, updated)
    return updated
  }
  
  /**
   * Get GDPR-compliant data retention policy
   */
  getRetentionPolicy(): {
    category: string
    retentionPeriod: string
    legalBasis: string
  }[] {
    return [
      { category: "Profil utilisateur", retentionPeriod: "Jusqu'à suppression du compte", legalBasis: "Exécution du contrat" },
      { category: "Historique de formation", retentionPeriod: "5 ans après dernière activité", legalBasis: "Obligation légale" },
      { category: "Certifications", retentionPeriod: "10 ans", legalBasis: "Obligation légale" },
      { category: "Logs de connexion", retentionPeriod: "1 an", legalBasis: "Obligation légale (sécurité)" },
      { category: "Données de facturation", retentionPeriod: "10 ans", legalBasis: "Obligation fiscale" },
      { category: "Consentements", retentionPeriod: "Jusqu'à révocation + 3 ans", legalBasis: "Preuve de conformité" },
    ]
  }
}

// Export singleton
export const gdprService = new GDPRService()
