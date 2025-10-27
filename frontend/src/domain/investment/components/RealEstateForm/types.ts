import type { RealEstateParameters } from '../../types';

/**
 * @interface RealEstateFormProps
 * @summary Props for RealEstateForm component
 */
export interface RealEstateFormProps {
  onSubmit: (params: RealEstateParameters) => void;
  isLoading?: boolean;
}
