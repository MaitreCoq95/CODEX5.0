"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRoutes = reportsRoutes;
const index_1 = require("../index");
const reporting_service_1 = require("../services/reporting.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function reportsRoutes(fastify) {
    /**
     * GET /api/reports/templates
     * Get all report templates
     */
    fastify.get('/reports/templates', async (request, reply) => {
        try {
            const templates = await reporting_service_1.reportingService.getTemplates();
            return {
                success: true,
                count: templates.length,
                data: templates,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch templates' };
        }
    });
    /**
     * POST /api/reports/generate
     * Generate a new report
     */
    fastify.post('/reports/generate', async (request, reply) => {
        const body = request.body;
        if (!body?.type) {
            reply.status(400);
            return { success: false, error: 'type is required' };
        }
        // Default to last 30 days
        const periodEnd = body.periodEnd ? new Date(body.periodEnd) : new Date();
        const periodStart = body.periodStart
            ? new Date(body.periodStart)
            : new Date(periodEnd.getTime() - 30 * 24 * 60 * 60 * 1000);
        try {
            fastify.log.info(`Generating ${body.type} report (${body.format || 'excel'})`);
            const report = await reporting_service_1.reportingService.generateReport(body.type, body.format || 'excel', periodStart, periodEnd, body.userId, body.templateId);
            return {
                success: true,
                message: 'Report generated successfully',
                data: report,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: error.message || 'Failed to generate report' };
        }
    });
    /**
     * GET /api/reports/history
     * Get report generation history
     */
    fastify.get('/reports/history', async (request, reply) => {
        const query = request.query;
        try {
            const limit = parseInt(query.limit || '50', 10);
            const reports = await reporting_service_1.reportingService.getReportHistory(query.userId, limit);
            return {
                success: true,
                count: reports.length,
                data: reports,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch report history' };
        }
    });
    /**
     * GET /api/reports/:id
     * Get a specific report
     */
    fastify.get('/reports/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const report = await reporting_service_1.reportingService.getReportById(id);
            if (!report) {
                reply.status(404);
                return { success: false, error: 'Report not found' };
            }
            return {
                success: true,
                data: report,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch report' };
        }
    });
    /**
     * GET /api/reports/:id/download
     * Download a report file
     */
    fastify.get('/reports/:id/download', async (request, reply) => {
        const { id } = request.params;
        try {
            const report = await reporting_service_1.reportingService.getReportById(id);
            if (!report) {
                reply.status(404);
                return { success: false, error: 'Report not found' };
            }
            if (report.status !== 'completed' || !report.filePath) {
                reply.status(400);
                return { success: false, error: 'Report not ready for download' };
            }
            if (!fs_1.default.existsSync(report.filePath)) {
                reply.status(404);
                return { success: false, error: 'Report file not found' };
            }
            // Increment download count
            await reporting_service_1.reportingService.incrementDownloadCount(id);
            // Send file
            const stream = fs_1.default.createReadStream(report.filePath);
            const fileName = path_1.default.basename(report.filePath);
            reply
                .header('Content-Type', report.mimeType || 'application/octet-stream')
                .header('Content-Disposition', `attachment; filename="${fileName}"`)
                .send(stream);
            return reply;
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to download report' };
        }
    });
    /**
     * DELETE /api/reports/:id
     * Delete a report
     */
    fastify.delete('/reports/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const report = await reporting_service_1.reportingService.getReportById(id);
            if (!report) {
                reply.status(404);
                return { success: false, error: 'Report not found' };
            }
            // Delete file if exists
            if (report.filePath && fs_1.default.existsSync(report.filePath)) {
                fs_1.default.unlinkSync(report.filePath);
            }
            // Delete record
            await index_1.prisma.generatedReport.delete({
                where: { id },
            });
            return {
                success: true,
                message: 'Report deleted',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to delete report' };
        }
    });
    /**
     * POST /api/jobs/seed-templates
     * Seed default report templates
     */
    fastify.post('/jobs/seed-templates', async (request, reply) => {
        try {
            await reporting_service_1.reportingService.seedDefaultTemplates();
            return {
                success: true,
                message: 'Templates seeded',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to seed templates' };
        }
    });
    /**
     * POST /api/jobs/cleanup-reports
     * Clean up old reports
     */
    fastify.post('/jobs/cleanup-reports', async (request, reply) => {
        try {
            const count = await reporting_service_1.reportingService.cleanupOldReports();
            return {
                success: true,
                message: `Cleaned up ${count} old reports`,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to cleanup reports' };
        }
    });
}
//# sourceMappingURL=reports.js.map