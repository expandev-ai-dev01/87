import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component for async operations
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @description
 * Displays an animated loading spinner with configurable size.
 * Used throughout the application for loading states.
 *
 * @props
 * @param {LoadingSpinnerProps} props - Component properties
 * @param {'sm' | 'md' | 'lg'} props.size - Spinner size variant
 *
 * @examples
 * ```tsx
 * <LoadingSpinner size="md" />
 * ```
 */
export const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={getLoadingSpinnerClassName({ size })} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
