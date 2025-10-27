import { formatCurrency, formatPercentage } from '@/core/utils/format';
import type { SimulationResultProps } from './types';

/**
 * @component SimulationResult
 * @summary Displays investment simulation results
 * @domain investment
 * @type domain-component
 * @category display
 *
 * @description
 * Shows simulation results including final value, returns,
 * taxes, and a chart of investment evolution.
 */
export const SimulationResult = ({ result, onReset }: SimulationResultProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Resultado da Simulação</h3>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Nova Simulação
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700 mb-1">Valor Final</p>
          <p className="text-2xl font-bold text-primary-900">
            {formatCurrency(result.valor_final)}
          </p>
        </div>

        <div className="p-4 bg-success-50 rounded-lg">
          <p className="text-sm text-success-700 mb-1">Rentabilidade Total</p>
          <p className="text-2xl font-bold text-success-900">
            {formatCurrency(result.rentabilidade_total)}
          </p>
          <p className="text-sm text-success-700">
            {formatPercentage(result.rentabilidade_percentual / 100)}
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Rentabilidade Mensal Média</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatPercentage(result.rentabilidade_mensal_media / 100)}
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Rentabilidade Anual Média</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatPercentage(result.rentabilidade_anual_media / 100)}
          </p>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg">
          <p className="text-sm text-warning-700 mb-1">Imposto de Renda</p>
          <p className="text-xl font-semibold text-warning-900">
            {formatCurrency(result.imposto_renda)}
          </p>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700 mb-1">Valor Líquido</p>
          <p className="text-xl font-semibold text-primary-900">
            {formatCurrency(result.valor_liquido)}
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Evolução do Investimento</h4>
        <div className="space-y-2">
          {result.dados_grafico.map((point, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">
                {point.periodo === 0 ? 'Inicial' : `Mês ${point.periodo}`}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(point.valor)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
