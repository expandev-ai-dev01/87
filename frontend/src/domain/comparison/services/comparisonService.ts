import { authenticatedClient } from '@/core/lib/api';
import type { FinancialProduct, ComparisonParameters, ComparisonResult } from '../types';

/**
 * @service comparisonService
 * @summary Comparison service for authenticated endpoints
 * @domain comparison
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/comparison/...
 */
export const comparisonService = {
  /**
   * @endpoint GET /api/v1/internal/comparison/products
   * @summary Fetches available financial products for comparison
   * @returns {Promise<FinancialProduct[]>} List of financial products
   */
  async getProducts(): Promise<FinancialProduct[]> {
    const response = await authenticatedClient.get('/comparison/products');
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/comparison
   * @summary Compares returns of two financial products
   * @param {ComparisonParameters} params - Comparison parameters
   * @returns {Promise<ComparisonResult>} Comparison result
   */
  async compare(params: ComparisonParameters): Promise<ComparisonResult> {
    const response = await authenticatedClient.post('/comparison', params);
    return response.data.data;
  },
};
