import { Router } from 'express';
import * as simulationController from '@/api/v1/internal/simulation/controller';
import * as indicatorsController from '@/api/v1/internal/indicators/controller';
import * as comparisonController from '@/api/v1/internal/comparison/controller';
import * as comparisonProductsController from '@/api/v1/internal/comparison/products/controller';

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

/**
 * @route GET /comparison/products
 * @description Get available financial products for comparison
 */
router.get('/comparison/products', comparisonProductsController.getHandler);

/**
 * @route POST /comparison
 * @description Compare returns of two financial products
 */
router.post('/comparison', comparisonController.postHandler);

export default router;
