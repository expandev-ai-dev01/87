import { formatCurrency } from '@/core/utils/format';
import type { ComparisonChartProps } from './types';

/**
 * @component ComparisonChart
 * @summary Graphical comparison visualization
 * @domain comparison
 * @type domain-component
 * @category display
 *
 * @description
 * Displays line chart showing investment evolution over time
 * for both selected products. Uses distinct colors for each product.
 *
 * @props
 * @param {ComparisonChartProps} props - Component properties
 *
 * @businessRules
 * - Chart shows month-by-month evolution
 * - Each product has distinct color
 * - Chart updates in real-time with parameter changes
 */
export const ComparisonChart = ({ produtos }: ComparisonChartProps) => {
  if (produtos.length !== 2) return null;

  const [produto1, produto2] = produtos;
  const maxPeriodo = Math.max(produto1.dados_mensais.length, produto2.dados_mensais.length);

  const maxValor = Math.max(
    ...produto1.dados_mensais.map((d) => d.valor),
    ...produto2.dados_mensais.map((d) => d.valor)
  );

  const getYPosition = (valor: number) => {
    return 100 - (valor / maxValor) * 80;
  };

  const getXPosition = (mes: number) => {
    return (mes / maxPeriodo) * 100;
  };

  const createPath = (dados: Array<{ mes: number; valor: number }>) => {
    if (dados.length === 0) return '';

    const points = dados.map((d) => {
      const x = getXPosition(d.mes);
      const y = getYPosition(d.valor);
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução do Investimento</h3>

      <div className="mb-4 flex gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary-600 rounded"></div>
          <span className="text-sm text-gray-700">{produto1.nome}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success-600 rounded"></div>
          <span className="text-sm text-gray-700">{produto2.nome}</span>
        </div>
      </div>

      <div className="relative w-full" style={{ height: '400px' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path
            d={createPath(produto1.dados_mensais)}
            fill="none"
            stroke="rgb(14, 165, 233)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={createPath(produto2.dados_mensais)}
            fill="none"
            stroke="rgb(34, 197, 94)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute top-0 left-0 text-xs text-gray-500">
          {formatCurrency(maxValor)}
        </div>
        <div className="absolute bottom-0 left-0 text-xs text-gray-500">{formatCurrency(0)}</div>
        <div className="absolute bottom-0 right-0 text-xs text-gray-500">{maxPeriodo} meses</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-primary-50 rounded-lg">
          <p className="text-xs text-primary-700 mb-1">{produto1.nome}</p>
          <p className="text-lg font-semibold text-primary-900">
            {formatCurrency(produto1.valor_final)}
          </p>
        </div>
        <div className="p-3 bg-success-50 rounded-lg">
          <p className="text-xs text-success-700 mb-1">{produto2.nome}</p>
          <p className="text-lg font-semibold text-success-900">
            {formatCurrency(produto2.valor_final)}
          </p>
        </div>
      </div>
    </div>
  );
};
