import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @summary
 * V1 API router
 *
 * @description
 * Organizes V1 routes into external (public) and internal (authenticated) endpoints.
 *
 * Route structure:
 * - /api/v1/external/... (public access)
 * - /api/v1/internal/... (authenticated access)
 */

// External (public) routes
router.use('/external', externalRoutes);

// Internal (authenticated) routes
router.use('/internal', internalRoutes);

export default router;
