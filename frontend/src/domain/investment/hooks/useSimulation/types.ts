import type { InvestmentType, InvestmentParameters, SimulationResult } from '../../types';

/**
 * @interface UseSimulationOptions
 * @summary Options for useSimulation hook
 */
export interface UseSimulationOptions {
  onSuccess?: (result: SimulationResult) => void;
  onError?: (error: Error) => void;
}

/**
 * @interface UseSimulationReturn
 * @summary Return type for useSimulation hook
 */
export interface UseSimulationReturn {
  simulate: (tipo: InvestmentType, params: InvestmentParameters) => Promise<SimulationResult>;
  result: SimulationResult | null;
  isSimulating: boolean;
  error: Error | null;
  reset: () => void;
}
