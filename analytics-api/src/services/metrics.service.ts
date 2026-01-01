import { prisma } from '../index';
import { cacheService } from './cache.service';

/**
 * Metrics Service
 * Provides calculated metrics for dashboards and reports
 */
export class MetricsService {
  private readonly CACHE_TTL = 300; // 5 minutes

  /**
   * Get user dashboard data
   */
  async getUserDashboard(userId: string): Promise<UserDashboard> {
    const cacheKey = `dashboard:user:${userId}`;
    
    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached as UserDashboard;
    }

    // Get user progress
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    // Get recent events
    const recentEvents = await prisma.event.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 20,
    });

    // Get events for time calculations
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const events7d = await prisma.event.count({
      where: { userId, timestamp: { gte: sevenDaysAgo } },
    });

    const events30d = await prisma.event.count({
      where: { userId, timestamp: { gte: thirtyDaysAgo } },
    });

    // Calculate score change (compare last 7 days to previous 7 days)
    const previousWeek = new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const quizScores7d = await prisma.event.findMany({
      where: {
        userId,
        eventType: 'quiz_completed',
        timestamp: { gte: sevenDaysAgo },
      },
    });

    const quizScoresPrev7d = await prisma.event.findMany({
      where: {
        userId,
        eventType: 'quiz_completed',
        timestamp: { gte: previousWeek, lt: sevenDaysAgo },
      },
    });

    const avgScore7d = quizScores7d.length > 0
      ? quizScores7d.reduce((sum, e) => sum + ((e.eventData as any)?.score || 0), 0) / quizScores7d.length
      : 0;

    const avgScorePrev7d = quizScoresPrev7d.length > 0
      ? quizScoresPrev7d.reduce((sum, e) => sum + ((e.eventData as any)?.score || 0), 0) / quizScoresPrev7d.length
      : 0;

    const scoreChange = avgScorePrev7d > 0 
      ? ((avgScore7d - avgScorePrev7d) / avgScorePrev7d) * 100 
      : 0;

    // Get progress history (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const progressHistory = await this.getProgressHistory(userId, sixMonthsAgo);

    // Build dashboard response
    const dashboard: UserDashboard = {
      user: {
        id: userId,
        level: progress?.currentLevel || 1,
        xp: progress?.totalXp || 0,
        streak: progress?.currentStreak || 0,
      },
      metrics: {
        overallScore: Math.round(progress?.avgScore || 0),
        scoreChange: Math.round(scoreChange * 10) / 10,
        modulesCompleted: progress?.modulesCompleted?.length || 0,
        modulesInProgress: progress?.modulesStarted?.length || 0,
        modulesTotal: 10, // TODO: Get from modules config
        quizzesCompleted: progress?.quizzesCompleted || 0,
        totalCorrect: progress?.totalCorrect || 0,
        totalQuestions: progress?.totalQuestions || 0,
        streakDays: progress?.currentStreak || 0,
        longestStreak: progress?.longestStreak || 0,
        eventsLast7d: events7d,
        eventsLast30d: events30d,
      },
      progressHistory,
      recentActivity: recentEvents.map(e => ({
        id: e.id,
        type: e.eventType,
        page: e.page || undefined,
        timestamp: e.timestamp.toISOString(),
        data: e.eventData as Record<string, any> | undefined,
      })),
      certifications: [], // TODO: Add certifications
      alerts: [], // TODO: Add user alerts
    };

    // Cache result
    await cacheService.set(cacheKey, dashboard, this.CACHE_TTL);

    return dashboard;
  }

  /**
   * Get organization dashboard data
   */
  async getOrganizationDashboard(orgId: string): Promise<OrganizationDashboard> {
    const cacheKey = `dashboard:org:${orgId}`;
    
    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached as OrganizationDashboard;
    }

    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // DAU - Daily Active Users (today)
    const dau = await prisma.event.groupBy({
      by: ['userId'],
      where: {
        timestamp: { gte: today },
        userId: { not: null },
      },
    });

    // WAU - Weekly Active Users
    const wau = await prisma.event.groupBy({
      by: ['userId'],
      where: {
        timestamp: { gte: sevenDaysAgo },
        userId: { not: null },
      },
    });

    // MAU - Monthly Active Users
    const mau = await prisma.event.groupBy({
      by: ['userId'],
      where: {
        timestamp: { gte: thirtyDaysAgo },
        userId: { not: null },
      },
    });

    // Get daily stats for the last 30 days
    const dailyStats = await prisma.dailyStat.findMany({
      where: {
        date: { gte: thirtyDaysAgo },
      },
      orderBy: { date: 'asc' },
    });

    // Get all user progress for org
    const allProgress = await prisma.userProgress.findMany({
      orderBy: { avgScore: 'desc' },
      take: 10,
    });

    // Calculate averages
    const avgScore = allProgress.length > 0
      ? allProgress.reduce((sum, p) => sum + (p.avgScore || 0), 0) / allProgress.length
      : 0;

    // Build dashboard
    const dashboard: OrganizationDashboard = {
      organization: {
        id: orgId,
        name: 'Organization', // TODO: Get from org table
      },
      metrics: {
        dau: dau.length,
        wau: wau.length,
        mau: mau.length,
        avgScore: Math.round(avgScore),
        totalUsers: mau.length,
        activeUsersPercentage: mau.length > 0 ? Math.round((wau.length / mau.length) * 100) : 0,
        completionRate: 0, // TODO: Calculate
        engagementScore: 0, // TODO: Calculate
      },
      dailyStats: dailyStats.map(s => ({
        date: s.date.toISOString().split('T')[0],
        totalEvents: s.totalEvents,
        uniqueUsers: s.uniqueUsers,
        pageViews: s.pageViews,
        quizCompleted: s.quizCompleted,
        avgScore: 0, // TODO: Add to schema
      })),
      topPerformers: allProgress.slice(0, 5).map(p => ({
        userId: p.userId,
        score: Math.round(p.avgScore || 0),
        level: p.currentLevel,
        streak: p.currentStreak,
      })),
      alerts: [],
    };

    // Cache result
    await cacheService.set(cacheKey, dashboard, this.CACHE_TTL);

    return dashboard;
  }

  /**
   * Get time series data for a metric
   */
  async getTimeSeries(
    metric: string,
    entityId: string,
    period: { start: Date; end: Date }
  ): Promise<TimeSeriesData[]> {
    const cacheKey = `timeseries:${metric}:${entityId}:${period.start.toISOString()}:${period.end.toISOString()}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached as TimeSeriesData[];
    }

    const dailyStats = await prisma.dailyStat.findMany({
      where: {
        date: {
          gte: period.start,
          lte: period.end,
        },
      },
      orderBy: { date: 'asc' },
    });

    const data: TimeSeriesData[] = dailyStats.map(stat => {
      let value = 0;
      
      switch (metric) {
        case 'users':
          value = stat.uniqueUsers;
          break;
        case 'events':
          value = stat.totalEvents;
          break;
        case 'pageViews':
          value = stat.pageViews;
          break;
        case 'quizCompleted':
          value = stat.quizCompleted;
          break;
        case 'sessions':
          value = stat.uniqueSessions;
          break;
        default:
          value = stat.totalEvents;
      }

      return {
        date: stat.date.toISOString().split('T')[0],
        value,
      };
    });

    await cacheService.set(cacheKey, data, this.CACHE_TTL);

    return data;
  }

  /**
   * Get real-time metrics
   */
  async getRealTimeMetrics(orgId?: string): Promise<RealTimeMetrics> {
    const cacheKey = `realtime:${orgId || 'global'}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached as RealTimeMetrics;
    }

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    // Active users (last 5 minutes)
    const activeNow = await prisma.event.groupBy({
      by: ['sessionId'],
      where: {
        timestamp: { gte: fiveMinutesAgo },
      },
    });

    // Events in last hour
    const eventsLastHour = await prisma.event.count({
      where: {
        timestamp: { gte: oneHourAgo },
      },
    });

    // Events by type in last hour
    const eventsByType = await prisma.event.groupBy({
      by: ['eventType'],
      where: {
        timestamp: { gte: oneHourAgo },
      },
      _count: { eventType: true },
    });

    const metrics: RealTimeMetrics = {
      timestamp: now.toISOString(),
      activeUsers: activeNow.length,
      eventsLastHour,
      eventsPerMinute: Math.round(eventsLastHour / 60),
      breakdown: eventsByType.map(e => ({
        type: e.eventType,
        count: e._count.eventType,
      })),
    };

    // Short cache for real-time data (30 seconds)
    await cacheService.set(cacheKey, metrics, 30);

    return metrics;
  }

  /**
   * Get user progress history
   */
  private async getProgressHistory(userId: string, since: Date): Promise<ProgressHistoryPoint[]> {
    const events = await prisma.event.findMany({
      where: {
        userId,
        eventType: 'quiz_completed',
        timestamp: { gte: since },
      },
      orderBy: { timestamp: 'asc' },
    });

    // Group by month
    const monthlyScores: Record<string, number[]> = {};
    
    events.forEach(e => {
      const monthKey = `${e.timestamp.getFullYear()}-${String(e.timestamp.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyScores[monthKey]) {
        monthlyScores[monthKey] = [];
      }
      const score = (e.eventData as any)?.score;
      if (score !== undefined) {
        monthlyScores[monthKey].push(score);
      }
    });

    return Object.entries(monthlyScores)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, scores]) => ({
        date,
        score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        count: scores.length,
      }));
  }
}

// Types
export interface UserDashboard {
  user: {
    id: string;
    level: number;
    xp: number;
    streak: number;
  };
  metrics: {
    overallScore: number;
    scoreChange: number;
    modulesCompleted: number;
    modulesInProgress: number;
    modulesTotal: number;
    quizzesCompleted: number;
    totalCorrect: number;
    totalQuestions: number;
    streakDays: number;
    longestStreak: number;
    eventsLast7d: number;
    eventsLast30d: number;
  };
  progressHistory: ProgressHistoryPoint[];
  recentActivity: {
    id: string;
    type: string;
    page?: string;
    timestamp: string;
    data?: Record<string, any>;
  }[];
  certifications: any[];
  alerts: any[];
}

export interface OrganizationDashboard {
  organization: {
    id: string;
    name: string;
  };
  metrics: {
    dau: number;
    wau: number;
    mau: number;
    avgScore: number;
    totalUsers: number;
    activeUsersPercentage: number;
    completionRate: number;
    engagementScore: number;
  };
  dailyStats: {
    date: string;
    totalEvents: number;
    uniqueUsers: number;
    pageViews: number;
    quizCompleted: number;
    avgScore: number;
  }[];
  topPerformers: {
    userId: string;
    score: number;
    level: number;
    streak: number;
  }[];
  alerts: any[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface RealTimeMetrics {
  timestamp: string;
  activeUsers: number;
  eventsLastHour: number;
  eventsPerMinute: number;
  breakdown: {
    type: string;
    count: number;
  }[];
}

export interface ProgressHistoryPoint {
  date: string;
  score: number;
  count: number;
}

export const metricsService = new MetricsService();
