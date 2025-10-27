import { useQuery } from '@tanstack/react-query';
import { comparisonService } from '../../services/comparisonService';
import type { UseFinancialProductsReturn } from './types';

/**
 * @hook useFinancialProducts
 * @summary Hook for fetching financial products
 * @domain comparison
 * @type domain-hook
 * @category data
 *
 * @description
 * Fetches and caches available financial products for comparison.
 */
export const useFinancialProducts = (): UseFinancialProductsReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['financial-products'],
    queryFn: () => comparisonService.getProducts(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    products: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
