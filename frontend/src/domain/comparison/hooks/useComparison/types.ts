import type { ComparisonParameters, ComparisonResult } from '../../types';

/**
 * @interface UseComparisonOptions
 * @summary Options for useComparison hook
 */
export interface UseComparisonOptions {
  onSuccess?: (result: ComparisonResult) => void;
  onError?: (error: Error) => void;
}

/**
 * @interface UseComparisonReturn
 * @summary Return type for useComparison hook
 */
export interface UseComparisonReturn {
  compare: (params: ComparisonParameters) => Promise<ComparisonResult>;
  result: ComparisonResult | null;
  isComparing: boolean;
  error: Error | null;
  reset: () => void;
}
