import { Router } from 'express';

const router = Router();

/**
 * @summary
 * Internal (authenticated) routes configuration
 *
 * @description
 * Defines all authenticated API endpoints that require user authentication.
 * These routes are accessible at /api/v1/internal/...
 *
 * @module internalRoutes
 */

// Authenticated routes will be added here as features are implemented
// Example:
// import simulationController from '@/api/v1/internal/simulation/controller';
// router.get('/simulation', authMiddleware, simulationController.listHandler);
// router.post('/simulation', authMiddleware, simulationController.createHandler);

export default router;
