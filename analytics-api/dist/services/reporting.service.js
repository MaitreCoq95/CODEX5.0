"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportingService = exports.ReportingService = void 0;
const index_1 = require("../index");
const exceljs_1 = __importDefault(require("exceljs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure reports directory exists
const REPORTS_DIR = path_1.default.join(process.cwd(), 'reports');
if (!fs_1.default.existsSync(REPORTS_DIR)) {
    fs_1.default.mkdirSync(REPORTS_DIR, { recursive: true });
}
/**
 * Default report templates to seed
 */
const DEFAULT_TEMPLATES = [
    {
        name: 'Rapport de Conformité Mensuel',
        description: 'Synthèse mensuelle de la conformité aux formations obligatoires',
        type: 'compliance',
        format: 'excel',
        isSystem: true,
        config: {
            sections: ['summary', 'compliance_rate', 'pending_trainings', 'overdue'],
        },
    },
    {
        name: 'Progression Formation',
        description: 'État d\'avancement des formations par utilisateur',
        type: 'progress',
        format: 'excel',
        isSystem: true,
        config: {
            sections: ['user_progress', 'module_completion', 'time_spent'],
        },
    },
    {
        name: 'Rapport de Performance',
        description: 'Analyse des performances aux quiz et évaluations',
        type: 'performance',
        format: 'excel',
        isSystem: true,
        config: {
            sections: ['avg_scores', 'top_performers', 'improvement_areas'],
        },
    },
];
class ReportingService {
    /**
     * Seed default templates if none exist
     */
    async seedDefaultTemplates() {
        const existingCount = await index_1.prisma.reportTemplate.count({
            where: { isSystem: true },
        });
        if (existingCount === 0) {
            console.log('📊 Seeding default report templates...');
            for (const template of DEFAULT_TEMPLATES) {
                await index_1.prisma.reportTemplate.create({
                    data: template,
                });
            }
            console.log(`✅ Created ${DEFAULT_TEMPLATES.length} default report templates`);
        }
    }
    /**
     * Get all report templates
     */
    async getTemplates() {
        return index_1.prisma.reportTemplate.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    /**
     * Get report history
     */
    async getReportHistory(userId, limit = 50) {
        return index_1.prisma.generatedReport.findMany({
            where: userId ? { requestedBy: userId } : {},
            include: { template: true },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
    /**
     * Generate a report
     */
    async generateReport(type, format, periodStart, periodEnd, requestedBy, templateId) {
        // Create report record
        const report = await index_1.prisma.generatedReport.create({
            data: {
                templateId,
                name: `Rapport ${type} - ${periodStart.toLocaleDateString('fr-FR')} au ${periodEnd.toLocaleDateString('fr-FR')}`,
                type,
                format,
                periodStart,
                periodEnd,
                requestedBy,
                status: 'generating',
            },
        });
        try {
            let filePath;
            let mimeType;
            if (format === 'excel' || format === 'xlsx') {
                filePath = await this.generateExcelReport(report.id, type, periodStart, periodEnd);
                mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            }
            else if (format === 'csv') {
                filePath = await this.generateCsvReport(report.id, type, periodStart, periodEnd);
                mimeType = 'text/csv';
            }
            else {
                // Default to simple HTML for now (PDF requires more setup)
                filePath = await this.generateHtmlReport(report.id, type, periodStart, periodEnd);
                mimeType = 'text/html';
            }
            // Get file size
            const stats = fs_1.default.statSync(filePath);
            // Update report record
            await index_1.prisma.generatedReport.update({
                where: { id: report.id },
                data: {
                    status: 'completed',
                    filePath,
                    fileSize: stats.size,
                    mimeType,
                },
            });
            return index_1.prisma.generatedReport.findUnique({
                where: { id: report.id },
                include: { template: true },
            });
        }
        catch (error) {
            await index_1.prisma.generatedReport.update({
                where: { id: report.id },
                data: {
                    status: 'failed',
                    errorMessage: error.message,
                },
            });
            throw error;
        }
    }
    /**
     * Generate Excel report
     */
    async generateExcelReport(reportId, type, periodStart, periodEnd) {
        const workbook = new exceljs_1.default.Workbook();
        workbook.creator = 'Vyxo CODEX Analytics';
        workbook.created = new Date();
        // Fetch data based on report type
        const data = await this.fetchReportData(type, periodStart, periodEnd);
        // Create summary sheet
        const summarySheet = workbook.addWorksheet('Résumé');
        this.addSummarySheet(summarySheet, data, periodStart, periodEnd);
        // Create details sheet based on type
        if (type === 'compliance') {
            const sheet = workbook.addWorksheet('Conformité');
            this.addComplianceSheet(sheet, data);
        }
        else if (type === 'progress') {
            const sheet = workbook.addWorksheet('Progression');
            this.addProgressSheet(sheet, data);
        }
        else if (type === 'performance') {
            const sheet = workbook.addWorksheet('Performance');
            this.addPerformanceSheet(sheet, data);
        }
        // Save file
        const fileName = `report_${reportId}.xlsx`;
        const filePath = path_1.default.join(REPORTS_DIR, fileName);
        await workbook.xlsx.writeFile(filePath);
        return filePath;
    }
    /**
     * Add summary sheet to workbook
     */
    addSummarySheet(sheet, data, periodStart, periodEnd) {
        // Title
        sheet.mergeCells('A1:E1');
        const titleCell = sheet.getCell('A1');
        titleCell.value = 'VYXO CODEX - Rapport Analytics';
        titleCell.font = { bold: true, size: 18 };
        titleCell.alignment = { horizontal: 'center' };
        // Period
        sheet.mergeCells('A2:E2');
        const periodCell = sheet.getCell('A2');
        periodCell.value = `Période: ${periodStart.toLocaleDateString('fr-FR')} - ${periodEnd.toLocaleDateString('fr-FR')}`;
        periodCell.font = { italic: true };
        periodCell.alignment = { horizontal: 'center' };
        // Summary metrics
        sheet.getCell('A4').value = 'Métriques Clés';
        sheet.getCell('A4').font = { bold: true, size: 14 };
        const metrics = [
            ['Utilisateurs Actifs', data.activeUsers || 0],
            ['Modules Complétés', data.modulesCompleted || 0],
            ['Quiz Passés', data.quizCompleted || 0],
            ['Score Moyen', `${(data.avgScore || 0).toFixed(1)}%`],
            ['Temps Total Formation', `${Math.round((data.totalTime || 0) / 60)}h`],
        ];
        metrics.forEach((m, i) => {
            sheet.getCell(`A${5 + i}`).value = m[0];
            sheet.getCell(`B${5 + i}`).value = m[1];
        });
        // Style columns
        sheet.getColumn('A').width = 25;
        sheet.getColumn('B').width = 20;
    }
    /**
     * Add compliance sheet
     */
    addComplianceSheet(sheet, data) {
        sheet.columns = [
            { header: 'Utilisateur', key: 'user', width: 25 },
            { header: 'Formations Obligatoires', key: 'required', width: 20 },
            { header: 'Complétées', key: 'completed', width: 15 },
            { header: 'En Retard', key: 'overdue', width: 15 },
            { header: 'Taux Conformité', key: 'rate', width: 18 },
        ];
        // Header styling
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2563EB' },
        };
        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        // Add sample data (in production, use actual data)
        const complianceData = data.compliance || [];
        complianceData.forEach((row) => {
            sheet.addRow(row);
        });
    }
    /**
     * Add progress sheet
     */
    addProgressSheet(sheet, data) {
        sheet.columns = [
            { header: 'Utilisateur', key: 'user', width: 25 },
            { header: 'Niveau', key: 'level', width: 10 },
            { header: 'XP Total', key: 'xp', width: 12 },
            { header: 'Modules Démarrés', key: 'started', width: 18 },
            { header: 'Modules Complétés', key: 'completed', width: 18 },
            { header: 'Streak', key: 'streak', width: 10 },
        ];
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF10B981' },
        };
        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        const progressData = data.progress || [];
        progressData.forEach((row) => {
            sheet.addRow(row);
        });
    }
    /**
     * Add performance sheet
     */
    addPerformanceSheet(sheet, data) {
        sheet.columns = [
            { header: 'Utilisateur', key: 'user', width: 25 },
            { header: 'Quiz Passés', key: 'quizzes', width: 12 },
            { header: 'Score Moyen', key: 'avgScore', width: 15 },
            { header: 'Meilleur Score', key: 'bestScore', width: 15 },
            { header: 'Évolution', key: 'trend', width: 12 },
        ];
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF59E0B' },
        };
        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        const performanceData = data.performance || [];
        performanceData.forEach((row) => {
            sheet.addRow(row);
        });
    }
    /**
     * Generate CSV report
     */
    async generateCsvReport(reportId, type, periodStart, periodEnd) {
        const data = await this.fetchReportData(type, periodStart, periodEnd);
        const rows = [];
        // Header
        if (type === 'progress') {
            rows.push('Utilisateur,Niveau,XP,Modules Démarrés,Modules Complétés,Streak');
            (data.progress || []).forEach((r) => {
                rows.push(`"${r.user}",${r.level},${r.xp},${r.started},${r.completed},${r.streak}`);
            });
        }
        else if (type === 'performance') {
            rows.push('Utilisateur,Quiz Passés,Score Moyen,Meilleur Score,Évolution');
            (data.performance || []).forEach((r) => {
                rows.push(`"${r.user}",${r.quizzes},${r.avgScore},${r.bestScore},${r.trend}`);
            });
        }
        const fileName = `report_${reportId}.csv`;
        const filePath = path_1.default.join(REPORTS_DIR, fileName);
        fs_1.default.writeFileSync(filePath, rows.join('\n'), 'utf-8');
        return filePath;
    }
    /**
     * Generate HTML report (fallback for PDF)
     */
    async generateHtmlReport(reportId, type, periodStart, periodEnd) {
        const data = await this.fetchReportData(type, periodStart, periodEnd);
        const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rapport ${type} - Vyxo CODEX</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; max-width: 1000px; margin: 0 auto; }
    h1 { color: #1e40af; }
    .period { color: #6b7280; margin-bottom: 30px; }
    .metric { display: inline-block; background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 10px; min-width: 150px; text-align: center; }
    .metric-value { font-size: 2em; font-weight: bold; color: #1e40af; }
    .metric-label { color: #6b7280; }
    table { width: 100%; border-collapse: collapse; margin-top: 30px; }
    th { background: #1e40af; color: white; padding: 12px; text-align: left; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    tr:hover { background: #f9fafb; }
  </style>
</head>
<body>
  <h1>📊 Rapport ${type.charAt(0).toUpperCase() + type.slice(1)} - Vyxo CODEX</h1>
  <p class="period">Période: ${periodStart.toLocaleDateString('fr-FR')} - ${periodEnd.toLocaleDateString('fr-FR')}</p>
  
  <div class="metrics">
    <div class="metric">
      <div class="metric-value">${data.activeUsers || 0}</div>
      <div class="metric-label">Utilisateurs Actifs</div>
    </div>
    <div class="metric">
      <div class="metric-value">${data.modulesCompleted || 0}</div>
      <div class="metric-label">Modules Complétés</div>
    </div>
    <div class="metric">
      <div class="metric-value">${(data.avgScore || 0).toFixed(1)}%</div>
      <div class="metric-label">Score Moyen</div>
    </div>
  </div>

  <p style="margin-top: 40px; color: #9ca3af; font-size: 0.875em;">
    Généré le ${new Date().toLocaleString('fr-FR')} par Vyxo CODEX Analytics
  </p>
</body>
</html>
    `;
        const fileName = `report_${reportId}.html`;
        const filePath = path_1.default.join(REPORTS_DIR, fileName);
        fs_1.default.writeFileSync(filePath, html, 'utf-8');
        return filePath;
    }
    /**
     * Fetch report data from database
     */
    async fetchReportData(type, periodStart, periodEnd) {
        // Get daily stats for period
        const dailyStats = await index_1.prisma.dailyStat.findMany({
            where: {
                date: {
                    gte: periodStart,
                    lte: periodEnd,
                },
            },
        });
        // Get user progress
        const userProgress = await index_1.prisma.userProgress.findMany();
        // Calculate metrics
        const totalEvents = dailyStats.reduce((sum, d) => sum + d.totalEvents, 0);
        const activeUsers = new Set(dailyStats.flatMap(d => d.uniqueUsers)).size || dailyStats.reduce((sum, d) => sum + d.uniqueUsers, 0);
        const modulesCompleted = dailyStats.reduce((sum, d) => sum + d.lessonsCompleted, 0);
        const quizCompleted = dailyStats.reduce((sum, d) => sum + d.quizCompleted, 0);
        const avgScore = userProgress.length > 0
            ? userProgress.reduce((sum, u) => sum + (u.avgScore || 0), 0) / userProgress.length
            : 0;
        // Build progress data
        const progress = userProgress.map(u => ({
            user: u.userId,
            level: u.currentLevel,
            xp: u.totalXp,
            started: u.modulesStarted.length,
            completed: u.modulesCompleted.length,
            streak: u.currentStreak,
        }));
        // Build performance data
        const performance = userProgress.map(u => ({
            user: u.userId,
            quizzes: u.quizzesCompleted,
            avgScore: u.avgScore?.toFixed(1) || '0',
            bestScore: Math.round(u.avgScore || 0) + 10, // Simulated
            trend: u.avgScore > 70 ? '↗' : u.avgScore > 50 ? '→' : '↘',
        }));
        return {
            totalEvents,
            activeUsers,
            modulesCompleted,
            quizCompleted,
            avgScore,
            totalTime: totalEvents * 2, // Simulated
            progress,
            performance,
            compliance: [], // Would be populated with actual compliance data
        };
    }
    /**
     * Get report by ID
     */
    async getReportById(reportId) {
        return index_1.prisma.generatedReport.findUnique({
            where: { id: reportId },
            include: { template: true },
        });
    }
    /**
     * Increment download count
     */
    async incrementDownloadCount(reportId) {
        await index_1.prisma.generatedReport.update({
            where: { id: reportId },
            data: {
                downloadCount: { increment: 1 },
            },
        });
    }
    /**
     * Delete old reports (keep last 30 days)
     */
    async cleanupOldReports() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        // Find old reports
        const oldReports = await index_1.prisma.generatedReport.findMany({
            where: {
                createdAt: { lt: thirtyDaysAgo },
            },
        });
        // Delete files
        for (const report of oldReports) {
            if (report.filePath && fs_1.default.existsSync(report.filePath)) {
                fs_1.default.unlinkSync(report.filePath);
            }
        }
        // Delete records
        const result = await index_1.prisma.generatedReport.deleteMany({
            where: {
                createdAt: { lt: thirtyDaysAgo },
            },
        });
        return result.count;
    }
}
exports.ReportingService = ReportingService;
exports.reportingService = new ReportingService();
//# sourceMappingURL=reporting.service.js.map