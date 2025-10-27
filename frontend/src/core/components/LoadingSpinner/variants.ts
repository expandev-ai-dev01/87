import { clsx } from 'clsx';

export interface LoadingSpinnerVariantProps {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Get loading spinner className based on variants
 */
export function getLoadingSpinnerClassName(props: LoadingSpinnerVariantProps): string {
  const { size = 'md' } = props;

  return clsx('animate-spin rounded-full border-4 border-gray-200 border-t-primary-600', {
    'h-8 w-8': size === 'sm',
    'h-12 w-12': size === 'md',
    'h-16 w-16': size === 'lg',
  });
}
