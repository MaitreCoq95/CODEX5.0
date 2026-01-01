"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertsRoutes = alertsRoutes;
const index_1 = require("../index");
const alerting_service_1 = require("../services/alerting.service");
async function alertsRoutes(fastify) {
    /**
     * GET /api/alerts
     * Get all alerts (optionally filtered by status or user)
     */
    fastify.get('/alerts', async (request, reply) => {
        const query = request.query;
        try {
            const where = {};
            if (query.userId) {
                where.affectedUserId = query.userId;
            }
            if (query.status) {
                where.status = query.status;
            }
            if (query.severity) {
                where.severity = query.severity;
            }
            const alerts = await index_1.prisma.alert.findMany({
                where,
                include: { rule: true },
                orderBy: [
                    { severity: 'desc' },
                    { createdAt: 'desc' },
                ],
            });
            return {
                success: true,
                count: alerts.length,
                data: alerts,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch alerts' };
        }
    });
    /**
     * GET /api/alerts/:id
     * Get a specific alert
     */
    fastify.get('/alerts/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const alert = await index_1.prisma.alert.findUnique({
                where: { id },
                include: {
                    rule: true,
                    notifications: true,
                },
            });
            if (!alert) {
                reply.status(404);
                return { success: false, error: 'Alert not found' };
            }
            return {
                success: true,
                data: alert,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch alert' };
        }
    });
    /**
     * POST /api/alerts/:id/acknowledge
     * Acknowledge an alert
     */
    fastify.post('/alerts/:id/acknowledge', async (request, reply) => {
        const { id } = request.params;
        const body = request.body;
        try {
            await alerting_service_1.alertingService.acknowledgeAlert(id, body?.userId || 'system');
            return {
                success: true,
                message: 'Alert acknowledged',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to acknowledge alert' };
        }
    });
    /**
     * POST /api/alerts/:id/resolve
     * Resolve an alert
     */
    fastify.post('/alerts/:id/resolve', async (request, reply) => {
        const { id } = request.params;
        const body = request.body;
        try {
            await alerting_service_1.alertingService.resolveAlert(id, body?.userId);
            return {
                success: true,
                message: 'Alert resolved',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to resolve alert' };
        }
    });
    /**
     * POST /api/alerts/:id/dismiss
     * Dismiss an alert
     */
    fastify.post('/alerts/:id/dismiss', async (request, reply) => {
        const { id } = request.params;
        try {
            await alerting_service_1.alertingService.dismissAlert(id);
            return {
                success: true,
                message: 'Alert dismissed',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to dismiss alert' };
        }
    });
    /**
     * GET /api/notifications/unread
     * Get unread notifications for a user
     */
    fastify.get('/notifications/unread', async (request, reply) => {
        const query = request.query;
        if (!query.userId) {
            reply.status(400);
            return { success: false, error: 'userId is required' };
        }
        try {
            const notifications = await index_1.prisma.notification.findMany({
                where: {
                    userId: query.userId,
                    read: false,
                },
                orderBy: { createdAt: 'desc' },
                take: 50,
            });
            return {
                success: true,
                count: notifications.length,
                data: notifications,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch notifications' };
        }
    });
    /**
     * GET /api/notifications
     * Get all notifications for a user
     */
    fastify.get('/notifications', async (request, reply) => {
        const query = request.query;
        if (!query.userId) {
            reply.status(400);
            return { success: false, error: 'userId is required' };
        }
        try {
            const limit = parseInt(query.limit || '50', 10);
            const notifications = await index_1.prisma.notification.findMany({
                where: { userId: query.userId },
                orderBy: { createdAt: 'desc' },
                take: limit,
            });
            return {
                success: true,
                count: notifications.length,
                data: notifications,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch notifications' };
        }
    });
    /**
     * POST /api/notifications/:id/read
     * Mark a notification as read
     */
    fastify.post('/notifications/:id/read', async (request, reply) => {
        const { id } = request.params;
        try {
            await index_1.prisma.notification.update({
                where: { id },
                data: {
                    read: true,
                    readAt: new Date(),
                },
            });
            return {
                success: true,
                message: 'Notification marked as read',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to mark notification as read' };
        }
    });
    /**
     * POST /api/notifications/mark-all-read
     * Mark all notifications as read for a user
     */
    fastify.post('/notifications/mark-all-read', async (request, reply) => {
        const body = request.body;
        if (!body?.userId) {
            reply.status(400);
            return { success: false, error: 'userId is required' };
        }
        try {
            const result = await index_1.prisma.notification.updateMany({
                where: {
                    userId: body.userId,
                    read: false,
                },
                data: {
                    read: true,
                    readAt: new Date(),
                },
            });
            return {
                success: true,
                message: `${result.count} notifications marked as read`,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to mark notifications as read' };
        }
    });
    /**
     * GET /api/alert-rules
     * Get all alert rules
     */
    fastify.get('/alert-rules', async (request, reply) => {
        try {
            const rules = await index_1.prisma.alertRule.findMany({
                orderBy: { createdAt: 'asc' },
            });
            return {
                success: true,
                count: rules.length,
                data: rules,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to fetch alert rules' };
        }
    });
    /**
     * POST /api/alert-rules/:id/toggle
     * Enable/disable an alert rule
     */
    fastify.post('/alert-rules/:id/toggle', async (request, reply) => {
        const { id } = request.params;
        try {
            const rule = await index_1.prisma.alertRule.findUnique({ where: { id } });
            if (!rule) {
                reply.status(404);
                return { success: false, error: 'Rule not found' };
            }
            await index_1.prisma.alertRule.update({
                where: { id },
                data: { enabled: !rule.enabled },
            });
            return {
                success: true,
                message: `Rule ${rule.enabled ? 'disabled' : 'enabled'}`,
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to toggle rule' };
        }
    });
    /**
     * POST /api/jobs/evaluate-rules
     * Manually trigger rule evaluation
     */
    fastify.post('/jobs/evaluate-rules', async (request, reply) => {
        try {
            fastify.log.info('Manual alert evaluation triggered');
            await alerting_service_1.alertingService.evaluateAllRules();
            return {
                success: true,
                message: 'Alert rules evaluated',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to evaluate rules' };
        }
    });
    /**
     * POST /api/jobs/seed-rules
     * Seed default alert rules
     */
    fastify.post('/jobs/seed-rules', async (request, reply) => {
        try {
            await alerting_service_1.alertingService.seedDefaultRules();
            return {
                success: true,
                message: 'Default rules seeded',
            };
        }
        catch (error) {
            fastify.log.error(error);
            reply.status(500);
            return { success: false, error: 'Failed to seed rules' };
        }
    });
}
//# sourceMappingURL=alerts.js.map