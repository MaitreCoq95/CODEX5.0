export declare class ReportingService {
    /**
     * Seed default templates if none exist
     */
    seedDefaultTemplates(): Promise<void>;
    /**
     * Get all report templates
     */
    getTemplates(): Promise<any[]>;
    /**
     * Get report history
     */
    getReportHistory(userId?: string, limit?: number): Promise<any[]>;
    /**
     * Generate a report
     */
    generateReport(type: string, format: string, periodStart: Date, periodEnd: Date, requestedBy?: string, templateId?: string): Promise<any>;
    /**
     * Generate Excel report
     */
    generateExcelReport(reportId: string, type: string, periodStart: Date, periodEnd: Date): Promise<string>;
    /**
     * Add summary sheet to workbook
     */
    private addSummarySheet;
    /**
     * Add compliance sheet
     */
    private addComplianceSheet;
    /**
     * Add progress sheet
     */
    private addProgressSheet;
    /**
     * Add performance sheet
     */
    private addPerformanceSheet;
    /**
     * Generate CSV report
     */
    generateCsvReport(reportId: string, type: string, periodStart: Date, periodEnd: Date): Promise<string>;
    /**
     * Generate HTML report (fallback for PDF)
     */
    generateHtmlReport(reportId: string, type: string, periodStart: Date, periodEnd: Date): Promise<string>;
    /**
     * Fetch report data from database
     */
    fetchReportData(type: string, periodStart: Date, periodEnd: Date): Promise<any>;
    /**
     * Get report by ID
     */
    getReportById(reportId: string): Promise<any>;
    /**
     * Increment download count
     */
    incrementDownloadCount(reportId: string): Promise<void>;
    /**
     * Delete old reports (keep last 30 days)
     */
    cleanupOldReports(): Promise<number>;
}
export declare const reportingService: ReportingService;
//# sourceMappingURL=reporting.service.d.ts.map