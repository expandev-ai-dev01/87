import { Router } from 'express';
import * as simulationController from '@/api/v1/internal/simulation/controller';
import * as indicatorsController from '@/api/v1/internal/indicators/controller';

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

/**
 * @route POST /simulation
 * @description Create investment simulation
 */
router.post('/simulation', simulationController.postHandler);

/**
 * @route GET /indicators
 * @description Get current economic indicators
 */
router.get('/indicators', indicatorsController.getHandler);

/**
 * @route PUT /indicators
 * @description Update economic indicators (admin only)
 */
router.put('/indicators', indicatorsController.putHandler);

export default router;
