// RBAC (Role-Based Access Control) Service
// Manages roles, permissions, and authorization

export type Role = "super_admin" | "organization_admin" | "manager" | "user" | "auditor"

export type Permission = 
  // Users
  | "users.create" | "users.read" | "users.update" | "users.delete" | "users.read.team"
  // Modules
  | "modules.read" | "modules.create" | "modules.update" | "modules.delete" | "modules.assign" | "modules.assign.team" | "modules.enroll"
  // Assessments
  | "assessments.read" | "assessments.create" | "assessments.take" | "assessments.read.team"
  // Reports
  | "reports.read" | "reports.create" | "reports.read.team"
  // Alerts
  | "alerts.read" | "alerts.manage" | "alerts.read.team"
  // Profile
  | "profile.read" | "profile.update"
  // Certifications
  | "certifications.read" | "certifications.read.own" | "certifications.issue"
  // Audit
  | "audit_logs.read"
  // Integrations
  | "integrations.read" | "integrations.manage"
  // Settings
  | "settings.read" | "settings.update"
  // Wildcard
  | "*"

// Role permission mappings
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: ["*"],
  
  organization_admin: [
    "users.create", "users.read", "users.update", "users.delete",
    "modules.read", "modules.create", "modules.update", "modules.assign",
    "assessments.read", "assessments.create",
    "reports.read", "reports.create",
    "alerts.read", "alerts.manage",
    "certifications.read", "certifications.issue",
    "integrations.read", "integrations.manage",
    "settings.read", "settings.update",
    "profile.read", "profile.update",
  ],
  
  manager: [
    "users.read.team",
    "modules.read", "modules.assign.team",
    "assessments.read.team",
    "reports.read.team",
    "alerts.read.team",
    "certifications.read",
    "profile.read", "profile.update",
  ],
  
  user: [
    "modules.read", "modules.enroll",
    "assessments.take",
    "profile.read", "profile.update",
    "certifications.read.own",
  ],
  
  auditor: [
    "users.read",
    "assessments.read",
    "reports.read",
    "audit_logs.read",
    "certifications.read",
    "profile.read",
  ],
}

// Role hierarchy (for permission inheritance)
export const ROLE_HIERARCHY: Record<Role, number> = {
  super_admin: 100,
  organization_admin: 80,
  manager: 60,
  auditor: 40,
  user: 20,
}

export class RBACService {
  /**
   * Check if a role has a specific permission
   */
  hasPermission(role: Role, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role]
    
    // Super admin has all permissions
    if (permissions.includes("*")) return true
    
    // Check direct permission
    if (permissions.includes(permission)) return true
    
    // Check for wildcard in same category (e.g., "users.*" would grant "users.read")
    const [category] = permission.split(".")
    if (permissions.includes(`${category}.*` as Permission)) return true
    
    return false
  }
  
  /**
   * Check if a role has ALL of the specified permissions
   */
  hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    return permissions.every(p => this.hasPermission(role, p))
  }
  
  /**
   * Check if a role has ANY of the specified permissions
   */
  hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    return permissions.some(p => this.hasPermission(role, p))
  }
  
  /**
   * Get all permissions for a role
   */
  getPermissions(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role]
  }
  
  /**
   * Check if role A is higher than role B in hierarchy
   */
  isHigherRole(roleA: Role, roleB: Role): boolean {
    return ROLE_HIERARCHY[roleA] > ROLE_HIERARCHY[roleB]
  }
  
  /**
   * Get role display name
   */
  getRoleDisplayName(role: Role): string {
    const names: Record<Role, string> = {
      super_admin: "Super Administrateur",
      organization_admin: "Administrateur Organisation",
      manager: "Manager",
      user: "Utilisateur",
      auditor: "Auditeur",
    }
    return names[role]
  }
  
  /**
   * Check if user can manage another user based on roles
   */
  canManageUser(actorRole: Role, targetRole: Role): boolean {
    if (actorRole === "super_admin") return true
    if (actorRole === "organization_admin" && targetRole !== "super_admin") return true
    return false
  }
  
  /**
   * Authorization middleware helper
   */
  authorize(userRole: Role, requiredPermissions: Permission[]): { authorized: boolean; missingPermissions: Permission[] } {
    const missing = requiredPermissions.filter(p => !this.hasPermission(userRole, p))
    return {
      authorized: missing.length === 0,
      missingPermissions: missing,
    }
  }
}

// Authorization error
export class AuthorizationError extends Error {
  public statusCode = 403
  public missingPermissions: Permission[]
  
  constructor(message: string, missingPermissions: Permission[] = []) {
    super(message)
    this.name = "AuthorizationError"
    this.missingPermissions = missingPermissions
  }
}

// Export singleton
export const rbacService = new RBACService()

// Helper function for API routes
export function requirePermissions(userRole: Role, permissions: Permission[]) {
  const result = rbacService.authorize(userRole, permissions)
  if (!result.authorized) {
    throw new AuthorizationError(
      `Permissions insuffisantes: ${result.missingPermissions.join(", ")}`,
      result.missingPermissions
    )
  }
}
