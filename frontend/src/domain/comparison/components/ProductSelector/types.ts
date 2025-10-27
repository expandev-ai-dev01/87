import type { FinancialProduct } from '../../types';

/**
 * @interface ProductSelectorProps
 * @summary Props for ProductSelector component
 */
export interface ProductSelectorProps {
  products: FinancialProduct[];
  selectedProducts: string[];
  onSelectionChange: (productIds: string[]) => void;
  isLoading?: boolean;
}
