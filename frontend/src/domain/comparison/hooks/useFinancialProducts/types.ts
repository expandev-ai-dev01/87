import type { FinancialProduct } from '../../types';

/**
 * @interface UseFinancialProductsReturn
 * @summary Return type for useFinancialProducts hook
 */
export interface UseFinancialProductsReturn {
  products: FinancialProduct[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
