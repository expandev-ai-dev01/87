import type { ComparisonResult } from '../../types';

/**
 * @interface ComparisonResultProps
 * @summary Props for ComparisonResult component
 */
export interface ComparisonResultProps {
  result: ComparisonResult;
  onReset: () => void;
}
