import { clsx } from 'clsx';

/**
 * Get error message className
 */
export function getErrorMessageClassName(): string {
  return clsx('flex items-center justify-center min-h-screen p-4');
}
