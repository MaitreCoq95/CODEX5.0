"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = healthRoutes;
const index_1 = require("../index");
async function healthRoutes(fastify) {
    // Basic health check
    fastify.get('/health', async (request, reply) => {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'codex-analytics-api',
            version: '1.0.0',
        };
    });
    // Detailed health check with DB status
    fastify.get('/health/detailed', async (request, reply) => {
        let dbStatus = 'unknown';
        let dbLatency = 0;
        try {
            const start = Date.now();
            await index_1.prisma.$queryRaw `SELECT 1`;
            dbLatency = Date.now() - start;
            dbStatus = 'connected';
        }
        catch (error) {
            dbStatus = 'disconnected';
        }
        return {
            status: dbStatus === 'connected' ? 'ok' : 'degraded',
            timestamp: new Date().toISOString(),
            service: 'codex-analytics-api',
            version: '1.0.0',
            checks: {
                database: {
                    status: dbStatus,
                    latency: `${dbLatency}ms`,
                },
            },
        };
    });
}
//# sourceMappingURL=health.js.map