import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { investmentService } from '../../services/investmentService';
import type { UseSimulationOptions, UseSimulationReturn } from './types';
import type { InvestmentType, InvestmentParameters, SimulationResult } from '../../types';

/**
 * @hook useSimulation
 * @summary Hook for managing investment simulations
 * @domain investment
 * @type domain-hook
 * @category data
 *
 * @description
 * Manages investment simulation state and API calls.
 * Provides methods to simulate investments and access results.
 */
export const useSimulation = (options: UseSimulationOptions = {}): UseSimulationReturn => {
  const { onSuccess, onError } = options;
  const [result, setResult] = useState<SimulationResult | null>(null);

  const mutation = useMutation({
    mutationFn: ({ tipo, params }: { tipo: InvestmentType; params: InvestmentParameters }) =>
      investmentService.simulate(tipo, params),
    onSuccess: (data) => {
      setResult(data);
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  const simulate = useCallback(
    async (tipo: InvestmentType, params: InvestmentParameters) => {
      const result = await mutation.mutateAsync({ tipo, params });
      return result;
    },
    [mutation]
  );

  const reset = useCallback(() => {
    setResult(null);
    mutation.reset();
  }, [mutation]);

  return {
    simulate,
    result,
    isSimulating: mutation.isPending,
    error: mutation.error,
    reset,
  };
};
