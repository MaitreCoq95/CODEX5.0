import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../index';
import { v4 as uuidv4 } from 'uuid';

// Event validation schema
const TrackEventSchema = z.object({
  eventType: z.string().min(1).max(100),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
  eventData: z.record(z.any()).optional(),
  page: z.string().optional(),
  referrer: z.string().optional(),
});

// Batch events schema
const BatchEventsSchema = z.object({
  events: z.array(TrackEventSchema).min(1).max(100),
});

export async function trackRoutes(fastify: FastifyInstance) {
  // Track single event
  fastify.post('/track', async (request, reply) => {
    try {
      const body = TrackEventSchema.parse(request.body);
      
      const event = await prisma.event.create({
        data: {
          id: uuidv4(),
          eventType: body.eventType,
          sessionId: body.sessionId || uuidv4(),
          userId: body.userId,
          eventData: body.eventData || {},
          page: body.page,
          referrer: body.referrer,
          userAgent: request.headers['user-agent'],
          ip: request.ip,
        },
      });

      // Update user progress for specific events
      if (body.userId && ['quiz_completed', 'module_completed', 'lesson_completed'].includes(body.eventType)) {
        await updateUserProgress(body.userId, body.eventType, body.eventData);
      }

      return {
        success: true,
        eventId: event.id,
        timestamp: event.timestamp,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.status(400);
        return { success: false, error: 'Invalid event data', details: error.errors };
      }
      
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Internal server error' };
    }
  });

  // Track batch events
  fastify.post('/track/batch', async (request, reply) => {
    try {
      const { events } = BatchEventsSchema.parse(request.body);
      
      const createdEvents = await prisma.event.createMany({
        data: events.map(event => ({
          id: uuidv4(),
          eventType: event.eventType,
          sessionId: event.sessionId || uuidv4(),
          userId: event.userId,
          eventData: event.eventData || {},
          page: event.page,
          referrer: event.referrer,
          userAgent: request.headers['user-agent'],
          ip: request.ip,
        })),
      });

      return {
        success: true,
        count: createdEvents.count,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.status(400);
        return { success: false, error: 'Invalid batch data', details: error.errors };
      }
      
      fastify.log.error(error);
      reply.status(500);
      return { success: false, error: 'Internal server error' };
    }
  });
}

// Helper to update user progress
async function updateUserProgress(
  userId: string,
  eventType: string,
  eventData?: Record<string, any>
) {
  try {
    // Upsert user progress
    const existing = await prisma.userProgress.findUnique({
      where: { userId },
    });

    const updateData: any = {
      lastActiveAt: new Date(),
    };

    if (eventType === 'quiz_completed') {
      updateData.quizzesCompleted = (existing?.quizzesCompleted || 0) + 1;
      if (eventData?.correct !== undefined && eventData?.total !== undefined) {
        updateData.totalCorrect = (existing?.totalCorrect || 0) + eventData.correct;
        updateData.totalQuestions = (existing?.totalQuestions || 0) + eventData.total;
        updateData.avgScore = updateData.totalCorrect / updateData.totalQuestions * 100;
      }
      if (eventData?.xp) {
        updateData.totalXp = (existing?.totalXp || 0) + eventData.xp;
      }
    }

    if (eventType === 'module_completed' && eventData?.moduleId) {
      const completedModules = existing?.modulesCompleted || [];
      if (!completedModules.includes(eventData.moduleId)) {
        updateData.modulesCompleted = [...completedModules, eventData.moduleId];
      }
    }

    await prisma.userProgress.upsert({
      where: { userId },
      create: {
        userId,
        ...updateData,
      },
      update: updateData,
    });
  } catch (error) {
    console.error('Failed to update user progress:', error);
  }
}
