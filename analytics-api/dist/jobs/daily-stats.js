"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJobs = startCronJobs;
exports.runAggregationNow = runAggregationNow;
const node_cron_1 = __importDefault(require("node-cron"));
const aggregation_service_1 = require("../services/aggregation.service");
const alerting_service_1 = require("../services/alerting.service");
async function startCronJobs() {
    console.log('📅 Starting cron jobs...');
    // Seed default alert rules on startup
    await alerting_service_1.alertingService.seedDefaultRules();
    // Run daily aggregation at 1 AM
    node_cron_1.default.schedule('0 1 * * *', async () => {
        console.log('🔄 Running daily stats aggregation...');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        await aggregation_service_1.aggregationService.aggregateDailyMetrics(yesterday);
    });
    // Run hourly cleanup for old raw events (keep 30 days)
    node_cron_1.default.schedule('0 * * * *', async () => {
        await cleanupOldEvents();
    });
    // Run alert rules evaluation every hour
    node_cron_1.default.schedule('30 * * * *', async () => {
        console.log('🚨 Evaluating alert rules...');
        await alerting_service_1.alertingService.evaluateAllRules();
        await alerting_service_1.alertingService.detectAnomalies();
    });
    console.log('✅ Cron jobs scheduled:');
    console.log('   - Daily aggregation: 1:00 AM');
    console.log('   - Hourly cleanup: Every hour at :00');
    console.log('   - Alert evaluation: Every hour at :30');
}
async function cleanupOldEvents() {
    try {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../index')));
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const result = await prisma.event.deleteMany({
            where: {
                timestamp: { lt: thirtyDaysAgo },
            },
        });
        if (result.count > 0) {
            console.log(`🧹 Cleaned up ${result.count} old events`);
        }
    }
    catch (error) {
        console.error('❌ Failed to cleanup old events:', error);
    }
}
// Manual trigger for aggregation (useful for testing)
async function runAggregationNow(date) {
    console.log('🔄 Manually triggering stats aggregation...');
    const targetDate = date || new Date();
    await aggregation_service_1.aggregationService.aggregateDailyMetrics(targetDate);
}
//# sourceMappingURL=daily-stats.js.map