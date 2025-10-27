/**
 * @module RouteConstants
 * @summary Application route path constants
 * @domain core
 * @type constants
 * @category navigation
 */

export const ROUTES = {
  HOME: '/',
  SIMULATION: '/simulation',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
