import type { TreasuryParameters } from '../../types';

/**
 * @interface TreasuryFormProps
 * @summary Props for TreasuryForm component
 */
export interface TreasuryFormProps {
  onSubmit: (params: TreasuryParameters) => void;
  isLoading?: boolean;
}
