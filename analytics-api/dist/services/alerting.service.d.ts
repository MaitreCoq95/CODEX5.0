export declare class AlertingService {
    /**
     * Seed default rules if none exist
     */
    seedDefaultRules(): Promise<void>;
    /**
     * Evaluate all active rules
     */
    evaluateAllRules(): Promise<void>;
    /**
     * Evaluate a single rule for a user
     */
    evaluateRuleForUser(rule: any, userProgress: any): Promise<void>;
    /**
     * Get metric value for a user
     */
    getMetricValue(metric: string, userProgress: any): Promise<number | null>;
    /**
     * Check if condition is met
     */
    checkCondition(value: number, operator: string, threshold: number): boolean;
    /**
     * Create an alert
     */
    createAlert(rule: any, userId: string, triggerValue: number): Promise<void>;
    /**
     * Create in-app notification
     */
    createNotification(alert: any, userId: string): Promise<void>;
    /**
     * Acknowledge an alert
     */
    acknowledgeAlert(alertId: string, userId: string): Promise<void>;
    /**
     * Resolve an alert
     */
    resolveAlert(alertId: string, userId?: string): Promise<void>;
    /**
     * Dismiss an alert
     */
    dismissAlert(alertId: string): Promise<void>;
    /**
     * Get alerts for a user
     */
    getUserAlerts(userId: string, status?: string): Promise<any[]>;
    /**
     * Get all open alerts
     */
    getOpenAlerts(): Promise<any[]>;
    /**
     * Detect anomalies using Z-score method
     */
    detectAnomalies(): Promise<void>;
}
export declare const alertingService: AlertingService;
//# sourceMappingURL=alerting.service.d.ts.map