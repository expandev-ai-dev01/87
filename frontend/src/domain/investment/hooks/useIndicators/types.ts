import type { EconomicIndicators } from '../../types';

/**
 * @interface UseIndicatorsReturn
 * @summary Return type for useIndicators hook
 */
export interface UseIndicatorsReturn {
  indicators: EconomicIndicators | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
