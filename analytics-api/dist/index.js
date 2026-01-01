"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const health_1 = require("./routes/health");
const track_1 = require("./routes/track");
const stats_1 = require("./routes/stats");
const metrics_1 = require("./routes/metrics");
const alerts_1 = require("./routes/alerts");
const reports_1 = require("./routes/reports");
const daily_stats_1 = require("./jobs/daily-stats");
// Load environment variables
dotenv_1.default.config();
// Initialize Prisma
exports.prisma = new client_1.PrismaClient();
// Create Fastify instance
const fastify = (0, fastify_1.default)({
    logger: true,
});
async function main() {
    // Register CORS
    await fastify.register(cors_1.default, {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    // Register routes
    await fastify.register(health_1.healthRoutes);
    await fastify.register(track_1.trackRoutes, { prefix: '/api' });
    await fastify.register(stats_1.statsRoutes, { prefix: '/api' });
    await fastify.register(metrics_1.metricsRoutes, { prefix: '/api' });
    await fastify.register(alerts_1.alertsRoutes, { prefix: '/api' });
    await fastify.register(reports_1.reportsRoutes, { prefix: '/api' });
    // Graceful shutdown
    const shutdown = async () => {
        console.log('Shutting down...');
        await exports.prisma.$disconnect();
        await fastify.close();
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    // Start server
    try {
        const port = parseInt(process.env.PORT || '3005', 10);
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`
╔════════════════════════════════════════════╗
║     CODEX Analytics API                    ║
║     Running on http://localhost:${port}       ║
╚════════════════════════════════════════════╝
    `);
        // Start cron jobs
        (0, daily_stats_1.startCronJobs)();
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map