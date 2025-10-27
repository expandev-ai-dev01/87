import { Request, Response } from 'express';
import { errorResponse } from '@/middleware/error';

/**
 * @summary
 * 404 Not Found middleware
 *
 * @function notFoundMiddleware
 * @module middleware/notFound
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 *
 * @returns {void}
 *
 * @description
 * Handles requests to undefined routes and returns a standardized 404 response.
 */
export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json(
    errorResponse(`Route ${req.method} ${req.path} not found`, 'ROUTE_NOT_FOUND', {
      method: req.method,
      path: req.path,
    })
  );
};
