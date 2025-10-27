import { authenticatedClient } from '@/core/lib/api';
import type {
  InvestmentType,
  InvestmentParameters,
  SimulationResult,
  EconomicIndicators,
} from '../types';

/**
 * @service investmentService
 * @summary Investment simulation service for authenticated endpoints
 * @domain investment
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/...
 */
export const investmentService = {
  /**
   * @endpoint POST /api/v1/internal/simulation
   * @summary Creates an investment simulation
   * @param {InvestmentType} tipo_investimento - Investment type
   * @param {InvestmentParameters} parametros - Investment parameters
   * @returns {Promise<SimulationResult>} Simulation result
   */
  async simulate(
    tipo_investimento: InvestmentType,
    parametros: InvestmentParameters
  ): Promise<SimulationResult> {
    const response = await authenticatedClient.post('/simulation', {
      tipo_investimento,
      parametros,
    });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/indicators
   * @summary Fetches current economic indicators
   * @returns {Promise<EconomicIndicators>} Economic indicators
   */
  async getIndicators(): Promise<EconomicIndicators> {
    const response = await authenticatedClient.get('/indicators');
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/indicators
   * @summary Updates economic indicators (admin only)
   * @param {Partial<EconomicIndicators>} indicators - Indicators to update
   * @returns {Promise<EconomicIndicators>} Updated indicators
   */
  async updateIndicators(
    indicators: Partial<Omit<EconomicIndicators, 'data_atualizacao'>>
  ): Promise<EconomicIndicators> {
    const response = await authenticatedClient.put('/indicators', indicators);
    return response.data.data;
  },
};
