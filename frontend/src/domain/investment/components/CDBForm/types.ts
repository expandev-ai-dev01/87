import type { CDBParameters } from '../../types';

/**
 * @interface CDBFormProps
 * @summary Props for CDBForm component
 */
export interface CDBFormProps {
  onSubmit: (params: CDBParameters) => void;
  isLoading?: boolean;
}
