import { FastifyInstance } from 'fastify';
import { prisma } from '../index';

export async function statsRoutes(fastify: FastifyInstance) {
  // Get daily stats
  fastify.get('/stats/daily', async (request, reply) => {
    const query = request.query as { days?: string };
    const days = parseInt(query.days || '7', 10);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const stats = await prisma.dailyStat.findMany({
      where: {
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    });

    return {
      success: true,
      period: { startDate, endDate: new Date() },
      stats,
    };
  });

  // Get summary stats
  fastify.get('/stats/summary', async (request, reply) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);

    // Today's events
    const todayEvents = await prisma.event.count({
      where: { timestamp: { gte: today } },
    });

    // This week's events
    const weekEvents = await prisma.event.count({
      where: { timestamp: { gte: weekAgo } },
    });

    // This week's unique users
    const weekUsers = await prisma.event.groupBy({
      by: ['userId'],
      where: {
        timestamp: { gte: weekAgo },
        userId: { not: null },
      },
    });

    // Total users with progress
    const totalUsers = await prisma.userProgress.count();

    // Top event types today
    const topEvents = await prisma.event.groupBy({
      by: ['eventType'],
      where: { timestamp: { gte: today } },
      _count: { eventType: true },
      orderBy: { _count: { eventType: 'desc' } },
      take: 5,
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        today: {
          events: todayEvents,
        },
        week: {
          events: weekEvents,
          uniqueUsers: weekUsers.length,
        },
        total: {
          users: totalUsers,
        },
        topEvents: topEvents.map(e => ({
          type: e.eventType,
          count: e._count.eventType,
        })),
      },
    };
  });

  // Get user progress
  fastify.get('/stats/user/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };

    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    if (!progress) {
      return {
        success: true,
        progress: null,
        message: 'No progress found for this user',
      };
    }

    return {
      success: true,
      progress,
    };
  });

  // Get real-time stats (last hour)
  fastify.get('/stats/realtime', async (request, reply) => {
    const hourAgo = new Date();
    hourAgo.setHours(hourAgo.getHours() - 1);

    const recentEvents = await prisma.event.groupBy({
      by: ['eventType'],
      where: { timestamp: { gte: hourAgo } },
      _count: { eventType: true },
    });

    const activeUsers = await prisma.event.groupBy({
      by: ['sessionId'],
      where: { timestamp: { gte: hourAgo } },
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      realtime: {
        activeUsers: activeUsers.length,
        eventsLastHour: recentEvents.reduce((sum, e) => sum + e._count.eventType, 0),
        breakdown: recentEvents.map(e => ({
          type: e.eventType,
          count: e._count.eventType,
        })),
      },
    };
  });
}
