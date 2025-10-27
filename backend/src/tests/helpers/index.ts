/**
 * @summary
 * Shared test helper functions
 *
 * @module tests/helpers
 *
 * @description
 * Provides reusable helper functions for test files.
 * These helpers should simplify common test operations.
 */

/**
 * @summary
 * Creates a mock request object
 *
 * @function createMockRequest
 *
 * @param {object} [overrides] - Request property overrides
 *
 * @returns {object} Mock request object
 */
export const createMockRequest = (overrides: any = {}) => {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  };
};

/**
 * @summary
 * Creates a mock response object
 *
 * @function createMockResponse
 *
 * @returns {object} Mock response object with jest functions
 */
export const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

/**
 * @summary
 * Creates a mock next function
 *
 * @function createMockNext
 *
 * @returns {jest.Mock} Mock next function
 */
export const createMockNext = () => {
  return jest.fn();
};
