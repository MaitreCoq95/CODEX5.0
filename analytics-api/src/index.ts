import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { healthRoutes } from './routes/health';
import { trackRoutes } from './routes/track';
import { statsRoutes } from './routes/stats';
import { metricsRoutes } from './routes/metrics';
import { alertsRoutes } from './routes/alerts';
import { reportsRoutes } from './routes/reports';
import { startCronJobs } from './jobs/daily-stats';

// Load environment variables
dotenv.config();

// Initialize Prisma
export const prisma = new PrismaClient();

// Create Fastify instance
const fastify = Fastify({
  logger: true,
});

async function main() {
  // Register CORS
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Register routes
  await fastify.register(healthRoutes);
  await fastify.register(trackRoutes, { prefix: '/api' });
  await fastify.register(statsRoutes, { prefix: '/api' });
  await fastify.register(metricsRoutes, { prefix: '/api' });
  await fastify.register(alertsRoutes, { prefix: '/api' });
  await fastify.register(reportsRoutes, { prefix: '/api' });

  // Graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down...');
    await prisma.$disconnect();
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
    startCronJobs();
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
