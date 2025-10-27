import { clsx } from 'clsx';

export interface ProductCardVariantProps {
  isSelected?: boolean;
  isDisabled?: boolean;
}

/**
 * Get product card className
 */
export function getProductCardClassName(props: ProductCardVariantProps): string {
  const { isSelected = false, isDisabled = false } = props;

  return clsx('p-6 rounded-lg border-2 cursor-pointer transition-all', 'hover:shadow-md', {
    'border-primary-600 bg-primary-50': isSelected,
    'border-gray-200 bg-white hover:border-primary-300': !isSelected && !isDisabled,
    'opacity-50 cursor-not-allowed': isDisabled,
  });
}
