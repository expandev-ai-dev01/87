import type { InvestmentType } from '../../types';

/**
 * @interface InvestmentTypeSelectorProps
 * @summary Props for InvestmentTypeSelector component
 */
export interface InvestmentTypeSelectorProps {
  value: InvestmentType | null;
  onChange: (type: InvestmentType) => void;
}
