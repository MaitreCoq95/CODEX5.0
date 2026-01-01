/**
 * Metrics Service
 * Provides calculated metrics for dashboards and reports
 */
export declare class MetricsService {
    private readonly CACHE_TTL;
    /**
     * Get user dashboard data
     */
    getUserDashboard(userId: string): Promise<UserDashboard>;
    /**
     * Get organization dashboard data
     */
    getOrganizationDashboard(orgId: string): Promise<OrganizationDashboard>;
    /**
     * Get time series data for a metric
     */
    getTimeSeries(metric: string, entityId: string, period: {
        start: Date;
        end: Date;
    }): Promise<TimeSeriesData[]>;
    /**
     * Get real-time metrics
     */
    getRealTimeMetrics(orgId?: string): Promise<RealTimeMetrics>;
    /**
     * Get user progress history
     */
    private getProgressHistory;
}
export interface UserDashboard {
    user: {
        id: string;
        level: number;
        xp: number;
        streak: number;
    };
    metrics: {
        overallScore: number;
        scoreChange: number;
        modulesCompleted: number;
        modulesInProgress: number;
        modulesTotal: number;
        quizzesCompleted: number;
        totalCorrect: number;
        totalQuestions: number;
        streakDays: number;
        longestStreak: number;
        eventsLast7d: number;
        eventsLast30d: number;
    };
    progressHistory: ProgressHistoryPoint[];
    recentActivity: {
        id: string;
        type: string;
        page?: string;
        timestamp: string;
        data?: Record<string, any>;
    }[];
    certifications: any[];
    alerts: any[];
}
export interface OrganizationDashboard {
    organization: {
        id: string;
        name: string;
    };
    metrics: {
        dau: number;
        wau: number;
        mau: number;
        avgScore: number;
        totalUsers: number;
        activeUsersPercentage: number;
        completionRate: number;
        engagementScore: number;
    };
    dailyStats: {
        date: string;
        totalEvents: number;
        uniqueUsers: number;
        pageViews: number;
        quizCompleted: number;
        avgScore: number;
    }[];
    topPerformers: {
        userId: string;
        score: number;
        level: number;
        streak: number;
    }[];
    alerts: any[];
}
export interface TimeSeriesData {
    date: string;
    value: number;
}
export interface RealTimeMetrics {
    timestamp: string;
    activeUsers: number;
    eventsLastHour: number;
    eventsPerMinute: number;
    breakdown: {
        type: string;
        count: number;
    }[];
}
export interface ProgressHistoryPoint {
    date: string;
    score: number;
    count: number;
}
export declare const metricsService: MetricsService;
//# sourceMappingURL=metrics.service.d.ts.map