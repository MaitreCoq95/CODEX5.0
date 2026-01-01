// Audit Logging Service
// Tracks all security-relevant actions in the system

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.failed_login"
  | "user.created"
  | "user.updated"
  | "user.deleted"
  | "user.password_changed"
  | "user.role_changed"
  | "assessment.started"
  | "assessment.completed"
  | "assessment.failed"
  | "module.enrolled"
  | "module.completed"
  | "certification.issued"
  | "certification.revoked"
  | "report.generated"
  | "report.exported"
  | "settings.updated"
  | "data.exported"
  | "data.deleted"
  | "permission.changed"
  | "integration.connected"
  | "integration.disconnected"
  | "consent.granted"
  | "consent.revoked"

export interface AuditLog {
  id: string
  timestamp: Date
  userId: string
  userEmail: string
  action: AuditAction
  resource: string
  resourceId?: string
  changes?: {
    before: Record<string, any>
    after: Record<string, any>
  }
  metadata?: Record<string, any>
  ipAddress: string
  userAgent: string
  result: "success" | "failure"
  errorMessage?: string
  organizationId: string
}

export interface AuditLogFilter {
  userId?: string
  action?: AuditAction
  resource?: string
  result?: "success" | "failure"
  startDate?: Date
  endDate?: Date
  organizationId?: string
}

// In-memory store for demo (use database in production)
const auditLogs: AuditLog[] = []

export class AuditService {
  /**
   * Log an action
   */
  async log(params: {
    userId: string
    userEmail: string
    action: AuditAction
    resource: string
    resourceId?: string
    changes?: { before: Record<string, any>; after: Record<string, any> }
    metadata?: Record<string, any>
    ipAddress?: string
    userAgent?: string
    result: "success" | "failure"
    errorMessage?: string
    organizationId: string
  }): Promise<AuditLog> {
    const log: AuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      userId: params.userId,
      userEmail: params.userEmail,
      action: params.action,
      resource: params.resource,
      resourceId: params.resourceId,
      changes: params.changes,
      metadata: params.metadata,
      ipAddress: params.ipAddress || "unknown",
      userAgent: params.userAgent || "unknown",
      result: params.result,
      errorMessage: params.errorMessage,
      organizationId: params.organizationId,
    }
    
    // In production, save to database
    auditLogs.push(log)
    
    // Keep only last 10000 logs in memory
    if (auditLogs.length > 10000) {
      auditLogs.shift()
    }
    
    // Log to console for debugging
    console.log(`[AUDIT] ${log.action} by ${log.userEmail} - ${log.result}`)
    
    return log
  }
  
  /**
   * Query audit logs
   */
  async query(filter: AuditLogFilter, limit: number = 100, offset: number = 0): Promise<{
    logs: AuditLog[]
    total: number
  }> {
    let filtered = [...auditLogs]
    
    if (filter.userId) {
      filtered = filtered.filter(l => l.userId === filter.userId)
    }
    if (filter.action) {
      filtered = filtered.filter(l => l.action === filter.action)
    }
    if (filter.resource) {
      filtered = filtered.filter(l => l.resource === filter.resource)
    }
    if (filter.result) {
      filtered = filtered.filter(l => l.result === filter.result)
    }
    if (filter.startDate) {
      filtered = filtered.filter(l => new Date(l.timestamp) >= filter.startDate!)
    }
    if (filter.endDate) {
      filtered = filtered.filter(l => new Date(l.timestamp) <= filter.endDate!)
    }
    if (filter.organizationId) {
      filtered = filtered.filter(l => l.organizationId === filter.organizationId)
    }
    
    // Sort by timestamp descending
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    return {
      logs: filtered.slice(offset, offset + limit),
      total: filtered.length,
    }
  }
  
  /**
   * Get audit log by ID
   */
  async getById(id: string): Promise<AuditLog | null> {
    return auditLogs.find(l => l.id === id) || null
  }
  
  /**
   * Get recent activity for a user
   */
  async getUserActivity(userId: string, limit: number = 10): Promise<AuditLog[]> {
    const result = await this.query({ userId }, limit)
    return result.logs
  }
  
  /**
   * Get security events (failed logins, permission changes, etc.)
   */
  async getSecurityEvents(organizationId: string, limit: number = 50): Promise<AuditLog[]> {
    const securityActions: AuditAction[] = [
      "user.failed_login",
      "user.password_changed",
      "user.role_changed",
      "permission.changed",
      "data.exported",
      "data.deleted",
    ]
    
    const allLogs = await this.query({ organizationId })
    return allLogs.logs
      .filter(l => securityActions.includes(l.action))
      .slice(0, limit)
  }
  
  /**
   * Export audit logs for compliance
   */
  async exportLogs(filter: AuditLogFilter): Promise<string> {
    const result = await this.query(filter, 10000)
    
    // Generate CSV
    const headers = ["ID", "Timestamp", "User", "Action", "Resource", "Result", "IP Address"]
    const rows = result.logs.map(l => [
      l.id,
      l.timestamp.toISOString(),
      l.userEmail,
      l.action,
      `${l.resource}${l.resourceId ? `/${l.resourceId}` : ""}`,
      l.result,
      l.ipAddress,
    ])
    
    return [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
  }
  
  /**
   * Get action display name
   */
  getActionDisplayName(action: AuditAction): string {
    const names: Record<AuditAction, string> = {
      "user.login": "Connexion",
      "user.logout": "Déconnexion",
      "user.failed_login": "Échec de connexion",
      "user.created": "Utilisateur créé",
      "user.updated": "Utilisateur modifié",
      "user.deleted": "Utilisateur supprimé",
      "user.password_changed": "Mot de passe modifié",
      "user.role_changed": "Rôle modifié",
      "assessment.started": "Assessment démarré",
      "assessment.completed": "Assessment terminé",
      "assessment.failed": "Assessment échoué",
      "module.enrolled": "Inscription module",
      "module.completed": "Module terminé",
      "certification.issued": "Certification délivrée",
      "certification.revoked": "Certification révoquée",
      "report.generated": "Rapport généré",
      "report.exported": "Rapport exporté",
      "settings.updated": "Paramètres modifiés",
      "data.exported": "Données exportées",
      "data.deleted": "Données supprimées",
      "permission.changed": "Permission modifiée",
      "integration.connected": "Intégration connectée",
      "integration.disconnected": "Intégration déconnectée",
      "consent.granted": "Consentement accordé",
      "consent.revoked": "Consentement révoqué",
    }
    return names[action]
  }
}

// Export singleton
export const auditService = new AuditService()
