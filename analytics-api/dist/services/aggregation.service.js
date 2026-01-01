"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregationService = exports.AggregationService = void 0;
const index_1 = require("../index");
/**
 * Aggregation Service
 * Processes raw events into useful aggregated metrics
 */
class AggregationService {
    /**
     * Aggregate daily metrics for all organizations
     */
    async aggregateDailyMetrics(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        console.log(`📊 Aggregating metrics for ${startOfDay.toDateString()}`);
        // Get all events for the day
        const events = await index_1.prisma.event.findMany({
            where: {
                timestamp: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });
        if (events.length === 0) {
            console.log('No events to aggregate');
            return;
        }
        // Calculate metrics
        const uniqueUsers = new Set(events.filter(e => e.userId).map(e => e.userId)).size;
        const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
        const pageViews = events.filter(e => e.eventType === 'page_view').length;
        const quizStarted = events.filter(e => e.eventType === 'quiz_started').length;
        const quizCompleted = events.filter(e => e.eventType === 'quiz_completed').length;
        const modulesViewed = events.filter(e => e.eventType === 'module_viewed').length;
        const lessonsCompleted = events.filter(e => e.eventType === 'lesson_completed').length;
        // Calculate average quiz score
        const quizEvents = events.filter(e => e.eventType === 'quiz_completed' &&
            e.eventData &&
            e.eventData.score !== undefined);
        const avgQuizScore = quizEvents.length > 0
            ? quizEvents.reduce((sum, e) => sum + (e.eventData.score || 0), 0) / quizEvents.length
            : 0;
        // Events by type breakdown
        const eventsByType = {};
        events.forEach(e => {
            eventsByType[e.eventType] = (eventsByType[e.eventType] || 0) + 1;
        });
        // Top pages
        const pageCount = {};
        events.filter(e => e.page).forEach(e => {
            pageCount[e.page] = (pageCount[e.page] || 0) + 1;
        });
        const topPages = Object.entries(pageCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([page, count]) => ({ page, count }));
        // Upsert daily stats
        await index_1.prisma.dailyStat.upsert({
            where: { date: startOfDay },
            create: {
                date: startOfDay,
                totalEvents: events.length,
                uniqueUsers,
                uniqueSessions,
                pageViews,
                quizStarted,
                quizCompleted,
                modulesViewed,
                lessonsCompleted,
                avgSessionDuration: 0, // TODO: Calculate from session data
                eventsByType,
                topPages,
            },
            update: {
                totalEvents: events.length,
                uniqueUsers,
                uniqueSessions,
                pageViews,
                quizStarted,
                quizCompleted,
                modulesViewed,
                lessonsCompleted,
                eventsByType,
                topPages,
            },
        });
        console.log(`✅ Aggregated ${events.length} events for ${startOfDay.toDateString()}`);
        // Update user snapshots for all active users
        const activeUserIds = [...new Set(events.filter(e => e.userId).map(e => e.userId))];
        for (const userId of activeUserIds) {
            await this.calculateUserMetricsSnapshot(userId, startOfDay);
        }
        console.log(`✅ Updated snapshots for ${activeUserIds.length} users`);
    }
    /**
     * Calculate and store user metrics snapshot
     */
    async calculateUserMetricsSnapshot(userId, date = new Date()) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        // Get all user events
        const userEvents = await index_1.prisma.event.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
        });
        if (userEvents.length === 0) {
            return;
        }
        // Modules completed
        const modulesCompleted = userEvents.filter(e => e.eventType === 'module_completed').length;
        const modulesStarted = userEvents.filter(e => e.eventType === 'module_started').length;
        const modulesInProgress = Math.max(0, modulesStarted - modulesCompleted);
        // Quiz performance
        const quizEvents = userEvents.filter(e => e.eventType === 'quiz_completed' &&
            e.eventData &&
            e.eventData.score !== undefined);
        const quizzesCompleted = quizEvents.length;
        const totalCorrect = quizEvents.reduce((sum, e) => sum + (e.eventData.correct || 0), 0);
        const totalQuestions = quizEvents.reduce((sum, e) => sum + (e.eventData.total || 0), 0);
        const avgScore = quizzesCompleted > 0
            ? quizEvents.reduce((sum, e) => sum + (e.eventData.score || 0), 0) / quizzesCompleted
            : 0;
        // XP calculation (simple: 10 XP per quiz, 50 XP per module completed)
        const totalXp = (quizzesCompleted * 10) + (modulesCompleted * 50);
        const currentLevel = Math.floor(totalXp / 100) + 1;
        // Days active calculations
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const daysActive7d = new Set(userEvents
            .filter(e => e.timestamp >= sevenDaysAgo)
            .map(e => e.timestamp.toDateString())).size;
        const daysActive30d = new Set(userEvents
            .filter(e => e.timestamp >= thirtyDaysAgo)
            .map(e => e.timestamp.toDateString())).size;
        // Streak calculation
        const { currentStreak, longestStreak } = this.calculateStreak(userEvents);
        // Upsert user progress
        await index_1.prisma.userProgress.upsert({
            where: { userId },
            create: {
                userId,
                totalXp,
                currentLevel,
                modulesStarted: [],
                modulesCompleted: [],
                quizzesCompleted,
                totalCorrect,
                totalQuestions,
                avgScore,
                currentStreak,
                longestStreak,
                lastActiveAt: userEvents[0]?.timestamp || new Date(),
            },
            update: {
                totalXp,
                currentLevel,
                quizzesCompleted,
                totalCorrect,
                totalQuestions,
                avgScore,
                currentStreak,
                longestStreak,
                lastActiveAt: userEvents[0]?.timestamp || new Date(),
            },
        });
    }
    /**
     * Calculate streak from events
     */
    calculateStreak(events) {
        if (events.length === 0) {
            return { currentStreak: 0, longestStreak: 0 };
        }
        // Get unique dates sorted descending
        const dates = [...new Set(events.map(e => e.timestamp.toDateString()))]
            .map(d => new Date(d))
            .sort((a, b) => b.getTime() - a.getTime());
        if (dates.length === 0) {
            return { currentStreak: 0, longestStreak: 0 };
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        // Check if user was active today or yesterday
        const lastActiveDate = dates[0];
        lastActiveDate.setHours(0, 0, 0, 0);
        const isActiveRecently = lastActiveDate.getTime() === today.getTime() ||
            lastActiveDate.getTime() === yesterday.getTime();
        if (!isActiveRecently) {
            return { currentStreak: 0, longestStreak: this.calculateLongestStreak(dates) };
        }
        // Calculate current streak
        let currentStreak = 1;
        for (let i = 1; i < dates.length; i++) {
            const prevDate = new Date(dates[i - 1]);
            prevDate.setDate(prevDate.getDate() - 1);
            if (dates[i].toDateString() === prevDate.toDateString()) {
                currentStreak++;
            }
            else {
                break;
            }
        }
        const longestStreak = Math.max(currentStreak, this.calculateLongestStreak(dates));
        return { currentStreak, longestStreak };
    }
    /**
     * Calculate longest streak from dates
     */
    calculateLongestStreak(dates) {
        if (dates.length === 0)
            return 0;
        let longest = 1;
        let current = 1;
        for (let i = 1; i < dates.length; i++) {
            const prevDate = new Date(dates[i - 1]);
            prevDate.setDate(prevDate.getDate() - 1);
            if (dates[i].toDateString() === prevDate.toDateString()) {
                current++;
                longest = Math.max(longest, current);
            }
            else {
                current = 1;
            }
        }
        return longest;
    }
    /**
     * Manually trigger aggregation for a specific date range
     */
    async aggregateDateRange(startDate, endDate) {
        const current = new Date(startDate);
        while (current <= endDate) {
            await this.aggregateDailyMetrics(current);
            current.setDate(current.getDate() + 1);
        }
    }
}
exports.AggregationService = AggregationService;
exports.aggregationService = new AggregationService();
//# sourceMappingURL=aggregation.service.js.map