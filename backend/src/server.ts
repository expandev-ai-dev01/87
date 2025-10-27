import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from '@/config';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';

const app: Application = express();

/**
 * @summary
 * Security middleware configuration
 *
 * @description
 * Applies security headers and CORS policies to protect the API
 */
app.use(helmet());
app.use(cors(config.api.cors));

/**
 * @summary
 * Request processing middleware
 *
 * @description
 * Handles request compression and body parsing
 */
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * @summary
 * Logging middleware
 *
 * @description
 * Logs HTTP requests in combined format
 */
if (config.server.nodeEnv !== 'test') {
  app.use(morgan('combined'));
}

/**
 * @api {get} /health Health Check
 * @apiName HealthCheck
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiDescription Returns server health status
 *
 * @apiSuccess {String} status Server status
 * @apiSuccess {String} timestamp Current timestamp
 * @apiSuccess {String} version API version
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.api.version,
  });
});

/**
 * @summary
 * API Routes with versioning
 *
 * @description
 * Mounts all API routes under /api prefix with version support
 * Routes structure:
 * - /api/v1/external/... (public endpoints)
 * - /api/v1/internal/... (authenticated endpoints)
 */
app.use('/api', apiRoutes);

/**
 * @summary
 * 404 handler
 *
 * @description
 * Handles requests to undefined routes
 */
app.use(notFoundMiddleware);

/**
 * @summary
 * Error handling middleware
 *
 * @description
 * Centralized error handling for all routes
 */
app.use(errorMiddleware);

/**
 * @summary
 * Graceful shutdown handler
 *
 * @description
 * Handles SIGTERM signal for graceful server shutdown
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

/**
 * @summary
 * Server startup
 *
 * @description
 * Starts the Express server on configured port
 */
const server = app.listen(config.server.port, () => {
  console.log(
    `InvestLab API running on port ${config.server.port} in ${config.server.nodeEnv} mode`
  );
  console.log(`API Version: ${config.api.version}`);
  console.log(`Health check: http://localhost:${config.server.port}/health`);
});

export default server;
