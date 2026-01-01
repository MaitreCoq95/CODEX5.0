import { prisma } from '../index';

/**
 * Default alert rules to seed
 */
const DEFAULT_RULES = [
  {
    name: 'Score Global Faible',
    description: 'Alerte quand le score moyen est inférieur à 60%',
    metric: 'avg_score',
    operator: 'lt',
    threshold: 60,
    severity: 'warning',
    notifyChannels: ['in_app', 'email'],
    notifyRoles: ['user', 'manager'],
    cooldownMinutes: 1440, // 24 hours
  },
  {
    name: 'Inactivité Prolongée',
    description: 'Alerte après 14 jours sans activité',
    metric: 'days_inactive',
    operator: 'gt',
    threshold: 14,
    severity: 'warning',
    notifyChannels: ['email'],
    notifyRoles: ['user', 'manager'],
    cooldownMinutes: 10080, // 7 days
  },
  {
    name: 'Taux Échec Quiz Élevé',
    description: 'Alerte quand le taux d\'échec aux quiz dépasse 50%',
    metric: 'quiz_failure_rate',
    operator: 'gt',
    threshold: 50,
    severity: 'warning',
    notifyChannels: ['in_app'],
    notifyRoles: ['user'],
    cooldownMinutes: 4320, // 3 days
  },
  {
    name: 'Score Critique',
    description: 'Alerte urgente quand le score est inférieur à 40%',
    metric: 'avg_score',
    operator: 'lt',
    threshold: 40,
    severity: 'critical',
    notifyChannels: ['in_app', 'email'],
    notifyRoles: ['user', 'manager', 'admin'],
    cooldownMinutes: 1440, // 24 hours
  },
  {
    name: 'Félicitations Streak',
    description: 'Notification positive pour un streak de 7 jours',
    metric: 'current_streak',
    operator: 'gte',
    threshold: 7,
    severity: 'info',
    notifyChannels: ['in_app'],
    notifyRoles: ['user'],
    cooldownMinutes: 10080, // 7 days
  },
];

/**
 * Recommended actions based on alert type
 */
const RECOMMENDED_ACTIONS: Record<string, string[]> = {
  avg_score: [
    'Réviser les modules avec les scores les plus bas',
    'Reprendre les quiz échoués',
    'Consulter les ressources complémentaires',
  ],
  days_inactive: [
    'Se reconnecter à la plateforme',
    'Reprendre la progression là où vous vous êtes arrêté',
    'Planifier des sessions d\'apprentissage régulières',
  ],
  quiz_failure_rate: [
    'Relire les leçons avant de retenter les quiz',
    'Prendre des notes pendant l\'apprentissage',
    'Demander de l\'aide si nécessaire',
  ],
  current_streak: [
    'Continuez comme ça !',
    'Débloquer le prochain objectif streak',
  ],
};

export class AlertingService {
  /**
   * Seed default rules if none exist
   */
  async seedDefaultRules(): Promise<void> {
    const existingCount = await prisma.alertRule.count();
    
    if (existingCount === 0) {
      console.log('📋 Seeding default alert rules...');
      
      for (const rule of DEFAULT_RULES) {
        await prisma.alertRule.create({
          data: rule,
        });
      }
      
      console.log(`✅ Created ${DEFAULT_RULES.length} default alert rules`);
    }
  }

  /**
   * Evaluate all active rules
   */
  async evaluateAllRules(): Promise<void> {
    console.log('🔍 Evaluating alert rules...');
    
    const rules = await prisma.alertRule.findMany({
      where: { enabled: true },
    });

    // Get all users with progress
    const users = await prisma.userProgress.findMany();

    for (const rule of rules) {
      // Check cooldown
      if (rule.lastTriggeredAt) {
        const cooldownMs = rule.cooldownMinutes * 60 * 1000;
        const timeSinceLastTrigger = Date.now() - rule.lastTriggeredAt.getTime();
        
        if (timeSinceLastTrigger < cooldownMs) {
          continue; // Skip this rule, still in cooldown
        }
      }

      // Evaluate rule for each user
      for (const user of users) {
        await this.evaluateRuleForUser(rule, user);
      }
    }

    console.log('✅ Alert evaluation complete');
  }

  /**
   * Evaluate a single rule for a user
   */
  async evaluateRuleForUser(rule: any, userProgress: any): Promise<void> {
    const value = await this.getMetricValue(rule.metric, userProgress);
    
    if (value === null) return;

    const triggered = this.checkCondition(value, rule.operator, rule.threshold);

    if (triggered) {
      await this.createAlert(rule, userProgress.userId, value);
    }
  }

  /**
   * Get metric value for a user
   */
  async getMetricValue(metric: string, userProgress: any): Promise<number | null> {
    switch (metric) {
      case 'avg_score':
        return userProgress.avgScore || 0;

      case 'current_streak':
        return userProgress.currentStreak || 0;

      case 'days_inactive': {
        if (!userProgress.lastActiveAt) return null;
        const daysSince = Math.floor(
          (Date.now() - userProgress.lastActiveAt.getTime()) / (24 * 60 * 60 * 1000)
        );
        return daysSince;
      }

      case 'quiz_failure_rate': {
        if (!userProgress.totalQuestions || userProgress.totalQuestions === 0) return null;
        const failureRate = 100 - ((userProgress.totalCorrect / userProgress.totalQuestions) * 100);
        return failureRate;
      }

      case 'quizzes_completed':
        return userProgress.quizzesCompleted || 0;

      case 'total_xp':
        return userProgress.totalXp || 0;

      default:
        return null;
    }
  }

