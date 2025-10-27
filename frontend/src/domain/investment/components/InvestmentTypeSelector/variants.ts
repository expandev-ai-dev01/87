import { clsx } from 'clsx';

export interface InvestmentTypeSelectorVariantProps {
  isSelected?: boolean;
}

/**
 * Get investment type card className
 */
export function getTypeCardClassName(props: InvestmentTypeSelectorVariantProps): string {
  const { isSelected = false } = props;

  return clsx('p-6 rounded-lg border-2 cursor-pointer transition-all', 'hover:shadow-md', {
    'border-primary-600 bg-primary-50': isSelected,
    'border-gray-200 bg-white hover:border-primary-300': !isSelected,
  });
}
