import type { SimulationResult } from '../../types';

/**
 * @interface SimulationResultProps
 * @summary Props for SimulationResult component
 */
export interface SimulationResultProps {
  result: SimulationResult;
  onReset: () => void;
}