  /**
   * Check if condition is met
   */
  checkCondition(value: number, operator: string, threshold: number): boolean {
    switch (operator) {
      case 'lt': return value < threshold;
      case 'lte': return value <= threshold;
      case 'gt': return value > threshold;
      case 'gte': return value >= threshold;
      case 'eq': return value === threshold;
      case 'neq': return value !== threshold;
      default: return false;
    }
  }

  /**
   * Create an alert
   */
  async createAlert(rule: any, userId: string, triggerValue: number): Promise<void> {
    // Check if similar alert exists (open/acknowledged)
    const existingAlert = await prisma.alert.findFirst({
      where: {
        ruleId: rule.id,
        affectedUserId: userId,
        status: { in: ['open', 'acknowledged'] },
      },
    });

    if (existingAlert) {
      return; // Don't create duplicate
    }

    const alert = await prisma.alert.create({
      data: {
        ruleId: rule.id,
        severity: rule.severity,
        title: rule.name,
        description: rule.description,
        affectedUserId: userId,
        triggerMetric: rule.metric,
        triggerValue: triggerValue,
        triggerThreshold: rule.threshold,
        recommendedActions: RECOMMENDED_ACTIONS[rule.metric] || [],
      },
    });

    // Update rule's lastTriggeredAt
    await prisma.alertRule.update({
      where: { id: rule.id },
      data: { lastTriggeredAt: new Date() },
    });

    // Create in-app notification
    if (rule.notifyChannels.includes('in_app')) {
      await this.createNotification(alert, userId);
    }

    console.log(`🚨 Alert created: ${rule.name} for user ${userId}`);
  }

  /**
   * Create in-app notification
   */
  async createNotification(alert: any, userId: string): Promise<void> {
    await prisma.notification.create({
      data: {
        userId,
        type: 'alert',
        title: alert.title,
        message: alert.description || 'Une alerte a été déclenchée',
        link: `/analytics/alerts/${alert.id}`,
        icon: alert.severity === 'critical' ? '🚨' : alert.severity === 'warning' ? '⚠️' : 'ℹ️',
        alertId: alert.id,
      },
    });
  }

  /**
   * Acknowledge an alert
   */
  async acknowledgeAlert(alertId: string, userId: string): Promise<void> {
    await prisma.alert.update({
      where: { id: alertId },
      data: {
        status: 'acknowledged',
        acknowledgedAt: new Date(),
        acknowledgedBy: userId,
      },
    });
  }

  /**
   * Resolve an alert
   */
  async resolveAlert(alertId: string, userId?: string): Promise<void> {
    await prisma.alert.update({
      where: { id: alertId },
      data: {
        status: 'resolved',
        resolvedAt: new Date(),
        resolvedBy: userId,
      },
    });
  }

  /**
   * Dismiss an alert
   */
  async dismissAlert(alertId: string): Promise<void> {
    await prisma.alert.update({
      where: { id: alertId },
      data: { status: 'dismissed' },
    });
  }

  /**
   * Get alerts for a user
   */
  async getUserAlerts(userId: string, status?: string): Promise<any[]> {
    return prisma.alert.findMany({
      where: {
        affectedUserId: userId,
        ...(status ? { status } : {}),
      },
      include: { rule: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get all open alerts
   */
  async getOpenAlerts(): Promise<any[]> {
    return prisma.alert.findMany({
      where: { status: 'open' },
      include: { rule: true },
      orderBy: [
        { severity: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  /**
   * Detect anomalies using Z-score method
   */
  async detectAnomalies(): Promise<void> {
    console.log('🔬 Detecting anomalies...');

    // Get last 30 days of daily stats
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stats = await prisma.dailyStat.findMany({
      where: { date: { gte: thirtyDaysAgo } },
      orderBy: { date: 'asc' },
    });

    if (stats.length < 7) {
      console.log('Not enough data for anomaly detection');
      return;
    }

    // Check for anomalies in unique users
    const userCounts = stats.map(s => s.uniqueUsers);
    const latestValue = userCounts[userCounts.length - 1];
    const mean = userCounts.reduce((a, b) => a + b, 0) / userCounts.length;
    const stdDev = Math.sqrt(
      userCounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / userCounts.length
    );

    if (stdDev > 0) {
      const zScore = Math.abs((latestValue - mean) / stdDev);

      if (zScore > 2) {
        console.log(`📉 Anomaly detected: User count (${latestValue}) deviates from normal (${mean.toFixed(0)} ± ${stdDev.toFixed(0)})`);
        // Could create a system-level alert here
      }
    }

    console.log('✅ Anomaly detection complete');
  }
}

export const alertingService = new AlertingService();
