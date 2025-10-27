import { ComparisonChart } from '../ComparisonChart';
import { ComparisonTable } from '../ComparisonTable';
import type { ComparisonResultProps } from './types';

/**
 * @component ComparisonResult
 * @summary Complete comparison result display
 * @domain comparison
 * @type domain-component
 * @category display
 *
 * @description
 * Orchestrates display of comparison results including
 * chart and table visualizations.
 *
 * @props
 * @param {ComparisonResultProps} props - Component properties
 */
export const ComparisonResult = ({ result, onReset }: ComparisonResultProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Resultado da Comparação</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Nova Comparação
        </button>
      </div>

      <ComparisonChart produtos={result.produtos} />

      <ComparisonTable produtos={result.produtos} metricas={result.metricas} />

      <div className="text-xs text-gray-500 text-center">
        Cálculo realizado em: {new Date(result.data_calculo).toLocaleString('pt-BR')}
      </div>
    </div>
  );
};
