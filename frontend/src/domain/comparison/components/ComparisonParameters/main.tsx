import { formatCurrency } from '@/core/utils/format';
import type { ComparisonParametersProps } from './types';

/**
 * @component ComparisonParameters
 * @summary Comparison parameters configuration panel
 * @domain comparison
 * @type domain-component
 * @category form
 *
 * @description
 * Side panel for adjusting comparison parameters including
 * initial investment amount and investment term.
 * Updates trigger real-time recalculation.
 *
 * @props
 * @param {ComparisonParametersProps} props - Component properties
 *
 * @businessRules
 * - Minimum initial value: R$ 1.00
 * - Default initial value: R$ 1,000.00
 * - Minimum term: 1 month
 * - Maximum term: 360 months (30 years)
 * - Default term: 12 months
 */
export const ComparisonParameters = ({
  valorInicial,
  prazo,
  onValorInicialChange,
  onPrazoChange,
  isDisabled = false,
}: ComparisonParametersProps) => {
  const handleValorInicialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onValorInicialChange(value);
    }
  };

  const handlePrazoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 360) {
      onPrazoChange(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Parâmetros de Comparação</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Valor Inicial (R$)</label>
        <input
          type="number"
          step="0.01"
          min="1"
          value={valorInicial}
          onChange={handleValorInicialChange}
          disabled={isDisabled}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-gray-500">
          Valor formatado: {formatCurrency(valorInicial)}
        </p>
        <p className="mt-1 text-xs text-gray-500">Mínimo: R$ 1,00</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Prazo (meses)</label>
        <input
          type="number"
          min="1"
          max="360"
          value={prazo}
          onChange={handlePrazoChange}
          disabled={isDisabled}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-gray-500">
          {prazo} {prazo === 1 ? 'mês' : 'meses'} ({(prazo / 12).toFixed(1)} anos)
        </p>
        <p className="mt-1 text-xs text-gray-500">Mínimo: 1 mês | Máximo: 360 meses</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Os valores são atualizados em tempo real conforme você ajusta os parâmetros.
        </p>
      </div>
    </div>
  );
};
