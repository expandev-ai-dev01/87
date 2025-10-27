import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

/**
 * @summary
 * Main API router with version management
 *
 * @description
 * Routes all API requests to appropriate version handlers.
 * Current supported versions:
 * - v1: /api/v1/...
 */

// Version 1 (current stable)
router.use('/v1', v1Routes);

// Future versions can be added here
// router.use('/v2', v2Routes);

export default router;
