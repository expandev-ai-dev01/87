import { formatCurrency, formatPercentage } from '@/core/utils/format';
import type { ComparisonTableProps } from './types';

/**
 * @component ComparisonTable
 * @summary Comparative metrics table
 * @domain comparison
 * @type domain-component
 * @category display
 *
 * @description
 * Displays detailed comparison metrics in table format.
 * Highlights best performing product in each metric.
 *
 * @props
 * @param {ComparisonTableProps} props - Component properties
 *
 * @businessRules
 * - Shows key periods (start, 1 year, 5 years, 10 years, end)
 * - Highlights better performance visually
 * - Updates in real-time with parameter changes
 */
export const ComparisonTable = ({ produtos, metricas }: ComparisonTableProps) => {
  if (produtos.length !== 2) return null;

  const [produto1, produto2] = produtos;

  const getBestClassName = (value1: number, value2: number, currentValue: number) => {
    if (currentValue === Math.max(value1, value2)) {
      return 'bg-success-50 font-semibold text-success-900';
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparação Detalhada</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Métrica</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                {produto1.nome}
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                {produto2.nome}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">Valor Final</td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.valor_final,
                  produto2.valor_final,
                  produto1.valor_final
                )}`}
              >
                {formatCurrency(produto1.valor_final)}
              </td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.valor_final,
                  produto2.valor_final,
                  produto2.valor_final
                )}`}
              >
                {formatCurrency(produto2.valor_final)}
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">Rentabilidade Bruta</td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.rentabilidade_bruta,
                  produto2.rentabilidade_bruta,
                  produto1.rentabilidade_bruta
                )}`}
              >
                {formatCurrency(produto1.rentabilidade_bruta)}
              </td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.rentabilidade_bruta,
                  produto2.rentabilidade_bruta,
                  produto2.rentabilidade_bruta
                )}`}
              >
                {formatCurrency(produto2.rentabilidade_bruta)}
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">Imposto</td>
              <td className="text-right py-3 px-4 text-sm text-warning-700">
                {formatCurrency(produto1.imposto)}
              </td>
              <td className="text-right py-3 px-4 text-sm text-warning-700">
                {formatCurrency(produto2.imposto)}
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">Rentabilidade Líquida</td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.rentabilidade_liquida,
                  produto2.rentabilidade_liquida,
                  produto1.rentabilidade_liquida
                )}`}
              >
                {formatCurrency(produto1.rentabilidade_liquida)}
              </td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.rentabilidade_liquida,
                  produto2.rentabilidade_liquida,
                  produto2.rentabilidade_liquida
                )}`}
              >
                {formatCurrency(produto2.rentabilidade_liquida)}
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">Rentabilidade Real</td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.rentabilidade_real,
                  produto2.rentabilidade_real,
                  produto1.rentabilidade_real
                )}`}
              >
                {formatCurrency(produto1.rentabilidade_real)}
              </td>
              <td
                className={`text-right py-3 px-4 text-sm ${getBestClassName(
                  produto1.rentabilidade_real,
                  produto2.rentabilidade_real,
                  produto2.rentabilidade_real
                )}`}
              >
                {formatCurrency(produto2.rentabilidade_real)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="text-sm font-semibold text-primary-900 mb-2">Resumo da Comparação</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary-700">Melhor Produto:</span>
            <span className="text-sm font-semibold text-primary-900">
              {metricas.melhor_produto}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary-700">Diferença Absoluta:</span>
            <span className="text-sm font-semibold text-primary-900">
              {formatCurrency(metricas.diferenca_absoluta)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary-700">Diferença Percentual:</span>
            <span className="text-sm font-semibold text-primary-900">
              {formatPercentage(metricas.diferenca_percentual / 100)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
