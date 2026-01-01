/**
 * Aggregation Service
 * Processes raw events into useful aggregated metrics
 */
export declare class AggregationService {
    /**
     * Aggregate daily metrics for all organizations
     */
    aggregateDailyMetrics(date: Date): Promise<void>;
    /**
     * Calculate and store user metrics snapshot
     */
    calculateUserMetricsSnapshot(userId: string, date?: Date): Promise<void>;
    /**
     * Calculate streak from events
     */
    private calculateStreak;
    /**
     * Calculate longest streak from dates
     */
    private calculateLongestStreak;
    /**
     * Manually trigger aggregation for a specific date range
     */
    aggregateDateRange(startDate: Date, endDate: Date): Promise<void>;
}
export declare const aggregationService: AggregationService;
//# sourceMappingURL=aggregation.service.d.ts.map