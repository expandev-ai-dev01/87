/**
 * @summary
 * Response utility functions
 *
 * @module utils/response
 *
 * @description
 * Provides standardized response formatting for API endpoints.
 */

/**
 * @interface SuccessResponse
 * @description Standard success response format
 *
 * @property {boolean} success - Always true for success
 * @property {T} data - Response data
 * @property {object} [metadata] - Optional metadata
 * @property {string} metadata.timestamp - Response timestamp
 */
interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * @interface ListResponse
 * @description Standard list response format with pagination
 *
 * @property {boolean} success - Always true for success
 * @property {T[]} data - Array of items
 * @property {object} metadata - Pagination metadata
 * @property {number} metadata.page - Current page number
 * @property {number} metadata.pageSize - Items per page
 * @property {number} metadata.total - Total number of items
 * @property {boolean} metadata.hasNext - Has next page
 * @property {boolean} metadata.hasPrevious - Has previous page
 */
interface ListResponse<T> {
  success: true;
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
    timestamp: string;
  };
}

/**
 * @summary
 * Creates a standardized success response
 *
 * @function successResponse
 * @module utils/response
 *
 * @param {T} data - Response data
 * @param {object} [metadata] - Optional additional metadata
 *
 * @returns {SuccessResponse<T>} Standardized success response
 *
 * @example
 * res.json(successResponse({ id: 1, name: 'Investment' }));
 */
export const successResponse = <T>(
  data: T,
  metadata?: { [key: string]: any }
): SuccessResponse<T> => {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
};

/**
 * @summary
 * Creates a standardized list response with pagination
 *
 * @function listResponse
 * @module utils/response
 *
 * @param {T[]} data - Array of items
 * @param {number} page - Current page number
 * @param {number} pageSize - Items per page
 * @param {number} total - Total number of items
 *
 * @returns {ListResponse<T>} Standardized list response
 *
 * @example
 * res.json(listResponse(investments, 1, 10, 25));
 */
export const listResponse = <T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): ListResponse<T> => {
  return {
    success: true,
    data,
    metadata: {
      page,
      pageSize,
      total,
      hasNext: page * pageSize < total,
      hasPrevious: page > 1,
      timestamp: new Date().toISOString(),
    },
  };
};
