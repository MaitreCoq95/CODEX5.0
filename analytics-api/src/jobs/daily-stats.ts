import cron from 'node-cron';
import { aggregationService } from '../services/aggregation.service';
import { alertingService } from '../services/alerting.service';

export async function startCronJobs() {
  console.log('📅 Starting cron jobs...');

  // Seed default alert rules on startup
  await alertingService.seedDefaultRules();

  // Run daily aggregation at 1 AM
  cron.schedule('0 1 * * *', async () => {
    console.log('🔄 Running daily stats aggregation...');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await aggregationService.aggregateDailyMetrics(yesterday);
  });

  // Run hourly cleanup for old raw events (keep 30 days)
  cron.schedule('0 * * * *', async () => {
    await cleanupOldEvents();
  });

  // Run alert rules evaluation every hour
  cron.schedule('30 * * * *', async () => {
    console.log('🚨 Evaluating alert rules...');
    await alertingService.evaluateAllRules();
    await alertingService.detectAnomalies();
  });

  console.log('✅ Cron jobs scheduled:');
  console.log('   - Daily aggregation: 1:00 AM');
  console.log('   - Hourly cleanup: Every hour at :00');
  console.log('   - Alert evaluation: Every hour at :30');
}

async function cleanupOldEvents() {
  try {
    const { prisma } = await import('../index');
    
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
  } catch (error) {
    console.error('❌ Failed to cleanup old events:', error);
  }
}

// Manual trigger for aggregation (useful for testing)
export async function runAggregationNow(date?: Date) {
  console.log('🔄 Manually triggering stats aggregation...');
  const targetDate = date || new Date();
  await aggregationService.aggregateDailyMetrics(targetDate);
}

