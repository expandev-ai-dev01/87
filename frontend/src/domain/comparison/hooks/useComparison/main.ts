import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { comparisonService } from '../../services/comparisonService';
import type { UseComparisonOptions, UseComparisonReturn } from './types';
import type { ComparisonParameters, ComparisonResult } from '../../types';

/**
 * @hook useComparison
 * @summary Hook for managing product comparisons
 * @domain comparison
 * @type domain-hook
 * @category data
 *
 * @description
 * Manages comparison state and API calls.
 * Provides methods to compare products and access results.
 */
export const useComparison = (options: UseComparisonOptions = {}): UseComparisonReturn => {
  const { onSuccess, onError } = options;
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const mutation = useMutation({
    mutationFn: (params: ComparisonParameters) => comparisonService.compare(params),
    onSuccess: (data) => {
      setResult(data);
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  const compare = useCallback(
    async (params: ComparisonParameters) => {
      const result = await mutation.mutateAsync(params);
      return result;
    },
    [mutation]
  );

  const reset = useCallback(() => {
    setResult(null);
    mutation.reset();
  }, [mutation]);

  return {
    compare,
    result,
    isComparing: mutation.isPending,
    error: mutation.error,
    reset,
  };
};
