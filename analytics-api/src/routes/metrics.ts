import { FastifyInstance } from 'fastify';
import { metricsService } from '../services/metrics.service';
import { aggregationService } from '../services/aggregation.service';
import { cacheService } from '../services/cache.service';

export async function metricsRoutes(fastify: FastifyInstance) {
  /**
   * GET /api/metrics/user/:userId
   * Get user dashboard metrics
   */
  fastify.get('/metrics/user/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };

    if (!userId) {
      reply.status(400);
      return { success: false, error: 'userId is required' };
    }

    try {
      const startTime = Date.now();
      const dashboard = await metricsService.getUserDashboard(userId);
      const responseTime = Date.now() - startTime;

      fastify.log.info(`User metrics fetched in ${responseTime}ms`);

      return {
        success: true,
        responseTime: `${responseTime}ms`,
        data: dashboard,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to fetch user metrics' };
    }
  });

  /**
   * GET /api/metrics/organization/:orgId
   * Get organization dashboard metrics
   */
  fastify.get('/metrics/organization/:orgId', async (request, reply) => {
    const { orgId } = request.params as { orgId: string };

    if (!orgId) {
      reply.status(400);
      return { success: false, error: 'orgId is required' };
    }

    try {
      const startTime = Date.now();
      const dashboard = await metricsService.getOrganizationDashboard(orgId);
      const responseTime = Date.now() - startTime;

      fastify.log.info(`Org metrics fetched in ${responseTime}ms`);

      return {
        success: true,
        responseTime: `${responseTime}ms`,
        data: dashboard,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to fetch organization metrics' };
    }
  });

  /**
   * GET /api/metrics/timeseries
   * Get time series data for a metric
   */
  fastify.get('/metrics/timeseries', async (request, reply) => {
    const query = request.query as {
      metric?: string;
      entityId?: string;
      startDate?: string;
      endDate?: string;
    };

    const metric = query.metric || 'events';
    const entityId = query.entityId || 'global';
    const endDate = query.endDate ? new Date(query.endDate) : new Date();
    const startDate = query.startDate 
      ? new Date(query.startDate) 
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    try {
      const data = await metricsService.getTimeSeries(
        metric,
        entityId,
        { start: startDate, end: endDate }
      );

      return {
        success: true,
        metric,
        entityId,
        period: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
        data,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to fetch time series data' };
    }
  });

  /**
   * GET /api/metrics/realtime
   * Get real-time metrics
   */
  fastify.get('/metrics/realtime', async (request, reply) => {
    const query = request.query as { orgId?: string };

    try {
      const metrics = await metricsService.getRealTimeMetrics(query.orgId);

      return {
        success: true,
        data: metrics,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to fetch real-time metrics' };
    }
  });

  /**
   * POST /api/jobs/aggregate-daily
   * Manually trigger daily aggregation
   */
  fastify.post('/jobs/aggregate-daily', async (request, reply) => {
    const body = request.body as { date?: string };
    const date = body?.date ? new Date(body.date) : new Date();
    
    // Subtract 1 day to aggregate yesterday by default
    if (!body?.date) {
      date.setDate(date.getDate() - 1);
    }

    try {
      fastify.log.info(`Manual aggregation triggered for ${date.toDateString()}`);
      
      await aggregationService.aggregateDailyMetrics(date);

      return {
        success: true,
        message: `Aggregation completed for ${date.toDateString()}`,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to run aggregation' };
    }
  });

  /**
   * POST /api/jobs/aggregate-range
   * Aggregate a date range
   */
  fastify.post('/jobs/aggregate-range', async (request, reply) => {
    const body = request.body as { startDate: string; endDate: string };

    if (!body?.startDate || !body?.endDate) {
      reply.status(400);
      return { success: false, error: 'startDate and endDate are required' };
    }

    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    try {
      fastify.log.info(`Aggregation range: ${startDate.toDateString()} to ${endDate.toDateString()}`);
      
      await aggregationService.aggregateDateRange(startDate, endDate);

      return {
        success: true,
        message: `Aggregation completed for range`,
        range: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to run range aggregation' };
    }
  });

  /**
   * POST /api/jobs/refresh-user/:userId
   * Refresh metrics for a specific user
   */
  fastify.post('/jobs/refresh-user/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };

    try {
      // Clear user cache
      await cacheService.delete(`dashboard:user:${userId}`);
      await cacheService.delete(`metrics:user:${userId}`);

      // Recalculate user snapshot
      await aggregationService.calculateUserMetricsSnapshot(userId);

      return {
        success: true,
        message: `User ${userId} metrics refreshed`,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Failed to refresh user metrics' };
    }
  });

  /**
   * GET /api/cache/stats
   * Get cache statistics
   */
  fastify.get('/cache/stats', async (request, reply) => {
    const stats = cacheService.getStats();
    
    return {
      success: true,
      cache: stats,
    };
  });

  /**
   * POST /api/cache/clear
   * Clear all cache
   */
  fastify.post('/cache/clear', async (request, reply) => {
    await cacheService.clear();
    
    return {
      success: true,
      message: 'Cache cleared',
    };
  });
}
