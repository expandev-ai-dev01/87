import { useQuery } from '@tanstack/react-query';
import { investmentService } from '../../services/investmentService';
import type { UseIndicatorsReturn } from './types';

/**
 * @hook useIndicators
 * @summary Hook for fetching economic indicators
 * @domain investment
 * @type domain-hook
 * @category data
 *
 * @description
 * Fetches and caches economic indicators used in simulations.
 */
export const useIndicators = (): UseIndicatorsReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['economic-indicators'],
    queryFn: () => investmentService.getIndicators(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    indicators: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
