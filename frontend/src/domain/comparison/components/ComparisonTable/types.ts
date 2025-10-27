import type { ProductComparison, ComparisonMetrics } from '../../types';

/**
 * @interface ComparisonTableProps
 * @summary Props for ComparisonTable component
 */
export interface ComparisonTableProps {
  produtos: ProductComparison[];
  metricas: ComparisonMetrics;
}
